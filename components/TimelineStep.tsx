import React from 'react'

interface TimelineStepProps {
  number: number
  head: string
  sub: string
  isLast?: boolean
  className?: string
}

export default function TimelineStep({
  number,
  head,
  sub,
  isLast = false,
  className = '',
}: TimelineStepProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <div
          className="
            w-7 h-7 shrink-0 rounded-none
            bg-va-navy text-va-white
            font-dm-mono text-xs font-medium
            flex items-center justify-center
          "
        >
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-va-border mt-1" />}
      </div>
      <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
        <div className="font-sans text-sm font-semibold text-va-gray-dark leading-snug">{head}</div>
        <div className="font-sans text-xs text-va-gray-mid mt-0.5 leading-relaxed">{sub}</div>
      </div>
    </div>
  )
}
