import { ENGAGEMENT_MODELS } from './services/types'

export const siteConfig = {
  name: 'TalentSync',
  // 06-claims-measurement.md row 22. "Your Strategic Partner for Tech Talent
  // Solutions" said nothing and every competitor says it.
  description: 'Senior engineers for teams that keep control',
  // The Hero lede. Client-fixed supporting text; carries the brand name, which
  // the h1 no longer does.
  tagline:
    'TalentSync helps European and international product companies engage vetted senior engineers ' +
    'through direct B2B recruitment or flexible hourly collaboration.',
  url: 'https://talentsync.eu',
  calendlyUrl: 'https://calendly.com/talentsync-meeting/30min',
  email: 'victor@talentsync.eu',
  phone: '+373 68 300 700',
  linkedin: 'https://linkedin.com/company/talentsync',
  location: 'Chișinău, Moldova',
}

/**
 * 02-page-content.md Part 0 BLOCK A — the entity paragraph, MANDATORY VERBATIM
 * on `/` and `/about/`. Exported so those two routes render one string rather
 * than two paraphrases that drift apart. `Chișinău` with diacritics (D5); the
 * same sentence is `Organization.description` in `src/lib/schema.ts`.
 */
export const CANONICAL_DESCRIPTION =
  'TalentSync is a technology recruitment and engineering talent partner based in Chișinău, Moldova. ' +
  'It helps European and international product companies engage vetted senior engineers from Eastern ' +
  'Europe through direct B2B recruitment and flexible hourly collaboration.'

/**
 * BLOCK D — the anti-positioning line, MANDATORY VERBATIM on `/`,
 * `/b2b-engineer-recruitment/` and `/hourly-engineering-talent/` (D7). It is
 * `Organization.disambiguatingDescription` in schema too, so import it here
 * rather than retyping it on the third page.
 */
export const ANTI_POSITIONING =
  'TalentSync is not a project outsourcing company. We help companies add experienced engineers to ' +
  'their existing teams while retaining full technical and operational control.'

/**
 * The speed counterweight. 02-page-content.md Part 0 requires it on every page
 * that mentions a timeline, so it is written once.
 */
export const SPEED_CAVEAT =
  'Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, ' +
  'and we tell you that at the brief rather than at week three.'

/**
 * The header nav, re-pointed at the frozen route registry (D1). It used to be
 * seven `#anchor` strings, which is why the site shipped without one crawlable
 * internal link. Items are `Route`s now — `{ path, label }`, not `{ href }`.
 * Footer columns come from `servicesNav` / `companyNav` / `legalNav` in the same
 * module; nothing here may hold a second list of routes.
 */
export { primaryNav as navigation } from './routes'

export const services = [
  {
    icon: 'HiOutlineUserGroup',
    title: 'Eastern Europe Talent Pool',
    description: 'Direct access to vetted software developers and IT specialists across the region, delivering exceptional quality at competitive rates.',
  },
  {
    // Was "Cost-Efficient Solutions" / "Save up to 60%" — an unsubstantiated
    // "up to" price comparison with no baseline (D7, claims row 1).
    icon: 'HiOutlineCurrencyDollar',
    title: 'Lower Total Cost of Employment',
    description: 'Reduce recruitment spend and the overhead of local employment — no local entity, no payroll or benefits administration, no notice-period exposure — while working with senior Eastern European engineers at competitive market rates.',
  },
  {
    icon: 'HiOutlinePuzzle',
    title: 'Tailored Matching',
    description: 'Custom recruitment and team-building designed around your specific technology stack and organizational culture.',
  },
  {
    // "the entire modern tech stack" is an absolute claim that is trivially
    // false (no Rust, Go, Elixir, embedded) — claims row 23.
    icon: 'HiOutlineCode',
    title: 'Full-Stack Expertise',
    description: 'JavaScript and TypeScript (React, Angular, Node.js), .NET and C#, Python, Java, and the mobile stacks — the roles European product teams hire for most. If your stack isn\'t listed, ask.',
  },
  {
    icon: 'HiOutlineCloud',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, Google Cloud specialists ready to architect and scale your infrastructure.',
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
    // "Rigorous assessments" is a factual claim about the service with no
    // documented process behind it (claims row 24). Narrowed to the three verbs
    // the frozen ENGAGEMENT_MODELS copy already commits to. The fuller version
    // — named screen, live session, reference checks, notes shared — ships once
    // that is genuinely the process.
    title: 'Sourcing and Technical Validation',
    description: 'We source, screen and technically validate every engineer before presenting them, so what you review is an assessment and not just a CV.',
  },
  {
    step: 2,
    // "Full-time, part-time, contract, or project-based" is CUT (D7): it is a
    // general staffing menu, and "project-based" contradicts BLOCK D. Model
    // names come from ENGAGEMENT_MODELS so they read identically on all five
    // pages that carry them.
    title: 'Two Engagement Models',
    description: `${ENGAGEMENT_MODELS.b2b.title}: we source and technically validate an engineer for a direct long-term engagement that you own and manage. ${ENGAGEMENT_MODELS.hourly.title}: the engineer joins your existing team and is billed hourly. In both cases you select the person and keep architecture, roadmap and day-to-day management.`,
  },
  {
    step: 3,
    title: 'Dedicated Support',
    description: 'Single point of contact — your dedicated account manager ensures seamless communication and successful delivery.',
  },
  {
    step: 4,
    // "€15-35/hour" is CUT (D7). A published floor is a price commitment and it
    // anchors low against the seniority being sold (claims row 5). The rate
    // table lives on /hourly-engineering-talent/ and nowhere else.
    title: 'Transparent Commercial Terms',
    description: 'One agreed rate or fee per engagement, quoted in writing after we scope the role. No hidden margin, no placement surprises, no multi-year lock-in.',
  },
]

/**
 * Every `results` bullet states what TalentSync contributed — who was placed,
 * into what. Nothing here may say TalentSync built, led or shipped a client's
 * product (D7, claims rows 10-16).
 */
export const caseStudies = [
  {
    company: 'Barça Mobile',
    industry: 'AI Super App',
    image: '/images/case-barca.jpg',
    highlight: true,
    results: [
      // "1.5M app downloads in first 3 months" is CUT — no public linkable
      // source, and it is the client's product metric, not ours (D7).
      'Engineers placed into the product team building the Barça Mobile platform',
      'The engineer we placed worked on system architecture and CI/CD for the Barça Mobile launch',
    ],
  },
  {
    company: 'Orange',
    industry: 'Global Operator',
    image: '/images/case-orange.jpg',
    results: [
      'Engineers placed onto the MVNO integration between Barça Mobile and the Orange network',
      'Telecom and MVNO domain experience in the engineers we placed',
    ],
  },
  {
    company: 'Entail AI',
    industry: 'No-code CRO',
    image: '/images/case-entail.png',
    logoBg: 'white',
    logoContain: true,
    logoPadding: 'p-0',
    results: [
      'Engineers placed onto the client\'s content platform build',
      'Senior hires screened for security and code-quality standards',
    ],
  },
  {
    company: 'New Era Visionary Group',
    industry: 'Master Systems Integrator',
    image: '/images/case-newera.webp',
    results: [
      'Engineers placed onto the Barça Mobile programme',
      'Long-term direct engagement model',
    ],
  },
  {
    company: 'Pixelette Technologies',
    industry: 'Software Development Company',
    image: '/images/case-pixelette.webp',
    logoContain: true,
    logoBg: 'white',
    results: [
      // "Assisted in choosing best companies to invest in" is CUT — it edges
      // into investment advice, a regulated activity in several member states
      // (claims row 14).
      'Advisory engagement on sweat-equity structuring for technical hires',
    ],
  },
  {
    company: 'Qualiwise',
    industry: 'AI Copilot for Product Quality',
    image: '/images/case-qualiwise.png',
    logoContain: true,
    logoBg: 'white',
    results: [
      'Senior Backend Python Developer sourced and signed within one week of the brief',
      'AI Copilot platform scaling',
    ],
  },
  {
    company: 'SocialBee',
    industry: 'Social Media Management',
    image: '/images/case-socialbee.webp',
    results: [
      '2 Senior Fullstack Java/Angular Developers',
      'Team scaled within 2 weeks',
    ],
  },
  {
    company: 'Silvertalent',
    industry: 'Talent Acquisition Platform',
    image: '/images/case-silvertalent.png',
    logoBg: 'white',
    results: [
      '3 Fullstack React/.NET Developers',
      'Team scaled within 2 weeks',
    ],
  },
  {
    company: 'Foodamigos',
    industry: 'Food Delivery Startup',
    image: '/images/case-foodamigos.png',
    results: [
      'Senior Frontend Angular Developer',
      'Team scaled within 1 week',
    ],
  },
  {
    company: 'Innovatec',
    industry: 'Hatchery Automation',
    image: '/images/case-innovatec.png',
    results: [
      'PLC Specialist placement',
      'Team scaled within 2 weeks',
    ],
  },
]

/**
 * BLOCKED — do not reword these three quotes here. Claims rows 18-20 require a
 * full name, a matching job title and a written permission email per quote, and
 * "the quote in the person's own words, not drafted for them". Rewriting a real
 * endorsement without the author's sign-off is itself the UCPD Annex I 23c risk
 * the audit is trying to close. `testimonials[1]` says "two days" where
 * `caseStudies[5]` and `faq[3]` now say one week — one of those numbers is
 * wrong and only Victor can say which.
 */
export const testimonials = [
  {
    quote: 'Exceptional engineers who delivered on time. A key partner in launching Barça Mobile.',
    author: 'Adrian',
    title: 'CTO, Barça Mobile',
    avatar: '/images/testimonial-adrian-barca.jpeg',
  },
  {
    quote: 'They found us a senior Python developer in two days. Exactly what we needed to scale.',
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
 * same array, so the markup cannot drift from the visible `<details>` text.
 */
export const faq = [
  {
    question: 'What regions do you source talent from?',
    answer: 'We specialize in Eastern European talent, with our headquarters in Chișinău, Moldova. We have deep local expertise across thriving tech markets in the region including Moldova, Romania, Ukraine, and Poland.',
  },
  {
    // Was "How much can I save…" / "save up to 60% … €15-35/hour" — claims row 4.
    question: 'How does your pricing compare to hiring locally in Western Europe?',
    answer: 'Engaging an engineer through us removes the cost and administrative load of local employment: no local entity, no payroll or benefits administration, no notice-period exposure, and no separate recruitment agency fee. Rates depend on stack, seniority and engagement model, so we quote per role after a short scoping call — and we quote it against your fully-loaded local cost of employment, so you can compare like for like.',
  },
  {
    question: 'What technology stacks do you cover?',
    answer: 'We cover the stacks European product teams hire for most: JavaScript and TypeScript (React, Angular, Node.js), .NET and C#, Python (Flask, FastAPI, Django), Java, mobile development (Swift, Kotlin, Flutter, React Native), and cloud platforms (AWS, Azure, Google Cloud). If your stack isn\'t listed, ask.',
  },
  {
    // "Many positions are filled within 1-2 weeks" is CUT — an unquantified
    // general claim (D7). Qualified with the actual dataset instead, plus the
    // counterweight sentence.
    question: 'How quickly can you fill a position?',
    answer: `It depends on the role. Across our five most recent placements — nine engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief. Total time to a signed start date is then driven by your interview schedule. ${SPEED_CAVEAT}`,
  },
  {
    question: 'What engagement models do you offer?',
    answer: `Two. (1) ${ENGAGEMENT_MODELS.b2b.title} — we source, screen and technically validate the engineer for a long-term engagement; you select them and manage them directly, avoiding the cost and complexity of local employment. (2) ${ENGAGEMENT_MODELS.hourly.title} — the engineer joins your existing team and is billed hourly, with no local entity and no fixed headcount commitment. ${ANTI_POSITIONING}`,
  },
  {
    question: 'Do you provide ongoing support after placement?',
    answer: 'Yes, you get a dedicated account manager as your single point of contact who ensures seamless communication and successful delivery throughout the engagement.',
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
