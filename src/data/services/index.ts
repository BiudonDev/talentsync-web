/**
 * The service-page registry.
 *
 * One file per route under `./pages/`, named for its slug, each exporting a
 * single typed `ServicePage`. This barrel collects them, keys them by slug, and
 * runs `assertServicePage` over every entry AT MODULE LOAD — which, under
 * `output: 'export'`, means during `next build`. A thin page never reaches
 * `out/`.
 *
 * Adding a page is: write `./pages/<slug>.ts`, import it here, add it to the
 * `servicePages` literal. The slug must already exist as a `group: 'service'`
 * row in `src/data/routes.ts` — DECISIONS.md D1 froze that table, so a new page
 * is a decision change, not a data edit.
 *
 * The former `exampleServicePage` reference object is gone. It was a copy of
 * `/hire-backend-developers/` written before the real pages existed; keeping a
 * second, unrouted copy of a live page is how two versions of the same copy
 * drift apart. Read any file in `./pages/` instead — they all exercise the full
 * interface.
 */

import { allRoutes, serviceSlugs } from '@/data/routes'
import type { ServicePage } from './types'

import { b2bEngineerRecruitment } from './pages/b2b-engineer-recruitment'
import { hireAiEngineers } from './pages/hire-ai-engineers'
import { hireBackendDevelopers } from './pages/hire-backend-developers'
import { hireDevopsEngineers } from './pages/hire-devops-engineers'
import { hireFullStackDevelopers } from './pages/hire-full-stack-developers'
import { hireQaEngineers } from './pages/hire-qa-engineers'
import { hireSoftwareDevelopersEasternEurope } from './pages/hire-software-developers-eastern-europe'
import { hourlyEngineeringTalent } from './pages/hourly-engineering-talent'
import { techRecruitmentEasternEurope } from './pages/tech-recruitment-eastern-europe'
import { technicalRecruitmentMoldova } from './pages/technical-recruitment-moldova'

export * from './types'

/**
 * Every service route, keyed by slug. Order follows DECISIONS.md D1 rows 2–11,
 * which is also the order the cluster is meant to be read in.
 */
export const servicePages: Record<string, ServicePage> = {
  'tech-recruitment-eastern-europe': techRecruitmentEasternEurope,
  'hire-software-developers-eastern-europe': hireSoftwareDevelopersEasternEurope,
  'b2b-engineer-recruitment': b2bEngineerRecruitment,
  'hourly-engineering-talent': hourlyEngineeringTalent,
  'technical-recruitment-moldova': technicalRecruitmentMoldova,
  'hire-backend-developers': hireBackendDevelopers,
  'hire-full-stack-developers': hireFullStackDevelopers,
  'hire-ai-engineers': hireAiEngineers,
  'hire-devops-engineers': hireDevopsEngineers,
  'hire-qa-engineers': hireQaEngineers,
}

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

  // D1.1 — a draft route carries no inbound link. Body copy is the easiest
  // place to leak one, and `validate-pages.mjs` cannot tell an intended link
  // from an accidental one, so catch it here where the intent is visible.
  const draftPaths = new Set(allRoutes.filter((r) => r.draft).map((r) => r.path))
  for (const link of page.internalLinks) {
    if (draftPaths.has(link.href)) {
      throw new Error(
        `${at}: internalLinks points at "${link.href}", which is draft:true. DECISIONS.md D1.1 — a draft route carries no inbound link from nav, footer or body copy.`,
      )
    }
  }
}

for (const [key, page] of Object.entries(servicePages)) assertServicePage(key, page)

/**
 * Route table and registry must agree in the other direction too. Without this
 * a missing page file surfaces as an undefined lookup inside the template,
 * dozens of frames from the cause.
 */
const missing = serviceSlugs.filter((slug) => !servicePages[slug])
if (missing.length > 0) {
  throw new Error(
    `src/data/services: no page written for ${missing.map((s) => `"/${s}/"`).join(', ')}. Every group:'service' row in routes.ts needs a file in ./pages/.`,
  )
}
