/**
 * GA4 behind Consent Mode v2, BASIC mode (DECISIONS D2).
 *
 * Basic mode = gtag.js is not on the page at all until the visitor accepts.
 * Advanced mode loads the tag first and sends cookieless pings, which stores
 * nothing but still hands every EU visitor's IP to Google before they agreed —
 * and privacy.ts §4.2 already states in the present tense that "before you
 * answer the consent banner, your browser contacts no server other than
 * talentsync.eu". Basic mode is what makes that sentence true.
 *
 * `anonymize_ip` is deliberately absent: it is a no-op in GA4 and claiming it
 * would be a false statement in the policy.
 */

/** Deploy blocker by design. validate-pages.mjs check 3c fails the build while
 *  any {{TOKEN}} survives into out/ — including into the client bundle. */
export const GA_MEASUREMENT_ID = '{{GA4_MEASUREMENT_ID}}'

export const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Consent Mode v2 defaults — every signal denied.
 *
 * Rendered as a plain inline <script> by the SERVER component in
 * src/components/Analytics.tsx, so it executes while the HTML is being parsed:
 * before hydration, and therefore long before anything can inject gtag.js.
 *
 * No `wait_for_update`: that only matters in advanced mode, where the tag is
 * already running and has to be told to hold. Here there is no tag to hold.
 */
export const CONSENT_DEFAULTS_JS =
  'window.dataLayer=window.dataLayer||[];' +
  'function gtag(){dataLayer.push(arguments)}' +
  'window.gtag=gtag;' +
  "gtag('consent','default',{" +
  "ad_storage:'denied'," +
  "ad_user_data:'denied'," +
  "ad_personalization:'denied'," +
  "analytics_storage:'denied'" +
  '});'

/** Module state, not a DOM probe: `track()` must be a no-op before consent even
 *  though window.gtag exists from the defaults script above. */
let enabled = false
let configured = false

/**
 * Grant or withdraw. Both directions take effect immediately, which is what
 * cookies.ts §7 and privacy.ts §13 promise. Withdrawal cannot unload a script
 * Google already served, but it stops collection — the exact wording used.
 *
 * The queued order after an accept is default -> update -> js -> config, and
 * gtag.js replays the dataLayer when it lands, so calling this before the tag
 * finishes loading is correct, not a race.
 */
export function setAnalyticsConsent(granted: boolean): void {
  enabled = granted
  window.gtag?.('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
  if (!granted || configured) return
  configured = true // re-accepting after a withdrawal must not double-count
  window.gtag?.('js', new Date())
  window.gtag?.('config', GA_MEASUREMENT_ID)
}

/**
 * The three conversions on a site with no form. No-op until consent, and no
 * visitor-supplied value is ever passed: `section` is our own DOM id.
 */
export function track(event: string, params: Record<string, string> = {}): void {
  if (!enabled) return
  window.gtag?.('event', event, params)
}
