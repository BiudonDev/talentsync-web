/**
 * Route 3 — `/hire-software-developers-eastern-europe/`.
 *
 * TRANSACTIONAL. DECISIONS.md D1.2: this page carries the three engagement
 * models, the vetting process and the full placement ledger, under `Service`
 * schema. Route 2 is the informational twin and carries none of that.
 *
 * `scripts/validate-pages.mjs` fails the build if one 12+-word sentence appears
 * in both rendered `<main>` elements, and the rendered text concatenates
 * adjacent elements — a heading with no full stop runs into the paragraph after
 * it. So the coverage summary, the stack groups, the seniority definitions, the
 * placement outcomes and the internal-link anchors are all written for this
 * page alone. Read the sibling file before editing either.
 *
 * The ledger is the page's reason to exist: the six placements with a recorded
 * brief-to-signature duration — ten engineers — and nothing else. It is NOT
 * the whole engagement record: `/case-studies/` lists nine engagements and the
 * seventeen-engineer total (`PLACED_ENGINEERS`) includes one with no recorded
 * timeline. So scope every timing number on this page to those six. Do not
 * round it up, do not restate it as a total ("the entire record", "to date"),
 * and do not repeat the same engineers in a second table elsewhere on the site.
 */

import { PLACED_CLIENTS, PLACED_ENGINEERS, TIMELINE_RECORD } from '@/data/case-studies'
import type { ServicePage } from '../types'

export const hireSoftwareDevelopersEasternEurope: ServicePage = {
  slug: 'hire-software-developers-eastern-europe',
  label: 'Hire Engineers',
  metaTitle: 'Hire Software Developers in Eastern Europe | TalentSync',
  metaDescription:
    'Hire vetted senior developers from Eastern Europe on B2B, hourly or outsourced terms. Seventeen engineers placed; recorded timelines of one to two weeks.',
  h1: 'Hire Software Developers in Eastern Europe',

  answerParagraph: `TalentSync places senior software developers from Eastern Europe into existing engineering teams — on a direct B2B contract you hold with the engineer, on an hourly basis through us, or as a dedicated team that delivers a project for you. ${TIMELINE_RECORD}`,

  whoFor: {
    audience: 'Product teams adding one to five senior developers',
    body: [
      'Teams who have settled the geography question and now need someone to run the search itself: write the specification, source against it, screen hard, and put three to five defensible people in front of your interviewer.',
      'This works when you have a technical interviewer and someone who can decide. If you would rather a supplier owned delivery, that is a different purchase — our outsourcing model — and it has its own page.',
    ],
  },

  problem: [
    'The failure mode in this market is almost never a shortage of engineers. It is a shortlist assembled by somebody who cannot read code, twenty CVs deep, filtered on nothing but a keyword match against the job advert.',
    'What follows is predictable. Your best engineer burns a week interviewing people who should never have reached them, the one strong candidate accepts elsewhere while you are booking round three, and the search restarts from zero with the bar quietly lowered.',
  ],

  sections: [
    {
      id: 'the-placement-record',
      heading: 'The placement record',
      blocks: [
        {
          kind: 'table',
          caption: 'The six placements with a recorded timeline, by client, role, headcount and time from brief to signature',
          columns: ['Client', 'Role and stack', 'Engineers', 'Brief to signature'],
          rows: [
            {
              label: 'SocialBee',
              cells: ['Senior Full-Stack Developers, Java and Angular', '2', 'Two weeks'],
            },
            {
              label: 'Silvertalent',
              cells: ['Full-Stack Developers, React and .NET', '3', 'Two weeks'],
            },
            {
              label: 'Qualiwise',
              cells: ['Senior Python Developer', '1', 'One week'],
            },
            {
              label: 'Foodamigos',
              cells: ['Senior Frontend Developer, Angular', '1', 'One week'],
            },
            {
              label: 'Innovatec',
              cells: ['PLC Specialist, industrial automation', '1', 'Two weeks'],
            },
            {
              label: 'OptimEyes',
              cells: ['Senior Software Architect and Senior Python Developer', '2', 'Two weeks'],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            `Across those six placements: ten engineers. The wider record is ${PLACED_ENGINEERS} engineers placed across ${PLACED_CLIENTS} client teams, and the one engagement without a row here — the seven-person team for New Era Visionary Group — is omitted only because we did not record a brief-to-signature duration for it. We publish every row we have rather than a selected fragment, because a partial ledger is how a small firm makes itself look larger, and anyone who checks will notice.`,
            'Every engagement is listed on the case studies page, including the one advisory engagement where no engineer was placed.',
            'The clock runs from an agreed written brief to a signed offer. Your own interview schedule sits inside that window, which is why a client who can interview at two days’ notice always beats one who cannot, on identical roles.',
          ],
        },
      ],
    },
    {
      id: 'how-we-vet',
      heading: 'How we vet',
      blocks: [
        {
          kind: 'cards',
          items: [
            {
              title: 'Written role specification',
              body: 'Nothing is sourced until there is a written specification you have approved: the stack, the seniority bar expressed as behaviours rather than years, the genuine must-haves, and the things you would trade away. Every later stage is scored against that document instead of against a feeling.',
            },
            {
              title: 'CV and repository screen',
              body: 'A recruiter reads the CV and, where there is one, the public code. The question being asked is whether the claimed experience was load-bearing: who owned the service, what broke on their watch, and what they changed afterwards.',
            },
            {
              title: 'Recruiter call, thirty minutes, in English',
              body: 'Scored against the specification, and held in English, because a written B2 that collapses in live conversation is the most common inflation on a CV in this market. Notice period and rate expectation are settled here, not discovered at offer stage.',
            },
            {
              title: 'Technical interview by an engineer',
              body: 'An engineer runs it, against your stack, as a live problem or an architecture conversation. Take-home exercises never exceed two hours. The output is a written note saying where the candidate is strong and where they fall short of your specification.',
            },
            {
              title: 'Reference call',
              body: 'One call with somebody who managed or reviewed their work, asked specifically rather than generally: what did this person own, and what would you not hand them. Vague references are themselves a result.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'We do not publish a rejection ratio. It could be computed, but with a record this size the denominator is far too small for the number to carry meaning, and a manufactured funnel statistic is exactly the sort of claim this site exists to stop making.',
          ],
        },
      ],
    },
    {
      id: 'what-a-shortlist-contains',
      heading: 'What you get with a shortlist',
      blocks: [
        {
          kind: 'list',
          items: [
            'Three to five profiles rather than twenty. If only two are defensible, you receive two.',
            'Stack, years, and what the person actually owned in their last two roles.',
            'Current notice period and the earliest start date that is real rather than hoped for.',
            'Timezone, and the hours they will genuinely overlap with your team.',
            'English level, assessed in a live call rather than copied off the CV.',
            'An indicative rate for that specific person, not a band for their job title.',
            'A written note on why they cleared the bar and where they are weaker than your specification.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The last line is the one that matters. Every shortlist names a weakness per candidate, because a profile presented without one is a profile nobody read carefully, and you will find the weakness in week three anyway.',
          ],
        },
      ],
    },
    {
      id: 'choosing-between-the-three-models',
      heading: 'Choosing between the three models',
      blocks: [
        {
          kind: 'table',
          caption: 'When a direct B2B contract fits, when hourly collaboration fits, and when outsourcing fits',
          columns: ['Situation', 'Direct B2B', 'Hourly through TalentSync', 'Outsourced to a TalentSync team'],
          rows: [
            {
              label: 'You already know you need the person for a year or more',
              cells: ['Cheaper over that horizon, and better for the engineer.', 'You would be paying for flexibility you never use.', 'Only if the work is a scoped deliverable rather than a seat.'],
            },
            {
              label: 'The end date is genuinely unknown',
              cells: ['Awkward — you carry the commitment.', 'This is what the model is for.', 'A dedicated team on a monthly basis works; a fixed price does not.'],
            },
            {
              label: 'You want fewer hours than a full week',
              cells: ['Rarely worth the paperwork.', 'Normal, and priced for it.', 'Not a fit — a team needs a scope, not a part-week.'],
            },
            {
              label: 'You want someone else accountable for delivery',
              cells: ['No — you manage the engineer.', 'No — you manage the engineer.', 'Yes. A TalentSync technical lead owns delivery against a written plan.'],
            },
            {
              label: 'You want one invoice from one counterparty',
              cells: ['No — the engineer invoices you directly.', 'Yes, one invoice a month from us.', 'Yes, per milestone or per month, from us.'],
            },
            {
              label: 'You want cover if an engineer leaves',
              cells: ['A replacement window fixed in the contract.', 'Continuous, for as long as the engagement runs.', 'Ours to solve — the team, not the person, is the commitment.'],
            },
            {
              label: 'You may want to employ them later',
              cells: ['Simple, because you already hold the contract.', 'Possible, on conversion terms agreed at the start.', 'Possible at the end of the project, on terms agreed at the start.'],
            },
          ],
        },
      ],
    },
    {
      id: 'stacks-we-place-into',
      heading: 'Stacks we place into',
      blocks: [
        {
          kind: 'prose',
          body: [
            'The pill list in the summary rail is where our network is genuinely deep — meaning we have either placed into it or can name the engineers we would call this week. Treat anything absent from it as a longer search rather than an impossibility.',
          ],
        },
        {
          kind: 'list',
          heading: 'Stacks we do not place into',
          items: [
            'Rust, Elixir and Scala. All present in the region, none of them in our network. Ask, and the answer will be a month rather than a fortnight.',
            'Mainframe, COBOL and AS/400. No bench, and no credible route to building one for a single role.',
            'Salesforce, SAP and ServiceNow. A separate market with separate recruiters who are better at it than we are.',
            'Anything gated behind a national security clearance in your country.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Publishing four categories we decline costs us less than one failed search costs you. It also spares your team the six weeks it takes to discover the gap by watching a shortlist fail to arrive.',
          ],
        },
      ],
    },
    {
      id: 'timelines-honestly',
      heading: 'Timelines, honestly',
      blocks: [
        {
          kind: 'stats',
          items: [
            { value: String(PLACED_ENGINEERS), label: 'engineers placed with European product teams' },
            { value: '10', label: 'of them in the six placements with a recorded timeline' },
            { value: '1–2 weeks', label: 'brief to signature on each of those ten' },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Read those as a distribution of ten events, not as a service level. Three were single senior hires into common stacks, which is the easy case. Seven were paired or tripled hires into one team, which is easier still, because a single interview loop covers several candidates at once.',
            'Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we tell you that at the brief rather than at week three.',
          ],
        },
        {
          kind: 'list',
          heading: 'Three things that slow a search, all of them on your side',
          items: [
            'A seniority bar nobody has written down, so each profile restarts the argument.',
            'More than two interview rounds, while the candidate sits in two other processes.',
            'Feedback that lands a week later. This loses more candidates than rate ever does.',
          ],
        },
      ],
    },
    {
      id: 'if-it-does-not-work-out',
      heading: 'What happens if it does not work out',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Every engagement carries a replacement arrangement, and it sits in the contract you read before signing rather than in a sentence on a marketing page. It fixes a window measured from the engineer’s start date, what triggers the cover, and what happens if we cannot fill the gap inside it.',
            'Two things we will not do. We will not reframe a bad fit as a performance problem in order to run the clock down, and we will not reopen the terms once the situation has gone wrong. Where a replacement is not possible inside the window, the arrangement unwinds on the terms already agreed.',
            'Ask for that clause on the first call. The exact window varies with the model and the role, so we will read it to you rather than describe it — and a partner who will not show it before signature has told you something useful.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'JavaScript and TypeScript', items: ['React', 'Angular', 'Node.js', 'NestJS', 'Next.js'] },
    { group: '.NET and C#', items: ['ASP.NET Core', 'Entity Framework', 'Blazor'] },
    { group: 'Python', items: ['Django', 'FastAPI', 'Flask', 'Celery'] },
    { group: 'Java', items: ['Spring Boot', 'Hibernate', 'Kafka'] },
    { group: 'Mobile', items: ['Swift', 'Kotlin', 'Flutter', 'React Native'] },
    { group: 'Cloud and platform', items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'] },
    { group: 'Industrial', items: ['PLC', 'SCADA', 'Siemens TIA'] },
  ],

  seniorities: [
    {
      label: 'Senior',
      detail:
        'Where nearly every placement sits. The bar is ownership rather than years: has this person run something in production, been woken up by it, and changed the design as a result.',
    },
    {
      label: 'Lead and architect',
      detail:
        'Placed, but slower. Expect to run past the two-week mark and to interview fewer people, because that layer is thin in every market we source from.',
    },
    {
      label: 'Mid-level',
      detail:
        'Only into a team that already has somebody senior to lead them. Where the plan is a mid-level hire with nobody to review the work, we will say plainly that it will not go well.',
    },
  ],

  coverage: {
    summary:
      'We source across the region and place mostly from Moldova and Romania. At UTC+2 the engineer’s working day overlaps a Western European one almost completely.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  engagementModels: ['b2b', 'hourly', 'outsourcing'],

  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior Python Developer',
      count: 1,
      outcome: 'One week from written brief to signed offer.',
      href: '/case-studies/qualiwise/',
    },
    {
      client: 'Silvertalent',
      role: 'Full-Stack Developers, React and .NET',
      count: 3,
      outcome: 'Three engineers into a single team, all signed inside a fortnight.',
      href: '/case-studies/silvertalent/',
    },
    {
      client: 'SocialBee',
      role: 'Senior Full-Stack Developers, Java and Angular',
      count: 2,
      outcome: 'A paired hire into an established product team, closed in two weeks.',
    },
  ],

  faqs: [
    {
      question: 'How long does it take to hire a developer through TalentSync?',
      answer:
        'Where we recorded the timeline, the engineer signed within one to two weeks of the brief: a Senior Python Developer for Qualiwise in one week, a Senior Frontend Developer for Foodamigos in one week, and full-stack teams for SocialBee and Silvertalent and an architect-and-developer pair for OptimEyes in two. Narrow or unusual roles take longer, and we say so at the brief.',
    },
    {
      question: 'How many candidates will we see?',
      answer:
        'Usually three to five profiles in the first shortlist, not twenty. We screen against a written role specification you approve before we start, so a shortlist is a set of engineers we would each defend individually, with a note on where each one is weaker than the brief.',
    },
    {
      question: 'What happens if the developer does not work out?',
      answer:
        'We replace them. The replacement window and terms are set in the contract before you sign, and we will show you that clause on the first call rather than after. If a replacement is not possible within the window, the arrangement is unwound on the terms agreed, not renegotiated.',
    },
    {
      question: 'Do we interview the candidates ourselves?',
      answer:
        'Yes, always, and this is not optional. You make the hiring decision, run whatever technical process you already use, and reject anyone you want without explanation. Our screening exists to protect your interview time, not to replace your judgement about who joins your team.',
    },
    {
      question: 'Do you charge a placement fee or an hourly margin?',
      answer:
        'All three exist and you choose. Direct B2B recruitment is a one-time fee, after which the engineer invoices you directly. Hourly collaboration is a single blended rate per hour worked, margin included. Outsourcing is a written estimate — a fixed price for a fixed scope, or a monthly dedicated-team rate — agreed before work starts.',
    },
    {
      question: 'Can we hire the developer permanently later?',
      answer:
        'Yes. Engineers on an hourly arrangement can convert to a direct B2B contract you hold, or to employment if you have a local entity, on conversion terms agreed at the start rather than negotiated under pressure. We would rather you keep the engineer than lose them over a fee argument.',
    },
  ],

  internalLinks: [
    { anchor: 'the Eastern European market country by country', href: '/tech-recruitment-eastern-europe/' },
    { anchor: 'recruiting in Moldova', href: '/technical-recruitment-moldova/' },
    { anchor: 'how a direct B2B contract works', href: '/b2b-engineer-recruitment/' },
    { anchor: 'engaging the developer hourly instead', href: '/hourly-engineering-talent/' },
    { anchor: 'outsourcing the whole project to a dedicated team', href: '/software-development-outsourcing/' },
    { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
    { anchor: 'backend developers', href: '/hire-backend-developers/' },
    { anchor: 'the full case study record', href: '/case-studies/' },
  ],

  cta: {
    heading: 'Send us one role',
    body: 'You will have a written role specification and an indicative rate the same day.',
    primary: {
      label: 'Book a shortlist call',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: {
      label: 'Email the role and get a quote',
      href: 'mailto:victor@talentsync.eu?subject=Engineering%20request%20%E2%80%93%20%5BCompany%20name%5D',
      external: true,
    },
  },

  schemaTypes: ['Service'],
  serviceType: 'Software developer recruitment',
}
