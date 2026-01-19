'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="process">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Our streamlined process gets you from search to hire efficiently
        </p>
      </div>

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {process.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative text-center"
          >
            {/* Connector line */}
            {index < process.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20" />
            )}

            {/* Step number */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary-dark">
                {String(step.step).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
