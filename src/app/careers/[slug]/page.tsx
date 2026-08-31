import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Button, Card, Pill, SectionWrapper } from '@/components/ui'
import { EMPLOYMENT_LABEL, applyHref, careerLd, careerRoles, findRole, rolePath, type CareerRole } from '@/data/careers'
import { graphLd } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

/**
 * Applying is a `mailto:` with a prefilled subject, because a static export has
 * nowhere to POST a form. That means candidates email CVs, which is personal-data
 * collection with no notice at the point of collection — the live GDPR gap the
 * completeness critic flagged (08-critique-completeness.md, HIGH). Every Apply
 * control on this page therefore carries the link to the Article 14 notice at
 * /candidate-privacy/ directly beneath it. `Apply` exists so the two cannot be
 * separated by a later edit.
 */

// Required under `output: 'export'`. Slugs come from the role data; the frozen
// registry (`careerSlugs` in src/data/routes.ts) holds the same two, and
// scripts/validate-pages.mjs fails the build in both directions if they drift.
export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const role = findRole(slug)
  if (!role) return {}
  return pageMeta({
    path: rolePath(role),
    title: `${role.title} — TalentSync`,
    description: role.metaDescription,
  })
}

const date = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

const INLINE_LINK =
  'rounded px-0.5 py-2.5 -my-2.5 text-primary underline underline-offset-4 ' +
  'hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

function Apply({ role }: { role: CareerRole }) {
  return (
    <div>
      <Button href={applyHref(role)}>Apply by email</Button>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
        Your email opens with the subject line already filled in. Attach your CV and add a few lines
        on why this role. By emailing it you accept our{' '}
        <Link href="/candidate-privacy/" className={INLINE_LINK}>
          candidate privacy notice
        </Link>
        , which says what we record, how long we keep it, and how to make us delete it.
      </p>
    </div>
  )
}

export default async function CareerRolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = findRole(slug)
  if (!role) notFound()

  return (
    <PageShell crumbs={[{ label: 'Careers', href: '/careers/' }, { label: role.title }]}>
      <section className="hero-glow bg-background-alt pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {role.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill variant="outline">{role.location}</Pill>
            <Pill variant="outline">{EMPLOYMENT_LABEL[role.employmentType]}</Pill>
          </div>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty">
            {role.intro}
          </p>
          <p className="mt-6 text-sm text-text-secondary">
            Posted <time dateTime={role.datePosted}>{date(role.datePosted)}</time> · applications
            close <time dateTime={role.validThrough}>{date(role.validThrough)}</time>
          </p>
          <div className="mt-8">
            <Apply role={role} />
          </div>
        </div>
      </section>

      {role.sections.map((section, i) => (
        <SectionWrapper key={section.heading} band={i % 2 === 1} density="tight">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {section.heading}
          </h2>
          <ul className="mt-6 max-w-2xl list-disc space-y-3 pl-6 marker:text-primary">
            {section.items.map((item) => (
              <li key={item} className="text-base leading-relaxed text-text-secondary text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      ))}

      <SectionWrapper id="apply" band={role.sections.length % 2 === 1} density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          How to apply
        </h2>
        <Card hover={false} className="mt-6 max-w-2xl">
          <Apply role={role} />
        </Card>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary text-pretty">
          Every application is read by a person, and you will hear back either way. If this role is
          not the one, the{' '}
          <Link href="/careers/" className={INLINE_LINK}>
            other open role
          </Link>{' '}
          might be — and if neither fits, say so in the same email.
        </p>
      </SectionWrapper>

      <JsonLd data={graphLd(careerLd(role))} />
    </PageShell>
  )
}
