/**
 * `/hire-qa-engineers/` — DECISIONS.md D1 row 11, `draft: true`.
 *
 * Content source: 02-page-content.md §9. Claim wording: 06-claims-measurement.md.
 *
 * ## Decisions taken here, and what has to change before this page publishes
 *
 * 1. **`draft: true`, and this one is furthest from publishable.** §9 opens by
 *    recommending the page be cut from launch, and the reason is not squeamishness:
 *    there is ONE QA placement in the record — the QA Engineer inside the
 *    seven-person team assembled for New Era Visionary Group on Barça Mobile
 *    (src/data/case-studies.ts) — and D1.1 wants two.
 *    D1.1 resolved that as "build it, gate it" rather than "cut it", which is what
 *    this file is.
 *
 * 2. **`evidence` is EMPTY, and that is the correct value.** The one QA placement
 *    cannot be listed here as a count-1 row: `assertServicePage` checks evidence
 *    counts against the ledger, where New Era Visionary Group is recorded once as
 *    seven, so a `count: 1` row fails the build and a `count: 7` row would claim
 *    seven QA engineers. It is described in prose instead. Qualiwise is an AI
 *    copilot for product quality — a client in the quality space, not a QA
 *    placement — and listing it to reach a count is exactly the sleight of hand
 *    §9 names. An empty array also means `assertServicePage` will refuse
 *    `draft: false` twice over, which is the intended safety.
 *
 * 3. **The absence is stated on the page, not hidden.** The
 *    `what-our-record-shows` section says plainly that our published record is in
 *    development roles. That section is the only thing on this page a competitor
 *    could not also write, and it is the reason the page is worth having at all
 *    rather than being 1,600 words of interchangeable QA copy.
 *
 * 4. **To publish:** two named QA or test-automation placements in `evidence`,
 *    then `draft: false` here AND in `src/data/routes.ts`. §9's advice on what to
 *    build the published page around still stands — the suite the engineer
 *    inherited, and what happened to it afterwards. Rewrite
 *    `what-our-record-shows` on that day; it is written for the state we are in
 *    now and it would read as false modesty once the placements exist.
 *
 * 5. **Meanwhile, the QA demand goes somewhere useful.** §9's fallback is a
 *    ~200-word `QA and test automation` H2 on
 *    `/hire-software-developers-eastern-europe/`. That page is owned by another
 *    package; this file does not create it, and the link out from here points at
 *    that page.
 *
 * 6. **`internalLinks` point only at indexed routes.** §9's link to
 *    `/hire-devops-engineers/` is dropped — draft pages take no inbound links,
 *    including from each other. The DevOps distinction still appears in the FAQ,
 *    as prose, unlinked.
 */

import { PLACED_ENGINEERS } from '@/data/case-studies'
import type { ServicePage } from '../types'

export const hireQaEngineers: ServicePage = {
  slug: 'hire-qa-engineers',
  draft: true,
  label: 'QA Engineers',
  metaTitle: 'Hire QA Engineers in Eastern Europe | TalentSync',
  metaDescription:
    'Hire QA and test automation engineers from Eastern Europe on B2B or hourly terms. Playwright, Cypress, Selenium, API and load testing.',
  h1: 'Hire QA and Test Automation Engineers in Eastern Europe',

  answerParagraph:
    'TalentSync places QA and test automation engineers from Eastern Europe on direct B2B contracts or hourly. Typical scope is Playwright, Cypress or Selenium suites, API and contract testing, and CI integration. We place QA engineers into teams that already have a definition of done and want it enforced automatically.',

  whoFor: {
    audience: 'Product teams whose test suite has stopped being trusted',
    body: [
      'Teams where the regression suite exists but nobody believes it. Failures get re-run until they pass, the slow tests were quarantined months ago, and release confidence now comes from one person clicking through the product before a deploy.',
      'Also teams shipping fast enough that manual verification has become the bottleneck: the code is ready on Wednesday and goes out on Monday because that is how long a full pass takes.',
      'It is a poor fit if you want QA to be the department that catches your bugs for you. An automation engineer makes a team’s own quality bar enforceable; they do not substitute for one.',
    ],
  },

  problem: [
    'QA hiring fails on definition more than on supply. "QA engineer" covers a manual tester executing a plan, an automation engineer building a framework, an SDET who writes production code, and a performance specialist — four different people, one job title, one advert.',
    'The second failure is inheriting a suite. Most QA hires do not start from zero; they start with two thousand tests, four hundred of them flaky, written by people who left. That is a different skill from writing a suite, and almost nobody screens for it.',
    'The third is placing QA into a team with no definition of done. Automation encodes an agreement about what "working" means. Where there is no agreement, the suite becomes one person’s opinion, and it gets ignored.',
  ],

  sections: [
    {
      id: 'qa-roles-we-place',
      heading: 'QA roles we place',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Five distinct roles hide behind the one title. Tell us which of these you mean — or describe the symptom and let us tell you — because the shortlists barely overlap.',
          ],
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'Test automation engineer',
              body: 'Builds and owns the UI and API suites, the fixtures, the test data and the reporting. Judged on how much of your release confidence they can move out of a human’s head and into CI.',
            },
            {
              title: 'SDET',
              body: 'Writes production-adjacent code: test infrastructure, harnesses, mocks and simulators, sometimes testability changes inside the application. Screened as a developer who specialises in testing, not as a tester who can script.',
            },
            {
              title: 'Manual and exploratory QA',
              body: 'Domain-heavy, workflow-heavy products where the expensive bugs are logical rather than technical. Fewer briefs, but where it fits, nothing automated replaces it.',
            },
            {
              title: 'Performance and load engineer',
              body: 'k6, JMeter or Gatling, plus the harder half — designing a realistic load profile and reading the results without confusing saturation with a bug. A small pool.',
            },
            {
              title: 'QA lead',
              body: 'Sets the strategy, chooses the tooling, argues the case to engineering leadership, and decides what not to test. Slower to source than an individual contributor.',
            },
          ],
        },
      ],
    },
    {
      id: 'what-our-record-shows',
      heading: 'What our record does and does not show',
      blocks: [
        {
          kind: 'prose',
          body: [
            `Stated plainly, because you can check it: our published placement record is mostly development roles. ${PLACED_ENGINEERS} engineers across eight client teams — backend, full-stack, front-end, architecture and industrial-control work — and exactly one of them was a QA hire: the QA Engineer inside the seven-person team we assembled for New Era Visionary Group, supporting the development and delivery of Barça Mobile. One is a record, not a specialism.`,
            'We could dress that up. Qualiwise, one of our clients, builds an AI copilot for product quality, and it would be easy to let that sit next to the word QA on this page and let you draw the wrong conclusion. It is a client in the quality space, not a QA placement, and treating it as one would be the kind of small dishonesty that should make you doubt every other figure on this site.',
            'What we do have is one QA Engineer placed inside a delivery team with a fixed launch date, a technical screen run by engineers rather than recruiters, the same sourcing network across the same region, and clients who hire from us again. What we do not yet have is a second QA engagement, or a suite we can describe in detail. When we do, it will be on this page with the framework, the state of the suite the engineer inherited, and what changed afterwards.',
            'If you would rather wait for that, we understand. If you want a shortlist now, we will run the same screen we run for developers, adapted to the role, and you can judge the candidates rather than our record.',
          ],
        },
      ],
    },
    {
      id: 'manual-automated-and-the-honest-ratio',
      heading: 'Manual, automated, and the honest ratio',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Almost every brief we receive is automation-first, and that is usually right. It is not universally right, and the teams who get this wrong tend to get it wrong in the same direction: they automate the tests that are easy to automate rather than the ones that would have caught the last three incidents.',
            'Manual and exploratory testing still earns its place in complex domain workflows, in regulated products where someone has to reason about intent rather than assertions, and in the first weeks on any product nobody on the QA side has used before.',
          ],
        },
        {
          kind: 'list',
          heading: 'What we ask before we source',
          items: [
            'Who writes unit tests today — the developers, or nobody. This single answer moves the ratio more than anything else.',
            'What the suite you already have looks like: how many tests, how long it runs, and what share of failures are real.',
            'Whether the person is expected to test, or to build the thing that tests. Those are the automation engineer and the SDET, and they are different candidates.',
            'Whether release sign-off is part of the role. If it is, say so at the brief, because it changes both the seniority and the temperament we look for.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'On staffing ratios: there is no universal number and anyone quoting one is guessing. In practice, one automation engineer per five to eight developers works where the team owns its own unit tests, and closer to one per four where the product is complex, regulated or heavily integrated.',
          ],
        },
      ],
    },
    {
      id: 'frameworks-and-ci-integration',
      heading: 'Frameworks and CI integration',
      blocks: [
        {
          kind: 'prose',
          body: [
            'By layer, because the framework argument matters far less than where the tests run and who fixes them when they fail.',
          ],
        },
        {
          kind: 'table',
          caption: 'Testing layers, the tooling common in the regional pool, and what we screen for at each',
          columns: ['Layer', 'Tooling in the regional pool', 'What we screen for'],
          rows: [
            {
              label: 'Browser / end-to-end',
              cells: [
                'Playwright and Cypress dominate; Selenium is still common in enterprise and .NET contexts.',
                'How they handle waiting and test data. Flakiness is almost always one of those two, not the framework.',
              ],
            },
            {
              label: 'API and contract',
              cells: [
                'REST Assured, Postman and Newman, pytest and requests, Pact for contract testing.',
                'Whether they test the contract or the implementation, and what they do when a downstream service changes.',
              ],
            },
            {
              label: 'Unit and integration',
              cells: [
                'JUnit, pytest, Jest and Vitest, xUnit — usually reviewed rather than owned by the QA hire.',
                'Whether they can read the codebase well enough to say where a test belongs, and push work down the pyramid.',
              ],
            },
            {
              label: 'Performance and load',
              cells: [
                'k6, JMeter, Gatling, Locust.',
                'Designing a load profile that resembles real traffic, and interpreting a result without over-claiming.',
              ],
            },
            {
              label: 'CI and reporting',
              cells: [
                'GitHub Actions, GitLab CI, Jenkins, Allure, plus parallelisation and sharding.',
                'Suite runtime and what they did about it. A suite too slow to run on every pull request is not being run.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'We shortlist against the framework you already run, not the one a candidate prefers. Migrating a suite is a project with a business case; it is not something a new hire should start in week two, and a candidate who proposes it before reading the code is telling you something.',
          ],
        },
      ],
    },
    {
      id: 'where-qa-sits-in-a-team-we-staff',
      heading: 'Where QA sits in a team we staff',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Embedded in the delivery team, not in a separate function that receives finished work. QA at the end of the pipeline finds the same class of bug repeatedly and reports it later each time; QA inside the team changes what gets built.',
            'That has a practical consequence for a contract engagement: the QA engineer needs the same access, the same standup and the same definition of done as your developers. Where clients treat a contract QA engineer as an external verifier, the engagement produces tickets rather than confidence.',
            'It also has a scope consequence worth settling early. If what you actually want is someone to own the release gate, the pipeline and the rollback, that is closer to a platform or DevOps role than a QA one, and we would source a different person. Ask before you write the job description.',
            'On engagement shape: QA work is often the clearest case for hourly collaboration, because a suite rebuild has an end and a headcount commitment does not. Longer-term ownership of quality in a growing team suits a direct B2B contract instead, and a QA Engineer can also sit inside a dedicated team under software development outsourcing, as on Barça Mobile. All three models are set out in full on their own pages.',
          ],
        },
      ],
    },
    {
      id: 'how-we-vet-a-qa-engineer',
      heading: 'How we vet a QA engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'An engineer runs the interview, and it is built around a suite the candidate inherited rather than one they wrote from scratch — because inheriting is what the job usually is.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the technical interview covers',
          items: [
            'A suite they took over: how big, how flaky, how long it ran, and what state it was in six months later.',
            'The flakiest test they ever fixed, and what the actual cause turned out to be. "We added a wait" is an answer we follow up on.',
            'Tests they deleted. Senior QA engineers have deleted tests and can justify it; the ones who have never removed anything usually own a suite nobody trusts.',
            'A bug that escaped to production despite the suite, and what they changed so that class of bug could not escape again.',
            'A short code exercise: read an existing page object or API test and say what is wrong with it. Most candidates find the assertion; strong ones find the test data.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'For an SDET brief the exercise is a developer exercise, because that is the job. Take-homes never exceed two hours.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Browser automation', items: ['Playwright', 'Cypress', 'Selenium', 'WebdriverIO'] },
    { group: 'API and contract', items: ['REST Assured', 'Postman', 'pytest', 'Pact'] },
    { group: 'Unit and integration', items: ['JUnit', 'Jest', 'Vitest', 'xUnit'] },
    { group: 'Performance', items: ['k6', 'JMeter', 'Gatling', 'Locust'] },
    { group: 'CI and reporting', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Allure'] },
  ],

  seniorities: [
    {
      label: 'Senior test automation engineer (5–10 years)',
      detail:
        'Owns a suite end to end and keeps it trusted. The test is whether they have inherited a bad suite and made it good, not how many frameworks they can name.',
    },
    {
      label: 'SDET',
      detail:
        'Screened as a developer first. Writes test infrastructure, harnesses and simulators, and can change the application to make it testable. Smaller pool and a longer search.',
    },
    {
      label: 'QA lead',
      detail:
        'Builds a strategy from nothing, chooses the tooling, argues the case to engineering leadership, and can say which tests they deleted and why. Rarer, slower to source.',
    },
    {
      label: 'Mid-level',
      detail:
        'Placed where the framework already exists and someone senior owns it. A mid-level engineer building a suite from zero produces one that is abandoned within a year.',
    },
  ],

  coverage: {
    summary:
      'Engineers are sourced across Eastern Europe and are based mainly in Moldova and Romania, with Poland, Bulgaria and Ukraine in the wider pool. Eastern European Time is UTC+2, so a Western European team gets a complete overlapping working day — which matters for QA, where most of the work is a conversation with the developer who wrote the code.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off the role pages; we link out instead.
  engagementModels: [],

  // EMPTY on purpose. There is no QA placement in the record. See decision 2 in the file header.
  evidence: [],

  faqs: [
    {
      question: 'Do you place manual QA or test automation engineers?',
      answer:
        'Both, though almost every brief we receive is automation-first. Manual QA still matters for exploratory testing and complex domain workflows, but teams hiring in Eastern Europe are usually looking for someone to build and own a suite rather than execute a test plan. Tell us which you mean.',
    },
    {
      question: 'Which testing frameworks do your candidates use?',
      answer:
        'Playwright and Cypress dominate front-end automation in the regional pool, with Selenium still common in enterprise contexts, plus REST Assured, Postman and pytest for API work and k6 or JMeter for load. We shortlist against the framework you already run rather than the one a candidate prefers.',
    },
    {
      question: 'What ratio of QA to developers should we plan for?',
      answer:
        'There is no universal ratio, and anyone quoting one is guessing. In practice one automation engineer per five to eight developers works where the team owns its own unit tests, and closer to one per four where the product is complex, regulated or heavily integrated.',
    },
    {
      question: 'Can a QA engineer own the release process?',
      answer:
        'Sometimes, but be careful what you are actually hiring. If you want someone to own the release gate, the pipeline and the rollback, that is closer to a DevOps role and we would shortlist differently. Ask us before you write the job description and we will tell you which.',
    },
    {
      question: 'Do you place QA leads?',
      answer:
        'Yes, though the pool is smaller. A QA lead in our shortlists is someone who has built a strategy from nothing, chosen the tooling, argued the case for it to engineering leadership, and can say which tests they deleted. Sourcing one takes longer than an individual contributor.',
    },
  ],

  internalLinks: [
    { anchor: 'full-stack developers', href: '/hire-full-stack-developers/' },
    { anchor: 'backend developers', href: '/hire-backend-developers/' },
    { anchor: 'hourly engagement', href: '/hourly-engineering-talent/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'how we hire engineers across Eastern Europe', href: '/hire-software-developers-eastern-europe/' },
  ],

  cta: {
    heading: 'Show us your test suite',
    body: 'Its size, its runtime and how often it lies to you. That tells us which of the five QA roles you are actually hiring for.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'QA and test automation recruitment',
}
