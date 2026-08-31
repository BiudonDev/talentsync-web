import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import PageShell from '@/components/layout/PageShell'
import { ArticleCard, CtaBand, Faq, Prose, SectionWrapper } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { GROUPS, insights, insightsHub, readingMinutes } from '@/data/insights'
import { ORG_ID, faqLd, graphLd, itemListLd } from '@/lib/schema'
import { SITE_URL, absUrl, pageMeta } from '@/lib/seo'

/**
 * /insights/ — the cluster hub. Server component, zero client JS (Rule 10):
 * the FAQ is a native <details> and the cards are links.
 *
 * The hub's job is to hold the cluster together, not to rank, so the page is
 * short and every article appears twice on purpose — once as a card under
 * "Latest" with its date and reading time, once in the grouped listing that
 * tells a reader which of three subjects they are in.
 */
export const metadata = pageMeta({
  path: insightsHub.path,
  title: insightsHub.metaTitle,
  description: insightsHub.metaDescription,
})

const ASK = `mailto:${siteConfig.email}?subject=Question`

const BLOG_ID = `${SITE_URL}/insights/#blog`

const blogLd = {
  '@type': 'Blog',
  '@id': BLOG_ID,
  name: 'TalentSync Insights',
  description: insightsHub.metaDescription,
  url: absUrl(insightsHub.path),
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
}

export default function InsightsPage() {
  return (
    <PageShell crumbs={[{ label: 'Insights' }]}>
      <JsonLd
        data={graphLd(
          blogLd,
          itemListLd({
            id: `${SITE_URL}/insights/#articles`,
            name: 'TalentSync insights',
            items: insights.map((a) => ({ name: a.title, path: a.path, description: a.dek })),
          }),
          faqLd(insightsHub.faq.map((f) => ({ question: f.q, answer: f.a }))),
        )}
      />

      <SectionWrapper density="tight">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {insightsHub.h1}
        </h1>

        {/* Prose, so the contextual links carry the site's link and focus styles
            without this route owning a second set of them. */}
        <Prose className="mt-6 text-lg sm:text-xl">
          <p>{insightsHub.answer}</p>
          <p>
            Start with <Link href="/technical-recruitment-moldova/">recruiting in Moldova</Link> if
            you are weighing the market,{' '}
            <Link href="/b2b-engineer-recruitment/">how B2B engineer recruitment works</Link> if you
            are weighing the contract, or{' '}
            <Link href="/tech-recruitment-eastern-europe/">
              the Eastern European market overview
            </Link>{' '}
            if you have not picked a country yet. The alternative to a direct contract is{' '}
            <Link href="/hourly-engineering-talent/">hourly engineering collaboration</Link>, and{' '}
            <Link href="/case-studies/">what we have actually delivered</Link> is the record behind
            all of it.
          </p>
        </Prose>
      </SectionWrapper>

      <SectionWrapper id="latest" density="tight" band>
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Latest
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((a) => (
            <li key={a.slug}>
              <ArticleCard
                href={a.path}
                title={a.title}
                excerpt={a.dek}
                date={a.datePublished}
                tag={`${readingMinutes(a)} min read`}
              />
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper density="tight">
        {GROUPS.map((g) => {
          const items = insights.filter((a) => a.group === g.id)
          if (!items.length) return null
          return (
            <section key={g.id} className="mt-16 first:mt-0">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {g.heading}
              </h2>
              <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-pretty text-text-secondary sm:text-lg">
                {g.blurb}
              </p>
              <ul className="mt-6 max-w-[65ch] space-y-6">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={a.path}
                      className="flex min-h-11 items-center rounded-lg text-base font-semibold text-text-primary underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg"
                    >
                      {a.title}
                    </Link>
                    <p className="text-sm leading-relaxed text-pretty text-text-secondary">
                      {a.dek}{' '}
                      <span className="whitespace-nowrap">
                        <span aria-hidden>· </span>
                        <time dateTime={a.datePublished}>
                          {new Date(a.datePublished).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            timeZone: 'UTC',
                          })}
                        </time>
                        <span aria-hidden> · </span>
                        {readingMinutes(a)} min read
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </SectionWrapper>

      <SectionWrapper id="faq" density="tight" band>
        <Faq
          heading="Frequently asked questions"
          name="insights-faq"
          items={insightsHub.faq.map((f) => ({ q: f.q, a: f.a }))}
        />
      </SectionWrapper>

      <CtaBand
        title="Ask us something we have not written about"
        body="Good questions become posts, and you get the answer before it is published."
        primary={{ label: 'Email us a question', href: ASK }}
        secondary={{ label: 'Book a meeting', href: siteConfig.calendlyUrl, external: true }}
      />
    </PageShell>
  )
}
