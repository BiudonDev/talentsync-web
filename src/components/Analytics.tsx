import { CONSENT_DEFAULTS_JS } from '@/lib/analytics'
import ConsentBanner from './ConsentBanner'

/**
 * LIVE since 21 September 2026 (GA4 property G-4D9N8H4S48). Mounted first in
 * <body> by src/app/layout.tsx; the footer's "Cookie settings" anchor reopens
 * the banner. /privacy/ §4 and /cookies/ describe exactly this package.
 *
 * The single mount point for the whole analytics package. Mount it FIRST in
 * <body> in src/app/layout.tsx:
 *
 *   import Analytics from '@/components/Analytics'
 *   <body><Analytics />{children}</body>
 *
 * First in <body> is load-bearing twice over: the Consent Mode defaults must
 * execute before anything else on the page, and the banner is visually pinned
 * to the bottom, so DOM order is the only thing that puts it on the first Tab.
 *
 * SERVER component (rule 10). The defaults script is markup, not JavaScript we
 * ship — it costs zero bytes of client bundle and runs during HTML parse, which
 * is the only way to guarantee it precedes any injected gtag.js. 'use client'
 * lives on the leaf, ConsentBanner.
 */
export default function Analytics() {
  return (
    <>
      {/* Same pattern as JsonLd.tsx: a native inline <script> in a server
          component, rendered in place, executed while parsing. */}
      <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_JS }} />
      <ConsentBanner />
    </>
  )
}
