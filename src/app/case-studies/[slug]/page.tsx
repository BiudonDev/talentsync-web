import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Card, CtaBand, SectionWrapper } from '@/components/ui'
import { getCaseStudy, PUBLISHED, type CaseStudy, type CaseStudyDetail } from '@/data/case-studies'
import { caseSlugs } from '@/data/routes'
import { articleLd, graphLd, ORG_ID } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'

/**
 * `/case-studies/[slug]/` — the three engagements with enough on record to earn
 * their own URL (DECISIONS.md D1 row 13; the slugs are frozen in
 * `src/data/routes.ts` as `caseSlugs`).
 *
 * `generateStaticParams` is REQUIRED under `output: 'export'` — without it the
 * build hard-fails on the dynamic segment rather than emitting nothing.
 *
 * Server component, zero framer-motion (Rule 10). Copy lives in
 * `src/data/case-studies.ts`, which is where D7 is enforced: every sentence
 * describes what the engineer we placed worked on, never what the client
 * shipped. Read the header of that file before editing a word here.
 *
 * Schema: `BlogPosting` (a subtype of `Article` — there is no `CaseStudy` type
 * in schema.org, 07-schema-aeo.md line 118) with `about` pointing at the client
 * Organization, authored and published by TalentSync. NEVER `Review` or
 * `aggregateRating` (D6) — the testimonial renders as plain HTML.
 *
 * Breadcrumbs, visible and JSON-LD, belong to `PageShell`.
 */

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return caseSlugs.map((slug) => ({ slug }))
}

/**
 * `caseSlugs` is the only source of params and `case-studies.ts` asserts at
 * module load that every one of them has a `detail` block, so this cannot miss
 * at build time. It throws rather than calling `notFound()` because under
 * `output: 'export'` a silent 404 here would mean a route in the frozen table
 * quietly stopped existing.
 */
function load(slug: string): CaseStudy & { detail: CaseStudyDetail } {
  const study = getCaseStudy(slug)
  if (!study?.detail) throw new Error(`/case-studies/${slug}/: no case study with a detail block.`)
  return study as CaseStudy & { detail: CaseStudyDetail }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const { detail } = load(slug)
  return pageMeta({
    path: `/case-studies/${slug}/`,
    title: detail.metaTitle,
    description: detail.metaDescription,
    type: 'article',
  })
}

// 00-design-contract §2.3. Heading classes stay literal at every use site —
// check 4 of scripts/check-design-contract.mjs reads the attribute textually.
const LEDE = 'text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty'
const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const TEXT_LINK = cn(
  'inline-flex min-h-11 items-center rounded-lg py-2 font-medium text-primary hover:text-primary-light',
  FOCUS,
)

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const study = load((await params).slug)
  const { detail } = study
  const path = `/case-studies/${study.slug}/`

  const facts: [string, string][] = [
    ['Client', study.client],
    ['Sector', study.sector],
    ['Role placed', study.rolesPlaced],
    ['Stack', study.stack],
    ['Time to signature', study.timeToSignature],
    ['TalentSync’s role', study.talentsyncRole],
  ]

  const bands: { id: string; content: ReactNode }[] = [
    {
      id: 'at-a-glance',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            The engagement at a glance
          </h2>
          <Card hover={false} className="mt-8">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                    {term}
                  </dt>
                  <dd className="mt-1 font-semibold text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-sm text-text-secondary text-pretty">
              Time to signature is measured from the agreed role brief to the signed offer, for this
              engagement. It is a record, not a service level.
            </p>
          </Card>

          {study.testimonial && (
            <figure className="mt-8 rounded-2xl border-l-4 border-primary bg-surface p-5 sm:p-6">
              <blockquote className="text-base leading-relaxed text-text-primary text-pretty sm:text-lg">
                “{study.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">{study.testimonial.author}</span>
                {` — ${study.testimonial.role}`}
              </figcaption>
            </figure>
          )}
        </>
      ),
    },

    ...detail.sections.map((section) => ({
      id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {section.heading}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {section.body.map((p, i) => (
              <p key={i} className={BODY}>
                {p}
              </p>
            ))}
          </div>
        </>
      ),
    })),

    {
      id: 'related',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Where to go next
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              ...detail.links,
              { anchor: 'The full placement record', href: '/case-studies/' },
            ].map((link) => (
              <li key={link.href}>
                <Link prefetch={false} href={link.href} className={cn(TEXT_LINK, 'w-full')}>
                  {link.anchor}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ]

  return (
    <PageShell
      crumbs={[{ label: 'Case Studies', href: '/case-studies/' }, { label: study.client }]}
    >
      <JsonLd
        data={graphLd({
          ...articleLd({
            path,
            headline: detail.h1,
            description: detail.metaDescription,
            datePublished: PUBLISHED,
          }),
          // The engagement's subject is the client, and the write-up's author is
          // the company, not the founder's Person node.
          author: { '@id': ORG_ID },
          about: { '@type': 'Organization', name: study.client },
        })}
      />

      {/* Interior hero — §4.3. PageShell supplies the nav clearance. */}
      <header className="hero-glow bg-background-alt pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Case study
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mt-3">
            {detail.h1}
          </h1>
          <p className={cn('mt-6 max-w-3xl', LEDE)}>{detail.lede}</p>
        </div>
      </header>

      {bands.map((b, i) => (
        <SectionWrapper key={b.id} id={b.id} band={i % 2 === 1}>
          {b.content}
        </SectionWrapper>
      ))}

      <CtaBand
        title={`Ask us about the ${study.client} engagement`}
        body="We will walk you through what actually happened, including what did not go smoothly, and tell you honestly whether your role is one we can fill."
        secondary={{ label: 'See every engagement', href: '/case-studies/' }}
      />
    </PageShell>
  )
}
