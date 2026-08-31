/**
 * The service-page content model.
 *
 * Eight indexable routes plus three `draft: true` ones render through
 * `ServicePageTemplate`, so this file is the single place a thin page gets
 * caught. Every one of the ten things the brief requires of a service page —
 * search-focused H1, who it is for, the hiring problem, the process, stacks and
 * seniorities, geographic coverage, the two engagement models, one real result,
 * FAQs from buyer objections, a relevant CTA — is a REQUIRED field. TypeScript
 * refuses to compile a page that skips one.
 *
 * Counts are enforced by tuple types where the rule is unconditional
 * (`faqs` >= 5, `internalLinks` >= 4) and by a runtime assertion in `./index.ts`
 * where it is not (`evidence` >= 2 only when `draft` is false — DECISIONS.md
 * D1.1). Expressing the conditional one as a discriminated union on `draft`
 * compiles, but every mistake in it reports as "not assignable to Draft |
 * Published" without naming the field that failed, which is worse than a thrown
 * message that names the slug and the count.
 */

// ---------------------------------------------------------------------------
// The two engagement models — written ONCE, referenced by key.
// ---------------------------------------------------------------------------

/**
 * 02-page-content.md Part 0, BLOCK B and BLOCK C, verbatim. The spec's leading
 * bold phrase ("**Direct B2B recruitment.**") is hoisted to `title` and the rest
 * of the sentence is untouched.
 *
 * These are a `const` map rather than per-page copy for one reason: nine pages
 * describing the same two products in nine slightly different ways is how a
 * cluster cannibalises itself. A page picks keys; it cannot reword the block.
 *
 * Part 0's rule on WHERE they appear: `/`, `/tech-recruitment-eastern-europe/`,
 * `/hire-software-developers-eastern-europe/`, `/b2b-engineer-recruitment/` and
 * `/hourly-engineering-talent/` carry both. The six role pages carry NEITHER —
 * they set `engagementModels: []` and link out through `internalLinks` instead,
 * which bounds the duplication at five pages.
 */
export const ENGAGEMENT_MODELS = {
  b2b: {
    title: 'Direct B2B recruitment',
    href: '/b2b-engineer-recruitment/',
    linkAnchor: 'How direct B2B recruitment works',
    body:
      'TalentSync sources, screens and technically validates the engineer, then steps out of the relationship. ' +
      'You interview, you select, and you contract the engineer directly for a long-term engagement. The engineer ' +
      'invoices you as an independent business on a B2B contract, so you add senior capacity without opening a ' +
      'local entity, running foreign payroll, or taking on employment obligations in another jurisdiction. You ' +
      'manage the engineer exactly as you manage the rest of your team.',
  },
  hourly: {
    title: 'Flexible hourly collaboration',
    href: '/hourly-engineering-talent/',
    linkAnchor: 'How hourly collaboration works',
    body:
      'The engineer joins your existing team and is billed for hours actually worked, with no fixed headcount ' +
      'commitment. You retain control of architecture, roadmap, priorities, processes and day-to-day management; ' +
      'the engineer works inside your repositories, your sprint cadence and your definition of done. TalentSync ' +
      'handles the contract, invoicing and replacement cover. Capacity can be scaled up, scaled down or paused at ' +
      'agreed notice, which suits teams between funding rounds and work with an uncertain end date.',
  },
} as const

export type EngagementModelKey = keyof typeof ENGAGEMENT_MODELS

// ---------------------------------------------------------------------------
// Body blocks — five kinds, each mapping to exactly one shipped primitive.
// ---------------------------------------------------------------------------

/**
 * `heading`, where present, renders as the section's `<h3>`. That is the only
 * sub-level a service page gets: `h1` is the page, `h2` is the section, `h3` is
 * a block inside it. No `h4`, so no skipped levels are possible (Rule 5).
 *
 * There is no `image`, `quote` or `callout` kind because no page outline in
 * 02-page-content.md needs one. Add a kind when a page needs it, not before.
 */
export type ServiceBlock =
  /** Paragraphs. One string per `<p>`. */
  | { kind: 'prose'; heading?: string; body: string[] }
  /** Bulleted list. */
  | { kind: 'list'; heading?: string; items: string[] }
  /** Card grid — "five roles with a one-line definition" and similar. */
  | { kind: 'cards'; heading?: string; items: { title: string; body: string }[] }
  /** Stat tiles — the placement dataset, timelines, pool sizes. */
  | { kind: 'stats'; heading?: string; items: { value: string; label: string }[] }
  /** Restacks to a definition list below `sm`; never scrolls the page (Rule 4). */
  | {
      kind: 'table'
      heading?: string
      /** Accessible table name. Required — a table without one is unusable to a screen reader. */
      caption: string
      /** `columns[0]` labels the row-header column. */
      columns: string[]
      rows: { label: string; cells: string[] }[]
    }

export interface ServiceSection {
  /** Anchor target and table-of-contents key. Kebab-case, unique within the page. */
  id: string
  /** Rendered as the section `<h2>`. */
  heading: string
  blocks: ServiceBlock[]
}

// ---------------------------------------------------------------------------
// Leaf shapes.
// ---------------------------------------------------------------------------

export interface ServiceFaq {
  /** Phrase it as the buyer's objection, not as a marketing prompt. */
  question: string
  /** 40–60 words. The build guard rejects anything under 30. */
  answer: string
}

export interface ServiceLink {
  /** Descriptive anchor text. Never "click here", never the bare URL. */
  anchor: string
  /** Site path. Slash-normalised through `href()` at render time. */
  href: string
}

/**
 * A NAMED client placement. DECISIONS.md D1.1 gates publication on these:
 * `draft: false` requires two. "A senior engineer for a fintech client" is not
 * a placement — `client` is the name that may be printed.
 */
export interface ServicePlacement {
  client: string
  /** What was placed, e.g. 'Senior backend developer, Python'. */
  role: string
  /** How many engineers. */
  count: number
  /**
   * The result, in TalentSync's own scope. D7: never imply TalentSync built the
   * product, and never state a timeline bare — qualify it with the dataset.
   */
  outcome: string
  /** Optional deep link, normally `/case-studies/<slug>/`. */
  href?: string
}

export interface ServiceCtaLink {
  label: string
  href: string
  /** Opens in a new tab with rel="noopener noreferrer". Calendly and mailto:. */
  external?: boolean
}

export interface ServiceCta {
  /** The `<h2>` of the closing band. Make it specific to the page. */
  heading: string
  /** The sub-line under it. */
  body: string
  primary: ServiceCtaLink
  secondary?: ServiceCtaLink
}

/**
 * Which JSON-LD the page declares. `BreadcrumbList` is always emitted and is
 * therefore not listed here.
 *
 * `FAQPage` is deliberately absent: D6 emits it on `/` only. The visible
 * `<details>` FAQ still renders on every page — the template just never marks
 * it up.
 */
export type ServiceSchemaType = 'Service' | 'Article'

// ---------------------------------------------------------------------------
// Tuple types that express a minimum length.
// ---------------------------------------------------------------------------

/** >= 5. Fewer and the compiler says "Source has N element(s) but target requires 5". */
type AtLeastFive<T> = [T, T, T, T, T, ...T[]]
/** >= 4. */
type AtLeastFour<T> = [T, T, T, T, ...T[]]

// ---------------------------------------------------------------------------
// The page.
// ---------------------------------------------------------------------------

export interface ServicePage {
  /** URL segment, no slashes. Must match a `group: 'service'` row in routes.ts. */
  slug: string
  /**
   * D1.1. A draft route is generated and reachable by URL, excluded from the
   * sitemap, emits `robots: { index: false, follow: true }`, and carries no
   * inbound link from nav, footer or body copy. Must agree with routes.ts.
   */
  draft?: boolean
  /** Breadcrumb / related-link label and the schema.org `Service.name`. */
  label: string
  /** `<title>`. Keep to 60 characters. */
  metaTitle: string
  /** `<meta name="description">`. 50–160 characters. */
  metaDescription: string
  /**
   * The one `<h1>` on the route. Rule 5: it carries the page's target query,
   * never the bare brand name.
   */
  h1: string
  /**
   * The 40–60 word direct answer, rendered as the lede immediately under the
   * H1. This is the paragraph an AI answer engine lifts, so it must answer the
   * query in the first sentence and stand alone out of context.
   */
  answerParagraph: string
  /** Who the page is for. */
  whoFor: {
    /** One short noun phrase. Also becomes schema.org `Service.audience`. */
    audience: string
    /** Paragraphs under the "who this is for" heading. */
    body: string[]
  }
  /** The hiring problem this page solves. Paragraphs. */
  problem: string[]
  /**
   * The long tail: process, market detail, the page's unique asset. Rendered in
   * order as alternating full-width bands, one `<h2>` each.
   */
  sections: ServiceSection[]
  /** Technologies, grouped. The compact pill index — depth belongs in `sections`. */
  stacks: { group: string; items: string[] }[]
  /** Seniority bands and what the word means on this page. */
  seniorities: { label: string; detail: string }[]
  /** Geographic coverage. */
  coverage: {
    /** One or two sentences. Also the sidebar summary. */
    summary: string
    /** Rendered as pills. Use D5 spelling — `Chișinău` with diacritics. */
    countries: string[]
  }
  /**
   * Which of the two canonical models this page carries. `[]` on the six role
   * pages — see the note on `ENGAGEMENT_MODELS`.
   */
  engagementModels: EngagementModelKey[]
  /** Named client placements. >= 2 when `draft` is false (D1.1). */
  evidence: ServicePlacement[]
  /** 5–7 buyer objections. The tuple enforces the floor, the build guard the ceiling. */
  faqs: AtLeastFive<ServiceFaq>
  /** At least four outbound internal links. */
  internalLinks: AtLeastFour<ServiceLink>
  cta: ServiceCta
  /** `BreadcrumbList` is implicit. `FAQPage` is not available here — D6. */
  schemaTypes: ServiceSchemaType[]
  /** schema.org `Service.serviceType`. Keep distinct per page. */
  serviceType: string
  /**
   * Required when `schemaTypes` includes `'Article'` — D1.2 makes route 2 a
   * dated, attributed Article. The build guard rejects the mismatch.
   */
  article?: {
    /** ISO 8601. */
    datePublished: string
    dateModified?: string
    /** A real named person. D6. */
    author: string
  }
}
