import type { Insight } from './types'

/**
 * Written from the questions clients actually ask at contract stage. Every
 * treaty rule cited is the OECD Model Convention wording, which is the text
 * almost every bilateral treaty in Europe is built from — the article says so
 * and tells the reader to read their own treaty rather than trusting a summary.
 *
 * No figure here is a TalentSync claim. The only first-party statements are
 * about what we put in our own paperwork.
 */
export const permanentEstablishment: Insight = {
  slug: 'permanent-establishment-risk-hiring-engineers-abroad',
  path: '/insights/permanent-establishment-risk-hiring-engineers-abroad/',
  label: 'Permanent establishment',
  title: 'Permanent establishment risk when hiring engineers abroad: what actually triggers it',
  metaTitle: 'Permanent Establishment Risk Explained',
  metaDescription:
    'What actually creates a permanent establishment when you engage an engineer abroad: the fixed-place test, agency PE, and where the real exposure sits.',
  dek: 'The fixed-place test, agency PE, the home-office question, and the three regimes people collapse into one.',
  answer:
    'A permanent establishment is a taxable presence your company acquires in another country. Hiring one engineer there rarely creates one on its own. What creates one is a place of business at your disposal, or someone habitually concluding contracts for you — not the fact that the person writes your code.',
  datePublished: '2026-08-24',
  dateModified: '2026-08-31',
  tags: ['Tax', 'Contracts', 'Cross-border'],
  group: 'contracts',
  about: ['Permanent establishment', 'International taxation', 'Cross-border employment'],
  body: [
    {
      k: 'p',
      t: 'Every CTO who has proposed hiring an engineer in another country has met the same sentence from finance: *"careful, that could create a permanent establishment."* It is said without a follow-up, so it lands as a vague threat rather than a test you can apply. It is a test. Here is its shape, and what actually moves the needle.',
    },

    { k: 'h', level: 2, id: 'what-pe-is', t: 'What a permanent establishment actually is' },
    {
      k: 'p',
      t: 'A permanent establishment — PE — is the threshold at which one country may tax the profits of a company resident in another. Article 5 of the OECD Model Tax Convention, the text nearly every bilateral treaty in Europe is drafted from, defines it as **"a fixed place of business through which the business of an enterprise is wholly or partly carried on"**. Article 7 then limits the other country to the profits *attributable to that PE*.',
    },
    {
      k: 'p',
      t: 'The consequences are administrative before they are financial: registering with a foreign tax authority, attributing profit to the PE, filing returns in a language you do not speak, often a local payroll obligation too. The tax due is usually small — the profit attributable to one engineer writing code is not large — and the compliance cost is not. That asymmetry is why the question is worth ten minutes up front.',
    },
    {
      k: 'p',
      t: 'One clarification, because it saves a lot of confused conversations: PE is a **corporate tax** concept. It is not employment law, not social security, and not whether your contractor is really an employee. Three regimes, three tests, and they can produce three different answers on the same facts.',
    },

    { k: 'h', level: 2, id: 'how-pe-is-created', t: 'The three ways one gets created' },
    {
      k: 'p',
      t: 'Under the Model treaty, there are three routes, and it is worth knowing which one your fact pattern is even near.',
    },
    {
      k: 'ol',
      items: [
        '**Fixed place of business (Art 5(1)–(2)).** Premises, a branch, an office — anywhere at the disposal of your enterprise, with a degree of permanence, through which your business is carried on. This is the one an engineer can touch, because a home office is a place.',
        '**Dependent agent (Art 5(5)).** Someone who habitually concludes contracts in your name, or habitually plays the principal role leading to contracts you then sign without material modification. The 2017 revision added that second limb to catch arrangements where the local person did everything except hold the pen.',
        '**Construction and, in some treaties, services (Art 5(3)).** A building site lasting over twelve months — and, in treaties drafted on the UN Model, a **services PE**: furnishing services through personnel present in the country for more than 183 days in any twelve-month period. Read your treaty before assuming it has no such clause.',
      ],
    },
    {
      k: 'p',
      t: 'Article 5(4) carves out activities of a **preparatory or auxiliary** character. Do not reach for it: since BEPS Action 7 it is qualified by an anti-fragmentation rule, and engineering *is* the business of a software company. Auxiliary is not a plausible description of the people building your product.',
    },
    {
      k: 'note',
      t: 'If there is no treaty, the carve-outs do not exist either',
      body: [
        'All of the above is treaty law. With no treaty in force between your country and the engineer’s, you are left with each country’s **domestic** definition of a taxable presence — usually wider, with none of these thresholds. Check a treaty exists before relying on any of these tests. Moldova has treaties with most European states; verify yours rather than assuming.',
      ],
    },

    {
      k: 'h',
      level: 2,
      id: 'engineers-vs-salespeople',
      t: 'Why an engineer is a different risk profile from a salesperson',
    },
    {
      k: 'p',
      t: 'The agency limb catches most companies, and it is essentially a sales problem: someone in-country negotiates the terms, the customer signs, revenue arises, and the authority takes the view that the business is carried on there through that person. An engineer who commits code, attends your standups and never speaks to a customer is nowhere near that test. They conclude nothing.',
    },
    {
      k: 'p',
      t: 'So for a pure engineering hire the agency limb falls away and the fixed-place question is the live one. Two things flip that back, both avoidable if you notice them:',
    },
    {
      k: 'ul',
      items: [
        'A title implying representation — "Country Manager", "Head of Engineering, DACH" — on someone who also signs vendor agreements. The title is not the problem; signing authority is, and titles attract it.',
        'Architects and sales engineers who sit in commercial negotiations. If a customer’s decision routinely turns on what your person agreed, the second limb of Art 5(5) is in play.',
      ],
    },

    { k: 'h', level: 2, id: 'home-office', t: 'The home-office question, which is where this usually lands' },
    {
      k: 'p',
      t: 'Can an engineer’s spare room be a fixed place of business of your company? The OECD Commentary on Article 5 addresses this directly, and the answer turns on one phrase: whether the space is **at the disposal of the enterprise**. Not whether work happens there — whether the enterprise, in substance, has the space available to it.',
    },
    {
      k: 'p',
      t: 'The Commentary’s own contrast is the useful one. A consultant working from home in a country over a long period, carrying on the enterprise’s business from that home, can create a PE. A cross-frontier employee who works at the kitchen table some days while an office is provided to them does not: the use is intermittent and incidental, and the enterprise has no claim on the space. The factors that move a case from the second picture to the first are practical, and you control most of them:',
    },
    {
      k: 'table',
      caption: 'What tends to put a home office "at the disposal" of the enterprise',
      head: ['Factor', 'Points away from a PE', 'Points towards one'],
      rows: [
        [
          'Whose requirement',
          'The person chooses to work from home; you would provide space if asked',
          'You require home working and provide no alternative anywhere',
        ],
        [
          'Who pays',
          'They run their own premises out of their own fee',
          'You pay rent, fit out the room, or reimburse a dedicated office',
        ],
        [
          'Exclusivity of use',
          'They also work for other clients from the same desk',
          'The space is used only for your work, effectively full time',
        ],
        [
          'Permanence',
          'Short engagement, or genuinely intermittent use',
          'Continuous use over many months with no end in sight',
        ],
        [
          'Your access',
          'You have no right to enter, inspect or control the space',
          'You can require access, audits or a specific physical setup',
        ],
      ],
    },
    {
      k: 'p',
      t: 'Note what is *not* on that list: a company laptop, an email address on your domain, a seat in your sprint ceremonies. Integration is normal and is not the test. A great deal of nervous drafting goes into pretending an engineer is at arm’s length while the fact that matters — whose premises, on whose account — is left untouched.',
    },

    {
      k: 'h',
      level: 2,
      id: 'independent-contractor',
      t: 'What the "independent contractor" label does and does not buy you',
    },
    {
      k: 'p',
      t: 'Article 5(6) says an enterprise has no PE merely because it does business through an agent of independent status acting in the ordinary course of that agent’s own business. A real and useful exemption — with a condition the 2017 revision made explicit: it does not apply where the person acts **exclusively or almost exclusively** for one or more closely related enterprises.',
    },
    {
      k: 'p',
      t: 'Read that against a typical "contractor" arrangement: one client, forty hours a week, your tooling and your backlog, indefinitely. Independent on paper, dependent in fact — and that is the same evidence an employment inspector uses to reclassify a relationship. PE risk and misclassification risk are different tests fed by one set of facts, which is why the honest version of a B2B engagement beats a clever one. The structure we use is on the [direct B2B recruitment page](/b2b-engineer-recruitment/): the engineer contracts with you as a business, and it has to be true.',
    },
    {
      k: 'note',
      t: 'Employer of record is not a PE shield',
      body: [
        'EOR providers solve a real problem — lawful local employment and payroll without your own entity — and several market themselves as removing PE risk. They reduce employment and payroll exposure. They do not automatically remove PE exposure: the tax test looks at the activity carried on in the country and at whose disposal the place is, not at whose name is on the payslip. Ask an EOR for their position on Art 5(1) specifically.',
      ],
    },

    { k: 'h', level: 2, id: 'three-regimes', t: 'Three regimes, not one' },
    {
      k: 'p',
      t: 'Most of the confusion here comes from collapsing three questions into one word. Separate them and each becomes answerable.',
    },
    {
      k: 'dl',
      items: [
        {
          t: 'Corporate tax (PE)',
          d: 'Does your company acquire a taxable presence in their country? The Article 5 test above. Consequence: registration, profit attribution, returns.',
        },
        {
          t: 'Withholding tax on the fee',
          d: 'Separate, and it bites regardless of PE. Several jurisdictions require the payer to withhold on service fees paid to a non-resident supplier unless treaty relief is claimed, sometimes in advance and on a prescribed form. A withholding on a fee you budgeted gross is a real cost, and it lands on whoever the contract says it does. Ask for a certificate of tax residence at onboarding, not at the first invoice.',
        },
        {
          t: 'Social security and payroll',
          d: 'Governed by coordination rules and bilateral agreements, not by the tax treaty. There is no EU A1 route for a supplier outside the EU: a contractor in a non-EU country pays into their own system through their own company. Where that structure is genuine this question is quiet; where the person is later found to be your employee, it is the loudest of the three.',
        },
      ],
    },

    { k: 'h', level: 2, id: 'paperwork', t: 'What we put in the paperwork' },
    {
      k: 'p',
      t: 'None of this is exotic to draft. On the engagements we set up — the direct B2B contracts a client holds with the engineer, and the [hourly collaboration we contract for ourselves](/hourly-engineering-talent/) — the same few terms do the work:',
    },
    {
      k: 'ul',
      items: [
        '**Place of performance, named.** Remote, from the engineer’s own country — a stated place, because every test above starts with where the work happens.',
        '**No authority.** The engineer may not negotiate, conclude or sign anything on the client’s behalf, and holds no power of attorney or delegated signature.',
        '**No premises made available.** No office, no reserved desk, no rented space: the engineer works from their own premises at their own cost.',
        '**Travel, counted and capped.** Onboarding weeks and offsites are normal and nowhere near any threshold. Extended on-site stints are not, so the schedule caps them and someone counts the days — for PE duration and for the 183-day rule in Article 15, a separate exposure sitting on the individual.',
        '**A supplier warranty on their own business.** Own equipment, own insurance, own tax registration, freedom to serve other clients. Words that stop being true are worse than no words at all, so this one gets reviewed, not copy-pasted.',
      ],
    },

    { k: 'h', level: 2, id: 'questions', t: 'Five questions worth putting to a tax adviser' },
    {
      k: 'p',
      t: 'Take these to your adviser instead of "can we hire in country X". One email, and they cover the exposure actually available on these facts.',
    },
    {
      k: 'ol',
      items: [
        'Is there a double tax treaty in force between us and the engineer’s country, and does its Article 5 include a **services PE** clause?',
        'On our facts — home office, no signing authority — does the fixed-place test bite, and what would have to change for the answer to flip?',
        'Does our country impose **withholding tax** on service fees paid to that country, at what rate, and what does relief require?',
        'If the engineer visits us, at how many days per rolling twelve months does anything change — for us, and for them personally?',
        'If the relationship were reclassified as employment tomorrow, what is the exposure and who bears it under our contract?',
      ],
    },

    { k: 'h', level: 2, id: 'sources', t: 'Sources, and the disclaimer that means it' },
    {
      k: 'p',
      t: 'We are a recruitment firm, not a tax adviser, and this is not tax advice. It is the framework we use to structure engagements, and the vocabulary that makes an adviser conversation short. The primary texts are public and more readable than their reputation:',
    },
    {
      k: 'ul',
      items: [
        '[OECD Model Tax Convention on Income and on Capital](https://www.oecd.org/tax/treaties/) — Article 5 and its Commentary, including the home-office discussion.',
        '[OECD BEPS Action 7](https://www.oecd.org/tax/beps/) — the report behind the current Art 5(5)/(6) wording.',
        '[United Nations Committee of Experts on International Cooperation in Tax Matters](https://financing.desa.un.org/) — publisher of the UN Model, the source of the services-PE variant.',
        'Your own treaty. Every finance ministry publishes them; Article 5 is two pages of it.',
      ],
    },
    {
      k: 'p',
      t: 'Applying this to a specific engagement is a first-call conversation, usually with your adviser copied. The engineers we place work remotely [from Moldova and across Eastern Europe](/technical-recruitment-moldova/), from their own premises — the fact pattern the tests above are least interested in, deliberately.',
    },
  ],
}
