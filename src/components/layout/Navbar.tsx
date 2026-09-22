'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi'
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
 *
 * `prefetch={false}` on all three <Link>s — see the page-weight note in
 * Footer.tsx. These seven links sit in the viewport on every route, so they are
 * the single largest prefetch source on the site.
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

/**
 * The header nav split into a "Services" dropdown (the five `group: 'service'`
 * rows in `primaryNav`) plus the three flat items after it. Added 21 September
 * 2026 in response to a real bug, not a redesign for its own sake: at a
 * half-open desktop window (roughly 1024–1140px, `lg:` but under the width
 * seven flat links need), the row's `overflow-x-auto` scroller clipped
 * everything past "Outsourcing" — and clipped that word itself mid-string —
 * with no visible affordance telling a visitor there was more to scroll to.
 * A click-triggered dropdown sidesteps 00-design-contract.md §5.2's original
 * objection to one ("a hover dropdown has no mobile equivalent, and pushes the
 * accordion past its headroom"): this one is click, not hover, and it is
 * `lg:`-only — the mobile accordion below is untouched, still flat, still the
 * same measured height budget.
 */
const isServiceRoute = (r: (typeof primaryNav)[number]) => r.group === 'service'

export default function Navbar({ variant = 'solid' }: NavbarProps) {
  const [expanded, setExpanded] = useState(variant === 'solid')
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  // Screen coordinates for the portalled panel — see the note on
  // `openServices` below for why this exists at all.
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)
  const current = href(usePathname())
  const toggleRef = useRef<HTMLButtonElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)
  const servicesToggleRef = useRef<HTMLButtonElement>(null)
  // The portalled panel lives outside `servicesRef`'s DOM subtree (it is no
  // longer a descendant once portalled to `document.body`), so the
  // outside-click check below needs its own ref or every click inside the
  // panel would read as "outside" and close it before the link navigates.
  const panelRef = useRef<HTMLDivElement>(null)

  const serviceLinks = primaryNav.filter(isServiceRoute)
  const flatLinks = primaryNav.filter((r) => !isServiceRoute(r))

  useEffect(() => {
    if (variant !== 'hero') return
    const onScroll = () => setExpanded(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  // Scroll lock + Escape. Body computes `overflow-x: clip` from globals.css; the
  // inline style overrides both axes while open and is removed on close.
  //
  // Escape must also hand focus back to the toggle (WCAG 2.4.3). Closing sets
  // `inert` on the menu wrapper, which yanks the focused link out of the a11y
  // tree and drops focus to <body> — the next Tab then restarts from the top of
  // the page. `.focus()` runs before React commits `inert`, so the toggle is
  // already holding focus by the time the menu is inerted and nothing is orphaned.
  // The other two close paths do not need this: the toggle button's own onClick
  // already has focus, and a menu link navigates.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /**
   * The panel is portalled to `document.body` — see the render below — because
   * it used to live inside the `overflow-hidden` width-animation wrapper two
   * blocks down. That wrapper has to clip its own content to animate the
   * 0fr->1fr collapse, and CSS `overflow: hidden` clips an absolutely
   * positioned descendant too, wherever it is nested; the panel was rendering,
   * just invisible, clicks landing on nothing (`inert` correctly disabled
   * while `servicesOpen`, but the box itself never painted). Escaping the clip
   * means it can no longer inherit its position from a `position: relative`
   * ancestor, so this measures the trigger's real screen position instead.
   */
  const openServices = () => {
    const r = servicesToggleRef.current?.getBoundingClientRect()
    if (r) setMenuPos({ top: r.bottom + 8, left: Math.min(r.left, window.innerWidth - 288 - 16) })
    setServicesOpen(true)
  }

  // Escape and outside-click close it, same as any disclosure widget; unlike
  // the mobile panel this is a small popover, not full-screen, so it does not
  // lock body scroll. Each link inside it also closes it directly on click
  // (below, same pattern as the mobile panel's own links), so a same-tab
  // navigation never leaves it open over the new page — setting state from a
  // route-watching effect instead trips the "don't setState synchronously in
  // an effect" lint rule for no benefit here. Resize/scroll re-measure the
  // trigger rather than closing the panel outright, since the header is
  // `fixed` and a page scroll never actually moves it.
  useEffect(() => {
    if (!servicesOpen) return
    const reposition = () => {
      const r = servicesToggleRef.current?.getBoundingClientRect()
      if (r) setMenuPos({ top: r.bottom + 8, left: Math.min(r.left, window.innerWidth - 288 - 16) })
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setServicesOpen(false)
      servicesToggleRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (servicesRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setServicesOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', reposition)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('resize', reposition)
    }
  }, [servicesOpen])

  const isActive = (path: string) => (path === '/' ? current === '/' : current.startsWith(path))
  const servicesActive = serviceLinks.some((r) => isActive(r.path))
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
              prefetch={false}
              aria-current={current === '/' ? 'page' : undefined}
              className="flex min-h-11 shrink-0 items-center text-xl font-bold whitespace-nowrap text-gradient focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {siteConfig.name}
            </Link>

            {/* Desktop links. Always mounted now, clipped by an animated grid
                track instead of a hard conditional mount — the collapse<->
                expand used to be an instant DOM insert/remove, which is what
                read as "abrupt" against the smoothly-eased pill restyle below.
                `grid-cols-[0fr]` <-> `grid-cols-[1fr]` is the same fr-unit
                interpolation trick the mobile panel already uses on the
                height axis (`grid-rows-[0fr]`/`[1fr]`, below), generalised to
                width; both sides are bare `Xfr` tracks on purpose; a mismatch
                with Tailwind's own `grid-cols-1` (`repeat(1,minmax(0,1fr))`)
                does not interpolate; it jumps instead of tweening. `inert`
                keeps the collapsed list out of the focus order and the
                accessibility tree, which is what actually fixes the old
                AnimatePresence bug (a clipped-but-still-Tab-reachable list) —
                not the removal from the DOM, so removal is no longer needed.
                The row is its own overflow-x-auto scroller (Rule 4) as a
                last resort for very narrow `lg:` widths; the "Services"
                dropdown below is what keeps it from being needed in the
                first place at the widths that used to clip. */}
            <div
              inert={!expanded}
              className={cn(
                'hidden min-w-0 overflow-hidden lg:grid',
                'motion-safe:transition-[grid-template-columns] motion-safe:duration-500 motion-safe:ease-out',
                expanded ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
              )}
            >
              <ul
                className={cn(
                  'flex min-w-0 items-center gap-1 overflow-x-auto py-1 scrollbar-hide',
                  'motion-safe:transition-opacity motion-safe:duration-300',
                  expanded ? 'opacity-100 motion-safe:delay-200' : 'opacity-0',
                )}
              >
                {/* The five service/market pages, grouped — see the note above
                    `isServiceRoute`. `relative` anchors the absolute panel;
                    the click-outside/Escape handling lives in the effect above. */}
                <li ref={servicesRef} className="relative shrink-0">
                  <button
                    ref={servicesToggleRef}
                    type="button"
                    onClick={() => (servicesOpen ? setServicesOpen(false) : openServices())}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-current={servicesActive && !servicesOpen ? 'page' : undefined}
                    className={cn(
                      LINK_BASE,
                      'gap-1 rounded-lg px-2 text-sm font-medium',
                      'aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-primary)]',
                      servicesOpen && 'bg-primary/10 text-primary',
                    )}
                  >
                    Services
                    <HiChevronDown
                      aria-hidden
                      className={cn('size-4 motion-safe:transition-transform', servicesOpen && 'rotate-180')}
                    />
                  </button>

                  {/* Portalled to <body> — see the comment on `openServices`
                      above for why this cannot render in place. Fixed
                      positioning against the measured trigger rect, not
                      absolute against a relative ancestor, since it no longer
                      has one that matters. z-[60] matches the site's other
                      above-the-z-50-header layer (the skip-to-content link). */}
                  {servicesOpen &&
                    menuPos &&
                    createPortal(
                      <div
                        ref={panelRef}
                        id="services-menu"
                        role="menu"
                        aria-label="Services"
                        style={{ top: menuPos.top, left: menuPos.left }}
                        className="fixed z-[60] w-72 overflow-hidden rounded-2xl border border-border bg-surface shadow-float"
                      >
                        <ul className="p-2">
                          {serviceLinks.map((r) => (
                            <li key={r.path}>
                              <Link
                                href={r.path}
                                prefetch={false}
                                role="menuitem"
                                onClick={() => setServicesOpen(false)}
                                aria-current={isActive(r.path) ? 'page' : undefined}
                                className={cn(
                                  LINK_BASE,
                                  'w-full rounded-xl px-3 py-3 text-sm font-medium',
                                  'aria-[current=page]:bg-primary/10',
                                )}
                              >
                                {r.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>,
                      document.body,
                    )}
                </li>

                {flatLinks.map((r) => (
                  <li key={r.path} className="shrink-0">
                    <Link
                      href={r.path}
                      prefetch={false}
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
            </div>

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
                ref={toggleRef}
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

        {/* Re-measured in Chrome at 360x740 with all seven items + CTA:
            pt-2 (8) + 7x48 (336) + 6x8 gap (48) + CTA (mt-3 12 + 48) + pb-4 (16)
            = 468px of panel under a 60px pill = 528px open, bottom edge 544px,
            196px of headroom against a 632px max-h. Closed the panel is 0px, so
            the pill is exactly the 56px content row + 2x2px borders = 60px and
            --nav-h (16px top offset + 60px = 76px) holds at 4.75rem.
            The max-h/overflow-y-auto is the belt for a shorter viewport. */}
        <div
          id="mobile-menu"
          inert={!open}
          className={cn(
            'grid overflow-hidden motion-safe:transition-[grid-template-rows] motion-safe:duration-200 lg:hidden',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          {/* `pb-4` lives on the inner block, never on this scroll container:
              `grid-template-rows: 0fr` collapses the CONTENT box only, so padding
              on the grid item survives the collapse and leaves the closed pill
              16px too tall (and every route's --nav-h clearance wrong by 16px).
              Padding on a child inside the clip collapses with the row, and is
              also the cross-browser-safe way to get trailing space inside a
              scroll container. */}
          <div className="max-h-[calc(100dvh-var(--nav-h)-2rem)] min-h-0 overflow-y-auto overscroll-contain px-4">
            <ul className="space-y-2 pt-2">
              {primaryNav.map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(r.path) ? 'page' : undefined}
                    className={cn(LINK_BASE, 'rounded-xl px-4 py-3 aria-[current=page]:bg-primary/10')}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pb-4">
              <Button href={siteConfig.calendlyUrl} external className="mt-3 w-full">
                Book A Meeting
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
