'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'

export default function Process() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <SectionWrapper id="process" className="bg-background-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-xl text-text-secondary-dark max-w-2xl mx-auto">
          Our streamlined process gets you from search to hire efficiently
        </p>
      </motion.div>

      <div ref={containerRef} className="relative">
        {/* Horizontal animated connector line - desktop only */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-primary/20">
          <motion.div
            style={{ width: lineWidth }}
            className="h-full gradient-primary"
          />
        </div>

        {/* Vertical animated connector line - mobile/tablet only */}
        <div className="lg:hidden absolute left-6 sm:left-1/4 top-0 bottom-0 w-1 bg-primary/20">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full gradient-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-16 sm:pl-0 sm:text-center lg:text-center"
            >
              {/* Step number */}
              <div className="absolute left-0 sm:relative sm:left-auto z-10 w-12 h-12 sm:w-20 sm:h-20 sm:mx-auto mb-4 sm:mb-6 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-xl sm:text-3xl font-bold text-secondary-dark">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-base sm:text-lg text-text-secondary-dark leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
