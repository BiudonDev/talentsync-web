import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FaqItem {
  q: string
  a: ReactNode
}

export interface FaqProps {
  items: FaqItem[]
  /** Optional section heading rendered above the list. */
  heading?: string
  /**
   * Groups the <details> so only one opens at a time (native exclusive
   * accordion). Pass a distinct value if two FAQ blocks share a route.
   */
  name?: string
  className?: string
}

/**
 * Server component, zero JS. `<details>/<summary>` gives implicit
 * `aria-expanded`, a real disclosure relationship, Space/Enter, and answers that
 * stay in the DOM for Ctrl-F and for Google.
 *
 * The chevron rotates from `[&[open]_svg]:rotate-180` here plus
 * `details[open] > summary svg { rotate: 180deg }` in globals.css. The local one
 * keeps the component self-contained if that global rule ever moves.
 *
 * The design contract claims `open:` / `group-open:` compile to nothing in this
 * build. Re-verified against tailwindcss 4.1.18: they DO emit
 * (`.group-open\:rotate-180 { &:is(:where(.group):is([open],:popover-open,:open) *) }`).
 * Nothing here depends on that either way — see the report.
 */
export default function Faq({ items, heading, name = 'faq', className }: FaqProps) {
  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      {heading && (
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            name={name}
            open={i === 0}
            className="group rounded-xl border border-border bg-surface [&[open]_svg]:rotate-180 has-[summary:focus-visible]:outline-2 has-[summary:focus-visible]:outline-offset-2 has-[summary:focus-visible]:outline-primary"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-6 font-semibold text-text-primary focus-visible:outline-none">
              {item.q}
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className="size-5 shrink-0 fill-primary motion-safe:transition-transform"
              >
                <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-base leading-relaxed text-text-secondary text-pretty">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
