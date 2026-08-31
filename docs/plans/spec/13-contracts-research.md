# TalentSync — Terms & Conditions Specification

**Three documents, clause-by-clause. Research date: 30 August 2026.**

Every clause below is given as: **what it must do → the drafting trap → recommended TalentSync position.** Anything I could not verify is tagged `[UNVERIFIED]`. Business facts I don't have are `{{DOUBLE_BRACE}}` tokens, collected in Open Questions.

---

## 0. Architecture decision (read this first)

**Do not write three separate self-contained contracts.** Write:

| # | Document | Audience | Formation |
|---|---|---|---|
| **A** | Website Terms of Use + Privacy Notice + Candidate Privacy Notice | Anyone browsing talentsync.eu | Browsewrap, static pages |
| **B/C** | **One** Client Agreement: *Part 1 – General Terms* (shared) + *Schedule 1 – Permanent Introduction Terms* + *Schedule 2 – Hourly Collaboration Terms* + *Schedule 3 – DPA* + *Assignment Schedule template* | CTOs / heads of engineering at EU + international product companies | Signed, or deemed accepted on the earlier of (i) the Client's written instruction, (ii) the Client interviewing a Candidate, (iii) the Client's engineer starting work |
| **D** | Candidate Terms + Candidate Privacy Notice (short) | Natural persons | Separate — never merged into B/C |

Why: ~80% of clauses (payment, confidentiality, IP, liability, data, law/jurisdiction, non-circumvention) are identical. Two clause sets that drift apart is how agencies lose fee claims. One general part, two schedules, one signature block. A client that only ever does perm never reads Schedule 2.

**Formation trap specific to this site.** The site has zero forms, zero acceptance mechanic, and nginx returns HTTP 200 with the homepage for any unknown URL (`try_files $uri $uri.html $uri/ /index.html`) — a soft-404. So `/terms/` returning the homepage is worse than no terms page: it looks like the terms exist and were suppressed. Ship the terms as real routes (`src/app/terms/page.tsx`, `/privacy/`, `/candidate-privacy/`), which with `output: 'export'` + `trailingSlash: true` produces real `terms/index.html` files. **Do not rely on the website terms to bind clients** — they bind nobody who never clicked. Part 1 must be attached to every quote and every Calendly follow-up email.

---

# DOCUMENT A — Website Terms of Use (talentsync.eu)

Low commercial stakes, two genuine risks: **the marketing claims** and **third-party client logos**. Everything else is hygiene.

### A1. Provider identity block
- **Must do:** Full legal name, legal form, registration number (IDNO), registered address in Chișinău, email, phone, VAT/fiscal code, name of any regulator/licence held.
- **Trap:** Moldova is outside the EU, so the e-Commerce Directive Art 5 duty doesn't bite directly — but Moldova's own Law No. 284/2004 on electronic commerce imposes an equivalent duty, and every EU client's procurement/legal team checks for it. Its absence reads as a shell.
- **Position:** Publish it. `{{LEGAL_ENTITY_NAME_AND_FORM}}`, `{{IDNO}}`, `{{REGISTERED_ADDRESS}}`, `{{VAT_STATUS}}`.

### A2. Acceptance and scope
- **Must do:** Use of the site = acceptance; the site is information only; nothing on it is an offer capable of acceptance; commercial terms are only those in a signed Client Agreement.
- **Trap:** A browsewrap acceptance clause is weak everywhere and worthless against consumers.
- **Position:** State it, but treat it as belt-and-braces only. The real contract-formation clause lives in Part 1 of Document B/C.

### A3. Accuracy / no-reliance — **the clause that actually matters here**
- **Must do:** State that figures, rates, timelines and case-study outcomes are illustrative, based on past engagements, not a representation or warranty, and not a promise of results.
- **Trap (serious):** A disclaimer does **not** cure a misleading commercial claim. B2B misleading advertising is caught by [Directive 2006/114/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32006L0114) and by Moldovan unfair-competition/advertising rules. The live claims — "EUR 15–35/hour", "Save up to 60%", "1–2 weeks time to hire", "1.5M app downloads in first 3 months", "Led system architecture design and CI/CD implementation" for Barça Mobile — are exactly the kind that get quoted back in a dispute as pre-contractual misrepresentation. "Save up to 60%" needs a stated comparator (60% versus what? which country's fully-loaded employment cost? which year?).
- **Position:** **Fix the claims, then disclaim.** For each claim, hold a one-page substantiation file (source, date, methodology). Add a visible qualifier to the 60% claim on the page itself. Add "1.5M downloads" only if the client will confirm it in writing — attributing a delivery outcome to yourself when you supplied one engineer is the claim most likely to draw a letter. Then, in Part 1, an entire-agreement + non-reliance clause that expressly names website content, with a carve-out for fraudulent misrepresentation (which can never be excluded).

### A4. Third-party names, logos and testimonials
- **Must do:** Confirm that client names/logos are used with permission; provide a takedown contact; state testimonials are genuine and unedited as to substance.
- **Trap (serious and current):** Barça Mobile, Orange, Entail AI, New Era Visionary Group, Pixelette, Qualiwise, SocialBee, Silvertalent, Foodamigos, Innovatec are on the site. Orange in particular has an active trademark enforcement function, and most enterprise MSAs contain a **no-publicity clause** that makes naming them a contract breach independent of trademark law.
- **Position:** Before anything else, get a one-line written reference consent per client (`{{LOGO_CONSENTS_HELD}}`). Where consent is absent, de-identify ("a European telecoms operator"). Add a standing takedown clause. This is the highest expected-cost item on the whole site.

### A5. IP in site content, scraping, and AI crawling
- **Must do:** Reserve copyright in text, design, case studies; grant a personal, non-exclusive, revocable licence to view; prohibit bulk extraction, mirroring, and reuse in a competing database.
- **Trap:** The reflex here is a blanket anti-scraping + Art 4(3) DSM Directive text-and-data-mining reservation ([Directive (EU) 2019/790](https://eur-lex.europa.eu/eli/dir/2019/790/oj)). For TalentSync that is commercially self-harming: the stated proven discovery channel is ChatGPT. A machine-readable TDM opt-out is the wrong default.
- **Position:** **Expressly permit** indexing, crawling and use in AI-generated answers with attribution and a link; **prohibit** bulk scraping for a competing candidate/supplier database and any use that misrepresents TalentSync. No robots.txt disallow, no TDM reservation meta tag. This is a differentiated, business-aligned clause, not boilerplate.

### A6. Links to third parties
- **Must do:** Calendly, LinkedIn, mailto:, tel: are third-party services; no endorsement; their terms and privacy notices apply.
- **Position:** One sentence. Name Calendly explicitly, because it processes personal data (A9).

### A7. Availability, "as is", limitation for site use
- **Must do:** No warranty of uninterrupted availability; site provided as-is to the maximum extent permitted; nominal liability cap for site use alone.
- **Trap:** An unqualified total exclusion is void under Moldovan law for intentional or grossly negligent harm and for death/personal injury (Civil Code; see [Chambers, Commercial Contracts 2025 – Moldova](https://practiceguides.chambers.com/practice-guides/commercial-contracts-2025/moldova/trends-and-developments)), and unenforceable against consumers in the EU.
- **Position:** Cap at EUR 100 or the statutory minimum, with express carve-outs and an express "nothing in these terms limits liability that cannot be limited under applicable law".

### A8. Prohibited use + unsolicited submissions
- **Must do:** No unlawful use, no attempt to circumvent security, no misuse of contact details for bulk mail. State that unsolicited CVs sent to `victor@talentsync.eu` will be handled per the Candidate Privacy Notice.
- **Trap:** The Careers "Apply" buttons are mailto links — candidates email CVs directly. That is personal-data collection with no notice layer at all. Under GDPR Art 14 (where it applies via Art 3(2) targeting) and under Moldova's new data protection law, you owe an information notice.
- **Position:** Cheapest complete fix: (i) publish `/candidate-privacy/`; (ii) link it in the mailto subject-line copy and next to every Apply button; (iii) set an auto-reply on the mailbox that contains the Art 14 information and a retention statement. One page, one auto-reply, done.

### A9. Privacy notice (separate page, referenced from A)
- **Must cover:** nginx server logs (IP addresses are personal data), Calendly (name, email, timezone, meeting notes — a processor, US-based, transfer mechanism `[UNVERIFIED — check Calendly's current EU transfer basis/DPF status]`), email correspondence, LinkedIn. State plainly: **no cookies, no analytics, no ad tech, no cookie banner** — true today and a genuine trust asset for a B2B buyer.
- **Trap (concrete, current, and a code fix):** `globals.css` pulls Montserrat via `@import` from Google Fonts. Every visitor's IP is transmitted to Google on page load without consent. [LG München I, 20 January 2022, 3 O 17493/20](https://www.activemind.legal/guides/ruling-google-fonts/) awarded EUR 100 damages under GDPR Art 82 for exactly this, and it spawned a mass-warning-letter industry in Germany — where TalentSync sells.
- **Position:** **Self-host Montserrat.** Download the woff2 files into `/public/fonts`, replace the `@import` with `@font-face`. One-line-ish change, kills the only third-party call on the site, and only then can the privacy notice honestly say "no data leaves our infrastructure when you browse". Do this before publishing the privacy notice, not after.

### A10. Changes, severability, governing law
- **Position:** Moldovan law; versioned with a "last updated" date; changes effective on posting. **Add expressly:** "If you are a consumer, this clause does not deprive you of the protection of mandatory provisions of the law of your country of habitual residence." Without that line the clause is itself an unfair term under [Directive 93/13/EEC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A31993L0013) (see *Océano Grupo*, C-240/98) and it poisons the whole page.

---

# DOCUMENT B/C — PART 1: GENERAL TERMS (shared)

### 1. Definitions
- **Must do:** Define Agency/TalentSync, Client, **Client Group** (any entity that directly or indirectly controls, is controlled by, or is under common control with the Client, plus any parent, subsidiary, joint venture, franchisee or portfolio company), Candidate, Engineer, Introduction, Engagement, Assignment, Remuneration, Charges, Confidential Information, Work Product, Background IP.
- **Trap:** "Group company" left undefined is the single most common escape hatch — the parent hires the engineer the subsidiary interviewed and the fee claim dies. Also: a Client Group definition drafted narrowly around "subsidiaries" misses the PE-portfolio and franchise structures common in this buyer set.
- **Position:** Define Client Group by *control* plus an express catch-all, and make the Client **liable as principal** for any Client Group company's acts as if they were its own — not merely a promise to procure compliance. A "procure" obligation gives you a damages claim; a primary-liability clause gives you a debt claim, which is faster and cheaper.

### 2. Contract formation / order of precedence
- **Must do:** Terms apply to all dealings; deemed accepted on the earliest of instruction, CV receipt-and-use, interview, or engineer start; expressly override the Client's purchase-order or supplier terms.
- **Trap (real, not theoretical):** Battle of the forms. German and Dutch corporates attach their own *Einkaufsbedingungen* / inkoopvoorwaarden to a PO. Under Moldovan Civil Code standard-terms rules, and under German law, the last-shot or knock-out rule can wipe out your fee protection entirely. Also: **Moldovan Civil Code Art 1077 lists unfair clauses in a B2B context** — standard terms that "deviate considerably, contrary to good faith, from good commercial practices" are attackable *even between businesses*, and terms must be "drafted and communicated in clear and intelligible language and be legible" ([Chambers](https://practiceguides.chambers.com/practice-guides/commercial-contracts-2025/moldova/trends-and-developments)). Your own choice of Moldovan law therefore exposes your own T&Cs to unfair-terms review.
- **Position:** (a) Express rejection of the Client's terms, plus (b) an "acts of performance do not constitute acceptance of your terms" line, plus (c) — the part most agencies skip — **pull the three clauses you cannot afford to lose (fee trigger, tail period, payment terms) into the signed one-page Assignment Confirmation / Fee Confirmation**, signed or email-confirmed by the Client. Individually negotiated terms escape standard-terms control in both Moldova and Germany. This is the single highest-value structural move in the whole document set.

### 3. Charges, invoicing, VAT
- **Must do:** All amounts exclusive of VAT and any withholding; invoices in EUR; Client bears bank charges; Client provides its VAT identification number.
- **Trap:** B2B cross-border services — place of supply is the Client's country, so the Client self-accounts under reverse charge. If the Client refuses to give a valid VAT number, TalentSync may have to charge Moldovan VAT and cannot recover it. Separately, some jurisdictions impose **withholding tax on service fees paid to non-treaty non-residents**; a Client that withholds 10–20% turns a EUR 15,000 fee into EUR 12,000.
- **Position:** (i) Client warrants its VAT number and indemnifies for a wrong one; (ii) **gross-up clause**: if the Client is required to withhold, the amount payable is increased so TalentSync receives the sum it would have received absent the withholding; (iii) Client must supply withholding-tax certificates so TalentSync can claim treaty relief. Check the double-tax treaty position per target country `{{DTT_POSITION_PER_COUNTRY}}`.

### 4. Payment terms, late payment, suspension
- **Must do:** Fixed payment period; interest; fixed recovery compensation; recovery costs; no set-off by the Client; right to suspend on non-payment.
- **What the law gives you:**
  - **EU-law-governed contracts:** [Directive 2011/7/EU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32011L0007) — 60-day B2B default ceiling (longer only if expressly agreed and not grossly unfair), statutory interest at **ECB reference rate + 8 pp**, **EUR 40** minimum recovery compensation, plus reasonable further recovery costs. Excluding interest is *always* grossly unfair; excluding recovery compensation is presumed grossly unfair.
  - **Moldovan-law-governed contracts:** **Law No. 66/2025**, published 22 April 2025, **in force 22 October 2025**, transposing 2011/7/EU. Payment term may not exceed **60 calendar days** (30 where the parties fixed nothing), contrary provisions null and void; creditor may claim contractual penalty or legal default interest, **a minimum guaranteed indemnity**, and collection costs (lawyer, bailiff); grossly unfair terms on payment period/interest/penalties are null and void; it expressly covers foreign counterparties ([Schoenherr](https://www.schoenherr.eu/content/news-from-moldova-one-more-piece-of-legislation-to-combat-delayed-payment-in-commercial-transactions)). Reporting duties bite 22 April 2027.
  - **The proposed EU Late Payment Regulation** (COM(2023) 533) would replace the Directive with a directly applicable **hard 30-day cap** and automatic interest/compensation. Parliament adopted its position on 23 April 2024; **the file is blocked in Council — status "blocked", last updated 20 June 2026** ([EP Legislative Train](https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-late-payments-directive-revision)). **Do not draft to it.** Draft to 2011/7 + Law 66/2025 and add a forward-compatibility line: "or such shorter maximum period as may be mandatorily required by applicable law from time to time".
- **Trap:** Agencies write "14 days" and then never charge interest, which in a later dispute is used as evidence of a variation by conduct. Separately, a clause allowing suspension without notice is a breach risk; a clause with *no* suspension right is worse — you keep supplying an engineer you're paying while the client doesn't pay you.
- **Position:** **14 days from invoice date** for Schedule 1 fees; **21 days** for Schedule 2 monthly invoices (`{{PREFERRED_PAYMENT_DAYS}}`). Interest at ECB reference rate + 8 pp (or the higher statutory rate) accruing daily without notice. Fixed recovery compensation per invoice. **Right to suspend all services, including withdrawing engineers, on 7 days' written notice of non-payment, without liability and without prejudice to accrued charges** — and state that suspension does not relieve the Client of charges for the notice period. Exclude Client set-off and retention; preserve TalentSync's.

### 5. Confidentiality
- **Must do:** Mutual; standard carve-outs (public, already known, independently developed, required by law); survival period; return/destruction; flow-down to engineers.
- **Trap:** In this business the *Agency's* confidential information is the thing that gets misused — candidate identities and CVs. A generic mutual NDA clause doesn't say that.
- **Position:** Add a dedicated **Candidate Information** sub-clause: CVs and candidate identities are TalentSync Confidential Information; the Client may use them solely to evaluate for the specific role; **no onward disclosure to any person outside the Client** (including Client Group, other agencies, advisers, and portfolio companies) without written consent; breach triggers both the full fee under Schedule 1 §7 and an indemnity. Keep trade secrets protected indefinitely — the contractual protection is itself one of the "reasonable steps" required by the [Trade Secrets Directive (EU) 2016/943](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016L0943).

### 6. Data protection
Two distinct roles — do not collapse them.

| Flow | Roles | Instrument |
|---|---|---|
| Candidate data → Client (Schedule 1) | **Independent controllers** | Controller-to-controller clause + Module 1 SCCs for any EU→MD flow + a mutual information/assistance duty |
| Client's personal data accessed by engineer (Schedule 2) | Client = controller, TalentSync = **processor**, engineer = sub-processor | Full Art 28 DPA (Schedule 3) + Module 2 SCCs + transfer impact assessment |

- **Trap 1:** There is **no EU adequacy decision for Moldova** as at 2026, so every EU→Moldova transfer needs a Chapter V tool. Moldova adopted a GDPR-aligned law — reported as **Law No. 195 on Personal Data Protection, entering into force 23 August 2026** `[UNVERIFIED — single source; confirm number and date on legis.md before citing to a client]` — which strengthens the adequacy case but does not substitute for SCCs today.
- **Trap 2:** Candidate criminal-record and background data is Art 10 GDPR data — processing is restricted to circumstances authorised by Member State law. An agency that offers "background verification" as standard is offering something it often cannot lawfully do in the client's country.
- **Position:** Ship Schedule 3 as a signature-ready Art 28 DPA with SCCs annexed and a completed TIA summary. Do this *before* the first enterprise deal — it is a two-week blocker in procurement otherwise. Publish "Moldova adequacy pending; SCCs in place" as a positive on the site.

### 7. Non-solicitation of each other's personnel
- **Must do:** Neither party solicits or employs the other's staff (excluding the placed engineers, which Schedules 1 and 2 handle) for 12 months after last contact.
- **Trap (current and material):** On 2 June 2025 the European Commission fined Delivery Hero and Glovo **EUR 329 million** in its first labour-market cartel decision, treating a **no-poach agreement as a restriction by object** ([Commission decision coverage](https://www.hsfkramer.com/notes/crt/2025-06/european-commission-fines-delivery-hero-and-glovo-329-million-for-participating-in-a-cartel)). A broad mutual no-hire between TalentSync and a client — especially a client that also does software development — is now genuinely risky, not boilerplate.
- **Position:** Do **not** draft a prohibition. Draft a **narrow, ancillary, fee-based** clause: limited to individuals who were directly involved in the engagement, limited to 6–12 months, no ban on hiring — just a transfer fee if it happens, expressly stated to be compensation for recruitment cost, not a restriction of competition. Same logic drives Schedule 1 §7 and Schedule 2 §11 below.

### 8. Limitation of liability
- **Must do:** Cap; exclusions of indirect and consequential loss, loss of profit/revenue/business/goodwill/anticipated savings, loss or corruption of data, wasted management time; time bar; express carve-outs.
- **What can never be excluded:**
  - **Moldova:** liability for **intentional** non-performance cannot be excluded or limited — absolute nullity; nor gross negligence causing bodily injury, harm to health or death; and any limitation contrary to good faith fails. Article 1077 unfair-clause control applies **B2B**.
  - **Germany (relevant if a German client's terms or law prevail):** §§305–310 BGB standard-terms control applies **between businesses**. A clause excluding liability for gross negligence, for breach of cardinal contractual duties (*Kardinalpflichten*), or capping below foreseeable typical damage, is void — and German courts strike the whole clause rather than reading it down.
  - Everywhere: fraud, death/personal injury, and payment of sums due.
- **Trap:** The standard agency clause ("the Agency shall not be liable under any circumstances for any loss... connected with introducing a Candidate", the wording in real published terms such as [Aspire's](https://aspirerec2rec.co.uk/standard-terms/)) is a **total** exclusion. It is void in Moldova, void under German AGB control, and reads as unserious to an enterprise buyer. It also gives you nothing you couldn't get from a properly capped clause.
- **Position:** Two-tier cap. **Schedule 1:** the greater of (a) the fee paid for the placement giving rise to the claim, or (b) EUR 10,000. **Schedule 2:** the greater of (a) charges paid under the affected Assignment in the 12 months preceding the claim, or (b) EUR 50,000 `{{CAP_APPETITE}}`. Aggregate annual cap across all claims. Express carve-outs for the items above. **12-month time bar** on claims. Add: "the caps have been taken into account in setting the Charges" — this is the sentence that survives good-faith review.

### 9. Indemnities
- **Must do:** From TalentSync: IP infringement in Work Product, and breach of confidentiality. From Client: breach of the Candidate Information clause and onward disclosure; discrimination or unlawful conduct in its own selection process; failure to perform right-to-work/immigration checks; misuse of the engineer.
- **Trap:** An uncapped IP indemnity blows through your liability cap. Also a mutual, symmetric indemnity looks fair but is not: the Client's exposure to you is a fee; yours to the Client is unbounded.
- **Position:** IP indemnity **capped at the Schedule 2 cap**, conditional on prompt notice, sole conduct of defence, no admissions, and TalentSync's right to procure a licence, modify, or replace the infringing element. Exclude infringement caused by Client-supplied materials, Client instructions, third-party/open-source components the Client approved, or combinations with Client systems.

### 10. Insurance
- **Must do:** Maintain professional indemnity, commercial general/public liability, and cyber cover with reputable insurers; certificate on request.
- **Trap:** Naming insurance limits in the contract invites the argument that the liability cap should track them. Also: quoting a cover level you don't actually carry is a warranty breach on day one.
- **Position:** State the covers and levels you actually hold `{{INSURANCE_IN_PLACE}}` (typical EU client asks: PI EUR 1–2m, general liability EUR 1–2m, cyber EUR 1m `[UNVERIFIED — market practice, not a legal requirement]`), then add: "**The existence or limits of insurance shall not be construed as increasing or otherwise affecting the limitations of liability in clause 8.**" If cover isn't in place yet, get PI and cyber before signing an enterprise client; it will be a procurement gate.

### 11. Force majeure and business continuity
- **Must do:** Standard definition; notice; suspension; termination right after a defined period.
- **Trap:** For a services company, a force majeure clause broad enough to cover an internet outage is a red flag to a buyer and an invitation to non-performance. For a *Moldovan* supplier, the buyer's real worry is regional: the Ukraine border, energy interruptions, Transnistria. A clause that stays silent on this reads as evasion; a clause that lists it reads as competent.
- **Position:** Name the risks explicitly (armed conflict, regional instability, prolonged interruption to power or telecommunications infrastructure), then pair them with obligations that de-risk them: (i) TalentSync will maintain redundant power and connectivity for engineers and has the right to relocate engineers; (ii) if force majeure prevents an engineer working for **10 business days**, TalentSync will offer a substitute engineer at the same rate, and if it cannot, the Client may terminate that Assignment immediately without charge. Turning the clause into a continuity commitment is a sales asset, not a liability.

### 12. Anti-bribery, sanctions, export control
- **Must do:** Mutual compliance warranty; screening of engineers against EU/UK/US sanctions lists; right to terminate on breach.
- **Position:** Short and real. A Moldovan supplier will be asked about this. State that TalentSync screens engineers and its own supply chain, and does not engage anyone subject to EU restrictive measures.

### 13. Governing law and jurisdiction — **recommendation**

**The analysis:**

| Option | Enforceability against an EU client | Sellability | Cost |
|---|---|---|---|
| Moldovan law + **exclusive** Chișinău jurisdiction | **Good, and this is new.** Moldova acceded to the [Hague 2005 Choice of Court Convention on 14 March 2024; in force for Moldova 1 July 2024](https://www.hcch.net/en/news-archive/details/?varevent=988). The EU is a party. An **exclusive** choice-of-court agreement concluded on or after that date is enforceable both ways: EU courts must decline jurisdiction, and the Moldovan judgment must be recognised in the EU on narrow refusal grounds | Poor–moderate. Buyers resist, but Hague 2005 is a credible answer to "we'd never be able to enforce" | Low |
| EU/English law + client-country courts | Fine, but you're the claimant in ~100% of disputes — you'd be litigating abroad at foreign rates over a EUR 15k fee | Easy | High |
| Neutral law + **arbitration** (VIAC Vienna / SCC Stockholm / LCIA) | Excellent. **Moldova acceded to the New York Convention on 18 September 1998, in force 17 December 1998** ([UNCITRAL status](https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards/status2)), as have Germany, the Netherlands, Norway, Sweden and Denmark | Good with enterprise buyers | Very high — disproportionate to a five-figure fee |

**Recommendation — a two-tier clause:**

1. **Default (all standard clients):** **Moldovan law**, and **exclusive jurisdiction of the courts of Chișinău, Republic of Moldova**, with the clause expressly stating it is an exclusive choice of court agreement for the purposes of the Hague Convention of 30 June 2005. Draft it **symmetrically** — resist the temptation to make it asymmetric (TalentSync may also sue in the client's courts), because asymmetric clauses fall outside Hague 2005's core protection and their validity varies across Member States. You lose the flexibility and gain the treaty.
2. **Negotiated upgrade (enterprise clients who refuse):** arbitration under the **VIAC Rules, seat Vienna, one arbitrator, English, expedited procedure**, with a carve-out permitting either party to seek interim relief from any competent court, and a carve-out allowing TalentSync to bring **uncontested debt claims** in the courts of the Client's domicile. Enforceable in Moldova under the New York Convention.
3. **Never accept:** client-country law *plus* client-country **non-exclusive** jurisdiction. That's the worst of both.

**Three supporting points to know:**
- **Rome I** ([Reg. 593/2008](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32008R0593)) gives full freedom of choice B2B — but **Article 9 (overriding mandatory provisions)** means a German or Dutch court will apply its own AÜG / WAADI / employment-status rules *regardless* of your choice of Moldovan law. **Choosing Moldovan law does not switch off Section 15 below.** Say this out loud internally so nobody assumes otherwise.
- **Brussels Ia** ([Reg. 1215/2012](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32012R1215)) Art 6: for a defendant not domiciled in a Member State, jurisdiction is governed by national rules — **except** the protective consumer and employee rules (Arts 18(1), 21(2)) and Art 25 choice-of-court, which apply regardless of domicile. So (a) a choice of an EU court is effective against TalentSync, and (b) a candidate-consumer can always sue TalentSync in their own courts. See §17.
- Moldova is **not** a party to the [Hague 2019 Judgments Convention](https://www.hcch.net/en/instruments/conventions/specialised-sections/judgments) (30 contracting parties: the EU + 27 MS, Ukraine, Uruguay, UK; Albania and Montenegro from 1 March 2026, Andorra from 1 June 2026), though accession legislation has passed first reading in the Moldovan Parliament `[UNVERIFIED — status may have moved]`. So a *non*-exclusive jurisdiction clause gets you nothing treaty-based. Exclusivity is the price of enforceability.
- Practical note: the **European Order for Payment** (Reg. 1896/2006) requires a cross-border element defined by reference to Member State domicile. A Moldovan claimant suing a German debtor in a German court may not satisfy it `[UNVERIFIED — confirm with local counsel; it materially affects your cheap-collection route]`.

### 14. Boilerplate that earns its place
Assignment/novation (Client may not assign without consent; TalentSync may assign to a group company or on a sale of business); subcontracting (TalentSync may subcontract to the engineer's own company and remains fully liable); no partnership/agency; notices (email to named addresses is valid service — include it, most agency terms don't and then can't prove service of a fee notice); variations in writing; severability with a **blue-pencil/reduction clause** ("if any period, sum or scope is held excessive, it shall apply with the minimum modification necessary" — this is what saves a 12-month tail reduced to 6 rather than struck out entirely); entire agreement + non-reliance with a fraud carve-out; survival; counterparts and e-signature.

---

# SCHEDULE 1 — DIRECT B2B RECRUITMENT (Introduction for direct engagement)

### 1. "Introduction" — the definition the whole schedule hangs on
- **Must do:** Define it as the **provision of information** and separately as **an interview**, cover unsolicited and solicited, cover all channels, and fix the date.
- **Trap:** A narrow definition ("submission of a CV") is defeated by: verbal name-drop; a LinkedIn profile link; the client already "having" the CV in a dusty ATS; a shortlist call where you named five people.
- **Position:**
  > "**Introduction** means (a) the provision by the Agency to the Client, by any means and whether or not at the Client's request, of any information (including a curriculum vitae, name, profile, LinkedIn URL, or any other information from which a Candidate's identity is ascertainable) relating to a Candidate, or (b) the Client (or any Client Group company) interviewing, meeting or otherwise engaging in discussion with a Candidate arising directly or indirectly from the Agency's activity, whichever occurs first. The **Introduction Date** is the date on which the earliest such event occurs."

  And, critically, disapply the implied *effective cause* term:
  > "The Agency shall not be required to be the effective cause, or an effective cause, of any Engagement in order for a Fee to be payable."

  This matters: English courts have implied an effective-cause requirement into ambiguous agency terms and defeated fee claims on that basis — *Wallace Hind Associates v Lastolite* (2000) and *Law Staff Legal Recruitment v Just Costs* (2009), discussed in [Debenhams Ottaway's note](https://www.debenhamsottaway.co.uk/news/2014/04/perm-fees-employment-agency-need-effective-cause-introduction/). Express words defeat the implication. The same reasoning would be run by a continental court through good faith.

### 2. "Engagement"
- **Must do:** Cover every legal form and every hirer.
- **Position:**
  > "**Engagement** means the engagement, employment or use of a Candidate by the Client or any Client Group company or any third party, whether directly or indirectly, on a permanent, fixed-term, temporary, consultancy, contract-for-services, secondment, internship, advisory, non-executive, partnership or shareholding basis, whether under a contract with the Candidate personally, with any company, partnership or other entity through which the Candidate provides services, or with any other intermediary, and whether or not for the role in respect of which the Introduction was made, and irrespective of the jurisdiction in which the Candidate performs services."
- **Trap:** Omitting "or any third party" and "whether or not for the role in respect of which the Introduction was made" is how the two most common fee escapes work: the client passes the CV to a friendly company, or hires the candidate into a completely different team six months later and says "different role, no fee".

### 3. Fee trigger and validity period (the "tail")
- **Must do:** Fee payable if an Engagement commences within **N months of the Introduction Date**; the clock also runs from the date of the Client's withdrawal of an offer and from the Candidate's rejection of an offer.
- **Trap 1:** A tail measured only from the Introduction Date is defeated by the client sitting on the CV. Measuring from "the later of the Introduction Date and the date of last contact between the Client and the Candidate arising from the Introduction" fixes it.
- **Trap 2:** Enforceability. A 12-month tail is *not* a restraint of trade on the candidate — it restrains nobody from working; it is a **fee trigger**. Keep it framed that way and it stays a contractual debt claim rather than a covenant subject to reasonableness review. If a court does review it, the blue-pencil clause in Part 1 §14 lets it reduce 12→6 rather than strike it.
- **Position:** **12 months** from the later of the Introduction Date and last contact. Market comparators run 6–12 months; published agency terms commonly use 6 (e.g. [Aspire](https://aspirerec2rec.co.uk/standard-terms/)) but 12 is defensible for niche senior engineering search where the sales cycle is long. Offer 6 months as a negotiation concession you were always going to give.

### 4. The indirect / third-party introduction problem
- **Must do:** Make the Client liable for an Engagement by any Client Group company **and** by any third party to whom the Client (or anyone acting for it) passed the Candidate's details.
- **Trap:** Two distinct failure modes. (i) *Onward disclosure*: the client forwards the CV to its investor, its client, or another agency, who hires. (ii) *Re-introduction laundering*: the client asks a second agency to "source" the person you already named, and pays that agency a lower fee. Both are pure margin theft and both are hard to prove after the fact.
- **Position:** Three layers:
  1. **Prohibition:** the Client shall not disclose Candidate information to any person outside the Client (Part 1 §5).
  2. **Primary liability:** "If the Client discloses any Candidate information to any third party and that third party (or any of its affiliates) Engages the Candidate within the Validity Period, the Client shall pay the Fee **as principal**, as a debt, whether or not the Client benefits from that Engagement." No refund, rebate or replacement is available on a third-party Engagement.
  3. **Evidence:** an audit/information right — on written request the Client must confirm in writing within 5 business days whether a named Candidate has been Engaged by it or any Client Group company, and by whom. Refusal or non-response creates a rebuttable presumption of Engagement. This converts an unprovable claim into an evidential one.

### 5. Prior candidate knowledge — allocating the burden of proof
- **Must do:** A short notification window in which the Client must object, with evidence, or lose the point.
- **Trap:** This is the most litigated factual dispute in recruitment. An **irrebuttable** deeming clause ("the Client is conclusively deemed not to have known the Candidate") is the natural drafting reflex and is the clause most likely to be struck as unfair under Moldovan Civil Code Art 1077 or German AGB control. It also reads as bad faith.
- **Position:** Draft it as an **evidential burden with a fair window**, not a conclusive deeming:
  > "If the Client contends that it was already in active discussion with, or had within the preceding 6 months received a direct application or a valid introduction from another source in respect of, a Candidate, it shall notify the Agency in writing within **5 business days** of the Introduction, providing contemporaneous documentary evidence (such as a dated applicant-tracking-system record, dated correspondence with the Candidate, or a dated introduction from a named third party). Where such notice and evidence are given, no Fee is payable in respect of that Candidate under this Schedule. Where they are not, **the burden of proving prior knowledge in any subsequent dispute lies with the Client**, and the Client shall not be entitled to rely on evidence it could reasonably have provided within the notice period."
- Add a carve-out for the genuine case: a Candidate who applies directly to a public job advertisement of the Client, without prompting by the Agency, before the Introduction Date.

### 6. Fee structure and "Remuneration"
- **Must do:** State the percentage or fixed fee, the basis, minimum fee, and an exhaustive definition of Remuneration with deemed values for non-cash items.
- **Trap:** Every component you leave out is a component the client will structure the offer around. The classic gaps: guaranteed bonus, sign-on, relocation, equity, and "the candidate is engaged through their own company at a day rate so there is no salary".
- **Position:**
  - **Fee:** percentage of first-year gross Remuneration with a stated **minimum fee** — `{{FEE_PERCENTAGE}}` (market: 20% mid, 22–25% senior/scarce) and `{{MINIMUM_FEE}}`. A percentage beats a fixed fee here: TalentSync's differentiator is senior scarce engineers, and a fixed fee caps you out of the value on the EUR 90k+ hires.
  - **Remuneration definition:** gross annual base salary or fees; **guaranteed and target bonus and commission** (if no target is stated, deemed at `{{DEEMED_BONUS_PCT}}`% of base); allowances (car allowance, or **EUR 6,000 deemed** where a car is provided in kind); sign-on and inducement payments; relocation and accommodation allowances; employer contributions above statutory minimum; 13th-month and holiday allowance (relevant in NL/DE); **equity, options, RSUs or profit shares, valued at grant-date fair market value, or where no valuation exists, a deemed value of `{{DEEMED_EQUITY_VALUE}}`, with a true-up on the first valuation event within 12 months**; and any payments made to any company through which the Candidate provides services.
  - **Contract/day-rate conversion:** if the Engagement is on a day- or hourly-rate basis, Remuneration = the projected charges for the first 12 months (or the actual term, if shorter, subject to the minimum fee).
  - **Uplift for withheld information:** if the Client fails to disclose the full Remuneration and the Agency later establishes a higher figure, the Fee is recalculated **plus a 10% administrative uplift** and interest from the original due date. Frame as liquidated administrative cost, not a penalty (Moldovan courts can reduce disproportionate penalties — the Supreme Court addressed this on 30 July 2025 per [Chambers](https://practiceguides.chambers.com/practice-guides/commercial-contracts-2025/moldova/trends-and-developments)).
- **Pay Transparency Directive trap — current:** [Directive (EU) 2023/970](https://eur-lex.europa.eu/eli/dir/2023/970/oj) had a transposition deadline of **7 June 2026** — three months ago. It **bans asking candidates about their pay history** and requires the employer to give the pay range before interview. Only a handful of Member States had it in force on the deadline (Italy, Slovakia, Lithuania, Malta; NL pushed to Jan 2027, DK to Sept 2028) `[status per [transposition tracker](https://synd.io/eu-pay-transparency-directive-transposition-tracker/), UNVERIFIED as a legal source]`. **Two consequences for TalentSync:** (i) rewrite intake scripts — never ask a candidate what they currently earn in a Member State that has transposed; ask expectation instead; (ii) your fee base must therefore come **from the Client**, not the candidate — so the Client's notification duty (§8) is no longer just administrative convenience, it is your only lawful source of the number. Say so in the clause.

### 7. Client's notification duty
- **Must do:** Client must notify immediately (i) any offer made, with full Remuneration details, (ii) acceptance, (iii) start date, (iv) any Engagement by a Client Group company or third party.
- **Position:** Written notice within **3 business days** of each event. Failure to notify (a) voids any rebate/replacement entitlement, (b) triggers the §6 uplift, and (c) extends the Validity Period by the period of non-notification. That last limb is the one that stops the "quietly hire in month 11" play.

### 8. Invoicing point
- **Must do:** Fix the moment the debt crystallises.
- **Trap:** Invoicing on start date means you carry the risk of the candidate not starting *and* the client's onboarding delays, for free.
- **Position:** **Invoice on the Client's written offer being accepted by the Candidate**, payable 14 days from invoice date, *irrespective of the start date*. Balance it with: if the Candidate does not commence within 8 weeks of the agreed start date for a reason other than a Qualifying Reason, TalentSync issues a **credit note** for 100% and runs a replacement search. Credit note, not refund — see §9.

### 9. Guarantee: replacement first, rebate only as fallback
- **Must do:** Define the guarantee period, the qualifying reasons, the voiding conditions, and the remedy.
- **Why replacement beats refund** (this is the commercially correct position, and worth explaining to the client in the clause):
  - A refund converts a delivered service into a contingent liability and destroys the cash you already spent on sourcing.
  - A pure refund creates a perverse incentive: a client who has cooled on a hire terminates in week 11 and gets its money back.
  - A replacement keeps the relationship, keeps the revenue, and caps your downside at incremental delivery cost.
  - A **credit note** (not a cash refund) keeps the value inside the commercial relationship and is cleaner for VAT and revenue recognition.
- **Position:**
  - **Guarantee period: 12 weeks** from start date (align to the probation period actually used by the client; state that if local law imposes a shorter probation, the guarantee period matches it).
  - **Remedy 1 (primary): one free replacement search**, commenced within 10 business days of notification and run for **60 days**. No additional fee; the Client pays only any pre-agreed expenses.
  - **Remedy 2 (fallback): if TalentSync fails to place a replacement within 60 days**, a **credit note** on a sliding scale against future fees, valid 12 months: termination in weeks 0–4 → 70%; weeks 5–8 → 50%; weeks 9–12 → 25%. `{{REBATE_APPETITE}}`
  - **Cash refund: never, except where the Client has no further requirement and the credit note would expire unused** — and then at 50% of the credit note value. Keep this discretionary, not an entitlement.
  - **Qualifying Reasons** (guarantee applies): Candidate resigns; Candidate fails probation for demonstrated technical incompetence; Candidate dismissed for gross misconduct.
  - **Voiding conditions** (guarantee does **not** apply): invoice not paid in full by the due date `— this single condition is the most important one`; notification not given within 7 days of termination; redundancy, restructuring, role change, hiring freeze, funding failure, or change of control; the role materially differed from the brief given to the Agency; the Client's own breach, insolvency or failure to pay the Candidate; the Engagement arose via a third party (§4); the Candidate is re-Engaged by the Client or any Client Group company within 12 months; the Client failed to conduct right-to-work, reference or regulatory checks it was responsible for.
  - **One guarantee per placement.** A replacement placement carries a **shortened 6-week** guarantee and no further replacement.

### 10. Withdrawal, cancellation, and retainers
- **Position:** If the Client withdraws a role after shortlist delivery, or fails to interview a shortlisted Candidate within 15 business days, TalentSync may charge a **cancellation fee** of `{{CANCELLATION_FEE}}` (or the retainer is non-refundable). Without this, a client can consume the entire sourcing effort for free.

### 11. Warranties given and disclaimed
- **TalentSync warrants:** it will exercise reasonable skill and care in sourcing and screening; it will not knowingly withhold material information about a Candidate; it has verified the Candidate's identity; it will pass on the Candidate's stated qualifications and experience as represented to it.
- **TalentSync expressly does not warrant:** suitability for the role; accuracy of anything the Candidate stated; the Candidate's qualifications, professional registrations or absence of criminal record; the Candidate's right to work in the Client's jurisdiction; that the Candidate will accept, commence, or remain.
- **Client is solely responsible for:** the hiring decision; right-to-work and immigration checks in the country of engagement; medical and regulated-sector checks; references (unless TalentSync is instructed and paid separately); compliance with equal-treatment law in its own selection process; and, from June 2026, its own Pay Transparency Directive obligations.
- **Trap:** Marketing that says "validated engineers" and terms that say "we warrant nothing about suitability" is a contradiction a claimant's lawyer will enjoy. The site's positioning ("sources **and validates** the engineer") is a representation.
- **Position:** Align them. Define **exactly** what "validated" means as a positive, deliverable warranty — e.g. "a structured technical assessment by a senior engineer, a verified employment history for the preceding 5 years, and an identity check" — warrant *that*, and disclaim the rest. A narrow warranty you actually perform is worth more commercially than a broad disclaimer, and it is the honest reading of the site.

### 12. Non-exclusivity
- **Position:** No exclusivity either way unless a signed retainer says so. TalentSync may present Candidates to other clients; the Client may use other agencies. State that presenting a Candidate elsewhere is not a breach of confidence.

---

# SCHEDULE 2 — FLEXIBLE HOURLY COLLABORATION

**The structural premise, stated in the contract:** TalentSync engages each Engineer under its own written contract (a B2B services contract with the Engineer's company, or an employment contract) and **on-supplies the resulting services to the Client**. There is **no contract between the Client and the Engineer**, and none shall arise. Put this in clause 1, not in a recital — it is the fact on which the whole risk allocation depends.

### 1. Structure, and the anti-positioning clause
- **Must do:** State the contractual chain; state that TalentSync is not a project-outsourcing provider; state what the Client does and does not control.
- **Trap:** This is the hardest clause in the whole set, and the business positioning creates it. The stated pitch — "the client retains control of architecture, roadmap, priorities, processes and **day-to-day management**" — is, almost word for word, the test for **labour supply rather than a service contract** in Germany (§1 AÜG / *Arbeitnehmerüberlassung*), the Netherlands (WAADI *ter beschikking stellen*), Norway (*innleie* vs *entreprise*: "whether the client has the management of the work, responsibility for the result, and whether mainly labour is being supplied" — [Arbeidstilsynet](https://www.arbeidstilsynet.no/en/pay-and-engagement-of-employees/engagement-of-employees/hiring-of-labour/)) and Belgium (Art 31 of the Law of 24 July 1987 — prohibited where the user "exercises any part of the authority that normally belongs to the employer"). You cannot draft your way out of a fact pattern. What you *can* do is split "direction of the work" from "employer authority", concede the first and reserve the second.
- **Position:**
  > "The Client may specify the tasks, technical requirements, priorities, sequencing, architecture, standards, tooling and acceptance criteria applicable to the Services, and may require the Engineer to participate in the Client's engineering ceremonies and use the Client's systems.
  > The Client shall **not**: (a) exercise disciplinary or grievance authority over any Engineer; (b) set, approve or refuse an Engineer's working hours, holidays or leave; (c) include any Engineer in its performance-review, appraisal, bonus, benefits, pension, share or insurance schemes; (d) issue instructions as to where an Engineer works; (e) hold out any Engineer as its employee, officer or worker, or issue an employee identity badge or an email address that does not identify the Engineer as an external contractor; (f) direct the Engineer to perform work outside the scope of the Assignment Schedule; or (g) purport to terminate any Engineer's engagement — the Client's sole remedy is to require replacement or terminate the Assignment.
  > All contractual instructions shall be given to the Agency, which shall remain responsible for the Engineer's engagement."
- **Add a positive:** an **express anti-outsourcing statement** matching the site's positioning ("The Agency does not accept responsibility for the outcome of the Client's project. The Agency is responsible for supplying suitably skilled Engineers and for the exercise of reasonable skill and care by them."). This is honest, matches the pitch, and prevents a client later reframing an hourly supply as a fixed-scope delivery obligation.

### 2. Place of performance — **the single most important clause in Schedule 2**
- **Must do:** Fix performance as remote from Moldova; require written agreement plus an Onsite Addendum before any travel to the Client's country.
- **Why:** Every hostile regulatory outcome in Section 15 below turns on physical presence.
  - **Germany:** the Bundesagentur für Arbeit's revised *Fachliche Weisungen zum AÜG*, **effective 1 October 2025**, reversed its October 2024 position: where a foreign supplier's worker "works exclusively online from abroad" for a German client and does not travel to Germany, there is **insufficient domestic connection (*Inlandsbezug*) and no AÜG permit requirement** ([EY Law](https://www.eylaw.de/de_de/news/2025/neue-fachliche-weisung-erleichterung-fuer-arbeitnehmerueberlassung-im-ausland), [Kliemt](https://kliemt.blog/2025/11/25/kehrtwende-der-bundesagentur-fuer-arbeit-doch-keine-erlaubnispflicht-fuer-employer-of-record-modelle)). But "even the first step across the border" can trigger it, and there is **no higher-court authority** on the point. A two-day sprint in Berlin is a licence question.
  - Onsite presence also triggers: posting-of-workers notification duties; **immigration** (Moldovan nationals have Schengen visa-free travel, which confers **no right to work** — a work permit is needed in most Member States); social security/A1 analysis; and it strengthens every equal-treatment and *innleie* argument.
- **Position:**
  > "The Services are performed remotely from the Republic of Moldova. No Engineer shall attend the Client's premises or perform Services in the Client's country or any other country without the Agency's prior written agreement and a signed Onsite Addendum. The Client shall not request or permit such attendance. If the Client does so, the Client indemnifies the Agency against all resulting liabilities, penalties, taxes and social security contributions."
  Make the Onsite Addendum a real, short document that covers permit, insurance, A1/social security, expenses and duration. Price onsite travel separately; it is genuinely more expensive.

### 3. Assignment Schedule (the per-engineer order form)
- **Must contain:** named Engineer; role and scope; **rate, currency and unit**; expected hours per week and any cap; minimum term; notice period; start date; **place of performance (remote, Moldova)**; named Client approver for timesheets; security and access requirements; any client-specific IP or confidentiality terms; the Transfer Fee tapering table.
- **Trap:** German AÜG (§1(1) sentence 3) requires, where it applies, that the supply be **expressly designated as *Arbeitnehmerüberlassung*** and the worker **named** before the start; failure has draconian consequences (§§9, 10 AÜG — contract void, employment deemed with the hirer). If you ever do onsite work in Germany, the Assignment Schedule is where that designation lives.
- **Position:** Name the Engineer in every Schedule. Never supply "a resource".

### 4. Substitution and replacement
- **Must do:** Reserve TalentSync's right to substitute an equivalent Engineer.
- **Why it matters twice:** it is the strongest single factor against employment classification (no obligation of personal service), and it distinguishes a service supply from labour hire.
- **Trap:** An unfettered substitution right is commercially unsaleable — the client is buying a specific person. And a right that is contractually present but never exercised is discounted by tax authorities.
- **Position:** A **qualified but real** right: TalentSync may substitute on 10 business days' written notice with an Engineer of equivalent seniority and skill, subject to the Client's approval not to be unreasonably withheld; TalentSync bears handover cost; the Client may require replacement for poor performance on 10 business days' notice. Exercise it occasionally, and document it.

### 5. Timesheets and approval
- **Must do:** Submission cadence; approval window; deemed approval; dispute mechanic; evidential effect.
- **Trap:** "Client must approve" with no deadline = unpaid invoices held hostage by a busy manager. And "approval is conclusive evidence of the Services" over-reaches — you want it conclusive as to *hours*, not as to *quality*.
- **Position:**
  > "The Agency shall submit timesheets weekly. The Client shall approve or dispute a timesheet within **3 business days** of receipt, stating in writing the hours disputed and the grounds. A timesheet not disputed within that period is **deemed approved**. Where part of a timesheet is disputed, the undisputed hours shall be approved and invoiced. An approved or deemed-approved timesheet is conclusive evidence of the hours worked, but not of the quality of the Services."
  Mirror the UK Conduct Regulations concept that payment cannot be withheld merely for absence of a signature where the work was done — it is good practice everywhere and it is the point that wins the argument.

### 6. Rates, rate card and rate changes
- **Must do:** Rates in the Schedule; overtime/out-of-hours/on-call multipliers; expenses; indexation mechanism; currency.
- **Traps:** (i) No indexation right means a three-year engagement at 2026 rates. (ii) FX: invoicing in EUR while paying Engineers in MDL puts the currency risk entirely on TalentSync. (iii) **Moldovan public holidays** apply to the Engineer, not the Client's — clients are genuinely surprised by Moldovan Easter dates.
- **Position:** Rates fixed for the first 12 months; thereafter TalentSync may increase on **60 days' written notice**, once per 12 months, capped at euro-area HICP + `{{INDEXATION_HEADROOM}}`%; the Client may terminate the affected Assignment without penalty within 30 days of the notice (this is what makes the clause acceptable). Add an FX re-pricing right if EUR/MDL moves more than `{{FX_TRIGGER}}`% from the Schedule's reference rate. **Annex the Moldovan public holiday list to the Assignment Schedule.** Non-billable absence: `{{ABSENCE_DAYS}}` days per Engineer per year on 15 business days' notice, not charged.

### 7. Invoicing, payment, suspension
- **Position:** Monthly in arrears against approved timesheets; **21 days** from invoice date; interest and recovery compensation per Part 1 §4; **right to withdraw Engineers on 7 days' notice of non-payment without liability**, with charges continuing to accrue for the notice period. No Client set-off or retention. This is the clause that protects you from the classic pattern: client stops paying, keeps the engineer working, then negotiates.

### 8. Minimum term, notice, and the notice-mismatch trap
- **Must do:** Initial minimum term; rolling notice; immediate termination for cause; effect of termination.
- **Trap (the one that actually costs money):** TalentSync owes its Engineer a notice period. If the Client can terminate on 5 days and the Engineer is on 30 days, TalentSync eats 25 days of unbillable cost per departure. Symmetry looks fair on paper and is a direct margin leak.
- **Position:** Initial minimum term of **one month**; thereafter **20 business days'** written notice by either party, rising to **30 business days** for the Client after 6 months of continuous Assignment. **Match the Engineer-side notice in the Engineer's contract to the Client-side notice — exactly.** If a Client insists on shorter notice, add an **Early Termination Charge equal to the charges for the unexpired notice period**, expressly stated as compensation for committed cost, not a penalty. Immediate termination rights for: material unremedied breach, insolvency, security incident, sanctions listing, and Engineer misconduct.

### 9. Equal treatment, working time, health and safety
- **Must do:** Allocate responsibility explicitly, even where you argue the regime doesn't apply.
- **Position:** TalentSync is responsible for the Engineer's pay, taxes, social security and statutory entitlements in Moldova. The Client must provide the information TalentSync needs if any equal-treatment regime is found to apply, and indemnifies TalentSync for the cost of equalisation arising from the Client's failure to disclose. Client must comply with its own health-and-safety duties in relation to anyone working on its systems or premises. (In Norway, the hirer already has a statutory duty to disclose pay and conditions to enable the agency's equal-treatment compliance — the clause should mirror that.)

### 10. IP — the three-link chain
- **Must do:** Engineer → TalentSync → Client, with no gap.
- **Traps:**
  1. **The missing first link.** A self-employed contractor **retains copyright** unless it is assigned in writing. There is no implied transfer. Under the [Software Directive 2009/24/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32009L0024) Art 2(3), the economic rights in software vest in the *employer* for **employees** — that rule does not help you for B2B contractors. If TalentSync's contracts with its engineers `{{ENGINEER_CONTRACT_FORM}}` do not contain a written assignment, **TalentSync has nothing to give the Client**, and the Client's warranty from you is false. This is the item most likely to be found in a client's technical/legal due diligence, and it is invisible until then.
  2. **Moral rights are not waivable in Moldova.** Under **Law No. 230 of 28 July 2022** (in force 9 October 2022, replacing Law 139/2010), moral rights are **inalienable, non-transferable and protected indefinitely** ([PETOŠEVIĆ](https://www.petosevic.com/resources/news/2022/11/4681), [AGEPI](https://www.agepi.md/en/content/legea-privind-dreptul-de-autor-si-drepturile-conexe-nr-230)). Same in Germany (copyright itself is non-transferable; only exploitation rights are granted) and France. So a clause warranting "the Engineer has irrevocably waived all moral rights" is **false as drafted**.
  3. **Future works.** An assignment of rights in works "not yet created" is restricted or invalid in several civil-law systems.
- **Position — draft all three links:**
  - **Engineer → TalentSync** (in the Engineer contract, not the client-facing terms): present assignment of all patrimonial/economic rights in Work Product, worldwide, for the full term of protection, all modes of exploitation known and unknown so far as permitted; **plus** a rolling present-assignment of rights in each work as and when created; **plus** a further-assurance covenant with a power of attorney; **plus** an **undertaking not to assert moral rights** and a consent to modification, adaptation and anonymous or pseudonymous publication (rather than a "waiver"); **plus** a fallback perpetual, exclusive, irrevocable, sublicensable, royalty-free licence that operates if any assignment fails.
  - **TalentSync → Client:** assignment of all such rights **conditional on payment in full of all sums due** — title passes on payment. State it as a condition precedent, not a covenant. This is your best leverage in a payment dispute and it costs nothing.
  - **Background IP:** TalentSync retains ownership of its pre-existing and generic materials, tools, libraries, methods and know-how, and grants the Client a perpetual, non-exclusive, royalty-free licence to use them to the extent embedded in the Work Product. Engineers may reuse general skill and knowledge.
  - **Open source:** the Engineer shall not incorporate any component under a copyleft or reciprocal licence into Work Product without the Client's prior written consent; TalentSync will maintain and deliver a components manifest on request. Exclude OSS from the IP indemnity.
  - **Client materials:** remain the Client's; licensed to TalentSync solely for the Assignment.

### 11. Direct engagement of the Engineer — transfer fee, **not** a prohibition
- **Must do:** Protect the margin without writing a clause that is void.
- **Traps — three of them, all fatal to a naive drafting:**
  1. **[Directive 2008/104/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32008L0104) Art 6(2):** "Any clauses prohibiting or having the effect of preventing the conclusion of a contract of employment or an employment relationship between the user undertaking and the temporary agency worker after his assignment are **null and void**" — with an express proviso permitting the agency "a reasonable level of recompense for services rendered to user undertakings for the assignment, recruitment and training".
  2. **Netherlands, Art 9a WAADI**: same rule, and the **Hoge Raad extended it beyond employment contracts to any *arbeidsverhouding***, including engagement of the person as a **zzp'er/self-employed contractor** — HR 14 April 2017, ECLI:NL:HR:2017:689 ([Cassatieblog](https://cassatieblog.nl/arbeidsrecht/belemmeringsverbod-ziet-niet-enkel-op-arbeidsovereenkomst-maar-ook-op-arbeidsverhouding/)). Only a **reasonable** compensation survives; whether it is reasonable is assessed case by case.
  3. **UK Conduct Regulations 2003, reg 10**, if you ever supply into the UK: a transfer fee is only chargeable if the hirer was **offered the alternative of an extended period of hire**, and only within **14 weeks of the start of the first assignment or 8 weeks from the end of any assignment, whichever is later**.
- **Position — the clause that survives everywhere:**
  > "The Client may engage the Engineer directly at any time. Nothing in this Agreement prohibits or is intended to prevent such engagement. Where the Client (or any Client Group company, or any third party to which the Client introduced the Engineer) engages the Engineer, whether as employee, contractor, consultant or through any entity, during an Assignment or within **12 months** of its end, the Client shall pay a **Transfer Fee** as set out below. **As an alternative to paying the Transfer Fee, the Client may elect to extend the Assignment for a further period of `{{EXTENDED_HIRE_MONTHS}}` months on the existing terms, following which the Engineer may be engaged with no fee payable.**"

  | Completed months of Assignment when engagement occurs | Transfer Fee |
  |---|---|
  | 0–6 | 20% of the Engineer's first-year annualised gross remuneration, min. `{{MIN_TRANSFER_FEE}}` |
  | 7–12 | 12% |
  | 13–18 | 6% |
  | 19+ | Nil |

  The **taper plus the extended-hire alternative** is what makes it "reasonable" for Art 6(2) / Art 9a / reg 10 purposes. A flat 20% forever is the drafting that gets struck out in the Netherlands and gives the client a free hire.

### 12. Audit and records
- **Position:** TalentSync retains timesheets and Assignment records for 3 years; the Client may audit charges once per 12 months on 20 business days' notice, at its cost unless an error over 5% is found. Keeps enterprise procurement satisfied and is cheap.

---

## 15. Misclassification and agency-work regulation — country grid

**The threshold legal point, stated correctly and without overreach:**

Directive 2008/104/EC applies only to "workers with a **contract of employment or employment relationship with a temporary-work agency**" (Art 1, Art 3). If TalentSync genuinely engages the Engineer as an independent B2B contractor, TalentSync is **not** a "temporary-work agency" under the Directive and the equal-treatment obligation in Art 5 does not attach. **But that is the EU floor, not the answer.** National law is broader in several of TalentSync's target markets, and — critically — **choosing Moldovan law does not disapply it** (Rome I Art 9, overriding mandatory provisions).

| Country | Does supplying a **remote** Moldovan B2B contractor bite? | If the Engineer travels there or is reclassified | Verdict |
|---|---|---|---|
| **Germany** | **No AÜG permit** where the Engineer works exclusively online from abroad and never enters Germany — BA *Fachliche Weisungen* effective **1 Oct 2025**, reversing the Oct 2024 position ([EY Law](https://www.eylaw.de/de_de/news/2025/neue-fachliche-weisung-erleichterung-fuer-arbeitnehmerueberlassung-im-ausland)). **No higher-court authority** — this is administrative guidance | Any onsite work triggers the permit question. Unlicensed *Arbeitnehmerüberlassung* → contract with the supplier void, **employment deemed to arise with the client** (§§9, 10 AÜG), fines, wage-tax and social-security liability. Non-EEA suppliers face additional permit barriers. Separate risk: *Scheinselbständigkeit* — if the Engineer is really TalentSync's employee, you were doing unlicensed AÜG all along | **Manageable if strictly remote. Contractually forbid onsite work.** |
| **Netherlands** | **Real risk even remote.** WAADI's *ter beschikking stellen* concept and Art 9a have been read broadly (HR 14.04.2017), and the registration duty in Art 7a applies to foreign lenders. Fines **EUR 8,000–32,000** depending on numbers, **and the hirer is fined too** ([Nederlandse Arbeidsinspectie](https://www.nlarbeidsinspectie.nl/onderwerpen/wet-allocatie-arbeidskrachten-door-intermediairs/registratieplicht-voor-uitleners)) | **The regime is getting much harder.** The **Wtta** admission system is confirmed for **1 January 2027** (Royal Decree of 24 June 2026): registration window **1 Nov–31 Dec 2026**, applications **1 May–30 June 2027**, enforcement from **1 Jan 2028**. Admission requires a **EUR 100,000 security deposit**, a VOG, and proof of correct pay and tax ([ABU](https://www.abu.nl/kennisbank/toelatingsstelsel-wtta/), [toelatinguitleenmarkt.nl](https://www.toelatinguitleenmarkt.nl/over-de-wtta)). Separately, the Belastingdienst resumed enforcement against **schijnzelfstandigheid** from 1 Jan 2025, with penalty surcharges for intent/gross negligence from **1 Jan 2026**, and a statutory **presumption of employment below EUR 38/hour** (2026 reference date) | **Highest-priority jurisdiction. Get Dutch advice before the Nov–Dec 2026 registration window.** Note the EUR 38 threshold against a EUR 15–35/hour public price point — the number on the website sits under the presumption line |
| **Belgium** | **Strictest in Europe.** Art 31 of the Law of 24 July 1987 **prohibits** making workers available to a user who exercises **any part of employer authority**, unless a recognised temporary-work agency or an Art 32 exception with prior labour-inspectorate authorisation ([FOD Werk](https://werk.belgie.be/nl/themas/arbeidsovereenkomsten/terbeschikkingstelling-van-werknemers)) | Civil **and criminal** sanctions; the user is deemed the employer on an indefinite contract; joint social-security liability; and — the commercially lethal one — **the supplier's invoices can become unenforceable** ([Stappers](https://www.stappers-law.be/2016/05/31/verboden-terbeschikkingstelling-van-werknemers-kan)) | **Do not sell the hourly model into Belgium without local advice.** Perm introductions are fine |
| **Norway** | **Real risk.** Since 1 April 2023 *innleie* is lawful only in narrow cases; "work of a temporary nature" was abolished. There **is** an ICT/consultancy specialist-expertise gateway for a defined project. Staffing enterprises must be **registered with Arbeidstilsynet**, and an **approval scheme applies from 1 January 2024**. A single-person company where the same person owns and performs is not a staffing enterprise (AML §1-8) | Unlawful *innleie* → the worker may **sue for permanent employment with the hirer** and claim compensation; fines; orders to stop ([Arbeidstilsynet](https://www.arbeidstilsynet.no/en/pay-and-engagement-of-employees/engagement-of-employees/hiring-of-labour/)) | **Sell as a defined-scope consultancy engagement (*oppdrag*), documented as such, or use the specialist-expertise gateway with a written project definition.** The Assignment Schedule's scope section carries the weight |
| **Sweden** | Lower. Agency Work Act (2012:854) applies to workers **employed by** a staffing agency | 2022 amendment: after **24 months at the same operating unit within 36 months**, the client must offer indefinite employment or pay compensation | **Watch long assignments.** Cap Assignment terms or diarise at 20 months |
| **Denmark / Finland** | Lower; equal-treatment rules apply to agency **employees** | — | `[UNVERIFIED — not researched in depth]` |
| **UK** | Conduct Regulations 2003 apply; **reg 10** limits transfer fees (14 weeks / 8 weeks) unless a valid **reg 32 opt-out** was signed by both the contractor's company and the individual **before the assignment started** | Off-payroll/IR35 for UK clients | **If selling to the UK, take the opt-out at onboarding or accept reg 10's short windows** |

**Does the Platform Work Directive bite? No — and say so plainly.** [Directive (EU) 2024/2831](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32024L2831) (transposition deadline **2 December 2026**) applies to a "digital labour platform" defined by **four cumulative** criteria, including that the service "involves the use of **automated monitoring or decision-making systems**" as a necessary and essential component. TalentSync is a human-led agency with no platform, no algorithmic management and no automated monitoring. It does not qualify. Do not build compliance for it, and do not let a client's questionnaire push you into asserting it applies. **Revisit only if** TalentSync builds a self-serve matching/monitoring product.

**The EU AI Act does have a live thread, though.** AI systems used to screen or filter job applications and evaluate candidates are **Annex III high-risk**. The original 2 August 2026 application date for Annex III obligations has been **postponed to 2 December 2027** by the AI Digital Omnibus (Commission proposal 19 Nov 2025; Parliament 16 June 2026; Council 29 June 2026) `[UNVERIFIED — confirm Official Journal publication; the delay takes legal effect on publication]`. **Article 50 transparency obligations still apply from 2 August 2026.** Practical position: if TalentSync uses any AI CV-screening or ranking tool, (i) it is a **deployer** of a high-risk system with obligations from Dec 2027, (ii) disclose AI use to candidates now, (iii) add a clause to Schedule 1 stating whether AI is used in screening and that a human makes every shortlist decision. `{{USES_AI_SCREENING}}`

---

## 16. TalentSync's own Moldovan regulatory exposure — check this before publishing anything

**A Moldovan private employment agency needs a licence** to carry out "plasare în câmpul muncii a cetățenilor Republicii Moldova în țară și/sau în străinătate", issued by the Public Services Agency, valid **5 years**, with conditions including Moldovan-citizen management resident in Moldova, clean criminal records (no trafficking, forced labour, illegal migration convictions), physical office and communications infrastructure, **prior verification of the foreign employer**, and **collaboration agreements with foreign beneficiaries containing genuine job offers, with individual employment contracts compliant with both Moldovan and destination-country law** ([ANOFM](https://www.anofm.md/ro/node/87); Law 105/2018; Law 180/2008 on labour migration).

- **Why this matters:** Schedule 1 (direct B2B recruitment — TalentSync introduces a Moldovan engineer to a foreign company that then employs them directly) looks a great deal like licensable placement of Moldovan citizens abroad. Schedule 2 (on-supply of a B2B contractor who stays in Moldova) probably does not. `[UNVERIFIED — this is the single most important local-law question in this brief and needs a Moldovan employment lawyer's opinion, not a web search.]`
- **If licensable and unlicensed:** the terms of business are the least of the problem — it's an administrative sanction and a reputational fact that an EU client's diligence will surface.
- **Also:** licensed agencies may not charge fees to work-seekers (ILO C181 Art 7 principle; TAW Art 6(3) where applicable) `[Moldova's ratification of ILO C181 UNVERIFIED — NORMLEX returned 403; the Netherlands has ratified]`. **Never take money from a candidate, in any jurisdiction, for any reason.** Not "CV optimisation", not "priority placement".

---

## 17. Consumer carve-out — what changes when the counterparty is a candidate

A candidate is a natural person acting outside their trade — a **consumer**. Everything above is written for businesses and does not transfer.

| Issue | B2B position | Consumer position |
|---|---|---|
| Governing law | Moldovan law, freely chosen (Rome I Art 3) | **Rome I Art 6:** the choice cannot deprive the consumer of the mandatory protections of their country of habitual residence, where the trader directs activities there. talentsync.eu, in English, targeting European companies and candidates, **directs activities** into the EU |
| Jurisdiction | Exclusive Chișinău courts, Hague 2005 | **Brussels Ia Arts 17–19, applicable to a non-EU-domiciled defendant via Art 6(1):** the consumer may sue in their **own** courts and may only be sued there. An exclusive Chișinău clause against a candidate is void, and is itself an unfair term under Directive 93/13 (*Océano Grupo*, C-240/98) |
| Standard terms | Art 1077 Moldovan Civil Code B2B unfair-clause control | Full unfair-terms review; the Moldovan Civil Code treats limitation of liability for death or personal injury as unfair, and a professional cannot limit or exclude a consumer's statutory rights for non-performance |
| Fees | Client pays | **Never charge the candidate.** TAW Art 6(3), ILO C181 Art 7 where ratified, UK Conduct Regs, Moldovan licensing conditions |
| Exclusivity / restrictive covenants | Fee-based transfer clauses | **Do not impose any** exclusivity, non-compete or transfer obligation on a candidate. It is void under Art 6(2) TAW / Art 9a WAADI and it is an unfair term |
| Withdrawal right | n/a | If TalentSync ever sells anything to an individual (CV review, coaching, interview prep), a **14-day distance-contract withdrawal right** applies. Cheapest answer: sell nothing to individuals |
| Data | Controller-to-controller / DPA | Full data-subject rights, Art 14 notice within one month for data not collected from the candidate (sourced profiles), lawful basis, retention limits |

**Practical rule: keep candidates out of Documents B and C entirely.** A short Candidate Terms page plus a Candidate Privacy Notice, containing no jurisdiction clause, no fee, no exclusivity, and no liability cap beyond what is lawful. Two pages. Anything more is both unenforceable and a bad look.

---

## 18. Priority order (what to do first)

1. **Self-host Montserrat** — removes the only third-party call and the only concrete, currently-actionable GDPR exposure. Hours of work.
2. **Get written logo/reference consents**, or de-identify. Highest expected-cost item on the site today.
3. **Verify the Engineer-side IP assignment exists in writing.** If it doesn't, nothing you promise a client about IP is true.
4. **Answer the Moldovan placement-licence question** with local counsel.
5. **Substantiate or qualify the four marketing claims** (EUR 15–35/hr, 60% saving, 1–2 week time-to-hire, Barça Mobile delivery claims), then draft the non-reliance clause around what survives.
6. **Publish A (Terms of Use + Privacy + Candidate Privacy)** as real static routes.
7. **Draft Part 1 + Schedules 1–3** and a one-page signed **Fee Confirmation / Assignment Confirmation** carrying the three critical terms out of the standard-terms danger zone.
8. **Netherlands: diarise the Wtta registration window, 1 Nov – 31 Dec 2026.** It's three months away.

---

## Verification status

**Verified against primary or authoritative sources:** Directive 2008/104/EC Arts 1, 3, 5, 6 (EUR-Lex); Directive 2011/7/EU floors; EU Late Payment Regulation status ("blocked in Council", EP Legislative Train, updated 20 June 2026); Moldova Law 66/2025 (in force 22 Oct 2025, 30/60-day caps); Moldova New York Convention accession 18.09.1998, in force 17.12.1998 (UNCITRAL); Moldova Hague 2005 accession 14.03.2024, in force 01.07.2024 (HCCH); Hague 2019 party list (Moldova not a party); German BA *Fachliche Weisungen* 01.10.2025 remote-work position; WAADI Art 7a registration and fines; Wtta entry into force 1 Jan 2027 and windows; HR 14.04.2017 ECLI:NL:HR:2017:689; Norway *innleie* post-01.04.2023 regime and registration; Belgium Art 31 Law of 24.07.1987; Sweden 24-month rule; UK Conduct Regs reg 10 and reg 32; Platform Work Directive four cumulative criteria; Moldova Law 230/2022 moral rights inalienable; Moldova Civil Code Art 1077 B2B unfair standard terms and liability-exclusion limits; LG München I 20.01.2022 3 O 17493/20; Commission Delivery Hero/Glovo no-poach decision 02.06.2025; effective-cause case law.

**Not verified / needs local counsel:**
- Whether TalentSync's model requires the Moldovan placement licence (**highest priority**).
- Moldova Law No. 195/2026 on personal data protection — number and 23 August 2026 entry into force (single secondary source).
- Moldova's ratification status for ILO C181 (NORMLEX returned HTTP 403).
- AI Digital Omnibus — Official Journal publication of the Annex III delay to 2 December 2027.
- Whether a Moldovan claimant can use the European Order for Payment against an EU debtor.
- Calendly's current EU transfer mechanism.
- Denmark, Finland, and other Nordic agency-work specifics.
- Typical PI/cyber insurance levels demanded by EU enterprise buyers (market practice, not law).
- Moldova's accession progress on the Hague 2019 Judgments Convention.

---

## Sources

[REC Contract 1 – introduction of permanent staff](https://www.rec.uk.com/recruiters/legal/template-documents/contracts/contract-1-terms-business-introduction-permanent-or-fixed-term-contract-staff-be-directly-engaged-client) · [Aspire Rec2Rec standard terms](https://aspirerec2rec.co.uk/standard-terms/) · [Debenhams Ottaway – effective cause](https://www.debenhamsottaway.co.uk/news/2014/04/perm-fees-employment-agency-need-effective-cause-introduction/) · [Conduct Regulations 2003 explainer](https://www.crunch.co.uk/knowledge/article/the-conduct-of-employment-agencies-and-employment-businesses-regulations-2003) · [Directive 2008/104/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32008L0104) · [Directive 2011/7/EU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32011L0007) · [EP Legislative Train – Late Payment revision](https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-late-payments-directive-revision) · [Mayer Brown – Late Payment Regulation proposal](https://www.mayerbrown.com/en/insights/publications/2023/10/the-european-commission-proposes-an-updated-late-payment-regime-for-the-eu) · [Schoenherr – Moldova Law 66/2025](https://www.schoenherr.eu/content/news-from-moldova-one-more-piece-of-legislation-to-combat-delayed-payment-in-commercial-transactions) · [Chambers – Commercial Contracts 2025, Moldova](https://practiceguides.chambers.com/practice-guides/commercial-contracts-2025/moldova/trends-and-developments) · [EY Law – AÜG Fachliche Weisungen 2025](https://www.eylaw.de/de_de/news/2025/neue-fachliche-weisung-erleichterung-fuer-arbeitnehmerueberlassung-im-ausland) · [Kliemt – BA reversal on EoR/AÜG](https://kliemt.blog/2025/11/25/kehrtwende-der-bundesagentur-fuer-arbeit-doch-keine-erlaubnispflicht-fuer-employer-of-record-modelle) · [Nederlandse Arbeidsinspectie – WAADI registration](https://www.nlarbeidsinspectie.nl/onderwerpen/wet-allocatie-arbeidskrachten-door-intermediairs/registratieplicht-voor-uitleners) · [ABU – Wtta](https://www.abu.nl/kennisbank/toelatingsstelsel-wtta/) · [Toelating uitleenmarkt – over de Wtta](https://www.toelatinguitleenmarkt.nl/over-de-wtta) · [Loyens & Loeff – Waadi/Wtta](https://www.loyensloeff.com/nl/insights/news--events/news/de-waadi-verandert-wat-betekent-de-wtta-voor-uitleners-en-inleners/) · [Cassatieblog – HR 14.04.2017 belemmeringsverbod](https://cassatieblog.nl/arbeidsrecht/belemmeringsverbod-ziet-niet-enkel-op-arbeidsovereenkomst-maar-ook-op-arbeidsverhouding/) · [PwC NL – handhaving schijnzelfstandigen 2026](https://www.pwc.nl/nl/actueel-en-publicaties/belastingnieuws/loonbelasting-en-sociale-verzekeringen/handhaving-schijnzelfstandigen-vanaf-tweeduizendzesentwintig.html) · [Arbeidstilsynet – hiring of labour](https://www.arbeidstilsynet.no/en/pay-and-engagement-of-employees/engagement-of-employees/hiring-of-labour/) · [FOD Werk – terbeschikkingstelling](https://werk.belgie.be/nl/themas/arbeidsovereenkomsten/terbeschikkingstelling-van-werknemers) · [Stappers – verboden terbeschikkingstelling en oninbare facturen](https://www.stappers-law.be/2016/05/31/verboden-terbeschikkingstelling-van-werknemers-kan) · [Bird & Bird – Swedish staffing law changes](https://www.twobirds.com/en/insights/2023/sweden/swedish-legislative-changes-are-affecting-companies-that-use-staffing-agency-workers) · [Directive (EU) 2024/2831 (Platform Work)](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32024L2831) · [Access Financial – EU AI Act recruitment 2026](https://accessfinancial.com/eu-ai-act-recruitment-high-risk-hiring-2026/) · [Ogletree – Pay Transparency Directive progress](https://ogletree.com/insights-resources/blog-posts/the-eu-pay-transparency-directives-progress-explained/) · [UNCITRAL – New York Convention status](https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards/status2) · [HCCH – 2005 Convention enters into force for Moldova](https://www.hcch.net/en/news-archive/details/?varevent=988) · [PETOŠEVIĆ – Moldova Law 230/2022 copyright](https://www.petosevic.com/resources/news/2022/11/4681) · [AGEPI – Law 230 on copyright](https://www.agepi.md/en/content/legea-privind-dreptul-de-autor-si-drepturile-conexe-nr-230) · [ANOFM – licensing conditions for private employment agencies](https://www.anofm.md/ro/node/87) · [EU4Digital – Moldova GDPR enablement](https://eufordigital.eu/eu4digital-recommendations-to-strengthen-moldovas-data-protection-gdpr-enablement-report/) · [European Commission – adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en) · [activeMind – Google Fonts ruling](https://www.activemind.legal/guides/ruling-google-fonts/) · [HSF Kramer – Delivery Hero/Glovo no-poach](https://www.hsfkramer.com/notes/crt/2025-06/european-commission-fines-delivery-hero-and-glovo-329-million-for-participating-in-a-cartel)

---

## OPEN QUESTIONS (business decisions required)


1. Legal entity details for the provider identity block: exact legal name and form (SRL?), IDNO registration number, registered address in Chișinău, VAT/fiscal registration status.

2. Does TalentSync hold, or need, the Moldovan licence for 'plasare în câmpul muncii a cetățenilor în străinătate' (ASP-issued, 5-year validity, Law 105/2018 / Law 180/2008)? This is the single highest-priority local-law question and needs a Moldovan employment lawyer, not a web search. It may make the Schedule 1 model licensable.

3. How are engineers currently contracted — employees of TalentSync, B2B contractors via their own SRL/PFA, Moldova IT Park residents, or a mix? The entire Schedule 2 risk allocation and the IP chain depend on the answer.

4. Do the existing engineer contracts contain a written assignment of economic/patrimonial IP rights, a non-assertion covenant for moral rights, and a further-assurance clause? If not, TalentSync cannot lawfully give clients the IP warranty in Schedule 2 §10.

5. Fee percentage(s) and minimum fee for Schedule 1; deemed bonus percentage and deemed equity valuation method; cancellation fee for withdrawn roles.

6. Rate card, indexation headroom, FX trigger threshold, and annual non-billable absence allowance per engineer for Schedule 2.

7. Appetite on the guarantee: is 12 weeks with replacement-first and a 70/50/25% credit-note fallback acceptable commercially, or does the market TalentSync sells into expect a longer period or a cash rebate?

8. Preferred payment terms (14 or 21 or 30 days) and liability cap appetite (proposed: greater of fee paid or EUR 10,000 for Schedule 1; greater of 12 months' charges or EUR 50,000 for Schedule 2).

9. Transfer Fee taper: is 20/12/6/nil over 0-6/7-12/13-18/19+ months acceptable, and what extended-hire period will be offered as the lawful alternative? What minimum transfer fee?

10. Are professional indemnity, general liability and cyber insurance currently in place, and at what limits? Enterprise procurement will gate on this.

11. Written logo/reference consents — which of the ten named clients (Barça Mobile, Orange, Entail AI, New Era Visionary Group, Pixelette, Qualiwise, SocialBee, Silvertalent, Foodamigos, Innovatec) have given written permission to be named, and does any MSA contain a no-publicity clause?

12. Substantiation for the four live claims: what is the comparator and methodology behind 'save up to 60%', what is the evidence base for '1-2 weeks time to hire', and will Barça Mobile confirm in writing the '1.5M downloads in first 3 months' and architecture/CI-CD attribution?

13. Does TalentSync use any AI tool to screen, rank or filter candidates? Determines Annex III EU AI Act deployer obligations and the candidate-facing disclosure clause.

14. Which client countries are actually in the pipeline? Belgium and the Netherlands change the answer materially for the hourly model — Belgium may need to be excluded from Schedule 2 entirely, and the Dutch Wtta registration window opens 1 November 2026.

15. Will TalentSync ever send an engineer onsite to a client's country? If yes, an Onsite Addendum, work-permit process, A1/social security position and posting notification process are all needed before the first trip.

16. Is there budget/appetite for the enterprise fallback — VIAC or SCC arbitration — or should the terms hold the line on exclusive Chișinău jurisdiction under Hague 2005 for all clients?

17. Confirm Moldova's new data protection law (reported as Law No. 195, in force 23 August 2026) — number, date, and whether it changes the SCC/transfer position for EU clients.
