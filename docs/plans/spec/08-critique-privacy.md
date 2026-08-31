# Critique — verdict: **not-ready** (33 findings)


### [CRITICAL] Whole document — §1.1, §1.2, §1.3, §1.4, §4.2, §4.3, §4.4, §5.1, §6.5, §6.10, §8, §9.4, §10, §12.1, §14, §15, Annex A, Annex B

**Problem:** Twenty-plus unresolved {{PLACEHOLDER}} tokens, including the controller's legal name, IDNO, registered address, privacy email, the EU representative, and every retention period the policy calls 'hard'. Art 13(1)(a)/14(1)(a) require the controller's identity and contact details; Art 13(2)(a)/14(2)(a) require the period or the criteria. {{AI_SCREENING_POSITION}} appears as a literal unfilled token twice, sitting directly above the AI text in §6.8 and §14. A vendor-security reviewer stops reading at the first '{{' and a supervisory authority treats a notice with a blank controller as no notice at all.

**Fix:** Resolve every token to a literal value before anything ships, and delete the two {{AI_SCREENING_POSITION}} tokens outright (the prose beneath them already states the position). Minimum set to fill: legal entity name + IDNO + registered address from the Moldovan state register; privacy@talentsync.eu as a real, monitored mailbox (not victor@); EU representative block; LOG_RETENTION_DAYS = 30; MD_LIMITATION_PERIOD = 3 years (Civil Code general limitation) — verify; MD_ACCOUNTING_RETENTION = 5 years — verify against Legea contabilității; EMAIL_PROVIDER = Google Workspace or Microsoft 365, named; CANDIDATE_SYSTEM = the actual ATS or, if there is none, replace the row with 'a shared drive in our email provider's tenant'; RAILWAY_REGION = the deployed region string from Railway; PAYMENT_PROVIDER = the actual bank. If a value cannot be established today, delete the row rather than publish a token.


### [CRITICAL] Annex A (two links to https://talentsync.eu/privacy/), §13.3, §16, and the site itself

**Problem:** There is no /privacy/ route. src/app contains exactly one page and out/ contains only index.html. nginx.conf line 'try_files $uri $uri.html $uri/ /index.html;' means GET https://talentsync.eu/privacy/ returns HTTP 200 with the homepage — not a 404. So every Art 14 outreach email points a sourced engineer at a marketing page that looks deliberately served. Footer.tsx renders a mailto and five scroll buttons and no policy link, so a visitor cannot reach the notice at all. The entire Art 14 chain — first message, link, notice — terminates in a page that returns 200 and contains no privacy information. An SA that fetches the URL during a complaint gets the homepage and concludes the notice was never published.

**Fix:** Three changes, all small. (1) Create src/app/privacy/page.tsx — static export plus trailingSlash:true produces out/privacy/index.html, so /privacy/ resolves. (2) In Footer.tsx add, beside the mailto: <a href="/privacy/" className="text-sm text-text-secondary hover:text-primary transition-colors">Privacy Policy</a>. (3) Change nginx.conf to 'try_files $uri $uri.html $uri/ =404;' and add 'error_page 404 /404.html;' — out/404.html already exists. A wrong URL must fail loudly; a privacy notice that silently resolves to marketing copy is worse than a missing one. Send no outreach until GET https://talentsync.eu/privacy/ returns the policy text.


### [CRITICAL] §1.3 Our representative in the European Union

**Problem:** The section states as fact 'we have appointed a representative under Article 27 GDPR' and then gives {{EU_REP_NAME}}, {{EU_REP_ADDRESS}}, {{EU_REP_EMAIL}}. Asserting an appointment that has not happened is a false statement in a public notice, and it is the exact claim a candidate's complaint will test first. Art 27 is not optional here: sourcing EU-resident engineers is TalentSync's regular business, so the Art 27(2)(a) 'occasional' exemption fails at the first limb. The Art 14 notice in Annex A repeats the unfilled block, so every outreach email will carry it too.

**Fix:** Appoint before publishing. Replace the section with literal values: 'Under Article 27 GDPR we have appointed [Representative legal name], [street, postcode, city], [Member State], [email], as our representative in the European Union. Our written mandate under Article 27(1) is dated [date]. You may contact them, in [languages], about anything in this policy, instead of or as well as contacting us. Appointing a representative does not give us an establishment in the EU.' If the appointment is not signed on the day the notice goes live, delete §1.3 and the Annex A line entirely rather than publish the claim — the omission is a smaller breach than the false statement.


### [CRITICAL] §13.3 The full cookie policy

**Problem:** 'A dedicated cookie policy lives at https://talentsync.eu/cookies/, listing every cookie by name, purpose, provider, type and lifetime. Where this section and that page differ, that page is more detailed and more current.' No such page exists, and because of the nginx fallback it returns HTTP 200 with the homepage. The policy also subordinates itself to a document that does not exist, so on its own terms the authoritative cookie disclosure is a marketing page. This is a false statement of fact about a compliance document — the single most quotable line in the draft for a complainant.

**Fix:** Delete §13.3 in full. Replace with: 'This section is our complete cookie disclosure. There is no separate cookie policy, because there are no cookies to list. If that ever changes, this section changes with it before anything is set on your device.'


### [CRITICAL] §4.2 (second table row) and §4.3 Google Fonts — an honest note

**Problem:** Verified in the build: out/_next/static/chunks/1d0c9801f559a159.css begins '@import "https://fonts.googleapis.com/css2?family=Montserrat..."'. Every EU visitor's IP goes to Google on every page load. The §4.2 row's lawful-basis cell says 'See §4.3 — this is being removed' — i.e. the notice discloses a live processing operation with no lawful basis stated at all, breaching Art 13(1)(c). §4.3 then volunteers a written confession of an ongoing infringement (cf. LG München I, 3 O 17493/20) with the remediation date left as {{FONTS_SELF_HOSTED_DATE}}. Publishing an undated admission is handing a complainant the evidence and the timeline in one paragraph.

**Fix:** Fix the code first, then delete the disclosure. In src/app/globals.css remove line 1. In src/app/layout.tsx: import { Montserrat } from 'next/font/google'; const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap' }); then <html lang="en" className={montserrat.className}>. next/font downloads and self-hosts at build time and works with output:'export'. Verify with: grep -r googleapis out/ (must return nothing). Then delete §4.3 and the §4.2 Google Fonts row entirely, and add to §4.1: 'Your browser contacts no server other than talentsync.eu. No font CDN, no analytics, no chat widget, no embed, no pixel.' Fifteen minutes of work deletes a whole section and an admitted infringement.


### [CRITICAL] §4.4 Analytics, and the §2 audience table row for website visitors

**Problem:** §4.4 describes GA4, Search Console and Bing Webmaster Tools in configured detail — retention settings, consent architecture, recipients — for tools that do not exist, gated on {{ANALYTICS_LIVE_DATE}}. The §2 table tells visitors they are covered for 'server logs, and analytics if you consent'. §13.1 says the opposite: no cookies, nothing stored, nothing read. A privacy notice states what is processed, not what someone plans to procure; describing hypothetical processing in present tense is a transparency failure in both directions — it misinforms today's visitor and it will be stale the moment the plan changes.

**Fix:** Delete §4.4 in full. In the §2 table change the visitor row to 'We hold almost nothing about you: web-server access logs, deleted after 30 days.' Replace §13.2 with one forward-looking sentence: 'If we ever add analytics, a consent banner will appear before any identifier is set, rejecting will be exactly as easy as accepting, and this section will be rewritten before the code ships — not after.' Keep the no-cookie position in §13.1: it is a genuine competitive advantage and it is currently true (verified: no localStorage, sessionStorage or cookie API anywhere in src/).


### [CRITICAL] 'The short version', bullet 4

**Problem:** 'keep nothing longer than 24 months without contact' is contradicted four times in the body: the suppression list is indefinite (§6.5, §10); accounting records run to {{MD_ACCOUNTING_RETENTION}} (§5.1, §10); placement records run to engagement + {{MD_LIMITATION_PERIOD}} (§6.5); legal-claim records run until the claim ends (§6.5). A summary that overstates the promise is not a summary, it is a misrepresentation — and it is the paragraph a candidate quotes when they discover their placement record from 2027 still exists.

**Fix:** Replace bullet 4 with: 'keep candidate profiles no longer than 24 months from our last contact with you, and keep placement, invoicing and tax records for the longer periods the law requires — §10 lists every period we hold.' Add after the six bullets: 'Where this summary and §§4–17 differ, §§4–17 govern.'


### [CRITICAL] §6.1, consequence 2

**Problem:** 'We are not responsible for what a client does with your CV after we send it' is an attempted exclusion of liability, and it is void: Art 82(4) makes each joint controller liable for the entire damage arising from processing they jointly determine. It also contradicts consequence 3, two lines below, which says TalentSync and the client 'may be joint controllers' for the sharing. A supervisory authority reads the first clause as a controller trying to disclaim the thing it just admitted. It is also the only sentence in the draft that a candidate-side lawyer would screenshot.

**Fix:** Delete the sentence. Replace consequence 2 with: 'When we share your profile with a client, that client processes it as a controller for its own hiring process, under its own privacy notice. For the act of sharing we are joint controllers with that client. You may bring any request or claim to either of us: Article 82(4) makes each of us liable for the whole of any damage caused, and nothing in our contracts with clients changes that. We choose which clients we send profiles to, and we name the client and ask you before we send anything.'


### [HIGH] §6.4 (Art 14 commitment) and Annex A.3 rule 6

**Problem:** The notice fires 'at first contact' — correct for engineers who are contacted. It has no answer for engineers who are sourced, recorded, and then not contacted: for them Art 14(3)(a) requires notice within one month of obtaining the data, and Annex A.3 rule 6 expressly renounces the Art 14(5)(b) disproportionate-effort derogation ('Do not use the disproportionate effort exemption'). The draft therefore creates a cohort with a hard, self-acknowledged, unmeetable obligation. It also fails to address candidates already in the pool on publication day: 'Every time. No exceptions, and no "we'll send the policy later"' is stated as historical fact about a practice that starts today.

**Fix:** Add to §6.4 after the Article 14 commitment box: 'We do not keep profiles of people we have not written to. If we record a profile while searching and then decide not to approach you, we delete it within 30 days, and you will never hear from us.' Then enforce it — no long-list held past 30 days. Separately, add to §16: 'Every engineer whose data we held on [publication date] was sent this notice by email on [date]. Before that date our sourcing practice was not documented to this standard; this policy describes what we do from [publication date] onward.' And send that sweep. A truthful start date is defensible; a false 'always' is not.


### [HIGH] §9.3 A note on the mechanism, for lawyers; Annex B row 1

**Problem:** The draft correctly spots that the 2021 SCCs were built for importers not subject to the GDPR, then says 'we sign the 2021 clauses, Module 1, because they are the instrument that exists' and 'the Commission … has not, as far as we can establish, adopted them'. Two problems. First, the Commission's own Q&A and EDPB Opinion 14/2021 state the 2021 SCCs cannot be used where the importer is already subject to the GDPR under Art 3(2) — so the published position is 'we sign an instrument the regulator says does not apply', which client counsel will reject in diligence and which reads as unadvised. Second, 'as far as we can establish' is hedging that does not belong in a published legal notice; it tells the reader nobody checked.

**Fix:** Remove §9.3 from the public notice entirely (candidates do not need it) and put this in Annex B / the DPA instead: 'Where an EEA or UK client sends us personal data, the client is the exporter. We sign the client's preferred instrument — the 2021 EU SCCs (Module One), the UK IDTA, or the UK Addendum — and, because we are directly subject to the GDPR under Article 3(2), we additionally warrant direct GDPR compliance in the services agreement, which is the substantive protection Chapter V is there to secure. We will re-paper if and when the Commission adopts clauses for importers already subject to the GDPR.' Delete 'as far as we can establish' wherever it appears.


### [HIGH] §9.2, rows 5 and 6 (Moldova → EEA; Moldova → non-EEA)

**Problem:** Two unverified assertions about Moldovan law stated as settled: 'Moldova to the EEA is expressly outside the transfer chapter of Moldovan law, and needs no authorisation', and 'EU SCCs, which Moldovan law accepts without any authorisation from the Centre'. The drafter's own brief flags 'two Moldova-specific twists' in Law 195 Arts 44–49 and never spells them out. Publishing a categorical 'no authorisation required' about a statute that came into force seven days earlier, without reading Arts 44–49, is precisely the assertion that turns a technical breach into a bad-faith one. The rows also conflate direction: a UK client is an exporter under UK law, while a profile sent to a UK client is an export under Moldovan law — the table treats 'UK' as one flow.

**Fix:** Read Law 195 Arts 44–49 (English text is on datepersonale.md) before publishing either sentence. Until then, replace both rows with text that claims nothing about authorisation: 'Moldova → EEA client: the GDPR applies to us directly under Article 3(2) and continues to govern the profile after we send it; the client agreement records that.' / 'Moldova → client outside the EEA (including the UK): EU Standard Contractual Clauses, Module One, in the client agreement, plus our direct GDPR obligations.' Split the UK into its own row for each direction.


### [HIGH] §4.5 Calendly, and the Calendly row in §8

**Problem:** The two passages characterise Calendly incompatibly. §4.5: Calendly processes booking data 'under its own privacy policy and as its own controller', and directs the data subject there. §8: 'Separate controller for the booking; our processor for the resulting record.' Both cannot be right, and §4.5 is the one that harms the data subject: it sends someone who booked a call with TalentSync to Calendly to exercise rights over data TalentSync determined the purpose of. Under Calendly's own DPA, Calendly is the processor for invitee data submitted through a member's scheduling page. The §8 row also carries {{CALENDLY_DPF_VERIFIED}}, i.e. nobody checked the DPF list.

**Fix:** Replace §4.5 paragraph 2 with: 'We are the controller of your booking. Calendly Inc. processes your name, email address, chosen time and any note you add on our behalf, as our processor under its data processing addendum. Calendly is a separate controller only for its own operation of the platform, described in its own privacy notice. Exercise your rights over the booking with us — you do not need to contact Calendly.' In §8 set the row to 'Processor. Art 28 DPA; EU SCCs and/or DPF certification; United States' and check Calendly's current entry on dataprivacyframework.gov before publishing, replacing {{CALENDLY_DPF_VERIFIED}} with the verification date.


### [HIGH] §8 Who receives your data

**Problem:** The recipients table is the section a vendor-security reviewer reads first, and three of its rows are placeholders ({{EMAIL_PROVIDER}}, {{CANDIDATE_SYSTEM}}, {{PAYMENT_PROVIDER}}) plus {{RAILWAY_REGION}} and {{CANDIDATE_SYSTEM_LOCATION}}. It omits Railway's underlying cloud provider and region, which is the actual location of the visitor logs and the answer to the transfer question the table claims to settle. It merges Google Fonts, Analytics and Search Console into one row — one live processing and two that do not exist. And it omits every messaging channel Moldovan recruitment actually runs on: if any outreach or candidate conversation happens on WhatsApp or Telegram, Meta is a recipient of candidate contact data and is not listed. Annex A.3 rule 4 even bans those channels, which means either the table is incomplete or the SOP is already broken.

**Fix:** Name every recipient literally, one row each: the email/calendar provider; the ATS or, if none exists, say so; Railway plus its upstream ('Railway Corp., United States; workloads deployed in [region] on [Google Cloud/AWS]'); the bank; the accountant's firm. Split the Google row so only the live processing appears. Add a row for any messaging platform actually used, or state in §6.4: 'We contact engineers only by email and LinkedIn. We do not use WhatsApp, Telegram or SMS for candidate outreach.' Whichever you write, it has to match what Victor did last week.


### [HIGH] §11 Security, §6.4 (written LIA), §10 (diarised check-in), Annex B (ten documents)

**Problem:** The draft makes at least eight claims that must be evidenced on day one and, judging by the unchosen ATS in §8, are not: a maintained Art 30 RoPA; a written LIA available on request; 'Every provider that handles personal data for us is under a written Article 28 processing agreement'; MFA on every account; access removed the day someone leaves; a diarised 22-month check-in and hard delete at 24; a signed Art 26 allocation in 'every client agreement we sign'; and ten documents supplied 'without argument'. Each is falsifiable by a single email. A candidate who writes 'please send me your legitimate-interests assessment' on day two and gets silence has a documented breach of a published commitment plus an Art 5(2) accountability failure — self-inflicted, from a sentence nobody had to write.

**Fix:** Build the cheap ones before publishing: a one-tab RoPA spreadsheet (two hours), a two-page LIA for public-profile sourcing (one hour), and executed DPAs for the three processors that actually exist. For anything not in place on publication day, delete the sentence — an absent claim is not a breach. Soften two overreaches regardless: 'Every account that can reach personal data requires multi-factor authentication' and 'The providers listed in §8 are each under a written Article 28 agreement' (a closed, checkable list rather than a universal quantifier).


### [HIGH] §6.11 If you want us to stop; §12 objection row

**Problem:** 'We will remove you from all sourcing and outreach within five working days' publishes a five-day grace period for something Art 21(3) requires immediately — for direct marketing the controller 'shall no longer process' the data on objection, with no balancing and no window. The draft's own §12 says the marketing objection is 'Absolute. No balancing, no argument, no delay', and §6.11 closes with 'If you ask us to stop, we stop.' Three statements, three different standards, in one document. The five-day version is the one a complainant will quote, because it is the one that permits a fourth follow-up email on day three.

**Fix:** Replace with: 'We stop immediately. In practice: we remove you from every live search and cancel every scheduled message on the day we read your request, and we confirm in writing within five working days. We do not send a final follow-up, and we do not ask why.' Keep five days only as the confirmation deadline, never as the stopping deadline.


### [HIGH] §12 Your rights (table row 'Objection')

**Problem:** Art 21(4) requires that the right to object be 'brought explicitly to the attention of the data subject and shall be presented clearly and separately from any other information', at the latest at the time of first communication. The draft buries it as row six of a ten-row table, formatted identically to portability. Annex A handles it properly; the policy itself does not — and for a business whose core lawful basis is Art 6(1)(f), this is the rights failure a regulator specifically looks for.

**Fix:** Insert before the §12 rights table, in a bordered callout, its own heading: '### Your right to object — read this one first\n\nEverything we do with candidate data rests on legitimate interests. That means you can object at any time, and you do not need a reason. Reply "remove me" to any message from us, or write to privacy@talentsync.eu. For sourcing, outreach and the talent pool we will not argue the point — we stop, and we add a one-way hash of your details to a suppression list so we never approach you again. Articles 21 GDPR and 21 of Law No. 195/2024.' Then leave the table for the other rights.


### [HIGH] §6.5 (suppression row), §10 (suppression row), Annex A.1 (rights paragraph)

**Problem:** Three descriptions of the same indefinite record, none matching. §6.5: 'A hash of your email address and your public profile URL' — grammatically the URL is stored in clear. §10: 'hashed email plus profile URL only'. Annex A: 'a minimal, hashed record'. A plaintext LinkedIn URL retained indefinitely for a person who asked to be erased is exactly the finding a CNIL-style recruitment sweep writes up — and the CNIL made recruitment a priority theme in April 2026, with retention as one of three checkpoints. Indefinite retention also needs the erasure-refusal to be explainable, which an inconsistent description prevents.

**Fix:** Use one sentence in all three places, verbatim: 'We keep a one-way (SHA-256) hash of your email address and a one-way hash of your profile URL, and nothing else — no name, no employer, no notes, no history. We cannot reverse either hash. It exists only so an automated check can stop us contacting you again, which is why we keep it indefinitely; deleting it would mean re-sourcing you next quarter. Ask us and we will confirm whether you are on it.' Then make the implementation match — hash both fields.


### [HIGH] §5.1 (case study row) versus the live site

**Problem:** src/data/content.ts publishes three testimonials with first name, job title, employer and a photograph: 'Adrian, CTO, Barça Mobile' (/images/testimonial-adrian-barca.jpeg), 'Ulrich, CEO & Founder, Qualiwise', 'Tom, CEO & Founder, Entail AI'. These are live today. The §5.1 row covers 'a named individual's quote or title' and never mentions photographs — a facial image is a more intrusive processing than a quote, and it is the one currently published. The policy therefore under-describes the site's most visible personal-data processing, and it asserts a consent basis for consent that must already exist in writing for three identifiable people.

**Fix:** Amend the §5.1 row to: 'Publishing a testimonial or case study — the individual's first name, job title, employer and photograph. Basis: consent, Art 6(1)(a), obtained in writing before publication. Withdraw at any time by emailing privacy@talentsync.eu; we remove the testimonial at the next deployment and in any event within 10 working days. Currently published: three testimonials with photographs, listed on our homepage.' Before publishing the policy, get written consent on file from all three individuals — the images are already live, so the consent record is either dated earlier or it is missing.


### [MEDIUM] §4.1 What talentsync.eu actually does

**Problem:** 'A LinkedIn link to our company page' is false. siteConfig.linkedin exists in src/data/content.ts but is rendered nowhere — grep across src/ returns only the definition. The section opens by promising accuracy ('most privacy policies describe a website the company does not have') and then describes a link the website does not have. A reviewer who checks one factual claim in this policy will check this one, because it takes four seconds.

**Fix:** Either delete 'A LinkedIn link to our company page' from §4.1, or render the link in Footer.tsx and keep the sentence. Deleting is the smaller diff. While there, delete the meta-commentary sentence too — the accuracy should be visible, not announced.


### [MEDIUM] Annex A.3 Internal rules for using this annex

**Problem:** Six internal operating rules published as public commitments ('The notice goes in the first message. Not the second… Never send an outreach message from a channel that cannot carry at least the short version… Honour it within five working days and never ask why'). Published internal SOPs convert an ordinary operational slip into a documented, self-evidenced breach of a public promise, and they are unenforceable against a two-person team running LinkedIn outreach at volume. Rule 4 also silently bans WhatsApp and Telegram outreach, which is how much of the Moldovan market actually works — so it is likely already false.

**Fix:** Delete A.3 from the published policy and keep it as an internal one-page SOP in the team drive. Replace with one public sentence in §6.4: 'Our first message to any engineer we sourced carries the notice in Annex A, with the actual platform and profile URL filled in.' That is the commitment; the rules for keeping it are nobody else's business.


### [MEDIUM] §11 (breach paragraph) and Annex B (breach notification terms row)

**Problem:** Two defects. (1) 'we notify the CNPDCP and the relevant EU supervisory authority' — singular. With no EU establishment there is no lead authority and no one-stop shop (the draft says so itself in §17.2), so notification is owed to every SA whose data subjects are affected. (2) Annex B publishes a contractual term — '24 hours to you, 72 hours to the regulator' — as a public commitment, and §6.9 repeats a 24-hour joint-controller notification. Publishing a fixed contractual SLA before the MSA is negotiated hands every client the term for free and creates public liability a two-person company cannot reliably meet at 2am on a Sunday.

**Fix:** Rewrite §11: 'If a personal data breach is likely to result in a risk to your rights, we notify the CNPDCP and each EU supervisory authority whose data subjects are affected — we have no EU main establishment, so there is no single lead authority — without undue delay and, where feasible, within 72 hours of becoming aware. Where the risk to you is high, we tell you directly, without undue delay, in plain language.' In Annex B replace the row with 'Breach notification terms — agreed in the services agreement; we commit to notify you without undue delay and in any event within 24 hours of becoming aware.' Delete the standalone 24-hour promise from §6.9 and let the contract carry it.


### [MEDIUM] §5.2, §6.1, Annex B (final paragraph)

**Problem:** Controller/processor characterisation is stated three ways. §6.1: independent controller for candidate data, unambiguous and correct. §5.2: 'Where we act on your documented instructions for a defined task, we act as your processor and we will sign a data processing agreement on Article 28 terms.' Annex B offers 'Module 2 plus an Article 28 DPA where you genuinely instruct us as a processor', then closes 'we will not sign a processor DPA'. A client's counsel reading all three concludes the position is negotiable, which is precisely what the closing paragraph is trying to prevent — and a documented inconsistency between contracts and the notice is the accountability failure the draft itself warns about.

**Fix:** State one boundary and repeat it identically in both places: 'We are an independent controller for all candidate data — sourcing, screening, the talent pool, and deciding which client sees which profile. We act as a processor for exactly one thing: personal data about your own staff that you send us for a defined task (an interview panel list, a hiring manager's calendar). We will sign an Article 28 DPA for that, and only that. We will not sign a DPA that describes candidate data as processed solely on your instructions, because it is not true and our published policy says so.'


### [MEDIUM] §3, paragraph 3

**Problem:** 'The UK relaxed its rules on automated decisions in February 2026' is an unsourced statutory claim with a specific month attached, in a document whose credibility rests on precision. It is also entirely unnecessary: the very next sentence says TalentSync did not take advantage of it. One wrong date discredits the eighteen legal statements around it.

**Fix:** Replace the sentence with: 'We build to the stricter of the EU and UK standards rather than tracking the divergence between them.' Delete the February 2026 reference.


### [MEDIUM] §2, 'One standard for everyone' paragraph

**Problem:** 'Our candidates and clients sit in the EU, the UK, Moldova and Ukraine.' Nothing supports Ukraine: the site's FAQ names 'Moldova, Romania, Ukraine, and Poland' as sourcing markets but no Ukrainian client or candidate appears anywhere in the repo or the business facts. If Ukrainian candidates are in fact sourced, Ukraine's own data protection law and the wartime martial-law derogations are unaddressed elsewhere in the policy; if they are not, the sentence is padding that invents a jurisdiction.

**Fix:** Replace with the list you can evidence: 'Our candidates are in Moldova, Romania, Poland and elsewhere in Eastern Europe; our clients are in the EU, the UK and internationally.' If Ukrainian candidates are genuinely sourced, add Ukraine to §3 with an actual position rather than a mention in §2.


### [MEDIUM] §1.4 Our representative in the United Kingdom

**Problem:** The section is {{UK_REPRESENTATIVE_BLOCK}} followed by an italic paragraph explaining the decision logic ('If we source candidates in the UK… If our only UK connection is corporate clients…'). Publishing an internal decision tree instead of a decision is the clearest possible signal to a vendor reviewer that the document is a template that was never finished. The question is answerable from the facts already in hand: the sourcing markets are Moldova, Romania, Ukraine and Poland, not the UK.

**Fix:** Decide and state it: 'We do not source candidates in the United Kingdom and we place no tracking technology on our website, so we are not required to appoint a UK representative under Article 27 UK GDPR. Our only UK connection is corporate clients. If we begin sourcing UK-based engineers, we will appoint a UK representative and publish their details here before the first approach.' Delete the italic explanation.


### [MEDIUM] §6.8 We do not screen you with AI, versus §14 Automated decision-making and AI

**Problem:** The same position is stated twice at length, both sections opening with the identical unfilled {{AI_SCREENING_POSITION}} token, with overlapping lists and near-identical future-change commitments. Duplication in a compliance document means two places to update and one that will go stale, and a reader who spots the same paragraph twice discounts the rest.

**Fix:** Delete §6.8 entirely. Replace it with one line in §6.5's table intro: 'We use no AI screening, scoring or ranking at any stage — see §14.' Keep §14 as the single statement, and delete its {{AI_SCREENING_POSITION}} token.


### [MEDIUM] §7 (job applicants) and §5.1 (contract row)

**Problem:** Art 13(2)(e) requires the notice to say whether providing the data is a statutory or contractual requirement or necessary to enter a contract, and the consequences of not providing it. Nothing in the draft says this. It matters most in §7, where an applicant emails a CV — is anything mandatory? — and in §5.1, where a client signatory's details are needed to contract.

**Fix:** Add to §7: 'You choose what to send us. We need at least your name, a contact address, and enough of your work history to assess the role — without those we cannot consider your application. Everything else is optional and we will not ask for it.' Add to the §5.1 contract row: 'Providing signatory and billing details is a contractual requirement; without them we cannot enter into or invoice under an agreement.'


### [MEDIUM] Annex B — What a client can ask us for

**Problem:** This is a procurement and sales document living inside a privacy notice a candidate is directed to from a cold outreach email. It commits TalentSync publicly to supplying ten documents 'without argument or an NDA fight' — a phrase that reads as combative to the exact CTO buyer it is aimed at — and it argues a legal point at the client ('you have inherited the exposure'), which is a sales argument, not a transparency obligation. It also inflates the notice by roughly a fifth.

**Fix:** Move Annex B to a separate /trust/ page or a one-page PDF sent on request, linked from §5.3 as 'Clients: our diligence pack is at https://talentsync.eu/trust/ — SCCs, DPA, RoPA extract, security summary, LIA.' Delete 'without argument or an NDA fight'. Keep the automated-decision-making argument, but move it into the sales conversation where it belongs.


### [MEDIUM] Whole document — length and register

**Problem:** Roughly 7,000 words, 17 sections and 3 annexes for a single-page brochure site with no forms, no accounts, no database and no cookies. The register slips repeatedly into blog voice: 'most privacy policies describe a website the company does not have', 'it tells us nothing about whether you can write good Go', 'anyone who tells you otherwise is selling something', 'we will not threaten you', and a §9.3 headed 'for lawyers'. §1.2 spends three paragraphs justifying the absence of a DPO, which a buyer reads as defensiveness about a gap. The target reader — a CTO doing five minutes of diligence — concludes either that the company outsourced a template or that a two-person recruiter has more compliance theatre than operations.

**Fix:** Cut the notice to roughly 2,500 words: delete §4.3 (after fixing the font), §4.4, §6.8, §9.3, §13.3 and Annex A.3; move Annex B to /trust/. Reduce §1.2 to two sentences: 'We are not required to appoint a Data Protection Officer and have not designated one. Privacy questions, rights requests and complaints go to [name] at privacy@talentsync.eu, who answers them personally.' Delete the four editorialising sentences named above. The substance survives intact; what goes is the performance of candour, which is not the same thing as candour.


### [LOW] §6.4 versus Annex A.1 (retention of unanswered outreach)

**Problem:** §6.4 says 'we delete what we hold about you six months after we sourced it'; Annex A.1 says 'we delete everything we hold about you six months from today'. If a profile is recorded on the 1st and the email goes out on the 20th, the two clocks differ by nineteen days. Trivial in isolation, but it is the kind of internal inconsistency a complaint handler lists to show the retention schedule is not actually operated.

**Fix:** Use one trigger everywhere: 'six months from the date of the message in which we first contacted you'. Update §6.4, the §6.5 sourcing row, §10 and Annex A.1 to that exact wording.


### [LOW] §15 Children

**Problem:** 'We do not knowingly collect personal data from anyone under 16' imports an Art 8 information-society-services framing that has nothing to do with a recruitment intermediary — Art 8 governs consent for online services offered directly to children, and the age varies from 13 to 16 by Member State. The real boundary here is working age, and the paragraph is padding.

**Fix:** Replace the section with one line: 'We recruit working professionals. We do not knowingly hold data about anyone below working age, and if you believe a child's data has reached us, write to privacy@talentsync.eu and we will delete it.'


### [LOW] §4.1 / §6 — channels not disclosed

**Problem:** The site publishes tel:+373 68 300 700, and screening happens on calls (§6.5: 'a conversation, a technical discussion'). The notice never says whether calls are recorded — the first question a candidate asks about a screening call, and a disclosure obligation if the answer is yes. Nothing addresses call notes being taken either, though §6.3 does mention 'our notes from conversations'.

**Fix:** Add to §6.3, after the collection list: 'We do not record calls. We take written notes during screening conversations, and you can ask to see them at any time under §12.' If calls are ever recorded, that sentence changes before the first recording, and consent or a stated legitimate interest goes with it.


### [LOW] Publication language

**Problem:** The notice is English-only, while data subjects include Moldovan residents (whose supervisory authority operates in Romanian) and Romanian and Polish engineers. Art 12(1) requires information in clear and plain language, which does not compel translation — but a Moldovan-law notice to Moldovan data subjects available only in English is a soft target in a CNPDCP complaint, and the Annex A outreach template will be read by people whose working language is not English.

**Fix:** Publish a Romanian version at /confidentialitate/ and link both from the footer and from Annex A ('Această politică este disponibilă și în limba română: https://talentsync.eu/confidentialitate/'). Verify the exact Romanian-language requirement in Law 195 and Moldovan consumer-information rules before deciding whether it is optional.
