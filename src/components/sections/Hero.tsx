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
 * 6xl step at the md breakpoint, which Rule 1 bans; 5xl -> 7xl at `lg` is the
 * same curve with one fewer breakpoint. The class name is spelled out in words
 * on purpose — Tailwind's scanner reads comments, so writing it literally here
 * would emit the very banned utility this note explains the absence of.
 *
 * NO framer-motion, and therefore no `'use client'` (Rule 10). `initial` is
 * serialised into the static export as `style="opacity:0;transform:…"`, so with
 * JS off — or for any crawler that reads raw HTML without executing scripts —
 * the target-query h1 and the canonical entity paragraph rendered INVISIBLE.
 * `MotionConfig reducedMotion="user"` cannot help: it is a runtime JS guard and
 * the artifact is already written by then.
 *
 * The entrance is `.animate-fade-up` (globals.css) instead. Its visible state is
 * the SSR default and CSS animates *away from* opacity 0, so the static markup
 * carries no inline opacity at all. Rule 7 is met by the global
 * `@media (prefers-reduced-motion: reduce)` block, which zeroes both duration
 * and delay — same mechanism Testimonials.tsx already relies on.
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
        <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6">
          Hire Senior Software Engineers from{' '}
          <span className="text-gradient">Eastern Europe</span>
        </h1>

        <p
          style={{ animationDelay: '100ms' }}
          className="animate-fade-up text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty mb-8 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </p>

        <div
          style={{ animationDelay: '200ms' }}
          className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={siteConfig.calendlyUrl} external>
            Book a 30-minute call
          </Button>
          {/* Client feedback item 6: one wording that works for an engineer, hourly
              capacity, a dedicated team or a whole project; subject pre-filled. */}
          <Button variant="secondary" href={siteConfig.quoteHref}>
            {siteConfig.quoteLabel}
          </Button>
        </div>
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
