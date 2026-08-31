/**
 * `/hire-full-stack-developers/` — 02-page-content.md §10.
 *
 * The one thing only this page can say: MULTI-ENGINEER TEAM SCALING. Two named
 * clients each took a small squad rather than a single hire, and both squads
 * signed inside two weeks — three React/.NET engineers for Silvertalent and two
 * Java/Angular engineers for SocialBee. That is the strongest evidence on the
 * site and the only place it belongs, so the page is built around the mechanics
 * of hiring three at once rather than around the word "full-stack".
 *
 * `engagementModels: []` — Part 0 keeps BLOCK B and BLOCK C off the role pages.
 * No link points at a `draft: true` route (D1.1).
 */

import type { ServicePage } from '../types'

export const hireFullStackDevelopers: ServicePage = {
  slug: 'hire-full-stack-developers',
  label: 'Full-Stack Developers',
  metaTitle: 'Hire Full-Stack Developers, Eastern Europe | TalentSync',
  metaDescription:
    'Hire full-stack developers from Eastern Europe: React/.NET and Java/Angular. Five full-stack engineers placed across SocialBee and Silvertalent.',
  h1: 'Hire Full-Stack Developers from Eastern Europe',

  answerParagraph:
    'TalentSync has placed five senior full-stack developers from Eastern Europe across two teams: three React and .NET engineers for Silvertalent and two Java and Angular engineers for SocialBee, each team scaled within two weeks of the brief. Engineers contract with you on B2B terms or work hourly, inside your codebase and your review standards.',

  whoFor: {
    audience: 'Product teams adding a small squad rather than a single engineer',
    body: [
      'Teams who need two, three or four engineers who can each own a vertical slice — schema through interface — rather than a front-end specialist waiting on a back-end specialist to unblock them.',
      'Founders and heads of engineering scaling a product team after a funding round or a customer commitment, where the constraint is how fast people can be onboarded rather than how fast they can be found.',
      'It is a poor fit if the work is deep front-end craft, heavy data engineering or platform work. Those are specialist hires and we will say so rather than sell you a generalist who is stronger on one side anyway.',
    ],
  },

  problem: [
    'Hiring one full-stack engineer is a search. Hiring three at once is a different problem, and most agencies run it as three copies of the first one — three separate pipelines, three different bars, three start dates in the same week, and an onboarding load your team absorbs while still shipping.',
    'The second failure is definitional. “Full-stack” on a CV can mean an engineer who owns features end to end, or a back-end developer who has changed some CSS. Both write it the same way, and a recruiter who cannot read the code cannot tell them apart.',
    'We run multi-hire briefs as one search against one bar, we tell you which side of the stack each engineer is genuinely stronger on, and we stagger the starts so your team onboards one person at a time.',
  ],

  sections: [
    {
      id: 'scaling-a-team-not-a-seat',
      heading: 'Scaling a team, not filling a seat',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Both of our named full-stack engagements were multi-engineer. Silvertalent took three React and .NET developers; SocialBee took two senior Java and Angular developers. Neither was a gap-filling hire, and that changes what the search has to get right.',
            'A group hire has failure modes a single hire does not. Three engineers at the same nominal seniority can still arrive with three different bars if they came from three separate pipelines. Three people who all want to lead will spend the first month negotiating instead of shipping. And three start dates in the same week means your senior engineers are onboarding rather than delivering, which is a cost on your side that no shortlist shows.',
          ],
        },
        {
          kind: 'list',
          heading: 'How we run a multi-hire brief differently',
          items: [
            'One search, one bar. The group is calibrated against each other before you see any of them, so the third engineer is not visibly weaker than the first.',
            'One lead at most. If you want a lead in the group we screen for exactly one, and we tell the others what the shape of the team is before they accept.',
            'Staggered starts by default, usually a week or two apart, unless you tell us your team can absorb them together.',
            'Deliberate overlap in stacks, so no single engineer is the only person who can touch a part of the system on day one.',
            'A single point of contact for the whole group, so scheduling five interviews does not become five separate email threads.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The honest counterweight: onboarding three engineers is a load on your team, not on ours. If you have one senior engineer available to answer questions, take two people and not four. We would rather say that at the brief than watch a good group hire fail on your side.',
          ],
        },
      ],
    },
    {
      id: 'silvertalent-react-dotnet',
      heading: 'Silvertalent: three React and .NET engineers in two weeks',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Silvertalent is a talent-acquisition platform. The brief was three full-stack developers on React and .NET, and the team was scaled within two weeks of the brief.',
            'Two things made it fast. The stack pairing is the deepest one in the region — .NET is strong across Romania and Moldova, and React is the default front end in the same product companies — so the pool was there rather than having to be found. And the brief described the work rather than the person: which parts of the product the engineers would own, what the review process looked like, and what the first month was expected to produce.',
            'The three engineers were calibrated against one another before the client saw anyone, so the shortlist was a group with one bar rather than three separate searches that happened to finish at the same time.',
          ],
        },
        {
          kind: 'stats',
          items: [
            { value: '3', label: 'full-stack React and .NET engineers, Silvertalent' },
            { value: '2 weeks', label: 'from brief to a scaled team' },
            { value: '1', label: 'shortlist, calibrated against a single bar' },
          ],
        },
      ],
    },
    {
      id: 'socialbee-java-angular',
      heading: 'SocialBee: two senior Java and Angular engineers in two weeks',
      blocks: [
        {
          kind: 'prose',
          body: [
            'SocialBee is a social media management platform. The brief was two senior full-stack developers on Java and Angular, and the team was scaled within two weeks.',
            'Java and Angular is the other pairing our record is deep in, and it comes from a different pool: enterprise and fintech backgrounds, engineers used to transactional correctness, longer-lived codebases and release processes that have a change board attached. That is a different temperament from the product-company Node engineer, and for a platform with paying customers and years of accumulated behaviour it is usually the right one.',
            'Both engineers were senior, which for a two-person hire matters more than it does for a five-person one: there is nobody else in the group to carry a weaker third.',
          ],
        },
      ],
    },
    {
      id: 'what-full-stack-means-here',
      heading: 'What full-stack means in our shortlists',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Our bar is that the engineer can take a feature from schema to interface and be genuinely productive on both sides within a week. Not “has seen React”. Not “worked alongside a front-end team”. Productive, on both sides, in the first week.',
            'Nearly everyone is stronger on one side. We tell you which side and roughly by how much, because the useful shortlist for a team that already has three front-end engineers is different from the useful shortlist for a team that has none.',
          ],
        },
        {
          kind: 'table',
          caption: 'Full-stack pairings we place, how deep the regional pool is, and what each pool is usually good at',
          columns: ['Pairing', 'Pool depth in the region', 'What that pool has usually built'],
          rows: [
            {
              label: 'React + .NET',
              cells: [
                'Deepest. Three placed with Silvertalent.',
                'Long-lived product platforms, often with a decade of history behind them.',
              ],
            },
            {
              label: 'Angular + Java',
              cells: [
                'Deep. Two placed with SocialBee.',
                'Enterprise and fintech systems where correctness and audit matter more than speed.',
              ],
            },
            {
              label: 'React + Node / TypeScript',
              cells: ['Well supplied.', 'Product companies shipping several times a week, one language across the stack.'],
            },
            {
              label: 'React + Python',
              cells: ['Well supplied.', 'Data-heavy products and internal platforms with real pipelines behind the UI.'],
            },
            {
              label: 'Vue + anything',
              cells: ['Thinner, slower to fill.', 'Smaller product teams and agencies. We flag the timeline before you brief.'],
            },
          ],
        },
      ],
    },
    {
      id: 'one-engineer-or-two-specialists',
      heading: 'One full-stack engineer or two specialists?',
      blocks: [
        {
          kind: 'prose',
          body: [
            'This is the decision most buyers are actually making, and the title on the job advert is usually the last thing that should settle it. Tell us the work rather than the role and we will say which shape fits.',
          ],
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'A full-stack hire fits when',
              body: 'The team is small, the split between front-end and back-end work is uncertain or moves month to month, and someone needs to own a vertical slice of the product end to end without a handoff in the middle of every feature.',
            },
            {
              title: 'Two specialists fit when',
              body: 'The front-end work is genuine craft — design systems, accessibility, animation, performance budgets — or the back-end work is heavy data, infrastructure or integration. Both halves are then full jobs, and a generalist will be mediocre at the one they like less.',
            },
            {
              title: 'The honest middle',
              body: 'Most teams under fifteen engineers are better served by full-stack hires with a declared stronger side, and most teams above that are better served by specialists. We will tell you which side of that line the brief sounds like.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'If the answer is a specialist, we would rather place the right one: see backend developers for the server-side half, or ask us and we will scope the front-end search separately.',
          ],
        },
      ],
    },
    {
      id: 'working-in-an-existing-codebase',
      heading: 'Working in an existing codebase',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Almost nothing we place is greenfield. The engineer is joining a codebase with history, conventions someone chose for a reason nobody wrote down, and at least one module everybody avoids. That is a specific screen, not a general one.',
          ],
        },
        {
          kind: 'list',
          heading: 'What we screen for on brownfield work',
          items: [
            'Reads before writing. Can describe how they got oriented in their last unfamiliar codebase, concretely, without saying “I read the documentation”.',
            'Follows the patterns already in the repository, even the ones they would not have chosen, and raises the disagreement separately from the pull request.',
            'Opens small pull requests. A first week that produces one 2,000-line change is a warning sign, not a productivity signal.',
            'Asks rather than proposing a rewrite in week two. Suggesting the rewrite in month four with evidence is a different and much better answer.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'References are checked on exactly this point. “Did they respect how you already do things, or did they spend three months trying to change it” is the most predictive reference question we ask, and it is the one that most often changes our mind about a strong interview.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Front end', items: ['React', 'Angular', 'Vue', 'TypeScript', 'Next.js'] },
    { group: 'Back end', items: ['.NET / C#', 'Java / Spring Boot', 'Node.js / NestJS', 'Python'] },
    { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Redis'] },
    { group: 'Delivery', items: ['Docker', 'Azure DevOps', 'GitHub Actions', 'REST', 'GraphQL'] },
  ],

  seniorities: [
    {
      label: 'Senior (5–12 years)',
      detail:
        'What both named engagements were. A senior full-stack engineer here has shipped features end to end in a codebase they did not start, can explain a trade-off they made between front-end and back-end effort, and does not need a specialist standing behind them on either side.',
    },
    {
      label: 'Lead',
      detail:
        'A distinct brief, not a senior with a better title. A lead in our shortlists has run a team, made an architecture call they later had to defend, and can describe one they got wrong. If you are hiring three engineers at once, exactly one of them should be a lead.',
    },
    {
      label: 'Mid-level (2–5 years)',
      detail:
        'Useful inside a group hire where a senior is already leading, and good value when the vertical slices are well defined. Placed on their own only where your team has the review capacity to carry them, and we will say so rather than fill the seat.',
    },
  ],

  coverage: {
    summary:
      'Full-stack engineers are sourced across Eastern Europe, mainly Moldova and Romania, where the React/.NET and Angular/Java pools are deepest. Eastern European Time is UTC+2, so a Western European team gets a full overlapping day.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off these and links out instead.
  engagementModels: [],

  evidence: [
    {
      client: 'Silvertalent',
      role: 'Full-stack developers, React and .NET',
      count: 3,
      outcome:
        'A talent-acquisition platform scaling its engineering team. All three signed and the team was scaled within two weeks of the brief.',
      href: '/case-studies/silvertalent/',
    },
    {
      client: 'SocialBee',
      role: 'Senior full-stack developers, Java and Angular',
      count: 2,
      outcome:
        'A social media management platform. Both engineers signed and the team was scaled within two weeks of the brief.',
    },
  ],

  faqs: [
    {
      question: 'What does “full-stack” mean in your shortlists?',
      answer:
        'That the engineer can take a feature from schema to interface and be genuinely productive on both sides within a week. Nearly everyone is stronger on one side, so we tell you which side and by how much. Anyone who has merely “seen React” does not get described as full-stack.',
    },
    {
      question: 'Which front-end and back-end pairings do you place most?',
      answer:
        'React with .NET and Angular with Java are the two most common in our record — three React/.NET engineers for Silvertalent and two Java/Angular engineers for SocialBee. React with Node or Python is also well supplied. Vue is thinner in the regional pool and takes longer to fill.',
    },
    {
      question: 'Should we hire one full-stack engineer or a front-end and a back-end specialist?',
      answer:
        'One full-stack engineer suits a small team where the load split is uncertain and someone must own a vertical slice end to end. Two specialists suit deep front-end craft work or heavy data and infrastructure work. Tell us the work rather than the title and we will say which.',
    },
    {
      question: 'Can full-stack engineers work productively in an existing codebase?',
      answer:
        'That is most of what we place them into, and it is a specific screen. We look for engineers who read before they write, follow the patterns already in the repo, open small pull requests and ask questions instead of proposing a rewrite in week two. References are checked on exactly this.',
    },
    {
      question: 'Do you place full-stack engineers who can lead?',
      answer:
        'Yes, though it is a distinct brief. A lead in our shortlists has run a team, made an architecture call they later had to defend, and can describe a decision they got wrong. Note that if you hire three engineers at once, only one of them should be a lead.',
    },
    {
      question: 'Have you placed several engineers into one team at once?',
      answer:
        'Twice, both within two weeks: three full-stack React and .NET developers for Silvertalent and two senior Java and Angular developers for SocialBee. Multi-hire briefs need a consistent seniority bar and staggered start dates, because onboarding three engineers in the same week is a load on your team, not ours.',
    },
    {
      question: 'How long does a multi-engineer brief take to fill?',
      answer:
        'Across our five most recent placements — nine engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief. Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we say so at the brief.',
    },
  ],

  internalLinks: [
    { anchor: 'backend developers', href: '/hire-backend-developers/' },
    { anchor: 'how the search runs', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'contracting on B2B terms', href: '/b2b-engineer-recruitment/' },
    { anchor: 'hourly collaboration for uncertain workloads', href: '/hourly-engineering-talent/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'the SocialBee and Silvertalent engagements', href: '/case-studies/' },
  ],

  cta: {
    heading: 'Tell us how many engineers you need',
    body: 'Multi-hire briefs get a single shortlist with a consistent bar, not three separate searches.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'Full-stack developer recruitment',
}
