import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'
import ScrollFillLine from './ScrollFillLine'

/**
 * Server component (Rule 10). The connectors are the one moving part on this
 * section, so they live in `ScrollFillLine`, a `'use client'` leaf that owns the
 * framer-motion `useScroll` progress fill and nothing else. This file imports no
 * framer-motion and stays server-rendered.
 *
 * Step 2's description is three engagement-model summaries concatenated
 * (content.ts `process[1]`) and runs roughly 4x longer than the other three.
 * CSS Grid's default `align-items: stretch` then stretches every card in the
 * row to match it, so steps 1, 3 and 4 shipped with a wall of empty space
 * under one short sentence. The description is now a `<details>` disclosure,
 * closed by default — same idiom `ui/Faq.tsx` already uses (native
 * `<details>/<summary>`, no client JS, the one accordion pattern the design
 * contract allows) — so every card's baseline height is number + title only,
 * uniform across the row, and the long one no longer sets the row's height.
 */
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

              <details className="text-left sm:text-center [&[open]_.js-show]:hidden [&[open]_.js-hide]:inline [&[open]_svg]:rotate-180">
                <summary className="mx-0 flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mx-auto">
                  <span className="js-show">Show details</span>
                  <span className="js-hide hidden">Hide details</span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden
                    className="size-4 shrink-0 fill-primary motion-safe:transition-transform"
                  >
                    <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
                  </svg>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">
                  {step.description}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
