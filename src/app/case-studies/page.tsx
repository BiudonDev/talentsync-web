import type { ReactNode } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Button, ComparisonTable, CtaBand, Faq, SectionWrapper } from '@/components/ui'
import { PLACED_ENGINEERS, caseHref, caseStudies, type CaseStudy } from '@/data/case-studies'
import { siteConfig } from '@/data/content'
import { graphLd, itemListLd, WEBSITE_ID } from '@/lib/schema'
import { absUrl, pageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'

/**
 * `/case-studies/` — the evidence hub, and the page that carries the placement
 * ledger (02-page-content.md §12).
 *
 * Server component, zero framer-motion, zero state (Rule 10). Every fact comes
 * from `src/data/case-studies.ts`, which is where the D7 claim rules are
 * enforced and documented; this file only lays it out.
 *
 * Three structural decisions worth knowing before editing:
 *
 * 1. THE LEDGER IS THE PAGE. One `<table>` in one DOM tree, six columns, ten
 *    rows, restacked into labelled cards under `sm` by `ComparisonTable`. Not a
 *    mobile list plus a desktop table — that ships the body twice for Google to
 *    parse and is exactly the defect the 10-mobile-audit flagged on the old
 *    homepage carousel.
 * 2. TESTIMONIALS SIT INSIDE THEIR OWN ENTRY, not in a separate "What our
 *    clients said" band. §12's outline asks for both ("each placed next to its
 *    own case entry"), and a quote next to the engagement it describes is worth
 *    more than a wall of three quotes — and cannot be double-rendered.
 * 3. NO `FAQPage` JSON-LD. DECISIONS.md D6 emits it on `/` only. The visible
 *    `<details>` FAQ still renders, so the answers are in the raw HTML for
 *    Ctrl-F and for crawlers. It is the markup that is withheld, not the copy.
 *
 * Breadcrumbs — visible and JSON-LD — belong to `PageShell`. Do not add a
 * second BreadcrumbList here.
 */

const PATH = '/case-studies/'

export const metadata = pageMeta({
  path: PATH,
  title: 'Case Studies: Engineers We Placed | TalentSync',
  description:
    'Ten named engagements: role, stack, time to signature and outcome. New Era Visionary Group, OptimEyes, SocialBee, Silvertalent, Qualiwise, Foodamigos.',
})

// 00-design-contract §2.3 roles. Heading classes are written out as literals at
// every use site because check 4 of scripts/check-design-contract.mjs reads the
// className attribute textually and fails a heading whose classes it cannot see.
const LEDE = 'text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty'
const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const CAPTION = 'text-xs font-medium uppercase tracking-wide text-text-secondary'
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/** Inline text link with a 44px hit box grown by padding, not by type size (Rule 3). */
const TEXT_LINK = cn(
  'inline-flex min-h-11 items-center rounded-lg py-2 font-medium text-primary hover:text-primary-light',
  FOCUS,
)

const LEDGER_COLUMNS = [
  'Client',
  'Sector',
  'Role placed',
  'Stack',
  'Time to signature',
  'TalentSync’s role',
]

/**
 * The one global timing qualifier (06-claims-measurement.md row 16). Defining
 * the clock once here is the lazy fix for four separate "within N weeks"
 * claims — it is cheaper than hedging every row and it is harder to drift.
 */
const LEDGER_CAPTION =
  'Timings are measured from agreed role brief to signed offer, for the engagements shown. Your timeline depends on role scarcity and your interview schedule.'

const FAQS = [
  {
    q: 'Can we speak to a reference before signing?',
    a: 'Yes, for engagements where the client has agreed to it, and we will tell you plainly which ones have not. A reference call is arranged before you commit, not after, and we do not sit on the call. Anyone who will not connect you to a reference is telling you something.',
  },
  {
    q: 'Why are some of these entries short?',
    a: 'Because they are honest. Several of these engagements were a single placement, and a single placement does not justify a thousand words of narrative. We would rather publish ten accurate short entries than three inflated ones, and everything stated here is something the client would confirm.',
  },
  {
    q: 'Are these placements or projects you delivered?',
    a: 'Mostly placements, with one exception flagged in its own entry: an advisory engagement where no engineer was placed. The New Era Visionary Group entry is different again — a dedicated team we assembled and TalentSync’s own software development outsourcing model, which is why it reads as a team delivery rather than an individual hire. Every entry states what TalentSync actually did.',
  },
  {
    q: 'Do you have clients in our sector?',
    a: 'The record spans consumer mobile, telecoms, social media SaaS, food delivery, HR technology, AI tooling and industrial automation, so probably yes in spirit and possibly not exactly. Sector familiarity matters less than stack and seniority in our experience, and we will say so rather than manufacture a match.',
  },
  {
    q: 'How current are these engagements?',
    a: 'Some engineers are still working with the client and some engagements have ended normally, which is what a real record looks like. We are not printing a date against each entry until the client has confirmed we may, so ask on a call and we will tell you when a given engagement ran. We update this page when a placement closes rather than on a marketing schedule, so a quiet quarter shows as a quiet quarter.',
  },
]

/** 02-page-content.md §12. The three draft role pages are omitted — D1.1 forbids inbound links to them. */
const NEXT_LINKS = [
  { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
  { anchor: 'backend developers', href: '/hire-backend-developers/' },
  { anchor: 'recruiting in Moldova', href: '/technical-recruitment-moldova/' },
  { anchor: 'how our search process runs', href: '/hire-software-developers-eastern-europe/' },
  { anchor: 'the B2B contract structure', href: '/b2b-engineer-recruitment/' },
  { anchor: 'software development outsourcing', href: '/software-development-outsourcing/' },
]

/**
 * `alt=""` is deliberate and correct: the client's name is the `<h3>` directly
 * beside the mark, so a described logo would only duplicate the accessible name.
 *
 * `images.unoptimized: true` means `next/image` emits a bare `<img>` anyway, so
 * this is one, with a hand-built `srcSet` (Rule 9).
 *
 * Feedback item 26: this used to serve the full-size source file directly — up
 * to 126,030 B for a mark displayed at roughly 120px wide. `-384.webp` and
 * `-768.webp` derivatives exist beside every logo now (the same pipeline
 * `sections/CaseStudies.tsx` already used), so this component reads them
 * instead. `width`/`height` stay the SOURCE file's native dimensions — that is
 * the aspect-ratio hint the browser reserves layout space against, and it is
 * the same ratio the derivatives were resized to, so it stays correct even
 * though the bytes it loads are the small file.
 *
 * `bg-text-primary` on the plate is not a mistake. Several of the ten marks are
 * dark ink on white and vanish on `bg-surface`; §2.2 has no light-surface token,
 * and `--color-text-primary` (#F5F5F5) is the table's only near-white. Rule 2
 * forbids reaching outside the token table for a colour, so the off-white token
 * is used as an off-white plate. Swap it the day §2.2 grows a real one.
 *
 * `logo` is optional (case-studies.ts): a client whose mark has not been
 * supplied yet (Vinlivt, at launch) renders as a text mark instead of a
 * placeholder image, matching the homepage carousel's fallback.
 */
const logoBase = (src: string) => src.replace(/\.[a-z]+$/i, '')
const logoSrcSet = (src: string) => `${logoBase(src)}-384.webp 384w, ${logoBase(src)}-768.webp 768w`

function ClientMark({ study }: { study: CaseStudy }) {
  const { logo, client } = study
  if (!logo) {
    return (
      <div className="inline-flex h-10 items-center rounded-lg bg-surface px-3 sm:h-12">
        <span className="text-base font-bold tracking-tight text-gradient">{client}</span>
      </div>
    )
  }
  return (
    <div
      className={cn('inline-flex items-center rounded-lg p-2', !logo.bg && logo.plate && 'bg-text-primary')}
      style={logo.bg ? { backgroundColor: logo.bg } : undefined}
    >
      <img
        src={`${logoBase(logo.src)}-384.webp`}
        srcSet={logoSrcSet(logo.src)}
        sizes="120px"
        width={logo.width}
        height={logo.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-10 w-auto max-w-[8rem] object-contain sm:h-12"
      />
    </div>
  )
}

function Entry({ study }: { study: CaseStudy }) {
  return (
    <article
      id={study.slug}
      className="grid gap-5 border-t border-border pt-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"
    >
      <div>
        <ClientMark study={study} />
        <h3 className="text-xl sm:text-2xl font-bold mt-4">{study.client}</h3>
        <p className={cn('mt-2', CAPTION)}>{study.sector}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-semibold text-text-primary">Role placed</dt>
            <dd className="text-text-secondary">{study.rolesPlaced}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text-primary">Time to signature</dt>
            <dd className="text-text-secondary">{study.timeToSignature}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-4">
        {study.exception && (
          <p className="rounded-xl border border-border bg-surface p-4 text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Not a placement. </span>
            {study.exception}
          </p>
        )}

        {study.body.map((p, i) => (
          <p key={i} className={BODY}>
            {p}
          </p>
        ))}

        {study.testimonial && (
          <figure className="rounded-2xl border-l-4 border-primary bg-surface p-5 sm:p-6">
            <blockquote className="text-base leading-relaxed text-text-primary text-pretty sm:text-lg">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">{study.testimonial.author}</span>
              {` — ${study.testimonial.role}`}
            </figcaption>
          </figure>
        )}

        {study.detail && (
          <Link prefetch={false} href={caseHref(study)} className={TEXT_LINK}>
            {`Read the full ${study.client} case study`}
          </Link>
        )}
      </div>
    </article>
  )
}

export default function CaseStudiesPage() {
  const bands: { id: string; content: ReactNode }[] = [
    {
      id: 'ledger',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            The record at a glance
          </h2>
          <p className={cn('mt-4 max-w-3xl', BODY)}>
            One row per engagement. One of the ten is not a placement and is marked as such in its
            entry below — an advisory engagement where no engineer was placed.
          </p>
          <ComparisonTable
            className="mt-8"
            caption={LEDGER_CAPTION}
            showCaption
            columns={LEDGER_COLUMNS}
            rows={caseStudies.map((c) => ({
              label: c.client,
              cells: [c.sector, c.rolesPlaced, c.stack, c.timeToSignature, c.talentsyncRole],
            }))}
          />
        </>
      ),
    },
    {
      id: 'engagements',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Every engagement in detail
          </h2>
          <div className="mt-8 space-y-10">
            {caseStudies.map((study) => (
              <Entry key={study.slug} study={study} />
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'faq',
      // No FAQPage markup — D6 emits it on `/` only.
      content: <Faq heading="Frequently asked questions" name="case-faq" items={FAQS} />,
    },
    {
      id: 'related',
      content: (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Where to go next
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {NEXT_LINKS.map((link) => (
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
    <PageShell crumbs={[{ label: 'Case Studies' }]}>
      <JsonLd
        data={graphLd(
          {
            '@type': 'CollectionPage',
            '@id': `${absUrl(PATH)}#webpage`,
            url: absUrl(PATH),
            name: 'Case Studies: Engineers We Placed',
            isPartOf: { '@id': WEBSITE_ID },
            inLanguage: 'en',
          },
          // Zero rich results exist for this (07-schema-aeo.md §3.6) — it is
          // emitted purely so a retrieval system gets ten discrete, attributable
          // engagement records instead of a wall of prose.
          itemListLd({
            id: `${absUrl(PATH)}#list`,
            name: 'TalentSync client engagements',
            items: caseStudies.map((c) => ({
              name: `${c.client} — ${c.sector}`,
              path: caseHref(c),
              description: c.summary,
            })),
          }),
        )}
      />

      {/* Interior hero — §4.3, NOT full-viewport. PageShell supplies the nav clearance. */}
      <header className="hero-glow bg-background-alt pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Engineers We Have Placed
          </h1>
          <p className={cn('mt-6 max-w-3xl', LEDE)}>
            {PLACED_ENGINEERS} engineers placed with named client companies, from a Senior Python
            Developer at Qualiwise filled in one week to a dedicated seven-person team assembled
            for New Era Visionary Group. Ten engagements are listed below. Each states the client,
            the role, the stack, the time from brief to signature, and what the engineers worked on.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={siteConfig.calendlyUrl} external>
              Book A Meeting
            </Button>
            <Button variant="secondary" href="/contact/">
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
        title="Ask us about one of these"
        body="Pick the engagement closest to your situation and we will walk you through what actually happened, including what did not go smoothly."
        secondary={{ label: 'Contact us', href: '/contact/' }}
      />
    </PageShell>
  )
}
