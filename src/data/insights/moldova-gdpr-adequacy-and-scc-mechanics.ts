import type { Insight } from './types'

/**
 * Sourced from the jurisdiction work in docs/plans/spec/14-jurisdiction-research.md,
 * which verified each of these against primary texts, with the dates it did so.
 * Every date in the article is the date the underlying source was checked, and
 * the piece says so — an adequacy article without a check date is worthless six
 * months later.
 *
 * The two positions the research flagged as unresolved (the Art 3(2) SCC set and
 * the UK data-bridge status) are published as unresolved rather than smoothed
 * over. That is the difference between a field note and content marketing.
 */
export const moldovaGdpr: Insight = {
  slug: 'moldova-gdpr-adequacy-and-scc-mechanics',
  path: '/insights/moldova-gdpr-adequacy-and-scc-mechanics/',
  label: 'Adequacy and SCCs',
  title: 'Moldova, GDPR adequacy and the SCC mechanics that actually apply',
  metaTitle: 'Moldova, GDPR Adequacy and the SCCs',
  metaDescription:
    'Moldova has no EU adequacy decision. Which flows are really restricted transfers, which SCC module applies, and what a transfer impact assessment must cover.',
  dek: 'No adequacy decision, a near-verbatim GDPR transposition, and the transfer most buyers never paper.',
  answer:
    'There is no European Commission adequacy decision for Moldova, checked on 30 August 2026. Transfers into Moldova therefore run on Article 46 safeguards: the 2021 Standard Contractual Clauses plus a transfer impact assessment. Half the flows people paper are not transfers at all, and the one that matters usually goes unpapered.',
  datePublished: '2026-08-31',
  dateModified: '2026-08-31',
  tags: ['GDPR', 'Moldova', 'Compliance'],
  group: 'contracts',
  about: ['General Data Protection Regulation', 'Standard Contractual Clauses', 'Data protection in Moldova'],
  body: [
    {
      k: 'p',
      t: 'Procurement asks the question in one line — *"is Moldova adequate?"* — and the honest answer is no, followed by three paragraphs nobody sends. The three paragraphs matter, because the follow-up work is much smaller than "not adequate" sounds, and because the flow that carries the real risk is usually not the one being papered. This is our own compliance position, published so a client’s DPO can check it rather than take our word for it.',
    },

    { k: 'h', level: 2, id: 'status', t: 'The status, in three facts' },
    {
      k: 'ol',
      items: [
        '**There is no adequacy decision for Moldova.** Checked against the European Commission’s own [adequacy decisions page](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en) on **30 August 2026**. Moldova is absent from the list and no talks are announced on that page. Anyone telling you adequacy is imminent is speculating.',
        '**Moldovan law is now a near-verbatim GDPR transposition.** Law No. 195 of 25 July 2024 on personal data protection entered into force on **23 August 2026**, repealing the 2011 law. Territorial scope, principles, lawful bases, data-subject rights and accountability read across almost word for word, which means one policy satisfies both. The supervisory authority is the National Centre for Personal Data Protection (CNPDCP) in Chișinău.',
        '**Moldova ratified Convention 108+ on 15 May 2026**, as the 34th state. The modernised convention needs 38 ratifications and is not yet in force. This is evidence for a future adequacy case and a useful input to a transfer risk assessment. It is not a transfer mechanism.',
      ],
    },
    {
      k: 'p',
      t: 'So: Article 46 safeguards, which in practice means the 2021 Standard Contractual Clauses plus a documented transfer impact assessment. That is the whole answer to the procurement question. The rest of this article is about applying it to flows that actually exist rather than to flows on a questionnaire.',
    },

    { k: 'h', level: 2, id: 'which-flows', t: 'Which flows are actually restricted transfers' },
    {
      k: 'p',
      t: 'Under the EDPB’s [Guidelines 05/2021](https://edpb.europa.eu/system/files/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf) (v2.0, adopted 14 February 2023) a transfer requires three **cumulative** criteria: an exporter subject to the GDPR, a disclosure by that exporter to another controller or processor, and an importer in a third country — the last one applying *irrespective of whether the importer is itself subject to the GDPR*. Apply that to a recruitment engagement and the map is less alarming than the questionnaire implies.',
    },
    {
      k: 'table',
      caption: 'Recruitment and engineering flows, mapped',
      head: ['Flow', 'Restricted transfer?', 'Who is the exporter', 'Instrument'],
      rows: [
        [
          'A candidate in the EU emails their own CV to us, or books a call',
          '**No**',
          'None — the data subject discloses directly, so criterion two fails',
          'Nothing needed. Our processing is still subject to the GDPR via Art 3(2)',
        ],
        [
          'An EU client sends us a job spec naming employees, or interview feedback',
          '**Yes**',
          'The client',
          'SCCs (Decision 2021/914), signed inside the services agreement',
        ],
        [
          'We forward a candidate profile to an EU client',
          '**No**',
          '— (Moldova → EEA is outbound from a third country)',
          'Moldovan Law 195 Art 44(2) exempts transfers to the EEA outright',
        ],
        [
          'A client gives an engineer access to their systems',
          '**Yes**, continuously',
          '**The client**',
          'The client’s own Art 46 safeguard plus access controls — see below',
        ],
        [
          'Either side puts the data in a US SaaS tool',
          '**Yes**',
          'Whoever controls that tool',
          'Art 28 processing terms plus a Chapter V mechanism for the US leg',
        ],
      ],
    },
    {
      k: 'p',
      t: 'Two consequences worth internalising. A recruiter whose candidates come to them directly originates far fewer restricted transfers than a compliance questionnaire assumes. And when a transfer does exist in the client-to-supplier direction, **the client is the exporter** and the client’s obligation is to originate the clauses. A supplier should sign them without argument; a supplier who insists the paperwork is entirely the client’s problem has misread who bears the Chapter V duty, and so has a client who insists the reverse.',
    },

    { k: 'h', level: 2, id: 'system-access', t: 'The transfer everyone forgets' },
    {
      k: 'p',
      t: 'The CV flow is what gets papered. The flow that carries real volumes of personal data is the one that starts on the engineer’s first day: access to your issue tracker, your CRM, your logs, your support inbox, your staging database restored from a production dump last Tuesday. Every one of those is your personal data, made available continuously to a recipient in a third country, with you as exporter. No recruiter’s clauses cover it, because the recruiter is not party to it.',
    },
    {
      k: 'p',
      t: 'The fix is ordinary engineering hygiene, which is why it is worth doing regardless of the legal framing:',
    },
    {
      k: 'ul',
      items: [
        'Scoped, revocable, named accounts — never a shared login, never a standing production credential.',
        'No production personal data in development or staging. Synthetic or pseudonymised fixtures, seeded automatically, so the lazy path is also the compliant one.',
        'Access through your own environment where the work allows it, so the data stays where it started.',
        'Logging that shows who saw what, and an offboarding checklist that actually runs on the last day.',
        'The engagement paperwork saying which categories of data the engineer may touch, and that the client remains controller of all of it.',
      ],
    },
    {
      k: 'p',
      t: 'A DPO who asks about this flow first is a DPO who has done this before. It is the question we would ask a supplier, and it is the one that most cleanly separates a considered position from a downloaded template.',
    },

    { k: 'h', level: 2, id: 'module', t: 'Which SCC module, and why the wrong one is worse than none' },
    {
      k: 'p',
      t: 'The 2021 clauses come in four modules. For recruitment the choice is between Module One, controller to controller, and Module Two, controller to processor, and it is decided by a factual question: does the supplier decide anything about the data, or only carry out instructions?',
    },
    {
      k: 'p',
      t: 'A recruitment firm that sources candidates, decides who to approach, keeps its own talent records and answers data-subject requests in its own name is an **independent controller**. That makes Module One correct. Module Two is right where the supplier genuinely processes only on documented instructions — an outsourced screening mandate, for instance — and it comes with an Article 28 processing agreement attached.',
    },
    {
      k: 'note',
      t: 'Signing the wrong module is not a neutral act',
      body: [
        'Recruiters routinely sign Module Two by reflex, because the client’s procurement pack contains a processor DPA and pushing back costs a week. Signing processor terms while behaving as a controller contradicts your own privacy notice, and hands a regulator a documented inconsistency between what you promised and what you do. Two minutes of argument at contract stage is cheaper than that.',
      ],
    },

    { k: 'h', level: 2, id: 'art-3-2-gap', t: 'The Article 3(2) gap, stated honestly' },
    {
      k: 'p',
      t: 'Here is a genuine unresolved point that most suppliers will not raise with you. The 2021 SCCs are drafted for importers **not** subject to the GDPR. A Moldovan recruiter serving EU clients and sourcing EU candidates *is* subject to it, under Article 3(2). The Commission has said since 2024 that it is developing an additional set of clauses for importers caught by Article 3(2); as at 30 August 2026 its [own SCC page](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en) still lists only the June 2021 set as adopted, with no completion date.',
    },
    {
      k: 'p',
      t: 'What to do in the gap: sign the 2021 clauses anyway. They are the only adopted instrument, every procurement process will require them, and the EDPB’s position is that a Chapter V tool is needed regardless. Then record the mismatch in your Article 30 record so it reads as a considered position rather than an oversight, and re-paper if and when the new set lands. A supplier who can describe this gap to you unprompted has read the source; a supplier who says "we are fully SCC compliant" has read a template.',
    },

    { k: 'h', level: 2, id: 'tia', t: 'What the transfer impact assessment has to cover' },
    {
      k: 'p',
      t: 'The assessment is short for this destination and you can reuse it across suppliers. Six things, following the EDPB’s post-*Schrems II* recommendations:',
    },
    {
      k: 'ol',
      items: [
        '**The transfer, described.** Categories of data, categories of subjects, purposes, frequency, and the actual systems involved — not "HR data".',
        '**The instrument.** Which module, signed by whom, when, and where the executed copy lives.',
        '**The destination’s law.** For Moldova: Law No. 195/2024 in force since 23 August 2026, a near-verbatim GDPR transposition; an independent supervisory authority with investigative and corrective powers; Convention 108 party since 2008 and Convention 108+ ratified in 2026; judicial remedies available to data subjects. That is a materially stronger position than the third countries this exercise was designed for.',
        '**Access by public authorities.** Assess the destination’s surveillance and disclosure law against the transfer in question, and say what you found. If your supplier has never received a government access request, record that too — it is a fact, with a date.',
        '**Supplementary measures.** Encryption in transit and at rest, pseudonymisation, access scoping, retention limits, and a contractual commitment to notify and challenge unlawful access requests where the law permits.',
        '**A review date.** Adequacy positions change; Moldova is in EU accession negotiations and has the standard adequacy fact pattern. Diarise it rather than rewriting the assessment in a panic when it does change.',
      ],
    },
    {
      k: 'p',
      t: 'One more item belongs in the vendor file rather than the assessment: whether your Moldovan supplier has appointed an **Article 27 EU representative**. A recruiter processing EU candidate data regularly cannot use the "occasional processing" exemption, and the Dutch supervisory authority has fined a controller **EUR 525,000** for that omission alone. Ask us the same question, and here is the answer before you have to ask it: **TalentSync has not appointed one.** We are working out whether Article 27 applies to us, and the name and address will be published in [our privacy policy](/privacy/) the moment there is one to publish. Until then, write to [victor@talentsync.eu](mailto:victor@talentsync.eu) — and a data subject can always complain to their own supervisory authority instead.',
    },

    { k: 'h', level: 2, id: 'uk', t: 'If you are a UK client' },
    {
      k: 'p',
      t: 'The UK operates its own list. EU adequacy for the UK was renewed on 19 December 2025, which keeps your own EU flows clean, but it says nothing about a UK-to-Moldova transfer. We could not verify that Moldova appears on the UK’s data bridge list, so assume it does not: use the **IDTA**, or the UK Addendum to the EU SCCs, together with a transfer risk assessment on the same six headings above. If your legal team establishes otherwise, we would genuinely like to know.',
    },

    { k: 'h', level: 2, id: 'checklist', t: 'Six things to put in the vendor file' },
    {
      k: 'ol',
      items: [
        'Executed SCCs, correct module, dated, with the annexes actually filled in.',
        'The supplier’s privacy notice — does it describe them as controller or processor, and does that match the module you just signed?',
        'Their Article 27 EU representative, named and published — or, where none is appointed, their written position on it. Ours is in the section above.',
        'Their retention schedule for candidate data, with a mechanism behind it and not just a sentence.',
        'Their sub-processor list, and where each one hosts. A US-hosted applicant tracking system is a second transfer with its own analysis.',
        'Your own answer on system access: which accounts the engineer gets, what data those accounts reach, and who revokes them.',
      ],
    },

    { k: 'h', level: 2, id: 'sources', t: 'Sources and check dates' },
    {
      k: 'p',
      t: 'Everything above was verified against primary sources on **30 August 2026**. We are not lawyers and this is not legal advice; it is our own position, written down so it can be argued with. Where we could not verify something — the Article 3(2) clauses, the UK data bridge — the article says so instead of rounding it off.',
    },
    {
      k: 'ul',
      items: [
        '[European Commission — adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)',
        '[European Commission — standard contractual clauses](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en)',
        '[EDPB Guidelines 05/2021 on the interplay of Article 3 and Chapter V](https://edpb.europa.eu/system/files/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf)',
        '[Law No. 195/2024 on personal data protection, English text](https://datepersonale.md/wp-content/uploads/2024/09/Law-no.-195-2024-on-personal-data-protection-1.pdf) — published by the CNPDCP',
        '[National Centre for Personal Data Protection](https://datepersonale.md/en/) — the Moldovan supervisory authority',
      ],
    },
    {
      k: 'p',
      t: 'The contractual side of an engagement — what the clauses sit inside — is on the [direct B2B recruitment page](/b2b-engineer-recruitment/), and the same questions in the context of an ongoing assignment are on the [hourly collaboration page](/hourly-engineering-talent/). If your interest is the jurisdiction itself rather than the paperwork, [recruiting in Moldova](/technical-recruitment-moldova/) covers the market we work in.',
    },
  ],
}
