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
        {/* Animated connector line */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-primary/20">
          <motion.div
            style={{ width: lineWidth }}
            className="h-full gradient-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-secondary-dark">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-lg text-text-secondary-dark leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
