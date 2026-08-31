'use client'

import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig } from '@/data/content'

/**
 * The h1 is the page's target query — `hire software engineers Eastern Europe`
 * — spelled out, not the brand name. It rendered the literal string
 * "TalentSync" until now, which is why `/` ranked for nothing but its own name.
 * The brand moved into the lede, where it still does entity work.
 *
 * Heading string is the display role from 00-design-contract.md 2.3 minus its
 * `md:text-6xl` step: `md:` is banned (Rule 1), and 5xl -> 7xl at `lg` is the
 * same curve with one fewer breakpoint.
 *
 * `motion` here is safe because `src/app/page.tsx` wraps the page in
 * `<MotionConfig reducedMotion="user">` — every `initial`/`animate` below is
 * dropped for a visitor who asked for reduced motion (Rule 7).
 */
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
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6"
        >
          Hire Senior Software Engineers from{' '}
          <span className="text-gradient">Eastern Europe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty mb-8 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={siteConfig.calendlyUrl} external>
            Book a 30-minute call
          </Button>
          <Button variant="secondary" href={`mailto:${siteConfig.email}?subject=Role%20brief`}>
            Email the role to Victor
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
