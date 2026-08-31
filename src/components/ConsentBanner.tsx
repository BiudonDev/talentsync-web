'use client'

import Script from 'next/script'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { GA_SRC, setAnalyticsConsent, track } from '@/lib/analytics'
import { readConsent, writeConsent, type ConsentState } from '@/lib/consent'

/**
 * DORMANT with Analytics.tsx, its only parent — see the switch documented there
 * and in src/app/layout.tsx. Nothing is stored while analytics is off, and a
 * banner asking consent for storage that never happens is noise, so it does not
 * render. NOTE for whoever re-enables it: the footer's "Cookie settings" anchor
 * (src/components/layout/Footer.tsx) is the delegated re-open link below. It is
 * commented out there for the same reason — with this unmounted nothing listens
 * for it and no element carries id="cookie-settings", so it would be a dead
 * control on every route. Uncomment it in the same release as this one.
 *
 * The only client component in the analytics package. No framer-motion, no
 * animation at all — a banner that fades in is a banner that arrives after the
 * decision it is asking about.
 *
 * The "Cookie settings" entry point cookies.ts §7 promises is a PLAIN ANCHOR
 * anywhere on the site: <a href="#cookie-settings">Cookie settings</a>. The
 * delegated listener below intercepts it, so the footer stays a server
 * component and nobody has to import this file to re-open the banner.
 */
const REOPEN_HREF = '#cookie-settings'

/**
 * localStorage is an external store, and `useSyncExternalStore` is React's own
 * way to read one: it serves the server snapshot during hydration and swaps in
 * the real value immediately after, so there is no markup mismatch and no
 * setState inside an effect. The client snapshot is a primitive, so it is
 * referentially stable by construction and needs no cache; nothing outside this
 * tab writes the key, so `subscribe` is a no-op.
 */
const SSR = 'ssr'
const subscribe = () => () => {}
const getStoredState = (): ConsentState | null => readConsent()?.state ?? null
const getServerState = () => SSR

/**
 * role: this is a REGION, not a dialog.
 *
 * `role="dialog"` is a promise that focus lives inside the thing and that the
 * rest of the page is out of play. We deliberately do neither: focus is never
 * stolen on load, nothing is trapped, no overlay, no inert page, no cookie
 * wall. A non-modal "dialog" nobody focuses is announced as a dialog the
 * screen-reader user is not in, and browse-mode behaviour gets strange. A
 * named <section> is a region landmark: reachable from the landmark rotor,
 * announced in normal reading order, and mounted first in <body> so the first
 * Tab lands on Reject. That is the accurate description of what this is.
 */
export default function ConsentBanner() {
  // Replay of a stored choice. `SSR` until hydration, so the banner is absent
  // from the static HTML and a visitor who already answered never sees a flash
  // of it. No record / malformed / wrong version / older than 6 months -> ask.
  // Nothing is written here: cookies.ts Table A says ts_consent is "created
  // only after you make a choice".
  const stored = useSyncExternalStore(subscribe, getStoredState, getServerState)
  // Holds the choice when the storage write silently failed (private mode):
  // it still applies to this page view even when it cannot be remembered.
  const [decision, setDecision] = useState<ConsentState | null>(null)
  // null = follow the default: open only when there is no choice on record.
  const [override, setOverride] = useState<boolean | null>(null)
  const ref = useRef<HTMLElement>(null)

  const hydrated = stored !== SSR
  const choice = decision ?? (hydrated ? stored : null)
  const open = override ?? (hydrated && choice === null)

  // Sync the external system (gtag) with the current choice. Replay and fresh
  // decision take the identical path, in both directions.
  useEffect(() => {
    if (choice) setAnalyticsConsent(choice === 'granted')
  }, [choice])

  // One delegated listener, two jobs: the re-open link, and the three
  // conversions. track() is a no-op until consent, so this costs nothing when
  // the visitor refused. Capture phase, so a handler that stops propagation
  // cannot hide a click from us.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]')
      if (!a) return
      const href = a.getAttribute('href') ?? ''

      if (href === REOPEN_HREF) {
        e.preventDefault()
        setOverride(true)
        // Asked-for, so moving focus is correct here (unlike on load).
        requestAnimationFrame(() => ref.current?.focus())
        return
      }

      // SectionWrapper renders <section id=…>; 'page' when the link is in chrome.
      const section = a.closest('section')?.id || 'page'
      if (href.startsWith('mailto:')) track('email_click', { section })
      else if (href.startsWith('tel:')) track('phone_click', { section })
      else if (href.includes('calendly.com')) track('booking_click', { section })
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  // While open: reserve the banner's height so it covers no content (the
  // footer is the bottom of every page), and let Escape dismiss it. Dismissing
  // stores nothing, which IS a refusal — nothing loads — and matches cookies.ts
  // §4: "Closing the banner without choosing counts as a refusal."
  useEffect(() => {
    const el = ref.current
    if (!open || !el) return

    const ro = new ResizeObserver(() => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`
    })
    ro.observe(el)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverride(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      ro.disconnect()
      document.removeEventListener('keydown', onKey)
      document.body.style.paddingBottom = ''
    }
  }, [open])

  const decide = (state: ConsentState) => {
    writeConsent(state)
    setDecision(state)
    setOverride(false)
  }

  return (
    <>
      {/* Gated: the tag does not exist in the document until an affirmative
          accept. afterInteractive because this mounts post-hydration —
          beforeInteractive is meaningless for a script the user summons, and
          lazyOnload would defer past an already-fired load event. */}
      {choice === 'granted' && <Script id="ga4" src={GA_SRC} strategy="afterInteractive" />}

      {open && (
        <section
          ref={ref}
          id="cookie-settings"
          tabIndex={-1}
          aria-labelledby="cookie-settings-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
            <div>
              <p id="cookie-settings-title" className="text-base font-semibold text-text-primary">
                Cookies
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                We would like to load Google Analytics 4 to see which pages are useful. It stores
                cookies on your device. Nothing loads until you choose, the site is identical either
                way, and you can change your mind at any time.{' '}
                <a
                  href="/cookies/"
                  className="rounded-lg text-primary underline underline-offset-2 hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Cookie policy
                </a>
              </p>
              {choice && (
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Your current choice:{' '}
                  <strong className="font-semibold text-text-primary">
                    {choice === 'granted' ? 'analytics accepted' : 'analytics rejected'}
                  </strong>
                  .
                </p>
              )}
            </div>

            {/* Equal prominence (D2), read the strict way: IDENTICAL controls.
                Same class, same width, same height, same weight, same one
                click — not "a filled Accept next to an outlined Reject", which
                is the format asymmetry CNIL and the EDPB banner taskforce
                actually enforce against. Reject is first in DOM order, so it is
                also the first Tab stop. Both measure 44px+ and sit 12px apart. */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="btn-secondary px-6 py-3 text-base sm:w-40"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="btn-secondary px-6 py-3 text-base sm:w-40"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
