import type { LegalDoc } from './types'

/**
 * Imprint / legal notice — DECISIONS.md D1 row 24, raised by
 * 08-critique-completeness [HIGH] "Missing deliverable — imprint / legal notice page".
 *
 * TalentSync is Moldova-established, so German DDG §5 and Austrian ECG §5 do not
 * strictly bind. This page exists because DE/NL/AT/CH procurement teams look for
 * it as a matter of course and its absence reads as a shell company — and because
 * appointing an Art 27 EU representative creates an EU touchpoint that makes the
 * omission look deliberate rather than merely foreign.
 *
 * The provider block is the one drafted at the head of 04-terms.md, verbatim.
 * Almost every field is a {{TOKEN}}: this page is entity identification, and an
 * agent inventing a registration number would be the worst possible outcome.
 */
export const imprint: LegalDoc = {
  slug: 'imprint',
  path: '/imprint/',
  label: 'Imprint',
  h1: 'Legal notice and company details for TalentSync',
  metaTitle: 'Legal Notice / Impressum',
  metaDescription:
    'Entity identification for TalentSync: registered name, legal form, IDNO, registered office in Chișinău, VAT status, EU representative and site responsibility.',
  version: '1.0',
  updated: '2026-08-30',
  lede: 'Provider identification for https://talentsync.eu — the *Impressum* / legal notice that German, Austrian, Dutch and Swiss procurement teams look for. Everything here matches the provider block at the head of our [terms and conditions](/terms/).',
  body: [
    /* ---------------------------------------------------------- provider */
    { k: 'h', level: 2, id: 'provider', t: 'Provider' },
    {
      k: 'p',
      t: 'This website is operated by the company identified below. **TalentSync** is a trading name of S.R.L. “UNQENERGY”; there is no company registered under the name TalentSync, so procurement and invoicing use the registered name and IDNO in the table.',
    },
    {
      k: 'table',
      head: ['', ''],
      rows: [
        ['**Registered name**', 'S.R.L. “UNQENERGY”'],
        ['**Trading name**', 'TalentSync'],
        ['**Legal form**', 'societate cu răspundere limitată (SRL)'],
        ['**Country of incorporation**', 'Republic of Moldova'],
        ['**State registration number (IDNO)**', '1020600034949'],
        ['**Registered office**', '{{REGISTERED_ADDRESS}}, Chișinău, Republic of Moldova'],
        ['**VAT / fiscal status**', '{{VAT_STATUS}}'],
        [
          '**Employment-placement licence**',
          '{{PLACEMENT_LICENCE_STATUS}}',
        ],
        ['**Register**', 'Agenția Servicii Publice — State Register of Legal Entities, Republic of Moldova'],
      ],
    },

    /* ------------------------------------------------------------ people */
    { k: 'h', level: 2, id: 'representation', t: 'Authorised representative' },
    {
      k: 'p',
      t: '**{{FOUNDER_FULL_NAME}}**, {{FOUNDER_TITLE}}, is authorised to represent the company and is the person responsible for the content of this website within the meaning of § 18(2) of the German *Medienstaatsvertrag* and equivalent provisions elsewhere. Postal address as the registered office above.',
    },

    /* ----------------------------------------------------------- contact */
    { k: 'h', level: 2, id: 'contact', t: 'Contact' },
    {
      k: 'table',
      head: ['', ''],
      rows: [
        ['**General and commercial**', '[victor@talentsync.eu](mailto:victor@talentsync.eu)'],
        ['**Telephone**', '[+373 68 300 700](tel:+37368300700)'],
        [
          '**Legal, contractual and takedown notices**',
          '[legal@talentsync.eu](mailto:legal@talentsync.eu)',
        ],
        ['**Privacy and data protection**', '{{PRIVACY_EMAIL}}'],
        ['**LinkedIn**', '[linkedin.com/company/talentsync](https://linkedin.com/company/talentsync)'],
      ],
    },
    {
      k: 'p',
      t: 'There is no contact form on this site. Email and telephone reach the same people, and nothing you send is processed by a third-party form provider.',
    },

    /* ------------------------------------------------------------ EU rep */
    { k: 'h', level: 2, id: 'eu-representative', t: 'Representative in the European Union' },
    {
      k: 'p',
      t: 'Under Article 27 of Regulation (EU) 2016/679 we have appointed **{{EU_REP_NAME}}**, {{EU_REP_ADDRESS}}, **{{EU_REP_EMAIL}}**, as our representative in the European Union for data protection matters. You may contact them instead of, or as well as, contacting us.',
    },
    {
      k: 'p',
      t: 'Appointing a representative does not give us an establishment in the European Union. We have no EU branch, subsidiary or permanent establishment, and we do not hold ourselves out as having one.',
    },

    /* ----------------------------------------------------------- content */
    { k: 'h', level: 2, id: 'content', t: 'Responsibility for content' },
    {
      k: 'p',
      t: 'We take reasonable care over the content of this site, but we give no warranty that it is complete, accurate or current. Rates, timelines, cost comparisons and case-study outcomes are illustrative examples drawn from past engagements, not promises of any result you will achieve — see [clause A4 of our terms](/terms/#A4), which governs this in full.',
    },
    {
      k: 'p',
      t: 'Nothing on this site is legal, tax, employment, immigration, financial or technical advice, and nothing on it is an offer capable of acceptance.',
    },

    /* ------------------------------------------------------------- links */
    { k: 'h', level: 2, id: 'links', t: 'External links' },
    {
      k: 'p',
      t: 'This site links to third-party services, including Calendly and LinkedIn. We do not control and are not responsible for their content, availability, security or practices. Those links were checked for unlawful content when they were added; a link is not an endorsement, and we cannot monitor a linked site continuously. Tell us at [legal@talentsync.eu](mailto:legal@talentsync.eu) if you find a link we should remove and we will remove it.',
    },

    /* --------------------------------------------------------- copyright */
    { k: 'h', level: 2, id: 'copyright', t: 'Copyright, trade marks and takedown' },
    {
      k: 'p',
      t: 'The text, design, layout, graphics, imagery, code and case studies on this site are owned by us or licensed to us. You may read, print, quote and link to it, and search engines and AI assistants are expressly welcome to index it and cite it with attribution — [clause A6](/terms/#A6) sets out exactly what is permitted and what is not.',
    },
    {
      k: 'p',
      t: 'Third-party names, trade marks and logos on this site are the property of their owners and are used to identify clients and projects. Their appearance implies no endorsement. **If you are, or represent, a named organisation or a quoted individual and you want your name, logo, testimonial or case study removed or de-identified, email [legal@talentsync.eu](mailto:legal@talentsync.eu). We will remove or de-identify it within 5 business days of receipt, without asking you for reasons.**',
    },

    /* ---------------------------------------------------------- disputes */
    { k: 'h', level: 2, id: 'disputes', t: 'Consumer dispute resolution' },
    {
      k: 'p',
      t: 'We are not obliged, and are not willing, to take part in dispute-resolution proceedings before a consumer arbitration board.',
    },
    {
      k: 'p',
      t: 'That does not affect any consumer’s statutory rights. If you are an individual acting outside your trade, business or profession, you keep the protection of the mandatory law of the country where you habitually reside, you may bring proceedings against us in the courts of that country, and we will bring proceedings against you only in the courts of that country — see [clause A14.3](/terms/#A14-3) and [clause E11](/terms/#E11).',
    },

    /* -------------------------------------------------------- other docs */
    { k: 'h', level: 2, id: 'other-documents', t: 'The other legal documents' },
    {
      k: 'ul',
      items: [
        '[Terms and conditions](/terms/) — website terms, client terms of business for direct recruitment and for hourly collaboration, and candidate terms.',
        '[Privacy policy](/privacy/) — how we handle personal data.',
        '[Candidate privacy notice](/candidate-privacy/) — the Article 14 notice for engineers we source from public profiles.',
        '[Cookie policy](/cookies/) — every cookie this site can set, and when.',
      ],
    },
  ],
}
