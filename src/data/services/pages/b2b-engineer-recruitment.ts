/**
 * Route 4 — `/b2b-engineer-recruitment/`. The wedge page.
 *
 * This is the contract-mechanics page: permanent establishment, VAT reverse
 * charge on a non-EU supply, IP assignment, GDPR transfers out of a country
 * with no adequacy decision, misclassification, and how the money moves.
 * 02-page-content.md §4 puts a publication gate on it — a qualified adviser
 * reviews it before it ships — and requires the "general information, not
 * advice" line in every section that touches tax or law. Both are honoured
 * below: the line is repeated verbatim rather than stated once at the top,
 * because a reader who lands on an anchor never sees the top.
 *
 * BLOCK D (DECISIONS.md D7) appears here verbatim and must not be reworded.
 *
 * Nothing here states a rate, a fee percentage or an entity fact. Those are
 * business facts owned by Victor (BLOCKERS.md), and a surviving `{{TOKEN}}`
 * fails `npm run verify`, so the page is written to be correct without them.
 */

import type { ServicePage } from '../types'

/** Repeated at the foot of every section that touches tax or law. */
const NOT_ADVICE = 'This is general information, not tax or legal advice for your situation.'

export const b2bEngineerRecruitment: ServicePage = {
  slug: 'b2b-engineer-recruitment',
  label: 'Direct B2B Recruitment',
  metaTitle: 'B2B Engineer Recruitment: How It Works | TalentSync',
  metaDescription:
    'B2B engineer recruitment explained: contracts, VAT reverse charge, IP assignment, permanent establishment risk and Moldova’s 7% IT Park regime.',
  h1: 'B2B Engineer Recruitment: How the Contract Actually Works',

  answerParagraph:
    'B2B engineer recruitment means the engineer contracts with your company as an independent business rather than as an employee, invoicing you directly for their services. You get senior capacity without a local entity, foreign payroll or employment obligations abroad. The trade-offs are real and specific: permanent establishment exposure, VAT treatment, IP assignment and misclassification risk — each addressed below.',

  whoFor: {
    audience: 'Founders, finance leads and counsel structuring a cross-border engagement',
    body: [
      'The person who has to sign this, and the two people who have to approve it. In most companies the engineer was chosen weeks ago and the engagement is sitting with finance or legal waiting for someone to answer four questions nobody wrote down.',
      'Those four questions are permanent establishment, VAT, intellectual property and data protection. This page answers each one in the open, so your adviser reviews a position rather than inventing one from scratch.',
    ],
  },

  problem: [
    'Every competitor page on this topic stops at "no local entity required" and moves on to a contact form. That sentence is true and it is also the easy part, which is why the objection it triggers goes unanswered on the entire first page of results.',
    'A CFO who cannot get a straight answer on permanent establishment will not sign, and a general counsel who cannot see the IP assignment clause will not clear it. Withholding the mechanics does not remove the risk. It just moves the delay to the end of the process, after the candidate has been chosen.',
    NOT_ADVICE,
  ],

  sections: [
    {
      id: 'what-a-b2b-engagement-is',
      heading: 'What a B2B engagement is',
      blocks: [
        {
          kind: 'prose',
          body: [
            'The engagement is a supply of services between two businesses. Your company is the customer; the engineer’s company is the supplier. There is no employment relationship anywhere in the structure, in either direction, and no third party stands between the two of you once the introduction is finished.',
          ],
        },
        {
          kind: 'list',
          heading: 'Who signs what',
          items: [
            'You and the engineer’s company sign a services agreement. That is the only contract governing the work itself, and it is the one your counsel should be reading.',
            'You and TalentSync sign a short introduction agreement covering the fee and the replacement window. It is finished once the fee is settled and the window has run.',
            'The engineer’s company issues the invoices, to you, on the cadence set in the services agreement. Nothing routes through us.',
            'No contract exists between TalentSync and the engineer for the delivery of your work. We are the introducer and the technical screen, not a link in the delivery chain.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'That structure is why the model is cheaper than an intermediated one over any long horizon: after the introduction there is no margin in the flow, because there is no flow to take a margin from.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'what-talentsync-is-not-doing',
      heading: 'What TalentSync is not doing in this arrangement',
      blocks: [
        {
          kind: 'prose',
          body: [
            'TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control.',
            'In this arrangement specifically: we are not a party to the delivery relationship, we do not manage or direct the engineer, we do not stand between you and their work, and we do not report to you on their progress. Once the introduction agreement has run its course, the only two parties left are you and the engineer’s company.',
            'Read that as a limit on what you can expect from us, not only as positioning. If you want someone accountable for delivery, this is the wrong model and the hourly page or an agency will serve you better.',
          ],
        },
      ],
    },
    {
      id: 'permanent-establishment',
      heading: 'Permanent establishment: the question your CFO will ask',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A permanent establishment is a taxable presence your company creates in another country, which can bring a corporate tax filing obligation there. It is the first objection finance raises and, across the competitor pages that rank for this query, none of them answer it.',
            'Two routes matter, and both come from Article 5 of the OECD Model Tax Convention, which underlies most bilateral treaties. The first is a fixed place of business at your disposal — premises you effectively control in that country, through which your business is carried on. The second is the dependent agent route: someone who habitually concludes contracts in your name, or habitually plays the principal role leading to their conclusion.',
            'An engineer working from their own home or office, on their own equipment, writing code under your technical direction and with no authority to bind you, sits outside both routes on a normal reading. That is the ordinary case and it is the case we place into.',
          ],
        },
        {
          kind: 'list',
          heading: 'What raises the risk, in rough order',
          items: [
            'Authority to sign, negotiate or commit on your behalf. This is the one that actually creates exposure, and it is entirely avoidable.',
            'Exclusivity combined with employment-like control: you set the hours, forbid other clients, and supervise the person as a subordinate.',
            'You paying for and controlling premises in that country — a desk you rent, an office you lease, a space that is at your disposal.',
            'Long duration plus a customer-facing or revenue-generating role, rather than a purely technical one.',
            'A large group of contractors in one country behaving, in substance, like a local branch.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Moldova has double tax treaties in force with most European states, which is what determines whether a presence is taxable and where relief sits. The analysis is jurisdiction-specific in both directions — your country of establishment and the engineer’s — and it turns on facts, not on what the contract calls the relationship.',
            'Practically: keep signing authority with your own people, do not rent space for the engineer, and let the contract describe an independent supplier because that is what it is. Then have your own adviser confirm the position for your jurisdiction before the first invoice.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'vat-reverse-charge',
      heading: 'VAT: who accounts for it',
      blocks: [
        {
          kind: 'prose',
          body: [
            'For a supply of services to a business customer, the general EU rule places the supply where the customer is established rather than where the supplier is. When the supplier sits outside the EU and the customer is a taxable person inside it, the customer accounts for the VAT under the reverse charge and recovers it subject to their normal input-tax position.',
            'In practice the invoice arrives with no VAT on it and one net figure. Your finance team self-accounts, output and input generally cancel where you have full recovery, and the cash effect is nil. What they need is an invoice that shows why.',
          ],
        },
        {
          kind: 'table',
          caption: 'What a compliant invoice from a Moldovan supplier shows, line by line',
          columns: ['Line', 'What it says', 'Why it is there'],
          rows: [
            {
              label: 'Supplier',
              cells: [
                'The engineer’s company name, registration number and address in Moldova.',
                'Establishes that the supplier is established outside the EU.',
              ],
            },
            {
              label: 'Customer',
              cells: [
                'Your company name, address and VAT identification number.',
                'Your VAT number is the evidence that this is a business-to-business supply.',
              ],
            },
            {
              label: 'Description',
              cells: [
                'Software engineering services, and the period covered.',
                'A service rather than goods, which is what puts it in the general place-of-supply rule.',
              ],
            },
            {
              label: 'VAT',
              cells: [
                'No VAT charged, with the words "reverse charge" and a note that the customer accounts for the tax.',
                'Place of supply is where you are established, so the liability is yours to self-account.',
              ],
            },
            {
              label: 'Total',
              cells: [
                'A single net figure in the invoice currency.',
                'Nothing for accounts payable to strip out or gross up later.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'UK buyers apply the equivalent domestic rule for services received from an overseas supplier and account for the tax on their own return. Buyers outside the EU and the UK should check their own import-of-services rules, which vary far more than the EU position does.',
            'One caveat worth naming: this is the position for a business customer. If you are not a taxable person — a holding company with no VAT registration, for instance — the analysis changes and you should ask before the first invoice rather than after the third.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'who-owns-the-code',
      heading: 'Who owns the code',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Assignment does not happen by itself. In many jurisdictions an employer acquires rights in what an employee creates in the course of employment by operation of law, and that rule does not extend to an independent contractor. Absent a clause, the engineer’s company may keep ownership of what it wrote and you may hold nothing more than an implied licence to use it.',
            'This is the cheapest problem on the page to solve and the most expensive one to discover during due diligence, three years later, when an acquirer asks who owns the repository.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the services agreement has to contain',
          items: [
            'A present assignment of all work product — "hereby assigns", not "shall assign" — so nothing depends on a future signature from someone who has moved on.',
            'A waiver of moral rights as far as the governing law permits, plus a covenant not to assert them where waiver is not possible.',
            'A further-assurance clause obliging the supplier to sign whatever a patent or trade-mark registry later needs.',
            'A warranty on third-party and open-source components, with the licences actually named, so nothing copyleft arrives inside a deliverable unannounced.',
            'Confidentiality that survives the engagement, and a defined return-or-destroy obligation at the end of it.',
            'A governing law and forum you can realistically enforce in.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Our template carries all six. Ask for it before you commit to anything and have your own counsel mark it up — a supplier who will not send the contract until after the handshake is managing you, not protecting you.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'gdpr-and-adequacy',
      heading: 'GDPR: Moldova is not on the adequacy list',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Straight answer first: Moldova is not currently covered by a European Commission adequacy decision. Check the Commission’s published list on the day you sign, because that list does change, but plan on the assumption that it is not there.',
            'The consequence is narrower than it sounds. Transfers of personal data to Moldova rely on Article 46 safeguards — in practice the Standard Contractual Clauses, supported by a transfer impact assessment that looks at local law and at what could actually be compelled. Alongside that sits an Article 28 data processing agreement where the engineer processes personal data on your instructions.',
            'The paperwork is a solved problem. The part most buyers miss is the operational one: an engineer inside your systems is a processing question regardless of which country they sit in. Scope their access to what the role needs, keep production personal data off local machines, prefer pseudonymised or synthetic datasets for development, log access, and revoke everything on the day the engagement ends rather than the week after.',
            'Where the engineer contracts from an EU member state instead — Romania, Poland, Bulgaria — the transfer question falls away and only the processing question remains. That is a legitimate reason to choose a country, and one of the few that survives contact with a privacy team.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'misclassification',
      heading: 'Misclassification: when B2B is the wrong wrapper',
      blocks: [
        {
          kind: 'prose',
          body: [
            'If you set the working hours, supply the equipment, forbid other clients and manage the person as a subordinate, you have an employment relationship with a contractor’s paperwork on top of it. Tribunals and tax authorities look at the substance, and the label on the document is close to the last thing they consider.',
          ],
        },
        {
          kind: 'list',
          heading: 'The factors that get weighed',
          items: [
            'Control: who decides how the work is done, and when it is done.',
            'Substitution: may the supplier send a competent replacement, in principle, or is the individual the point?',
            'Integration: is the person part of your organisation — on the org chart, in the appraisal cycle, holding a company email as an employee would?',
            'Business risk: do they carry their own costs, insurance and liability, or are they simply paid for time with no downside?',
            'Exclusivity: are they free to serve other clients in practice as well as on paper?',
            'Equipment and premises: whose machine, whose office, whose licences.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'None of those factors is decisive alone and they are weighed as a whole, which is why a contract that recites the right words but describes the wrong reality helps nobody. The good news is that the fix is usually operational rather than legal: stop doing the two or three things that look like employment.',
            'Where you genuinely need employment-grade control, use an employer of record instead. It costs more per head and that premium is what buys you the ability to direct someone as a subordinate lawfully. We will tell you when your situation is that one, because a misclassified engagement is a problem you inherit and we do not.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'moldova-it-park',
      heading: 'Moldova’s IT Park and why it makes this cleaner',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Moldova operates a virtual IT park: a resident regime for qualifying technology companies under which a single tax on turnover, currently 7%, replaces most of the taxes a company would otherwise pay separately — corporate income tax, tax on employment income, and social and medical contributions among them.',
            'For you as the customer, the effect is felt in three places. The invoice is one net figure with no domestic tax layered on it. The engineer’s own cost base is stable, so their rate does not drift upward every time a payroll cost changes at home. And the supplier is a registered resident company with a filing obligation and a public registration number, which is a materially better counterparty than an individual freelancer with a personal bank account.',
            'The regime has an end date set in legislation and it has been extended before. Treat it as the current position rather than a permanent feature, and note that it changes the engineer’s tax position, never yours.',
            'The full mechanics, including what residency requires and what it does not cover, sit on our Moldova page.',
            NOT_ADVICE,
          ],
        },
      ],
    },
    {
      id: 'how-payment-works',
      heading: 'How payment actually works',
      blocks: [
        {
          kind: 'list',
          items: [
            'Currency: EUR or USD, fixed in the contract. Pick one and keep it, because a rate quoted in one currency and paid in another quietly moves every month.',
            'Rails: historically SWIFT for a Moldovan account, though Moldovan banks have been joining the SEPA schemes. Ask which the engineer’s bank supports before the first invoice rather than after it goes missing.',
            'Timing: one to three working days is normal for a cross-border transfer. Build that into the payment terms instead of discovering it on the due date.',
            'Cadence: monthly in arrears against a dated invoice, with the period covered stated on the invoice itself.',
            'Charges: shared between the parties unless the contract says otherwise. If you want the engineer to receive the exact invoiced figure, say so in the contract and expect to pay the sending fee.',
            'What finance needs on the invoice: supplier company name, registration number, VAT status, address, your VAT number, the reverse-charge wording, the period, and the IBAN with the SWIFT or BIC code.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'One practical point that saves a fortnight. Ask your bank for the beneficiary requirements before the first payment, because some institutions require additional detail for a transfer to a non-EU account, and finding that out on the day an invoice falls due is how a good engagement starts badly.',
            NOT_ADVICE,
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'Backend', items: ['Python', 'Java', '.NET', 'Node.js'] },
    { group: 'Frontend', items: ['React', 'Angular', 'TypeScript'] },
    { group: 'Cloud and platform', items: ['AWS', 'Azure', 'Kubernetes', 'Terraform'] },
    { group: 'Data and AI', items: ['PostgreSQL', 'Airflow', 'PyTorch'] },
  ],

  seniorities: [
    {
      label: 'Senior',
      detail:
        'The band this contract structure is written for. These engineers already run their own company, already invoice other clients, and will read the agreement properly before signing it.',
    },
    {
      label: 'Lead and architect',
      detail:
        'Same paperwork, longer negotiation. Expect a counter-proposal on the notice period and on the non-solicitation clause, and expect it to be reasonable.',
    },
    {
      label: 'Mid-level',
      detail:
        'Frequently not registered as a business yet. Where the person is not already invoicing someone, allow two to three weeks for registration before they can start on B2B terms at all.',
    },
  ],

  coverage: {
    summary:
      'Engineers contract from Moldova, Romania and elsewhere in the region. The mechanics on this page are written for a Moldovan supplier invoicing an EU or UK customer.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  engagementModels: ['b2b', 'hourly'],

  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior backend developer, Python',
      count: 1,
      outcome: 'Engaged on a services agreement held directly by the client.',
      href: '/case-studies/qualiwise/',
    },
    {
      client: 'Silvertalent',
      role: 'Full-stack developers, React and .NET',
      count: 3,
      outcome: 'Three separate supplier contracts, one shared start date.',
      href: '/case-studies/silvertalent/',
    },
  ],

  faqs: [
    {
      question: 'Can hiring a Moldovan contractor create a permanent establishment for my company?',
      answer:
        'Generally not, where the engineer is genuinely independent, works from their own premises, serves their own clients and does not conclude contracts in your name. Risk rises with exclusivity, employment-like control and any authority to bind you. Moldova has double tax treaties with most European states. Confirm with your own adviser.',
    },
    {
      question: 'Who accounts for VAT on an invoice from a Moldovan engineer?',
      answer:
        'For services supplied to an EU business customer by a supplier outside the EU, the place of supply is where you are established and you account for VAT under the reverse charge, recovering it subject to your normal position. The invoice arrives without VAT. UK buyers apply the equivalent rule.',
    },
    {
      question: 'Who owns the intellectual property the engineer produces?',
      answer:
        'You do, provided the contract says so — assignment is not automatic in a contractor relationship. Our template contains a present assignment of all work product, a waiver of moral rights where the governing law allows, and a warranty covering third-party and open-source components. Your counsel should review it.',
    },
    {
      question: 'Moldova is not on the EU adequacy list. Is that a GDPR problem?',
      answer:
        'It is a solvable one. Transfers rely on Article 46 safeguards — Standard Contractual Clauses plus a transfer impact assessment — with a data processing agreement alongside. The practical controls matter more than the paperwork: scoped access, no production personal data on local machines, and revocation on the day the engagement ends.',
    },
    {
      question: 'Is a B2B contract just disguised employment?',
      answer:
        'Not if it is structured properly, and it is your risk if it is not. The engineer must control their own working method, be free to serve other clients, use their own equipment and carry their own business risk. If you need to direct someone as a subordinate, use an employer of record instead.',
    },
    {
      question: 'What is Moldova’s IT Park and why does it matter to me?',
      answer:
        'Resident IT companies pay a single tax on turnover, currently 7%, in place of most other business taxes. For you that means a simpler, more predictable invoice from a contractor whose own tax position is stable, and it is a material reason Moldovan B2B rates hold steady rather than drifting with payroll costs.',
    },
    {
      question: 'How do we actually pay a Moldovan contractor?',
      answer:
        'By bank transfer against a monthly invoice, in EUR or USD, typically over SWIFT, settling in one to three working days. Your finance team needs the engineer’s company name, registration number, VAT status and IBAN — all of which appear on the invoice. Charges are shared unless the contract says otherwise.',
    },
  ],

  internalLinks: [
    { anchor: 'Moldova’s IT Park regime in detail', href: '/technical-recruitment-moldova/' },
    { anchor: 'hourly collaboration instead', href: '/hourly-engineering-talent/' },
    { anchor: 'how the recruitment process runs', href: '/hire-software-developers-eastern-europe/' },
    { anchor: 'the wider Eastern European market', href: '/tech-recruitment-eastern-europe/' },
    { anchor: 'who you are contracting with', href: '/about/' },
    { anchor: 'more on contracts and tax', href: '/insights/' },
  ],

  cta: {
    heading: 'Have your lawyer read our template',
    body: 'We will send the B2B contract and the DPA before you commit to anything, not after.',
    primary: {
      label: 'Request the contract template',
      href: 'mailto:victor@talentsync.eu?subject=Contract%20template%20request',
      external: true,
    },
    secondary: {
      label: 'Book a 30-minute call',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
  },

  schemaTypes: ['Service'],
  serviceType: 'Direct B2B engineer recruitment',
}
