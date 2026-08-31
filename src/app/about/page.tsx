import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Card, CtaBand, Faq, SectionWrapper } from '@/components/ui'
import { FOUNDED_YEAR, companyDetails, facts, faqs, founder, principles } from '@/data/about'
import { EMPLOYMENT_LABEL, applyHref, careerRoles, rolePath } from '@/data/careers'
import { CANONICAL_DESCRIPTION, siteConfig } from '@/data/content'
import { ENGAGEMENT_MODELS } from '@/data/services/types'
import { FOUNDER_ID, ORG_ID, WEBSITE_ID, graphLd } from '@/lib/schema'
import { absUrl, pageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'

/**
 * /about/ — the entity-resolution page.
 *
 * Server component, no framer-motion, no client leaf (Rule 10). Three things on
 * this page are load-bearing for the AI-answer channel and should survive any
 * redesign:
 *
 * 1. `CANONICAL_DESCRIPTION` is the FIRST paragraph after the `<h1>`, rendered
 *    byte-identically to the string in `Organization.description`
 *    (07-schema-aeo §4.2). It is imported, never retyped.
 * 2. The facts `<dl>` sits directly under it. HTML-to-text converters — what an
 *    AI crawler runs before the model sees anything — turn `<dl>` into clean
 *    `term: value` pairs; a `<div>` grid collapses into a run-on.
 * 3. The founder block carries `id="victor"`, which is the fragment in
 *    `FOUNDER_ID` and therefore the `@id` that `organizationLd().founder`
 *    already points at. Renaming the id orphans that reference.
 *
 * NO `FAQPage` JSON-LD — D6 emits that on `/` only. NO `JobPosting` either: D6
 * puts it on `/careers/[slug]/`, and two postings for one role at two URLs is a
 * duplicate, so "Working at TalentSync" links to those pages instead of
 * re-marking the roles here. NO breadcrumbs — PageShell renders both the visible
 * trail and the `BreadcrumbList`.
 */

export const metadata: Metadata = pageMeta({
  path: '/about/',
  title: 'About TalentSync | Chișinău, Moldova',
  description:
    'TalentSync is a technology recruitment and engineering talent partner in Chișinău, Moldova. Meet Victor, the person you actually work with.',
})

// 00-design-contract §2.3 roles. Heading classes stay inline as literals —
// check 4 of scripts/check-design-contract.mjs reads the className attribute
// textually and fails a heading whose classes it cannot see.
const LEDE = 'text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty'
const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Every `<Link>` on this route — and on every other route file under `src/app` —
 * carries `prefetch={false}`. Next prefetches the full RSC payload of any link
 * that enters the viewport, and under `output: 'export'` those payloads are
 * static `__next.*.__PAGE__.txt` files: 4.9 MB of them, 35% of the whole export.
 * The eight distinct routes linked from this page alone sum to 593,352 B —
 * /terms/ is 238,857 B of that — pulled by a scroll to the footer, against a
 * ≤ 320 KB total-page-weight budget. `prefetch={false}` disables viewport AND
 * hover prefetch in Next 16, so the payload is fetched on click instead; static
 * navigation is unaffected. The shared chrome (Navbar, Footer, Button, cards)
 * is the larger half of the same problem and is fixed in its own components.
 */

/** Mid-sentence link. WCAG 2.2 exempts text inline in a sentence from 2.5.8, so
 *  this one grows no hit box — a `min-h-11` inline-flex mid-paragraph breaks the
 *  line box. Standalone links below use the 44px pattern. */
const INLINE = cn('font-medium text-primary underline underline-offset-4 hover:text-primary-light', FOCUS)

/** Standalone link: 44px hit box grown with padding, visual type unchanged (Rule 3). */
const LINK = cn(
  'inline-flex min-h-11 items-center gap-2 rounded-lg py-2 font-medium text-primary hover:text-primary-light',
  FOCUS,
)

function FactList({ items }: { items: { term: string; value: string }[] }) {
  return (
    <dl className="mt-8">
      {items.map((f) => (
        // A `<div>` may group one `dt`/`dd` pair inside a `<dl>` (HTML5), and it is
        // what puts the row rule across both columns instead of only over the term.
        // HTML-to-text converters key on the dt/dd tags, so the pairs still extract
        // cleanly — which is the whole point of this block (07-schema-aeo §4.3).
        <div
          key={f.term}
          className="grid grid-cols-1 gap-x-8 border-t border-border py-4 sm:grid-cols-[minmax(0,15rem)_1fr]"
        >
          <dt className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            {f.term}
          </dt>
          <dd className="mt-1 text-base leading-relaxed text-text-secondary text-pretty sm:mt-0">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function AboutPage() {
  const aboutPageLd = {
    '@type': 'AboutPage',
    '@id': `${absUrl('/about/')}#webpage`,
    url: absUrl('/about/'),
    name: 'About TalentSync',
    description: CANONICAL_DESCRIPTION,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': FOUNDER_ID },
    inLanguage: 'en',
  }

  // The `@id` matches `organizationLd().founder`, so the two nodes merge into one
  // Person in the site graph rather than describing two people.
  const personLd = {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: founder.name,
    givenName: founder.givenName,
    jobTitle: founder.jobTitle,
    description:
      'Founder of TalentSync, running every technology recruitment engagement personally from Chișinău, Moldova.',
    worksFor: { '@id': ORG_ID },
    url: `${absUrl('/about/')}#victor`,
    mainEntityOfPage: { '@id': `${absUrl('/about/')}#webpage` },
    email: founder.email,
    telephone: founder.phone,
    sameAs: [founder.linkedin],
    knowsAbout: [
      'Technology recruitment',
      'Technical screening of software engineers',
      'Eastern European engineering talent',
      'B2B contractor engagement',
    ],
    knowsLanguage: ['en', 'ro', 'ru'],
    workLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Chișinău', addressCountry: 'MD' },
    },
  }

  return (
    <PageShell crumbs={[{ label: 'About' }]}>
      <JsonLd data={graphLd(aboutPageLd, personLd)} />

      {/* 1 — H1 + BLOCK A verbatim. Interior hero, not full-viewport (§4.3): the
          answer paragraph has to be above the fold on a 360px phone. */}
      <SectionWrapper density="tight">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          About TalentSync
        </h1>
        <p className={cn('mt-6 max-w-3xl', LEDE)}>{CANONICAL_DESCRIPTION}</p>
        <p className={cn('mt-4 max-w-3xl', BODY)}>
          It has operated since {FOUNDED_YEAR} and is run by {founder.name}, who handles every
          client relationship personally.
        </p>
      </SectionWrapper>

      {/* 2 — the extractable facts block (07-schema-aeo §4.3). */}
      <SectionWrapper id="company-facts" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          TalentSync at a glance
        </h2>
        <FactList items={facts} />
      </SectionWrapper>

      {/* 3 — the founder. Named human expertise is what answer engines cite. */}
      <SectionWrapper id="who-you-work-with" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Who you work with
        </h2>

        {/* The id lives on the wrapper, not the Card — Card takes no `id`, and this
            fragment is what FOUNDER_ID resolves to. */}
        <div id="victor" className="mt-8 max-w-3xl">
          <Card hover={false}>
            <h3 className="text-xl sm:text-2xl font-bold">{founder.name}</h3>
            <p className="mt-1 text-base text-text-secondary">
              {founder.jobTitle}, TalentSync · {siteConfig.location}
            </p>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
              <li>
                <a href={`mailto:${founder.email}`} className={LINK}>
                  {founder.email}
                </a>
              </li>
              <li>
                <a href={`tel:${founder.phone.replace(/\s/g, '')}`} className={LINK}>
                  {founder.phone}
                </a>
              </li>
              <li>
                {/* Rendered as text until the token resolves: an unresolved value in an
                    href would also trip the validator's internal-link check, which
                    would report the same one blocker twice. */}
                {/^https?:/.test(founder.linkedin) ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK}
                  >
                    LinkedIn profile
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-base text-text-secondary">
                    LinkedIn: {founder.linkedin}
                  </span>
                )}
              </li>
            </ul>
          </Card>
        </div>

        <div className="mt-8 max-w-3xl space-y-4">
          <p className={BODY}>
            Every search runs through one person. {founder.name} takes the brief, writes the
            search, approaches engineers directly, runs the first technical conversation and stays
            with the engagement through your interviews to signature. There is no account manager
            between you and the work and no handover to a delivery team once terms are agreed: the
            person who agreed the shortlist criteria with you is the person who calls when a
            candidate turns an offer down, and the person who goes back out to the market that
            week. The trade is worth stating plainly — you get one person&apos;s judgement, and you
            also get one person&apos;s bandwidth.
          </p>
          <p className={BODY}>
            Engineering hiring is a different job from generalist recruitment, and treating them as
            the same job is how a shortlist fills up with keyword matches. Screening a backend
            engineer means reading the actual work: what they owned in production rather than what
            the team shipped, what they have had to debug under load, whether the stack listed on
            the CV is the stack they wrote or the stack that happened to surround them. That takes
            a conversation with the engineer before anything reaches a client, and it takes knowing
            the domain well enough to hear the difference. It also limits how many searches can run
            at once, which is why TalentSync stays small and says so rather than quietly queueing
            your role behind four others.
          </p>
        </div>
      </SectionWrapper>

      {/* 4 — the operational argument for the location, not sentiment. */}
      <SectionWrapper id="why-chisinau" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Why Chișinău
        </h2>
        <div className="mt-8 max-w-3xl space-y-4">
          <p className={BODY}>
            TalentSync recruits in the market it lives in. The company is registered and staffed in
            Chișinău, most candidates are in the same city or a couple of hours from it, and a
            first meeting is usually in person. The value of that is operational rather than
            sentimental: we know which employers people are leaving this quarter and why, we hear
            about a team being restructured before those CVs reach the job boards, and we check a
            reference by calling someone we have already worked with instead of emailing a form to
            a stranger.
          </p>
          <p className={BODY}>
            Being inside the market also disciplines what we can tell you about money and about
            notice periods. A salary expectation gets checked against what engineers in the same
            stack are actually accepting here this quarter, not against a range compiled from job
            adverts somewhere else. When a candidate says they can start in two weeks, we usually
            know their employer well enough to say whether that is true. Most placements are
            Moldovan; when a stack or a seniority band is thin here we source across{' '}
            <Link prefetch={false} href="/tech-recruitment-eastern-europe/" className={INLINE}>
              the Eastern European market
            </Link>{' '}
            and say which country the answer came from.
          </p>
          <p className={BODY}>
            One local fact belongs on your invoice rather than in a brochure: Moldova&apos;s IT Park
            regime replaces most business taxes for resident IT companies with a single tax on
            turnover, currently 7%, which keeps a Moldovan contractor&apos;s own tax position stable
            across the life of an engagement. The mechanics, the salary bands and the risks worth
            knowing are on the page about{' '}
            <Link prefetch={false} href="/technical-recruitment-moldova/" className={INLINE}>
              recruiting in Moldova
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      {/* 5 — principles stated as constraints, because constraints are credible. */}
      <SectionWrapper id="how-we-work" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          How we work, and what we will not do
        </h2>
        <p className={cn('mt-6 max-w-3xl', BODY)}>
          Principles are cheap stated as ambitions, so here they are as constraints — the four that
          cost us work, and the reason clients can believe the rest of what we tell them. Where we
          have something specific to say about contracts, tax or the regional market we write it
          down instead:{' '}
          <Link prefetch={false} href="/insights/" className={INLINE}>
            what we publish
          </Link>{' '}
          is there to be checked, quoted and argued with.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {principles.map((p) => (
            <Card key={p.title} className="h-full">
              <h3 className="text-xl sm:text-2xl font-bold">{p.title}</h3>
              <p className={cn('mt-3', BODY)}>{p.body}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* 6 — the two engagement models, from the one shared source. */}
      <SectionWrapper id="engagement-models" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          The two ways to engage us
        </h2>
        <p className={cn('mt-6 max-w-3xl', BODY)}>
          There are two models and they are described in the same words everywhere on this site,
          because they are the same two things wherever you meet them. Which one fits is usually
          settled by how long the work runs and how certain it is.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {Object.values(ENGAGEMENT_MODELS).map((m) => (
            <Card key={m.href} hover={false} className="flex h-full flex-col">
              <h3 className="text-xl sm:text-2xl font-bold">{m.title}</h3>
              <p className={cn('mt-3 grow', BODY)}>{m.body}</p>
              <p className="mt-4">
                <Link prefetch={false} href={m.href} className={LINK}>
                  {m.linkAnchor}
                </Link>
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* 7 — the record. Two sentences and a link; the table lives on /case-studies/. */}
      <SectionWrapper id="the-record" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          The record
        </h2>
        <div className="mt-6 max-w-3xl space-y-4">
          <p className={BODY}>
            TalentSync has staffed engineering roles for ten named companies, from a senior backend
            Python developer at Qualiwise to a three-engineer full-stack team at Silvertalent.
            Across our five most recent placements — eight engineers for SocialBee, Silvertalent,
            Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the
            brief. Roles with a narrow stack, a security-clearance requirement or a hard on-site
            element take longer, and we tell you that at the brief rather than at week three.
          </p>
          <p className={BODY}>
            Each engagement is listed on its own — the client, the role, the stack, the time from
            brief to signature and what the engineer worked on — in{' '}
            <Link prefetch={false} href="/case-studies/" className={INLINE}>
              the full placement record
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      {/* 8 — registry facts. Boring, and the strongest trust signal on the site. */}
      <SectionWrapper id="company-details" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Company details
        </h2>
        <p className={cn('mt-6 max-w-3xl', BODY)}>
          These are the registry facts for the entity you would be contracting with. They match the{' '}
          <Link prefetch={false} href="/imprint/" className={INLINE}>
            imprint
          </Link>
          , the{' '}
          <Link prefetch={false} href="/terms/" className={INLINE}>
            terms
          </Link>{' '}
          and the organisation data this site publishes to search engines — one address, one
          telephone number, one spelling, everywhere.
        </p>
        <FactList items={companyDetails} />
      </SectionWrapper>

      {/* 9 — open roles. The JobPosting markup is on /careers/[slug]/ (D6), not here. */}
      <SectionWrapper id="working-at-talentsync" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Working at TalentSync
        </h2>
        <p className={cn('mt-6 max-w-3xl', BODY)}>
          Two roles are open. Both are full-time, both work directly with the founder because there
          is no layer in between, and both are judged on the same thing the clients judge us on:
          whether you can hold a technical conversation and tell someone the truth about it.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {careerRoles.map((role) => (
            <Card key={role.slug} className="flex h-full flex-col">
              <h3 className="text-xl sm:text-2xl font-bold">{role.title}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-text-secondary">
                {role.location} · {EMPLOYMENT_LABEL[role.employmentType]}
              </p>
              <p className={cn('mt-3 grow', BODY)}>{role.intro}</p>
              <p className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <a href={applyHref(role)} className={LINK}>
                  Apply by email
                </a>
                <Link prefetch={false} href={rolePath(role)} className={LINK}>
                  Full role description
                </Link>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                By emailing your CV you accept our{' '}
                <Link prefetch={false} href="/candidate-privacy/" className={INLINE}>
                  candidate privacy notice
                </Link>
                , which sets out what we keep, why, and for how long.
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8">
          <Link prefetch={false} href="/careers/" className={LINK}>
            All open roles
          </Link>
        </p>
      </SectionWrapper>

      {/* 10 — visible Q&A, no FAQPage markup on this route (D6). */}
      <SectionWrapper id="faq" band density="tight">
        <Faq heading="Frequently asked questions" name="about-faq" items={faqs} />
      </SectionWrapper>

      <CtaBand
        title="Get in touch"
        body="It goes to one inbox and it is answered by the person who will run your search."
        primary={{ label: 'Email Victor directly', href: `mailto:${siteConfig.email}` }}
        secondary={{ label: 'Book a 30-minute call', href: siteConfig.calendlyUrl, external: true }}
      />
    </PageShell>
  )
}
