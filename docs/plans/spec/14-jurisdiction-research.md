n# TalentSync — Privacy Law Position Brief

**Jurisdictions:** Republic of Moldova · EU/EEA (GDPR) · United Kingdom (UK GDPR)
**Research date:** 30 August 2026. Every legal assertion carries a source URL. Unverified points and source conflicts are isolated in §11 — read that section before relying on anything.

---

## ⚑ PRACTICAL VERDICT — the 10 decisions the privacy policy must encode

1. **Two regimes apply at once; write one notice to the stricter one.** Moldova's **Law No. 195/2024** entered into force **23 August 2026** — seven days ago — and is a near-verbatim GDPR transposition. The EU GDPR *also* applies to you directly under Art 3(2). Draft to GDPR; Law 195 is then satisfied automatically. Do not write a "Moldovan" policy.
2. **Appoint an Art 27 EU representative. This is not arguable.** Put them in **Romania or Poland** (where your candidates are), and name them in the notice. The Art 27(2)(a) exemption fails at the first limb: sourcing CVs is your regular course of business, therefore not "occasional".
3. **Declare TalentSync an INDEPENDENT CONTROLLER for candidate data** — sourcing, screening, talent pool, forwarding. Never claim processor status for the talent pool. Add an Art 26 allocation clause to the client MSA as a fallback, because the ICO treats the shortlist-sharing moment as *joint* controllership.
4. **Lawful basis for sourcing = legitimate interests (Art 6(1)(f)), backed by a written LIA.** Consent is the wrong basis and will collapse. Consent is reserved for: special-category data, and talent-pool retention beyond your stated period in Germany.
5. **The Art 14 notice fires on your FIRST outreach message.** When you find an engineer on LinkedIn and email them, that first email must link the privacy notice. Not within a month — at first communication. This is the single most-breached rule in sourcing recruitment.
6. **Retention: 24 months from last meaningful contact** for the talent pool, hard-deleted or re-engaged at that point, disclosed up front. **6 months for German-facing rejections.** No indefinite pool. The CNIL made recruitment a **priority enforcement theme on 3 April 2026** and named recruitment firms as targets, with retention as one of three checkpoints.
7. **Ship no automated candidate score or ranking to clients.** Post-*SCHUFA*, if the client draws strongly on your automated output, **you** — not the client — are making the Art 22 decision. Keep a human in the loop who can and does overturn.
8. **Collect no criminal-record data, ever.** GDPR Art 10 permits it only under official-authority control or where Member State law authorises it. A private Moldovan recruiter has no such authorisation. Vetting is the client's job under its own national law.
9. **Self-host the fonts and keep the site cookie-free.** Today `globals.css` hotlinks Google Fonts, transmitting every EU visitor's IP to Google. Swap to `next/font/google` (build-time self-host, works with `output: 'export'`). With no fonts CDN, no analytics and Calendly as a *link* rather than an embed, **you need no cookie banner at all** — a genuine competitive advantage. Protect it.
10. **You do not need a DPO.** You fail all three Art 37(1) triggers. Appoint a named privacy contact (Victor) and publish the address instead. If you ever *do* designate a DPO, Moldovan Art 37(7) obliges you to notify the CNPDCP.

**Direction-of-travel note that changes the whole transfer analysis:** a candidate in Romania emailing you a CV is **not** a Chapter V transfer (no exporter). An EU client sending you data **is**, and the *client* is the exporter who must paper it. You are the importer. Never let a client tell you the SCCs are your problem to originate — but do sign them.

---

## 1. Moldova: the law in force right now

### 1.1 Which law

**Law No. 195 of 25 July 2024 on personal data protection.** Published 23.08.2024 in the Official Gazette No. 367-369 art. 574. Art 89(1): enters into force on expiry of **24 months from publication** → **23 August 2026**.

- Full English text (regulator's own site): https://datepersonale.md/wp-content/uploads/2024/09/Law-no.-195-2024-on-personal-data-protection-1.pdf
- Romanian consolidated text: https://www.legis.md/cautare/getResults?doc_id=144681&lang=ro
- Ministry of Justice announcement: https://justice.gov.md/ro/content/noua-lege-privind-protectia-datelor-cu-caracter-personal-reprezinta-un-pas-esential
- Confirmation it has actually commenced, with CNPDCP director Victoria Muntean ("the law is not about fines"): https://radiomoldova.md/p/83701

**Law No. 133/2011 is repealed** as of that date — Art 90(3)(b). Also repealed: Law 182/2008 (CNPDCP regulation) and Contravention Code arts 74¹–74³ and 423⁴.

The preamble states the law "transposes Regulation (EU) 2016/679". This is not aspirational — the operative articles are near-verbatim. Verified by direct reading:

| Law 195 | GDPR equivalent | Match |
|---|---|---|
| Art 3 (territorial scope) | Art 3 | verbatim, including establishment + offering/monitoring limbs |
| Art 5, 6, 7, 9, 10 | Art 5, 6, 7, 9, 10 | verbatim, incl. Art 6(1)(f) legitimate interests |
| Art 12–22 (rights) | Art 12–22 | verbatim, incl. Art 14 deadlines and Art 22 ADM |
| Art 25–39 (accountability) | Art 24–39 | verbatim |
| Art 44–49 (transfers) | Art 44–49 | near-verbatim, with two Moldova-specific twists (§3.4) |

**Practical consequence:** a GDPR-compliant policy is a Law 195-compliant policy. Do not maintain two documents.

### 1.2 Supervisory authority

**Centrul Naţional pentru Protecţia Datelor cu Caracter Personal (CNPDCP)** / National Centre for Personal Data Protection.

- Site: https://datepersonale.md/en/
- Address: 48 Serghei Lazo Street, MD-2004 Chişinău
- Phone: (022) 820 801 · Email: centru@datepersonale.md
- Statute: Law 195 Chapter VII, Arts 55–71. Director: Victoria Muntean.

### 1.3 Registration / notification — **abolished, and not resurrected**

There is **no** notification, registration or prior-authorisation duty anywhere in Law 195. I read the complete article index: the accountability chapter runs Art 24 → Art 43 with no registration provision. Mandatory registration of personal-data filing systems was already abolished under the old regime **as of 10 January 2022** (https://www.dlapiperdataprotection.com/?t=law&c=MD).

What replaces it is the GDPR accountability stack:
- **Art 30 — records of processing (RoPA).** Art 30(5) exempts undertakings with **fewer than 250 persons** *unless* the processing "is not occasional" or involves special categories. **Recruitment processing is continuous, so the exemption does not apply to you.** You must keep a RoPA. Same trap as GDPR Art 30(5).
- **Art 35 — DPIA** for high-risk processing.
- **Art 33/34** — breach notification to the Centre and to data subjects.
- **Art 32** — security measures.

### 1.4 Is a DPO mandatory? **No.**

Art 37(1) triggers, verbatim from the text:
> (a) public authority or institution; (b) core activities … require **regular and systematic monitoring of data subjects on a large scale**; (c) core activities consist of processing **on a large scale** of special categories under Art 9 or criminal-conviction data under Art 10.

TalentSync fails all three. It is not public; recruitment sourcing is not "monitoring" in the WP243 sense (which anchors on profiling, scoring, behavioural advertising, location tracking, CCTV); and a small recruiter's candidate database is not "large scale" on the WP243 factors (number of data subjects, volume/range of data, duration, geographic extent). Art 37 is identical in wording to GDPR Art 37, so the EU answer is the same.

**Two operational riders:**
- Art 37(4) leaves voluntary designation open. **Do not designate voluntarily** — a designated DPO attracts the full Art 38/39 independence, reporting-line and task obligations. Appoint an unbadged "privacy contact" instead.
- Art 37(7): if you *do* designate, you must **publish the DPO's contact details and communicate them to the Centre**. That is the only residual filing obligation in the whole statute.

### 1.5 Sanctions — and the phase-in that buys you a year

Art 88, two tiers (Art 87 sets the effectiveness/proportionality/dissuasiveness test, and Art 87(3) requires intent or negligence):

| Tier | Breaches | Cap |
|---|---|---|
| Art 88(1) | Arts 8, 11, **25–39** (incl. Art 27 rep, Art 30 RoPA, Art 35 DPIA, Art 37 DPO), 42–43 | **MDL 1,000,000 or 1% of prior-year turnover, whichever is higher** |
| Art 88(2) | **Arts 5, 6, 7, 9** (principles, lawfulness, consent, special categories); **Arts 12–22** (data-subject rights); **Arts 44–49** (transfers); non-compliance with corrective measures | **MDL 2,000,000 or 2% of turnover, whichever is higher** |

**Art 90(4) — the transitional discount.** From entry into force, the final penalty is reduced to:
- **year 1 (23 Aug 2026 – 22 Aug 2027): 10%** of the determined fine
- year 2: 40%
- year 3 onward: 100%

You are in the 10% window now. That is a real remediation runway, not an excuse — Art 60(2) corrective powers (orders, processing bans, suspension of data flows) are **not** discounted and bite at full force from day one.

Note the ceilings are materially below GDPR's (€20m / 4%). The GDPR exposure via Art 3(2) is the larger risk, not the Moldovan one.

### 1.6 Moldova's international posture

Moldova ratified **Convention 108+ (CETS No. 223) on 15 May 2026**, becoming the **34th** state party (https://www.coe.int/en/web/data-protection/-/republic-of-moldova-becomes-the-34th-state-to-ratify-the-convention-108-). Convention 108+ needs **38** ratifications and is **not yet in force**. Moldova has been a party to the original Convention 108 since 2008. This matters as evidence for a future adequacy case (§3), not as a transfer mechanism today.

---

## 2. GDPR Art 3(2) — does the EU GDPR reach TalentSync? **Yes, decisively.**

### 2.1 The test

Art 3(2) catches a non-EU controller where processing relates to (a) **offering goods or services** to data subjects in the Union, irrespective of payment, or (b) **monitoring their behaviour** in the Union. Recital 23 requires that it be "apparent that the controller … envisages offering services to data subjects in one or more Member States". EDPB Guidelines 3/2018 (adopted after public consultation, 12 Nov 2019): https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf

### 2.2 Applying it — limb (a) is satisfied several times over

The EDPB's non-exhaustive targeting factors (p.17–18), scored against your actual facts:

| EDPB factor (verbatim) | TalentSync |
|---|---|
| "the use of a top-level domain name other than that of the third country in which the controller is established … or the use of **neutral top-level domain names such as '.eu'**" | **talentsync.eu.** The EDPB names `.eu` explicitly. On its own this is the strongest single indicator in the list. |
| "The use of a language or a **currency** other than that generally used in the trader's country" | Site is in English, not Romanian; pricing quoted in **EUR** (€15–35/hour) |
| "The mention of an **international clientele** composed of customers domiciled in various EU Member States" | Orange, SocialBee, Barca Mobile, Entail AI, Pixelette, Innovatec named on the site |
| "The EU or at least one Member State is designated by name with reference to the … service offered" | Positioning explicitly targets European product companies |
| "the controller … has launched marketing and advertisement campaigns directed at an EU country audience" | Discovery channel is ChatGPT, i.e. inbound to an EU-facing page |

**And independently of the client side:** you source candidates in **Romania and Poland**, which are EU Member States. Those engineers are data subjects in the Union, and you offer them a service — representation, matching, placement. Art 3(2)(a) says "irrespective of whether a payment of the data subject is required", which forecloses the "but the candidate doesn't pay us" argument. This limb alone is dispositive, and it does not depend on any B2B/B2C characterisation of the client relationship.

The Recital 23 safe harbour — "mere accessibility of the website … does not, of itself, provide sufficient evidence" — is unavailable to you. You are far past mere accessibility.

**Candidates in Moldova and Ukraine are outside the Union**, so GDPR does not reach that processing. Moldovan candidates → Law 195. Ukrainian candidates → Ukrainian law. In practice you will run one standard for all four countries because segregating is more expensive than complying.

### 2.3 Limb (b) — monitoring: not triggered today, easily triggered tomorrow

EDPB (p.19–20): monitoring requires tracking on the internet **plus** a purpose involving behavioural analysis or profiling. Their list includes behavioural advertising, geo-localisation for marketing, "online tracking through the use of cookies or other tracking techniques such as fingerprinting", and "market surveys and other behavioural studies based on individual profiles". Crucially: "The EDPB does not consider that **any** online collection or analysis of personal data of individuals in the EU would automatically count as 'monitoring'."

- **Today:** no analytics, no pixels, no cookies. Limb (b) is not triggered.
- **The moment you add GA4 or a LinkedIn Insight tag**, limb (b) triggers independently — and it triggers the *UK* equivalent too (§8).
- **Grey zone:** a one-off review of a public LinkedIn profile is not monitoring. Persistent talent-pool records that you periodically re-check for job changes start to look like it. Not settled; flagged in §11.

### 2.4 Art 27 EU representative — **required**

Art 27(2)(a) exempts processing that is *cumulatively*: occasional **and** not large-scale special-category/criminal **and** unlikely to result in a risk. EDPB (p.25), following WP29:

> "a processing activity can only be considered as 'occasional' if it is **not carried out regularly, and occurs outside the regular course of business or activity** of the controller or processor"

Collecting and forwarding CVs *is* your regular course of business. The exemption fails at limb one; the remaining limbs never get tested. Note also the EDPB's clarification that the third limb is "unlikely to result in **a** risk", not a *high* risk — a deliberately low bar.

**Practical specification:**
- **Where:** Art 27(3) — a Member State where the data subjects are. Your EU candidates are in Romania and Poland. **Romania** is the sensible pick: largest candidate concentration, shared language, cheapest providers. EDPB good practice is to place the rep where a significant proportion of data subjects sit.
- **Publish it:** the EDPB is explicit (p.24) that Arts 13(1)(a)/14(1)(a) require the representative's identity in the privacy notice, and that "failing to inform data subjects who are in the Union of the identity of its representative would be in breach of its transparency obligations". No filing with a DPA is required — publication *is* the notification.
- **Cost of getting this wrong:** the Dutch DPA fined **Locatefamily.com €525,000** solely for the missing representative, plus €20,000 per two-week period of continued non-compliance up to €120,000. https://www.twobirds.com/en/insights/2021/netherlands/finding-locatefamily-com-dutch-dpa-imposes-525000-euro-fine-for-not-having-a-gdpr-representative · https://gdprhub.eu/index.php?section=1&title=AP_-_locatefamily.com
- The representative can be addressed by supervisory authorities and data subjects "in addition to or instead of" you (Art 27(4)), and its appointment does not shield you from direct action (Art 27(5)).

---

## 3. Transfers: adequacy, direction of flow, and who is exporter

### 3.1 Adequacy — **there is no Moldova adequacy decision**

Verified against the Commission's own adequacy page on 30 Aug 2026: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en

Current list: Andorra, Argentina, **Brazil (Jan/Feb 2026)**, Canada (commercial organisations), Faroe Islands, Guernsey, Israel, Isle of Man, Japan, Jersey, New Zealand, Republic of Korea, Switzerland, **United Kingdom (renewed 19 December 2025)**, United States (DPF-certified organisations), Uruguay, and the European Patent Organisation (15 July 2025).

**Moldova is absent, and no adequacy talks are announced on that page.** Moldova is in EU accession negotiations and now has a GDPR-transposing law plus Convention 108+ ratification, which is the standard adequacy fact pattern — but a pre-accession adequacy decision is speculation, not a plan. **Do not draft the policy on the assumption adequacy is coming.**

### 3.2 Is EU → Moldova even a "transfer"? Yes — but only sometimes

EDPB **Guidelines 05/2021** on the interplay between Art 3 and Chapter V (v2.0, adopted 14 Feb 2023): https://edpb.europa.eu/system/files/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf

Three **cumulative** criteria for a transfer:
1. the exporter (controller or processor) is subject to GDPR for the processing;
2. the exporter "discloses by transmission or otherwise makes personal data … available to another controller, joint controller or processor" (the importer);
3. the importer is in a third country — **"irrespective of whether or not this importer is subject to the GDPR"**.

Criterion 3 is the one people get wrong. Being caught by Art 3(2) does **not** exempt you from Chapter V. You are simultaneously a GDPR-subject controller *and* a third-country importer.

**But criterion 2 fails where the data subject sends the data themselves.** The Guidelines are explicit (p.8, fn.15): "this second criterion cannot be considered as fulfilled when there is no controller or processor sending or making the data available (i.e. no 'exporter'), such as when data are disclosed **directly by the data subject** to the recipient." Their Example 1 is a data subject in Italy filling in a form on a third-country website: "This does not constitute a transfer of personal data … Nevertheless, the third country company will be required to apply the GDPR since its processing operations are subject to Article 3(2)."

### 3.3 Exporter/importer map for your two engagement models

| Flow | Transfer under Ch. V? | Exporter | Importer | Instrument |
|---|---|---|---|---|
| **Romanian/Polish candidate emails CV to `mailto:victor@`, or books via Calendly** | **No** | none (data subject) | — | None needed. GDPR still applies to your processing via Art 3(2). This is why the mailto-only design is an accidental compliance win. |
| **EU client sends you a job spec containing named employee/manager data, interview feedback, or an existing engineer's details** | **Yes** | **the EU client** | TalentSync | **SCC Decision 2021/914, Module 1 (C2C)** in your MSA. The client originates it; you sign it. |
| **EU client engages you as a processor for a defined mandate** (rare — see §4) | **Yes** | the EU client | TalentSync | **SCCs Module 2 (C2P)** + an Art 28 DPA |
| **You forward a candidate CV to an EU client** | **No** (Moldova → EU) | — | — | Outbound from a third country to the EU is not a GDPR Chapter V event. Under **Law 195 Art 44(2)**, "This Chapter shall not apply to transfers of personal data to Member States of the European Economic Area. **No special authorisation is required.**" Both directions are clear. |
| **Your site loads Google Fonts / you add GA4 / you embed Calendly** | **Yes** (you are the exporter) | **TalentSync** (subject to GDPR for that processing) | Google LLC / Calendly LLC (US) | Both are DPF-certified, so Art 45 adequacy covers it — but see §9, the cleanest answer is to remove the flow entirely |
| **You put candidate data in a US SaaS ATS, or host on a US Railway region** | **Yes** | TalentSync | the SaaS/host | Art 28 DPA + DPF or SCCs. Check your Railway region. |

**Module selection, stated plainly:** because your defensible role for candidate data is **independent controller** (§4), the correct SCC module for client-to-TalentSync flows is **Module 1 (controller-to-controller)**, not Module 2. Recruiters routinely sign Module 2 by reflex because clients hand them a processor DPA. Signing Module 2 while behaving as a controller is worse than useless: it contradicts your own notice and hands a regulator a documented inconsistency.

### 3.4 Moldova's own outbound-transfer rules (Law 195 Ch. V, Arts 44–49)

Two features that make life easier than you'd expect:
- **Art 44(2):** EEA transfers are wholly outside the chapter. No authorisation, no clauses, nothing.
- **Art 46(2)(c):** appropriate safeguards may be provided by "standard personal data protection clauses approved by the Centre **or adopted by the European Commission**" — **without requiring any specific authorisation from the Centre**. The 2021 EU SCCs are directly usable for Moldova→third-country flows.
- Art 45 lets the CNPDCP issue its own adequacy decisions, and Art 45(2)(d) directs it to take account of "the adequacy decisions of the European Commission" — so the Centre will in practice track the EU list.
- Art 46(3) reserves Centre authorisation for *ad hoc* bespoke clauses only.

So: Moldova→EU is free; Moldova→US SaaS needs SCCs or a recognised mechanism, using the EU forms.

### 3.5 The Art 3(2)-importer SCC gap — an honest unresolved point

The 2021 SCCs are drafted for importers **not** subject to GDPR. You *are* subject to GDPR. The Commission has said since 2024 it is "in the process of developing additional sets of SCCs" for "transfers to controllers/processors outside the EU whose processing operations fall directly under Article 3(2) GDPR" — see https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en. That page, as fetched today, still lists only the 4 June 2021 set as adopted and gives no completion date. A Q2-2025 target was announced and a public consultation ran in Q4 2024 (https://www.steptoe.com/en/news-publications/steptechtoe-blog/new-standards-contractual-clauses-for-the-international-transfer-of-personal-data-coming-up-in-2025.html) but **I could not confirm adoption**.

**What to do in the gap:** sign the 2021 SCCs (Module 1) anyway. They are the only instrument available, every EU client's procurement will demand them, and the EDPB's position is that a Chapter V tool is required regardless. Note the mismatch in your Art 30 record so it reads as a considered position rather than an oversight, and re-paper if the Art 3(2) set lands.

---

## 4. Controller vs processor, per data category

Governing sources: [EDPB Guidelines 07/2020 on controller and processor](https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf); [ICO, Responsibility for data protection compliance during the recruitment process](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/responsibility-for-data-protection-compliance-during-the-recruitment-process/). The ICO page is UK guidance but is the most granular recruitment-specific controller analysis any European regulator has published, and its reasoning tracks EDPB 07/2020. Treat it as persuasive, not binding, in the EU.

### (a) Website visitors — **sole controller**
Server logs (nginx on Railway captures IPs), and any future analytics. You alone determine purpose and means. Railway is your **processor**; you need an Art 28 DPA with them and should know which region serves the container.

### (b) Client-side business contacts — **sole controller**
Names, work emails, job titles, meeting notes, Calendly bookings, CRM records. Your purposes: selling, delivering, invoicing. No client instructs you. Straightforward. Note that "B2B" is not a GDPR category — a named individual at a company is a data subject with full rights.

### (c) Candidates — the one that matters

The ICO walks the exact fact pattern:

> "A recruitment agency receives a CV from a prospective candidate who is looking for roles in the insurance sector on a speculative basis. **It processes the candidate's information as a controller.** Upon their request, the agency shares the prospective candidate's CV with an interested client … At this stage, **the agency and the client will be joint controllers** for the purpose of identifying a relevant role … The agency retains the prospective candidate's CV for further job opportunities. **It is a controller for this processing activity.**"

And the counter-example where a recruiter *is* a processor:

> "A secondary school has contracted an executive search firm (ESF) … Although the ESF is using its professional judgement to decide how best to search for candidates, **it cannot make any overarching decisions about the processing itself**. This includes what personal information to collect or how it will be used by the school. Therefore, the ESF is likely to be a processor."

Also directly on point: "any employer or recruiter that obtains and later processes personal information **from a job board** will typically be doing so **as a controller in their own right**", and status "can change throughout the recruitment process".

**Where TalentSync actually sits.** You decide *which* engineers to approach, what to record, how to validate, whether to keep someone in the pool after a rejection, and which of several clients to show them to. That is purpose-setting, not instruction-following. The ESF-as-processor example fails for you because it requires the client to have fixed what is collected and how it will be used — your value proposition is precisely that you decide that.

**Defensible position, in this order:**

1. **Independent controller** for: sourcing, outreach, validation/screening, the talent pool, matching across clients, and all marketing. **This is your headline position and it should be stated in the first paragraph of the candidate-facing notice.**
2. **Client becomes an independent controller in its own right** from the moment it receives a CV and starts running its own selection. Two controllers, sequential, not joint — because the purposes then diverge (you: placement and fee; client: hiring decision).
3. **Joint controllership risk at the handover moment.** The ICO says the sharing itself, for the shared purpose of identifying a role, is joint. You will not win that argument by asserting otherwise in a notice. **Mitigation, not denial:** put an Art 26 clause in every client MSA that allocates (i) who answers candidate access requests, (ii) who serves the Art 13/14 notice at each stage, (iii) breach notification, (iv) deletion on request — and publish the essence of that arrangement in the notice, as Art 26(2) requires. This costs one contract clause and removes the entire failure mode.

**Model-specific overlays:**

- **Direct B2B recruitment** (client selects and manages the engineer, avoiding local employment): clean sequential-controller model. You are controller until handover; the client is controller thereafter and for the whole employment/contract relationship. Your anti-positioning — *"we help companies add experienced engineers to their existing teams while retaining full technical and operational control"* — actively supports this and should be echoed in the policy. It is a genuine legal asset: it evidences that the client, not you, controls the engagement.
- **Flexible hourly collaboration** (engineer joins client's team, billed hourly): here the engineer is likely *your* contractor or employee. You are **controller as their employer/contracting party** (payroll, contract, tax, insurance). The client is **controller** for the work data it generates about them (tickets, commits, reviews, access logs). For **timesheets and billing** you are probably **joint controllers** — the ICO's temporary-staffing example is exactly this: "the agency and Company A are joint controllers for this personal information as they mutually determine the purpose and means of its processing." Paper it in the hourly-model contract template.

**Say this in the policy, verbatim-ish:** *"For candidate data, TalentSync acts as an independent controller. We decide whom to approach, what to record and how long to retain it. Where we share your profile with a client, that client becomes a controller in its own right and applies its own privacy notice; for the act of sharing itself we and the client may act as joint controllers, and our arrangement allocates responsibilities as set out below."* That sentence is defensible under both the ICO's and the EDPB's frameworks and pre-empts the argument.

---

## 5. Lawful bases, the LIA, and the Art 14 trap

### 5.1 Legitimate interests for sourcing — available, and the CJEU has confirmed it

**CJEU C-621/22 *KNLTB*, 4 October 2024:** a **purely commercial interest** can constitute a legitimate interest under Art 6(1)(f), provided it is not contrary to law. https://www.twobirds.com/en/insights/2023/global/key-takeaways-from-the-schufa-case-of-the-cjeu (for SCHUFA) and analysis at http://eulawanalysis.blogspot.com/2024/10/latest-updates-on-legitimate-interest.html

**EDPB Guidelines 1/2024 on Art 6(1)(f)** (published 8 October 2024): https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf — the three-step test survives intact. A commercial justification does not skip necessity or balancing.

### 5.2 The LIA you must actually write

One page per sourcing activity, dated, signed, kept with the RoPA. Three steps:

**1 — Purpose test.** "Identifying experienced engineers whose publicly stated professional experience matches a live client mandate, in order to approach them about a specific role." Tie it to a **live mandate**. A vague "building a talent pool for future opportunities" is much weaker, and the CNIL has said a pool built off "a false job offer" is not legitimate (https://www.cnil.fr/fr/recrutement-et-donnees-personnelles-dans-les-tpepme-cinq-questions-incontournables-se-poser).

**2 — Necessity test.** Could you achieve it less intrusively? Answer honestly: job adverts reach a different population than passive candidates, so targeted sourcing is necessary for the purpose — but only for **role-relevant fields**. This is where you cut scope: name, current title, employer, skills, public profile URL, location, years of experience. **Not** photographs, not personal social accounts, not inferred demographics, not anything from outside professional platforms.

**3 — Balancing test.** Weigh:
- *For you:* recital 47's "reasonable expectations" — an engineer with a public LinkedIn profile in a jobs-oriented network reasonably expects recruiter contact. This is your strongest argument and you should record it.
- *Against you:* the person did not choose you; there is no prior relationship; a persistent pool extends the intrusion far beyond the single approach.
- *Safeguards that tip it:* professional platforms only; role-relevant fields only; Art 14 notice on first contact; one-click opt-out honoured permanently via a suppression list; 24-month retention; no special-category inference; no automated scoring.

**The ICO's operational rules** (https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/finding-candidates/), which are the most usable regulator statement on sourcing anywhere:
> "If you use publicly available information for your own purposes, **you are a controller** … You must still comply with data protection law. This includes providing candidates with your privacy information **as soon as possible, and by no later than one month** of obtaining it."
> "It may be **reasonable** to manually search for information using **recruitment-based social media platforms**, as candidates are reasonably likely to expect their information to be used in this way."
> "You **should not** search for candidates on their **personal social media profiles, even when these are public-facing** … You risk obtaining information about them which is detrimental or reveals special category information. You should avoid this as it is **intrusive, high risk**, and not likely to reveal relevant information."

Encode that split as policy: **LinkedIn/GitHub/StackOverflow yes; Facebook/Instagram/X/personal blogs no.** Write it into the sourcing SOP, not just the notice.

### 5.3 Scraping vs manual sourcing — and a genuine regulator/court conflict

The Dutch DPA's 2024 scraping guidance holds that scraping is **"almost always illegal"** and that purely commercial interests do not qualify as legitimate interests, on the theory that only legally protected interests count. https://www.hoganlovells.com/en/publications/dutch-dpa-issues-guidelines-on-data-scraping_1 · https://www.pinsentmasons.com/out-law/news/dutch-web-scraping-guidance-warn-businesses-gdpr-breach-risk

**That second proposition is squarely contradicted by CJEU C-621/22.** The Dutch position predates the judgment and has not been reconciled. This is a real, live conflict and I am not going to smooth it over.

**What survives the conflict, and what you should do:** the AP's *specific* prohibitions are unaffected by *KNLTB* because they turn on balancing, not on the availability of commercial interest as an interest — namely "web crawling to create individual profiles that can be resold" and "scraping information from protected social media accounts or private forums". Both are things you should not do regardless.

**Decision: manual, targeted, human-initiated sourcing on professional platforms. No automated bulk scraping, no purchased scraped databases, no resale of profiles.** Manual sourcing sits comfortably inside even the AP's framework; bulk scraping does not, and the CJEU has not blessed it either. Also note LinkedIn's ToS independently prohibit scraping — the *KNLTB* proviso is that the interest must not be "contrary to the law", and a ToS breach is at minimum a balancing negative.

### 5.4 Art 14 — the deadline that actually governs sourcing

GDPR Art 14(3) — and **Law 195 Art 14(3)**, which I verified is worded identically:
> (a) "within a reasonable period after obtaining the personal data, but **at the latest within one month**"; (b) "if the personal data are to be used for communication with the data subject, **at the latest at the time of the first communication** to that data subject"; (c) "if a disclosure to another recipient is envisaged, **at the latest when the personal data are first disclosed**."

**These are not alternatives you pick from. The earliest applicable one governs.** For a sourcing recruiter that is always (b): you found them in order to contact them, so **the very first outreach email or InMail must deliver the Art 14 information**. The one-month backstop is irrelevant to your workflow and citing it is the classic error.

**Operationally:** every outreach template gets a standing footer — who you are, your EU representative, that you obtained their details from [LinkedIn/GitHub], the categories of data, purpose, legitimate-interest basis, that CVs are shared with named clients, retention period, their rights including objection, and the CNPDCP/lead-EU-authority complaint route. Art 14(1)(f)/(2) also requires you to state the **source**, and Art 14(1)(e) the **recipients or categories of recipients** — so "we may share your profile with our clients, who are technology companies in the EU/EEA and UK" is the minimum, and naming the client before you share is better.

**Do not rely on Art 14(5)(b) "disproportionate effort".** Verified text: it excuses notice where provision "proves impossible or would involve a disproportionate effort, **in particular** for … archiving/research/statistical purposes". You have the person's email address and you are emailing them anyway. The effort is zero. The exemption is unavailable and invoking it would be an aggravating factor.

Art 14(5)(a) — "the data subject already has the information" — is also unavailable. Knowing that recruiters exist is not knowing that *you* hold *their* data.

### 5.5 When consent is actually required

Only four places:
1. **Special-category data** (Art 9(2)(a) explicit consent) — the only realistic Art 9 condition for a recruiter, since Art 9(2)(b) employment-law condition belongs to the employer, not the intermediary. Best answer: don't collect it at all (§7).
2. **Talent-pool retention beyond your stated period**, in Member States that require it — Germany in particular treats a *Talentpool* as consent-based (§6).
3. **ePrivacy Art 5(3) storage/access** — cookies and equivalents (§9). Independent of GDPR basis.
4. **Cross-context reuse** — e.g. using a candidate's CV to build a public "talent showcase" or marketing case study.

**Consent is the wrong basis for sourcing itself** and would be invalid anyway: you cannot obtain consent before you collect the data you need in order to contact them. That circularity is why Art 14 exists.

### 5.6 Art 21 — the right to object is your hardest operational obligation

Under Art 6(1)(f), the candidate can object at any time and you must stop unless you show compelling overriding grounds (which, for recruitment marketing, you will not). Consequences:
- Maintain a **permanent suppression list** — email hash plus profile URL, nothing more. Deleting someone entirely means you re-source them next quarter and re-offend.
- The suppression list is itself Art 6(1)(f) processing (legitimate interest in honouring objections). Say so in the notice.
- Objection must be as easy as the outreach: a reply saying "remove me" must work. Do not require a form.

---

## 6. Retention

### 6.1 What regulators have actually said

**CNIL** (https://www.cnil.fr/fr/recrutement-et-donnees-personnelles-dans-les-tpepme-cinq-questions-incontournables-se-poser): a *vivier* of unsuccessful candidates is permitted, but **"the retention period must not exceed two years"**, counted **from the last contact with the candidate**, and the candidate must be informed of it beforehand. Longer requires the candidate's agreement. A pool built from a fake job posting is not legitimate.

**Germany:** rejected applicants' documents are conventionally held **~6 months** after the process closes — derived from §15(4) AGG's two-month written-claim window plus the three-week Klagefrist plus service margins. Beyond that, a *Talentpool* requires **explicit Art 6(1)(a) consent** with a stated duration (typically 1–2 years) and a withdrawal right. https://www.dr-datenschutz.de/aufbewahrungsfrist-wann-sind-bewerbungen-zu-loeschen/ · https://www.haufe.de/personal/arbeitsrecht/aufbewahrungsfristen-von-bewerbungsunterlagen_76_625830.html

**ICO** (https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/keeping-recruitment-records/):
> "the possibility that a person may bring a legal claim **does not mean that you have to keep records about recruitment indefinitely**."
> "In general, you should not keep information beyond the statutory period in which a legal claim can potentially be brought."
> If you keep data for a **new purpose**, you must review the lawful basis, have **previously informed** candidates of that purpose, and destroy what you don't need.
> If retention is for statistics only, **anonymise**; pseudonymised data is still personal data.

There is also a countervailing point the ICO makes that recruiters forget: "if you destroy records about any of the candidates **too quickly**, it may be more difficult for you to prove that your end-to-end process is transparent, fair and accountable." Deleting on day one is not the safe answer either.

**Enforcement is live.** On **3 April 2026** the CNIL designated recruitment one of its three priority investigation themes for 2026, checking **automated decision-making systems, candidate information, and retention periods**, and stating the controls "will primarily target large companies **and recruitment firms**, given the multiplicity of applications they receive and the selections they operate". It also flags this as a precursor to CNIL's role as AI Act market-surveillance authority for the "work" domain. https://www.cnil.fr/fr/controles-prioritaires-2026

### 6.2 The schedule to adopt

| Record | Period | Justification |
|---|---|---|
| Sourced-but-never-responded prospect | **6 months** from sourcing, then delete | No relationship formed; minimal interest |
| Candidate in an active process | Process duration + **6 months** | ICO fairness/accountability + German AGG window |
| Unsuccessful candidate, talent pool | **24 months from last meaningful contact**, disclosed up front | CNIL référentiel ceiling |
| German-facing rejection, no pool consent | **6 months** | §15(4) AGG |
| Placed candidate | Contract term + statutory limitation for contract/fee claims | Verify the Moldovan Civil Code period — see §11 |
| Suppression list | **Indefinite**, minimal fields (hashed email + profile URL) | Necessary to honour Art 21 objections |
| Client contacts | Relationship + 24 months, then delete | Ordinary B2B |
| Server logs | **30–90 days** | Security only |

**Make the 24-month clock real.** Automate: at 22 months send a "still interested?" mail; on reply, reset the clock; no reply by 24 months, hard-delete. A "review annually" note in a policy is not a retention control and a regulator will read it as one word: indefinite. This is precisely what CNIL is checking in 2026.

---

## 7. Special categories, criminal data, Art 22, and the AI Act

### 7.1 Art 9 special categories

CVs leak special-category data whether you ask for it or not — photographs (ethnicity), names (ethnicity/religion), military service, union roles, health explanations for CV gaps, "diversity" statements, pregnancy-related career breaks.

Your position:
- **Never require a photograph, date of birth, marital status, or nationality** in application materials. Say so.
- **State that you do not seek special-category data**, and that unsolicited special-category data will be deleted or redacted before a profile is shared.
- **Article 9(2)(b)** (employment-law obligations) is the employer's condition, not an intermediary's. You have no realistic Art 9 condition other than **explicit consent** — which you should be structuring your process to avoid needing.
- If a client asks you to screen on anything Art 9-adjacent, refuse in writing. It is both an Art 9 breach and an equal-treatment breach.

### 7.2 Art 10 criminal-conviction data — **do not touch it**

Verified text from EUR-Lex (https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02016R0679-20160504):
> "Processing of personal data relating to criminal convictions and offences … shall be carried out **only under the control of official authority** or when the processing is **authorised by Union or Member State law** providing for appropriate safeguards … Any comprehensive register of criminal convictions shall be kept only under the control of official authority."

Law 195 Art 10 mirrors this. There is no Union or Moldovan law authorising a private recruitment intermediary to process criminal-conviction data about EU candidates. **Therefore: collect none, request none, forward none.** If a client requires background checks, the client conducts them under its own national law after handover, and your contract says so. This also keeps you outside the Art 27(2) and Art 37(1)(c) "criminal data at scale" triggers.

### 7.3 Art 22 — and why *SCHUFA* is the case that should change your product

**CJEU C-634/21 *SCHUFA Holding (Scoring)*, 7 December 2023.** The Court held that producing an automated probability score constitutes an Art 22(1) "decision" where the third party who receives it **draws strongly on it**. The Court rejected the narrower reading precisely because it "would lead to a lacuna in legal protection". https://www.twobirds.com/en/insights/2023/global/key-takeaways-from-the-schufa-case-of-the-cjeu · https://verfassungsblog.de/to-score-is-to-decide/ · Labour-context analysis: https://academic.oup.com/ilj/article/53/4/840/7745471

**Read across to recruitment, which is exactly the analogy the literature draws:** if TalentSync produces an automated fit score or ranked shortlist, and clients hire predominantly off the top of that list, **TalentSync is the Art 22 decision-maker**, not the client. Art 22 obligations — one of the three narrow exceptions, plus the right to human intervention, to express a view and to contest — would land on you, and you have no realistic exception available (no contract with the candidate, no Union/Member State law, and consent that would not be freely given).

**Decision: no automated score, no automated ranking, no automated rejection.** Human-curated shortlists with written reasons. This is also, conveniently, your differentiator against volume agencies.

**If you do adopt AI assistance,** the ICO's line is the practical standard (https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/automated-decision-making-and-profiling-for-recruitment-and-selection/):
> "a human has the power to disagree with the AI recommendations or predictions, and **can overturn them**" … "If a human has no power to overturn the AI recommendations, the recruitment decision has been made by solely automated means … **This is the case even if the human has reviewed the information.**"
> "You **must** do a DPIA if you plan to use solely or partly automated decision-making and profiling for recruitment purposes as **both** activities are high risk."

Note "partly automated" also mandates a DPIA. And keep "a record of each time a human reviewer overrides an automated recruitment decision".

### 7.4 EU AI Act — recruitment is high-risk, but the deadline moved this month

**Annex III point 4** classifies AI systems for recruitment and selection — placing targeted ads, analysing and filtering applications, evaluating candidates — as **high-risk**. Original application date for Chapter III obligations: 2 August 2026.

**That date has just been deferred.** **Regulation (EU) 2026/1744 of 8 July 2026** ("Digital Omnibus on AI"), amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230, published in the OJ on **24 July 2026**, in force **27 July 2026**: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AL_202601744

- Chapter III Sections 1–3 for **Annex III** high-risk systems (i.e. recruitment): **2 December 2027** (was 2 Aug 2026)
- Annex I product-embedded high-risk systems: **2 August 2028**

Commentary: https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/ · https://compliancehub.wiki/eu-digital-omnibus-ai-act-deadline-deferral-annex-iii-2027/

**What did *not* move, and applies today:**
- **Art 5 prohibited practices** — in application since **2 February 2025**. Includes **inferring emotions in the workplace**. Any video-interview tool claiming to read enthusiasm, confidence or honesty from face or voice is **prohibited outright**, not merely high-risk. If a client asks you to use one, refuse.
- **Art 4 AI literacy** — since 2 February 2025. Staff using AI tools must have adequate training. Cheap to satisfy; document it.
- **Art 50 transparency** — unchanged.

**Your role if you adopt a third-party screening tool: deployer, not provider.** Deployer obligations (human oversight, input-data relevance, logging, informing affected workers/candidates) attach on **2 December 2027**. And note the CNIL page above signals it will be the French market-surveillance authority for employment AI, with its 2026 recruitment sweep as the dry run.

**Net effect for the policy:** you get sixteen extra months, and you should use them to stay out of Annex III entirely rather than to prepare for it. Say in the notice: *"We do not use automated decision-making or AI-based scoring to evaluate candidates. All shortlisting decisions are made by a person."* That sentence is worth more than a compliance programme — but only write it if it is true, and keep it true.

---

## 8. UK GDPR delta

### 8.1 UK representative — still required, and still Art 27

Verified directly against the statute book on 30 Aug 2026: https://www.legislation.gov.uk/eur/2016/679/article/27 — the page states Article 27 "is up to date with all changes known to be in force on or before **28 August 2026**". The only amendments are the 2019 EU-exit substitutions ("the United Kingdom" for "the Union", "the Commissioner" for supervisory authorities) and the omission of Art 27(3). **Art 27(1) and the Art 27(2) exemptions stand unchanged.** The Data (Use and Access) Act 2025 did not remove it (s.81 of that Act concerns children's protection in Art 25, not representatives: https://www.legislation.gov.uk/ukpga/2025/18/section/81).

**Whether you need one is genuinely narrower than the EU case.** The EU trigger is decisive because you source candidates *in* Romania and Poland. If your UK exposure is only corporate clients — you sell recruitment services to a UK company, and the only UK individuals are that company's employees acting in a business capacity — the argument that you "offer services to data subjects in the UK" is weak, since the service recipient is the company.

**So, decisively:**
- **Sourcing any UK-based candidate → appoint a UK representative.** Clear trigger under limb (a).
- **Adding analytics or tracking that reaches UK visitors → appoint one.** Clear trigger under limb (b).
- **UK corporate clients only, no UK candidates, no tracking → not clearly triggered.** Defensible to decline, but the cost of a UK representative is small relative to the argument, and the moment a UK client asks you to source a UK engineer the position flips. Revisit when UK revenue becomes material.

### 8.2 DUAA 2025 — the UK is now *looser*, which is a trap

The Data (Use and Access) Act 2025's Part 5 data-protection provisions largely commenced **5 February 2026** (https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html · https://privacymatters.dlapiper.com/2026/02/uk-commencement-of-the-data-protection-provisions-in-the-data-use-and-access-act/).

**Section 80 replaced UK GDPR Art 22 with new Arts 22A–22D** (https://www.legislation.gov.uk/ukpga/2025/18/section/80). The general prohibition on solely automated decisions with significant effects is gone, replaced by a permission-plus-safeguards regime for most personal data; the stricter prohibition is retained where special-category data is involved.

**Do not optimise for this.** Building AI screening to the UK's relaxed standard would breach EU GDPR Art 22 for your Romanian and Polish candidates and expose you to the CNIL sweep. **Build to the EU standard and you clear both.** The UK delta is a reason to write *one* policy, not two.

Also note: the ICO recruitment guidance quoted throughout §5–7 predates the DUAA on the ADM points specifically. Its controller/processor, sourcing and retention material is unaffected and remains the best free playbook in English.

### 8.3 UK ↔ EU adequacy

The Commission **renewed UK adequacy on 19 December 2025** (per the Commission adequacy page above), so EU→UK flows run on adequacy. Irrelevant to you directly, but it means a UK client's own EU data flows are clean and they will not push exotic terms at you.

**UK→Moldova is a different question.** The UK operates its own "data bridge" list. **I could not verify** whether Moldova appears on it; assume not, and assume a UK client exporting to you needs the **IDTA or the UK Addendum to the EU SCCs**, plus a Transfer Risk Assessment. Flagged in §11.

---

## 9. Cookies, ePrivacy, Google Fonts, Calendly

### 9.1 The rule

**Art 5(3) ePrivacy Directive 2002/58/EC** requires prior consent for **any** storing of, or access to, information on a user's terminal equipment, except where strictly necessary for a service the user requested or for transmission. It is **technology-neutral** — not a "cookie law". **EDPB Guidelines 2/2023** on the technical scope of Art 5(3), final version **October 2024**, extends this explicitly to pixels, local storage, URL-based tracking, IP-only tracking in some configurations, and fingerprinting: https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf

Consent under Art 5(3) is **GDPR-standard consent**: prior, specific, informed, unambiguous, affirmative. Reject must be as easy as accept, on the same layer. No pre-ticked boxes. No cookie wall on a brochure site. And Art 5(3) applies **independently of** whether the data is personal — so "it's anonymous analytics" is not an answer.

### 9.2 GA4

Consent required, full stop. The EDPB has never accepted the first-party-analytics exemption that some Member States allow under narrow conditions.

**Recommendation: do not add GA4.** You currently have zero analytics and therefore zero banner. If you need traffic data:
- **Best:** server-side log analysis of the existing nginx logs (GoAccess against the Railway logs). No terminal-equipment access, no Art 5(3) consent, no banner. Genuinely free.
- **Acceptable:** a cookieless, EU-hosted analytics product configured without terminal storage — most such products still claim no-consent status, but the EDPB 2/2023 position on non-cookie identifiers means you should verify the specific configuration rather than trust the vendor's marketing.
- **Worst:** GA4 + a consent banner. You lose the no-banner advantage, you lose most of the data to rejections anyway, and you add a triggering fact for Art 3(2)(b) monitoring in both the EU and the UK.

### 9.3 Google Fonts — a real problem in your repo today

`src/app/globals.css` imports Montserrat via `@import` from `fonts.googleapis.com`. Every page load makes the visitor's browser connect to Google and transmit their **IP address**.

**LG München I, judgment of 20 January 2022, Az. 3 O 17493/20**: awarded **€100** damages against a site operator for dynamically embedding Google Fonts without consent. The court held that dynamic IP addresses are personal data to the site operator, that the transmission of the IP to Google was not necessary because local self-hosting was possible, and that the plaintiff's right to informational self-determination was violated. https://dejure.org/dienste/vernetzung/rechtsprechung?Text=3+O+17493/20 · https://www.dr-datenschutz.de/schadensersatz-urteil-google-fonts-und-die-dsgvo/ · https://www.ra-plutte.de/lg-muenchen-dynamische-einbindung-google-web-fonts-ist-dsgvo/

**Honest counterweight — and this genuinely cuts both ways.** The judgment triggered a mass warning-letter industry, and German courts pushed back hard on the *claimants*: LG Baden-Baden, 11.10.2022, 3 O 277/22 (injunction against a leading warning-letter lawyer); AG Ludwigsburg, 28.02.2023, 8 C 1361/22; LG München I, 30.04.2023, 4 O 13063/22 (negative declaratory action succeeded against a warning). The reasoning was **abuse of process** and the absence of compensable damage where the "victim" deliberately visited sites to trigger the transmission — **not** a reversal of the underlying finding that dynamic embedding without a legal basis is unlawful. https://www.datev-magazin.de/nachrichten-steuern-recht/recht/google-fonts-abmahnwelle-war-rechtsmissbraeuchlich-100338 · https://das-gruene-recht.de/lg-baden-baden-einstweilige-verfuegung-gegen-google-fonts-abmahner/

There is **no CJEU ruling and no EDPB position** on Google Fonts specifically. These are first-instance German decisions and are not binding anywhere else.

**Which is why the answer is not a legal argument, it's a one-line code change.** Replace the CSS `@import` with `next/font/google`, which downloads the font files at build time and self-hosts them from your own origin. It is fully compatible with `output: 'export'`, it eliminates the third-party request entirely, and it removes a render-blocking round-trip so the page gets faster. There is no scenario in which hotlinking is the right call. Do it this week.

*(Note the recursive irony: the US Government's own Data Privacy Framework site hotlinks `fonts.googleapis.com`. Not a defence.)*

### 9.4 Calendly

**Keep it as a link. Do not embed the widget.**

- **As a link** (current state): nothing third-party executes on `talentsync.eu`. No Art 5(3) event. No consent needed. The visitor who clicks travels to Calendly and enters Calendly's own controller relationship for the booking, though you remain controller for the resulting meeting record in your own systems.
- **As an embed:** Calendly's JavaScript and cookies load in your page context → Art 5(3) consent required → you need a banner → you lose the no-banner position for a marginal UX gain.

**Transfers:** Calendly self-certifies to the **EU-U.S. Data Privacy Framework** and incorporates SCCs into its DPA as a further safeguard; it does not offer EU data residency. https://calendly.com/legal/data-processing-addendum · https://help.calendly.com/hc/en-us/articles/360007295834-Data-Storage-and-International-Data-Transfers. **I could not independently verify Calendly's entry on the official DPF list** — dataprivacyframework.gov is a JavaScript-only application and both the page fetch and the participant APIs failed. Verify manually before relying on it in the notice. Flagged in §11.

Also: the mailto and tel links are inert — no third-party code, no consent issue. The `mailto:` application route is quietly your best compliance asset (§3.3): the candidate self-submits, so no Chapter V transfer arises.

### 9.5 The minimal compliant setup for a site with no forms

After self-hosting the fonts, this is your position:

| Element | Status | Consent? |
|---|---|---|
| Self-hosted fonts | first-party | no |
| No analytics | — | no |
| Calendly as link | no embedded code | no |
| mailto / tel | inert | no |
| nginx access logs | first-party, security purpose | no (GDPR notice only) |

**→ No cookie banner required.** State it affirmatively on a short `/cookies/` page: *"This website uses no cookies, no analytics and no third-party tracking. Fonts are served from our own servers. Our web server keeps standard access logs, including IP addresses, for security, for 30 days."* That page is a marketing asset for a buyer persona (CTOs) that notices these things.

**Guard the position.** The next person who adds a chat widget, a LinkedIn Insight tag, a YouTube embed, a hosted form or a heatmap tool destroys it and creates an Art 3(2)(b) monitoring trigger in two jurisdictions. Put it in the repo README.

---

## 10. Repo-level actions implied by all of the above

Ordered by ratio of risk removed to work required.

1. **Self-host the fonts.** `src/app/globals.css` → remove the `fonts.googleapis.com` `@import`; use `next/font/google` in `src/app/layout.tsx`. Removes the §9.3 exposure and speeds up first paint. (~10 lines.)
2. **Add `/privacy/` and `/cookies/` routes.** Two new folders under `src/app/`, static export handles them. The privacy notice is legally mandatory — Art 13/14, and it is the only place the Art 27 representative's identity can live.
3. **Link the notice from three places:** the footer, immediately adjacent to every Careers "Apply" `mailto:` button (that's the Art 13 collection moment), and next to the Calendly CTA.
4. **Put the Art 14 footer in every outreach template.** Not a repo change, but the highest-value single action in this brief. This is the obligation you are most likely breaching right now.
5. **Get the EU representative appointed** (Romania) and put the name and address in the notice before publishing it. Publishing a notice that omits the representative is worse than no notice — it documents the omission.
6. **Check the Railway region and get a DPA with Railway.** nginx access logs contain EU visitors' IPs; you are controller, Railway is processor. If the region is US, that is an Art 28 + Chapter V matter (Art 46 SCCs, or DPF if applicable).
7. **Set log retention to 30 days** in the nginx/Railway config, and state it on `/cookies/`.
8. **Add a note to the repo README:** "This site intentionally loads zero third-party resources. Adding analytics, embeds, fonts CDNs, chat widgets or hosted forms triggers cookie-consent and GDPR Art 3(2)(b) monitoring obligations. Talk to [privacy contact] first."
9. **Non-privacy but adjacent:** the nginx `try_files … /index.html` soft-404 means every unknown URL returns HTTP 200 with the homepage. That is an SEO problem rather than a privacy one, but it also means `/privacy/` will appear to "work" even if the route fails to build. Verify the pages actually render after adding them.

---

## 11. Where sources disagree, and what I could not verify

Stated plainly, because acting on any of these without checking would be a mistake.

1. **Dutch DPA vs. the CJEU on commercial interest.** The AP's 2024 scraping guidance says purely commercial interests cannot be legitimate interests; **CJEU C-621/22 (4 Oct 2024) holds the opposite**. Unreconciled. My reading — that the AP's specific prohibitions survive on balancing grounds even though its legal premise does not — is analysis, not authority.
2. **Google Fonts.** LG München I (2022) found for the claimant; LG Baden-Baden (2022), AG Ludwigsburg (2023) and LG München I (2023) found against the *warning-letter industry* on abuse-of-process and damages grounds. No appellate, CJEU or EDPB authority either way. First-instance German law only. My recommendation rests on the change being trivial, not on the case law being settled.
3. **DLA Piper's Moldova country page is stale.** As fetched on 30 Aug 2026 it still describes Law 133/2011 as "currently in force". Law 195 commenced 23 Aug 2026. I used it only for the pre-2022 registration-abolition fact and the historical DPO position; everything current comes from the statute itself.
4. **Art 3(2)-importer SCCs: adoption not confirmed.** The Commission page still lists only the 4 June 2021 set and describes the Art 3(2) set as in development, with no date. A Q2-2025 target and a Q4-2024 consultation were announced. I could not establish whether anything has since been adopted. Re-check before finalising client contract templates.
5. **Calendly's DPF listing not independently verified.** dataprivacyframework.gov is JS-rendered; the page fetch and two API endpoints all failed. The certification claim comes from Calendly's own documentation. Verify on the official list before citing it in the notice.
6. **UK "data bridge" status for Moldova not verified.** I could not confirm whether the UK recognises Moldova. Assume not; assume IDTA/UK Addendum plus a TRA for any UK client export.
7. **Moldovan civil limitation period not verified.** The retention justification for placed-candidate records depends on the general limitation period under the Moldovan Civil Code. Confirm with Moldovan counsel — it drives one row of the retention schedule.
8. **CNPDCP implementing acts.** Art 89(3) required the Centre to approve normative acts before commencement. The site homepage announces a launch video for the new law but the excerpt I could retrieve showed no list of adopted implementing acts, no Centre-approved standard clauses, and no adequacy list. Check https://datepersonale.md/en/ directly — this affects whether Moldova-specific standard clauses exist as an alternative to the EU forms under Art 46(2)(c).
9. **Moldova's Convention 108+ ratification date (15 May 2026, 34th state).** From the Council of Europe news page, retrieved via search summary; my direct fetch of coe.int returned HTTP 403. High confidence but not read first-hand.
10. **"Persistent talent-pool monitoring" as Art 3(2)(b) monitoring.** My assessment that periodic re-checking of candidate profiles may cross into "monitoring" is inference from EDPB Guidelines 3/2018, not a regulator statement. No authority on point.
11. **ICO recruitment guidance is UK law.** I have used it as the most detailed recruitment-specific controller/processor analysis available in Europe and it tracks EDPB 07/2020 reasoning, but it is persuasive rather than binding for EU processing. On automated decision-making specifically, parts of it predate the DUAA's 5 Feb 2026 changes.
12. **MDL/EUR conversion.** I deliberately did not convert the MDL 1m/2m fine caps to euros — I had no verified rate. Convert at the current NBM rate if the figure is needed for a board paper.

---

## Sources

**Moldova**
- [Law No. 195/2024 on personal data protection — full English text (CNPDCP)](https://datepersonale.md/wp-content/uploads/2024/09/Law-no.-195-2024-on-personal-data-protection-1.pdf)
- [Law 195/2024 — Romanian consolidated text (legis.md)](https://www.legis.md/cautare/getResults?doc_id=144681&lang=ro)
- [Ministry of Justice — announcement on the new law](https://justice.gov.md/ro/content/noua-lege-privind-protectia-datelor-cu-caracter-personal-reprezinta-un-pas-esential)
- [Radio Moldova — new framework in force; CNPDCP director interview](https://radiomoldova.md/p/83701)
- [CNPDCP official site](https://datepersonale.md/en/)
- [Council of Europe — Moldova is the 34th state to ratify Convention 108+](https://www.coe.int/en/web/data-protection/-/republic-of-moldova-becomes-the-34th-state-to-ratify-the-convention-108-)
- [DLA Piper — Moldova country page (stale; historical points only)](https://www.dlapiperdataprotection.com/?t=law&c=MD)

**EU — scope, transfers, bases**
- [EDPB Guidelines 3/2018 on territorial scope (Art 3)](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf)
- [EDPB Guidelines 05/2021 — interplay of Art 3 and Chapter V](https://edpb.europa.eu/system/files/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf)
- [EDPB Guidelines 07/2020 — controller and processor](https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf)
- [EDPB Guidelines 1/2024 — Art 6(1)(f) legitimate interests](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf)
- [EDPB Guidelines 2/2023 — technical scope of Art 5(3) ePrivacy](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)
- [European Commission — adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)
- [European Commission — standard contractual clauses](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en)
- [GDPR consolidated text (EUR-Lex) — Arts 10, 14(5), 22](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02016R0679-20160504)
- [Bird & Bird — Dutch DPA €525,000 Art 27 fine (Locatefamily.com)](https://www.twobirds.com/en/insights/2021/netherlands/finding-locatefamily-com-dutch-dpa-imposes-525000-euro-fine-for-not-having-a-gdpr-representative) · [GDPRhub case record](https://gdprhub.eu/index.php?section=1&title=AP_-_locatefamily.com)

**Recruitment-specific regulator guidance**
- [ICO — Responsibility for data protection compliance during recruitment](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/responsibility-for-data-protection-compliance-during-the-recruitment-process/)
- [ICO — Finding candidates](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/finding-candidates/)
- [ICO — Keeping recruitment records](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/keeping-recruitment-records/)
- [ICO — Automated decision-making and profiling for recruitment](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/automated-decision-making-and-profiling-for-recruitment-and-selection/)
- [CNIL — 2026 priority investigations: recruitment (3 April 2026)](https://www.cnil.fr/fr/controles-prioritaires-2026)
- [CNIL — recruitment and personal data in SMEs](https://www.cnil.fr/fr/recrutement-et-donnees-personnelles-dans-les-tpepme-cinq-questions-incontournables-se-poser)
- [Dr. Datenschutz — German retention periods for applicant records](https://www.dr-datenschutz.de/aufbewahrungsfrist-wann-sind-bewerbungen-zu-loeschen/) · [Haufe — Aufbewahrungsfristen von Bewerbungsunterlagen](https://www.haufe.de/personal/arbeitsrecht/aufbewahrungsfristen-von-bewerbungsunterlagen_76_625830.html)

**AI and automated decisions**
- [Regulation (EU) 2026/1744 — Digital Omnibus on AI (OJ, 24 July 2026)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AL_202601744)
- [Gibson Dunn — postponed high-risk deadlines](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
- [Bird & Bird — CJEU SCHUFA (C-634/21): preparatory acts as automated decisions](https://www.twobirds.com/en/insights/2023/global/key-takeaways-from-the-schufa-case-of-the-cjeu) · [Verfassungsblog — To Score Is to Decide](https://verfassungsblog.de/to-score-is-to-decide/) · [Industrial Law Journal — SCHUFA in the labour context](https://academic.oup.com/ilj/article/53/4/840/7745471)

**UK**
- [UK GDPR Article 27, current text (legislation.gov.uk, in force at 28 Aug 2026)](https://www.legislation.gov.uk/eur/2016/679/article/27)
- [Data (Use and Access) Act 2025, s.80 (Arts 22A–22D)](https://www.legislation.gov.uk/ukpga/2025/18/section/80) · [s.81](https://www.legislation.gov.uk/ukpga/2025/18/section/81)
- [Clifford Chance — DUAA key aspects take effect (Feb 2026)](https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html) · [DLA Piper — DUAA commencement](https://privacymatters.dlapiper.com/2026/02/uk-commencement-of-the-data-protection-provisions-in-the-data-use-and-access-act/)

**Scraping and cookies**
- [Hogan Lovells — Dutch DPA scraping guidelines](https://www.hoganlovells.com/en/publications/dutch-dpa-issues-guidelines-on-data-scraping_1) · [Pinsent Masons — Dutch web-scraping guidance](https://www.pinsentmasons.com/out-law/news/dutch-web-scraping-guidance-warn-businesses-gdpr-breach-risk)
- [LG München I, 20.01.2022, 3 O 17493/20 (dejure)](https://dejure.org/dienste/vernetzung/rechtsprechung?Text=3+O+17493/20) · [analysis](https://www.dr-datenschutz.de/schadensersatz-urteil-google-fonts-und-die-dsgvo/) · [Plutte](https://www.ra-plutte.de/lg-muenchen-dynamische-einbindung-google-web-fonts-ist-dsgvo/)
- [DATEV Magazin — Google Fonts warning campaign held abusive](https://www.datev-magazin.de/nachrichten-steuern-recht/recht/google-fonts-abmahnwelle-war-rechtsmissbraeuchlich-100338) · [LG Baden-Baden injunction](https://das-gruene-recht.de/lg-baden-baden-einstweilige-verfuegung-gegen-google-fonts-abmahner/)
- [Calendly DPA](https://calendly.com/legal/data-processing-addendum) · [Calendly international transfers](https://help.calendly.com/hc/en-us/articles/360007295834-Data-Storage-and-International-Data-Transfers)

---

*This is a research brief for internal decision-making, not legal advice. The Art 27 representative appointment, the client MSA transfer clauses, and the Moldovan limitation-period question should each be confirmed with qualified counsel in Moldova and in at least one EU Member State before the policy is published.*

---

## OPEN QUESTIONS (business decisions required)


1. Legal entity details: what is TalentSync's exact registered name, legal form (SRL?), IDNO/company number and registered address in Chisinau? The privacy notice must identify the controller precisely, and 'TalentSync' as a trading name is not enough.

2. Headcount: how many people does TalentSync employ or engage? This confirms the Law 195 Art 30(5) RoPA analysis and the Art 37 / GDPR Art 37 'large scale' DPO assessment. My conclusion (no DPO required) assumes a small team.

3. Candidate volume: roughly how many candidate records are held in total, and how many new candidates are sourced per month? 'Large scale' under WP243 turns on this, and it also drives whether a DPIA is needed under Art 35.

4. EU representative: has one been appointed? If not, who is the preferred provider and which Member State - Romania is my recommendation. The notice cannot be published without the representative's name and address.

5. UK exposure: do you currently have UK clients, and do you source UK-based candidates? Candidate sourcing in the UK triggers the Art 27 UK representative requirement; corporate clients alone probably do not.

6. Actual sourcing method: is candidate sourcing manual (a person browsing LinkedIn) or does any tool, scraper, browser extension, or purchased database feed the pipeline? The whole legitimate-interest analysis in section 5 assumes manual sourcing and changes materially if not.

7. AI tooling: is any AI or automated tool used to parse, score, rank, or filter CVs today - including ChatGPT used ad hoc to summarise or rank candidates? The 'we do not use automated decision-making' statement can only go in the notice if this is genuinely a no.

8. Client contracts: do existing client agreements contain any data protection terms, and has any client already asked TalentSync to sign a processor DPA or SCCs? If a processor DPA has been signed, it contradicts the independent-controller position and needs renegotiating.

9. Systems inventory: where does candidate data actually live - email inbox only, a spreadsheet, an ATS, a CRM? Each system is a processor relationship needing an Art 28 DPA, and any US-hosted system is a transfer needing SCCs or DPF.

10. Railway deployment region: which region serves the container, and is there a signed DPA with Railway? nginx access logs contain EU visitors' IP addresses and TalentSync is controller for them.

11. Retention today: is any candidate data currently deleted on a schedule, or has everything been kept since inception? An indefinite pool is the single most likely finding in a CNIL-style inspection and needs a remediation deletion run before the policy claims 24 months.

12. Outreach templates: do current LinkedIn InMails and cold emails contain any privacy information or link? If not, this is a live Art 14(3)(b) breach that should be fixed before anything else in this brief.

13. Hourly-collaboration model: are the engineers TalentSync's own employees, its contractors, or independently contracted by the client? This determines whether TalentSync is their employer-controller and whether the timesheet/billing flow is joint controllership.

14. Moldovan Civil Code limitation period for contract and fee claims - needed to justify the retention period for placed-candidate records. Requires local counsel confirmation.

15. Budget and appetite: is there budget for an EU representative (typically low four figures per year) and for Moldovan plus EU counsel to review the final policy? Several recommendations here assume yes.
