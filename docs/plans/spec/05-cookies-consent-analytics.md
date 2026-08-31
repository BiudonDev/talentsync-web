# TalentSync — Cookie Policy + Consent & Analytics Implementation Plan

**Prepared 30 August 2026** · Repo: `/Users/adrianzabica/Desktop/talentsync-web` · Site: `https://talentsync.eu`

**The short version:** the site sets zero cookies today, so **no consent banner is legally required — and that is worth protecting**. Ship **Plausible Cloud (EU)**: cookieless, custom events, no banner, ~10 minutes. **Do not add GA4** — it is the single decision that conjures a banner into existence. Separately, self-host Montserrat via `next/font/google` (verified below: it downloads and self-hosts at build time), which removes the last third-party request from the page.

---
---

# PART 1 — Cookie Policy

> Publish at `https://talentsync.eu/cookies/`. Implementation: `src/app/cookies/page.tsx`, a plain server component (no `'use client'`), exporting `metadata`. `trailingSlash: true` makes `/cookies/` canonical. Link from `Footer.tsx`.
> `{{DOUBLE_BRACE}}` values must be filled before publishing — see Open Questions.

---

## Cookie Policy

**Effective date:** {{PUBLICATION_DATE}} · **Version:** 1.0
**Next scheduled review:** 28 February 2027, and in every case *before* any new script, tag or embed ships (see §11)

### 1. Who we are

This policy explains how **{{LEGAL_ENTITY_NAME}}** ("TalentSync", "we", "us"), registered in the Republic of Moldova under {{IDNO}}, registered office {{REGISTERED_ADDRESS}}, Chișinău, Republic of Moldova, uses cookies and similar technologies on **https://talentsync.eu** (the "Site").

It sits alongside our [Privacy Policy](/privacy/), which covers everything else we do with personal data — including candidate and client data. This policy is only about what happens in *your browser* when you visit the Site.

Questions: **victor@talentsync.eu**.
Our representative in the European Union under Article 27 GDPR is **{{EU_REPRESENTATIVE_NAME_AND_ADDRESS}}**.

### 2. What cookies and similar technologies are

A **cookie** is a small text file a website asks your browser to store, and which the browser sends back on later visits. Cookies are how a site recognises a returning browser.

"Similar technologies" means anything else that stores information on, or reads information from, your device:

| Technology | What it is |
|---|---|
| **Cookies** | Small text files stored by your browser and returned to the server on each request. |
| **Local storage / session storage** | Browser storage the site can read and write with JavaScript. Not sent automatically to a server. Local storage persists until cleared; session storage dies when the tab closes. |
| **Pixels / web beacons** | A 1×1 image or script whose only job is to tell a third party that you loaded a page. |
| **Device fingerprinting** | Building an identifier from your browser's characteristics (fonts, screen size, timezone) without storing anything. |
| **Server logs** | Records the web server keeps of requests it receives, including IP addresses. Not stored on your device, but still personal data. |

European law (Article 5(3) of the ePrivacy Directive 2002/58/EC, as implemented across the EU/EEA, and regulation 6 of PECR in the UK) requires your **consent** before storing anything on your device or reading anything from it — *unless* it is strictly necessary to deliver the service you asked for. That rule applies to all of the storage technologies above, not just cookies, and it applies whether or not the data is personal. Separately, the EU GDPR, the UK GDPR and Moldova's Law No. 195/2024 on personal data protection govern what we then do with any personal data involved.

### 3. Current status — this Site sets no cookies

**As of {{PUBLICATION_DATE}}, https://talentsync.eu sets no cookies at all, and stores nothing on your device except the one strictly-necessary item listed in §5.**

There is no advertising technology on this Site, no cross-site tracking, no data broker, no marketing pixel, and no cookie banner — because there is nothing to ask you about. We consider this a feature and intend to keep it. If that changes, this policy is updated *before* the change goes live, and if the change requires your consent you will be asked for it.

### 4. Strictly necessary vs. everything else

- **Strictly necessary** items are those without which the Site cannot do what you asked. They do not require consent, but we still tell you about them.
- **Everything else** — analytics, personalisation, advertising, social plugins — requires your prior, specific, informed and freely-given consent. Consent is never bundled into "continuing to browse", and refusing costs you nothing: every part of this Site works identically whether you accept or refuse. **We do not operate a cookie wall.**

### 5. Inventory — what is on this Site today

#### Table A — In use now

| Name | Provider | Purpose | Type | Duration |
|---|---|---|---|---|
| `ts_consent` | TalentSync (first party) | Records your cookie choice so we do not ask again on every page. Only created **after** you make a choice, and only if a consent banner exists on the Site (see Table C). | Local storage, strictly necessary | Until you clear it, or 6 months, whichever comes first |

That is the complete list. **No other cookie, pixel or storage item is set by this Site.**

#### Table B — Not cookies, but data still leaves your browser

These do not store anything on your device, so they do not need consent. They do involve processing your IP address, so we disclose them.

| What | Provider | What is transmitted | Legal position | Retention |
|---|---|---|---|---|
| **Web fonts** *(being removed — see note)* | Google Ireland Ltd / Google LLC | The Montserrat typeface is currently requested from `fonts.googleapis.com` and `fonts.gstatic.com`. That request necessarily discloses your IP address, user agent and the referring page to Google. Google sets **no cookie** in this flow. | Legitimate interests (Art 6(1)(f)) in rendering the site. We accept this is a weak basis — a German court (LG München I, 20 January 2022, case 3 O 17493/20) awarded damages against a site operator for exactly this. | Per Google's retention policy |
| **Web fonts (target state)** | TalentSync | The typeface is served from `talentsync.eu` itself. No third party is contacted, no IP is disclosed. | No transfer occurs | n/a |
| **Server logs** | TalentSync, hosted by Railway Corp. | Our web server records the requested URL, timestamp, IP address, user agent and referrer. | Legitimate interests (Art 6(1)(f)) in security and availability | {{LOG_RETENTION_DAYS}} days |
| **Calendly link-through** | Calendly LLC | When you click "Book a call" you leave this Site for `calendly.com`. Nothing is transmitted to Calendly until you click. Once you arrive, Calendly's own cookies apply under [Calendly's Cookie Notice](https://calendly.com/legal/cookie-notice) — they are not set by us and we cannot switch them off. | Calendly is the controller on its own site | Per Calendly |
| **`mailto:` / `tel:` links** | none | Clicking these hands off to your own mail or phone app. No request is made to any server. | n/a | n/a |

> **Note on fonts.** We are moving the typeface to our own server so that no visitor data reaches Google at all. When that ships, the first row of this table is deleted and the second replaces it. If you are reading this and the first row is still present, the migration has not yet completed.

#### Table C — Conditional: not present, would require consent

Nothing below is on the Site. Each row names the exact decision that would create it. If any of them ships, this policy is updated first and a consent banner appears.

| Name | Provider | Purpose | Type | Duration | **Trigger** |
|---|---|---|---|---|---|
| `_ga` | Google | Distinguishes one browser from another; the core Google Analytics identifier. | Third-party cookie, analytics | **2 years** | ⚠️ Only if we add Google Analytics 4 |
| `_ga_<STREAM_ID>` | Google | Persists session state for the specific GA4 data stream. | Third-party cookie, analytics | **2 years** | ⚠️ Only if we add GA4 |
| `_gid` | Google | Distinguishes browsers; a legacy Universal Analytics cookie that some `gtag.js` configurations still set. | Third-party cookie, analytics | **24 hours** | ⚠️ Only if we add GA4 and it emits it |
| `_gat_gtag_<ID>` | Google | Throttles the request rate to Google's servers. | Third-party cookie, analytics | **1 minute** | ⚠️ Only if we add GA4 |
| `_gcl_au` | Google | Conversion Linker — attributes an ad click to a later action. | Third-party cookie, advertising | **90 days** | ⚠️ Only if we run Google Ads or link AdSense |
| `__cf_bm` | Cloudflare (for Calendly) | Bot management for the Calendly widget. | Third-party cookie, strictly necessary *to Calendly* | **30 minutes** | ⚠️ Only if we **embed** Calendly instead of linking to it |
| `_calendly_session` | Calendly | Maintains the booking session inside the widget. | Third-party cookie, functional | Session / per Calendly's notice | ⚠️ Only if we embed Calendly |
| `bcookie` | LinkedIn | Browser identifier used by LinkedIn services. | Third-party cookie, advertising | **1 year** | ⚠️ Only if we add the LinkedIn Insight Tag |
| `bscookie` | LinkedIn | Secure browser identifier. | Third-party cookie, advertising | **1 year** | ⚠️ Only with the LinkedIn Insight Tag |
| `lidc` | LinkedIn | Data-centre routing. | Third-party cookie, functional | **24 hours** | ⚠️ Only with the LinkedIn Insight Tag |
| `li_sugr` | LinkedIn | Probabilistic identity matching for advertising. | Third-party cookie, advertising | **90 days** | ⚠️ Only with the LinkedIn Insight Tag |
| `UserMatchHistory` | LinkedIn | LinkedIn Ads ID synchronisation. | Third-party cookie, advertising | **30 days** | ⚠️ Only with the LinkedIn Insight Tag |
| `AnalyticsSyncHistory` | LinkedIn | Stores when a visitor was synced with LinkedIn's member data. | Third-party cookie, advertising | **30 days** | ⚠️ Only with the LinkedIn Insight Tag |
| `li_gc` | LinkedIn | Stores your consent choice for LinkedIn's non-essential cookies. | Third-party cookie, strictly necessary *to LinkedIn* | **6 months** | ⚠️ Only with the LinkedIn Insight Tag |

**Google Search Console** and **Bing Webmaster Tools** are search-engine reporting tools. We verify ownership of the domain using a **DNS TXT record** — a change to our domain's DNS settings, not to your browser. Neither tool sets any cookie on this Site and neither observes your visit. *(The one exception: Google Search Console can be verified by piggy-backing on a Google Analytics tag. We deliberately do not use that method.)*

**Our analytics.** We use a privacy-preserving analytics tool — {{ANALYTICS_PROVIDER}} — which measures aggregate page views **without cookies and without storing anything on your device**. It does not build a profile of you, does not follow you between websites, and does not retain your IP address. Because nothing is stored on or read from your device, European law does not require your consent for it; the momentary processing of your IP address relies on our legitimate interests in understanding whether our website works (Art 6(1)(f) GDPR / Law 195/2024 Art 6(1)(f)). You can object at any time by writing to victor@talentsync.eu, and any browser-level or network-level blocker will also stop it.

### 6. What happens when you click an external link

The Site links to `calendly.com`, `linkedin.com`, and `mailto:` / `tel:` addresses. Once you follow an external link you are on someone else's website under their privacy and cookie policies, which we do not control:

- Calendly — https://calendly.com/legal/cookie-notice
- LinkedIn — https://www.linkedin.com/legal/cookie-policy

We add campaign parameters (`utm_source=talentsync.eu` and similar) to our Calendly links so that Calendly can tell us which page a booking came from. Those parameters describe the *page*, not you, and contain no identifier for you.

### 7. Changing or withdrawing your consent

Consent must be as easy to withdraw as it was to give.

- **If a consent banner is present on this Site**, a **"Cookie settings"** link sits in the footer of every page. Click it, and the banner reopens with your current choice; change it and it takes effect immediately.
- **Clearing your browser's storage for `talentsync.eu`** erases the `ts_consent` record and you will be asked again on your next visit.
- **Refusal is permanent until you change it.** We do not re-prompt visitors who have refused, other than once your recorded choice is more than 6 months old.
- **Cookies already set by a third party** before you withdrew consent are not deleted by withdrawing — withdrawal stops the collection. Use the browser instructions in §8 to delete what is already there.

### 8. Controlling cookies in your browser

Every major browser lets you block or delete cookies, and block third-party cookies specifically. Blocking all cookies will break many websites; this one will keep working.

- **Google Chrome** (desktop): ⋮ → Settings → Privacy and security → Third-party cookies (and → Delete browsing data to clear existing ones). Help: https://support.google.com/chrome/answer/95647
- **Chrome (Android)**: ⋮ → Settings → Privacy and security → Third-party cookies.
- **Safari (macOS)**: Safari → Settings → Privacy → *Prevent cross-site tracking*; Manage Website Data to remove stored data. Help: https://support.apple.com/en-gb/guide/safari/sfri11471/mac
- **Safari (iOS/iPadOS)**: Settings app → Apps → Safari → *Prevent Cross-Site Tracking*; Clear History and Website Data. Help: https://support.apple.com/en-gb/105082
- **Mozilla Firefox**: ☰ → Settings → Privacy & Security → Enhanced Tracking Protection (set to *Strict*) and Cookies and Site Data. Help: https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop
- **Microsoft Edge**: ⋯ → Settings → Cookies and site permissions → Manage and delete cookies and site data. Help: https://support.microsoft.com/microsoft-edge
- **Brave**: ☰ → Settings → Shields → Block cookies (third-party cookies are blocked by default).
- **Opera**: ☰ → Settings → Privacy & security → Cookies and other site data.

**Global Privacy Control and Do Not Track.** We do not track you across websites, so there is nothing for these signals to switch off here. Should we ever deploy anything that responds to them, we will honour GPC as a valid objection and say so in this policy.

### 9. What we do not do

We do not sell your personal data. We do not share it with advertising networks or data brokers. We do not track you across other websites. We do not fingerprint your device. We do not use a cookie wall or make access conditional on consent. We do not use analytics data to make automated decisions about you.

### 10. Your rights

Under the GDPR, the UK GDPR and Moldova's Law No. 195/2024 you have the rights of access, rectification, erasure, restriction, portability, and objection to processing based on legitimate interests. Exercise them at **victor@talentsync.eu**; see the [Privacy Policy](/privacy/) for the detail.

You can also complain to a supervisory authority:

- **Moldova** — Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP), 48 Serghei Lazo Street, MD-2004 Chișinău · +373 22 820 801 · centru@datepersonale.md · https://datepersonale.md
- **EU/EEA** — your national data protection authority, or the authority where our EU representative is established.
- **United Kingdom** — the Information Commissioner's Office, https://ico.org.uk

### 11. Changes and review

This policy is reviewed on a fixed schedule and on every relevant change:

- **Scheduled review:** every six months. **Next review: 28 February 2027.**
- **Event-driven review — mandatory, before deployment:** adding any analytics, tag manager, advertising pixel, chat widget, A/B testing tool, video embed, map embed, font CDN, or **embedded** (as opposed to linked) Calendly widget. The rule for the engineering team is simple: *if a new third-party domain appears in the network tab, this page is out of date and must be updated before release.*

Material changes are announced by updating the effective date and version at the top of this page. Where a change requires consent, we ask for it before the change takes effect.

**Version history:** v1.0 — {{PUBLICATION_DATE}} — first publication.

---
---

# PART 2 — Consent & Analytics Implementation Plan

Constraints this plan is engineered around: `output: 'export'`, no server, no route handlers, one page, nginx serving static files on Railway. Everything below runs at build time or in the browser.

## 2.1 Is a consent banner legally required? Right now, no.

**The trigger is Article 5(3) ePrivacy, not GDPR.** Consent is required for *storing information on, or gaining access to information stored in, a user's terminal equipment*, unless that storage is strictly necessary for a service the user explicitly requested. The test is about **storage on the device**, and it is technology-neutral — cookies, `localStorage`, `IndexedDB`, cache-based identifiers all count, and it applies whether or not the stored value is personal data.

Applied to the current codebase:

| Thing on the page | Stores/reads on device? | Banner? |
|---|---|---|
| React/Next.js runtime, Framer Motion, static assets | No | No |
| Navigation (`scrollToSection`, no links, no state) | No | No |
| `mailto:` / `tel:` links | No | No |
| Calendly as an outbound **link** | No — nothing happens until you leave the site | No |
| Google Fonts hotlink in `globals.css` | **No storage** — but it does send every EU visitor's IP to Google | **No banner. Different problem** — see 2.3 |

**Conclusion: there is nothing on this site that requires a consent banner, and adding one now would be actively wrong** — a banner asking permission for cookies that do not exist is misleading and trains users to click through.

**The exact thing that creates the requirement:** adding **Google Analytics 4**. GA4 writes `_ga` and `_ga_<STREAM_ID>` to the visitor's device on first pageview. That is Article 5(3) storage, it is not strictly necessary, and therefore it requires **prior** consent — the cookies must not be written until the visitor clicks Accept. The same trigger fires for: the LinkedIn Insight Tag, Google Ads / Google Tag Manager, an **embedded** Calendly widget (its iframe sets `__cf_bm` and `_calendly_session` as soon as it loads), Hotjar/Clarity, Intercom/Crisp, and any YouTube embed not using `youtube-nocookie.com`.

**Corollary: keep Calendly as a link, not an embed.** The current `<a href="https://calendly.com/...">` costs you nothing legally. Swapping it for the inline or popup widget imports third-party cookies into your page and single-handedly forces a banner. That is a large compliance bill for a modest UX gain.

Note the one thing a cookieless setup does *not* exempt you from: processing an IP address is still processing personal data under GDPR/Law 195. It needs a lawful basis (legitimate interests), a line in the privacy notice, and an honoured right to object. It does not need a banner.

## 2.2 Options, compared honestly

| | **(a) Cookieless analytics** — Plausible Cloud EU / self-hosted Umami | **(b) GA4 + Consent Mode v2 + CMP** | **(c) Cloudflare Web Analytics** |
|---|---|---|---|
| **Cost** | Plausible Cloud ~€9/mo at your traffic; Umami self-hosted on Railway ~$5/mo infra; Umami Cloud free tier available | GA4 free; CMP free tier (Cookiebot ≤50 pages, CookieYes) or €0 self-built | **Free** |
| **Consent banner needed?** | **No** — nothing is written to or read from the device | **Yes, unavoidably** | **No** |
| **Cookies set** | None | `_ga`, `_ga_*` (2 years each), possibly `_gid`, `_gat_*` | None |
| **Custom events** (Calendly click, mailto, tel) | **Yes** — `window.plausible(...)` / `umami.track(...)`, plus automatic outbound-link tracking | Yes | **No.** Pageviews and referrers only |
| **Where data lives** | Plausible: Germany (EU only, no transfer). Umami self-hosted: your Railway project | Google LLC, US. Requires the EU–US Data Privacy Framework as the transfer basis and a Google Ads Data Processing Terms acceptance | Cloudflare Inc., US. DPA + transfer mechanism required |
| **Feeds Google Search Console?** | No native link — but **GSC is a separate product you use directly, and it is unaffected by this choice** | Yes: GA4 ⇄ GSC linking puts landing-page + query in one report | No |
| **Effort on a static export** | One `<script defer>` in `layout.tsx` | Consent Mode defaults inline in `<head>`, gated loader, CMP integration, banner UI, testing accept/reject/withdraw paths | One `<script defer>` |
| **What breaks if consent is refused** | n/a — no consent needed, so measurement is 100% complete | Roughly 40–70% of your traffic disappears from the data | n/a |
| **Ship time** | ~10 minutes (Plausible) / ~1 hour (self-hosted Umami) | ~1–2 days including QA and policy work | ~10 minutes |

### What you actually lose by not using GA4

1. **GA4 ⇄ Search Console linked reports** — landing page and search query in one table. Real, and the only genuine loss. Mitigation: read GSC directly; it holds the full data either way.
2. **Google Ads conversion import and remarketing audiences.** Only matters if you run Google Ads. You do not, and your proven channel is ChatGPT.
3. **Google Signals demographics and interests.** Requires consent anyway, so with a banner you would get it for maybe 40% of visitors — statistically useless at your volume.
4. **BigQuery raw export, Explorations, path/funnel analysis.** Enterprise features for a one-page brochure site.
5. **Familiarity.** Everyone has a GA login.

Against those: with a banner, GA4 measures only the visitors who consented. Plausible measures **all** of them. For a site whose entire funnel is "read the page → click Book a call or email Victor", complete data on three events beats partial data on forty.

### 🏆 Recommendation

**Plausible Cloud, EU region, plus Google Search Console and Bing Webmaster Tools. No GA4. No banner. No CMP.**

Why this and not the alternatives:

- It is the only option that gives you **conversion events without a banner**. Cloudflare Web Analytics is free but has no custom events, which fails your own stated requirement — you would not be able to measure Calendly clicks at all.
- Plausible Cloud is hosted in Germany on EU infrastructure, so there is **no Chapter V transfer to paper** — no SCCs, no DPF reliance, no transfer impact assessment. Sign their DPA and you are done.
- Not self-hosting: Umami on Railway is cheaper and arguably purer, but it is a database you now own, back up and patch. €9/mo to not run a Postgres is the correct trade for a ten-person recruiter.
- **The compliance win is strategic, not just tactical.** A cookie-free B2B site is a differentiator when your buyers are European CTOs, and a page that says "no cookies, no banner, here's why" is a credibility asset. Once you install GA4 you can never make that claim again.

**Fallback if the budget is genuinely zero:** self-hosted Umami on Railway (same platform you already deploy to, same Docker workflow, custom events included). **Do not** fall back to Cloudflare Web Analytics unless you are prepared to abandon conversion tracking.

## 2.3 Self-hosting Montserrat — the exact edits

**Verified against the installed package, not from memory.** `next/font/google` fetches the CSS and the font binaries **at build time** and emits them into your own build output:

- `node_modules/next/dist/compiled/@next/font/dist/google/fetch-css-from-google-fonts.js` and `fetch-font-file.js` — the build-time fetchers.
- `node_modules/next/dist/build/webpack/loaders/next-font-loader/index.js:64` — comment reads: *"Emit font files to .next/static/media as [hash].[ext]."*
- `font-data.json` confirms Montserrat exposes a variable `wght` axis 100–900 and `latin` / `latin-ext` / `cyrillic` subsets.

**So yes — `next/font/google` already solves the IP-transfer problem.** At runtime the browser makes zero requests to `fonts.googleapis.com` or `fonts.gstatic.com`; it fetches a `.woff2` from `talentsync.eu/_next/static/media/`. There is no need for `next/font/local` and no need to commit binaries. The only situation that would force `next/font/local` is a build environment with no outbound HTTPS to Google — your Docker build stage runs `npm run build` on Railway with network access, so this does not apply. If a future air-gapped build breaks, that is the fallback.

Use the **variable** font (omit `weight`): one file covers 400–800 instead of five separate files.

**Edit 1 — `src/app/globals.css`**

Delete line 1 entirely:

```diff
-@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
 @import "tailwindcss";
```

And point the theme token at the injected CSS variable:

```diff
   /* Typography */
-  --font-sans: 'Montserrat', system-ui, sans-serif;
+  --font-sans: var(--font-montserrat), system-ui, sans-serif;
```

`@theme inline` is what makes this work: `inline` means Tailwind emits `var(--font-montserrat)` at the point of use rather than resolving it at build time, so the value `next/font` injects on `<html>` wins. Do not change `inline` to plain `@theme`.

**Edit 2 — `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'], // latin-ext = Romanian ă î â ș ț
  display: 'swap',
  variable: '--font-montserrat',
})

// ...metadata unchanged...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Verify it actually worked** (do not trust the diff — this is the whole point of the change):

```bash
npm run build
grep -rn "fonts.googleapis\|fonts.gstatic" out/   # must print NOTHING
ls out/_next/static/media/*.woff2                 # must list the Montserrat file(s)
```

If `grep` prints anything, a font URL survived somewhere and the exposure is still live.

**Bonus, same file, 30 seconds — kill the soft-404.** `nginx.conf` currently ends `location /` with `/index.html`, so every unknown URL returns HTTP 200 with the homepage. Search Console will index garbage URLs and report duplicate-content problems. Next already emits `out/404.html`:

```diff
     location / {
-        try_files $uri $uri.html $uri/ /index.html;
+        try_files $uri $uri.html $uri/ =404;
     }
+    error_page 404 /404.html;
```

## 2.4 If a banner is needed anyway — the minimal static-export implementation

Only build this if the recommendation is overruled and GA4 ships. It is four small files, no CMP subscription, no dependency beyond what is already installed.

**Design rules baked in:** Reject is one click and visually equal to Accept; nothing is blocking (no overlay, no scroll lock, no cookie wall); the analytics script is not injected until consent; the component is mounted **first in `<body>`** so keyboard users reach it on the first Tab despite it being visually pinned to the bottom; consent expires after 6 months per CNIL guidance.

**`src/lib/consent.ts`** — pure logic, separated so it can be checked without a browser:

```ts
export const CONSENT_KEY = 'ts_consent'
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000 // 6 months (CNIL)

export type Consent = { state: 'granted' | 'denied'; ts: number; v: 1 }

/** Pure. null = ask again (missing, malformed, wrong version, or expired). */
export function parseConsent(raw: string | null, now: number): Consent | null {
  if (!raw) return null
  try {
    const c = JSON.parse(raw) as Partial<Consent>
    if (c.v !== 1) return null
    if (c.state !== 'granted' && c.state !== 'denied') return null
    if (typeof c.ts !== 'number' || now - c.ts > CONSENT_MAX_AGE_MS) return null
    return c as Consent
  } catch {
    return null
  }
}

export const readConsent = (): Consent | null =>
  typeof window === 'undefined'
    ? null
    : parseConsent(localStorage.getItem(CONSENT_KEY), Date.now())

export const writeConsent = (state: Consent['state']) =>
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ state, ts: Date.now(), v: 1 }))
```

**`src/lib/analytics.ts`** — gated GA4 loader plus the event helper:

```ts
const GA_ID = '{{GA4_MEASUREMENT_ID}}'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (e: string, o?: { props?: Record<string, string> }) => void
  }
}

/** Consent Mode v2 defaults. Must run in <head> BEFORE gtag.js loads. */
export const CONSENT_DEFAULTS = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;
gtag('consent','default',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'denied',wait_for_update:500
});`

export function loadAnalytics() {
  if (document.getElementById('ga4')) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    return
  }
  const s = document.createElement('script')
  s.id = 'ga4'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
  window.gtag?.('js', new Date())
  window.gtag?.('config', GA_ID)
}

/** Works with whichever provider is loaded; no-ops if none is. */
export function track(event: string, props: Record<string, string> = {}) {
  window.plausible?.(event, { props })
  window.gtag?.('event', event.toLowerCase().replace(/\s+/g, '_'), props)
}
```

> **Use *basic* Consent Mode, not advanced.** Advanced mode loads `gtag.js` before consent and sends cookieless pings — no device storage, but every visitor's IP still reaches Google before they have agreed to anything, and German supervisory authorities are hostile to it. Basic mode (above: script not injected until Accept) is simpler and defensible. You forfeit Google's conversion modelling, which requires traffic volume you do not have.
>
> Also: `anonymize_ip` is a no-op in GA4 — do not add it and do not claim it in the policy.

**`src/components/CookieConsent.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { readConsent, writeConsent, type Consent } from '@/lib/consent'
import { loadAnalytics } from '@/lib/analytics'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const c = readConsent()
    if (!c) setOpen(true)
    else if (c.state === 'granted') loadAnalytics()

    const reopen = () => setOpen(true)
    window.addEventListener('ts:cookie-settings', reopen)
    return () => window.removeEventListener('ts:cookie-settings', reopen)
  }, [])

  const decide = (state: Consent['state']) => {
    writeConsent(state)
    setOpen(false)
    if (state === 'granted') loadAnalytics()
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cc-title"
      aria-describedby="cc-body"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 px-4 py-5 sm:px-6',
        'bg-surface border-t border-neutral-800 shadow-lg'
      )}
    >
      <div className="section-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 id="cc-title" className="font-semibold text-text-primary">
            Cookies
          </h2>
          <p id="cc-body" className="mt-1 text-sm text-text-secondary">
            We&apos;d like to use Google Analytics to see how the site is used. It stores
            cookies on your device for up to two years. The site works exactly the same
            whether you accept or reject.{' '}
            <a
              href="/cookies/"
              className="text-primary underline underline-offset-2 hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
            >
              Cookie policy
            </a>
          </p>
        </div>

        {/* Equal prominence: same size, same weight, same click cost. */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide('denied')}
            className={cn('btn-secondary', 'px-6 py-2.5 text-sm w-full sm:w-auto')}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className={cn('btn-primary', 'px-6 py-2.5 text-sm w-full sm:w-auto')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Wire it up in `src/app/layout.tsx`** — banner first in `<body>` for tab order, Consent Mode defaults in `<head>` before anything else:

```tsx
<html lang="en" className={montserrat.variable}>
  <head>
    <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />
  </head>
  <body>
    <CookieConsent />
    {children}
    <Analytics />
  </body>
</html>
```

**Footer re-opener** — one line in `Footer.tsx`, satisfying "withdraw as easily as you gave":

```tsx
<button
  type="button"
  onClick={() => window.dispatchEvent(new Event('ts:cookie-settings'))}
  className="text-sm text-text-secondary hover:text-primary transition-colors"
>
  Cookie settings
</button>
```

**The one runnable check** — `scripts/consent-check.ts`, run with `node --experimental-strip-types scripts/consent-check.ts` (your local Node is v25, so plain `node scripts/consent-check.ts` also works; Node ≥22.6 required):

```ts
import assert from 'node:assert/strict'
import { parseConsent, CONSENT_MAX_AGE_MS } from '../src/lib/consent.ts'

const now = Date.UTC(2026, 7, 30)
const rec = (o: object) => JSON.stringify(o)

assert.equal(parseConsent(null, now), null, 'no record -> ask')
assert.equal(parseConsent('{not json', now), null, 'garbage -> ask')
assert.equal(parseConsent(rec({ state: 'granted', ts: now, v: 0 }), now), null, 'old schema -> ask')
assert.equal(parseConsent(rec({ state: 'yes', ts: now, v: 1 }), now), null, 'bad state -> ask')
assert.equal(parseConsent(rec({ state: 'granted', ts: now - CONSENT_MAX_AGE_MS - 1, v: 1 }), now), null, 'expired -> ask')
assert.equal(parseConsent(rec({ state: 'denied', ts: now, v: 1 }), now)?.state, 'denied', 'refusal is honoured')
assert.equal(parseConsent(rec({ state: 'granted', ts: now - 1000, v: 1 }), now)?.state, 'granted')

console.log('consent logic ok')
```

Every failure mode here defaults to **ask again**, never to "assume granted" — that is the property worth protecting, and the reason the check exists.

**Manual QA before shipping a banner:** load in a private window and confirm no `_ga` cookie exists before clicking; click Reject and confirm no `_ga` appears and none appears on reload; click Accept and confirm `_ga` + `_ga_*` appear; reach both buttons with Tab alone and activate with Enter and Space; confirm the page scrolls and every CTA is clickable while the banner is open.

## 2.5 Search Console, Bing, and conversion tracking with no forms

### Google Search Console

**Verify with a DNS TXT record** on `talentsync.eu` — it creates a *Domain property* covering `http`, `https`, `www` and every subdomain at once, and it survives redeploys (an HTML file in `/public/` does too, but a DNS record cannot be accidentally deleted by a build change). **Do not use the "Google Analytics" verification method** — it makes your ownership proof depend on a tracker you may not have.

Then, in order: submit `https://talentsync.eu/sitemap.xml`; request indexing for the homepage; check Page Indexing after 48 hours. Since there is exactly one route, `src/app/sitemap.ts` and `src/app/robots.ts` both work under `output: 'export'` and are emitted as static files at build. Fix the nginx soft-404 (2.3) *before* submitting, or GSC will report every crawled junk URL as an indexable duplicate of the homepage.

### Bing Webmaster Tools

Use **Import from Google Search Console** — one OAuth click and it inherits verification, sitemaps and settings. Bing feeds Copilot and DuckDuckGo, so this is not optional given your buyers. Sets no cookies on your site.

### Conversion tracking with zero forms

Three signals matter: **Calendly click**, **email click**, **phone click**. One delegated listener covers all of them and requires no edits to the nine section components.

**`src/components/Analytics.tsx`**

```tsx
'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return

      const href = a.getAttribute('href') ?? ''
      const section = a.closest('section')?.id ?? 'unknown' // SectionWrapper renders <section id=...>

      if (href.startsWith('mailto:')) {
        const [addr, qs] = href.slice(7).split('?')
        const subject = new URLSearchParams(qs ?? '').get('subject') ?? ''
        // subject distinguishes the Careers "Apply" buttons by role
        track('Email click', { to: addr, subject, section })
      } else if (href.startsWith('tel:')) {
        track('Phone click', { section })
      } else if (href.includes('calendly.com')) {
        track('Booking started', { section })
      } else if (href.includes('linkedin.com')) {
        track('LinkedIn click', { section })
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
```

Mount `<Analytics />` in `layout.tsx` (it renders `null`; importing a `'use client'` component from the server layout is fine).

**Loading Plausible** — in `layout.tsx`:

```tsx
import Script from 'next/script'

<Script
  defer
  data-domain="talentsync.eu"
  src="https://plausible.io/js/script.outbound-links.tagged-events.js"
  strategy="afterInteractive"
/>
<Script id="plausible-init" strategy="afterInteractive">
  {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
</Script>
```

The `outbound-links` variant already auto-tracks the Calendly and LinkedIn clicks and uses `sendBeacon`, so the navigation race is handled for you. The listener above still earns its place because it adds **which section the click came from** and covers `mailto:`/`tel:`, which the auto-tracker does not.

**Calendly bookings — measure intent on your side, completion on theirs.**

You can only receive Calendly's `calendly.event_scheduled` postMessage if the widget is **embedded in your page**, and embedding is exactly what re-imports third-party cookies and forces a banner. Do not do it. Instead:

1. **Tag every Calendly link with UTMs, per placement**, in `src/data/content.ts`:
   `https://calendly.com/talentsync-meeting/30min?utm_source=talentsync.eu&utm_medium=cta&utm_campaign=site&utm_content=hero`
   (`utm_content=hero` / `contact` / `services` — one per CTA location). Calendly carries these into the booking record, so you can see which section produces bookings without any tracking on your side. These parameters describe the page, not the visitor.
2. **Track the outbound click** as `Booking started` — handled by the listener above.
3. **Read completions in Calendly's own dashboard**, matched by `utm_content`. For automation later, Calendly webhooks push `invitee.created` to any endpoint you own.

The honest trade-off: you measure **intent** on your site and **completion** in Calendly, joined by a UTM rather than by a cross-domain identifier. Booking-page conversion is typically 40–70%, so `Booking started` is a good proxy — and no third party learns anything about your visitors.

**For completeness**, if the widget is ever embedded, this is the listener — note the origin check, which is not optional:

```ts
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://calendly.com') return          // trust boundary
  if ((e.data as { event?: string })?.event === 'calendly.event_scheduled') {
    track('Booking completed')
  }
})
```

**Zero-JS alternative** for the primary CTA, using Plausible's tagged-events script: add `className="plausible-event-name=Booking+started"` to the Calendly `<Button>`. `Button.tsx` already merges `className` through `cn()`, so this works today with no new file. Use it if you decide even the delegated listener is more code than you want.

## 2.6 Ship order

| # | Task | Effort | Blocks |
|---|---|---|---|
| 1 | Self-host Montserrat (2.3) + verify `grep` returns nothing | 15 min | Removes the live Google-Fonts IP transfer |
| 2 | nginx `=404` + `error_page` (2.3) | 5 min | Must precede GSC submission |
| 3 | Sign up for Plausible Cloud EU, sign the DPA, add the two `<Script>` tags | 15 min | — |
| 4 | Add `src/components/Analytics.tsx`, mount in layout (2.5) | 20 min | Conversion tracking |
| 5 | UTM-tag Calendly links in `src/data/content.ts` | 10 min | Booking attribution |
| 6 | Publish `/cookies/` (Part 1) and `/privacy/`, link both from `Footer.tsx` | 1 hr | Legally required disclosure of §5 Table B |
| 7 | GSC domain property via DNS TXT, submit sitemap; import to Bing | 30 min | — |

**Total: under half a day, no banner, no CMP, no subscription beyond ~€9/month.** Section 2.4 stays in the drawer unless someone insists on GA4.


---

## OPEN QUESTIONS (business decisions required)


1. Legal entity details for the cookie policy header: registered company name, IDNO registration number, and registered address in Chișinău ({{LEGAL_ENTITY_NAME}}, {{IDNO}}, {{REGISTERED_ADDRESS}}).

2. Article 27 EU representative: who, and at what address? The policy names them in §1 and §10, and the research brief treats appointing one as non-negotiable. Romania or Poland recommended.

3. Analytics decision — confirm Plausible Cloud (EU) as recommended, or override with self-hosted Umami / Cloudflare Web Analytics / GA4. Everything downstream (banner or no banner, which cookie-policy tables ship, whether §2.4 gets built) hangs on this one answer. {{ANALYTICS_PROVIDER}} in the policy stays blank until it is made.

4. Calendly: confirm it stays an outbound link and is never embedded. Embedding imports third-party cookies and forces a consent banner — this is the second-biggest lever in the document after GA4.

5. Server log retention: how long does Railway keep nginx access logs on your plan, and do you want to keep them at all? {{LOG_RETENTION_DAYS}} must be a real number in the policy, or set `access_log off;` in nginx.conf and delete the row.

6. Confirm no LinkedIn Insight Tag, Google Ads tag, or Google Tag Manager container is planned. If any is, Table C rows activate and §2.4 must be built before it ships.

7. Calendly's exact cookie names and durations in §5 Table C are drawn from their published notice and were not verified live. Re-check https://calendly.com/legal/cookie-notice on the day of publication — only relevant if you ever embed.

8. Is there a privacy policy at /privacy/ yet? The cookie policy links to it four times; those links must not 404 on launch.

9. Publication date for {{PUBLICATION_DATE}} — set it to the actual deploy date, not today's date, and keep the 28 February 2027 review date.
