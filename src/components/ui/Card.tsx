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
        'bg-surface-light dark:bg-surface-dark',
        'rounded-2xl border border-neutral-100 dark:border-neutral-800',
        'p-6 sm:p-8',
        hover && 'shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
