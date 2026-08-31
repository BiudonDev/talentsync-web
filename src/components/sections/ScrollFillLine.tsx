'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Process connector: a track that fills as the section scrolls past.
 *
 * It is the smallest possible `'use client'` leaf (Rule 10) — `Process.tsx`
 * stays a server component and the rest of `/` keeps its zero-JS budget, while
 * the framer-motion `useScroll` + `useTransform` progress fill comes back
 * exactly as it worked before the section was moved to the server.
 *
 * The ref sits on an `absolute inset-0` box rather than on the track itself.
 * The horizontal track is 4px tall, and a 4px-tall target makes the
 * `['start 0.8', 'end 0.5']` offset degenerate — it would snap from empty to
 * full in one scroll frame. `inset-0` reproduces the box the old container ref
 * measured, so both orientations read the same progress the old one did.
 *
 * Rule 7 is handled in CSS, NOT in JS. `useReducedMotion()` cannot do it: it
 * returns `null` server-side but the REAL boolean on the client's very first
 * render (`useState(prefersReducedMotion.current)` after a synchronous
 * `initPrefersReducedMotion()`), so a reduced-motion visitor gets SSR `0%` and
 * client `100%` — and React hydration does not patch a mismatched inline style.
 * Measured on the built site: `__reactProps.style.height === '100%'` while
 * `element.style.height === '0%'`, i.e. the line rendered EMPTY for exactly the
 * users Rule 7 exists to protect. `motion-reduce:*-full!` wins over the inline
 * style from a media query instead, so it is correct before hydration, after
 * hydration, and with JS off.
 */
export default function ScrollFillLine({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] })
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const horizontal = orientation === 'horizontal'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        // Horizontal only once the grid is four across; vertical only while the
        // grid is one column. Between them the grid is two centred columns and
        // a single connector cannot join them without striking through the body
        // text — which is what the pre-server version did, by parking the
        // vertical track at a quarter width for the whole sm-to-lg range.
        horizontal ? 'hidden lg:block' : 'sm:hidden',
      )}
    >
      <div
        className={cn(
          'absolute bg-primary/20',
          horizontal
            // Circles are 80px tall and start at y=0, so their centre is y=40.
            // top-10 + -translate-y-1/2 straddles it whatever the track height.
            ? 'left-0 right-0 top-10 h-1 -translate-y-1/2'
            // left-6 is the 48px circle's centre; -translate-x-1/2 puts the
            // track's centre there instead of its left edge (it was 2px right).
            : 'bottom-0 left-6 top-0 w-1 -translate-x-1/2',
        )}
      >
        <motion.div
          className={cn(
            'gradient-primary',
            horizontal ? 'motion-reduce:w-full!' : 'motion-reduce:h-full!',
          )}
          style={horizontal ? { width: progress, height: '100%' } : { height: progress, width: '100%' }}
        />
      </div>
    </div>
  )
}
