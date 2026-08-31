/**
 * The service-page registry.
 *
 * `servicePages` is EMPTY on purpose — package C owns the copy for all eleven
 * routes. Everything here is the shape, the guard, and one fully-worked
 * reference page (`exampleServicePage`) that exercises every field and every
 * block kind.
 *
 * The reference page is a separate export rather than a `__example` key inside
 * `servicePages`, so that no consumer has to remember to filter it out of
 * `generateStaticParams()`, the sitemap or the guard loop. It is referenced by
 * nothing, so it is tree-shaken out of the bundle.
 *
 * Adding a page is a data edit:
 *
 *   servicePages['hire-backend-developers'] = { …ServicePage }
 *
 * The key must equal `page.slug` and must exist as a `group: 'service'` row in
 * `src/data/routes.ts` (DECISIONS.md D1 froze that table). The assertions below
 * run at module load, which under `output: 'export'` means they run during
 * `next build` and fail it — a thin page never reaches `out/`.
 */

import { allRoutes } from '@/data/routes'
import type { ServicePage } from './types'

export * from './types'

/** ZERO real pages. Package C fills this in. See `exampleServicePage` below. */
export const servicePages: Record<string, ServicePage> = {}

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export const getServicePage = (slug: string): ServicePage | undefined => servicePages[slug]

/**
 * Every service slug, drafts INCLUDED. This is what `generateStaticParams()`
 * wants: D1.1 requires draft routes to be generated and reachable by URL, just
 * unlinked and unlisted.
 */
export const allServiceSlugs = (): string[] => Object.keys(servicePages)

/**
 * Publishable slugs only. This is what anything that renders a LINK wants —
 * related-service grids, the footer column, the sitemap. A draft slug must
 * never appear in one.
 */
export const publishedServiceSlugs = (): string[] =>
  Object.values(servicePages)
    .filter((p) => !p.draft)
    .map((p) => p.slug)

export const publishedServicePages = (): ServicePage[] =>
  Object.values(servicePages).filter((p) => !p.draft)

// ---------------------------------------------------------------------------
// Build-time guard
// ---------------------------------------------------------------------------

const wordCount = (s: string) => s.trim().split(/\s+/).length

/**
 * Section ids the template already uses for its own bands. A page section
 * cannot claim one — two elements with the same id breaks the anchor and the
 * table of contents silently.
 */
const RESERVED_SECTION_IDS = ['overview', 'placements', 'faq', 'related']

/**
 * Lower bounds only, and only where the type system cannot reach.
 *
 * Word counts are checked against 30, not against the authored target of 40–60.
 * The costs are asymmetric: a 62-word answer is fine and failing the build on
 * it at 3am is not, whereas a 12-word answer is the thin-page failure mode this
 * whole guard exists to stop.
 *
 * Exported so the build-guard script can run the same rules over the same data
 * rather than growing a second, drifting copy of them.
 */
export function assertServicePage(key: string, page: ServicePage): void {
  const at = `servicePages["${key}"]`

  if (key !== page.slug) {
    throw new Error(`${at}: registry key does not match page.slug ("${page.slug}").`)
  }

  const route = allRoutes.find((r) => r.path === `/${page.slug}/`)
  if (!route) {
    throw new Error(
      `${at}: "/${page.slug}/" is not in the frozen route table. Routes are frozen by DECISIONS.md D1 — add the page to src/data/routes.ts first, or fix the slug.`,
    )
  }
  if (Boolean(page.draft) !== Boolean(route.draft)) {
    throw new Error(
      `${at}: draft flag disagrees with routes.ts (page: ${Boolean(page.draft)}, route: ${Boolean(route.draft)}). They gate the sitemap and robots separately, so they must match.`,
    )
  }

  // DECISIONS.md D1.1 — publication is gated on lived evidence.
  if (!page.draft && page.evidence.length < 2) {
    throw new Error(
      `${at}: DECISIONS.md D1.1 — a page with draft:false needs at least 2 NAMED client placements, found ${page.evidence.length}. Either name a second placement or set draft:true here and in routes.ts.`,
    )
  }

  // 5 is enforced by the tuple type; 7 is the ceiling.
  if (page.faqs.length > 7) {
    throw new Error(`${at}: ${page.faqs.length} FAQs, the ceiling is 7.`)
  }

  if (wordCount(page.answerParagraph) < 30) {
    throw new Error(
      `${at}: answerParagraph is ${wordCount(page.answerParagraph)} words. It is the paragraph an answer engine lifts — target 40-60.`,
    )
  }
  for (const faq of page.faqs) {
    if (wordCount(faq.answer) < 30) {
      throw new Error(
        `${at}: FAQ answer for "${faq.question}" is ${wordCount(faq.answer)} words. Target 40-60.`,
      )
    }
  }

  if (page.schemaTypes.includes('Article') && !page.article) {
    throw new Error(`${at}: schemaTypes declares "Article" but there is no article block to date and attribute it.`)
  }

  const ids = new Set<string>()
  for (const section of page.sections) {
    if (RESERVED_SECTION_IDS.includes(section.id)) {
      throw new Error(
        `${at}: section id "${section.id}" is reserved by the template (${RESERVED_SECTION_IDS.join(', ')}). Duplicate ids break the anchor and the table of contents.`,
      )
    }
    if (ids.has(section.id)) {
      throw new Error(`${at}: duplicate section id "${section.id}".`)
    }
    ids.add(section.id)
  }
}

for (const [key, page] of Object.entries(servicePages)) assertServicePage(key, page)

// ---------------------------------------------------------------------------
// Reference page — NOT routed, NOT in the registry. Copy this shape.
// ---------------------------------------------------------------------------

/**
 * A complete `ServicePage`, transcribed from 02-page-content.md §7
 * (`/hire-backend-developers/`). Every field is populated and all five
 * `ServiceBlock` kinds appear at least once.
 *
 * Two things it demonstrates that are easy to get wrong:
 *
 * 1. `engagementModels: []`. This is a ROLE page, and Part 0 keeps BLOCK B and
 *    BLOCK C off the six role pages so the duplication stays bounded at five.
 *    Role pages link out through `internalLinks` instead — and this one does.
 * 2. Every timeline is qualified (D7). "one week" never appears without the
 *    dataset it comes from.
 */
export const exampleServicePage: ServicePage = {
  slug: 'hire-backend-developers',
  label: 'Backend Developers',
  metaTitle: 'Hire Backend Developers, Eastern Europe | TalentSync',
  metaDescription:
    'Hire senior backend developers from Eastern Europe: Python, Java, .NET and Node, including telecom-grade integration work. See the roles filled.',
  h1: 'Hire Backend Developers from Eastern Europe',

  answerParagraph:
    'TalentSync places senior backend developers from Eastern Europe in Python, Java, .NET and Node.js. Recent backend placements include a senior Python developer for Qualiwise, filled in one week, and Java engineers for SocialBee. Engineers contract with you directly on B2B terms or work hourly through us, inside your codebase and your standards.',

  whoFor: {
    audience: 'Product engineering teams adding senior backend capacity',
    body: [
      'Engineering leaders who already have a backend team and a technical interviewer, and who need one to three more senior people in Python, Java, .NET or Node.js without opening an entity abroad.',
      'It is a poor fit if you have nobody senior to interview the shortlist, or if you want a supplier to own delivery. We add engineers to your team; we do not take the project.',
    ],
  },

  problem: [
    'Senior backend roles stall on the same three things: a shortlist screened by a recruiter who cannot read the code, a take-home nobody senior will complete, and four interview rounds spread over five weeks while the candidate accepts elsewhere.',
    'An engineer runs our technical interview, the take-home never exceeds two hours, and you see people who have actually run a service in production rather than people who interview well.',
  ],

  sections: [
    {
      id: 'backend-roles-we-fill',
      heading: 'Backend roles we fill',
      blocks: [
        {
          kind: 'table',
          caption: 'Backend roles, what each one owns, and the seniority signal we screen for',
          columns: ['Role', 'What it owns', 'Seniority signal'],
          rows: [
            {
              label: 'API / service engineer',
              cells: [
                'Designs and runs one or more HTTP or gRPC services end to end.',
                'Has versioned a public API without breaking a consumer.',
              ],
            },
            {
              label: 'Data-intensive backend engineer',
              cells: [
                'Schema design, query performance, batch and streaming pipelines.',
                'Has migrated a schema under production load.',
              ],
            },
            {
              label: 'Integration engineer',
              cells: [
                'Third-party and carrier-side systems, provisioning, retries, reconciliation.',
                'Has debugged a counterparty who would not fix their end.',
              ],
            },
            {
              label: 'Platform backend engineer',
              cells: [
                'Shared libraries, service templates, the paved road other teams build on.',
                'Has removed work from other teams rather than adding it.',
              ],
            },
            {
              label: 'Backend lead',
              cells: [
                'Technical direction for a small team, plus their own delivery.',
                'Has said no to a requirement and been right.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'languages-and-frameworks',
      heading: 'Languages and frameworks',
      blocks: [
        {
          kind: 'cards',
          items: [
            {
              title: 'Python',
              body: 'FastAPI, Django and Flask. The regional pool skews towards data-heavy services and internal platforms rather than thin CRUD wrappers.',
            },
            {
              title: 'Java',
              body: 'Spring Boot, mostly out of enterprise and fintech backgrounds, which means real experience of transactional correctness and audit requirements.',
            },
            {
              title: '.NET and C#',
              body: 'Strong across Romania and Moldova, frequently on systems that started on the .NET Framework and were carried forward rather than rewritten.',
            },
            {
              title: 'Node.js and TypeScript',
              body: 'NestJS and Express. Common in product companies, so these engineers usually arrive fluent in the front end they serve.',
            },
            {
              title: 'Go',
              body: 'Present but thinner in the region than the other four. Go roles take longer to fill and we say so at the brief rather than at week three.',
            },
          ],
        },
      ],
    },
    {
      id: 'integration-work',
      heading: 'Integration work: the Orange and Barça Mobile MVNO engagement',
      blocks: [
        {
          kind: 'prose',
          body: [
            'One engagement covered Orange network integration with the Barça Mobile MVNO. That is carrier-side systems integration: provisioning flows, a telecom counterparty with its own release calendar, and failure modes you cannot reproduce locally.',
            'The engineer we placed worked on system architecture and CI/CD for that launch. We are describing the engineer’s scope, not claiming TalentSync delivered the platform.',
            'Engineers with regulated or carrier-grade integration backgrounds are rarer than general product backend engineers and take longer to source, so brief us earlier for those roles.',
          ],
        },
      ],
    },
    {
      id: 'backend-placements',
      heading: 'Backend placements on record',
      blocks: [
        {
          kind: 'stats',
          items: [
            { value: '9', label: 'engineers placed across five clients' },
            { value: '1 week', label: 'from brief to signature, Qualiwise senior Python' },
            { value: '2', label: 'Java engineers placed with SocialBee' },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Across our five most recent placements — nine engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief.',
            'Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we tell you that at the brief rather than at week three.',
          ],
        },
      ],
    },
    {
      id: 'how-we-test-backend-skill',
      heading: 'How we test backend skill',
      blocks: [
        {
          kind: 'list',
          heading: 'What the technical interview covers',
          items: [
            'A data-modelling problem where the requirement changes halfway through the conversation.',
            'An API-versioning question with a consumer you are not allowed to break.',
            'One concurrency or idempotency scenario, worked through out loud.',
            'What they broke in production, and what they changed afterwards.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'An engineer runs this interview, not a recruiter. Take-homes never exceed two hours, because the senior people worth hiring will not spend a weekend on one.',
          ],
        },
      ],
    },
    {
      id: 'on-call-and-handover',
      heading: 'On-call, handover and the practical bits',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A contract engineer can take on-call, but only if it is agreed and priced at the start. An engineer who accepts it silently will resent it by month three, so tell us at the brief and we screen for people who actively want it.',
            'Handover expectations belong in the same conversation: what gets documented, who inherits the runbook, and how much notice each side gives. None of that is difficult, and all of it is expensive to discover late.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Python', items: ['FastAPI', 'Django', 'Flask', 'Celery'] },
    { group: 'Java', items: ['Spring Boot', 'Hibernate', 'Kafka'] },
    { group: '.NET', items: ['ASP.NET Core', 'Entity Framework', 'C#'] },
    { group: 'Node.js', items: ['NestJS', 'Express', 'TypeScript'] },
    { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'] },
  ],

  seniorities: [
    {
      label: 'Senior (5–12 years)',
      detail:
        'The bulk of what we place. The test is ownership, not years: has this person run a service end to end, carried a pager, and pushed back on a requirement that was wrong.',
    },
    {
      label: 'Lead',
      detail:
        'Technical direction for a small team alongside their own delivery. Rarer, slower to source, and worth briefing us on early.',
    },
    {
      label: 'Mid-level',
      detail:
        'Placed only where you already have a senior engineer leading them. We will say so rather than fill the seat.',
    },
  ],

  coverage: {
    summary:
      'Engineers are sourced across Eastern Europe and are based mainly in Moldova and Romania. Eastern European Time is UTC+2, so a Western European team gets a complete overlapping working day.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off these six and links out instead.
  engagementModels: [],

  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior backend developer, Python',
      count: 1,
      outcome: 'Signed within one week of the brief.',
      href: '/case-studies/qualiwise/',
    },
    {
      client: 'SocialBee',
      role: 'Java / Angular full-stack engineers',
      count: 2,
      outcome:
        'Both signed within two weeks of the brief. The full-stack page carries the detail so the two pages do not claim the same engineers.',
    },
  ],

  faqs: [
    {
      question: 'Which backend stacks do you actually cover?',
      answer:
        'Python, Java, .NET and Node.js are where our network is deepest, and they cover most of what our clients run. Go appears less often in the region and takes longer to fill. If your stack is Elixir, Rust or Scala, ask us before you brief — we will tell you honestly.',
    },
    {
      question: 'Do you place engineers with telecom or regulated integration experience?',
      answer:
        'Yes. One engagement covered Orange’s network integration with the Barça Mobile MVNO, which is carrier-grade integration work with a telecom counterparty and its constraints. Engineers with that background are rarer and take longer to source than general product backend engineers, so brief us earlier for those roles.',
    },
    {
      question: 'How do you test backend skill beyond the CV?',
      answer:
        'An engineer runs the technical interview, not a recruiter. We work through a data-modelling problem where the requirement changes mid-conversation, an API-versioning question, and one concurrency or idempotency scenario. Then we ask what they broke in production and what they changed afterwards. Take-homes never exceed two hours.',
    },
    {
      question: 'Can a contract backend engineer take on-call?',
      answer:
        'Yes, if it is agreed and priced at the start rather than assumed. On-call is a real commitment with a real cost, and an engineer who accepts it silently will resent it by month three. Tell us at the brief and we screen for people who genuinely want it.',
    },
    {
      question: 'Do you place backend engineers for legacy modernisation?',
      answer:
        'Yes, and it is a different screen from greenfield work. We look for engineers who have actually strangled a monolith, migrated a schema under production load and worked without tests, rather than people who will propose a rewrite in week two. Say it is legacy in the brief and we will target accordingly.',
    },
    {
      question: 'What seniority do you actually place?',
      answer:
        'Mostly five to twelve years, with the seniority test being ownership rather than years: has this person run a service end to end, carried a pager, and pushed back on a requirement that was wrong. We place mid-level engineers too, but only where you have a senior already leading them.',
    },
  ],

  internalLinks: [
    { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
    { anchor: 'DevOps and platform engineers', href: '/hire-devops-engineers/' },
    { anchor: 'AI and data engineers', href: '/hire-ai-engineers/' },
    { anchor: 'contracting the engineer on B2B terms', href: '/b2b-engineer-recruitment/' },
    { anchor: 'hourly backend capacity', href: '/hourly-engineering-talent/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'the Orange and Qualiwise engagements', href: '/case-studies/' },
  ],

  cta: {
    heading: 'Send us the service you need built',
    body: 'Bring the architecture diagram if you have one. The shortlist gets sharper.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'Backend developer recruitment',
}
