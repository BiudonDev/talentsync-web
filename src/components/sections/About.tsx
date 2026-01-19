'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">Us</span>
          </h2>
          <div className="space-y-4 text-text-secondary-light dark:text-text-secondary-dark">
            <p className="text-lg">
              TalentSync was founded with a simple mission: to bridge the gap between
              exceptional tech talent and innovative companies building the future.
            </p>
            <p className="text-lg">
              We combine deep industry expertise with cutting-edge AI technology to
              identify, assess, and place candidates who don&apos;t just meet requirements—they
              exceed expectations.
            </p>
            <p className="text-lg">
              Our team has placed hundreds of engineers, data scientists, and technical
              leaders at startups and enterprises across Europe and beyond.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
