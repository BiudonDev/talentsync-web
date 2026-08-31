'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import { SectionWrapper, Card, Button } from '@/components/ui'
import { careers, siteConfig } from '@/data/content'

export default function Careers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="careers">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
          Join Our <span className="text-gradient">Team</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty max-w-2xl mx-auto">
          Help us connect exceptional talent with innovative companies
        </p>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto space-y-4">
        {careers.length > 0 ? (
          careers.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-relaxed text-text-secondary">
                    <span className="flex items-center gap-1">
                      <HiOutlineLocationMarker className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {job.type}
                    </span>
                  </div>
                  <p className="mt-2 text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
                    {job.description}
                  </p>
                </div>
                <Button
                  href={`mailto:${siteConfig.email}?subject=Application: ${job.title}`}
                  className="w-full sm:w-auto sm:shrink-0"
                >
                  Apply
                </Button>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty mb-4">
              No open positions at the moment.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center pt-8"
        >
          <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty mb-4">
            Don&apos;t see a role that fits? We&apos;re always looking for talented people.
          </p>
          <Button
            href={`mailto:${siteConfig.email}?subject=Speculative Application`}
            variant="secondary"
          >
            Send Your CV Anyway
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
