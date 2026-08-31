import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'
import ScrollFillLine from './ScrollFillLine'

// Server component (Rule 10). The connectors are the one moving part on this
// section, so they live in `ScrollFillLine`, a `'use client'` leaf that owns the
// framer-motion `useScroll` progress fill and nothing else. This file imports no
// framer-motion and stays server-rendered.
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
        <ScrollFillLine orientation="horizontal" />
        <ScrollFillLine orientation="vertical" />

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
