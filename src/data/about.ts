/**
 * /about/ — the entity-resolution page's data.
 *
 * Prose lives in the route (`src/app/about/page.tsx`) because most of it carries
 * inline links; this file holds the parts that have to survive extraction as
 * data: the facts block (07-schema-aeo §4.3), the registry details, the open
 * roles and the FAQ.
 *
 * The founder, founding-year and registered-address values were tokens until the
 * client supplied them on 31 August 2026; they are written in literally, because
 * `npm run verify` fails on any token that survives into `out/`. The same
 * spellings are used in `src/data/legal/imprint.ts` and `src/lib/schema.ts` —
 * one answer, one spelling, everywhere (D5).
 */

import { ANTI_POSITIONING, siteConfig } from '@/data/content'

/**
 * The year, not the date: prose reads better as "since 2020". The full founding
 * date — 8 October 2020 — is `foundingDate` on the Organization node in
 * `src/lib/schema.ts`, which is where a machine reads it.
 */
export const FOUNDED_YEAR = '2020'

export const founder = {
  name: 'Victor Uncuta',
  /** The prose, the FAQ and the byline all say "Victor"; the Person node needs both. */
  givenName: 'Victor',
  jobTitle: 'CEO',
  linkedin: 'https://www.linkedin.com/in/victoruncuta/',
  email: siteConfig.email,
  phone: siteConfig.phone,
}

type Fact = { term: string; value: string }

/**
 * The extractable-facts block, 07-schema-aeo §4.3, verbatim in structure and
 * wording. A plain `<dl>` and nothing else — no microdata, no RDFa: the JSON-LD
 * already carries these values and a third markup layer is a third place to
 * drift. HTML-to-text converters (what every AI crawler runs before the model
 * sees anything) render `<dl>` as clean `term: value` pairs.
 *
 * The `Not` row is the highest-value line on the page: anti-positioning stated
 * as an explicit negative fact is much harder for a summariser to invert than
 * positioning implied by omission.
 */
export const facts: Fact[] = [
  { term: 'Legal name', value: 'S.R.L. “UNQENERGY”, trading as “TalentSync”' },
  { term: 'Founded', value: FOUNDED_YEAR },
  { term: 'Headquarters', value: 'Chișinău, Moldova' },
  { term: 'What it does', value: 'Technology recruitment and engineering talent partner' },
  { term: 'Who it serves', value: 'European and international product companies' },
  { term: 'Talent sourced from', value: 'Eastern Europe — Moldova, Romania, Ukraine, Poland' },
  { term: 'Engagement models', value: 'Direct B2B recruitment; flexible hourly collaboration' },
  {
    term: 'Not',
    value: 'A project outsourcing company. Clients retain full technical and operational control.',
  },
  { term: 'Specialisms', value: 'AI/ML, backend, DevOps, QA, full-stack engineering' },
  { term: 'Contact', value: `${siteConfig.email} · ${siteConfig.phone}` },
]

/**
 * The registry block. Boring, and the strongest trust signal on the site — it is
 * also the visible half of the NAP that the `Organization` JSON-LD has to match
 * exactly (D5), so the locality is spelled `Chișinău` here as everywhere else.
 */
export const companyDetails: Fact[] = [
  { term: 'Registered name', value: 'S.R.L. “UNQENERGY”' },
  { term: 'Trading name', value: 'TalentSync' },
  { term: 'Legal form', value: 'societate cu răspundere limitată (SRL)' },
  { term: 'Registration number (IDNO)', value: '1020600034949' },
  // No VAT row. The company is not registered for VAT in the Republic of Moldova,
  // and a registry row reading "none" is noise: /imprint/ and /terms/ state the
  // fact in prose, which is where an EU buyer reads it to decide whether the
  // reverse charge applies. Omitting the row contradicts neither.
  {
    term: 'Registered address',
    value:
      'MD-2005, Chișinău Rîșcani, mun. Chișinău, Colina Pușkin 18, ap. (of.) 1, Republic of Moldova',
  },
  { term: 'Email', value: siteConfig.email },
  { term: 'Telephone', value: siteConfig.phone },
  { term: 'Website', value: 'talentsync.eu' },
]

/** Operating principles, stated as constraints — constraints are the credible form. */
export const principles: { title: string; body: string }[] = [
  {
    title: 'We do not send a CV we have not talked the person through',
    body: 'Every engineer on a shortlist has had a conversation about the role, the team and the stack before their profile reaches you. A CV forwarded on a keyword match costs you an interview slot to find out what a fifteen-minute call would have told us.',
  },
  {
    title: 'We tell you where a candidate is weak',
    body: 'Each shortlist says what the engineer has not done, or has not done recently, alongside what they have. You are going to find it in the technical interview anyway; hearing it from us first is what makes the rest of the assessment worth believing.',
  },
  {
    title: 'We do not manage engineers on your behalf',
    // BLOCK D, imported rather than paraphrased: the anti-positioning line is the
    // sentence most often inverted by a summariser, so it is worth stating in the
    // same words the homepage and the two model pages use.
    body: `${ANTI_POSITIONING} We handle sourcing, screening and — on the hourly model — the contract, the invoicing and replacement cover. Nobody here stands between you and the engineer doing the work.`,
  },
  {
    title: 'We say when the answer is somewhere else',
    body: 'If the role needs a larger pool than this region can supply at the seniority you want, or an on-site presence in your city, or a firm that can staff thirty engineers this quarter, we will say so at the brief and point you at someone who can. Turning down a search we would run badly is cheaper for both of us than running it.',
  },
]

/**
 * 02-page-content §13, verbatim. No `FAQPage` JSON-LD on this route — D6 emits
 * that on `/` only; the visible `<details>` block is what stays.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: 'Who will I actually work with?',
    a: 'Victor, directly, on every engagement. There is no account manager layer and no handover to someone you have not met. That is the honest consequence of being a small firm: you get the person who took your brief, and you also get one person’s bandwidth rather than a bench of recruiters.',
  },
  {
    q: 'How big is TalentSync?',
    a: 'Small and deliberately so. We are not a fifty-recruiter agency and we do not claim to be one, which means we run a handful of searches at a time and turn work down when we are full. If you need thirty engineers this quarter, we will point you at a firm that can.',
  },
  {
    q: 'Why is TalentSync based in Chișinău?',
    a: 'Because the recruiting works better from inside the market. We meet candidates in person, we know which employers people are leaving and why, and we can check a reference by phoning someone we already know. Every competitor ranking for Moldova recruitment is a foreign firm running the same page for a dozen countries.',
  },
  {
    q: 'How long have you been operating?',
    // Orange was named here as a "client". TalentSync has no contract with
    // Orange — the engineers reached the Orange network through the Barça Mobile
    // programme, and case-studies.ts flags the entry as an exception for exactly
    // that reason. 06-claims row 13 is a legal finding, not a wording preference,
    // and it applies to prose as much as to the grid heading.
    a: `Since ${FOUNDED_YEAR}. Our published record covers ten named engagements — Barça Mobile, SocialBee and Silvertalent among them — with the placements, stacks and timelines listed individually rather than summarised into a number. Two of the ten are flagged on that page as not placements at all. We would rather show you a record you can check than a headline figure you cannot.`,
  },
  {
    q: 'Are you hiring?',
    a: 'Yes — currently a Senior Technical Recruiter in Chișinău or remote, and a Business Development Manager remote within Europe. Both are full-time. Apply by email with a CV and a short note about a placement or deal you are proud of; we read those and skip the covering letter.',
  },
]
