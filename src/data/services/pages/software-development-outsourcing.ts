/**
 * Route 25 — `/software-development-outsourcing/`. The third engagement model.
 *
 * Added 21 September 2026 (DECISIONS.md D1 amendment, client feedback item 3).
 * This is the one page on the site where TalentSync DOES own delivery: a
 * dedicated team takes responsibility for a complete project, product or
 * component. Every other page describes engineers placed into the client's
 * own team, so the copy here has to be explicit about which side of that line
 * each sentence sits on — and equally explicit that the evidence below is
 * team assembly under the client's technical leadership, not a product we
 * launched.
 *
 * WHAT IS DELIBERATELY MISSING: any rate, range, savings figure or day rate.
 * Pricing is scoped in writing per project (D7, 06-claims). The page publishes
 * the STRUCTURE of an estimate instead.
 */

import { siteConfig } from '@/data/content'
import type { ServicePage } from '../types'

const PRICING_LINE =
  'Transparent pricing tailored to the required seniority, technology stack, and engagement model.'

export const softwareDevelopmentOutsourcing: ServicePage = {
  slug: 'software-development-outsourcing',
  label: 'Software Development Outsourcing',
  metaTitle: 'Software Development Outsourcing | TalentSync',
  metaDescription:
    'Outsource a complete software project, product or component to a dedicated TalentSync team in Eastern Europe: architecture, development, QA and delivery.',
  h1: 'Software Development Outsourcing in Eastern Europe',

  answerParagraph:
    'Software development outsourcing means you hand a complete project, product or technical component to a dedicated TalentSync team, and the team takes responsibility for delivering it — planning and architecture, development, quality assurance, release and ongoing support. You set the outcome, the acceptance criteria and the priorities. Scope and price are estimated in writing before work starts.',

  whoFor: {
    audience: 'Companies that need a product or component delivered, not headcount added',
    body: [
      'Founders and product leaders with a defined thing to build and no engineering team to build it with — or a team that is fully committed to the core product and cannot absorb a second one.',
      'Engineering leaders with a bounded component that sits off the critical path: an integration, a mobile client, an internal tool, a data pipeline, a rebuild of something nobody wants to own in-house.',
      'It does not suit teams that want to direct engineers day to day inside their own sprint. That is hourly collaboration, and it is a better purchase for that need. The comparison table below says which is which.',
    ],
  },

  problem: [
    'Most companies that buy outsourced development get one of two failures. The first is the black box: a team somewhere delivers something on a date, the acceptance criteria were never written down, and the argument about whether it is finished lasts longer than the build did.',
    'The second is the disguised body shop: a supplier sells a fixed-price project, staffs it with whoever is free, and quietly turns it into hours billed against a scope that moves every fortnight. Nobody owns the outcome and the client ends up managing a team they did not hire.',
    'Both failures start before the first line of code, at the estimate. An outsourcing engagement that begins without a written scope, a named team and an agreed definition of done will produce exactly the dispute it was meant to avoid.',
  ],

  sections: [
    {
      id: 'what-you-can-outsource',
      heading: 'What you can hand to a dedicated team',
      blocks: [
        {
          kind: 'cards',
          items: [
            {
              title: 'A complete project',
              body: 'A defined piece of software with a start, an end and acceptance criteria: a new product, a platform migration, a system nobody on your side has time to build. We plan it, staff it, build it, test it and hand it over.',
            },
            {
              title: 'A product, end to end',
              body: 'The full stack of a product your company sells or runs — backend, web front end, mobile client, test automation and release pipeline — built and maintained by one team that stays with it after launch.',
            },
            {
              title: 'A technical component',
              body: 'One bounded part of a larger system: an integration with a third party, an Android or Kotlin Multiplatform client, a reporting service, a data pipeline. Delivered against an interface your team agrees, so it slots into what you already run.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Each of those is delivered by a dedicated team assembled for the work, from the same vetted Eastern European engineers we place directly. The difference from our other two models is who carries the delivery risk: here, we do, against a plan you approved.',
          ],
        },
      ],
    },
    {
      id: 'what-the-team-does',
      heading: 'What the team does, stage by stage',
      blocks: [
        {
          kind: 'list',
          items: [
            'Technical planning and architecture. A Senior Software Architect turns your requirements into a system design, a component breakdown and a delivery plan, and writes down the trade-offs so you can argue with them before they are built.',
            'Software development. Backend Java Developers, Senior Python Developers, Frontend Developers, Full-Stack Developers and Android/Kotlin Multiplatform Specialists, depending on the stack — in a repository you can read at any time.',
            'Quality assurance. A QA Engineer embedded in the team from the first sprint, owning the automated suite and the release gate, rather than a testing phase bolted onto the end.',
            'Delivery. Releases against the agreed plan, a demo at every milestone, and a definition of done written down before the milestone starts.',
            'Ongoing support. After handover, either a maintenance arrangement with the same team or a documented transfer to yours — decided at the estimate, not at the end.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'You see the repository, the backlog and the test results throughout. The team reports against the plan; the code is never somewhere you cannot look.',
          ],
        },
      ],
    },
    {
      id: 'roles-and-technologies',
      heading: 'Roles and technologies available',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A dedicated team is built from the roles below, in the mix the work needs. A component with a fixed interface might be one Senior Software Architect and two developers; a product with a mobile client needs the mobile and QA roles from day one.',
          ],
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'Senior Software Architect',
              body: 'Owns the system design, the component boundaries and the technical plan. Every dedicated team has one, and on a small component it is usually also the lead developer.',
            },
            {
              title: 'Backend Java Developer',
              body: 'Spring Boot services, transactional systems, integrations with counterparties that have their own release calendar. The deepest enterprise pool in the region.',
            },
            {
              title: 'Senior Python Developer',
              body: 'FastAPI and Django services, data-heavy backends, pipelines and scheduled work. The pool skews towards services that outgrow memory rather than thin CRUD.',
            },
            {
              title: 'Frontend Developer',
              body: 'React, Angular and TypeScript. Builds the web client against the API the architect defined, with accessibility and performance treated as requirements rather than polish.',
            },
            {
              title: 'Full-Stack Developer',
              body: 'React with .NET, Angular with Java, or Node with React. Owns a vertical slice end to end, which keeps a small component team small.',
            },
            {
              title: 'Android/Kotlin Multiplatform Specialist',
              body: 'Native Android and shared Kotlin Multiplatform code, for products where the mobile client is the product rather than a companion to it.',
            },
            {
              title: 'QA Engineer',
              body: 'Playwright, Cypress or Selenium suites, API and contract tests, CI integration. Embedded in the team from the first sprint, not added when the bugs arrive.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'The pill list in the summary rail is where our network is genuinely deep. Rust, Elixir, Scala, mainframe and ERP platforms are not on it, and we decline outsourced work in them rather than staff it with people we have not vetted for that stack.',
          ],
        },
      ],
    },
    {
      id: 'outsourcing-vs-hourly-collaboration',
      heading: 'How outsourcing differs from hourly collaboration',
      blocks: [
        {
          kind: 'prose',
          body: [
            'The two models are easy to confuse because the same engineer can work under either. The difference is not the person; it is who owns the outcome, who manages the work, and what you are paying for.',
          ],
        },
        {
          kind: 'table',
          caption: 'Hourly collaboration and software development outsourcing, decision by decision',
          columns: ['Question', 'Hourly collaboration', 'Software development outsourcing'],
          rows: [
            {
              label: 'Who owns delivery',
              cells: [
                'You do. The engineer adds capacity to your team and your team owns the result.',
                'TalentSync does. A dedicated team is accountable for delivering the agreed scope.',
              ],
            },
            {
              label: 'Who manages the engineers',
              cells: [
                'You, day to day, in your standups and your tracker.',
                'The team lead on our side, against a plan you approved. You manage the outcome, not the people.',
              ],
            },
            {
              label: 'How it is priced',
              cells: [
                'A firm hourly rate per named engineer, billed monthly for hours you approved.',
                'A written estimate per scope: fixed price for a fixed scope, or a dedicated-team price per month for open-ended product work.',
              ],
            },
            {
              label: 'What you receive',
              cells: ['Hours worked, inside your codebase and your process.', 'A working deliverable against acceptance criteria, in a repository you own.'],
            },
            {
              label: 'Architecture and roadmap',
              cells: ['Yours entirely. We have no involvement.', 'Proposed by our architect, approved and owned by you. Nothing is built you have not signed off.'],
            },
            {
              label: 'When to choose it',
              cells: [
                'You have a team and a technical lead, and you need more hands for work with an uncertain end date.',
                'You have a defined thing to build and nobody to build it, or a component your team should not be spending its time on.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'If you are unsure which you need, describe the work rather than the model and we will tell you on the first call. Buying capacity when you wanted delivery produces a team you have to manage; buying delivery when you wanted capacity produces a plan you cannot change fast enough.',
          ],
        },
      ],
    },
    {
      id: 'how-the-engagement-begins',
      heading: 'How the engagement begins',
      blocks: [
        {
          kind: 'list',
          heading: 'Five steps, from first email to first sprint',
          items: [
            'Discovery. A call, then a short written brief: what the software has to do, who uses it, what it has to integrate with, what done looks like, and the date that matters. We say on that call whether this is work we should take.',
            'Written estimate. A scope, a proposed team, a plan with milestones, the acceptance criteria per milestone, and the price. It arrives in writing before you commit to anything and it names what is excluded.',
            'Plan and contract. You mark up the estimate, we revise it, and the agreed version becomes the schedule to the contract. The IP assignment, the confidentiality terms and the support arrangement are in the same document.',
            'Team assembly. We source and technically vet each role against the plan and you meet the architect and the lead developer before the team is confirmed. On the OptimEyes engagement the architect and developer pair was integrated within two weeks of the brief; larger teams take longer, and the estimate says how long.',
            'Kickoff. Repository, backlog and environments set up in your name, the first milestone broken into sprints, and a demo date in the calendar before anyone writes code.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Nothing in that sequence is a sales step. If the estimate shows the project is smaller than you thought, or that hourly collaboration would serve you better, that is what the estimate will say.',
          ],
        },
      ],
    },
    {
      id: 'how-an-estimate-works',
      heading: 'How a project is estimated and priced',
      blocks: [
        {
          kind: 'prose',
          body: [
            PRICING_LINE,
            'We do not publish rates, day rates or savings percentages, because none of them describes an outsourced project honestly. What drives the price is the seniority the work needs, the stack, the size of the team, how long it runs, and how much of the delivery responsibility sits with us. All of those are visible in the estimate, line by line.',
          ],
        },
        {
          kind: 'list',
          heading: 'Two ways an estimate is structured',
          items: [
            'Fixed scope, fixed price. For a project or component with acceptance criteria that can be written down in full. Milestones are priced individually, so a change to one does not reprice the whole plan.',
            'Dedicated team, monthly. For product work where the roadmap will move. A named team at an agreed monthly price, a backlog you prioritise, and notice terms fixed in the contract for scaling the team up or down.',
          ],
        },
        {
          kind: 'list',
          heading: 'What every estimate states',
          items: [
            'The scope, and what is explicitly out of it.',
            'The team: each role, its seniority, and whether it is full-time on your work.',
            'Milestones, with the acceptance criteria and the demo for each.',
            'How scope changes are raised, estimated and approved before they are built.',
            'Who owns the code and when the assignment takes effect — on payment of each milestone, not at the end.',
            'What support looks like after handover, and what it costs.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'To request an estimate, email the brief you have — a document, a deck, a paragraph — with your company name in the subject line and we will come back with questions before we come back with a number. A short call first is often quicker; the button at the top of the page books one.',
          ],
        },
      ],
    },
    {
      id: 'what-you-keep-control-of',
      heading: 'What you keep control of',
      blocks: [
        {
          kind: 'list',
          items: [
            'The outcome. Acceptance criteria are yours, written before each milestone and applied by you at the demo.',
            'The priorities. On a dedicated-team engagement you order the backlog; on a fixed-scope one you approve every change to it.',
            'The architecture. Proposed by our architect, but nothing is built that you have not signed off, and the design document is yours.',
            'The code. The repository is created in your name from day one, and the IP in each milestone is assigned to you when that milestone is paid for.',
            'The exit. You can take the team hourly, convert individual engineers to direct B2B contracts, or take the codebase in-house with a documented handover. The terms for each are in the contract before work starts.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The thing you give up is day-to-day management of the engineers. If that is a control you want, buy hourly collaboration instead; we will say so on the first call.',
          ],
        },
      ],
    },
    {
      id: 'when-outsourcing-is-wrong',
      heading: 'When outsourcing is the wrong choice',
      blocks: [
        {
          kind: 'list',
          items: [
            'You cannot yet write down what done looks like. A team can help you find out, but that is discovery work billed hourly, not a fixed-price project.',
            'The work is inside your core product and your own engineers will have to live with the code for years. Place engineers into your team instead, so the knowledge stays there.',
            'You need someone on your side of the table to review the architecture and there is nobody. An outsourced team without a technical counterpart on the client side is the black box everyone fears, and we would rather not build it.',
            'The stack is one we do not vet for. We will say which, and point you at someone who does.',
            'The budget is for fewer than a few weeks of one engineer. That is an hourly engagement with a shorter contract, not a project.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Turning down an outsourced project we would deliver badly costs us the fee and costs you nothing. It is the cheapest decision in this document.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Backend', items: ['Java / Spring Boot', 'Python / FastAPI', 'Python / Django', '.NET / C#', 'Node.js / NestJS'] },
    { group: 'Frontend', items: ['React', 'Angular', 'TypeScript', 'Next.js'] },
    { group: 'Mobile', items: ['Android', 'Kotlin Multiplatform', 'Swift', 'Flutter'] },
    { group: 'Quality', items: ['Playwright', 'Cypress', 'Selenium', 'REST Assured'] },
    { group: 'Cloud and delivery', items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'] },
  ],

  seniorities: [
    {
      label: 'Senior Software Architect',
      detail:
        'Every dedicated team has one. Owns the design, writes the plan, and is the person you argue with about trade-offs before they are built rather than after.',
    },
    {
      label: 'Senior developers',
      detail:
        'The body of the team. Engineers who have shipped a system end to end in production and can own a component without a colleague checking their work, which is what an outsourced team requires of them.',
    },
    {
      label: 'QA Engineer',
      detail:
        'Embedded from the first sprint. Owns the automated suite and the release gate; on a small component this can be a part-time role, on a product it is full-time.',
    },
    {
      label: 'Mid-level',
      detail:
        'Placed inside a dedicated team only under a senior lead, and only where the plan has well-defined vertical slices for them to own. Never the whole team.',
    },
  ],

  coverage: {
    summary:
      'Dedicated teams are assembled from engineers in Moldova, Romania and the wider region, working on Eastern European Time so milestone demos and daily contact fall inside a Western European working day.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  engagementModels: ['outsourcing', 'hourly', 'b2b'],

  evidence: [
    {
      client: 'New Era Visionary Group',
      role: 'Dedicated seven-person engineering team for Barça Mobile: 2 Backend Java Developers, 2 Frontend Developers, 2 Android/Kotlin Multiplatform Specialists, 1 QA Engineer',
      count: 7,
      outcome:
        'A dedicated engineering team supporting the development and delivery of Barça Mobile, working under the client’s technical leadership. Time from brief to signature was not recorded.',
      href: '/case-studies/barca-mobile/',
    },
    {
      client: 'OptimEyes',
      role: 'Senior Software Architect and Senior Python Developer',
      count: 2,
      outcome:
        'An architect-and-developer pair integrated into the client’s team in Belgium within two weeks of the brief.',
    },
  ],

  faqs: [
    {
      question: 'Who owns the code and the IP on an outsourced project?',
      answer:
        'You do. The repository is created in your name on day one, and the intellectual property in each milestone is assigned to you when that milestone is paid for — a present assignment, not a promise to assign later. Third-party and open-source components are listed with their licences so nothing copyleft arrives unannounced.',
    },
    {
      question: 'How do you keep an outsourced team from becoming a black box?',
      answer:
        'Three mechanics, all in the contract. You can read the repository, the backlog and the test results at any time. Every milestone ends with a demo against acceptance criteria you wrote. And the architecture is approved by you before it is built, so there is no design you have not seen.',
    },
    {
      question: 'Can we start with one component before outsourcing a whole product?',
      answer:
        'Yes, and we recommend it. A bounded component with a defined interface is the cheapest way to find out whether the working relationship holds before you commit a product to it. The same team can then grow into the wider scope, on a dedicated-team basis, if the first delivery earns it.',
    },
    {
      question: 'What happens if the scope changes mid-project?',
      answer:
        'It is raised in writing, estimated against the plan, and approved by you before anyone builds it. On a fixed-scope engagement each milestone is priced individually, so a change reprices one milestone rather than the whole project. On a dedicated-team engagement you simply reorder the backlog.',
    },
    {
      question: 'Can an outsourced team later convert to hourly or direct hires?',
      answer:
        'Yes, and the terms are fixed in the contract before work starts rather than negotiated when you ask. You can move the team to hourly collaboration, contract individual engineers directly on B2B terms, or take the codebase in-house with a documented handover. We would rather you keep a good team than lose one.',
    },
    {
      question: 'Which stacks will you not take on as an outsourced project?',
      answer:
        'Rust, Elixir and Scala, mainframe and COBOL, and Salesforce, SAP and ServiceNow. All exist in the region; none is a pool we have vetted deeply enough to be accountable for delivery in. We will say so at the brief and point you at a firm that specialises, rather than staff it thinly.',
    },
  ],

  internalLinks: [
    { anchor: 'hourly collaboration, if you want to manage the engineers yourself', href: '/hourly-engineering-talent/' },
    { anchor: 'direct B2B recruitment, if you want to hold the contracts', href: '/b2b-engineer-recruitment/' },
    { anchor: 'how we source and vet the engineers', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'the seven-person team assembled for Barça Mobile', href: '/case-studies/barca-mobile/' },
    { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
    { anchor: 'where the engineers are based', href: '/technical-recruitment-moldova/' },
  ],

  cta: {
    heading: 'Send us the brief you have',
    body: 'A document, a deck or a paragraph. You will get questions first and a written estimate second — scope, team, milestones and price, with what is excluded named.',
    primary: {
      label: siteConfig.quoteProjectLabel,
      href: siteConfig.quoteHref,
      external: true,
    },
    secondary: {
      label: 'Book a 30-minute call',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
  },

  schemaTypes: ['Service'],
  serviceType: 'Software development outsourcing',
}
