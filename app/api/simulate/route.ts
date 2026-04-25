import Anthropic from '@anthropic-ai/sdk'
import { mosTable } from '@/data/mos'
import { cfrRules } from '@/data/cfr'

export const runtime = 'nodejs'

interface SimulateRequest {
  mos: string
  conditions: string[]
  evidence: string[]
  era: string
}

function buildSystemPrompt(): string {
  const mosIndex = mosTable
    .map(
      (m) =>
        `${m.code} | ${m.title} | ${m.branch} | CombatLevel:${m.combatLevel} | PTSD-presumption:${m.ptsdPresumption} | TBI:${m.tbiRisk} | PACT:${m.pactEra} | CFR:[${m.cfrTriggers.join(', ')}]`
    )
    .join('\n')

  const cfrIndex = cfrRules
    .map(
      (r) =>
        `${r.cite} — ${r.title} | Status:${r.status} | Triggers:[${r.triggers.join('; ')}] | Action: ${r.vaEieAction}`
    )
    .join('\n')

  return `You are VA-EIE (VA Evidence Intelligence Engine), a regulatory-aware claims analysis engine built on 38 CFR and VA adjudication policy.

MOS TABLE:
${mosIndex}

CFR RULE TABLE:
${cfrIndex}

INSTRUCTIONS:
Given a representative veteran's MOS, claimed conditions, evidence on file, and service era, produce a structured rater action queue and CUE risk assessment.

CRITICAL RULES:
- Never use real veteran names, SSNs, or any personally identifiable information.
- Always refer to the veteran as "the veteran" or "Representative Veteran."
- Base all analysis strictly on the MOS table and CFR rules provided.
- Apply the benefit of the doubt in favor of the veteran per 38 USC §5107(b).
- Output ONLY valid JSON in the exact schema below. No prose outside JSON.

OUTPUT SCHEMA:
{
  "cueRisk": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "cueRiskReason": "string",
  "raterActionQueue": [
    {
      "priority": 1,
      "action": "string",
      "cfrCite": "string",
      "status": "required" | "recommended" | "flagged",
      "rationale": "string"
    }
  ],
  "autoFiredRules": [
    {
      "cite": "string",
      "title": "string",
      "applied": true | false,
      "reason": "string"
    }
  ],
  "summary": "string (2–3 sentences, no PII)"
}`
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: SimulateRequest
  try {
    body = await req.json() as SimulateRequest
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { mos, conditions, evidence, era } = body

  if (!mos || typeof mos !== 'string' || mos.length > 20) {
    return new Response(
      JSON.stringify({ error: 'Invalid MOS value.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const client = new Anthropic({ apiKey })

  const userPrompt = `Analyze the following representative veteran claim scenario:

MOS: ${mos}
Claimed Conditions: ${conditions.join(', ')}
Evidence on File: ${evidence.join(', ')}
Service Era: ${era}

Produce the rater action queue and CUE risk assessment per the output schema.`

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: userPrompt }],
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
      } catch (err) {
        controller.error(err)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
