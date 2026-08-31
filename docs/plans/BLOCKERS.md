# BLOCKERS — the 96 placeholders, triaged

Every `{{TOKEN}}` in the legal drafts, in one table, with the draft's own recommended
default already filled in. **You are not being asked 96 questions.** As of
30 August 2026 you are being asked **seven** — [§2](#2-answer-these-seven). The rest either
have a defensible default that ships today, or have now been answered.

> **Superseded by §2, 30 August 2026.** Victor answered the entity, founder, privacy and
> operations questions; §2 now carries the seven that are left and the full RESOLVED list.
> The history below is kept because the trading-name rule in §1.1 is still binding.
>
> **Updated after wave D.** Three of the thirteen are **answered** — the Moldovan state
> registry gave us the registered name, the legal form and the IDNO (§1.1). That resolves
> `{{LEGAL_ENTITY_NAME}}`, `{{LEGAL_FORM}}` and `{{IDNO}}` on six pages. It also surfaced
> something the drafts did not anticipate: **the registered company is not called
> TalentSync.** Read §1.1 before writing any legal copy. Four questions replace the three
> that closed, so the list is fourteen, not thirteen.
>
> Wave B landed the legal pages; wave C landed the analytics, the founder block and the
> service copy; wave D fixed what verification found. `npm run verify` now prints a full
> `{{TOKEN}}` ledger — every distinct placeholder in `out/` with every route it renders on —
> and **fails if any token in the build has no row in this file**. That check exists because
> `{{VICTOR_FULL_NAME}}` reached four `Article` author bylines in structured data without a
> single line here, so the one person who could answer it was never going to be asked.

**How to use this file**

1. Answer the seven in [§2](#2-answer-these-seven). That is the whole ask for launch.
2. Everything in [§3](#3-before-the-first-client-contract) is deferred to a named
   milestone. Do not read it this week.
3. Anything in the table with a recommended default is **already taken** unless you say
   otherwise — the implementation agents write the default into the page and delete the
   token. `npm run verify` fails the deploy on any token that survives into `out/`
   (DECISIONS.md D8), so nothing can ship half-filled.

**Owner key** — `V` Victor (business fact, nobody can invent it) · `V+MD` Victor plus
Moldovan counsel · `V+EU` Victor plus EU counsel · `V+ACC` Victor plus the accountant ·
`DEV` a configuration or code change, not a wording choice · `DEFAULT` the draft's
recommendation is taken automatically, Victor only needs to override it.

---

## 1. The table

> **§2 SUPERSEDES THIS SECTION where the two disagree.** The tables below are the original
> triage of all 96 tokens and still record what each one is and which page it lands on, but
> their "recommended default" columns pre-date Victor's answers. In particular: `{{VAT_STATUS}}`
> is answered (no registration), `{{PLACEMENT_LICENCE_STATUS}}` is answered (none required),
> the `{{EU_REP_*}}` rows describe an appointment that was never made, and the
> `{{ANALYTICS_*}}` / `{{GA4_*}}` rows assume GA4 is live in the launch release — **it is not;
> analytics ships off.** Read §2 first.

### 1.1 Entity identity — shared by /terms/, /privacy/, /cookies/ and /imprint/

**Three of these are now answered, from the official state registry
([data2b.md, IDNO 1020600034949](https://data2b.md/en/companies/1020600034949/srl-unqenergy)).**

| Resolved | Value |
|---|---|
| `{{LEGAL_ENTITY_NAME}}` | `S.R.L. "UNQENERGY"` |
| `{{LEGAL_FORM}}` | `SRL` (*societate cu răspundere limitată*) |
| `{{IDNO}}` | `1020600034949` |

> **The registered company is not called TalentSync.**
>
> **TalentSync is a trading name. The legal person is `S.R.L. "UNQENERGY"`.** Every legal
> document must say so in the same breath, in this exact shape:
>
> > **S.R.L. "UNQENERGY" (IDNO 1020600034949), trading as "TalentSync"**
>
> That form is binding on the privacy controller block, the terms' party definition and the
> imprint. It is not pedantry: an EU client's procurement team receives a proposal from
> "TalentSync", an invoice from "UNQENERGY" and a contract naming a third string, and the
> engagement stops at supplier onboarding while somebody proves the three are one company.
> A single unexplained mismatch is enough to trigger it. Stating it plainly once, on every
> legal page, costs nothing and closes the question before it is asked.
>
> That is why §2 row 4 asks Victor to **confirm UNQENERGY is the entity that will actually
> sign client contracts and issue invoices.** The registry proves a company exists with that
> name and number. It does not prove it is the contracting party, and no agent may assume it.

The registry page gives **nothing else** — no registered address, no director, no VAT
status, no share capital, no NACE codes. Those stay open below, and nobody invents them.

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{LEGAL_ENTITY_NAME}}` | ~~The company's exact registered name~~ | **RESOLVED** — `S.R.L. "UNQENERGY"`, always with `trading as "TalentSync"` | — | **done** |
| `{{LEGAL_FORM}}` | ~~The legal form of the company~~ | **RESOLVED** — `SRL` (*societate cu răspundere limitată*) | — | **done** |
| `{{IDNO}}` | ~~The 13-digit Moldovan company registration number~~ | **RESOLVED** — `1020600034949` | — | **done** |
| `{{REGISTERED_ADDRESS}}` | The registered street address in Chișinău exactly as the registry extract has it — not the working office, if they differ. **The public registry listing does not show it; it is on the extract.** | — (no default possible) | /terms/, /privacy/, /cookies/, /imprint/, /about/, the footer NAP and `Organization` JSON-LD, which must match it character for character (D5) | **V** |
| `{{VAT_STATUS}}` | Whether the company is VAT-registered in Moldova, and the code if it is. | `not VAT-registered` — or the code, if there is one. Do **not** default this silently: /terms/ A1 states it as fact, and a B2B client in the EU reads it to decide whether reverse charge applies | **V** |
| `{{PLACEMENT_LICENCE_STATUS}}` | Whether placing Moldovan citizens with foreign employers needs a licence, and the number if so. | — blocked on the Moldovan legal opinion in §3.1 | /terms/ A1, /imprint/ | **V+MD** |
| `{{LEGAL_CONTACT_EMAIL}}` / `{{NOTICES_EMAIL}}` | The address for legal, contractual and logo-takedown notices. | `legal@talentsync.eu`, forwarding to Victor — create the alias before publishing | /terms/ A1, D-clauses | **V** (5 min) |

### 1.2 Privacy policy — /privacy/ and /candidate-privacy/

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{PRIVACY_CONTACT_NAME}}` | The named person accountable for privacy. Do **not** title them "DPO" — that formal designation triggers Art 38/39 duties and a CNPDCP notification. | Victor, titled "privacy contact" | /privacy/ §1 | **V** |
| `{{PRIVACY_EMAIL}}` | The address people use to exercise their data rights. | `privacy@talentsync.eu` — survives staff changes; create the alias before publishing | /privacy/ (10 places) | **V** (5 min) |
| `{{EU_REP_NAME}}` | The GDPR Art 27 representative's name. Not optional for a recruiter — the "occasional processing" exemption does not apply. | Appoint a provider in Romania (largest candidate concentration, shared language, cheapest) | /privacy/ §1, §17, Annex A | **V** |
| `{{EU_REP_ADDRESS}}` | Their postal address in the EU. | as above | /privacy/, Annex A | **V** |
| `{{EU_REP_EMAIL}}` | Their contact email. | as above | /privacy/ (6 places), Annex A | **V** |
| `{{EU_REP_MANDATE_DATE}}` | The date the Art 27 mandate was signed. New in wave B (`src/data/legal/privacy.ts`) — the policy states when the appointment took effect. | The date the mandate is signed; falls out of the §2 row 5 answer | /privacy/ §17 | **V** |
| `{{UK_REPRESENTATIVE_BLOCK}}` | One of two paragraphs: either a UK representative's details, or a statement that none is needed. | The "no UK representative" paragraph drafted at 03 Open Q7 — valid while UK contacts are corporate clients only | /privacy/ §1 | **DEFAULT** |
| `{{FONTS_SELF_HOSTED_DATE}}` | The date Montserrat stopped being loaded from Google's CDN. Until then every EU visitor's IP goes to Google without consent. | Ship `next/font` in the launch release, then use that date | /privacy/ §4.3 | **DEV** |
| `{{ANALYTICS_STATUS}}` | A marker saying whether GA4 is live yet. | `live` — GA4 ships in the launch release (D2) | /privacy/ §4 | **DEFAULT (D2)** |
| `{{ANALYTICS_LIVE_DATE}}` | The date GA4 went live. The consent banner and /cookies/ must deploy in the same release, never after. | The launch deploy date | /privacy/ §4, §13 | **DEV** |
| `{{GA4_DATA_RETENTION}}` | How long GA4 keeps event-level data: 2 months or 14. | `2 months` — pick 14 only if year-on-year comparison is genuinely needed. Set it in the GA4 admin first, then write the same number here | /privacy/ §10 | **DEFAULT** |
| `{{LOG_RETENTION_DAYS}}` | How long the nginx/Railway access logs are kept. Has to be the number actually configured, not a wish. | `30` days — or set `access_log off;` in nginx.conf and delete the row | /privacy/ §4, §10; /cookies/ §5 | **DEV** |
| `{{RAILWAY_REGION}}` | Which Railway region serves the container. If it is US, that is a Chapter V transfer needing SCCs or DPF. | Read it off the Railway dashboard. Sign a DPA with Railway either way — the access logs hold EU visitors' IPs | /privacy/ §8, §9 | **DEV** |
| `{{EMAIL_PROVIDER}}` | Google Workspace, Microsoft 365, or other — plus its data region. | Name it; confirm the Art 28 DPA is accepted | /privacy/ §8 | **V** (5 min) |
| `{{CANDIDATE_SYSTEM}}` | Where candidate records actually live today: the inbox, a spreadsheet, an ATS, a CRM. | The honest answer. "The inbox" is defensible for a small team and the policy is accurate either way | /privacy/ §6, §8 | **V** |
| `{{CANDIDATE_SYSTEM_LOCATION}}` | Where that system stores the data. Any US-hosted one needs SCCs or DPF. | as above | /privacy/ §8, §9 | **V** |
| `{{PAYMENT_PROVIDER}}` | The bank or provider used to pay engineers and invoice clients under the hourly model. | Name it, or delete the table row if no engineer is paid directly | /privacy/ §8 | **V** (5 min) |
| `{{CALENDLY_DPF_VERIFIED}}` | Calendly's current EU transfer mechanism. | Check dataprivacyframework.gov on the day of publishing; if listed, `DPF certification verified on [date]`, else `relies on the SCCs in Calendly's DPA` | /privacy/ §9 | **DEV** (10 min) |
| `{{MD_LIMITATION_PERIOD}}` | The general limitation period for contract and fee claims under the Moldovan Civil Code. Drives two retention rows. | Commonly stated as 3 years — confirm, do not guess | /privacy/ §10 | **V+MD** |
| `{{MD_ACCOUNTING_RETENTION}}` | The statutory retention period for accounting and tax records in Moldova. A legal obligation, not a choice. | Ask the accountant | /privacy/ §10 | **V+ACC** |
| `{{AI_SCREENING_POSITION}}` | The sentence describing whether AI is used to evaluate candidates. | `We do not use automated decision-making or AI screening to evaluate candidates.` — FROZEN by D3 | /privacy/ §6.8, §14 | **DEFAULT (D3)** |
| `{{ENGINEER_ENGAGEMENT_STATUS}}` | Under the hourly model: are engineers TalentSync employees, TalentSync contractors, or contracted direct by the client? Decides whether TalentSync is their employer-controller and whether timesheet/billing is joint controllership. | — must match the contracts actually in force | /privacy/ §6; /terms/ Part C | **V** |
| `{{SOURCE_PLATFORM}}` | Not a site token. In Annex A it is filled in per outreach message with the real platform and the real profile URL — Art 14 requires the source, and "a public source" does not satisfy it. | Filled per message, never once | /candidate-privacy/ Annex A | **V** (process) |

### 1.3 Cookie policy — /cookies/

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{ANALYTICS_PROVIDER}}` | Which analytics product the site runs. | `Google Analytics 4` — FROZEN by D2. The draft's Plausible recommendation is noted and rejected | /cookies/ §1, §5 | **DEFAULT (D2)** |
| `{{GA4_MEASUREMENT_ID}}` | The `G-XXXXXXXXXX` measurement ID from the GA4 property. | — create the property; the ID cannot be invented | /cookies/ §5; `Analytics.tsx` | **V** (15 min) |
| `{{EU_REPRESENTATIVE_NAME_AND_ADDRESS}}` | Same Art 27 representative as `{{EU_REP_*}}`, in the cookie policy header. | as §1.2 | /cookies/ §1, §10 | **V** |
| `{{PUBLICATION_DATE}}` | The date /cookies/ actually goes live. | The deploy date — not today's date. Keep the 28 Feb 2027 review date | /cookies/ header | **DEV** |
| `{{DOUBLE_BRACE}}` | **Not a real placeholder.** It is the draft talking about placeholders in prose. Delete the sentence when the page is written. | n/a | nothing | **DEV** |

### 1.4 Terms — /terms/, Part A (website)

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{TERMS_VERSION}}` | Version number at the head of the document. | `1.0` | /terms/ header | **DEFAULT** |
| `{{EFFECTIVE_DATE}}` | The date the terms take effect. | The date /terms/ is first published | /terms/ header | **DEV** |
| `{{SITE_LIABILITY_CAP}}` | The liability cap for merely using the website. | `EUR 100` | /terms/ A11.3 | **DEFAULT** |
| `{{EU_REPRESENTATIVE_DETAILS}}` | Same Art 27 representative, restated in Part B's data-protection clause. | as §1.2 | /terms/ B18.5 | **V** |

### 1.5 Terms — Part B, the permanent placement fee

The only two rows here that are genuinely blocking are the fee and the minimum: they are
what a client actually negotiates, and they leak straight into every proposal.

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{PLACEMENT_FEE_PERCENT}}` | The permanent placement fee, as a percentage of first-year gross pay. | `18–22%` standard, `22–25%` for senior/scarce/leadership — state the applicable figure in the Fee Confirmation | /terms/ B8.1 | **V** |
| `{{MINIMUM_FEE}}` | The floor under that percentage, so a junior placement is still worth doing. | `EUR 6,000` | /terms/ B8.1 | **V** |
| `{{DEEMED_BONUS_PERCENT}}` | If a bonus scheme exists but no target is stated, what percentage of base pay counts as the bonus. | `15%` | /terms/ B8.2(b) | **DEFAULT** |
| `{{DEEMED_CAR_VALUE}}` | The annual value assumed for a company car with no stated cash equivalent. | `EUR 6,000` | /terms/ B8.2(c) | **DEFAULT** |
| `{{DEEMED_EQUITY_VALUE}}` | The value assumed for equity or options with no valuation, subject to true-up. | `EUR 10,000` | /terms/ B8.2(h) | **DEFAULT** |
| `{{ADMIN_UPLIFT_PERCENT}}` | The admin charge added when a client understated the salary. | `10%` — keep it framed as a genuine pre-estimate of investigation cost; Moldovan courts reduce disproportionate penalties | /terms/ B8.5 | **DEFAULT** |
| `{{VALIDITY_PERIOD_MONTHS}}` | The "tail": how long after an introduction a hire still triggers the fee. | `12` months — concede 6 in negotiation, never below 6 | /terms/ B5.1 | **DEFAULT** |
| `{{PRIOR_KNOWLEDGE_NOTICE_DAYS}}` | How long a client has to object, with evidence, that it already knew the candidate. | `5` business days | /terms/ B7.1 | **DEFAULT** |
| `{{CLIENT_NOTIFICATION_DAYS}}` | How long a client has to tell you about an offer, acceptance or start date. | `3` business days | /terms/ B9.1 | **DEFAULT** |
| `{{VALIDATION_HISTORY_YEARS}}` | How many years of employment history "validated" actually covers. | `5` years — only warrant what you actually do; the site says "validates" | /terms/ B3.2(b) | **DEFAULT** |
| `{{USES_AI_SCREENING}}` | The sentence on AI in screening, in the terms. | The "no automated decision-making" sentence — FROZEN by D3, and must match /privacy/ word for word | /terms/ B3.4 | **DEFAULT (D3)** |

### 1.6 Terms — Part B, payment, guarantee and cancellation

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{PERM_PAYMENT_DAYS}}` | Payment period for a placement invoice. | `14` days (statutory ceiling is 60 under Moldovan Law 66/2025 and Directive 2011/7/EU) | /terms/ B10.2 | **DEFAULT** |
| `{{HOURLY_PAYMENT_DAYS}}` | Payment period for a monthly hourly invoice. | `21` days | /terms/ C8.2 | **DEFAULT** |
| `{{RECOVERY_COMPENSATION}}` | Fixed compensation charged per overdue invoice, on top of interest. | `EUR 100` — must never be set below the statutory EUR 40 minimum | /terms/ B10.5 | **DEFAULT** |
| `{{SUSPENSION_NOTICE_DAYS}}` | Notice before you stop work or pull engineers over non-payment. | `7` days | /terms/ B10.8, C8.4 | **DEFAULT** |
| `{{START_DELAY_WEEKS}}` | How late a candidate can start before you credit the fee in full. | `8` weeks | /terms/ B10.6 | **DEFAULT** |
| `{{GUARANTEE_WEEKS}}` | The placement guarantee period. | `12` weeks, capped at the client's actual probation period where local law is shorter | /terms/ B12.1 | **DEFAULT** |
| `{{REPLACEMENT_SEARCH_DAYS}}` | How long the free replacement search runs. | `60` days | /terms/ B12.3 | **DEFAULT** |
| `{{REBATE_TIER_1_PERCENT}}` | Credit note if the hire leaves in weeks 0–4. | `70%` | /terms/ B12.4 | **DEFAULT** |
| `{{REBATE_TIER_2_PERCENT}}` | Credit note, weeks 5–8. | `50%` | /terms/ B12.4 | **DEFAULT** |
| `{{REBATE_TIER_3_PERCENT}}` | Credit note, weeks 9–12. | `25%` | /terms/ B12.4 | **DEFAULT** |
| `{{CREDIT_NOTE_VALIDITY_MONTHS}}` | How long a guarantee credit note can be spent against future fees. | `12` months | /terms/ B12.4 | **DEFAULT** |
| `{{REPLACEMENT_GUARANTEE_WEEKS}}` | The shortened guarantee on a replacement placement. | `6` weeks, with no further replacement | /terms/ B12.7 | **DEFAULT** |
| `{{CANCELLATION_FEE}}` | What you charge if a client pulls a role after you delivered a shortlist. | `EUR 2,500 or 25% of the estimated fee, whichever is greater` | /terms/ B13.2 | **DEFAULT** |
| `{{INTERVIEW_WINDOW_DAYS}}` | How long the client has to interview a shortlisted candidate before that fee bites. | `15` business days | /terms/ B13.2 | **DEFAULT** |

### 1.7 Terms — Part C, the hourly model

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{HOURLY_MIN_TERM}}` | Minimum term of an assignment. | `one month` | /terms/ C10.1 | **DEFAULT** |
| `{{CLIENT_NOTICE_DAYS}}` | Client's notice to end an assignment. | `20` business days | /terms/ C10.2(a) | **DEFAULT** |
| `{{CLIENT_NOTICE_DAYS_AFTER_6M}}` | Client's notice once the assignment has run 6 months. | `30` business days | /terms/ C10.2(a) | **DEFAULT** |
| `{{AGENCY_NOTICE_DAYS}}` | Your notice to end an assignment. | `20` business days — **must match the engineer's own contract exactly**, or margin leaks on every departure | /terms/ C10.2(b) | **V** (check the contract) |
| `{{SUBSTITUTION_NOTICE_DAYS}}` | Notice before swapping one engineer for another. | `10` business days | /terms/ C5.1 | **DEFAULT** |
| `{{TIMESHEET_APPROVAL_DAYS}}` | How long a client has to dispute a timesheet before it is deemed approved. | `3` business days | /terms/ C6.2 | **DEFAULT** |
| `{{RATE_FIX_MONTHS}}` | How long rates are frozen before you may raise them. | `12` months | /terms/ C7.3 | **DEFAULT** |
| `{{RATE_NOTICE_DAYS}}` | Notice required for a rate increase. | `60` days | /terms/ C7.3 | **DEFAULT** |
| `{{INDEXATION_HEADROOM}}` | Percentage points you may add above euro-area HICP on an annual increase. | `3` | /terms/ C7.3 | **DEFAULT** |
| `{{FX_TRIGGER_PERCENT}}` | EUR/MDL movement that reopens pricing. | `7%` | /terms/ C7.4 | **DEFAULT** |
| `{{ABSENCE_DAYS}}` | Non-billable planned absence per engineer per rolling 12 months. | `25` days, plus Moldovan public holidays and sickness | /terms/ C7.6 | **DEFAULT** |
| `{{TRANSFER_FEE_0_6}}` | Buy-out fee if the client hires the engineer in assignment months 0–6. | `20%` of first-year annualised gross pay | /terms/ C11.2 | **DEFAULT** |
| `{{TRANSFER_FEE_7_12}}` | Buy-out fee, months 7–12. | `12%` | /terms/ C11.2 | **DEFAULT** |
| `{{TRANSFER_FEE_13_18}}` | Buy-out fee, months 13–18. | `6%`, nil from month 19 | /terms/ C11.2 | **DEFAULT** |
| `{{MIN_TRANSFER_FEE}}` | Floor under the buy-out fee. | `EUR 8,000` | /terms/ C11.2 | **DEFAULT** |
| `{{TRANSFER_TAIL_MONTHS}}` | How long after an assignment ends the buy-out fee still applies. | `12` months | /terms/ C11.3 | **DEFAULT** |
| `{{EXTENDED_HIRE_MONTHS}}` | The extended-hire alternative to paying the buy-out fee. | `6` months — **do not delete it**; it is what makes the fee "reasonable" under Art 6(2) of Directive 2008/104/EC and Art 9a WAADI | /terms/ C11.4 | **DEFAULT** |
| `{{AUDIT_ERROR_THRESHOLD}}` | Overcharge percentage at which you pay for the audit. | `5%` | /terms/ C18.3 | **DEFAULT** |
| `{{RECORD_RETENTION_YEARS}}` | How long timesheets and assignment records are kept. | `3` years | /terms/ C18.2 | **DEFAULT** |

### 1.8 Terms — Part D, liability, insurance and common provisions

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{PERM_LIABILITY_CAP_FLOOR}}` | The floor under the Part B liability cap. | `EUR 10,000`, or the fee paid if higher | /terms/ B19.1 | **DEFAULT** |
| `{{HOURLY_LIABILITY_CAP_FLOOR}}` | The floor under the Part C liability cap. | `EUR 50,000`, or 12 months' charges on the affected assignment if higher | /terms/ C19.1 | **DEFAULT** |
| `{{AGGREGATE_ANNUAL_CAP}}` | The overall annual cap across every part. | The greater of total sums paid in the 12-month period and `EUR 100,000` | /terms/ D6 | **DEFAULT** |
| `{{TIME_BAR_MONTHS}}` | How long a client has to bring a claim. | `12` months | /terms/ D6 | **DEFAULT** |
| `{{PI_INSURANCE_LIMIT}}` | Professional indemnity cover **actually held**. | `EUR 1m` per claim (`EUR 2m` for enterprise clients) — state only what you carry; quoting cover you do not hold is a warranty breach on day one | /terms/ C17 | **V** |
| `{{GL_INSURANCE_LIMIT}}` | Commercial general liability cover actually held. | `EUR 1m` — same warning | /terms/ C17 | **V** |
| `{{CYBER_INSURANCE_LIMIT}}` | Cyber liability cover actually held. | `EUR 1m` — same warning | /terms/ C17 | **V** |
| `{{PERSONNEL_NONSOLICIT_MONTHS}}` | How long the mutual staff-poaching clause runs. | `12` months | /terms/ D-clause | **DEFAULT** |
| `{{PERSONNEL_TRANSFER_FEE}}` | The fee if either party hires the other's directly-involved staff. | `20%` of first-year gross pay, minimum `EUR 10,000`. Deliberately a fee, not a ban — see the Commission's EUR 329m Delivery Hero/Glovo no-poach decision | /terms/ D-clause | **DEFAULT** |
| `{{FM_SUBSTITUTE_DAYS}}` | Consecutive days of force-majeure interruption before you offer a substitute engineer. | `10` business days | /terms/ D-clause | **DEFAULT** |
| `{{FM_TERMINATION_DAYS}}` | Consecutive days of force majeure before either party may terminate. | `60` days | /terms/ D-clause | **DEFAULT** |
| `{{CANDIDATE_RETENTION_MONTHS}}` | How long candidate data is kept from last meaningful contact. | `24` months, `6` for rejected German-facing candidates. **Needs a real mechanism, not a policy sentence** — see §3.2 | /terms/ B18.7; /privacy/ §10 | **DEFAULT + DEV** |
| `{{ESCALATION_DAYS}}` | How long senior representatives have to meet before either side starts proceedings. | `15` business days | /terms/ D-clause | **DEFAULT** |

### 1.9 Founder, entity history and market data — /about/, /imprint/, /technical-recruitment-moldova/

**New in waves B and C.** These six tokens are not part of the original 96 — they entered
`src/` when the founder block, the entity history and the Moldova market page were written.
They are listed here so `npm run verify` (D8) has a triage row for every token it can find,
not just the legal ones. The first four are one answer, already asked as §2 rows 7 and 11.

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{FOUNDER_FULL_NAME}}` | Victor's full legal name. | — (no default possible) | `src/data/about.ts`, `src/data/legal/imprint.ts`, the `Person` node, every `Article` author | **V** |
| `{{VICTOR_FULL_NAME}}` | **The same fact as the row above, under a second spelling.** It reached the build unlisted — four `Article` author bylines in `src/data/insights/index.ts` — which is exactly the failure this file exists to prevent: a token nobody was asked about never gets answered. It is worse than a token in prose, because a brace string inside a `Person` entity is ingested by Google *as the author's name*. | — same answer as `{{FOUNDER_FULL_NAME}}`. Collapse the two spellings to one token in `src/data/insights/index.ts` so one answer resolves /about/, /imprint/, the `Person` node and all four bylines at once | four `/insights/[slug]/` bylines and their `Article` JSON-LD | **V** |
| `{{FOUNDER_TITLE}}` | His job title, in the words he actually uses. | `Founder` if nothing better — but pick one and use it in both files | `src/data/about.ts`, `src/data/legal/imprint.ts` | **V** |
| `{{FOUNDER_LINKEDIN_URL}}` | His personal LinkedIn profile URL — the company page is already in `siteConfig` and is not a substitute. | — the `sameAs` edge that makes the `Person` node resolvable | `src/data/about.ts` | **V** (2 min) |
| `{{FOUNDED_YEAR}}` | Year the company started trading. | — same registry extract as §1.1 | `src/data/about.ts`, `foundingDate` in `Organization` JSON-LD | **V** |
| `{{MOLDOVA_ICT_HEADCOUNT}}` | Number of ICT professionals in Moldova, with the source and the year. | Cite Moldova IT Park's own published figure with its year, or delete the sentence. An unsourced number is exactly the kind of claim clause A4.3 promises to substantiate on request | /technical-recruitment-moldova/ | **V** |
| `{{MOLDOVA_SENIOR_RATE_BAND}}` | The senior rate band quoted on the Moldova page. | — **read D7 first.** "EUR 15–35/hour" is CUT and must not come back here under a new token. Either a sourced market-wide band with the source named, or delete the sentence | /technical-recruitment-moldova/ | **V** |

---

## 2. Answer these seven

**Victor answered on 30 August 2026.** Fourteen became seven. Everything in the RESOLVED
block below is written into the pages and its token is deleted — do not re-ask it. What is
left is short on purpose: a long list is why these things never get answered.

| # | Question | Why it blocks | Owner |
|---|---|---|---|
| **1** | **EU Art 27 representative — appoint one, or take a written opinion that none is required.** Deferred: *"decide later"*. | **A live compliance question, not a cosmetic one.** The policies used to name a representative and give the date the mandate took effect. Nobody had been appointed, so that was a false statement and it is gone. /privacy/ §1 and §17, /cookies/ §1 and §10 and /terms/ B18.5 now say TalentSync is **assessing** whether an Art 27 representative is required, will publish the details here once one is appointed, and that in the meantime data subjects can contact the company directly at victor@talentsync.eu and complain to their own supervisory authority. They deliberately do **not** say one is not required — nobody has determined that. The clock on this runs whether or not the site says anything. | **V+EU** |
| **2** | **GA4 measurement ID — the `G-XXXXXXXXXX` string.** 15 minutes in the GA4 admin. | **Analytics ships OFF until it arrives**, and that is a deliberate, truthful decision, not a gap: no GA4 script, no gtag, no cookies of our own, and therefore no consent banner (nothing is stored, so nothing needs consenting to). Documenting analytics that does not run would describe processing the company does not perform. **The one edit that re-enables it:** put the real ID in `GA_MEASUREMENT_ID` in `src/lib/analytics.ts`, then uncomment the `<Analytics />` mount and its import in `src/app/layout.tsx` — the comment there spells it out. `Analytics.tsx` and `ConsentBanner.tsx` are untouched and working. **In the same release, not later:** /privacy/ §4 and /cookies/ both state in the present tense that no analytics runs and no cookies are set. | **V** (15 min) |
| **3** | **Engineer engagement status under the hourly model** — contractor of UNQENERGY, contracted direct by the client, or employee? | Still unanswered, so **no page asserts it**: both places that depended on it were rewritten to describe only what is true whichever the answer is. It has to be answered before the first Part C client, because two live documents hang off it. **/terms/ Part C's IP chain** only holds if the engineer's own contract assigns the IP to the entity that warrants it at C12.1. **/privacy/ §6's independent-controller analysis** turns on whether TalentSync is the engineer's employer-controller and whether the timesheet and billing flow is joint controllership. | **V** |
| **4** | **Confirm `S.R.L. "UNQENERGY"` is the entity that signs client contracts and issues invoices.** | The registry proves a company with that name and IDNO exists (§1.1). It does **not** prove it is the contracting party, and no agent may assume it. If a different entity actually contracts, every legal page names the wrong party. If UNQENERGY is right this costs one word — and the proposal / invoice / contract mismatch stops being a supplier-onboarding hold. | **V** |
| **5** | **Orange and Barça — may the site name them and show their marks?** One email, three parts: **(a)** was Orange a direct client or was NEVG the counterparty; **(b)** is there **written** permission to use the Orange and FC Barcelona / Barça Mobile **names and logos**; **(c)** is there a written source for *"1.5M downloads in first 3 months"*? Same email: **the Moldova ICT headcount figure** — Moldova IT Park's published number with its year, or the sentence goes. | Permission to have *worked with* someone is not permission to *use their mark*, and clause A5.2 warrants that this consent is held. Both are aggressively enforced marks and FC Barcelona licenses its brand commercially. Without (a) the Orange case study cannot ship at all; without (b) both ship **text-only**, which is what the pages are built to today; without (c) the figure stays cut (D7). An unsourced headcount is exactly the claim A4.3 promises to substantiate on request. | **V** |
| **6** | **Schedule 3 — the Data Processing Agreement — does not exist.** Write it, or amend the two clauses that point at it. | **C14.2 incorporates Schedule 3 by reference** and **C1.3 gates Engineer access to client systems on it being in place.** Nothing was ever drafted, so as written the first hourly assignment cannot lawfully start under its own contract. A drafting defect with a deadline, not a business fact: fix by writing Schedule 3 (Module 1 + Module 2 SCCs and a transfer impact assessment summary) **or** by amending C1.3 and C14.2 in one pass. The Assignment Schedule, the Onsite Addendum and the C13.5 security schedule are missing for the same reason — §3.2. | **DEV + legal** |
| **7** | **Placement fee percentage and minimum fee.** | The two numbers a client actually negotiates, and they set the Fee Confirmation template. /terms/ B8.1 carries the drafted band; it cannot be a real offer until Victor picks the figures. Needed before the first client contract, not before launch. | **V** |

**Also still unanswered, not blocking any page from publishing:** confirm **no AI screening** (D3
publishes "we do not use automated decision-making or AI screening" in /privacy/ and /terms/ — a
sentence that must be true, including no ad-hoc ChatGPT ranking); the **median working days from
brief to first shortlist**, behind the "1–2 weeks" claim; **Innovatec — one engineer or two**, and
**Qualiwise's founder's sign-off** on the corrected time-to-signature (§4); and whether **Victor
Uncuta is also the registered administrator** on the state registration extract, since /imprint/
names him as the responsible person.

### Resolved on 30 August 2026 — written into the pages, tokens deleted, do not re-ask

| Was asked | What the pages now say |
|---|---|
| **Registered address** | `MD-2005, Chișinău Rîșcani, mun. Chișinău, Colina Pușkin 18, ap. (of.) 1` — the same string character for character in /terms/, /privacy/, /cookies/, /imprint/, /about/, the footer NAP and the `Organization` JSON-LD (D5) |
| **VAT status** | **No VAT registration.** Where the fact is load-bearing — /terms/ Part A and Part B, /imprint/ — the pages read *"not registered for VAT in the Republic of Moldova"*, because an EU B2B buyer reads it to decide whether reverse charge applies. Where it was only an empty registry row, the row is **deleted**, not left blank |
| **Founder** | **Victor Uncuta**, **CEO**, `https://www.linkedin.com/in/victoruncuta/` — /about/, /imprint/, the `Person` node and all four `Article` bylines. Both spellings of the token resolve to the one answer |
| **Founded** | **2020** — founded 8 October 2020; `foundingDate` is `2020-10-08` |
| **Privacy contact** | **Victor Uncuta**, `victor@talentsync.eu` — titled *privacy contact*, never "DPO" |
| **Email provider** | **Google Workspace** |
| **Candidate records** | **Email and Google Drive**, stored in **the European Union** |
| **Payments** | **Bank transfer.** No card payment processor, so that row is gone from /privacy/ §8 |
| **Hosting region** | **Railway, Amsterdam — the European Union.** No Chapter V transfer for the container or its access logs |
| **Recruitment licence** | **None required in the Republic of Moldova.** Closes `{{PLACEMENT_LICENCE_STATUS}}` and the §3.1 opinion that gated it |
| **Insurance** | **No policy is currently held.** Clause C17 no longer warrants a limit — it says a client may request evidence of cover before an assignment starts and that cover will be put in place if required. **Buy the cover before the first Part C client**, or C17 is renegotiated under time pressure |
| **Registered name / form / IDNO** | `S.R.L. "UNQENERGY"`, SRL, `1020600034949` — always in the shape `trading as "TalentSync"` (§1.1) |
| **Homepage `<title>`** | Victor's 66-character version stands; `scripts/validate-pages.mjs` allows 70 on `/` and 15–60 everywhere else. The truncation trade-off is unchanged and still his to revisit — one line in `src/app/page.tsx` |
---

## 3. Before the first client contract

Deferred. Every item here either has a working default already in the table above, or does
not block a page from publishing. Grouped by the milestone that forces the answer.

### 3.1 Milestone: before signing the first Part B (permanent) client

- ~~**Moldovan legal opinion — is a private employment agency licence required?**~~
  **ANSWERED 30 Aug 2026: no recruitment licence is required in the Republic of Moldova.**
  `{{PLACEMENT_LICENCE_STATUS}}` is written into /terms/ A1 and /imprint/ and the token is
  gone. Nothing gates the Part B model. Worth one line of written confirmation from a
  Moldovan employment lawyer next time counsel is instructed, but it no longer blocks.
- **`{{MD_LIMITATION_PERIOD}}`** — confirm the Moldovan contract limitation period with the
  same counsel while you have them. Commonly 3 years.
- **`{{MD_ACCOUNTING_RETENTION}}`** — ask the accountant. A statutory obligation, not a choice.
- **Confirm the intake script no longer asks candidates their current pay** in any Member
  State that has transposed Directive (EU) 2023/970 — clause B8.6 tells clients this is
  exactly why they must supply the remuneration figure themselves.
- **Fee Confirmation template** — one page carrying fee percentage, minimum fee, validity
  period and payment days, so those four move out of standard-terms control.

### 3.2 Milestone: before signing the first Part C (hourly) client

- **Insurance — no policy is currently held (answered 30 Aug 2026), and clause C17 was
  reworded rather than left as a false present-tense warranty.** It now says a client may
  request evidence of cover before an assignment starts and that cover will be put in place
  if required, so it promises nothing that does not exist. **Buy PI, GL and cyber cover
  before the first Part C client** — most enterprise MSAs make it a condition of signature,
  and being asked for a certificate mid-negotiation is the expensive way to find out.
- **Does the engineer contract actually contain** the present IP assignment, rolling
  assignment, further-assurance covenant, moral-rights undertaking and fallback licence
  that C12.1 warrants? If not, C12.2 promises the client something TalentSync does not own.
  Fix the engineer contract first.
- **`{{AGENCY_NOTICE_DAYS}}`** — read the engineer's own notice period off their contract
  and set this to the same number. Any gap is margin lost on every departure.
- **Netherlands** — the Wtta admission registration window is 1 Nov to 31 Dec 2026, with a
  EUR 100,000 security deposit. Decide whether Part C is sold into NL; if yes, take Dutch
  advice inside that window.
- **Belgium** — confirm the C16.4 exclusion is commercially acceptable, or take Belgian
  advice. Art 31 of the Law of 24 July 1987 can make the supplier's invoices unenforceable.
- **Schedule 3 — the Data Processing Agreement — does not exist, and the contract
  self-blocks without it.** *Promoted to §2 row 14 — it is a drafting defect with a deadline,
  not a deferred nicety.* Clause **C14.2 incorporates Schedule 3 by reference**, so the
  terms already say it is part of the agreement. Clause **C1.3 then gates Engineer access to
  client systems on that schedule being in place.** Nothing was ever drafted. As written, the
  first hourly assignment cannot lawfully start under its own contract: the engineer may not
  be given a client login until a document that does not exist has been signed. This is a
  drafting defect, not a question for Victor — it is fixed by writing Schedule 3 (Module 1
  and Module 2 SCCs plus a transfer impact assessment summary) **or** by amending C1.3 and
  C14.2 in the same pass so they stop pointing at a missing annex. Doing neither means the
  first client either signs a self-contradicting contract or notices before signing. Ships
  with the **Assignment Schedule**, the **Onsite Addendum** and the **security schedule**
  referenced at C13.5, which are missing for the same reason.
- **Has any client already signed a processor DPA or Module 2 SCCs?** If so it contradicts
  the independent-controller position throughout /privacy/ §6 and needs renegotiating to
  Module 1.

### 3.3 Milestone: in the launch release (developer-owned, no decision needed)

- ~~**Self-host Montserrat**~~ **DONE** — `src/app/layout.tsx` loads it through `next/font`
  and the `fonts.googleapis.com` `@import` is gone, so no EU visitor's IP reaches Google
  (LG München I, 20.01.2022, 3 O 17493/20). `{{FONTS_SELF_HOSTED_DATE}}` is the deploy date.
  With analytics off as well, /privacy/ §4.3's "no third-party calls" is now literally true.
- **`{{LOG_RETENTION_DAYS}}`** — read the real Railway log retention, or set
  `access_log off;` in nginx.conf and delete the policy row. The number in the policy has
  to be the number in the config.
- ~~**`{{RAILWAY_REGION}}`**~~ **ANSWERED: Railway, Amsterdam — the European Union.** No
  Chapter V transfer for the container or its logs. Still sign the Railway DPA: the access
  logs hold EU visitors' IPs and Art 28 needs the contract regardless of region.
- **`{{CALENDLY_DPF_VERIFIED}}`** — 10 minutes on dataprivacyframework.gov on publishing day.
  Also confirm Calendly stays an outbound link and is never embedded: embedding imports
  third-party cookies and is the second-biggest banner lever after GA4.
- **`{{PUBLICATION_DATE}}`, `{{EFFECTIVE_DATE}}`, `{{ANALYTICS_LIVE_DATE}}`** — all three are
  the deploy date. Set them in the deploy commit.
- **Create the `legal@` and `privacy@` aliases** before publishing, or the two policies name
  addresses that bounce.
- **Candidate-retention mechanism** — a 22-month check-in and a hard delete at 24, not a
  "review annually" note. A regulator reads "review annually" as "indefinite", and candidate
  retention is a named 2026 enforcement priority. Then run a **remediation deletion pass**
  over everything held since inception: publishing a 24-month claim while holding five-year-old
  CVs is a documented discrepancy worse than the original over-retention.

### 3.4 Milestone: before the case-study pages go live

- **Written reference and logo consent from each named client** — Barça Mobile, Orange,
  Entail AI, New Era Visionary Group, Pixelette Technologies, Qualiwise, SocialBee,
  Silvertalent, Foodamigos, Innovatec. Clause A5.2 warrants that this consent is held.
  Where it is not, de-identify before publishing.
  **Send this as one batched ask, not six.** The completeness critic found the same ten
  contacts being asked separately for: logo/name consent, testimonial name + title + photo,
  case-study copy, the Barça figure, a savings baseline, and a Clutch review call. Six asks
  with six reply-rate decays, blocking four workstreams. One email each, six questions.
- **Two numbers in the same batch, because the build now blocks on them (§4):** ask
  **Innovatec** whether the placement was one engineer or two, and ask **Qualiwise's founder**
  to sign off the corrected time-to-signature in his testimonial — it currently says two days
  against a case study that says one week.
- **Substantiation files for the surviving marketing claims.** Clause A4.3 promises to make
  the basis available on request. D7 has already cut "€15–35/hour", "save up to 60%" and the
  Barça download figure; what remains still needs a file.

### 3.5 Milestone: post-launch, nice to have

- **UK representative** (`{{UK_REPRESENTATIVE_BLOCK}}`) — the "not appointed" paragraph is
  live and defensible. Revisit the moment a UK client asks for a UK engineer, or the site
  starts tracking UK visitors.
- **`{{GA4_DATA_RETENTION}}`** — 2 months is set. Move to 14 only if year-on-year comparison
  is genuinely needed.
- **Bing Webmaster Tools and IndexNow.** Not a legal blocker; noted here because it is the
  highest-leverage unowned item the critique found. ChatGPT's web results lean on Bing's
  index, and IndexNow is one static `.txt` key file that works with `output: 'export'`.

---

## 4. Deployment blockers not covered by a token

Owned by the developer, recorded here so they are not lost.

### 4.0 Gate status — what is actually red, and who owns each red

`node scripts/validate-pages.mjs` → **exit 1.** Re-verified after wave D, and the failures
sort into exactly two piles.

**Pile 1 — 32 unresolved `{{TOKEN}}`s. Victor's, not a developer's.**

- **25 distinct tokens** still render into `out/`, on 10 pages — /privacy/, /terms/,
  /about/, /candidate-privacy/, /imprint/, /cookies/ and the four article bylines.
- **7 of the 32** are the louder JSON-LD variant: `{{FOUNDER_FULL_NAME}}` inside
  `Article.author.name` on all four `/insights/` posts, and `{{FOUNDER_LINKEDIN_URL}}`
  plus `{{FOUNDER_FULL_NAME}}` on /about/. A placeholder there is ingested by a crawler
  **as the author's name**, which is why it fails separately from the same token in prose.
- **Zero** of the 32 come from markup, metadata, schema, routing, links or the sitemap.
  Those checks all pass, verified by re-running the gate against a copy of `out/` with the
  wave-D schema fix patched in: 32 failures, all of them tokens, nothing else.

`{{LEGAL_ENTITY_NAME}}`, `{{LEGAL_FORM}}` and `{{IDNO}}` are **gone from the failure list**
— the registry answered them (§1.1). The remaining 25 are the §2 ask plus the deferred
milestones in §3. Answer §2 and re-run `npm run verify`; this pile clears with no code
change. That is D8 working as designed: the gate exits non-zero while any placeholder
survives into `out/`, and `npm run build` still passes throughout so local review is never
blocked.

**Pile 2 — two new assertions added in wave D, both currently reporting real defects.**
Neither is a token, and both go green when the copy they name is corrected. They exist
because both defects had already been reported once, left open, and reported again:

1. **`Organization` must name the registered entity.** The node emitted on all 33 pages
   carried only `name: "TalentSync"` — while /imprint/ states in the built HTML that
   *there is no company registered under the name TalentSync*. The one identity a
   procurement reviewer's crawler reads asserted the opposite of the page it sat on.
   Fixed in `src/lib/schema.ts` (`legalName: 'S.R.L. “UNQENERGY”'` plus an `identifier`
   PropertyValue carrying the IDNO), and now guarded: both strings are checked against
   **/imprint/'s own rendered text**, so prose and schema can only move together. Passes
   against the fixed tree; will still show red until the next build.
2. **No page may claim its headcount is the *complete* record.** Fires twice, both on
   /hire-software-developers-eastern-europe/: *"Five clients, eight engineers, and that is
   the entire record"* and *"5 client teams, which is the whole record"*. The arithmetic
   is right — those five rows do sum to eight — which is why the existing headline-vs-ledger
   check passes them. The falsehood is the adjective: /case-studies/ lists ten engagements,
   two of them non-placements, so **eight** placement clients, and a buyer who checks finds
   a ninth engineer at a sixth client two clicks away. The other ten service pages scope
   the same number correctly as "our five most recent placements". **Owner: whoever owns
   `src/data/services/pages/`** — scope the denominator, keep the transparency sentence.
   The guard is sentence-scoped and HTML-only; it flags no other page in the build.

- **Fonts overrun the §6 budget by 2.3× and it cannot be fixed in code.** 103,732 B on
  every route against `00-design-contract.md` §6's ≤ 45 KB. `subsets: ['latin']` is
  declared and is doing its job — it is only ever a *preload* filter in `next/font`
  (`findFontFilesInCss(css, preload ? subsets : undefined)`), never a prune of the
  `@font-face` set, so the Google CSS is inlined whole and all five faces are self-hosted.
  Two are actually requested: latin 35,508 B (preloaded) and **latin-ext 68,224 B**, pulled
  in by exactly **three codepoints** that appear on all 33 pages — `ă` U+0103, `ș` U+0219,
  `ț` U+021B, i.e. *Chișinău* in the footer NAP and *răspundere limitată* in the legal copy.
  Cyrillic, cyrillic-ext and vietnamese are emitted but never fetched.
  The three ways out are all closed: dropping the diacritics is banned by **D5** (one
  spelling everywhere), letting them fall to the fallback face swaps typeface mid-word in
  the NAP, and `next/font/google` in Next 16.1.3 has **no `text` option**, so a three-glyph
  subset needs a hand-built woff2 vendored into the repo. **Decision: accept the 68 KB and
  amend the §6 budget line to ≤ 105 KB** (`00-design-contract.md` §6 is frozen spec, so the
  amendment is recorded here rather than edited in). It is not as bad as the number looks:
  latin-ext is deliberately kept **out** of the preload list, so it is discovered during
  layout, serves only below-the-fold text, and never gates the LCP element — which carries
  no diacritics. Do not "fix" this by adding `'latin-ext'` to `subsets`; that preloads
  68 KB into LCP's bandwidth on every route. Reopen only if a hand-subset face is ever
  vendored. Full working recorded in the comment at `src/app/layout.tsx`.

- **Link prefetch was blowing the ≤ 320 KB page-weight budget by 5×, now half-fixed.**
  Next prefetches the full RSC payload of every `<Link>` that enters the viewport, and
  under `output: 'export'` those are static `__next.*.__PAGE__.txt` files — `out/` ships
  **194** of them totalling **4,869,827 B** — 35% of the 14 MB export, and `/terms/` alone is 238,857 B. A single scroll
  down the homepage took it from 29 resources / 327,233 B to 114 / 1,630,719 B.
  Every `<Link>` in `src/app/**` (30 of them, 9 route files) now carries
  `prefetch={false}`, which in Next 16 disables viewport **and** hover prefetch; the
  payload is fetched on click and static navigation is unaffected. `/about/` alone stops
  pulling 593,352 B on scroll. The shared chrome — `Navbar`, `Footer`, `Button`,
  `ArticleCard`, `ServicePageTemplate` — is the larger half of the same total and is fixed
  in `src/components/**`. **Re-measure `/` at 390px after a full-page scroll before
  calling this closed.**

- **Design-contract gate row 15 is not implemented in any guard.** The matrix at
  `00-design-contract.md` §8.1 has 15 rows; `scripts/check-design-contract.mjs` asserts 12
  and prints `PASS — all 12 assertions clean`. Rows 13–15 — orphan tokens, the per-route
  JS budget, and **row 15, `find public/images -size +60k` must be empty** — are unguarded,
  so a green run does not mean row 15 holds. It currently does not:
  `case-foodamigos.png` (126,030 B) and `testimonial-adrian-barca.jpeg` (106,004 B) both
  exceed 60 KB, and the `-384/-768.webp` derivatives that should replace them already
  exist unused. Fixing the references is a `src/data/**` change (`case-studies.ts:447`,
  `content.ts:232`) — note that `src/app/case-studies/page.tsx` builds `srcSet` from
  `logo.src` alone, so repointing the data fixes the render with no component change.
  Add the three missing rows to the guard once the images land, or the row goes on
  being decorative.

- **`scripts/check-legal-fidelity.mjs` check 5 now fails on the correct copy, and the guard
  is what is wrong.** Its `BANNED` list was written to enforce D2 (GA4 behind a banner) by
  rejecting every trace of the drafts' old no-cookie position: `/no cookies of our own/`,
  `/no cookies, no analytics/`, `/(?:displays?|shows?) no (?:cookie )?banner/`. Analytics now
  ships **off**, so those exact sentences are the true ones and /privacy/ and /cookies/ have to
  say them. **Owner: whoever owns `scripts/`** — gate those four patterns on the GA4 ID being
  present, so they come back automatically the day analytics is re-enabled rather than being
  deleted and forgotten. `npm run verify` (`validate-pages.mjs`) is unaffected.

- **`{{GA4_MEASUREMENT_ID}}` still renders into /cookies/** from `src/data/legal/cookies.ts`
  (the `_ga_…` and `_gat_gtag_…` rows in the cookie table). Those rows describe cookies that
  are now never set; they are deleted with the rest of the analytics copy, not filled in.
  **Owner: whoever owns `src/data/legal/`.** Until then `npm run verify` exits non-zero.

- **The footer's "Cookie settings" link is dead while the banner is unmounted.**
  `src/components/layout/Footer.tsx:86` renders `<a href="#cookie-settings">`, which
  `ConsentBanner`'s delegated listener used to intercept. With no banner there is no
  `#cookie-settings` target and the link does nothing. **Owner: whoever owns
  `src/components/layout/`** — remove the link while analytics is off; restore it in the same
  edit that re-enables `<Analytics />` in `src/app/layout.tsx`.

- **No Content-Security-Policy is shipped.** `nginx.conf` carries `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. A CSP is
  deliberately out of scope: it needs auditing against `next/font`, the GA4 and Consent
  Mode v2 script origins, and the inline JSON-LD blocks, and a wrong one produces a blank
  page with no error. Ship it **report-only for one week** first, after fonts are
  self-hosted and GA4 is live — at that point the allowlist is knowable.
- **No `Strict-Transport-Security`.** Recommended by 08-critique-completeness.md. Left out
  because HSTS is a one-way door: a wrong `max-age` is not revocable from the server side.
  Add it once the custom domain is stable, starting at `max-age=300` and ramping.
- **`X-XSS-Protection` was removed**, per 01-architecture.md §8 — deprecated, and a known
  XSS *vector* in older browsers.
- **http→https and www→apex redirects are not in `nginx.conf`.** 01-architecture.md §8
  proposes two `if` blocks keyed on `$http_x_forwarded_proto` and `$host`, and flags them as
  never exercised against a live nginx. Getting either wrong is an infinite redirect loop on
  the production domain. **Verify first** whether Railway's edge already handles both; if it
  does not, add them and re-run `npm run smoke`.
- **`src/app/not-found.tsx` now exists**, so `out/404.html` is a branded page rather than
  Next's stock white one. Next injects `noindex` on it automatically. The Dockerfile also
  clears `/usr/share/nginx/html` before copying, so nginx's stock `index.html` and
  `50x.html` can no longer be reached at a real URL (`/50x.html` → 404, verified).
- **`npm run smoke` PASSES end-to-end, 12/12, against a real image.** Wave C could not get
  past `next build` inside the container; that is fixed and the whole path now runs. The
  Docker daemon was available on this machine and the run is real output, not a skip — the
  script still exits 0 with `SKIP:` when there is no daemon, so it never blocks a laptop
  build and never silently passes in CI either:

  ```
  container talentsync-smoke listening on http://127.0.0.1:32769
  ok   /privacy -> 301 Location: /privacy/
  ok   /privacy/ -> 200
  ok   /b2b-engineer-recruitment -> 301 Location: /b2b-engineer-recruitment/
  ok   /b2b-engineer-recruitment/ -> 200
  ok   /case-studies -> 301 Location: /case-studies/
  ok   /case-studies/ -> 200
  ok   /case-studies/barca-mobile -> 301 Location: /case-studies/barca-mobile/
  ok   /case-studies/barca-mobile/ -> 200
  ok   /nonexistent -> 404
  ok   /nonexistent body == /404.html
  ok   /sitemap.xml -> 200
  ok   /robots.txt -> 200
  SMOKE PASS — 12/12
  ```

  Every `Location` is **relative** — no scheme, no host, no `:3000` — which is the whole
  point of the `absolute_redirect off; port_in_redirect off;` pair in `nginx.conf` behind
  Railway's TLS termination. Do not remove it. `/case-studies` is new to the set: a hub that
  is both a page and a parent directory, where `try_files` has to fall past `$uri` (a
  directory) and `$uri.html` (absent) to `$uri/`. The image is **76.1 MB**, of which 14.0 MB
  is the static tree.

- **The smoke script no longer uses a fixed port, and that was a real bug, not tidying.**
  The first wave-D run reported **9 of 10 assertions failed** against an image that was
  perfect: an unrelated `node` process on this machine already held `4399`, so every request
  was graded against a stranger's server. The readiness loop made it worse by accepting *any*
  HTTP response as "the container is up". `scripts/smoke-nginx.sh` now publishes an ephemeral
  port (`-p 127.0.0.1:0:3000`), reads the real one back with `docker port`, and waits for a
  genuine `200` on `/`. `PORT=` still pins it if you want a stable URL. A test that can grade
  a server it did not start is not a test.

- **`docs/` is confirmed absent from the image.** Verified by building the builder stage and
  listing `/app`: no `docs`, no `TalentSync.pdf`. 1.1 MB of specification and a 1.4 MB brief
  stay out of the build context, and the production stage only copies `/app/out/` regardless.
  `.serena/` was reaching the context and is now excluded too.

- **`npm run verify` fails by design, and now fails on more.** It is the D8 deploy gate: it
  exits non-zero while any `{{TOKEN}}` survives into `out/`, and `npm run build` still passes
  so local review works throughout. Wave D added four checks for defects that had already
  shipped, so they cannot come back:
  1. **Every token must have a row in this file.** Printed as a full ledger — token, then
     every route it renders on — and a token in the build with no row here is a failure in
     its own right.
  2. **A token inside JSON-LD is its own, louder failure.** `"author":{"name":"{{VICTOR_FULL_NAME}}"}`
     is ingested by Google *as the author's name*; a brace string in prose is merely visible.
  3. **Exactly one `<title>` and at most one `robots` meta per page — the 404 included.**
     The 404 shipped two of each and presented itself as a second copy of the homepage.
  4. **`FAQPage` on `/` and nowhere else** (D6). `/insights/` had a second one.

- **Two published numbers contradict themselves, and `npm run verify` now blocks on both.**
  Both need Victor, not a developer, because both are facts about real placements:
  - **Innovatec: one engineer or two?** The site says **2** on
    /tech-recruitment-eastern-europe/ and /hourly-engineering-talent/, and **1** on
    /technical-recruitment-moldova/ and in the /case-studies/ ledger. The headline "nine
    engineers across five clients" renders on five pages and only balances at 2; at 1 the
    itemised record sums to eight. The guard now asserts both — one number per client, and
    the headline total equal to the sum of the ledger — so answering it once propagates
    everywhere or the build fails.
  - **Qualiwise: one week or two days?** The testimonial says "They found us a senior Python
    developer in two days" while the case study's own H1 is "A Senior Python Developer Signed
    in One Week". It never appeared in a page grep because the carousel server-renders only
    the active slide — it ships in a JS chunk and appears the moment a visitor clicks next.
    It is a **client's quote**, so it cannot be silently reworded: get the author's sign-off
    on the corrected figure, or pull the testimonial until you have it.
