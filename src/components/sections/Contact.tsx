'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineMail } from 'react-icons/hi'
import { SectionWrapper, Button } from '@/components/ui'
import { siteConfig } from '@/data/content'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="contact">
      <div ref={ref} className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
        >
          Let&apos;s <span className="text-gradient">Work Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8"
        >
          Ready to find your next great hire? Get in touch and let&apos;s discuss
          how we can help build your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-light dark:bg-surface-dark hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <HiOutlineMail className="w-5 h-5 text-secondary-dark" />
            </div>
            <span className="font-medium">{siteConfig.email}</span>
          </a>

          <Button href={siteConfig.calendlyUrl} external>
            Book A Meeting
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
