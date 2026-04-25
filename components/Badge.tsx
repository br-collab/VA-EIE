import React from 'react'

export type BadgeVariant = 'navy' | 'blue' | 'gold' | 'green' | 'red' | 'amber' | 'gray'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  navy:  'bg-va-navy text-va-white border-va-navy',
  blue:  'bg-va-blue text-va-white border-va-blue',
  gold:  'bg-va-gold text-va-gray-dark border-va-gold',
  green: 'bg-va-green text-va-white border-va-green',
  red:   'bg-va-red text-va-white border-va-red',
  amber: 'bg-va-amber text-va-white border-va-amber',
  gray:  'bg-va-gray-light text-va-gray-dark border-va-border',
}

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-dm-mono text-[10px] font-medium
        uppercase tracking-widest px-2 py-0.5 border-0.5
        ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
