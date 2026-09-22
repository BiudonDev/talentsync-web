import { siteConfig } from './content'
import { jobPostingLd } from '@/lib/schema'

/**
 * The two open roles, promoted out of `content.ts`'s four-field `careers` array
 * into everything `JobPosting` needs.
 *
 * Why this file exists at all: `JobPosting` is the one Google rich result
 * TalentSync unambiguously qualifies for (08-critique-seo.md §1.4), it feeds the
 * job aggregators for free, and Google DROPS a posting silently the moment
 * `validThrough` goes past — so the dates are data, not decoration.
 *
 * The visible page and the JSON-LD `description` are rendered from the SAME
 * `intro` + `sections`. Google penalises structured data that describes content
 * the reader cannot see, and two hand-maintained copies of a job spec drift
 * inside a month.
 */

export type CareerSection = { heading: string; items: string[] }

export type CareerRole = {
  /** Must match a slug in `careerSlugs` (src/data/routes.ts) — the route registry is frozen. */
  slug: string
  title: string
  /** Visible location line. */
  location: string
  /** schema.org enum. Widen the union before adding a role that is not full-time. */
  employmentType: 'FULL_TIME'
  /** 70-160 chars, unique site-wide — the build guard checks both. */
  metaDescription: string
  /** Lede. First paragraph of the visible page AND of the JSON-LD description. */
  intro: string
  sections: CareerSection[]
  /** ISO 8601. */
  datePosted: string
  /**
   * ISO 8601, must be in the FUTURE. An expired posting is dropped from Google
   * Jobs with no error anywhere — diary this date, do not let it lapse.
   */
  validThrough: string
  /** 100% remote. Adds `jobLocationType: TELECOMMUTE`. */
  remote: boolean
  /**
   * Country the applicant must be located in. Omit when the restriction is not a
   * single country — schema.org has no `Continent` under `AdministrativeArea`, and
   * asserting a wrong `Country` is worse than asserting none.
   */
  applicantCountry?: string
}

export const EMPLOYMENT_LABEL: Record<CareerRole['employmentType'], string> = {
  FULL_TIME: 'Full-time',
}

export const careerRoles: CareerRole[] = [
  {
    slug: 'senior-technical-recruiter',
    title: 'Senior Technical Recruiter',
    location: 'Chișinău, Moldova — or remote within Moldova',
    employmentType: 'FULL_TIME',
    metaDescription:
      'Senior Technical Recruiter at TalentSync — Chișinău or remote in Moldova. Source and technically screen Eastern European engineers for European product teams.',
    intro:
      'You own the sourcing and screening end of a placement: you read the client brief, find the engineers who genuinely match it, and get them to a shortlist a CTO is willing to interview. Seventeen engineers placed with European product teams came through that work.',
    sections: [
      {
        heading: 'What you would do',
        items: [
          'Take a role brief from a client CTO or founder and turn it into a search: the stack that actually matters, the seniority signal to look for, and the two or three things that will disqualify a profile.',
          'Source engineers across Moldova, Romania, Ukraine and Poland from public professional profiles, and write the first outreach message yourself.',
          'Run the structured technical screen, and write the assessment notes the client reads alongside the CV.',
          'Keep the shortlist honest — including telling a client when a role is harder than they think, at the brief rather than at week three.',
          'Own your candidates through interview, offer and the first weeks of the engagement.',
        ],
      },
      {
        heading: 'What we are looking for',
        items: [
          'Experience recruiting software engineers, in an agency or in-house, with placements you can talk through in detail.',
          'Enough technical literacy to hold a conversation about a backend, full-stack or DevOps role without a script.',
          'Written English strong enough that your outreach reads like a person wrote it, because a person did.',
          'Comfort working directly with founders and engineering leaders, with no account manager in between.',
          'Romanian or Russian alongside English is useful for the regional side of the work, and not a requirement.',
        ],
      },
      {
        heading: 'How we work',
        items: [
          'A person reads every profile. We do not use automated decision-making or AI screening to evaluate candidates.',
          'Every first outreach message carries the Article 14 privacy notice published at talentsync.eu/candidate-privacy/ — that is not optional here.',
          'Three engagement models, and you will work on all of them: direct B2B recruitment, where the client contracts the engineer directly; hourly collaboration; and software development outsourcing, where you staff a dedicated delivery team.',
          'Small team, based in Chișinău. You will speak to clients yourself from the first week.',
        ],
      },
    ],
    datePosted: '2026-08-30',
    validThrough: '2027-02-28',
    remote: true,
    applicantCountry: 'Moldova',
  },
  {
    slug: 'business-development-manager',
    title: 'Business Development Manager',
    location: 'Remote — Europe',
    employmentType: 'FULL_TIME',
    metaDescription:
      'Business Development Manager at TalentSync, remote in Europe. Open and hold relationships with product companies hiring senior Eastern European engineers.',
    intro:
      'You open and hold the client side of the business: European and international product companies that need senior engineering capacity and want to keep architecture, roadmap and day-to-day management in their own hands.',
    sections: [
      {
        heading: 'What you would do',
        items: [
          'Build a pipeline of product companies in the EU, the UK and further afield that hire engineers rather than buy projects.',
          'Run the first call yourself: what they are building, what the gap is, and whether direct B2B recruitment or hourly collaboration is the right fit.',
          'Explain the commercial and contractual model credibly — permanent establishment risk, VAT reverse charge, why the engineer invoices as an independent business.',
          'Work with the recruitment side on the brief, so what we promise on the call is what the shortlist delivers.',
          'Stay with the account after the first placement. Most of our work comes from teams hiring a second and third engineer.',
        ],
      },
      {
        heading: 'What we are looking for',
        items: [
          'A track record selling recruitment, staffing or engineering services into technology companies, with deals you can walk us through.',
          'The ability to hold a technical conversation with a CTO without overclaiming — we sell three clearly separated engagement models and never blur which one a client is buying.',
          'Comfort with a long, consultative cycle and a small number of high-value relationships rather than a volume dial.',
          'Fluent English. A second European language is useful, and not a requirement.',
          'Self-direction: this role is remote, and nobody will be watching your calendar.',
        ],
      },
      {
        heading: 'How we work',
        items: [
          'One agreed rate or fee per engagement, quoted in writing after the role is scoped. No hidden margin and no multi-year lock-in to defend.',
          'You will have the founder on your calls whenever it helps, and the contract templates and privacy documentation to answer procurement properly.',
          'Small team, headquartered in Chișinău, Moldova, selling into Europe. Expect meaningful timezone overlap with CET.',
        ],
      },
    ],
    datePosted: '2026-08-30',
    validThrough: '2027-02-28',
    remote: true,
  },
]

/**
 * The guard the build does not otherwise have. Google drops an expired posting
 * with no error, no warning and no Search Console message, so the failure mode is
 * a page that looks fine and earns nothing. Throwing at module load fails
 * `next build` on the day it lapses, which is the only signal that arrives in
 * time. `scripts/validate-pages.mjs` should assert the same thing against the
 * emitted JSON-LD — it does not today.
 */
for (const role of careerRoles) {
  if (new Date(role.validThrough) <= new Date())
    throw new Error(
      `careers.ts: "${role.slug}" validThrough ${role.validThrough} is in the past. ` +
        'Confirm the role is still open and push the date out, or delete the role and its slug from src/data/routes.ts.',
    )
}

export const findRole = (slug: string) => careerRoles.find((r) => r.slug === slug)

export const rolePath = (role: CareerRole) => `/careers/${role.slug}/`

/** Prefilled subject so an application lands identifiable in one inbox. */
export const applyHref = (role: CareerRole) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`

/**
 * The JSON-LD `description`, built from the same copy the page renders.
 *
 * Only Google's supported subset is emitted — `<p>`, `<ul>`, `<li>`, `<strong>` —
 * so section headings are bold paragraphs rather than heading tags. (Heading tags
 * in a `.ts` string would also trip the design-contract type-scale guard, which
 * scans every `<hN>` in `src/` for a static className.)
 */
export const jobDescriptionHtml = (role: CareerRole) =>
  `<p>${role.intro}</p>` +
  role.sections
    .map((s) => `<p><strong>${s.heading}</strong></p><ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>`)
    .join('')

/**
 * `jobPostingLd` hardcodes `applicantLocationRequirements` to `Country: Europe`
 * for every remote role. "Europe" is not a country, so the one role with a real
 * single-country restriction overrides it here, and the one with a continental
 * restriction keeps the builder's value rather than asserting a wrong country.
 * Fix belongs in `src/lib/schema.ts`, which this package does not own.
 */
export const careerLd = (role: CareerRole) => ({
  ...jobPostingLd({
    path: rolePath(role),
    title: role.title,
    description: jobDescriptionHtml(role),
    datePosted: role.datePosted,
    validThrough: role.validThrough,
    employmentType: role.employmentType,
    remote: role.remote,
  }),
  ...(role.applicantCountry
    ? { applicantLocationRequirements: { '@type': 'Country', name: role.applicantCountry } }
    : {}),
})
