import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Card, Pill, SectionWrapper } from '@/components/ui'
import { EMPLOYMENT_LABEL, careerRoles, rolePath } from '@/data/careers'
import { siteConfig } from '@/data/content'
import { graphLd, itemListLd } from '@/lib/schema'
import { absUrl, pageMeta } from '@/lib/seo'

/**
 * `JobPosting` lives on the per-role pages, not here. Google's guidance is one
 * posting per detail page; repeating both postings on the index would put the
 * same two `@id`s on two URLs and gives no extra eligibility. This page emits
 * `ItemList` instead — machine-readable context, no rich result claimed.
 */

const PATH = '/careers/'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Careers at TalentSync',
  description:
    'Two open roles at TalentSync: Senior Technical Recruiter and Business Development Manager. What each role does, how we hire, and how to apply by email.',
})

const HIRING = [
  {
    step: 'You email us',
    body: 'Your CV, and a few lines on why this role. No cover letter, no portal, no account to create.',
  },
  {
    step: 'A call with Victor',
    body: 'Forty-five minutes on what you have actually done and what you want next. You get to ask everything about the business.',
  },
  {
    step: 'A working conversation',
    body: 'For the recruiter role, we work a real brief together. For business development, we walk through a deal you have run and one you would run here.',
  },
  {
    step: 'A decision, either way',
    body: 'You hear back within a week of the last conversation, including if the answer is no. We tell you why.',
  },
]

const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const LINK =
  'inline-flex min-h-11 items-center rounded-lg text-primary underline underline-offset-4 ' +
  'hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const INLINE_LINK =
  'rounded px-0.5 py-2.5 -my-2.5 text-primary underline underline-offset-4 ' +
  'hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function CareersPage() {
  return (
    <PageShell crumbs={[{ label: 'Careers' }]}>
      <section className="hero-glow bg-background-alt pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Careers at <span className="text-gradient">TalentSync</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty">
            We are a small recruitment team in Chișinău placing senior Eastern European engineers
            with European and international product companies. Two roles are open, and both of them
            talk to clients from the first week.
          </p>
        </div>
      </section>

      <SectionWrapper id="open-roles" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Open roles
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {careerRoles.map((role) => (
            <Card key={role.slug} hover={false} className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold">{role.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill variant="outline">{role.location}</Pill>
                <Pill variant="outline">{EMPLOYMENT_LABEL[role.employmentType]}</Pill>
              </div>
              <p className="mt-4 text-base leading-relaxed text-text-secondary text-pretty">
                {role.intro}
              </p>
              <p className="mt-4">
                <Link prefetch={false} href={rolePath(role)} className={LINK}>
                  Read the role and apply
                </Link>
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="how-we-hire" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          How we hire
        </h2>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          The same process we ask our clients to run: short, honest, and finished inside a few weeks.
          A person reads every application — we do not use automated decision-making or AI screening
          to evaluate candidates, for our own hires any more than for anyone else&rsquo;s.
        </p>
        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {HIRING.map((h, i) => (
            <li key={h.step}>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Step {i + 1}
              </p>
              <p className="mt-2 text-base font-semibold text-text-primary sm:text-lg">{h.step}</p>
              <p className="mt-2 text-base leading-relaxed text-text-secondary text-pretty">
                {h.body}
              </p>
            </li>
          ))}
        </ol>
      </SectionWrapper>

      <SectionWrapper id="speculative" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          If neither role fits
        </h2>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Engineers looking for work: we place people rather than hire them, so send us the stack you
          work in and what you want next, and we will tell you honestly whether we have anything live.
          For anything else, email{' '}
          <a href={`mailto:${siteConfig.email}`} className={INLINE_LINK}>
            {siteConfig.email}
          </a>
          .
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Emailing us your CV means we hold your personal data. The{' '}
          <Link prefetch={false} href="/candidate-privacy/" className={INLINE_LINK}>
            candidate privacy notice
          </Link>{' '}
          says exactly what we record, how long we keep it, and how to make us delete it.
        </p>
      </SectionWrapper>

      <JsonLd
        data={graphLd(
          itemListLd({
            id: `${absUrl(PATH)}#open-roles`,
            name: 'Open roles at TalentSync',
            items: careerRoles.map((role) => ({
              name: role.title,
              path: rolePath(role),
              description: role.intro,
            })),
          }),
        )}
      />
    </PageShell>
  )
}
