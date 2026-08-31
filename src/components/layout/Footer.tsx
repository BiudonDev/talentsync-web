import Link from 'next/link'
import { siteConfig } from '@/data/content'
import { companyNav, legalNav, servicesNav } from '@/data/routes'

/**
 * Server component. The old footer was a client component only for the deleted
 * single-page scroll helper and a scroll-to-top button, so this drops React
 * state and framer-motion out of the shared chunk on all 20 routes.
 *
 * This is also the site's internal-link map: it is how the 20 routes get
 * discovered and how link equity reaches /b2b-engineer-recruitment/ and
 * /hourly-engineering-talent/, which had zero site-wide links. `draft: true`
 * routes cannot appear here — servicesNav filters them in src/data/routes.ts,
 * and companyNav/legalNav contain none.
 *
 * Stacked columns, never accordions (§4.9): an accordion means useState in
 * shared chrome on every route to solve a problem two columns already solve.
 *
 * `prefetch={false}` on every internal <Link> in the codebase, and this is the
 * file that made it necessary. Next prefetches a route's whole RSC payload when
 * the link scrolls into view, so one scroll to the bottom of `/` pulled 72
 * payloads / 1,371,029 B on top of a 327,233 B page — 5x the 320 KB budget,
 * with __next.terms.__PAGE__.txt alone at 238,857 B. `out/` ships 194 of these
 * files, 4,869,827 B, 35% of the export. On a static export the payload is a
 * flat file either way; this just fetches it on click instead of on sight.
 */

const COLUMNS = [
  { id: 'footer-services', title: 'Services', links: servicesNav },
  { id: 'footer-company', title: 'Company', links: companyNav },
  { id: 'footer-legal', title: 'Legal', links: legalNav },
]

// Not <h2>/<h3>: the §2.3 type scale legislates one string per heading level and
// the caption role is not one of them, and three extra headings per route dilute
// the outline Rule 5 protects. aria-labelledby names the nav landmark instead.
const CAPTION = 'text-xs font-medium uppercase tracking-wide text-text-secondary'
const LINK =
  'flex min-h-11 items-center rounded-lg text-sm text-text-secondary hover:text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.id} aria-labelledby={col.id}>
              <p id={col.id} className={CAPTION}>
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((r) => (
                  <li key={r.path}>
                    <Link href={r.path} prefetch={false} className={LINK}>
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* NAP — byte-identical to the Organization JSON-LD in src/lib/schema.ts
            (D5). Schema that contradicts visible content gets ignored, so if one
            of these strings changes, change it in both places. */}
        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl font-bold text-gradient sm:text-2xl">{siteConfig.name}</p>
            <address className="mt-2 space-y-2 text-sm text-text-secondary not-italic">
              <span className="block py-1">{siteConfig.location}</span>
              <a href={`mailto:${siteConfig.email}`} className={LINK}>
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={LINK}>
                {siteConfig.phone}
              </a>
            </address>
          </div>

          <div className="flex flex-col gap-1 text-sm text-text-secondary sm:items-end">
            {/* DORMANT with ConsentBanner, for the same reason and by the same
                switch — see the comment on the commented-out <Analytics /> mount
                in src/app/layout.tsx.

                This is a plain anchor intercepted by ConsentBanner's delegated
                listener, which is what let the footer stay a server component.
                While the banner is unmounted nothing listens for it and no
                element carries id="cookie-settings", so rendering it puts a dead
                control on all 32 routes — and cookies.ts §7 says in the shipped
                policy that there is "no banner to reopen" and that a "Cookie
                settings" control "will appear on every page" only IF we ever add
                something that needs consent. Shipping the control today
                contradicts the document.

                TO BRING IT BACK: uncomment the anchor below. Do it in the SAME
                release as step 2 of the layout.tsx switch — the banner and this
                link are one feature, and either one alone is a broken promise. */}
            {/* <a href="#cookie-settings" className={LINK}>
              Cookie settings
            </a> */}
            <a href="#main" className={LINK}>
              Back to top
            </a>
            <p className="py-1">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
