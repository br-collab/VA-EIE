import React from 'react'

export type PipelineStepState = 'done' | 'active' | 'pending'

export interface PipelineStep {
  label: string
  state: PipelineStepState
}

interface PipelineBarProps {
  steps?: PipelineStep[]
  className?: string
}

const defaultSteps: PipelineStep[] = [
  { label: 'Ingest', state: 'pending' },
  { label: 'MOS Inference', state: 'pending' },
  { label: 'CFR Check', state: 'pending' },
  { label: 'Evidence Scan', state: 'pending' },
  { label: 'Rater Queue', state: 'pending' },
]

const stateClasses: Record<PipelineStepState, string> = {
  done:    'bg-va-green text-va-white',
  active:  'bg-va-gold text-va-gray-dark',
  pending: 'bg-va-gray-light text-va-gray-mid border-0.5 border-va-border',
}

export default function PipelineBar({ steps = defaultSteps, className = '' }: PipelineBarProps) {
  return (
    <div className={`flex items-center gap-0 ${className}`} role="list" aria-label="Processing pipeline">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div
            className={`
              flex-1 text-center font-dm-mono text-[10px] uppercase tracking-widest
              py-1.5 px-2 leading-none ${stateClasses[step.state]}
            `}
            role="listitem"
            aria-current={step.state === 'active' ? 'step' : undefined}
          >
            <span className="block text-[9px] opacity-60 mb-0.5">{idx + 1}</span>
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <div className="w-px h-8 bg-va-border shrink-0" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
