/**
 * The consent record. Pure parsing, separated from the DOM so it can be checked
 * without a browser (see the self-check in the C11 handover notes).
 *
 * What the SHIPPED legal copy already promises, and what this file therefore has
 * to be true to:
 *  · `ts_consent`, local storage, strictly necessary — cookies.ts Table A.
 *  · "Until you clear it, or 6 months, whichever comes first" — cookies.ts Table A.
 *  · "Created only after you make a choice" — nothing is written on page load.
 *  · "Refusal is permanent until you change it. We do not re-prompt visitors who
 *    have refused, other than once your recorded choice is more than 6 months
 *    old." — cookies.ts §7.
 *
 * Every failure mode here returns null, which means ASK AGAIN. It never means
 * "assume granted". That is the property worth protecting.
 */

export const CONSENT_KEY = 'ts_consent'

/** Bump when the policy changes materially: every stored record becomes stale
 *  and the banner re-asks. Cheaper and more honest than a migration. */
export const CONSENT_VERSION = 1

/** 6 months, per CNIL guidance and cookies.ts Table A. */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000

export type ConsentState = 'granted' | 'denied'

export interface Consent {
  state: ConsentState
  /** Epoch ms of the decision. */
  ts: number
  v: number
}

/** Pure. null = ask again (missing, malformed, wrong version, or expired). */
export function parseConsent(raw: string | null, now: number): Consent | null {
  if (!raw) return null
  try {
    const c = JSON.parse(raw) as Partial<Consent>
    if (c.v !== CONSENT_VERSION) return null
    if (c.state !== 'granted' && c.state !== 'denied') return null
    if (typeof c.ts !== 'number' || !Number.isFinite(c.ts)) return null
    if (now - c.ts > CONSENT_MAX_AGE_MS || c.ts > now) return null
    return { state: c.state, ts: c.ts, v: c.v }
  } catch {
    return null
  }
}

/* Private mode, blocked site data and SSR all throw on the ACCESS itself, not
   only on the parse — so the try/catch has to wrap the localStorage call. */

export function readConsent(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY), Date.now())
  } catch {
    return null
  }
}

export function writeConsent(state: ConsentState): void {
  try {
    const record: Consent = { state, ts: Date.now(), v: CONSENT_VERSION }
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
  } catch {
    /* Storage refused. The choice still applies to this page view; we simply
       cannot remember it, so the banner asks again next time. Never a reason
       to fail loudly at the visitor. */
  }
}
