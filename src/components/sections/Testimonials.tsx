'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { testimonials } from '@/data/content'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionWrapper id="testimonials" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
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
          <div className="bg-surface rounded-3xl p-10 sm:p-16 shadow-xl">
            <div className="text-8xl text-primary/20 mb-6 leading-none">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl sm:text-2xl text-text-primary mb-6 leading-relaxed">
                  {testimonials[current].quote}
                </p>

                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{testimonials[current].author}</p>
                    <p className="text-text-secondary">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
