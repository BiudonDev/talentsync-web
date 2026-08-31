import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'

// Server component (Rule 10). The connectors used to be framer-motion `useScroll`
// progress bars — a scroll listener on every route for a decorative line that is
// aria-hidden anyway. They are now static gradients; nothing readable changed.
export default function Process() {
  return (
    <SectionWrapper id="process">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty max-w-2xl mx-auto">
          Our streamlined process gets you from search to hire efficiently
        </p>
      </div>

      <div className="relative">
        {/* Horizontal connector - lg only. Circles are 80px tall and start at y=0,
            so their centre is y=40; h-1 line sits at 38 to straddle it. */}
        <div
          className="hidden lg:block absolute top-[38px] left-0 right-0 h-1 gradient-primary"
          aria-hidden="true"
        />

        {/* Vertical connector - single-column layout only. left-6 = the 48px
            circle's centre; it is meaningless once sm: goes two columns. */}
        <div
          className="sm:hidden absolute left-6 top-0 bottom-0 w-1 gradient-primary"
          aria-hidden="true"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {process.map((step) => (
            <div key={step.step} className="relative pl-16 sm:pl-0 sm:text-center">
              {/* Step number */}
              <div className="absolute left-0 top-0 sm:relative sm:left-auto z-10 w-12 h-12 sm:w-20 sm:h-20 sm:mx-auto mb-4 sm:mb-6 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-xl sm:text-3xl font-bold text-secondary-dark">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
