import Link from 'next/link'
import { PageShell } from '@/components/layout'
import { Button, SectionWrapper } from '@/components/ui'
import { primaryNav } from '@/data/routes'

/**
 * Emits `out/404.html` under `output: 'export'`. nginx serves it via
 * `error_page 404 /404.html` with a real HTTP 404 (D9), so this is the page
 * every typo, every dead backlink and every hallucinated LLM URL lands on.
 *
 * `<PageShell crumbs={[]}>` — its own contract says "Pass `[]` on `/`", and an
 * empty trail renders NO breadcrumbs and NO BreadcrumbList JSON-LD (it gates on
 * `trail.length > 1`). So this is Navbar + `<main>` + Footer, without a second
 * hand-copied skip link and a second hand-copied `--nav-h` clearance drifting
 * out of sync with the shell every other route uses.
 *
 * Metadata: `not-found.tsx` is neither a `layout` nor a `page` module, and
 * Next resolves metadata from those two only (`getLayoutOrPageModule`) — an
 * `export const metadata` here is silently ignored. So the title is rendered
 * inline and hoisted by React 19, exactly as Next's own built-in 404 does it.
 * `<meta name="robots" content="noindex">` is injected automatically for the
 * `/404` page path; do not add one.
 */

const LINK =
  'flex min-h-11 items-center rounded-lg px-3 -mx-3 text-base text-text-secondary ' +
  'motion-safe:transition-colors hover:bg-primary/10 hover:text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function NotFound() {
  return (
    <PageShell crumbs={[]}>
      <title>Page not found | TalentSync</title>

      <SectionWrapper width="narrow" density="tight">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Page <span className="text-gradient">not found</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary text-pretty sm:text-xl">
          That URL does not exist on this site. It may have moved, or the link that sent you here may
          have a typo. Everything below still works.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/">Back to the homepage</Button>
          <Button variant="secondary" href="/contact/">
            Contact us
          </Button>
        </div>

        {/* Not an <h2>: §2.3 legislates one string per heading level and the
            caption role is not one of them. aria-labelledby names the landmark,
            same idiom as the footer columns. */}
        <nav aria-labelledby="not-found-sections" className="mt-12 border-t border-border pt-8">
          <p id="not-found-sections" className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Main sections
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {primaryNav.map((r) => (
              <li key={r.path}>
                <Link prefetch={false} href={r.path} className={LINK}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SectionWrapper>
    </PageShell>
  )
}
