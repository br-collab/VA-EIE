import React from 'react'

interface MetricCardProps {
  number: string
  label: string
  subLabel?: string
  className?: string
}

export default function MetricCard({ number, label, subLabel, className = '' }: MetricCardProps) {
  return (
    <div
      className={`
        bg-va-gray-light border-0.5 border-va-border
        px-5 py-4 flex flex-col gap-1
        ${className}
      `}
    >
      <span className="font-dm-mono text-2xl font-medium text-va-navy leading-none">
        {number}
      </span>
      <span className="font-sans text-sm text-va-gray-dark leading-snug">
        {label}
      </span>
      {subLabel && (
        <span className="font-dm-mono text-[10px] text-va-gray-mid uppercase tracking-widest">
          {subLabel}
        </span>
      )}
    </div>
  )
}
