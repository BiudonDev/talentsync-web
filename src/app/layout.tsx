import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/Analytics'
import { graphLd, organizationLd, websiteLd } from '@/lib/schema'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import './globals.css'

/**
 * No `weight` array on purpose: omitting it pulls one variable file per subset
 * instead of five static faces per subset, and it replaces the globals.css
 * Google Fonts @import that cost 505 ms of FCP/LCP on 4x CPU + Slow 4G.
 *
 * BUDGET NOTE — fonts measure 103,732 B on every route, against §6's ≤ 45 KB.
 * The old comment here claimed dropping `weight` avoided that number; it did not,
 * and the coincidence hid a real overrun. What actually ships:
 *
 *   e8f2fbee2754df70-s.p.woff2   35,508 B  latin       preloaded
 *   a88409fdd7dc121c-s.woff2     68,224 B  latin-ext   fetched during layout
 *   (cyrillic 24,072 · cyrillic-ext 21,492 · vietnamese 10,620 — emitted into the
 *    CSS, self-hosted, and never requested: no page has a glyph in those ranges)
 *
 * `subsets` does NOT prune the @font-face set. next/font passes it only as the
 * preload filter (`findFontFilesInCss(css, preload ? subsets : undefined)` in
 * next/dist/compiled/@next/font/dist/google/loader.js); the CSS Google returns is
 * inlined whole. So latin-ext is downloaded whenever a glyph lands in its range,
 * and exactly three do, on all 33 pages: ă U+0103, ș U+0219, ț U+021B — Chișinău
 * in the footer NAP, and `răspundere limitată` in the legal copy. 68 KB for three
 * codepoints.
 *
 * Not fixable from here, and deliberately not fixed:
 *  · Dropping the diacritics is banned — D5 freezes one spelling everywhere.
 *  · Letting them fall to the fallback face swaps typeface mid-word in the NAP.
 *  · next/font/google has no `text` option in Next 16.1.3 (the validated option
 *    list is fontFamily/weights/styles/display/preload/selectedVariableAxes/
 *    fallback/adjustFontFallback/variable/subsets), so a three-glyph subset is
 *    not reachable without vendoring a hand-subset woff2.
 *
 * Do NOT "fix" this by adding 'latin-ext' to `subsets`. That preloads 68 KB into
 * LCP's bandwidth on every route to serve text that is below the fold. Left out
 * of the preload list, latin-ext is discovered during layout and never blocks
 * the LCP element, which carries no diacritics. The overrun is recorded against
 * §6 in docs/plans/BLOCKERS.md §4 rather than papered over here.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

/**
 * SITE-LEVEL ONLY. Anything page-specific here is inherited by `not-found.tsx`,
 * which is neither a layout nor a page module and so cannot export metadata to
 * override it — the 404 shell nginx serves for every typo (D9) was shipping the
 * HOMEPAGE title, description, og:title and og:url beside its own inline title,
 * and `robots: index, follow` beside the `noindex` Next injects for `/404`. Two
 * <title> tags and two contradictory robots metas, presenting the dead-link page
 * as a second copy of `/`.
 *
 * So: no `title`, no `description`, no `robots`, no per-page `openGraph` fields.
 * Every real route goes through `pageMeta()`, which returns a COMPLETE object
 * (D10) and now owns the indexing directives too. What is left below is true of
 * all 33 emitted documents including the shell.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // No `title.template` either. 01-architecture line 188 says none, and it was
  // inert regardless: pageMeta emits `title.absolute`, which bypasses templates.
  //
  // No `keywords`: Google ignores the tag, and unlike openGraph it DOES fall
  // through to every child segment, so one homepage keyword list would print on
  // all 24 routes.
  //
  // NO `alternates` key. A root-layout canonical is inherited by every segment
  // that does not override it, so a single route missing pageMeta() would
  // silently canonicalise itself to the homepage with no build error.
  // Canonical is set ONLY by pageMeta() in src/lib/seo.ts. `robots` is now set
  // there for exactly the same reason.
  //
  // These three ARE site-wide facts, and a child `openGraph` REPLACES this
  // object rather than merging with it, so no page can inherit a stale value.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next 16 no longer overrides `scroll-behavior: smooth`
    // during navigation unless the document opts in.
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth">
      <body>
        {/* FIRST in <body>, on purpose: the Consent Mode v2 defaults it renders
            must execute before anything else on the page, and the banner's DOM
            position is what puts Reject on the first Tab stop. The banner opens
            on the first visit to ANY route — this is the root layout — before
            gtag.js exists in the document (src/components/ConsentBanner.tsx). */}
        <Analytics />
        <JsonLd data={graphLd(organizationLd(), websiteLd())} />
        {children}
      </body>
    </html>
  )
}
