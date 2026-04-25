'use client'

import React, { useState, useRef, useCallback } from 'react'
import { jsonrepair } from 'jsonrepair'
import PipelineBar, { PipelineStep, PipelineStepState } from '@/components/PipelineBar'
import Badge, { BadgeVariant } from '@/components/Badge'
import SectionLabel from '@/components/SectionLabel'

const CONDITIONS = [
  'PTSD',
  'TBI',
  'Hearing Loss / Tinnitus',
  'Respiratory / Burn Pit',
  'Musculoskeletal',
]

const EVIDENCE = [
  'STRs (Service Treatment Records)',
  'BH Records (Behavioral Health)',
  'C&P Exam',
  'Lay Statement',
  'DD-214',
]

const ERAS = ['Post-9/11', 'Gulf War', 'Vietnam', 'Other']

type CUERisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

interface RaterAction {
  priority: number
  action: string
  cfrCite: string
  status: 'required' | 'recommended' | 'flagged'
  rationale: string
}

interface AutoFiredRule {
  cite: string
  title: string
  applied: boolean
  reason: string
}

interface SimulationResult {
  cueRisk: CUERisk
  cueRiskReason: string
  raterActionQueue: RaterAction[]
  autoFiredRules: AutoFiredRule[]
  summary: string
}

const cueRiskBadgeVariant: Record<CUERisk, BadgeVariant> = {
  LOW:      'green',
  MEDIUM:   'amber',
  HIGH:     'red',
  CRITICAL: 'red',
}

function buildAnimatedSteps(phase: number): PipelineStep[] {
  const states: PipelineStepState[] = ['pending', 'pending', 'pending', 'pending', 'pending']
  for (let i = 0; i < 5; i++) {
    if (i < phase) states[i] = 'done'
    else if (i === phase) states[i] = 'active'
  }
  return [
    { label: 'Ingest',        state: states[0] },
    { label: 'MOS Inference', state: states[1] },
    { label: 'CFR Check',     state: states[2] },
    { label: 'Evidence Scan', state: states[3] },
    { label: 'Rater Queue',   state: states[4] },
  ]
}

interface SimulatorProps {
  prefillContext?: string
}

function parseSimulationResult(rawText: string): SimulationResult {
  // Some model responses include fenced JSON or minor trailing-comma issues.
  const unfenced = rawText.replace(/```json/gi, '').replace(/```/g, '').trim()
  const jsonStart = unfenced.indexOf('{')
  const jsonEnd = unfenced.lastIndexOf('}')

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error('No JSON payload found in model response.')
  }

  const candidate = unfenced.slice(jsonStart, jsonEnd + 1)

  try {
    return JSON.parse(candidate) as SimulationResult
  } catch {
    const repaired = jsonrepair(candidate)
    return JSON.parse(repaired) as SimulationResult
  }
}

export default function Simulator({ prefillContext }: SimulatorProps) {
  const [mos, setMos] = useState(prefillContext ? '' : '')
  const [conditions, setConditions] = useState<string[]>([])
  const [evidence, setEvidence] = useState<string[]>([])
  const [era, setEra] = useState('Post-9/11')
  const [loading, setLoading] = useState(false)
  const [pipelinePhase, setPipelinePhase] = useState(-1)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [streamText, setStreamText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const phaseRef = useRef(-1)
  const phaseInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const toggleMulti = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value])
  }

  const startPipelineAnimation = useCallback(() => {
    phaseRef.current = 0
    setPipelinePhase(0)
    phaseInterval.current = setInterval(() => {
      phaseRef.current += 1
      if (phaseRef.current >= 5) {
        if (phaseInterval.current) clearInterval(phaseInterval.current)
        return
      }
      setPipelinePhase(phaseRef.current)
    }, 700)
  }, [])

  const stopPipelineAnimation = useCallback(() => {
    if (phaseInterval.current) clearInterval(phaseInterval.current)
    setPipelinePhase(5)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setStreamText('')
    setLoading(true)
    startPipelineAnimation()

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mos: mos.trim(), conditions, evidence, era }),
      })

      if (!res.ok || !res.body) {
        const text = await res.text()
        throw new Error(text || 'Request failed.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk
        setStreamText(accumulated)
      }

      stopPipelineAnimation()

      const parsed = parseSimulationResult(accumulated)
      setResult(parsed)
      setStreamText('')
    } catch (err: unknown) {
      stopPipelineAnimation()
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const animatedSteps = pipelinePhase >= 0 ? buildAnimatedSteps(pipelinePhase) : undefined

  return (
    <div className="space-y-5">
      <SectionLabel>Live Claim Simulator — Representative Veteran</SectionLabel>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* MOS Input */}
        <div>
          <label className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid block mb-1">
            MOS / Rate / AFSC
          </label>
          <input
            type="text"
            value={mos}
            onChange={(e) => setMos(e.target.value)}
            placeholder="e.g. 11B, 0311, 18Z, SO"
            maxLength={20}
            required
            className="
              w-full border-0.5 border-va-border bg-va-white
              font-dm-mono text-sm text-va-gray-dark
              px-3 py-2 focus:outline-none focus:border-va-blue
              placeholder:text-va-gray-mid
            "
          />
        </div>

        {/* Conditions */}
        <div>
          <label className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid block mb-1">
            Claimed Conditions
          </label>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleMulti(c, conditions, setConditions)}
                className={`
                  font-sans text-xs px-3 py-1.5 border-0.5
                  focus:outline-none focus:shadow-focus transition-colors
                  ${
                    conditions.includes(c)
                      ? 'bg-va-navy text-va-white border-va-navy'
                      : 'bg-va-white text-va-gray-dark border-va-border hover:border-va-navy'
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence */}
        <div>
          <label className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid block mb-1">
            Evidence on File
          </label>
          <div className="flex flex-wrap gap-2">
            {EVIDENCE.map((ev) => (
              <button
                key={ev}
                type="button"
                onClick={() => toggleMulti(ev, evidence, setEvidence)}
                className={`
                  font-sans text-xs px-3 py-1.5 border-0.5
                  focus:outline-none focus:shadow-focus transition-colors
                  ${
                    evidence.includes(ev)
                      ? 'bg-va-blue text-va-white border-va-blue'
                      : 'bg-va-white text-va-gray-dark border-va-border hover:border-va-blue'
                  }
                `}
              >
                {ev}
              </button>
            ))}
          </div>
        </div>

        {/* Era */}
        <div>
          <label className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid block mb-1">
            Service Era
          </label>
          <select
            value={era}
            onChange={(e) => setEra(e.target.value)}
            className="
              border-0.5 border-va-border bg-va-white
              font-sans text-sm text-va-gray-dark
              px-3 py-2 focus:outline-none focus:border-va-blue
              min-w-[160px]
            "
          >
            {ERAS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            bg-va-navy text-va-white font-sans text-sm font-medium
            border-0.5 border-va-navy px-6 py-2.5
            hover:bg-va-blue-dark transition-colors
            focus:outline-none focus:shadow-focus
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? 'Analyzing…' : 'Run Simulation'}
        </button>
      </form>

      {/* Pipeline animation */}
      {loading && animatedSteps && (
        <div className="space-y-2">
          <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid">
            Processing…
          </div>
          <PipelineBar steps={animatedSteps} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="border-l-[3px] border-l-va-red border-0.5 border-va-border bg-[#FEF2F2] px-4 py-3"
          role="alert"
        >
          <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-red mb-1">
            Error
          </div>
          <p className="font-sans text-sm text-va-gray-dark">{error}</p>
        </div>
      )}

      {/* Streaming status (before parse) */}
      {streamText && !result && (
        <div className="border-0.5 border-va-border bg-va-gray-light px-4 py-3">
          <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid mb-2">
            Receiving…
          </div>
          <p className="font-sans text-sm text-va-gray-dark">
            Streaming structured adjudication response...
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <PipelineBar steps={buildAnimatedSteps(5)} />

          {/* CUE Risk Badge */}
          <div className="flex items-center gap-3">
            <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid">
              CUE Risk
            </span>
            <Badge variant={cueRiskBadgeVariant[result.cueRisk]}>
              {result.cueRisk}
            </Badge>
            <span className="font-sans text-xs text-va-gray-mid">{result.cueRiskReason}</span>
          </div>

          {/* Summary */}
          <div className="border-0.5 border-va-border bg-va-gray-light px-4 py-3">
            <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid mb-1">
              Summary
            </div>
            <p className="font-sans text-sm text-va-gray-dark leading-relaxed">{result.summary}</p>
          </div>

          {/* Two-column results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rater Action Queue */}
            <div className="border-0.5 border-va-border bg-va-white">
              <div className="bg-va-navy px-4 py-2">
                <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
                  Rater Action Queue
                </span>
              </div>
              <div className="divide-y divide-va-border">
                {result.raterActionQueue.map((item) => (
                  <div key={item.priority} className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <span className="font-dm-mono text-[10px] text-va-gray-mid w-4 shrink-0">
                        {item.priority}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-sans text-sm text-va-gray-dark font-medium">
                            {item.action}
                          </span>
                          <Badge
                            variant={
                              item.status === 'required'
                                ? 'red'
                                : item.status === 'recommended'
                                ? 'amber'
                                : 'gray'
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div className="font-dm-mono text-[11px] text-va-gold mb-1">
                          {item.cfrCite}
                        </div>
                        <p className="font-sans text-xs text-va-gray-mid leading-relaxed">
                          {item.rationale}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-fired Rules */}
            <div className="border-0.5 border-va-border bg-va-white">
              <div className="bg-va-blue-dark px-4 py-2">
                <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
                  Auto-Fired Rules
                </span>
              </div>
              <div className="divide-y divide-va-border">
                {result.autoFiredRules.map((rule) => (
                  <div key={rule.cite} className="px-4 py-3 flex items-start gap-2">
                    <span
                      className={`font-dm-mono text-sm font-bold mt-0.5 w-4 shrink-0 text-center ${
                        rule.applied ? 'text-va-green' : 'text-va-gray-mid'
                      }`}
                    >
                      {rule.applied ? '✓' : '–'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-sans text-sm text-va-gray-dark">{rule.title}</div>
                      <div className="font-dm-mono text-[11px] text-va-blue-dark mb-0.5">
                        {rule.cite}
                      </div>
                      <p className="font-sans text-xs text-va-gray-mid leading-relaxed">
                        {rule.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
