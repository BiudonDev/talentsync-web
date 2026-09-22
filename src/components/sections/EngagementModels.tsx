import Link from 'next/link'
import { Card, SectionWrapper } from '@/components/ui'
import { ENGAGEMENT_MODELS } from '@/data/services/types'

/**
 * The services section (client feedback items 1 and 4, 21 September 2026):
 * the three engagement models, numbered, in the client's order — direct B2B
 * recruitment, hourly collaboration, software development outsourcing.
 *
 * The bodies come from `ENGAGEMENT_MODELS` — the same const the service pages
 * and `/about/` render — so this page cannot reword them. The compressed
 * summary in `process[1]` stays: it is a different slot doing a different job.
 *
 * Server component (Rule 10): three cards and three links, no client JS.
 */
export default function EngagementModels() {
  return (
    <SectionWrapper id="engagement-models" band>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Three ways to <span className="text-gradient">work with us</span>
        </h2>
      </div>

      {/* hover={false} on the Card: it is not a link target, only the anchor
          inside it is, and a lift on hover would be a false affordance. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {Object.values(ENGAGEMENT_MODELS).map((m, i) => (
          <Card key={m.href} hover={false} className="flex h-full flex-col">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold">{m.title}</h3>
            <p className="mt-4 grow text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
              {m.body}
            </p>
            <p className="mt-6">
              <Link
                href={m.href}
                prefetch={false}
                className="inline-flex min-h-11 items-center rounded-lg text-base font-semibold text-primary underline underline-offset-4 hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg"
              >
                {m.linkAnchor}
              </Link>
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
