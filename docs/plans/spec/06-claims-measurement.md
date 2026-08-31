# TalentSync — Claim Audit + Measurement & Off-Site Authority Plan

Prepared against the live repo (`talentsync-web`, commit `cc04769`). Every location below was verified by reading the file, not inferred.

---

# PART 1 — CLAIM AUDIT

## 1.1 Which law actually applies here

Two different regimes, because the site has two audiences:

| Audience | Instrument | The operative bit |
|---|---|---|
| Clients (CTOs, founders) — B2B | **Directive 2006/114/EC** on misleading and comparative advertising | **Art. 7**: courts and administrative authorities must be able to *"require the advertiser to furnish evidence as to the accuracy of factual claims in advertising"*. Art. 3 lists what makes advertising misleading, including claims about price and the nature/attributes of the service. |
| Candidates (the Careers section, the mailto-your-CV flow) — B2C | **Directive 2005/29/EC** (Unfair Commercial Practices Directive), as amended by **Directive (EU) 2019/2161** | **Art. 6** misleading actions, **Art. 7** misleading omissions, and **Art. 12 "Courts and administrative authorities: substantiation of claims"** — same evidence power, plus: if the evidence is not furnished or is insufficient, the factual claim **may be deemed inaccurate**. **Annex I no. 23b** bans stating that reviews come from people who actually used the service without reasonable and proportionate steps to check that; **no. 23c** bans submitting or commissioning false reviews or endorsements, or misrepresenting them. |

Three practical consequences:

1. **The burden is inverted.** You do not get to make a claim until challenged. The authority can demand the file, and absence of the file is treated as the claim being false. "We know it's true" is not a defence — hence the evidence ledger in §1.4.
2. **B2B is not a safe harbour.** Several target markets extend UCPD-grade standards to business customers in national law (Germany's UWG is the obvious one, and TalentSync is selling into DE/NL/AT/CH). Assume the stricter standard everywhere.
3. **"Up to" claims have a specific test.** The Commission's UCPD guidance (Commission Notice 2021/C 526/01) treats an "up to X%" claim as misleading unless the maximum is genuinely achievable by a significant proportion of customers under realistic conditions. "Save up to 60%" against an undefined baseline — which country, which seniority, gross salary or fully-loaded cost of employment? — has no defensible baseline at all. That is the single weakest claim on the site.

*Not legal advice. Have EU/Moldovan counsel read the rate and savings language before it ships.*

## 1.2 The audit table

| # | Current claim | Exact location | Risk | Verdict | Exact replacement copy |
|---|---|---|---|---|---|
| 1 | "Save up to 60% on hiring costs while maintaining top-tier technical excellence and cultural alignment with your team." | `src/data/content.ts` → `services[1].description` (line 32; card title `services[1].title` = "Cost-Efficient Solutions") | **Legal** (unsubstantiated "up to" price-comparison claim, no baseline) + **positioning** (leads with cheap) | **Replace** (title too) | Title: `Lower Total Cost of Employment` — Description: `Reduce recruitment spend and the overhead of local employment — no local entity, no payroll or benefits administration, no notice-period exposure — while working with senior Eastern European engineers at competitive market rates.` |
| 2 | Stat tile: value `60%`, label `Cost Savings` | `src/components/sections/About.tsx` → `stats[1]` (line 9) | **Legal** (same claim, stated as a bare fact with no "up to" and no context — worse than #1) + **positioning** (a discount badge on a premium page) | **Replace the tile** | `{ icon: HiOutlineUserGroup, value: '{{ENGINEERS_PLACED}}', label: 'Engineers placed with European product teams' }` |
| 3 | "We deliver exceptional quality at competitive rates — helping you save up to 60% on hiring costs while maintaining top-tier technical excellence and cultural alignment with your team." | `src/components/sections/About.tsx`, body paragraph 2 (lines 60–64) | **Legal** (third instance of the same unsubstantiated claim) | **Replace** | `You keep control. We find and technically validate the engineer; you interview, you select, and you manage them inside your own team — without standing up a local entity, a payroll or a benefits scheme in another country.` |
| 4 | "Our clients typically save up to 60% on hiring costs while maintaining top-tier technical excellence. Our rates range from €15-35/hour depending on the role and seniority level." | `src/data/content.ts` → `faq[1].answer` (line 210); question `faq[1].question` = "How much can I save compared to Western European rates?" | **Legal** ("typically" + "up to" in one sentence is a contradiction a regulator will read as a maximum dressed as an average) + **commercial** (publishes the floor price) | **Replace question and answer** | Question: `How does your pricing compare to hiring locally in Western Europe?` — Answer: `Engaging an engineer through us removes the cost and administrative load of local employment: no local entity, no payroll or benefits administration, no notice-period exposure, and no separate recruitment agency fee. Rates depend on stack, seniority and engagement model, so we quote per role after a short scoping call — and we quote it against your fully-loaded local cost of employment, so you can compare like for like.` |
| 5 | "Transparent pricing from €15-35/hour — no hidden fees, no surprises. Quality talent at competitive rates." | `src/data/content.ts` → `process[3].description` (line 75; title `process[3].title` = "Cost-Effective Rates") | **Commercial** (a published €15 floor caps perceived seniority and attracts price shoppers you cannot serve profitably) + **legal** (a published price is a commitment; quoting €40 to a client who read €15–35 is precisely the Art. 3 / Art. 6 misleading-price scenario) | **Cut the number, keep the transparency promise** | Title: `Transparent Commercial Terms` — Description: `One agreed rate or fee per engagement, quoted in writing after we scope the role. No hidden margin, no placement surprises, no multi-year lock-in.` |
| 6 | Stat tile: value `1-2 weeks`, label `Time to Hire` | `src/components/sections/About.tsx` → `stats[2]` (line 10) | **Legal** (performance claim stated as a headline fact) + **commercial** (reads as an SLA; the first client you miss it for will quote it back at you) | **Replace with the part you actually control** | `{ icon: HiOutlineClock, value: '{{SHORTLIST_SLA}} days', label: 'From brief to vetted shortlist' }` |
| 7 | "We pride ourselves on speed. Many positions are filled within 1-2 weeks. For example, we placed a Senior Backend Python Developer for Qualiwise in just one week." | `src/data/content.ts` → `faq[3].answer` (line 218) | **Legal** ("many" is a weasel word that still needs a substantiated denominator) | **Qualify** — keep the named example, drop the unquantified general claim | `It depends on the role. For common stacks — React, Node, .NET, Python, Java — we typically present a vetted shortlist within {{SHORTLIST_SLA}} working days of an agreed brief; the total time to a signed start date is then driven by your interview schedule. Two examples from our own placements: a Senior Backend Python Developer for Qualiwise, signed one week after the brief, and three Fullstack React/.NET Developers for Silvertalent within two weeks. Niche and hard-to-source roles take longer, and we tell you that before you commit.` |
| 8 | "Full-time, part-time, contract, or project-based placements tailored to your exact business needs and timeline." | `src/data/content.ts` → `process[1].description` (line 63; title `process[1].title` = "Flexible Engagement") | **Positioning** (this is a general staffing shop's menu; "project-based" directly contradicts "we are not a project outsourcing company") | **Replace** | Title: `Two Engagement Models` — Description: `Either we source and technically validate an engineer for a direct long-term engagement that you own and manage, or the engineer joins your existing team and is billed hourly. In both cases you select the person and keep architecture, roadmap and day-to-day management.` |
| 9 | "We offer flexible engagement options: full-time, part-time, contract, or project-based placements. Everything is tailored to your exact business needs and timeline." | `src/data/content.ts` → `faq[4].answer` (line 222) | **Positioning** (same; this is the FAQ a CTO reads to work out whether you're an outsourcer) | **Replace** | `Two. (1) Direct B2B recruitment — we source, screen and technically validate the engineer for a long-term engagement; you select them and manage them directly, avoiding the cost and complexity of local employment. (2) Flexible hourly collaboration — the engineer joins your existing team and is billed hourly, with no local entity and no fixed headcount commitment. TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control — architecture, roadmap, priorities, processes and day-to-day management stay with you.` |
| 10 | "1.5M app downloads in first 3 months" | `src/data/content.ts` → `caseStudies[0].results[0]` (Barça Mobile) | **Legal** (attribution: presented under "Our Clients" as a TalentSync result when it is the client's product metric — misleading as to the nature and results of the service, Art. 3 of 2006/114/EC) + **third-party rights** (FC Barcelona brand) | **Replace** (or keep only as an explicitly attributed client figure, once confirmed in writing) | `Client-reported milestone: 1.5M app downloads in the app's first three months` — and only if `{{BARCA_CONTACT}}` confirms the figure by email. Otherwise cut the bullet entirely. |
| 11 | "Real-time platform for millions of global fans" | `src/data/content.ts` → `caseStudies[0].results[1]` | **Legal** (same attribution problem) + **positioning** (describes a product you did not build) | **Replace** | `{{N_BARCA}} engineers placed into the product team building the Barça Mobile platform` |
| 12 | "Led system architecture design and CI/CD implementation" | `src/data/content.ts` → `caseStudies[0].results[2]` | **Legal** — the strongest single overclaim on the site. A recruitment company saying it *led architecture* is a claim about the nature of the service (Art. 3(a)). It also actively damages the new positioning: an agency that "leads architecture" **is** an outsourcer. | **Replace** | `Roles filled included backend and DevOps engineers, working under the client's technical leadership on the client's architecture and roadmap` |
| 13 | "Led Orange Network integration with Barça Mobile MVNO" / "Mobile Virtual Network Operator infrastructure", presented under the heading "Our Clients" with the Orange logo | `src/data/content.ts` → `caseStudies[1].results[0]` and `[1]`; heading in `src/components/sections/CaseStudies.tsx` (line ~38: "Our **Clients**") | **Legal — highest severity on the page.** If Orange is not a contracting client, displaying its logo under "Our Clients" is a false statement about the trader's commercial connections and an implied endorsement, plus unlicensed trademark use. | **Replace, and re-frame the whole grid** | Bullets: `Engineers placed onto the MVNO integration between Barça Mobile and the Orange network` and `Telecom / MVNO domain experience: {{ROLES}}`. Grid heading: `Where our engineers work` — sub-head: `Companies and products our placed engineers have contributed to, in their clients' own teams.` If Orange has no direct contract with TalentSync, that heading change is what makes the tile lawful. |
| 14 | "Led technical development of their blog" (Entail AI); "Led software development, strategy and launch" (New Era Visionary Group); "Consulting on sweat equity strategy / Assisted in choosing best companies to invest in" (Pixelette) | `src/data/content.ts` → `caseStudies[2].results`, `caseStudies[3].results`, `caseStudies[4].results` | **Positioning** (three more "we did the work" claims — collectively they read as a dev shop and a consultancy, not a talent partner) + **legal** (Pixelette: "choosing best companies to invest in" edges toward investment advice, a regulated activity in several member states) | **Replace** | Entail AI: `Engineers placed onto the client's content platform build` / `Senior hires screened for security and code-quality standards`. NEVG: `{{N}} engineers placed onto the Barça Mobile programme` / `Long-term direct engagement model`. Pixelette: **cut the tile** unless it was a placement — a sweat-equity consulting engagement does not belong on a recruitment site. |
| 15 | "Senior Backend Python Developer in 1 week" | `src/data/content.ts` → `caseStudies[5].results[0]` (Qualiwise) | **Legal** (needs a dated record) + **credibility** — the site states this placement took **1 week** here, **"two days"** in `testimonials[1].quote`, and **"just one week"** in `faq[3].answer`. Three numbers, one event. A CTO who notices stops trusting every other number on the page. | **Keep — after picking one number and propagating it** | `Senior Backend Python Developer sourced and signed in {{QUALIWISE_DAYS}}` (same figure in `faq[3]` and `testimonials[1]`) |
| 16 | "Team scaled within 2 weeks" ×3, "Team scaled within 1 week" ×1 | `src/data/content.ts` → `caseStudies[6].results[1]` (SocialBee), `caseStudies[7].results[1]` (Silvertalent), `caseStudies[8].results[1]` (Foodamigos), `caseStudies[9].results[1]` (Innovatec) | **Legal** (four specific factual claims, four evidence files needed) + **commercial** (implied SLA) | **Keep, with one global qualifier** — the lazy fix: define the clock once instead of hedging four bullets | Leave the four bullets as written, and add one line under the grid in `CaseStudies.tsx`: `Timings are measured from agreed role brief to signed offer, for the engagements shown. Your timeline depends on role scarcity and your interview schedule.` |
| 17 | Sub-head "Driving success across industries — from global sports clubs to fast-growing startups" | `src/components/sections/CaseStudies.tsx` (line ~40) | **Legal** ("global sports clubs" implies FC Barcelona is a TalentSync client; TalentSync's counterparty is New Era Visionary Group) | **Replace** | `Companies and products our placed engineers have contributed to — from consumer platforms at scale to fast-growing startups.` |
| 18 | Testimonial 1: "Exceptional engineers who delivered on time. A key partner in launching Barça Mobile." — **Adrian**, CTO, Barça Mobile, photo | `src/data/content.ts` → `testimonials[0]`; image `public/images/testimonial-adrian-barca.jpeg` | **Legal** (first-name-only endorsement = unverifiable; under UCPD Annex I 23b/23c the standard is that endorsements must be real and checkable, and any material connection between endorser and advertiser must be disclosed) + **GDPR** (name + photo + employer is personal data; publishing it needs a documented lawful basis) + **credibility** | **Keep the testimonial, fix the execution** | `The engineers TalentSync sourced integrated straight into our team and delivered on time. A key partner during the Barça Mobile build.` — author: `{{FULL_NAME}}`, title: `CTO, Barça Mobile (New Era Visionary Group)`. **Blocking check:** confirm this person has no ownership, employment or family connection to TalentSync. If there is one, it must be disclosed on the page or the testimonial removed. |
| 19 | Testimonial 2: "They found us a senior Python developer in two days." — **Ulrich**, CEO & Founder, Qualiwise | `src/data/content.ts` → `testimonials[1]` | **Legal** (contradicts row 15 — one of the two numbers is wrong, and a regulator only needs to find one) | **Keep, reconcile the number, add full name** | `They shortlisted a senior Python developer for us within days and he was signed inside {{QUALIWISE_DAYS}}. Exactly what we needed to scale.` — author: `Ulrich {{SURNAME}}` |
| 20 | Testimonial 3: "Strong technical expertise and a clear understanding of our product vision." — **Tom**, CEO & Founder, Entail AI, photo | `src/data/content.ts` → `testimonials[2]`; image `public/images/testimonial-adr-entail.jpeg` | **Legal + GDPR — verify before the next deploy.** The image file for "Tom" is named `testimonial-adr-entail.jpeg`. If that is a photo of a different person, it is a fabricated endorsement on its face and an image-rights breach. | **Hold until the photo is confirmed** | Same quote; author `Tom {{SURNAME}}`, title `CEO & Founder, Entail AI`. Rename the asset to `testimonial-tom-entail.jpeg` once verified, so the filename can never contradict the attribution again. |
| 21 | "Connect with elite software developers from Eastern Europe. Build stronger tech teams faster, smarter, and more cost-effectively." | `src/data/content.ts` → `siteConfig.tagline` (rendered as the Hero sub-head) | **Positioning** — legally fine (unverifiable puffery is outside the misleading-claims test), but it is the first sentence a CTO reads and it says nothing about the two models or about who keeps control | **Replace** | `Senior Eastern European engineers, sourced and technically validated for your team. You interview them, you select them, you manage them — direct hire or hourly.` |
| 22 | "Your Strategic Partner for Tech Talent Solutions" | `src/data/content.ts` → `siteConfig.description` (Hero headline sub-line and the meta description) | **Positioning** (zero information; identical to every competitor) | **Replace** | `Senior engineers for teams that keep control` |
| 23 | "JavaScript, React, Angular, Node.js, .NET, Python, Java — we cover the entire modern tech stack." | `src/data/content.ts` → `services[3].description` | **Legal (minor)** — "the entire modern tech stack" is an absolute claim that is trivially false (no Rust, Go, Elixir, embedded, mobile listed) | **Qualify** | `JavaScript and TypeScript (React, Angular, Node.js), .NET and C#, Python, Java, and the mobile stacks — the roles European product teams hire for most. If your stack isn't listed, ask.` |
| 24 | "Rigorous assessments and skill evaluations go far beyond CVs — ensuring both technical excellence and cultural fit." | `src/data/content.ts` → `process[0].description` | **Legal (minor)** — "rigorous assessments" is a factual claim about the service that Art. 7 of 2006/114/EC lets an authority (or a client's procurement) demand evidence for. Right now there is no documented process to produce. | **Qualify by naming the actual steps** | `Every candidate goes through a structured technical screen, a live problem-solving session with a senior engineer, and reference checks before we present them. You see the assessment notes, not just the CV.` — only ship this once the three steps are genuinely the process. |
| 25 | *(Missing claim)* The anti-positioning statement appears nowhere in the codebase | — | **Positioning** — the single most differentiating sentence the business has is not on the site | **Add**, verbatim, in Services or immediately under the Hero | `TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control.` |

## 1.3 Structural changes the table can't express

Three small code edits carry a disproportionate share of the risk reduction:

```ts
// src/components/sections/About.tsx — replace the stats array (drop the 60% badge and the SLA)
import { HiOutlineLocationMarker, HiOutlineUserGroup, HiOutlineClock } from 'react-icons/hi'

const stats = [
  { icon: HiOutlineLocationMarker, value: 'Moldova',              label: 'Headquarters' },
  { icon: HiOutlineUserGroup,      value: '{{ENGINEERS_PLACED}}', label: 'Engineers placed with European product teams' },
  { icon: HiOutlineClock,          value: '{{SHORTLIST_SLA}} days', label: 'From brief to vetted shortlist' },
]
```

```ts
// src/data/content.ts — add one field per case study so every tile states TalentSync's role explicitly.
// Render it as a small label above `results` in CaseStudies.tsx. This is what converts the whole
// section from "things we built" (indefensible) to "people we placed" (true, and better positioning).
contribution: 'TalentSync role: sourcing and technical vetting',
```

```nginx
# nginx.conf — today ANY unknown URL returns HTTP 200 with the homepage.
# That is a soft-404 farm: Search Console will fill up with "Soft 404" and
# "Duplicate without user-selected canonical", and it caps indexation quality
# for every real page you add in weeks 3-12. Fix before submitting a sitemap.
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
```

## 1.4 Evidence ledger — what must exist on file for every claim you KEEP

One sheet, one row per live claim, stored at `{{DRIVE}}/legal/claims-evidence/` with the source document attached. Rule: **no row, no claim on the site.** Under Art. 12 UCPD and Art. 7 of Directive 2006/114/EC the burden sits with TalentSync, and a claim whose evidence isn't produced can be treated as inaccurate.

| Claim kept | Proof that must be on file | Who confirms it | Re-verify |
|---|---|---|---|
| `{{ENGINEERS_PLACED}}` engineers placed | Placement register: one row per placement with client, role, start date, engagement model. Exported and dated. | Victor (internal record) | Quarterly, and every time the number on the site changes |
| Each of the 10 named clients + logo | Signed contract or SOW showing TalentSync as counterparty, **plus** written logo-use permission (email is enough). **Orange and Barça Mobile: if the counterparty is New Era Visionary Group, the logo cannot sit under a "Our Clients" heading.** | Client-side signatory; NEVG for the Barça programme | Annually |
| Qualiwise: Senior Backend Python Developer in `{{QUALIWISE_DAYS}}` | Dated brief email + dated signed offer. The delta *is* the claim. | Ulrich (Qualiwise) | On publication, then annually |
| Silvertalent: 3 Fullstack React/.NET in 2 weeks | Same: dated brief, three dated offers | Silvertalent hiring manager | Annually |
| SocialBee: 2 Senior Java/Angular in 2 weeks | Same | SocialBee hiring manager | Annually |
| Foodamigos: Senior Frontend Angular in 1 week | Same | Foodamigos founder | Annually |
| Innovatec: PLC Specialist in 2 weeks | Same | Innovatec contact | Annually |
| `{{SHORTLIST_SLA}}` days brief-to-shortlist | The last 10 briefs with brief date and shortlist-sent date. Publish a number the **median** supports, not the best case. | Victor | Quarterly — this one drifts |
| "1.5M downloads in first three months" (if kept) | Written confirmation from `{{BARCA_CONTACT}}` at NEVG/Barça Mobile of the figure and of permission to publish it, ideally with a store-analytics screenshot | NEVG | Before publication; annually |
| Each of the 3 testimonials | (a) Email granting permission to publish the quote, full name, job title, employer and photograph; (b) the quote in the person's own words, not drafted for them; (c) title and employer matching their LinkedIn on the publication date; (d) confirmation of no ownership/employment/family connection to TalentSync, or a disclosure line on the page | The named individual | Annually, and immediately if they change employer |
| "Structured technical screen + live session + references" | The written screening SOP and one completed assessment pack (redacted) you could hand a client | Victor | Quarterly |
| Stack coverage list | At least one placed engineer per listed technology in the placement register | Victor | Quarterly |
| "Dedicated account manager, single point of contact" | Named account owner per active client in the CRM | Victor | Quarterly |

**Additional ledger rule for testimonials specifically:** keep the permission email in the same folder as the photograph. If you cannot produce both for a testimonial, the safe form is `Name withheld at the client's request — reference available on request`, with the full name held on file. That is defensible; a first name plus a stock-looking photo is not.

---

# PART 2 — MEASUREMENT AND OFF-SITE AUTHORITY PLAN

## 2.1 Setup checklist, in order

Order matters: **Google Search Console has no backfill.** Data starts the day you verify. Verify before anything else ships or you have destroyed the ability to prove the improvement.

### Step 1 — Google Search Console: **Domain property**

Pick **Domain property**, not URL prefix.

*Why:* a domain property covers `http` and `https`, `www` and non-`www`, and every subdomain and path in one property. TalentSync will add `www`, possibly a `blog.` or `careers.` subdomain, and the Railway/nginx host can serve on any of them — with a URL-prefix property each variant is a separate property with separate, split data. There is one cost: a domain property **can only be verified by DNS**, so you need registrar access to add a **TXT record** to the `talentsync.eu` zone. Add the record Google provides at the apex and leave it there permanently; verification lapses if it is deleted.

*Optional extra (free, 5 minutes):* also add a `https://talentsync.eu/` URL-prefix property. It costs nothing, verifies via an HTML file or meta tag (trivial on a static export), and keeps the URL Inspection tooling behaving predictably. The domain property remains the reporting property.

**Done when:** Settings → Ownership verification shows "Verified via DNS record"; the property appears in the picker; and the Performance report is accumulating rows (expect 24–72h before the first data).

### Step 2 — robots.txt, sitemap.xml, canonicals

None of these exist today. All three are build-time artefacts, so they work under `output: 'export'`:

- `src/app/robots.ts` → emits `/robots.txt` with `Sitemap: https://talentsync.eu/sitemap.xml`
- `src/app/sitemap.ts` → emits `/sitemap.xml`; keep it as a plain array of the routes that exist, not a clever crawler
- `metadataBase: new URL('https://talentsync.eu')` in `src/app/layout.tsx` — without it every canonical and OG URL is relative and the OG tags are broken
- Fix the nginx soft-404 first (§1.3). Submitting a sitemap to a server that returns 200 for every URL is how you get a Coverage report full of "Soft 404".

Submit in GSC → Sitemaps → `sitemap.xml` → Submit.

**Done when:** `curl -I https://talentsync.eu/sitemap.xml` returns 200 `application/xml`; `curl -I https://talentsync.eu/this-does-not-exist/` returns **404**, not 200; GSC Sitemaps shows Status "Success" and Discovered pages = your actual route count.

### Step 3 — Bing Webmaster Tools (use the GSC import)

Go to `bing.com/webmasters`, choose **Import your sites from Google Search Console**, sign in with the *same* Google account that owns the GSC property, pick `talentsync.eu`, Import. Imported sites are verified automatically and the sitemaps come across with them — no second DNS record, no second verification file.

Bing matters more than its search share implies: it is the index behind Microsoft Copilot and has historically fed parts of other assistants' browsing. Enable **IndexNow** while you are in there (Bing generates a key file; on a static export you drop the key file into `public/`) so new pages get pinged the moment they deploy.

**Done when:** the site shows Verified in BWT, the sitemap is listed, and the Site Explorer shows crawled URLs within a week.

### Step 4 — Analytics, and the consent decision that follows from it

**Recommendation: cookieless analytics (Plausible, Fathom, or self-hosted Umami) as the primary tool. No GA4 in months 1–3.**

Reasoning, plainly: this site has no forms, no login, no ad retargeting, and the goal is a handful of high-value B2B visits. GA4 sets cookies, which triggers ePrivacy Art. 5(3) consent, which means building and maintaining a CMP on a static export, writing a cookie policy that does not exist yet, and then losing a chunk of the data to "reject" clicks anyway. A cookieless tool sets no identifiers, needs no banner in the mainstream reading, and gives you referrer, country, page and outbound-click data — which is 100% of what the KPI table below needs. Roughly €9/month.

The one real argument for GA4: it now has a **native "AI Assistant" channel** (see §2.4) and a free BigQuery export. If AI-referral reporting becomes the centrepiece, revisit at day 90 — with a CMP, budgeted properly, as a deliberate decision rather than a default.

**Done when:** the script is in `layout.tsx`; your own test visit appears in realtime; the referrer for that visit is correct.

### Step 5 — Conversion tracking with no forms

Everything measurable on this site is an outbound click. One delegated listener covers all three link types; do not wire events into individual components.

```tsx
// src/app/track.tsx — 'use client', mounted once in layout.tsx
useEffect(() => {
  const onClick = (e: MouseEvent) => {
    const href = (e.target as HTMLElement).closest('a')?.getAttribute('href')
    if (!href) return
    const kind = href.startsWith('mailto:') ? 'email'
      : href.startsWith('tel:') ? 'phone'
      : href.includes('calendly.com') ? 'calendly'
      : null
    if (kind) window.plausible?.('contact', { props: { kind, href } })
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}, [])
// ponytail: one listener, three events. Add per-section attribution only if the
// Calendly UTM below turns out not to answer "which section produced the booking".
```

Then tag the Calendly URL itself so attribution survives the click, with no JavaScript at all:

```
https://calendly.com/talentsync-meeting/30min?utm_source=talentsync.eu&utm_medium=site&utm_content=hero
```

…with `utm_content` set per placement (`hero`, `contact`, `case-studies`, `nav`). Calendly carries UTMs through to the booking record, so every booking arrives already labelled with the section that produced it.

**Bookings vs. clicks:** an outbound link cannot tell you whether the booking completed. For months 1–3 do not solve this — read completed bookings straight out of the Calendly dashboard and reconcile monthly against the click count; the ratio is itself a useful number. Only if volume justifies it (week 7+), build a `/book/` page with the Calendly **inline widget** and listen for the `calendly.event_scheduled` `postMessage` event, which fires client-side and works fine on a static export.

**Done when:** one test click of each of email, phone and Calendly produces exactly one event in realtime; and a test booking appears in Calendly carrying `utm_content`.

## 2.2 Baseline capture — run this BEFORE anything ships

Do it on one named day, in one sitting, before the first content deploy. Commit it to this repo at `docs/seo-baseline-YYYY-MM-DD.md` (versioned next to the change it measures) with the raw exports in `docs/baseline/` and screenshots in `{{DRIVE}}/marketing/baseline/`.

Record:

1. **GSC Performance** — export CSV for the maximum available range: total clicks, impressions, average CTR, average position, plus the Queries, Pages, Countries and Devices tabs. If GSC was verified today, write literally `No history — baseline starts <date>` and take a second baseline at day 28. This is the reason GSC is step 1 and not step 5.
2. **GSC Pages report** — indexed count and every "not indexed" reason with its count.
3. **`site:talentsync.eu`** in Google and Bing — screenshot both. It is an estimate; record it as one.
4. **Rank baseline** — 10–15 target commercial terms, checked once each in a clean browser per target country (`&gl=de&hl=en`, `&gl=nl`, …), recorded as a dated table. Starting set: `hire senior developers Eastern Europe`, `hire developers Moldova`, `staff augmentation vs outsourcing`, `hire python developer Eastern Europe`, `hire .NET developer Moldova`, `IT recruitment agency Moldova`, `hire devops engineer Eastern Europe`, `hire QA engineer Eastern Europe`, `add engineers to existing team without entity`, `Eastern European developer hourly rates`.
5. **AI-assistant visibility baseline** — ask ChatGPT, Perplexity, Claude, Gemini and Copilot the same five buyer questions (e.g. *"recruitment agencies for hiring senior developers in Moldova"*, *"how do I add an engineer to my team in Eastern Europe without setting up a legal entity"*). Save each full answer as a PDF. Note for each: is TalentSync named, is `talentsync.eu` cited, who is named instead. Repeat the identical prompts on day 90. Thirty minutes, and it is the only credible before/after you will have for AI visibility.
6. **Links** — referring domains and total backlinks from GSC → Links, plus Ahrefs Webmaster Tools (free for a verified domain).
7. **Business baseline, last 90 days** — from Victor's inbox and Calendly: number of inbound enquiries, number of Calendly bookings, stated source of each, how many became clients. Without this the marketing numbers have nothing to be compared against, and this is the one nobody remembers to capture.
8. **Technical** — PageSpeed Insights mobile + desktop for the homepage, and `curl -s https://talentsync.eu/ > docs/baseline/home.html` so you can prove exactly what the page said on day zero.

**Done when:** one commit, one dated folder, and the CSVs actually open.

## 2.3 KPI table

| KPI | How it is measured on this stack | Tool | Cadence | Realistic 90-day target (domain starting near zero) |
|---|---|---|---|---|
| Search impressions from target countries | GSC → Performance → filter Country ∈ {DE, NL, UK, CH, AT, SE, FR, US} → Impressions | Search Console | Glance weekly, report monthly | **2,000–6,000 impressions/month by day 90** across all countries, of which roughly 40–60% from target countries. Month 1 is realistically 100–400 while pages get indexed. |
| Rankings for commercial-intent terms | GSC average position per query, plus a weekly tracked check of the 15 baseline terms per country | Search Console + a low-cost rank tracker (SE Ranking / Nightwatch) | Monthly | **Position 1 for the brand term; 4–8 long-tail informational terms in positions 11–30.** Head terms such as "hire developers Eastern Europe" will **not** rank inside 90 days — a new domain with no links does not outrank incumbents with five years of backlinks, and any plan that promises otherwise is wrong. |
| CTO / founder visits | You cannot read job titles from a static site with no forms. **Primary measure: the required "Your role" question on the Calendly booking form.** Secondary proxy: sessions that hit a money page, scroll past 75%, and last over 90 seconds. | Calendly (primary) + Plausible (proxy) | Monthly | **≥60% of bookings are CTO / founder / head of engineering**, and 8–15 qualifying engaged sessions/month. Be clear internally that the scroll-depth proxy is decoration; the Calendly answer is the number. |
| Calendly bookings | Calendly dashboard (completed bookings, segmented by the `utm_content` you attach); outbound `calendly` click events as the leading indicator; click→booking rate as the health metric | Calendly + Plausible | Weekly | **2–5 bookings/month by day 90** from organic and AI combined. Month 1: 0–1, and that is normal. |
| Qualified enquiries | Define "qualified" before you count it: a company in a target market with at least one engineering hire budgeted in the next 90 days that reached the point of discussing a specific role. Victor tags each enquiry in a six-column sheet (date, company, country, source, role discussed, qualified y/n). | Inbox + one sheet | Weekly | **3–6 qualified enquiries in month 3** (cumulative 4–10 across the quarter). |
| Enquiries mentioning Google / ChatGPT / another AI assistant | Required Calendly question "How did you hear about us?" with an explicit *"ChatGPT or another AI assistant"* option and a free-text follow-up; cross-checked against the analytics source | Calendly (primary) + Plausible/GA4 (corroboration) | Monthly | **100% answer rate** (it is a required field) and **≥1 AI-attributed booking per month by day 90**. Treat any analytics-only figure as a floor — see §2.4. |

**The honest framing to give the client up front.** Months 1–3 buy indexation and impressions, not leads. A defensible month-by-month story:

- **Month 1** — pages indexed, first impressions appear, brand term ranks. Zero to one enquiry, and it probably came from LinkedIn, not search.
- **Month 2** — impressions climb, first clicks arrive, first long-tail positions in the 11–30 band, first AI citation possible.
- **Month 3** — first attributable enquiries, enough query data in GSC to decide what to write in the next quarter.

The compounding starts in months 4–9. Anyone forecasting pipeline from organic search in month 1 on a one-page domain with no backlinks is selling, not planning.

## 2.4 Detecting AI-assistant referrals

**The hostnames to watch:**

`chatgpt.com`, `chat.openai.com`, `perplexity.ai` (and `www.perplexity.ai`), `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`, plus `grok.com`, `deepseek.com`, `you.com`, `meta.ai`.

**UTM parameters they send:** ChatGPT appends `utm_source=chatgpt.com` to citation links, which is why it is the one assistant nearly every property can already see. Perplexity, Claude and Gemini generally append nothing and depend entirely on the `Referer` header surviving.

**In GA4 (if you go that route):**

- Since mid-2026 GA4 has a **native "AI Assistant" default channel** (Default Channel Group = *AI Assistant*, `medium = ai-assistant`), covering ChatGPT, Gemini, Copilot, Deepseek and Grok. It is **not retroactive** — historical sessions stay in Referral — and **Perplexity and Claude are not in it**.
- So still build a custom channel group: Admin → Data display → Channel groups → new channel "AI Referrals", condition `Session source` **matches regex**:
  `chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|grok\.com|deepseek\.com|you\.com|meta\.ai`
  and drag it **above** Referral in the priority order.
- Cross-check in Reports → Engagement → Landing page, with the dimension set to **Landing page + query string**, searching `utm_source=chatgpt.com`.

**In Plausible:** the Sources report shows the raw referrer hostname; filter it and save the filter as a segment. No channel-group surgery. One more reason it is the right tool for this site.

**Why a large share arrives as Direct, and what to do about it.** The ChatGPT and Perplexity mobile apps and in-app browsers frequently open external links without a referrer; some clients strip it deliberately; and any user who copies the URL out of an answer and pastes it into a new tab arrives completely clean. There is no full fix. Treat every AI referral number as **a floor, not a measurement**. The one useful analytics workaround is pattern recognition: a rise in Direct traffic landing on a *deep* page — a hiring guide, not the homepage — with no matching rise in brand search is almost always assistant traffic.

**The low-tech method that beats all of it.** Add a **required** question to the Calendly event type (Event type → Invitee questions → single-select, required): *"How did you hear about us?"* with options `Google search` / `ChatGPT or another AI assistant` / `LinkedIn` / `Referral from someone I know` / `Event or podcast` / `Other`, followed by an optional free-text *"If an AI assistant — what did you ask it?"*. It takes two minutes to configure, it survives every referrer problem, and the free-text answers hand you the exact prompt wording to build pages around. At 3–5 bookings a month you do not need statistics; you need the actual sentence the buyer typed. Ask the same question on the discovery call and log the answer whether or not they booked online.

## 2.5 Off-site authority, ranked by value × effort

| Rank | Tactic | Value | Effort | Verdict | First concrete action |
|---|---|---|---|---|---|
| 1 | **Client sites linking to your case studies** | High | Medium | **Do first** | Send the email in §2.6 to the three friendliest of the ten clients this week |
| 2 | **Founder's LinkedIn posts linking to new pages** | Med-High | Low | **Do now, weekly** | Post the "not an outsourcer" positioning piece the day the homepage rewrite ships |
| 3 | **LinkedIn company page, byte-identical description** | Medium | Low | **Do now, once** | Paste the site's meta description verbatim into the About field; same phone, same address, link to `https://talentsync.eu/` |
| 4 | **ATIC (ict.md) member profile + Moldova IT Park listing** | Medium | Low | **Do now** | Email ATIC membership about joining and being listed at `ict.md/members/` |
| 5 | **Founder interviews and specialist podcasts** | Med-High | Medium | **Do weeks 7–12** | Build a list of 10 shows whose last five episodes had guests; one pitch, one angle |
| 6 | **Free B2B/IT directories (TechBehemoths, GoodFirms, Sortlist, DesignRush)** | Low-Med | Low | **Do once, one afternoon, then stop** | Create four profiles with identical name/description/address/URL |
| 7 | **Clutch** | Medium | High | **Free profile yes; paid tiers no** | Create the free profile; line up 3–5 clients willing to do a verified review |
| 8 | **Partner announcements** | Medium | Low-Med | **Do opportunistically** | Whenever a partnership or membership lands, ask for a *link*, not just a logo |
| 9 | **Guest contributions** | Medium | High | **Selectively, later** | Two publications, one original-data angle, accept a ~1-in-10 hit rate |
| 10 | **Paid guest-post networks, PR wires, "top 100 directory" submissions, link exchanges** | Zero | Any | **Theatre — do not** | — |

**Detail on the ones that need it:**

**1. Client links (the only tactic that really matters).** Ten existing clients, ten possible links, realistic conversion 2–4. These links are topically perfect and competitors cannot replicate them. The trick is the reciprocal offer — see the script below.

**2. Founder LinkedIn.** Be honest about the mechanics: LinkedIn outbound links are `nofollow` and the feed suppresses reach on posts containing them, so put the substance *in the post* and the link at the end or in the first comment. The SEO value is indirect — traffic, shares, and someone else citing the page — not link equity. It is still the cheapest way to get a brand-new page crawled and read by actual CTOs on day one.

**4. Moldovan ecosystem listings — both verified real.** **ATIC**, the Moldovan Association of ICT Companies (`ict.md`), founded 2006, roughly 70 member companies, runs the Tekwill ICT excellence centre with USAID and Sida; it publishes a public member directory at `ict.md/members/`. **Moldova IT Park** now has over 1,200 residents. A profile in either is a genuine, non-spammy, country-level citation — it helps for "IT recruitment Moldova" queries and, more importantly, assistants lean heavily on association and directory pages when asked "which companies in Moldova do X". If TalentSync is already a Moldova IT Park resident for tax purposes, get the public listing switched on; it costs nothing.

**6. Free directories.** TechBehemoths, GoodFirms, Sortlist and DesignRush are real platforms with free listing tiers. Individually the link value is close to nil. Collectively they are consistently scraped when an assistant is asked to list providers by country, and consistent NAP data across them is an entity signal. Treat it as a three-hour batch job with copy-pasted, byte-identical details — not a strategy, and never a recurring task.

**7. Clutch — the honest version.** A Clutch profile is worth nothing without verified reviews, and Clutch's reviews are collected via a verified interview with your client, which means asking five clients for 30 minutes each. Profile creation is free after an anti-fraud check. "Clutch Verified" is published at around **$499/year**; broader paid plans are reported from roughly **$1,500/year** with sponsored placements at **$1,000–$5,000+/month** on annual commitments. Verdict: create the free profile, secure 3–5 reviews from the same clients you are already asking for links, and buy nothing until inbound from the free profile is proven. Paying for placement before you have reviews is the definition of theatre.

**10. Explicitly not worth doing.** Paid guest-post networks and link packages (paid links, against search-engine spam policy, real downside). Generic "submit to 100 business directories" runs. Press-release distribution wires. Reciprocal link exchanges. Blog commenting. Web 2.0 profile spam. Buying Clutch sponsorship pre-reviews. A company blog that publishes weekly about nothing. For a ten-person recruitment firm none of these moves a ranking or a booking, and several carry a penalty risk.

## 2.6 The client-link email script

Subject: **Quick ask — a case study about {{ClientCompany}}**

> Hi {{FirstName}},
>
> We're rebuilding the TalentSync site and I'd like to write up the work we did together — {{one factual line, e.g. "the three React/.NET engineers we placed with you last year"}} — as a proper case study.
>
> How it would work: I write it, and you get final approval on every word and every number before it goes live. Nothing about {{ClientCompany}}'s internals goes in without your sign-off, and I'll cut anything you'd rather not see published. The page links to {{their product or careers page}}, and we'll push it out to our network on LinkedIn when it's live.
>
> The one thing I'd ask in return: if you're happy with the result, a link back from your site — a line on your partners or about page, or a mention in a post. If a link isn't possible internally, a repost on LinkedIn or a two-line quote we can use is just as welcome.
>
> I can have a draft with you by {{date}}. Very happy to be told no.
>
> Victor
> TalentSync · victor@talentsync.eu · +373 68 300 700

**Why this converts:** the client gets a professionally written page about *their* product, an editorial link from a clean domain to *their* careers page (recruitment teams want that), and free distribution — for the cost of saying yes. You have removed every objection: no writing work, no approval risk, no commitment if they dislike the draft. And the ask is laddered, so "no link" still yields a testimonial or a repost.

**Bundle the asks.** The same email should also collect, in one round-trip: (a) the link, (b) the testimonial with **full name and current title**, (c) written logo-use permission, and (d) written confirmation of the specific numbers you intend to publish. Item (d) *is* the evidence-ledger row from §1.4. One email, four assets, and your legal file is closed at the same time as your link.

## 2.7 The 90-day calendar

Working titles for the four money pages — confirm against the content plan: **MP1** `/direct-recruitment/`, **MP2** `/team-augmentation/` (hourly model), **MP3** `/hire-developers-eastern-europe/`, **MP4** `/staff-augmentation-vs-outsourcing/` (the comparison page that encodes the anti-positioning; comparison pages are disproportionately quoted by AI assistants).

### Weeks 1–2 — Technical foundations, homepage rewrite, model correction, claim cleanup, measurement

| Week | Task | Done when |
|---|---|---|
| 1 | **GSC domain property + DNS TXT record** (do this on day 1, before anything else) | "Verified via DNS record" |
| 1 | **Baseline capture** (§2.2 — all 8 items) | `docs/seo-baseline-<date>.md` committed |
| 1 | Fix nginx soft-404 → `=404` + `error_page 404 /404.html` | `curl -I` on a junk URL returns 404 |
| 1 | `metadataBase`, canonical, `robots.ts`, `sitemap.ts`, OG/Twitter tags, Organization JSON-LD | Rich Results Test passes; sitemap 200s |
| 1 | Submit sitemap in GSC; Bing Webmaster Tools via GSC import; enable IndexNow | Sitemap "Success"; BWT verified |
| 1 | Analytics decision + install (Plausible recommended) + the 12-line click listener + Calendly UTMs | Test click of email/phone/Calendly each fires one event |
| 1 | Calendly: add required "How did you hear about us?" and "Your role" questions | A test booking captures both |
| 2 | **Claim cleanup** — apply audit rows 1–9, 21–25 (`content.ts`, `About.tsx`) | No "60%", no "€15-35", no "project-based" anywhere in `src/` |
| 2 | **Attribution cleanup** — audit rows 10–17: rewrite Barça and Orange bullets, change the grid heading, add the `contribution` field and the timing footnote | Grep for "Led " in `content.ts` returns nothing |
| 2 | **Testimonial remediation** — audit rows 18–20: request full names, permissions, photo verification; hold or anonymise anything unconfirmed | Three permission emails on file, or the quote is anonymised |
| 2 | **Homepage rewrite + model correction** — hero, About, Services and FAQ carry the two engagement models and the verbatim anti-positioning line | The two models appear above the fold and in the FAQ |
| 2 | Open the evidence ledger sheet; backfill every claim that survived | Every live claim has a row and an attachment |
| 2 | LinkedIn company page: byte-identical description, phone, address, URL | Text matches the site character for character |
| 2 | Send the §2.6 email to the first three clients | Three emails sent |

### Weeks 3–6 — The four money pages and two case studies

| Week | Task | Done when |
|---|---|---|
| 3 | **MP1 `/direct-recruitment/`** — the client-selects-and-manages model, in full | Live, in sitemap, submitted via URL Inspection |
| 3 | ATIC membership enquiry + Moldova IT Park listing check | Enquiry sent / listing confirmed |
| 4 | **MP2 `/team-augmentation/`** — the hourly model, with the control clauses spelled out | Live and indexed |
| 4 | Free directory batch: TechBehemoths, GoodFirms, Sortlist, DesignRush; free Clutch profile | Five profiles live with identical NAP |
| 4 | **Day-28 checkpoint** — first real GSC data; re-baseline if week 1 had no history | One-page report against the baseline |
| 5 | **MP3 `/hire-developers-eastern-europe/`** | Live and indexed |
| 5 | **Case study 1** (the client who said yes fastest), written from the placement facts, sent for approval | Client approves in writing |
| 6 | **MP4 `/staff-augmentation-vs-outsourcing/`** | Live and indexed |
| 6 | **Case study 2** + chase the remaining seven clients for links and reviews | Two case studies live; ≥1 client link secured |
| 6 | LinkedIn post per new page as it ships (four posts across weeks 3–6) | Four posts published |

### Weeks 7–12 — Specialist pages, hiring guides, links, author profile, GSC-driven expansion

| Week | Task | Done when |
|---|---|---|
| 7 | Specialist page: **AI / ML engineers** | Live and indexed |
| 7 | Author profile page for Victor (name, photo, LinkedIn, real credentials, `sameAs` JSON-LD) — the entity page assistants and E-E-A-T evaluation both look for | Live, linked from every guide |
| 8 | Specialist page: **Backend engineers** | Live and indexed |
| 8 | Hiring guide 1 (e.g. *"How to add an engineer to your team without setting up a local entity"*) | Live, linked from MP1/MP2 |
| 9 | Specialist page: **DevOps engineers** | Live and indexed |
| 9 | Hiring guide 2 — podcast/interview outreach round 1 (10 pitches) | 10 pitches sent |
| 10 | Specialist page: **QA engineers** | Live and indexed |
| 10 | Hiring guide 3; chase Clutch reviews (target 3) | Two reviews live |
| 11 | Hiring guide 4; second link round to clients who went quiet | ≥2 client links live |
| 11 | **Internal-linking pass** — every guide links to a money page; every money page links to a case study | No orphan pages in the sitemap |
| 12 | **Day-90 review**: repeat the five AI-assistant prompts verbatim and diff against the baseline PDFs; full KPI table vs. baseline; export the GSC Queries report | One report, one decision |
| 12 | **Expansion planning from GSC data** — take the top 20 impression-bearing queries with no matching page and turn them into the next quarter's brief. This is the point where the plan stops guessing and starts following data. | Q2 content brief written |

---

## Sources

- [Verify your site ownership — Search Console Help](https://support.google.com/webmasters/answer/9008080?hl=en)
- [Google Search Console property types: URL prefix vs domain property](https://www.seo-stack.io/blog/google-search-console-property-types-explained-url-prefix-vs-domain-property-and-how-to-verify-either-one)
- [Import sites from Search Console to Bing Webmaster Tools (Bing blog)](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools)
- [Google Analytics adds AI Assistant as a default channel group (Search Engine Journal)](https://www.searchenginejournal.com/google-analytics-adds-ai-assistant-as-default-channel-group/574974/)
- [GA4 AI Assistant channel — coverage and limitations](https://www.digitalapplied.com/blog/ga4-ai-assistant-channel-2026-measure-ai-traffic-playbook)
- [Tracking ChatGPT, Perplexity and Gemini referral traffic in GA4](https://authoritytech.io/blog/ai-traffic-attribution-how-to-track-chatgpt-perplexity-gemini)
- [Directive 2005/29/EC (UCPD), consolidated text — Art. 12 and Annex I 23b/23c](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02005L0029-20220528)
- [Commission Notice 2021/C 526/01 — guidance on the UCPD](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=oj%3AJOC_2021_526_R_0001)
- [Directive 2006/114/EC — misleading and comparative advertising, Art. 7](https://www.legislation.gov.uk/eudr/2006/114/body)
- [ATIC — Moldovan Association of ICT Companies, member directory](https://ict.md/members/)
- [Clutch research methodology](https://clutch.co/methodology) · [Clutch Verified pricing](https://clutch.co/clutch-verified) · [Clutch pricing breakdown 2026](https://www.hireinsouth.com/post/clutch-pricing)


---

## OPEN QUESTIONS (business decisions required)


1. Savings baseline: is there a single client where the cost delta versus local hiring was actually calculated? If yes, we can replace the dead '60%' claim with one specific, sourced, defensible figure ('X saved EUR N versus hiring locally in DE') instead of a generic overhead statement.

2. {{SHORTLIST_SLA}}: what is the real median number of working days from agreed brief to vetted shortlist, across the last 10 briefs? Publish the median, not the best case.

3. {{ENGINEERS_PLACED}}: total engineers placed to date, and number of distinct client companies. Needed for the replacement About.tsx stat tile.

4. Barca Mobile: exactly what did TalentSync supply — how many engineers, which roles, over what dates? And who at New Era Visionary Group / Barca Mobile can confirm the '1.5M downloads in 3 months' figure in writing and permit its publication? Without that confirmation the bullet must be cut, not softened.

5. Orange: is Orange a direct contracting client of TalentSync, or a counterparty on the Barca Mobile MVNO programme where NEVG was the contracting party? This determines whether the Orange logo can legally remain under a 'Our Clients' heading at all.

6. Qualiwise placement speed: two days (testimonial), one week (case study), or 'just one week' (FAQ)? Pick the true figure and propagate it to all three locations.

7. Testimonials: full surnames and current job titles for Adrian, Ulrich and Tom; written permission on file covering quote, name, title, employer and photograph; and confirmation that public/images/testimonial-adr-entail.jpeg is actually a photo of Tom from Entail AI and not another person.

8. Is 'Adrian, CTO, Barca Mobile' connected to TalentSync by ownership, employment or family? Any material connection must be disclosed on the page or the testimonial removed.

9. Pixelette Technologies: was this a placement or a sweat-equity consulting engagement? If consulting, it should come off a recruitment site entirely.

10. Analytics decision: cookieless (Plausible, ~EUR 9/month, no consent banner needed) or GA4 (free, native AI Assistant channel, but requires a CMP, a cookie policy and a banner on a static export)? Recommendation is Plausible for months 1-3.

11. Confirm the four money pages defined in the content plan — the working titles used in the 90-day calendar are /direct-recruitment/, /team-augmentation/, /hire-developers-eastern-europe/ and /staff-augmentation-vs-outsourcing/.

12. Who controls DNS for talentsync.eu? The GSC domain property needs a TXT record at the apex on day 1, and it must never be deleted.

13. Is TalentSync already an ATIC member and/or a Moldova IT Park resident? If so, both public listings can be switched on this week at no cost.

14. Appetite for Clutch: are 3-5 clients willing to sit a 30-minute verified review call? Without that, skip Clutch entirely rather than paying for a profile nobody reviews.

15. Sign-off needed on the definition of 'qualified enquiry' before week 1, or the month-3 number will be argued about instead of acted on.

16. Should the audited copy changes be applied as a PR now, or delivered as a copy document for the client to approve first? Rows 18-20 (testimonials) are blocking either way.
