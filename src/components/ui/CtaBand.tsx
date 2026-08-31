import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/content'
import Button from './Button'

export interface CtaLink {
  label: string
  href: string
  external?: boolean
}

export interface CtaBandProps {
  /** ReactNode so a page can wrap part of the line in `<span className="text-gradient">`. */
  title: ReactNode
  body?: ReactNode
  primary?: CtaLink
  secondary?: CtaLink
  className?: string
}

/**
 * `bg-surface` + `border-y` rather than a full-bleed amber band: a `gradient-primary`
 * band inverts the page's whole contrast model and forces a third button variant
 * with its own contrast maths. This reads as punctuation and costs nothing.
 */
export default function CtaBand({
  title,
  body,
  primary = { label: 'Book A Meeting', href: siteConfig.calendlyUrl, external: true },
  secondary,
  className,
}: CtaBandProps) {
  return (
    <section className={cn('border-y border-border bg-surface', className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {body && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary text-pretty">
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button href={primary.href} external={primary.external}>
            {primary.label}
          </Button>
          {secondary && (
            <Button variant="secondary" href={secondary.href} external={secondary.external}>
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
