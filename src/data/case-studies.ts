/**
 * The placement ledger — the one genuinely unique asset on the site, and the
 * SINGLE central client record. The homepage cards (`sections/CaseStudies.tsx`),
 * the hub table, the three detail routes, the service-page evidence guard and
 * the headline engineer total all read from this array. Nothing else may hold a
 * second list of clients.
 *
 * THE D7 RULE, restated because it is the only rule that matters in this file:
 * every line describes what TalentSync CONTRIBUTED — who was placed, into what
 * team, on what work. Nothing here describes what the client shipped, and
 * nothing implies TalentSync built a client's product unless the engagement was
 * a dedicated-team delivery and says so.
 *
 * Deleted on purpose, do not restore:
 *   - "1.5M app downloads in first 3 months"        (D7 — no public linkable source)
 *   - "Real-time platform for millions of global fans"
 *   - "Led system architecture design and CI/CD implementation"
 *   - Orange, in every form. Orange was never a TalentSync client (the engineers
 *     reached the Orange network through the Barça Mobile programme) and the
 *     client asked on 21 September 2026 for every Orange reference to go.
 *   - "Led technical development of their blog" / "Led software development,
 *      strategy and launch" / "Assisted in choosing best companies to invest in"
 *   - The "DevOps engineer who worked on system architecture and CI/CD" for
 *     Barça Mobile. The client's own record of the New Era Visionary Group team
 *     (below) lists seven named roles and none of them is DevOps, and the
 *     eighteen-engineer total only balances without that person. If the
 *     placement was real, the client confirms it and the total moves to nineteen.
 *
 * ONE record for New Era Visionary Group / Barça Mobile. New Era Visionary Group
 * is the company TalentSync contracted with; Barça Mobile is the product it
 * delivers and the project the seven engineers worked on. Two records would
 * count the same people twice (client feedback item 13), so `project` names the
 * product and the frozen route `/case-studies/barca-mobile/` stays as the detail
 * page for the one engagement.
 *
 * ONE entry is not a placement and says so in `exception`: Pixelette (advisory).
 * The "Are these placements or projects you delivered?" FAQ on the hub page
 * promises exactly one such flag, so adding a second means editing that answer.
 *
 * FACTS DELIBERATELY ABSENT (business facts no agent may invent — BLOCKERS.md):
 *   - engagement dates / years. `timeToSignature` is a duration, never a date.
 *   - the engagement MODEL per client (direct B2B, hourly or outsourcing).
 *     `talentsyncRole` states what TalentSync did instead.
 *   - the sector for Vinlivt and OptimEyes beyond what is public: the client will
 *     supply its preferred category wording (feedback items 9 and 10).
 *   - a Vinlivt logo. None has been supplied; the card renders a text mark.
 *   - testimonial surnames.
 *
 * ROLE NAMES are the client's canonical list (feedback item 23) and are spelled
 * the same way in every file: Full-Stack Developer, Senior Software Architect,
 * Senior Python Developer, Backend Java Developer, Frontend Developer,
 * Android/Kotlin Multiplatform Specialist, QA Engineer.
 */

import { caseSlugs } from '@/data/routes'

/**
 * The date the write-ups were first published, used as `datePublished` on the
 * three detail routes. `MODIFIED` is the date of the last ledger change.
 */
export const PUBLISHED = '2026-08-31'
export const MODIFIED = '2026-09-21'

export interface CaseStudyImage {
  src: string
  /** Natural pixel dimensions. Required by Rule 9 and by validate-pages.mjs. */
  width: number
  height: number
  /**
   * Dark-ink mark: needs a light plate behind it or it disappears on
   * `bg-surface`.
   */
  plate?: boolean
  /**
   * `object-contain` instead of the homepage carousel card's default
   * `object-cover`. Any mark that is not roughly square/16:9 needs this —
   * `object-cover` crops a wide horizontal lockup (OptimEyes: 632×200) down
   * to the card's aspect-video box, cutting text off mid-word. `plate`
   * implies this too (a plate exists to sit behind a contained mark), so set
   * this alone when the source image already carries its own background and
   * only the crop, not a plate, is wrong.
   */
  contain?: boolean
  /**
   * The exact CSS colour to fill the letterbox space around a `contain`-fit
   * mark, sampled from the source file's own background pixel (not guessed —
   * `magick file -format "%[pixel:p{2,2}]"`) so the fill is invisible against
   * the logo rather than an approximation. Takes priority over `plate`'s
   * generic off-white token. Use this whenever a source image's background is
   * opaque and a specific colour, and `plate`'s neutral token only when the
   * source is genuinely transparent and any light plate will do.
   */
  bg?: string
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
  /** The company TalentSync contracted with. The only name counted in the total. */
  client: string
  /** The product or programme the engineers worked on, where it has its own name. */
  project?: string
  sector: string
  /** Ledger cell. Carries the headcount where it is known: "3 × Full-Stack Developer". */
  rolesPlaced: string
  stack: string
  /** Ledger cell. A DURATION from agreed brief to signed offer, never a date. */
  timeToSignature: string
  /** Ledger cell. What TalentSync did — not what the client built. */
  talentsyncRole: string
  /** One sentence. Feeds the ItemList JSON-LD description. */
  summary: string
  /** The homepage card bullets. Two or three short lines, TalentSync's scope only. */
  highlights: string[]
  /** The 90-130 word hub entry. */
  body: string[]
  /** Set only on entries that are not placements. */
  exception?: string
  /** The client mark. Absent when the client has not supplied one — the card renders text. */
  logo?: CaseStudyImage
  /** The homepage spotlight visual, where it differs from the mark. */
  spotlightImage?: CaseStudyImage
  /** true renders this entry as the homepage spotlight card. Exactly one. */
  spotlight?: boolean
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
    client: 'New Era Visionary Group',
    project: 'Barça Mobile',
    sector: 'Master Systems Integrator',
    rolesPlaced:
      '7 × engineers: 2 Backend Java Developers, 2 Frontend Developers, 2 Android/Kotlin Multiplatform Specialists, 1 QA Engineer',
    stack: 'Java, web front end, Android and Kotlin Multiplatform, test automation',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Team assembly, sourcing and technical vetting',
    summary:
      'A seven-person engineering team assembled for New Era Visionary Group, supporting the development and delivery of Barça Mobile.',
    highlights: [
      '7-person engineering team assembled: 2 Backend Java Developers, 2 Frontend Developers, 2 Android/Kotlin Multiplatform Specialists and 1 QA Engineer',
      'A dedicated engineering team supporting the development and delivery of Barça Mobile',
    ],
    body: [
      'New Era Visionary Group is a master systems integrator and the company TalentSync contracted with. Barça Mobile is the consumer product it delivers for a global football audience, and the project the team we assembled worked on.',
      'The team was seven engineers: two Backend Java Developers, two Frontend Developers, two Android/Kotlin Multiplatform Specialists and one QA Engineer. Every one was sourced and technically vetted by TalentSync and selected by the client, and the team worked under the client’s technical leadership on the client’s architecture and roadmap.',
      'We did not run the programme and we publish no figures about how the product performed in the market — those are the client’s numbers to publish, not ours. What we can state is who was placed, into which team, and what they worked on.',
    ],
    logo: { src: '/images/case-newera.webp', width: 1200, height: 750 },
    spotlightImage: { src: '/images/case-barca.jpg', width: 1440, height: 960 },
    spotlight: true,
    testimonial: {
      quote:
        'The engineers TalentSync sourced integrated straight into our team and delivered on time. A key partner during the Barça Mobile build.',
      author: 'Adrian',
      role: 'CTO, Barça Mobile (New Era Visionary Group)',
    },
    detail: {
      metaTitle: 'Barça Mobile Case Study: A Seven-Person Team | TalentSync',
      metaDescription:
        'The seven-person team TalentSync assembled for New Era Visionary Group on Barça Mobile: roles, scope and what we do not claim.',
      h1: 'Barça Mobile: A Seven-Person Engineering Team for New Era Visionary Group',
      lede: 'Barça Mobile is a consumer super app for a global football audience, delivered by New Era Visionary Group. TalentSync assembled a dedicated seven-person engineering team for the integrator — backend, front end, Android and QA — supporting the development and delivery of the product. This page states which roles were filled, what the team worked on, and what TalentSync did not do.',
      sections: [
        {
          heading: 'Who the client actually is',
          body: [
            'Two names appear around this engagement and they are not interchangeable. New Era Visionary Group is the master systems integrator delivering the programme and the party TalentSync contracted with. Barça Mobile is the product.',
            'We are explicit about this because a recruitment company that lets a football club’s brand imply a client relationship is making a claim it cannot support. FC Barcelona is not a TalentSync client. The engineers we placed worked on a programme delivered for that brand, inside the delivery organisation’s own teams.',
            'If you need the contracting chain confirmed before you rely on any of it, ask on a call and we will describe it exactly as it is.',
          ],
        },
        {
          heading: 'The team we assembled',
          body: [
            'Seven engineers, sourced and technically vetted by TalentSync and selected by the client: two Backend Java Developers, two Frontend Developers, two Android/Kotlin Multiplatform Specialists and one QA Engineer. The client interviewed every candidate and made every hiring decision; we ran the search and the technical screen for each role.',
            'The team joined the client’s programme as a dedicated unit rather than as seven separate hires. They used the client’s repositories, the client’s review process and the client’s definition of done, and they reported to the client’s technical leadership.',
            'Assembling seven people who have to work together is a different job from filling seven seats: the levels have to be comparable, the start dates have to line up, and the mobile, backend and QA roles have to be screened against one product rather than three job descriptions.',
          ],
        },
        {
          heading: 'What the team worked on',
          body: [
            'The development and delivery of Barça Mobile: backend services in Java, the web front end, the Android application built with Kotlin Multiplatform, and the test automation that gated releases. The architecture was the client’s, and so were the decisions.',
            'That is the useful part of this entry for a hiring manager. It tells you the shape of team our engineers have worked in — a consumer product with a fixed external launch date, a mobile and backend split, and QA embedded in the delivery team — which is a better predictor of fit than a logo.',
          ],
        },
        {
          heading: 'What we are not claiming',
          body: [
            'We did not own the programme and we did not launch the product. The team we assembled supported New Era Visionary Group’s delivery; the integrator owned the architecture, the roadmap and the release.',
            'We have also removed the app-store download figure that used to sit on this engagement. It was a client product metric being presented as a TalentSync result, there is no public linkable source for it, and the fact that it is impressive is exactly why it should not be borrowed.',
            'Everything left on this page is something the client would confirm.',
          ],
        },
        {
          heading: 'If you are hiring for work like this',
          body: [
            'A dedicated team for a product with a launch date is the case our software development outsourcing model is built for: we assemble the team, take responsibility for delivery against an agreed plan, and you keep the outcome, the acceptance criteria and the priorities.',
            'If you would rather hold the team yourself, the same seven roles can be filled one by one through direct B2B recruitment. Tell us at the brief which you want; it changes how we screen.',
          ],
        },
      ],
      links: [
        { anchor: 'software development outsourcing', href: '/software-development-outsourcing/' },
        { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
        { anchor: 'the B2B contract structure', href: '/b2b-engineer-recruitment/' },
      ],
    },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'optimeyes',
    client: 'OptimEyes',
    // Sourced from optimeyes.be (About/Privacy Policy pages), 21 September
    // 2026 — not guessed from the logo or name. OptimEyes (Emileon BVBA,
    // Brasschaat, Belgium, ISO 27001:2022 certified) is a SaaS platform,
    // built on Smartsheet, that helps manufacturing and supply-chain teams
    // find and fix operational bottlenecks. Swap for the client's own
    // preferred wording if they send one (feedback item 10 offered it).
    sector: 'Operational execution software, Belgium',
    rolesPlaced: '2 × engineers: 1 Senior Software Architect, 1 Senior Python Developer',
    stack: 'Python, software architecture',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary:
      'A Senior Software Architect and a Senior Python Developer integrated into OptimEyes’s team in Belgium within two weeks of the brief.',
    highlights: [
      '1 Senior Software Architect added',
      '1 Senior Python Developer added',
      'Both integrated within 2 weeks of the brief',
    ],
    body: [
      'OptimEyes is a Belgian SaaS company that helps manufacturing and supply-chain teams find and fix operational bottlenecks. The brief was two senior people at once — a Senior Software Architect to own the technical direction of a component and a Senior Python Developer to build it — and both were integrated into the client’s team within two weeks of the brief.',
      'An architect-and-developer pair is a different search from two developers. The two have to agree on how they will work before either meets the client, or the client inherits an argument on day one, so we screened them as a pair and presented them as one.',
      'OptimEyes interviewed and selected both engineers; we ran the search and the technical screen. The engineers work inside the client’s repositories and to the client’s definition of done.',
    ],
    // contain + exact-sampled bg: the source's own background is solid
    // rgb(11,13,26), not transparent, so the letterbox space around the
    // contained logo is filled with that colour rather than the card's
    // (different) dark surface tone — the two now read as one continuous
    // background instead of a visible seam.
    logo: { src: '/images/case-optimeyes.webp', width: 632, height: 200, contain: true, bg: '#0b0d1a' },
  },

  // -------------------------------------------------------------------------
  {
    slug: 'vinlivt',
    client: 'Vinlivt',
    // Sourced from Munich Startup, Crunchbase, PitchBook and Tracxn, 21
    // September 2026 — not guessed. Vinlivt GmbH is a Munich-based fintech /
    // insurtech company (founded 2021) building a white-label "Financial
    // Home" app that lets insurance and financial advisors manage client
    // portfolios digitally. Swap for the client's own preferred wording if
    // they send one (feedback item 9 offered it).
    sector: 'Fintech / InsurTech, Germany',
    rolesPlaced: '1 × Full-Stack Developer',
    stack: 'Full-stack web development',
    timeToSignature: 'Not recorded',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'One Full-Stack Developer added to Vinlivt’s product team.',
    highlights: ['1 Full-Stack Developer added to the team'],
    body: [
      'Vinlivt is a Munich-based fintech company building a white-label app that lets insurance and financial advisors manage client portfolios digitally. The brief was one Full-Stack Developer to join the existing product team, own features end to end, and be productive inside the client’s codebase without a long ramp-up.',
      'We sourced and technically vetted the shortlist, Vinlivt interviewed and selected, and the engineer joined the client’s team on the client’s tooling and review process.',
      'We are not quoting a time from brief to signature for this engagement because we did not record one, and a figure we cannot evidence is worth less than the sentence that replaces it.',
    ],
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
    highlights: [
      'Engineers placed onto the client’s content platform build',
      'Senior hires screened for security and code-quality standards',
    ],
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
    slug: 'pixelette-technologies',
    client: 'Pixelette Technologies',
    sector: 'Software development company',
    rolesPlaced: 'None — advisory engagement',
    stack: 'Not applicable',
    timeToSignature: 'Not applicable',
    talentsyncRole: 'Advisory: sweat-equity structuring',
    summary:
      'An advisory engagement on sweat-equity structuring. No engineer was placed and no recruitment fee was involved.',
    highlights: ['Advisory engagement on sweat-equity structuring for technical hires'],
    exception: 'Advisory engagement. No engineer was placed and no recruitment fee was involved.',
    body: [
      'Pixelette Technologies is a software development company. This is the one entry on this page that is not a placement: the work was advisory and covered sweat-equity structuring — how to set up equity-for-work arrangements with the people building a product.',
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
    rolesPlaced: '1 × Senior Python Developer',
    stack: 'Python',
    timeToSignature: 'One week',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'One Senior Python Developer, sourced and signed one week after the agreed brief.',
    highlights: [
      'Senior Python Developer sourced and signed within one week of the brief',
      'AI Copilot platform scaling',
    ],
    body: [
      'Qualiwise builds an AI copilot for product quality. The brief was a single Senior Python Developer for a small team that was already shipping, which meant the engineer had to be productive without a long ramp-up and without a senior colleague to lean on.',
      'We sourced and technically vetted the shortlist, Qualiwise interviewed and selected, and the engineer signed one week after the brief was agreed.',
      'One week is fast for a senior Python role and it is not a service level we offer. It happened because the brief was precise, the interview loop was two rounds, and the right person happened to be available. Qualiwise’s founder is quoted below.',
    ],
    // Sampled pure white (rgb(255,255,255)), not `plate`'s generic off-white
    // token — the source's own background is already white, and the plate
    // token is a visibly different, slightly grey shade next to it.
    logo: { src: '/images/case-qualiwise.png', width: 500, height: 500, contain: true, bg: '#ffffff' },
    testimonial: {
      quote:
        'They shortlisted a senior Python developer for us within days and he was signed inside one week. Exactly what we needed to scale.',
      author: 'Ulrich',
      role: 'CEO & Founder, Qualiwise',
    },
    detail: {
      metaTitle: 'Qualiwise Case Study: Senior Python Hire | TalentSync',
      metaDescription:
        'Qualiwise needed one Senior Python Developer. TalentSync ran the search, Qualiwise interviewed and selected, and the engineer signed one week later.',
      h1: 'Qualiwise: A Senior Python Developer Signed in One Week',
      lede: 'Qualiwise builds an AI copilot for product quality. It needed one Senior Python Developer for a backend team that was already shipping. TalentSync ran the search and the technical screen, Qualiwise interviewed and selected, and the engineer signed one week after the brief was agreed.',
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
    rolesPlaced: '2 × Senior Full-Stack Developer (Java, Angular)',
    stack: 'Java, Angular',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'Two Senior Full-Stack Developers in Java and Angular, both signed within two weeks of the agreed brief.',
    highlights: ['2 Senior Full-Stack Developers, Java and Angular', 'Team scaled within 2 weeks'],
    body: [
      'SocialBee is a social media management platform. The brief was two Senior Full-Stack Developers in Java and Angular, added to an existing product team rather than forming a squad of their own.',
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
    rolesPlaced: '3 × Full-Stack Developer (React, .NET)',
    stack: 'React, .NET',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'Three Full-Stack Developers in React and .NET briefed at once, all three signed within two weeks.',
    highlights: ['3 Full-Stack Developers, React and .NET', 'Team scaled within 2 weeks'],
    body: [
      'Silvertalent builds a talent acquisition platform. The brief was three Full-Stack Developers in React and .NET at once, which is a different problem from filling one seat: three people have to be comparable in level, available on the same start date, and able to work alongside each other from week one.',
      'All three signed within two weeks of the agreed brief. React with .NET is the strongest full-stack combination in the Moldovan and Romanian market, and that is the main reason a three-person brief moved at that pace.',
      'Silvertalent is itself in the hiring business, so the bar for the shortlist was set by people who screen engineers for a living. That made the feedback loop unusually fast and unusually blunt, which we would take every time.',
    ],
    logo: { src: '/images/case-silvertalent.png', width: 360, height: 156, plate: true },
    detail: {
      metaTitle: 'Silvertalent Case Study: React/.NET Team | TalentSync',
      metaDescription:
        'Silvertalent needed three Full-Stack Developers in React and .NET at once. All three signed within two weeks of the brief. What that search actually involved.',
      h1: 'Silvertalent: Three Full-Stack Developers in React and .NET',
      lede: 'Silvertalent builds a talent acquisition platform. It briefed three Full-Stack Developers in React and .NET at the same time, rather than one seat at a time. TalentSync ran the search and the technical screens; all three engineers signed within two weeks of the agreed brief.',
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
    rolesPlaced: '1 × Senior Frontend Developer (Angular)',
    stack: 'Angular',
    timeToSignature: 'One week',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'One Senior Frontend Developer in Angular for a small startup team, signed one week after the agreed brief.',
    highlights: ['Senior Frontend Developer, Angular', 'Team scaled within 1 week'],
    body: [
      'Foodamigos is a food delivery startup. The brief was one Senior Frontend Developer in Angular for a small team, and the engineer signed one week after the brief was agreed.',
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
    rolesPlaced: '1 × PLC Specialist',
    stack: 'Industrial control systems',
    timeToSignature: 'Two weeks',
    talentsyncRole: 'Sourcing and technical vetting',
    summary: 'A PLC Specialist for industrial control software, signed within two weeks of the agreed brief.',
    highlights: ['PLC Specialist placement', 'Team scaled within 2 weeks'],
    body: [
      'Innovatec builds automation systems for hatcheries. The brief was a PLC Specialist — industrial control software rather than web or product engineering — and the engineer signed within two weeks of the agreed brief.',
      'This is the least typical engagement on the list and the most useful one to read if your roles sit outside the usual product stacks. Industrial automation candidates do not come from the same pool as our web and backend engineers and they are not interchangeable with them, so we sourced this role separately.',
      'If your hiring is in embedded, control systems or industrial software, say so at the brief and we will tell you honestly how deep our network is in that area rather than quietly running a general search.',
    ],
    logo: { src: '/images/case-innovatec.png', width: 900, height: 500 },
  },
]

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)

/** `/case-studies/qualiwise/` for the three detail routes, `/case-studies/#optimeyes` for the rest. */
export const caseHref = (c: CaseStudy): string =>
  c.detail ? `/case-studies/${c.slug}/` : `/case-studies/#${c.slug}`

// ---------------------------------------------------------------------------
// The headline totals. Every page that quotes a total imports these; nothing
// may hardcode the number as prose.
// ---------------------------------------------------------------------------

/**
 * Headcount per client, read off the rows that state one ("3 × Full-Stack
 * Developer"). Entail AI publishes no headcount and Pixelette is advisory, so
 * neither is counted.
 */
export const ledgerCounts = new Map<string, number>(
  caseStudies.flatMap((c) => {
    const m = /^(\d+)\s*×/.exec(c.rolesPlaced)
    return m ? [[c.client, Number(m[1])] as [string, number]] : []
  }),
)

/**
 * "18 engineers placed with European product teams" — client feedback item 8,
 * 21 September 2026: the original eight plus Vinlivt (1), OptimEyes (2) and
 * the seven-person New Era Visionary Group team. Asserted against the ledger
 * below so the visible number and the rows can never disagree again.
 */
export const PLACED_ENGINEERS = 18
/** Clients with a counted headcount. */
export const PLACED_CLIENTS = 8

/**
 * The speed record, stated once. Only the six engagements with a recorded
 * brief-to-signature duration are counted, and it is always followed by the
 * counterweight (`SPEED_CAVEAT` in content.ts) on the page that quotes it.
 * Route 2 (`/tech-recruitment-eastern-europe/`) words the same fact differently
 * on purpose — validate-pages.mjs check 3d.
 */
export const TIMELINE_RECORD =
  'Across the six placements where we recorded the timeline — ten engineers for SocialBee, Silvertalent, ' +
  'Qualiwise, Foodamigos, Innovatec and OptimEyes — each engineer signed one to two weeks after the brief.'

// ---------------------------------------------------------------------------
// Build-time guards. Under `output: 'export'` these run during `next build`, so
// a broken ledger fails the build instead of shipping.
// ---------------------------------------------------------------------------

const ledgerEngineers = Array.from(ledgerCounts.values()).reduce((a, b) => a + b, 0)
if (ledgerCounts.size !== PLACED_CLIENTS || ledgerEngineers !== PLACED_ENGINEERS) {
  throw new Error(
    `src/data/case-studies.ts: the placement ledger totals ${ledgerEngineers} engineer(s) across ${ledgerCounts.size} client(s), but PLACED_ENGINEERS/PLACED_CLIENTS say ${PLACED_ENGINEERS}/${PLACED_CLIENTS}. Move the constants in the same edit as the row, and re-read TIMELINE_RECORD.`,
  )
}

if (caseStudies.filter((c) => c.spotlight).length !== 1) {
  throw new Error('case-studies.ts: exactly one entry must carry `spotlight: true` — the homepage renders one spotlight card.')
}

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
// exactly one flagged exception. Flagging a second silently makes that answer false.
const exceptions = caseStudies.filter((c) => c.exception).length
if (exceptions !== 1) {
  throw new Error(
    `case-studies.ts: ${exceptions} entries carry \`exception\`, the FAQ on /case-studies/ says one. Update the FAQ answer and this guard together.`,
  )
}
