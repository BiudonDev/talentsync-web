import type { LegalDoc } from './types'

/**
 * Candidate Privacy Notice — Annex A of docs/plans/spec/03-privacy-policy.md,
 * promoted to its own route by DECISIONS.md D1 row 21.
 *
 * This is the Article 14 notice that goes into the FIRST outreach message to any
 * engineer we sourced from a public profile. It therefore has to stand completely
 * alone: controller identity, EU representative, source, categories, purpose,
 * basis, recipients, retention, rights and complaint routes are all here, with no
 * dependency on /privacy/ beyond a "there is more detail there" link. It is also
 * the canonical text — /privacy/ links here rather than carrying a second copy,
 * because two copies of an Art 14 notice is a drift trap and the drift always
 * shows up in the version that was emailed.
 *
 * `[platform]` and `[profile URL]` are deliberately bracketed prose, not
 * {{TOKEN}}s: Art 14(2)(f) requires the ACTUAL source, filled in per message.
 * They are placeholders in a template, not unresolved business facts.
 */
export const candidatePrivacy: LegalDoc = {
  slug: 'candidate-privacy',
  path: '/candidate-privacy/',
  label: 'Candidate Privacy Notice',
  h1: 'Candidate privacy notice: what we recorded about you, and how to make us stop',
  metaTitle: 'Candidate Privacy Notice',
  metaDescription:
    'The Article 14 notice TalentSync sends to every engineer it sources from a public profile: where we found you, what we recorded, why, how long we keep it, and how to object.',
  version: '1.0',
  updated: '2026-08-30',
  lede: 'If we found you on a public professional profile and wrote to you, this is the notice that came with that message — published here word for word so you can check it. It stands on its own; the [full privacy policy](/privacy/) has the rest of the detail.',
  body: [
    { k: 'h', level: 2, id: 'what-this-is', t: 'What this page is' },
    {
      k: 'p',
      t: 'When we obtain your personal data from a source other than you, Article 14 of the GDPR — and Article 14 of Moldovan Law No. 195/2024 — requires us to tell you. The deadline is not “within a month”. It is **the moment we first contact you**, because we obtained your details in order to contact you.',
    },
    {
      k: 'p',
      t: 'So the notice below goes into the **first** message we send you: the first email, the first InMail, the first message of any kind. Every time. It is reproduced here so you can check that what we sent you matches what we publish, and so that it has a short, stable URL that works in any message.',
    },
    { k: 'hr' },

    /* -------------------------------------------------------------- A.1 */
    { k: 'h', level: 2, id: 'full-notice', t: 'The notice, in full' },
    {
      k: 'note',
      t: 'About this message and your data',
      body: [
        '**Who we are.** {{LEGAL_ENTITY_NAME}}, trading as TalentSync, a technical recruitment company registered in the Republic of Moldova (company number {{IDNO}}), at {{REGISTERED_ADDRESS}}, Chișinău. **We are the controller of your personal data.**',
        '**Our representative in the EU.** {{EU_REP_NAME}}, {{EU_REP_ADDRESS}}, {{EU_REP_EMAIL}}. You can contact them instead of us about anything below.',
        '**Where we got your details.** From your public professional profile on **[platform]** — [profile URL]. We found you there while searching for engineers for a specific, live role. We did not buy your details, scrape them, or get them from a data broker, and we have not looked at any personal social media.',
        '**What we recorded.** Your name, your public profile URL, your current job title and employer, the skills and technologies listed on your profile, your seniority, your location, and the contact route you have made available. Nothing else.',
        '**Why.** To assess whether your experience matches a role we are currently recruiting for, and to contact you about it.',
        '**Our legal basis.** Legitimate interests, Article 6(1)(f) GDPR — and the same article of Moldovan Law No. 195/2024 — our interest in matching engineers to live client mandates, and yours in hearing about relevant work. We have documented a written assessment weighing that against your privacy, and we will send it to you if you ask.',
        '**Who might see it.** Nobody, unless you and we agree to go further. If you decide you want to be considered for a role, we will name the client and ask you before sending anything. We never share a profile with a client you have not agreed to.',
        '**How long we keep it.** If you do not reply, we delete everything we hold about you **six months** from the date of this message. If we speak and it does not lead anywhere, we keep your profile for a maximum of **24 months from our last contact**, and we will email you at 22 months to ask whether to keep it.',
        '**What we do not do.** We do not use automated decision-making or AI screening to evaluate candidates — a person reads every profile. We do not collect your photograph, date of birth, health information, or anything about your race, religion, politics, union membership or criminal record, and if any of that appears on a CV you send us, we remove it.',
        '**Your rights.** You can ask us for a copy of what we hold, correct it, delete it, restrict what we do with it, or object to it. **You can object to this processing at any time** — just reply “remove me” and you will hear from us again only to confirm it is done. We keep a one-way (SHA-256) hash of your email address and a one-way hash of your profile URL, and nothing else, so that we do not accidentally contact you again in future. You have these rights whether or not you reply to this message.',
        '**How.** Reply to this email, or write to {{PRIVACY_EMAIL}}. We answer within one month, free of charge.',
        '**Complaints.** To the Moldovan National Centre for Personal Data Protection ([centru@datepersonale.md](mailto:centru@datepersonale.md), [datepersonale.md](https://datepersonale.md/en/)) or, if you are in the EU or EEA, to the data protection authority in your own country — the list is at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en). In the UK, the ICO at [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/).',
        '**Full privacy policy:** [talentsync.eu/privacy/](/privacy/)',
      ],
    },
    { k: 'hr' },

    /* -------------------------------------------------------------- A.2 */
    {
      k: 'h',
      level: 2,
      id: 'short-notice',
      t: 'The short version, for a character-limited message',
    },
    {
      k: 'p',
      t: 'We use this **only** where the channel genuinely cannot carry the full text — a LinkedIn InMail, for example — and only with a working link to the full notice above.',
    },
    {
      k: 'note',
      body: [
        '**Privacy:** I found your public [platform] profile while searching for a live role and recorded your name, title, employer, skills and profile URL. Controller: {{LEGAL_ENTITY_NAME}} (TalentSync), Chișinău, Moldova. EU representative: {{EU_REP_NAME}}, {{EU_REP_EMAIL}}. Legal basis: legitimate interests, Art 6(1)(f) GDPR. Nothing is shared with any client unless you agree first. Deleted in 6 months if you do not reply. Reply “remove me” and I will stop and never source you again. Your rights and how to complain: talentsync.eu/candidate-privacy/',
      ],
    },
    { k: 'hr' },

    /* -------------------------------------------------------------- A.3 */
    { k: 'h', level: 2, id: 'our-rules', t: 'The rules we hold ourselves to when we use this' },
    {
      k: 'p',
      t: 'These are not part of the notice we send you. They are published here so that you can hold us to them.',
    },
    {
      k: 'ol',
      items: [
        'The notice goes in the **first** message. Not the second, not the follow-up, not “once they show interest”.',
        'We fill in the **actual** platform and the **actual** profile URL. “A public source” is not an answer; Article 14 requires the source.',
        'If a client is already named and identified, we name them, even before you agree.',
        'We never send an outreach message from a channel that cannot carry at least the short version plus a working link. In practice that means **email and LinkedIn only** — we do not use WhatsApp, Telegram or SMS for candidate outreach.',
        '“Remove me”, in any wording, is an objection. We stop the same day, add the hashes to the suppression list, confirm within five working days, and never ask why.',
        'We do not use the “disproportionate effort” exemption in Article 14(5)(b). We have your address and we are emailing you anyway; the effort is zero.',
        '**We do not keep profiles of people we have not written to.** If we record a profile while searching and then decide not to approach you, we delete it within **30 days**, and you never hear from us.',
      ],
    },
    { k: 'hr' },

    /* ------------------------------------------------------------- more */
    { k: 'h', level: 2, id: 'more', t: 'Where to read more' },
    {
      k: 'ul',
      items: [
        '[Full privacy policy](/privacy/) — every purpose, every recipient, every retention period, and the sections covering clients and website visitors. [§6](/privacy/#s6) is the candidate section.',
        '[Candidate terms](/terms/#part-e) — Part E of our terms: we never charge you anything, we never send your details anywhere without naming the company and asking first, and you are tied to us in no way at all.',
        '[Cookie policy](/cookies/) — what this website stores in your browser, and what it does not.',
      ],
    },
    {
      k: 'p',
      t: 'Questions about any of it: {{PRIVACY_EMAIL}}, or our EU representative at {{EU_REP_EMAIL}}. Either works.',
    },
  ],
}
