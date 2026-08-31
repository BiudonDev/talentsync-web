'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The smallest possible `'use client'` leaf (Rule 10). It exists so `/` can stay
 * a server component — and therefore keep `export const metadata` — while still
 * putting every `motion` descendant behind `prefers-reduced-motion` (Rule 7).
 *
 * `reducedMotion="user"` makes framer-motion read the OS setting and drop
 * transform/layout animations for anyone who asked for that, without touching a
 * single `initial`/`animate` prop in the section components. The CSS-side
 * animations (`.color-ray`, `animate-bounce`) are already handled by the
 * `@media (prefers-reduced-motion: reduce)` block in `globals.css`.
 *
 * `children` is a slot, so the server components passed into it — FAQ, and the
 * JSON-LD around it — still render on the server. Nothing is pulled into the
 * client bundle by passing through here.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
