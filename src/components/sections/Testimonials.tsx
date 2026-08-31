'use client'

import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { testimonials } from '@/data/content'

const ARROW = 'grid size-11 place-items-center rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/* Plain <img>, not next/image: `images.unoptimized: true` makes next/image a bare
   <img> anyway, and `fill` emits no width, no height and no srcSet (Rule 9). The
   64px avatar box was being fed an 800x800 / 106KB original. Square derivatives
   live beside the source as `<base>-128.webp` / `<base>-192.webp`. */
const avatarSet = (src: string) => {
  const b = src.replace(/\.[a-z]+$/i, '')
  return `${b}-128.webp 128w, ${b}-192.webp 192w`
}
const avatarSrc = (src: string) => `${src.replace(/\.[a-z]+$/i, '')}-128.webp`

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Quote */}
          <div className="bg-surface rounded-3xl p-6 sm:p-16 shadow-xl">
            <div className="text-8xl text-primary/20 mb-6 leading-none" aria-hidden="true">&ldquo;</div>

            {/* `key` remounts this block on every change, which replays the
                `.animate-fade-up` keyframes — the crossfade that AnimatePresence
                used to do, with no framer-motion on the wire. Collapsed to .01ms
                by the prefers-reduced-motion block in globals.css. */}
            <div key={current} className="animate-fade-up">
              <p className="text-xl sm:text-2xl leading-relaxed text-text-primary text-pretty mb-6">
                {testimonials[current].quote}
              </p>

              <div className="flex items-center gap-5">
                <img
                  src={avatarSrc(testimonials[current].avatar)}
                  srcSet={avatarSet(testimonials[current].avatar)}
                  sizes="64px"
                  alt=""
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0 rounded-full object-cover ring-4 ring-primary/20"
                />
                <div>
                  <p className="text-base sm:text-lg font-bold">{testimonials[current].author}</p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {testimonials[current].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button type="button" onClick={prev} className={ARROW} aria-label="Previous testimonial">
              <HiChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className="p-2.5 -m-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-colors ${
                      index === current ? 'bg-primary' : 'bg-neutral-500'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button type="button" onClick={next} className={ARROW} aria-label="Next testimonial">
              <HiChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
