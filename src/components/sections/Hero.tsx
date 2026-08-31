'use client'

import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig } from '@/data/content'

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden animated-bg">
      {/* Animated color rays */}
      <div className="color-rays pointer-events-none" aria-hidden="true">
        <div className="color-ray color-ray-1" />
        <div className="color-ray color-ray-2" />
        <div className="color-ray color-ray-3" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6"
        >
          <span className="text-gradient">{siteConfig.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl font-semibold text-text-primary text-pretty mb-4"
        >
          {siteConfig.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty mb-8 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={siteConfig.calendlyUrl} external>
            Book A Meeting
          </Button>
          <Button variant="secondary" href="#about">
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="inline-flex p-2 -m-2 text-text-secondary hover:text-primary transition-colors motion-safe:animate-bounce focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Scroll to content"
        >
          <HiChevronDown className="w-8 h-8" aria-hidden="true" />
        </a>
      </div>

      {/* Gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
