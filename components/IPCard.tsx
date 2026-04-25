import React from 'react'

interface IPCardProps {
  title: string
  description: string
  tag: string
  className?: string
}

export default function IPCard({ title, description, tag, className = '' }: IPCardProps) {
  return (
    <div
      className={`
        border-l-[3px] border-l-va-navy border-0.5 border-va-border
        bg-va-white px-4 py-4
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-sans text-sm font-semibold text-va-gray-dark leading-snug">{title}</h3>
        <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold shrink-0">
          {tag}
        </span>
      </div>
      <p className="font-sans text-xs text-va-gray-mid leading-relaxed">{description}</p>
    </div>
  )
}
