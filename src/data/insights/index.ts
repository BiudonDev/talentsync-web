import { insightSlugs } from '@/data/routes'
import { b2bOrHourly } from './b2b-contract-or-hourly-collaboration'
import { moldovaGdpr } from './moldova-gdpr-adequacy-and-scc-mechanics'
import { moldovaItPark } from './moldova-it-park-single-tax-explained'
import { permanentEstablishment } from './permanent-establishment-risk-hiring-engineers-abroad'
import type { Insight } from './types'

export type { Insight, InsightGroup } from './types'
export { GROUPS, readingMinutes, tocOf, wordCount } from './types'

/**
 * Newest first — this is the order /insights/ renders "Latest" in, so the
 * article list and the ItemList JSON-LD cannot disagree.
 */
export const insights: Insight[] = [
  moldovaGdpr,
  b2bOrHourly,
  moldovaItPark,
  permanentEstablishment,
]

export const insightBySlug = (slug: string) => insights.find((a) => a.slug === slug)

/**
 * The route table is frozen (D1) and the articles are not derived from it, so
 * the two can drift: a renamed slug would 404 the sitemap entry and silently
 * drop the page from `generateStaticParams`. Module scope, so a mismatch is a
 * build error rather than a missing page nobody notices.
 */
for (const slug of insightSlugs) {
  const a = insightBySlug(slug)
  if (!a) throw new Error(`insights: routes.ts declares "${slug}" but no article exports it`)
  if (a.path !== `/insights/${slug}/`) throw new Error(`insights: "${slug}" has path "${a.path}"`)
}
for (const a of insights) {
  if (!insightSlugs.includes(a.slug)) throw new Error(`insights: "${a.slug}" is not in routes.ts insightSlugs (D1 is frozen)`)
}

/**
 * The one author. `{{FOUNDER_FULL_NAME}}` is BLOCKERS.md item 9 — a business fact
 * no agent may invent (D8). It resolves to the byline and to `author.name` in
 * the BlogPosting node, and `npm run verify` fails while it survives into out/,
 * which is the intended behaviour: an `Article` with no real named author is
 * exactly the thin-content signal this section exists to avoid.
 *
 * It used to be `{{VICTOR_FULL_NAME}}` — the same human under a second spelling,
 * and the ONE token in the build that BLOCKERS.md never named, so it was the one
 * Victor would never have been asked to answer while it sat in four author
 * bylines and, worse, inside `author.name` in the structured data. A brace token
 * ingested by a crawler as a Person's name is far harder to walk back than the
 * same token in prose. The two options were resolve it or drop the author node;
 * dropping it loses D6's "Article with a real named author" AND removes the
 * deploy blocker that forces the answer, so it is collapsed onto the token
 * BLOCKERS.md already tracks instead. One answer now resolves /about/, /imprint/,
 * the Person node and all four bylines together, and they cannot drift apart.
 *
 * `url` and not `@id`: the site-wide Organization node already carries a founder
 * Person at /about/#victor, and two nodes sharing one @id with different names
 * is a contradiction in the graph. A plain Person with a resolving url is what
 * Google's Article guidance asks for anyway — the name, and nothing else in it.
 */
export const AUTHOR = {
  name: '{{FOUNDER_FULL_NAME}}',
  url: '/about/#victor',
} as const

/** /insights/ hub copy. 02-page-content.md §14, verbatim where the spec fixes the wording. */
export const insightsHub = {
  path: '/insights/',
  h1: 'Insights on Hiring Engineers in Eastern Europe',
  metaTitle: 'Insights on Hiring Engineers in Eastern Europe',
  metaDescription:
    'Field notes on hiring engineers in Eastern Europe: contracts, tax, timezones and cost, written by the people doing the placements.',
  answer:
    'These are field notes from a recruitment firm operating inside Eastern Europe, covering the questions clients actually ask before signing: how B2B contracts work across borders, what engineers cost, how Moldova’s IT Park regime affects your invoice, and where the region is a bad answer. Written by the people running the placements.',
  faq: [
    {
      q: 'How often do you publish?',
      a: 'Irregularly and honestly, which means when we have something specific to say rather than on a content calendar. Every post carries a date, so you can see for yourself. We would rather publish six pieces a year that answer a question properly than forty that restate the same market summary.',
    },
    {
      q: 'Who writes these?',
      a: 'Victor, with input from the engineers and clients involved. Nothing here is produced by an agency or generated wholesale, and where a post covers tax or contract law it names the primary sources it stands on. If a post is wrong, tell us and we will correct it with a visible note.',
    },
    {
      q: 'Can I get these by email?',
      a: 'Not yet — we do not run a mailing list, because we would rather not run one badly. Follow the company on LinkedIn for new posts, or email Victor and ask to be told when we publish on a specific topic. That is a real list, kept manually.',
    },
    {
      q: 'Can I quote or cite these?',
      a: 'Yes, please do, with a link back. The tax, contract and market figures here are the ones we quote to clients, each dated so you can check whether they are still current. If you are citing a number in something important, email us and we will confirm it is still right.',
    },
    {
      q: 'How do you verify the tax and legal claims?',
      a: 'Anything touching tax, employment or data protection is checked against a primary source before publication and carries the date we checked it, and we name that source wherever one exists. None of it is advice for your situation, and every piece says so. Your counsel still needs to look.',
    },
  ],
}
