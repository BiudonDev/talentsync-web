'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { HiX } from 'react-icons/hi'
import { GA_SRC, setAnalyticsConsent, track } from '@/lib/analytics'
import { readConsent, writeConsent, type ConsentState } from '@/lib/consent'
import { cn } from '@/lib/utils'

/**
 * The consent banner. Mounted by `Analytics.tsx`, which the ROOT layout renders
 * first in <body>, so it appears on the visitor's first visit to any route —
 * before hydration finishes on the rest of the page, independently of any
 * click, and before gtag.js exists in the document (client feedback item 17).
 *
 * Behaviour, all of which /cookies/ §3–§7 and /privacy/ §4 describe:
 *  · opens when there is no valid `ts_consent` record (missing, malformed,
 *    wrong version, or older than 6 months);
 *  · "Accept analytics" and "Reject analytics" are IDENTICAL controls — same
 *    class, width, weight, one click — with Reject first in DOM order;
 *  · the close (×) control and the Escape key are a refusal and are STORED as
 *    one, so the visitor is not re-asked on the next page;
 *  · the footer's `<a href="#cookie-settings">Cookie settings</a>` reopens it
 *    with the current choice shown, on every route, via the delegated listener
 *    below, so the footer stays a server component;
 *  · gtag.js is rendered only while the choice is `granted`; withdrawing sends
 *    `consent update: denied` immediately and `track()` becomes a no-op.
 *
 * No framer-motion, no animation at all — a banner that fades in is a banner
 * that arrives after the decision it is asking about.
 */
const REOPEN_HREF = '#cookie-settings'

/**
 * localStorage is an external store, and `useSyncExternalStore` is React's own
 * way to read one: it serves the server snapshot during hydration and swaps in
 * the real value immediately after, so there is no markup mismatch and no
 * setState inside an effect.
 */
const SSR = 'ssr'
const subscribe = () => () => {}
const getStoredState = (): ConsentState | null => readConsent()?.state ?? null
const getServerState = () => SSR

const BUTTON = 'btn-secondary px-6 py-3 text-base sm:w-44'
const TEXT_LINK =
  'rounded-lg text-primary underline underline-offset-2 hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * role: a REGION, not a dialog. Focus is never stolen on load, nothing is
 * trapped, no overlay, no inert page, no cookie wall. A named <section> is a
 * landmark: reachable from the rotor, announced in reading order, and mounted
 * first in <body> so the first Tab lands on Reject.
 */
export default function ConsentBanner() {
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

  const decide = (state: ConsentState) => {
    writeConsent(state)
    setDecision(state)
    setOverride(false)
  }

  // While open: reserve the banner's height so it covers no content (the
  // footer is the bottom of every page), and let Escape dismiss it. Closing
  // without accepting IS a refusal and is stored as one (cookies.ts §4).
  useEffect(() => {
    const el = ref.current
    if (!open || !el) return

    const ro = new ResizeObserver(() => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`
    })
    ro.observe(el)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') decide('denied')
    }
    document.addEventListener('keydown', onKey)

    return () => {
      ro.disconnect()
      document.removeEventListener('keydown', onKey)
      document.body.style.paddingBottom = ''
    }
  }, [open])

  return (
    <>
      {/* Gated: the tag does not exist in the document until an affirmative
          accept. afterInteractive because this mounts post-hydration. */}
      {choice === 'granted' && <Script id="ga4" src={GA_SRC} strategy="afterInteractive" />}

      {open && (
        <section
          ref={ref}
          id="cookie-settings"
          tabIndex={-1}
          aria-labelledby="cookie-settings-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 pr-14 sm:px-6 sm:pr-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:pr-16">
            <div>
              <p id="cookie-settings-title" className="text-base font-semibold text-text-primary">
                We value your privacy
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                We use necessary cookies to operate the website and optional analytics cookies to
                understand how visitors use it. Analytics cookies will only be activated with your
                consent. Read our{' '}
                <Link href="/cookies/" prefetch={false} className={TEXT_LINK}>
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy/" prefetch={false} className={TEXT_LINK}>
                  Privacy Policy
                </Link>{' '}
                for more information.
              </p>
              {choice && (
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Your current choice:{' '}
                  <strong className="font-semibold text-text-primary">
                    {choice === 'granted' ? 'analytics accepted' : 'analytics rejected'}
                  </strong>
                  . Change it below, or withdraw at any time from the “Cookie settings” link in the
                  footer.
                </p>
              )}
            </div>

            {/* Equal prominence (D2), read the strict way: IDENTICAL controls.
                Reject is first in DOM order, so it is also the first Tab stop.
                "Manage preferences" (feedback item 17's third suggested control)
                is a plain link to the full inventory rather than a second panel:
                there is exactly one non-essential category today — analytics —
                and Accept/Reject already IS that choice, so a second toggle
                screen repeating the same on/off switch would be theatre. The
                link is real: /cookies/ Table A lists every cookie by name. */}
            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => decide('denied')} className={BUTTON}>
                  Reject analytics
                </button>
                <button type="button" onClick={() => decide('granted')} className={BUTTON}>
                  Accept analytics
                </button>
              </div>
              <Link href="/cookies/" prefetch={false} className={cn(TEXT_LINK, 'text-center text-sm')}>
                Manage preferences
              </Link>
            </div>
          </div>

          {/* Closing is a refusal, and is remembered as one. */}
          <button
            type="button"
            onClick={() => decide('denied')}
            aria-label="Close and reject analytics"
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <HiX aria-hidden className="size-5" />
          </button>
        </section>
      )}
    </>
  )
}
