import type { Insight } from './types'

/**
 * The model-choice article, and the one shaped for the ChatGPT channel: a real
 * decision framework with a "use neither" branch that names the cases we turn
 * away.
 *
 * The country notes are the strongest thing here — they come from the
 * jurisdiction work in docs/plans/spec/13-contracts-research.md §15, every row
 * of which carries a primary or authoritative source, reproduced with its date
 * so a reader can age it. Anything the research marked unverified is not here.
 *
 * Deliberately does NOT reuse canonical blocks B and C (02-page-content.md
 * Part 0): those are bound to five named pages, and a sixth verbatim copy would
 * be the duplication that rule exists to prevent.
 */
export const b2bOrHourly: Insight = {
  slug: 'b2b-contract-or-hourly-collaboration',
  path: '/insights/b2b-contract-or-hourly-collaboration/',
  label: 'B2B or hourly',
  title: 'Direct B2B contract or hourly collaboration: a decision framework, including when to use neither',
  metaTitle: 'B2B Contract or Hourly Collaboration?',
  metaDescription:
    'A framework for choosing between a direct B2B contract with the engineer and hourly collaboration through an agency — and the cases where neither is right.',
  dek: 'Five questions that decide the model, the country rules that override your answer, and the engagements we turn down.',
  answer:
    'Two structures, one decision. On a direct B2B contract you hold the agreement with the engineer and manage them yourself. On hourly collaboration the agency holds the contract and bills for hours worked. Pick by how certain your need is, who carries replacement risk, and which jurisdiction you are hiring into.',
  datePublished: '2026-08-28',
  dateModified: '2026-08-31',
  tags: ['Engagement models', 'Contracts', 'Compliance'],
  group: 'practice',
  about: ['Contract staffing', 'Independent contractors', 'Employment classification'],
  body: [
    {
      k: 'p',
      t: 'Almost every conversation about adding engineering capacity abroad arrives at the same fork, usually framed as a preference. It is not one. The two structures allocate risk, admin and control differently, and each is clearly right in some situations and clearly wrong in others. This is the framework we use before we quote, including the part where the answer is that we should not be involved at all.',
    },

    { k: 'h', level: 2, id: 'two-structures', t: 'The two structures, stated plainly' },
    {
      k: 'p',
      t: '**Direct B2B.** We find, screen and technically validate the engineer, you interview and select, and then you contract with them directly. The engineer invoices you as an independent business. One relationship remains afterwards and it is yours: you manage the person, set the terms and own the continuity. We are paid a fee for the introduction and step out.',
    },
    {
      k: 'p',
      t: '**Hourly collaboration.** We hold the contract with the engineer and you hold one contract with us, billed for hours actually worked. The engineer works inside your repositories and your sprint cadence, and you direct the work — but the paperwork, invoicing, replacement cover and the contractual chain sit with us. Capacity can go up, down or on hold at an agreed notice period.',
    },
    {
      k: 'p',
      t: 'Neither is outsourcing. In both models you keep architecture, roadmap, priorities and technical decisions; nobody hands you a black box. If you want a fixed scope delivered by someone who owns the outcome, both are the wrong shape — the last section says so more bluntly.',
    },

    { k: 'h', level: 2, id: 'five-questions', t: 'The five questions that decide it' },
    {
      k: 'ol',
      items: [
        '**How certain is the need, and for how long?** Firm and open-ended points to direct B2B — the admin is a one-off and the ongoing cost is the lowest of the two. Uncertain, tied to a funding round, or bounded by a project with a fuzzy end date points to hourly, where you are paying for optionality and it is worth paying for.',
        '**Who carries replacement risk?** On a direct contract, an engineer leaving in month four is your problem and your search. On hourly it is ours, in writing. Price that difference rather than pretending it does not exist.',
        '**Can you carry the administration?** A direct engagement means contracting with a foreign company, checking their registration, handling invoices in another currency, and holding the IP chain yourself. It is perfectly manageable and most teams do it. If your finance function is one person who is already at capacity, hourly moves that work.',
        '**Do you have someone to review the work?** This is the question that predicts failure better than any other. A senior engineer joining a team with a reviewer and a working CI pipeline will be productive in a fortnight, on either model. A senior engineer joining a company with no one who can read their pull requests is a risk that no contract structure fixes.',
        '**Which jurisdiction are you hiring into?** Your answer to the four questions above can be overridden entirely by the country you sit in. See the country notes below — in one European market the hourly model needs local advice before you sell it at all.',
      ],
    },

    { k: 'h', level: 2, id: 'comparison', t: 'Side by side' },
    {
      k: 'table',
      caption: 'The same engagement, two structures',
      head: ['', 'Direct B2B contract', 'Hourly collaboration'],
      rows: [
        ['Who holds the contract with the engineer', 'You', 'We do'],
        ['Who directs the work day to day', 'You', 'You'],
        ['Commitment', 'Whatever you agree with the engineer', 'Hours worked, with an agreed notice period'],
        ['Replacement if the engineer leaves', 'Your search, unless a guarantee period applies', 'Ours, under the contract'],
        ['Admin load on you', 'Foreign supplier onboarding, invoices, IP chain', 'One supplier, one invoice'],
        ['Cost shape', 'One-off fee, then the engineer’s rate', 'A single hourly rate, ongoing'],
        ['Best when', 'The need is firm and long-term', 'The need is real but the horizon is not'],
        ['Weakest when', 'You cannot absorb the onboarding admin', 'The engagement runs for years at full time'],
      ],
    },

    { k: 'h', level: 2, id: 'misclassification', t: 'The test you will actually be measured against' },
    {
      k: 'p',
      t: 'Both models depend on the engineer genuinely being in business on their own account. Where they are not, an authority can recharacterise the relationship as employment, and the consequences land on the client as often as on the supplier. The tests differ by country but the evidence they look at barely does:',
    },
    {
      k: 'ul',
      items: [
        '**Direction and control** — is the person told how to work, or what outcome to reach? Setting priorities and sprint goals is normal client behaviour; managing someone as a line report is employer behaviour.',
        '**Integration** — job title in your org chart, on your all-hands invite list, in your performance review cycle. Some integration is unavoidable and fine; a person indistinguishable from your staff is evidence.',
        '**Exclusivity and duration** — one client, full time, for years, is the single most common fact pattern behind a reclassification.',
        '**Own business risk** — own equipment, own insurance, own registration, the ability to send a qualified substitute, and liability for fixing their own defects.',
        '**Pay shape** — fixed monthly amounts that look exactly like salary, holiday paid as if accrued, notice that mirrors an employment contract.',
      ],
    },
    {
      k: 'note',
      t: 'Choosing Moldovan law does not switch off German or Dutch rules',
      body: [
        'Rome I ([Regulation 593/2008](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32008R0593)) gives commercial parties a free choice of law — and Article 9 preserves the **overriding mandatory provisions** of the forum. A German or Dutch court will apply its own labour-supply and employment-status rules regardless of the governing-law clause. Any supplier who answers a classification question with "our contract is under Moldovan law" has answered a different question.',
      ],
    },

    { k: 'h', level: 2, id: 'country-notes', t: 'Country notes that can override your answer' },
    {
      k: 'p',
      t: 'These are the markets our clients hire from most, with the position as at **August 2026**. Rules in this area are moving quickly in two of them, so treat this as the shape of the question and check the date on anything you rely on.',
    },
    // A description list, not a table: three columns of 50-word prose cells
    // become a 2,000px `w-max` scroller at 360px, and a <dl> reflows to a stack
    // for free. Same call LegalPageTemplate makes for its "which part applies"
    // router.
    {
      k: 'dl',
      items: [
        {
          t: 'Germany',
          d: 'Federal Employment Agency guidance effective **1 October 2025** takes the position that no *Arbeitnehmerüberlassung* permit is needed where the engineer works exclusively online from abroad and never enters Germany — administrative guidance, not case law. **Effect:** workable when strictly remote. On-site work reopens the permit question, and unlicensed labour supply is the expensive failure mode: the supply contract is void and employment can be deemed to arise with the client.',
        },
        {
          t: 'Netherlands',
          d: 'The broadest labour-supply concept in Europe. WAADI reaches beyond employment to any working relationship, and the Supreme Court extended the no-hire prohibition to self-employed contractors (HR 14 April 2017, ECLI:NL:HR:2017:689). Enforcement against false self-employment resumed in 2025, and a new admission system for lenders takes effect **1 January 2027**. **Effect:** the highest-attention jurisdiction — get Dutch advice before you start, and expect your supplier to be asked whether they are registered.',
        },
        {
          t: 'Belgium',
          d: 'Article 31 of the Law of 24 July 1987 **prohibits** placing workers at the disposal of a user who exercises any part of employer authority, outside recognised exceptions. **Effect:** do not buy the hourly model into Belgium without local advice. Sanctions are civil and criminal, the user can be deemed the employer, and the supplier’s invoices can become unenforceable. Direct introductions are unaffected.',
        },
        {
          t: 'Norway',
          d: 'Hiring-in (*innleie*) has been lawful only in narrow cases since **1 April 2023**, with a specialist-expertise route for defined consultancy projects and a registration and approval scheme for staffing enterprises. **Effect:** structure and document the work as a defined-scope assignment, or use the specialist route with a written project definition. The scope section of the assignment schedule carries the weight.',
        },
        {
          t: 'Sweden',
          d: 'Under the Agency Work Act, an agency worker at the same operating unit for **24 months within 36** must be offered indefinite employment or compensation. **Effect:** fine for normal engagements; diarise long ones at around 20 months rather than discovering the rule at 25.',
        },
        {
          t: 'United Kingdom',
          d: 'The Conduct Regulations 2003 cap transfer fees unless a valid regulation 32 opt-out is signed by both the contractor’s company and the individual **before** the assignment starts; IR35 sits separately, on the client. **Effect:** take the opt-out at onboarding or accept the short statutory windows. Ask a supplier when they take it — "after the assignment starts" is the wrong answer.',
        },
      ],
    },

    { k: 'h', level: 2, id: 'conversion', t: 'The conversion question, and the clause that is void' },
    {
      k: 'p',
      t: 'Sooner or later an hourly engagement goes well enough that you want the engineer permanently. Agree what happens then, before it happens. Two things are worth knowing.',
    },
    {
      k: 'p',
      t: 'First, a clause that **prohibits** you from hiring the engineer is unenforceable in the EU. Article 6(2) of the Temporary Agency Work Directive ([2008/104/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32008L0104)) makes such clauses null and void, with an express proviso allowing the agency a reasonable level of recompense. In the Netherlands the same rule reaches engagements of self-employed contractors, not only employees. So the enforceable instrument is a fee, not a ban — and a supplier whose contract contains a flat prohibition is telling you how the rest of their paperwork was written.',
    },
    {
      k: 'p',
      t: 'Second, a transfer fee should taper with time served and eventually disappear. An engineer you have paid for over eighteen months has earned the introduction several times over. Ask for the taper table at contract stage; if there is none, ask why.',
    },

    { k: 'h', level: 2, id: 'neither', t: 'When to use neither' },
    {
      k: 'p',
      t: 'The most useful thing an agency can tell you is when not to buy. These are the cases where we say so on the first call:',
    },
    {
      k: 'ul',
      items: [
        '**You want a product delivered, not capacity added.** Fixed scope, fixed price, someone else owning the outcome — that is a development contract with an outsourcing firm, and it is a legitimate thing to buy. It is not what either of these models is. Buying capacity when you wanted delivery produces a team you have to manage and a result nobody owns.',
        '**You need an employee for a reason that is not commercial.** A regulated role, a works council agreement, a security clearance, a customer contract that requires named employees — the requirement decides the structure, and no contractor arrangement satisfies it.',
        '**This is your first engineer.** With nobody to review the work, set technical direction or say no to a bad approach, a strong remote senior will drift and you will conclude that remote hiring does not work. Hire your first engineer where you can sit with them, then add capacity.',
        '**The work is under about ten hours a week.** Below that, context-switching costs more than the hours buy, on either model. Bundle it into a real part of a week, or wait until there is more of it.',
        '**Belgium, on the hourly model, without local advice.** See the table. The direct model is fine; the labour-supply route needs a Belgian lawyer first.',
        '**You need someone on site in Germany from day one.** The remote position that makes German engagements straightforward stops applying the moment the engineer is physically there, and that needs answering before you sign, not after.',
      ],
    },

    { k: 'h', level: 2, id: 'what-we-recommend', t: 'What we recommend, and what we can evidence' },
    {
      k: 'p',
      t: 'Our default recommendation is the direct B2B contract when the need is firm, because it leaves you with the cleanest long-term structure and the lowest ongoing cost, and hourly collaboration when the horizon is genuinely uncertain, because you are buying the right to stop. We will say which one we think fits after the brief, and we have talked clients out of the more expensive one often enough that it is a policy rather than a posture.',
    },
    {
      k: 'p',
      t: 'On speed, the honest version: across our five most recent engagements — eight engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief. Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we tell you that at the brief rather than at week three. The full record, with stacks and timings, is on the [case studies page](/case-studies/).',
    },
    {
      k: 'p',
      t: 'The mechanics of each model live on their own pages: [how direct B2B engineer recruitment works](/b2b-engineer-recruitment/), including permanent establishment, VAT and IP assignment, and [how hourly engineering collaboration is contracted](/hourly-engineering-talent/), including notice, substitution and rate mechanics. If the country you are hiring from is the sticking point, [the Eastern European market overview](/tech-recruitment-eastern-europe/) compares the jurisdictions we recruit in.',
    },
  ],
}
