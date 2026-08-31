'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/data/content'
import { primaryNav } from '@/data/routes'
import { href } from '@/lib/seo'
import { cn } from '@/lib/utils'

/**
 * Zero framer-motion, on purpose. Navbar + Footer render on all 20 routes, so
 * either one importing framer-motion pins 65,775 B into the SHARED chunk and no
 * amount of de-motioning the leaf pages recovers it (00-design-contract.md §6.2
 * step 2). The three motions it used to own are covered by:
 *   - link reveal  -> conditional render (no clipped-but-focusable links)
 *   - pill restyle -> motion-safe:transition on colour/shadow
 *   - accordion    -> the grid-rows-[0fr] -> grid-rows-[1fr] trick (§5.2)
 * The old `initial={{ y: -100 }}` entrance slide is DROPPED rather than ported:
 * it needs a @keyframes in globals.css (not this package's file), and a navbar
 * that slides in on every one of 20 route loads is worse than one that is just
 * there. Add it back in globals.css if the owner wants it.
 */

const LINK_BASE =
  'flex min-h-11 items-center whitespace-nowrap motion-safe:transition-colors ' +
  'text-text-secondary hover:bg-primary/10 hover:text-primary ' +
  'aria-[current=page]:text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export interface NavbarProps {
  /**
   * `hero` keeps the reveal-on-scroll effect the homepage was built around.
   * `solid` (the default, and what PageShell uses) shows the links immediately —
   * on a heroless interior route, reveal-on-scroll means the only link above the
   * fold at >=1024px is "Book A Meeting" (§5.1).
   */
  variant?: 'hero' | 'solid'
}

export default function Navbar({ variant = 'solid' }: NavbarProps) {
  const [expanded, setExpanded] = useState(variant === 'solid')
  const [open, setOpen] = useState(false)
  const current = href(usePathname())

  useEffect(() => {
    if (variant !== 'hero') return
    const onScroll = () => setExpanded(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  // Scroll lock + Escape. Body computes `overflow-x: clip` from globals.css; the
  // inline style overrides both axes while open and is removed on close.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (path: string) => (path === '/' ? current === '/' : current.startsWith(path))
  // Translucent only over an unscrolled hero. An open menu forces the solid
  // surface so the link labels keep their measured 6.74:1 on `surface`.
  const glass = variant === 'hero' && !expanded && !open

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav
        aria-label="Main"
        className={cn(
          'w-[calc(100vw-16px)] rounded-4xl border-2 backdrop-blur-xl',
          'lg:w-auto lg:max-w-[calc(100vw-2rem)] lg:rounded-full',
          'motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-500',
          glass ? 'border-border bg-surface/50 shadow-float' : 'border-primary/60 bg-surface/70 shadow-glow',
        )}
      >
        <div className="px-4 lg:px-6">
          <div className="flex h-14 items-center justify-between gap-4 lg:h-16">
            <Link
              href="/"
              aria-current={current === '/' ? 'page' : undefined}
              className="flex min-h-11 shrink-0 items-center text-xl font-bold whitespace-nowrap text-gradient focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {siteConfig.name}
            </Link>

            {/* Desktop links. Conditional render, not opacity/visibility: a
                clipped-but-present list is still Tab-reachable, which is the
                bug the old AnimatePresence version shipped. The row is its own
                overflow-x-auto scroller (Rule 4) because seven real labels are
                ~1130px wide with the logo and CTA — that fits from ~1140px up
                and scrolls inside the pill below it, instead of overflowing. */}
            {expanded && (
              <ul className="hidden min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 scrollbar-hide lg:flex">
                {primaryNav.map((r) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      aria-current={isActive(r.path) ? 'page' : undefined}
                      className={cn(
                        LINK_BASE,
                        'rounded-lg px-2 text-sm font-medium',
                        'aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-primary)]',
                      )}
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex shrink-0 items-center gap-3">
              <Button
                href={siteConfig.calendlyUrl}
                external
                size="sm"
                className="hidden whitespace-nowrap sm:inline-flex"
              >
                Book A Meeting
              </Button>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid size-11 place-items-center rounded-full text-text-secondary motion-safe:transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
              >
                {open ? <HiX aria-hidden className="size-6" /> : <HiMenu aria-hidden className="size-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Measured at 360x740 with all seven items + CTA: pt-2 (8) + 7x44 +
            6x8 gap (48) + CTA (12 + 44) + pb-4 (16) = 436px of panel under a
            76px header = 512px pill, bottom edge 528px, 212px of headroom.
            The max-h/overflow-y-auto is the belt for a shorter viewport. */}
        <div
          id="mobile-menu"
          inert={!open}
          className={cn(
            'grid overflow-hidden motion-safe:transition-[grid-template-rows] motion-safe:duration-200 lg:hidden',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="max-h-[calc(100dvh-var(--nav-h)-2rem)] min-h-0 overflow-y-auto overscroll-contain px-4 pb-4">
            <ul className="space-y-2 pt-2">
              {primaryNav.map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(r.path) ? 'page' : undefined}
                    className={cn(LINK_BASE, 'rounded-xl px-4 py-3 aria-[current=page]:bg-primary/10')}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={siteConfig.calendlyUrl} external className="mt-3 w-full">
              Book A Meeting
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
