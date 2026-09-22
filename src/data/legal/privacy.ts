import type { LegalDoc } from './types'

/**
 * Privacy Policy — from docs/plans/spec/03-privacy-policy.md.
 *
 * Changes to the draft, every one of them traceable:
 *
 *  · DECISIONS.md D2 (GA4 behind a consent banner) is LIVE as of 21 September
 *    2026 (v1.1): Google Analytics 4, measurement ID G-4D9N8H4S48, Consent Mode
 *    v2 basic mode — nothing loads and nothing reaches Google until the visitor
 *    accepts. §4.1–§4.3, §8, §9.2, §10, §13 and the short version describe that
 *    implementation; the consent record is `ts_consent` (local storage, 6 months).
 *    Between 31 August and 21 September 2026 (v1.0) analytics was off and this
 *    file said so; Annex C records the change.
 *  · DECISIONS.md D3 — {{AI_SCREENING_POSITION}} resolves to the settled
 *    sentence. The token is deleted from §6.8 and §14.
 *  · 08-critique-privacy [CRITICAL] Google Fonts — already fixed in the repo
 *    (layout.tsx loads Montserrat through next/font, which self-hosts at build
 *    time), so the draft's §4.3 confession and the §4.2 fonts row are DELETED
 *    and §4.1 states the positive fact instead. Sections renumber 4.4→4.3, 4.5→4.4.
 *  · 08-critique-privacy [CRITICAL] short version bullet 4, [CRITICAL] §6.1
 *    consequence 2, [HIGH] §6.4 unapproached profiles, [HIGH] §9.3 (moved out of
 *    the public notice into Annex B), [HIGH] §9.2 transfer rows, [HIGH] Calendly,
 *    [HIGH] §8 recipients, [HIGH] §11 overreach, [HIGH] §6.11 "five working days",
 *    [HIGH] Art 21(4) objection callout, [HIGH] one wording for the suppression
 *    hash, [HIGH] §5.1 testimonial photographs — all applied as drafted by the critic.
 *  · §13.3 is KEPT (the critic's reason for deleting it — that /cookies/ did not
 *    exist — is gone; D1 row 23 builds it).
 *  · Annex A is not duplicated here. It is its own route, /candidate-privacy/,
 *    per D1 row 21; two copies of a 1,500-word Art 14 notice is a drift trap.
 *    Note that the "reproduced here so you can check it" promise is made ON
 *    /candidate-privacy/ and is kept there — this annex says the opposite in as
 *    many words. See the comment at the annex block before changing that.
 *
 * No placeholder tokens survive in this file. Every value was answered by the
 * client on 31 August 2026; the two that were not — the Article 27 EU
 * representative (§1.3, §17.2) and the engineer engagement status (§6.10) — are
 * written as what is true today instead of guessed, and stay in BLOCKERS.md.
 * The A4 guard fails `npm run verify` while any token remains.
 */
export const privacy: LegalDoc = {
  slug: 'privacy',
  path: '/privacy/',
  label: 'Privacy Policy',
  h1: 'TalentSync privacy policy: how we handle candidate, client and visitor data',
  metaTitle: 'Privacy Policy',
  metaDescription:
    'How TalentSync collects, uses and protects personal data — for engineers we source, client contacts and site visitors. Written to the EU GDPR and Law 195/2024.',
  version: '1.1',
  updated: '2026-09-21',
  lede: 'This policy applies to https://talentsync.eu and to everything we do offline. It is written to the stricter of the two regimes that reach us — the EU GDPR — and applied to everyone, wherever you live.',
  body: [
    /* ------------------------------------------------------------ summary */
    { k: 'h', level: 2, id: 'summary', t: 'The short version' },
    {
      k: 'p',
      t: 'TalentSync is a Moldovan tech-recruitment company. We hold three kinds of personal data: website server logs, business contacts at client companies, and engineers’ professional profiles. We find engineers on public professional platforms, tell them so in our first message, and share profiles only with named clients you have agreed to.',
    },
    {
      k: 'ul',
      items: [
        'We keep **candidate profiles no longer than 24 months** from our last contact with you, and keep placement, invoicing and tax records for the longer periods the law requires — [§10](#s10) lists every period we hold.',
        '**We do not use automated decision-making or AI screening to evaluate candidates.** Every shortlist is assembled by a person who has read your profile.',
        '**Analytics runs only if you accept it.** The one thing we store without asking is the record of your answer on the cookie banner. Google Analytics 4 is not loaded, and no Google cookie is set, until you click Accept; rejecting or closing the banner leaves the site identical and is remembered for six months — see [§4.3](#s4-3) and the [cookie policy](/cookies/).',
        'We never charge a candidate anything, for any reason.',
      ],
    },
    {
      k: 'p',
      t: '**Where this summary and [§§4](#s4)–[17](#s17) differ, §§4–17 govern.** Everything below is the detail.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 1 */
    { k: 'h', level: 2, id: 's1', t: '1. Who we are and how to reach us' },
    { k: 'h', level: 3, id: 's1-1', t: '1.1 The controller' },
    {
      k: 'table',
      head: ['', ''],
      rows: [
        ['**Legal name**', 'S.R.L. “UNQENERGY”, trading as “TalentSync”'],
        ['**Company number (IDNO)**', '1020600034949'],
        [
          '**Registered address**',
          'MD-2005, Chișinău Rîșcani, mun. Chișinău, Colina Pușkin 18, ap. (of.) 1, Republic of Moldova',
        ],
        ['**Website**', 'https://talentsync.eu'],
        ['**Email**', '[victor@talentsync.eu](mailto:victor@talentsync.eu)'],
        ['**Privacy enquiries**', '[victor@talentsync.eu](mailto:victor@talentsync.eu)'],
        ['**Phone**', '[+373 68 300 700](tel:+37368300700)'],
        ['**LinkedIn**', '[linkedin.com/company/talentsync](https://linkedin.com/company/talentsync)'],
      ],
    },
    {
      k: 'p',
      t: '**TalentSync is a trading name, not the registered entity.** The controller is S.R.L. “UNQENERGY” (IDNO 1020600034949); “TalentSync”, “we”, “us” and “our” mean that company throughout this policy. “You” means whoever is reading — a website visitor, a client contact, or an engineer.',
    },

    { k: 'h', level: 3, id: 's1-2', t: '1.2 Our privacy contact' },
    {
      k: 'p',
      t: 'Day-to-day privacy questions, rights requests and complaints go to **Victor Uncuta**, our CEO, at **[victor@talentsync.eu](mailto:victor@talentsync.eu)**.',
    },
    {
      k: 'p',
      t: 'We are **not** required to appoint a Data Protection Officer. Our core activities do not involve large-scale systematic monitoring, and we do not process special-category or criminal-conviction data at scale. We have deliberately appointed a named privacy contact instead of designating a formal DPO. If that ever changes we will publish the DPO’s details here and notify the Moldovan supervisory authority, as Article 37(7) of Law No. 195/2024 requires.',
    },

    { k: 'h', level: 3, id: 's1-3', t: '1.3 Representation in the European Union' },
    {
      k: 'p',
      t: '**We have not appointed a representative in the European Union under Article 27 GDPR.** We are assessing whether our processing requires one. If it does, we will appoint a representative and publish their name, address and contact details in this section.',
    },
    {
      k: 'p',
      t: 'That assessment changes nothing about what you can do. Write to us directly at **[victor@talentsync.eu](mailto:victor@talentsync.eu)** about anything in this policy — we answer within one month, free of charge, as [§12](#s12) sets out — and you may complain to the data protection authority in your own country at any time, whether or not you have contacted us first ([§17](#s17)).',
    },

    { k: 'h', level: 3, id: 's1-4', t: '1.4 Our representative in the United Kingdom' },
    {
      k: 'p',
      t: 'We have not appointed a UK representative. Our UK contacts are corporate clients rather than individuals to whom we offer services, and we do not currently source candidates in the UK or operate any tracking technology that reaches UK visitors. If that changes we will appoint one and publish the details here. We revisit this the moment a UK client asks us for a UK-resident engineer.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 2 */
    { k: 'h', level: 2, id: 's2', t: '2. Who this policy covers, and how to read it' },
    {
      k: 'p',
      t: 'Your rights, and our legal reasons for holding your data, are genuinely different depending on which of these you are. Read your own section — the rest will not apply to you.',
    },
    {
      k: 'table',
      head: ['If you are…', 'Read', 'Why it differs'],
      rows: [
        [
          'Someone browsing talentsync.eu',
          '[§4](#s4)',
          'We hold almost nothing about you: web-server access logs, deleted after 30 days, and analytics only if you accepted it on the banner',
        ],
        [
          'A contact at a client or prospective client',
          '[§5](#s5)',
          'Business-relationship data, held on legitimate interests and contract',
        ],
        [
          'An engineer we have sourced, spoken to, or placed',
          '[§6](#s6)',
          'The most detail, the strongest rights, and the section that matters most',
        ],
        [
          'Someone applying for a job **at TalentSync**',
          '[§7](#s7)',
          'We are the hiring employer, not an intermediary',
        ],
      ],
    },
    { k: 'p', t: 'Sections [8](#s8) to [17](#s17) apply to everyone.' },
    {
      k: 'p',
      t: '**One standard for everyone.** Our candidates and clients sit in the EU, the UK, Moldova and Ukraine. Rather than run four compliance standards, we apply the strictest one — the EU GDPR — to everybody. If you are in Moldova or Ukraine, you get EU-level treatment as a matter of policy even where your own law asks for less.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 3 */
    { k: 'h', level: 2, id: 's3', t: '3. Which laws apply to us' },
    { k: 'p', t: 'Two regimes apply to us simultaneously, and this policy is written to satisfy both.' },
    {
      k: 'p',
      t: '**Republic of Moldova — Law No. 195 of 25 July 2024 on personal data protection.** In force since **23 August 2026**, replacing Law No. 133/2011. It transposes the GDPR almost word for word: the principles, lawful bases, data-subject rights, transfer rules and accountability duties are the same articles with the same numbers. Our supervisory authority is the **National Centre for Personal Data Protection (CNPDCP)** in Chișinău.',
    },
    {
      k: 'p',
      t: '**European Union — Regulation (EU) 2016/679 (GDPR), via Article 3(2).** The GDPR reaches us directly because we offer our services to people in the EU: we operate a `.eu` domain in English, quote prices in euros, name EU clients, and — decisively — we source and represent engineers who live in EU Member States. Being a Moldovan company does not put us outside the GDPR, and we do not argue that it does.',
    },
    {
      k: 'p',
      t: '**United Kingdom — UK GDPR**, where we source UK-based candidates or serve UK clients. The UK relaxed its rules on automated decisions in February 2026. We have not taken advantage of that, because doing so would breach the EU rules for our EU candidates. We build to the stricter standard once.',
    },
    {
      k: 'p',
      t: 'Where a national rule is stricter than the GDPR baseline — German retention limits for rejected applicants, for example — we apply the stricter national rule to people in that country. We say where in [§10](#s10).',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 4 */
    { k: 'h', level: 2, id: 's4', t: '4. Website visitors' },
    { k: 'h', level: 3, id: 's4-1', t: '4.1 What talentsync.eu actually does' },
    {
      k: 'p',
      t: 'We want to be specific, because most privacy policies describe a website the company does not have.',
    },
    {
      k: 'p',
      t: 'talentsync.eu is a **set of static pages**. There are no accounts, no logins, and **no forms of any kind** — no contact form, no newsletter signup, no CV upload. Every way of reaching us is a plain link:',
    },
    {
      k: 'ul',
      items: [
        '**`mailto:` links** open your own email client. Nothing is sent to us until you press send in your own software.',
        '**A `tel:` link** dials from your own phone.',
        '**A Calendly link** takes you to `calendly.com`, a separate website. The scheduling widget is **not embedded in our page** — nothing from Calendly runs while you are on talentsync.eu.',
        '**A LinkedIn link** to our company page.',
      ],
    },
    {
      k: 'p',
      t: '**Before you accept analytics — and always, if you reject it — your browser contacts no server other than talentsync.eu.** No font CDN — the Montserrat typeface is served from our own domain — no chat widget, no heatmap, no A/B testing, no session recording, no advertising pixel, no social embed, no map. The one optional connection, to Google Analytics, is described in [§4.3](#s4-3) and opens only after you click Accept.',
    },

    { k: 'h', level: 3, id: 's4-2', t: '4.2 What we process about every visitor' },
    {
      k: 'table',
      head: ['Purpose', 'Data', 'Lawful basis', 'Retention', 'Recipients'],
      rows: [
        [
          'Serving the website and keeping it available and secure — detecting abuse, debugging errors, blocking attacks',
          'Web-server access logs: IP address, timestamp, requested URL, HTTP status, referrer, user-agent string',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: we cannot run a website without logs, the data is minimal and non-intrusive, it is never used to identify or profile a visitor, and it is deleted quickly.*',
          '**30 days**, then automatically deleted',
          'Our hosting provider, Railway, acting as our processor',
        ],
        [
          'Understanding which pages visitors find useful — **only if you accept analytics on the banner**',
          'Google Analytics 4: a cookie identifier (`_ga`, `_ga_4D9N8H4S48`), pages viewed, referrer, device and browser type, approximate location derived by Google from your IP address (the IP itself is not stored), and three click events — booking a call, opening an email link, opening a phone link',
          '**Consent**, Art 6(1)(a) GDPR **and** Art 5(3) ePrivacy Directive. Nothing is loaded, set or sent until you actively accept. Declining costs you nothing and changes nothing about the site',
          'Event data **2 months** in Google Analytics, the shortest retention the tool offers; withdrawing consent stops collection immediately',
          'Google Ireland Ltd, as our processor under the Google Analytics data processing terms, with Google LLC (US) as its sub-processor',
        ],
        [
          'Remembering your answer on the cookie banner so we do not ask on every page',
          '`ts_consent`, one local-storage record: accepted or rejected, the date, and the version of the banner. No identifier for you',
          'Strictly necessary under Art 5(3) ePrivacy; no consent needed for the record itself. Created only after you choose',
          '**6 months**, then we ask again; or until you clear your browser storage',
          'Nobody. It never leaves your browser',
        ],
      ],
    },
    {
      k: 'p',
      t: 'We do not build visitor profiles from server logs or from analytics. We do not know who you are. We cannot link a log entry or an analytics event to a person, and we do not try.',
    },

    { k: 'h', level: 3, id: 's4-3', t: '4.3 Analytics: Google Analytics 4, only with your consent' },
    {
      k: 'p',
      t: '**Since 21 September 2026 we use Google Analytics 4** (measurement ID G-4D9N8H4S48) to count visits, pages, traffic sources and outbound clicks — the Calendly link, email and phone links — so we know what content works. It runs in **Consent Mode v2, basic mode**: the Google script is not on the page when you arrive, no request leaves your browser to Google, and no analytics cookie exists until you click **Accept analytics** on the banner that appears on your first visit to any page. Every advertising signal — ad storage, ad user data, ad personalisation — stays denied whatever you choose. We use no Google Ads, no remarketing and no advertising features.',
    },
    {
      k: 'p',
      t: '**Rejecting is exactly as easy as accepting**: the same banner, two identical buttons, one click, no pre-ticked boxes, and Reject comes first in the keyboard order. Closing the banner or pressing Escape counts as a refusal and is remembered as one. Nothing but strictly necessary technology runs before you choose. If you reject, we fall back to counting page requests in our own server logs, which needs no consent because it involves nothing stored on or read from your device. **You can change your mind at any time** from the “Cookie settings” link in the footer of every page; withdrawal stops collection immediately.',
    },
    {
      k: 'table',
      head: ['Tool', 'What it does', 'Data', 'Lawful basis', 'Retention', 'Where'],
      rows: [
        [
          '**Google Analytics 4**',
          'Counts visits, pages, sources and outbound clicks (Calendly, email, phone) so we know what content works',
          'Cookie identifier, IP address (used by Google to derive approximate location, then discarded), pages viewed, referrer, device and browser type, the three click events tagged with the section of our page the link sat in — never anything you typed',
          '**Consent**, Art 6(1)(a) GDPR **and** Art 5(3) ePrivacy Directive. No analytics cookie is set and no data is sent until you actively accept. Declining costs you nothing and changes nothing about the site',
          'Event data kept **2 months** in Google Analytics — the shortest retention the tool offers, which we set in the property’s admin; withdrawn consent stops collection immediately',
          'Google Ireland Ltd (processor), with Google LLC in the US as sub-processor — see [§9.2](#s9-2)',
        ],
        [
          '**Google Search Console**',
          'Shows which Google searches lead to our site',
          'Aggregated, anonymised query and click counts supplied by Google. No identifiers, no per-visitor data, nothing that identifies you. Ownership is verified by a DNS record, not by any tag or script on the site',
          'Not personal data in our hands; we list it for completeness',
          'Held by Google under its own terms',
          'Google',
        ],
        [
          '**Bing Webmaster Tools**',
          'The same, for Bing and Copilot',
          'As above',
          'As above',
          'As above',
          'Microsoft',
        ],
      ],
    },
    {
      k: 'p',
      t: 'The two search-console tools run on the search engines’ own servers rather than on ours, and they place nothing on your device. Whether or not you accept analytics, we also count page requests in our own server logs; that needs no consent, because it involves nothing stored on or read from your device, and those logs are deleted after 30 days ([§4.2](#s4-2)).',
    },
    {
      k: 'p',
      t: '**If we ever add any other measurement or marketing technology, this policy and the [cookie policy](/cookies/) are updated before the tool ships — not after — and we ask for your consent before anything is set on your device.** We name the tool, what it collects, who receives it and how long it is kept, here, first. The cookie policy lists every cookie by name, provider, purpose and lifetime.',
    },

    { k: 'h', level: 3, id: 's4-4', t: '4.4 Calendly' },
    {
      k: 'p',
      t: 'If you click “Book a call”, you leave our website for `calendly.com`. Nothing is transmitted to Calendly until you click.',
    },
    {
      k: 'p',
      t: '**We are the controller of your booking.** Calendly LLC processes your name, email address, chosen time and any note you add **on our behalf, as our processor** under its data processing addendum. Calendly is a separate controller only for its own operation of the platform, described in its own privacy notice. Exercise your rights over the booking with us — you do not need to contact Calendly.',
    },
    {
      k: 'p',
      t: 'We hold the resulting record as part of the client-contact processing described in [§5](#s5). You never have to use Calendly: emailing [victor@talentsync.eu](mailto:victor@talentsync.eu) or calling [+373 68 300 700](tel:+37368300700) reaches the same person and involves no third party at all.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 5 */
    { k: 'h', level: 2, id: 's5', t: '5. Clients and prospective clients' },
    {
      k: 'p',
      t: 'This section is about **individual people at companies** — a CTO, a founder, a head of engineering, a finance contact. Data protection law has no “B2B exemption”: your name and work email are your personal data even when you are acting for your employer.',
    },
    { k: 'h', level: 3, id: 's5-1', t: '5.1 What we do and why' },
    {
      k: 'table',
      head: ['Purpose', 'Data', 'Lawful basis', 'Retention', 'Recipients'],
      rows: [
        [
          'Responding to an enquiry you sent us by email, phone or Calendly',
          'Name, work email, phone, employer, job title, content of your message, meeting notes',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: you contacted us and expect a reply; nothing is used for any other purpose without telling you.* Where a contract is in prospect, also Art 6(1)(b).',
          'Relationship + **24 months** from last contact',
          'Our email provider; Calendly if you booked through it',
        ],
        [
          'Business development: contacting a company we believe has a hiring need, and following up',
          'Name, work email, job title, employer, public company information, notes on the conversation, our own record of when we last spoke',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: B2B outreach to a named professional about their own job function is expected in this market, the data is business-context only, and one reply saying “stop” ends it permanently.*',
          '**12 months** from last meaningful contact if no relationship forms; then deleted',
          'Google Workspace, our email provider; Google Drive, where we keep client records',
        ],
        [
          'Negotiating, signing and performing a recruitment or engagement agreement',
          'Signatory names and contact details, contractual correspondence, requirement briefs, interview feedback you send us, delivery records',
          '**Contract**, Art 6(1)(b), for the individual who is the counterparty; **legitimate interests**, Art 6(1)(f), for other named employees. *Balancing: we cannot deliver the service without knowing who to speak to.*',
          'Contract term + **3 years** (the general limitation period for contractual claims under Moldovan law)',
          'Our email provider; our external accountants; our legal advisers if a dispute arises',
        ],
        [
          'Invoicing, payment, bookkeeping, tax and statutory accounts',
          'Billing contact, company details, invoices, payment records, timesheet summaries',
          '**Legal obligation**, Art 6(1)(c) — Moldovan accounting and tax law',
          '**5 years** (statutory accounting retention period)',
          'Our accountants; banks and payment providers; tax authorities on lawful request',
        ],
        [
          'Sending occasional updates about our services to existing client contacts',
          'Name, work email, employer',
          '**Legitimate interests**, Art 6(1)(f), plus the soft opt-in for existing business relationships. *Balancing: low-volume, service-relevant, one-click unsubscribe in every message, and we honour it permanently.*',
          'Until you unsubscribe, then a minimal suppression record',
          'Our email provider',
        ],
        [
          'Publishing a testimonial or case study — the individual’s first name, job title, employer and **photograph**',
          'First name, job title, employer, quote, photograph; company name and logo',
          '**Consent**, Art 6(1)(a), obtained in writing before publication, for any personal quote, attribution or photograph; **legitimate interests** for the company name alone',
          'Until you withdraw agreement. Withdraw at any time by emailing [victor@talentsync.eu](mailto:victor@talentsync.eu); we remove the testimonial at the next deployment and in any event within **10 working days**',
          'Public — anyone visiting our website',
        ],
      ],
    },
    {
      k: 'p',
      t: 'Currently published: three testimonials with photographs, on our homepage. Each is published with the named person’s agreement, and we remove any testimonial on request.',
    },

    { k: 'h', level: 3, id: 's5-2', t: '5.2 Interview feedback and information about your employees' },
    {
      k: 'p',
      t: 'Some clients send us data about people who are not us and not our candidates — for example a hiring manager’s calendar, an existing team member’s details, or written interview feedback about a candidate.',
    },
    {
      k: 'p',
      t: 'When you send us that, **you are the controller and we are a recipient**. Please send only what we need, and tell us if anything in it is sensitive. Where we act on your documented instructions for a defined task, we act as your processor and we will sign a data processing agreement on Article 28 terms. Where we decide for ourselves what to do with the information — which is the normal case for candidate data — we are a controller in our own right and this policy governs it.',
    },

    { k: 'h', level: 3, id: 's5-3', t: '5.3 What clients should read next' },
    {
      k: 'p',
      t: '[Annex B](#annex-b) lists the documents we will provide to your procurement, security or legal team without argument.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 6 */
    { k: 'h', level: 2, id: 's6', t: '6. Candidates and engineers' },
    {
      k: 'p',
      t: 'This is the longest section because it carries the most at stake. It covers anyone we have sourced, contacted, screened, represented, placed, or kept in our talent pool.',
    },

    { k: 'h', level: 3, id: 's6-1', t: '6.1 Our role, stated plainly' },
    {
      k: 'p',
      t: '**For candidate data, TalentSync is an independent controller.** We decide which engineers to approach, what to record about them, how to validate their experience, whether to keep them in the pool after a rejection, and which clients to show them to. Those are our decisions, not a client’s instructions, so we take responsibility for them.',
    },
    { k: 'p', t: 'Three consequences follow, and we want you to see all three:' },
    {
      k: 'ol',
      items: [
        '**You can exercise every right in [§12](#s12) directly against us.** We do not send you to a client and call it their problem.',
        'When we share your profile with a client, **that client processes it as a controller for its own hiring process**, under its own privacy notice. **For the act of sharing we are joint controllers with that client.** You may bring any request or claim to either of us: **Article 82(4) makes each of us liable for the whole of any damage caused**, and nothing in our contracts with clients changes that. We choose which clients we send profiles to, and we name the client and ask you before we send anything.',
        'Every client agreement we sign therefore allocates, in writing: who answers your access request, who gives you privacy information at each stage, who notifies whom of a breach, and who deletes what if you ask. The essence of that arrangement is set out at [§6.9](#s6-9). You may exercise your rights against either of us, whatever the arrangement says.',
      ],
    },
    {
      k: 'p',
      t: 'We are **not** a project outsourcing company, and this is not a legal nicety — it shapes who controls what. Our clients add engineers to their own teams and retain full technical and operational control. That means the client, not us, controls the day-to-day working relationship and the data it generates.',
    },

    { k: 'h', level: 3, id: 's6-2', t: '6.2 Where we get your data' },
    {
      k: 'table',
      head: ['Source', 'What it means'],
      rows: [
        [
          '**You**',
          'You emailed us a CV, replied to our outreach, spoke to us on a call, or booked through Calendly',
        ],
        [
          '**Public professional platforms**',
          'LinkedIn, GitHub, Stack Overflow, professional portfolios, conference speaker listings, public technical writing. See [§6.4](#s6-4) — this is the important one',
        ],
        [
          '**Referrals**',
          'Another engineer or a mutual contact suggested you. We will tell you who, in our first message, unless they asked us not to and we judge the request reasonable — and even then you can ask',
        ],
        [
          '**Clients**',
          'A client asked us to speak to someone they had identified, or gave us interview feedback about you',
        ],
        ['**Public company sources**', 'Your employer’s website, a press release, a public registry'],
      ],
    },
    {
      k: 'p',
      t: '**What we deliberately do not do.** We do not run scrapers, crawlers or bots. We do not buy scraped candidate databases. We do not resell profiles. We do not look at your personal social media — Facebook, Instagram, X, TikTok, personal blogs — even where it is public, because it is intrusive, it risks exposing information about your health, beliefs, politics or family that we have no business knowing, and it tells us nothing about whether you can write good Go. Our sourcing is a person, manually, on professional platforms, for a role that actually exists.',
    },

    { k: 'h', level: 3, id: 's6-3', t: '6.3 What we collect — and what we refuse to' },
    {
      k: 'p',
      t: '**We collect:** name; the professional contact details you have made available or given us; current and past job titles and employers; the URL of your public professional profile; skills, technologies and seniority; location and time zone; work-authorisation status where a role requires it; languages; education and certifications; the CV you send us; our notes from conversations with you; your salary or rate expectations and availability; the roles we have discussed with you and the outcome; and a record of your contact preferences and any objection you have raised.',
    },
    { k: 'p', t: '**We do not ask for, and we do not want:**' },
    {
      k: 'ul',
      items: [
        'a **photograph** — do not put one on the CV you send us;',
        'your **date of birth, age, marital status, family situation or nationality**, unless a specific legal requirement for a specific role makes it necessary and we have explained why;',
        '**health information**, including any explanation of a gap in your CV;',
        'your **race or ethnic origin, religion, political opinions, trade-union membership, sex life or sexual orientation, or biometric or genetic data**;',
        'any **criminal record information**. See [§6.7](#s6-7).',
      ],
    },
    {
      k: 'p',
      t: 'If any of that arrives anyway — CVs leak it whether anyone intends to or not — we delete or redact it before your profile goes to a client, and we never use it in any assessment or decision. If a client ever asks us to screen on any of it, we refuse in writing.',
    },

    { k: 'h', level: 3, id: 's6-4', t: '6.4 Sourcing you from a public profile' },
    {
      k: 'p',
      t: 'This is where most recruiters are quietly non-compliant, so here is exactly what we do.',
    },
    {
      k: 'p',
      t: '**The lawful basis is legitimate interests, Article 6(1)(f)** — ours, in matching experienced engineers to live client mandates, and yours, in hearing about relevant work. We have carried out and documented a written legitimate-interests assessment, which we will show you on request.',
    },
    {
      k: 'p',
      t: '**The one-line balance:** an engineer who maintains a public profile on a professional, jobs-oriented platform reasonably expects to be contacted by a recruiter about a specific, relevant, existing role; we limit ourselves to role-relevant professional fields from professional platforms only, we tell you at the first message, and a single word from you stops it permanently.',
    },
    { k: 'p', t: '**What limits us:**' },
    {
      k: 'ul',
      items: [
        'we source only for a **live mandate** or a specific, currently active search — not to inflate a database;',
        'we record only **role-relevant professional fields** — the list in [§6.3](#s6-3), nothing beyond it;',
        '**professional platforms only** — never personal social media, never protected or private forums, never anything behind a login you did not intend recruiters to see;',
        '**no automated collection** — no scraping tools, no bulk extraction, no purchased lists;',
        '**no inference** — we do not guess at your age, ethnicity, health, family plans or anything else, from your name, photo, graduation year or career gaps;',
        '**two channels only.** We contact engineers by email and on LinkedIn. We do not use WhatsApp, Telegram or SMS for candidate outreach.',
      ],
    },
    {
      k: 'p',
      t: '**Our Article 14 commitment.** When we obtain your data from a source other than you, the law requires us to tell you. The deadline is not “within a month” — it is **the moment we first contact you**, because we obtained your details in order to contact you.',
    },
    {
      k: 'note',
      body: [
        '**So: our very first message to you — the first email, the first InMail, the first message of any kind — carries the full privacy notice. Every time. No exceptions, and no “we’ll send the policy later”.**',
      ],
    },
    {
      k: 'p',
      t: 'That notice is published word for word, on its own page, at [talentsync.eu/candidate-privacy/](/candidate-privacy/) — so you can check that what we sent you matches what we publish.',
    },
    {
      k: 'p',
      t: '**We do not keep profiles of people we have not written to.** If we record a profile while searching and then decide not to approach you, we delete it within **30 days**, and you will never hear from us. If we do write to you and you never reply, we delete what we hold about you **six months** after we sourced it. No reply means no relationship, and there is no justification for keeping a record of a conversation that never happened.',
    },

    { k: 'h', level: 3, id: 's6-5', t: '6.5 What we do with candidate data' },
    {
      k: 'table',
      head: ['Purpose', 'Data', 'Lawful basis', 'Retention', 'Recipients'],
      rows: [
        [
          '**Sourcing and first contact** — identifying engineers who match a live mandate and approaching them',
          'Name, public profile URL, current title and employer, skills, seniority, location, publicly listed contact route',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: professional platforms only, role-relevant fields only, notice at first contact, one-word opt-out, short retention if you do not reply.*',
          '**30 days** if we source you and decide not to approach you; **6 months** from sourcing if we write to you and you never respond',
          'No one outside TalentSync at this stage',
        ],
        [
          '**Screening and validation** — a conversation, a technical discussion, checking that your stated experience is real',
          'Everything in [§6.3](#s6-3) that you give us or confirm; our written notes',
          '**Legitimate interests**, Art 6(1)(f), and, once you ask us to represent you, **steps prior to entering a contract**, Art 6(1)(b). *Balancing: you have engaged with us and expect to be assessed; assessment notes are factual and job-related and you can see them.*',
          'Process duration + **6 months**',
          'No one outside TalentSync until you agree to a submission',
        ],
        [
          '**Representing you to a client** — sending your profile so they can consider you for a named role',
          'CV or a profile we prepare, skills, experience, availability, rate expectations, your questions about the role',
          '**Legitimate interests**, Art 6(1)(f), and Art 6(1)(b) steps prior to a contract. *Balancing: this is the service you came to us for; we ask you first, and we name the client before we send anything.*',
          'Held by us for the periods in [§10](#s10); held by the client under the client’s own policy',
          '**The named client only.** Never a client you have not agreed to',
        ],
        [
          '**Managing the process** — scheduling, coordinating interviews, relaying feedback, negotiating an offer',
          'Contact details, availability, interview outcomes, feedback text, offer terms',
          '**Legitimate interests** and Art 6(1)(b)',
          'Process duration + **6 months**',
          'The client; calendar and email tools',
        ],
        [
          '**Talent pool** — keeping in touch about future roles after a process ends without a placement',
          'Profile, skills, seniority, the roles we discussed, why it did not proceed, your stated preferences',
          '**Legitimate interests**, Art 6(1)(f), except in Germany — see below. *Balancing: engineers who have already worked with us generally want to hear about the next relevant role; we tell you the retention period up front, we check in before deleting, and objecting takes one line of email.*',
          '**24 months from our last meaningful contact.** At 22 months we email to ask whether to keep you. A reply resets the clock; no reply means we delete',
          'No one, unless and until you agree to a new submission',
        ],
        [
          '**Talent pool — Germany**',
          'As above',
          '**Consent**, Art 6(1)(a), because German practice treats a *Talentpool* as consent-based. Without consent we delete at 6 months',
          'Consent duration, maximum 24 months, withdrawable at any moment',
          'As above',
        ],
        [
          '**Placement administration** — engagement records, invoicing the client, fee and guarantee periods',
          'Your name, role, start date, rate, client, contract references',
          '**Contract**, Art 6(1)(b), where we contract with you; **legal obligation**, Art 6(1)(c), for accounting; **legitimate interests** for fee and guarantee records',
          'Engagement + **3 years**; accounting records **5 years**',
          'Client; accountants; payment providers; tax authorities on lawful request',
        ],
        [
          '**Honouring your objection** — making sure that once you tell us to stop, we never source you again',
          'A one-way (SHA-256) hash of your email address and a one-way hash of your profile URL, and nothing else',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: paradoxically we must keep a minimal record in order to respect your wishes; deleting you entirely would mean re-sourcing you next quarter and bothering you again.*',
          '**Indefinite**, because that is the point',
          'No one',
        ],
        [
          '**Defending a legal claim**, if one arises',
          'Whatever is relevant to the claim',
          '**Legitimate interests**, Art 6(1)(f). *Balancing: narrow, reactive, and limited to what a claim actually concerns.*',
          'Until the claim and any appeal period ends',
          'Our legal advisers; a court or authority if required',
        ],
      ],
    },
    {
      k: 'p',
      t: '**The suppression record, in full.** We keep a one-way (SHA-256) hash of your email address and a one-way hash of your profile URL, and nothing else — no name, no employer, no notes, no history. We cannot reverse either hash. It exists only so an automated check can stop us contacting you again, which is why we keep it indefinitely; deleting it would mean re-sourcing you next quarter. Ask us and we will confirm whether you are on it.',
    },

    { k: 'h', level: 3, id: 's6-6', t: '6.6 Special-category data' },
    {
      k: 'p',
      t: 'We do not seek it, we do not want it, and we have no realistic legal condition for holding it. If you volunteer it — a health condition explaining a career break, a religious observance affecting availability, trade-union involvement — we will delete or redact it rather than pass it on, and it plays no part in any assessment.',
    },
    {
      k: 'p',
      t: 'The only exception is a genuine, specific accommodation you ask us to arrange for an interview. In that case we ask for your **explicit consent** to pass on the minimum needed to make the arrangement, we tell you exactly what we will say, and we delete it once the interview is done. You can refuse and still be represented.',
    },

    { k: 'h', level: 3, id: 's6-7', t: '6.7 Criminal records: we do not touch them' },
    {
      k: 'p',
      t: 'We collect no criminal-conviction or offence data, we request none, and we forward none. The law permits processing it only under official-authority control or where a specific national law authorises it, and no such authorisation exists for a private Moldovan recruitment intermediary. If a role requires a background check, the client carries it out after handover, under its own national law and with its own legal basis. Our client contracts say so.',
    },

    { k: 'h', level: 3, id: 's6-8', t: '6.8 We do not screen you with AI' },
    {
      k: 'p',
      t: '**We do not use automated decision-making or AI screening to evaluate candidates.** No AI scoring, no CV-ranking algorithms, no automated filtering. Every shortlist we send is assembled by a person who has read your profile, and every rejection is a human decision with a human reason we can explain to you.',
    },
    {
      k: 'p',
      t: 'We say this for a legal reason as well as an ethical one. Where a recruiter produces an automated score and the client hires off the top of the list, the recruiter — not the client — is the one making the decision, with all the obligations that follow. We prefer not to be in that position, and you probably prefer we were not either.',
    },
    {
      k: 'p',
      t: 'If this ever changes, we will update this section **before** deploying anything, we will complete a data protection impact assessment first, we will keep a human who can and does overturn the tool’s output, we will record every override, and you will keep the right to a human review, to state your case, and to contest the outcome.',
    },
    {
      k: 'p',
      t: '**We also do not use, and will refuse to use, any tool that claims to infer emotion, enthusiasm, confidence or honesty from your face or your voice.** Those are prohibited outright in the EU, and they do not work.',
    },

    {
      k: 'h',
      level: 3,
      id: 's6-9',
      t: '6.9 Joint controllership with clients: the essence of the arrangement',
    },
    {
      k: 'p',
      t: 'Where we and a client are joint controllers for the act of sharing your profile, our agreement with the client provides, in substance:',
    },
    {
      k: 'table',
      head: ['Question', 'Who is responsible'],
      rows: [
        [
          'Giving you privacy information before we share your profile',
          '**TalentSync**, before the profile is sent',
        ],
        [
          'Giving you privacy information about the client’s own hiring process',
          '**The client**, at first contact with you',
        ],
        ['Answering an access, erasure or objection request about our records', '**TalentSync**'],
        ['Answering the same about the client’s records', '**The client**'],
        [
          'Notifying a personal data breach',
          'Each party notifies the other, and its own supervisory authority, on the terms of the services agreement',
        ],
        [
          'Deleting your data on request',
          'Each party deletes its own copy; we pass your request on and confirm back to you',
        ],
        ['Point of contact for you', '**Either of us.** You choose. We will not bounce you between us'],
      ],
    },
    {
      k: 'p',
      t: 'You may exercise your rights against either party regardless of this allocation. That is your statutory right and no contract can remove it.',
    },

    { k: 'h', level: 3, id: 's6-10', t: '6.10 Engineers engaged under our hourly collaboration model' },
    {
      k: 'p',
      t: 'If you work with a client through our flexible hourly model, the picture is a little different, so here it is separately.',
    },
    {
      k: 'p',
      t: '**Who you contract with — us, the client, or an employer — is settled in the engagement contract, and we tell you in writing who your counterparty is before you commit to anything.** Whichever it turns out to be, the data responsibilities fall as follows.',
    },
    {
      k: 'ul',
      items: [
        '**We are the controller** for the engagement records we hold — the contract we are party to, the identity and tax documents we are required to collect, your bank details where we pay you, the timesheets and invoices we handle, and the record of your engagement — on the basis of **contract** (Art 6(1)(b)) and **legal obligation** (Art 6(1)(c)) for tax and accounting filings.',
        '**The client is the controller** for everything its systems generate about your work: commits, tickets, code review, access logs, calendar, internal chat, performance conversations. The client retains full technical and operational control of the engagement, which is the whole point of the model — and that control comes with the client’s own data protection responsibilities and its own privacy notice, which the client must give you.',
        '**For timesheets and billing we and the client are likely joint controllers**, because we jointly decide what gets recorded and why. The allocation in [§6.9](#s6-9) applies, adapted in the engagement contract.',
      ],
    },
    {
      k: 'p',
      t: 'We do not monitor your work. We do not receive your keystrokes, screenshots, activity scores or productivity metrics, we do not ask a client for them, and we will not accept them if offered.',
    },

    { k: 'h', level: 3, id: 's6-11', t: '6.11 If you want us to stop' },
    {
      k: 'p',
      t: 'One line of email is enough. “Remove me” is enough. Reply to any message we sent you. You do not need a form, an account, a reason, or a formal request.',
    },
    {
      k: 'p',
      t: '**We stop immediately.** In practice: we remove you from every live search and cancel every scheduled message on the day we read your request, and we confirm in writing within five working days. We do not send a final follow-up, and we do not ask why. We then delete your profile in line with [§10](#s10), and keep only the hashed suppression record described in [§6.5](#s6-5) so that we do not accidentally source you again in six months.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 7 */
    { k: 'h', level: 2, id: 's7', t: '7. People who apply for a job at TalentSync itself' },
    {
      k: 'p',
      t: 'Our [careers pages](/careers/) advertise roles at TalentSync — recruiters, business development. Applying means emailing [victor@talentsync.eu](mailto:victor@talentsync.eu) with a subject line the site prefills. Here we are the hiring employer, not an intermediary.',
    },
    {
      k: 'table',
      head: ['Purpose', 'Data', 'Lawful basis', 'Retention', 'Recipients'],
      rows: [
        [
          'Assessing your application for the role you applied for',
          'Your email and its attachments: CV, cover letter, contact details, work history, education, references you offer',
          '**Steps prior to a contract**, Art 6(1)(b), and **legitimate interests**, Art 6(1)(f), in running a fair recruitment process. *Balancing: you applied; we process only what you sent, for the purpose you sent it for.*',
          'Process + **6 months** for an unsuccessful application, then deleted',
          'TalentSync hiring team only. Not shared with clients — ever',
        ],
        [
          'Keeping your speculative application on file',
          'As above',
          '**Legitimate interests**, Art 6(1)(f), where you sent it speculatively. *Balancing: you chose to send it for exactly this purpose.*',
          '**12 months**, then deleted unless you ask us to keep it longer',
          'TalentSync only',
        ],
        [
          'Employing you, if we make an offer',
          'Contract, identity, tax, payroll and statutory records',
          '**Contract** and **legal obligation**',
          'Per Moldovan employment and tax law',
          'Accountants; state authorities as required',
        ],
      ],
    },
    {
      k: 'p',
      t: 'Do not send us a photograph, your date of birth, your marital status or anything about your health. We do not need any of it and we will delete it.',
    },
    {
      k: 'p',
      t: 'Applications sent to us for a TalentSync role are **never** entered into our candidate talent pool or shown to a client. Different purpose, different data, walled off.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 8 */
    { k: 'h', level: 2, id: 's8', t: '8. Who receives your data' },
    {
      k: 'p',
      t: 'We do not sell personal data. We do not share it for anyone else’s marketing. We do not trade candidate profiles.',
    },
    {
      k: 'p',
      t: 'These are everyone who receives personal data from us, what they get and why. It is a closed list: if we add a recipient that changes the picture materially, we update this table and the “last updated” date at the top.',
    },
    {
      k: 'table',
      head: ['Recipient', 'What they do for us', 'Whose data, and what', 'Location', 'Basis / safeguard'],
      rows: [
        [
          '**Our clients** — technology companies, principally in the EU/EEA, the UK and internationally, including the companies named on our website',
          'Consider you for a role, or engage you',
          '**Candidates:** the profile you agreed to send, to the specific named client',
          'EU/EEA, UK, and elsewhere',
          'Each client is a separate controller. Written agreement including the joint-controller allocation at [§6.9](#s6-9) and, where the client exports data to us, EU Standard Contractual Clauses',
        ],
        [
          '**Railway Corp.**',
          'Hosting the website container and web server',
          '**Visitors:** access logs including IP address',
          'European Union (Amsterdam)',
          'Processor. Art 28 data processing agreement. The container runs inside the EU, so the logs need no transfer safeguard',
        ],
        [
          '**Google Workspace**',
          'Our business email and calendar',
          '**Everyone:** all correspondence',
          'EU/US',
          'Processor. Art 28 DPA; SCCs and/or EU–US Data Privacy Framework certification',
        ],
        [
          '**Google Drive**, part of the same Google Workspace',
          'Where candidate and client records are stored and organised. We run no separate applicant-tracking system: the records live in email and in Drive',
          '**Candidates and client contacts:** profiles, notes, status',
          'European Union',
          'Processor. Art 28 DPA under the Google Workspace data processing terms',
        ],
        [
          '**Calendly LLC**',
          'Meeting scheduling, if you use the booking link',
          '**Anyone who books:** name, email, time, notes',
          'United States',
          'Processor. Art 28 DPA; EU SCCs and/or DPF certification',
        ],
        [
          '**LinkedIn (LinkedIn Ireland UC)**',
          'The platform we use to find and message engineers',
          '**Candidates:** the message we send you, and the fact we viewed your profile',
          'EEA for EEA users; US for others',
          'Separate controller for its own platform processing, under its own privacy policy',
        ],
        [
          '**Google Ireland Ltd (Google Analytics 4)**',
          'Website analytics — **only for visitors who accepted analytics on the cookie banner**',
          '**Visitors who consented:** analytics cookie identifier, pages viewed, referrer, device and browser type, IP address (used to derive approximate location, not stored), three click events',
          'EU/US — Google LLC in the United States acts as sub-processor',
          'Processor. Google Analytics data processing terms (Art 28); EU–US Data Privacy Framework certification and EU SCCs for the US leg. Event data retained 2 months',
        ],
        [
          '**Google (Search Console) and Microsoft (Bing Webmaster Tools)**',
          'Reporting which searches lead to our site',
          'Aggregated search statistics. No individual visitor data, nothing placed on your device',
          'EU/US',
          'Not personal data in our hands; listed for completeness',
        ],
        [
          '**Our accountants and auditors**',
          'Bookkeeping, statutory accounts, tax filings',
          '**Client contacts and engaged engineers:** invoicing and payment data',
          'Moldova',
          'Professional obligation of confidentiality; legal obligation',
        ],
        [
          '**Our bank**',
          'Paying and being paid. Invoices are settled by **bank transfer**; we use no card payment processor, and this website takes no payments',
          '**Engaged engineers and client contacts:** payment details',
          'EU / Moldova',
          'Necessary to perform the contract',
        ],
        [
          '**Our legal advisers**',
          'Advice, and defending claims',
          'Only what a specific matter needs',
          'Moldova / EU',
          'Legal professional privilege; legitimate interests',
        ],
        [
          '**Public authorities**',
          'Where the law compels disclosure',
          'Only what is compelled',
          'Moldova / relevant state',
          'Legal obligation. We satisfy ourselves the request is lawful and, unless legally forbidden, we tell you',
        ],
      ],
    },
    { k: 'hr' },

    /* ------------------------------------------------------------------ 9 */
    { k: 'h', level: 2, id: 's9', t: '9. International transfers' },
    {
      k: 'p',
      t: 'We are in Moldova. Most of the people in this policy are not. Here is exactly how data moves, because clients ask and candidates deserve to know.',
    },
    { k: 'h', level: 3, id: 's9-1', t: '9.1 Moldova’s status' },
    {
      k: 'p',
      t: '**There is no European Commission adequacy decision for Moldova.** Moldova’s own law is a near-verbatim GDPR transposition in force since 23 August 2026, and Moldova ratified Convention 108+ in May 2026 — but neither of those is an adequacy decision and we do not pretend otherwise. Any transfer of personal data from the EEA to us needs its own safeguard.',
    },
    { k: 'h', level: 3, id: 's9-2', t: '9.2 The flows, one by one' },
    {
      k: 'table',
      head: ['The flow', 'Is it a restricted transfer?', 'Who is the exporter', 'Safeguard'],
      rows: [
        [
          '**You are an engineer in the EU and you email us your CV, or book via Calendly**',
          '**No.** You sent it yourself; there is no exporter',
          '—',
          'None needed. The GDPR still governs everything we do with it, and this policy still applies in full',
        ],
        ['**We message you on LinkedIn and you reply**', '**No**, for the same reason', '—', 'None needed'],
        [
          '**An EU or EEA client sends us personal data** — a brief naming employees, interview feedback, an existing engineer’s details',
          '**Yes**',
          '**The client**',
          '**EU Standard Contractual Clauses, Decision 2021/914, Module One (controller-to-controller)**, in our services agreement, together with our direct GDPR obligations under Art 3(2). Module Two plus an Art 28 DPA where we genuinely act as processor for a defined mandate',
        ],
        [
          '**A UK client sends us personal data**',
          '**Yes**',
          'The client',
          'The **UK International Data Transfer Agreement**, or the **UK Addendum** to the EU SCCs, plus a transfer risk assessment',
        ],
        [
          '**We send a candidate profile to a client in the EEA**',
          'Not a transfer that weakens your protection',
          '—',
          'The GDPR applies to us directly under Article 3(2) and continues to govern the profile after we send it; the client agreement records that',
        ],
        [
          '**We send a candidate profile to a client outside the EEA, including the UK**',
          'Yes',
          'TalentSync',
          'EU Standard Contractual Clauses, Module One, in the client agreement, plus our direct GDPR obligations',
        ],
        [
          '**We use a US-based provider** — Calendly, and Google Workspace for our email and calendar',
          'Yes, to the extent the provider processes outside the EEA',
          'TalentSync',
          'EU–US Data Privacy Framework certification where the provider holds one, otherwise EU SCCs, plus an Art 28 DPA in every case',
        ],
        [
          '**You accept analytics and Google Analytics 4 records your visit**',
          'Yes — Google Ireland Ltd is the processor, and Google LLC in the United States processes the data as its sub-processor',
          'TalentSync',
          'Google LLC’s EU–US Data Privacy Framework certification, backed by the EU SCCs in the Google Analytics data processing terms. If you reject analytics, this flow never happens',
        ],
      ],
    },
    { k: 'h', level: 3, id: 's9-3', t: '9.3 What you can ask for' },
    {
      k: 'p',
      t: 'A copy of the safeguards for any transfer that concerns you. Write to [victor@talentsync.eu](mailto:victor@talentsync.eu). Clients should see [Annex B](#annex-b), which sets out the instruments we sign and why.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 10 */
    { k: 'h', level: 2, id: 's10', t: '10. How long we keep things' },
    {
      k: 'p',
      t: 'Nothing is kept indefinitely except the suppression list, and that exists only so we can leave you alone.',
    },
    {
      k: 'table',
      head: ['Record', 'Period', 'Why that period'],
      rows: [
        ['Web-server access logs', '**30 days**', 'Security and debugging only; no longer use exists'],
        [
          'Google Analytics 4 event data — visitors who accepted analytics',
          '**2 months**',
          'The shortest retention Google Analytics offers; withdrawing consent stops collection at once',
        ],
        [
          'Your cookie-banner choice (`ts_consent`, in your own browser)',
          '**6 months**, or until you clear your browser storage',
          'Long enough not to nag you; short enough that consent is re-confirmed',
        ],
        [
          'Profile recorded during a search, never approached',
          '**30 days**',
          'No contact was ever made and none will be. Nothing justifies keeping it',
        ],
        [
          'Sourced prospect who was contacted and never replied',
          '**6 months** from sourcing',
          'No relationship formed. Minimal interest in keeping it',
        ],
        [
          'Candidate in an active process',
          'Process + **6 months**',
          'Long enough to be accountable for the decision and to answer a complaint; short enough not to hoard',
        ],
        [
          'Unsuccessful candidate, talent pool',
          '**24 months from last meaningful contact**, with a check-in at 22 months',
          'The ceiling European regulators treat as acceptable for a candidate pool, counted from last contact and disclosed to you in advance',
        ],
        [
          'Rejected applicant, Germany, without pool consent',
          '**6 months**',
          'Statutory claim windows under German equal-treatment law',
        ],
        [
          'Placed candidate / engaged engineer',
          'Engagement + **3 years**',
          'The general limitation period for contract and fee claims under Moldovan law',
        ],
        [
          'Accounting and tax records',
          '**5 years**',
          'Moldovan accounting and tax law. Not our choice',
        ],
        [
          'Client contact records',
          'Relationship + **24 months** from last contact',
          'Ordinary business-relationship retention',
        ],
        ['Prospect contact, no relationship formed', '**12 months** from last contact', 'Nothing justifies longer'],
        [
          'TalentSync job applicant, unsuccessful',
          'Process + **6 months**; speculative applications **12 months**',
          'Claim window plus a short grace period',
        ],
        [
          'Marketing suppression / objection list',
          '**Indefinite** — a one-way hash of your email address and a one-way hash of your profile URL, and nothing else',
          'Required in order to honour your objection permanently',
        ],
        [
          'Records relevant to a live legal claim',
          'Until the claim and any appeal period end',
          'Then deleted',
        ],
      ],
    },
    {
      k: 'p',
      t: '**These are not aspirations.** The 24-month clock is enforced with a diarised check-in at 22 months and a hard delete at 24. “Review annually” is not a retention policy and we do not run one.',
    },
    {
      k: 'p',
      t: 'At the end of a period we delete, or we irreversibly anonymise for statistical purposes. Pseudonymised data is still personal data and we do not pretend otherwise.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 11 */
    { k: 'h', level: 2, id: 's11', t: '11. Security' },
    {
      k: 'p',
      t: 'We are a small company and we secure accordingly: fewer systems, fewer copies, fewer people with access.',
    },
    {
      k: 'ul',
      items: [
        '**Access control.** Personal data is reachable only by the people who need it for their job. **Every account that can reach personal data requires multi-factor authentication.** Access is removed the day someone leaves.',
        '**Encryption.** The website is served over HTTPS only. Data at rest in our email and records systems is encrypted by the provider. Laptops use full-disk encryption.',
        '**Minimisation by design.** The website has no forms and no database, so there is no candidate database on the public internet to breach. Candidate data lives in a small number of access-controlled business systems, not in spreadsheets on desktops.',
        '**Vendors.** **The providers listed in [§8](#s8) are each under a written Article 28 processing agreement** with confidentiality, security and sub-processor terms, and an appropriate transfer mechanism.',
        '**Confidentiality.** Everyone at TalentSync is bound by written confidentiality obligations and is briefed on this policy and on our sourcing rules.',
        '**Records.** We maintain a record of processing activities as required by Article 30. We do not rely on the small-organisation exemption, because recruitment processing is continuous rather than occasional.',
      ],
    },
    {
      k: 'p',
      t: '**Breaches.** If a personal data breach is likely to result in a risk to your rights, we notify the CNPDCP and each EU supervisory authority whose data subjects are affected — we have no EU main establishment, so there is no single lead authority — without undue delay and, where feasible, within **72 hours** of becoming aware. Where the risk to you is **high**, we tell you directly, without undue delay, in plain language: what happened, what it means for you, and what we are doing.',
    },
    {
      k: 'p',
      t: 'No system is perfectly secure and anyone who tells you otherwise is selling something. If you believe you have found a vulnerability in our site or our handling, please write to [victor@talentsync.eu](mailto:victor@talentsync.eu). We will respond, we will fix it, and we will not threaten you.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 12 */
    { k: 'h', level: 2, id: 's12', t: '12. Your rights, and how to use them' },
    {
      k: 'note',
      t: 'Your right to object — read this one first',
      body: [
        'Everything we do with candidate data rests on **legitimate interests**. That means **you can object at any time, and you do not need a reason**. Reply “remove me” to any message from us, or write to [victor@talentsync.eu](mailto:victor@talentsync.eu).',
        'For sourcing, outreach and the talent pool we will not argue the point — we stop, and we add a one-way hash of your details to a suppression list so that we never approach you again. Article 21 GDPR and Article 21 of Law No. 195/2024.',
      ],
    },
    {
      k: 'p',
      t: 'Your other rights come from the GDPR and from Moldovan Law No. 195/2024 in identical terms. We apply them to everyone in this policy, wherever you live.',
    },
    {
      k: 'table',
      head: ['Right', 'What it means in practice'],
      rows: [
        [
          '**Access**',
          'Ask what we hold about you and get a copy, plus the context: why, where we got it, who has seen it, how long we will keep it',
        ],
        [
          '**Rectification**',
          'Correct anything wrong, and complete anything missing. If our note about your experience is inaccurate, tell us and we will fix it',
        ],
        [
          '**Erasure**',
          'Have your data deleted, where we have no overriding reason to keep it. For candidate data, we almost never do',
        ],
        [
          '**Restriction**',
          'Have us freeze processing while a dispute about accuracy or lawfulness is resolved',
        ],
        [
          '**Portability**',
          'Receive the data you gave us in a structured, machine-readable format, or have it sent to someone else, where processing rests on consent or contract',
        ],
        [
          '**Objection to direct marketing**',
          'Absolute. No balancing, no argument, no delay',
        ],
        [
          '**Withdraw consent**',
          'Where we rely on consent — a German talent-pool entry, a published testimonial, an interview accommodation — withdraw it at any time. It is as easy to withdraw as it was to give, and withdrawal does not affect what we did lawfully beforehand',
        ],
        [
          '**Human decision-making**',
          'Not to be subject to a decision based solely on automated processing that significantly affects you. We do not make such decisions ([§14](#s14))',
        ],
        ['**Complain**', 'To a supervisory authority — see [§17](#s17)'],
      ],
    },
    { k: 'h', level: 3, id: 's12-1', t: '12.1 How to exercise them' },
    {
      k: 'p',
      t: 'Email **[victor@talentsync.eu](mailto:victor@talentsync.eu)**. That one address reaches the person who answers, and it is the only one you need.',
    },
    {
      k: 'p',
      t: 'Tell us what you want. There is no form, no template, no portal and no account. “Please delete everything you have on me” is a valid request and we will treat it as one.',
    },
    { k: 'h', level: 3, id: 's12-2', t: '12.2 What happens next' },
    {
      k: 'ul',
      items: [
        '**We reply within one month** of receiving your request. If it is genuinely complex, or you have made several, we may extend by up to two further months — and we will tell you within the first month if we do, with the reason.',
        '**It is free.** We only charge, or refuse, if a request is manifestly unfounded or excessive, and we would explain why and how to challenge that.',
        '**We may ask you to confirm who you are**, but only where we genuinely cannot tell — and we will ask for the least intrusive proof that works. If you email from the address we hold for you, that is usually enough. We will not demand a passport scan to answer an email.',
        '**If we cannot do what you asked**, we say so, explain why, and tell you how to complain.',
      ],
    },
    { k: 'h', level: 3, id: 's12-3', t: '12.3 If a client also holds your data' },
    {
      k: 'p',
      t: 'Ask us and we will pass your request to the client and confirm back to you when we have. You do not have to chase two companies to get one thing done.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 13 */
    { k: 'h', level: 2, id: 's13', t: '13. Cookies and similar technologies' },
    { k: 'h', level: 3, id: 's13-1', t: '13.1 Where we stand' },
    {
      k: 'p',
      t: '**talentsync.eu stores one thing without asking, and everything else only with your consent.** The one thing is `ts_consent`, a local-storage record of your answer on the cookie banner — created only after you answer, holding nothing but that answer and its date, kept six months. It is strictly necessary and needs no consent itself. The everything else is **Google Analytics 4**, which sets two cookies (`_ga` and `_ga_4D9N8H4S48`, two years each) and only after you click Accept. There is no advertising technology, no cross-site tracking, no data broker, no marketing pixel, no fingerprinting and no session recording.',
    },
    {
      k: 'p',
      t: 'The Montserrat typeface is served from our own domain, so reading this page does not hand your IP address to a font CDN either. Before you accept analytics, the one record our server keeps is the access log described in [§4.2](#s4-2) — not a cookie, and deleted after 30 days.',
    },
    { k: 'h', level: 3, id: 's13-2', t: '13.2 How the consent banner works' },
    {
      k: 'p',
      t: 'Google Search Console and Bing Webmaster Tools set no cookies on our site. They report aggregated statistics that Google and Microsoft already hold from their own search results. Nothing is placed on your device and no consent is needed.',
    },
    {
      k: 'p',
      t: 'Google Analytics 4 is different, and this is how it is gated — commitments, not intentions:',
    },
    {
      k: 'ul',
      items: [
        '**The banner appears on your first visit to any page**, before any analytics cookie or identifier is set, whatever you click. Every Consent Mode signal defaults to denied until you choose, and the Google script is not on the page until you accept.',
        '**Rejecting is exactly as easy as accepting** — same banner, same prominence, one click, no pre-ticked boxes, no dark patterns, no “legitimate interests” tab hiding switches you have to turn off individually. Reject comes first in the keyboard order.',
        '**Closing the banner, or pressing Escape, counts as a refusal** and is remembered as one for six months.',
        '**You can change your mind at any time** from the “Cookie settings” link in the footer of every page, and withdrawal takes effect immediately.',
        '**Refusing costs you nothing.** The site is identical either way. There is no cookie wall.',
        '**This policy and the [cookie policy](/cookies/) are updated first** — naming the tool, what it collects, who receives it and how long it is kept — before any further tool ships, not after.',
      ],
    },
    { k: 'h', level: 3, id: 's13-3', t: '13.3 The full cookie policy' },
    {
      k: 'p',
      t: 'A dedicated [cookie policy](/cookies/) sets out in full what this site does and does not store in your browser, and lists every cookie by name, purpose, provider, type and lifetime. Where this section and that page differ, that page is more detailed and more current.',
    },
    { k: 'h', level: 3, id: 's13-4', t: '13.4 A standing commitment' },
    {
      k: 'p',
      t: 'Adding a chat widget, an embedded booking widget, a LinkedIn Insight tag, a YouTube embed, a heatmap tool or a hosted form would each add a third party to [§8](#s8), and most of them would store something on your device. We treat that as a decision with consequences, not a quick task: this policy and the cookie page are updated **before** any such thing ships — not after. The engineering rule is simple: if a new third-party domain appears in the network tab, the cookie page is out of date and must be updated before release.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 14 */
    { k: 'h', level: 2, id: 's14', t: '14. Automated decision-making and AI' },
    {
      k: 'p',
      t: '**We do not use automated decision-making or AI screening to evaluate candidates.** We do not make decisions about you by automated means alone, and we do not profile you.',
    },
    { k: 'p', t: 'Specifically, and stated so you can hold us to it:' },
    {
      k: 'ul',
      items: [
        'no automated CV scoring;',
        'no algorithmic ranking of candidates;',
        'no automated rejection;',
        'no AI-driven video interview analysis;',
        'no tool that claims to infer emotion, personality, enthusiasm or honesty from your face, voice or writing;',
        'no automated inference of protected characteristics from your name, photo or career history.',
      ],
    },
    {
      k: 'p',
      t: 'Every shortlisting decision is made by a person who has read your profile. Every rejection has a human reason, and we will give it to you if you ask.',
    },
    {
      k: 'p',
      t: 'If we ever adopt AI assistance, we will complete a data protection impact assessment before deploying it, update this section first, keep a human reviewer with real authority to overrule the tool, log every override, and preserve your right to human intervention, to express your point of view and to contest the outcome.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 15 */
    { k: 'h', level: 2, id: 's15', t: '15. Children' },
    {
      k: 'p',
      t: 'Our services are for working professionals and our website is aimed at businesses. We do not knowingly collect personal data from anyone under 16, and we have no reason to.',
    },
    {
      k: 'p',
      t: 'If you believe a child’s data has reached us, write to [victor@talentsync.eu](mailto:victor@talentsync.eu) and we will delete it promptly.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 16 */
    { k: 'h', level: 2, id: 's16', t: '16. Changes to this policy' },
    {
      k: 'p',
      t: 'We update this policy when what we do changes — a new tool, a new recipient, a new purpose, a change in the law.',
    },
    {
      k: 'ul',
      items: [
        'The **version number and “last updated” date** at the top always reflect the current text.',
        '[Annex C](#annex-c) records what changed and when.',
        'For a change that materially affects you — a new purpose, a new category of recipient, a longer retention period, or the introduction of automated decision-making — we will **tell you before it takes effect**, by email where we hold your address, and we will not apply it to data we already hold without a lawful basis for doing so.',
        'We do not make material changes retroactively and we do not rely on “your continued use of the site constitutes acceptance”. That is not consent and we will not pretend it is.',
      ],
    },
    {
      k: 'p',
      t: '**Where this policy starts.** Every engineer whose data we held on the date at the top of this page was sent this notice by email on that date. Before that date our sourcing practice was not documented to this standard; this policy describes what we do from that date onward.',
    },
    { k: 'hr' },

    /* ----------------------------------------------------------------- 17 */
    { k: 'h', level: 2, id: 's17', t: '17. Complaints' },
    {
      k: 'p',
      t: 'Please come to us first — [victor@talentsync.eu](mailto:victor@talentsync.eu). Most things are a misunderstanding we can fix in a day, and we would rather fix it than read about it from a regulator.',
    },
    {
      k: 'p',
      t: 'But you never have to come to us first, and you can go to a supervisory authority at any time, whether or not you have contacted us.',
    },
    { k: 'h', level: 3, id: 's17-1', t: '17.1 Moldova — our supervisory authority' },
    {
      k: 'p',
      t: '**Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP)** — National Centre for Personal Data Protection. 48 Serghei Lazo Street, MD-2004 Chișinău, Republic of Moldova. Telephone [+373 22 820 801](tel:+37322820801) · [centru@datepersonale.md](mailto:centru@datepersonale.md) · [datepersonale.md](https://datepersonale.md/en/)',
    },
    { k: 'h', level: 3, id: 's17-2', t: '17.2 European Union / EEA' },
    {
      k: 'p',
      t: 'If you are in the EU or EEA, you can complain to the data protection authority **of the country where you live, where you work, or where the problem happened**. You do not have to complain in Moldova, and you do not have to travel or write in a foreign language.',
    },
    {
      k: 'p',
      t: 'Because we have no establishment in the EU, the “one-stop shop” does not apply to us — which is good news for you: your own national authority is competent to handle your complaint directly. The full list is published by the European Data Protection Board at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en).',
    },
    {
      k: 'p',
      t: 'We have not appointed an Article 27 representative in the EU — see [§1.3](#s1-3). Until we publish one, write to us directly at [victor@talentsync.eu](mailto:victor@talentsync.eu). That does not limit your right to complain to your own authority, and you never have to go through us to use it.',
    },
    { k: 'h', level: 3, id: 's17-3', t: '17.3 United Kingdom' },
    {
      k: 'p',
      t: '**Information Commissioner’s Office (ICO)** — Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF, United Kingdom. Helpline 0303 123 1113 · [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/)',
    },
    { k: 'h', level: 3, id: 's17-4', t: '17.4 Courts' },
    {
      k: 'p',
      t: 'You also have the right to an effective judicial remedy, and to compensation for damage caused by a breach of data protection law. Nothing in this policy limits that.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------ annex A */
    {
      k: 'h',
      level: 2,
      id: 'annex-a',
      t: 'Annex A — Information for candidates whose data we obtained from public sources',
    },
    {
      k: 'p',
      t: 'This is our **Article 14 notice**. It is included in full in the first message we send to any engineer we sourced from a public profile — every first message, without exception.',
    },
    {
      k: 'p',
      t: 'It is published in full, word for word, as its own page: **[talentsync.eu/candidate-privacy/](/candidate-privacy/)**. That page also carries the short version we use where a channel cannot take the full text, and the internal rules we hold ourselves to when we use it. It lives at its own URL so that it can be linked from an outreach email, read on its own, and checked against what we actually sent you.',
    },
    /**
     * Reproducing the notice HERE as well needs one shared export, imported from
     * `./candidate-privacy` — never a hand-copy. That import is blocked today:
     * `scripts/check-legal-fidelity.mjs` loads each of these five files straight
     * into Node with type stripping, and Node cannot resolve an extensionless
     * relative VALUE import (`import type` is erased, so the existing `./types`
     * import is fine). Adding `.ts` to the specifier needs
     * `allowImportingTsExtensions` in tsconfig.json. Until one of those two is
     * changed, the annex points instead of reproducing, and says so plainly.
     */
    {
      k: 'p',
      t: 'It is not reproduced here as well. One notice, one canonical text, one place to change it.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------ annex B */
    { k: 'h', level: 2, id: 'annex-b', t: 'Annex B — What a client can ask us for' },
    {
      k: 'p',
      t: 'We will supply all of the following without argument or an NDA fight. Ask [victor@talentsync.eu](mailto:victor@talentsync.eu).',
    },
    {
      k: 'table',
      head: ['Document', 'What it is'],
      rows: [
        [
          '**EU Standard Contractual Clauses, Module One**',
          'Controller-to-controller clauses for personal data you send us. This is the correct module: we act as an independent controller for candidate data, and signing processor clauses would contradict how we actually operate',
        ],
        [
          '**Standard Contractual Clauses, Module Two, plus an Article 28 DPA**',
          'Where you genuinely instruct us as a processor for a defined mandate, including every engagement under our hourly collaboration model',
        ],
        ['**UK IDTA or UK Addendum**', 'For UK exporters, plus our input to your transfer risk assessment'],
        [
          '**Joint-controller allocation**',
          'The Article 26 clause covering shortlist sharing, summarised at [§6.9](#s6-9)',
        ],
        [
          '**Extract from our record of processing activities**',
          'Scoped to the processing that concerns you',
        ],
        [
          '**Sub-processor and recipient list**',
          'Section [§8](#s8), with locations and safeguards, plus advance notice of changes',
        ],
        [
          '**Security summary**',
          'The measures in [§11](#s11), in the form of a completed security questionnaire if you have one',
        ],
        [
          '**Breach notification terms**',
          'Agreed in the services agreement; we commit to notify you without undue delay and in any event within 24 hours of becoming aware',
        ],
        [
          '**Confirmation of our automated decision-making position**',
          'We do not use AI screening. This matters to you as well as to us: if a recruiter hands you an automated ranking and you hire off the top of it, the recruiter has made an automated decision on your behalf and you have inherited the exposure',
        ],
        [
          '**Our legitimate interests assessment for candidate sourcing**',
          'The written LIA behind [§6.4](#s6-4)',
        ],
      ],
    },
    {
      k: 'p',
      t: '**The transfer instrument, for your counsel.** Where an EEA or UK client sends us personal data, the client is the exporter. We sign the client’s preferred instrument — the 2021 EU SCCs (Module One), the UK IDTA, or the UK Addendum — and, because we are directly subject to the GDPR under Article 3(2), we additionally warrant direct GDPR compliance in the services agreement, which is the substantive protection Chapter V is there to secure. We will re-paper if and when the Commission adopts clauses for importers already subject to the GDPR.',
    },
    {
      k: 'p',
      t: '**One thing we will decline:** we will not sign a processor DPA that describes us as processing *candidate* data solely on your instructions. It is not true, it contradicts this published policy, and a documented inconsistency between a company’s contracts and its privacy notice is worse for both of us than getting the paperwork right. For the hourly collaboration model, where an engineer touches your systems and your data, processor terms are exactly right and we sign them.',
    },
    { k: 'hr' },

    /* ------------------------------------------------------------ annex C */
    { k: 'h', level: 2, id: 'annex-c', t: 'Annex C — Version history' },
    {
      k: 'table',
      head: ['Version', 'Date', 'Change'],
      rows: [
        [
          '1.0',
          '30 August 2026',
          'First publication. Covers Moldovan Law No. 195/2024 (in force 23 August 2026), EU GDPR via Article 3(2), and UK GDPR. Records the no-analytics, no-cookie position and the self-hosted typeface',
        ],
        [
          '1.1',
          '21 September 2026',
          'Google Analytics 4 enabled behind a consent banner (Consent Mode v2, basic mode). §4.1–§4.3, §8, §9.2, §10 and §13 rewritten to describe it; `ts_consent` and the two GA4 cookies documented; the short version updated. No change to candidate or client processing',
        ],
      ],
    },
    {
      k: 'p',
      t: '*This policy describes how TalentSync handles personal data. It does not create contractual rights beyond those the law already gives you, and nothing in it limits your statutory rights.*',
    },
  ],
}
