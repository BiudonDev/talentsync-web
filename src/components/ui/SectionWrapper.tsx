import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const WIDTHS = {
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', // comparison/pricing tables only
  full: 'w-full',
} as const

export interface SectionWrapperProps {
  children: ReactNode
  id?: string
  band?: boolean
  width?: keyof typeof WIDTHS
  density?: 'default' | 'tight'
  className?: string
  innerClassName?: string
}

export default function SectionWrapper({
  children,
  id,
  band = false,
  width = 'default',
  density = 'default',
  className,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        density === 'tight' ? 'py-16 sm:py-20 lg:py-24' : 'py-24 sm:py-32 lg:py-40',
        band && 'bg-background-alt',
        className,
      )}
    >
      <div className={cn(WIDTHS[width], innerClassName)}>{children}</div>
    </section>
  )
}
