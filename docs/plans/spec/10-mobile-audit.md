# TalentSync homepage — live mobile & desktop audit

**Method.** Driven in real Chrome via CDP against a production static export (`npm run build` → `out/`, served by `serve` on `http://localhost:4321`). Every number below is measured in-page, not inferred. Eight viewports, fresh reload per viewport where load-order mattered. Performance measured at 4× CPU throttle + Slow 4G, cold cache.

**Two corrections to the brief, verified against the built CSS** (`out/_next/static/chunks/1d0c9801f559a159.css`):

- `bg-primary-dark` is **not** broken. `--color-primary-dark: #E5A550` is defined in `@theme`, and `@apply bg-primary-dark` inside `.btn-primary` compiled correctly: the built CSS contains `.btn-primary:hover{background-color:#e5a550}`. The primary button hover **does** change colour. (The standalone *utility class* `.bg-primary-dark` is not emitted, but nothing uses it standalone.)
- The blast radius of `text-text-secondary-dark` is **57 live DOM elements**, not 11. The 11 is the source-file count; `.map()` loops multiply it.

**Note on a concurrent edit.** During the audit another process rewrote `src/app/globals.css` (`@theme inline` → `@theme`, plus a new `--color-background-alt`). That fix is *not* in the build I measured. All findings below describe the artifact as currently built and served.

---

## 1. Screenshot-by-screenshot findings

| Viewport | H-overflow | Navbar h / `scrollToSection(80)` error | Grids | Section-specific findings |
|---|---|---|---|---|
| **360×740** Android baseline | **`scrollWidth` 374 vs `clientWidth` 360 → +14 px on first paint** | 60 px, bottom 76 → **−4 px** (4 px gap) | services `328px` (2-col at `173px` each at 390), about/process 1-col | Gradient H1 "Sync" invisible. Services descriptions clamped to 39 px of a 137 px block. Process connector aligned (−2 px). Careers `display:none`. |
| **390×844** iPhone 14/15/16 | 0 (About animation already fired) | 60 px → **−4 px** | services `173px 173px` | 23 sub-44 px tap targets. Service card heights uniform at 169 px (no jump). Descriptions 12 px, **72 % of text hidden**. |
| **430×932** iPhone Pro Max | **+14 px on fresh load**, 6 offenders, root cause `matrix(1,0,0,1,30,0)` | 60 px → **−4 px** | services `193px 193px` | Navbar "Book A Meeting" CTA `display:none` (it is `hidden sm:inline-flex`, `sm` = 640). Primary CTA absent from the bar on every phone. |
| **640×900** `sm` boundary | 0 | 60 px → **−4 px** | process `280px 280px` | **Connector line strikes through body text.** Line centre x=174; circle centres x=164 and x=476 → **−10 px / +302 px misaligned**. Visually a strikethrough on the left column's paragraphs. |
| **768×1024** iPad portrait (`md`) | 0 | 60 px → **−4 px** | about/services/process/cases `344px 344px` | Same connector bug, **worse: −10 px / +366 px**. Careers appears. Carousel → grid. **No visible nav links at all** (`lg` = 1024); only the hamburger. Navbar CTA is 156×**36 px**. |
| **1024×768** `lg` start | 0 (`clientWidth` 1016, 8 px scrollbar) | **68 px, bottom 84 → +4 px: sections land *under* the navbar** | process `202px×4` | Nav links appear only after 50 px scroll. 6 links × **36 px tall**. Vertical connector off, horizontal on. |
| **1440×900** desktop | 0 | 68 px → **+4 px** | about `428px×2`, services `296px×3` | **Horizontal connector sits 10 px below circle centres — 62 % down each circle.** Max measure 56 cpl (no over-wide paragraphs). Landing state shows **zero nav links**. |
| **1920×1080** large desktop | 0 | 68 px → **+4 px** | — | `max-w-6xl` = 1152 px, **380 px gutters**, content = 60.3 % of viewport. Doc height 10 066 px. |

**Navbar `w-[calc(100vw-16px)]` scrollbar hypothesis: disproven.** At `lg` the class is overridden by `lg:w-auto`; measured pill width is 379.8 px at 1440 and 378.8 px at 1920, with `scrollWidth === clientWidth`. No overflow at any desktop width. Below `lg` the calc yields `clientWidth − 8` with the 8 px custom scrollbar — still fits.

---

## 2. Priority 1 — inherited by all 18 pages, fix before building

### P1.1 · Three design tokens are silent no-ops (57 elements)

Live probe of the rendered cascade:

| class | resolves to | live DOM count | built CSS |
|---|---|---|---|
| `bg-background-dark` | `rgba(0,0,0,0)` | 4 | **not emitted** |
| `bg-surface-dark` | `rgba(0,0,0,0)` | 3 | **not emitted** |
| `text-text-secondary-dark` | `rgb(245,245,245)` *(inherited)* | **57** | **not emitted** |
| `text-secondary-dark` | `rgb(61,51,46)` | — | `.text-secondary-dark{color:#3d332e}` ✅ |

Consequence: **every body paragraph in About, Services, Process and CaseStudies renders at full-white `#F5F5F5` instead of muted `#A3A3A3`.** Measured contrast 17.16:1 where 7.42:1 was intended. The whole page is flat max-contrast — there is no visual hierarchy between headings and body copy. Sections that should carry an alternate background render transparent, so About/Services/Process/CaseStudies have no background differentiation at all.

Sites: `About.tsx:15,32,39,55` · `Services.tsx:26,37,58` · `Process.tsx:19,30,70` · `CaseStudies.tsx:30,41,72,79,132,194`

Fix once, in `globals.css`, then the 18 pages inherit correctness:
```css
@theme {
  --color-background-alt: #141416;   /* what bg-background-dark meant */
  --color-surface-alt:    #17171A;   /* what bg-surface-dark meant   */
}
```
…and sed the four component files: `bg-background-dark`→`bg-background-alt`, `bg-surface-dark`→`bg-surface-alt`, `text-text-secondary-dark`→`text-text-secondary`.

### P1.2 · `.text-gradient` fails WCAG AA on its second half — on every heading

Computed contrast of the real rendered stops:

| stop | on `#121214` | on hero `#141416` | on footer `#1C1C1F` |
|---|---|---|---|
| `from-primary` `#FFB85A` | 10.92 ✅ | — | — |
| 50 % mid `#AB814F` | 5.33 ✅ | — | — |
| **`to-secondary` `#574A44`** | **2.20 ✗** | **2.16 ✗** | **2.00 ✗** |

Large text needs 3:1. The gradient's terminal third is **below the 3:1 floor on every surface in the design system**. Visually confirmed in three screenshots: "TalentSync", "Advantage", "Our Clients" all dissolve into the background at the right edge.

`globals.css:70-73` — `.text-gradient { @apply bg-gradient-to-r from-primary to-secondary; }`

This class is the site's signature heading treatment and will appear on ~18 h1s and ~80 h2s. Minimum viable fix (keeps the identity, stays inside the existing ramp):
```css
.text-gradient { @apply bg-gradient-to-r from-primary to-primary-dark; }  /* #FFB85A → #E5A550, worst case 8.4:1 */
```

### P1.3 · Anchor scrolling is a hardcoded magic number and it is wrong at every breakpoint

`src/lib/utils.ts:12` — `const navbarHeight = 80`.

Measured pill bottom edge: **76 px** below `lg`, **84 px** at `lg`+. Errors: −4 px on mobile (harmless gap), **+4 px on desktop — the top 4 px of every section heading is hidden under the navbar.**

Worse for the new pages: `document.documentElement` has `scroll-padding-top: auto` (measured). Nothing makes native `#anchor` links, browser Find-in-page, or `scrollIntoView` respect the fixed navbar. The moment the 18 pages add a table of contents, in-page legal anchors, or FAQ deep-links, every jump lands under the pill.

Delete the magic number; use the platform:
```css
html { scroll-behavior: smooth; scroll-padding-top: 96px; }   /* 84 max nav bottom + 12 breathing room */
```
`scrollToSection()` then reduces to `document.getElementById(id)?.scrollIntoView()`, and every plain `<a href="#x">` on all 18 pages works for free.

### P1.4 · `page.tsx` is `'use client'` — per-page SEO metadata is structurally impossible

`src/app/page.tsx:1` is a client component. A client component **cannot** export `metadata`. Every one of the 18 planned routes inherits `layout.tsx`'s single hardcoded block, including `og:url: 'https://talentsync.eu/'` (`layout.tsx:14`) on all of them.

Built `<head>` confirms what is missing: **no `<link rel="canonical">`, no `robots` meta, no `og:image`, no JSON-LD.** `twitter:card` is `summary` with no image.

For a build whose entire purpose is 9 service+location landing pages, this is the blocking issue. Fix before writing any route: make `page.tsx` a server component and push `'use client'` down to the leaf sections that need it (they all already carry their own `'use client'` directive — the page-level one is redundant).

### P1.5 · Google Fonts `@import` costs 505 ms of measured LCP

`globals.css:1` is an `@import url('https://fonts.googleapis.com/...')` *inside* the stylesheet. Measured critical request chain (4× CPU, Slow 4G):

```
/                                          599 ms
└─ /_next/static/chunks/…css              1 158 ms   render-blocking
   └─ fonts.googleapis.com/css2           1 159 ms   render-blocking, queued at 1 157 ms
      └─ fonts.gstatic.com/…woff2 (×2)    1 245 ms
```

**Max critical path latency: 1 245 ms. Four hops, three origins, and DevTools reports `no origins were preconnected`.** The font CSS could not be *requested* until 1 157 ms, though the document was in hand at 599 ms — **~558 ms of pure `@import` serialization**. DevTools' own RenderBlocking insight: **FCP 505 ms / LCP 505 ms savings**.

Cold-cache result: **FCP 1 996 ms, LCP 2 972 ms**. LCP element is text (`H1`, then `P`) — i.e. LCP is gated entirely on that chain. **TBT 0 ms, zero long tasks >50 ms, CLS 0.00.** The JS is heavy but it is not what is hurting; the font chain is.

Fix: `next/font/google` (self-hosts, emits a `<link rel="preload" as="font">` in `<head>`, kills hops 3 and 4). Also drop unused weights — 5 are requested, **103 732 B** of woff2 arrives.

### P1.6 · The FAQ accordion has no ARIA, and it is explicitly slated for reuse

All 6 rows measured: `aria-expanded: null`, `aria-controls: null`, `role: null`, `type: null`. The panel has no `role`/`aria-labelledby`. `FAQ.tsx:34-45`.

A screen reader user cannot tell whether a row is open, cannot find the panel, and gets no state change on activation. This component is named in the brief as reused off-homepage — ship it broken and it is broken 18 times.

```tsx
<button type="button" aria-expanded={openIndex === index} aria-controls={`faq-panel-${index}`} id={`faq-btn-${index}`} …>
<div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`}>
```

### P1.7 · Tap targets: nine controls at 6×4 px

Measured at 360 and 390 px, `getBoundingClientRect()`:

| control | measured | file |
|---|---|---|
| CaseStudies carousel dots (inactive) | **6 × 4 px**, 8 px apart | `CaseStudies.tsx:150` (`h-1`, `w-1.5`) |
| CaseStudies carousel dot (active) | **24 × 4 px** | same |
| Testimonial dots | **7.6 × 7.6 px**, 7.6 px apart | `Testimonials.tsx:89` (`w-2 h-2`) |
| Hero scroll chevron | 32 × 32 px | `Hero.tsx:69` |
| Mobile hamburger | 40 × 40 px | `Navbar.tsx:112` |
| Testimonial prev/next | 38–40 × 38–40 px | `Testimonials.tsx:76,101` |
| Navbar CTA (768 px) | 156 × **36 px** | `Navbar.tsx:106` (`!py-2`) |
| Footer nav buttons | 43–89 × **20 px** | `Footer.tsx:32` |
| Footer email link | 168 × **19.5 px** | `Footer.tsx:21` |

**23 sub-44 px targets on a phone**, on a build whose stated primary target is phones. The 6×4 px dots are not usable. Cheapest correct fix — keep the visual, grow the hit area:
```tsx
className="p-2 -m-2 …"      /* footer links, dots: 20px visual, 44px+ hit box */
```
The brief says the new footer carries "a full multi-column internal-link map" — that map inherits 20 px-tall links unless `Footer.tsx:32` is fixed first.

### P1.8 · Nothing respects `prefers-reduced-motion`

`grep -rn "reduced-motion\|useReducedMotion\|MotionConfig" src/` → **zero hits**. 43 animation instances across 10 components; 4 run infinitely.

Empirically verified by forcing `matchMedia('(prefers-reduced-motion: reduce)')` to match before first script:

- All three `.color-ray` elements: `animationPlayState: "running"`, `iterationCount: "infinite"`, `filter: blur(30px)`, `will-change: auto` — `globals.css:159-189`. Three permanently-running compositor animations with a 30 px blur and a 20–25 px-spread `box-shadow`, on top of the hero, on every page load.
- Hero scroll chevron: transform moved `3.77 → 7.72` over 400 ms while reduced-motion was forced. `Hero.tsx:66-67` (`repeat: Infinity`). Framer Motion defaults to `reducedMotion: "never"`.

Two-line fix covering all 43:
```tsx
// layout or page root
<MotionConfig reducedMotion="user">
```
```css
@media (prefers-reduced-motion: reduce) { .color-ray { animation: none; } }
```

---

## 3. Priority 2 — real defects, fix during the build

### P2.1 · Process connector is misaligned at every breakpoint

Two separate bugs in one component.

**`sm`–`md` (640–1023 px), `Process.tsx:45`** — `left-6 sm:left-1/4` puts the vertical line at 25 % of the container while `sm:grid-cols-2` + `sm:mx-auto` centres the circles in their columns:

| viewport | line centre | col-1 circles | col-2 circles | misalign |
|---|---|---|---|---|
| 640 | 174 | 164 | 476 | **−10 / +302 px** |
| 768 | 206 | 196 | 572 | **−10 / +366 px** |

Screenshot-confirmed: the line runs straight down through the left column's paragraph text as a strikethrough and touches nothing in the right column.

**`lg`+ (1024 px+), `Process.tsx:37`** — `top-12` (48 px) + `h-1` puts the horizontal line's centre at y=50, but the `sm:w-20 sm:h-20` circles centre at y=70. Settled measurement: **line is 10 px off centre, crossing at 62 % down each circle.**

Fix: the vertical line is only correct in the single-column layout, so scope it to that layout and centre the horizontal one on the circle radius.
```tsx
{/* line 45 */}  className="sm:hidden absolute left-6 top-0 bottom-0 w-1 bg-primary/20"
{/* line 37 */}  className="hidden lg:block absolute top-[38px] left-0 right-0 h-1 bg-primary/20"
```
(`sm:hidden` also removes the `pl-16 sm:pl-0` / absolute-vs-relative circle mismatch that produces the 302 px gap.)

### P2.2 · 14 px of horizontal overflow on first paint, at every phone width

Fresh-load measurement at 360 and 430: `documentElement.scrollWidth` exceeds `clientWidth` by exactly **14 px**. Clip-aware element walk names six offenders, all inside one subtree whose computed transform is `matrix(1, 0, 0, 1, 30, 0)`.

Source: `About.tsx:47` — `initial={{ opacity: 0, x: 30 }}`. Before the section scrolls into view the column sits 30 px right of its box; at 360 px the container is already 328 px inside 16 px gutters, so 14 px escapes. It self-corrects once `whileInView` fires, which is why it is invisible in a casual scroll-through and why `innerWidth` reports the inflated 374/444 while `visualViewport.width` stays at 360/430.

Fix: use `y` rather than `x` for entrance offsets on mobile, or add `overflow-x: clip` to `body`. There are 43 `initial={{...}}` instances; any that translate on X will do this on narrower content in the new templates.

### P2.3 · Mobile "Careers" nav item is dead, and it silently scrolls you backwards

`Careers.tsx:14` is `hidden md:block`, but `data/content.ts:19` keeps `{ label: 'Careers', href: '#careers' }` in the array the mobile accordion renders in full.

Replayed the exact code path from `utils.ts:8` at `scrollY = 3000`:
```
getComputedStyle(#careers).display  →  "none"
getBoundingClientRect()             →  {top: 0, height: 0, width: 0}
elementPosition = 0 + 3000          →  3000
offsetPosition  = 3000 - 80         →  2920
```
Tapping "Careers" on a phone scrolls **up 80 px** and nothing else. The presence of the nav link is the evidence this is a bug, not a deliberate hide — a deliberate hide would have removed the entry. Either drop the item below `md` or stop hiding the section.

**Three different nav subsets exist**, which the 18-page footer link map will have to reconcile: `navigation` has 7 items; desktop nav renders `slice(0, 6)` (drops Contact, `Navbar.tsx:80`); footer renders `slice(0, 5)` (drops Careers *and* Contact, `Footer.tsx:31`); the mobile accordion renders all 7.

### P2.4 · Mobile menu: no `aria-expanded`, no scroll lock

`Navbar.tsx:112` — measured `aria-expanded: null`, `aria-controls: null`. Only `aria-label="Toggle menu"`, which never changes. A screen reader user gets no state.

Open at 360×740 the pill grows to **508 px tall, bottom edge at 524 px** — it fits (216 px to spare), and menu rows are a healthy **308 × 48 px**. But `document.body` computed `overflow: visible` — the page scrolls freely behind the open menu.

### P2.5 · 12 px text on mobile, and Services descriptions lose ~72 % of their content

15 nodes render below the 14 px floor at 360/390 px:

- 6 × Services card descriptions — `Services.tsx:58`, `text-xs` = **12.0 px**
- 9 × CaseStudies industry pills — `CaseStudies.tsx:124`, `text-xs` = **12.0 px**

And the clamp measurement, `Services.tsx:58` `line-clamp-2`:

| card | full text height | visible | hidden |
|---|---|---|---|
| Eastern Europe Talent Pool | 137 px | 39 px | **72 %** |
| Cost-Efficient Solutions | 117 px | 39 px | **67 %** |
| Tailored Matching | 117 px | 39 px | **67 %** |

Card heights are uniform at 169 px, so there is **no height jump** — the grid is stable. The problem is purely that the value proposition is cut mid-phrase ("Direct access to vetted software…") with no way to reveal it. On the primary target device the Services section communicates almost nothing.

Fix: `grid-cols-1` on mobile with `text-sm` (14 px) and no clamp. The 2-column card grid buys density the content cannot afford.

### P2.6 · Images: no `srcset` anywhere, one avatar wastes 100 KB

`next.config.ts` sets `images: { unoptimized: true }`, so `next/image` emits bare `<img>` tags. Measured across all 20 `<img>` elements: **`srcset: null`, `sizes: null`, `width`/`height` attributes absent on 20/20.**

At 390 px / DPR 3:

| file | natural | CSS box | device px needed | oversize | bytes |
|---|---|---|---|---|---|
| `testimonial-adrian-barca.jpeg` | 800×800 | 64×64 | 192×192 | **4.17×** | **106 004** |
| `case-newera.webp` | 1200×750 | 238×134 | 714×402 | 1.68× | 25 640 |
| `case-barca.jpg` | 1440×960 | 308×173 | 924×519 | 1.56× | 50 841 |
| `case-orange.jpg` | 866×650 | 238×134 | 714×402 | 1.21× | 11 501 |

**~150 KB of the 208 KB of images loaded at 390 px (72 %) is pixels the device physically cannot display.** The single 800×800 avatar rendered into a 64 px circle accounts for ~100 KB of that; a correctly-sized 192×192 would be ~8 KB.

Two more: `case-foodamigos.png` (126 030 B) and `case-qualiwise.png` (41 409 B) are PNGs carrying photographic content. And four files in `public/images/` are referenced by nothing — `hero-team.jpg` (143 802 B), `testimonial-barca.jpg`, `testimonial-socialbee.jpg`, `testimonial-startup.jpg` — **159 474 B shipped into `out/` and deployed for nothing.**

CLS is **0.00** despite the missing `width`/`height`, because `fill` inside an `aspect-video`/fixed-size parent reserves the box. No layout-shift problem; a pure bytes problem.

### P2.7 · JS weight

Cold-cache transfer, compressed:

| chunk | transferred | decoded | note |
|---|---|---|---|
| `c284ff537f4f1dda.js` | 70 275 B | 224 413 B | React + Next runtime |
| **`8edebeaa392befa0.js`** | **65 775 B** | **205 174 B** | **framer-motion + app — 33.7 % of all JS** |
| `6a066a81e6879a8d.js` | 39 920 B | 156 015 B | |
| others (4) | 19 433 B | 59 246 B | |
| **total** | **195 403 B** | **644 848 B** | |

Chunk identified as the motion bundle by `whileInView` (18 hits), `transformPerspective`, `originX`, `onAnimationComplete`. Plus **103 732 B** of woff2 and ~208 KB of images ⇒ ~500 KB first load on a phone.

TBT is 0 ms and there are no long tasks, so this is not currently a responsiveness problem. But 43 animation instances buy 65.8 KB, and the 18 new pages will each pay it. Worth asking whether `whileInView` fade-ups earn 65 KB across 18 routes when CSS `@starting-style` / a 10-line IntersectionObserver would do it.

### P2.8 · Duplicate case-study markup in the HTML

`CaseStudies.tsx:93` (mobile carousel) and `CaseStudies.tsx:162` (desktop grid) render the **same nine case studies twice**. Built `index.html` contains **20 `<img>` tags for 11 unique images**; the string `"Team scaled within 2 weeks"` appears **6 times** (3 studies × 2 renders).

Only one set is in the a11y tree at any viewport and only the visible set downloads images, so there is no user-facing bug — but Google parses both, and the duplication is ~9 KB of the 65 KB HTML. If the shared `<ServicePageTemplate>` copies this dual-render pattern across 9 service pages, that is duplicated body content on nine SEO landing pages. Use one render with responsive CSS (`flex` → `grid` at `md`) instead of two DOM trees.

---

## 4. Priority 3 — noted, cheap, do while you are in there

- **Contrast, everything else passes.** `#A3A3A3` on `#121214` = 7.42:1 ✅; on `#1C1C1F` = 6.74:1 ✅. `#F5F5F5` on `#121214` = 17.16:1 ✅. `.btn-primary` label `#3D332E` on `#FFB85A` = **7.16:1 ✅** (and the hover state works — see the correction at the top). `.btn-secondary` `#FFB85A` on `#121214` = 10.92:1 ✅. Navbar links over-hero = 9.68:1 ✅, scrolled = 10.98:1 ✅. Footer text = 6.74:1 ✅.
- **Two non-text contrast failures.** CaseStudies inactive dot `bg-neutral-600 #525252` on `#121214` = **2.39:1** (needs 3:1, `CaseStudies.tsx:153`). Focus ring `#FFB85A` @ 50 % renders as `rgb(136,101,55)`: **3.76:1 against the page background ✅** but **2.90:1 against the `#FFB85A` button it outlines ✗** (WCAG 2.2 SC 2.4.11). The decorative `"` glyph at `text-primary/20` is 1.57:1 — fine, it is decoration.
- **Focus rings do render.** Verified with a forced reflow: `.btn-primary:focus` computes `box-shadow: … lab(80.31 19.95 57.08 / .5) 0 0 0 2px`, and `:focus-visible` matches. My first probe read a stale value — the ring works. It uses `focus:` rather than `focus-visible:`, so it also fires on mouse click (cosmetic).
- **Measure is fine.** Max 56 characters/line at 1440 (Services intro, 768 px box). Nothing approaches 85. `max-w-2xl`/`max-w-3xl` are doing their job. Line-height 1.40–1.63 throughout.
- **No console errors or warnings** on any viewport.
- **Heading order is clean:** exactly one `h1`, then `h2` → `h3`, no skips. But the `h1` is the bare brand name "TalentSync" (`Hero.tsx:27`) — for 9 service+location pages the `h1` must carry the query.
- **Landmarks:** `navigation`, `main`, `contentinfo` present. **No `<header>` banner**, `<nav>` has no `aria-label`, **no skip link** (45 focusable elements before content). With a multi-column footer link map coming, add `<a class="sr-only focus:not-sr-only" href="#main">`.
- **Desktop nav is invisible on landing.** Links only mount after 50 px of scroll (`Navbar.tsx:72`). Screenshot at 1440×900 top-of-page shows logo + CTA only. Between 768 and 1023 px there are no links at all, ever — only the phone accordion.
- **Carousels have no ARIA.** No `aria-live` on the testimonial region, no `aria-current`/`aria-selected` on either dot set. `Testimonials.tsx:89`, `CaseStudies.tsx:147`.
- **Navbar logo is `<a href="#">`** (`Navbar.tsx:66`) — must become `href="/"` the moment a second route exists.
- **1920 px:** content occupies 60.3 % of the viewport (1152 px in 1912 px). Fine for marketing; the planned comparison tables, pricing tables and TOC layouts will want a wider `max-w-7xl` variant of `SectionWrapper`.
- **Vertical rhythm is very loose:** `SectionWrapper` is `py-24 sm:py-32 lg:py-40` (160 px each side at `lg`) plus `mb-20` header margins. Homepage is 10 066 px at 1920. Long-form legal and insight pages will need a tighter variant.

---

## 5. Suggested order of work

1. **Tokens** (P1.1) — one `@theme` addition + one sed across four files. Everything else is easier to see afterwards.
2. **`.text-gradient`** (P1.2) — one line.
3. **`scroll-padding-top`** (P1.3) — two lines of CSS, deletes a function.
4. **`page.tsx` → server component** (P1.4) — blocks every route; do before writing route #1.
5. **`next/font`** (P1.5) — measured 505 ms.
6. **FAQ ARIA + hamburger `aria-expanded` + skip link** (P1.6, P2.4, P3) — these ship into shared furniture.
7. **Tap-target pass on `Footer.tsx` and both dot sets** (P1.7) — before the footer link map is authored.
8. **`<MotionConfig reducedMotion="user">` + one media query** (P1.8).
9. Then the Process connector, the About `x: 30` overflow, the Services clamp, and the image pipeline.


---

## CRITICAL ISSUES (must fix before building on top)


1. Three design tokens are silent no-ops in the built CSS — bg-background-dark, bg-surface-dark and text-text-secondary-dark are NOT emitted by Tailwind v4. Live probe: text-text-secondary-dark resolves to rgb(245,245,245) (inherited) on 57 DOM elements, bg-background-dark and bg-surface-dark resolve to rgba(0,0,0,0). Every body paragraph in About/Services/Process/CaseStudies renders full-white instead of muted #A3A3A3, and four section backgrounds are transparent. Orphans from the light-theme removal in f0b8937. Sites: About.tsx:15,32,39,55 · Services.tsx:26,37,58 · Process.tsx:19,30,70 · CaseStudies.tsx:30,41,72,79,132,194. NOTE: the brief's claim that bg-primary-dark is broken is WRONG — the built CSS contains .btn-primary:hover{background-color:#e5a550}, the hover works.

2. .text-gradient fails WCAG AA on its second half, on every heading. Measured contrast of the real stops: from-primary #FFB85A = 10.92:1 PASS, 50% mid #AB814F = 5.33:1 PASS, to-secondary #574A44 = 2.20:1 on #121214, 2.16:1 on the hero #141416, 2.00:1 on the footer #1C1C1F — all below the 3:1 large-text floor. Visually confirmed: 'TalentSync', 'Advantage' and 'Our Clients' dissolve into the background. globals.css:70-73. This is the signature heading treatment and will appear on ~18 h1s and ~80 h2s. Fix: from-primary to-primary-dark (worst case 8.4:1).

3. scrollToSection() hardcodes navbarHeight = 80 (src/lib/utils.ts:12) but the measured navbar bottom edge is 76px below lg and 84px at lg+ — so on every desktop viewport the top 4px of each section heading lands UNDER the fixed pill. Worse for the new pages: documentElement computes scroll-padding-top: auto, so nothing makes native #anchor links, Find-in-page or scrollIntoView respect the navbar. The planned table of contents, legal anchors and FAQ deep-links will all land under the pill. Fix: html { scroll-padding-top: 96px } and delete the magic number.

4. src/app/page.tsx:1 is 'use client', so it cannot export metadata — per-page SEO metadata is structurally impossible for all 18 planned routes. Every route would inherit layout.tsx's single hardcoded block including og:url 'https://talentsync.eu/' (layout.tsx:14). The built <head> also has no canonical link, no robots meta, no og:image and no JSON-LD. For a build whose purpose is 9 service+location landing pages this blocks everything. Fix before writing route #1: make page.tsx a server component (every child section already carries its own 'use client').

5. The Google Fonts @import at globals.css:1 costs a measured 505 ms of FCP/LCP. Critical request chain at 4x CPU + Slow 4G: document 599 ms -> local CSS 1,158 ms (render-blocking) -> fonts.googleapis.com/css2 1,159 ms (render-blocking, could not even be QUEUED until 1,157 ms) -> fonts.gstatic.com woff2 x2 1,245 ms. Max critical path latency 1,245 ms across 4 hops and 3 origins, and DevTools reports 'no origins were preconnected'. ~558 ms is pure @import serialization. Cold cache: FCP 1,996 ms, LCP 2,972 ms, LCP element is text. 103,732 B of woff2 for 5 requested weights. TBT is 0 ms — the font chain is the bottleneck, not the JS. Fix: next/font/google.

6. The FAQ accordion has zero ARIA and the brief names it as reused off-homepage. All 6 rows measured aria-expanded: null, aria-controls: null, role: null, type: null; the panel has no role or aria-labelledby (FAQ.tsx:34-45). Screen reader users cannot tell open from closed and cannot reach the panel. Ship it as-is and it is broken on every page that reuses it.

7. 23 tap targets below 44x44 CSS px on a phone, on a build whose stated primary target is phones. Worst: CaseStudies carousel dots measure 6x4 px inactive / 24x4 px active with 8 px spacing (CaseStudies.tsx:150). Testimonial dots 7.6x7.6 px, 7.6 px apart (Testimonials.tsx:89). Footer nav buttons 20 px tall and the footer email link 19.5 px tall (Footer.tsx:21,32) — and the new footer is specced to carry a full multi-column internal-link map, which inherits the 20 px rows. Hamburger 40x40, hero chevron 32x32, navbar CTA 36 px tall at 768. Fix pattern: p-2 -m-2 to grow the hit box without changing the visual.

8. Nothing respects prefers-reduced-motion. grep -rn 'reduced-motion|useReducedMotion|MotionConfig' src/ returns zero hits across 43 animation instances in 10 components. Verified by forcing matchMedia to match before first script: all three .color-ray elements keep running (animationPlayState 'running', iterationCount 'infinite', filter blur(30px), will-change auto — globals.css:159-189) and the Hero chevron kept translating 3.77 -> 7.72 px over 400 ms (Hero.tsx:66-67, repeat: Infinity, Framer Motion defaults to reducedMotion 'never'). Four permanently-running animations on every page load. Fix: <MotionConfig reducedMotion="user"> plus one @media (prefers-reduced-motion: reduce) { .color-ray { animation: none } }.
