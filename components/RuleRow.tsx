import React from 'react'

export type RuleRowIcon = 'pass' | 'fail' | 'warn' | 'info'

interface RuleRowProps {
  icon: RuleRowIcon
  title: string
  cite: string
  action: string
  lightSurface?: boolean
  className?: string
}

const iconMap: Record<RuleRowIcon, { symbol: string; color: string }> = {
  pass: { symbol: '✓', color: 'text-va-green' },
  fail: { symbol: '✗', color: 'text-va-red' },
  warn: { symbol: '⚠', color: 'text-va-amber' },
  info: { symbol: 'i', color: 'text-va-blue' },
}

export default function RuleRow({
  icon,
  title,
  cite,
  action,
  lightSurface = false,
  className = '',
}: RuleRowProps) {
  const { symbol, color } = iconMap[icon]

  return (
    <div className={`flex items-start gap-3 py-2 border-b border-va-border last:border-b-0 ${className}`}>
      <span className={`font-dm-mono text-sm font-bold ${color} mt-0.5 w-4 shrink-0 text-center`}>
        {symbol}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-sm text-va-gray-dark">{title}</span>
          <span
            className={`font-dm-mono text-[11px] font-medium ${
              lightSurface ? 'text-va-blue-dark' : 'text-va-gold'
            }`}
          >
            {cite}
          </span>
        </div>
        <p className="font-sans text-xs text-va-gray-mid mt-0.5">{action}</p>
      </div>
    </div>
  )
}
