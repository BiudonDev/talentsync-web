import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineUserGroup } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { PLACED_ENGINEERS } from '@/data/case-studies'
import { CANONICAL_DESCRIPTION } from '@/data/content'

/**
 * The entity section: BLOCK A verbatim (02-page-content Part 0), imported from
 * `content.ts` rather than typed here, because `/about/` renders the same string
 * and a paraphrase on either page costs the entity-resolution job the homepage
 * exists to do.
 *
 * BLOCK D and the operational-control sentences moved OUT of here and into
 * `NotOutsourcing.tsx`. §1's outline gives them their own H2, "What TalentSync
 * is not" — buried as the third paragraph under a heading about something else,
 * the one thing buyers most often get wrong was neither in the outline nor
 * quotable on its own.
 *
 * The "60% Cost Savings" tile is gone — an unsubstantiated price-comparison
 * claim stated as a bare fact, with no baseline (D7, claims row 2). The
 * "1-2 weeks Time to Hire" tile is gone as a bare SLA and comes back qualified
 * by the dataset it is drawn from (claims row 6, and the Part 0 rule that speed
 * is never stated unqualified).
 *
 * No framer-motion, and therefore no `'use client'` (Rule 10). The five
 * `whileInView` wrappers here serialised `style="opacity:0;transform:…"` into
 * out/index.html — five of the eight elements the homepage shipped invisible to
 * a no-JS reader. `.animate-fade-up` (globals.css) animates AWAY from opacity 0
 * so the visible state is the SSR default; the global
 * `@media (prefers-reduced-motion: reduce)` block covers Rule 7.
 */
const stats = [
  { icon: HiOutlineLocationMarker, value: 'Moldova', label: 'Headquarters' },
  // The total is the ledger's, not a typed number: client feedback item 8.
  { icon: HiOutlineUserGroup, value: String(PLACED_ENGINEERS), label: 'Engineers placed with European product teams' },
  { icon: HiOutlineClock, value: '1–2 weeks', label: 'Brief to signed offer, across the six placements with a recorded timeline' },
]

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-up flex items-center gap-5 p-6 sm:p-8 rounded-3xl bg-surface border border-border"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <stat.icon className="w-8 h-8 text-secondary-dark" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-base sm:text-lg text-text-secondary text-pretty">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-8">
            Senior Engineers for Teams That{' '}
            <span className="text-gradient">Keep Control</span>
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
            <p>{CANONICAL_DESCRIPTION}</p>
            <p>
              You choose how much you keep in-house. Hire an engineer directly and manage them inside
              your own team, add hourly capacity to the team you already have, or hand a complete
              project to a dedicated TalentSync team — without standing up a local entity, a payroll
              or a benefits scheme in another country.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
