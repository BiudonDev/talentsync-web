import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { Card, CtaBand, SectionWrapper } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { ORG_ID, WEBSITE_ID, graphLd } from '@/lib/schema'
import { absUrl, pageMeta } from '@/lib/seo'

/**
 * There is no form on this page, and that is a decision rather than an omission.
 * `next.config.ts` sets `output: 'export'` — no server, no route handler, nowhere
 * to POST — so a form would mean a third-party endpoint, which makes that
 * provider a new processor that has to be added to the privacy policy's
 * recipients table, the cookie policy and the DPA list BEFORE it can ship.
 * DECISIONS.md adds no such provider, so the page ships the three routes that
 * genuinely work today: Calendly, email, phone.
 *
 * The NAP block below is byte-identical to the `Organization` JSON-LD because
 * both read `siteConfig` (D5). Schema that contradicts visible content is
 * ignored, so do not retype any of these strings.
 */

const PATH = '/contact/'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Contact TalentSync — Chișinău, Moldova',
  description:
    'Book a 30-minute call with TalentSync, email victor@talentsync.eu, or phone +373 68 300 700. Based in Chișinău, Moldova. What to put in a first message.',
})

const TEL = `tel:${siteConfig.phone.replace(/\s/g, '')}`

const ROUTES = [
  {
    label: 'Book a call',
    value: '30 minutes, in your calendar',
    href: siteConfig.calendlyUrl,
    external: true,
    body: 'The fastest route. Bring the role, or bring the problem you think a role solves — either works. No slide deck, and no obligation to brief us at the end of it.',
  },
  {
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
    body: 'Best if you already know the role and want it in writing. This reaches Victor directly — there is no shared inbox and no gatekeeper.',
  },
  {
    label: 'Phone',
    value: siteConfig.phone,
    href: TEL,
    external: false,
    body: 'Moldova is UTC+2 in winter and UTC+3 in summer, so the working day overlaps almost entirely with CET. Outside those hours, email is quicker.',
  },
]

const BRIEF = [
  'The role and the seniority — "senior backend, Python, someone who has owned a service in production", not "a developer".',
  'The stack the engineer will actually work in, and anything non-negotiable in it.',
  'Which model you have in mind: direct B2B recruitment, or hourly collaboration. If you are not sure, say so — the first call sorts it.',
  'When you need someone working, and what is driving that date.',
  'Your interview process, and who takes part. This is usually what decides the timeline.',
  'The timezone overlap your team needs, and whether any of the work has to be on-site.',
]

const CAPTION = 'text-xs font-medium uppercase tracking-wide text-text-secondary'
const BODY = 'text-base sm:text-lg leading-relaxed text-text-secondary text-pretty'
const LINK =
  'inline-flex min-h-11 items-center rounded-lg text-primary underline underline-offset-4 ' +
  'hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const INLINE_LINK =
  'rounded px-0.5 py-2.5 -my-2.5 text-primary underline underline-offset-4 ' +
  'hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function ContactPage() {
  return (
    <PageShell crumbs={[{ label: 'Contact' }]}>
      <section className="hero-glow bg-background-alt pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Contact <span className="text-gradient">TalentSync</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty">
            Three ways in, all of them real: a 30-minute call, an email, or a phone number that rings
            a person. Whichever you pick, you are speaking to the people who do the sourcing.
          </p>
        </div>
      </section>

      <SectionWrapper id="how" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">How to reach us</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {ROUTES.map((r) => (
            <Card key={r.label} hover={false} className="flex flex-col">
              <p className={CAPTION}>{r.label}</p>
              <a
                href={r.href}
                target={r.external ? '_blank' : undefined}
                rel={r.external ? 'noopener noreferrer' : undefined}
                className={`${LINK} mt-2 text-lg font-semibold break-words`}
              >
                {r.value}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{r.body}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="brief" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">What to put in a first message</h2>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          None of this is required — a one-line email gets an answer too. But an enquiry with these
          six things in it usually saves a whole round trip, and it lets us tell you on the first
          reply whether the role is one we can do well.
        </p>
        <ul className="mt-6 max-w-2xl list-disc space-y-3 pl-6 marker:text-primary">
          {BRIEF.map((b) => (
            <li key={b} className="text-base leading-relaxed text-text-secondary text-pretty">
              {b}
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper id="response" density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">When you will hear back</h2>
        <div className="mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className={CAPTION}>Client and candidate enquiries</p>
            <p className={`mt-2 ${BODY}`}>
              Within two working days, and usually the same day. If two days pass with nothing, reply
              to your own email — it is a small team and the occasional message does get buried.
            </p>
          </div>
          <div>
            <p className={CAPTION}>Data protection requests</p>
            <p className={`mt-2 ${BODY}`}>
              Access, correction, deletion, objection: within one month, free of charge, as set out
              in the{' '}
              <Link prefetch={false} href="/privacy/" className={INLINE_LINK}>
                privacy policy
              </Link>
              . If we sourced you from a public profile, the{' '}
              <Link prefetch={false} href="/candidate-privacy/" className={INLINE_LINK}>
                candidate privacy notice
              </Link>{' '}
              is the shorter route.
            </p>
          </div>
          <div>
            <p className={CAPTION}>Looking for work</p>
            <p className={`mt-2 ${BODY}`}>
              Engineers: email us with the stack you work in and what you are looking for. Roles at
              TalentSync itself are on the{' '}
              <Link prefetch={false} href="/careers/" className={INLINE_LINK}>
                careers page
              </Link>
              .
            </p>
          </div>
          <div>
            <p className={CAPTION}>What we will not do</p>
            <p className={`mt-2 ${BODY}`}>
              Add you to a mailing list, pass your details to a client without asking you first, or
              call you because you looked at this page.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="where" band density="tight">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Where we are</h2>
        <address className="mt-6 space-y-2 not-italic">
          <p className="text-xl font-bold text-text-primary sm:text-2xl">{siteConfig.name}</p>
          <p className={BODY}>{siteConfig.location}</p>
          <p>
            <a href={`mailto:${siteConfig.email}`} className={LINK}>
              {siteConfig.email}
            </a>
          </p>
          <p>
            <a href={TEL} className={LINK}>
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn
            </a>
          </p>
        </address>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary">
          We work with clients across the EU, the UK and the US, in English, Romanian and Russian.
          Company registration details are on the{' '}
          <Link prefetch={false} href="/imprint/" className={INLINE_LINK}>
            imprint
          </Link>
          .
        </p>
      </SectionWrapper>

      <CtaBand
        title="Book the 30 minutes"
        body="Bring a role or bring the problem. You will leave the call knowing whether we can help and roughly what it would take — or knowing that we cannot, which is also worth 30 minutes."
        primary={{ label: 'Book A Meeting', href: siteConfig.calendlyUrl, external: true }}
        secondary={{ label: 'Email Us Instead', href: `mailto:${siteConfig.email}` }}
      />

      <JsonLd
        data={graphLd({
          '@type': 'ContactPage',
          '@id': `${absUrl(PATH)}#contactpage`,
          url: absUrl(PATH),
          name: 'Contact TalentSync',
          description:
            'How to reach TalentSync: a 30-minute booked call, email, or telephone. Response times, what to include in a first enquiry, and the registered contact details.',
          inLanguage: 'en',
          isPartOf: { '@id': WEBSITE_ID },
          about: { '@id': ORG_ID },
          mainEntity: { '@id': ORG_ID },
        })}
      />
    </PageShell>
  )
}
