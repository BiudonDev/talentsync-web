'use client'

import { useRef, useState } from 'react'
import { SectionWrapper, Card } from '@/components/ui'
import { caseStudies, type CaseStudy } from '@/data/case-studies'

/* Every card reads from the placement ledger in `@/data/case-studies` — the one
   central client record (client feedback item 24). The hub table, the detail
   routes and the service-page evidence guard read the same array, so a client
   added or removed there is added or removed here in the same edit.

   Plain <img>, not next/image. `images.unoptimized: true` (static export) means
   next/image hands back a bare <img> with no optimisation anyway, and `fill`
   emits no width, no height and no srcSet. The resized derivatives are generated
   beside each source as `<base>-384.webp` / `<base>-768.webp`. */
const base = (src: string) => src.replace(/\.[a-z]+$/i, '')
const srcSet = (src: string) => `${base(src)}-384.webp 384w, ${base(src)}-768.webp 768w`

const SPOTLIGHT_SIZES = '(min-width: 1024px) 34rem, 100vw'
const CARD_SIZES = '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 18rem'

/* 06-claims rows 13 and 17. "Where our engineers work" claims only what is true:
   an engineer we placed, or a team we assembled, worked there. */
const GRID_SUBHEAD =
  'Companies and products our engineers have contributed to, in their clients’ own teams or as a dedicated TalentSync team.'

/* 06-claims row 16. Several bullets say "team scaled within N weeks"; rather than
   hedge each one, the clock is defined once, here, under the grid they sit in. */
const TIMING_QUALIFIER =
  'Timings are measured from agreed role brief to signed offer, for the engagements shown. ' +
  'Your timeline depends on role scarcity and your interview schedule.'

/* A client with no supplied mark gets a text tile rather than a placeholder
   image. No client is in that state today; kept for the next one added
   before its logo file lands (Vinlivt was this case until 22 September 2026,
   when the client was removed entirely — see case-studies.ts header). */
function Mark({ study, sizes }: { study: CaseStudy; sizes: string }) {
  const { logo } = study
  if (!logo) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface">
        <span className="text-2xl font-bold tracking-tight text-gradient">{study.client}</span>
      </div>
    )
  }
  return (
    <img
      src={`${base(logo.src)}-384.webp`}
      srcSet={srcSet(logo.src)}
      sizes={sizes}
      alt={study.client}
      width={384}
      height={216}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 size-full motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105 ${
        logo.plate || logo.contain ? 'object-contain p-4' : 'object-cover'
      }`}
    />
  )
}

export default function CaseStudies() {
  const highlighted = caseStudies.find((s) => s.spotlight)
  const others = caseStudies.filter((s) => !s.spotlight)
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

  const spotlightImage = highlighted?.spotlightImage ?? highlighted?.logo

  return (
    <SectionWrapper id="case-studies" band>
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
          Where our <span className="text-gradient">engineers work</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty max-w-2xl mx-auto">
          {GRID_SUBHEAD}
        </p>
      </div>

      {/* Spotlight: the New Era Visionary Group / Barça Mobile team */}
      {highlighted && spotlightImage && (
        <div className="mb-16">
          <Card className="border-primary ring-2 ring-primary/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                {/* width/height describe the 16:9 box the CSS forces, so the
                    intrinsic ratio hint matches what is painted. */}
                <img
                  src={`${base(spotlightImage.src)}-768.webp`}
                  srcSet={srcSet(spotlightImage.src)}
                  sizes={SPOTLIGHT_SIZES}
                  alt={highlighted.project ?? highlighted.client}
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
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{highlighted.client}</h3>
                <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty mb-6">
                  {highlighted.sector}
                  {highlighted.project ? ` · ${highlighted.project}` : ''}
                </p>
                <ul className="space-y-3">
                  {highlighted.highlights.map((result, i) => (
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

      {/* Other clients — ONE DOM tree, each card rendered exactly once: a snap
          carousel at 360, a card grid from sm up. No duplicated slides, so
          nothing is announced twice and nothing is indexed twice. */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-x-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {others.map((study) => (
          <div key={study.slug} className="w-72 shrink-0 snap-start sm:w-auto">
            <Card className="h-full overflow-hidden group">
              <div
                className={`relative aspect-video mb-4 rounded-lg overflow-hidden ${
                  !study.logo?.bg && study.logo?.plate ? 'bg-text-primary' : ''
                }`}
                style={study.logo?.bg ? { backgroundColor: study.logo.bg } : undefined}
              >
                <Mark study={study} sizes={CARD_SIZES} />
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-secondary-dark mb-2">
                {study.sector}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{study.client}</h3>
              <ul className="space-y-2">
                {study.highlights.map((result, i) => (
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
        {others.map((study, index) => (
          <button
            key={study.slug}
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

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-secondary text-pretty">
        {TIMING_QUALIFIER}
      </p>
    </SectionWrapper>
  )
}
