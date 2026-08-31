/**
 * The placement ledger — the one genuinely unique asset on the site.
 *
 * This is the richer, typed version of the `caseStudies` array in
 * `src/data/content.ts`. Same ten clients, same order, same facts; every
 * `results` bullet has been rewritten to DECISIONS.md D7 and the exact
 * replacement copy in `docs/plans/spec/06-claims-measurement.md` Part 1.
 *
 * THE D7 RULE, restated because it is the only rule that matters in this file:
 * every line describes what TalentSync CONTRIBUTED — who was placed, into what
 * team, on what work. Nothing here describes what the client shipped, and
 * nothing implies TalentSync built a client's product.
 *
 * Deleted on purpose, do not restore:
 *   - "1.5M app downloads in first 3 months"        (D7 — no public linkable source)
 *   - "Real-time platform for millions of global fans"
 *   - "Led system architecture design and CI/CD implementation"
 *   - "Led Orange Network integration with Barça Mobile MVNO"
 *   - "Led technical development of their blog" / "Led software development,
 *      strategy and launch" / "Assisted in choosing best companies to invest in"
 *
 * Two of the ten entries are NOT placements and say so in `exception`:
 * Pixelette (advisory) and Orange (no contract with TalentSync — the engineers
 * reached the Orange network through the Barça Mobile programme). The
 * "Are these placements or projects you delivered?" FAQ on the hub page
 * promises exactly two such flags, so adding a third means editing that answer.
 *
 * FACTS DELIBERATELY ABSENT (business facts no agent may invent — BLOCKERS.md):
 *   - engagement dates / years. `timeToSignature` is a duration, never a date.
 *   - the engagement MODEL per client (direct B2B vs hourly). `talentsyncRole`
 *     states what TalentSync did instead, which is knowable and true today.
 *     Swap the column once Victor confirms; it is a string edit per row.
 *   - headcount for the five programme engagements. It is folded into
 *     `rolesPlaced` ("3 × Full-stack engineer") only where the number is known.
 *   - testimonial surnames.
 */

import { caseSlugs } from '@/data/routes'

/**
 * The date this page was authored, used as `datePublished` on the three detail
 * routes. It is the publication date of the write-up, not of the engagement.
 */
export const PUBLISHED = '2026-08-31'

export interface CaseStudyImage {
  src: string
  /** Natural pixel dimensions. Required by Rule 9 and by validate-pages.mjs. */
  width: number
  height: number
  /**
   * Dark-ink mark: needs a light plate behind it or it disappears on
   * `bg-surface`. Mirrors `logoBg: 'white'` in content.ts.
   */
  plate?: boolean
}

export interface CaseStudySection {
  heading: string
  body: string[]
}

export interface CaseStudyDetail {
  /** 15-60 chars, unique site-wide (validate-pages.mjs). */
  metaTitle: string
  /** 70-160 chars, unique site-wide. */
  metaDescription: string
  h1: string
  /** The direct-answer opening paragraph. 45-60 words. */
  lede: string
  sections: CaseStudySection[]
  links: { anchor: string; href: string }[]
}

export interface CaseStudy {
  /** Anchor id on `/case-studies/`, and the detail route for the three in `caseSlugs`. */
  slug: string
  client: string
  sector: string
  /** Ledger cell. Carries the headcount where it is known: "3 × Full-stack engineer". */
  rolesPlaced: string
  stack: string
  /** Ledger cell. A DURATION from agreed brief to signed offer, never a date. */
  timeToSignature: string
  /** Ledger cell. What TalentSync did — not what the client built. */
  talentsyncRole: string
  /** One sentence. Feeds the ItemList JSON-LD description. */
  summary: string
  /** The 90-130 word hub entry. */
  body: string[]
  /** Set only on the two entries that are not placements. */
  exception?: string
  logo: CaseStudyImage
  /**
   * Rendered as plain HTML next to its own entry. NEVER as Review or
   * aggregateRating markup (DECISIONS.md D6).
   */
  testimonial?: { quote: string; author: string; role: string }
  detail?: CaseStudyDetail
}

export const caseStudies: CaseStudy[] = [
  // -------------------------------------------------------------------------
  {
    slug: 'barca-mobile',
    client: 'Barça Mobile',
    sector: 'Consumer mobile / AI super app',
    rolesPlaced: 'Backend and DevOps engineers',
    stack: 'Cloud services, CI/CD',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Backend and DevOps engineers placed into the product team building the Barça Mobile super app, working under the client’s technical leadership.',
    body: [
      'Barça Mobile is a consumer super app built for a global football audience and delivered by New Era Visionary Group, which is the company TalentSync actually contracted with. We sourced and technically vetted engineers for the product team building it.',
      'Roles filled included backend and DevOps engineers, working under the client’s technical leadership on the client’s architecture and roadmap. The DevOps engineer we placed worked on system architecture and CI/CD for the Barça Mobile launch.',
      'We did not build the app, we did not run the programme, and we publish no figures about how the product performed in the market — those are the client’s numbers to publish, not ours. What we can state is who was placed, into which team, and what they worked on.',
    ],
    logo: { src: '/images/case-barca.jpg', width: 1440, height: 960 },
    testimonial: {
      quote:
        'The engineers TalentSync sourced integrated straight into our team and delivered on time. A key partner during the Barça Mobile build.',
      author: 'Adrian',
      role: 'CTO, Barça Mobile (New Era Visionary Group)',
    },
    detail: {
      metaTitle: 'Barça Mobile Case Study | TalentSync',
      metaDescription:
        'Which engineering roles TalentSync filled on the Barça Mobile programme, what the placed engineers worked on, and what we explicitly do not claim.',
      h1: 'Barça Mobile: The Engineers We Placed on an AI Super App',
      lede: 'Barça Mobile is a consumer super app for a global football audience, delivered by New Era Visionary Group. TalentSync sourced and technically vetted engineers for the team building it. This page states which roles were filled, what those engineers worked on, and what TalentSync did not do.',
      sections: [
        {
          heading: 'Who the client actually is',
          body: [
            'Three names appear around this engagement and they are not interchangeable. New Era Visionary Group is the master systems integrator delivering the programme and the party TalentSync contracted with. Barça Mobile is the product. Orange is the mobile network the product’s MVNO runs on.',
            'We are explicit about this because a recruitment company that lets a football club’s brand imply a client relationship is making a claim it cannot support. FC Barcelona is not a TalentSync client. The engineers we placed worked on a programme delivered for that brand, inside the delivery organisation’s own teams.',
            'If you need the contracting chain confirmed before you rely on any of it, ask on a call and we will describe it exactly as it is.',
          ],
        },
        {
          heading: 'What was placed',
          body: [
            'Backend and DevOps engineers, sourced and technically vetted by TalentSync and selected by the client. The client interviewed every candidate and made every hiring decision; we ran the search and the technical screen.',
            'The engineers joined the client’s existing teams rather than forming a separate squad. They used the client’s repositories, the client’s review process and the client’s definition of done, and they reported to the client’s technical leadership.',
            'We are not publishing the headcount for this programme until the client confirms we may. A number we cannot evidence is worth less than the sentence that replaces it.',
          ],
        },
        {
          heading: 'What the engineers worked on',
          body: [
            'The DevOps engineer we placed worked on system architecture and CI/CD for the Barça Mobile launch. That is a description of the engineer’s scope inside the client’s team — the architecture was the client’s, and so were the decisions.',
            'The wider programme included the MVNO integration between Barça Mobile and the Orange network, which is carrier-side work: provisioning flows, a telecom counterparty with its own release calendar, and failure modes that cannot be reproduced on a laptop.',
            'That is the useful part of this entry for a hiring manager. It tells you the kind of system our engineers have worked against, which is a better predictor of fit than a logo.',
          ],
        },
        {
          heading: 'What we are not claiming',
          body: [
            'TalentSync is not a project outsourcing company. We did not lead architecture, we did not own delivery, and we did not launch a product. An agency that claims to lead architecture is describing an outsourcer, and that is not what this business is.',
            'We have also removed the app-store download figure that used to sit on this engagement. It was a client product metric being presented as a TalentSync result, there is no public linkable source for it, and the fact that it is impressive is exactly why it should not be borrowed.',
            'Everything left on this page is something the client would confirm.',
          ],
        },
        {
          heading: 'If you are hiring for work like this',
          body: [
            'Consumer platforms at scale and carrier-grade integration are two different searches. The first wants engineers who have run a service under real traffic; the second wants engineers who have debugged a counterparty that would not fix their end.',
            'Engineers with telecom or regulated integration backgrounds are rarer in the region than general product backend engineers and take longer to source. Brief us earlier for those roles and we will tell you at the brief, not at week three, how deep the pool actually is.',
          ],
        },
      ],
      links: [
        { anchor: 'backend developers', href: '/hire-backend-developers/' },
        { anchor: 'how our search process runs', href: '/hire-software-developers-eastern-europe/' },
        { anchor: 'the B2B contract structure', href: '/b2b-engineer-recruitment/' },
      ],
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'orange',
    client: 'Orange',
    sector: 'Telecoms / MVNO',
    rolesPlaced: 'Integration engineers, through the Barça Mobile programme',
    stack: 'Carrier-side provisioning, MVNO integration',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Engineers placed onto the MVNO integration between Barça Mobile and the Orange network. Orange is not a TalentSync client.',
    exception:
      'Not a TalentSync client. Our engineers reached this system through another client’s programme, not through a contract with Orange.',
    body: [
      'Orange is a global mobile network operator. TalentSync has no contract with Orange and Orange has never engaged us; the connection is the Barça Mobile MVNO, which runs on the Orange network.',
      'Engineers we placed onto that programme worked on the MVNO integration between Barça Mobile and the Orange network — carrier-side provisioning flows, a counterparty with its own release calendar, and failure modes that cannot be reproduced locally.',
      'We list Orange because it is the system our engineers worked against, not because it is a client of ours, and that distinction is the whole point of the entry. If you are hiring for telecom or MVNO integration, this is the domain experience we have on record.',
    ],
    logo: { src: '/images/case-orange.jpg', width: 866, height: 650 },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'entail-ai',
    client: 'Entail AI',
    sector: 'No-code conversion optimisation',
    rolesPlaced: 'Engineers on the content platform build',
    stack: 'Web platform, security and code-review practice',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Engineers placed onto Entail AI’s content platform build, screened for security and code-quality standards as well as delivery.',
    body: [
      'Entail AI builds a no-code conversion-rate-optimisation platform. TalentSync placed engineers onto the client’s content platform build, and the senior hires were screened for security and code-quality standards as much as for delivery speed.',
      'The engineers worked inside Entail’s own repositories and review process, on work Entail scoped and prioritised. This was a placement, not a delivery contract: we did not own the roadmap and we did not ship the product.',
      'The quote below is from Entail’s founder. It is about the engineers rather than about us, which is the only kind of reference worth reading.',
    ],
    logo: { src: '/images/case-entail.png', width: 430, height: 431, plate: true },
    testimonial: {
      quote: 'Strong technical expertise and a clear understanding of our product vision.',
      author: 'Tom',
      role: 'CEO & Founder, Entail AI',
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'new-era-visionary-group',
    client: 'New Era Visionary Group',
    sector: 'Master systems integrator',
    rolesPlaced: 'Engineers on the Barça Mobile programme',
    stack: 'Mobile and backend product delivery',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Engineers placed onto the Barça Mobile programme on a long-term direct engagement, inside the integrator’s own teams.',
    body: [
      'New Era Visionary Group is a master systems integrator and the delivery organisation behind the Barça Mobile programme. It is the counterparty on that work — where this page names Barça Mobile or Orange, New Era Visionary Group is the company TalentSync actually contracted with.',
      'Engineers we placed joined the programme on a long-term direct engagement and worked inside the client’s teams, under the client’s technical leadership. We staffed roles; we did not run the programme, set its strategy or own its launch.',
      'Long-term direct engagements like this one are the shape most of our client relationships take. The engineer stays with the client rather than rotating back to us, which is the outcome we are trying to produce.',
    ],
    logo: { src: '/images/case-newera.webp', width: 1200, height: 750 },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'pixelette-technologies',
    client: 'Pixelette Technologies',
    sector: 'Software development company',
    rolesPlaced: 'None — advisory engagement',
    stack: 'Not applicable',
    timeToSignature: 'Not applicable',
    talentsyncRole: 'Advisory: sweat-equity structuring',
    summary:
      'An advisory engagement on sweat-equity structuring. No engineer was placed and no recruitment fee was involved.',
    exception: 'Advisory engagement. No engineer was placed and no recruitment fee was involved.',
    body: [
      'Pixelette Technologies is a software development company. This is one of the two entries on this page that is not a placement: the work was advisory and covered sweat-equity structuring — how to set up equity-for-work arrangements with the people building a product.',
      'We include it because leaving it out would make the record look tidier than it is, and because it is a conversation founders occasionally want to have with someone who has watched those arrangements go wrong.',
      'To be unambiguous about the boundary: this was not investment advice, we are not licensed to give investment advice, and we do not tell anyone which companies to invest in.',
    ],
    logo: { src: '/images/case-pixelette.webp', width: 300, height: 210, plate: true },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'qualiwise',
    client: 'Qualiwise',
    sector: 'AI copilot for product quality',
    rolesPlaced: '1 × Senior backend developer',
    stack: 'Python',
    timeToSignature: 'One week',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'One senior backend Python developer, sourced and signed one week after the agreed brief.',
    body: [
      'Qualiwise builds an AI copilot for product quality. The brief was a single senior backend Python developer for a small team that was already shipping, which meant the engineer had to be productive without a long ramp-up and without a senior colleague to lean on.',
      'We sourced and technically vetted the shortlist, Qualiwise interviewed and selected, and the engineer signed one week after the brief was agreed.',
      'One week is fast for a senior Python role and it is not a service level we offer. It happened because the brief was precise, the interview loop was two rounds, and the right person happened to be available. Qualiwise’s founder is quoted below.',
    ],
    logo: { src: '/images/case-qualiwise.png', width: 500, height: 500, plate: true },
    testimonial: {
      quote:
        'They shortlisted a senior Python developer for us within days and he was signed inside one week. Exactly what we needed to scale.',
      author: 'Ulrich',
      role: 'CEO & Founder, Qualiwise',
    },
    detail: {
      metaTitle: 'Qualiwise Case Study: Senior Python Hire | TalentSync',
      metaDescription:
        'Qualiwise needed one senior backend Python developer. TalentSync ran the search, Qualiwise interviewed and selected, and the engineer signed one week later.',
      h1: 'Qualiwise: A Senior Python Developer Signed in One Week',
      lede: 'Qualiwise builds an AI copilot for product quality. It needed one senior backend Python developer for a team that was already shipping. TalentSync ran the search and the technical screen, Qualiwise interviewed and selected, and the engineer signed one week after the brief was agreed.',
      sections: [
        {
          heading: 'The brief',
          body: [
            'One senior backend engineer, Python, for a small product team already in front of customers. There was no platform team to absorb a slow start and no second senior backend engineer to escalate to, so the person had to be able to own a service on their own.',
            'That constraint narrowed the search more than the stack did. Plenty of Python engineers can pass a technical interview; far fewer have run a service in production without a colleague to check their work.',
            'Qualiwise was clear about all of this at the brief, which is the single biggest reason the search moved quickly.',
          ],
        },
        {
          heading: 'How the search ran',
          body: [
            'We sourced against the brief, ran the technical screen ourselves, and presented a shortlist with the assessment notes attached rather than just the CVs.',
            'An engineer ran the technical interview. The screen covered a data-modelling problem where the requirement changes mid-conversation, an API-versioning question with a consumer that must not break, and one concurrency or idempotency scenario worked through out loud. We also asked what the candidate had broken in production and what they changed afterwards.',
            'Qualiwise then interviewed in two rounds and made the decision. We did not sit in on those interviews and we did not push a preferred candidate.',
          ],
        },
        {
          heading: 'Why one week, and why that is not a promise',
          body: [
            'Three things lined up. The brief was precise, so the search did not have to be re-run after the first shortlist. The interview loop was two rounds rather than four, so no candidate had time to accept elsewhere. And a strong senior Python engineer happened to be available in that window.',
            'The third is luck and we will not pretend otherwise. We publish this figure as one engagement’s record, not as a service level: the honest version of our timeline is that a vetted shortlist for a common stack arrives in days, and the total time to a signed start date is then driven by your interview schedule.',
            'Niche stacks, security clearance requirements and hard on-site elements all take longer, and we say so at the brief rather than at week three.',
          ],
        },
        {
          heading: 'What the engineer works on',
          body: [
            'Backend services for the Qualiwise platform, inside the client’s repositories, sprint cadence and definition of done. Qualiwise owns the architecture, the roadmap and the day-to-day management.',
            'We describe the engineer’s scope, not the product’s results. Whatever Qualiwise has achieved with its platform belongs in Qualiwise’s marketing, not in ours.',
          ],
        },
        {
          heading: 'If you are hiring a senior Python engineer',
          body: [
            'Tell us at the brief whether the person will have a senior colleague. It changes the screen completely: an engineer who has only ever worked inside a strong platform team is a genuine risk in a three-person startup, and an engineer who thrives alone can be wasted in a large one.',
            'Bring your interview loop down to two rounds if you can. It is the cheapest change available to you and it is worth more than anything we can do at the sourcing end.',
          ],
        },
      ],
      links: [
        { anchor: 'backend developers', href: '/hire-backend-developers/' },
        { anchor: 'how our search process runs', href: '/hire-software-developers-eastern-europe/' },
        { anchor: 'recruiting in Moldova', href: '/technical-recruitment-moldova/' },
      ],
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'socialbee',
    client: 'SocialBee',
    sector: 'Social media management SaaS',
    rolesPlaced: '2 × Senior full-stack engineer',
    stack: 'Java, Angular',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Two senior full-stack Java and Angular engineers, both signed within two weeks of the agreed brief.',
    body: [
      'SocialBee is a social media management platform. The brief was two senior full-stack engineers in Java and Angular, added to an existing product team rather than forming a squad of their own.',
      'Both engineers signed within two weeks of the agreed brief. Java paired with Angular is a narrower search than it looks — most full-stack candidates in the region pair Angular with .NET or Node — so the two-week figure reflects a good match between the brief and our existing network rather than a repeatable rate.',
      'The engineers worked inside SocialBee’s own sprint cadence, review process and definition of done, and SocialBee managed them directly.',
    ],
    logo: { src: '/images/case-socialbee.webp', width: 1600, height: 796 },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'silvertalent',
    client: 'Silvertalent',
    sector: 'Talent acquisition platform',
    rolesPlaced: '3 × Full-stack engineer',
    stack: 'React, .NET',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'Three full-stack React and .NET engineers briefed at once, all three signed within two weeks.',
    body: [
      'Silvertalent builds a talent acquisition platform. The brief was three full-stack React and .NET engineers at once, which is a different problem from filling one seat: three people have to be comparable in level, available on the same start date, and able to work alongside each other from week one.',
      'All three signed within two weeks of the agreed brief. React with .NET is the strongest full-stack combination in the Moldovan and Romanian market, and that is the main reason a three-person brief moved at that pace.',
      'Silvertalent is itself in the hiring business, so the bar for the shortlist was set by people who screen engineers for a living. That made the feedback loop unusually fast and unusually blunt, which we would take every time.',
    ],
    logo: { src: '/images/case-silvertalent.png', width: 360, height: 156, plate: true },
    detail: {
      metaTitle: 'Silvertalent Case Study: React/.NET Team | TalentSync',
      metaDescription:
        'Silvertalent needed three full-stack React and .NET engineers at once. All three signed within two weeks of the brief. What that search actually involved.',
      h1: 'Silvertalent: Three Full-Stack React and .NET Engineers',
      lede: 'Silvertalent builds a talent acquisition platform. It briefed three full-stack React and .NET engineers at the same time, rather than one seat at a time. TalentSync ran the search and the technical screens; all three engineers signed within two weeks of the agreed brief.',
      sections: [
        {
          heading: 'The brief: three engineers, not one',
          body: [
            'A three-person brief is not three one-person briefs. The engineers have to be comparable in level, or the strongest one ends up reviewing the other two. They have to be available on roughly the same start date, or the team onboards three times. And they have to be people who will work alongside each other rather than three individual hires who happen to arrive together.',
            'Silvertalent set the level explicitly at the brief and did not move it while the search ran. That is rarer than it sounds and it is what makes a simultaneous search possible at all.',
          ],
        },
        {
          heading: 'Why React and .NET moved quickly',
          body: [
            'React paired with .NET is the strongest full-stack combination in the Moldovan and Romanian market. The .NET base in the region is deep — a lot of it grown inside enterprise and outsourcing work that has been carried forward rather than rewritten — and React is the default front end on top of it.',
            'That depth is the honest explanation for the two-week figure. The same brief in Elixir, Rust or Scala would not have moved at that pace, and we would have said so before you briefed us.',
          ],
        },
        {
          heading: 'How a three-person shortlist is different',
          body: [
            'We ran the same technical screen on every candidate so the shortlist was comparable rather than merely long: a component-design problem where the requirement changes mid-conversation, a question about versioning an API without breaking its consumer, and a walk-through of something the candidate had broken in production.',
            'We then presented the shortlist as a set rather than as individuals, with a view on how the three would divide work between them. Silvertalent interviewed and selected all three; we did not rank them for the client.',
            'The client screens engineers for a living, so the feedback on each candidate came back within a day and it was blunt. A fast, blunt feedback loop is worth more to a search than anything happening at the sourcing end.',
          ],
        },
        {
          heading: 'What the engineers work on',
          body: [
            'Full-stack feature work on the Silvertalent platform, inside the client’s repositories, review process and definition of done. Silvertalent owns the architecture, the roadmap and the day-to-day management of all three engineers.',
            'As everywhere else on this site, we are describing the engineers’ scope rather than the product’s results. What Silvertalent has built with them is Silvertalent’s to talk about.',
          ],
        },
        {
          heading: 'If you are hiring a small team at once',
          body: [
            'Fix the level before the search starts and do not move it halfway through. Every simultaneous search that goes wrong goes wrong at that point, because a level change invalidates every candidate already in the loop.',
            'Decide in advance who is interviewing all three. Splitting a three-person shortlist across three different interviewers produces three incompatible verdicts and a fortnight of argument.',
            'And tell us whether the three need to be interchangeable or complementary. It is a different screen, and it is the question clients most often answer only after the offers go out.',
          ],
        },
      ],
      links: [
        { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
        { anchor: 'recruiting in Moldova', href: '/technical-recruitment-moldova/' },
        { anchor: 'the B2B contract structure', href: '/b2b-engineer-recruitment/' },
      ],
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'foodamigos',
    client: 'Foodamigos',
    sector: 'Food delivery startup',
    rolesPlaced: '1 × Senior frontend engineer',
    stack: 'Angular',
    timeToSignature: 'One week',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'One senior frontend Angular engineer for a small startup team, signed one week after the agreed brief.',
    body: [
      'Foodamigos is a food delivery startup. The brief was one senior frontend Angular engineer for a small team, and the engineer signed one week after the brief was agreed.',
      'Startup briefs are usually the fastest searches we run, for an unglamorous reason: the founder is the interviewer, the decision needs one meeting, and there is no internal approval chain sitting between the shortlist and the offer.',
      'The trade-off is that a small team gives a new engineer very little to lean on, so we screened for people who had worked without a platform team and without a senior colleague to escalate to. That is a different screen from the one a fifty-engineer product org needs, and running the wrong one is how a fast placement turns into a three-month problem.',
    ],
    logo: { src: '/images/case-foodamigos.png', width: 512, height: 512 },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'innovatec',
    client: 'Innovatec',
    sector: 'Hatchery automation',
    rolesPlaced: '1 × PLC specialist',
    stack: 'Industrial control systems',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'A PLC specialist for industrial control software, signed within two weeks of the agreed brief.',
    body: [
      'Innovatec builds automation systems for hatcheries. The brief was a PLC specialist — industrial control software rather than web or product engineering — and the engineer signed within two weeks of the agreed brief.',
      'This is the least typical engagement on the list and the most useful one to read if your roles sit outside the usual product stacks. Industrial automation candidates do not come from the same pool as our web and backend engineers and they are not interchangeable with them, so we sourced this role separately.',
      'If your hiring is in embedded, control systems or industrial software, say so at the brief and we will tell you honestly how deep our network is in that area rather than quietly running a general search.',
    ],
    logo: { src: '/images/case-innovatec.png', width: 900, height: 500 },
  },
]

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)

/** `/case-studies/qualiwise/` for the three detail routes, `/case-studies/#orange` for the rest. */
export const caseHref = (c: CaseStudy): string =>
  c.detail ? `/case-studies/${c.slug}/` : `/case-studies/#${c.slug}`

// ---------------------------------------------------------------------------
// Build-time guards. Under `output: 'export'` these run during `next build`, so
// a broken ledger fails the build instead of shipping.
// ---------------------------------------------------------------------------

for (const slug of caseSlugs) {
  if (!getCaseStudy(slug)?.detail) {
    throw new Error(
      `case-studies.ts: routes.ts declares /case-studies/${slug}/ but that entry has no \`detail\` block. Routes are frozen by DECISIONS.md D1 — write the detail copy, do not remove the route.`,
    )
  }
}

for (const c of caseStudies) {
  if (c.detail && !caseSlugs.includes(c.slug)) {
    throw new Error(
      `case-studies.ts: "${c.slug}" has a \`detail\` block but is not in \`caseSlugs\`, so no page is generated for it and every link to it would 404.`,
    )
  }
}

// The hub's "Are these placements or projects you delivered?" FAQ promises
// exactly two flagged exceptions. Flagging a third silently makes that answer false.
const exceptions = caseStudies.filter((c) => c.exception).length
if (exceptions !== 2) {
  throw new Error(
    `case-studies.ts: ${exceptions} entries carry \`exception\`, the FAQ on /case-studies/ says two. Update the FAQ answer and this guard together.`,
  )
}
