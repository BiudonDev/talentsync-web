import { SectionWrapper, Faq } from '@/components/ui'
import { faq } from '@/data/content'

// Server component, zero JS. The <details>/<summary> markup lives in ui/Faq.tsx:
// implicit aria-expanded, native exclusive-accordion via `name`, and answers that
// stay in the DOM for Ctrl-F and for Google.
export default function FAQ() {
  return (
    <SectionWrapper id="faq" band>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
      </div>

      <Faq name="home-faq" items={faq.map((item) => ({ q: item.question, a: item.answer }))} />
    </SectionWrapper>
  )
}
