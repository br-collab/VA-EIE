'use client'

import React from 'react'
import PipelineBar, { PipelineStep } from '@/components/PipelineBar'
import RuleRow from '@/components/RuleRow'
import SectionLabel from '@/components/SectionLabel'
import { cfrRules } from '@/data/cfr'

const pipelineSteps: PipelineStep[] = [
  { label: 'Ingest', state: 'done' },
  { label: 'MOS Inference', state: 'done' },
  { label: 'CFR Check', state: 'active' },
  { label: 'Evidence Scan', state: 'pending' },
  { label: 'Rater Queue', state: 'pending' },
]

// Rater action queue — 3 required items driven from CFR data
const raterQueue = [
  {
    icon: 'fail' as const,
    title: 'C&P Exam Not on File',
    cite: cfrRules[0].cite,
    action: cfrRules[0].vaEieAction,
  },
  {
    icon: 'warn' as const,
    title: 'Functional Impairment Documentation Missing',
    cite: cfrRules[7].cite,
    action: cfrRules[7].vaEieAction,
  },
  {
    icon: 'warn' as const,
    title: 'Federal Records Request Outstanding',
    cite: cfrRules[1].cite,
    action: cfrRules[1].vaEieAction,
  },
]

// Auto-fired rules — 4 items
const autoFired = [
  {
    icon: 'pass' as const,
    title: 'PTSD Combat Presumption Applied',
    cite: cfrRules[2].cite,
    action: cfrRules[2].vaEieAction,
  },
  {
    icon: 'pass' as const,
    title: 'PACT Act Toxic Exposure Presumption Active',
    cite: cfrRules[8].cite,
    action: cfrRules[8].vaEieAction,
  },
  {
    icon: 'info' as const,
    title: 'Lay Statement Elevated — Combat Veteran',
    cite: cfrRules[9].cite,
    action: cfrRules[9].vaEieAction,
  },
  {
    icon: 'info' as const,
    title: 'Liberal Claim Reading Applied',
    cite: cfrRules[5].cite,
    action: cfrRules[5].vaEieAction,
  },
]

export default function DecisionEngine() {
  return (
    <div className="space-y-5">
      <div>
        <SectionLabel>Processing Pipeline — Representative Veteran</SectionLabel>
        <PipelineBar steps={pipelineSteps} />
      </div>

      {/* CUE Alert Block */}
      <div
        className="border-l-[3px] border-l-va-red border-0.5 border-va-border bg-[#FEF2F2] px-4 py-3"
        role="alert"
      >
        <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-red mb-1">
          CUE Risk Detected — Prior Decision Review Required
        </div>
        <p className="font-sans text-sm text-va-gray-dark">
          Prior rating for musculoskeletal condition may have misapplied the §4.10 functional
          impairment standard. CUE review flagged — retroactive award exposure estimated.
        </p>
        <div className="font-dm-mono text-[10px] text-va-red mt-2 uppercase tracking-widest">
          Cite: {cfrRules[6].cite} — {cfrRules[6].title}
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rater Action Queue */}
        <div className="border-0.5 border-va-border bg-va-white">
          <div className="bg-va-navy px-4 py-2">
            <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
              Rater Action Queue
            </span>
          </div>
          <div className="px-4 py-2">
            {raterQueue.map((item) => (
              <RuleRow
                key={item.cite}
                icon={item.icon}
                title={item.title}
                cite={item.cite}
                action={item.action}
              />
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
          <div className="px-4 py-2">
            {autoFired.map((item) => (
              <RuleRow
                key={item.cite}
                icon={item.icon}
                title={item.title}
                cite={item.cite}
                action={item.action}
                lightSurface={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
