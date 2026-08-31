import type { TocItem } from '@/components/ui/TableOfContents'
import type { Block } from '@/data/legal/types'

/**
 * Article shape for /insights/[slug]/.
 *
 * The body is the legal package's `Block` tree, reused rather than re-invented:
 * it already covers headings, paragraphs, lists, tables, callouts and the
 * `**bold**` / `` `code` `` / `[text](href)` inline subset, and it is already
 * typed. An article is a legal document with fewer clauses.
 */
export type Insight = {
  /** Must be a member of `insightSlugs` in src/data/routes.ts (frozen, D1). */
  slug: string
  /** Absolute path with both slashes — matches the route registry byte for byte. */
  path: string
  /** Two-to-four words. Breadcrumb tail, card tag and table-of-contents title. */
  label: string
  /** The one h1. Carries the target query. */
  title: string
  /**
   * <= 47 characters. `pageMeta` appends ' | TalentSync' (13) and
   * scripts/validate-pages.mjs fails any <title> over 60.
   */
  metaTitle: string
  /** 70–160 characters, unique site-wide. */
  metaDescription: string
  /** One sentence on the index card. Not the same string as `metaDescription`. */
  dek: string
  /**
   * 40–60 words, rendered as the lede directly under the h1. This is the
   * paragraph an answer engine lifts, so it must stand alone with no context.
   */
  answer: string
  /** ISO date. Visible — a hub with invisible dates reads as abandoned. */
  datePublished: string
  dateModified: string
  tags: string[]
  /** Which grouped listing the article appears under on /insights/. */
  group: InsightGroup
  /** schema.org `about` — the topics, not the keywords. */
  about: string[]
  body: Block[]
}

export type InsightGroup = 'contracts' | 'market' | 'practice'

/** Group order and headings for the hub. Spec 02-page-content.md §14 outline rows 3–5. */
export const GROUPS: { id: InsightGroup; heading: string; blurb: string }[] = [
  {
    id: 'contracts',
    heading: 'Contracts, tax and compliance',
    blurb: 'The questions a finance director and a DPO ask before a contract gets signed.',
  },
  {
    id: 'market',
    heading: 'The Eastern European market',
    blurb: 'How the region actually works, written from inside it.',
  },
  {
    id: 'practice',
    heading: 'Hiring practice',
    blurb: 'Choosing an engagement model, running a search, and knowing when the answer is no.',
  },
]

/**
 * Derived from the level-2 headings, never hand-listed — a hand-listed contents
 * block drifts the first time a section is renamed. Pure function over our own
 * data at module scope: nothing is read from the DOM and no client JS ships.
 */
export const tocOf = (a: Insight): TocItem[] =>
  a.body
    .filter((b): b is Extract<Block, { k: 'h' }> => b.k === 'h' && b.level === 2 && b.toc !== false)
    .map((h) => ({ id: h.id, label: h.t.replace(/\*\*|`|\*/g, ''), level: 2 as const }))

/** Keys whose values are machinery, not prose. */
const IGNORED = new Set(['k', 'id', 'level', 'lit', 'toc'])

const words = (v: unknown): number =>
  typeof v === 'string'
    ? v.split(/\s+/).filter(Boolean).length
    : Array.isArray(v)
      ? v.reduce<number>((n, x) => n + words(x), 0)
      : v && typeof v === 'object'
        ? Object.entries(v).reduce((n, [k, x]) => (IGNORED.has(k) ? n : n + words(x)), 0)
        : 0

export const wordCount = (a: Insight) => words(a.body)

/** 220 wpm, the usual figure for technical prose. Derived so it cannot go stale. */
export const readingMinutes = (a: Insight) => Math.max(1, Math.round(wordCount(a) / 220))
