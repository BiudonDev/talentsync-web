'use client'

import { useRef, useState } from 'react'
import { SectionWrapper, Card } from '@/components/ui'
import { caseStudies } from '@/data/content'

/* Plain <img>, not next/image. `images.unoptimized: true` (static export) means
   next/image hands back a bare <img> with no optimisation anyway, and `fill`
   emits no width, no height and no srcSet — eleven Rule 9 findings.
   content.ts owns the source paths; the resized derivatives are generated beside
   them as `<base>-384.webp` / `<base>-768.webp`. Both are shrink-only, so a source
   narrower than the target simply reappears at its own width — the `w` descriptor
   then over-states by a few pixels and the browser picks the same file either way. */
const base = (src: string) => src.replace(/\.[a-z]+$/i, '')
const srcSet = (src: string) => `${base(src)}-384.webp 384w, ${base(src)}-768.webp 768w`

const SPOTLIGHT_SIZES = '(min-width: 1024px) 34rem, 100vw'
const CARD_SIZES = '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 18rem'

export default function CaseStudies() {
  const highlighted = caseStudies.find((s) => s.highlight)
  const others = caseStudies.filter((s) => !s.highlight)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const cardWidth = 288 + 16 // w-72 (288px) + gap-4 (16px)
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, others.length - 1))
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = 288 + 16
    scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="case-studies" band>
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
          Our <span className="text-gradient">Clients</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty max-w-2xl mx-auto">
          Driving success across industries — from global sports clubs to fast-growing startups
        </p>
      </div>

      {/* Spotlight: FC Barcelona */}
      {highlighted && (
        <div className="mb-16">
          <Card className="border-primary ring-2 ring-primary/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                {/* width/height describe the 16:9 box the CSS forces, so the
                    intrinsic ratio hint matches what is painted. */}
                <img
                  src={`${base(highlighted.image)}-768.webp`}
                  srcSet={srcSet(highlighted.image)}
                  sizes={SPOTLIGHT_SIZES}
                  alt={highlighted.company}
                  width={768}
                  height={432}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
              </div>
              <div>
                <span className="px-4 py-2 text-sm font-semibold rounded-full gradient-primary text-secondary-dark mb-4 inline-block">
                  Spotlight Partnership
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{highlighted.company}</h3>
                <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty mb-6">
                  {highlighted.industry}
                </p>
                <ul className="space-y-3">
                  {highlighted.results.map((result, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-text-secondary"
                    >
                      <span className="text-primary mt-1 font-bold text-xl" aria-hidden="true">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Other clients - ONE DOM tree: snap carousel at 360, card grid from sm up */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-x-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {others.map((study) => (
          <div key={study.company} className="w-72 shrink-0 snap-start sm:w-auto">
            <Card className="h-full overflow-hidden group">
              <div
                className="relative aspect-video mb-4 rounded-lg overflow-hidden"
                style={{ backgroundColor: study.logoBg || 'transparent' }}
              >
                <img
                  src={`${base(study.image)}-384.webp`}
                  srcSet={srcSet(study.image)}
                  sizes={CARD_SIZES}
                  alt={study.company}
                  width={384}
                  height={216}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 size-full motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105 ${
                    study.logoContain ? `object-contain ${study.logoPadding || 'p-4'}` : 'object-cover'
                  }`}
                />
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-secondary-dark mb-2">
                {study.industry}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{study.company}</h3>
              <ul className="space-y-2">
                {study.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>

      {/* Dot indicators - only steer the carousel, which only exists below sm */}
      <div className="flex justify-center gap-2 mt-4 sm:hidden">
        {others.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            className="p-2.5 -m-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-1 rounded-full motion-safe:transition-all motion-safe:duration-300 ${
                activeIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-neutral-500'
              }`}
            />
          </button>
        ))}
      </div>
    </SectionWrapper>
  )
}
