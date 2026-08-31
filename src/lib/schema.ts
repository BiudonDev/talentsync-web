/**
 * JSON-LD builders. Every builder returns a plain schema.org NODE — no
 * `@context`. Wrap one or more of them with `graphLd()` and hand the result to
 * `<JsonLd data={...} />`.
 *
 * DELIBERATELY ABSENT: `Review` and `aggregateRating`. Self-serving review
 * markup on your own Organization risks a manual action (DECISIONS.md D6), so
 * there is no builder for it and nothing to call.
 */

import { SITE_NAME, SITE_URL, absUrl } from './seo'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const LOGO_ID = `${SITE_URL}/#logo`
export const FOUNDER_ID = `${SITE_URL}/about/#victor`

const ORG_REF = { '@id': ORG_ID }

/** Chișinău, with diacritics, everywhere — copy, schema and footer NAP (D5). */
const LOCALITY = 'Chișinău'
// The registered entity, from the Moldovan state register. TalentSync is the
// trading name only — see organizationLd() below. Curly quotes because that is
// how every legal page renders it; one spelling everywhere is the same D5 rule.
const LEGAL_NAME = 'S.R.L. “UNQENERGY”'
const IDNO = '1020600034949'
// Registered 8 October 2020. `FOUNDED_YEAR` in src/data/about.ts renders the year
// alone in prose; the full date belongs here, where a machine reads it.
const FOUNDING_DATE = '2020-10-08'
// The registered office, split out of the one string /about/ and /imprint/ render
// verbatim. `addressRegion` is deliberately absent: "Chișinău Rîșcani" is the
// register's sector designation, not a region, and a guessed mapping is worse
// than an omitted optional property.
const STREET_ADDRESS = 'Colina Pușkin 18, ap. (of.) 1'
const POSTAL_CODE = 'MD-2005'
const EMAIL = 'victor@talentsync.eu'
// Spaced, not E.164. D5 requires the visible footer NAP and this block to match
// exactly, and siteConfig.phone (what the footer renders) is the spaced form —
// which 07-schema-aeo.md §7.2 also mandates verbatim for every directory listing.
const TELEPHONE = '+373 68 300 700'
const LINKEDIN = 'https://linkedin.com/company/talentsync'
// The founder, spelled as /about/ renders him — src/data/about.ts `founder` is the
// visible half of the same pair, and the two Person nodes share `FOUNDER_ID`, so
// a difference here would put two people under one @id.
const FOUNDER_NAME = 'Victor Uncuta'
const FOUNDER_TITLE = 'CEO'
const FOUNDER_LINKEDIN = 'https://www.linkedin.com/in/victoruncuta/'
const CALENDLY = 'https://calendly.com/talentsync-meeting/30min'

const AREA_SERVED = [
  { '@type': 'Place', name: 'Europe' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'United States' },
]

/** Wrap schema nodes into one JSON-LD document. */
export const graphLd = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})

/**
 * `additionalType: EmploymentAgency` rather than `@type: EmploymentAgency`.
 * The latter inherits `Place`. The address below is a registered office, not a
 * branch a client walks into: no opening hours, no counter, nothing a Local
 * Business rich result is for. Place semantics would be paid for and unused.
 *
 * `name` is the TRADING name; `legalName` is the registered person. They differ,
 * and that is the point: the state register lists no company called TalentSync,
 * so /imprint/, /terms/ and /about/ all state in prose that TalentSync trades
 * under S.R.L. “UNQENERGY”. Until this node said the same thing, the one identity
 * an EU procurement reviewer actually scrapes contradicted the four pages beside
 * it. The two strings are written EXACTLY as the prose renders them, curly quotes
 * included — same D5 rule that keeps one spelling of Chișinău everywhere.
 *
 * The street address, postal code and founding date were business facts nobody
 * could invent; the client supplied them, so they are here, matching the visible
 * registry block on /about/ and the imprint character for character.
 *
 * `vatID` and `taxID` stay OMITTED, and now by decision rather than by default:
 * the company is not registered for VAT in the Republic of Moldova, so there is
 * no number to publish. Organization has no required properties, a wrong value is
 * worse than a missing one, and /imprint/ and /terms/ state the fact in prose
 * where a buyer deciding on the reverse charge will actually read it.
 */
export const organizationLd = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  additionalType: 'https://schema.org/EmploymentAgency',
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'IDNO',
    value: IDNO,
  },
  foundingDate: FOUNDING_DATE,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: `${SITE_URL}/favicon.svg`,
    caption: SITE_NAME,
  },
  image: { '@id': LOGO_ID },
  description:
    `TalentSync is a technology recruitment and engineering talent partner based in ${LOCALITY}, Moldova. ` +
    'It helps European and international product companies engage vetted senior engineers from Eastern Europe ' +
    'through direct B2B recruitment and flexible hourly collaboration.',
  disambiguatingDescription:
    'TalentSync is not a project outsourcing company. We help companies add experienced engineers to their ' +
    'existing teams while retaining full technical and operational control.',
  email: EMAIL,
  telephone: TELEPHONE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: STREET_ADDRESS,
    postalCode: POSTAL_CODE,
    addressLocality: LOCALITY,
    addressCountry: 'MD',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: 'New client enquiries',
      email: EMAIL,
      telephone: TELEPHONE,
      url: CALENDLY,
      areaServed: ['EU', 'GB', 'CH', 'NO', 'US'],
      availableLanguage: ['en', 'ro', 'ru'],
    },
  ],
  sameAs: [LINKEDIN],
  areaServed: AREA_SERVED,
  knowsAbout: [
    'Technology recruitment',
    'Software engineering staff augmentation',
    'Eastern European software developers',
    'AI and machine learning engineers',
    'Backend engineering',
    'DevOps and cloud infrastructure',
    'QA and test automation',
    'Full-stack development',
  ],
  knowsLanguage: ['en', 'ro', 'ru'],
  founder: {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_TITLE,
    worksFor: ORG_REF,
    url: `${SITE_URL}/about/#victor`,
    sameAs: [FOUNDER_LINKEDIN],
  },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@id': `${absUrl('/b2b-engineer-recruitment/')}#service` } },
    { '@type': 'Offer', itemOffered: { '@id': `${absUrl('/hourly-engineering-talent/')}#service` } },
  ],
})

/**
 * No `SearchAction`. The sitelinks search box was retired globally in November
 * 2024 and the markup that powered it no longer does anything.
 */
export const websiteLd = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: 'TalentSync.eu',
  description:
    'Technology recruitment and engineering talent from Eastern Europe for European and international product companies.',
  publisher: ORG_REF,
  inLanguage: 'en',
})

export type Crumb = { name: string; path?: string }

/**
 * `breadcrumbLd([{ name: 'Case Studies', path: '/case-studies/' }, { name: 'Qualiwise' }])`
 * Home is prepended for you. The final crumb normally omits `path` — a
 * `ListItem` without `item` is the documented form for the current page.
 */
export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    ...(c.path ? { item: absUrl(c.path) } : {}),
  })),
})

export const serviceLd = (s: {
  path: string
  name: string
  /** e.g. 'Backend engineer recruitment'. Keep distinct per page. */
  serviceType: string
  description: string
  audience?: string
}) => ({
  '@type': 'Service',
  '@id': `${absUrl(s.path)}#service`,
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  provider: ORG_REF,
  url: absUrl(s.path),
  areaServed: AREA_SERVED,
  ...(s.audience ? { audience: { '@type': 'BusinessAudience', name: s.audience } } : {}),
})

/**
 * Drive this from the same array that renders the visible `<details>` FAQ, so
 * the markup cannot describe content a reader does not see.
 */
export const faqLd = (items: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: { '@type': 'Answer', text: q.answer },
  })),
})

export const articleLd = (a: {
  path: string
  headline: string
  description: string
  /** ISO 8601. */
  datePublished: string
  dateModified?: string
  /** Real named author. Defaults to the founder Person node. */
  author?: string
  image?: string
}) => ({
  '@type': 'BlogPosting',
  '@id': `${absUrl(a.path)}#article`,
  headline: a.headline,
  description: a.description,
  url: absUrl(a.path),
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  author: a.author ? { '@type': 'Person', name: a.author } : { '@id': FOUNDER_ID },
  publisher: ORG_REF,
  mainEntityOfPage: absUrl(a.path),
  inLanguage: 'en',
  ...(a.image ? { image: [absUrl(a.image)] } : {}),
})

/**
 * `validThrough` is required and the build guard fails on a date in the past —
 * a stale JobPosting is a Google structured-data policy violation.
 */
export const jobPostingLd = (j: {
  path: string
  title: string
  description: string
  /** ISO 8601. */
  datePosted: string
  /** ISO 8601, must be in the future. */
  validThrough: string
  /** e.g. 'FULL_TIME'. */
  employmentType: string
  /** true for fully remote roles. */
  remote?: boolean
  addressLocality?: string
  addressCountry?: string
}) => ({
  '@type': 'JobPosting',
  '@id': `${absUrl(j.path)}#jobposting`,
  title: j.title,
  description: j.description,
  datePosted: j.datePosted,
  validThrough: j.validThrough,
  employmentType: j.employmentType,
  url: absUrl(j.path),
  hiringOrganization: ORG_REF,
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: j.addressLocality ?? LOCALITY,
      addressCountry: j.addressCountry ?? 'MD',
    },
  },
  ...(j.remote
    ? {
        jobLocationType: 'TELECOMMUTE',
        applicantLocationRequirements: { '@type': 'Country', name: 'Europe' },
      }
    : {}),
})

/** Machine-readable context only — there is no rich result for ItemList here. */
export const itemListLd = (list: {
  id: string
  name: string
  items: { name: string; path: string; description?: string }[]
}) => ({
  '@type': 'ItemList',
  '@id': list.id,
  name: list.name,
  numberOfItems: list.items.length,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: list.items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    url: absUrl(it.path),
    ...(it.description ? { description: it.description } : {}),
  })),
})
