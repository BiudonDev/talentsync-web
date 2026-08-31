/**
 * Route 5 — `/hourly-engineering-talent/`.
 *
 * The hourly model: the control matrix, minimum commitment and notice,
 * timesheets and invoicing, and when hourly is the wrong purchase.
 *
 * BLOCK D (DECISIONS.md D7) appears here verbatim and must not be reworded.
 *
 * WHAT IS DELIBERATELY MISSING: the indicative rate table.
 * 02-page-content.md §5 specifies one, headed with a review date, but every
 * value in it is a `{{RATE_*}}` token — a business fact nobody may invent
 * (BLOCKERS.md) — and D7 cut the old "€15–35/hour" line outright. An unresolved
 * token fails `npm run verify`, and an invented number fails the far more
 * important test. So `what-drives-the-rate` publishes the STRUCTURE instead:
 * what moves a rate, what the quoted number includes, what it excludes. When
 * Victor supplies a dated card, add a `table` block to that section; nothing
 * else on the page has to change.
 *
 * Minimum hours, minimum term, notice period, tracking tool and payment terms
 * are blocked the same way and handled the same way — the contract fixes them
 * before day one, and the page says so rather than inventing figures.
 */

import type { ServicePage } from '../types'

export const hourlyEngineeringTalent: ServicePage = {
  slug: 'hourly-engineering-talent',
  label: 'Hourly Collaboration',
  metaTitle: 'Hire Engineers Hourly, Your Team Leads | TalentSync',
  metaDescription:
    'Add an engineer to your team on an hourly basis. You own architecture, roadmap and priorities. Scale up, down or pause at agreed notice.',
  h1: 'Hire Engineers Hourly, With Your Team in Control',

  answerParagraph:
    'Hourly engineering collaboration means an engineer joins your existing team and is billed only for hours actually worked, with no fixed headcount commitment. You keep architecture, roadmap, priorities, processes and day-to-day management. TalentSync handles the contract, invoicing and replacement cover. Capacity scales up, down or pauses at agreed notice, which suits work with an uncertain end date.',

  whoFor: {
    audience: 'Teams that need capacity now without adding headcount',
    body: [
      'Engineering leaders carrying more work than people, in a company where a permanent requisition is either frozen, months away, or not justified by an end date nobody can name yet.',
      'It also suits the roles that never quite fill a week: platform and DevOps support, a data pipeline that needs an owner two days out of five, an architect for the first quarter of a rebuild.',
      'It does not suit a team that wants someone else to run delivery. You will be managing this engineer yourself, in your standups, to your definition of done.',
    ],
  },

  problem: [
    'The usual alternatives to an hourly engineer are all worse in a specific way. A contractor booked full time bills for a full week whether or not the work is there. An agency sells you a managed pod and takes the technical decisions with it. A permanent hire needs an end date you do not have, and a headcount approval you may not get.',
    'What is missing from the market is the boring middle: a senior person, some of the time, inside your team, with somebody else holding the contract and the paperwork, and no fiction about who is in charge.',
  ],

  sections: [
    {
      id: 'how-hourly-collaboration-works',
      heading: 'How hourly collaboration works',
      blocks: [
        {
          kind: 'list',
          heading: 'Five steps, start to invoice',
          items: [
            'Brief. You describe the work, the stack and the hours you think you need. We say whether that is a shape we can staff, and where we think the estimate is wrong.',
            'Shortlist. Two or three engineers with a firm hourly rate against each name, not a band. The rate does not move after you have met them.',
            'Trial fortnight. Two weeks at the quoted rate, paid for hours worked. If it is not right you stop, and you owe nothing beyond those hours.',
            'Weekly rhythm. The engineer works your sprint, in your repositories, to your definition of done, logging hours against your tickets as they go.',
            'Monthly invoice. You approve the log, we invoice the approved figure, and disputed hours never reach the invoice in the first place.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Nothing in that sequence has an approval step on our side. Once the engineer is engaged, scheduling their week is a conversation between you and them.',
          ],
        },
      ],
    },
    {
      id: 'who-controls-what',
      heading: 'Who controls what',
      blocks: [
        {
          kind: 'table',
          caption: 'Every decision in an hourly engagement, and which side of the relationship owns it',
          columns: ['Decision', 'You', 'TalentSync'],
          rows: [
            { label: 'System architecture', cells: ['Yours entirely.', 'No involvement.'] },
            { label: 'Technical roadmap', cells: ['Yours entirely.', 'No involvement.'] },
            { label: 'Sprint priorities and the backlog', cells: ['Yours entirely.', 'No involvement.'] },
            { label: 'Code review standards and definition of done', cells: ['Yours entirely.', 'No involvement.'] },
            { label: 'Tooling, repositories and environments', cells: ['Yours entirely.', 'No involvement.'] },
            { label: 'Day-to-day direction of the engineer', cells: ['Yours entirely.', 'No involvement.'] },
            {
              label: 'Working hours and overlap',
              cells: ['Agreed with you at the brief.', 'Screened for before anyone is shortlisted.'],
            },
            {
              label: 'The contract',
              cells: ['Signed with us, and read before signing.', 'Drafted, held, and liable under it.'],
            },
            {
              label: 'Paying the engineer',
              cells: ['One invoice a month.', 'Everything behind that invoice.'],
            },
            {
              label: 'Replacement cover',
              cells: ['Asks for it.', 'Sources the replacement and funds the handover.'],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'Every row on the left is the product. The rows on the right are the administration you are paying not to do, and they are deliberately few.',
          ],
        },
      ],
    },
    {
      id: 'what-talentsync-is-not',
      heading: 'What TalentSync is not',
      blocks: [
        {
          kind: 'prose',
          body: [
            'TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control.',
            'Under the hourly model that means three concrete absences. There is no delivery manager sitting over the engagement on our side. We do not report to you on the engineer’s progress, because you can see it in your own tracker. And we are not in your standups, your planning, or your retrospectives.',
            'If any of those absences reads as a gap rather than a feature, buy a managed team from an agency instead. That is a legitimate product; it is simply not this one, and the difference matters most on the day something goes wrong.',
          ],
        },
      ],
    },
    {
      id: 'what-drives-the-rate',
      heading: 'What drives the rate',
      blocks: [
        {
          kind: 'prose',
          body: [
            'We are not printing a rate range on this page. The last one this site carried was four years old, quoted as though it were live, and it anchored senior engineers against a number that had stopped being true — which serves nobody, least of all a buyer who then meets the real figure at shortlist.',
            'A firm rate comes with the shortlist, per named engineer, and it does not move after you have seen the candidate.',
          ],
        },
        {
          kind: 'list',
          heading: 'What moves a rate',
          items: [
            'Scarcity of the stack. A React developer and a Kubernetes platform engineer are not the same market.',
            'Seniority, measured as what the person has owned rather than as years served.',
            'Which country the engineer contracts from, because their own cost base differs by jurisdiction.',
            'Hours per week and the length of the commitment. Two days a week costs more per hour than four.',
            'On-call, out-of-hours or weekend cover, priced at the start rather than assumed into the base rate.',
            'Any certification, clearance or domain qualification the role genuinely requires.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the quoted rate includes',
          items: [
            'The engineer’s time, at the hours you approve.',
            'Our margin, already inside the number rather than added to it later.',
            'The contract, the invoicing and the payment of the engineer.',
            'Replacement cover for the whole life of the engagement.',
          ],
        },
        {
          kind: 'list',
          heading: 'What it does not include',
          items: [
            'Your own tooling, licences and cloud spend.',
            'Hardware beyond the engineer’s own machine.',
            'Travel to your offices, which is quoted separately when you want it.',
            'VAT or its local equivalent, where it applies to you.',
          ],
        },
      ],
    },
    {
      id: 'minimum-commitment-and-notice',
      heading: 'Minimum commitment and notice',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Every hourly engagement has a floor on weekly hours and a minimum initial period, and both are written into the contract before anybody starts. We set a floor because an engineer turns down other work to hold capacity for you, and below it the arrangement is unfair to them and unstable for you.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the contract fixes before day one',
          items: [
            'The minimum hours per week, and what happens in a week that falls short of them.',
            'The minimum initial period, after which the engagement simply runs until someone gives notice.',
            'The notice required to reduce hours, and the notice required to stop altogether.',
            'Whether unused hours roll into the following month. They do not, and we would rather say that here than have the argument in March.',
            'What happens to work in progress, credentials and access on the last day.',
            'The conversion terms, if you later decide to hold the contract yourself.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'We will not publish those figures as a headline, because they move with the role: a two-day-a-week platform retainer and a four-day product engineer are not the same commitment and should not carry the same floor. You get the exact numbers in writing on the first call, before anyone is sourced.',
            'There is no penalty for reducing or stopping inside the notice period, and no minimum spend to make up afterwards. A pause works the same way, with one honest caveat — we cannot promise the same engineer will be free when you restart, so a long pause is usually better handled as an ending.',
          ],
        },
      ],
    },
    {
      id: 'how-hours-are-tracked',
      heading: 'How hours are tracked and invoiced',
      blocks: [
        {
          kind: 'list',
          items: [
            'Hours are logged against your tickets, in your own tracker, by the engineer as the work happens.',
            'You can see the running total whenever you want it, rather than meeting it for the first time at month end.',
            'Granularity is fifteen minutes, and the log carries the ticket reference, not a description of the day.',
            'You approve the log at month end. Approval is the trigger for the invoice, not a formality afterwards.',
            'A disputed hour comes off the invoice first and is discussed second. It never sits on a document you are being asked to pay.',
            'One invoice a month, on the payment terms agreed in the contract, from us rather than from the engineer.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'That fifth rule is the one that keeps hourly arrangements healthy. The failure mode everybody has lived through is an invoice arriving with forty contested hours on it and a relationship spent arguing about six of them. Removing them first costs us very little and removes the argument entirely.',
          ],
        },
      ],
    },
    {
      id: 'when-hourly-is-wrong',
      heading: 'When hourly is the wrong choice',
      blocks: [
        {
          kind: 'list',
          items: [
            'You already know you need this person full time for two years. A direct contract you hold is cheaper over that horizon and better for the engineer, and we will point you at it.',
            'You want somebody else accountable for delivery. That is an agency engagement, and buying it from us in this shape would leave you with neither control nor cover.',
            'The work is a fixed-scope, fixed-price deliverable with a deadline attached. Hourly prices flexibility you are not using.',
            'You need fewer than a handful of hours a week. Context-switching will eat most of them and you will conclude, fairly, that it did not work.',
            'The role is genuinely on-site. Hourly does not change where the person lives.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The first of those is the one we raise most often, usually in month four when an engagement has clearly stopped being uncertain. Saying it costs us margin, which is exactly why it is worth writing down in advance.',
          ],
        },
      ],
    },
    {
      id: 'moving-to-a-direct-contract',
      heading: 'Moving from hourly to a direct contract',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Conversion is expected rather than resisted, and the terms sit in the contract from day one instead of being negotiated on the day you ask. That ordering matters: a conversion fee agreed while everyone is relaxed is a very different conversation from the same fee raised when you have just told us you want to keep someone.',
            'Once the end date is no longer uncertain, you are paying for an option you have stopped using. At that point the engineer is usually better off too — a long-term contract they hold with you directly is worth more to them than an open-ended hourly arrangement.',
            'Where you have a local entity and the engineer wants employment, that route is open as well. We would rather help you keep a good engineer than lose one over a fee argument, and the terms are written so that neither side has to bluff.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Most requested hourly', items: ['DevOps', 'Cloud platform', 'Data engineering', 'Solution architecture'] },
    { group: 'Backend', items: ['Python', 'Java', '.NET', 'Node.js'] },
    { group: 'Frontend', items: ['React', 'Angular', 'TypeScript'] },
    { group: 'Industrial', items: ['PLC', 'SCADA'] },
  ],

  seniorities: [
    {
      label: 'Senior',
      detail:
        'The band hourly works best in, because a senior engineer can be useful inside a day without a month of onboarding paid for by you.',
    },
    {
      label: 'Lead and architect',
      detail:
        'Common as a part-week engagement — a day or two a week of design review and direction alongside a team you already have.',
    },
    {
      label: 'Mid-level',
      detail:
        'Rarely a good hourly purchase. The supervision a mid-level engineer needs is worth more hours than the arrangement usually buys, so we will suggest a different shape.',
    },
  ],

  coverage: {
    summary:
      'Engineers work remotely from Moldova, Romania and the wider region on Eastern European Time, which lines up with a European working day without anyone shifting their hours.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  engagementModels: ['hourly', 'b2b'],

  evidence: [
    {
      client: 'Innovatec',
      role: 'PLC and automation specialists',
      count: 2,
      outcome: 'A specialist industrial search, filled in two weeks.',
    },
    {
      client: 'Foodamigos',
      role: 'Senior frontend developer, Angular',
      count: 1,
      outcome: 'One senior hire into a small product team, signed in a week.',
    },
  ],

  faqs: [
    {
      question: 'What is the minimum commitment?',
      answer:
        'There is a floor on weekly hours and a minimum initial period, both written into the contract before anyone starts and both quoted on the first call. We set a floor because engineers turn down other work to hold capacity for you, and below it the arrangement is unfair to them and unstable for you.',
    },
    {
      question: 'How are hours tracked and invoiced?',
      answer:
        'The engineer logs hours against your tickets in your own tracker, visible to you continuously rather than as a monthly surprise. You approve the log at month end and we invoice the approved figure on the terms in the contract. Disputed hours come off the invoice first and are discussed afterwards.',
    },
    {
      question: 'What notice do we give to reduce or stop?',
      answer:
        'The notice period is fixed in the contract, runs in writing, and applies equally to reducing hours and to ending the engagement. There is no penalty and no minimum spend to make up. Pausing works the same way, though we cannot guarantee the same engineer is free when you restart.',
    },
    {
      question: 'Who manages the engineer day to day?',
      answer:
        'You do, entirely. The engineer works to your priorities, in your tools, to your definition of done, and attends your ceremonies. We are not in your standups and we do not report on their progress. If you would rather someone else managed delivery, we are the wrong partner and we will say so.',
    },
    {
      question: 'Can we switch from hourly to a direct B2B contract later?',
      answer:
        'Yes, and the conversion terms are in the contract from day one rather than negotiated when you ask. Most long engagements should convert eventually — hourly is priced for flexibility, and once the end date is no longer uncertain you are paying for an option you no longer need.',
    },
    {
      question: 'Can we book someone for only part of a week?',
      answer:
        'Yes, down to the weekly floor in your contract, and part-time works well for DevOps, data and architecture support where a full-time hire is not justified. It works badly for feature delivery inside a busy sprint team, because context-switching costs more than the hours saved. We will tell you which case you are in.',
    },
    {
      question: 'Why will you not publish an hourly rate on this page?',
      answer:
        'Because the last published range on this site was four years old and quoted as though it were current, which misled buyers in both directions. A firm rate now arrives with the shortlist, attached to a named engineer, and it does not change after you have met them. Ask on the first call and you will get a number.',
    },
  ],

  internalLinks: [
    { anchor: 'a direct B2B contract instead', href: '/b2b-engineer-recruitment/' },
    { anchor: 'where the engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'how the search itself runs', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'the wider regional picture', href: '/tech-recruitment-eastern-europe/' },
    { anchor: 'full-stack engineers', href: '/hire-full-stack-developers/' },
    { anchor: 'backend engineers', href: '/hire-backend-developers/' },
    { anchor: 'placements on record', href: '/case-studies/' },
  ],

  cta: {
    heading: 'Start with a paid trial fortnight',
    body: 'Two weeks at the quoted rate. If it is not working you stop, and you have paid for the hours worked and nothing else.',
    primary: {
      label: 'Book a call about capacity',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'Hourly engineering collaboration',
}
