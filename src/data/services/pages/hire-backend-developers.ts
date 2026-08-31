/**
 * `/hire-backend-developers/` — 02-page-content.md §7.
 *
 * The one thing only this page can say: the integration-heavy backend work.
 * Orange's network integration with the Barça Mobile MVNO is carrier-grade
 * systems integration and no other route on this site can claim it. Everything
 * else here is about backend JUDGEMENT — API versioning, data modelling under a
 * changing requirement, on-call — because a role page that only swaps a noun is
 * a doorway page.
 *
 * `engagementModels: []` — Part 0 keeps BLOCK B and BLOCK C off the role pages
 * and links out instead. No link points at a `draft: true` route (D1.1), which
 * is why the spec's DevOps and AI anchors are absent.
 */

import type { ServicePage } from '../types'

export const hireBackendDevelopers: ServicePage = {
  slug: 'hire-backend-developers',
  label: 'Backend Developers',
  metaTitle: 'Hire Backend Developers, Eastern Europe | TalentSync',
  metaDescription:
    'Hire senior backend developers from Eastern Europe: Python, Java, .NET and Node, including telecom-grade integration work. See the roles filled.',
  h1: 'Hire Backend Developers from Eastern Europe',

  answerParagraph:
    'TalentSync places senior backend developers from Eastern Europe in Python, Java, .NET and Node.js. Recent backend placements include a senior Python developer for Qualiwise, filled in one week, and Java engineers for SocialBee. Engineers contract with you directly on B2B terms or work hourly through us, inside your codebase and your standards.',

  whoFor: {
    audience: 'Product engineering teams adding senior backend capacity',
    body: [
      'Engineering leaders who already have a backend team and a technical interviewer, and who need one to three more senior people in Python, Java, .NET or Node.js without opening an entity abroad.',
      'Teams whose bottleneck is a service nobody owns: the billing integration that only one person understands, the API that cannot be versioned without breaking a consumer, the schema that has outgrown the migration path someone chose three years ago.',
      'It is a poor fit if you have nobody senior to interview the shortlist, or if you want a supplier to own delivery. We add engineers to your team; we do not take the project.',
    ],
  },

  problem: [
    'Senior backend roles stall on the same three things: a shortlist screened by a recruiter who cannot read the code, a take-home nobody senior will complete, and four interview rounds spread over five weeks while the candidate accepts elsewhere.',
    'The screening failure is the expensive one. Backend work is mostly judgement about things that are invisible in a CV — what to do when a requirement changes after the schema is live, when to version an API and when to refuse, how to make a retry safe. A keyword match on “Python, 8 years” tells you none of it.',
    'An engineer runs our technical interview, the take-home never exceeds two hours, and you see people who have actually run a service in production rather than people who interview well.',
  ],

  sections: [
    {
      id: 'backend-roles-we-fill',
      heading: 'Backend roles we fill',
      blocks: [
        {
          kind: 'prose',
          body: [
            '“Backend developer” covers five jobs that fail in different ways, and the shortlist is only useful once we know which one you are hiring for. The table below is the question we ask at the brief: what does this person own on their first day, and what would make you regret the hire in month three.',
          ],
        },
        {
          kind: 'table',
          caption: 'Backend roles, what each one owns, and the seniority signal we screen for',
          columns: ['Role', 'What it owns', 'Seniority signal'],
          rows: [
            {
              label: 'API / service engineer',
              cells: [
                'Designs and runs one or more HTTP or gRPC services end to end.',
                'Has versioned a public API without breaking a consumer.',
              ],
            },
            {
              label: 'Data-intensive backend engineer',
              cells: [
                'Schema design, query performance, batch and streaming pipelines.',
                'Has migrated a schema under production load.',
              ],
            },
            {
              label: 'Integration engineer',
              cells: [
                'Third-party and carrier-side systems, provisioning, retries, reconciliation.',
                'Has debugged a counterparty who would not fix their end.',
              ],
            },
            {
              label: 'Platform backend engineer',
              cells: [
                'Shared libraries, service templates, the paved road other teams build on.',
                'Has removed work from other teams rather than adding it.',
              ],
            },
            {
              label: 'Backend lead',
              cells: [
                'Technical direction for a small team, plus their own delivery.',
                'Has said no to a requirement and been right.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'The two that get conflated most often are the API engineer and the integration engineer. Both write services; only one of them is comfortable spending a fortnight on a counterparty’s staging environment that is down every second afternoon. If the role is the second one, say so at the brief — it changes the whole shortlist.',
          ],
        },
      ],
    },
    {
      id: 'languages-and-frameworks',
      heading: 'Languages and frameworks',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A framework name tells you very little on its own. What matters is the kind of system the regional pool has actually built in it, because that is what the engineer’s instincts are trained on. Here is the honest shape of each pool we recruit from.',
          ],
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'Python',
              body: 'FastAPI, Django and Flask. The regional pool skews towards data-heavy services and internal platforms rather than thin CRUD wrappers, so these engineers usually arrive comfortable with queues, scheduled work and a database that is bigger than memory.',
            },
            {
              title: 'Java',
              body: 'Spring Boot, mostly out of enterprise and fintech backgrounds, which means real experience of transactional correctness, audit requirements and release processes with a change board attached. Slower-moving habits, and in the right role that is the point.',
            },
            {
              title: '.NET and C#',
              body: 'Strong across Romania and Moldova, frequently on systems that started on the .NET Framework and were carried forward rather than rewritten. If your estate has a decade of history in it, this is the pool that has seen your problem before.',
            },
            {
              title: 'Node.js and TypeScript',
              body: 'NestJS and Express. Common in product companies, so these engineers usually arrive fluent in the front end they serve and used to shipping several times a week rather than several times a quarter.',
            },
            {
              title: 'Go',
              body: 'Present but thinner in the region than the other four, and concentrated in infrastructure and platform teams. Go roles take longer to fill and we say so at the brief rather than at week three.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Around the edges we place PHP, Kotlin and C++ engineers, and occasionally Elixir or Scala. Those searches are slower and we scope them honestly before you commit to a timeline. Ask before you brief and we will tell you whether the pool is there.',
          ],
        },
      ],
    },
    {
      id: 'integration-work',
      heading: 'Integration work: the Orange and Barça Mobile MVNO engagement',
      blocks: [
        {
          kind: 'prose',
          body: [
            'One engagement covered Orange network integration with the Barça Mobile MVNO. That is carrier-side systems integration: subscriber provisioning, SIM and number lifecycle, a telecom counterparty with its own release calendar, and failure modes you cannot reproduce on a laptop.',
            'The engineer we placed worked on system architecture and CI/CD for that launch. We are describing the engineer’s scope, not claiming TalentSync delivered the platform — the client’s own team built the product.',
            'Integration work of that kind rewards a different temperament from product backend work. Progress is measured in cleared blockers rather than merged features, half the debugging happens in someone else’s logs, and the engineer has to be able to write the email that gets a counterparty to fix their end without escalating it into a contractual argument.',
          ],
        },
        {
          kind: 'list',
          heading: 'What we screen for on integration briefs',
          items: [
            'Has worked against a system they could not change, could not read the source of, and could not get fixed quickly.',
            'Treats retries, idempotency keys and reconciliation as design decisions rather than as things to add after the first incident.',
            'Can describe a contract test or a recorded-fixture setup they built so a flaky counterparty stopped breaking their CI.',
            'Writes the runbook, because on integration work the person who understands the failure is rarely the person on call for it.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Engineers with regulated, telecom or carrier-grade integration backgrounds are rarer than general product backend engineers and take longer to source, so brief us earlier for those roles.',
          ],
        },
      ],
    },
    {
      id: 'backend-placements',
      heading: 'Backend placements on record',
      blocks: [
        {
          kind: 'stats',
          items: [
            { value: '9', label: 'engineers placed across five clients' },
            { value: '1 week', label: 'from brief to signature, Qualiwise senior Python' },
            { value: '2', label: 'Java engineers placed with SocialBee' },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Across our five most recent placements — nine engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief.',
            'Qualiwise is the cleanest backend example: an AI copilot platform needed one senior Python developer, the brief was specific about the system rather than about the years of experience, and the engineer was signed within a week. The SocialBee pair are Java and Angular full-stack engineers — they are counted here because the backend half is real, and the full-stack page carries the detail so the two pages are not both claiming the same two people.',
            'Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we tell you that at the brief rather than at week three.',
          ],
        },
      ],
    },
    {
      id: 'how-we-test-backend-skill',
      heading: 'How we test backend skill',
      blocks: [
        {
          kind: 'list',
          heading: 'What the technical interview covers',
          items: [
            'A data-modelling problem where the requirement changes halfway through the conversation.',
            'An API-versioning question with a consumer you are not allowed to break.',
            'One concurrency or idempotency scenario, worked through out loud.',
            'A short read of unfamiliar code, to see whether they ask about it or start rewriting it.',
            'What they broke in production, and what they changed afterwards.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'An engineer runs this interview, not a recruiter. Take-homes never exceed two hours, because the senior people worth hiring will not spend a weekend on one and the ones who will are usually the ones with time on their hands.',
            'You get the notes, not a score. A one-page summary of what the engineer was strong on, what they were vague about, and the question we would ask them if we had another half hour — so your own interview starts where ours finished instead of repeating it.',
          ],
        },
      ],
    },
    {
      id: 'on-call-and-handover',
      heading: 'On-call, handover and the practical bits',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A contract engineer can take on-call, but only if it is agreed and priced at the start. An engineer who accepts it silently will resent it by month three, so tell us at the brief and we screen for people who actively want it.',
            'Handover expectations belong in the same conversation: what gets documented, who inherits the runbook, and how much notice each side gives. None of that is difficult, and all of it is expensive to discover late.',
          ],
        },
        {
          kind: 'list',
          heading: 'Worth settling before the engineer starts',
          items: [
            'Whether they are in the on-call rotation, from which week, and at what compensation.',
            'Who owns production access, and how it is revoked on the last day rather than three months later.',
            'What “documented” means to you: an architecture note, a runbook per service, or comments in the pull request.',
            'The notice period on both sides, and whether a handover fortnight is inside it or after it.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Python', items: ['FastAPI', 'Django', 'Flask', 'Celery'] },
    { group: 'Java', items: ['Spring Boot', 'Hibernate', 'Kafka'] },
    { group: '.NET', items: ['ASP.NET Core', 'Entity Framework', 'C#'] },
    { group: 'Node.js', items: ['NestJS', 'Express', 'TypeScript'] },
    { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'] },
    { group: 'Runtime', items: ['Docker', 'Kubernetes', 'RabbitMQ', 'gRPC'] },
  ],

  seniorities: [
    {
      label: 'Senior (5–12 years)',
      detail:
        'The bulk of what we place, and the test is ownership rather than years. Has this person run a service end to end, carried a pager for it, migrated a schema under production load, and pushed back on a requirement that was wrong. An engineer who has only ever added endpoints to someone else’s service can have eight years and still interview as a mid.',
    },
    {
      label: 'Lead',
      detail:
        'Technical direction for a small team alongside their own delivery. The signal we look for is an architecture decision they later had to defend and a decision they got wrong and can describe without flinching. Rarer, slower to source, and worth briefing us on early — a lead search is not a senior search with a different title on it.',
    },
    {
      label: 'Mid-level (2–5 years)',
      detail:
        'Placed only where you already have a senior engineer leading them, because a mid engineer on an unowned service becomes your problem rather than theirs. Where that structure exists they are good value and they stay. Where it does not, we will say so rather than fill the seat.',
    },
  ],

  coverage: {
    summary:
      'Engineers are sourced across Eastern Europe and are based mainly in Moldova and Romania. Eastern European Time is UTC+2, so a Western European team gets a complete overlapping working day.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off these and links out instead.
  engagementModels: [],

  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior backend developer, Python',
      count: 1,
      outcome:
        'An AI copilot platform scaling its engineering team. Signed within one week of the brief.',
      href: '/case-studies/qualiwise/',
    },
    {
      client: 'Barça Mobile',
      role: 'Backend and platform engineer, Orange MVNO integration',
      count: 1,
      outcome:
        'The engineer we placed worked on system architecture and CI/CD for the launch. That is the engineer’s scope — the platform was the client’s own delivery.',
      href: '/case-studies/barca-mobile/',
    },
    {
      client: 'SocialBee',
      role: 'Java / Angular full-stack engineers',
      count: 2,
      outcome:
        'Both signed within two weeks of the brief. The full-stack page carries the detail so the two pages do not claim the same engineers.',
    },
  ],

  faqs: [
    {
      question: 'Which backend stacks do you actually cover?',
      answer:
        'Python, Java, .NET and Node.js are where our network is deepest, and they cover most of what our clients run. Go appears less often in the region and takes longer to fill. If your stack is Elixir, Rust or Scala, ask us before you brief — we will tell you honestly.',
    },
    {
      question: 'Do you place engineers with telecom or regulated integration experience?',
      answer:
        'Yes. One engagement covered Orange’s network integration with the Barça Mobile MVNO, which is carrier-grade integration work with a telecom counterparty and its constraints. Engineers with that background are rarer and take longer to source than general product backend engineers, so brief us earlier for those roles.',
    },
    {
      question: 'How do you test backend skill beyond the CV?',
      answer:
        'An engineer runs the technical interview, not a recruiter. We work through a data-modelling problem where the requirement changes mid-conversation, an API-versioning question, and one concurrency or idempotency scenario. Then we ask what they broke in production and what they changed afterwards. Take-homes never exceed two hours.',
    },
    {
      question: 'Can a contract backend engineer take on-call?',
      answer:
        'Yes, if it is agreed and priced at the start rather than assumed. On-call is a real commitment with a real cost, and an engineer who accepts it silently will resent it by month three. Tell us at the brief and we screen for people who genuinely want it.',
    },
    {
      question: 'Do you place backend engineers for legacy modernisation?',
      answer:
        'Yes, and it is a different screen from greenfield work. We look for engineers who have actually strangled a monolith, migrated a schema under production load and worked without tests, rather than people who will propose a rewrite in week two. Say it is legacy in the brief and we will target accordingly.',
    },
    {
      question: 'What seniority do you actually place?',
      answer:
        'Mostly five to twelve years, with the seniority test being ownership rather than years: has this person run a service end to end, carried a pager, and pushed back on a requirement that was wrong. We place mid-level engineers too, but only where you have a senior already leading them.',
    },
  ],

  internalLinks: [
    { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
    { anchor: 'how the search actually runs', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'contracting the engineer on B2B terms', href: '/b2b-engineer-recruitment/' },
    { anchor: 'hourly backend capacity', href: '/hourly-engineering-talent/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'the Orange and Qualiwise engagements', href: '/case-studies/' },
  ],

  cta: {
    heading: 'Send us the service you need built',
    body: 'Bring the architecture diagram if you have one. The shortlist gets sharper.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'Backend developer recruitment',
}
