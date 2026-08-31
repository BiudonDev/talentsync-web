import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  label: string
  level?: 2 | 3
}

export interface TableOfContentsProps {
  items: TocItem[]
  /** Heading shown above the list / used as the collapsed summary label. */
  title?: string
  className?: string
}

function List({ items }: { items: TocItem[] }) {
  return (
    <ol className="mt-4 space-y-2 text-sm">
      {items.map((it) => (
        <li key={it.id} className={it.level === 3 ? 'pl-4' : undefined}>
          <a
            href={`#${it.id}`}
            className="flex min-h-11 items-center rounded-lg px-2 text-text-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * Zero JS, no scroll-spy, no IntersectionObserver. Entries are hand-authored in
 * the page's data file — nothing is scraped at runtime.
 *
 * Mobile gets a collapsed native <details> so the TOC never eats the first
 * screen; lg gets an always-open sticky rail. A breakpoint-dependent default
 * `open` state is not expressible in CSS (a closed <details> hides its children
 * through a UA shadow slot that author CSS cannot reveal), so this renders the
 * list twice — through one shared `List`, so there is still one source of truth.
 * Only one of the two is ever in the accessibility tree; the other is `display:none`.
 */
export default function TableOfContents({
  items,
  title = 'On this page',
  className,
}: TableOfContentsProps) {
  return (
    <nav
      aria-label={title}
      className={cn('lg:sticky lg:top-[calc(var(--nav-h)+1rem)]', className)}
    >
      <details className="rounded-xl border border-border bg-surface p-4 lg:hidden [&[open]_svg]:rotate-180">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          {title}
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="size-5 shrink-0 fill-primary motion-safe:transition-transform"
          >
            <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
          </svg>
        </summary>
        <List items={items} />
      </details>

      <div className="hidden lg:block">
        <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">{title}</p>
        <List items={items} />
      </div>
    </nav>
  )
}
