# VA-EIE — VA Evidence Intelligence Engine

## Product Description

VA-EIE is a licensed IP pitch application targeting federal VA contract delivery through Eleven09/KSTP (SDVOSB). It is a Next.js 14 TypeScript web application that encodes 38 CFR Parts 3 and 4 as machine-executable rule nodes, generates rater action queues, and scores CUE (Clear and Unmistakable Error) risk for representative veteran claim scenarios.

The engine integrates Anthropic claude-sonnet-4-6 via a secure server-side API route to produce structured rater action queues and CUE risk scores (LOW/MEDIUM/HIGH/CRITICAL). No personal veteran data is used anywhere in the application.

Deployed to Railway via GitHub Actions. SDVOSB set-aside eligible through Eleven09/KSTP.

---

## VA Brand Color System

All colors are official VA brand / design system values only. No custom colors. No gradients. Flat surfaces only. 0.5px borders at #D6D7D9.

| Token          | Hex       | Usage                                      |
|----------------|-----------|--------------------------------------------|
| --va-navy      | #112F4E   | Navigation, primary actions, headers       |
| --va-blue      | #0071BC   | Primary blue, links, active states         |
| --va-blue-dark | #003E73   | Dark blue variant, card headers            |
| --va-gold      | #FACE00   | CFR citations on dark, accent text         |
| --va-white     | #FFFFFF   | Card backgrounds, light surfaces           |
| --va-gray-light| #F1F1F1   | Page background, metric card bg            |
| --va-gray-mid  | #5B616B   | Body text, labels, secondary               |
| --va-gray-dark | #212121   | Primary text                               |
| --va-green     | #2E8540   | Success, pass icons, ProofBox borders      |
| --va-red       | #CD2026   | Error, fail icons, CUE alert borders       |
| --va-amber     | #FF7733   | Warning, warn icons, pending status        |
| --va-border    | #D6D7D9   | All borders (0.5px)                        |

**CFR Citation Rule**: All CFR citation strings (§3.159, §3.304(f)(2), etc.) MUST render in `font-dm-mono` with:
- `text-va-gold` on dark surfaces (navy/blue-dark backgrounds)
- `text-va-blue-dark` on light surfaces (white/gray-light backgrounds)

---

## Typography

| Font              | Usage                                        |
|-------------------|----------------------------------------------|
| DM Serif Display  | Hero H1 only — never used elsewhere          |
| DM Mono           | ALL CFR citations, MOS codes, data values, metric numbers, section labels, badges |
| Source Sans Pro   | All body text, UI labels, button text        |
| Public Sans       | Fallback for Source Sans Pro                 |
| system-ui         | Final fallback                               |

Font classes: `font-dm-serif`, `font-dm-mono`, `font-sans`

---

## Component Architecture

```
components/
  Badge.tsx          — variant: navy/blue/gold/green/red/amber/gray
  MetricCard.tsx     — number (DM Mono), label, optional subLabel
  RuleRow.tsx        — icon (pass/fail/warn/info), title, CFR cite, action chip
  PipelineBar.tsx    — 5-step horizontal bar (done=green, active=gold, pending=gray)
  SectionLabel.tsx   — DM Mono 10px uppercase letter-spaced, gray-mid, bottom border
  IPCard.tsx         — navy left border 3px, title, desc, DM Mono gold tag
  ProofBox.tsx       — green left border 3px, DM Mono green label, body text
  TimelineStep.tsx   — numbered dot + connector line + head/sub text
  Simulator.tsx      — full live claim simulator with streaming API integration
  panels/
    DecisionEngine.tsx     — PipelineBar + CUE alert + rater queue + auto-fired rules
    IPAssets.tsx           — IP card grid + moat argument rows
    ProofOfConcept.tsx     — 4 ProofBoxes + H.R. 3854 legislation status card
    CommercialStructure.tsx — builder vs partner grid + license terms table
    PathToMarket.tsx       — 6-step TimelineStep + 3-button action card
```

---

## Data Schemas

### MOS (`/data/mos.ts`)

```typescript
interface MOS {
  code: string
  title: string
  branch: 'Army' | 'Navy' | 'Marine Corps' | 'Air Force' | 'Coast Guard' | 'Space Force' | 'Multi'
  category: 'Infantry' | 'Special Forces' | 'Cavalry' | 'Combat Support' | 'Combat Service Support' | 'Intelligence' | 'Signal' | 'Medical' | 'Aviation' | 'EOD'
  combatLevel: 'Direct' | 'Support' | 'Indirect' | 'Rear'
  ptsdPresumption: boolean
  tbiRisk: 'High' | 'Medium' | 'Low'
  pactEra: boolean
  cfrTriggers: string[]
}
```

Seeded MOS codes: 13Z5V, 11B, 11C, 11Z, 18A-18Z, 19D, 19K, 12B, 68W, 88M, 35F, 25U, 0311, 0331, 0341, 0321, 0372, SO, EOD, 1A2X1, 1C2X1, 1Z4X1, 2T3X1

### CFR Rules (`/data/cfr.ts`)

```typescript
interface CFRNode {
  cite: string
  title: string
  part: string
  status: 'Active' | 'Amended' | 'Pending' | 'Case Law'
  summary: string
  triggers: string[]
  vaEieAction: string
}
```

Seeded rules: §3.159(c)(1), §3.159(c)(4), §3.304(f)(2), §3.304(f)(3), §3.303, Clemons v. Shinseki (2010), §3.105(a) CUE, §4.10 (Feb 2026), §3.309/§3.320 PACT Act, §1154(b)

### Metrics (`/data/metrics.ts`)

Static ROI metrics object: roiRatio, tenYearBenefit, errorReduction, fteHours, investment, breakEven, remandReduction, cueAvoidance, productivity

---

## API Route Contract

**Endpoint**: `POST /api/simulate`

**Request body**:
```json
{
  "mos": "11B",
  "conditions": ["PTSD", "TBI"],
  "evidence": ["STRs (Service Treatment Records)", "DD-214"],
  "era": "Post-9/11"
}
```

**Response**: Streaming `text/plain` JSON string matching:
```json
{
  "cueRisk": "LOW | MEDIUM | HIGH | CRITICAL",
  "cueRiskReason": "string",
  "raterActionQueue": [
    { "priority": 1, "action": "string", "cfrCite": "string", "status": "required | recommended | flagged", "rationale": "string" }
  ],
  "autoFiredRules": [
    { "cite": "string", "title": "string", "applied": true, "reason": "string" }
  ],
  "summary": "string"
}
```

**Model**: `claude-sonnet-4-6` (Anthropic)
**Key**: `process.env.ANTHROPIC_API_KEY` — server-side only, never exposed to client

---

## Target Audience

Eleven09 / KSTP federal BD leadership. Pitch purpose: license VA-EIE IP for exclusive federal VA deployment under SDVOSB set-aside via KSTP VA EMM prime contract ($63.5M).

---

## Key Constraints

- No personal veteran data anywhere in the codebase
- Generic "Representative Veteran" used in all demos
- No hardcoded API keys
- No gradients anywhere
- No box shadows except `0 0 0 Npx` focus rings
- All CFR citations in DM Mono — always
- VA colors only — no custom palette
- Flat surfaces, 0.5px borders at #D6D7D9
