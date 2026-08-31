# Critique — verdict: **ship-with-fixes** (25 findings)


### [CRITICAL] Privacy Policy §4/§13 vs Cookie Policy Part 1 §1 and Part 2

**Problem:** The two legal drafts assume different analytics stacks and will contradict each other on the day they publish together. The privacy policy is written for GA4 — its open questions carry {{ANALYTICS_STATUS}}, {{ANALYTICS_LIVE_DATE}} and {{GA4_DATA_RETENTION}} — while its own 'short version' already asserts 'set no cookies of our own'. The cookie policy's headline says ship Plausible Cloud (EU) and 'Do not add GA4 — it is the single decision that conjures a banner into existence'. Two published documents, opposite factual claims about the same website. The privacy policy also states 'use no AI screening' as settled fact in its summary while {{AI_SCREENING_POSITION}} is still an unresolved confirmation gate in its body — the exact documented-discrepancy problem the drafts warn about elsewhere.

**Fix:** Decide Plausible now and write it once. Delete {{ANALYTICS_STATUS}}, {{ANALYTICS_LIVE_DATE}} and {{GA4_DATA_RETENTION}} and every GA4 paragraph from the privacy policy; keep §13 as a flat 'we set no cookies'. Remove 'use no AI screening' from the short version until {{AI_SCREENING_POSITION}} is answered — a summary must never assert something the body has flagged as unconfirmed. If GA4 is ever chosen instead, the cookie policy's no-banner conclusion, the privacy short version and §13 all have to be rewritten in the same release, not after it.


### [CRITICAL] Measurement plan, conversion tracking ("track Calendly / email / form / qualified calls")

**Problem:** There is no form on the site and none can exist on this build without an architectural decision no draft makes. Verified: src/components/sections/Contact.tsx offers only mailto:, tel: and an outbound Calendly link; next.config.ts sets output: 'export', so there is no server, no route handler and nowhere to POST. The architecture doc adds contact/page.tsx but says nothing about a form. One of the four named conversion sources is untrackable because it does not exist.

**Fix:** Either strike 'form' from the measurement plan and commit to mailto + Calendly as the only two paths, or pick a static-export-compatible endpoint (Formspree, Web3Forms, Tally) in weeks 1-2. If a form ships, it is a new processor: it must be added to the privacy policy's recipients table, the cookie policy's third-party table, the Art 28 DPA list and the transfer analysis before the legal pages publish. A form bolted on in month 2 silently falsifies all three documents.


### [CRITICAL] 90-day calendar (measurement doc) vs Per-Page Content Specification — the four money pages

**Problem:** The two drafts use different URLs for the same four pages. The 90-day calendar names /direct-recruitment/, /team-augmentation/, /hire-developers-eastern-europe/ and /staff-augmentation-vs-outsourcing/; the content spec builds /tech-recruitment-eastern-europe/, /b2b-engineer-recruitment/, /hourly-engineering-talent/ and /hire-software-developers-eastern-europe/. The open questions surface this as a thing to 'confirm' rather than as the blocking conflict it is. Whichever is wrong, the measurement plan will be tracking rankings for URLs that never exist, and a slug renamed after publication restarts the ranking clock the entire plan is buying.

**Fix:** Freeze one slug list in src/data/content.ts as the single source of truth before any page is written. Generate sitemap.ts, the nav map, the footer link map and the 90-day calendar's tracked-URL table from that one array. Add the array to the guard script so a slug that exists in the calendar but not in the build fails the build.


### [CRITICAL] Terms open questions ('Publish /terms/, /privacy/ and /candidate-privacy/ as real App Router routes') vs Architecture §1 target file tree

**Problem:** The terms document promises a /candidate-privacy/ route the architecture does not build — its file tree lists privacy/, terms/ and cookies/ only. Because nginx.conf currently runs try_files $uri $uri.html $uri/ /index.html, the missing route will return HTTP 200 with the homepage, so the broken link will look like it works to anyone who clicks it and to Google. The privacy policy's Annex A is explicitly designed as a standalone Art 14 notice to paste into candidate outreach, which is what needs a stable public URL.

**Fix:** Pick one before publishing: add src/app/candidate-privacy/page.tsx as a 9-line route rendering Annex A (recommended — outreach emails need a short linkable URL), or repoint every reference in the terms and in outreach templates to /privacy/#annex-a. Then open the URL on the deployed site and confirm real content renders; the try_files fallback makes 'the link resolves' worthless as a check until it is changed to =404.


### [CRITICAL] Delivery risk #1 — the open-questions list (~100 items, one bottleneck)

**Problem:** The drafts produced roughly one hundred blocking questions with no triage, no owner and no distinction between 'blocks the week-1 deploy', 'blocks the first client contract' and 'nice to have'. Nearly all of them route to one person. A hundred-item list handed to a founder who is also selling does not get answered in sequence; it gets postponed, and the plan stalls in week 1 with nothing shipped. This is the single most likely way the whole programme fails.

**Fix:** Cut one page of about twelve answers that unblock roughly 80% of the work, and defer the rest explicitly: (1) registered name + IDNO + registered address; (2) Art 27 EU representative — yes/no plus budget approval; (3) analytics = Plausible; (4) AI screening = no; (5) engineer engagement status under the hourly model; (6) median working days to first shortlist; (7) founded year; (8) Victor's full name, title, LinkedIn URL, photo; (9) Barca 1.5M figure — keep with written source or cut; (10) Orange — direct client or NEVG counterparty; (11) placement fee % and minimum; (12) go/no-go on batched client permission outreach. Everything else moves to a 'before first client contract' list with a named later date.


### [HIGH] Architecture §1 — src/app/page.tsx ('MODIFY drop 'use client', export metadata, page JSON-LD')

**Problem:** No draft says what comes OFF the homepage. Ten new pages are being built to answer the same queries as the existing Services grid (6 items), Case Studies grid (10 clients), FAQ (6 questions) and Careers section, and the plan leaves all of them on / untouched. The homepage has every internal link and every external link pointing at it, so it will outrank its own children for the commercial terms the children were built for, and the new pages will sit at zero impressions while / absorbs the query. This is the most common way a one-page-to-library migration fails, and it is not mentioned anywhere.

**Fix:** Specify the homepage teardown as a deliverable in the same commit as the new routes. / keeps: hero with the new H1, the BLOCK A identity paragraph, the two engagement models in one sentence each with links to their pages, three client logos, one testimonial, one CTA. The six-item services grid becomes six links. The ten-card case-study grid becomes three cards plus 'all case studies'. The six FAQs move wholesale onto the pages whose objections they answer, none stay on /. Rule to write into the spec: if a child page owns a topic, / carries no more than 120 words on it and always links out.


### [HIGH] Architecture §0 Fact 1 ('All nine section components use framer-motion. None can drop 'use client'') — verified in out/index.html

**Problem:** 57 elements in the shipped static HTML carry style="opacity:0;transform:translateY(30px)", including the H1 and both hero paragraphs. framer-motion writes the pre-animation hidden state into the server-rendered markup. The brief's stated goal is 'make facts easy to extract' for assistants that read raw HTML without executing JavaScript; the architecture examines framer-motion closely enough to conclude the sections cannot become server components, and never notices that the same library is what hides the page's content in the bytes crawlers actually receive. The same code is also the reason the site has zero prefers-reduced-motion support (grep: no hits for prefers-reduced-motion, motion-reduce or useReducedMotion anywhere in src/), which is a WCAG 2.2.2 / 2.3.3 gap on every page.

**Fix:** Delete initial={{ opacity: 0, y: 30 }} from the text elements — Hero's h1 and both p tags, and every section h2 — so the markup ships visible. Where the fade is worth keeping, move it to a CSS keyframe wrapped in @media (prefers-reduced-motion: no-preference), which fixes the extraction problem and the reduced-motion gap in the same three lines and lets the fade survive. Add a guard-script assertion that out/**/index.html contains no opacity:0 inside a heading or paragraph.


### [HIGH] Missing deliverable — imprint / legal notice page

**Problem:** No draft owns it. TalentSync sells into DE/NL/AT/CH (named in the claim audit's own jurisdiction analysis) and those buyers' procurement checks look for a provider-identification page as a matter of course; its absence reads as a shell company. Being Moldova-established means DDG §5 and ECG §5 do not strictly bind, so this is a trust and conversion problem more than a hard legal duty — but appointing an Art 27 EU representative creates an EU touchpoint that makes the omission look deliberate rather than merely foreign.

**Fix:** Ship /legal-notice/ with the heading 'Legal notice / Impressum' reusing the provider block already drafted at the head of the terms verbatim: registered name, legal form, IDNO, registered address, email, phone, VAT status, person authorised to represent, Art 27 EU representative, placement-licence status. Every field already has a token in the terms, so the marginal cost is one 9-line route and one footer link. Put it in the footer beside Privacy / Terms / Cookies.


### [HIGH] Terms open questions — 'PREPARE — signature-ready templates ... Data Processing Agreement with Module 1 and Module 2 SCCs and a transfer impact assessment summary, and the security schedule referenced in clause C13.5'

**Problem:** The client-facing DPA, TIA summary and security schedule sit on a PREPARE list with no owner, no date and no slot in the 90-day plan. The first enterprise prospect asks for all three in the first week of the sales conversation, and the plan's whole purpose is to generate exactly those enquiries. Worse, the privacy policy takes an independent-controller (Module 1) position throughout §6 while the drafts themselves flag that any already-signed processor DPA would contradict it — a contradiction that becomes public the moment the policy publishes.

**Fix:** Move DPA (Module 1 and Module 2 SCCs), TIA summary, security schedule, Fee Confirmation and Assignment Schedule into weeks 1-2 alongside the legal pages, with the same counsel review. Before the privacy policy publishes, audit every signed client agreement for an existing processor DPA; if one exists, renegotiate it to Module 1 or change the policy's position — do not publish a controller stance the contract file contradicts.


### [HIGH] Cross-draft — client outreach for logos, testimonials, case-study detail, Barca figure, savings baseline and Clutch reviews

**Problem:** The same ten clients are asked for six different things across the drafts, each as an independent open question: logo and name consent, testimonial full name + title + photo permission, per-engagement case-study copy, written confirmation of the Barca 1.5M figure, a calculated savings baseline, and a 30-minute Clutch verified-review call. Six separate asks to the same overloaded contacts, each with its own decay in reply rate — and case studies (weeks 3-6), testimonials, Clutch (weeks 7-12) and the claim substantiation file all block on the same replies. Nobody has noticed they are one workstream.

**Fix:** One email per client in week 1, one deadline, one consent form covering name, logo, engagement description, quote attribution with full name and title, and willingness to sit a Clutch call. Track it as a single ten-row sheet with a named owner. Then sequence the dependent work off the replies rather than off the calendar: whichever three clients reply first become the weeks 3-6 case studies, not whichever three the plan picked in advance.


### [HIGH] src/components/sections/Careers.tsx lines 51 and 82, and Privacy Policy §7

**Problem:** The apply flow is mailto:victor@talentsync.eu?subject=Application: {job} with no notice of any kind at the point of collection. The privacy policy covers the processing in §7, but nothing on the page points an applicant at it, so the Art 13 notice is never actually given. Separately, SectionWrapper carries className="hidden md:block" — the entire careers section, both live job ads, renders on no phone at all. And if JobPosting markup ships as the drafts propose, Google removes and can penalise postings for roles that are not genuinely open; no draft asks whether these two roles are still open.

**Fix:** One sentence under each apply button: 'By emailing your CV you accept our candidate privacy notice — we keep applications for 12 months.' linking to /candidate-privacy/ (see the route finding above). Remove hidden md:block. Confirm both roles are open and add real datePosted / validThrough before any JobPosting markup ships, and diary the validThrough date so an expired posting comes down.


### [HIGH] Measurement plan — 'add Bing' listed last

**Problem:** Bing is treated as a tidy-up item, but ChatGPT's web results lean heavily on Bing's index, which makes Bing Webmaster Tools the highest-leverage single action for the brief's stated AI-visibility goal — ahead of most of the on-page work. Nothing in the open questions mentions it, and IndexNow is absent entirely despite being free, being a single static .txt key file that works perfectly with output: 'export', and getting new URLs into Bing in hours instead of weeks.

**Fix:** Verify Bing Webmaster Tools in week 1 next to Search Console — it imports from GSC in one click, so the marginal cost is minutes. Generate an IndexNow key, drop the key file in public/, and ping the IndexNow endpoint from the deploy step whenever the sitemap changes. Track Bing impressions on the same sheet as Google's from day one, not from month three.


### [HIGH] Architecture §1 target file tree — sitemap.ts present, robots.ts absent

**Problem:** Verified: out/ contains no robots.txt and no sitemap.xml today, and the architecture adds sitemap.ts but no robots.ts. The sitemap will therefore ship with no Sitemap: directive announcing it, and the site's position on AI crawlers stays undeclared — which means it is decided by whatever a future Railway or Cloudflare bot-management default does rather than by anyone at TalentSync. For a plan whose explicit goal is being cited by assistants, leaving that implicit is the wrong default.

**Fix:** Add src/app/robots.ts: blanket Allow, Sitemap: https://talentsync.eu/sitemap.xml, and explicit Allow entries for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot and Google-Extended so the decision is recorded in the repo and survives a hosting change. Check the Railway/Cloudflare bot settings once after deploy to confirm nothing upstream is blocking them. Skip llms.txt — no assistant demonstrably consumes it; revisit only if that changes.


### [HIGH] Delivery risk #2 — legal work on the critical path of everything else

**Problem:** The brief makes the legal documents the top priority, and the drafts correctly made them thorough — but 'thorough' means they are now blocked on an Art 27 EU representative appointment (procurement lead time, low four figures), a Moldovan employment lawyer's opinion on the placement licence question that the drafts themselves call 'the single highest-priority unresolved question' and which may gate the entire Part B model, and EU counsel review of the transfer clauses. All of that sits inside 'weeks 1-2 foundations' alongside the nginx fix, the nav rewrite and Search Console. None of the ten service pages depends on any of it. As written, one lawyer's response time delays the SEO work by a month.

**Fix:** Split the critical path without demoting legal. Weeks 1-2 ships the things with no external dependency: nginx =404, metadataBase and canonicals, the nav rewrite to real links, sitemap and robots, Plausible, GSC and Bing, the self-hosted font, and a short accurate privacy notice plus the legal notice page covering only what the site actually does today. The full terms, the complete privacy policy and the DPA pack publish when counsel signs off, on their own track started in week 1 — legal is first in effort and first in commissioning, just not a blocker for pages that cite none of it.


### [MEDIUM] Claim Audit §1.4 location list (services[1], process[3], faq[1], faq[3], About.tsx stats, caseStudies[0])

**Problem:** The audit's location inventory covers the four numeric claims but not the phrase the user named as their positioning problem. 'Full-time, part-time, contract, or project-based placements' lives at src/data/content.ts process[1].description ('Flexible Engagement') and faq[4].answer ('What engagement models do you offer?'), and neither index appears anywhere in the audit. The user explicitly said this wording makes them read as a general staffing or outsourcing agency — it is the reason the two-model rewrite exists — and it is the one string with no owner and no removal date.

**Fix:** Add content.ts process[1] and faq[4] to the audit as rewrite targets alongside the numeric claims. Replace both with BLOCK B and BLOCK C verbatim plus the explicit 'TalentSync is not a project outsourcing company' sentence the brief requires. Then add a grep to scripts/validate-pages.mjs that fails the build if 'project-based' or 'part-time, contract' appears anywhere in out/, so a later copy edit cannot reintroduce it.


### [MEDIUM] Content Spec Part 0 — BLOCK A locked verbatim, homepage title/H1 not

**Problem:** The spec locks the identity paragraph and the two engagement-model blocks as verbatim constants, which is exactly right, but does the same for none of the homepage strings the user specified. Current state verified: <title>TalentSync | Connecting Top Talent with Innovative Companies</title>, and the H1 renders siteConfig.name — the bare single word 'TalentSync', with zero query surface — followed by siteConfig.description and siteConfig.tagline. The user supplied exact replacement text for all three, and nothing in the drafts pins it where it cannot drift.

**Fix:** Add BLOCK 0 to src/data/content.ts holding the user's exact title, H1 and supporting paragraph, and have layout.tsx and Hero.tsx read from it. Note that siteConfig.description and siteConfig.tagline also feed the openGraph metadata in layout.tsx — change them in one place or the social card copy silently diverges from the H1. The existing guard script already checks H1 count and title uniqueness; add an equality assertion against BLOCK 0 so a redesign cannot quietly revert it.


### [MEDIUM] Off-site authority plan — 'consistent business details' with no canonical string

**Problem:** The brief asks for consistent business details across LinkedIn, Clutch and the Moldovan/EE directories, and the plan will create eight or more listings — but no draft defines the one string they must all match. The site currently publishes only 'Chișinău, Moldova' and +373 68 300 700 with no street address, while the privacy draft flags that the registered address may differ from the working office. So the plan's own inputs make the consistency goal self-contradicting, and the cost of picking wrong is paid across every listing already created.

**Fix:** Choose one public NAP before a single directory listing exists — exact legal or trading name, one street address, one phone — and decide explicitly whether the registered address or a staffed office is the public one. Store it as a single exported constant in content.ts and emit it identically in the Organization JSON-LD, the footer, the legal notice page, LinkedIn, ATIC and IT Park listings, and Clutch. If there is a staffed street address, that also upgrades the schema from Organization+additionalType to EmploymentAgency and justifies a Google Business Profile, which nothing currently plans.


### [MEDIUM] public/images/ — provenance of people photographs

**Problem:** The drafts audit client-logo and trademark consent thoroughly but never ask where the photographs of people came from. Four files ship in the build and are referenced nowhere in src/: hero-team.jpg, testimonial-startup.jpg, testimonial-socialbee.jpg, testimonial-barca.jpg. Files named 'testimonial-startup' and 'testimonial-socialbee' strongly suggest photos once displayed beside quotes. If any is stock or scraped and was ever shown as a named client, that is UCPD Annex I no. 23c (misrepresented endorsement) stacked on copyright and image rights — and the drafts already flag uncertainty about whether testimonial-adr-entail.jpeg even depicts the right person.

**Fix:** git rm the four unreferenced files this week — dead weight in the deploy either way. For the three photos that do ship, record the licence or the written subject consent as rows in the same evidence ledger the claim audit builds, with the same 'no file, no publish' rule. Resolve the testimonial-adr-entail.jpeg identity question before that image appears on an indexable case-study page where it is far more visible than it is today.


### [MEDIUM] 90-day plan weeks 1-2 ('submit corrected sitemap') vs weeks 3-6 (pages built) and nginx.conf try_files

**Problem:** Sitemap submission is scheduled two to four weeks before the URLs in it exist. nginx currently runs try_files $uri $uri.html $uri/ /index.html, so every one of those URLs returns HTTP 200 serving the homepage. Submitting that sitemap teaches Google that fourteen URLs are duplicates of /, which is a slow signal to reverse and directly undermines the migration. The content spec correctly says the nginx fix must land first; the calendar does not reflect it.

**Fix:** Reorder weeks 1-2 explicitly: (1) nginx try_files ... =404 plus error_page 404 /404.html and the not-found.tsx route; (2) verify GSC and Bing and export the baseline snapshot to a sheet — GSC's Performance report is a 16-month rolling window, so the pre-change baseline evaporates if it is not exported; (3) ship the routes; (4) only then generate and submit the sitemap. Nothing is submitted, linked or shared before a real page answers on the URL.


### [MEDIUM] 90-day plan weeks 7-12 — 'author profile' scheduled after the first four hiring guides

**Problem:** The author profile lands after the articles that need to cite it. A BlogPosting whose author is the bare string 'Victor' contributes nothing to the E-E-A-T the brief is explicitly buying, and it is precisely the signal assistants use to decide whether content is attributable. The open questions ask only for 'the author name for the BlogPosting Person node' — a name is not a profile.

**Fix:** Move it to weeks 1-2, inside /about/, which is already scheduled there. Full name, exact title, photo, LinkedIn sameAs, years in Moldovan tech recruitment, and a stable JSON-LD @id such as https://talentsync.eu/about/#victor. Every article's author references that @id rather than repeating a string. Rule: no article publishes before the profile it points at exists.


### [MEDIUM] Missing deliverable — accessibility statement, and the reduced-motion gap behind it

**Problem:** No draft owns an accessibility statement. Honest scope: the European Accessibility Act most likely does not catch a B2B brochure site that concludes no consumer contract online, so this is a procurement-checkbox and quality item rather than a legal duty — but larger DE/NL clients do ask, and there is a real conformance gap to state. Commit f0b8937 forced dark mode only, removing the user's colour-scheme choice, and every section animates on scroll with no prefers-reduced-motion handling anywhere in src/.

**Fix:** Fix the substance first via the reduced-motion media query in the opacity finding, then publish a short /accessibility/ page naming WCAG 2.2 AA as the target, listing what is known not to conform (dark-mode-only, motion on scroll if any remains), and giving an email for reports and a review date. Do not spend time on contrast: #A3A3A3 on #121214 measures about 7.4:1 and the primary button passes comfortably.


### [MEDIUM] Delivery risk #3 — nothing verifies the published result, and the guard that exists never runs

**Problem:** scripts/validate-pages.mjs already exists and checks title/description uniqueness, H1 count, heading hierarchy and sitemap-to-route parity — but it is wired into nothing: package.json has only dev, build, start and lint. It also checks none of the things most likely to go wrong here. With roughly a hundred {{TOKEN}} placeholders across three legal documents, a nginx rule that makes missing pages look present, and four claims that must not survive, the realistic failure mode is publishing a half-filled privacy policy or a retired claim and nobody noticing for weeks.

**Fix:** Wire the existing script in as a postbuild script, and add four greps over out/: fail on any '{{', on 'up to 60%', on '15-35', and on 'project-based'. Add one loop asserting every sitemap URL has a matching out/**/index.html on disk. About fifteen lines on top of a script already written, run on every build — and it is the only mechanism in the entire plan that stops an unfinished document reaching production.


### [LOW] nginx.conf — location /_next/static/ and location /images/

**Problem:** The three security headers declared at server level are silently dropped for both cached paths. nginx inherits add_header directives only into blocks that declare none, and both location blocks declare add_header Cache-Control, which cancels inheritance. X-XSS-Protection is also deprecated and best removed rather than kept. Separately there is no CSP, no HSTS and no Referrer-Policy — and a CSP is what would actually enforce the privacy policy's promise that the page makes no third-party calls, once the font is self-hosted.

**Fix:** While the file is already open for the try_files =404 change: move the security headers into a snippet included in each location block (or repeat them), drop X-XSS-Protection, add Referrer-Policy: strict-origin-when-cross-origin, add Strict-Transport-Security, and add a Content-Security-Policy allowing self only. Deploy the CSP in report-only for one week first so a forgotten third-party asset surfaces as a report rather than a blank page.


### [LOW] Open questions — 'public/opengraph-image.png at 1200x630 — needs designing'

**Problem:** Verified absent: out/index.html contains no og:image, no canonical and no JSON-LD today. The architecture covers canonical and JSON-LD, but the OG image is a lone open question with no owner and no deadline — and it is the asset that decides whether the founder's LinkedIn posts about the new pages, which the brief names as an off-site authority tactic, render as a card or a grey box. Fourteen new pages shared with no image is fourteen wasted posts.

**Fix:** One 1200x630 template — page title on the brand background — generated per route, assigned in week 2 before the first page is shared anywhere. While editing layout.tsx, also delete the keywords array from the metadata export; no search engine has used it since 2009 and it invites someone to maintain it.


### [LOW] src/data/content.ts navigation array — seven '#' anchor hrefs

**Problem:** No draft says what happens to the existing anchors. This is not a redirect problem — fragments never reach the server, so nothing 404s and no ranking is at stake — it is an inventory problem: those anchor URLs are what is pasted in the LinkedIn company page CTA, email signatures, the Calendly booking page and TalentSync.pdf in the repo root. After the nav rewrite, a visitor arriving at /#services lands at the top of a homepage whose services section may no longer exist.

**Fix:** Keep the same id attributes on whichever homepage sections survive the teardown, so old anchor links still land somewhere coherent. Add one week-2 task next to the nav rewrite: update outbound links in the LinkedIn company page, email signatures, the Calendly event description and the PDF to point at the new real URLs — those are also the first inbound links the new pages will get, which the plan needs anyway.
