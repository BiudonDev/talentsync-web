# TalentSync Design System — Definitive Audit

Verified against `src/` at `cc04769` and against a fresh production build (`out/_next/static/chunks/1d0c9801f559a159.css`, 43,712 bytes). Every class string in this document was compiled in a throwaway probe route and confirmed to emit CSS before being prescribed. The repo is unmodified; `out/` was rebuilt from HEAD.

---

## 0. Three corrections to the brief before anything else

**0.1 — `bg-primary-dark` is NOT broken.** The brief lists it as an orphan. It is not. `--color-primary-dark: #E5A550` is defined in `@theme inline`, and the built CSS contains:

```css
.btn-primary:hover{background-color:#e5a550}
```

There is no `.bg-primary-dark` *utility* in the output only because the string never appears in JSX — it appears solely inside `@apply`, which resolved correctly. **The primary button does have a hover colour change. Do not "fix" it.** The real orphan count is **16**, not 17.

**0.2 — `max-w-prose` is hardwired to 65ch and cannot be re-tokenised.** Tailwind v4 ships `--max-width-prose: 65ch` in its *deprecated* block (`node_modules/tailwindcss/theme.css:461`). Adding `--container-prose: 68ch` to `@theme` does **not** override it — probe output was `.max-w-prose{max-width:65ch}`. 65ch is inside the requested 65–75ch band, so use `max-w-prose` and add no token.

**0.3 — there is no `open:` or `group-open:` variant in this Tailwind build.** Both `open:bg-surface` and `group-open:rotate-180` compiled to nothing. Every `<details>`-based component below rotates its chevron with a plain CSS rule in `globals.css` instead. (`marker:hidden` *does* emit, but as `.marker\:hidden ::marker` — a descendant selector, wrong target. Also unusable.)

**0.4 — the site currently has zero alternating bands.** All four `bg-background-dark` sections plus all four `bg-background`/no-bg sections render `#121214`. Hero is `#141416` (hardcoded in `.animated-bg`). The banding was intended and has never worked.

---

## 1. The orphaned-token fix

### 1.1 Per-usage decisions

| Class | Uses | Verdict | Why |
|---|---|---|---|
| `bg-background-dark` | 4 | **Add ONE token** `--color-background-alt: #141416`, rename all 4 | These are alternating section bands. The value already exists in the codebase — `.animated-bg { background: #141416 }`. Reusing that hex introduces zero new colours and makes Hero and the bands one family. `#1C1C1F` (surface) is unusable here: cards are `#1C1C1F` and would vanish. |
| `bg-surface-dark` | 1 | **Delete the suffix** → `bg-surface` | About's stat tiles are cards. Cards are `bg-surface`. A second card colour for one component is dead weight. `#1C1C1F` on a `#141416` band reads correctly (contrast against band is fine, border `#262626` carries the edge). |
| `text-text-secondary-dark` | 11 | **Delete the suffix** → `text-text-secondary` | Pure light-theme residue. `#A3A3A3` on `#121214` = **7.49:1**, on `#1C1C1F` = **6.74:1**, on `#141416` = **7.3:1**. One secondary text colour is enough for a dark-only site. |
| `bg-primary-dark` | 1 | **No change** | Works. See §0.1. |
| `text-secondary-dark` | 10 | **No change** | Resolves to `#3D332E`. Correct role: dark ink on the amber gradient. `#3D332E` on `#FFB85A` = 7.1:1, on `#E5A550` = 5.74:1. |

### 1.2 Runnable fix — exact sed, from repo root

```bash
# 1. bg-background-dark -> bg-background-alt   (4 occurrences)
sed -i '' 's/bg-background-dark/bg-background-alt/g' \
  src/components/sections/About.tsx \
  src/components/sections/Services.tsx \
  src/components/sections/Process.tsx \
  src/components/sections/CaseStudies.tsx

# 2. bg-surface-dark -> bg-surface            (1 occurrence)
sed -i '' 's/bg-surface-dark/bg-surface/g' src/components/sections/About.tsx

# 3. text-text-secondary-dark -> text-text-secondary  (11 occurrences)
sed -i '' 's/text-text-secondary-dark/text-text-secondary/g' \
  src/components/sections/About.tsx \
  src/components/sections/Services.tsx \
  src/components/sections/Process.tsx \
  src/components/sections/CaseStudies.tsx

# 4. verify: this must print nothing
grep -rn 'background-dark\|surface-dark\|text-text-secondary' src/ | grep -- '-dark'
```

Ordering matters: run step 3 **after** step 1/2, and note `text-text-secondary-dark` must be matched with its full `text-text-` prefix so it never touches the 10 legitimate `text-secondary-dark` usages.

### 1.3 Before / after, every occurrence

| File:line | Before | After |
|---|---|---|
| `src/components/sections/About.tsx:15` | `className="bg-background-dark"` | `className="bg-background-alt"` |
| `src/components/sections/About.tsx:32` | `... rounded-3xl bg-surface-dark border ...` | `... rounded-3xl bg-surface border ...` |
| `src/components/sections/About.tsx:39` | `text-lg text-text-secondary-dark` | `text-lg text-text-secondary` |
| `src/components/sections/About.tsx:55` | `space-y-6 text-text-secondary-dark` | `space-y-6 text-text-secondary` |
| `src/components/sections/Services.tsx:26` | `className="bg-background-dark"` | `className="bg-background-alt"` |
| `src/components/sections/Services.tsx:37` | `text-xl text-text-secondary-dark max-w-3xl` | `text-xl text-text-secondary max-w-3xl` |
| `src/components/sections/Services.tsx:58` | `text-xs sm:text-lg text-text-secondary-dark ...` | `text-xs sm:text-lg text-text-secondary ...` |
| `src/components/sections/Process.tsx:19` | `className="bg-background-dark"` | `className="bg-background-alt"` |
| `src/components/sections/Process.tsx:30` | `text-xl text-text-secondary-dark max-w-2xl` | `text-xl text-text-secondary max-w-2xl` |
| `src/components/sections/Process.tsx:70` | `text-base sm:text-lg text-text-secondary-dark ...` | `text-base sm:text-lg text-text-secondary ...` |
| `src/components/sections/CaseStudies.tsx:30` | `className="bg-background-dark py-32"` | `className="bg-background-alt"` (drop `py-32`, see §6.9) |
| `src/components/sections/CaseStudies.tsx:41` | `text-xl text-text-secondary-dark max-w-2xl` | `text-xl text-text-secondary max-w-2xl` |
| `src/components/sections/CaseStudies.tsx:72` | `text-lg text-text-secondary-dark mb-6` | `text-lg text-text-secondary mb-6` |
| `src/components/sections/CaseStudies.tsx:79` | `... gap-3 text-lg text-text-secondary-dark` | `... gap-3 text-lg text-text-secondary` |
| `src/components/sections/CaseStudies.tsx:132` | `... gap-2 text-sm text-text-secondary-dark` | `... gap-2 text-sm text-text-secondary` |
| `src/components/sections/CaseStudies.tsx:194` | `... gap-2 text-sm text-text-secondary-dark` | `... gap-2 text-sm text-text-secondary` |

Untouched (correct as written): `globals.css:9,52,53,65`; `Contact.tsx:47,57`; `CaseStudies.tsx:68,124,186`; `Services.tsx:55`; `About.tsx:35`; `Process.tsx:64`.

### 1.4 The resulting band rhythm

```
Hero          #141416  (.animated-bg)
About         #141416  bg-background-alt
Services      #141416  bg-background-alt   <- two bands adjacent
Process       #141416  bg-background-alt   <- three bands adjacent
CaseStudies   #141416  bg-background-alt   <- four bands adjacent
Testimonials  #121214  bg-background
FAQ           #121214  bg-background
Careers       #121214  bg-background
Contact       #121214  (inherits body)
```

A "band" that runs four sections deep is not a band. **Alternate them:** `About` alt, `Services` base, `Process` alt, `CaseStudies` base, `Testimonials` alt, `FAQ` base, `Careers` alt, `Contact` base. Same token, correct rhythm, and it gives the 9 service-page templates a mechanical rule: **band index = section index mod 2**, expressed as one helper in the template rather than per-section classes.

### 1.5 Corrected `@theme` block

Also drops `inline`. Verified: build passes, CSS grows 43,712 → 45,524 bytes (+4.1%), utilities become `var()`-driven, and `--color-*` land in `:root`. This is required — the prose/TOC/accordion CSS below is raw CSS and needs `var(--color-primary)`, which `@theme inline` makes unavailable (it is why `.color-ray-1/2/3` hardcode `#FFB85A` seven times today).

```css
@import "tailwindcss";
/* NOTE: the Google Fonts @import is deleted here — see §6.10 */

@theme {
  /* ---- Brand ---- */
  --color-primary:        #FFB85A;   /* amber, the only accent */
  --color-primary-light:  #FFCB85;   /* gradient tail + link hover */
  --color-primary-dark:   #E5A550;   /* button hover, gradient stop */

  --color-secondary:      #574A44;   /* warm brown. SURFACES ONLY, never text */
  --color-secondary-dark: #3D332E;   /* ink ON amber */

  /* ---- Surfaces ---- */
  --color-background:     #121214;   /* page ground, odd bands */
  --color-background-alt: #141416;   /* even bands + hero (was bg-background-dark) */
  --color-surface:        #1C1C1F;   /* cards, inputs, accordion rows */
  --color-border:         #262626;   /* every hairline (was border-neutral-800) */

  /* ---- Text ---- */
  --color-text-primary:   #F5F5F5;
  --color-text-secondary: #A3A3A3;

  /* ---- Elevation (extracted from the two magic strings in Navbar.tsx) ---- */
  --shadow-float: 0 8px 32px rgb(0 0 0 / 0.4);        /* floating chrome, neutral */
  --shadow-glow:  0 8px 32px rgb(255 184 90 / 0.2);   /* floating chrome, branded */

  /* ---- Type ---- */
  --font-sans: var(--font-montserrat), system-ui, sans-serif;  /* see §6.10 */
}
```

**Deleted:** `--color-secondary-light: #6B5D56` — zero usages anywhere in `src/`. **Not added:** `--container-prose` (see §0.2), `--radius-4xl` (Tailwind v4 already ships `2rem`, verified `.rounded-4xl{border-radius:var(--radius-4xl)}`).

---

## 2. The complete token table

### 2.1 Colour

| Token | Hex | Role | May be used for | Must NOT be used for |
|---|---|---|---|---|
| `background` | `#121214` | Page ground, odd bands | `bg-background` on `<SectionWrapper>`, scrollbar track | Text. Card fills. |
| `background-alt` | `#141416` | Even bands, hero | `bg-background-alt` on `<SectionWrapper>` | Cards (too close to `surface` for a card on a card) |
| `surface` | `#1C1C1F` | Cards, inputs, accordion rows, TOC panel, footer | `bg-surface` | A section band — cards would disappear |
| `border` | `#262626` | Every hairline | `border-border`, `divide-border`, `<hr>` | Text. Focus rings (use `primary/50`). |
| `text-primary` | `#F5F5F5` | Headings, emphasis, `<strong>` | `text-text-primary` (body already inherits) | Long body paragraphs — too hot at 17.3:1 for 40 clauses |
| `text-secondary` | `#A3A3A3` | All body copy, meta, captions | `text-text-secondary` | Headings. Anything under 12px. |
| `primary` | `#FFB85A` | The single accent | Buttons, links, `::marker`, active states, icon fills, focus rings | Large fills. Body text on `surface` at <14px. |
| `primary-light` | `#FFCB85` | Gradient tail, link hover | `to-primary-light`, `hover:text-primary-light` | Anything that isn't derived from `primary` |
| `primary-dark` | `#E5A550` | Pressed/hover amber, gradient stop | `.btn-primary:hover`, `.gradient-primary` | Text on `background` (still fine at 8.8:1, but off-role) |
| `secondary` | `#574A44` | Decorative surfaces only | Nothing currently. | **Text of any kind.** `#574A44` on `#121214` is **2.22:1** — this is the live `.text-gradient` bug (§6.4). |
| `secondary-dark` | `#3D332E` | Ink on amber | `text-secondary-dark` inside `gradient-primary` / `bg-primary` | Text on any dark surface |

Contrast, measured (WCAG 2.1 relative luminance):

```
#F5F5F5 on #121214 = 17.3:1   AAA
#F5F5F5 on #1C1C1F = 15.6:1   AAA
#A3A3A3 on #121214 =  7.49:1  AAA
#A3A3A3 on #1C1C1F =  6.74:1  AA  (AAA for >=18.66px)
#FFB85A on #121214 = 10.9:1   AAA
#FFB85A on #1C1C1F =  9.85:1  AAA
#FFCB85 on #121214 = 12.7:1   AAA
#3D332E on #FFB85A =  7.1:1   AAA
#3D332E on #E5A550 =  5.74:1  AA
#574A44 on #121214 =  2.22:1  FAIL  <-- .text-gradient tail
```

### 2.2 Spacing

Tailwind `--spacing: 0.25rem`. Use only these rungs; everything currently in the codebase already lands on them except `mt-0.5`.

| Rung | px | Use |
|---|---|---|
| `1` `2` | 4, 8 | icon↔label gaps, tag padding |
| `3` `4` | 12, 16 | intra-component gaps, mobile gutter (`px-4`) |
| `5` `6` | 20, 24 | card padding (mobile), button padding, `sm:px-6` gutter |
| `8` | 32 | card padding (desktop), grid gaps, `lg:px-8` gutter |
| `12` | 48 | stack gaps between sub-blocks |
| `16` `20` `24` | 64, 80, 96 | heading→content, section padding (mobile) |
| `32` `40` | 128, 160 | section padding (sm / lg) |

Canonical section rhythm — **keep what ships**, it is already consistent in `SectionWrapper`:

```
py-24 sm:py-32 lg:py-40      /* 96 / 128 / 160 */
```

Canonical gutter — already consistent, do not vary:

```
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```

Delete `.section-padding` from `globals.css`: it says `py-16 sm:py-20 lg:py-24`, contradicts `SectionWrapper`, and has **zero usages**. Same for `.section-container` (zero usages) and `.card` (zero usages — `Card.tsx` reimplements it inline).

### 2.3 Radius — imposed order

| Class | px | Use — and nothing else |
|---|---|---|
| `rounded-lg` | 8 | Buttons, inputs, inline `<code>`, small media thumbs |
| `rounded-xl` | 12 | Rows *inside* a card, mobile menu items, table cells' outer wrapper, contact chips |
| `rounded-2xl` | 16 | **Cards.** The default container radius. `Card.tsx`, images inside prose |
| `rounded-3xl` | 24 | Oversized feature containers (About stat tiles, Testimonials quote block) |
| `rounded-4xl` | 32 | **Only** the mobile navbar pill when its accordion is open |
| `rounded-full` | — | Pills, tags, avatars, dots, icon buttons, the closed navbar pill |

`rounded-[32px]` in `Navbar.tsx:51` → `rounded-4xl`. Verified: Tailwind v4 default theme has `--radius-4xl: 2rem`, and `.rounded-4xl{border-radius:var(--radius-4xl)}` emits. Zero new tokens.

### 2.4 Elevation

The two magic strings in `Navbar.tsx:55-56` share a geometry and differ only in colour. Extract to two tokens (§1.5) and use:

| Class | Value | Use |
|---|---|---|
| `shadow-sm` | Tailwind default | Card at rest |
| `shadow-lg` | Tailwind default | Card on hover, button on hover |
| `shadow-xl` | Tailwind default | The one Testimonials quote block |
| `shadow-float` | `0 8px 32px rgb(0 0 0 / .4)` | Fixed/floating chrome over neutral ground (navbar over hero) |
| `shadow-glow` | `0 8px 32px rgb(255 184 90 / .2)` | Fixed/floating chrome in its branded state (navbar scrolled) |

Both verified emitting. `Navbar.tsx`:

```diff
-  ? 'bg-neutral-700/50 backdrop-blur-md border-2 border-neutral-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
-  : 'bg-neutral-800/70 backdrop-blur-xl border-2 border-primary/60 shadow-[0_8px_32px_rgba(255,184,90,0.2)]'
+  ? 'bg-neutral-700/50 backdrop-blur-md border-2 border-neutral-400/40 shadow-float'
+  : 'bg-neutral-800/70 backdrop-blur-xl border-2 border-primary/60 shadow-glow'
```

No other shadow values exist. Shadows on `#121214` are nearly invisible anyway — depth on this site comes from `border-border` + `surface`, not shadow. Do not add more.

---

## 3. The type scale

### 3.1 What is actually in the code

```
h1  Hero only          text-4xl sm:text-5xl md:text-6xl lg:text-7xl      36/48/60/72
h2  variant A  (5x)    text-4xl sm:text-5xl lg:text-6xl                  36/48/60
      About:52, Services:34, Process:27, CaseStudies:38, Testimonials:25
h2  variant B  (3x)    text-3xl sm:text-4xl lg:text-5xl                  30/36/48
      FAQ:21, Careers:16, Contact:20
h3  four different     text-xl / text-xl sm:text-2xl / text-3xl / text-sm sm:text-2xl
body                   text-xl flat (16 uses), text-lg, text-base, text-sm, text-xs
```

**The bug is bigger than "two h2 sizes."** On a phone, `h1` and `h2`-variant-A are both `text-4xl` = 36px. There is *no heading hierarchy at all on the primary target device*. And `Services.tsx:57` renders an `<h3>` at `text-sm` (14px) — smaller than the body text next to it.

### 3.2 Canonical scale — copy these strings verbatim

Roles are assigned to the two *existing* strings so nothing is invented; variant A becomes h1, variant B becomes h2, restoring a real step on mobile (36 → 30).

| Role | Class string | px (base/sm/md/lg) |
|---|---|---|
| **display** — hero wordmark only, one per site | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance` | 36/48/60/72 |
| **h1** — every route's page title | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance` | 36/48/—/60 |
| **h2** — section headings | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance` | 30/36/—/48 |
| **h3** — card titles, clause headings | `text-xl sm:text-2xl font-bold` | 20/24 |
| **h4** — sub-clauses, table group labels | `text-base sm:text-lg font-semibold` | 16/18 |
| **body-lg** — section intro paragraph, lede | `text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty` | 18/20 |
| **body** — default paragraph | `text-base sm:text-lg leading-relaxed text-text-secondary text-pretty` | 16/18 |
| **body-sm** — card bullets, meta rows | `text-sm leading-relaxed text-text-secondary` | 14 |
| **caption** — tags, dates, table headers | `text-xs font-medium uppercase tracking-wide text-text-secondary` | 12 |

`text-balance` and `text-pretty` both verified emitting. `text-balance` on headings is the single highest-value mobile typography fix here — it stops 36px headings from leaving one orphaned word on line 4 of a 375px screen.

Migration: the 5 variant-A `<h2>`s drop to variant B. `Services.tsx:57` `text-sm sm:text-2xl` → `text-xl sm:text-2xl`. `CaseStudies.tsx:71` `text-3xl` → h3 string. `Careers.tsx:35` and `CaseStudies.tsx:127,189` `text-xl` → h3 string.

### 3.3 Long-form prose — the scale the site has never needed

A React `<Prose>` component is not worth building. This is one CSS block; `<div className="prose">` is the whole API. Requires the non-inline `@theme` from §1.5. Add to `globals.css` after `@layer components`:

```css
/* ============ Long-form prose: insights, legal ============ */
.prose {
  max-width: var(--max-width-prose);   /* 65ch */
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.75;
  text-wrap: pretty;
}
@media (min-width: 40rem) { .prose { font-size: 1.125rem; } }

.prose > * + *  { margin-top: 1.25em; }

.prose h2 { margin-top: 2.5em;  margin-bottom: .75em; font-size: 1.5rem;
            line-height: 1.25; font-weight: 700; letter-spacing: -.01em;
            color: var(--color-text-primary); scroll-margin-top: 5.5rem; }
@media (min-width: 40rem) { .prose h2 { font-size: 1.875rem; } }

.prose h3 { margin-top: 2em;    margin-bottom: .5em;  font-size: 1.25rem;
            font-weight: 600; color: var(--color-text-primary);
            scroll-margin-top: 5.5rem; }
.prose h4 { margin-top: 1.75em; margin-bottom: .5em;  font-size: 1rem;
            font-weight: 600; color: var(--color-text-primary); }

.prose strong { color: var(--color-text-primary); font-weight: 600; }
.prose a      { color: var(--color-primary); text-decoration: underline;
                text-underline-offset: .2em; text-decoration-thickness: 1px; }
.prose a:hover { color: var(--color-primary-light); }

.prose ul, .prose ol { padding-left: 1.5em; }
.prose ul    { list-style: disc; }
.prose ul ul { list-style: circle; margin-top: .5em; }
.prose ol    { list-style: decimal; }
.prose li    { margin-top: .5em; padding-left: .25em; }
.prose li::marker { color: var(--color-primary); }

.prose blockquote { border-left: 3px solid var(--color-primary);
                    padding-left: 1em; font-style: italic;
                    color: var(--color-text-primary); }
.prose code { background: var(--color-surface); border-radius: var(--radius-lg);
              padding: .15em .4em; font-size: .875em;
              color: var(--color-primary-light); }
.prose hr  { border-color: var(--color-border); margin-block: 3em; }
.prose img { border-radius: var(--radius-2xl); }
.prose table { width: 100%; border-collapse: collapse; font-size: .9375em; }
```

**Legal numbering — a 40-clause terms document, zero JS.** `counters()` produces `1.` / `1.1.` / `1.1.1.` at any depth. Add `.prose-legal` alongside `.prose`:

```css
/* ============ Numbered legal clauses: <div class="prose prose-legal"> ============ */
.prose-legal ol { counter-reset: clause; list-style: none; padding-left: 0; }
.prose-legal ol > li {
  counter-increment: clause;
  position: relative;
  padding-left: 3.5em;
  margin-top: 1em;
}
.prose-legal ol > li::before {
  content: counters(clause, ".") ".";
  position: absolute; left: 0; top: 0;
  min-width: 3em;
  color: var(--color-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.prose-legal ol ol { margin-top: 1em; padding-left: 1.25em; }
.prose-legal ol > li > p:first-child { margin-top: 0; }
/* clause anchors for deep links from the TOC */
.prose-legal li[id] { scroll-margin-top: 5.5rem; }
```

Mobile note: `padding-left: 3.5em` at 16px = 56px of gutter on a 375px screen, leaving ~300px of measure — roughly 40 characters. That is correct for a legal doc read on a phone; do not reduce it or the numbers collide with the text at depth 3.

---

## 4. Breakpoint doctrine

Tailwind v4 defaults, unchanged: `sm 640` `md 768` `lg 1024` `xl 1280` `2xl 1536`. Current usage: 51× `sm:`, 32× `lg:`, 10× `md:`, 0× `xl:`/`2xl:`.

**The rules for the 18 routes:**

1. **`sm` (640) owns the first layout step and every type step.** One column → two columns. Card padding `p-4 → sm:p-6`. Every heading and body size steps here. 640px is the point where a phone in landscape or a small tablet can hold two columns of readable text.

2. **`lg` (1024) owns the desktop step.** Two → three or four columns, the navbar mode switch, the sticky TOC sidebar, the final type step, gutter `px-6 → lg:px-8`. Nothing else changes at `lg`.

3. **`md` (768) is banned, with exactly one exception:** the intermediate 2→3 column step on dense card grids that would otherwise jump 1→3. Currently that is `CaseStudies:162`. Everything else must be re-homed:
   - `Hero.tsx:25,34` `md:text-6xl` / `md:text-3xl` — keep. This is the display role, which by definition gets four steps.
   - `CaseStudies.tsx:93,162` carousel/grid swap — move to `sm:` (a 768px iPad portrait should get the grid, not a phone carousel). Or keep at `md` and accept it; low stakes.
   - `Careers.tsx:14` `hidden md:block` — **delete outright** (§6.6).
   - `About.tsx:16` `grid md:grid-cols-2` — move to `lg:grid-cols-2`. At 768px, two 16px-body columns in a `max-w-6xl` container are ~340px each. That is a phone-width column with desktop-width padding.
   - `Footer.tsx:15,17` `md:flex-row` — becomes moot; the new footer is a `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` link map.

4. **`xl` and `2xl` are unused and must stay unused.** Content is capped at `max-w-6xl` = 72rem = 1152px. Above 1280px nothing can change, so a rule there is either dead or it is fighting the container.

**The iPad trap.** `lg: 1024` means:

| Device | Logical width | Gets |
|---|---|---|
| iPad 10.9" portrait | 820 | mobile nav ✓ |
| iPad Pro 11" portrait | 834 | mobile nav ✓ |
| iPad Pro 12.9" **portrait** | **1024** | **desktop nav** |
| iPad Mini landscape | 1133 | desktop nav |
| iPad Pro 11" landscape | 1194 | desktop nav |

**Verdict: `lg` is the right breakpoint for the navbar and should not move.** It fits: the pill is `min(95vw, 900px)`, six links at `px-3 text-sm` ≈ 540px + logo ≈ 130px + CTA ≈ 150px = 820px < 900px. Confirmed to fit at 1024px.

**But the actual iPad failure is not the breakpoint — it is the scroll gate.** The desktop links are `hidden lg:flex` *and* gated on `isExpanded` (`scrollY > 50`). The hamburger is `lg:hidden`. So at the top of the page on any viewport ≥1024px, **the only navigation on the entire page is "Book A Meeting."** On the homepage that is a deliberate hero effect. On 17 routes with no hero it is a navigation dead end above the fold, on every page, for every desktop and every landscape iPad. Fix in §5.

---

## 5. Component inventory and gaps

### 5.1 Existing primitives

**`Button` — `src/components/ui/Button.tsx`**

```ts
{ children: ReactNode; variant?: 'primary'|'secondary'; href?: string;
  onClick?: () => void; className?: string; external?: boolean }
```
Renders `<a>` if `href`, else `<button>`. No responsive behaviour of its own; `.btn-primary`/`.btn-secondary` are fixed `px-6 py-3 text-base`.

Gaps that block the new routes:
- **No `type`.** Defaults to `submit`. The planned `/contact` form will be submitted by every Button inside it.
- **No internal-link path.** `href` always produces a raw `<a>`. Across 18 routes that means a full document reload and no prefetch on every internal link. Needs `next/link` (works under `output: 'export'`).
- **No `size`.** `Navbar.tsx:106` works around this with `!py-2 !px-5 !text-sm` — three `!important`s that exist only because the prop is missing.
- No `disabled`, no `aria-label` passthrough, no `ref`.

```tsx
// src/components/ui/Button.tsx — replacement
import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const SIZES = { sm: 'px-5 py-2 text-sm', md: 'px-6 py-3 text-base' } as const

export default function Button({
  children, variant = 'primary', size = 'md', href, external = false,
  onClick, type = 'button', disabled, className, ...rest
}: ButtonProps) {
  const cls = cn(
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    SIZES[size],
    disabled && 'pointer-events-none opacity-50',
    className,
  )
  if (href && (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) {
    return <a href={href} target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined} className={cls} {...rest}>{children}</a>
  }
  if (href) return <Link href={href} className={cls} {...rest}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{children}</button>
}
```
Then `Navbar.tsx:106` becomes `size="sm" className="hidden sm:inline-flex whitespace-nowrap"` — three `!important`s gone. Remove `px-6 py-3` from `.btn-primary`/`.btn-secondary` in `globals.css` since `SIZES` now owns it.

**`Card` — `src/components/ui/Card.tsx`**

```ts
{ children: ReactNode; className?: string; hover?: boolean }
```
`bg-surface rounded-2xl border border-neutral-800 p-6 sm:p-8`, optional lift. Not a client component (correct).

**Gaps: none. Do not touch it.** `cn()`/twMerge already lets callers override padding (`Services.tsx:53` does exactly that). `ArticleCard` will wrap a `<Link>` *around* `<Card>` rather than Card growing an `href`, which avoids nested-anchor problems. Only change: `border-neutral-800` → `border-border` for the semantic token.

**`SectionWrapper` — `src/components/ui/SectionWrapper.tsx`**

```ts
{ id: string; children: ReactNode; className?: string }
```
`<section id>` + `py-24 sm:py-32 lg:py-40` + `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.

Gaps:
- **Uses template-string concatenation, not `cn()`.** So `className` cannot override base classes — it only appends. `CaseStudies.tsx:30` passes `py-32` against a base `py-24 sm:py-32 lg:py-40`; both survive into the class list and the winner is decided by Tailwind's stylesheet order, not by the author. This will bite every new page that tries to tighten section padding.
- `id` is required; long-form pages have unnamed sections.
- `'use client'` for no reason — zero hooks, zero handlers, zero `motion`.
- No `width` escape for the prose layout (65ch centred, not `max-w-6xl`).

```tsx
// src/components/ui/SectionWrapper.tsx — replacement (no 'use client')
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  band?: boolean                       // true -> bg-background-alt
  width?: 'default' | 'narrow' | 'full'
  className?: string
  innerClassName?: string
}

const WIDTHS = {
  default: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow:  'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  full:    'w-full',
} as const

export default function SectionWrapper({
  children, id, band, width = 'default', className, innerClassName,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn(
      'py-24 sm:py-32 lg:py-40 scroll-mt-22',
      band && 'bg-background-alt',
      className,
    )}>
      <div className={cn(WIDTHS[width], innerClassName)}>{children}</div>
    </section>
  )
}
```
`scroll-mt-22` = 5.5rem = 88px, verified emitting. It replaces the JS scroll offset for every anchored section (§6.1).

**`Navbar` — one prop, not a rewrite**

```diff
- export default function Navbar() {
-   const [isExpanded, setIsExpanded] = useState(false)
+ export default function Navbar({ variant = 'solid' }: { variant?: 'hero' | 'solid' }) {
+   const [isExpanded, setIsExpanded] = useState(variant === 'solid')
...
-       setIsExpanded(scrollY > 50)
+       if (variant === 'hero') setIsExpanded(scrollY > 50)
```
Homepage passes `variant="hero"`; the other 17 routes get the default and show their links immediately. Also add `aria-expanded={isMobileMenuOpen}` and `aria-controls="mobile-menu"` to the hamburger, and `id="mobile-menu"` to the panel.

### 5.2 New primitives — BUILD these seven

**1. `Breadcrumbs`** — 15+ routes, needs JSON-LD, needs a real mobile behaviour.

```ts
export interface Crumb { label: string; href?: string }   // last item: no href
interface BreadcrumbsProps { items: Crumb[]; className?: string }
```
```tsx
// src/components/ui/Breadcrumbs.tsx  (server component, no 'use client')
import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'
import { cn } from '@/lib/utils'

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb"
         className={cn('-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0', className)}>
      <ol className="flex w-max items-center gap-2 text-sm text-text-secondary sm:w-auto sm:flex-wrap">
        {items.map((c, i) => (
          <li key={i} className="flex shrink-0 items-center gap-2">
            {i > 0 && <HiChevronRight className="h-4 w-4 shrink-0 text-border" aria-hidden />}
            {c.href
              ? <Link href={c.href} className="whitespace-nowrap transition-colors hover:text-primary">{c.label}</Link>
              : <span aria-current="page" className="whitespace-nowrap text-text-primary">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```
Mobile: `-mx-4 overflow-x-auto px-4 scrollbar-hide` + `w-max` keeps the trail on one swipeable line and bleeds to the screen edge instead of wrapping "Software Engineering Recruitment in Chișinău" onto four lines. `scrollbar-hide` already exists in `globals.css`.

**2. `Accordion`** — extracted from `FAQ.tsx`, rebuilt on native `<details>`. This **deletes** `useState`, `AnimatePresence`, and two `motion` wrappers, makes it accessible for free, keeps the answers in the DOM (indexable, and Chrome auto-expands `<details>` for find-in-page), and renders correctly before hydration.

```ts
export interface AccordionItem { question: string; answer: ReactNode; id?: string }
interface AccordionProps {
  items: AccordionItem[]
  name: string          // required: groups the <details> so only one opens at a time
  defaultOpen?: number  // index, default none
  className?: string
}
```
```tsx
// src/components/ui/Accordion.tsx  (server component)
import { HiChevronDown } from 'react-icons/hi'
import { cn } from '@/lib/utils'

export default function Accordion({ items, name, defaultOpen, className }: AccordionProps) {
  return (
    <div className={cn('divide-y divide-border overflow-hidden rounded-2xl bg-surface', className)}>
      {items.map((item, i) => (
        <details key={i} id={item.id} name={name} open={i === defaultOpen} className="accordion scroll-mt-22">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-base font-semibold text-text-primary transition-colors hover:text-primary sm:p-6 sm:text-lg">
            <span className="text-pretty">{item.question}</span>
            <HiChevronDown className="accordion-chevron h-5 w-5 shrink-0 text-primary transition-transform duration-200" aria-hidden />
          </summary>
          <div className="px-5 pb-5 text-base leading-relaxed text-text-secondary text-pretty sm:px-6 sm:pb-6 sm:text-lg">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
```
Two rules in `globals.css` — **required**, because `open:` / `group-open:` do not exist in this Tailwind build (verified, §0.3):
```css
.accordion > summary { list-style: none; }
.accordion > summary::-webkit-details-marker { display: none; }
.accordion[open] > summary .accordion-chevron { rotate: 180deg; }
```
The `name` attribute gives exclusive-accordion behaviour natively (Chrome 120+, Safari 17.2+, Firefox 130+), matching today's single-`openIndex` behaviour. Older Firefox degrades to multiple-open, which is fine.

**3. `TableOfContents`** — sticky aside on desktop, native `<details>` on mobile. No IntersectionObserver, no scroll-spy.

```ts
export interface TocItem { id: string; label: string; depth?: 2 | 3 }
interface TableOfContentsProps { items: TocItem[]; className?: string }
```
```tsx
// src/components/ui/TableOfContents.tsx  (server component)
import { cn } from '@/lib/utils'

function List({ items }: { items: TocItem[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {items.map((it) => (
        <li key={it.id} className={it.depth === 3 ? 'pl-4' : undefined}>
          <a href={`#${it.id}`} className="block py-1 text-text-secondary transition-colors hover:text-primary">
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  return (
    <>
      {/* mobile: collapsed, in flow */}
      <details className="accordion mb-10 rounded-2xl border border-border bg-surface lg:hidden">
        <summary className="cursor-pointer p-5 text-base font-semibold text-text-primary">On this page</summary>
        <div className="px-5 pb-5"><List items={items} /></div>
      </details>
      {/* desktop: sticky rail */}
      <nav aria-label="On this page"
           className={cn('sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto lg:block', className)}>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">On this page</p>
        <List items={items} />
      </nav>
    </>
  )
}
```
Page layout that hosts it: `<div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">` with the prose first and the TOC second in DOM order — so on mobile the `<details>` sits above the content, and on desktop it lands in the right rail. `top-28` = 7rem = 112px clears the 88px navbar plus 24px.

**4. `TableScroll`** — the *only* part of "ComparisonTable" worth componentising. Six lines that mechanically enforce "never overflow the page."

```ts
interface TableScrollProps { children: ReactNode; className?: string }
```
```tsx
// src/components/ui/TableScroll.tsx  (server component)
export default function TableScroll({ children, className }: TableScrollProps) {
  return (
    <div role="region" tabIndex={0} aria-label="Scrollable table"
         className={cn('-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0', className)}>
      <div className="min-w-[36rem]">{children}</div>
    </div>
  )
}
```
`-mx-4 px-4` makes the scroll region bleed to the phone's edge so the first and last columns are reachable. `role="region" tabIndex={0}` is what makes a horizontally-scrolling region keyboard-operable — not optional. Table markup itself is documented, not abstracted:

```tsx
<TableScroll>
  <table className="w-full border-collapse text-left text-sm sm:text-base">
    <thead>
      <tr className="border-b border-border">
        <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-text-secondary">Model</th>
        ...
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      <tr><th scope="row" className="px-4 py-4 font-semibold text-text-primary">Contract</th>
          <td className="px-4 py-4 text-text-secondary">…</td></tr>
    </tbody>
  </table>
</TableScroll>
```
A generic `<ComparisonTable columns={} rows={}>` is the wrong abstraction: nine service pages will each want a different cell shape (check marks, prices, prose), and every one of them would fight the API.

**5. `StatTile`** — 3 stats × 9 service pages + About = ~30 instances of identical markup. Extracted from `About.tsx:26-41`.

```ts
import type { IconType } from 'react-icons'
interface StatTileProps { icon: IconType; value: string; label: string; className?: string }
```
```tsx
// src/components/ui/StatTile.tsx  (server component)
export default function StatTile({ icon: Icon, value, label, className }: StatTileProps) {
  return (
    <div className={cn('flex items-center gap-4 rounded-3xl border border-border bg-surface p-5 sm:gap-5 sm:p-8', className)}>
      <div className="gradient-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16">
        <Icon className="h-6 w-6 text-secondary-dark sm:h-8 sm:w-8" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-text-primary sm:text-3xl">{value}</p>
        <p className="text-sm text-text-secondary sm:text-lg">{label}</p>
      </div>
    </div>
  )
}
```
Note the mobile fix baked in: About currently uses a flat `p-8` (32px) and a flat `w-16 h-16` icon, which on a 375px screen leaves ~230px for a value like "1-2 weeks" plus its label. `p-5 sm:p-8` and `h-12 sm:h-16` recover 48px.

**6. `ArticleCard`** — `/insights` index and `/case-studies` index. Wraps `Card`, does not modify it.

```ts
interface ArticleCardProps {
  href: string; title: string; excerpt: string;
  image?: string; tag?: string; date?: string;   // ISO
  className?: string
}
```
```tsx
// src/components/ui/ArticleCard.tsx  (server component)
import Link from 'next/link'
import Image from 'next/image'
import Card from './Card'

export default function ArticleCard({ href, title, excerpt, image, tag, date, className }: ArticleCardProps) {
  return (
    <Link href={href} className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
      <Card className={cn('flex h-full flex-col overflow-hidden p-4 sm:p-6', className)}>
        {image && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
            <Image src={image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                   className="object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
        )}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {tag && <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-secondary-dark">{tag}</span>}
          {date && <time dateTime={date} className="text-xs text-text-secondary">
            {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </time>}
        </div>
        <h3 className="mb-2 text-xl font-bold text-text-primary text-pretty sm:text-2xl">{title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary text-pretty">{excerpt}</p>
      </Card>
    </Link>
  )
}
```
`alt=""` because the title immediately follows and the whole card is one link — a duplicate accessible name is noise. No `line-clamp` on the excerpt: author a short excerpt in the data file instead (§6.7).

**7. `CTABand`** — the highest-repetition block on the new site (15+ pages).

```ts
interface CTABandProps {
  title: string; body?: string;
  primary?: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string }
  band?: boolean; className?: string
}
```
```tsx
// src/components/ui/CTABand.tsx  (server component)
import SectionWrapper from './SectionWrapper'
import Button from './Button'
import { siteConfig } from '@/data/content'

export default function CTABand({
  title, body, band,
  primary = { label: 'Book A Meeting', href: siteConfig.calendlyUrl, external: true },
  secondary, className,
}: CTABandProps) {
  return (
    <SectionWrapper band={band} width="narrow" className={className}>
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">{title}</h2>
        {body && <p className="mx-auto mt-4 max-w-prose text-lg leading-relaxed text-text-secondary text-pretty sm:text-xl">{body}</p>}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={primary.href} external={primary.external}>{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="secondary">{secondary.label}</Button>}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

### 5.3 New primitives — DO NOT BUILD these three

**`Prose`** — a React wrapper adds nothing over `<div className="prose">`. The styling is descendant CSS (§3.3); a component cannot make that shorter, and it would tempt someone into passing `dangerouslySetInnerHTML` through a prop. **Verdict: CSS class only.**

**`Pill` / `Tag`** — it is one span with one class string. Three components already inline it correctly today (`CaseStudies:68,124,186`). Wrapping one element in a component to save typing one class string is negative value. **Verdict: paste this string.**
```
inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-secondary-dark
```
Outline variant, for filters and topic tags:
```
inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary
```

**`AuthorByline`** — three elements (avatar, name, date) used on one route family, and it will want to differ between the article header and the article footer. Paste it into the article template:
```tsx
<div className="flex items-center gap-3 text-sm">
  <Image src={author.avatar} alt="" width={40} height={40} className="rounded-full" />
  <div>
    <p className="font-semibold text-text-primary">{author.name}</p>
    <p className="text-text-secondary">
      <time dateTime={date}>{formatted}</time>{readingMinutes && ` · ${readingMinutes} min read`}
    </p>
  </div>
</div>
```
Promote it to `src/components/ui/` the second time it appears in two different templates. Not before.

### 5.4 Footer

Not in the brief's list but it is the piece that carries the internal-link map. It needs: `navigation` replaced by a `footerNav: { heading, links: {label, href}[] }[]` array in `content.ts`; `scrollToSection` calls replaced by `<Link href>` (§6.1); `flex-col md:flex-row` replaced by `grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5`; `'use client'` removed once the scroll-to-top button is either dropped or split into a 5-line client leaf. Two columns on a 375px phone is the correct density for a 5-group link map — one column makes the footer 900px tall.

---

## 6. Anti-patterns to stop repeating

**6.1 — Hardcoded 80px navbar offset in JS.**
`src/lib/utils.ts:12` `const navbarHeight = 80`. Three problems: the mobile navbar is `top-4` + `h-14` = 72px, so phones already land 8px wrong; the constant is invisible to anyone editing `Navbar.tsx`; and `scrollToSection` only works within the current DOM, so **every cross-page anchor on the 18 new routes (`/services/x#faq`) will silently fail.**

Rule: **anchor offsets are CSS, not JavaScript.** Delete `scrollToSection` entirely, use plain `<a href="#id">` / `<Link href="/x#id">`, and add to `globals.css`:
```css
html { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```
Plus `scroll-mt-22` on `SectionWrapper` (verified emitting) as a per-element backstop. This deletes 13 lines of JS, fixes the 8px mobile error, fixes cross-page anchors, works with browser back/forward and with JS disabled, and honours reduced-motion — which the current implementation does not.

**6.2 — Arbitrary values.** `w-[calc(100vw-16px)]`, `rounded-[32px]`, `shadow-[0_8px_32px_rgba(...)]` ×2, `via-[#0F0F0F]`, `w-[min(95vw,900px)]`.

| Current | Replacement |
|---|---|
| `rounded-[32px]` | `rounded-4xl` (verified; v4 default `--radius-4xl: 2rem`) |
| `shadow-[0_8px_32px_rgba(0,0,0,0.4)]` | `shadow-float` (token, §2.4) |
| `shadow-[0_8px_32px_rgba(255,184,90,0.2)]` | `shadow-glow` (token, §2.4) |
| `via-[#0F0F0F]/50` | `via-background` — `#121214` vs `#0F0F0F` is imperceptible at 50% opacity mid-gradient, and it deletes an off-system hex |
| `w-[calc(100vw-16px)]` | `left-2 right-2 w-auto` on the nav wrapper — and drop `left-1/2 -translate-x-1/2` on mobile. `100vw` **includes the scrollbar gutter** on desktop, so this is a latent horizontal-overflow bug the moment the pill is shown at a width where a scrollbar exists |
| `w-[min(95vw,900px)]` | Keep. `min()` genuinely has no utility equivalent, it is one occurrence, and it is load-bearing for the expand animation. Arbitrary values are allowed when the alternative is a token used once. |

Rule: **an arbitrary value is allowed only when it appears exactly once and no token could be reused twice.** Everything else becomes a token.

**6.3 — Two h2 scales.** Covered in §3. Rule: **heading sizes come from the nine strings in §3.2 and nowhere else.** No component invents a heading size.

**6.4 — `.text-gradient` fades into the background.** `from-primary to-secondary` ends at `#574A44`, which is **2.22:1** on `#121214`. Every `<h2>` on the site (7 elements) has an unreadable right edge — worse on mobile, where headings wrap and the gradient still spans the full box width.
```diff
   .text-gradient {
-    @apply bg-gradient-to-r from-primary to-secondary;
+    @apply bg-gradient-to-r from-primary to-primary-light;
     @apply bg-clip-text text-transparent;
   }
```
`--color-primary-light` (`#FFCB85`) is already defined and has **zero usages** — this is the job it was created for. Worst point after the fix: 9.85:1. Rule: **no colour with a contrast below 4.5:1 on `background` may ever appear in a text gradient, at any stop.**

**6.5 — `hidden md:block` on a whole section.** `Careers.tsx:14` hides the entire Careers section from every phone. Mobile is the stated primary target. It also still ships in the HTML, so it is downloaded and indexed but never visible.

Rule: **`hidden` may hide a *presentation* of content that exists in another form at that breakpoint (a carousel vs a grid, as `CaseStudies` correctly does), and nothing else.** If content is not good enough for a phone, delete it from the page; do not hide it. Fix: drop `hidden md:block`, and stack the card contents (`flex flex-col` with the Apply button full-width below) at base.

**6.6 — `hidden md:grid` duplicating a whole subtree.** `CaseStudies` renders the same 10 cards twice — once in a carousel, once in a grid. Both are in the HTML; the page ships 20 card subtrees and 20 `<Image>` elements. It is the *right pattern* (§6.5) applied at the wrong grain. Rule: **when two presentations share their content, extract the item into one component and map it twice; never duplicate the JSX.** Here: one `<CaseStudyCard>` used in both branches — deletes 40 lines.

**6.7 — `line-clamp` to hide content.** `Services.tsx:58` `line-clamp-2 sm:line-clamp-none`. On phones every service description is cut mid-sentence with no way to expand, and there is no cue that text is missing. That is hiding content, not previewing it.

Rule: **`line-clamp` is legitimate only when the full text is reachable one tap away** (an article card that links to the article). Otherwise, **author shorter copy in `content.ts`**. Fix for Services: add a `short` field to each service, render `short` at base and `description` at `sm:`. Same rule kills the `text-sm sm:text-2xl` h3 next to it (§3.1) — a 14px heading exists only to make a clamped card fit.

**6.8 — `'use client'` by default.** 13 of 14 files carry it. Two are gratuitous:
- `src/components/ui/SectionWrapper.tsx` — zero hooks, zero handlers, zero `motion`.
- `src/app/page.tsx` — pure composition. **And this one is blocking:** a `'use client'` page **cannot export `metadata`**. Every one of the 18 planned routes needs its own `<title>`, description and canonical. As long as the route files are client components, the whole site inherits `layout.tsx`'s single title.

Rule: **`'use client'` lives on the smallest leaf that needs it, never on `page.tsx` and never on a layout primitive.** A route file exports `metadata` and composes; interactivity is a child. (`About.tsx` and `Services.tsx` have no hooks but *do* use `motion` + `whileInView`, so they legitimately need the directive — until `<Reveal>`, a 12-line client wrapper around `motion.div`, replaces the 24 hand-rolled `initial/whileInView/viewport/transition` prop sets across the site.)

**6.9 — `className` that cannot override.** `SectionWrapper` concatenates with a template string instead of `cn()`, so `CaseStudies.tsx:30`'s `py-32` fights the base `py-24 sm:py-32 lg:py-40` and the winner is stylesheet order. Rule: **every component that accepts `className` must merge it through `cn()`.** `Button` and `Card` already do; `SectionWrapper` is the only offender and the fix is in §5.1.

**6.10 — `@import url(fonts.googleapis.com)` at the top of `globals.css`.** Verified against the built `out/index.html`: there is **no font preload and no preconnect** in `<head>`. The discovery chain on a cold mobile connection is HTML → CSS chunk → parse → DNS+TLS to `fonts.googleapis.com` → its CSS → DNS+TLS to `fonts.gstatic.com` → woff2. Four serialised round trips before a single glyph paints. `@import` inside a stylesheet is the slowest possible way to load a font, and it is the first line of the file.

Rule: **fonts are loaded by `next/font`, never by `@import` or `<link>`.** Works under `output: 'export'` — the woff2 is downloaded at build time and self-hosted from `/_next/static/media`, killing both third-party origins.
```tsx
// src/app/layout.tsx
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],           // latin-ext: Chișinău
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
})
// <html lang="en" className={montserrat.variable}>
```
then delete the `@import url(...)` line and set `--font-sans: var(--font-montserrat), system-ui, sans-serif` (already in §1.5).

**6.11 — `min-h-screen` on the hero.** `Hero.tsx:11`. `100vh` on iOS Safari is the *large* viewport, so at first paint the hero is taller than what is visible and the two CTAs sit under the toolbar. Rule: **`dvh`/`svh` for full-height on mobile, never `vh`.** Fix: `min-h-[100svh]` — or better, since this is the one place it is needed, register nothing and use `min-h-dvh` (Tailwind v4 ships it).

**6.12 — Interactive widgets built from `useState` + `AnimatePresence`.** FAQ has no `aria-expanded`, no `aria-controls`, its triggers are `<button>`s rather than headings, and the collapsed answer is *removed from the DOM* — so it is not indexed and Ctrl-F cannot find it. That is a direct SEO loss on nine service pages that will each carry an FAQ block.

Rule: **reach for the native element before the state hook.** `<details>`/`<summary>` (§5.2) gives expand/collapse, keyboard support, correct ARIA, find-in-page, no-JS rendering, and exclusive grouping via `name=` — for zero lines of JavaScript. Same rule applies to the mobile nav (a `<details>`, not `useState` + `AnimatePresence`) and to the TOC.

**6.13 — Dead CSS.** Zero usages anywhere in `src/`: `.section-container`, `.section-padding`, `.card`, `@keyframes gradient-shift`, `@keyframes ray-rotate`, `--color-secondary-light`. Delete all six. `.card` in particular is actively misleading — `Card.tsx` reimplements it inline, so anyone editing `.card` to restyle cards will change nothing.

**6.14 — Brand hex hardcoded in raw CSS.** `#FFB85A` appears 4×, `#E5A550` 2×, plus three `rgba(255,184,90,…)` / `rgba(229,165,80,…)` in `.gradient-primary` and `.color-ray-*`. This is a direct consequence of `@theme inline`, which does not emit the custom properties to `:root` (confirmed: the built `:root` contains Tailwind's neutrals but none of the brand tokens). Dropping `inline` (§1.5) makes `var(--color-primary)` available and lets all nine hardcoded values become token references.

---

## Fix order

1. §1.2 sed + §1.5 `@theme` (drop `inline`, add `background-alt`/`border`/`shadow-float`/`shadow-glow`, delete `secondary-light`) — unbreaks 16 dead classes.
2. §6.4 `.text-gradient` — one line, fixes every h2 on the site.
3. §6.8 `'use client'` off `page.tsx` + §5.1 `SectionWrapper` with `cn()` — unblocks per-route `metadata` and per-page padding.
4. §6.1 delete `scrollToSection`, add `scroll-padding-top` — unblocks cross-page anchors.
5. §5.1 `Button` with `next/link` + `type` + `size` — unblocks 18-route client nav and the contact form.
6. §3.2 heading strings across the 5 variant-A h2s and the 4 stray h3s.
7. §5.2 the seven new primitives.
8. §6.10 `next/font`, §6.5 unhide Careers, §6.7 Services copy, §6.11 `min-h-dvh`, §6.13 dead CSS.

Steps 1–5 all touch shared files. Do them before any new route exists, or you will be sed-ing 18 pages instead of 9 files.


---

## CRITICAL ISSUES (must fix before building on top)


1. 16 utility classes emit zero CSS (verified against out/_next/static/chunks/1d0c9801f559a159.css): bg-background-dark x4 (About:15, Services:26, Process:19, CaseStudies:30), bg-surface-dark x1 (About:32), text-text-secondary-dark x11 (About:39,55; Services:37,58; Process:30,70; CaseStudies:41,72,79,132,194). Every section band and 11 body-copy blocks are silently unstyled. NOTE: bg-primary-dark is NOT broken - the built CSS contains .btn-primary:hover{background-color:#e5a550}; the brief is wrong on that one. Real orphan count is 16, not 17.

2. `.text-gradient` is `from-primary to-secondary`, ending at #574A44, which is 2.22:1 against the #121214 page background - a WCAG failure. This affects all 7 <h2> elements on the site, and is worse on mobile where headings wrap while the gradient still spans the full element box. Fix: `to-primary-light` (#FFCB85, 12.7:1) - a token that is already defined and has zero usages.

3. src/app/page.tsx is marked 'use client'. A client component CANNOT export `metadata`. As long as route files are client components, all 18 planned routes inherit layout.tsx's single title/description - no per-route <title>, description or canonical is possible. This blocks the entire SEO premise of the build.

4. src/components/ui/SectionWrapper.tsx concatenates className with a template string instead of cn(), so a caller's className can never override a base class. CaseStudies.tsx:30 passes `py-32` against base `py-24 sm:py-32 lg:py-40`; both land in the class list and the winner is decided by Tailwind's stylesheet ordering, not by the author.

5. src/lib/utils.ts:12 hardcodes navbarHeight = 80, but the mobile navbar is top-4 + h-14 = 72px, so phone anchors already land 8px wrong. Worse, scrollToSection only operates on the current DOM - every cross-page anchor on the new routes (e.g. /services/x#faq) will silently do nothing. Replace with CSS: `html { scroll-padding-top: 5.5rem }` plus `scroll-mt-22` on sections, and delete the function.

6. Navbar shows zero navigation links above 50px of scroll on any viewport >= 1024px (links are `hidden lg:flex` AND gated on isExpanded; the hamburger is `lg:hidden`). On the 17 planned routes that have no hero, the only link above the fold on every page will be 'Book A Meeting'. Fix: a `variant?: 'hero' | 'solid'` prop, defaulting to solid.

7. Careers.tsx:14 is `hidden md:block` - the entire section is invisible on every phone, while mobile is the stated primary target. It still ships in the HTML, so it is downloaded and indexed but never rendered to the user.

8. Button has no `type` prop, so it defaults to type='submit'. Every Button placed inside the planned /contact form will submit that form.

9. On phones, h1 (Hero, text-4xl) and h2 (About/Services/Process/CaseStudies/Testimonials, text-4xl) are both 36px - there is no heading hierarchy at all on the primary target device. Separately, Services.tsx:57 renders an <h3> at text-sm (14px), smaller than the body copy beside it.

10. Services.tsx:58 uses `line-clamp-2 sm:line-clamp-none`, permanently truncating every service description mid-sentence on phones with no expand affordance and no cue that text is missing.

11. FAQ.tsx accordion has no aria-expanded and no aria-controls, its triggers are plain <button>s rather than headings, and AnimatePresence removes collapsed answers from the DOM entirely - so the answers are neither indexable nor findable with Ctrl-F. This pattern is slated for reuse on nine service pages.

12. The Google Font is loaded via `@import url(fonts.googleapis.com...)` on line 1 of globals.css. Verified: the built out/index.html contains no preconnect and no font preload, so first glyph paint is four serialised round trips deep (HTML -> CSS chunk -> googleapis CSS -> gstatic woff2). Direct LCP cost on mobile.

13. Hero.tsx:11 uses min-h-screen. On iOS Safari 100vh is the large viewport, so at first paint the hero exceeds the visible area and both CTAs sit beneath the browser toolbar. Use min-h-dvh.

14. Dead code with zero usages in src/: the .section-container, .section-padding and .card component classes, @keyframes gradient-shift, @keyframes ray-rotate, and --color-secondary-light. `.card` is actively misleading - Card.tsx reimplements it inline, so editing .card to restyle cards changes nothing.
