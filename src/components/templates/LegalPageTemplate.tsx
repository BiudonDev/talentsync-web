import type { ReactNode } from 'react'
import Prose from '@/components/ui/Prose'
import SectionWrapper from '@/components/ui/SectionWrapper'
import TableOfContents from '@/components/ui/TableOfContents'
import { tocOf, type Block, type Item, type LegalDoc } from '@/data/legal/types'

/* ------------------------------------------------------------------ inline */

// `**bold**` | `*italic*` | `` `code` `` | `[text](href)`. Alternation order is
// load-bearing: `**` must be tried before `*`, or bold matches as two italics.
const INLINE = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g

/**
 * Bold, italic and link bodies are re-parsed, because the documents nest them
 * constantly — `**[Part A](#part-a)**`, "**`mailto:` links**". Without the
 * recursion those render as literal `[Part A](#part-a)` in a legal notice.
 *
 * `matchAll` rather than `exec`: it iterates a clone of the regex, so the
 * module-level `lastIndex` is never advanced and the recursion cannot corrupt
 * the outer scan. `code` deliberately does not recurse — code spans are literal.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    const at = m.index
    if (at > last) out.push(text.slice(last, at))
    const key = `i${at}`
    if (m[1] !== undefined) out.push(<strong key={key}>{inline(m[1])}</strong>)
    else if (m[2] !== undefined) out.push(<em key={key}>{inline(m[2])}</em>)
    else if (m[3] !== undefined) out.push(<code key={key}>{m[3]}</code>)
    else {
      const href = m[5] ?? '#'
      out.push(
        <a key={key} href={href} {...(/^https?:/.test(href) ? { rel: 'noopener' } : {})}>
          {inline(m[4] ?? '')}
        </a>,
      )
    }
    last = at + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/* ------------------------------------------------------------------- blocks */

function ListItems({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((it, i) =>
        typeof it === 'string' ? (
          <li key={i}>{inline(it)}</li>
        ) : (
          <li key={i}>
            {inline(it.t)}
            {it.children && (
              <div className="mt-2">
                <Blocks blocks={it.children} />
              </div>
            )}
          </li>
        ),
      )}
    </>
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.k) {
          case 'h':
            return b.level === 2 ? (
              <h2 key={i} id={b.id}>
                {inline(b.t)}
              </h2>
            ) : (
              <h3 key={i} id={b.id}>
                {inline(b.t)}
              </h3>
            )

          case 'p':
            return (
              <p key={i} id={b.id}>
                {inline(b.t)}
              </p>
            )

          case 'c':
            // The number is derived from the id, so `#B12-6` and "B12.6" are one
            // string with one source. `<div>` not `<li>`: the numbering is
            // alphanumeric and per-Part (B12.6, D23.3), which no <ol> can produce,
            // and a literal number survives copy-paste and text extraction.
            return (
              <div key={i} id={b.id} className="legal-clause">
                <p>
                  <span className="legal-n">{b.id.replace(/-/g, '.')}</span>
                  {inline(b.t)}
                </p>
                {b.children && <Blocks blocks={b.children} />}
              </div>
            )

          case 'ul':
            return (
              <ul key={i}>
                <ListItems items={b.items} />
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} className={b.lit ? 'lit' : undefined}>
                <ListItems items={b.items} />
              </ol>
            )

          case 'dl':
            return (
              <dl key={i}>
                {b.items.map((d, j) => (
                  <div key={j}>
                    <dt>{inline(d.t)}</dt>
                    <dd>{inline(d.d)}</dd>
                  </div>
                ))}
              </dl>
            )

          case 'table':
            // Prose makes every <table> its own overflow-x-auto scroller, so a
            // seven-column table cannot push the page sideways at 320px (Rule 4).
            return (
              <table key={i}>
                {b.caption && <caption>{inline(b.caption)}</caption>}
                <thead>
                  <tr>
                    {b.head.map((h, j) => (
                      <th key={j} scope="col">
                        {inline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k}>{inline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )

          case 'note':
            return (
              <aside key={i} className="legal-note">
                {b.t && <p className="legal-note-t">{inline(b.t)}</p>}
                {b.body.map((p, j) => (
                  <p key={j}>{inline(p)}</p>
                ))}
              </aside>
            )

          case 'hr':
            return <hr key={i} />
        }
      })}
    </>
  )
}

/* -------------------------------------------------------------------- chrome */

/* `timeZone: 'UTC'` is load-bearing, not decoration. `fmt` parses the ISO date
   as UTC midnight; without this option Intl renders it in the BUILD MACHINE's
   zone, so every effective date on every legal document shipped one day early
   from any CI runner west of UTC (America/Los_Angeles: '2026-08-30' printed
   "29 August 2026", contradicting the hardcoded "Effective from 30 August 2026"
   in the document-control table lower on the same page). */
const DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const fmt = (iso: string) => DATE.format(new Date(`${iso}T00:00:00Z`))

/*
 * Raw CSS, not Tailwind, for three reasons that are each load-bearing:
 *
 *  1. `.legal-doc ol.lit` (0,2,1) has to beat Prose's `[&_ol]:pl-6`, which compiles
 *     to a descendant selector at (0,1,1). A utility class on the <ol> is (0,1,0)
 *     and silently loses, leaving a double marker: "1. (a) …".
 *  2. globals.css belongs to another package. This has to be self-contained.
 *  3. The print rules are a whole media block; there is no Tailwind variant for it.
 *
 * React 19 hoists a <style href precedence> into <head> and de-duplicates it, so
 * this ships once per page even though the component could in principle render twice.
 */
const CSS = `
/* Sub-limbs: "(a) …" is literal text, so the browser marker is suppressed and a
   hanging indent keeps wrapped lines clear of the letter. */
.legal-doc ol.lit { list-style: none; padding-left: 0; }
.legal-doc ol.lit > li { padding-left: 1.75rem; text-indent: -1.75rem; }
.legal-doc ol.lit > li > * { text-indent: 0; }

.legal-doc .legal-n { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--color-primary); margin-right: 0.5em; }
.legal-doc .legal-clause > * + * { margin-top: 0.75em; }
.legal-doc dl > div + div { margin-top: 1.25em; }
.legal-doc caption { caption-side: top; text-align: left; padding-bottom: 0.5rem; font-size: 0.875em; }

.legal-doc .legal-note {
  border-left: 3px solid var(--color-primary);
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 1rem 1rem 1rem 1.25rem;
}
.legal-doc .legal-note > * + * { margin-top: 0.75em; }
.legal-doc .legal-note-t { font-weight: 600; color: var(--color-text-primary); }

/* The h1, the version line, the lede and the router sit OUTSIDE Prose, so links
   in them would otherwise render as unstyled browser blue with no focus ring. */
.legal-head a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.legal-head a:hover { color: var(--color-primary-light); }
.legal-head a:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }

/* A bare URL in a clause must not blow the grid out at 320px (Rule 4). */
.legal-doc a, .legal-head a { overflow-wrap: anywhere; }

@media print {
  /* Site chrome, the breadcrumb trail and the TOC are all <nav>; none of them
     belong on paper. The site footer goes with them. */
  nav, footer { display: none !important; }
  .legal-page, .legal-page > div { padding: 0 !important; }
  .legal-page, .legal-page * {
    color: black !important;
    background: white !important;
    box-shadow: none !important;
  }
  .legal-doc { max-width: none !important; font-size: 10pt; line-height: 1.45; }
  .legal-doc h2, .legal-doc h3 { break-after: avoid; margin-top: 1.4em; }
  .legal-doc .legal-clause, .legal-doc tr, .legal-doc .legal-note { break-inside: avoid; }
  /* The color rule above does not reach border-color; amber prints as pale grey. */
  .legal-doc .legal-note { border-left-color: black !important; }
  .legal-doc table { display: table !important; width: 100% !important; overflow: visible !important; }
  .legal-doc th, .legal-doc td { border: 1px solid currentColor !important; padding: 4pt; }
  /* Paper has no hyperlinks. Print the destination of external ones. */
  .legal-doc a[href^="http"]::after { content: " <" attr(href) ">"; font-size: 0.85em; word-break: break-all; }
}
`

/* ------------------------------------------------------------------ template */

export interface LegalPageTemplateProps {
  doc: LegalDoc
}

/**
 * Server component. Zero client JS, zero framer-motion (Rule 10).
 *
 * Expects to be rendered inside `PageShell`, which owns the `<main>` element and
 * its `pt-[calc(var(--nav-h)+1rem)]` navbar clearance. Adding clearance here too
 * would double it.
 *
 * Mobile is the hard case and drove the layout: the header and the router come
 * first, the TOC is A2's collapsed `<details>` so it never eats the first screen,
 * and the body follows in one column at a 65ch measure. `lg` only MOVES the TOC
 * into a sticky rail — no content appears or disappears at any breakpoint (Rule 8).
 */
export default function LegalPageTemplate({ doc }: LegalPageTemplateProps) {
  const toc = tocOf(doc)

  return (
    <SectionWrapper id="legal" density="tight" width="wide" className="legal-page">
      <style href="legal-page" precedence="default">
        {CSS}
      </style>

      <header className="legal-head max-w-[65ch]">
        {/* Type strings are the contract's §2.3 table verbatim — h1, body-sm, lede. */}
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {doc.h1}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Version {doc.version}
          <span aria-hidden> · </span>
          {doc.effective ? 'Effective from ' : 'Last updated '}
          <time dateTime={doc.effective ?? doc.updated}>{fmt(doc.effective ?? doc.updated)}</time>
          {doc.effective && (
            <>
              <span aria-hidden> · </span>
              Last updated <time dateTime={doc.updated}>{fmt(doc.updated)}</time>
            </>
          )}
        </p>
        {doc.lede && (
          <p className="mt-6 text-lg leading-relaxed text-pretty text-text-secondary sm:text-xl">
            {inline(doc.lede)}
          </p>
        )}
      </header>

      {doc.router && (
        <section aria-labelledby="which-part-applies" className="legal-head mt-10 max-w-[65ch]">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl" id="which-part-applies">
            Which part applies to you
          </h2>
          {/* A description list, not a table: two columns of prose wrap badly at
              360px, and a <dl> reflows to a stack for free. */}
          <dl className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {doc.router.map((r, i) => (
              <div key={i} className="p-4 sm:p-6">
                <dt className="text-base font-semibold text-text-primary sm:text-lg">{inline(r.when)}</dt>
                <dd className="mt-1 text-base leading-relaxed text-pretty text-text-secondary sm:text-lg">
                  {inline(r.then)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* `grid-cols-[minmax(0,1fr)]` at the base breakpoint is load-bearing, not
          decoration — the twin of the wrapper in src/app/insights/[slug]/page.tsx,
          which carries the full derivation. Declaring columns only at lg leaves
          one implicit `auto` track whose minimum is the item's min-content, and
          Prose gives every table `width: max-content`, so a legal doc with a
          table blows the track out to the 65ch cap inside a phone viewport.
          Measured on /privacy/ at 390px: gridTemplateColumns 688.688px and
          documentElement scrollWidth 704 vs clientWidth 382. Change both. */}
      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[16rem_minmax(0,65ch)] lg:items-start lg:gap-x-16">
        <TableOfContents items={toc} title="Contents" />
        <Prose as="article" className="legal-doc">
          <Blocks blocks={doc.body} />
        </Prose>
      </div>
    </SectionWrapper>
  )
}
