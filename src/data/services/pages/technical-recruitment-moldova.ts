/**
 * `/technical-recruitment-moldova/` — 02-page-content.md §11.
 *
 * The one thing only this page can say: it is written from inside the market it
 * describes. Every incumbent ranking for "IT recruitment Moldova" is a foreign
 * firm running a swapped-noun template, and none of them explains the IT Park
 * single-tax mechanics, the size of the pool, the university and diaspora
 * pipeline, or the regional-risk question honestly. So the page carries the
 * depth those pages cannot: the regime, the pool, the pipeline, the risk, and
 * what to require in the contract.
 *
 * TWO SPEC TOKENS ARE DELIBERATELY NOT RENDERED. The outline asks for
 * `{{MOLDOVA_ICT_HEADCOUNT}}` and a `{{MOLDOVA_SENIOR_RATE_BAND}}`. D8 fails the
 * deploy on any surviving `{{TOKEN}}`, neither value has a sourced default in
 * BLOCKERS.md, and D7 puts the rate table on `/hourly-engineering-talent/` and
 * nowhere else. Both are therefore answered structurally — sized against the
 * IT Park resident count, and priced against the client's fully-loaded cost per
 * head — with the numbers left to the one page that owns them.
 *
 * Tax figures carry a dated verification note rather than being stated flat.
 * The rate and the regime's end date are set by statute and can move.
 */

import type { ServicePage } from '../types'

export const technicalRecruitmentMoldova: ServicePage = {
  slug: 'technical-recruitment-moldova',
  label: 'Moldova',
  metaTitle: 'IT Recruitment in Moldova | TalentSync',
  metaDescription:
    'IT recruitment in Moldova, run from Chișinău. How the IT Park 7% single tax works, how big the talent pool really is, EET overlap, and the real risks.',
  h1: 'IT Recruitment in Moldova',

  answerParagraph:
    'IT recruitment in Moldova means sourcing from a compact but genuinely senior developer market centred on Chișinău, where resident IT companies pay a single tax on turnover — currently 7% — instead of most other business taxes. Engineers work in Eastern European Time, contract on B2B terms as standard, and typically work in Romanian, Russian and English.',

  whoFor: {
    audience: 'European product teams hiring one to five senior engineers',
    body: [
      'Companies who want senior engineers on a clean contract without opening an entity, and who are choosing between Moldova, Romania, Poland and Ukraine rather than between Eastern Europe and nothing.',
      'Teams who have been quoted a Polish rate for a Polish mid-level engineer and want to know what the same money buys one country east.',
      'It is the wrong page for volume hiring. If your plan is a fifty-person delivery centre, Moldova is too small and we will say so on the first call — Poland or Romania is the honest answer.',
    ],
  },

  problem: [
    'Almost everything written in English about hiring engineers in Moldova was written by a company that is not in Moldova. The pages that rank are templates with the country name swapped in: the same paragraph about “cost-effective talent”, the same invented salary table, the same silence on the two questions buyers actually have.',
    'Those two questions are what the tax regime really does to a contractor’s invoice, and whether a country next to a war is a sensible place to put part of your engineering capability. Neither is answered by a stock photo of a coworking space.',
    'We are a recruitment company in Chișinău. This page answers both, including the parts that argue against hiring here.',
  ],

  sections: [
    {
      id: 'it-park-single-tax',
      heading: 'Moldova’s IT Park: the 7% single tax explained',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Moldova runs a virtual IT park — created by Law No. 77/2016 on information technology parks — that resident companies join rather than physically move into. It is virtual in the literal sense: residency is a tax status attached to the company, not an address, so a resident can be a fifty-person firm in Chișinău or a one-person software company registered from a flat in Bălți.',
            'The mechanism is a single tax on turnover, currently 7%, that replaces most of what a Moldovan company would otherwise pay separately: corporate income tax, employee income tax, the employer and employee social and health contributions, local taxes, and the road and property taxes. One rate, one payment, calculated on sales revenue rather than on profit.',
            'There is a floor. The single tax cannot fall below a minimum amount per employee, tied to the national forecast average monthly salary, so a resident with a large payroll and thin revenue still pays a real number. That floor is what stops the regime from being a shell for companies with no actual activity, and it is the detail most competitor pages leave out.',
          ],
        },
        {
          kind: 'list',
          heading: 'What it means for you as the client',
          items: [
            'The contractor’s own tax position is simple and stable, so the invoice does not drift when their accountant reclassifies something at year end.',
            'It is turnover-based, so it does not create the pressure to load costs into the engagement that a profit tax does.',
            'Residency is public — the IT Park publishes its resident list — so it is checkable rather than something you have to take on trust.',
            'It is a Moldovan-side regime. It does not change your VAT treatment, your own corporate tax, or anything about how you contract; those are covered on the B2B page.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Two honest caveats. First, the regime has a statutory end date, it has been extended before, and as of this page’s last review it runs well into the 2030s — but it is legislation, and legislation moves. Second, this is a Moldovan corporate tax regime, not a tax opinion about your company.',
            'Verification note: rate, scope and duration checked against the IT Park’s published guidance in August 2026. Ask us for the position in force on the day you read this, and take your own advice before you model it.',
          ],
        },
      ],
    },
    {
      id: 'the-talent-pool-honestly-sized',
      heading: 'The talent pool, honestly sized',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Moldova is a country of roughly two and a half million people, and its technology sector is concentrated almost entirely in Chișinău, with a smaller cluster in Bălți. The most checkable public measure of the sector’s size is the IT Park’s own resident register, which passed 1,200 resident companies — most of them small, many of them a single contracting engineer.',
            'That shape matters more than any headcount estimate. A market of many small residents and a few large outsourcing firms means the senior engineers are reachable individually rather than locked inside three employers, which is why a one-to-five-person search here moves quickly.',
            'It also means the ceiling is real. Three sectors absorb most of the supply: outsourcing and outstaffing firms serving Western Europe, a growing product-company layer, and fintech and payments work. Everyone in the senior tier has been contacted by a recruiter before, and the pool of people who have genuinely run a system at scale is measured in hundreds, not thousands.',
            'So the honest statement is this: Moldova will reliably staff one to five senior engineers into your team, and it will not build you a fifty-person division. If the second one is the plan, we will point you at Poland and lose the deal.',
          ],
        },
        {
          kind: 'stats',
          items: [
            { value: '1,200+', label: 'companies resident in the Moldova IT Park' },
            { value: '1–5', label: 'senior engineers a Moldova search reliably fills' },
            { value: 'Chișinău', label: 'where almost the entire sector sits' },
          ],
        },
      ],
    },
    {
      id: 'what-engineers-earn',
      heading: 'What engineers actually earn',
      blocks: [
        {
          kind: 'prose',
          body: [
            'This is the most-searched fact about the market and the one nobody publishes credibly, usually because they are publishing a four-year-old range they never revisited. We publish rates in exactly one place — the dated table on the hourly collaboration page — and a firm rate comes with the shortlist, where it belongs, because a rate quoted before anyone has seen the role is a guess with a euro sign in front of it.',
            'What is worth understanding here is the structure, because it is checkable and a headline number is not. A Moldovan B2B engagement carries no employer social contributions, no local entity, no payroll administration and no severance exposure. Moldova’s IT Park regime replaces most business taxes for resident companies with a single tax on turnover, currently 7%. What that means for your fully-loaded cost per engineer depends on where you are; we model it against your current cost per head on the first call.',
            'The comparison people get wrong is comparing a Moldovan B2B rate to a Western gross salary. They are not the same kind of number. A gross salary is the smaller half of what an employee costs you once employer contributions, holiday, sick pay, equipment, notice-period exposure and the administration of all of it are counted. A B2B rate is the whole cost, invoiced monthly, and it stops when the engagement stops.',
            'What moves the number, in order: seniority, how narrow the stack is, whether the engineer already works in your domain, and how much of the day you need overlapped. Language rarely moves it. Location within Moldova does not move it at all.',
          ],
        },
      ],
    },
    {
      id: 'language-timezone-and-culture',
      heading: 'Language, timezone and working culture',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Romanian is the state language and Russian is spoken widely, often in the same conversation. Professionally, engineering work happens in English: documentation, code review and cross-border standups are all in English, and it has been that way for as long as the outsourcing sector has existed here.',
            'We screen English in a live conversation rather than from a certificate. Engineers who reach your shortlist are B2 to C1. Written English is usually stronger than spoken, which suits asynchronous teams well; if the role is heavily client-facing, tell us and we raise the bar and lengthen the search accordingly.',
            'Chișinău runs on Eastern European Time, UTC+2, and EEST in summer. That is one hour ahead of Berlin, Paris and Amsterdam, two ahead of London — a complete overlapping working day with Western Europe, with no scheduling craft required. For a US Eastern team the last three hours of the Chișinău day cover the start of the American morning, which is enough for a daily standup and not enough to pretend the timezones match.',
            'On working culture, one observation from living here rather than a list of adjectives: the default is understatement. Engineers in this market under-claim in interviews far more often than they over-claim, and a candidate who says they are “familiar with” Kubernetes has frequently run it in production for three years. If you interview on confidence signals, you will systematically under-rate this pool. Ask what they built and how it failed, and the picture corrects itself immediately.',
          ],
        },
      ],
    },
    {
      id: 'where-the-engineers-come-from',
      heading: 'Where the engineers come from',
      blocks: [
        {
          kind: 'prose',
          body: [
            'There are three pipelines, and they produce quite different engineers.',
            'The universities are the first. The Technical University of Moldova supplies most of the computing and engineering graduates, the Academy of Economic Studies and the State University supply the rest, and Tekwill — the ICT excellence centre run by the industry association with USAID and Sida backing — sits alongside them running courses, retraining and student projects with real companies attached. It is a solid junior and mid pipeline and a mediocre senior one, which is true of university pipelines everywhere.',
            'The private academies and bootcamps are the second, and they are the noisiest part of the market. They produce a lot of career-changers, some of them very good. We screen them on evidence of shipped work rather than on the certificate, and most of what we place from this pipeline is mid-level.',
            'The third is where the senior depth actually is: engineers who left. People who spent five or ten years in Romania, Germany, the UK or the Netherlands — at product companies, banks, consultancies — and came back, for family, for cost of living, or because remote work made the salary difference stop mattering. They arrive with Western engineering practice already internalised: code review as a norm, incident reviews without blame, the habit of writing things down. They are also the hardest group to reach through job boards, because they are not looking, and that is exactly the group a local recruiter has an unfair advantage with.',
          ],
        },
      ],
    },
    {
      id: 'is-moldova-safe-to-build-in',
      heading: 'Is Moldova a safe place to build a team?',
      blocks: [
        {
          kind: 'prose',
          body: [
            'You are right to ask, and a page written from Chișinău that skipped the question would not be worth reading. Moldova is a small state bordering Ukraine and Romania. It is not in any conflict, it is an EU candidate country with accession negotiations open, and daily life and business here are normal. That is the accurate description, and it is not the same as saying there is nothing to plan for.',
            'What has genuinely been disrupted in recent years is energy: supply and prices moved sharply, and the country responded by diversifying procurement and strengthening its interconnection with the Romanian grid. Connectivity, by contrast, is a strength — fixed fibre coverage is broad and cheap, and most engineers here have a better home connection than their counterparts in Western capitals.',
            'The useful response to country risk is contractual rather than reassuring. We would give the same advice about a single-site team anywhere, and clients who apply it stop worrying about the map.',
          ],
        },
        {
          kind: 'list',
          heading: 'What to require in the contract, wherever your engineers sit',
          items: [
            'A named backup engineer per role, known to your team before they are needed rather than introduced during an incident.',
            'Code, credentials and infrastructure state never held solely on a local machine or a local account. Your repositories, your cloud, your identity provider.',
            'A documented handover from month one — a runbook per service and an architecture note — treated as part of the work rather than as an exit task.',
            'A notice period on both sides that is long enough to run that handover, and an agreed process for revoking access on the last day.',
            'A written continuity position from your supplier: who picks the work up, from where, and how fast. Ask us for ours in writing; we will send it.',
          ],
        },
      ],
    },
    {
      id: 'moldova-versus-the-neighbours',
      heading: 'Moldova versus Poland, Romania and Ukraine',
      blocks: [
        {
          kind: 'table',
          caption: 'How Moldova compares with the three Eastern European markets buyers usually shortlist against it',
          columns: ['Market', 'Pool', 'Contract and jurisdiction', 'Choose it when'],
          rows: [
            {
              label: 'Moldova',
              cells: [
                'Small, concentrated in Chișinău, senior tier reachable individually.',
                'Non-EU. B2B is the norm; reverse charge as a non-EU supply; SCCs for personal data.',
                'You want one to five senior engineers on a clean contract at a sensible cost per unit of seniority.',
              ],
            },
            {
              label: 'Romania',
              cells: [
                'Large and deep, especially .NET, Java and automotive-adjacent work.',
                'EU member, so EU jurisdiction and no transfer mechanism to arrange.',
                'You want EU jurisdiction, scale, and are willing to pay a rising market rate for it.',
              ],
            },
            {
              label: 'Poland',
              cells: [
                'The largest pool in the region across every stack.',
                'EU member. Mature contracting market and mature pricing to match.',
                'You are hiring at volume or building a real delivery centre. For that, Poland is the better answer.',
              ],
            },
            {
              label: 'Ukraine',
              cells: [
                'Very large and very strong technically.',
                'Non-EU, and continuity planning is a live operational question, not a formality.',
                'You already have the continuity model and the risk appetite that go with it.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'The short version: choose Moldova for senior individuals on a clean contract, Romania for EU jurisdiction with depth, Poland for scale. If your requirement is volume, we would rather tell you that here than three weeks into a search. The wider comparison across the region is on the Eastern Europe page.',
          ],
        },
      ],
    },
    {
      id: 'how-we-recruit-here',
      heading: 'How we recruit here',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Being in the market is not a slogan, it is a set of concrete advantages that a London or Berlin agency running a Moldova search cannot replicate.',
          ],
        },
        {
          kind: 'list',
          items: [
            'We meet candidates in person. Chișinău is small enough that a coffee is a twenty-minute drive, and an hour face to face tells you things a video call does not.',
            'We know which employers people are leaving and why. In a market this size, a wave of resignations from one company is common knowledge within a fortnight — and it is the single best sourcing signal there is.',
            'We can check a reference by phoning someone we actually know, rather than emailing a form to a manager who will write two neutral sentences.',
            'We know who is genuinely senior versus who has a senior title from a company that hands them out, which is a distinction no CV database encodes.',
            'We speak Romanian and Russian, so the first conversation happens in the candidate’s language and the English screen happens later, deliberately, as a screen.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The counterweight, because it belongs here too: a local network is an advantage in a small market and a limitation if you need scale. When a brief is bigger than this market, we source across the wider region rather than pretending Moldova can absorb it.',
          ],
        },
      ],
    },
    {
      id: 'contracting-a-moldovan-engineer',
      heading: 'Contracting a Moldovan engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Short version, with the detail one page away. B2B is the standard shape here: the engineer invoices as an independent business, which is what the IT Park regime is built around and what most senior engineers in this market already do.',
            'For VAT, a service supplied to a business customer is generally taxed where the customer is, so an EU client self-accounts under the reverse charge and Moldova being outside the EU changes the paperwork rather than the outcome. On data protection, Moldova is not covered by an EU adequacy decision, so personal data transfers ride on Standard Contractual Clauses — routine, and already in our contract pack. On permanent establishment, the risk is about how you engage and direct the engineer rather than about which country they sit in, which is why the engagement model matters more than the map.',
            'Each of those is one sentence here on purpose. The mechanics, the traps and what we put in writing are all on the B2B recruitment page.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Enterprise', items: ['.NET / C#', 'Java', 'Spring Boot', 'SQL Server'] },
    { group: 'Web', items: ['JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js', 'PHP'] },
    { group: 'Data and AI', items: ['Python', 'PostgreSQL', 'ETL pipelines'] },
    { group: 'Industrial and embedded', items: ['PLC', 'SCADA', 'C / C++', 'Automation'] },
    { group: 'Delivery', items: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'CI/CD'] },
  ],

  seniorities: [
    {
      label: 'Senior (5–12 years)',
      detail:
        'The tier Moldova is genuinely good at, and where the returning-diaspora engineers sit — people who spent years at Western product companies and came back with the practice intact. Reachable individually rather than locked inside a handful of employers, which is why a one-to-five-person senior search moves quickly here.',
    },
    {
      label: 'Lead and architect',
      detail:
        'Present, and thin. There are only so many people in a market this size who have run a team and made an architecture decision they later had to defend. Lead searches here take longer than senior ones and we quote the timeline honestly rather than optimistically.',
    },
    {
      label: 'Mid-level (2–5 years)',
      detail:
        'Well supplied by the universities, Tekwill and the private academies, and good value where you already have a senior engineer leading the work. This is the tier where the certificate matters least and the evidence of shipped work matters most.',
    },
  ],

  coverage: {
    summary:
      'Sourced and screened from our own office in Chișinău, where almost the entire Moldovan technology sector sits, with a smaller cluster in Bălți. Eastern European Time, UTC+2, gives a full overlapping day with Western Europe.',
    countries: ['Moldova', 'Chișinău', 'Bălți'],
  },

  // Location page, not a role page, but the same Part 0 rule applies: the two
  // canonical engagement blocks live on five pages and this is not one of them.
  engagementModels: [],

  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior backend developer, Python',
      count: 1,
      outcome:
        'Sourced and screened out of our Chișinău office for an AI copilot platform. Signed within one week of the brief.',
      href: '/case-studies/qualiwise/',
    },
    {
      client: 'Innovatec',
      role: 'PLC specialist',
      count: 1,
      outcome:
        'Hatchery automation, and the placement that shows this market is not only web work — the industrial and embedded pool here is real. Team scaled within two weeks.',
    },
    {
      client: 'Foodamigos',
      role: 'Senior frontend developer, Angular',
      count: 1,
      outcome:
        'A food delivery startup adding front-end capacity. Team scaled within one week of the brief.',
    },
  ],

  faqs: [
    {
      question: 'How big is Moldova’s tech talent pool?',
      answer:
        'Small and concentrated. The IT Park’s public register passed 1,200 resident companies, and almost all of the sector sits in Chișinău. That is enough to staff one to five senior engineers into your team reliably, and not enough to build a fifty-person division. If your plan is the second one, Poland or Romania is the honest answer.',
    },
    {
      question: 'What does a senior engineer in Moldova actually cost?',
      answer:
        'We publish indicative ranges in one place, the dated table on the hourly collaboration page, and quote a firm rate with the shortlist. Compare it to your fully-loaded cost per head rather than to a Western gross salary: a B2B rate carries no employer contributions, no severance and no payroll administration on your side.',
    },
    {
      question: 'What languages do Moldovan engineers work in?',
      answer:
        'Romanian and Russian day to day, and English professionally. We screen English in a live conversation, and engineers who reach your shortlist are B2 to C1. Written English is generally stronger than spoken, which suits asynchronous teams; if your work is heavily client-facing, tell us and we raise the bar.',
    },
    {
      question: 'Is Moldova safe to build an engineering team in?',
      answer:
        'Moldova is stable, an EU candidate country, and outside any active conflict, but it sits in a region buyers are right to ask about. What we recommend is contractual rather than reassuring: a named backup engineer, code and credentials never held only locally, and a documented handover from month one.',
    },
    {
      question: 'Why hire in Moldova rather than Poland or Romania?',
      answer:
        'Cost per unit of seniority, and contract simplicity. Poland has the largest pool at the highest price, Romania is EU-jurisdiction but rising fast, and Moldova gives you comparable senior engineers on a clean B2B contract under the IT Park regime. For volume hiring, Poland is genuinely the better answer.',
    },
    {
      question: 'Is Moldova in the EU?',
      answer:
        'No. Moldova is an EU candidate country, not a member, which has two practical consequences: services invoiced to an EU business are handled under the reverse charge as a non-EU supply, and personal data transfers need Standard Contractual Clauses because Moldova is not covered by an adequacy decision. Both are routine.',
    },
    {
      question: 'Can we visit, or work from an office in Chișinău?',
      answer:
        'Yes, and clients do. Chișinău has direct flights from several European hubs and a well-developed coworking market, so a week on site with your engineers is straightforward to arrange. We will meet you here, and we would rather you came and looked at the market than took our word for it.',
    },
  ],

  internalLinks: [
    { anchor: 'how a B2B contract with a Moldovan engineer works', href: '/b2b-engineer-recruitment/' },
    { anchor: 'the wider Eastern European market', href: '/tech-recruitment-eastern-europe/' },
    { anchor: 'how our search process runs', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'hourly collaboration, and the rate table', href: '/hourly-engineering-talent/' },
    { anchor: 'backend developers we have placed', href: '/hire-backend-developers/' },
    { anchor: 'full-stack teams we have scaled', href: '/hire-full-stack-developers/' },
    { anchor: 'who you work with in Chișinău', href: '/about/' },
    { anchor: 'engagements we have delivered', href: '/case-studies/' },
    { anchor: 'more on Moldova and contracting', href: '/insights/' },
  ],

  cta: {
    heading: 'Talk to a recruiter in Chișinău',
    body: 'We are in the market you are asking about. Ask us something a template page could not answer.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'IT recruitment in Moldova',
}
