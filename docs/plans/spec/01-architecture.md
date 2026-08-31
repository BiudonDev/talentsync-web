> **Verified against the working tree**: all of `src/` read, `out/` inspected, the guard script in §9 written and executed (it exits 1 and reports exactly the four real defects of the current build). No new dependencies.
>
> **Net new machinery: 6 files.** Ten of the eighteen routes come from a *single* `page.tsx`.

## 0. Three facts from the code that shape everything

1. **All nine section components use `framer-motion`.** None can drop `'use client'`. The refactor is not "make sections server components" — it is "stop the *page file* from being a client component". Much smaller job.
2. **`SectionWrapper.tsx` has `'use client'` for no reason** — no hooks, no handlers. Delete the directive; that one deletion lets server pages use it.
3. **`text-text-secondary-dark`, `bg-background-dark`, `bg-surface-dark` are dead classes.** `globals.css` `@theme` declares `--color-text-secondary`, not `--color-text-secondary-dark`, so Tailwind v4 emits no such utility (confirmed: built CSS has `.bg-surface`, no `.bg-surface-dark`). Leftovers from the light-theme removal in `f0b8937`. **New code uses `text-text-secondary` / `bg-background` / `bg-surface`.** Do not copy the `-dark` suffix out of the existing sections.

---

## 1. Target file tree

```
src/
├── app/
│   ├── layout.tsx                    MODIFY  metadataBase, robots, Navbar/Footer, Org+WebSite JSON-LD
│   ├── page.tsx                      MODIFY  drop 'use client', export metadata, page JSON-LD
│   ├── not-found.tsx                 NEW     → out/404.html (nginx error_page target)
│   ├── sitemap.ts                    NEW     force-static, generated from the data modules
│   ├── globals.css                   MODIFY  +3 lines (native smooth scroll)
│   ├── [slug]/page.tsx               NEW     ← ALL TEN service + location pages
│   ├── about/page.tsx                NEW
│   ├── contact/page.tsx              NEW
│   ├── case-studies/page.tsx         NEW
│   ├── case-studies/[slug]/page.tsx  NEW
│   ├── insights/page.tsx             NEW
│   ├── insights/[slug]/page.tsx      NEW
│   ├── privacy/page.tsx              NEW     9 lines
│   ├── terms/page.tsx                NEW     9 lines
│   └── cookies/page.tsx              NEW     9 lines
├── components/
│   ├── layout/Navbar.tsx             REWRITE next/link, no scrollToSection
│   ├── layout/Footer.tsx             REWRITE 3-column link map, server component
│   ├── sections/ServicePageTemplate.tsx  NEW ← the one template (server component)
│   ├── sections/index.ts             MODIFY  +1 export
│   ├── sections/*.tsx (the 9)        UNCHANGED — all keep 'use client'
│   ├── ui/Blocks.tsx                 NEW     Block type + renderer (~28 lines)
│   ├── ui/JsonLd.tsx                 NEW     5 lines
│   ├── ui/SectionWrapper.tsx         MODIFY  delete 'use client'
│   ├── ui/index.ts                   MODIFY  +2 exports
│   └── ui/{Button,Card}.tsx          UNCHANGED
├── data/
│   ├── content.ts                    MODIFY  navigation rewrite; caseStudies gain slug/summary/body
│   ├── service-pages.ts              NEW     the 10 ServicePage objects
│   ├── insights.ts                   NEW
│   └── legal.ts                      NEW     privacy / terms / cookies bodies
└── lib/
    ├── seo.ts                        NEW     href(), pageMeta(), schema builders
    └── utils.ts                      MODIFY  DELETE scrollToSection (CSS replaces it)

nginx.conf                            MODIFY  =404 fallback, error_page, redirects
public/robots.txt                     NEW
public/opengraph-image.png            NEW     1200×630 asset
public/{next,vercel,file,globe,window}.svg   DELETE  unused Next boilerplate
scripts/check-seo.mjs                 NEW     build guard
package.json                          MODIFY  +postbuild
```

### Why one `app/[slug]/page.tsx` for ten routes

The brief is "adding a page is a data edit, not a new component". A root `[slug]` with `generateStaticParams` fed from `servicePages` achieves that exactly: adding page eleven is *zero* new files. The alternative is ten near-identical 12-line `page.tsx` files that will drift.

Static segments beat dynamic ones in the App Router, so `/about`, `/contact`, `/case-studies`, `/insights`, `/privacy`, `/terms`, `/cookies` are unaffected. With `dynamicParams = false`, only the listed slugs are emitted.

`// ponytail:` **known ceiling** — if someone later adds `src/app/hire-ai-engineers/page.tsx` while that slug is still in `servicePages`, the static file silently wins and the data-driven page vanishes from the site while staying in the sitemap. That exact failure is what the §9 guard catches (`sitemap.xml  no page emitted for …`). Upgrade path: split into real folders only if the route set ever stops being data-shaped.

**Not built, flagged:** `/careers/`. The research is right that `JobPosting` is the single highest-value rich result TalentSync qualifies for, and `careers` already holds two real roles. It is outside the 18 required routes. The homepage `Careers` section stays where it is.

---

## 2. The server/client split

The blocking problem is one line. `src/app/page.tsx` starts with `'use client'`, and a client component cannot export `metadata`. Nothing else about the split is hard, because **client components are already prerendered into the static HTML** — the current `out/index.html` contains all the section markup.

### Which components change

| Component | Directive | Why |
|---|---|---|
| `Hero, About, Services, Process, CaseStudies, Testimonials, FAQ, Careers, Contact` | **keep `'use client'`** | every one imports `framer-motion` |
| `Navbar` | **keep `'use client'`** | `useState` × 2, `useEffect` scroll listener |
| `Footer` | **drop `'use client'`** | only needed it for `scrollToTop`/`scrollToSection`; the rewrite is pure links |
| `SectionWrapper` | **drop `'use client'`** | never needed it |
| `Button`, `Card` | unchanged | no directive already |
| `ServicePageTemplate`, `Blocks`, `JsonLd` | **server, no directive** | see below |

### The new components are deliberately animation-free

The research counted **57 elements in `out/index.html` carrying `style="opacity:0;transform:translateY(30px)"`** from Framer Motion's serialised `initial`. Any consumer that respects inline CSS — the LLM crawlers that are this site's proven discovery channel — sees an invisible page. The homepage keeps its animations. **The eight new SEO pages render fully-visible static HTML with no `framer-motion` at all.** That is both the laziest option and the correct one for the stated goal.

### `src/app/page.tsx` — before

```tsx
'use client'

import { Navbar, Footer } from '@/components/layout'
import { Hero, About, Services, Process, CaseStudies, Testimonials, FAQ, Contact, Careers } from '@/components/sections'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><About /><Services /><Process /><CaseStudies />
        <Testimonials /><FAQ /><Careers /><Contact />
      </main>
      <Footer />
    </>
  )
}
```

### `src/app/page.tsx` — after

`Navbar`/`Footer`/`<main>` move up into `layout.tsx` so all 18 routes get them for free.

```tsx
import { JsonLd } from '@/components/ui'
import { Hero, About, Services, Process, CaseStudies, Testimonials, FAQ, Contact, Careers } from '@/components/sections'
import { pageMeta, breadcrumbLd, faqLd } from '@/lib/seo'
import { faq } from '@/data/content'

export const metadata = pageMeta({
  path: '/',
  title: 'TalentSync | Hire Senior Engineers in Eastern Europe',
  description:
    'TalentSync places vetted senior engineers from Eastern Europe into your existing team. You keep architecture, roadmap and day-to-day control.',
})

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <Hero />
      <About />
      <Services />
      <Process />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <Careers />
      <Contact />
    </>
  )
}
```

No `'use client'`. The nine children keep theirs and are prerendered exactly as they are today. **Zero changes inside any section component.**

### `src/app/layout.tsx` — after

```tsx
import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { JsonLd } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { organizationLd } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'TalentSync | Hire Senior Engineers in Eastern Europe',
  description: siteConfig.tagline,
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <JsonLd data={organizationLd()} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

Notes: `keywords` deleted — Google has ignored it since 2009. No `title.template`: SEO wants exact control of the 60 characters, and a template silently adds 13 to every page. `data-scroll-behavior="smooth"` is the Next 16 opt-in flagged in the research.

### One service route, in full

`src/app/[slug]/page.tsx` — this single file *is* all ten service and location routes.

```tsx
import { notFound } from 'next/navigation'
import { JsonLd, ServicePageTemplate } from '@/components/ui'
import { servicePages } from '@/data/service-pages'
import { pageMeta, breadcrumbLd, faqLd, serviceLd } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }))
}

const find = (slug: string) => servicePages.find((p) => p.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = find((await params).slug)
  if (!page) return {}
  return pageMeta({ path: `/${page.slug}`, title: page.metaTitle, description: page.metaDescription })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = find((await params).slug)
  if (!page) notFound()
  return (
    <>
      <JsonLd data={serviceLd(page)} />
      <JsonLd data={breadcrumbLd([{ name: page.label, path: `/${page.slug}` }])} />
      {page.faq.length > 0 && <JsonLd data={faqLd(page.faq)} />}
      <ServicePageTemplate page={page} />
    </>
  )
}
```

`params` is awaited — mandatory in Next 16, the sync shim is gone.

---

## 3. The content model

### `src/data/service-pages.ts`

Eleven fields, every one consumed by the template or the schema. No `icon` field: an icon-name→component map would be duplicated per page for no gain, so benefit cards use a numbered gradient badge — the pattern `Process.tsx` already uses.

```ts
import type { Block } from '@/components/ui/Blocks'

export interface ServicePage {
  /** URL segment. Also the sitemap key and the generateStaticParams value. */
  slug: string
  /** Short human label. Used by the breadcrumb, the footer column and related links. */
  label: string
  /** <title>. Keep ≤ 60 chars — the build guard enforces it. */
  metaTitle: string
  /** <meta name="description">. 50–160 chars, enforced. */
  metaDescription: string
  /** H1, plain part. */
  h1: string
  /** H1, trailing words rendered in the .text-gradient span. */
  h1Accent: string
  /** Lede under the H1. Plain text, no markup. */
  intro: string
  /** schema.org Service.serviceType. */
  serviceType: string
  /** Card grid under the hero. 3 or 6 reads best. */
  benefits: { title: string; body: string }[]
  /** Body copy. One <h2> per entry. */
  sections: { heading: string; body: Block[] }[]
  /** Rendered as <details> AND emitted as FAQPage JSON-LD. Empty array = no FAQ block. */
  faq: { question: string; answer: string }[]
  /** Slugs of sibling pages, rendered as internal links. */
  related: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'tech-recruitment-eastern-europe',
    label: 'Tech Recruitment in Eastern Europe',
    metaTitle: 'Tech Recruitment in Eastern Europe | TalentSync',
    metaDescription:
      'We source, vet and place senior engineers from Eastern Europe into product teams across Europe. You keep full technical and operational control.',
    h1: 'Tech recruitment in',
    h1Accent: 'Eastern Europe',
    intro:
      'TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control.',
    serviceType: 'Technical recruitment',
    benefits: [
      { title: 'Two engagement models', body: 'Direct B2B placement, or hourly collaboration inside your team. You choose which fits the role.' },
      { title: 'You stay in control', body: 'Architecture, roadmap, priorities, processes and day-to-day management remain yours. Always.' },
      { title: 'No local entity needed', body: 'Engage senior engineers without the cost and complexity of setting up local employment.' },
    ],
    sections: [
      {
        heading: 'How we work',
        body: [
          { type: 'p', text: '{{PILLAR_INTRO_PARAGRAPH}}' },
          { type: 'ul', items: ['{{POINT_1}}', '{{POINT_2}}', '{{POINT_3}}'] },
        ],
      },
    ],
    faq: [
      {
        question: 'Do you take over the project?',
        answer:
          'No. TalentSync is not a project outsourcing company. The engineer joins your existing team and you retain control of architecture, roadmap, priorities and day-to-day management.',
      },
    ],
    related: ['b2b-engineer-recruitment', 'hourly-engineering-talent', 'hire-software-developers-eastern-europe'],
  },
  // …nine more: hire-software-developers-eastern-europe, b2b-engineer-recruitment,
  // hourly-engineering-talent, hire-ai-engineers, hire-backend-developers,
  // hire-devops-engineers, hire-qa-engineers, hire-full-stack-developers,
  // technical-recruitment-moldova
]
```

### `src/components/ui/Blocks.tsx`

One renderer, three consumers (service sections, insight articles, legal pages). This is why the model does not need MDX.

```tsx
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return <h2 key={i} className="text-2xl sm:text-3xl font-bold pt-4">{b.text}</h2>
          case 'h3':
            return <h3 key={i} className="text-xl sm:text-2xl font-bold pt-2">{b.text}</h3>
          case 'ul':
            return (
              <ul key={i} className="space-y-3">
                {b.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-text-secondary leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          default:
            return <p key={i} className="text-lg text-text-secondary leading-relaxed">{b.text}</p>
        }
      })}
    </div>
  )
}
```

### `src/components/sections/ServicePageTemplate.tsx`

Server component. No `framer-motion`, no `useState`. The FAQ accordion is native `<details>` — zero JS, zero hydration, answer text present in the raw HTML whether or not it is open. That is rung 4 of the ladder and it deletes the need to parameterise the existing `FAQ.tsx`.

```tsx
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'
import { SectionWrapper, Card, Button, Blocks } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { servicePages, type ServicePage } from '@/data/service-pages'
import { href } from '@/lib/seo'

export default function ServicePageTemplate({ page }: { page: ServicePage }) {
  const related = page.related
    .map((slug) => servicePages.find((p) => p.slug === slug))
    .filter((p): p is ServicePage => Boolean(p))

  return (
    <>
      {/* Hero — no scroll-reveal: this copy must be visible in raw HTML */}
      <header className="relative overflow-hidden animated-bg pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="color-rays pointer-events-none">
          <div className="color-ray color-ray-1" />
          <div className="color-ray color-ray-2" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-text-primary">{page.label}</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 max-w-4xl">
            {page.h1} <span className="text-gradient">{page.h1Accent}</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mb-8 leading-relaxed">
            {page.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={siteConfig.calendlyUrl} external>Book A Meeting</Button>
            <Button variant="secondary" href={href('/contact')}>Talk to us</Button>
          </div>
        </div>
      </header>

      {/* Benefits */}
      <SectionWrapper id="benefits" className="bg-background">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {page.benefits.map((b, i) => (
            <Card key={b.title} className="h-full hover:border-primary/50">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <span className="text-lg font-bold text-secondary-dark">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{b.title}</h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">{b.body}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Body copy */}
      {page.sections.length > 0 && (
        <SectionWrapper id="detail" className="bg-surface">
          <div className="max-w-3xl mx-auto space-y-16">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">{s.heading}</h2>
                <Blocks blocks={s.body} />
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* FAQ — native <details>, no JS */}
      {page.faq.length > 0 && (
        <SectionWrapper id="faq" className="bg-background">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {page.faq.map((item) => (
              <details key={item.question} className="group bg-surface rounded-xl">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-6 flex items-center justify-between gap-4 font-semibold">
                  <span>{item.question}</span>
                  <HiChevronDown className="w-5 h-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Related — internal linking */}
      {related.length > 0 && (
        <SectionWrapper id="related" className="bg-surface">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} href={href(`/${r.slug}`)} className="block group">
                <Card className="h-full group-hover:border-primary/50">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{r.label}</h3>
                  <p className="text-sm text-text-secondary line-clamp-3">{r.metaDescription}</p>
                </Card>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA — identical on all ten pages, so it is code, not data */}
      <SectionWrapper id="cta" className="bg-background">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Tell us the role and the stack. We come back with vetted engineers, not CVs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={siteConfig.calendlyUrl} external>Book A Meeting</Button>
            <Button variant="secondary" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
```

### Where the abstraction deliberately stops

- **No `<PageHero>` component.** Used once, inside this file.
- **No CTA in the data model.** Identical everywhere.
- **No icon registry.** Numbered badge instead.
- **Legal pages get three real 9-line files**, not a fourth branch in `[slug]`. `/privacy` should be visible in the file tree.

```tsx
// src/app/privacy/page.tsx  — /terms and /cookies are identical bar the key
import { Blocks, JsonLd } from '@/components/ui'
import { SectionWrapper } from '@/components/ui'
import { legal } from '@/data/legal'
import { pageMeta, breadcrumbLd } from '@/lib/seo'

const doc = legal.privacy
export const metadata = pageMeta({ path: '/privacy', title: doc.metaTitle, description: doc.metaDescription })

export default function Page() {
  return (
    <SectionWrapper id="legal" className="bg-background pt-36">
      <JsonLd data={breadcrumbLd([{ name: doc.label, path: '/privacy' }])} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10">{doc.h1}</h1>
        <Blocks blocks={doc.body} />
      </div>
    </SectionWrapper>
  )
}
```

---

## 4. Navigation refactor

### `src/data/content.ts` — `navigation`

Paths are stored **unslashed**. Exactly one function adds the slash, so the `<Link href>`, the canonical tag and the sitemap `<loc>` are literally the same string. Anchors pass through untouched.

```ts
// Cross-page routes get a real <a href>. Homepage-only sections stay as
// '/#anchor' — still crawlable, and they work from any page.
export const navigation = [
  { label: 'Services', href: '/tech-recruitment-eastern-europe' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const companyNav = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'How it works', href: '/#process' },
  { label: 'Careers', href: '/#careers' },
  { label: 'Contact', href: '/contact' },
]

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]
```

### Delete `scrollToSection`, use CSS

The last three commits on `main` are all bug fixes to the scroll helper (`50d5ba7`, `cc04769`). Three lines of CSS replace it and the 300 ms iOS `setTimeout` in `Navbar.handleNavClick`.

```css
/* src/app/globals.css — append */
html { scroll-behavior: smooth; }
section[id], header[id] { scroll-margin-top: 6rem; }  /* replaces navbarHeight = 80 */
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

Then remove `scrollToSection` from `src/lib/utils.ts` entirely (`cn` stays). `Hero.tsx`'s two `onClick={() => scrollToSection('about')}` become `href="/#about"` on the existing `Button` / a plain `<a>` — the only edit inside a section component in the whole migration.

### `src/lib/seo.ts` — the one URL transform

```ts
/** '/about' → '/about/'   ''|'/' → '/'   '/#process' → unchanged. */
export const href = (p: string) =>
  !p || p === '/' ? '/' : p.includes('#') ? p : `/${p.replace(/^\/+|\/+$/g, '')}/`
```

`next/link` normalises either form, but writing the slashed form means source, canonical and sitemap match with no divergence possible — and the §9 guard asserts `canonical === SITE + url`, so a trailing-slash mismatch fails the build rather than shipping a self-referencing 301.

### `src/components/layout/Navbar.tsx`

Keeps `'use client'` (scroll state, mobile menu). Every nav item is now a real `<a href>`.

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig, navigation } from '@/data/content'
import { href } from '@/lib/seo'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setIsExpanded(window.scrollY > 50)
      // 400px, not innerHeight*0.8: sub-page headers are short, the homepage hero is not.
      setIsOverHero(window.scrollY < 400)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = isOverHero
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-neutral-300 hover:text-primary hover:bg-primary/10'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className={`transition-all duration-500 rounded-[32px] lg:rounded-full w-[calc(100vw-16px)] lg:w-auto ${
          isExpanded ? 'lg:!w-[min(95vw,900px)]' : ''
        } ${
          isOverHero
            ? 'bg-neutral-700/50 backdrop-blur-md border-2 border-neutral-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-neutral-800/70 backdrop-blur-xl border-2 border-primary/60 shadow-[0_8px_32px_rgba(255,184,90,0.2)]'
        }`}
        style={{ backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}
      >
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
            <Link href="/" className="text-xl lg:text-2xl font-bold text-gradient whitespace-nowrap">
              {siteConfig.name}
            </Link>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-1 overflow-hidden"
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={href(item.href)}
                      className={`px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${linkClass}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <Button href={siteConfig.calendlyUrl} external className="hidden sm:inline-flex !py-2 !px-5 !text-sm whitespace-nowrap">
                Book A Meeting
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen((o) => !o)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isOverHero ? 'text-white/80 hover:bg-white/10' : 'text-neutral-300 hover:bg-primary/10'
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden px-4 pb-4"
            >
              <div className="pt-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    // Just close the menu. Navigation and scrolling are the browser's job now
                    // — no setTimeout, no scrollToSection, no iOS Safari workaround.
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full px-4 py-3 rounded-xl transition-all ${linkClass}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <Button href={siteConfig.calendlyUrl} external className="w-full">Book A Meeting</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
```

The `navigation.slice(0, 6)` cap is gone — the list is now exactly 5.

### `src/components/layout/Footer.tsx`

Server component. Carries the **full internal-link map**: all ten service pages plus company and legal. Every page links to every other page, so crawl depth is 1 from anywhere and link equity flows to the long-tail service pages — which is how they get discovered at all.

```tsx
import Link from 'next/link'
import { siteConfig, companyNav, legalNav } from '@/data/content'
import { servicePages } from '@/data/service-pages'
import { href } from '@/lib/seo'

const columns = [
  { heading: 'Services', links: servicePages.map((p) => ({ label: p.label, href: `/${p.slug}` })) },
  { heading: 'Company', links: companyNav },
  { heading: 'Legal', links: legalNav },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Identity */}
          <div>
            <Link href="/" className="text-xl font-bold text-gradient">{siteConfig.name}</Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">{siteConfig.location}</p>
            <div className="mt-4 space-y-1 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="block text-text-secondary hover:text-primary transition-colors">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block text-text-secondary hover:text-primary transition-colors">
                {siteConfig.phone}
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="block text-text-secondary hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Link map */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">{col.heading}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={href(l.href)} className="text-sm text-text-secondary hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {/* Native anchor. No JS, no 'use client'. */}
          <a href="#top" className="text-sm text-text-secondary hover:text-primary transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
```

`new Date().getFullYear()` now evaluates at **build time**, which is more correct than the current client render (no hydration mismatch). Rebuild each January, or hard-code the founding year range.

---

## 5. Metadata helper

`src/lib/seo.ts` — one file, everything URL- and schema-shaped.

```ts
import type { Metadata } from 'next'
import { siteConfig, faq } from '@/data/content'
import type { ServicePage } from '@/data/service-pages'

const OG_IMAGE = '/opengraph-image.png' // public/, 1200×630. Static file, correct MIME under nginx.

/** '/about' → '/about/'   ''|'/' → '/'   '/#process' → unchanged. */
export const href = (p: string) =>
  !p || p === '/' ? '/' : p.includes('#') ? p : `/${p.replace(/^\/+|\/+$/g, '')}/`

export const abs = (p: string) => `${siteConfig.url}${href(p)}`

/**
 * Build a full Metadata object. openGraph is emitted in full on every page
 * because Next REPLACES the parent openGraph rather than merging it —
 * omit siteName/type here and the child page loses both.
 */
export function pageMeta(o: {
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata {
  const { path, title, description, type = 'website', publishedTime } = o
  return {
    title,
    description,
    alternates: { canonical: href(path) },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: 'en_GB',
      url: href(path),
      title,
      description,
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  }
}
```

`metadataBase` goes in the root layout (§2) — without it every build prints the `using "http://localhost:3000"` warning and relative metadata URLs become a build error.

---

## 6. JSON-LD

### The component

`src/components/ui/JsonLd.tsx`. A native `<script>`, per Next's own guidance — not `next/script`, not a metadata field.

```tsx
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // `<` escaped so a stray tag in copy cannot break out of the script block.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
```

### The builders — appended to `src/lib/seo.ts`

`Organization` with `additionalType: EmploymentAgency`, **not** `@type: EmploymentAgency`. The latter inherits `Place`, requires a `PostalAddress` TalentSync cannot publish, and would therefore be ineligible for the Local Business rich result anyway — paying the Place semantics for nothing. Switch it the day a staffed street address and a verified Google Business Profile exist: a 3-line diff.

```ts
const ORG_ID = `${siteConfig.url}/#organization`

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      additionalType: 'https://schema.org/EmploymentAgency',
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      description: siteConfig.tagline,
      logo: `${siteConfig.url}/favicon.svg`,
      sameAs: [siteConfig.linkedin],
      address: { '@type': 'PostalAddress', addressLocality: 'Chișinău', addressCountry: 'MD' },
      areaServed: { '@type': 'Place', name: 'Europe' },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    },
  ],
})

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
})

export const faqLd = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: { '@type': 'Answer', text: q.answer },
  })),
})

export const serviceLd = (p: ServicePage) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${abs(`/${p.slug}`)}#service`,
  name: p.label,
  serviceType: p.serviceType,
  description: p.metaDescription,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Place', name: 'Europe' },
  url: abs(`/${p.slug}`),
})

export const articleLd = (a: { slug: string; title: string; excerpt: string; published: string; updated: string; author: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: a.title,
  description: a.excerpt,
  datePublished: a.published,
  dateModified: a.updated,
  author: { '@type': 'Person', name: a.author },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: abs(`/insights/${a.slug}`),
})

export const itemListLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.path) })),
})
```

`faq` is imported from `content.ts` and passed straight through, so the JSON-LD **cannot drift** from the rendered accordion — they read the same array.

### Placement per route

| Route | From `layout.tsx` | From `page.tsx` |
|---|---|---|
| `/` | `Organization` + `WebSite` | `FAQPage` (no breadcrumb on the root) |
| the 10 `[slug]` pages | ″ | `Service`, `BreadcrumbList`, `FAQPage` (when `faq` is non-empty) |
| `/case-studies` | ″ | `BreadcrumbList`, `ItemList` → the ten engagements |
| `/case-studies/[slug]` | ″ | `BreadcrumbList`, `Article` with `about` → client `Organization` |
| `/insights` | ″ | `BreadcrumbList`, `ItemList` → `BlogPosting[]` |
| `/insights/[slug]` | ″ | `BreadcrumbList`, `BlogPosting` + `Person` author |
| `/about` | ″ | `BreadcrumbList`, `AboutPage` |
| `/contact` | ″ | `BreadcrumbList`, `ContactPage` |
| `/privacy`, `/terms`, `/cookies` | ″ | `BreadcrumbList` only |

**Do not** emit `JobPosting` on the "hire X" pages — those sell a service, they do not advertise a role, and a false representation of page content is exactly what Google's structured-data policy issues manual actions for. **Do not** put "Save up to 60%", "€15–35/hour", "1–2 weeks" or "1.5M downloads" into an `Offer`, `priceSpecification` or `AggregateRating` until the client confirms them in writing. Marketing copy on the page is survivable; the same unverified number asserted as machine-readable fact is a policy exposure.

Expect **zero** SERP change from `FAQPage` — it was fully retired on 7 May 2026. It ships anyway because Google's own deprecation notice says to leave it *"so search engines and other systems can better understand your web page"*, and a question→answer pair is the exact unit a retrieval system chunks. Nobody should report it as an SEO win.

---

## 7. robots.txt and sitemap.xml

**`app/sitemap.ts` is safe here and is the right call**, with one non-obvious requirement. Verified in this repo: it emits a plain `out/sitemap.xml` (not `sitemap.xml/index.html`) — `trailingSlash: true` explicitly exempts URLs with a file extension. But it is a Route Handler underneath, so without `force-static` the build hard-fails:

```
Error: export const dynamic = "force-static"/export const revalidate not configured
on route "/sitemap.xml" with "output: export".
```

Use it, because a hand-maintained `public/sitemap.xml` **will** drift from `generateStaticParams` — and drift is precisely what this whole exercise is trying to prevent. It reads the same modules the routes do, so it cannot.

`robots.txt` goes in `public/`. `app/robots.ts` also works but buys nothing for a four-line file that will never change, and adds the same build-time failure mode. **Never create both — they collide at `/robots.txt`.**

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'
import { siteConfig, caseStudies } from '@/data/content'
import { servicePages } from '@/data/service-pages'
import { insights } from '@/data/insights'
import { legal } from '@/data/legal'
import { abs } from '@/lib/seo'

// Required with output: 'export'. Without it the build fails.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, priority: number, lastModified?: string) => ({
    url: abs(path), // abs() applies href(), so <loc> matches the canonical tag exactly
    changeFrequency: 'monthly' as const,
    priority,
    ...(lastModified ? { lastModified } : {}),
  })

  return [
    at('/', 1),
    ...servicePages.map((p) => at(`/${p.slug}`, 0.9)),
    at('/case-studies', 0.8),
    ...caseStudies.map((c) => at(`/case-studies/${c.slug}`, 0.6)),
    at('/insights', 0.8),
    ...insights.map((a) => at(`/insights/${a.slug}`, 0.6, a.updated)),
    at('/about', 0.7),
    at('/contact', 0.7),
    ...Object.entries(legal).map(([slug]) => at(`/${slug}`, 0.2)),
  ]
}
```

### `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /_not-found/

Sitemap: https://talentsync.eu/sitemap.xml
```

`/_not-found/` is emitted by Next as a side effect and is already `noindex`; the `Disallow` just saves the crawl.

---

## 8. The nginx fix

The single worst defect on the site. `try_files $uri $uri.html $uri/ /index.html` makes a fallback to a **file path**, which is served with that file's status — **HTTP 200**. So `/pricing`, `/blog/anything`, every typo and every hallucinated URL returns 200 with a full copy of the homepage. With 18 routes that means infinite duplicate homepages, wasted crawl budget, Soft 404 flags in Search Console, and LLM crawlers learning the wrong URL shape. `out/404.html` is never reached.

**Railway-specific:** TLS terminates at the edge and forwards plain HTTP to port 3000. Redirect on `$http_x_forwarded_proto`, **never** on `$scheme` — `$scheme` is always `http` inside the container and would infinite-loop.

```nginx
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # --- Canonicalisation -------------------------------------------------
    # Railway terminates TLS at the edge, so $scheme is always "http" in here.
    # Redirecting on $scheme would loop forever. Use the forwarded header.
    # ⚠️ Not exercised against a live nginx — verify both rules after first deploy.
    if ($http_x_forwarded_proto = "http") {
        return 301 https://$host$request_uri;
    }
    if ($host = "www.talentsync.eu") {
        return 301 https://talentsync.eu$request_uri;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript application/xml text/xml image/svg+xml;

    # --- Static assets ----------------------------------------------------
    # NOTE: an add_header in a location DROPS every inherited add_header, so
    # nosniff is repeated here on purpose. The rest do not matter for assets.
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
    }

    location /images/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
    }

    # --- Pages ------------------------------------------------------------
    # =404 instead of /index.html. Everything real still resolves via
    # $uri (sitemap.xml, robots.txt) or $uri/ (every trailingSlash route);
    # anything else now returns a real 404 with the branded page.
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

`X-XSS-Protection` dropped — deprecated, and it has been a known XSS *vector* in older browsers. Ship the `=404` change together with `src/app/not-found.tsx`, or the error page will not exist:

```tsx
// src/app/not-found.tsx — emits out/404.html; Next auto-injects noindex
import Link from 'next/link'
import { Button, SectionWrapper } from '@/components/ui'

export default function NotFound() {
  return (
    <SectionWrapper id="not-found" className="bg-background pt-40 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
        Page <span className="text-gradient">not found</span>
      </h1>
      <p className="text-lg text-text-secondary mb-8">
        That URL does not exist. It may have moved, or never existed at all.
      </p>
      <Button href="/">Back to the homepage</Button>
    </SectionWrapper>
  )
}
```

---

## 9. Build-time guards

One file, plain Node, no dependencies, **80 lines**. Wired to `postbuild`, so `npm run build` — and therefore `RUN npm run build` in the Dockerfile — cannot produce a broken static site. A violated invariant fails the Railway deploy.

Checks: `404.html` exists and is `noindex` · `sitemap.xml` and `robots.txt` exist · every `<loc>` is absolute, slashed and actually emitted · every page has a unique non-empty `<title>` ≤ 60 chars · a unique meta description of 50–160 chars · **exactly one `<h1>`** · a canonical equal to `SITE + url` (this is what empirically settles the trailing-slash question) · is listed in the sitemap · and every internal `href="/…"` resolves to an emitted file.

**Verified**: run against the current `out/`, it exits 1 and reports precisely `sitemap.xml missing`, `robots.txt missing`, `/ canonical is ""`, `/ page is not listed in sitemap.xml`.

```js
// scripts/check-seo.mjs
// Fails the build when an SEO invariant breaks. Runs as `postbuild`, so `npm run build`
// (and therefore the Docker image) cannot produce a broken static site.
// ponytail: regex HTML parsing. Fine — it only ever reads our own generated markup.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const OUT = 'out'
const SITE = 'https://talentsync.eu'
const TITLE_MAX = 60
const DESC_MIN = 50
const DESC_MAX = 160

const errors = []
const fail = (where, msg) => errors.push(`${where}  ${msg}`)
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? walk(p) : [p]
})
const grab = (html, re) => { const m = html.match(re); return m ? m[1].trim() : '' }
const urlOf = (file) => '/' + relative(OUT, file).replace(/\\/g, '/').replace(/index\.html$/, '')
const exists = (p) => existsSync(join(OUT, p.replace(/^\//, ''))) || existsSync(join(OUT, p.replace(/^\//, ''), 'index.html'))

if (!existsSync(OUT)) { console.error(`check-seo: ${OUT}/ not found — run next build first`); process.exit(1) }

// 404 must exist and be noindex (nginx error_page serves it)
if (!existsSync(join(OUT, '404.html'))) fail('404.html', 'missing — add src/app/not-found.tsx')
else if (!/name="robots"[^>]*noindex/.test(readFileSync(join(OUT, '404.html'), 'utf8'))) fail('404.html', 'not noindex')

// sitemap: every <loc> is absolute, slashed, and actually emitted
const locPaths = new Set()
if (!existsSync(join(OUT, 'sitemap.xml'))) fail('sitemap.xml', 'missing — add src/app/sitemap.ts')
else for (const [, loc] of readFileSync(join(OUT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!loc.startsWith(`${SITE}/`)) { fail('sitemap.xml', `loc is not on ${SITE}: ${loc}`); continue }
  const path = new URL(loc).pathname
  locPaths.add(path)
  if (!path.endsWith('/')) fail('sitemap.xml', `loc missing trailing slash: ${loc}`)
  if (!existsSync(join(OUT, path.replace(/^\//, ''), 'index.html'))) fail('sitemap.xml', `no page emitted for ${loc}`)
}
if (!existsSync(join(OUT, 'robots.txt'))) fail('robots.txt', 'missing — add public/robots.txt')

const seenTitle = new Map()
const seenDesc = new Map()
const NOINDEX = /(^|[\\/])(404|_not-found)([\\/]|\.html$)/   // Next always emits these; both are noindex
const pages = walk(OUT).filter((p) => p.endsWith('.html') && !NOINDEX.test(p))
if (!pages.length) fail(OUT, 'no HTML pages emitted')

for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  const url = urlOf(file)

  const title = grab(html, /<title>([^<]*)<\/title>/)
  if (!title) fail(url, 'no <title>')
  else if (title.length > TITLE_MAX) fail(url, `title ${title.length} chars (max ${TITLE_MAX}): "${title}"`)
  if (title && seenTitle.has(title)) fail(url, `duplicate title, also on ${seenTitle.get(title)}`)
  else if (title) seenTitle.set(title, url)

  const desc = grab(html, /<meta name="description" content="([^"]*)"/)
  if (!desc) fail(url, 'no meta description')
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX) fail(url, `description ${desc.length} chars (want ${DESC_MIN}-${DESC_MAX})`)
  if (desc && seenDesc.has(desc)) fail(url, `duplicate description, also on ${seenDesc.get(desc)}`)
  else if (desc) seenDesc.set(desc, url)

  const h1s = (html.match(/<h1[\s>]/g) || []).length
  if (h1s !== 1) fail(url, `${h1s} <h1> elements, expected exactly 1`)

  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/)
  if (canonical !== SITE + url) fail(url, `canonical is "${canonical}", expected "${SITE + url}"`)
  if (!locPaths.has(url)) fail(url, 'page is not listed in sitemap.xml')

  for (const [, link] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (link.startsWith('//') || link.startsWith('/_next/')) continue
    if (!exists(link)) fail(url, `internal link 404: ${link}`)
  }
}

if (errors.length) {
  console.error(`\ncheck-seo: ${errors.length} problem(s)\n${errors.map((e) => '  ' + e).join('\n')}\n`)
  process.exit(1)
}
console.log(`check-seo: ${pages.length} pages, ${locPaths.size} sitemap URLs — all invariants hold`)
```

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "node scripts/check-seo.mjs",
    "start": "next start",
    "lint": "eslint"
  }
}
```

Two consequences worth knowing before you wire it up. The `exactly one <h1>` rule will fail immediately: `SectionWrapper`-based sections use `<h2>`, and only `Hero` renders an `<h1>` — good — but if any new page forgets one, the build stops. And the 50–160 character description rule means **placeholder copy will not build**, which is the point: it forces real metadata before ship.

---

## 10. Migration order

Twelve commits. The site is deployable after every one.

| # | Commit | Ships |
|---|---|---|
| 1 | `fix(nginx): return HTTP 404 for unknown URLs instead of the homepage` | `nginx.conf` + `src/app/not-found.tsx`. **Do this first** — independent of everything else and it fixes the worst defect on the site today. |
| 2 | `chore: drop dead 'use client' and unused public assets` | `SectionWrapper` directive; delete `next/vercel/file/globe/window.svg`. Pure deletion, zero risk. |
| 3 | `feat(seo): add metadataBase, canonical and robots to the root layout` | Kills the `localhost:3000` build warning; the homepage gets a canonical. |
| 4 | `refactor(app): move Navbar and Footer into the root layout` | `page.tsx` renders sections only. Still `'use client'`. Visually identical. |
| 5 | `refactor(app): make the homepage a server component` | Delete `'use client'` from `page.tsx`, add `pageMeta`. **This is the unlock** — every later route can now export metadata. |
| 6 | `feat(seo): add pageMeta helper, JsonLd component and schema builders` | `src/lib/seo.ts`, `ui/JsonLd.tsx`. Organization + WebSite + FAQPage go live on the homepage. |
| 7 | `feat(content): add ServicePage model and ServicePageTemplate` | `data/service-pages.ts`, `ui/Blocks.tsx`, `sections/ServicePageTemplate.tsx`. No routes yet — nothing is reachable, nothing can break. |
| 8 | `feat(routes): add ten service and location pages` | `app/[slug]/page.tsx`. Ten pages live but unlinked. Smoke-test a few URLs before continuing. |
| 9 | `feat(routes): add about, contact, case studies, insights and legal pages` | The remaining seven route files plus `data/insights.ts`, `data/legal.ts`, `slug` on `caseStudies`. |
| 10 | `refactor(nav): replace scroll buttons with crawlable links` | Navbar, Footer, `navigation`, CSS smooth scroll, delete `scrollToSection`. **Must come after 8 and 9** or the new links point at 404s. Also removes the `setTimeout` that `50d5ba7` and `cc04769` were fixing. |
| 11 | `feat(seo): add sitemap.xml, robots.txt and per-route JSON-LD` | `app/sitemap.ts` (`force-static`), `public/robots.txt`, `public/opengraph-image.png`, page-level schema. |
| 12 | `ci: fail the build when SEO invariants break` | `scripts/check-seo.mjs` + `postbuild`. **Last on purpose** — it will red-flag every placeholder still in the copy, which is exactly the punch list for the content pass. |

Two housekeeping notes: `src/app/__probe/` is currently untracked in the working tree and must not be committed. `src/app/globals.css` also has uncommitted changes from a parallel session (`@theme` gained `--color-background-alt`, `--color-border`, `--container-prose`, `--shadow-float`, `--shadow-glow`) — all additive, and none of the code above depends on them, but rebase on it before starting rather than reverting it.

### What this plan deliberately does not build

- **No MDX.** Four packages, a `pageExtensions` change, a mandatory `mdx-components.tsx`, no frontmatter, and Turbopack forbids non-serialisable remark plugin options. For 4–8 articles, `Block[]` in a typed data file gives full type safety and reuses `SectionWrapper`/`Card`. Revisit past ~20 articles, or when a non-developer starts writing them.
- **No `ImageResponse` OG images.** They emit an **extensionless** file, and `nginx:alpine` types off the extension — scrapers get `application/octet-stream` and may reject the image. A static `public/opengraph-image.png` is zero config and correct.
- **No `EmploymentAgency` as the primary `@type`.** See §6.
- **No analytics, cookie banner, or consent machinery.** Not requested, and the site currently sets no cookies. Adding a banner would create the problem it solves.

`skipped:` per-article OG images, a `/careers/` route with `JobPosting`, and MDX. `add when:` articles need distinct social cards, roles need to be indexable, or a non-developer starts writing.

---

## OPEN QUESTIONS (business decisions required)


1. Real copy for the 10 service/location pages: the ServicePage model has 11 fields each and the build guard rejects placeholder metadata (title <=60 chars, description 50-160 chars). Currently only tech-recruitment-eastern-europe is drafted, with {{PILLAR_INTRO_PARAGRAPH}} / {{POINT_1..3}} tokens left in its body.

2. The four disputed claims - 'EUR 15-35/hour', 'Save up to 60%', '1-2 weeks time to hire', and the Barca Mobile numbers ('1.5M downloads in first 3 months', 'Led system architecture design and CI/CD implementation'). Confirmed in writing, or removed? They currently appear in siteConfig-adjacent copy (services[1], process[3], faq[1], faq[3], About.tsx stats, caseStudies[0]) and would otherwise propagate onto the new pages. None go into JSON-LD either way until confirmed.

3. Insights: how many articles at launch, their titles/slugs, and the author name for the BlogPosting Person node. The /insights/[slug] generateStaticParams needs at least one entry or the index page ships empty.

4. Legal copy for /privacy, /terms and /cookies. The site sets no cookies today (only Google Fonts is third-party) - confirm that stays true, because it determines whether the cookie policy is a two-paragraph page or something that needs a consent banner.

5. Case study slugs and per-client detail copy for /case-studies/[slug]. Ten client names are on the site; confirm each has permission to be named on a dedicated indexable page, especially Orange and Barca Mobile.

6. public/opengraph-image.png at 1200x630 - needs designing. No OG image exists in the repo today.

7. Whether www.talentsync.eu resolves at all. The non-www redirect in nginx.conf is written but untested; if the DNS record does not exist the rule is harmless but pointless.

8. Should /careers/ ship as an 18th route? JobPosting is the single highest-value rich result TalentSync actually qualifies for and two real roles already exist in content.ts, but it needs datePosted and validThrough per role, which are not in the data today.
