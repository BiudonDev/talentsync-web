'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { testimonials } from '@/data/content'

const ARROW = 'grid size-11 place-items-center rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionWrapper id="testimonials">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Quote */}
          <div className="bg-surface rounded-3xl p-6 sm:p-16 shadow-xl">
            <div className="text-8xl text-primary/20 mb-6 leading-none" aria-hidden="true">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl sm:text-2xl leading-relaxed text-text-primary text-pretty mb-6">
                  {testimonials[current].quote}
                </p>

                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20 shrink-0">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-bold">{testimonials[current].author}</p>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
