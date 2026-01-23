'use client'

import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg">
      {/* Animated color rays */}
      <div className="color-rays pointer-events-none">
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
        >
          <span className="text-gradient">{siteConfig.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary mb-4"
        >
          {siteConfig.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
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
          <Button variant="secondary" onClick={() => scrollToSection('about')}>
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <button
          onClick={() => scrollToSection('about')}
          className="text-text-secondary hover:text-primary transition-colors"
          aria-label="Scroll to content"
        >
          <HiChevronDown className="w-8 h-8" />
        </button>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-background pointer-events-none" />
    </section>
  )
}
