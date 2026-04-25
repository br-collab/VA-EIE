import React from 'react'

interface ProofBoxProps {
  label: string
  body: string
  className?: string
}

export default function ProofBox({ label, body, className = '' }: ProofBoxProps) {
  return (
    <div
      className={`
        border-l-[3px] border-l-va-green border-0.5 border-va-border
        bg-va-white px-4 py-3
        ${className}
      `}
    >
      <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-green mb-1.5">
        {label}
      </div>
      <p className="font-sans text-sm text-va-gray-dark leading-relaxed">{body}</p>
    </div>
  )
}
