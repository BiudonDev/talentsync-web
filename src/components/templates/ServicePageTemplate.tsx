import type { ReactNode } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import {
  Button,
  Card,
  ComparisonTable,
  CtaBand,
  Faq,
  Pill,
  SectionWrapper,
  StatTile,
  TableOfContents,
} from '@/components/ui'
import { ENGAGEMENT_MODELS, type ServiceBlock, type ServicePage } from '@/data/services/types'
import { articleLd, graphLd, serviceLd } from '@/lib/schema'
import { href } from '@/lib/seo'
import { cn } from '@/lib/utils'

/**
 * The one template behind eleven service and location routes.
 *
 * Server component, zero framer-motion, zero state (Rule 10). Every string it
 * renders comes from `ServicePage` data, so adding a page is a data edit.
 *
 * Three layout decisions worth knowing before editing:
 *
 * 1. INTERIOR HERO, not `min-h-screen` (00-design-contract §4.3). A full-height
 *    hero pushes the answer paragraph below the fold on every phone, and that
 *    paragraph is the whole point of the page.
 * 2. ONE grid, `grid-column`-placed (§4.4). Source order is the mobile order,
 *    so the sidebar lands straight after the intro where it converts rather
 *    than at the bottom of a 2,200-word page. `lg:items-start` is load-bearing:
 *    a row-spanning grid item defaults to `align-self: stretch` and a stretched
 *    item cannot be sticky.
 * 3. BAND ALTERNATION (§4.1). Sections are collected into one ordered array and
 *    rendered with `band={i % 2 === 1}`, so the hero (banded) is followed by a
 *    plain section and it alternates from there. Four consecutive bands is what
 *    ships today and it reads as one flat page.
 *
 * NO `FAQPage` JSON-LD. DECISIONS.md D6 emits it on `/` only. The visible
 * `<details>` FAQ still renders here — it is the markup that is withheld, not
 * the content.
 *
 * NO BREADCRUMBS EITHER, visible or JSON-LD. `layout/PageShell.tsx` already
 * renders both from its own `crumbs` prop, and two BreadcrumbList nodes on one
 * page is a structured-data defect. The route wraps this template in PageShell
 * and passes the trail there:
 *
 *   <PageShell crumbs={[{ label: page.label }]}>
 *     <ServicePageTemplate page={page} />
 *   </PageShell>
 *
 * PageShell also supplies the nav clearance (`pt-[calc(var(--nav-h)+1rem)]` on
 * `<main>`), so the hero's `pt-28` below is breathing room, not clearance.
 */

// 00-design-contract §2.3 roles. Heading strings are deliberately NOT hoisted
// into constants here: check 4 of scripts/check-design-contract.mjs reads the
// className attribute textually and fails a heading whose classes it cannot see
// ("<h2> has no static className"). So every h1/h2/h3 below carries its §2.3 row
// as a literal, and only the non-heading roles are constants.
const LEDE = 'text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty'
const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const CAPTION = 'text-xs font-medium uppercase tracking-wide text-text-secondary'
const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Inline text link. `min-h-11` + `py-2` grow the HIT BOX to 44px without
 * touching the type size (Rule 3). No `-mx-2`: these links sit in a `gap-2`
 * grid, and a negative inline margin would eat the 8px between neighbours that
 * the same rule requires.
 */
const TEXT_LINK = cn(
  'inline-flex min-h-11 items-center rounded-lg py-2 font-medium text-primary hover:text-primary-light',
  FOCUS,
)

function Paragraphs({ body, className }: { body: string[]; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {body.map((p, i) => (
        <p key={i} className={BODY}>
          {p}
        </p>
      ))}
    </div>
  )
}

function BodyBlock({ block }: { block: ServiceBlock }) {
  const heading = block.heading ? <h3 className="text-xl sm:text-2xl font-bold mb-4">{block.heading}</h3> : null

  switch (block.kind) {
    case 'list':
      return (
        <div>
          {heading}
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className={cn('flex gap-3', BODY)}>
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'cards':
      return (
        <div>
          {heading}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {block.items.map((item) => (
              <Card key={item.title} className="h-full">
                <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                <p className={cn('mt-3', BODY)}>{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      )

    case 'stats':
      return (
        <div>
          {heading}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item) => (
              <StatTile key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      )

    case 'table':
      return (
        <div>
          {heading}
          <ComparisonTable
            caption={block.caption}
            columns={block.columns}
            rows={block.rows}
            showCaption
          />
        </div>
      )

    default:
      return (
        <div>
          {heading}
          <Paragraphs body={block.body} />
        </div>
      )
  }
}

export interface ServicePageTemplateProps {
  page: ServicePage
}

export default function ServicePageTemplate({ page }: ServicePageTemplateProps) {
  const path = `/${page.slug}/`

  // BreadcrumbList belongs to PageShell — see the note at the top of the file.
  const schema: object[] = []
  if (page.schemaTypes.includes('Service')) {
    schema.push(
      serviceLd({
        path,
        name: page.label,
        serviceType: page.serviceType,
        description: page.metaDescription,
        audience: page.whoFor.audience,
      }),
    )
  }
  if (page.schemaTypes.includes('Article') && page.article) {
    schema.push(
      articleLd({
        path,
        headline: page.h1,
        description: page.metaDescription,
        datePublished: page.article.datePublished,
        dateModified: page.article.dateModified,
        author: page.article.author,
      }),
    )
  }

  // ---------------------------------------------------------------------
  // One ordered list of full-width sections, so §4.1 alternation is a single
  // `i % 2 === 1` rather than a hand-maintained background per section.
  // ---------------------------------------------------------------------
  const bands: { id: string; content: ReactNode }[] = [
    { id: 'overview', content: <Overview page={page} /> },

    ...page.sections.map((section) => ({
      id: section.id,
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">{section.heading}</h2>
          <div className="mt-8 space-y-10">
            {section.blocks.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>
        </>
      ),
    })),
  ]

  if (page.evidence.length > 0) {
    bands.push({
      id: 'placements',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Placements on record</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {page.evidence.map((item) => (
              <Card key={`${item.client}-${item.role}`} className="h-full">
                <p className={CAPTION}>
                  {item.count === 1 ? '1 engineer' : `${item.count} engineers`}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">{item.client}</h3>
                <p className="mt-1 font-semibold text-text-primary">{item.role}</p>
                <p className={cn('mt-3', BODY)}>{item.outcome}</p>
                {item.href && (
                  <Link href={href(item.href)} prefetch={false} className={cn(TEXT_LINK, 'mt-4')}>
                    Read the {item.client} case study
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </>
      ),
    })
  }

  bands.push({
    id: 'faq',
    // No FAQPage markup here — D6 emits it on `/` only. The answers are still
    // in the raw HTML inside <details>, so Ctrl-F and crawlers both see them.
    content: (
      <Faq
        heading="Frequently asked questions"
        items={page.faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />
    ),
  })

  bands.push({
    id: 'related',
    content: (
      <>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Where to go next</h2>
        <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {page.internalLinks.map((link) => (
            <li key={link.href}>
              <Link href={href(link.href)} prefetch={false} className={cn(TEXT_LINK, 'w-full')}>
                {link.anchor}
              </Link>
            </li>
          ))}
        </ul>
      </>
    ),
  })

  return (
    <>
      {schema.length > 0 && <JsonLd data={graphLd(...schema)} />}

      {/* Interior hero — §4.3, NOT `min-h-screen`. Padding is the contract's
          verbatim value; PageShell's breadcrumb strip now sits above it, so the
          combined offset is a screenshot-review item (§8.3). */}
      <header className="hero-glow bg-background-alt pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {page.h1}
          </h1>
          <p className={cn('mt-6 max-w-2xl', LEDE)}>{page.answerParagraph}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={page.cta.primary.href} external={page.cta.primary.external}>
              {page.cta.primary.label}
            </Button>
            <Button variant="secondary" href={href('/contact')}>
              Talk to us
            </Button>
          </div>
        </div>
      </header>

      {bands.map((b, i) => (
        <SectionWrapper key={b.id} id={b.id} band={i % 2 === 1}>
          {b.content}
        </SectionWrapper>
      ))}

      <CtaBand
        title={page.cta.heading}
        body={page.cta.body}
        primary={page.cta.primary}
        secondary={page.cta.secondary ?? { label: 'Contact us', href: href('/contact') }}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// The §4.4 grid. ONE DOM tree: intro at row 1, the sticky aside spanning both
// rows in column 2, the rest of the intro material at row 2. On mobile there is
// no grid at all, so the source order — intro, aside, detail — IS the reading
// order, and the CTA sits right after the problem statement.
// ---------------------------------------------------------------------------

function Overview({ page }: { page: ServicePage }) {
  const models = page.engagementModels.map((key) => ENGAGEMENT_MODELS[key])
  const showToc = page.sections.length >= 4

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-x-16">
      <div className="space-y-12 lg:col-start-1 lg:row-start-1">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Who this is for</h2>
          <Paragraphs body={page.whoFor.body} className="mt-6" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">The hiring problem</h2>
          <Paragraphs body={page.problem} className="mt-6" />
        </div>
      </div>

      <aside
        aria-label="Page summary"
        className="space-y-6 lg:sticky lg:top-[calc(var(--nav-h)+1rem)] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start"
      >
        <Card hover={false}>
          {/* A caption, not a heading: this card is a summary rail, and giving it
              an <h2> would either skip a level or drop a display-sized heading
              into a 20rem column. */}
          <p className={CAPTION}>At a glance</p>
          <p className={cn('mt-3', BODY)}>{page.coverage.summary}</p>
          {page.coverage.countries.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {page.coverage.countries.map((country) => (
                <li key={country}>
                  <Pill variant="outline">{country}</Pill>
                </li>
              ))}
            </ul>
          )}
          <Button
            href={page.cta.primary.href}
            external={page.cta.primary.external}
            className="mt-6 w-full"
          >
            {page.cta.primary.label}
          </Button>
        </Card>

        {showToc && (
          <TableOfContents
            items={page.sections.map((s) => ({ id: s.id, label: s.heading }))}
            className="lg:static"
          />
        )}
      </aside>

      <div className="space-y-12 lg:col-start-1 lg:row-start-2">
        {models.length > 0 && (
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">How engineers are engaged</h2>
            <div className="mt-6 grid grid-cols-1 gap-6">
              {models.map((model) => (
                <Card key={model.title}>
                  <h3 className="text-xl sm:text-2xl font-bold">{model.title}</h3>
                  <p className={cn('mt-3', BODY)}>{model.body}</p>
                  <Link href={href(model.href)} prefetch={false} className={cn(TEXT_LINK, 'mt-3')}>
                    {model.linkAnchor}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(page.stacks.length > 0 || page.seniorities.length > 0) && (
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Technologies and seniority</h2>

            {page.stacks.length > 0 && (
              <div className="mt-6 space-y-5">
                {page.stacks.map((group) => (
                  <div key={group.group}>
                    <p className={CAPTION}>{group.group}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Pill variant="outline">{item}</Pill>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {page.seniorities.length > 0 && (
              <dl className="mt-8 space-y-5">
                {page.seniorities.map((level) => (
                  <div key={level.label}>
                    <dt className="font-semibold text-text-primary">{level.label}</dt>
                    <dd className={cn('mt-1', BODY)}>{level.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
