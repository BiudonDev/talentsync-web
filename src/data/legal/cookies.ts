import type { LegalDoc } from './types'

/**
 * Cookie Policy — PART 1 ONLY of docs/plans/spec/05-cookies-consent-analytics.md.
 * Part 2 of that document is an implementation plan for the consent-banner package
 * and is deliberately not on this page.
 *
 * Rewritten for GA4 per DECISIONS.md D2. The draft was written around a Plausible
 * recommendation and concluded "no banner is required"; D2 rejects that on the
 * basis of the user's explicit brief. So:
 *
 *  · §3 no longer claims the site sets no cookies. It states the consent gate.
 *  · The GA4 rows move out of the "conditional, not present" table into a live
 *    "set only if you accept" table, with the durations the draft already verified.
 *  · The "privacy-preserving analytics, no consent needed" paragraph is deleted —
 *    it was the single sentence that would have contradicted the privacy policy
 *    on the day both published (08-critique-completeness, first CRITICAL finding).
 *  · The Google Fonts row moves to its target state: layout.tsx already loads
 *    Montserrat through next/font, which self-hosts the file at build time.
 *
 * Every duration, provider and browser instruction below is the draft's own,
 * unchanged.
 */
export const cookies: LegalDoc = {
  slug: 'cookies',
  path: '/cookies/',
  label: 'Cookie Policy',
  h1: 'Cookie policy: every cookie talentsync.eu can set, and when',
  metaTitle: 'Cookie Policy',
  metaDescription:
    'Every cookie and storage item on talentsync.eu by name, provider, purpose and lifetime — what is strictly necessary, what needs your consent, and how to change your mind.',
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
      t: 'This policy explains how **{{LEGAL_ENTITY_NAME}}** (“TalentSync”, “we”, “us”), registered in the Republic of Moldova under {{IDNO}}, registered office {{REGISTERED_ADDRESS}}, Chișinău, Republic of Moldova, uses cookies and similar technologies on **https://talentsync.eu** (the “Site”).',
    },
    {
      k: 'p',
      t: 'It sits alongside our [privacy policy](/privacy/), which covers everything else we do with personal data — including candidate and client data.',
    },
    {
      k: 'p',
      t: 'Questions: **{{PRIVACY_EMAIL}}**, or [victor@talentsync.eu](mailto:victor@talentsync.eu). Our representative in the European Union under Article 27 GDPR is **{{EU_REP_NAME}}**, {{EU_REP_ADDRESS}}, {{EU_REP_EMAIL}}.',
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
    { k: 'h', level: 2, id: 'c3', t: '3. Current status — nothing runs until you choose' },
    {
      k: 'p',
      t: '**On your first visit, the only thing this Site stores on your device is the record of the choice you make on the consent banner.** Analytics does not load, and no analytics cookie is set, unless and until you accept it.',
    },
    {
      k: 'p',
      t: 'We use **Google Analytics 4** and nothing else. There is no advertising technology on this Site, no cross-site tracking, no data broker, no marketing pixel, no chat widget, no heatmap, no session recording, no A/B testing tool and no social embed. We have not enabled Google Signals, ads personalisation, or data sharing with Google’s advertising products in our GA4 property.',
    },
    {
      k: 'p',
      t: 'If any of that changes, this policy is updated *before* the change goes live, and if the change requires your consent you will be asked for it.',
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
      t: 'Google Consent Mode v2 is configured with **every signal defaulting to denied**. Closing the banner without choosing counts as a refusal.',
    },

    /* ------------------------------------------------------------------ 5 */
    { k: 'h', level: 2, id: 'c5', t: '5. Inventory — what is on this Site' },

    { k: 'h', level: 3, id: 'c5-a', t: 'Table A — Strictly necessary, set without consent' },
    {
      k: 'table',
      head: ['Name', 'Provider', 'Purpose', 'Type', 'Duration'],
      rows: [
        [
          '`ts_consent`',
          'TalentSync (first party)',
          'Records your cookie choice — including a refusal — so we do not ask again on every page. Created **only after** you make a choice.',
          'Local storage, strictly necessary',
          'Until you clear it, or 6 months, whichever comes first',
        ],
      ],
    },

    {
      k: 'h',
      level: 3,
      id: 'c5-b',
      t: 'Table B — Analytics, set only if you accept',
    },
    {
      k: 'p',
      t: 'None of the following exists in your browser unless you press **Accept** on the banner. Withdraw consent and we stop setting them; see [§7](#c7) for deleting the ones already there.',
    },
    {
      k: 'table',
      head: ['Name', 'Provider', 'Purpose', 'Type', 'Duration'],
      rows: [
        [
          '`_ga`',
          'Google',
          'Distinguishes one browser from another; the core Google Analytics identifier.',
          'Third-party cookie, analytics',
          '**2 years**',
        ],
        [
          '`_ga_{{GA4_MEASUREMENT_ID}}`',
          'Google',
          'Persists session state for our specific GA4 data stream.',
          'Third-party cookie, analytics',
          '**2 years**',
        ],
        [
          '`_gid`',
          'Google',
          'Distinguishes browsers; a legacy Universal Analytics cookie that some `gtag.js` configurations still set.',
          'Third-party cookie, analytics',
          '**24 hours**',
        ],
        [
          '`_gat_gtag_{{GA4_MEASUREMENT_ID}}`',
          'Google',
          'Throttles the request rate to Google’s servers.',
          'Third-party cookie, analytics',
          '**1 minute**',
        ],
      ],
    },
    {
      k: 'p',
      t: 'What GA4 receives: a cookie identifier, your IP address (used by Google to derive an approximate location and then discarded), the pages you viewed, the referring page, your device and browser type, and events such as an outbound click on our Calendly or `mailto:` links. GA4 event-data retention is set to **2 months**, the shortest period Google offers. Google acts as our processor for this, under its data processing terms, with the EU–US Data Privacy Framework and the EU Standard Contractual Clauses covering the transfer.',
    },

    {
      k: 'h',
      level: 3,
      id: 'c5-c',
      t: 'Table C — Not cookies, but data still leaves your browser',
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
      id: 'c5-d',
      t: 'Table D — Conditional: not present, would require consent',
    },
    {
      k: 'p',
      t: 'Nothing below is on the Site. Each row names the exact decision that would create it. If any of them ships, this policy is updated first and the banner is extended to cover it.',
    },
    {
      k: 'table',
      head: ['Name', 'Provider', 'Purpose', 'Type', 'Duration', 'Trigger'],
      rows: [
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
      t: '**Google Search Console** and **Bing Webmaster Tools** are search-engine reporting tools. We verify ownership of the domain using a **DNS TXT record** — a change to our domain’s DNS settings, not to your browser. Neither tool sets any cookie on this Site and neither observes your visit. *(Google Search Console can also be verified by piggy-backing on a Google Analytics tag. We deliberately do not use that method, so that Search Console stays independent of your consent choice.)*',
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
    { k: 'h', level: 2, id: 'c7', t: '7. Changing or withdrawing your consent' },
    { k: 'p', t: 'Consent must be as easy to withdraw as it was to give.' },
    {
      k: 'ul',
      items: [
        'A **“Cookie settings”** link sits in the footer of every page. Click it, and the banner reopens with your current choice; change it and it takes effect immediately.',
        '**Clearing your browser’s storage for `talentsync.eu`** erases the `ts_consent` record, and you will be asked again on your next visit.',
        '**Refusal is permanent until you change it.** We do not re-prompt visitors who have refused, other than once your recorded choice is more than 6 months old.',
        '**Cookies already set by a third party** before you withdrew consent are not deleted by withdrawing — withdrawal stops the collection. Use the browser instructions in [§8](#c8) to delete what is already there.',
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
      t: '**Global Privacy Control and Do Not Track.** We do not track you across websites, so there is little for these signals to switch off here. We honour a GPC signal as a valid objection: where your browser sends one, we treat analytics consent as refused and do not show you the banner as an invitation to change that.',
    },

    /* ------------------------------------------------------------------ 9 */
    { k: 'h', level: 2, id: 'c9', t: '9. What we do not do' },
    {
      k: 'p',
      t: 'We do not sell your personal data. We do not share it with advertising networks or data brokers. We do not track you across other websites, and we have not enabled Google Signals or ads personalisation in our analytics property. We do not fingerprint your device. We do not use a cookie wall or make access conditional on consent. We do not use analytics data to make automated decisions about you.',
    },

    /* ----------------------------------------------------------------- 10 */
    { k: 'h', level: 2, id: 'c10', t: '10. Your rights' },
    {
      k: 'p',
      t: 'Under the GDPR, the UK GDPR and Moldova’s Law No. 195/2024 you have the rights of access, rectification, erasure, restriction, portability, and objection to processing based on legitimate interests, plus the right to withdraw consent at any time. Exercise them at **{{PRIVACY_EMAIL}}**; see the [privacy policy](/privacy/#s12) for the detail.',
    },
    { k: 'p', t: 'You can also complain to a supervisory authority:' },
    {
      k: 'ul',
      items: [
        '**Moldova** — Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP), 48 Serghei Lazo Street, MD-2004 Chișinău · [+373 22 820 801](tel:+37322820801) · [centru@datepersonale.md](mailto:centru@datepersonale.md) · [datepersonale.md](https://datepersonale.md)',
        '**EU/EEA** — your national data protection authority, or the authority where our EU representative is established. The list is at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en).',
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
