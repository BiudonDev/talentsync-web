import { TIMELINE_RECORD } from './case-studies'
import { ENGAGEMENT_MODELS } from './services/types'

/**
 * The one quote-request mailto (client feedback item 6, 21 September 2026).
 * Subject is "Engineering request – [Company name]", URL-encoded; the label
 * is worded so it works for a single engineer, hourly capacity, a dedicated
 * team or a complete project. Outsourcing contexts use `quoteProjectLabel`.
 */
const QUOTE_SUBJECT = encodeURIComponent('Engineering request – [Company name]')

export const siteConfig = {
  name: 'TalentSync',
  // 06-claims-measurement.md row 22. "Your Strategic Partner for Tech Talent
  // Solutions" said nothing and every competitor says it.
  description: 'Senior engineers for teams that keep control',
  // The Hero lede. Client-fixed supporting text (feedback item 2); carries the
  // brand name, which the h1 does not, and introduces all three models.
  tagline:
    'TalentSync helps European and international product companies build their technology teams ' +
    'through direct B2B recruitment, flexible hourly collaboration, or complete software development outsourcing.',
  url: 'https://www.talentsync.eu',
  calendlyUrl: 'https://calendly.com/talentsync-meeting/30min',
  email: 'victor@talentsync.eu',
  quoteHref: `mailto:victor@talentsync.eu?subject=${QUOTE_SUBJECT}`,
  quoteLabel: 'Email the role and get a quote',
  quoteProjectLabel: 'Describe your project and get a quote',
  phone: '+373 68 300 700',
  linkedin: 'https://linkedin.com/company/talentsync',
  location: 'Chișinău, Moldova',
}

/**
 * 02-page-content.md Part 0 BLOCK A — the entity paragraph, MANDATORY VERBATIM
 * on `/` and `/about/`, and `Organization.description` in `src/lib/schema.ts`
 * (imported there, not retyped). `Chișinău` with diacritics (D5). Updated
 * 21 September 2026 to name the third engagement model.
 */
export const CANONICAL_DESCRIPTION =
  'TalentSync is a technology recruitment and engineering talent partner based in Chișinău, Moldova. ' +
  'It helps European and international product companies build their technology teams through direct B2B ' +
  'recruitment, flexible hourly collaboration, or complete software development outsourcing, with vetted ' +
  'senior engineers from Eastern Europe.'

/**
 * The positioning line that replaced BLOCK D ("TalentSync is not a project
 * outsourcing company", retired 21 September 2026 — TalentSync now offers
 * outsourcing). It is `Organization.disambiguatingDescription` in schema.
 */
export const POSITIONING =
  'Clients choose how much of the delivery they keep in-house: hire an engineer directly, add hourly ' +
  'capacity to an existing team, or hand a complete project to a dedicated TalentSync team.'

/**
 * The speed counterweight. 02-page-content.md Part 0 requires it on every page
 * that mentions a timeline, so it is written once.
 */
export const SPEED_CAVEAT =
  'Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, ' +
  'and we tell you that at the brief rather than at week three.'

/**
 * Client feedback item 16: the pricing position, stated once. No rate, no
 * range, no savings percentage anywhere on the site.
 */
export const PRICING_POSITION =
  'Transparent pricing tailored to the required seniority, technology stack, and engagement model.'

/**
 * The header nav, re-pointed at the frozen route registry (D1). Items are
 * `Route`s — `{ path, label }`. Footer columns come from `servicesNav` /
 * `companyNav` / `legalNav` in the same module; nothing here may hold a second
 * list of routes.
 */
export { primaryNav as navigation } from './routes'

export const services = [
  {
    icon: 'HiOutlineUserGroup',
    title: 'Eastern Europe Talent Pool',
    description: 'Direct access to vetted software developers and IT specialists across Moldova, Romania, Ukraine and Poland, technically validated before they reach your shortlist.',
  },
  {
    // Was "Cost-Efficient Solutions" / "Save up to 60%" — an unsubstantiated
    // "up to" price comparison with no baseline (D7, claims row 1).
    icon: 'HiOutlineCurrencyDollar',
    title: 'Lower Total Cost of Employment',
    description: 'Reduce recruitment spend and the overhead of local employment — no local entity, no payroll or benefits administration, no notice-period exposure — while working with senior Eastern European engineers at competitive market rates.',
  },
  {
    // Client feedback item 5, verbatim. Replaces "Tailored Matching" and the
    // general-staffing menu ("full-time, part-time, contract, or project-based").
    icon: 'HiOutlinePuzzle',
    title: 'Flexible Engagement',
    description: 'Choose direct B2B recruitment, hourly engineering collaboration, or complete software development outsourcing — adapted to your technology stack, team structure, and delivery requirements.',
  },
  {
    icon: 'HiOutlineCode',
    title: 'Full-Stack Expertise',
    description: 'JavaScript and TypeScript (React, Angular, Node.js), .NET and C#, Python, Java, and the mobile stacks — the roles European product teams hire for most. If your stack isn\'t listed, ask.',
  },
  {
    icon: 'HiOutlineCloud',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure and Google Cloud engineers who have run production platforms at this scale.',
  },
  {
    icon: 'HiOutlineChip',
    title: 'AI & Machine Learning',
    description: 'Access AI engineers and data scientists to power your next-generation products.',
  },
]

export const process = [
  {
    step: 1,
    title: 'Sourcing and Technical Validation',
    description: 'We source, screen and technically validate every engineer before presenting them, so what you review is an assessment and not just a CV.',
  },
  {
    step: 2,
    // Model names and summaries come from ENGAGEMENT_MODELS so they read
    // identically on every page that carries them.
    title: 'Three Engagement Models',
    description: `${ENGAGEMENT_MODELS.b2b.title}: ${ENGAGEMENT_MODELS.b2b.summary} ${ENGAGEMENT_MODELS.hourly.title}: ${ENGAGEMENT_MODELS.hourly.summary} ${ENGAGEMENT_MODELS.outsourcing.title}: ${ENGAGEMENT_MODELS.outsourcing.summary}`,
  },
  {
    step: 3,
    title: 'Dedicated Support',
    description: 'One named contact for sourcing, contracting and replacement cover. On recruitment and hourly work, delivery stays with your team; on an outsourced project, the TalentSync team owns it against an agreed plan.',
  },
  {
    step: 4,
    // "€15-35/hour" is CUT (D7). A published floor is a price commitment and it
    // anchors low against the seniority being sold (claims row 5).
    title: 'Transparent Commercial Terms',
    description: `${PRICING_POSITION} One agreed rate, fee or estimate per engagement, quoted in writing after we scope the work. No hidden margin, no placement surprises, no multi-year lock-in.`,
  },
]

/**
 * BLOCKED — do not reword these three quotes here. Claims rows 18-20 require a
 * full name, a matching job title and a written permission email per quote, and
 * "the quote in the person's own words, not drafted for them".
 *
 * `testimonials[1]` carries the row 19 replacement wording with the ledger
 * figure (one week) and is BLOCKED pending Ulrich's written confirmation. If he
 * does not confirm, pull it rather than reverting the number.
 */
export const testimonials = [
  {
    quote: 'Exceptional engineers who delivered on time. A key partner in launching Barça Mobile.',
    author: 'Adrian',
    title: 'CTO, Barça Mobile (New Era Visionary Group)',
    avatar: '/images/testimonial-adrian-barca.jpeg',
  },
  {
    quote: 'They shortlisted a senior Python developer for us within days and he was signed inside one week. Exactly what we needed to scale.',
    author: 'Ulrich',
    title: 'CEO & Founder, Qualiwise',
    avatar: '/images/testimonial-ulrich-qualiwise.jpeg',
  },
  {
    quote: 'Strong technical expertise and a clear understanding of our product vision.',
    author: 'Tom',
    title: 'CEO & Founder, Entail AI',
    avatar: '/images/testimonial-adr-entail.jpeg',
  },
]

/**
 * The homepage FAQ. `src/app/page.tsx` builds the `FAQPage` JSON-LD from this
 * same array, so the markup cannot drift from the visible `<details>` text. D6
 * puts `FAQPage` on `/` only, which makes these the answers an AI answer engine
 * lifts for the brand — so they hold to the 40-60 word discipline and each one
 * answers a buyer's objection.
 *
 * Client feedback item 22 (21 September 2026) rewrote the engagement-model
 * answer for three models and added the six model questions below it. The
 * questions are unique site-wide: validate-pages.mjs fails on a duplicated
 * `<summary>`, so the outsourcing page words its own FAQ differently.
 */
export const faq = [
  {
    question: 'What regions do you source talent from?',
    answer:
      'Moldova, Romania, Ukraine and Poland, sourced from our own office in Chișinău. We stay inside this region rather than going further afield for two reasons you feel on day one: Eastern European Time overlaps a Western European working day completely, and we recruit inside a market we live in rather than reselling one through a partner agency.',
  },
  {
    question: 'What engagement models do you offer?',
    answer:
      'We offer direct B2B recruitment, flexible hourly collaboration, and complete software development outsourcing. Depending on your needs, we can help you hire an individual engineer, extend your existing team, or deliver an entire project or software component. Each model is described in the same words on its own page, so you can compare them directly.',
  },
  {
    question: 'What is direct B2B recruitment?',
    answer: `${ENGAGEMENT_MODELS.b2b.summary} We source, screen and technically validate; you interview, select and hold the contract. There is no local entity to open and no foreign payroll to run, and once the introduction fee is settled we are out of the money flow.`,
  },
  {
    question: 'How does hourly collaboration work?',
    answer: `${ENGAGEMENT_MODELS.hourly.summary} You keep architecture, roadmap, priorities and day-to-day management; the engineer works in your repositories and your sprint cadence. TalentSync holds the contract, invoices monthly for approved hours and provides replacement cover, and capacity scales up, down or pauses at agreed notice.`,
  },
  {
    question: 'What can TalentSync deliver through outsourcing?',
    answer: `${ENGAGEMENT_MODELS.outsourcing.summary} Typical scope is a product build, a component such as a backend service or mobile application, or a dedicated team that runs delivery for you. You set the outcome and acceptance criteria; the team reports against a written plan.`,
  },
  {
    question: 'What is the difference between hourly collaboration and outsourcing?',
    answer:
      'Who owns delivery. In hourly collaboration an engineer joins your team and you manage the work; you buy capacity by the hour. In outsourcing a dedicated TalentSync team takes responsibility for delivering an agreed scope, with its own technical lead, planning and quality assurance; you buy an outcome against a written estimate.',
  },
  {
    question: 'Can TalentSync build a complete development team?',
    answer:
      'Yes. For New Era Visionary Group we assembled a dedicated seven-person team supporting the development and delivery of Barça Mobile: backend Java, front end, Android and Kotlin Multiplatform, and QA. A team is screened as a team — comparable levels, aligned start dates, one shared definition of done — rather than as seven separate hires.',
  },
  {
    question: 'How quickly can TalentSync present suitable engineers?',
    answer: `A vetted shortlist for a common stack usually arrives within days, and your interview schedule then sets the pace. ${TIMELINE_RECORD} ${SPEED_CAVEAT}`,
  },
  {
    question: 'How is an outsourcing project estimated and managed?',
    answer:
      'Estimated in writing before any work starts: a short discovery, a scoped plan with milestones and acceptance criteria, and either a fixed price for a fixed scope or a monthly dedicated-team rate for evolving work. Managed by a named TalentSync technical lead who reports progress against the plan and raises scope changes before they cost you money.',
  },
  {
    question: 'How does your pricing compare to hiring locally in Western Europe?',
    answer: `Engaging an engineer through us removes the cost and administrative load of local employment: no local entity, no payroll or benefits administration, no notice-period exposure, and no separate recruitment agency fee. ${PRICING_POSITION} We quote per role or per project after a short scoping call, against your fully-loaded local cost, so you compare like for like.`,
  },
  {
    question: 'What technology stacks do you cover?',
    answer: 'We cover the stacks European product teams hire for most: JavaScript and TypeScript (React, Angular, Node.js), .NET and C#, Python (Flask, FastAPI, Django), Java, mobile development (Swift, Kotlin, Flutter, React Native), and cloud platforms (AWS, Azure, Google Cloud). If your stack isn\'t listed, ask.',
  },
  {
    question: 'Do you provide ongoing support after placement?',
    answer:
      'Yes, and the part worth asking about is what happens if the engineer is wrong in month two. Every engagement carries a replacement window, written into the contract you read before you sign, with what triggers it stated. If we cannot fill the gap inside that window, the arrangement unwinds on the terms already agreed.',
  },
]

export const careers = [
  {
    title: 'Senior Technical Recruiter',
    location: 'Chișinău / Remote',
    type: 'Full-time',
    description: 'Join our team to connect exceptional Eastern European talent with global tech companies.',
  },
  {
    title: 'Business Development Manager',
    location: 'Remote (Europe)',
    type: 'Full-time',
    description: 'Drive growth by building relationships with tech companies across Europe and beyond.',
  },
]
