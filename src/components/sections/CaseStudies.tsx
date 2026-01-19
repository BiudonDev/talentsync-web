'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper, Card } from '@/components/ui'
import { caseStudies } from '@/data/content'

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="case-studies" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Success <span className="text-gradient">Stories</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          See how we&apos;ve helped companies build exceptional teams
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.company}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full">
              {/* Placeholder image */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold">{study.company}</h3>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {study.industry}
                </span>
              </div>

              <ul className="space-y-2">
                {study.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-text-secondary-light dark:text-text-secondary-dark"
                  >
                    <span className="text-primary mt-1">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
