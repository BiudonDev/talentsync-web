import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  solid: 'bg-primary text-secondary-dark',
  outline: 'border border-border text-text-secondary',
} as const

export interface PillProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  className?: string
}

export default function Pill({ children, variant = 'solid', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-sm font-medium',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
