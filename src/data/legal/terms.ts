import type { LegalDoc } from './types'

/**
 * Terms and Conditions, Parts A–E — from docs/plans/spec/04-terms.md.
 *
 * Every clause of the draft is here. What changed, and why:
 *
 * 08-critique-terms, applied in full at CRITICAL and HIGH:
 *  · C16 rewritten — the licensing duty is OURS, not the Client's, with an
 *    uncapped AÜG/WAADI/Wtta indemnity. C16.2 (client must spot the licence),
 *    C16.6 (client must chase the UK opt-out) and C15.4 deleted; C15.3 narrowed.
 *  · Part C restricted in terms to Moldova-resident Engineers (option (a) of the
 *    critic's fix). Non-Moldovan engineers go through Part B only.
 *  · C12.3 replaced — title passes per item on payment for that item, and does
 *    not revest. C12.8 (perfection of the chain, uncapped title indemnity) and
 *    C12.9 (AI coding tools) added.
 *  · Liability rebuilt: B19.1, C19.1, C17.2 and D6.4 (the self-serving recital)
 *    deleted; one cap in D6.3; D6.4 super-cap and uncapped heads; D6.5 insurance
 *    maintenance; D6.1(g) cardinal obligation; time bar 12 → 24 months.
 *  · C14 rewritten — the DPA is incorporated, not agreed later; no system access
 *    before it takes effect; 24-hour breach clock; sub-processor objection right;
 *    Art 28(3)(h) audit restored over C18.3.
 *  · B1.2 deemed acceptance, B2 "Introduction", B4.3 effective cause, B5 validity
 *    period (9 months, no rolling extension), B6.2, B6.5, B10.2/4/5, B12 guarantee,
 *    B3.2 "validated", B17.2 (we do not re-recruit our own placements), C4.2 working
 *    window, C6.7, C7.2 premium rates, C10.7/C10.8 exit and transition, C12.6 open
 *    source — all replaced with the critic's drafting.
 *  · Shared definitions moved from B2 into D1.1, so a Part-C-only client is not
 *    relying on a Part it never accepted.
 *
 * NOT applied — DECISIONS.md wins over the critique:
 *  · D4 freezes governing law and forum: Republic of Moldova, courts of Chișinău.
 *    The critic's Austrian-law / VIAC-arbitration rewrite of D23.2–D23.5 is
 *    therefore NOT here. Only its internal-consistency point is fixed (D23.3 is
 *    now expressly subject to the escalation and interim-relief carve-outs). The
 *    substantive objection belongs in docs/plans/BLOCKERS.md.
 *  · D2 — A12.2's "no cookies, no analytics, no tracking of any kind" is rewritten
 *    for consent-gated GA4 rather than left as a false statement in a legal notice.
 *  · The critic's src/data/content.ts edits are another package's file.
 *
 * D8 token rule: where the draft stated a recommended default inline it has been
 * taken and the token deleted. What survives is a business fact no agent may
 * invent — entity identity, fee percentages, insurance limits, the placement
 * licence question that is blocked on Moldovan counsel.
 */
export const terms: LegalDoc = {
  slug: 'terms',
  path: '/terms/',
  label: 'Terms & Conditions',
  h1: 'TalentSync terms and conditions for clients, candidates and site visitors',
  metaTitle: 'Terms & Conditions',
  metaDescription:
    'TalentSync’s website terms, the client terms of business for direct B2B recruitment and hourly collaboration, the shared provisions, and the candidate terms.',
  version: '1.0',
  updated: '2026-08-30',
  effective: '2026-08-30',
  lede: 'Five parts. Read the one that describes you, plus **Part D** if you are a client — it carries the definitions and the liability, notice, law and jurisdiction provisions that Parts B and C depend on.',
  router: [
    {
      when: 'You are reading talentsync.eu',
      then: '**[Part A](#part-a)** — Website Terms of Use. It applies to you now, without more.',
    },
    {
      when: 'You want us to find an engineer you will hire and manage yourself',
      then: '**[Part B](#part-b)** (Direct B2B Recruitment) + **[Part D](#part-d)**.',
    },
    {
      when: 'You want an engineer to join your team, billed by the hour',
      then: '**[Part C](#part-c)** (Flexible Hourly Collaboration) + **[Part D](#part-d)**.',
    },
    {
      when: 'You do both',
      then: '**Parts [B](#part-b), [C](#part-c) and [D](#part-d)** all apply. There is one agreement, not two.',
    },
    {
      when: 'You are an engineer sending us your CV or replying to us',
      then: '**[Part E](#part-e)** — Candidate Terms. Parts B, C and D do not apply to you and never will.',
    },
    {
      when: 'You are a consumer — an individual acting outside a trade or profession',
      then: '**[Part A](#part-a)** and **[Part E](#part-e)** only, and always subject to the mandatory law of your own country.',
    },
  ],
  body: [
    /* ------------------------------------------------------------ provider */
    { k: 'h', level: 2, id: 'provider', t: 'Provider and contact' },
    {
      k: 'p',
      t: 'These terms are issued by **{{LEGAL_ENTITY_NAME}}**, a {{LEGAL_FORM}} incorporated in the Republic of Moldova, registration number (IDNO) {{IDNO}}, registered office {{REGISTERED_ADDRESS}}, Chișinău, Republic of Moldova. VAT / fiscal status: {{VAT_STATUS}}. Employment-placement licence status: {{PLACEMENT_LICENCE_STATUS}}. Trading as **TalentSync**.',
    },
    {
      k: 'p',
      t: '**Contact.** General and commercial: [victor@talentsync.eu](mailto:victor@talentsync.eu) · [+373 68 300 700](tel:+37368300700). Legal, contractual and takedown notices: [legal@talentsync.eu](mailto:legal@talentsync.eu). LinkedIn: [linkedin.com/company/talentsync](https://linkedin.com/company/talentsync). Full entity details are on our [legal notice](/imprint/).',
    },

    /* ---------------------------------------------------------- how they fit */
    { k: 'h', level: 2, id: 'how-they-fit', t: 'How these documents fit together' },
    {
      k: 'p',
      t: '**Part A** is a public notice. It binds anyone using the website, to the limited extent browsewrap terms can.',
    },
    {
      k: 'p',
      t: '**Parts B, C and D together are the Client Agreement.** Part D is not optional boilerplate; it supplies the definitions and the liability, notice, law and jurisdiction provisions on which Parts B and C depend. A reference in a Fee Confirmation, quote or Assignment Schedule to “TalentSync’s Terms of Business” is a reference to Parts B, C and D as in force on the date of that document.',
    },
    {
      k: 'p',
      t: '**Part E** is a standalone notice to individuals. It contains no fee, no exclusivity, no restriction and no jurisdiction clause, deliberately.',
    },
    {
      k: 'p',
      t: '**Defined terms** are capitalised. **All shared definitions are in clause [D1](#D1)** — including Candidate, Client Group, Engagement, Engagement Date, Remuneration and Fee Confirmation. They apply to Part C without Part B having to be accepted. Definitions used only in Part B or Part C appear in [B2](#B2) and [C1.2](#C1-2) respectively and prevail over D1 within their own Part.',
    },
    { k: 'p', t: 'Four further points about how the parts interact:' },
    {
      k: 'ul',
      items: [
        '**Nothing on the website binds you or us commercially.** Parts B and C bind a client only once accepted under clause [B1.2](#B1-2) or [C1.3](#C1-3).',
        '**Order of precedence, highest first:** a signed Fee Confirmation or Assignment Schedule → the Data Processing Agreement on data protection → Part B or Part C → Part D → Part A. See [D2](#D2).',
        '**Governing law for everything here: the law of the Republic of Moldova** — with the consumer protections described in [A14](#A14) and [E11](#E11).',
        'The plain-English box at the head of each Part is explanatory only and is expressly **not** part of the Agreement. Where a box conflicts with a clause, the clause prevails.',
      ],
    },
    { k: 'hr' },

    /* ============================================================== PART A */
    { k: 'h', level: 2, id: 'part-a', t: 'Part A — Website Terms of Use' },
    {
      k: 'note',
      t: 'Plain English (non-binding summary — the clauses below are what actually applies)',
      body: [
        'This website is a brochure. It is not an offer, not advice, and not a promise of a job or a hire. Numbers like rates, savings and timelines are illustrative examples from past work, not guarantees. You may read, share, link to and quote the site, and search engines and AI assistants are welcome to index it and cite it — you may not bulk-scrape it to build a competing database. Client names and logos are used with those clients’ permission; if you think yours shouldn’t be here, email us and we will remove it. We keep the site running as best we can but do not promise it will always be available. Our liability for the website itself is capped at a nominal amount. Moldovan law applies, and if you are a consumer your own country’s mandatory protections still apply to you.',
      ],
    },

    { k: 'h', level: 3, id: 'A1', t: 'A1. Who we are and what this part covers' },
    {
      k: 'c',
      id: 'A1-1',
      t: 'These Website Terms govern your access to and use of talentsync.eu and any subdomain, page or file served from it (the **Site**). Our identity, registration details and contact addresses are set out in the Provider block at the head of this document.',
    },
    {
      k: 'c',
      id: 'A1-2',
      t: 'The Site is operated from the Republic of Moldova and is directed at businesses in Europe and internationally, and at software engineers considering working with us.',
    },

    { k: 'h', level: 3, id: 'A2', t: 'A2. Acceptance, and the limits of that acceptance' },
    {
      k: 'c',
      id: 'A2-1',
      t: 'By accessing or using the Site you agree to these Website Terms. If you do not agree, do not use the Site.',
    },
    {
      k: 'c',
      id: 'A2-2',
      t: 'These Website Terms govern **use of the Site only**. They do not create, vary or evidence any commercial relationship. No commercial terms are agreed by browsing. The terms on which we supply services are Parts B, C and D, and they take effect only as set out in clauses [B1](#B1) and [C1](#C1).',
    },
    {
      k: 'c',
      id: 'A2-3',
      t: 'Nothing on the Site is an offer capable of acceptance, an invitation to treat on stated terms, a quotation, or a commitment to supply. Any indication of price, rate, fee, timescale or availability on the Site is indicative only and is superseded in every case by a written quotation, Fee Confirmation or Assignment Schedule.',
    },

    { k: 'h', level: 3, id: 'A3', t: 'A3. What the Site is not' },
    {
      k: 'c',
      id: 'A3-1',
      t: 'The Site is provided for general information and marketing. It is **not** legal, tax, employment, immigration, financial or technical advice, and must not be relied on as a substitute for professional advice appropriate to your circumstances and jurisdiction.',
    },
    {
      k: 'c',
      id: 'A3-2',
      t: '**No guarantee of employment, engagement or placement.** Nothing on the Site is an offer of employment or engagement, a guarantee that we will find you a role, a guarantee that we will find a client an engineer, or a representation that any particular role, engineer, rate or timeline is or will remain available. Recruitment outcomes depend on decisions of third parties that we do not control.',
    },
    {
      k: 'c',
      id: 'A3-3',
      t: 'We do not represent that any engineer described or referred to on the Site is currently available, or that any client described on the Site is currently a client.',
    },

    { k: 'h', level: 3, id: 'A4', t: 'A4. Accuracy, illustrative figures, and no reliance' },
    {
      k: 'c',
      id: 'A4-1',
      t: 'We take reasonable care to keep the Site accurate and current, but we do not warrant that it is complete, accurate, current or error-free.',
    },
    {
      k: 'c',
      id: 'A4-2',
      t: '**Figures are illustrative.** Any rate range, cost saving, percentage, time-to-hire, headcount, delivery outcome, growth figure or similar metric appearing on the Site:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) is drawn from one or more past engagements, or from our internal estimates, in each case as at the date stated or, if no date is stated, as at the date of publication;',
            '(b) depends on role seniority, technology, market conditions, engagement model, country of comparison and the client’s own cost base;',
            '(c) is **not** a representation, warranty, forecast, target or promise of any result you will achieve; and',
            '(d) is **not** incorporated into any contract between us.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'A4-3',
      t: '**Comparative claims.** Where the Site states a saving or other comparison, the comparator is stated on the page in question. Where a comparator is not stated on the page, the claim is to be read as illustrative only and is not relied upon. We maintain a substantiation file for each comparative claim, and will make its basis available on written request to [legal@talentsync.eu](mailto:legal@talentsync.eu).',
    },
    {
      k: 'c',
      id: 'A4-4',
      t: '**Case studies.** Case studies describe projects in which we supplied or introduced one or more engineers. They describe the outcome of the client’s project as a whole. They are **not** a representation that TalentSync, or any individual engineer supplied or introduced by TalentSync, was solely or principally responsible for that outcome, unless the case study expressly says so.',
    },
    {
      k: 'c',
      id: 'A4-5',
      t: 'You agree that you have not relied and will not rely on any statement, figure or case study on the Site in entering into any contract with us, and that your rights in respect of any such contract are limited to those expressly set out in it. **This clause does not exclude or limit liability for fraud or fraudulent misrepresentation, and does not apply to you if you are a consumer.**',
    },

    { k: 'h', level: 3, id: 'A5', t: 'A5. Client names, logos, testimonials and takedown' },
    {
      k: 'c',
      id: 'A5-1',
      t: 'Third-party names, trade marks and logos appearing on the Site are the property of their respective owners and are used to identify clients and projects. Their appearance does not imply any endorsement, partnership, sponsorship or approval by the owner unless expressly stated.',
    },
    {
      k: 'c',
      id: 'A5-2',
      t: 'We publish a client name or logo only where we hold that client’s permission to do so. Testimonials are genuine statements provided by the named person, published with that person’s written consent, and published unedited as to substance; where a testimonial has been shortened, the substance and meaning are unchanged.',
    },
    {
      k: 'c',
      id: 'A5-3',
      t: '**Takedown.** If you are, or represent, a named organisation or a quoted individual and you wish your name, logo, testimonial or case study removed or de-identified, email [legal@talentsync.eu](mailto:legal@talentsync.eu). We will remove or de-identify it **within 5 business days of receipt**, without requiring you to give reasons and without prejudice to any position either party may take.',
    },

    {
      k: 'h',
      level: 3,
      id: 'A6',
      t: 'A6. Intellectual property in Site content — and our position on indexing and AI',
    },
    {
      k: 'c',
      id: 'A6-1',
      t: 'All text, design, layout, graphics, imagery, code, case studies and other content on the Site is owned by us or licensed to us and is protected by copyright and other intellectual property rights.',
    },
    {
      k: 'c',
      id: 'A6-2',
      t: 'We grant you a personal, non-exclusive, revocable, non-transferable licence to access and view the Site, and to download, print and share individual pages for your own internal business or personal use.',
    },
    {
      k: 'c',
      id: 'A6-3',
      t: '**We expressly permit** — and this is a deliberate position, not an oversight:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) indexing and crawling of the Site by search engines, answer engines, AI assistants and research tools;',
            '(b) the reproduction of extracts from the Site in AI-generated answers, summaries, comparisons and recommendations, provided TalentSync is identified as the source and, where the medium allows, a link to talentsync.eu is included; and',
            '(c) quotation of short extracts in journalism, research, analysis and commentary with attribution.',
          ],
        },
        {
          k: 'p',
          t: 'We do not assert any machine-readable reservation of text-and-data-mining rights in respect of the Site, and our robots directives are permissive by design.',
        },
      ],
    },
    {
      k: 'c',
      id: 'A6-4',
      t: '**We prohibit:**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) systematic or bulk extraction, scraping, harvesting, mirroring or replication of the Site or any substantial part of it for the purpose of creating, populating or supplementing a candidate database, supplier directory, lead list or any product or service that competes with TalentSync;',
            '(b) any use of Site content that presents TalentSync’s services, prices, capabilities, clients or outcomes inaccurately, or that attributes to TalentSync statements it has not made;',
            '(c) removal or alteration of any copyright, trade mark or attribution notice; and',
            '(d) use of any automated means that imposes an unreasonable load on the Site’s infrastructure.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'A6-5',
      t: 'The permissions in A6.3 do not transfer ownership of anything, and may be revoked in respect of any person who breaches A6.4.',
    },

    { k: 'h', level: 3, id: 'A7', t: 'A7. Third-party links and services' },
    {
      k: 'c',
      id: 'A7-1',
      t: 'The Site links to third-party services, including **Calendly** (meeting scheduling), **LinkedIn**, and `mailto:` and `tel:` addresses handled by your own device and provider.',
    },
    {
      k: 'c',
      id: 'A7-2',
      t: 'We do not control and are not responsible for those services, their content, availability, security or practices. Your use of them is governed by their own terms and privacy notices, not ours. A link is not an endorsement.',
    },
    {
      k: 'c',
      id: 'A7-3',
      t: 'Calendly processes personal data when you book a meeting with us. See our [privacy policy](/privacy/#s4-4) for what is collected, why, and on what transfer basis.',
    },

    { k: 'h', level: 3, id: 'A8', t: 'A8. Permitted and prohibited use' },
    {
      k: 'c',
      id: 'A8-1',
      t: 'You may use the Site only for lawful purposes and in accordance with these Website Terms.',
    },
    {
      k: 'c',
      id: 'A8-2',
      t: 'You must not: use the Site in any way that breaches applicable law; transmit or attempt to transmit any malicious code; attempt to gain unauthorised access to the Site, its server or any connected system; probe, scan or test the vulnerability of the Site without our prior written consent; use any contact detail published on the Site for unsolicited bulk commercial communications, list-building or recruitment solicitation directed at us; impersonate TalentSync or any person associated with it; or interfere with any other person’s use of the Site.',
    },
    {
      k: 'c',
      id: 'A8-3',
      t: 'We may restrict or block access to the Site, in whole or in part, where we reasonably believe this clause has been breached.',
    },

    { k: 'h', level: 3, id: 'A9', t: 'A9. Unsolicited submissions, and CVs sent by email' },
    { k: 'c', id: 'A9-1', t: 'The Site contains no forms. Contact is by email, telephone or Calendly.' },
    {
      k: 'c',
      id: 'A9-2',
      t: 'If you email us a CV, portfolio, profile or application (including via any “Apply” link on the Site), we will process your personal data as an independent controller in accordance with our **[Candidate Privacy Notice](/candidate-privacy/)**. Please read it before you write to us. We will provide the information required by Articles 13 and 14 of Regulation (EU) 2016/679 in our first substantive reply to you.',
    },
    {
      k: 'c',
      id: 'A9-3',
      t: 'If you send us any idea, proposal, suggestion or material other than an application — unsolicited and without a written confidentiality agreement — we accept no obligation of confidence in respect of it, and you agree we may use it without restriction or payment. Do not send us anything confidential without agreeing terms first.',
    },

    { k: 'h', level: 3, id: 'A10', t: 'A10. Availability and “as is”' },
    {
      k: 'c',
      id: 'A10-1',
      t: 'We provide the Site free of charge and on an “as is” and “as available” basis. To the maximum extent permitted by applicable law, we exclude all warranties, conditions and terms implied by statute, common law or otherwise in relation to the Site.',
    },
    {
      k: 'c',
      id: 'A10-2',
      t: 'We do not warrant that the Site will be available uninterrupted, timely, secure or error-free, or that defects will be corrected. We may suspend, withdraw, discontinue or change all or part of the Site at any time without notice and without liability.',
    },

    { k: 'h', level: 3, id: 'A11', t: 'A11. Limitation of liability for use of the Site' },
    {
      k: 'c',
      id: 'A11-1',
      t: 'This clause A11 applies **only to your use of the Site**. Liability arising under a Client Agreement is governed by clause [D6](#D6), and nothing in A11 limits or affects it.',
    },
    {
      k: 'c',
      id: 'A11-2',
      t: 'To the maximum extent permitted by applicable law, we are not liable for any loss of profit, loss of business, loss of revenue, loss of anticipated savings, loss of goodwill, loss or corruption of data, or any indirect or consequential loss, arising out of or in connection with your use of, or inability to use, the Site.',
    },
    {
      k: 'c',
      id: 'A11-3',
      t: 'Our total aggregate liability arising out of or in connection with your use of the Site is limited to **EUR 100**.',
    },
    {
      k: 'c',
      id: 'A11-4',
      t: '**Nothing in these Website Terms excludes or limits liability:** for death or personal injury caused by negligence; for fraud or fraudulent misrepresentation; for intentional non-performance or, where applicable law so provides, gross negligence; or for any other liability that cannot lawfully be excluded or limited. Under the Civil Code of the Republic of Moldova, an exclusion or limitation of liability for intentional non-performance is void, and nothing here is intended to have that effect.',
    },
    { k: 'c', id: 'A11-5', t: 'If you are a consumer, nothing in these Website Terms affects your statutory rights.' },

    { k: 'h', level: 3, id: 'A12', t: 'A12. Privacy and cookies' },
    {
      k: 'c',
      id: 'A12-1',
      t: 'Our processing of personal data in connection with the Site is described in our **[privacy policy](/privacy/)** and, for candidates, our **[candidate privacy notice](/candidate-privacy/)**.',
    },
    {
      k: 'c',
      id: 'A12-2',
      t: '**The Site sets no cookie and loads no analytics until you have accepted them on the consent banner.** Google Consent Mode v2 defaults every signal to denied, and dismissing the banner without choosing counts as a refusal. Where you accept, we use Google Analytics 4 and nothing else — no advertising technology, no cross-site tracking, no marketing pixel. Every font, style, script and image other than that analytics tag is served from talentsync.eu, so before you consent, loading the Site causes no request to any third-party host. Web-server logs record IP addresses for security and operational purposes and are described in the privacy policy. Every cookie is listed by name, purpose, provider, type and lifetime in our **[cookie policy](/cookies/)**.',
    },

    { k: 'h', level: 3, id: 'A13', t: 'A13. Changes to these Website Terms' },
    {
      k: 'c',
      id: 'A13-1',
      t: 'We may amend these Website Terms at any time. The amended version takes effect when posted on this page, and the version number and effective date at the head of this document will be updated. Your continued use of the Site after posting constitutes acceptance of the amended Website Terms.',
    },
    {
      k: 'c',
      id: 'A13-2',
      t: 'Changes to Part B, Part C or Part D do **not** take effect retrospectively in respect of any Introduction already made or any Assignment already commenced. Those Parts, as in force on the date of the applicable Fee Confirmation or Assignment Schedule, continue to govern that engagement.',
    },

    { k: 'h', level: 3, id: 'A14', t: 'A14. Governing law and jurisdiction for Part A' },
    {
      k: 'c',
      id: 'A14-1',
      t: 'These Website Terms and any non-contractual obligations arising out of or in connection with them are governed by the law of the **Republic of Moldova**.',
    },
    {
      k: 'c',
      id: 'A14-2',
      t: 'Subject to A14.3, the courts of **Chișinău, Republic of Moldova** have exclusive jurisdiction to settle any dispute arising out of or in connection with these Website Terms.',
    },
    {
      k: 'c',
      id: 'A14-3',
      t: '**If you are a consumer**, this clause does not deprive you of the protection of the mandatory provisions of the law of the country of your habitual residence, and you may bring proceedings in the courts of that country. We will bring proceedings against a consumer only in the courts of the consumer’s country of habitual residence.',
    },
    { k: 'hr' },

    /* ============================================================== PART B */
    {
      k: 'h',
      level: 2,
      id: 'part-b',
      t: 'Part B — Client Terms of Business: Direct B2B Recruitment',
    },
    {
      k: 'note',
      t: 'Plain English (non-binding summary — the clauses below are what actually applies)',
      body: [
        'We find and validate an engineer; you interview, decide, and employ or contract them directly. You pay us a percentage of their first-year package when they accept your offer. If you hire someone we introduced within **9 months** of the introduction — into any role, or into a group company — the fee is due, and within the first 6 months we do not have to prove we caused the hire. If you already knew the person, tell us within **5 business days** with evidence and no fee is payable. If the hire doesn’t work out in the first **12 weeks** for a reason we cover, **you choose**: a free replacement search, or a rebate of 100% / 75% / 50% depending on when it ended. Do not pass candidate CVs outside your own company. You make the hiring decision and you run the right-to-work and background checks. We will not come back for an engineer we placed with you. Our liability is capped by clause D6. Moldovan law, Chișinău courts.',
      ],
    },

    { k: 'h', level: 3, id: 'B1', t: 'B1. Application and formation' },
    {
      k: 'c',
      id: 'B1-1',
      t: 'Part B, together with Part D, applies to the introduction by us of Candidates to the Client for direct Engagement by the Client.',
    },
    {
      k: 'c',
      id: 'B1-2',
      t: 'These terms apply where the Client has been sent a copy of, or a durable link to, Parts B, C and D and thereafter:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) signs or confirms in writing a Fee Confirmation;',
            '(b) instructs us in writing to source or introduce a Candidate; or',
            '(c) an Engagement commences.',
          ],
        },
        {
          k: 'p',
          t: 'We shall attach Parts B, C and D to every quotation, every Fee Confirmation and every follow-up to a scheduled meeting, and shall retain evidence of that attachment. **Where the Client has not been sent these terms before the first Introduction, they apply only from the date they are sent, and only in respect of Introductions made after that date.**',
        },
      ],
    },
    {
      k: 'c',
      id: 'B1-3',
      t: '**The Client’s own terms do not apply.** Any purchase order, supplier agreement, vendor portal terms, general purchasing conditions or other terms put forward by the Client are expressly rejected and do not form part of the contract, whether or not they are referred to in, attached to or acknowledged in any document. **No act of performance by us — including sourcing, submitting a CV, attending a meeting, accepting a purchase order number or raising an invoice referencing one — constitutes acceptance of the Client’s terms.** Any variation to these terms is effective only if made in accordance with clause [D14](#D14).',
    },
    {
      k: 'c',
      id: 'B1-4',
      t: '**Fee Confirmation.** Before or promptly after the first Introduction on any role, we will issue a one-page **Fee Confirmation** stating the Fee percentage, the Minimum Fee, the Validity Period and the payment period for that role. Where a Fee Confirmation is signed or confirmed in writing (email is sufficient), the four terms it states prevail over any inconsistent provision in Part B. Where no Fee Confirmation is signed, the corresponding provisions of Part B apply.',
    },
    {
      k: 'c',
      id: 'B1-5',
      t: 'Where the Client is entering into this agreement on behalf of, or for the benefit of, one or more Client Group companies, the Client contracts as principal and is liable for the acts and omissions of each such company as if they were the Client’s own.',
    },

    { k: 'h', level: 3, id: 'B2', t: 'B2. Definitions used only in Part B' },
    {
      k: 'p',
      t: 'Candidate, Client Group, Engagement, Engagement Date, Remuneration and Fee Confirmation are defined in clause [D1.1](#D1-1) and apply throughout. The following are used only in this Part.',
    },
    {
      k: 'dl',
      items: [
        {
          t: '“Introduction”',
          d: 'means the provision by us to the Client, **at the Client’s request or with the Client’s prior agreement to receive candidate information for a role**, of information identifying a Candidate — including a curriculum vitae, name, profile, LinkedIn or other URL, portfolio, or redacted or anonymised profile from which the Candidate’s identity is or becomes ascertainable. **Information sent without such a request or agreement is not an Introduction and gives rise to no Fee.** An Introduction also occurs where the Client, or any Client Group company, interviews, meets or otherwise enters into discussion with a Candidate arising directly or indirectly from our activity at the Client’s request.',
        },
        {
          t: '“Introduction Date”',
          d: 'means the date on which the earliest event constituting an Introduction occurs.',
        },
        { t: '“Fee”', d: 'means the fee calculated under clause [B8](#B8).' },
        { t: '“Validity Period”', d: 'has the meaning given in clause [B5.1](#B5-1).' },
      ],
    },

    { k: 'h', level: 3, id: 'B3', t: 'B3. The service, and what “validated” means' },
    {
      k: 'c',
      id: 'B3-1',
      t: 'We will use reasonable skill and care to source, screen and introduce Candidates matching a written brief agreed with the Client.',
    },
    {
      k: 'c',
      id: 'B3-2',
      t: 'Where we describe a Candidate as **validated** we mean that, before Introduction, we have:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) conducted a **structured technical assessment** by or under the supervision of a senior engineer, against the technologies in the Client’s brief;',
            '(b) verified the Candidate’s **identity** against a government-issued identity document;',
            '(c) assessed the Candidate’s **conversational English** as sufficient to work in an English-speaking engineering team; and',
            '(d) used **reasonable endeavours** to verify employment history for the preceding **5 years** against documentary evidence or direct confirmation from the stated employers.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'B3-3',
      t: 'We will provide a **written validation summary with each Introduction**, stating what was verified, by what method, and identifying expressly any element of B3.2(d) that we were unable to verify and why. Where the summary discloses a limitation, we give no warranty in respect of it. Validation is not, and is not represented to be, a background check, a criminal-record check, a credit check, a regulatory-clearance check, a medical assessment, or a right-to-work determination. See clauses [B15](#B15) and [B16](#B16).',
    },
    {
      k: 'c',
      id: 'B3-4',
      t: '**AI use in screening.** We do not use automated decision-making or AI ranking to shortlist, score or reject candidates. AI tools may be used to draft or format text. Every shortlist decision is made by a person. Where we use any automated tool in screening, we will disclose that fact to the Client and to the Candidate, and a person will make every shortlist decision, with authority to overturn any automated output.',
    },

    { k: 'h', level: 3, id: 'B4', t: 'B4. When a Fee becomes payable' },
    {
      k: 'c',
      id: 'B4-1',
      t: 'A Fee is payable by the Client where an Engagement of a Candidate commences within the Validity Period.',
    },
    {
      k: 'c',
      id: 'B4-2',
      t: 'A Fee is payable under B4.1 **whether or not**: the Engagement is for the role in respect of which the Introduction was made; the Client used another agency or its own resources in the process; the Candidate was already known to the Client, except as provided in clause [B7](#B7); or the Engagement is with a Client Group company or a third party, as to which see clause [B6](#B6).',
    },
    {
      k: 'c',
      id: 'B4-3',
      t: 'A Fee is payable only where the Introduction was **an effective cause** of the Engagement. Where the Engagement commences within **6 months** of the Introduction Date, the Introduction is presumed to have been an effective cause; thereafter the burden lies with us.',
    },
    {
      k: 'c',
      id: 'B4-4',
      t: 'Only one Fee is payable in respect of any one Candidate under any one Introduction, save that a Fee is payable in respect of each separate Engagement of the same Candidate that commences more than 12 months after the end of a previous Engagement arising from the same Introduction.',
    },
    {
      k: 'c',
      id: 'B4-5',
      t: 'A Fee payable under Part B is a **debt** due from the Client to us and is recoverable as such.',
    },

    { k: 'h', level: 3, id: 'B5', t: 'B5. Validity Period (the tail)' },
    {
      k: 'c',
      id: 'B5-1',
      t: 'The **Validity Period** is **9 months from the Introduction Date**. It is not extended by any subsequent contact, by any withdrawn or declined offer, or by any breach of clause [B9](#B9).',
    },
    {
      k: 'c',
      id: 'B5-2',
      t: 'The Validity Period is a condition on which a fee is payable for a service already performed. It imposes no restriction on the Candidate, who is free at all times to work for whomever they choose, and it imposes no restriction on the Client’s freedom to hire. It is not, and is not to be construed as, a restraint of trade.',
    },

    { k: 'h', level: 3, id: 'B6', t: 'B6. Indirect, onward and third-party Engagements' },
    {
      k: 'c',
      id: 'B6-1',
      t: 'The Client must not disclose any Candidate information to any person outside the Client’s own legal entity — including any Client Group company, any other recruitment agency, any investor, adviser, customer or portfolio company — without our prior written consent. This obligation is part of the Candidate Information provisions in clause [D3.4](#D3-4).',
    },
    {
      k: 'c',
      id: 'B6-2',
      t: 'Where the Client discloses Candidate information to a third party in breach of [D3.4](#D3-4) and that third party (or any of its affiliates) Engages the Candidate within the Validity Period, **the Client shall pay 50% of the Fee as liquidated damages for that breach**, and no guarantee under clause [B12](#B12) applies to that Engagement.',
    },
    {
      k: 'c',
      id: 'B6-3',
      t: 'The Client shall pay the Fee as principal in respect of any Engagement of a Candidate by any Client Group company within the Validity Period.',
    },
    {
      k: 'c',
      id: 'B6-4',
      t: '**Information right.** On our written request, the Client shall confirm to us in writing whether a named Candidate has been Engaged by the Client, by any Client Group company, or by any third party to which the Client disclosed that Candidate’s information, and if so on what date, in what role and on what Remuneration. **Where the Client fails to respond within 10 business days, the Validity Period is suspended until it does**, and we may require the Client to procure written confirmation from its payroll provider at the Client’s cost.',
    },

    { k: 'h', level: 3, id: 'B7', t: 'B7. Prior knowledge of a Candidate' },
    {
      k: 'c',
      id: 'B7-1',
      t: 'If the Client contends that, before the Introduction Date, it was already in active discussion with a Candidate, or had within the preceding 6 months received a direct application from that Candidate or a valid introduction of that Candidate from another source, the Client shall notify us in writing **within 5 business days** of the Introduction, providing contemporaneous documentary evidence.',
    },
    {
      k: 'c',
      id: 'B7-2',
      t: 'Acceptable evidence includes a dated applicant-tracking-system record, dated correspondence with the Candidate, or a dated written introduction from a named third party. A bare assertion is not evidence.',
    },
    {
      k: 'c',
      id: 'B7-3',
      t: 'Where such notice and evidence are given, **no Fee is payable** in respect of that Candidate under Part B, and we may cease work on that Candidate.',
    },
    {
      k: 'c',
      id: 'B7-4',
      t: 'Where such notice and evidence are **not** given within the period in B7.1, **the burden of proving prior knowledge in any subsequent dispute lies with the Client**, and the Client may not rely on evidence that it could reasonably have provided within that period.',
    },
    {
      k: 'c',
      id: 'B7-5',
      t: 'B7.1 to B7.4 do not apply, and no Fee is payable, where a Candidate applied directly to a public job advertisement published by the Client, without any prompting, referral or encouragement by us, before the Introduction Date.',
    },

    { k: 'h', level: 3, id: 'B8', t: 'B8. Fee calculation' },
    {
      k: 'c',
      id: 'B8-1',
      t: 'The Fee is **{{PLACEMENT_FEE_PERCENT}}** of the Candidate’s first-year gross Remuneration, subject to a minimum fee of **{{MINIMUM_FEE}}**. The applicable figure for a role is stated in the Fee Confirmation for that role.',
    },
    {
      k: 'c',
      id: 'B8-2',
      t: '**“Remuneration”** is defined in clause [D1.1](#D1-1) and is calculated over the first 12 months of the Engagement.',
    },
    {
      k: 'c',
      id: 'B8-3',
      t: 'Where the Engagement is on a day-rate or hourly-rate basis, Remuneration is the projected total charges payable in respect of the Candidate for the first 12 months of the Engagement, or for the actual term if shorter, and in every case subject to the Minimum Fee.',
    },
    {
      k: 'c',
      id: 'B8-4',
      t: 'Where the Engagement is part-time, Remuneration is the actual Remuneration payable, not a full-time equivalent, subject to the Minimum Fee.',
    },
    {
      k: 'c',
      id: 'B8-5',
      t: '**Uplift where Remuneration is understated.** The Client must state the full Remuneration under clause [B9](#B9). If we subsequently establish that actual Remuneration was higher than the figure notified, the Fee is recalculated on the correct figure and the difference is payable, together with an administrative charge of **10%** of that difference and interest under clause [B10.4](#B10-4) from the original due date. The administrative charge represents the parties’ genuine pre-estimate of the cost of investigating and recovering the shortfall and is not a penalty.',
    },
    {
      k: 'c',
      id: 'B8-6',
      t: '**Pay transparency.** In several jurisdictions we are prohibited from asking a Candidate about their current or historical pay. The Client is therefore the only lawful source of the Remuneration figure, and the notification duty in clause [B9](#B9) is a substantive obligation, not an administrative formality. The Client is responsible for its own compliance with Directive (EU) 2023/970 and its national implementations, including any duty to state a pay range before interview.',
    },
    {
      k: 'c',
      id: 'B8-7',
      t: 'All Fees are stated and payable in **EUR** and are exclusive of VAT and any other tax, as set out in clause [B11](#B11).',
    },

    { k: 'h', level: 3, id: 'B9', t: 'B9. The Client’s notification duty' },
    {
      k: 'c',
      id: 'B9-1',
      t: 'The Client shall notify us in writing within **3 business days** of each of the following:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) any offer made to a Candidate, with full details of the proposed Remuneration broken down by each limb of the definition of Remuneration in [D1.1](#D1-1);',
            '(b) the Candidate’s acceptance or rejection of that offer, and any withdrawal of the offer;',
            '(c) the agreed start date, and any change to it;',
            '(d) the actual Engagement Date; and',
            '(e) any Engagement of a Candidate by a Client Group company or by a third party.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'B9-2',
      t: 'Failure to notify in accordance with B9.1:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) voids any entitlement to a replacement search or rebate under clause [B12](#B12), but only where the failure relates to the Engagement in respect of which the claim is made; and',
            '(b) triggers the administrative charge under [B8.5](#B8-5) where Remuneration was understated.',
          ],
        },
      ],
    },

    { k: 'h', level: 3, id: 'B10', t: 'B10. Invoicing and payment' },
    {
      k: 'c',
      id: 'B10-1',
      t: '**We invoice on the Candidate’s written acceptance of the Client’s offer**, and the Fee is payable irrespective of the start date, subject only to [B10.6](#B10-6).',
    },
    {
      k: 'c',
      id: 'B10-2',
      t: 'Invoices are payable within **14 days** of the invoice date. Any longer payment period is effective only if expressly agreed in writing and only to the extent it is not grossly unfair to us within the meaning of Article 7 of Directive 2011/7/EU or the equivalent provision of the law applicable to the Client.',
    },
    {
      k: 'c',
      id: 'B10-3',
      t: 'Payment must be made in **EUR** by bank transfer to the account stated on the invoice, in full and in cleared funds. The Client bears its own bank charges and any intermediary bank charges, so that we receive the full invoiced amount.',
    },
    {
      k: 'c',
      id: 'B10-4',
      t: '**Late payment.** Overdue sums bear interest, accruing daily from the due date until payment in full, whether before or after judgment or award, at the higher of (a) the European Central Bank main refinancing rate in force on the first day of the relevant half-year plus **8 percentage points** and (b) the rate applicable under any late-payment legislation of the country in which the Client is established, where that legislation applies. Interest accrues without demand.',
    },
    {
      k: 'c',
      id: 'B10-5',
      t: 'In addition to interest we are entitled to fixed compensation of **EUR 100** for each overdue invoice, and to recover our reasonable further costs of recovery including legal, collection-agency and enforcement costs, to the extent they exceed that fixed sum.',
    },
    {
      k: 'c',
      id: 'B10-6',
      t: '**Failure to start.** If a Candidate does not commence the Engagement within **8 weeks** of the agreed start date for a reason other than an act or omission of the Client, we will issue a credit note for 100% of the Fee and, at the Client’s request, commence a replacement search on the terms in [B12.5](#B12-5). Where the Candidate does not start because of an act or omission of the Client — including withdrawal of the offer, delay in issuing a contract, or failure to complete onboarding — the Fee remains payable in full.',
    },
    {
      k: 'c',
      id: 'B10-7',
      t: '**No set-off.** The Client shall pay all sums due in full without any set-off, counterclaim, deduction, retention or withholding, except as required by law (in which case clause [B11](#B11) applies). We may set off any amount owed by us to the Client against any amount owed by the Client to us.',
    },
    {
      k: 'c',
      id: 'B10-8',
      t: '**Suspension.** Where any sum is overdue, we may, on **7 days’** written notice, suspend all or part of our services to the Client and to any Client Group company, including ceasing all sourcing and withdrawing all Candidates from process, without liability. Suspension does not relieve the Client of any accrued or accruing liability, and does not extend any period for the Client’s performance.',
    },

    { k: 'h', level: 3, id: 'B11', t: 'B11. VAT, withholding tax and gross-up' },
    {
      k: 'c',
      id: 'B11-1',
      t: 'All sums are exclusive of VAT and of any other sales, turnover or equivalent tax, which the Client shall pay in addition at the applicable rate where chargeable.',
    },
    {
      k: 'c',
      id: 'B11-2',
      t: 'The Client warrants that any VAT identification number it provides is valid and correctly identifies it, shall notify us immediately of any change, and shall indemnify us against any liability, penalty or interest arising from an incorrect or invalid number. Where the Client fails to provide a valid VAT identification number, we may charge, and the Client shall pay, any tax we are consequently obliged to account for.',
    },
    {
      k: 'c',
      id: 'B11-3',
      t: '**Gross-up.** If the Client is required by law to make any deduction or withholding from a payment, the amount payable is increased so that, after the deduction or withholding, we receive an amount equal to the amount we would have received had no deduction or withholding been required. The Client shall, within 30 days of the deduction, provide us with an official withholding-tax certificate or equivalent evidence sufficient to enable us to claim relief under any applicable double-taxation treaty, and shall provide reasonable co-operation in claiming that relief.',
    },

    { k: 'h', level: 3, id: 'B12', t: 'B12. Guarantee — the Client chooses the remedy' },
    {
      k: 'c',
      id: 'B12-1',
      t: 'The guarantee in this clause applies where an Engagement terminates for a Qualifying Reason within **12 weeks** of the Engagement Date (the **Guarantee Period**), and none of the voiding conditions in [B12.6](#B12-6) applies.',
    },
    {
      k: 'c',
      id: 'B12-2',
      t: '**Qualifying Reasons** are, exhaustively: (a) the Candidate resigns; (b) the Candidate’s employment or engagement is terminated by the Client for demonstrated technical incompetence, evidenced by contemporaneous written performance records; or (c) the Candidate is dismissed for gross misconduct, evidenced in writing.',
    },
    {
      k: 'c',
      id: 'B12-3',
      t: 'Where the guarantee applies, the Client may elect, by written notice, either a free replacement search or a rebate under [B12.4](#B12-4). **The election is the Client’s.**',
    },
    {
      k: 'c',
      id: 'B12-4',
      t: '**Rebate.** Calculated by reference to the date of termination of the Engagement:',
      children: [
        {
          k: 'table',
          head: ['Engagement terminates', 'Rebate'],
          rows: [
            ['Weeks 0–4 after the Engagement Date', '**100%** of the Fee paid'],
            ['Weeks 5–8', '**75%**'],
            ['Weeks 9–12', '**50%**'],
          ],
        },
        {
          k: 'p',
          t: 'The rebate is payable in cash within **30 days** of the Client’s election, or as a credit note valid for **12 months** against future fees if the Client so elects.',
        },
      ],
    },
    {
      k: 'c',
      id: 'B12-5',
      t: '**Replacement search.** Where the Client elects a replacement search, we will commence within **10 business days** and conduct it for **60 days**. No further Fee is payable; the Client pays only expenses agreed in advance in writing, and shall co-operate by making interview slots available and providing feedback within 5 business days. If we have not placed a replacement in that period the Client may then elect a rebate under [B12.4](#B12-4), calculated by reference to the original termination date.',
    },
    {
      k: 'c',
      id: 'B12-6',
      t: '**Voiding conditions, exhaustively:**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) an **undisputed** invoice from us remained unpaid more than 30 days after its due date at the date the Client makes its claim;',
            '(b) the Client did not notify us of the termination in writing within **15 days** of it; or',
            '(c) the Engagement terminated by reason of redundancy, restructuring, hiring freeze, insolvency or closure of the Client’s business.',
          ],
        },
        { k: 'p', t: '**No other circumstance voids the guarantee.**' },
      ],
    },
    {
      k: 'c',
      id: 'B12-7',
      t: '**One guarantee per placement.** A Candidate placed as a replacement carries a shortened guarantee period of **6 weeks** and no entitlement to a further replacement or rebate.',
    },

    { k: 'h', level: 3, id: 'B13', t: 'B13. Withdrawal, cancellation and retainers' },
    { k: 'c', id: 'B13-1', t: 'The Client may withdraw a role at any time by written notice.' },
    {
      k: 'c',
      id: 'B13-2',
      t: 'Where the Client withdraws a role after we have delivered a shortlist, or fails to interview a shortlisted Candidate within **15 business days** of shortlist delivery, we may charge a cancellation fee of **EUR 2,500, or 25% of the estimated Fee, whichever is greater**, representing our sourcing and assessment cost already incurred.',
    },
    {
      k: 'c',
      id: 'B13-3',
      t: 'Any retainer or engagement fee agreed in writing is non-refundable and is credited against the Fee payable on the resulting Engagement.',
    },

    { k: 'h', level: 3, id: 'B14', t: 'B14. Non-circumvention' },
    {
      k: 'c',
      id: 'B14-1',
      t: 'The Client shall not, and shall procure that no Client Group company shall, seek to avoid or reduce a Fee by: engaging a Candidate through a third party, intermediary, umbrella company, employer-of-record or other structure; asking another agency to re-introduce a Candidate already Introduced by us; delaying an Engagement until after the Validity Period while maintaining contact with the Candidate; or engaging the Candidate in a different role, entity or jurisdiction.',
    },
    {
      k: 'c',
      id: 'B14-2',
      t: 'Where the Client breaches B14.1, the full Fee is payable as a debt, together with our reasonable costs of investigation and recovery, and no guarantee applies.',
    },

    { k: 'h', level: 3, id: 'B15', t: 'B15. Client obligations' },
    {
      k: 'c',
      id: 'B15-1',
      t: '**The hiring decision is the Client’s alone.** The Client is solely responsible for deciding whether to interview, offer or Engage any Candidate, and for the terms on which it does so.',
    },
    {
      k: 'c',
      id: 'B15-2',
      t: 'The Client is solely responsible, in the country of Engagement and in any country in which the Candidate will perform services, for:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) **right-to-work, immigration, visa, work-permit and residence checks**, and for obtaining any permit required;',
            '(b) taking up **references**, unless we are separately instructed and paid to do so;',
            '(c) any **medical, health-and-safety, security-clearance, regulatory, professional-registration or sector-specific check** required by law or by the Client’s own policies;',
            '(d) any **criminal-record or background check**, which we neither carry out nor procure — see [B16.4](#B16-4);',
            '(e) compliance with all **equal-treatment, non-discrimination and pay-transparency** law in its own selection, offer and pay-setting process, including Directive (EU) 2023/970 as implemented locally;',
            '(f) all obligations of an employer or engager in respect of the Candidate, including payroll, tax, social security, insurance, working time and statutory entitlements; and',
            '(g) providing the Candidate with a written contract compliant with local law.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'B15-3',
      t: 'The Client shall give us a written brief that accurately describes the role, its seniority, its technologies, the reporting line, the country of Engagement, the working pattern and the Remuneration range, and shall notify us promptly of any material change.',
    },
    { k: 'c', id: 'B15-4', t: 'The Client shall provide interview feedback within 5 business days of each interview.' },

    { k: 'h', level: 3, id: 'B16', t: 'B16. Our warranties, and what we expressly do not warrant' },
    {
      k: 'c',
      id: 'B16-1',
      t: 'We warrant that we will: perform our services with reasonable skill and care; carry out the validation described in [B3.2](#B3-2) where we describe a Candidate as validated; not knowingly withhold from the Client any material information about a Candidate of which we are aware and which is relevant to the Client’s decision; and pass on the Candidate’s stated qualifications and experience as they were represented to us.',
    },
    {
      k: 'c',
      id: 'B16-2',
      t: 'We warrant that we have the right to introduce each Candidate to the Client and that we have complied with our obligations under applicable data protection law in doing so.',
    },
    {
      k: 'c',
      id: 'B16-3',
      t: 'We warrant that we do not charge, and will never charge, any fee to a Candidate — see clause [E2](#E2).',
    },
    {
      k: 'c',
      id: 'B16-4',
      t: '**We do not warrant, and expressly disclaim any representation or warranty as to:** the suitability of any Candidate for the role or for the Client’s organisation; the accuracy or completeness of anything stated by a Candidate; the Candidate’s academic or professional qualifications, memberships, registrations, licences or certifications; the absence of any criminal record, adverse regulatory finding, civil judgment or restrictive covenant binding the Candidate; the Candidate’s right to work in any jurisdiction; the Candidate’s health or fitness for any role; that a Candidate will accept an offer, commence an Engagement, or remain in it for any period; or the performance, conduct or output of any Candidate once Engaged.',
    },
    {
      k: 'c',
      id: 'B16-5',
      t: 'Except as expressly set out in B16.1 to B16.3, all warranties, conditions and terms implied by statute, common law or otherwise are excluded to the maximum extent permitted by applicable law.',
    },

    { k: 'h', level: 3, id: 'B17', t: 'B17. Non-exclusivity, and what we will not do' },
    {
      k: 'c',
      id: 'B17-1',
      t: 'Neither party is exclusive to the other unless a signed retainer expressly says so. Subject to [B17.2](#B17-2), we may introduce any Candidate to any other client at any time, and doing so is not a breach of confidence or of any duty owed to the Client. The Client may instruct other agencies and may recruit directly.',
    },
    {
      k: 'c',
      id: 'B17-2',
      t: '**We shall not, for 12 months after the Engagement Date, approach, solicit or introduce to any other client any Candidate we introduced to the Client and whom the Client Engaged, or any Engineer supplied to the Client** — in each case while that person remains Engaged by the Client, or within 6 months of that Engagement ending.',
    },
    {
      k: 'c',
      id: 'B17-3',
      t: 'B17.2 restricts **us** only. It imposes no restriction on any Candidate or Engineer, who remains free at all times to approach us, to respond to a public advertisement, and to work for whomever they choose; and nothing in B17.2 permits us to decline to act for a person who approaches us of their own initiative.',
    },

    { k: 'h', level: 3, id: 'B18', t: 'B18. Data protection under Part B' },
    {
      k: 'c',
      id: 'B18-1',
      t: 'In relation to Candidate personal data disclosed by us to the Client, each party acts as an **independent controller**. Neither party is the other’s processor.',
    },
    {
      k: 'c',
      id: 'B18-2',
      t: 'Each party shall: process Candidate personal data only for the purpose of assessing and, where applicable, Engaging the Candidate; comply with applicable data protection law, including Regulation (EU) 2016/679, the UK GDPR where applicable, and Law No. 195/2024 of the Republic of Moldova; maintain appropriate technical and organisational security measures; and provide the other with reasonable and prompt assistance in responding to data-subject requests, regulator enquiries and personal-data breaches affecting the other’s data.',
    },
    {
      k: 'c',
      id: 'B18-3',
      t: 'Each party shall provide its own privacy information to the Candidate as required by Articles 13 and 14 of Regulation (EU) 2016/679 and their equivalents. Our [candidate privacy notice](/candidate-privacy/) is published at talentsync.eu/candidate-privacy/.',
    },
    {
      k: 'c',
      id: 'B18-4',
      t: '**Our status, and transfers.**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) Our processing of EU candidate and client personal data falls within **Article 3(2)** of Regulation (EU) 2016/679, and we comply with that Regulation **directly**. We do not argue that being established in Moldova puts us outside it.',
            '(b) There is no European Commission adequacy decision for the Republic of Moldova as at the date of these terms. For any transfer of personal data by the Client to us from the EEA, the Client is the exporter, and the European Commission’s standard contractual clauses (Implementing Decision (EU) 2021/914) **Module One, with the Annexes completed in the form published with these terms, are incorporated by reference and take effect without a separate signature**. The UK International Data Transfer Addendum applies in the same way where the UK GDPR applies.',
            '(c) Our transfer impact assessment summary is **attached to these terms**, not merely available on request.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'B18-5',
      t: 'Our representative appointed under Article 27 of Regulation (EU) 2016/679 is: {{EU_REP_NAME}}, {{EU_REP_ADDRESS}}, {{EU_REP_EMAIL}}.',
    },
    {
      k: 'c',
      id: 'B18-6',
      t: 'We do not collect, hold or disclose criminal-conviction or offence data relating to any Candidate. Any such vetting is a matter for the Client under its own national law.',
    },
    {
      k: 'c',
      id: 'B18-7',
      t: 'We retain Candidate personal data for **24 months** from the date of last meaningful contact, reduced to **6 months** for rejected German-facing candidates who have not consented to our talent pool, after which it is deleted or the Candidate is asked to re-consent.',
    },

    { k: 'h', level: 3, id: 'B19', t: 'B19. Liability under Part B' },
    {
      k: 'c',
      id: 'B19-1',
      t: 'Liability arising under or in connection with Part B is governed by clause [D6](#D6). There is no separate Part B cap.',
    },

    { k: 'h', level: 3, id: 'B20', t: 'B20. Term and termination of Part B' },
    {
      k: 'c',
      id: 'B20-1',
      t: 'Part B applies from acceptance under [B1.2](#B1-2) and continues until terminated by either party on 30 days’ written notice.',
    },
    {
      k: 'c',
      id: 'B20-2',
      t: 'Termination does not affect: any Fee already payable; any Fee that becomes payable in respect of an Engagement commencing within the Validity Period of any Introduction made before termination; the Validity Period itself; or any clause expressly or by implication intended to survive, as listed in clause [D20](#D20).',
    },
    { k: 'hr' },

    /* ============================================================== PART C */
    {
      k: 'h',
      level: 2,
      id: 'part-c',
      t: 'Part C — Client Terms: Flexible Hourly Collaboration',
    },
    {
      k: 'note',
      t: 'Plain English (non-binding summary — the clauses below are what actually applies)',
      body: [
        'We contract the engineer; we supply their services to you; there is no contract between you and the engineer, and the engineer is not your employee or worker. You direct the work — architecture, roadmap, priorities, tickets, standards, ceremonies, day-to-day tasks. You do not act as their employer: no discipline, no holiday approval, no performance reviews, no company badge. Work is done remotely from Moldova by engineers we engage in Moldova; nobody travels to your offices without a signed addendum, because that changes the legal position in Germany, the Netherlands and elsewhere. **Getting every licence that supply needs is our job, not yours, and we indemnify you without a cap if we get it wrong.** Timesheets go out weekly and are treated as approved if you don’t dispute them within 3 business days. We invoice monthly, payable in 21 days; if you don’t pay we can pull the engineer — but you keep title to everything you have already paid for. You can hire the engineer permanently at any time — we never block that — but a transfer fee applies on a taper, or you can simply extend the assignment for 6 months instead and then hire for free. We are not a project outsourcer and we do not take responsibility for your project’s outcome.',
      ],
    },

    {
      k: 'h',
      level: 3,
      id: 'C1',
      t: 'C1. Structure of the engagement — and the definitions this Part depends on',
    },
    {
      k: 'c',
      id: 'C1-1',
      t: '**The contractual chain.** We engage each **Engineer** under our own written contract — either a business-to-business services contract with the Engineer’s own company, or an employment contract governed by the law of the Republic of Moldova — and we **on-supply the resulting services to the Client**. **There is no contract between the Client and the Engineer, and none shall arise.** All contractual instructions relating to the Engineer’s engagement, remuneration, discipline, hours, leave and termination are given by us, and by us alone. **Part C is available only for Engineers who are resident in, and engaged by us in, the Republic of Moldova.** Engineers resident elsewhere are introduced under [Part B](#part-b) for direct engagement by the Client, and are never supplied under this Part.',
    },
    {
      k: 'c',
      id: 'C1-2',
      t: '**Definitions used in Part C**, in addition to those in [D1](#D1):',
      children: [
        {
          k: 'dl',
          items: [
            {
              t: '“Assignment”',
              d: 'means the supply of a named Engineer’s services to the Client under an Assignment Schedule.',
            },
            {
              t: '“Assignment Schedule”',
              d: 'means the document described in clause [C4](#C4), signed or confirmed in writing by both parties.',
            },
            { t: '“Charges”', d: 'means the amounts payable by the Client under clause [C7](#C7).' },
            {
              t: '“Engineer”',
              d: 'means an individual resident in the Republic of Moldova, engaged by us under clause C1.1 and supplied to the Client under an Assignment.',
            },
            { t: '“Onsite Addendum”', d: 'means the document described in clause [C3.3](#C3-3).' },
            { t: '“Services”', d: 'means the services performed by an Engineer under an Assignment.' },
            {
              t: '“Work Product”',
              d: 'means all materials, code, documentation, designs, configurations and other works created by an Engineer in the course of an Assignment.',
            },
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'C1-3',
      t: '**Formation.** Part C, together with Part D, applies from the earlier of (a) the Client’s signature or written confirmation of an Assignment Schedule, and (b) the commencement of any Services by an Engineer. Clause [B1.3](#B1-3) (rejection of the Client’s own terms) applies equally to Part C. No Engineer shall be granted access to any Client system before the Data Processing Agreement takes effect under [C14.2](#C14-2).',
    },
    {
      k: 'c',
      id: 'C1-4',
      t: '**We are not a project outsourcing company.** We do not accept, and expressly disclaim, responsibility for the specification, management, scope, timetable, budget, acceptance or outcome of the Client’s project. Our obligation is to supply suitably skilled Engineers and to procure that they exercise reasonable skill and care in performing the Services. No Assignment is a fixed-scope, fixed-price or outcome-based engagement, and no Assignment Schedule creates a deliverable-based obligation unless we expressly agree one in writing signed by an authorised signatory of TalentSync.',
    },

    { k: 'h', level: 3, id: 'C2', t: 'C2. Control — what the Client directs, and the non-employment statement' },
    {
      k: 'c',
      id: 'C2-1',
      t: '**The Client may** specify and direct: the tasks to be performed; technical requirements and specifications; priorities, sequencing and sprint content; architecture, design decisions, coding standards, review standards, tooling, repositories and environments; acceptance criteria; and participation in the Client’s engineering ceremonies, stand-ups, planning, retrospectives and code review. The Client may require an Engineer to use the Client’s systems and to follow the Client’s technical and security policies.',
    },
    {
      k: 'c',
      id: 'C2-2',
      t: '**The Client shall not:**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) exercise, or purport to exercise, any disciplinary or grievance authority over any Engineer;',
            '(b) set, approve, refuse or record any Engineer’s working hours, overtime, holiday or leave;',
            '(c) include any Engineer in its performance-review, appraisal, promotion, bonus, benefits, pension, share, insurance or employee-recognition schemes;',
            '(d) issue instructions as to the place from which an Engineer works, or require attendance at any location, save under a signed Onsite Addendum;',
            '(e) hold out any Engineer as its employee, worker, officer or agent, issue an employee identity badge, list the Engineer in an internal employee directory without an external-contractor marker, or provide an email address that does not identify the Engineer as an external contractor;',
            '(f) direct an Engineer to perform work outside the scope of the Assignment Schedule;',
            '(g) purport to terminate, suspend or vary any Engineer’s engagement — the Client’s sole remedies are replacement under [C5](#C5) or termination of the Assignment under [C10](#C10); or',
            '(h) offer, pay or provide any remuneration, bonus, gift of material value, equity or benefit directly to an Engineer.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'C2-3',
      t: '**Non-employment statement.** No Engineer is an employee, worker, agency worker, jobholder or partner of the Client or of any Client Group company. No Assignment creates a contract of employment or an employment relationship between the Client and any Engineer. The Client is not responsible for, and shall not account for, any Engineer’s income tax, social security, pension or statutory entitlements, all of which are our responsibility under clause [C15.1](#C15-1).',
    },
    {
      k: 'c',
      id: 'C2-4',
      t: 'The parties acknowledge that the characterisation of a working relationship is determined by the facts as well as by the contract. Each party shall conduct itself consistently with C2.1 to C2.3, and shall notify the other promptly of any circumstance that is inconsistent with them.',
    },

    { k: 'h', level: 3, id: 'C3', t: 'C3. Place of performance — remote from Moldova' },
    { k: 'c', id: 'C3-1', t: '**The Services are performed remotely from the Republic of Moldova.**' },
    {
      k: 'c',
      id: 'C3-2',
      t: '**No Engineer shall attend the Client’s premises, or perform any Services in the Client’s country or in any other country, without our prior written agreement and a signed Onsite Addendum.** The Client shall not request, encourage or permit any such attendance. If the Client does so, the Client shall indemnify us in full against all resulting liabilities, penalties, fines, taxes, social-security contributions, licensing consequences and costs.',
    },
    {
      k: 'c',
      id: 'C3-3',
      t: 'An **Onsite Addendum** shall address, as a minimum: the country, location and dates; any work permit, visa or posted-worker notification required and who obtains it; A1 or equivalent social-security documentation; insurance; health and safety; expenses; the additional rate applicable; and any local temporary-agency-work licence or registration required, which we obtain under [C16.1](#C16-1).',
    },
    {
      k: 'c',
      id: 'C3-4',
      t: 'The Client acknowledges that the remote-only model in C3.1 is a material term on which the Charges and the risk allocation are based.',
    },

    { k: 'h', level: 3, id: 'C4', t: 'C4. Assignment Schedule' },
    {
      k: 'c',
      id: 'C4-1',
      t: 'Each Assignment is documented in an Assignment Schedule signed or confirmed in writing by both parties before the Engineer starts. **We do not supply “a resource”; every Engineer is named.**',
    },
    {
      k: 'c',
      id: 'C4-2',
      t: 'Each Assignment Schedule shall state, as a minimum: the named Engineer; the role and scope of the Services; the Charges, currency and billing unit; the expected hours per week and any cap; **the Engineer’s standard working window expressed in Central European Time and the minimum daily overlap with the Client’s core hours; the Engineer’s committed availability for the Client’s stand-up, planning and review ceremonies; the maximum response time to a message during the working window; and the escalation contact at TalentSync outside that window**; the start date; the minimum term; the notice periods; the place of performance (remote, Republic of Moldova, unless an Onsite Addendum applies); the named Client representative authorised to approve timesheets and to approve premium-rate work; security, access and equipment requirements; any client-specific confidentiality or IP requirements; the transfer-fee table in clause [C11](#C11); and the annexed list of Moldovan public holidays.',
    },
    {
      k: 'c',
      id: 'C4-3',
      t: 'Where an Assignment is, exceptionally, agreed to involve onsite work in a jurisdiction whose law requires the supply to be designated as temporary agency work or equivalent, the Assignment Schedule and Onsite Addendum shall carry that designation expressly and shall name the Engineer, as required by that law and by [C16.2](#C16-2).',
    },
    {
      k: 'c',
      id: 'C4-4',
      t: 'In the event of conflict, the Assignment Schedule prevails over Part C in respect of the commercial particulars it states; Part C prevails in all other respects.',
    },

    { k: 'h', level: 3, id: 'C5', t: 'C5. Substitution and replacement of Engineers' },
    {
      k: 'c',
      id: 'C5-1',
      t: '**Our substitution right.** We may substitute any Engineer with another of equivalent seniority, skill and experience on **10 business days’** written notice, subject to the Client’s approval, which shall not be unreasonably withheld or delayed. We bear the cost of handover and of bringing the substitute up to speed, and no Charges are payable for handover time.',
    },
    {
      k: 'c',
      id: 'C5-2',
      t: '**The Client’s replacement right.** Where the Client is reasonably dissatisfied with an Engineer’s performance, it shall notify us in writing with reasons. We shall have 10 business days to remedy the matter, failing which the Client may require replacement on 10 business days’ written notice. Where the Client requires replacement within the first 10 business days of an Assignment on grounds of demonstrated technical unsuitability, the Charges for those days are waived.',
    },
    {
      k: 'c',
      id: 'C5-3',
      t: 'If we are unable to supply a suitable replacement within 20 business days of a request under C5.2, the Client may terminate that Assignment immediately on written notice without further charge.',
    },
    { k: 'c', id: 'C5-4', t: 'Substitution or replacement does not restart the minimum term of the Assignment.' },

    { k: 'h', level: 3, id: 'C6', t: 'C6. Timesheets and approval' },
    {
      k: 'c',
      id: 'C6-1',
      t: 'We shall submit timesheets **weekly** to the Client representative named in the Assignment Schedule, recording hours worked by day and, where the Assignment Schedule requires it, by task or ticket reference.',
    },
    {
      k: 'c',
      id: 'C6-2',
      t: 'The Client shall approve or dispute each timesheet within **3 business days** of receipt. A dispute must be in writing and must state the hours disputed and the grounds.',
    },
    { k: 'c', id: 'C6-3', t: '**A timesheet not disputed within that period is deemed approved.**' },
    {
      k: 'c',
      id: 'C6-4',
      t: 'Where part of a timesheet is disputed, the undisputed hours are approved and invoiced, and the parties shall resolve the disputed hours within a further 5 business days.',
    },
    {
      k: 'c',
      id: 'C6-5',
      t: 'An approved or deemed-approved timesheet is **conclusive evidence of the hours worked**, but is not evidence of, and does not constitute acceptance of, the quality of the Services.',
    },
    {
      k: 'c',
      id: 'C6-6',
      t: 'The Client shall not withhold approval, or payment, on the ground that a timesheet lacks a signature where the hours were in fact worked.',
    },
    {
      k: 'c',
      id: 'C6-7',
      t: 'Where the Engineer is unavailable during the committed working window on more than **3 occasions in any calendar month**, other than for notified absence under [C7.6](#C7-6), the Client may require a service review and, if the position is not corrected within 10 business days, may terminate the Assignment on 5 business days’ notice without an Early Termination Charge.',
    },

    { k: 'h', level: 3, id: 'C7', t: 'C7. Charges, rate review, expenses' },
    {
      k: 'c',
      id: 'C7-1',
      t: 'Charges are the hourly rates stated in the Assignment Schedule, in **EUR**, exclusive of VAT and of any other tax. Clause [B11](#B11) (VAT, withholding and gross-up) applies to Part C.',
    },
    {
      k: 'c',
      id: 'C7-2',
      t: '**Premium rates apply only where the named Client representative in the Assignment Schedule has approved the work in writing in advance**, identifying the hours and the applicable rate. Subject to that approval: work performed outside the Engineer’s standard working window stated in the Assignment Schedule, or on a public holiday listed in its annex, is charged at **150%** of the standard rate; work performed on a rest day, or more than 4 hours outside that window, is charged at **200%**. Any on-call arrangement is charged as separately agreed in writing. **Premium rates are defined by reference to the Engineer’s standard working window, not to any absolute local time.** Work performed without prior written approval is charged at the standard rate.',
    },
    {
      k: 'c',
      id: 'C7-3',
      t: '**Rate review.** Rates are fixed for the first **12 months** of an Assignment. Thereafter we may increase them once in any 12-month period on **60 days’** written notice, by no more than the increase in the euro-area Harmonised Index of Consumer Prices over the preceding 12 months plus **3 percentage points**. The Client may terminate the affected Assignment without penalty and without notice charge by written notice given within 30 days of our rate-increase notice.',
    },
    {
      k: 'c',
      id: 'C7-4',
      t: '**Currency.** If the EUR/MDL reference rate published by the National Bank of Moldova moves by more than **7%** against the reference rate stated in the Assignment Schedule, either party may request a good-faith re-pricing discussion; failing agreement within 30 days, either party may terminate the affected Assignment on 30 days’ written notice.',
    },
    {
      k: 'c',
      id: 'C7-5',
      t: '**Expenses.** We charge no expenses unless agreed in advance in writing. Where onsite work is agreed under an Onsite Addendum, travel, accommodation, subsistence, permit and insurance costs are charged at cost plus any handling fee stated in that Addendum, and travel time is charged at 50% of the standard rate.',
    },
    {
      k: 'c',
      id: 'C7-6',
      t: '**Non-billable absence.** Each Engineer is entitled to **25 days** of planned absence per rolling 12 months, notified to the Client at least 15 business days in advance, which are not charged. Moldovan public holidays, listed in the annex to the Assignment Schedule, are not charged. Sickness absence is not charged. Where planned absence exceeds 10 consecutive business days we will, at the Client’s request, offer a temporary substitute under [C5.1](#C5-1).',
    },

    { k: 'h', level: 3, id: 'C8', t: 'C8. Invoicing and payment' },
    {
      k: 'c',
      id: 'C8-1',
      t: 'We invoice **monthly in arrears** against approved or deemed-approved timesheets.',
    },
    {
      k: 'c',
      id: 'C8-2',
      t: 'Invoices are payable within **21 days** of the invoice date, subject to [B10.2](#B10-2).',
    },
    {
      k: 'c',
      id: 'C8-3',
      t: 'Clauses [B10.3](#B10-3) (payment mechanics and bank charges), [B10.4](#B10-4) (interest), [B10.5](#B10-5) (recovery compensation and costs) and [B10.7](#B10-7) (no set-off) apply to Part C.',
    },
    {
      k: 'c',
      id: 'C8-4',
      t: '**Withdrawal of Engineers for non-payment.** Where any sum is overdue, we may, on **7 days’** written notice, suspend the Services and withdraw any or all Engineers, without liability. Charges continue to accrue for the duration of the notice period and are payable in full. Suspension is without prejudice to any other right, including the right to terminate. **Title to Work Product already paid for is not affected and does not revest — see [C12.3](#C12-3).**',
    },

    { k: 'h', level: 3, id: 'C9', t: 'C9. Client obligations' },
    {
      k: 'c',
      id: 'C9-1',
      t: 'The Client shall: provide the access, systems, credentials, environments, documentation and information the Engineer reasonably requires; provide timely decisions, priorities and code review; nominate the representative named in the Assignment Schedule and keep that nomination current; comply with its own health-and-safety and information-security duties in relation to anyone accessing its systems; and notify us promptly of any security incident, performance concern or conduct issue involving an Engineer.',
    },
    {
      k: 'c',
      id: 'C9-2',
      t: 'Where the Client’s failure to comply with C9.1 prevents an Engineer working, the hours the Engineer was available remain chargeable at the standard rate, up to the hours stated in the Assignment Schedule.',
    },
    {
      k: 'c',
      id: 'C9-3',
      t: 'The Client shall not require any Engineer to perform work that is unlawful, that breaches a third party’s rights, or that falls outside the Assignment Schedule.',
    },

    { k: 'h', level: 3, id: 'C10', t: 'C10. Minimum term, notice, termination and exit' },
    {
      k: 'c',
      id: 'C10-1',
      t: 'Each Assignment has an initial minimum term of **one month** from the start date.',
    },
    {
      k: 'c',
      id: 'C10-2',
      t: 'After the minimum term, either party may terminate an Assignment on written notice of:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) **20 business days** by the Client, rising to **30 business days** once the Assignment has run for 6 continuous months; and',
            '(b) **20 business days** by us.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'C10-3',
      t: '**Early Termination Charge.** Where the Client terminates an Assignment during the minimum term, or gives shorter notice than C10.2(a) requires, the Client shall pay a charge equal to the Charges that would have been payable for the unexpired part of the minimum term or notice period, calculated on the hours stated in the Assignment Schedule. This charge is compensation for committed cost that we cannot avoid, principally our own notice obligations to the Engineer, and is not a penalty.',
    },
    {
      k: 'c',
      id: 'C10-4',
      t: 'Either party may terminate an Assignment, or Part C in its entirety, immediately by written notice where the other: commits a material breach that is not remediable, or that it fails to remedy within 15 business days of written notice; becomes insolvent, enters any insolvency or restructuring process, or ceases to carry on business; or becomes subject to sanctions under clause [D10](#D10).',
    },
    {
      k: 'c',
      id: 'C10-5',
      t: 'We may terminate an Assignment immediately where the Engineer commits serious misconduct, where continuation would place either party in breach of law, or where the Client breaches clause [C2.2](#C2-2) or [C3.2](#C3-2).',
    },
    {
      k: 'c',
      id: 'C10-6',
      t: 'On termination of an Assignment: all Charges accrued to the date of termination, and any Early Termination Charge, fall due immediately; the Client shall revoke the Engineer’s access to its systems and return or destroy any equipment we supplied; and we shall procure the return or destruction of the Client’s confidential information. **The destruction obligation in this clause takes effect only after C10.7 has been performed, or after the Client’s request window under C10.7 has closed without a request.**',
    },
    {
      k: 'c',
      id: 'C10-7',
      t: '**Transition assistance.** On termination or expiry of an Assignment for any reason other than the Client’s material breach, we shall, at the Client’s written request made within **10 business days**, provide up to **20 business days** of transition assistance at the rates in the Assignment Schedule, comprising: written handover documentation covering the Engineer’s active work, open branches, environments, credentials held, known defects and outstanding decisions; a live handover session with the Client’s nominated personnel; and reasonable answers to follow-up questions for 30 days afterwards. Where the Client terminates during the minimum term, transition assistance is chargeable at the standard rate and is not reduced by the Early Termination Charge.',
    },
    {
      k: 'c',
      id: 'C10-8',
      t: 'Before an Engineer’s last day, we shall procure that all Work Product is committed to the Client’s repositories and all Client credentials are surrendered.',
    },

    {
      k: 'h',
      level: 3,
      id: 'C11',
      t: 'C11. Direct engagement of an Engineer — transfer fee, not a prohibition',
    },
    {
      k: 'c',
      id: 'C11-1',
      t: '**The Client may engage an Engineer directly at any time. Nothing in this Agreement prohibits, restricts, penalises or is intended to prevent or discourage the conclusion of an employment contract or any other working relationship between the Client and an Engineer.** Any provision that would have that effect is severed to the extent necessary.',
    },
    {
      k: 'c',
      id: 'C11-2',
      t: 'Where the Client, any Client Group company, or any third party to which the Client introduced the Engineer, Engages an Engineer — whether as employee, contractor, consultant, or through any company, umbrella, employer-of-record or other intermediary — during an Assignment or within **12 months** of its end, the Client shall pay a **Transfer Fee** as follows:',
      children: [
        {
          k: 'table',
          head: ['Completed months of Assignment at the date of engagement', 'Transfer Fee'],
          rows: [
            [
              '0–6',
              '**20%** of the Engineer’s first-year annualised gross remuneration, subject to a minimum of **EUR 8,000**',
            ],
            ['7–12', '**12%**'],
            ['13–18', '**6%**'],
            ['19 or more', '**Nil**'],
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'C11-3',
      t: '**Alternative to payment.** As an alternative to paying the Transfer Fee, the Client may elect, by written notice before the engagement takes effect, to **extend the Assignment for a further 6 months** on the existing terms and Charges, at the end of which the Client may engage the Engineer directly with **no fee payable**.',
    },
    {
      k: 'c',
      id: 'C11-4',
      t: 'The Transfer Fee is compensation for the recruitment, assessment, onboarding, training and administration cost we have incurred in respect of the Engineer, and for the loss of the benefit of the Assignment. It is not, and is not intended to operate as, a restriction on the Engineer’s freedom to work or on the Client’s freedom to hire. The taper in C11.2 and the alternative in C11.3 exist so that the amount reflects unrecovered cost and reduces to nil over time.',
    },
    {
      k: 'c',
      id: 'C11-5',
      t: '“First-year annualised gross remuneration” is calculated in accordance with the definition of **Remuneration** in clause [D1.1](#D1-1), applied with the necessary changes.',
    },
    {
      k: 'c',
      id: 'C11-6',
      t: 'Clause [B9](#B9) (notification duty) applies: the Client shall notify us in writing within 3 business days of making any offer to an Engineer and of the Engineer’s acceptance, with full remuneration details.',
    },
    {
      k: 'c',
      id: 'C11-7',
      t: 'We impose no obligation of any kind on any Engineer restricting their right to accept engagement with the Client, and we will not seek to do so.',
    },
    {
      k: 'c',
      id: 'C11-8',
      t: 'The undertaking in [B17.2](#B17-2) — that we will not approach or introduce elsewhere a person placed with the Client — applies equally to Engineers supplied under Part C.',
    },

    { k: 'h', level: 3, id: 'C12', t: 'C12. Intellectual property — the three-link chain' },
    {
      k: 'c',
      id: 'C12-1',
      t: '**Link one: Engineer to TalentSync.** We warrant that our written contract with each Engineer contains a present assignment to us of all economic and patrimonial rights in all Work Product created in the course of an Assignment, worldwide, for the full term of protection and all renewals, in all modes of exploitation known and unknown so far as permitted by law; a rolling present assignment of rights in each work as and when it is created; a further-assurance covenant; an undertaking by the Engineer not to assert moral rights and a consent to modification, adaptation, and anonymous or pseudonymous publication; and a fallback perpetual, exclusive, irrevocable, worldwide, sublicensable, royalty-free licence operating in respect of any right that does not validly assign.',
    },
    {
      k: 'c',
      id: 'C12-2',
      t: '**Link two: TalentSync to Client.** We assign to the Client, with full title guarantee, all economic and patrimonial rights we hold in the Work Product, worldwide, for the full term of protection and all renewals, in all modes of exploitation so far as permitted by law. Where any right cannot validly be assigned, we grant the Client a perpetual, exclusive, irrevocable, worldwide, sublicensable, transferable, royalty-free licence to use, copy, modify, adapt, translate, distribute and exploit that Work Product for any purpose. **Work Product includes inventions, patentable subject matter, database rights, data, model weights, prompts and training-derived artefacts, and know-how reduced to writing.**',
    },
    {
      k: 'c',
      id: 'C12-3',
      t: '**Title passes on payment for the item.** Each item of Work Product vests in the Client on payment of the invoice covering the period in which it was created. **Non-payment of any sum relating to any other Assignment does not affect title under this Assignment.** Where an invoice is disputed in good faith and in writing, title passes on payment of the undisputed portion. **Title once vested does not revest** on any subsequent breach or termination; our remedy for non-payment is the debt, interest, suspension under [C8.4](#C8-4) and termination, and not the withholding of title.',
    },
    {
      k: 'c',
      id: 'C12-4',
      t: '**Moral rights.** The Client acknowledges that under the law of the Republic of Moldova (Law No. 230 of 28 July 2022), and under the law of several other jurisdictions, moral rights are inalienable and cannot be waived or transferred. We do not, and cannot, warrant that any Engineer has waived their moral rights. What we do warrant, and have obtained, is each Engineer’s binding **undertaking not to assert** those rights against us, the Client or the Client’s successors and licensees, and their consent to modification, adaptation and publication without attribution.',
    },
    {
      k: 'c',
      id: 'C12-5',
      t: '**Background IP.** We retain ownership of all materials, tools, libraries, frameworks, methodologies, templates and know-how that existed before the Assignment or were developed independently of it. To the extent any such material is embedded in the Work Product, we grant the Client a perpetual, non-exclusive, worldwide, irrevocable, royalty-free, sublicensable licence to use it as part of the Work Product. Engineers remain free to use the general skill, knowledge and experience acquired during an Assignment.',
    },
    {
      k: 'c',
      id: 'C12-6',
      t: '**Open source.** No Engineer shall incorporate into Work Product any component under a licence that would, on the Client’s intended distribution or provision of the Work Product, require the Client to disclose, license or make available the source of the Client’s own proprietary code — including the GPL, AGPL and SSPL families, and any component under those licences that is statically linked or otherwise combined so as to create a derivative work — without the Client’s prior written consent. **Permissive licences (including MIT, BSD, Apache 2.0 and ISC) and weak-copyleft licences used in unmodified, dynamically linked library form are permitted.** We shall deliver with each release, and in any event monthly, a **software bill of materials** listing every third-party and open-source component in the Work Product with its version and licence. The indemnity in [D7.1](#D7-1) applies to any claim arising from our failure to comply with this clause or from any component omitted from the bill of materials; it does not apply to a component the Client approved in writing after disclosure of its licence.',
    },
    {
      k: 'c',
      id: 'C12-7',
      t: '**Client materials.** All materials, data, systems and IP provided by the Client remain the Client’s. The Client grants us and the Engineer a non-exclusive licence to use them solely for the purposes of the Assignment, and warrants that it has the right to grant that licence.',
    },
    {
      k: 'c',
      id: 'C12-8',
      t: '**Perfection of the chain.** On the Client’s written request we shall (a) provide a copy of the intellectual-property provisions of our contract with the relevant Engineer, redacted only as to commercial terms, and (b) procure that the Engineer executes any confirmatory assignment or consent the Client reasonably requires, directly in the Client’s favour. We irrevocably appoint the Client as our attorney to execute such documents in our name if we have not done so within **15 business days** of request. **We shall indemnify the Client in full, and the cap in [D6.3](#D6-3) does not apply, against all loss arising from any failure of title in the Work Product or from any Engineer asserting any right in it.**',
    },
    {
      k: 'c',
      id: 'C12-9',
      t: '**AI coding tools.** We shall notify the Client of any generative AI coding assistant used in producing Work Product and shall configure it to exclude suggestions matching known public code. The indemnity in [D7.1](#D7-1) covers any third-party claim arising from output of such a tool.',
    },

    { k: 'h', level: 3, id: 'C13', t: 'C13. Confidentiality, security and systems access' },
    { k: 'c', id: 'C13-1', t: 'Clause [D3](#D3) (Confidentiality) applies to Part C.' },
    {
      k: 'c',
      id: 'C13-2',
      t: 'We shall procure that each Engineer is bound by written confidentiality obligations no less protective than those in D3, and shall enforce them at the Client’s reasonable request and cost.',
    },
    {
      k: 'c',
      id: 'C13-3',
      t: 'Each Engineer shall comply with the Client’s written information-security, acceptable-use and data-handling policies notified to us in advance, provided those policies do not conflict with clause [C2.2](#C2-2) and do not purport to impose employment-type obligations on the Engineer.',
    },
    {
      k: 'c',
      id: 'C13-4',
      t: 'The Client shall grant each Engineer only the access necessary for the Assignment, shall maintain its own access logging and offboarding controls, and shall revoke access immediately on termination of the Assignment.',
    },
    {
      k: 'c',
      id: 'C13-5',
      t: 'We maintain, and will evidence on request, the technical and organisational measures described in our security schedule, including device encryption, multi-factor authentication, unique named accounts, and a documented offboarding process.',
    },

    { k: 'h', level: 3, id: 'C14', t: 'C14. Data protection under Part C' },
    {
      k: 'c',
      id: 'C14-1',
      t: 'Where an Engineer accesses personal data controlled by the Client, the Client is the **controller**, we are the **processor**, and the Engineer is our **sub-processor**. The Client authorises the engagement of the named Engineer, and of our standard infrastructure sub-processors listed in the DPA, as sub-processors.',
    },
    {
      k: 'c',
      id: 'C14-2',
      t: 'The **Data Processing Agreement at Schedule 3**, which complies with Article 28 of Regulation (EU) 2016/679 and the equivalent provisions of Law No. 195/2024 of the Republic of Moldova, and which annexes the European Commission’s standard contractual clauses (Implementing Decision (EU) 2021/914) Module Two with the Annexes completed, together with the UK International Data Transfer Addendum where the UK GDPR applies, **is incorporated into this Agreement and takes effect on the date of the first Assignment Schedule without further signature. No Engineer shall be granted access to any Client system or to any personal data controlled by the Client before that date.** The DPA prevails over Part C in the event of conflict on data protection matters.',
    },
    {
      k: 'c',
      id: 'C14-3',
      t: 'We will provide a transfer impact assessment summary and will assist the Client with data-protection impact assessments, data-subject requests, breach notification and regulator engagement, as required by Article 28(3).',
    },
    { k: 'c', id: 'C14-4', t: 'Clause [B18.5](#B18-5) (EU representative) applies.' },
    {
      k: 'c',
      id: 'C14-5',
      t: 'We shall notify the Client of any personal data breach affecting the Client’s personal data without undue delay and **in any event within 24 hours** of becoming aware of it, with the information required by Article 33(3), and shall provide written updates at least every 24 hours until the incident is closed.',
    },
    {
      k: 'c',
      id: 'C14-6',
      t: 'We shall give the Client **30 days’** written notice before engaging any new sub-processor. The Client may object on reasonable data-protection grounds within that period, and the parties shall agree an alternative, failing which the Client may terminate the affected Assignment without charge.',
    },
    {
      k: 'c',
      id: 'C14-7',
      t: 'Notwithstanding [C18.3](#C18-3), the Client and its appointed auditor may exercise the audit and inspection rights required by Article 28(3)(h) on **10 business days’** written notice, extending to our technical and organisational measures, our records of processing and our sub-processor arrangements; the Client shall accept a current ISO/IEC 27001 or SOC 2 Type II report in satisfaction where one is available.',
    },

    {
      k: 'h',
      level: 3,
      id: 'C15',
      t: 'C15. Employment status, equal treatment, working time and health and safety',
    },
    {
      k: 'c',
      id: 'C15-1',
      t: 'We are responsible for each Engineer’s remuneration, income tax, social-security contributions, statutory entitlements, insurance and working-time compliance under the law of the Republic of Moldova.',
    },
    {
      k: 'c',
      id: 'C15-2',
      t: 'Where any equal-treatment, pay-parity or comparable-worker regime is found to apply to an Engineer, the Client shall provide, promptly and accurately, the information about the pay and basic working conditions of its own comparable workers that we require in order to comply, and shall **indemnify us** against the cost of any equalisation, back-pay, penalty or claim arising from the Client’s failure to provide that information or from its inaccuracy.',
    },
    {
      k: 'c',
      id: 'C15-3',
      t: '**Client’s conduct indemnity.** The Client shall indemnify us against all liabilities, taxes, social-security contributions, penalties, fines, interest, awards, settlements and costs (including reasonable legal costs) arising from any finding, claim or assessment that an Engineer is or was an employee, worker or agency worker of the Client, **to the extent** that finding, claim or assessment is caused by the Client’s documented breach of clause [C2.2](#C2-2) or [C3.2](#C3-2). **This clause is expressly subject to [C16.3](#C16-3): where both apply, C16.3 prevails and the Client bears nothing in respect of a licensing or authorisation failure of ours.**',
    },
    {
      k: 'c',
      id: 'C15-4',
      t: 'The Client is responsible for health and safety in relation to any system or premises to which an Engineer is given access, and for compliance with any duty owed to persons who are not its employees.',
    },

    { k: 'h', level: 3, id: 'C16', t: 'C16. Licensing, agency-work regulation and worker status' },
    {
      k: 'c',
      id: 'C16-1',
      t: '**Supplier’s licensing obligation.** TalentSync is **solely responsible** for obtaining and maintaining every licence, permit, authorisation, registration or admission required in any jurisdiction in respect of its supply of Engineers under Part C, including an *Erlaubnis zur Arbeitnehmerüberlassung* under the German AÜG, registration under Article 7a of the Dutch WAADI and admission under the Dutch Wtta from 1 January 2027. We warrant that we hold every such authorisation applicable to each Assignment at the date the Assignment Schedule is signed and will maintain it throughout. **The Client has no duty to investigate, advise on or notify us of any such requirement, and no failure by the Client to do so reduces our obligation.**',
    },
    {
      k: 'c',
      id: 'C16-2',
      t: 'Where an Assignment is or may constitute *Arbeitnehmerüberlassung* within § 1(1) AÜG, the Assignment Schedule shall, before the Engineer commences Services, (a) expressly designate the supply as *Arbeitnehmerüberlassung* and (b) name the Engineer, as required by § 1(1) sentences 5 and 6 AÜG.',
    },
    {
      k: 'c',
      id: 'C16-3',
      t: '**Licensing and status indemnity — uncapped.** We shall indemnify the Client in full, and the cap in [D6.3](#D6-3) does not apply, against all liabilities, back pay, holiday pay, social-security contributions and interest, tax, fines, penalties, legal and remediation costs arising from:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) breach of C16.1 or C16.2;',
            '(b) any determination under § 9(1) or § 10(1) AÜG, Article 7a WAADI, the Wtta or any equivalent provision that an Engineer is or is deemed to be an employee or worker of the Client; or',
            '(c) the Client’s joint and several liability under § 28e(2) SGB IV, § 14 AEntG, § 13 MiLoG or the Dutch WAS in respect of an Engineer.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'C16-4',
      t: 'The Client may terminate any Assignment immediately, without charge beyond Charges for Services actually performed, on becoming aware that C16.1 is not satisfied.',
    },
    {
      k: 'c',
      id: 'C16-5',
      t: '**Belgium.** We do not supply Engineers on an hourly-collaboration basis to clients established in Belgium, or for performance in Belgium, unless we have first obtained written Belgian legal advice and, where required, prior authorisation. Any Assignment Schedule purporting to do so without that advice is void, and [Part B](#part-b) (direct recruitment) is the only model available to Belgian clients.',
    },
    {
      k: 'c',
      id: 'C16-6',
      t: '**Sweden.** Where an Engineer would otherwise be assigned to the same operating unit of the Client for more than 20 months in any 36-month period, the parties shall review the Assignment and agree either to conclude it or to restructure it.',
    },
    {
      k: 'c',
      id: 'C16-7',
      t: 'Each party shall notify the other promptly of any enquiry, inspection or communication from a labour inspectorate, tax authority or equivalent body concerning an Assignment, and shall co-operate in responding to it.',
    },

    { k: 'h', level: 3, id: 'C17', t: 'C17. Insurance' },
    {
      k: 'c',
      id: 'C17-1',
      t: 'We maintain, with reputable insurers, professional indemnity insurance of **{{PI_INSURANCE_LIMIT}}**, commercial general liability insurance of **{{GL_INSURANCE_LIMIT}}**, and cyber liability insurance of **{{CYBER_INSURANCE_LIMIT}}**. We will provide a certificate of insurance on written request.',
    },
    {
      k: 'c',
      id: 'C17-2',
      t: 'Clause [D6.5](#D6-5) governs how long that insurance must be maintained, and how the cover interacts with the liability caps. The insurance does **not** limit any liability that clause D6 leaves uncapped.',
    },

    { k: 'h', level: 3, id: 'C18', t: 'C18. Audit and records' },
    {
      k: 'c',
      id: 'C18-1',
      t: 'We shall retain timesheets, Assignment Schedules and Charges records for **3 years** after the end of the relevant Assignment.',
    },
    {
      k: 'c',
      id: 'C18-2',
      t: 'The Client may, once in any 12-month period, on 20 business days’ written notice and during normal business hours, audit those records solely to verify the accuracy of the Charges. The audit is at the Client’s cost, save that where it discloses an overcharge exceeding **5%** of the Charges in the audited period, we shall bear the reasonable cost of the audit and shall credit the overcharge with interest.',
    },
    {
      k: 'c',
      id: 'C18-3',
      t: 'The charges-audit right in C18.2 does not extend to our pricing build-up, our margins, or any information relating to other clients, **and is without prejudice to [C14.7](#C14-7)** (the Article 28(3)(h) data-protection audit).',
    },

    { k: 'h', level: 3, id: 'C19', t: 'C19. Liability under Part C' },
    {
      k: 'c',
      id: 'C19-1',
      t: 'Liability arising under or in connection with Part C is governed by clause [D6](#D6). There is no separate Part C cap.',
    },
    {
      k: 'c',
      id: 'C19-2',
      t: 'We are not liable for any decision taken by the Client in reliance on an Engineer’s work, for the outcome of the Client’s project, or for any defect in a specification, architecture or requirement determined by the Client.',
    },

    { k: 'h', level: 3, id: 'C20', t: 'C20. Term and termination of Part C' },
    {
      k: 'c',
      id: 'C20-1',
      t: 'Part C applies from the date determined under [C1.3](#C1-3) and continues until terminated by either party on 30 days’ written notice, save that termination of Part C does not terminate any Assignment then current, which continues until terminated under clause [C10](#C10).',
    },
    {
      k: 'c',
      id: 'C20-2',
      t: 'Clauses C10.7 and C10.8 (exit and transition), C11 (Transfer Fee), C12 (IP, including the indemnity in C12.8), C13 (Confidentiality), C14 (Data protection), C15.2 and C15.3, C16.3 (licensing and status indemnity), C17, C18 and C19 survive termination.',
    },
    { k: 'hr' },

    /* ============================================================== PART D */
    { k: 'h', level: 2, id: 'part-d', t: 'Part D — Provisions common to Parts B and C' },
    {
      k: 'note',
      t: 'Plain English (non-binding summary — the clauses below are what actually applies)',
      body: [
        'This is the shared machinery. The most important points: candidate CVs and identities are our confidential information and must not leave your company; each side keeps the other’s secrets; there is **one** liability cap, not three, and a short list of things it does not cover — our licensing failure, a failure of title in the code, IP infringement, a confidentiality breach and a data-protection breach; claims are time-barred at **24 months**, but we never try to exclude liability for fraud, death or personal injury, or deliberate wrongdoing, because that would be void anyway; we don’t ban you from hiring our staff, we just charge a fee if you do; notices by email to the named addresses count; if a court thinks a period or amount is too long or too large, it should reduce it rather than delete it; and Moldovan law and the Chișinău courts govern everything.',
      ],
    },

    { k: 'h', level: 3, id: 'D1', t: 'D1. Definitions and interpretation' },
    { k: 'c', id: 'D1-1', t: 'In Parts B, C and D:' },
    {
      k: 'dl',
      items: [
        {
          t: '“Agreement”',
          d: 'means Parts B, C and D as applicable, together with each Fee Confirmation, Assignment Schedule, Onsite Addendum and the Data Processing Agreement.',
        },
        {
          t: '“Applicable Data Protection Law”',
          d: 'means Regulation (EU) 2016/679, the UK GDPR and Data Protection Act 2018 where applicable, Law No. 195 of 25 July 2024 of the Republic of Moldova, and any other data protection or privacy law applicable to a party’s processing.',
        },
        {
          t: '“business day”',
          d: 'means a day other than a Saturday, Sunday or public holiday in the Republic of Moldova.',
        },
        {
          t: '“Candidate”',
          d: 'means any person introduced by us to the Client, whether or not that person was sourced by us, approached by us, applied to us, or was identified to the Client by us in any other way.',
        },
        { t: '“Client”', d: 'means the entity that accepts these terms under clause [B1.2](#B1-2) or [C1.3](#C1-3).' },
        {
          t: '“Client Group”',
          d: 'means the Client and any other entity that directly or indirectly controls, is controlled by, or is under common control with the Client, and includes any parent, subsidiary, sister company, joint venture, franchisee, franchisor, portfolio company of a common investor, and any successor to all or part of the Client’s business. “Control” means the ability to direct the affairs of an entity, whether by ownership of voting securities, by contract or otherwise.',
        },
        { t: '“Confidential Information”', d: 'has the meaning given in [D3.1](#D3-1).' },
        {
          t: '“Engagement”',
          d: 'means the engagement, employment or use of a **Candidate or an Engineer** by the Client, by any Client Group company, or by any third party, whether directly or indirectly, on a permanent, fixed-term, temporary, part-time, consultancy, contract-for-services, freelance, secondment, apprenticeship, internship, advisory, non-executive, partnership, agency or shareholding basis; whether under a contract with that person personally, with any company, partnership, umbrella company, employer-of-record, professional-employer organisation or other entity through which they provide services, or with any other intermediary; **whether or not for the role in respect of which the Introduction was made**; and irrespective of the jurisdiction in which they perform services. **“Engage” and “Engaged” are construed accordingly.**',
        },
        {
          t: '“Engagement Date”',
          d: 'means the date on which the Candidate or Engineer first performs services, or the date their contract takes effect, whichever is earlier.',
        },
        {
          t: '“Fee Confirmation”',
          d: 'means a document issued by us and signed or confirmed in writing by the Client stating, for a named role, the Fee percentage, the Minimum Fee, the Validity Period and the payment period.',
        },
        { t: '“in writing”', d: 'includes email.' },
        {
          t: '“TalentSync”, “we”, “us”, “our”',
          d: 'means the entity identified in the Provider block at the head of this document.',
        },
      ],
    },
    {
      k: 'p',
      t: '**“Remuneration”** means the aggregate of all of the following, in each case for the first 12 months of the Engagement:',
    },
    {
      k: 'ol',
      lit: true,
      items: [
        '(a) gross annual base salary, or gross annual fees where the person is engaged other than as an employee;',
        '(b) any guaranteed bonus, commission, incentive or profit-share, and any target bonus or commission; where a bonus or commission scheme exists but no target figure is stated, it is deemed to be **15%** of base salary;',
        '(c) allowances of any kind, including car, travel, home-office, equipment, education and living allowances; where a car is provided in kind and no cash equivalent is stated, it is deemed to be **EUR 6,000**;',
        '(d) any sign-on, golden-hello, inducement, retention or buy-out payment;',
        '(e) relocation and accommodation payments and allowances;',
        '(f) employer contributions to pension, insurance or savings schemes to the extent they exceed the statutory minimum in the country of Engagement;',
        '(g) any thirteenth-month payment, holiday allowance or equivalent statutory or customary supplement (relevant in, among others, the Netherlands and Germany);',
        '(h) equity, share options, restricted stock units, phantom equity or profit participation granted at or in connection with the commencement of the Engagement, valued at grant-date fair market value; where no valuation exists, a deemed value of **EUR 10,000** applies, subject to a true-up under [B8.5](#B8-5) on the first valuation event occurring within 12 months of the Engagement Date; and',
        '(i) any payment made to any company, partnership or intermediary through which the person provides services.',
      ],
    },
    {
      k: 'c',
      id: 'D1-2',
      t: 'Headings are for convenience only. “Including” means “including without limitation”. A reference to a statute or directive includes any amendment, replacement or national implementation of it. The singular includes the plural. A reference to a person includes any legal entity. Plain-English summary boxes are explanatory only and are expressly **not** part of the Agreement; where a summary box conflicts with a clause, the clause prevails.',
    },
    {
      k: 'c',
      id: 'D1-3',
      t: 'The Client contracts as principal and not as agent, and is liable for the acts and omissions of each Client Group company as if they were its own.',
    },

    { k: 'h', level: 3, id: 'D2', t: 'D2. Order of precedence' },
    {
      k: 'c',
      id: 'D2-1',
      t: 'In the event of conflict, the following order applies, highest first: (a) a signed Fee Confirmation or Assignment Schedule, in respect of the particulars it states; (b) the Data Processing Agreement, in respect of data protection; (c) Part B or Part C, as applicable; (d) Part D; (e) Part A.',
    },

    { k: 'h', level: 3, id: 'D3', t: 'D3. Confidentiality' },
    {
      k: 'c',
      id: 'D3-1',
      t: '**“Confidential Information”** means all information of a confidential nature disclosed by one party to the other in connection with the Agreement, whether or not marked confidential, including business plans, pricing, customer and supplier information, technical information, source code, and — in our case — **Candidate and Engineer identities, curricula vitae, profiles, assessment results and contact details**.',
    },
    {
      k: 'c',
      id: 'D3-2',
      t: 'Each party shall keep the other’s Confidential Information confidential, use it only for the purposes of the Agreement, disclose it only to those of its personnel and professional advisers who need it and who are bound by equivalent obligations, and protect it with no less care than it applies to its own confidential information.',
    },
    {
      k: 'c',
      id: 'D3-3',
      t: 'The obligations do not apply to information that is or becomes public other than through breach; was lawfully known to the recipient without obligation of confidence before disclosure; is lawfully received from a third party without obligation of confidence; or is independently developed without use of the Confidential Information. A party may disclose Confidential Information where required by law, regulation or court order, giving the other party such notice as is lawful and practicable.',
    },
    {
      k: 'c',
      id: 'D3-4',
      t: '**Candidate Information — specific obligations.** The Client shall: use Candidate and Engineer information solely to evaluate that person for the specific role or Assignment for which they were introduced or supplied; **not disclose it to any person outside the Client’s own legal entity**, including any Client Group company, other agency, investor, adviser, customer or portfolio company, without our prior written consent; not add it to any database, talent pool or applicant-tracking system for any purpose other than that specific role; and delete or return it within 6 months of the conclusion of that process, save where retention is required by law or where the person has been Engaged. Breach of this clause entitles us to the liquidated damages in clause [B6.2](#B6-2) **and** to the indemnity in [D7.2](#D7-2).',
    },
    {
      k: 'c',
      id: 'D3-5',
      t: 'On termination, each party shall, at the other’s written request, return or securely destroy the other’s Confidential Information, save for one copy retained in secure archive for legal or regulatory purposes.',
    },
    {
      k: 'c',
      id: 'D3-6',
      t: 'The obligations in D3 survive termination for 5 years, and indefinitely in respect of any information that constitutes a trade secret. The parties acknowledge that these obligations form part of the reasonable steps taken to keep trade secrets secret for the purposes of Directive (EU) 2016/943 and its national implementations.',
    },

    { k: 'h', level: 3, id: 'D4', t: 'D4. Data protection — general' },
    { k: 'c', id: 'D4-1', t: 'Each party shall comply with Applicable Data Protection Law in performing the Agreement.' },
    {
      k: 'c',
      id: 'D4-2',
      t: 'The role allocation is: **independent controllers** in respect of Candidate data introduced under Part B (clause [B18](#B18)); **controller and processor** in respect of the Client’s personal data accessed by an Engineer under Part C (clause [C14](#C14)).',
    },
    {
      k: 'c',
      id: 'D4-3',
      t: 'Each party shall notify the other of any personal data breach affecting data shared under the Agreement without undue delay — and, where [C14.5](#C14-5) applies, within 24 hours — and shall co-operate in investigating and remediating it.',
    },
    { k: 'c', id: 'D4-4', t: 'Neither party shall do anything that puts the other in breach of Applicable Data Protection Law.' },

    { k: 'h', level: 3, id: 'D5', t: 'D5. Personnel of the parties' },
    {
      k: 'c',
      id: 'D5-1',
      t: 'Neither party shall, during the term and for **12 months** afterwards, knowingly solicit for employment or engagement any individual employed or engaged by the other **who was directly involved in the performance or management of the Agreement**, other than an Engineer or Candidate, to whom clauses [B4](#B4), [B17.2](#B17-2) and [C11](#C11) apply instead.',
    },
    {
      k: 'c',
      id: 'D5-2',
      t: '**This clause does not prohibit either party from employing or engaging any person, and no person’s freedom to work is restricted by it.** Where a party does employ or engage such an individual within the period in D5.1, it shall pay the other **20% of that individual’s first-year gross remuneration, subject to a minimum of EUR 10,000**, as compensation for the recruitment and training cost the other party has incurred.',
    },
    {
      k: 'c',
      id: 'D5-3',
      t: 'D5.1 does not apply where the individual responded to a public advertisement not directed at the other party’s personnel, or was approached by a recruitment agency without the party’s specific direction to target the other party.',
    },

    { k: 'h', level: 3, id: 'D6', t: 'D6. Limitation of liability' },
    {
      k: 'c',
      id: 'D6-1',
      t: '**Nothing in the Agreement excludes or limits either party’s liability for:**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) death or personal injury caused by negligence;',
            '(b) fraud or fraudulent misrepresentation;',
            '(c) intentional non-performance and, to the extent applicable law so requires, gross negligence;',
            '(d) any liability that cannot lawfully be excluded or limited, including under the Civil Code of the Republic of Moldova;',
            '(e) payment of sums properly due under the Agreement;',
            '(f) in the Client’s case, breach of clause [D3.4](#D3-4) (Candidate Information), clause [B14](#B14) (non-circumvention), clause [C2.2](#C2-2), clause [C3.2](#C3-2), or any indemnity given by the Client; or',
            '(g) breach of an obligation the fulfilment of which is essential to the proper performance of the Agreement and on the observance of which the other party may reasonably rely (a **cardinal obligation**), in which case liability is limited to the loss typically foreseeable at the date of the Agreement.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'D6-2',
      t: 'Subject to D6.1, neither party is liable for any: loss of profit; loss of revenue; loss of business or business opportunity; loss of anticipated savings; loss of goodwill or reputation; loss of, or corruption of, data; wasted management or staff time; or any indirect or consequential loss, in each case however arising and whether or not foreseeable.',
    },
    {
      k: 'c',
      id: 'D6-3',
      t: '**The cap.** Subject to [D6.1](#D6-1) and [D6.4](#D6-4), our total aggregate liability for all claims arising in any period of 12 consecutive months is **the greater of (a) 150% of the sums paid and payable by the Client to us in that period and (b) EUR 250,000. This is a single cap and no other cap applies.**',
    },
    {
      k: 'c',
      id: 'D6-4',
      t: '**Super-cap and uncapped heads.** The following are not subject to D6.3:',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) **uncapped** — our indemnities under [C16.3](#C16-3) (licensing and worker status) and [C12.8](#C12-8) (title in the Work Product);',
            '(b) **capped in aggregate at the greater of EUR 2,000,000 and the limits of the insurance required by [C17.1](#C17-1)** — our indemnity under [D7.1](#D7-1) (IP infringement), our liability for breach of clause [D3](#D3), and our liability for breach of Applicable Data Protection Law, including any administrative fine imposed on the Client to the extent attributable to our breach.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'D6-5',
      t: 'We shall maintain the insurance in [C17.1](#C17-1) throughout the term and for **3 years** afterwards, shall note the Client’s interest on request, and shall not settle any claim in a manner that reduces the cover available to the Client.',
    },
    {
      k: 'c',
      id: 'D6-6',
      t: '**Time bar.** Neither party may bring a claim under or in connection with the Agreement more than **24 months** after the date on which the claiming party became, or ought reasonably to have become, aware of the facts giving rise to the claim. **This clause does not apply to a claim for payment of sums due, to any liability within [D6.1](#D6-1) or [D6.4](#D6-4), or to any claim relating to title in the Work Product.**',
    },
    { k: 'c', id: 'D6-7', t: 'Each party shall take reasonable steps to mitigate its loss.' },

    { k: 'h', level: 3, id: 'D7', t: 'D7. Indemnities' },
    {
      k: 'c',
      id: 'D7-1',
      t: '**Our indemnity.** Subject to clause [D6](#D6) and to D7.3, we shall indemnify the Client against any claim by a third party that the Work Product supplied under Part C infringes that third party’s intellectual property rights, and against loss arising from our breach of clause [D3](#D3).',
    },
    {
      k: 'c',
      id: 'D7-2',
      t: '**The Client’s indemnities.** The Client shall indemnify us against all losses, liabilities, penalties, awards and costs (including reasonable legal costs) arising from: the Client’s breach of clause [D3.4](#D3-4) or clause [B14](#B14); onward disclosure of Candidate or Engineer information; any claim by a Candidate, Engineer or third party arising from the Client’s own selection, offer, hiring, management or termination decisions, including any discrimination or unlawful-treatment claim; the Client’s failure to carry out any check for which it is responsible under clause [B15.2](#B15-2); the Client’s breach of clause [C2.2](#C2-2) or [C3.2](#C3-2); and clauses [C15.2](#C15-2) and [C15.3](#C15-3).',
    },
    {
      k: 'c',
      id: 'D7-3',
      t: '**Conditions.** An indemnity applies only where the indemnified party: notifies the indemnifying party promptly in writing of the claim; makes no admission of liability, settlement or compromise without the indemnifying party’s prior written consent; gives the indemnifying party sole conduct of the defence and settlement; and provides reasonable assistance at the indemnifying party’s cost.',
    },
    {
      k: 'c',
      id: 'D7-4',
      t: 'Our indemnity in D7.1 does not apply to any infringement arising from: materials, specifications, designs or instructions supplied by the Client; third-party or open-source components approved by the Client in writing after disclosure of their licence under [C12.6](#C12-6); modification of the Work Product by anyone other than an Engineer; or combination of the Work Product with anything not supplied by us. Where a claim arises within D7.1, we may at our option procure the right to continue using the Work Product, modify it so it is non-infringing, or replace it, and the Client shall accept any of those remedies.',
    },

    { k: 'h', level: 3, id: 'D8', t: 'D8. Insurance' },
    { k: 'c', id: 'D8-1', t: 'Clauses [C17](#C17) and [D6.5](#D6-5) apply to the Agreement as a whole.' },

    { k: 'h', level: 3, id: 'D9', t: 'D9. Force majeure and business continuity' },
    {
      k: 'c',
      id: 'D9-1',
      t: 'Neither party is liable for failure or delay in performing its obligations (other than an obligation to pay) caused by an event beyond its reasonable control, including: act of God; fire; flood; epidemic or pandemic and any government response to it; **armed conflict, invasion, civil unrest and regional instability**; act of terrorism; embargo or sanctions; nationwide or regional interruption to electricity supply, telecommunications or internet infrastructure; and general strike or industrial action not confined to that party’s own workforce.',
    },
    {
      k: 'c',
      id: 'D9-2',
      t: 'The affected party shall notify the other promptly, shall use reasonable endeavours to mitigate, and shall resume performance as soon as practicable.',
    },
    {
      k: 'c',
      id: 'D9-3',
      t: '**Continuity commitments — because our Engineers are located in the Republic of Moldova, we commit to the following rather than relying on the clause above:**',
      children: [
        {
          k: 'ol',
          lit: true,
          items: [
            '(a) we maintain redundant power and connectivity arrangements for Engineers, including backup power and a secondary internet connection or mobile data capability;',
            '(b) we may, without the Client’s consent, relocate an Engineer to another location or country in order to maintain continuity, subject to clause [C3.2](#C3-2) where the relocation is to the Client’s country and to clause [C16.1](#C16-1) in every case;',
            '(c) where a force majeure event prevents an Engineer from performing Services for **10 consecutive business days**, we shall offer a substitute Engineer of equivalent seniority at the same rate; and',
            '(d) if we cannot offer a substitute within a further 10 business days, the Client may terminate the affected Assignment immediately, without notice charge and without liability, and Charges cease to accrue from the first day of the interruption.',
          ],
        },
      ],
    },
    {
      k: 'c',
      id: 'D9-4',
      t: 'If a force majeure event continues for more than **60 consecutive days**, either party may terminate the Agreement on written notice, without liability other than for accrued sums.',
    },

    { k: 'h', level: 3, id: 'D10', t: 'D10. Anti-bribery, sanctions and export control' },
    {
      k: 'c',
      id: 'D10-1',
      t: 'Each party shall comply with all applicable anti-bribery, anti-corruption, anti-money-laundering, sanctions and export-control laws.',
    },
    {
      k: 'c',
      id: 'D10-2',
      t: 'We screen each Engineer, and our own supply chain, against the consolidated sanctions lists maintained by the European Union, the United Kingdom and the United States, and we do not engage any person subject to EU restrictive measures. We repeat that screening at least annually and on any change of Assignment.',
    },
    {
      k: 'c',
      id: 'D10-3',
      t: 'Each party warrants that neither it, nor any of its directors, officers or beneficial owners, is subject to sanctions, and shall notify the other immediately if that ceases to be true.',
    },
    {
      k: 'c',
      id: 'D10-4',
      t: 'Either party may terminate the Agreement immediately on written notice where the other breaches this clause.',
    },

    { k: 'h', level: 3, id: 'D11', t: 'D11. Notices' },
    {
      k: 'c',
      id: 'D11-1',
      t: 'A notice under the Agreement must be in writing and must be sent: **to us**, by email to [legal@talentsync.eu](mailto:legal@talentsync.eu) with a copy to [victor@talentsync.eu](mailto:victor@talentsync.eu), and by post to our registered office; **to the Client**, by email to the address stated in the Fee Confirmation or Assignment Schedule or, failing that, to the address from which the Client last corresponded with us on the matter, and by post to the Client’s registered office.',
    },
    {
      k: 'c',
      id: 'D11-2',
      t: '**Email is valid service.** A notice sent by email is deemed received at the time of transmission, or, if transmitted after 17:00 on a business day or on a non-business day, at 09:00 on the next business day, in each case in the recipient’s local time, provided no automated delivery-failure message is received. A notice sent by post is deemed received on the fifth business day after posting.',
    },
    { k: 'c', id: 'D11-3', t: 'Each party shall keep its notice address current and shall notify the other of any change.' },
    { k: 'c', id: 'D11-4', t: 'This clause does not apply to the service of proceedings.' },

    { k: 'h', level: 3, id: 'D12', t: 'D12. Entire agreement and non-reliance' },
    {
      k: 'c',
      id: 'D12-1',
      t: 'The Agreement constitutes the entire agreement between the parties in relation to its subject matter and supersedes all prior agreements, negotiations, proposals, pitch materials and understandings between them.',
    },
    {
      k: 'c',
      id: 'D12-2',
      t: 'Each party acknowledges that in entering into the Agreement it has not relied on, and shall have no remedy in respect of, any statement, representation, assurance or warranty (whether made innocently or negligently) that is not expressly set out in the Agreement, **including any content of the website talentsync.eu, any case study, any figure or metric, any proposal, presentation or pitch document, and any statement made in a meeting or in correspondence.**',
    },
    { k: 'c', id: 'D12-3', t: '**Nothing in D12 limits or excludes any liability for fraud or fraudulent misrepresentation.**' },

    { k: 'h', level: 3, id: 'D13', t: 'D13. Third-party terms rejected' },
    {
      k: 'c',
      id: 'D13-1',
      t: 'Clause [B1.3](#B1-3) applies to the Agreement as a whole. Neither the acceptance of a purchase-order number, the completion of a supplier-onboarding form, registration on a vendor portal, nor any act of performance by us constitutes acceptance of any terms put forward by the Client.',
    },

    { k: 'h', level: 3, id: 'D14', t: 'D14. Variation' },
    {
      k: 'c',
      id: 'D14-1',
      t: 'No variation of the Agreement is effective unless in writing and signed by, or confirmed by email from, an authorised representative of each party. A variation agreed in respect of one Assignment or one Introduction does not vary the Agreement generally.',
    },
    {
      k: 'c',
      id: 'D14-2',
      t: 'Any conduct, course of dealing, forbearance or indulgence, including any failure to charge interest or to enforce a term, does not vary the Agreement and does not constitute a waiver.',
    },
    {
      k: 'c',
      id: 'D14-3',
      t: 'Nothing in D14.1 permits variation of clause [C12](#C12) (intellectual property) otherwise than by a document signed by both parties, where the law applicable to the assignment requires signature.',
    },

    { k: 'h', level: 3, id: 'D15', t: 'D15. Assignment and novation' },
    {
      k: 'c',
      id: 'D15-1',
      t: 'The Client may not assign, novate, transfer, charge or deal in any way with the Agreement or any right under it without our prior written consent, which shall not be unreasonably withheld in the case of an assignment to a successor to all or substantially all of the Client’s business.',
    },
    {
      k: 'c',
      id: 'D15-2',
      t: 'We may assign, novate or transfer the Agreement, in whole or in part, to any member of our group or to any person acquiring all or substantially all of our business or assets, on written notice to the Client.',
    },

    { k: 'h', level: 3, id: 'D16', t: 'D16. Subcontracting' },
    {
      k: 'c',
      id: 'D16-1',
      t: 'We may subcontract the performance of any obligation, including to the personal service company of an Engineer, and we remain fully liable for the acts and omissions of any subcontractor as if they were our own. Subcontracting does not affect clause [C16.1](#C16-1): every authorisation required for the supply remains ours to hold.',
    },

    { k: 'h', level: 3, id: 'D17', t: 'D17. No partnership or agency' },
    {
      k: 'c',
      id: 'D17-1',
      t: 'Nothing in the Agreement creates a partnership, joint venture, agency, franchise or employment relationship between the parties. Neither party may bind the other.',
    },

    { k: 'h', level: 3, id: 'D18', t: 'D18. Third-party rights' },
    {
      k: 'c',
      id: 'D18-1',
      t: 'Save for a Client Group company benefiting from an Assignment, and save for any indemnified person under clause [D7](#D7), a person who is not a party to the Agreement has no right to enforce any of its terms. The consent of a third party is not required to vary or terminate the Agreement.',
    },

    { k: 'h', level: 3, id: 'D19', t: 'D19. Severability and reduction' },
    {
      k: 'c',
      id: 'D19-1',
      t: 'If any provision of the Agreement is or becomes invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable, and the rest of the Agreement is unaffected.',
    },
    {
      k: 'c',
      id: 'D19-2',
      t: '**Where a provision is held invalid or unenforceable by reason only of the length of a period, the size of an amount or percentage, or the breadth of a scope or geographical area, that provision applies with the shortest period, the smallest amount and the narrowest scope that would make it valid and enforceable, and only if that is not possible is it deemed deleted.** This applies in particular to the Validity Period in clause [B5](#B5), the Transfer Fee in clause [C11](#C11), the personnel fee in clause [D5](#D5), the confidentiality period in clause [D3.6](#D3-6) and the time bar in clause [D6.6](#D6-6).',
    },

    { k: 'h', level: 3, id: 'D20', t: 'D20. Survival' },
    {
      k: 'c',
      id: 'D20-1',
      t: 'The following survive termination or expiry, however arising: B4 to B11 and B14 (fee entitlement and payment), B16.4 (disclaimers), B17.2 and B17.3, B18 (data protection), C8, C10.7, C10.8, C11, C12, C13, C14, C15.2, C15.3, C16.3, C17, C18 and C19, and Part D clauses D3, D4, D6, D7, D11, D12, D18, D19, D20, D22 and D23, together with any other clause that by its nature is intended to survive.',
    },

    { k: 'h', level: 3, id: 'D21', t: 'D21. Counterparts and electronic signature' },
    {
      k: 'c',
      id: 'D21-1',
      t: 'The Agreement, and any Fee Confirmation, Assignment Schedule or Onsite Addendum, may be executed in counterparts, each of which is an original and all of which together constitute one instrument.',
    },
    {
      k: 'c',
      id: 'D21-2',
      t: 'The parties agree that an electronic signature, an electronic signature platform, or written confirmation by email from an authorised representative, is valid, binding and admissible, and neither party shall dispute the validity of the Agreement on the ground that it was signed electronically. This is subject to [D14.3](#D14-3).',
    },

    { k: 'h', level: 3, id: 'D22', t: 'D22. Language' },
    {
      k: 'c',
      id: 'D22-1',
      t: 'The Agreement is drafted in English. Any translation is provided for convenience only, and the **English text prevails** in the event of any inconsistency. All notices and communications shall be in English.',
    },

    { k: 'h', level: 3, id: 'D23', t: 'D23. Dispute resolution, governing law and jurisdiction' },
    {
      k: 'c',
      id: 'D23-1',
      t: '**Escalation.** Before commencing proceedings, a party shall notify the other in writing of the dispute, and the parties’ senior representatives shall meet, in person or by video conference, within **15 business days** and attempt in good faith to resolve it. This clause does not prevent either party from commencing proceedings where the limitation period would otherwise expire, from applying for interim or protective relief, or from claiming an undisputed debt.',
    },
    {
      k: 'c',
      id: 'D23-2',
      t: '**Governing law.** The Agreement, and any non-contractual obligation arising out of or in connection with it, is governed by the **law of the Republic of Moldova**, excluding its conflict-of-laws rules and excluding the United Nations Convention on Contracts for the International Sale of Goods.',
    },
    {
      k: 'c',
      id: 'D23-3',
      t: '**Jurisdiction — exclusive, and reciprocal.** The **courts of Chișinău, Republic of Moldova** have **exclusive** jurisdiction to settle any dispute arising out of or in connection with the Agreement, including any dispute as to its existence, validity or termination. **This clause is an exclusive choice of court agreement for the purposes of the Convention of 30 June 2005 on Choice of Court Agreements**, to which the Republic of Moldova has been a Contracting State since 1 July 2024 and to which the European Union is a party. The clause binds both parties equally. **Subject to D23.1 and D23.5, neither party may commence proceedings in any other court.**',
    },
    {
      k: 'c',
      id: 'D23-4',
      t: 'The parties have chosen an exclusive Moldovan forum deliberately, so that a judgment obtained in Chișinău is recognised and enforced in the European Union, and a judgment obtained in an EU Member State against TalentSync is recognised in Moldova, in each case under the Hague Convention. A non-exclusive clause would not achieve that.',
    },
    {
      k: 'c',
      id: 'D23-5',
      t: '**Interim relief.** Nothing in D23.3 prevents either party from applying to any court of competent jurisdiction for interim, protective or injunctive relief, including to restrain a breach of clause [D3](#D3).',
    },
    {
      k: 'c',
      id: 'D23-6',
      t: '**Overriding mandatory provisions.** The parties acknowledge that the choice of Moldovan law does not disapply any overriding mandatory provision of the law of the country in which an Engineer or Candidate performs services or is engaged, including any labour-supply, agency-work, licensing, posting-of-workers, immigration, employment-status or equal-treatment rule. Clauses [C3](#C3), [C15](#C15) and [C16](#C16) are drafted on that basis.',
    },
    {
      k: 'c',
      id: 'D23-7',
      t: '**Consumers.** This clause D23 does not apply to any individual acting outside their trade, business or profession. See clause [E11](#E11).',
    },
    { k: 'hr' },

    /* ============================================================== PART E */
    { k: 'h', level: 2, id: 'part-e', t: 'Part E — Candidate Terms' },
    {
      k: 'note',
      t: 'Plain English (non-binding summary — the clauses below are what actually applies)',
      body: [
        'You never pay us anything, ever, for anything. Tell us the truth about your experience — clients withdraw offers over inaccurate CVs and we cannot protect you from that. We will not send your details to any company without asking you first and naming the company. We cannot promise you a job, an interview or a timeline. You are not tied to us: work with other agencies, apply directly, take any job you like. You can tell us to delete your data at any time and we will. Nothing here limits your legal rights, and if there is ever a dispute you can use your own country’s courts and your own country’s law.',
      ],
    },

    { k: 'h', level: 3, id: 'E1', t: 'E1. Who this Part applies to' },
    {
      k: 'c',
      id: 'E1-1',
      t: 'Part E applies to any individual who sends us a CV, application, profile or enquiry, who responds to an approach from us, or whom we represent to a client. Parts B, C and D do not apply to you.',
    },
    {
      k: 'c',
      id: 'E1-2',
      t: 'Part E is a statement of how we work with you and of the commitments we make to you. It imposes no financial obligation on you of any kind.',
    },

    { k: 'h', level: 3, id: 'E2', t: 'E2. We never charge candidates — for anything' },
    {
      k: 'c',
      id: 'E2-1',
      t: '**We do not charge you any fee, at any time, for any reason.** Not for registration, not for introduction, not for placement, not for CV review, not for interview preparation, not for “priority” consideration, not for visa or relocation assistance, and not as a deduction from your pay.',
    },
    { k: 'c', id: 'E2-2', t: 'We are paid by the client company, and only by the client company.' },
    {
      k: 'c',
      id: 'E2-3',
      t: 'If anyone claiming to represent TalentSync asks you for money, it is fraud. Do not pay. Report it to [victor@talentsync.eu](mailto:victor@talentsync.eu) immediately.',
    },

    { k: 'h', level: 3, id: 'E3', t: 'E3. Accuracy of the information you give us' },
    {
      k: 'c',
      id: 'E3-1',
      t: 'Please make sure the information you give us — your employment history, dates, job titles, responsibilities, technologies, qualifications, certifications, language ability, notice period, salary expectation, location and right to work — is accurate and complete.',
    },
    {
      k: 'c',
      id: 'E3-2',
      t: 'We verify employment history and identity before presenting you to a client, and we tell the client what we verified and what we could not. Inaccuracies discovered later commonly result in an offer being withdrawn or an engagement being terminated, and we cannot prevent that.',
    },
    {
      k: 'c',
      id: 'E3-3',
      t: 'Tell us promptly if anything changes, and tell us before we present you if you are subject to any restrictive covenant, notice obligation or other restriction that could affect your ability to take a role.',
    },

    { k: 'h', level: 3, id: 'E4', t: 'E4. Sending your details to a client' },
    {
      k: 'c',
      id: 'E4-1',
      t: '**We will not send your CV, name, profile or contact details to any company without first telling you which company it is and obtaining your agreement.** Agreement by email or messaging is sufficient, and you can withdraw it at any time before an introduction is made.',
    },
    {
      k: 'c',
      id: 'E4-2',
      t: 'We may hold your details in our talent pool and contact you about future roles. You can ask us to stop at any time, and we will — see [E7](#E7) and our [candidate privacy notice](/candidate-privacy/).',
    },
    {
      k: 'c',
      id: 'E4-3',
      t: 'We tell clients that your CV and identity are our confidential information and that they may not pass them on. If you believe a client has passed your details on without your agreement, tell us and we will act on it.',
    },

    { k: 'h', level: 3, id: 'E5', t: 'E5. What we do not promise' },
    {
      k: 'c',
      id: 'E5-1',
      t: 'We cannot promise you a job, an interview, feedback from a client, a timeline, a salary level, or that any role described to you will remain open. Hiring decisions belong to the client alone.',
    },
    {
      k: 'c',
      id: 'E5-2',
      t: 'Descriptions of roles, rates and companies are based on information given to us by the client. We pass it on in good faith but we do not warrant its accuracy, and you should satisfy yourself about the role and the employer before accepting anything.',
    },
    {
      k: 'c',
      id: 'E5-3',
      t: 'We are not your employer unless we have signed a written contract with you saying so, and we are not your agent or your legal, tax or immigration adviser.',
    },

    { k: 'h', level: 3, id: 'E6', t: 'E6. You are not tied to us' },
    {
      k: 'c',
      id: 'E6-1',
      t: 'You are free at all times to work with other recruitment agencies, to apply to companies directly, to accept any role from any source, and to decline anything we put to you.',
    },
    {
      k: 'c',
      id: 'E6-2',
      t: '**We impose no exclusivity, no non-compete, no non-solicitation and no transfer obligation on you.** Nothing in our arrangements with any client restricts your freedom to accept employment or engagement with that client or with anyone else, and any provision that had that effect would be void.',
    },
    {
      k: 'c',
      id: 'E6-3',
      t: 'Where a client engages you directly, any fee arising is a matter between us and the client. It is never charged to you, never deducted from your pay, and never a reason for us to discourage you from taking a role.',
    },

    { k: 'h', level: 3, id: 'E7', t: 'E7. Your personal data' },
    {
      k: 'c',
      id: 'E7-1',
      t: 'We are an independent controller of your personal data. What we collect, why, how long we keep it, who we share it with, and how to exercise your rights are set out in our **[candidate privacy notice](/candidate-privacy/)** and, in more detail, in our [privacy policy](/privacy/#s6).',
    },
    {
      k: 'c',
      id: 'E7-2',
      t: 'In summary: our lawful basis for sourcing and contacting you is our legitimate interest in matching engineers to roles; we keep candidate data for **24 months** from our last meaningful contact with you and then delete it or ask you whether to keep it; you can ask us at any time for a copy of your data, to correct it, or to delete it; and **you can object to our processing at any time, without giving a reason — we stop the same day**.',
    },
    {
      k: 'c',
      id: 'E7-3',
      t: '**We do not collect criminal-record data about you.** If a client requires a background or criminal-record check, the client carries it out under its own national law, and it is for you to decide whether to consent to that check.',
    },
    {
      k: 'c',
      id: 'E7-4',
      t: '**We do not use automated decision-making or AI ranking to shortlist, score or reject candidates.** AI tools may be used to draft or format text. Every shortlist decision is made by a person. Where we use any automated tool, we will tell you, and a person will always make the decision.',
    },
    {
      k: 'c',
      id: 'E7-5',
      t: 'In some countries we are prohibited from asking you what you currently earn, and we will not ask. We will ask what you are looking for.',
    },

    { k: 'h', level: 3, id: 'E8', t: 'E8. Right to work and checks' },
    {
      k: 'c',
      id: 'E8-1',
      t: 'It is the client’s responsibility, not ours, to establish your right to work in the country of engagement and to obtain any permit. We will tell you what we know about the client’s requirements, but we do not determine immigration outcomes and we do not give immigration advice.',
    },
    {
      k: 'c',
      id: 'E8-2',
      t: 'We will tell you, before you agree to be introduced, what checks the client has said it will carry out.',
    },

    { k: 'h', level: 3, id: 'E9', t: 'E9. Our conduct' },
    {
      k: 'c',
      id: 'E9-1',
      t: 'We will treat you fairly, will not discriminate, will give you the role information we have, will pass on client feedback where the client provides it, and will tell you promptly when a process ends.',
    },
    {
      k: 'c',
      id: 'E9-2',
      t: 'If something goes wrong, email [victor@talentsync.eu](mailto:victor@talentsync.eu) with the word “Complaint” in the subject line. We will acknowledge within 2 business days and respond substantively within 15 business days.',
    },

    { k: 'h', level: 3, id: 'E10', t: 'E10. Changes to Part E' },
    {
      k: 'c',
      id: 'E10-1',
      t: 'We may update Part E. The version in force at the time of your interaction with us is the one that applies to that interaction.',
    },

    { k: 'h', level: 3, id: 'E11', t: 'E11. Your legal position' },
    {
      k: 'c',
      id: 'E11-1',
      t: 'Nothing in Part E excludes or limits any right you have under law, and nothing in it excludes or limits our liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be excluded.',
    },
    {
      k: 'c',
      id: 'E11-2',
      t: '**Part E contains no jurisdiction clause and no choice of law that operates against you.** If you are acting outside your trade, business or profession, you are entitled to the protection of the mandatory law of the country in which you habitually reside, you may bring proceedings against us in the courts of that country, and we will bring proceedings against you only in the courts of that country.',
    },
    {
      k: 'c',
      id: 'E11-3',
      t: 'You may also complain to the data protection authority in your country, or to the National Centre for Personal Data Protection of the Republic of Moldova, 48 Serghei Lazo Street, MD-2004 Chișinău, [centru@datepersonale.md](mailto:centru@datepersonale.md).',
    },
    { k: 'hr' },

    /* ---------------------------------------------------- document control */
    { k: 'h', level: 2, id: 'document-control', t: 'Document control' },
    {
      k: 'table',
      head: ['', ''],
      rows: [
        ['Document', 'TalentSync Terms and Conditions, Parts A–E'],
        ['Version', '1.0'],
        ['Effective from', '30 August 2026'],
        ['Published at', 'https://talentsync.eu/terms/'],
        [
          'Related documents',
          '[Privacy policy](/privacy/) · [Candidate privacy notice](/candidate-privacy/) · [Cookie policy](/cookies/) · [Legal notice](/imprint/) · Data Processing Agreement (Schedule 3) · Fee Confirmation template · Assignment Schedule template · Onsite Addendum template · Security schedule (clause C13.5)',
        ],
        ['Governing law', 'Republic of Moldova'],
        [
          'Jurisdiction',
          'Chișinău, exclusive (Hague Choice of Court Convention 2005) — except consumers',
        ],
        ['Contact for legal notices', '[legal@talentsync.eu](mailto:legal@talentsync.eu)'],
      ],
    },
    {
      k: 'p',
      t: 'This page does not by itself bind a client. Parts B, C and D are attached to every quotation and every follow-up to a scheduled meeting, and take effect as set out in [B1.2](#B1-2) and [C1.3](#C1-3).',
    },
  ],
}
