import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { CtaBand, Pill, Prose, SectionWrapper, TableOfContents } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { AUTHOR, insightBySlug, readingMinutes, tocOf, wordCount } from '@/data/insights'
import type { Block, Item } from '@/data/legal/types'
import { insightSlugs } from '@/data/routes'
import { articleLd, graphLd } from '@/lib/schema'
import { SITE_URL, pageMeta } from '@/lib/seo'

/* ------------------------------------------------------------------ inline */

/**
 * The same inline subset the legal documents use — `**bold**`, `*italic*`,
 * `` `code` ``, `[text](href)` — because the article bodies are the same
 * `Block` tree. Alternation order is load-bearing: `**` must be tried before
 * `*`, or bold matches as two italics.
 *
 * Internal hrefs go through `next/link`; external ones get `rel="noopener"`.
 * No HTML is ever injected — this builds React elements.
 */
const INLINE = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g

function inline(text: string, base = ''): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    const at = m.index
    if (at > last) out.push(text.slice(last, at))
    const key = `${base}i${at}`
    if (m[1] !== undefined) out.push(<strong key={key}>{inline(m[1], key)}</strong>)
    else if (m[2] !== undefined) out.push(<em key={key}>{inline(m[2], key)}</em>)
    else if (m[3] !== undefined) out.push(<code key={key}>{m[3]}</code>)
    else {
      const href = m[5] ?? '#'
      const label = inline(m[4] ?? '', key)
      out.push(
        /^https?:/.test(href) ? (
          <a key={key} href={href} rel="noopener">
            {label}
          </a>
        ) : (
          <Link prefetch={false} key={key} href={href}>
            {label}
          </Link>
        ),
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

/**
 * Headings carry no className on purpose: `Prose` legislates article heading
 * sizes through its own `[&_h2]` / `[&_h3]` rules, and a utility class on the
 * element loses to that descendant selector anyway. Same arrangement as
 * `LegalPageTemplate`.
 *
 * `c` (numbered contract clause) is a legal-document block and never appears in
 * an article, so it falls through to null rather than growing a renderer nobody
 * calls.
 */
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

          case 'ul':
            return (
              <ul key={i}>
                <ListItems items={b.items} />
              </ul>
            )

          case 'ol':
            return (
              <ol key={i}>
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
            // four-column table cannot push the page sideways at 320px (Rule 4).
            return (
              <table key={i}>
                {b.caption && (
                  <caption className="pb-2 text-left text-sm text-text-secondary">
                    {inline(b.caption)}
                  </caption>
                )}
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
              <aside
                key={i}
                className="rounded-2xl border border-border bg-surface p-4 [&>*+*]:mt-3 sm:p-6"
              >
                {b.t && <p className="font-semibold text-text-primary">{inline(b.t)}</p>}
                {b.body.map((p, j) => (
                  <p key={j}>{inline(p)}</p>
                ))}
              </aside>
            )

          case 'hr':
            return <hr key={i} />

          default:
            return null
        }
      })}
    </>
  )
}

/* --------------------------------------------------------------------- page */

// `timeZone: 'UTC'` is load-bearing, not decoration. `fmt` parses the ISO date as
// UTC midnight; without this option Intl renders it in the BUILD MACHINE's zone,
// so on any host west of UTC the visible byline is a day earlier than the
// `datePublished` in this page's own Article JSON-LD, and the value changes with
// wherever CI happens to run. Verified: '2026-08-26' printed "25 August 2026" on
// America/Los_Angeles beside `"datePublished":"2026-08-26"`.
const DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const fmt = (iso: string) => DATE.format(new Date(`${iso}T00:00:00Z`))

type Params = { params: Promise<{ slug: string }> }

/** Required under `output: 'export'` — nothing is rendered on demand. */
export function generateStaticParams() {
  return insightSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = insightBySlug((await params).slug)
  if (!a) return {}
  return pageMeta({
    path: a.path,
    title: a.metaTitle,
    description: a.metaDescription,
    type: 'article',
  })
}

export default async function InsightPage({ params }: Params) {
  const a = insightBySlug((await params).slug)
  if (!a) notFound()

  const minutes = readingMinutes(a)
  const updated = a.dateModified !== a.datePublished

  return (
    <PageShell crumbs={[{ label: 'Insights', href: '/insights/' }, { label: a.label }]}>
      <JsonLd
        data={graphLd({
          ...articleLd({
            path: a.path,
            headline: a.title,
            description: a.metaDescription,
            datePublished: a.datePublished,
            dateModified: a.dateModified,
          }),
          // Overrides articleLd's default author reference: the name is a real
          // named Person with a url that resolves to a bio, which is what
          // Google's Article guidance asks for. Nothing else goes in `name`.
          author: { '@type': 'Person', name: AUTHOR.name, url: `${SITE_URL}${AUTHOR.url}` },
          isPartOf: { '@id': `${SITE_URL}/insights/#blog` },
          about: a.about.map((name) => ({ '@type': 'Thing', name })),
          keywords: a.tags.join(', '),
          wordCount: wordCount(a),
          timeRequired: `PT${minutes}M`,
        })}
      />

      <SectionWrapper density="tight" width="wide">
        <header className="max-w-[65ch]">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {a.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            By{' '}
            <Link
              prefetch={false}
              href={AUTHOR.url}
              className="rounded-lg underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {AUTHOR.name}
            </Link>
            <span aria-hidden> · </span>
            <time dateTime={a.datePublished}>{fmt(a.datePublished)}</time>
            {updated && (
              <>
                <span aria-hidden> · </span>
                Updated <time dateTime={a.dateModified}>{fmt(a.dateModified)}</time>
              </>
            )}
            <span aria-hidden> · </span>
            {minutes} min read
          </p>

          {/* The extractable answer. First paragraph on the page, stands alone. */}
          <p className="mt-6 text-lg leading-relaxed text-pretty text-text-secondary sm:text-xl">
            {a.answer}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <li key={t}>
                <Pill variant="outline">{t}</Pill>
              </li>
            ))}
          </ul>
        </header>

        {/* lg only MOVES the contents into a sticky rail. Nothing appears or
            disappears at any breakpoint (Rule 8).

            `grid-cols-[minmax(0,1fr)]` at the base breakpoint is load-bearing,
            not decoration. Declaring columns only at lg leaves one implicit
            `auto` track below it, whose minimum is the grid item's min-content,
            and Prose gives every table `width: max-content` — so an article with
            a table resolves that minimum to the table's natural width and the
            track blows out to the 65ch cap inside a phone viewport. All four
            articles have a table and all four scrolled sideways. Measured on
            /insights/moldova-it-park-single-tax-explained/: gridTemplateColumns
            688.688px, documentElement scrollWidth 704 vs clientWidth 492; after,
            460px and 492 vs 492. Same expression as LegalPageTemplate's wrapper
            — change both together. */}
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[16rem_minmax(0,65ch)] lg:items-start lg:gap-x-16">
          <TableOfContents items={tocOf(a)} title={`Contents: ${a.label}`} />
          <Prose as="article">
            <Blocks blocks={a.body} />
          </Prose>
        </div>
      </SectionWrapper>

      <CtaBand
        title="Have a question this did not answer?"
        body="Good questions become posts, and you get the answer before it is published."
        primary={{ label: 'Email us a question', href: `mailto:${siteConfig.email}?subject=Question` }}
        secondary={{ label: 'Read more insights', href: '/insights/' }}
      />
    </PageShell>
  )
}
