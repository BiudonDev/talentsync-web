import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface',
        'rounded-2xl border border-border',
        'p-6 sm:p-8',
        hover && 'shadow-sm hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
