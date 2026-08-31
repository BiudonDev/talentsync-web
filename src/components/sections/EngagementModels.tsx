import Link from 'next/link'
import { Card, SectionWrapper } from '@/components/ui'
import { ENGAGEMENT_MODELS } from '@/data/services/types'

/**
 * 02-page-content.md §1 outline row 2, H2 "Two ways to work with us".
 *
 * Part 0 names five pages that must carry BLOCK B and BLOCK C — `/`,
 * `/tech-recruitment-eastern-europe/`, `/hire-software-developers-eastern-europe/`,
 * `/b2b-engineer-recruitment/` and `/hourly-engineering-talent/` — and `/` was
 * one of two that instead compressed both models into a process step. Part 0's
 * stated reason for freezing the blocks is that "nine pages describing the same
 * two products in nine slightly different ways is how a cluster cannibalises
 * itself", so a paraphrase on the cluster's highest-authority page is precisely
 * the failure the blocks exist to prevent.
 *
 * The bodies come from `ENGAGEMENT_MODELS` — the same const the five service
 * pages and `/about/` render — so this page cannot reword them. The compressed
 * summary in `process[1]` stays: it is a different slot doing a different job.
 *
 * Server component (Rule 10): two cards and two links, no client JS.
 */
export default function EngagementModels() {
  return (
    <SectionWrapper id="engagement-models" band>
      {/* No intro paragraph. /about/ already opens its own copy of this section
          with "…described in the same words everywhere on this site", and a
          near-identical 12+-word sentence on two indexed pages is the duplication
          the frozen blocks exist to avoid. The blocks introduce themselves. */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Two ways to <span className="text-gradient">work with us</span>
        </h2>
      </div>

      {/* hover={false} on the Card: it is not a link target, only the anchor
          inside it is, and a lift on hover would be a false affordance. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {Object.values(ENGAGEMENT_MODELS).map((m) => (
          <Card key={m.href} hover={false} className="flex h-full flex-col">
            <h3 className="text-xl sm:text-2xl font-bold">{m.title}</h3>
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
