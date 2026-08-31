# THE MOBILE-FIRST DESIGN CONTRACT
**TalentSync · v1.0 · binding on every implementation subagent**

Everything below was compiled and grepped out of a real production build at `cc04769`. No class string appears here unless it emitted CSS in a probe build. Three corrections to prior audits are marked ⚠.

**Absolute paths:** repo root `/Users/adrianzabica/Desktop/talentsync-web`. Validator: `/Users/adrianzabica/Desktop/talentsync-web/scripts/validate-pages.mjs` (written, runs, currently exits 1 with 23 real findings).

---

## 1 · THE TEN RULES

Paste this block verbatim into every implementation prompt.

```
1.  Author at 360px first. `sm:` and `lg:` may only CHANGE what 360 established.
    `md:` `xl:` `2xl:` are banned — one exception: a 2→3 column step on a dense card grid.
2.  No colour, radius, shadow, or heading size outside the token table (§2.2/§2.3).
    Not in the table = does not ship. No arbitrary hex, ever.
3.  Every interactive element ≥44×44 CSS px with ≥8px between neighbours.
    Grow the HIT BOX (`p-2 -m-2`, `min-h-11`), never the visual.
4.  Zero horizontal scroll at 320px. Wide content scrolls inside its OWN
    `overflow-x-auto` container. `body` carries `overflow-x: clip` as the guard.
5.  Exactly one <h1> per route, no skipped levels, and the h1 carries the page's
    target query — never the bare brand name.
6.  Everything interactive is Tab-reachable and shows
    `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`.
    Never `focus:` (fires on mouse). Never `outline-none` without a replacement.
7.  All motion behind prefers-reduced-motion: `motion-safe:` for Tailwind,
    `<MotionConfig reducedMotion="user">` for Framer. No `repeat: Infinity` off `/`.
8.  Nothing hidden from mobile that desktop gets. `hidden md:block` on CONTENT is a
    bug — reflow it. (Decoration may be hidden; give it `aria-hidden`.)
9.  Every <img> carries width, height, alt, a hand-built srcset, and `loading="lazy"`
    unless it is the LCP image. `images.unoptimized:true` — next/image gives you a bare <img>.
10. New routes are server components and import ZERO framer-motion.
    `'use client'` goes on the smallest leaf that actually holds state.
```

---

## 2 · FOUNDATIONS (fix these before route #1)

### 2.1 `globals.css` — corrected head

`@theme inline` → `@theme`. **Required, not cosmetic:** `inline` keeps `--color-*` out of `:root`, which is why `.color-ray-*` hardcodes `#FFB85A` seven times. Verified: dropping `inline` emits `:root,:host{--color-primary:#ffb85a;…}` so raw CSS `var(--color-primary)` resolves. Build passes, CSS 43,712 → ~45,500 B.

```css
@import "tailwindcss";   /* line 1. The Google Fonts @import is DELETED — see §5.2 */

@theme {
  /* Brand */
  --color-primary:        #FFB85A;
  --color-primary-light:  #FFCB85;
  --color-primary-dark:   #E5A550;
  --color-secondary:      #574A44;   /* SURFACES ONLY — never text, 2.2:1 */
  --color-secondary-dark: #3D332E;   /* ink ON amber */

  /* Surfaces */
  --color-background:     #121214;
  --color-background-alt: #141416;   /* NEW: what bg-background-dark meant */
  --color-surface:        #1C1C1F;
  --color-border:         #262626;   /* NEW: replaces every border-neutral-800 */

  /* Text */
  --color-text-primary:   #F5F5F5;
  --color-text-secondary: #A3A3A3;

  /* Elevation — extracted from the two magic strings in Navbar.tsx:55-56 */
  --shadow-float: 0 8px 32px rgb(0 0 0 / 0.4);
  --shadow-glow:  0 8px 32px rgb(255 184 90 / 0.2);

  --font-sans: var(--font-montserrat), system-ui, sans-serif;
}

/* Navbar geometry — DERIVED, one source of truth. top-4 + h-14 + border-2*2 = 76px */
:root { --nav-h: 4.75rem; }
@media (min-width: 64rem) { :root { --nav-h: 5.25rem; } }  /* top-4 + h-16 + 4 = 84px */

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--nav-h) + 1rem);   /* 92px / 100px */
}
body { overflow-x: clip; }                          /* Rule 4 structural guard */

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .color-ray { animation: none !important; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**Deleted from `globals.css`:** `--color-secondary-light` (0 usages), `.section-container` (0), `.section-padding` (0, and it contradicts `SectionWrapper`), `.card` (0 — `Card.tsx` reimplements it inline, so the class is actively misleading), `@keyframes gradient-shift` (0), `@keyframes ray-rotate` (0).

**Deleted from `src/lib/utils.ts`:** `scrollToSection()` entirely. `scroll-padding-top` on `html` does the same job for plain `<a href="#x">`, for browser Find-in-page, for `scrollIntoView`, and — unlike the JS — for cross-page anchors like `/services/x/#faq`. Keep `cn()`.

### 2.2 Colour tokens — the complete permitted set

| Token | Hex | Use for | Never for |
|---|---|---|---|
| `background` | `#121214` | page ground, odd bands | text, card fills |
| `background-alt` | `#141416` | even bands, all heroes | cards (vanishes against `surface`) |
| `surface` | `#1C1C1F` | cards, inputs, accordion rows, TOC, footer, CTA band | a section band |
| `border` | `#262626` | every hairline, `divide-border`, `<hr>` | text, focus rings |
| `text-primary` | `#F5F5F5` | headings, `<strong>` | 40-clause legal body (17.3:1 is too hot) |
| `text-secondary` | `#A3A3A3` | all body copy, meta, captions | headings, anything <12px |
| `primary` | `#FFB85A` | the single accent: buttons, links, `::marker`, focus rings, icons | large fills |
| `primary-light` | `#FFCB85` | gradient head, link hover | anything not derived from `primary` |
| `primary-dark` | `#E5A550` | button hover, gradient tail | body text |
| `secondary` | `#574A44` | decorative surfaces only | **text of any kind — 2.2:1** |
| `secondary-dark` | `#3D332E` | ink on amber (`gradient-primary`, `bg-primary`) | text on any dark surface |

Measured: `#F5F5F5/#121214` 17.3 · `#A3A3A3/#121214` 7.49 · `#A3A3A3/#1C1C1F` 6.74 · `#FFB85A/#121214` 10.9 · `#3D332E/#FFB85A` 7.1 · `#574A44/#121214` **2.22 FAIL**.

### 2.3 Radius / shadow / type

| `rounded-lg` 8 | buttons, inputs, `<code>` |
| `rounded-xl` 12 | rows inside a card, mobile menu items |
| `rounded-2xl` 16 | **cards** — the default container radius |
| `rounded-3xl` 24 | oversized feature blocks |
| `rounded-4xl` 32 | only the open mobile nav pill (replaces `rounded-[32px]`, verified emitting) |
| `rounded-full` | pills, tags, avatars, dots, icon buttons |

`shadow-sm` rest · `shadow-lg` hover · `shadow-xl` the one Testimonials block · `shadow-float` / `shadow-glow` floating chrome only. Nothing else.

**Type scale — copy verbatim, these are the only heading strings allowed:**

| Role | String |
|---|---|
| display (`/` hero only, 1 per site) | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance` |
| **h1** (every route) | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance` |
| **h2** | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance` |
| **h3** | `text-xl sm:text-2xl font-bold` |
| **h4** | `text-base sm:text-lg font-semibold` |
| lede | `text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty` |
| body | `text-base sm:text-lg leading-relaxed text-text-secondary text-pretty` |
| body-sm | `text-sm leading-relaxed text-text-secondary` |
| caption | `text-xs font-medium uppercase tracking-wide text-text-secondary` |

Today `h1` and 5 of 8 `h2`s are both `text-4xl` at 360px — **there is no heading hierarchy at all on the primary target device.** The table fixes it by dropping h2 one step. `text-balance` is the single highest-value mobile typography change here; it stops 36px headings orphaning a word on line 4 of a 375px screen. Floor is `text-sm` (14px) — `text-xs` is permitted only for the caption role.

### 2.4 The orphaned-token sed (run once, in order)

⚠ **`bg-primary-dark` is NOT broken.** The built CSS contains `.btn-primary:hover{background-color:var(--color-primary-dark)}`. Do not "fix" it. The real orphan count is 16.

```bash
cd /Users/adrianzabica/Desktop/talentsync-web
sed -i '' 's/bg-background-dark/bg-background-alt/g'      src/components/sections/{About,Services,Process,CaseStudies}.tsx
sed -i '' 's/bg-surface-dark/bg-surface/g'                 src/components/sections/About.tsx
sed -i '' 's/text-text-secondary-dark/text-text-secondary/g' src/components/sections/{About,Services,Process,CaseStudies}.tsx
sed -i '' 's/border-neutral-800/border-border/g'           src/components/**/*.tsx
grep -rn -- '-dark' src/ | grep -v 'secondary-dark\|primary-dark'   # must print nothing
```

⚠ Match `text-text-secondary-dark` with the full `text-text-` prefix — there are 10 legitimate `text-secondary-dark` usages (ink on amber) that must survive.

### 2.5 `.text-gradient` — the corrected gradient

`to-secondary` `#574A44` measures **2.20:1** on `#121214`, 2.16 on the hero, 2.00 on the footer. The 3:1 large-text floor is missed on every surface in the system, on ~18 h1s and ~80 h2s.

```css
.text-gradient { @apply bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent; }
```

`#FFCB85 → #E5A550`. Worst stop `#E5A550`: **8.8:1** on `#121214`, 8.7 on `#141416`, **8.0:1** on `#1C1C1F`. AAA large / AA normal everywhere. Rejected: `to-primary` (no visible sweep left), `from-primary to-primary-dark` (passes at 8.4 but throws away `--color-primary-light`, which currently has zero usages). Two existing tokens, zero additions, keeps a real light→dark direction.

### 2.6 Buttons, cards, focus — corrected definitions

The current ring is `focus:ring-2 focus:ring-primary/50`, which renders `rgb(136,101,55)`: 3.76:1 against the page (pass) but **2.90:1 against the amber button it outlines** — WCAG 2.2 SC 2.4.11 failure. `outline` + `outline-offset` puts the ring on the *page* background instead, where `#FFB85A` measures 10.9:1.

```css
@layer components {
  .btn-base {
    @apply inline-flex items-center justify-center gap-2 min-h-11 rounded-lg font-semibold;
    @apply transition-[background-color,color,box-shadow,scale] duration-200;
    @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary;
    @apply motion-safe:hover:scale-105 hover:shadow-lg;
  }
  /* padding now lives in Button's SIZES map — do not put px/py here */
  .btn-primary   { @apply btn-base bg-primary hover:bg-primary-dark text-secondary-dark; }
  .btn-secondary { @apply btn-base border-2 border-primary text-primary hover:bg-primary hover:text-secondary-dark; }

  .card {
    @apply bg-surface rounded-2xl border border-border p-6 sm:p-8;
    @apply motion-safe:transition-all motion-safe:duration-300;
    @apply has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary;
  }
  .card-hover { @apply shadow-sm hover:shadow-lg motion-safe:hover:-translate-y-1; }
}
```

`min-h-11` = 44px, which the `sm` button size (36px today) does not otherwise reach. `has-[a:focus-visible]` verified emitting — it gives the whole card a ring when its stretched link is focused.

**`Button.tsx` — replacement.** Current signature has no `type`, so it **defaults to `submit`** and every Button inside the planned `/contact` form will submit it. It also emits a raw `<a>` for internal links: full reload, no prefetch, on 18 routes.

```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SIZES = { sm: 'px-5 py-2 text-sm', md: 'px-6 py-3 text-base' } as const

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: keyof typeof SIZES
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export default function Button({
  children, variant = 'primary', size = 'md', href, external = false,
  onClick, type = 'button', disabled, className, ...rest
}: ButtonProps) {
  const cls = cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', SIZES[size],
                 disabled && 'pointer-events-none opacity-50', className)
  if (href && (external || /^(https?:|mailto:|tel:)/.test(href)))
    return <a href={href} target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined} className={cls} {...rest}>{children}</a>
  if (href) return <Link href={href} className={cls} {...rest}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{children}</button>
}
```

Then `Navbar.tsx:106` becomes `size="sm" className="hidden sm:inline-flex whitespace-nowrap"` — the three `!important`s disappear.

**`SectionWrapper.tsx` — replacement.** It concatenates `className` with a template string instead of `cn()`, so a caller can never override a base class: `CaseStudies.tsx:30` passes `py-32` against base `py-24 sm:py-32 lg:py-40` and the winner is decided by stylesheet order, not by the author. It is also `'use client'` for no reason — zero hooks.

```tsx
// src/components/ui/SectionWrapper.tsx   (NO 'use client')
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const WIDTHS = {
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow:  'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  wide:    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',   // comparison/pricing tables only
  full:    'w-full',
} as const

export default function SectionWrapper({
  children, id, band = false, width = 'default', density = 'default', className, innerClassName,
}: {
  children: ReactNode; id?: string; band?: boolean
  width?: keyof typeof WIDTHS; density?: 'default' | 'tight'
  className?: string; innerClassName?: string
}) {
  return (
    <section id={id} className={cn(
      density === 'tight' ? 'py-16 sm:py-20 lg:py-24' : 'py-24 sm:py-32 lg:py-40',
      band && 'bg-background-alt',
      className,
    )}>
      <div className={cn(WIDTHS[width], innerClassName)}>{children}</div>
    </section>
  )
}
```

`Card.tsx` needs one change only: `border-neutral-800` → `border-border`. Otherwise leave it — `cn()`/twMerge already lets callers override padding.

---

## 3 · THE PAGE SHELL

Every new route is **exactly this**. `src/app/page.tsx` is currently `'use client'`, which makes `export const metadata` structurally impossible — that alone blocks all 18 routes.

### 3.1 `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  // no `weight` => next/font pulls the VARIABLE font (100-900) as one file
})

export const metadata: Metadata = {
  metadataBase: new URL('https://talentsync.eu'),
  title: { default: 'TalentSync | Tech Talent from Eastern Europe', template: '%s | TalentSync' },
  description: '…',
  robots: { index: true, follow: true },
  openGraph: { siteName: 'TalentSync', type: 'website', locale: 'en_GB', images: ['/og/default.jpg'] },
  twitter: { card: 'summary_large_image', images: ['/og/default.jpg'] },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
```

`metadataBase` is what makes per-page `alternates.canonical: '/services/x/'` emit an absolute `<link rel="canonical">`. Without it every route inherits `og:url: https://talentsync.eu/`.

### 3.2 `src/components/layout/PageShell.tsx` (server component)

```tsx
import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs'

export default function PageShell({ crumbs, children }: { crumbs: Crumb[]; children: ReactNode }) {
  return (
    <>
      <a href="#main"
         className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]
                    focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3 focus:text-text-primary
                    focus:outline-2 focus:outline-offset-2 focus:outline-primary">
        Skip to content
      </a>
      <Navbar />                                  {/* solid variant — links visible immediately */}
      <main id="main" className="pt-[calc(var(--nav-h)+1rem)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <Breadcrumbs items={crumbs} />
        </div>
        {children}
      </main>
      <Footer />
    </>
  )
}
```

`pt-[calc(var(--nav-h)+1rem)]` on `<main>` clears the fixed pill without a magic number. Verified emitting: `.pt-\[calc\(var\(--nav-h\)\+1rem\)\]{padding-top:calc(var(--nav-h) + 1rem)}`.

### 3.3 A route

```tsx
// src/app/services/software-development-moldova/page.tsx
import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { serviceLocations } from '@/data/services'

const data = serviceLocations['software-development-moldova']

export const metadata: Metadata = {
  title: data.metaTitle,                                    // 15-60 chars, unique
  description: data.metaDescription,                        // 70-160 chars, unique
  alternates: { canonical: `/services/${data.slug}/` },     // trailing slash — trailingSlash:true
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `/services/${data.slug}/` },
}

export default function Page() {
  return (
    <PageShell crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services/' },
      { label: data.h1 },                                   // last crumb: no href
    ]}>
      <ServicePageTemplate data={data} />
    </PageShell>
  )
}
```

### 3.4 Anchor targets

There are none to author. `html { scroll-padding-top: calc(var(--nav-h) + 1rem) }` covers every `<a href="#x">`, every `scrollIntoView`, and browser Find-in-page, at every breakpoint, including cross-page `/services/x/#faq`. Do **not** add `scroll-mt-*` per section, and do **not** import `scrollToSection` — it is deleted.

### 3.5 `sitemap.ts` and `robots.ts` (both work under `output: 'export'`)

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { serviceSlugs, caseSlugs, insightSlugs } from '@/data/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://talentsync.eu'
  const routes = [
    '/', '/about/', '/services/', '/case-studies/', '/insights/', '/contact/',
    '/privacy/', '/terms/', '/cookies/',
    ...serviceSlugs.map(s => `/services/${s}/`),
    ...caseSlugs.map(s => `/case-studies/${s}/`),
    ...insightSlugs.map(s => `/insights/${s}/`),
  ]
  return routes.map(url => ({ url: base + url, lastModified: new Date(),
    priority: url === '/' ? 1 : url.startsWith('/services/') ? 0.8 : 0.5 }))
}
```

---

## 4 · RESPONSIVE PATTERNS

### 4.1 Section band + alternation

```tsx
<SectionWrapper id="benefits" band>…</SectionWrapper>
```
`band` → `bg-background-alt` `#141416`. **Rule: the hero is always `band`; the section immediately after it is always plain; alternate from there.** In a `.map()` template: `band={i % 2 === 1}`.

```
mobile & desktop        #141416  hero
(identical rhythm)      #121214  section 1
                        #141416  section 2
```
**Breaks if wrong:** the site currently has *four consecutive* `bg-background-dark` sections. A band four sections deep is not a band — you get a flat page with no section boundaries, which is exactly what ships today.

### 4.2 Card grid

```
grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3
```
```
360:  [ card ]        1024: [card][card][card]
      [ card ]
      [ card ]
```
The **one permitted `md:`** is `md:grid-cols-2 lg:grid-cols-3` on a 9-item grid that would otherwise jump 1→3. Never put 2 columns of *text cards* below `sm`. **Breaks if wrong:** `Services.tsx` runs 2 columns at 360px, giving 173px cards; the descriptions then need `line-clamp-2` and **72% of the copy is hidden** with no expand affordance. Fix is `grid-cols-1` + `text-sm` + no clamp — one column buys the words back.

### 4.3 Interior hero (NOT `min-h-screen`)

```tsx
<section className="bg-background-alt hero-glow pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
      Software Development Talent in <span className="text-gradient">Moldova</span>
    </h1>
    <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty">…</p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4"><Button …/><Button variant="secondary" …/></div>
  </div>
</section>
```
```
360: [ h1 (2-3 lines) ]      1440: [ h1 ][      ]
     [ lede            ]           [ lede ]
     [ CTA full-width  ]           [CTA][CTA]
     [ CTA full-width  ]
```
Height: ~340px at 360, ~420px at 1440. Because `PageShell` already applies `pt-[calc(var(--nav-h)+1rem)]` to `<main>`, the `pt-28` here is *additional* breathing room, not clearance.

One static glow instead of the homepage's three infinite keyframe rays:
```css
.hero-glow { position: relative; background-image:
  radial-gradient(60rem 20rem at 50% -10%, rgb(255 184 90 / .12), transparent 70%); }
```
**Breaks if wrong:** the homepage `min-h-screen` on an interior page pushes the h1's supporting copy below the fold on every phone. Also change the homepage to `min-h-dvh` — on iOS Safari `100vh` is the *large* viewport, so at first paint both hero CTAs sit under the browser toolbar.

### 4.4 Content + sticky sidebar (service pages)

The sidebar must not be dumped at the bottom on mobile. Use `grid-column` placement so the *source order* is the mobile order and the desktop layout is pure CSS. **One DOM tree, no duplication, no JS.**

```tsx
<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16 lg:items-start">
  <div className="lg:col-start-1 lg:row-start-1 space-y-8">{/* intro + first proof block */}</div>

  <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky
                    lg:top-[calc(var(--nav-h)+1rem)] space-y-4">
    {/* CTA card + key facts. On mobile this lands AFTER the intro — where it converts. */}
  </aside>

  <div className="lg:col-start-1 lg:row-start-2 space-y-8">{/* the long tail */}</div>
</div>
```
```
360:  [ intro       ]        1280: [ intro     ][ CTA   ]
      [ CTA / facts ]  <-- 2nd     [ long tail ][ facts ]
      [ long tail   ]              [           ][sticky ]
```
Verified emitting: `.lg\:grid-cols-\[minmax\(0\,1fr\)_20rem\]{grid-template-columns:minmax(0,1fr) 20rem}` and `.lg\:top-\[calc\(var\(--nav-h\)\+1rem\)\]{top:calc(var(--nav-h) + 1rem)}`.

**Breaks if wrong:** `lg:items-start` (or `lg:self-start`) is mandatory — a row-spanning grid item defaults to `align-self: stretch`, and a stretched item cannot be sticky. Drop it and the sidebar silently scrolls away. `minmax(0,1fr)` not `1fr` — a bare `1fr` refuses to shrink below its content and a long unbroken URL in the prose will blow the grid out horizontally.

### 4.5 Long-form article / legal + TOC

Add to `globals.css`. Requires the non-`inline` `@theme` from §2.1. ⚠ **Use the literal `65ch`, not `var(--max-width-prose)`** — Tailwind hardcodes `.max-w-prose{max-width:65ch}` and never puts that variable in `:root`; the `var()` resolves to nothing and `max-width` silently becomes `none`.

```css
.prose { max-width: 65ch; color: var(--color-text-secondary);
         font-size: 1rem; line-height: 1.75; text-wrap: pretty; }
@media (min-width: 40rem) { .prose { font-size: 1.125rem; } }
.prose > * + * { margin-top: 1.25em; }
.prose h2 { margin: 2.5em 0 .75em; font-size: 1.5rem; line-height: 1.25; font-weight: 700;
            letter-spacing: -.01em; color: var(--color-text-primary); }
@media (min-width: 40rem) { .prose h2 { font-size: 1.875rem; } }
.prose h3 { margin: 2em 0 .5em; font-size: 1.25rem; font-weight: 600; color: var(--color-text-primary); }
.prose strong { color: var(--color-text-primary); font-weight: 600; }
.prose a { color: var(--color-primary); text-decoration: underline; text-underline-offset: .2em; }
.prose a:hover { color: var(--color-primary-light); }
.prose ul { list-style: disc; padding-left: 1.5em; }
.prose ol { list-style: decimal; padding-left: 1.5em; }
.prose li { margin-top: .5em; } .prose li::marker { color: var(--color-primary); }
.prose blockquote { border-left: 3px solid var(--color-primary); padding-left: 1em;
                    font-style: italic; color: var(--color-text-primary); }
.prose code { background: var(--color-surface); border-radius: var(--radius-lg);
              padding: .15em .4em; font-size: .875em; color: var(--color-primary-light); }
.prose hr { border-color: var(--color-border); margin-block: 3em; }
.prose img { border-radius: var(--radius-2xl); }

/* numbered legal clauses, zero JS, any depth: 1. / 1.1. / 1.1.1. */
.prose-legal ol { counter-reset: clause; list-style: none; padding-left: 0; }
.prose-legal ol > li { counter-increment: clause; position: relative; padding-left: 3.5em; margin-top: 1em; }
.prose-legal ol > li::before { content: counters(clause, ".") "."; position: absolute; left: 0; top: 0;
  min-width: 3em; color: var(--color-primary); font-weight: 600; font-variant-numeric: tabular-nums; }
.prose-legal ol ol { margin-top: 1em; padding-left: 1.25em; }
```

Layout — mobile TOC is a collapsed `<details>` (reuses §4.6, zero new component):

```tsx
<SectionWrapper density="tight" width="wide">
  <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,65ch)] lg:gap-x-16 lg:items-start">
    <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--nav-h)+1rem)]">
      <details className="lg:open group rounded-xl border border-border bg-surface p-4 lg:border-0 lg:bg-transparent lg:p-0" open>
        <summary className="cursor-pointer list-none font-semibold text-text-primary lg:pointer-events-none">
          On this page
        </summary>
        <ol className="mt-4 space-y-1 text-sm">
          {toc.map(t => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="block rounded-lg px-2 py-2 text-text-secondary hover:text-primary
                                              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
    <article className="prose prose-legal">{children}</article>
  </div>
</SectionWrapper>
```
```
360: [ ▸ On this page ]        1280: [TOC   ][ prose 65ch ]
     [ prose 65ch     ]              [sticky][            ]
```
`py-2` on the TOC links takes each row to 40px; add `px-2` and the 8px gap and they clear the 44px rule as a stack. TOC entries are hand-authored in the page's data file — **no runtime heading scraping**, that would need client JS on every legal page. **No active-section highlighting** — an IntersectionObserver on 18 routes for a nicety is not worth it. Say no.

**Breaks if wrong:** at 16px, `.prose-legal` `padding-left: 3.5em` = 56px of gutter on a 375px screen, leaving ~40 characters of measure. That is correct for a legal doc on a phone. Reduce it and the counters collide with the text at depth 3.

### 4.6 FAQ accordion — `<details>`, server-rendered, zero JS

```tsx
// src/components/ui/Faq.tsx   (NO 'use client')
export default function Faq({ items, name = 'faq' }: { items: { q: string; a: string }[]; name?: string }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, i) => (
        <details key={i} name={name} open={i === 0}
                 className="group rounded-xl border border-border bg-surface
                            has-[summary:focus-visible]:outline-2 has-[summary:focus-visible]:outline-offset-2
                            has-[summary:focus-visible]:outline-primary">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between
                              gap-4 p-6 font-semibold text-text-primary focus-visible:outline-none">
            {item.q}
            <svg viewBox="0 0 20 20" aria-hidden className="size-5 shrink-0 fill-primary
                 motion-safe:transition-transform group-open:rotate-180">
              <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"/>
            </svg>
          </summary>
          <div className="px-6 pb-6 text-base leading-relaxed text-text-secondary">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
```
```css
/* globals.css — `open:` and `group-open:` variants DO NOT EXIST in this build */
details > summary { list-style: none; }
details > summary::-webkit-details-marker { display: none; }
details[open] > summary svg { rotate: 180deg; }
```
⚠ Verified: `open:bg-surface` and `group-open:rotate-180` compile to **nothing** in this Tailwind build. The chevron rotates from plain CSS. `[&[open]_svg]:rotate-180` also emits if you prefer the utility form.

Why `<details>` over the current Framer version: `aria-expanded` is implicit and correct, the panel is a real disclosure, Ctrl-F finds collapsed answers (Chrome auto-expands), Google indexes them, and it costs zero JS on 10+ pages. The `name` attribute gives exclusive-accordion behaviour natively (Chrome 120+/Safari 17.2+/Firefox 130+) and degrades to multi-open elsewhere. **Today's `FAQ.tsx:34-45` has `aria-expanded: null`, `aria-controls: null`, `role: null`, and `AnimatePresence` deletes closed answers from the DOM entirely.**

### 4.7 Comparison table — stacked definition list on mobile, ONE DOM tree

**Decision: stack, do not scroll.** A 4-column comparison at 360px gives 90px columns — unreadable at every scroll position, and a horizontal scroller nested inside a vertical scroller is the single most-reported mobile table frustration. And it must be **one** `<table>`, not a mobile block + a desktop table: `CaseStudies.tsx:93/162` already ships nine case studies twice, which is ~9KB of the 65KB homepage and duplicate body content Google parses on both.

**Rule: ≤2 data columns → plain `<table>`, it fits at 360. ≥3 → `.table-stack` + `data-label` on every `<td>`.**

```tsx
<div className="overflow-x-auto">                        {/* belt: never lets the page scroll */}
  <table className="table-stack w-full border-collapse text-left text-sm sm:text-base">
    <thead>
      <tr className="border-b border-border">
        <th scope="col" className="p-3 font-semibold text-text-primary">Model</th>
        <th scope="col" className="p-3 font-semibold text-text-primary">Time to hire</th>
        <th scope="col" className="p-3 font-semibold text-text-primary">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border">
        <th scope="row" className="p-3 font-semibold text-text-primary">TalentSync</th>
        <td data-label="Time to hire" className="p-3 text-text-secondary">2 weeks</td>
        <td data-label="Cost"         className="p-3 text-text-secondary">−60%</td>
      </tr>
    </tbody>
  </table>
</div>
```
```css
@media (max-width: 39.999rem) {
  .table-stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table-stack tr { display: block; margin-bottom: 1rem; border: 1px solid var(--color-border);
                    border-radius: var(--radius-2xl); background: var(--color-surface); padding: .5rem; }
  .table-stack th[scope="row"] { display: block; padding: .75rem; font-size: 1.125rem; }
  .table-stack td { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr);
                    gap: 1rem; border-top: 1px solid var(--color-border); }
  .table-stack td::before { content: attr(data-label); font-weight: 600; color: var(--color-text-primary); }
}
```
```
360: ┌ TalentSync ────┐      1024: | Model      | Time | Cost |
     │ Time to hire  2w│            | TalentSync | 2w   | −60% |
     │ Cost        −60%│            | In-house   | 12w  | —    |
     └─────────────────┘
```
**Breaks if wrong:** omit `data-label` on one `<td>` and that row silently loses its header on mobile — the value appears with no label. The `overflow-x-auto` wrapper stays even with stacking: it is the guarantee that a long unbreakable cell can never widen the page (Rule 4).

### 4.8 CTA band

```tsx
<section className="border-y border-border bg-surface">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
      Ready to <span className="text-gradient">scale your team</span>?
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary text-pretty">…</p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center">
      <Button href={siteConfig.calendlyUrl} external>Book A Meeting</Button>
      <Button variant="secondary" href="/contact/">Contact us</Button>
    </div>
  </div>
</section>
```
```
360: [ h2 balanced   ]     1024: [        h2         ]
     [ CTA full-width]           [ CTA ][ CTA ]  centred
     [ CTA full-width]
```
Stacked full-width buttons on mobile; `sm:flex-row` side by side. **Not** `gradient-primary`: a full-bleed amber band inverts the page's whole contrast model and forces a third button variant with its own contrast math. `bg-surface` + `border-y` reads as punctuation and costs nothing. **Breaks if wrong:** `flex-row` at 360 gives two ~160px buttons with wrapped labels.

### 4.9 Footer link map — stacked columns, NOT accordions

```tsx
<footer className="border-t border-border bg-surface">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
      {columns.map(col => (
        <div key={col.title}>
          <h2 className="text-xs font-medium uppercase tracking-wide text-text-secondary">{col.title}</h2>
          <ul className="mt-4 space-y-1">
            {col.links.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2 text-sm text-text-secondary hover:text-primary
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    …
  </div>
</footer>
```
```
360: [ Services  ][ Company  ]     1280: [Serv][Comp][Cases][Insi][Legal]
     [ Company   ][ Legal    ]
```
**Decision: 2 columns at 360, never accordions.** Accordions in the footer mean `useState` in shared chrome on all 18 routes — the exact client-component creep Rule 10 forbids — to solve a problem two columns already solve. 30 links stacked in 1 column is ~1400px of footer; in 2 columns it is ~700px, all visible, all crawlable, all server-rendered.

`block py-2` gives each link a 36px row; with `text-sm` line-height 20 that is 36px — **add `py-2.5` if the row must clear 44 in isolation**, or accept 36px + 8px gap for a dense list of same-purpose links (the WCAG 2.2 AA target-size exception for inline-in-a-list). Current footer links are **20px tall** (`Footer.tsx:32`) and the email link is **19.5px** — those are the ones that must not survive into the link map.

### 4.10 Breadcrumbs — truncate, never wrap

```tsx
// src/components/ui/Breadcrumbs.tsx   (server component)
import Link from 'next/link'
export interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex min-w-0 flex-nowrap items-center gap-2 text-sm text-text-secondary">
          {items.map((c, i) => (
            <li key={i} className={i === items.length - 1 ? 'min-w-0 truncate' : 'flex shrink-0 items-center gap-2'}>
              {c.href
                ? <Link href={c.href} className="rounded px-1 py-2 hover:text-primary
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{c.label}</Link>
                : <span aria-current="page" className="block truncate px-1 py-2 text-text-primary">{c.label}</span>}
              {i < items.length - 1 && <span aria-hidden className="text-border">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label,
          ...(c.href && { item: `https://talentsync.eu${c.href}` }) })),
      })}} />
    </>
  )
}
```
```
360: Home / Services / Software Develop…
1440: Home / Services / Software Development in Moldova
```
Ancestors `shrink-0`, current page `min-w-0 truncate`. **Never** `flex-wrap` (a 3-line breadcrumb pushes the h1 off the fold) and **never** `overflow-x-auto` (a scroller you cannot see the end of). The truncated text is the current page, which the `<h1>` repeats in full 16px below, and the JSON-LD carries the untruncated name — so nothing is actually hidden from mobile (Rule 8). **Breaks if wrong:** omit `min-w-0` and `truncate` does nothing — a flex item's default `min-width: auto` refuses to shrink below its content, and the row overflows the page.

---

## 5 · THE NAVIGATION SPEC

### 5.1 Firm calls

**Reveal-on-scroll dies on interior pages.** Add one prop; do not rewrite.

```diff
- export default function Navbar() {
-   const [isExpanded, setIsExpanded] = useState(false)
+ export default function Navbar({ variant = 'solid' }: { variant?: 'hero' | 'solid' }) {
+   const [isExpanded, setIsExpanded] = useState(variant === 'solid')
...
-       setIsExpanded(scrollY > 50)
+       if (variant === 'hero') setIsExpanded(scrollY > 50)
```
`/` passes `variant="hero"` and keeps the effect. The other 17 routes get `solid`. Justification: links are `hidden lg:flex` **and** gated on `scrollY > 50`, and the hamburger is `lg:hidden` — so at the top of any viewport ≥1024px the only link on the entire page is "Book A Meeting". On a homepage that is a deliberate hero effect; on 17 heroless routes it is a navigation dead end above the fold, on every desktop and every landscape iPad.

**No services dropdown.** "Services" links to `/services/`, an index page listing all nine. Justification: nine links do not fit a 900px pill and a hover dropdown has no mobile equivalent — it would push the 360px accordion past the 216px of headroom it currently has. An index page is also a better internal-link hub for nine SEO landing pages than a menu Google half-weights.

**`lg` (1024) stays the navbar breakpoint.** Six links at `px-3 text-sm` ≈ 540px + logo ≈ 130px + CTA ≈ 150px = 820px, inside `min(95vw, 900px)`. Confirmed to fit at 1024. iPad Pro 12.9" portrait gets the desktop bar; every smaller iPad gets the accordion. Correct.

### 5.2 Mobile (<1024px)

Measured at 360×740 with 7 items + CTA: pill grows to **508px tall, bottom edge 524px — 216px of headroom.** The new 7-route map is the same item count, so it fits. Add the belt anyway, because `/insights` and legal links may push it:

```tsx
<button
  type="button"
  onClick={() => setOpen(o => !o)}
  aria-expanded={open}
  aria-controls="mobile-menu"
  aria-label={open ? 'Close menu' : 'Open menu'}
  className="lg:hidden grid size-11 place-items-center rounded-full …"   {/* 40px -> 44px */}
>…</button>

<div id="mobile-menu" className={cn(
  'lg:hidden grid overflow-hidden motion-safe:transition-[grid-template-rows] duration-200',
  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
  <div className="min-h-0 overflow-y-auto overscroll-contain max-h-[calc(100dvh-var(--nav-h)-2rem)] px-4 pb-4">
    <ul className="pt-2 space-y-1">
      {nav.map(item => (
        <li key={item.href}>
          <Link href={item.href} onClick={() => setOpen(false)}
            aria-current={pathname === item.href ? 'page' : undefined}
            className="flex min-h-11 items-center rounded-xl px-4 py-3 aria-[current=page]:text-primary
                       aria-[current=page]:bg-primary/10 text-neutral-300 hover:text-primary hover:bg-primary/10">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
    <Button href={siteConfig.calendlyUrl} external className="mt-3 w-full">Book A Meeting</Button>
  </div>
</div>
```
All strings verified emitting: `grid-rows-[0fr]`, `grid-rows-[1fr]`, `transition-[grid-template-rows]`, `max-h-[calc(100dvh-var(--nav-h)-2rem)]`, `overscroll-contain`, `aria-[current=page]:…`, `size-11`.

- **Flat list only.** No nested service links — that is what `/services/` is for.
- **Scroll lock:** `useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])`. Body computes `overflow: visible` today and the page scrolls freely behind the open menu.
- **Kill `Careers` from the mobile nav or unhide the section.** `Careers.tsx:14` is `hidden md:block` while `content.ts:19` keeps `{ label: 'Careers' }` in the array the accordion renders in full. Replayed at `scrollY: 3000`: the hidden element's rect is `{top: 0, height: 0}`, so `scrollToSection` computes `0 + 3000 − 80 = 2920` and **tapping "Careers" scrolls you 80px backwards.** Unhide the section — hiding content from mobile violates Rule 8.
- **Three nav subsets exist today** and the link map must reconcile them: `navigation` has 7, desktop renders `slice(0,6)`, footer renders `slice(0,5)`, the accordion renders all 7. Replace with one `navigation` array (routes) plus a separate `footerColumns` structure.

### 5.3 Desktop (≥1024px)

Links visible on load (`solid`). `Navbar.tsx:66` `<a href="#">` becomes `<Link href="/">` the moment route #2 exists. Convert the pill's Framer animations to CSS (see §6.3) so framer-motion leaves the shared chunk.

### 5.4 Active-route indication

`aria-current="page"` on the matching link + `aria-[current=page]:text-primary` and a 2px underline (`aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-primary)]`). Not a background pill — a filled pill on the glass navbar collides with the hover state `hover:bg-primary/10`. Match on `usePathname()` with a `startsWith` for section roots so `/services/x/` lights up "Services".

### 5.5 Footer

Five columns: **Services** (all 9 + index) · **Company** (About, Careers, Contact) · **Case studies** (top 4 + index) · **Insights** (latest 4 + index) · **Legal** (Privacy, Terms, Cookies). `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` per §4.9. Server component — the current `Footer.tsx` is `'use client'` only for `scrollToSection` and a scroll-to-top button; both go away (`scrollToSection` is deleted; scroll-to-top is `<a href="#main">`). That drops framer-motion and React state out of the footer on all 18 routes.

---

## 6 · PERFORMANCE BUDGET

Per page, mobile, **measured on the audit's harness: 4× CPU throttle + Slow 4G, cold cache, production static export.** Quote the harness with every number or the number means nothing.

| Metric | Measured today (`/`) | Budget |
|---|---|---|
| LCP | **2,972 ms** | **≤ 2,200 ms** |
| FCP | 1,996 ms | ≤ 1,400 ms |
| CLS | 0.00 | **≤ 0.02** |
| INP | TBT 0 ms, zero tasks >50 ms | ≤ 200 ms |
| JS transferred | 195,403 B (644,848 B decoded) | **≤ 130 KB interior** · ≤ 195 KB on `/` |
| CSS (built, uncompressed) | 43,712 B | ≤ 60,000 B |
| Fonts | 103,732 B (5 static woff2) | **≤ 45 KB** (1 variable woff2, latin) |
| Largest single image | 106,004 B avatar in a 64px box | **≤ 60 KB**, and ≤ 2× its CSS box in device px |
| Total page weight @390px | ~500 KB | ≤ 320 KB |

The 130 KB interior JS budget is not aspirational arithmetic: 195,403 − 65,775 (the framer-motion chunk `8edebeaa392befa0.js`, 33.7% of all JS) = 129,628.

### 6.1 Fonts — `next/font/google`, variable weight

```ts
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' })
```
Then `--font-sans: var(--font-montserrat), system-ui, sans-serif` in `@theme`, `className={montserrat.variable}` on `<html>`, and **delete line 1 of `globals.css`**.

**Why strictly better than `<link rel="preconnect">` + `<link rel="stylesheet">`:** `next/font` downloads the woff2 **at build time** into `_next/static/media`, so it is same-origin (zero extra DNS + TLS), it emits `<link rel="preload" as="font" type="font/woff2" crossorigin>` into `<head>` at build time, and it inlines the `@font-face` into the critical CSS. A preconnect only warms a socket you still have to discover.

The measured chain today is four hops across three origins, and DevTools reports *"no origins were preconnected"*:
```
/                                599 ms
└─ chunk.css                   1,158 ms  render-blocking
   └─ fonts.googleapis.com/css2 1,159 ms  render-blocking — could not even be QUEUED until 1,157 ms
      └─ fonts.gstatic.com woff2 1,245 ms
```
~558 ms of that is pure `@import` serialization; DevTools' own RenderBlocking insight scores it at **505 ms of FCP/LCP savings**. LCP is a text element, so LCP is gated entirely on this chain.

Omitting `weight` makes `next/font` fetch the **variable** font (100–900 in one file) instead of five statics. All five weights are genuinely in use (`font-bold` ×19, `font-semibold` ×6, `font-medium` ×5, `font-extrabold` ×1, plus 400 default), so subsetting by weight is not available — the variable file is.

### 6.2 Framer Motion across 18 routes

65,775 B transferred / 205,174 B decoded for 43 animation instances. Next code-splits per route, so the fix is topological, not clever:

1. **New routes import zero framer-motion.** Enforced by `grep -rn "framer-motion" src/app/services src/app/insights src/app/case-studies` → must be empty.
2. **De-motion the shared chrome.** This is the load-bearing step: `Navbar` and `Footer` render on all 18 routes, so as long as either imports framer-motion the 65 KB is in the shared chunk and step 1 buys nothing. The navbar's three motions are all CSS: the entrance slide is one `@keyframes`, the link reveal is `opacity`/`width` transitions, and the accordion is the `grid-rows-[0fr] → grid-rows-[1fr]` trick in §5.2.
3. **One shared `Reveal` for the new pages** — 12 lines, IntersectionObserver, replaces the `whileInView` fade-up vocabulary:
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
export default function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { rootMargin: '-80px' })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`${className} motion-safe:transition-all motion-safe:duration-500
    ${on ? 'opacity-100 translate-y-0' : 'opacity-0 motion-reduce:opacity-100 translate-y-4'}`}>{children}</div>
}
```
4. **`/` keeps framer-motion** and gains `<MotionConfig reducedMotion="user">` in one thin `'use client'` wrapper. `grep -rn "reduced-motion\|useReducedMotion\|MotionConfig" src/` returns **zero hits** today; Framer defaults to `reducedMotion: "never"`, and forcing the media query proved the Hero chevron kept translating 3.77 → 7.72 px and all three `.color-ray`s kept running at `blur(30px)`.

**Use `y`, never `x`, for entrance offsets.** `About.tsx:47` `initial={{ opacity: 0, x: 30 }}` puts a column 30px right of its box before it scrolls in; at 360px the container is already 328px inside 16px gutters, so **14px escapes and the document overflows on first paint at every phone width.** It self-corrects when `whileInView` fires, which is why casual scrolling misses it. `body { overflow-x: clip }` is the guard; `y` offsets are the fix.

### 6.3 Images — `images.unoptimized: true` means hand-resize everything

`next/image` emits a bare `<img>`: measured across all 20, `srcset: null`, `sizes: null`, and `width`/`height` absent on **20/20**. At 390px / DPR 3:

| file | natural | CSS box | needs | oversize | bytes |
|---|---|---|---|---|---|
| `testimonial-adrian-barca.jpeg` | 800×800 | 64×64 | 192×192 | **4.17×** | 106,004 |
| `case-barca.jpg` | 1440×960 | 308×173 | 924×519 | 1.56× | 50,841 |
| `case-newera.webp` | 1200×750 | 238×134 | 714×402 | 1.68× | 25,640 |

**~150 KB of the 208 KB loaded at 390px (72%) is pixels the device physically cannot display.**

Produce exactly these, and write `srcset` by hand:

| Asset | Widths | Notes |
|---|---|---|
| avatars (64px box) | 128, 192 | 800×800 → 192 is ~8 KB, not 106 KB |
| case / article card (max box 362px in `max-w-6xl` 3-col) | 384, 768 | |
| interior hero / inline prose (max 704px) | 768, 1408 | |
| OG image | 1200×630 | one per route family, not per route |

```bash
sips -Z 192 public/images/testimonial-adrian-barca.jpeg --out public/images/testimonial-adrian-barca-192.jpeg
```
```tsx
<img src="/images/case-barca-768.jpg" srcSet="/images/case-barca-384.jpg 384w, /images/case-barca-768.jpg 768w"
     sizes="(min-width: 1024px) 362px, (min-width: 640px) 45vw, 100vw"
     width={768} height={512} alt="Barça Mobile engineering team" loading="lazy" decoding="async" />
```
Also: `case-foodamigos.png` (126,030 B) and `case-qualiwise.png` (41,409 B) are PNGs carrying photographs — re-encode. And **delete four files referenced by nothing** — `hero-team.jpg` (143,802 B), `testimonial-barca.jpg`, `testimonial-socialbee.jpg`, `testimonial-startup.jpg` = **159,474 B** shipped into `out/` and deployed for no reason.

CLS is 0.00 today despite the missing dimensions, because `fill` inside a fixed-size parent reserves the box. Add `width`/`height` anyway — they are what make `srcset` legal and what the validator checks.

### 6.4 Which sections must NOT be client components

**Server (no `'use client'`):** `SectionWrapper`, `Card`, `Button` (unless it takes `onClick`), `Breadcrumbs`, `Faq` (it is `<details>`), `PageShell`, `Footer`, all prose/legal bodies, all comparison and pricing tables, the TOC, article cards, the CTA band, author bylines, and every `page.tsx`.

**Client, and only these:** `Navbar` (scroll state + menu toggle), `Reveal`, the contact form, the testimonial carousel, and the homepage motion wrapper.

`src/app/page.tsx`'s `'use client'` is redundant — every child section already carries its own — and it is the single directive that makes per-route metadata impossible.

---

## 7 · ACCESSIBILITY FLOOR

### 7.1 Contrast — what passes, and the two that do not

Passing (measured): `#F5F5F5/#121214` 17.16 · `#A3A3A3/#121214` 7.42 · `#A3A3A3/#1C1C1F` 6.74 · `#FFB85A/#121214` 10.92 · `.btn-primary` label `#3D332E/#FFB85A` 7.16 · `.btn-secondary` 10.92 · navbar over hero 9.68, scrolled 10.98 · footer 6.74.

**Failing — fix both:**
1. `.text-gradient` `to-secondary` `#574A44`: **2.20** on `#121214`, 2.16 on the hero, 2.00 on the footer, against a 3:1 large-text floor. Corrected gradient in §2.5 (`from-primary-light to-primary-dark`, worst stop 8.0:1).
2. `CaseStudies.tsx:153` inactive carousel dot `bg-neutral-600` `#525252` on `#121214` = **2.39** against a 3:1 non-text floor → `bg-neutral-500` (`#737373`, 4.2:1).

### 7.2 Focus

`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary` on every interactive element. The current `focus:ring-2 focus:ring-primary/50` fails twice: it fires on mouse click, and at 50% it renders `rgb(136,101,55)` = **2.90:1 against the amber button it outlines** (WCAG 2.2 SC 2.4.11). `outline-offset` puts the ring on the page background where `#FFB85A` measures 10.92:1. Definitions in §2.6.

### 7.3 Landmarks

`<header>` is missing entirely today, `<nav>` has no label, and there are **45 focusable elements before the content**. Required per route: skip link (§3.2), `<nav aria-label="Main">`, `<nav aria-label="Breadcrumb">`, `<main id="main">`, `<footer>`, and `<nav aria-label="On this page">` for the TOC.

### 7.4 Accordion contract

`<details>/<summary>` (§4.6) satisfies it natively — implicit `aria-expanded`, a real disclosure relationship, Space/Enter, and content that stays in the DOM for Ctrl-F and for Google. If you build a JS accordion instead you owe all of: `type="button"`, `aria-expanded`, `aria-controls`, a panel `id`, `role="region"`, `aria-labelledby`. Don't. Today's rows measure `aria-expanded: null`, `aria-controls: null`, `role: null`, `type: null`.

### 7.5 Tap targets

**23 controls are under 44px on a phone today.** Grow the hit box, keep the visual:

| Control | Today | Fix |
|---|---|---|
| `CaseStudies.tsx:150` dots | **6×4 px** (24×4 active), 8px apart | `className="p-2.5 -m-1"` on the button, dot stays `h-1 w-1.5` |
| `Testimonials.tsx:89` dots | 7.6×7.6 px | same |
| `Footer.tsx:32` nav | 20 px tall | `block py-2.5` |
| `Footer.tsx:21` email | 19.5 px tall | `inline-block py-2.5` |
| hamburger | 40×40 | `grid size-11 place-items-center` |
| `Hero.tsx:69` chevron | 32×32 | `p-2 -m-2` |
| navbar CTA @768 | 156×**36** | `min-h-11` in `.btn-base` |

### 7.6 Reduced motion

The `@media (prefers-reduced-motion: reduce)` block in §2.1 plus `motion-safe:` on every Tailwind transition plus `<MotionConfig reducedMotion="user">` on `/`. Four animations run infinitely today (three `.color-ray`s at `blur(30px)` with a 20–25px `box-shadow`, plus the Hero chevron at `repeat: Infinity`) and none of them stop.

### 7.7 Forms and links

Every input gets a real `<label for>` (not a placeholder), `autocomplete`, `inputmode` where it helps (`inputmode="email"`), and errors wired with `aria-describedby` + `aria-invalid`. Every link's text makes sense out of context — no "read more"; use "Read: Hiring in Moldova" or a `sr-only` suffix. Every icon-only control gets `aria-label`; every decorative icon gets `aria-hidden`.

---

## 8 · THE VALIDATION MATRIX

### 8.1 Automated

| # | Check | Viewport(s) | How measured | Pass |
|---|---|---|---|---|
| 1 | No horizontal overflow | n/a (structural) | `overflow-x: clip` present on `html`/`body` in built CSS | present |
| 2 | Exactly one `h1` | n/a | count `<h1` in built HTML, scripts stripped | `== 1` |
| 3 | No skipped heading levels | n/a | walk `h1..h6` in document order | no `hN → hN+2` |
| 4 | `<title>` unique, sized | n/a | parse `<title>` across all pages | 15–60 chars, unique |
| 5 | Meta description unique, sized | n/a | parse `meta[name=description]` | 70–160 chars, unique |
| 6 | Canonical present | n/a | `link[rel=canonical]` | present |
| 7 | Every `<img>` has `alt` | n/a | attribute presence | 100% |
| 8 | Every `<img>` has `width`+`height` | n/a | attribute presence | 100% |
| 9 | No internal 404s | n/a + served | resolve href against `out/`, then HTTP | all 200 |
| 10 | Trailing slashes | n/a | href ends `/` or has an extension | 100% |
| 11 | Every route in the sitemap | n/a | `out/sitemap.xml` `<loc>` vs. route set | full cover |
| 12 | No framer-motion on new routes | n/a | `grep -rn "framer-motion" src/app/{services,insights,case-studies}` | empty |
| 13 | No orphan tokens | n/a | `grep -rn -- '-dark' src/ \| grep -v 'secondary-dark\|primary-dark'` | empty |
| 14 | JS budget | n/a | `du -b out/_next/static/chunks/*.js` per route manifest | ≤ 130 KB interior |
| 15 | Largest image | n/a | `find public/images -size +60k` | empty |

### 8.2 The script

Written and verified at `/Users/adrianzabica/Desktop/talentsync-web/scripts/validate-pages.mjs`. 103 lines, zero dependencies, Node ≥18. Run: `node scripts/validate-pages.mjs out` or `BASE_URL=http://localhost:4321 node scripts/validate-pages.mjs out`.

**Proof it works** — current output against HEAD, exit code 1:
```
1 page(s) checked in out/ + http://localhost:4321

FAIL — 23 problem(s):

  src/app/globals.css
    [html,body] no `overflow-x: clip` guard: 320px overflow cannot be ruled out
  index.html
    [link[rel=canonical]] missing
  index.html
    [img[src="/images/case-barca.jpg"]] no width/height attributes (CLS + srcset risk)
  …19 more img findings, incl. case-orange/entail/newera each twice — the
     CaseStudies dual-render duplication is visible in the output…
  out/sitemap.xml
    [sitemap] missing — 1 routes are unlisted
```

```js
#!/usr/bin/env node
/* Zero-dep validator for the static export.  node scripts/validate-pages.mjs [outDir]
   Set BASE_URL=http://localhost:4321 to also HEAD-check every internal link on the served instance.
   Regex-parses build output on purpose: no deps, and generated HTML is well-formed. */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const OUT = process.argv[2] || 'out'
const BASE = process.env.BASE_URL
const fails = []
const fail = (f, sel, msg) => fails.push(`${f}\n    [${sel}] ${msg}`)

const pages = []
;(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { if (!['_next', '_not-found', '404'].includes(e.name)) walk(p) }
    else if (e.name.endsWith('.html') && e.name !== '404.html') pages.push(p)
  }
})(OUT)
if (!pages.length) { console.error(`FATAL: no .html under ${OUT}/ — run \`npm run build\` first`); process.exit(1) }

const attr = (tag, n) => (tag.match(new RegExp(`\\s${n}\\s*=\\s*"([^"]*)"`, 'i')) || [])[1]
const routeOf = f => ('/' + relative(OUT, f)).replace(/index\.html$/, '').replace(/\.html$/, '/')
const seen = { title: new Map(), desc: new Map() }
const routes = new Set(pages.map(routeOf))

/* 1. structural no-overflow guard --------------------------------------- */
const cssDir = join(OUT, '_next/static/chunks')
const css = readdirSync(cssDir).filter(f => f.endsWith('.css'))
  .map(f => readFileSync(join(cssDir, f), 'utf8')).join('')
if (!/(?:^|[},])\s*(?:html|body)[^{]*\{[^}]*overflow-x:\s*clip/.test(css))
  fail('src/app/globals.css', 'html,body', 'no `overflow-x: clip` guard: 320px overflow cannot be ruled out')

/* 2. per page ------------------------------------------------------------ */
for (const file of pages) {
  const raw = readFileSync(file, 'utf8')
  const f = relative(OUT, file)
  const body = raw.replace(/<script[\s\S]*?<\/script>/gi, '')      // drop RSC flight payload

  const title = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim()
  if (!title) fail(f, '<title>', 'missing or empty')
  else if (title.length < 15 || title.length > 60) fail(f, '<title>', `${title.length} chars, need 15-60 — "${title}"`)
  else if (seen.title.has(title)) fail(f, '<title>', `duplicate of ${seen.title.get(title)}`)
  if (title) seen.title.set(title, f)

  const dTag = raw.match(/<meta[^>]+name="description"[^>]*>/i)
  const desc = dTag && attr(dTag[0], 'content')?.trim()
  if (!desc) fail(f, 'meta[name=description]', 'missing or empty')
  else if (desc.length < 70 || desc.length > 160) fail(f, 'meta[name=description]', `${desc.length} chars, need 70-160`)
  else if (seen.desc.has(desc)) fail(f, 'meta[name=description]', `duplicate of ${seen.desc.get(desc)}`)
  if (desc) seen.desc.set(desc, f)

  if (!raw.match(/<link[^>]+rel="canonical"[^>]*>/i)) fail(f, 'link[rel=canonical]', 'missing')

  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map(m => +m[1])
  const h1s = levels.filter(l => l === 1).length
  if (h1s !== 1) fail(f, 'h1', `found ${h1s}, need exactly 1`)
  levels.reduce((prev, lvl, i) => {
    if (prev && lvl > prev + 1) fail(f, `h${lvl} #${i + 1}`, `heading jumps h${prev} -> h${lvl}`)
    return lvl
  }, 0)

  for (const [tag] of body.matchAll(/<img\b[^>]*>/gi)) {
    const src = attr(tag, 'src') || '(no src)'
    if (attr(tag, 'alt') === undefined) fail(f, `img[src="${src}"]`, 'no alt attribute')
    if (!attr(tag, 'width') || !attr(tag, 'height')) fail(f, `img[src="${src}"]`, 'no width/height attributes (CLS + srcset risk)')
  }

  for (const [tag] of body.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(tag, 'href')
    if (!href || /^(#|https?:|mailto:|tel:)/.test(href)) continue
    const p = href.split(/[?#]/)[0]
    const hit = existsSync(join(OUT, p, 'index.html')) || existsSync(join(OUT, p.replace(/\/$/, '') + '.html')) || existsSync(join(OUT, p))
    if (!hit) fail(f, `a[href="${href}"]`, 'internal link 404s against the export')
    if (!/\/$/.test(p) && !/\.[a-z0-9]+$/i.test(p)) fail(f, `a[href="${href}"]`, 'missing trailing slash (trailingSlash: true will 308-redirect)')
  }
}

/* 3. sitemap ------------------------------------------------------------- */
const smPath = join(OUT, 'sitemap.xml')
if (!existsSync(smPath)) fail('out/sitemap.xml', 'sitemap', `missing — ${routes.size} routes are unlisted`)
else {
  const locs = new Set([...readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname))
  for (const r of routes) if (!locs.has(r)) fail('out/sitemap.xml', 'sitemap', `route ${r} is not listed`)
}

/* 4. optional live check ------------------------------------------------- */
if (BASE) {
  for (const r of routes) {
    const res = await fetch(new URL(r, BASE), { redirect: 'manual' }).catch(e => ({ status: `ERR ${e.message}` }))
    if (res.status !== 200) fail(`${BASE}${r}`, 'HTTP', `served instance returned ${res.status}`)
  }
}

/* ------------------------------------------------------------------------ */
console.log(`${pages.length} page(s) checked in ${OUT}/${BASE ? ` + ${BASE}` : ''}`)
if (!fails.length) { console.log('PASS'); process.exit(0) }
console.error(`\nFAIL — ${fails.length} problem(s):\n`)
for (const f of fails) console.error('  ' + f)
process.exit(1)
```

### 8.3 What CANNOT be automated here — screenshot review is mandatory

The script asserts a *structural* no-overflow guard, not a measurement. True `scrollWidth > clientWidth` needs a real browser, and so does everything below.

- **Actual horizontal overflow** — a transform or a wide cell can still push content off-screen under `overflow-x: clip` (the page just won't scroll to reveal it). The `About.tsx` `x: 30` bug is invisible to any static check.
- **Contrast of rendered gradient text** — `.text-gradient` computes to `transparent` with a background clip; no static parser can read the stop under the glyph.
- **Tap-target size and separation** — needs `getBoundingClientRect()`.
- **Sticky-sidebar behaviour** — `align-self: stretch` silently kills `position: sticky`.
- **Whether the mobile accordion fits** — depends on measured pill height at the live viewport.
- **Truncation vs. wrapping** in breadcrumbs and headings, and whether `text-balance` produced a sane break.
- **The `.table-stack` transformation** — the media query either read correctly or it produced unlabelled values.
- **Reduced-motion compliance** — must be checked with the media feature forced *before first script*.
- **Focus-ring visibility** on each surface, and tab order.
- **Band alternation reading as rhythm** rather than as one flat page.

**Screenshot every new route at exactly these seven viewports**, top-of-page and after scroll, plus one pass with `prefers-reduced-motion: reduce` forced:

| Viewport | Why this one |
|---|---|
| **320×568** | Rule 4's contractual floor |
| **360×740** | Android baseline; where the 14px overflow and the accordion-fit both live |
| **390×844** | iPhone 14/15/16 — the modal device |
| **430×932** | iPhone Pro Max |
| **640×900** | the `sm` boundary — where every grid and type step fires |
| **1024×768** | the `lg` boundary — navbar mode switch, sticky sidebar start, iPad Pro 12.9 portrait |
| **1440×900** | desktop reference |

Add **768×1024** only for pages using the one permitted `md:` grid step.

---

## 9 · ORDER OF WORK

1. `@theme` fix + `--nav-h` + `scroll-padding-top` + `overflow-x: clip` (§2.1) — everything else is easier to see afterwards.
2. Orphaned-token sed (§2.4) and `.text-gradient` (§2.5) — two commands, one line.
3. `page.tsx` → server component + `metadataBase` + `sitemap.ts` (§3) — **blocks route #1.**
4. `next/font` (§6.1) — 505 ms, measured.
5. `Button`, `SectionWrapper`, `.btn-*`, `.card` (§2.6) — shared furniture; every later page inherits whatever ships here.
6. `Navbar` `variant` prop + ARIA + scroll lock + de-motion; `Footer` → server component (§5).
7. `Faq` as `<details>`, `Breadcrumbs`, `PageShell` (§3.2, §4.6, §4.10).
8. Tap-target pass on `Footer.tsx` and both dot sets (§7.5) — before the link map is authored.
9. `MotionConfig` on `/` + the reduced-motion media query (§7.6).
10. Then: Process connector, `About` `x: 30`, Services clamp, image pipeline.

Everything from 1–8 is shared furniture: ship it wrong and it is wrong eighteen times.


---

## CRITICAL ISSUES (must fix before building on top)


1. Three design tokens emit ZERO CSS and are silently no-ops on 57 live DOM elements. Verified in the built stylesheet at HEAD (out/_next/static/chunks/1d0c9801f559a159.css, 43,712 B, reproduced by a clean rebuild): bg-background-dark (4 uses), bg-surface-dark (1), text-text-secondary-dark (11 source sites, 57 rendered elements). Consequence: every body paragraph in About/Services/Process/CaseStudies renders full-white #F5F5F5 instead of muted #A3A3A3 (17.16:1 where 7.42:1 was intended — no hierarchy between heading and body anywhere), and four section backgrounds are transparent so the site has zero band differentiation. Orphans from the light-theme removal in f0b8937. Fix: add --color-background-alt #141416 and --color-border #262626 to @theme, then the sed in section 2.4. CORRECTION to the brief: bg-primary-dark is NOT broken — I grepped .btn-primary:hover{background-color:var(--color-primary-dark)} out of the built CSS. Do not touch it.

2. src/app/page.tsx line 1 is 'use client', so it cannot export metadata — per-route SEO metadata is structurally impossible for all 18 planned routes. Every route would inherit layout.tsx's single hardcoded block including og:url 'https://talentsync.eu/'. The built <head> also has no canonical, no robots meta, no og:image and no JSON-LD, and layout.tsx has no metadataBase (without which per-page alternates.canonical cannot resolve to an absolute URL). For a build whose entire purpose is 9 service+location landing pages this blocks route #1. The 'use client' is also redundant — every child section already carries its own.

3. @theme inline must become @theme before any raw CSS is written. I verified both directions with probe builds: with `inline`, --color-* never reaches :root (which is why .color-ray-1/2/3 hardcode #FFB85A seven times); without it, the build emits :root,:host{--color-primary:#ffb85a;...} and raw var(--color-primary) resolves. The prose, prose-legal, table-stack and details CSS in this contract are all raw CSS and all depend on this. Build passes, CSS grows 43,712 -> ~45,500 B.

4. NEW FINDING, not in either prior audit: the prose CSS prescribed by the design-token forensics uses `max-width: var(--max-width-prose)`, which does not resolve. Tailwind v4 hardcodes .max-w-prose{max-width:65ch} and never emits --max-width-prose into :root — I probed it. Any raw CSS using that var silently computes max-width:none, so every long-form legal and insight page would render at full container width with a ~110-character measure. Use the literal 65ch.

5. .text-gradient fails WCAG on its terminal stop, on ~18 h1s and ~80 h2s. to-secondary #574A44 measures 2.20:1 on #121214, 2.16:1 on the hero #141416 and 2.00:1 on the footer #1C1C1F, against a 3:1 large-text floor. Firm fix, two tokens that already exist, zero additions: .text-gradient { @apply bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent }. Worst stop #E5A550 computes 8.8:1 on #121214, 8.7:1 on #141416, 8.0:1 on #1C1C1F, and it keeps a visible light-to-dark sweep (to-primary-light alone reads as flat amber).

6. scrollToSection() in src/lib/utils.ts:12 hardcodes navbarHeight = 80. The real navbar bottom edge is 76px below lg and 84px at lg+ (top-4 16 + h-14/h-16 56/64 + border-2 x2 = 4), so every desktop anchor lands 4px under the pill. Worse, documentElement computes scroll-padding-top: auto, so native #anchors, Find-in-page and scrollIntoView respect nothing — and the function cannot work at all for cross-page anchors like /services/x/#faq, which the planned TOC, legal deep-links and reused FAQ all need. Fix: :root{--nav-h:4.75rem} with an lg override to 5.25rem, html{scroll-padding-top:calc(var(--nav-h)+1rem)}, and DELETE the function. The same var then feeds main's top padding and the sticky sidebar's lg:top-[calc(var(--nav-h)+1rem)] — both verified emitting.

7. Navbar and Footer are the load-bearing perf problem, not the new pages. Framer-motion is 65,775 B transferred / 205,174 B decoded — 33.7% of all JS. Next code-splits per route, so 'new routes import no framer-motion' buys nothing while Navbar (client, framer) and Footer (client) render on all 18 routes and keep it in the shared chunk. Both must be de-motioned first: the navbar's three animations are all CSS (entrance keyframe, opacity/width transition, and the grid-rows-[0fr]->grid-rows-[1fr] accordion trick, verified emitting), and the footer is 'use client' only for scrollToSection and a scroll-to-top button, both of which are deleted. That is what makes the 130 KB interior JS budget reachable (195,403 - 65,775 = 129,628).

8. The Google Fonts @import at globals.css line 1 costs a measured 505 ms of FCP/LCP. Chain at 4x CPU + Slow 4G: document 599 ms -> local CSS 1,158 ms (render-blocking) -> fonts.googleapis.com/css2 1,159 ms (could not even be QUEUED until 1,157 ms) -> gstatic woff2 1,245 ms. Four hops, three origins, 'no origins were preconnected', ~558 ms of pure @import serialization. Cold cache FCP 1,996 ms / LCP 2,972 ms with a text LCP element, TBT 0 ms — the font chain is the entire bottleneck. Fix: next/font/google Montserrat with subsets:['latin'], display:'swap', variable:'--font-montserrat' and NO weight array (that pulls the single variable font instead of five statics totalling 103,732 B). Verified next/font/google is installed and it works under output:'export' because the download happens at build time.

9. Navbar shows zero navigation links at the top of any viewport >= 1024px: links are `hidden lg:flex` AND gated on isExpanded (scrollY > 50), while the hamburger is `lg:hidden`. On the 17 planned heroless routes the only link above the fold on every page is 'Book A Meeting'. Fix is one prop, not a rewrite: variant?: 'hero' | 'solid' defaulting to solid, with useState(variant === 'solid') and the scroll handler guarded by `if (variant === 'hero')`. Homepage passes variant="hero".

10. Button has no `type` prop so it defaults to type='submit' — every Button placed inside the planned /contact form will submit that form. It also renders a raw <a> for internal hrefs, meaning a full document reload and no prefetch on every internal link across 18 routes, and it has no size prop, which is why Navbar.tsx:106 carries three !important overrides. Replacement with next/link + a SIZES map is in section 2.6.

11. SectionWrapper concatenates className with a template string instead of cn(), so a caller can never override a base class — CaseStudies.tsx:30 passes py-32 against base py-24 sm:py-32 lg:py-40 and the winner is decided by Tailwind's stylesheet order, not the author. It is also 'use client' with zero hooks. Every one of the 18 pages that tries to tighten section padding will hit this.

12. 23 tap targets are under 44x44 CSS px on a phone, on a build whose stated primary target is phones. Worst: CaseStudies carousel dots at 6x4 px inactive (CaseStudies.tsx:150), testimonial dots at 7.6x7.6 (Testimonials.tsx:89), footer nav links at 20 px tall and the footer email at 19.5 px (Footer.tsx:21,32). The footer numbers matter most because the new multi-column link map inherits those rows. Fix pattern is p-2/-m-2 or min-h-11 — grow the hit box, keep the visual.

13. Nothing respects prefers-reduced-motion: grep -rn 'reduced-motion|useReducedMotion|MotionConfig' src/ returns zero hits across 43 animation instances. Four run infinitely — three .color-ray elements at filter:blur(30px) with a 20-25px box-shadow, plus the Hero chevron at repeat:Infinity — and forcing the media query before first script proved all four keep running (Framer defaults to reducedMotion:'never'). Needs the @media block in section 2.1, motion-safe: on Tailwind transitions, and <MotionConfig reducedMotion="user"> on / only.

14. The FAQ accordion has zero ARIA and is slated for reuse on nine service pages. All 6 rows measure aria-expanded:null, aria-controls:null, role:null, type:null (FAQ.tsx:34-45), and AnimatePresence deletes closed answers from the DOM entirely so they are neither Ctrl-F findable nor indexable. Rebuild it as server-rendered <details>/<summary> with the `name` attribute for exclusive behaviour: correct ARIA is implicit, answers stay in the DOM, and it costs zero JS on 10+ pages. IMPORTANT: `open:` and `group-open:` variants DO NOT EXIST in this Tailwind build (both compile to nothing) — rotate the chevron with plain CSS `details[open] > summary svg { rotate: 180deg }`.

15. 14 px of horizontal overflow on first paint at every phone width, from About.tsx:47 `initial={{ opacity: 0, x: 30 }}`. Fresh-load scrollWidth exceeds clientWidth by exactly 14 px at 360 and 430; the subtree computes matrix(1,0,0,1,30,0) and self-corrects once whileInView fires, which is why casual scrolling misses it. Two fixes, both needed: body { overflow-x: clip } as the structural guard (the validator asserts this), and use y not x for every entrance offset — there are 43 initial={{...}} instances and any that translate on X will do this on narrower content in the new templates.

16. Careers is dead on mobile and silently scrolls users backwards. Careers.tsx:14 is `hidden md:block` while data/content.ts:19 keeps { label: 'Careers' } in the array the mobile accordion renders in full. Replayed at scrollY 3000: the hidden element's rect is {top:0,height:0}, so scrollToSection computes 0 + 3000 - 80 = 2920 and tapping 'Careers' scrolls up 80px and nothing else. Also note three different nav subsets exist that the new footer link map must reconcile: navigation has 7 items, desktop renders slice(0,6), footer renders slice(0,5), the accordion renders all 7.

17. CaseStudies.tsx:93 and :162 render the same nine case studies twice (mobile carousel + desktop grid). The built index.html contains 20 <img> tags for 11 unique images and the string 'Team scaled within 2 weeks' appears 6 times — my validator surfaces this independently, flagging case-orange, case-entail, case-newera and others twice each. No user-facing bug, but Google parses both trees and it is ~9 KB of the 65 KB HTML. If ServicePageTemplate copies this dual-render pattern it becomes duplicated body content on nine SEO landing pages. Use one DOM tree with responsive CSS — the same rule applies to the comparison tables (see the .table-stack pattern).
