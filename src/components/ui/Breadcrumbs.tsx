import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

/**
 * Visible breadcrumb markup only. The BreadcrumbList JSON-LD is emitted
 * separately (package A3) so the trail is not duplicated in two places.
 *
 * Mobile behaviour is truncate, never wrap: ancestors keep their full label and
 * `shrink-0`, the current page gets `min-w-0 truncate`. `flex-nowrap` + `min-w-0`
 * are both load-bearing — a flex item defaults to `min-width: auto` and refuses
 * to shrink below its content, so without them `truncate` does nothing.
 *
 * Hit boxes are `min-h-11` (44px) on the links only; the row centres them, so the
 * visual text size is unchanged. The current-page `<span>` is not interactive and
 * keeps `block truncate` — `inline-flex` would put the text in an anonymous flex
 * item where `text-overflow` never applies.
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex min-w-0 flex-nowrap items-center gap-2 text-sm text-text-secondary">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li
              key={`${c.href ?? c.label}-${i}`}
              className={cn('flex min-h-11 items-center gap-2', last ? 'min-w-0' : 'shrink-0')}
            >
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="inline-flex min-h-11 items-center rounded px-1 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="block truncate px-1 text-text-primary"
                >
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="shrink-0 text-text-secondary">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
