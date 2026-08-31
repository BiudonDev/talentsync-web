# BLOCKERS — the 96 placeholders, triaged

Every `{{TOKEN}}` in the legal drafts, in one table, with the draft's own recommended
default already filled in. **You are not being asked 96 questions.** You are being asked
**thirteen**. The rest have a defensible default that ships today and can be changed
later in a one-line edit.

> **Updated after waves B and C.** Wave B landed the legal pages, wave C landed the
> analytics, the founder block and the service copy. Three things changed: a handful of
> new tokens now exist in `src/` that were not in the original 96 (§1.9), one token that
> was a *nice to have* is now a **hard deploy blocker** (§2 row 4), and the
> `npm run smoke` path has been run against a real image for the first time (§4).

**How to use this file**

1. Answer the thirteen in [§2](#2-answer-these-13-to-unblock-80-of-the-work). That is the
   whole ask for launch.
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

### 1.1 Entity identity — shared by /terms/, /privacy/, /cookies/ and /imprint/

These seven are why the thirteen-question list exists. One registry extract answers the
first four, and they unblock five pages at once.

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{LEGAL_ENTITY_NAME}}` | The company's exact registered name, as printed on the state registration extract. A trading name is not enough. | — (no default possible) | /terms/, /privacy/, /cookies/, /imprint/, `Organization` JSON-LD | **V** |
| `{{LEGAL_FORM}}` | The legal form of the company. | `societate cu răspundere limitată (SRL)` | /terms/ A1, /imprint/ | **V** |
| `{{IDNO}}` | The 13-digit Moldovan company registration number, from the same extract. | — (no default possible) | /terms/, /privacy/, /cookies/, /imprint/ | **V** |
| `{{REGISTERED_ADDRESS}}` | The registered street address in Chișinău exactly as the registry has it — not the working office, if they differ. | — (no default possible) | /terms/, /privacy/, /cookies/, /imprint/ | **V** |
| `{{VAT_STATUS}}` | Whether the company is VAT-registered in Moldova, and the code if it is. | `not VAT-registered` — or the code, if there is one | /terms/ A1, /imprint/ | **V** |
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
| `{{EU_REP_MANDATE_DATE}}` | The date the Art 27 mandate was signed. New in wave B (`src/data/legal/privacy.ts`) — the policy states when the appointment took effect. | The date the mandate is signed; falls out of the §2 row 3 answer | /privacy/ §17 | **V** |
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
not just the legal ones. The first four are one answer, already asked as §2 rows 8 and 9.

| Token | What it is | Recommended default | Blocks | Owner |
|---|---|---|---|---|
| `{{FOUNDER_FULL_NAME}}` | Victor's full legal name. | — (no default possible) | `src/data/about.ts`, `src/data/legal/imprint.ts`, the `Person` node, every `Article` author | **V** |
| `{{FOUNDER_TITLE}}` | His job title, in the words he actually uses. | `Founder` if nothing better — but pick one and use it in both files | `src/data/about.ts`, `src/data/legal/imprint.ts` | **V** |
| `{{FOUNDER_LINKEDIN_URL}}` | His personal LinkedIn profile URL — the company page is already in `siteConfig` and is not a substitute. | — the `sameAs` edge that makes the `Person` node resolvable | `src/data/about.ts` | **V** (2 min) |
| `{{FOUNDED_YEAR}}` | Year the company started trading. | — same registry extract as §1.1 | `src/data/about.ts`, `foundingDate` in `Organization` JSON-LD | **V** |
| `{{MOLDOVA_ICT_HEADCOUNT}}` | Number of ICT professionals in Moldova, with the source and the year. | Cite Moldova IT Park's own published figure with its year, or delete the sentence. An unsourced number is exactly the kind of claim clause A4.3 promises to substantiate on request | /technical-recruitment-moldova/ | **V** |
| `{{MOLDOVA_SENIOR_RATE_BAND}}` | The senior rate band quoted on the Moldova page. | — **read D7 first.** "EUR 15–35/hour" is CUT and must not come back here under a new token. Either a sourced market-wide band with the source named, or delete the sentence | /technical-recruitment-moldova/ | **V** |

---

## 2. Answer these 13 to unblock ~80% of the work

Thirteen answers. Most are a lookup, not a decision. Nothing else on this page needs your
attention before launch.

| # | Question | Why it is blocking | What happens with no answer |
|---|---|---|---|
| **1** | **Registered name and legal form** — exactly as on the state registration extract. | Art 13/14 GDPR controller identification, Moldovan Law 284/2004 on e-commerce, and every EU procurement checklist. | /terms/, /privacy/, /cookies/, /imprint/ cannot publish. The `Organization` JSON-LD — the entity signal the whole SEO plan rests on — ships with a trading name only. |
| **2** | **IDNO and registered address** — same extract, one photo of one document. | Same as above. The address must also match the footer NAP and the JSON-LD exactly (D5). | Four pages blocked. Schema that contradicts visible content gets ignored. |
| **3** | **EU Art 27 representative — yes/no, plus budget approval.** Romania recommended. | Not optional for a recruiter; the "occasional processing" exemption does not apply. Typically low four figures a year. | /privacy/ and /cookies/ ship with the omission documented in writing, which is worse than not publishing. |
| **4** | **Analytics = GA4 — confirm, and create the property.** Needed: the `G-XXXXXXXXXX` ID. | D2 already froze this. The consent banner, Consent Mode v2 defaults, /cookies/ tables and the privacy policy's §4/§13 all hang off it. | **Escalated in wave C — this now blocks the deploy, not just the copy.** The analytics code has landed, so `{{GA4_MEASUREMENT_ID}}` is a live token in `src/lib/analytics.ts` as well as /cookies/ §5. `npm run verify` exits non-zero while it survives into `out/` (D8), so **nothing ships until the property exists**. 15 minutes in the GA4 admin. |
| **5** | **AI screening = no — confirm.** Includes no ad-hoc use of ChatGPT to rank, score or filter candidates. | D3 assumes no. If any AI ranking is used the surrounding text must be rewritten, a human reviewer with real override authority named, overrides logged, and a DPIA completed first. | Publishing "we do not" while doing it is the single cheapest way to lose an enforcement argument. |
| **6** | **Engineer engagement status under the hourly model** — employee, contractor, or contracted direct by the client? | Decides whether TalentSync is their employer-controller, whether timesheet and billing flow is joint controllership, and whether Part C's IP chain actually holds. | /privacy/ §6 and /terms/ Part C both make claims that must match the contracts in force. |
| **7** | **Median working days from brief to first shortlist.** | The site says "1–2 weeks". D7 requires it qualified, never bare, and 06-claims-measurement.md needs a real number behind it. | The process claim on four pages has no substantiation file. |
| **8** | **Founded year.** | `foundingDate` in the `Organization` JSON-LD and the /about/ copy. | /about/ ships without a company history and the entity node is thinner than it needs to be. |
| **9** | **Victor's full name, job title, LinkedIn URL, and a photo.** | Every `Article` needs a real named author; the E-E-A-T the plan is buying is attribution, and a bare first name provides none. | Wave C wrote the founder block against four tokens — `{{FOUNDER_FULL_NAME}}`, `{{FOUNDER_TITLE}}`, `{{FOUNDER_LINKEDIN_URL}}`, `{{FOUNDED_YEAR}}` (§1.9) — in `src/data/about.ts` and `src/data/legal/imprint.ts`. They are D8 deploy-gate tokens now, so /about/, /imprint/, the `Person` node and four insights bylines all block on this one answer. |
| **10** | **Barça Mobile "1.5M downloads in first 3 months" — written source, or cut.** | D7 has already cut it for want of a public linkable source. One email from the client reinstates it. | Stays cut. The Barça case study loses its only quantified outcome. Ask it in the same email as row 11 and §3.4 — one email per client, not three. |
| **11** | **Orange and Barça — may the site name them and show their marks?** Two parts: (a) was Orange a direct client or was NEVG the counterparty, and (b) is there written permission to display the Orange and FC Barcelona / Barça Mobile **names and logos** in a case study? | (a) decides whether the site may name Orange at all. (b) is separate and stricter: both are aggressively enforced marks, FC Barcelona licenses its brand commercially, and most enterprise MSAs carry a no-publicity clause. Permission to *have worked* with someone is not permission to *use their mark*. Clause A5.2 warrants that this consent is held. | Without (a) the Orange case study cannot ship at all. Without (b) both case studies ship **text-only** — named in prose, no logo, no wordmark styling, no favicon-scraped tile — which is the safe default and is what the pages must be built to today. A takedown after launch costs more than the email. |
| **12** | **Placement fee percentage and minimum fee.** | The two numbers a client negotiates. They also set the Fee Confirmation template. | /terms/ Part B cannot publish, and there is no proposal template. |
| **13** | **Homepage `<title>` — keep the 66-character version, or trim it?** You specified `IT Recruitment & Engineering Talent in Eastern Europe \| TalentSync` (66 chars). The guard ceiling is 60. | Google renders ~60 chars, so it truncates to `…in Eastern Europe \| Tale…` — **the brand is the half that gets cut**, on the one page whose whole job is the brand. `scripts/validate-pages.mjs` fails the build at >60 (`15-60` chars), so this is not a soft warning. | **Recommended: trim.** `IT Recruitment & Engineers, Eastern Europe \| TalentSync` (55) keeps every element and the brand survives. Say the word and it is a one-line edit in `src/app/page.tsx`. If you want the 66-char version regardless, that is a legitimate call — but then the 60-char ceiling in the guard has to be raised deliberately, in the same commit, with this decision cited, rather than the guard being edited around by whoever hits it next. |

---

## 3. Before the first client contract

Deferred. Every item here either has a working default already in the table above, or does
not block a page from publishing. Grouped by the milestone that forces the answer.

### 3.1 Milestone: before signing the first Part B (permanent) client

- **Moldovan legal opinion — is a private employment agency licence required** under Law
  105/2018 / Law 180/2008 to introduce Moldovan engineers to foreign employers? Needs a
  Moldovan employment lawyer, not a web search. Gates `{{PLACEMENT_LICENCE_STATUS}}` and
  possibly the whole Part B model. *Highest-priority item on this page after the twelve.*
- **`{{MD_LIMITATION_PERIOD}}`** — confirm the Moldovan contract limitation period with the
  same counsel while you have them. Commonly 3 years.
- **`{{MD_ACCOUNTING_RETENTION}}`** — ask the accountant. A statutory obligation, not a choice.
- **Confirm the intake script no longer asks candidates their current pay** in any Member
  State that has transposed Directive (EU) 2023/970 — clause B8.6 tells clients this is
  exactly why they must supply the remuneration figure themselves.
- **Fee Confirmation template** — one page carrying fee percentage, minimum fee, validity
  period and payment days, so those four move out of standard-terms control.

### 3.2 Milestone: before signing the first Part C (hourly) client

- **Insurance in force?** `{{PI_INSURANCE_LIMIT}}`, `{{GL_INSURANCE_LIMIT}}`,
  `{{CYBER_INSURANCE_LIMIT}}` are drafted as a **present-tense warranty**. Either buy the
  cover or reword clause C17 before it publishes.
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
  self-blocks without it.** Clause **C14.2 incorporates Schedule 3 by reference**, so the
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

- **Self-host Montserrat** — replace the `fonts.googleapis.com` `@import` in `globals.css`
  with `next/font`. Until then every EU visitor's IP reaches Google without consent
  (LG München I, 20.01.2022, 3 O 17493/20), and /privacy/ §4.3 cannot say the site makes
  no third-party calls. Sets `{{FONTS_SELF_HOSTED_DATE}}`.
- **`{{LOG_RETENTION_DAYS}}`** — read the real Railway log retention, or set
  `access_log off;` in nginx.conf and delete the policy row. The number in the policy has
  to be the number in the config.
- **`{{RAILWAY_REGION}}`** — read it off the dashboard; sign the Railway DPA either way.
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
- **`npm run verify` currently fails, by design.** It is the D8 deploy gate: it exits
  non-zero while any `{{TOKEN}}` survives into `out/`. `npm run build` still passes, so
  local review works throughout. Nothing deploys until this file is answered.
- **`npm run smoke` needs Docker** and skips cleanly with exit 0 when the daemon is not
  running — so it never blocks a laptop build, and never silently passes in CI either.
- **The nginx layer is now verified against a real `nginx:alpine`, not just reasoned about.**
  Wave C ran it. `/privacy` → **301** with a **relative** `Location: /privacy/` — no scheme,
  no host, no `:3000`. A nested path behaves the same: `/case-studies/barca-mobile` → 301 →
  `/case-studies/barca-mobile/`, path intact. `/nonexistent` → **404** serving the branded
  `404.html` body, not the homepage. `/sitemap.xml` and `/robots.txt` → 200. The
  `absolute_redirect off; port_in_redirect off;` pair in `nginx.conf` is doing real work and
  must not be removed — without it every slashless inbound link would bounce a visitor to
  `http://host:3000/…` behind Railway's TLS termination.
- **`src/app/not-found.tsx` now exists**, so `out/404.html` is a branded page rather than
  Next's stock white one. Next injects `noindex` on it automatically. The Dockerfile also
  clears `/usr/share/nginx/html` before copying, so nginx's stock `index.html` and
  `50x.html` can no longer be reached at a real URL (`/50x.html` → 404, verified).
- **`npm run smoke` cannot complete end-to-end yet** — not an nginx problem. The image build
  fails at `next build` because `src/data/services/index.ts` still exports an empty
  `servicePages` registry while `src/data/services/pages/*.ts` holds eight written pages that
  nothing imports, so `/hire-ai-engineers` throws `Cannot read properties of undefined
  (reading 'draft')` during page-data collection. One wiring change in that registry file
  clears it. Re-run `npm run smoke` after it lands — that run is what proves the deploy.
