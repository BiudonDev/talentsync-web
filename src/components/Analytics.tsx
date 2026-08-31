import { CONSENT_DEFAULTS_JS } from '@/lib/analytics'
import ConsentBanner from './ConsentBanner'

/**
 * DORMANT — nothing imports this file today, so none of it ships.
 *
 * No GA4 property exists, so there is no measurement ID; publishing a cookie
 * policy that describes analytics which does not run would document processing
 * the company does not perform. The mount in src/app/layout.tsx is commented
 * out, and that comment is the single switch: uncomment it, put the real ID in
 * GA_MEASUREMENT_ID in src/lib/analytics.ts, and the whole package — Consent
 * Mode v2 defaults, gated gtag.js, banner, the three conversion events — is
 * live again. Nothing here was cut for the pause; it is correct and finished.
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
