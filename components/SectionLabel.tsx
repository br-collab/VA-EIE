import React from 'react'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`
        font-dm-mono text-[10px] uppercase tracking-[0.18em]
        text-va-gray-mid border-b border-va-border pb-1 mb-3
        ${className}
      `}
    >
      {children}
    </div>
  )
}
