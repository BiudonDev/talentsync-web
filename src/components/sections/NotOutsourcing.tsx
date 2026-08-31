import { SectionWrapper } from '@/components/ui'
import { ANTI_POSITIONING } from '@/data/content'

/**
 * 02-page-content.md §1 outline row 3, H2 "What TalentSync is not".
 *
 * BLOCK D is MANDATORY VERBATIM on `/` (D7) and it already was — but buried as
 * the third paragraph inside the About section, under a heading about something
 * else. The spec gives it its own H2 because the thing a buyer most often gets
 * wrong about TalentSync deserves to be findable in the outline and quotable by
 * an answer engine, not discovered mid-paragraph.
 *
 * The two operational-control sentences moved here from `About.tsx` rather than
 * being rewritten: they are the concrete half the spec asks for, and copying
 * them would have put the same claim on the page twice.
 *
 * Server component (Rule 10): two paragraphs, no client JS.
 */
export default function NotOutsourcing() {
  return (
    <SectionWrapper id="what-we-are-not" density="tight">
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
          What TalentSync <span className="text-gradient">is not</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed font-medium text-text-primary text-pretty">
          {ANTI_POSITIONING}
        </p>
        {/* The spec budgets ~90 words for this section and these are ~55. The
            remaining sentences are copy, and copy is content.ts's owner's call —
            this file supplies the structure the outline was missing. */}
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
          Operational control means what it says: your repository, your sprint cadence, your
          architectural decisions. Who joins the team is your call, and so is what they work on.
        </p>
      </div>
    </SectionWrapper>
  )
}
