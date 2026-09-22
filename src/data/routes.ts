/**
 * THE route registry — the single source of truth for every URL on this site.
 *
 * The route table is FROZEN by docs/plans/spec/DECISIONS.md D1. No agent adds,
 * renames or removes a route here without a decision change. Row 25
 * (/software-development-outsourcing/) was added by the D1 amendment of
 * 21 September 2026.
 *
 * Everything else derives from this file: the sitemap, the nav, the footer link
 * map, the canonical tags (via pageMeta) and the build guard. Nothing may
 * hardcode a second list of routes.
 */

export type RouteGroup = 'service' | 'company' | 'content' | 'legal'

export type Route = {
  /**
   * Absolute path, always with a leading AND trailing slash, so the `<Link href>`,
   * the canonical tag and the sitemap `<loc>` are byte-identical strings.
   */
  path: string
  /** Short nav / breadcrumb label. Dynamic children carry the slug — the page supplies its own display title. */
  label: string
  group: RouteGroup
  /** false => the page emits robots noindex and never appears in the sitemap. */
  index: boolean
  /**
   * D1.1 — the route is generated and reachable by URL, but is excluded from the
   * sitemap, emits `robots: { index: false, follow: true }`, and carries no
   * inbound link from nav, footer or body copy. Flip to false once the page has
   * two named client placements.
   */
  draft?: boolean
}

// ---------------------------------------------------------------------------
// Dynamic-segment slugs. generateStaticParams() reads these.
// ---------------------------------------------------------------------------

/** /case-studies/[slug]/ — wave-1 detail pages (02-page-content.md §12 wave-3 note). */
export const caseSlugs = ['barca-mobile', 'qualiwise', 'silvertalent']

/** /insights/[slug]/ — four at launch (D1 row 16). Topics are the four unclaimed content gaps. */
export const insightSlugs = [
  'permanent-establishment-risk-hiring-engineers-abroad',
  'moldova-it-park-single-tax-explained',
  'b2b-contract-or-hourly-collaboration',
  'moldova-gdpr-adequacy-and-scc-mechanics',
]

/** /careers/[slug]/ — the two roles in src/data/content.ts `careers`. */
export const careerSlugs = ['senior-technical-recruiter', 'business-development-manager']

// ---------------------------------------------------------------------------
// The frozen table (DECISIONS.md D1, rows 1-24).
// ---------------------------------------------------------------------------

const staticRoutes: Route[] = [
  { path: '/', label: 'Home', group: 'company', index: true },

  // Service cluster — rows 2-11.
  { path: '/tech-recruitment-eastern-europe/', label: 'Eastern Europe', group: 'service', index: true },
  { path: '/hire-software-developers-eastern-europe/', label: 'Hire Engineers', group: 'service', index: true },
  { path: '/b2b-engineer-recruitment/', label: 'Direct B2B Recruitment', group: 'service', index: true },
  { path: '/hourly-engineering-talent/', label: 'Hourly Collaboration', group: 'service', index: true },
  // Row 25 — added 21 September 2026 (DECISIONS.md D1 amendment). The third
  // engagement model gets its own transactional page.
  { path: '/software-development-outsourcing/', label: 'Outsourcing', group: 'service', index: true },
  { path: '/technical-recruitment-moldova/', label: 'Moldova', group: 'service', index: true },
  { path: '/hire-backend-developers/', label: 'Backend Developers', group: 'service', index: true },
  { path: '/hire-full-stack-developers/', label: 'Full-Stack Developers', group: 'service', index: true },
  { path: '/hire-ai-engineers/', label: 'AI Engineers', group: 'service', index: true, draft: true },
  { path: '/hire-devops-engineers/', label: 'DevOps Engineers', group: 'service', index: true, draft: true },
  { path: '/hire-qa-engineers/', label: 'QA Engineers', group: 'service', index: true, draft: true },

  // Content hubs — rows 12, 15.
  { path: '/case-studies/', label: 'Case Studies', group: 'content', index: true },
  { path: '/insights/', label: 'Insights', group: 'content', index: true },

  // Company — rows 14, 17, 18.
  { path: '/about/', label: 'About', group: 'company', index: true },
  { path: '/contact/', label: 'Contact', group: 'company', index: true },
  { path: '/careers/', label: 'Careers', group: 'company', index: true },

  // Legal — rows 20-24. All noindex.
  { path: '/privacy/', label: 'Privacy Policy', group: 'legal', index: false },
  { path: '/candidate-privacy/', label: 'Candidate Privacy Notice', group: 'legal', index: false },
  { path: '/terms/', label: 'Terms & Conditions', group: 'legal', index: false },
  { path: '/cookies/', label: 'Cookie Policy', group: 'legal', index: false },
  { path: '/imprint/', label: 'Imprint', group: 'legal', index: false },
]

const child = (parent: string, slug: string, group: RouteGroup): Route => ({
  path: `${parent}${slug}/`,
  label: slug,
  group,
  index: true,
})

/** Every concrete URL the site emits, static segments and dynamic children alike. */
export const allRoutes: Route[] = [
  ...staticRoutes,
  ...caseSlugs.map((s) => child('/case-studies/', s, 'content')),
  ...insightSlugs.map((s) => child('/insights/', s, 'content')),
  ...careerSlugs.map((s) => child('/careers/', s, 'company')),
]

/** What belongs in the sitemap: indexable and not a draft. */
export const indexableRoutes = allRoutes.filter((r) => r.index && !r.draft)

/**
 * The eleven service-page slugs, drafts INCLUDED — `generateStaticParams()` must
 * still emit the draft pages (D1.1: generated, just unlinked and unlisted).
 * Use `servicesNav` for anything that renders links.
 */
export const serviceSlugs = staticRoutes
  .filter((r) => r.group === 'service')
  .map((r) => r.path.replace(/^\/|\/$/g, ''))

const route = (path: string): Route => {
  const found = allRoutes.find((r) => r.path === path)
  if (!found) throw new Error(`routes.ts: unknown route "${path}"`)
  return found
}

// ---------------------------------------------------------------------------
// Nav arrays. No draft route may appear in any of them.
// ---------------------------------------------------------------------------

/**
 * Header. Eight items. `Navbar.tsx` (21 September 2026) groups the five
 * `group: 'service'` rows here under a click "Services" dropdown at `lg:` —
 * the flat list in 00-design-contract.md §5.2 clipped items with no visible
 * scroll affordance at a half-open desktop window. The mobile accordion
 * stays flat, unchanged; this array still supplies both.
 */
export const primaryNav: Route[] = [
  '/tech-recruitment-eastern-europe/',
  '/hire-software-developers-eastern-europe/',
  '/b2b-engineer-recruitment/',
  '/software-development-outsourcing/',
  '/technical-recruitment-moldova/',
  '/case-studies/',
  '/about/',
  '/contact/',
].map(route)

/**
 * Footer "Services" column.
 *
 * MUST exist and MUST contain /b2b-engineer-recruitment/ and
 * /hourly-engineering-talent/. The SEO critic found those two — the highest
 * commercial-value pages on the site — orphaned with zero site-wide links.
 * This array is what fixes that, so it renders on every route.
 */
export const servicesNav: Route[] = staticRoutes.filter((r) => r.group === 'service' && !r.draft)

export const companyNav: Route[] = ['/about/', '/case-studies/', '/insights/', '/careers/', '/contact/'].map(route)

export const legalNav: Route[] = staticRoutes.filter((r) => r.group === 'legal')
