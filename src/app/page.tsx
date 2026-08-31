import JsonLd from '@/components/JsonLd'
import MotionRoot from '@/components/MotionRoot'
import { Footer, Navbar } from '@/components/layout'
import {
  About,
  Careers,
  CaseStudies,
  Contact,
  EngagementModels,
  FAQ,
  Hero,
  NotOutsourcing,
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
 * Title is 66 characters, over the 60 the SEO budget originally set. It is
 * client-fixed (02-page-content.md §1) and the client wins, so the guard's
 * ceiling moves to 70 rather than the title being trimmed. `pageMeta` emits it
 * through `title.absolute`, which no template can wrap, so the brand cannot be
 * doubled onto the end.
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
          {/* §1's outline, rows 2 and 3. `/` was the shortest commercial page on
              the site and the only one of the five that must carry BLOCK B and
              BLOCK C paraphrasing them instead — it compressed both models into
              a single process step. These two sections restore the canonical
              blocks and give BLOCK D the H2 the outline gives it. */}
          <EngagementModels />
          <NotOutsourcing />
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
