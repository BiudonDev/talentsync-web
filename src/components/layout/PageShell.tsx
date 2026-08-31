import type { ReactNode } from 'react'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs'
import { breadcrumbLd, graphLd } from '@/lib/schema'
import Footer from './Footer'
import Navbar from './Navbar'

/**
 * The shell every interior route wraps itself in (§3.2). Server component:
 * Navbar owns the only client state on the page.
 *
 * `Navbar` takes no `variant`, so it defaults to `solid` — links visible on
 * load. The homepage is the one route that composes Navbar itself with
 * `variant="hero"`.
 *
 * The visible trail and the BreadcrumbList JSON-LD are both rendered from
 * `trail`, so structured data cannot drift from what the user sees. `Home` is
 * prepended if the caller left it out, and dropped again before `breadcrumbLd`,
 * which prepends its own.
 */

const HOME: Crumb = { label: 'Home', href: '/' }

export interface PageShellProps {
  /** Ancestors then the current page. The last crumb carries no `href`. Pass `[]` on `/`. */
  crumbs: Crumb[]
  children: ReactNode
}

export default function PageShell({ crumbs, children }: PageShellProps) {
  const trail = crumbs.length && crumbs[0].href !== '/' ? [HOME, ...crumbs] : crumbs

  return (
    <>
      {/* focus-visible:, not focus: — `focus:` fires on mouse click (Rule 6), and
          a keyboard Tab is the only way to reach an sr-only element anyway. */}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-surface focus-visible:px-4 focus-visible:py-3 focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="pt-[calc(var(--nav-h)+1rem)]">
        {trail.length > 1 && (
          <div className="mx-auto max-w-6xl px-4 pt-4 pb-2 sm:px-6 lg:px-8">
            <Breadcrumbs items={trail} />
            <JsonLd data={graphLd(breadcrumbLd(trail.slice(1).map((c) => ({ name: c.label, path: c.href }))))} />
          </div>
        )}
        {children}
      </main>

      <Footer />
    </>
  )
}
