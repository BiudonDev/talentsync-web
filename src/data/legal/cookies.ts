import type { LegalDoc } from './types'

/**
 * Cookie Policy — PART 1 ONLY of docs/plans/spec/05-cookies-consent-analytics.md.
 * Part 2 of that document is an implementation plan for the consent-banner package
 * and is deliberately not on this page.
 *
 * Wave 2, 2026-08-31: ANALYTICS SHIPS OFF. No GA4 property exists, so there is no
 * measurement ID, nothing loads (layout.tsx does not mount <Analytics />), the site
 * stores nothing on a visitor's device, and ConsentBanner therefore does not render.
 * D2's consent-gated GA4 rewrite is reversed: describing a banner and four Google
 * cookies that do not exist would document processing the company does not perform.
 * So §3 states the no-storage position, §5 Table A is empty by fact, the GA4 rows
 * are gone from the live inventory, and §7 says there is no consent to withdraw.
 *
 * WHEN THE G-XXXXXXXXXX ID ARRIVES: re-enabling is one edit in src/app/layout.tsx
 * (uncomment the <Analytics /> mount and its import). This page must be updated in
 * the same change — §3, §4, §5 (Table A gains `ts_consent`, a live analytics table
 * returns), §7 and §8 all describe a site with no banner and must not ship stale.
 *
 * Every duration, provider and browser instruction below is the draft's own,
 * unchanged.
 */
export const cookies: LegalDoc = {
  slug: 'cookies',
  path: '/cookies/',
  label: 'Cookie Policy',
  h1: 'Cookie policy: talentsync.eu sets no cookies of its own',
  metaTitle: 'Cookie Policy',
  metaDescription:
    'talentsync.eu stores nothing on your device: no cookies, no analytics, no consent banner. What still leaves your browser, and what would change that.',
  version: '1.0',
  updated: '2026-08-30',
  lede: 'This policy is only about what happens in *your browser* when you visit talentsync.eu. Everything else we do with personal data — candidate data, client data — is in the [privacy policy](/privacy/).',
  body: [
    {
      k: 'p',
      t: '**Next scheduled review: 28 February 2027** — and in every case *before* any new script, tag or embed ships. See [§11](#c11).',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 1 */
    { k: 'h', level: 2, id: 'c1', t: '1. Who we are' },
    {
      k: 'p',
      t: 'This policy explains how **S.R.L. “UNQENERGY”** (IDNO 1020600034949), trading as “TalentSync” (“we”, “us”), registered in the Republic of Moldova, registered office at MD-2005, Chișinău Rîșcani, mun. Chișinău, Colina Pușkin 18, ap. (of.) 1, Republic of Moldova, uses cookies and similar technologies on **https://talentsync.eu** (the “Site”).',
    },
    {
      k: 'p',
      t: 'It sits alongside our [privacy policy](/privacy/), which covers everything else we do with personal data — including candidate and client data.',
    },
    {
      k: 'p',
      t: 'Questions go to Victor Uncuta at **[victor@talentsync.eu](mailto:victor@talentsync.eu)**. **We have not appointed a representative in the European Union under Article 27 GDPR.** We are assessing whether one is required and will publish the name, address and email here once appointed; until then, contact us directly, and see [§10](#c10) for the authorities you can complain to.',
    },

    /* ------------------------------------------------------------------ 2 */
    { k: 'h', level: 2, id: 'c2', t: '2. What cookies and similar technologies are' },
    {
      k: 'p',
      t: 'A **cookie** is a small text file a website asks your browser to store, and which the browser sends back on later visits. Cookies are how a site recognises a returning browser.',
    },
    {
      k: 'p',
      t: '“Similar technologies” means anything else that stores information on, or reads information from, your device:',
    },
    {
      k: 'table',
      head: ['Technology', 'What it is'],
      rows: [
        [
          '**Cookies**',
          'Small text files stored by your browser and returned to the server on each request.',
        ],
        [
          '**Local storage / session storage**',
          'Browser storage the site can read and write with JavaScript. Not sent automatically to a server. Local storage persists until cleared; session storage dies when the tab closes.',
        ],
        [
          '**Pixels / web beacons**',
          'A 1×1 image or script whose only job is to tell a third party that you loaded a page.',
        ],
        [
          '**Device fingerprinting**',
          'Building an identifier from your browser’s characteristics (fonts, screen size, timezone) without storing anything.',
        ],
        [
          '**Server logs**',
          'Records the web server keeps of requests it receives, including IP addresses. Not stored on your device, but still personal data.',
        ],
      ],
    },
    {
      k: 'p',
      t: 'European law — Article 5(3) of the ePrivacy Directive 2002/58/EC as implemented across the EU/EEA, and regulation 6 of PECR in the UK — requires your **consent** before storing anything on your device or reading anything from it, *unless* it is strictly necessary to deliver the service you asked for. That rule applies to all of the storage technologies above, not just cookies, and it applies whether or not the data is personal. Separately, the EU GDPR, the UK GDPR and Moldova’s Law No. 195/2024 govern what we then do with any personal data involved.',
    },

    /* ------------------------------------------------------------------ 3 */
    { k: 'h', level: 2, id: 'c3', t: '3. Current status — this Site stores nothing on your device' },
    {
      k: 'p',
      t: '**This Site sets no cookie of its own, and stores nothing else on your device either** — no local-storage key, no session-storage key, no pixel, no fingerprint. That is true on your first visit, on every visit after it, and whatever you click while you are here.',
    },
    {
      k: 'p',
      t: 'We run **no analytics at all**: no Google Analytics, no Plausible, no self-hosted alternative. There is no advertising technology on this Site, no cross-site tracking, no data broker, no marketing pixel, no chat widget, no heatmap, no session recording, no A/B testing tool and no social embed.',
    },
    {
      k: 'p',
      t: '**There is no consent banner, because there is nothing to consent to.** Consent is required before something is stored on or read from your device; we do neither, so asking would be theatre. **If we ever add analytics, we will update this policy first and ask for your consent before anything is stored** — and refusing will keep the Site working exactly as it does now.',
    },

    /* ------------------------------------------------------------------ 4 */
    { k: 'h', level: 2, id: 'c4', t: '4. Strictly necessary vs. everything else' },
    {
      k: 'ul',
      items: [
        '**Strictly necessary** items are those without which the Site cannot do what you asked. They do not require consent, but we still tell you about them.',
        '**Everything else** — analytics, personalisation, advertising, social plugins — requires your prior, specific, informed and freely-given consent. Consent is never bundled into “continuing to browse”, and refusing costs you nothing: every part of this Site works identically whether you accept or refuse. **We do not operate a cookie wall.**',
      ],
    },
    {
      k: 'p',
      t: 'Nothing on this Site currently falls into the second category, so nothing here is waiting on a decision from you. If that ever changes, refusing will be exactly as easy as accepting — the same screen, one click, no pre-ticked boxes — and closing the banner without choosing will count as a refusal.',
    },

    /* ------------------------------------------------------------------ 5 */
    { k: 'h', level: 2, id: 'c5', t: '5. Inventory — what is on this Site' },

    { k: 'h', level: 3, id: 'c5-a', t: 'A — Stored on your device: nothing' },
    {
      k: 'p',
      t: '**This table is empty, and that is the whole point of it.** There is no cookie, no local-storage key and no session-storage item set by talentsync.eu — not a strictly necessary one, not an optional one. Nothing to list, nothing to switch off, and nothing that survives after you close the tab.',
    },
    {
      k: 'p',
      t: 'Two consequences worth stating plainly. There is **no consent record**, because there is no consent to record. And there is **no analytics cookie**: no `_ga`, no `_gid`, no `_gat_*`, because no analytics runs here. If analytics is ever added, [Table C](#c5-c) is where it appears first, and this policy changes before it ships.',
    },

    {
      k: 'h',
      level: 3,
      id: 'c5-b',
      t: 'Table B — Not cookies, but data still leaves your browser',
    },
    {
      k: 'p',
      t: 'These store nothing on your device, so they need no consent. They do involve processing your IP address, so we disclose them.',
    },
    {
      k: 'table',
      head: ['What', 'Provider', 'What is transmitted', 'Legal position', 'Retention'],
      rows: [
        [
          '**Web fonts**',
          'TalentSync',
          'None. The Montserrat typeface is downloaded at build time and served from `talentsync.eu` itself. No request is made to `fonts.googleapis.com` or `fonts.gstatic.com`, and no third party learns your IP address from loading our type.',
          'No transfer occurs',
          'n/a',
        ],
        [
          '**Server logs**',
          'TalentSync, hosted by Railway Corp.',
          'Our web server records the requested URL, timestamp, IP address, user agent and referrer.',
          'Legitimate interests, Art 6(1)(f), in security and availability',
          '**30 days**',
        ],
        [
          '**Calendly link-through**',
          'Calendly LLC',
          'When you click “Book a call” you leave this Site for `calendly.com`. Nothing is transmitted to Calendly until you click. Once you arrive, Calendly’s own cookies apply under [Calendly’s cookie notice](https://calendly.com/legal/cookie-notice) — they are not set by us and we cannot switch them off.',
          'Calendly is the controller on its own site; our processor for the booking record it returns to us',
          'Per Calendly',
        ],
        [
          '**`mailto:` / `tel:` links**',
          'none',
          'Clicking these hands off to your own mail or phone app. No request is made to any server.',
          'n/a',
          'n/a',
        ],
      ],
    },

    {
      k: 'h',
      level: 3,
      id: 'c5-c',
      t: 'Table C — Conditional: not present, would require consent',
    },
    {
      k: 'p',
      t: 'Nothing below is on the Site. Each row names the exact decision that would create it. If any of them ships, this policy is updated first, a consent banner appears, and nothing is stored until you accept it.',
    },
    {
      k: 'table',
      head: ['Name', 'Provider', 'Purpose', 'Type', 'Duration', 'Trigger'],
      rows: [
        [
          '`_ga`, `_gid`, `_gat_*`',
          'Google',
          'Google Analytics 4 — distinguishes browsers, holds session state, throttles requests.',
          'Third-party cookies, analytics',
          '**Up to 2 years**',
          'Only if we add analytics — none runs today',
        ],
        [
          '`_gcl_au`',
          'Google',
          'Conversion Linker — attributes an ad click to a later action.',
          'Third-party cookie, advertising',
          '**90 days**',
          'Only if we run Google Ads or link AdSense',
        ],
        [
          '`__cf_bm`',
          'Cloudflare (for Calendly)',
          'Bot management for the Calendly widget.',
          'Third-party cookie, strictly necessary *to Calendly*',
          '**30 minutes**',
          'Only if we **embed** Calendly instead of linking to it',
        ],
        [
          '`_calendly_session`',
          'Calendly',
          'Maintains the booking session inside the widget.',
          'Third-party cookie, functional',
          'Session / per Calendly’s notice',
          'Only if we embed Calendly',
        ],
        [
          '`bcookie`',
          'LinkedIn',
          'Browser identifier used by LinkedIn services.',
          'Third-party cookie, advertising',
          '**1 year**',
          'Only if we add the LinkedIn Insight Tag',
        ],
        [
          '`bscookie`',
          'LinkedIn',
          'Secure browser identifier.',
          'Third-party cookie, advertising',
          '**1 year**',
          'Only with the LinkedIn Insight Tag',
        ],
        [
          '`lidc`',
          'LinkedIn',
          'Data-centre routing.',
          'Third-party cookie, functional',
          '**24 hours**',
          'Only with the LinkedIn Insight Tag',
        ],
        [
          '`li_sugr`',
          'LinkedIn',
          'Probabilistic identity matching for advertising.',
          'Third-party cookie, advertising',
          '**90 days**',
          'Only with the LinkedIn Insight Tag',
        ],
        [
          '`UserMatchHistory`',
          'LinkedIn',
          'LinkedIn Ads ID synchronisation.',
          'Third-party cookie, advertising',
          '**30 days**',
          'Only with the LinkedIn Insight Tag',
        ],
        [
          '`AnalyticsSyncHistory`',
          'LinkedIn',
          'Stores when a visitor was synced with LinkedIn’s member data.',
          'Third-party cookie, advertising',
          '**30 days**',
          'Only with the LinkedIn Insight Tag',
        ],
        [
          '`li_gc`',
          'LinkedIn',
          'Stores your consent choice for LinkedIn’s non-essential cookies.',
          'Third-party cookie, strictly necessary *to LinkedIn*',
          '**6 months**',
          'Only with the LinkedIn Insight Tag',
        ],
      ],
    },
    {
      k: 'p',
      t: '**Google Search Console** and **Bing Webmaster Tools** are search-engine reporting tools. We verify ownership of the domain using a **DNS TXT record** — a change to our domain’s DNS settings, not to your browser. Neither tool sets any cookie on this Site and neither observes your visit. *(Google Search Console can also be verified by piggy-backing on a Google Analytics tag. There is no analytics tag here to piggy-back on, and we would not use that method if there were: it would tie Search Console to a consent choice.)*',
    },

    /* ------------------------------------------------------------------ 6 */
    { k: 'h', level: 2, id: 'c6', t: '6. What happens when you click an external link' },
    {
      k: 'p',
      t: 'The Site links to `calendly.com`, `linkedin.com`, and `mailto:` / `tel:` addresses. Once you follow an external link you are on someone else’s website under their privacy and cookie policies, which we do not control:',
    },
    {
      k: 'ul',
      items: [
        'Calendly — [calendly.com/legal/cookie-notice](https://calendly.com/legal/cookie-notice)',
        'LinkedIn — [linkedin.com/legal/cookie-policy](https://www.linkedin.com/legal/cookie-policy)',
      ],
    },
    {
      k: 'p',
      t: 'We add campaign parameters (`utm_source=talentsync.eu` and similar) to our Calendly links so that Calendly can tell us which page a booking came from. Those parameters describe the *page*, not you, and contain no identifier for you.',
    },

    /* ------------------------------------------------------------------ 7 */
    { k: 'h', level: 2, id: 'c7', t: '7. Consent: what there is to give or withdraw' },
    {
      k: 'p',
      t: '**Nothing.** We never asked for consent to store anything, because we store nothing, so there is no choice of yours to change, no record of it to delete, and no banner to reopen.',
    },
    {
      k: 'ul',
      items: [
        '**Clearing your browser’s storage for `talentsync.eu`** removes nothing of ours. There is nothing there.',
        '**Cookies set by a third party on its own site** — Calendly’s, if you book a call there — are not ours and are not deleted by anything we do. Use the browser instructions in [§8](#c8) to remove them.',
        '**If we ever add something that needs consent**, this section will say how to give and withdraw it, a **“Cookie settings”** control will appear on every page, and withdrawal will be exactly as easy as consent. Consent will be asked for before anything is stored, never after.',
      ],
    },

    /* ------------------------------------------------------------------ 8 */
    { k: 'h', level: 2, id: 'c8', t: '8. Controlling cookies in your browser' },
    {
      k: 'p',
      t: 'Every major browser lets you block or delete cookies, and block third-party cookies specifically. Blocking all cookies will break many websites; this one will keep working.',
    },
    {
      k: 'ul',
      items: [
        '**Google Chrome** (desktop): ⋮ → Settings → Privacy and security → Third-party cookies (and → Delete browsing data to clear existing ones). [Help](https://support.google.com/chrome/answer/95647)',
        '**Chrome (Android)**: ⋮ → Settings → Privacy and security → Third-party cookies.',
        '**Safari (macOS)**: Safari → Settings → Privacy → *Prevent cross-site tracking*; Manage Website Data to remove stored data. [Help](https://support.apple.com/en-gb/guide/safari/sfri11471/mac)',
        '**Safari (iOS/iPadOS)**: Settings app → Apps → Safari → *Prevent Cross-Site Tracking*; Clear History and Website Data. [Help](https://support.apple.com/en-gb/105082)',
        '**Mozilla Firefox**: ☰ → Settings → Privacy & Security → Enhanced Tracking Protection (set to *Strict*) and Cookies and Site Data. [Help](https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop)',
        '**Microsoft Edge**: ⋯ → Settings → Cookies and site permissions → Manage and delete cookies and site data. [Help](https://support.microsoft.com/microsoft-edge)',
        '**Brave**: ☰ → Settings → Shields → Block cookies (third-party cookies are blocked by default).',
        '**Opera**: ☰ → Settings → Privacy & security → Cookies and other site data.',
      ],
    },
    {
      k: 'p',
      t: '**Global Privacy Control and Do Not Track.** We do not track you across websites and we run no analytics, so there is nothing here for these signals to switch off. If we ever add analytics, a GPC signal will be honoured as a valid objection: we will treat consent as refused and will not show you a banner inviting you to change that.',
    },

    /* ------------------------------------------------------------------ 9 */
    { k: 'h', level: 2, id: 'c9', t: '9. What we do not do' },
    {
      k: 'p',
      t: 'We do not sell your personal data. We do not share it with advertising networks or data brokers. We do not track you across other websites, and we run no analytics — so there is no analytics data about you to profile, share or make decisions from. We do not fingerprint your device. We do not use a cookie wall or make access conditional on consent.',
    },

    /* ----------------------------------------------------------------- 10 */
    { k: 'h', level: 2, id: 'c10', t: '10. Your rights' },
    {
      k: 'p',
      t: 'Under the GDPR, the UK GDPR and Moldova’s Law No. 195/2024 you have the rights of access, rectification, erasure, restriction, portability, and objection to processing based on legitimate interests, plus the right to withdraw consent at any time. Exercise them at **[victor@talentsync.eu](mailto:victor@talentsync.eu)**; see the [privacy policy](/privacy/#s12) for the detail.',
    },
    { k: 'p', t: 'You can also complain to a supervisory authority:' },
    {
      k: 'ul',
      items: [
        '**Moldova** — Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP), 48 Serghei Lazo Street, MD-2004 Chișinău · [+373 22 820 801](tel:+37322820801) · [centru@datepersonale.md](mailto:centru@datepersonale.md) · [datepersonale.md](https://datepersonale.md)',
        '**EU/EEA** — the data protection authority of the country you live or work in. The list is at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en). You do not have to contact us first.',
        '**United Kingdom** — the Information Commissioner’s Office, [ico.org.uk](https://ico.org.uk)',
      ],
    },

    /* ----------------------------------------------------------------- 11 */
    { k: 'h', level: 2, id: 'c11', t: '11. Changes and review' },
    { k: 'p', t: 'This policy is reviewed on a fixed schedule and on every relevant change:' },
    {
      k: 'ul',
      items: [
        '**Scheduled review:** every six months. **Next review: 28 February 2027.**',
        '**Event-driven review — mandatory, before deployment:** adding any new analytics tool, tag manager, advertising pixel, chat widget, A/B testing tool, video embed, map embed, font CDN, or **embedded** (as opposed to linked) Calendly widget. The rule for the engineering team is simple: *if a new third-party domain appears in the network tab, this page is out of date and must be updated before release.*',
      ],
    },
    {
      k: 'p',
      t: 'Material changes are announced by updating the effective date and version at the top of this page. Where a change requires consent, we ask for it before the change takes effect.',
    },
    { k: 'p', t: '**Version history:** v1.0 — 30 August 2026 — first publication.' },
  ],
}
