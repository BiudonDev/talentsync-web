import type { Insight } from './types'

/**
 * The wedge article. Nobody ranking for "hire developers Moldova" explains this
 * regime, and we are inside it.
 *
 * Deliberately conservative on two numbers: the per-employee floor under the
 * single tax and the regime's expiry date both move by amendment, so the piece
 * states the mechanism and tells the reader where to read the current figure,
 * rather than freezing a number that will be wrong in a year. The 7% headline
 * rate is stated with the date we checked it (DECISIONS.md D7 — no unverifiable
 * savings percentages anywhere).
 */
export const moldovaItPark: Insight = {
  slug: 'moldova-it-park-single-tax-explained',
  path: '/insights/moldova-it-park-single-tax-explained/',
  label: 'Moldova IT Park',
  title: 'Moldova’s IT Park 7% single tax, explained for the company paying the invoice',
  metaTitle: 'Moldova’s IT Park 7% Single Tax',
  metaDescription:
    'What Moldova’s 7% single tax on turnover replaces, who qualifies as a resident, and what it does and does not change on the invoice a client receives.',
  dek: 'A virtual tax regime, not a business park — and what it means for the supplier invoice on your desk.',
  answer:
    'Moldova’s IT Park is a virtual tax regime, not a business park. Resident IT companies pay a single tax of 7% of turnover in place of corporate income tax, payroll taxes and social contributions. It changes your supplier’s cost base and the stability of their price — not the invoice you post.',
  datePublished: '2026-08-26',
  dateModified: '2026-08-31',
  tags: ['Moldova', 'Tax', 'Cost'],
  group: 'market',
  about: ['Moldova IT Park', 'Taxation in Moldova', 'Software outsourcing costs'],
  body: [
    {
      k: 'p',
      t: 'Search for engineering rates in Moldova and you will find the same sentence on a dozen agency pages: *"thanks to the IT Park regime, costs are lower."* None of them says what the regime is, who it applies to, or what it does to the invoice you actually receive. We are a recruitment company registered in Chișinău, we quote against this regime routinely, and it is not complicated once someone writes it down.',
    },

    { k: 'h', level: 2, id: 'what-it-is', t: 'What the regime is' },
    {
      k: 'p',
      t: 'Moldova IT Park was created by **Law No. 77/2016 on information technology parks** and has been operating since **1 January 2018**. The word "park" is misleading in English: it is not a location and there is no campus. It is a *virtual* park — residency is a tax status a company applies for and holds wherever in the country it happens to sit. A two-person studio in Bălți and a 400-person engineering firm in Chișinău can both be residents.',
    },
    {
      k: 'p',
      t: 'The mechanism is a **single tax of 7% of sales revenue**. Not 7% of profit: 7% of turnover, calculated monthly, paid to one place, in place of the stack of taxes a non-resident Moldovan company pays separately. That is the whole design — the state traded rate for simplicity and for a base that is very hard to erode.',
    },

    { k: 'h', level: 2, id: 'what-it-replaces', t: 'What the 7% replaces' },
    {
      k: 'p',
      t: 'This is the part that matters commercially, because it is where the cost difference comes from. The single tax stands in for, among others:',
    },
    {
      k: 'table',
      caption: 'The single tax in place of the ordinary regime',
      head: ['Ordinarily payable by a Moldovan company', 'Inside the IT Park'],
      rows: [
        ['Corporate income tax on profit', 'Included in the 7%'],
        ['Personal income tax withheld on employees’ salaries', 'Included in the 7%'],
        ['Mandatory state social insurance contributions (employer and employee)', 'Included in the 7%'],
        ['Mandatory health insurance contributions', 'Included in the 7%'],
        ['Local taxes, real estate tax and road tax on company assets', 'Included in the 7%'],
        ['VAT on domestic supplies', '**Not** included — the ordinary VAT rules still apply'],
      ],
    },
    {
      k: 'p',
      t: 'Read the payroll rows again, because they are the ones that move a rate card. In most of Europe an engineer’s cost to their employer is their net pay plus income tax plus two layers of social contribution, and the employer’s share alone commonly runs from around 15% of gross to well over 30%, depending on the country. Inside the IT Park that entire layer is inside a 7% turnover charge. The engineer’s pension and health cover are still funded — the state allocates from the single tax — but the employer is not calculating six separate liabilities on every payslip.',
    },

    { k: 'h', level: 2, id: 'minimum-tax', t: 'The floor under the 7%, which nobody mentions' },
    {
      k: 'p',
      t: 'A turnover tax with no floor would let a resident with staff and no revenue pay nothing, so there is a minimum. The single tax cannot fall below a per-employee amount set as a share of the **forecast national average monthly wage**, which the government publishes for each year. In a low-revenue month a resident pays the floor, not the 7%.',
    },
    {
      k: 'p',
      t: 'We are deliberately not printing this year’s number. The average-wage forecast changes annually and the percentage has been amended before; a figure frozen in an article is a figure that is wrong within a year. Ask any supplier what they paid last month and against which base — a real IT Park resident answers that in one sentence, and it is a useful authenticity check on a company you are about to contract with.',
    },

    { k: 'h', level: 2, id: 'who-qualifies', t: 'Who actually qualifies as a resident' },
    {
      k: 'p',
      t: 'Residency is applied for, granted by the park administration, and conditional. Two conditions do the filtering:',
    },
    {
      k: 'ul',
      items: [
        '**Eligible activity.** The law lists the qualifying activities — software development and publishing, computer programming, data processing and hosting, IT consultancy, hardware consultancy, web portals, R&D in IT and related services. A company whose real business is something else does not get in by adding a website.',
        '**The revenue test.** At least **70%** of revenue in the relevant period must come from those listed activities. Miss it and residency lapses, with the ordinary tax regime applying instead. This is checked, not self-declared.',
      ],
    },
    {
      k: 'p',
      t: 'Residents report monthly and the status is visible on the park’s own register. If a supplier tells you they are an IT Park resident, that is a checkable claim, not a marketing line.',
    },

    { k: 'h', level: 2, id: 'your-invoice', t: 'What it means for the invoice you receive' },
    {
      k: 'p',
      t: 'Here is where most explanations quietly overclaim. The 7% is a tax **your supplier** pays on **their** revenue. It is not a discount that appears on your invoice, and no one should present it as one. What it changes for you is real but narrower:',
    },
    {
      k: 'ol',
      items: [
        '**The supplier’s cost base is flatter.** A Moldovan engineering company knows its total tax on a euro of revenue without a payroll calculation. That is why quoted rates from the region hold still: there is no employer-contribution layer moving underneath them.',
        '**Price stability through the year.** No band thresholds, no annual contribution ceilings to plan around, no profit-based charge that spikes in a good quarter. A rate quoted in January is costed the same way in November.',
        '**The invoice itself is simpler.** No Moldovan VAT should appear on a services invoice to an EU or UK business, because the place of supply is where you are established, not where the supplier is. If a Moldovan supplier puts local VAT on a cross-border services invoice, ask why before you pay it.',
      ],
    },
    {
      k: 'p',
      t: 'On your side of that last point: for an EU business customer, the place of supply of these services is your country under **Article 44 of the VAT Directive (2006/112/EC)**, and you self-account under the reverse charge in **Article 196**. If you recover input VAT in full it is cash-neutral and lives entirely inside your return. A UK customer applies the equivalent reverse charge. Your accounting system needs the purchase coded as services from outside the EU — a non-EU supplier has no EU VAT number to validate, which trips up more finance teams than the tax itself.',
    },

    { k: 'h', level: 2, id: 'withholding', t: 'Withholding tax: the one that can actually cost you money' },
    {
      k: 'p',
      t: 'A handful of jurisdictions require the payer to withhold tax on service fees paid to a non-resident supplier, at rates that make a mess of a budget. Where a double tax treaty applies, business profits are normally taxable only in the supplier’s state unless there is a permanent establishment — which is the [permanent establishment analysis we set out separately](/insights/permanent-establishment-risk-hiring-engineers-abroad/) — so relief is usually available. It is rarely automatic.',
    },
    {
      k: 'p',
      t: 'Two practical steps close this before it becomes an invoice dispute. Ask for a **certificate of tax residence** from the Moldovan tax service at onboarding, and check whether your own jurisdiction requires a specific relief form filed before the first payment rather than after. Then make sure the contract says who bears any withholding that survives, because "the fee is EUR X" and "the fee is EUR X net of any withholding" are different numbers.',
    },

    { k: 'h', level: 2, id: 'what-it-does-not-do', t: 'What the 7% does not do' },
    {
      k: 'ul',
      items: [
        '**It is not yours.** You are not a resident, you do not pay 7% of anything, and no structure lets you borrow the status. Any pitch that implies otherwise is selling something else.',
        '**It does not change your permanent establishment position.** The tax status of your supplier is irrelevant to whether *your* company has a taxable presence in Moldova. Different test, different regime.',
        '**It does not make a misclassified engagement safe.** If the working relationship is really employment under the law of your country, that is decided by your country’s test, and Moldovan tax status does not enter into it.',
        '**It is not permanent.** The regime was legislated with an end date and that date has been extended before. Treat the expiry as something to verify at the point you sign a multi-year engagement, not as a constant.',
      ],
    },

    { k: 'h', level: 2, id: 'verify', t: 'How to check all of this in ten minutes' },
    {
      k: 'p',
      t: 'Everything above is public, and none of it requires trusting a recruitment company’s summary — including this one. The rate and the conditions were checked on **30 August 2026**; verify at the date you contract:',
    },
    {
      k: 'ul',
      items: [
        '[Moldova IT Park](https://moldovaitpark.md/en/) — the administration itself: residency conditions, the register of residents, and the reporting rules.',
        '[Registrul de stat al actelor juridice](https://www.legis.md/) — search for Law No. 77/2016; the consolidated Romanian text there is the only authoritative version.',
        '[State Tax Service of the Republic of Moldova](https://sfs.md/) — certificates of tax residence and the treaty list.',
      ],
    },

    { k: 'h', level: 2, id: 'what-we-tell-clients', t: 'What we tell clients about cost' },
    {
      k: 'p',
      t: 'We do not quote a savings percentage, because a percentage against an unnamed baseline is not checkable and you should not accept one from anybody. What we do is describe the structure and let you do the arithmetic against your own fully-loaded cost per head: a B2B engagement with a Moldovan supplier carries no employer social contributions on your side, no local entity, no foreign payroll administration and no severance exposure, and the supplier’s own tax position is the single charge described above. Whether that lands well against your current cost depends entirely on where you are, and we model it with you on the first call.',
    },
    {
      k: 'p',
      t: 'The depth on the market itself — salary bands, the university pipeline, the honest risks — sits on our [Moldova recruitment page](/technical-recruitment-moldova/). How the contract is structured on either side is on the [direct B2B recruitment page](/b2b-engineer-recruitment/), and the [hourly collaboration model](/hourly-engineering-talent/) is the alternative where you would rather one contract with us than one with each engineer.',
    },
  ],
}
