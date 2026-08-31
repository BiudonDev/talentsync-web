import type { TocItem } from '@/components/ui/TableOfContents'

/**
 * How the legal documents are represented, and why.
 *
 * The alternative was a hand-written markdown-subset renderer. It was rejected:
 * these documents carry ~100 numbered clauses, three levels of nesting, a dozen
 * tables and a stable anchor on every clause (`/terms/#B7-2`). Markdown has no
 * id syntax, so an id extension would have to be invented; nested-list and table
 * parsing is where every hand-rolled markdown parser goes wrong, and when it goes
 * wrong it goes wrong SILENTLY — a mis-indented sub-list becomes a paragraph and
 * a clause quietly loses its (a)(b)(c) limbs. A typed block tree cannot do that:
 * the structure is the data, TypeScript checks it, and there is no parser to trust.
 *
 * What IS parsed is inline markup only — `**bold**`, `*italic*`, `` `code` ``,
 * `[text](href)` — roughly twenty lines in LegalPageTemplate. That trade is worth
 * it: the alternative is thousands of lines of `{ b: '…' }` fragments in the data
 * files, and inline markup has no nesting to get wrong.
 */

/**
 * A string carrying the inline subset. Nothing else is interpreted — no HTML is
 * ever injected, the renderer builds React elements.
 */
export type Inline = string

/** A list entry. Give it `children` when a limb carries its own sub-list or table. */
export type Item = Inline | { t: Inline; children?: Block[] }

export type Block =
  /** Section heading. `level: 2` entries become the table of contents. */
  | { k: 'h'; level: 2 | 3; id: string; t: Inline; toc?: false }
  | { k: 'p'; id?: string; t: Inline }
  /**
   * A numbered contract clause. The visible number is DERIVED from the id
   * (`B12-6` renders as `B12.6`), so the anchor and the number can never drift
   * apart and `/terms/#B12-6` always lands on the clause it names.
   */
  | { k: 'c'; id: string; t: Inline; children?: Block[] }
  | { k: 'ul'; items: Item[] }
  /**
   * `lit: true` = the marker is literal text inside the item ("(a) …", "(i) …"),
   * and the browser marker is suppressed. Contracts cross-refer to "B12.6(a)", so
   * the letter has to survive copy-paste and text extraction; a CSS counter or a
   * `list-style-type` would render it and lose it.
   */
  | { k: 'ol'; lit?: boolean; items: Item[] }
  | { k: 'dl'; items: { t: Inline; d: Inline }[] }
  | { k: 'table'; head: Inline[]; rows: Inline[][]; caption?: Inline }
  /** Bordered callout — the plain-English boxes, and the verbatim Art. 14 notice. */
  | { k: 'note'; t?: Inline; body: Inline[] }
  | { k: 'hr' }

/** One row of the "which part applies to you" router. */
export type RouterRow = { when: Inline; then: Inline }

export type LegalDoc = {
  /** Route path segment. Also the key in the `legal` record and in `Object.entries`. */
  slug: string
  /** Absolute path, leading and trailing slash — matches src/data/routes.ts exactly. */
  path: string
  /** Nav / breadcrumb label. */
  label: string
  /** The one h1. Carries the page's target query, never the bare brand name. */
  h1: Inline
  metaTitle: string
  metaDescription: string
  version: string
  /** ISO date. The rendered date is formatted from it, so the two cannot disagree. */
  updated: string
  /** ISO date the document takes effect, where that differs from `updated`. */
  effective?: string
  /** One paragraph under the h1, above the table of contents. */
  lede?: Inline
  /** Rendered as the "which part applies to you" router above the body. */
  router?: RouterRow[]
  body: Block[]
}

/**
 * Table of contents, derived from the `level: 2` headings in `body`.
 *
 * Derived rather than hand-listed because a hand-listed TOC drifts the first time
 * a section is renamed. This is a pure function over our own data at module scope,
 * not runtime heading scraping — nothing is read from the DOM and no client JS ships.
 */
export const tocOf = (doc: LegalDoc): TocItem[] =>
  doc.body
    .filter((b): b is Extract<Block, { k: 'h' }> => b.k === 'h' && b.level === 2 && b.toc !== false)
    .map((h) => ({ id: h.id, label: h.t.replace(/\*\*|`|\*/g, ''), level: 2 as const }))
