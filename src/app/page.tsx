import JsonLd from '@/components/JsonLd'
import MotionRoot from '@/components/MotionRoot'
import { Footer, Navbar } from '@/components/layout'
import {
  About,
  Careers,
  CaseStudies,
  Contact,
  FAQ,
  Hero,
  Process,
  Services,
  Testimonials,
} from '@/components/sections'
import { faq } from '@/data/content'
import { faqLd, graphLd } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

/**
 * A SERVER component (Rule 10). It used to carry a file-level `'use client'`,
 * which structurally forbids `export const metadata` — that single directive is
 * why the homepage shipped with no canonical, no og:url and no description of
 * its own. Every section already declares its own directive where it needs one,
 * so removing it here costs nothing.
 *
 * Title is 66 characters, over the 60 the SEO budget and `scripts/validate-
 * pages.mjs` both want. It is client-fixed (02-page-content.md §1) and shipping
 * as instructed; `pageMeta` emits it through `title.absolute` so the layout's
 * `%s | TalentSync` template cannot double the brand onto the end.
 *
 * No `PageShell`: `/` is the one route with a full-bleed hero, no breadcrumb
 * trail and no `BreadcrumbList` (D6), so it composes Navbar/main/Footer itself
 * and passes `variant="hero"` for the reveal-on-scroll nav.
 */
export const metadata = pageMeta({
  path: '/',
  title: 'IT Recruitment & Engineering Talent in Eastern Europe | TalentSync',
  description:
    'Vetted senior engineers from Eastern Europe, on direct B2B contracts or hourly. ' +
    'You keep architecture and management control. Chișinău-based.',
})

export default function Home() {
  return (
    <>
      {/* focus-visible:, not focus: — `focus:` fires on mouse click (Rule 6),
          and a keyboard Tab is the only way to reach an sr-only element. */}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-surface focus-visible:px-4 focus-visible:py-3 focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Skip to content
      </a>

      {/* FAQPage on `/` and nowhere else (D6). Built from the same `faq` array
          FAQ.tsx renders, so the markup cannot drift from the visible text. */}
      <JsonLd data={graphLd(faqLd(faq))} />

      <Navbar variant="hero" />

      <main id="main">
        <MotionRoot>
          <Hero />
          <About />
          <Services />
          <Process />
          <CaseStudies />
          <Testimonials />
          <FAQ />
          <Careers />
          <Contact />
        </MotionRoot>
      </main>

      <Footer />
    </>
  )
}
