# Critique — verdict: **not-ready** (23 findings)


### [CRITICAL] nginx.conf — `location / { try_files $uri $uri.html $uri/ ... }` and the plan's line "nginx.conf MODIFY =404 fallback, error_page, redirects"

**Problem:** VERIFIED BROKEN. I ran the repo's actual nginx.conf in nginx:alpine against a real multi-directory `out/` with `Host: talentsync.eu`. `GET /privacy` returned `301 Location: http://talentsync.eu:3000/privacy/` — nginx's internal directory redirect uses `$server_port` and `absolute_redirect on` (both defaults), so it advertises the container's internal port 3000 over plain HTTP. Railway terminates TLS on 443. Today only `/` exists so nothing ever hits `$uri/`; the moment 17 directories land, every slashless inbound URL (how humans type them, how LLMs cite them, how the six-month-old soft-404 index entries look) 301s to a dead port. The plan's one-word 'redirects' does not cover this.

**Fix:** Add to the nginx server block, above `location /`:
```
absolute_redirect off;
port_in_redirect off;
error_page 404 /404.html;
location = /404.html { internal; }
location / { try_files $uri $uri.html $uri/ =404; }
```
Verified working: `/privacy` → 301 to relative `/privacy/`, `/privacy/` → 200, `/nonexistent` → 404 serving Next's `out/404.html`, `/sitemap.xml` and `/robots.txt` → 200. Add a curl smoke test of exactly those five URLs against the built image before the Railway deploy is promoted.


### [CRITICAL] §2 `src/app/layout.tsx` — `alternates: { canonical: '/' }`

**Problem:** VERIFIED. I built a page whose metadata sets only a title. It emitted `<link rel="canonical" href="https://talentsync.eu/"/>` — the root layout's `alternates` is inherited by any segment that does not override it. Any one of the 18 routes that misses `pageMeta()` (a legal page, an insights article, a route added in six months) silently canonicalises itself to the homepage and drops out of the index with no build error and no visible symptom. The guard already written at `/Users/adrianzabica/Desktop/talentsync-web/scripts/validate-pages.mjs:53` only checks `if (!canon) fail(...)` — presence, not value — so it will not catch this.

**Fix:** Delete `alternates` from `layout.tsx` entirely. Set canonical only inside `pageMeta()`. Change the guard to assert the value:
```js
const canonHref = canon && attr(canon[0], 'href')
const want = 'https://talentsync.eu' + routeOf(file)
if (!canonHref) fail(f, 'link[rel=canonical]', 'missing')
else if (canonHref !== want) fail(f, 'link[rel=canonical]', `is ${canonHref}, want ${want}`)
```


### [CRITICAL] §1 file tree — `public/opengraph-image.png   NEW   1200×630 asset`

**Problem:** VERIFIED. I placed a PNG at `public/opengraph-image.png` and built. It was copied to `out/opengraph-image.png` and produced **zero** `og:image` tags on any page. The Next file convention only fires for `opengraph-image.*` inside the **app** directory. In `public/` it is an unreferenced static file. The plan's only OG-image provision therefore does nothing, and every link shared to LinkedIn — the one social channel this business uses — renders as a bare grey card.

**Fix:** Move the asset to `src/app/opengraph-image.png` (1200×630). Next then auto-emits `og:image`, `og:image:width`, `og:image:height` and `og:image:type` on every route by inheritance, with the content hash in the URL. Add `src/app/opengraph-image.alt.txt` containing the alt text. Then make the guard assert `og:image` is present on every page.


### [CRITICAL] §2 `src/app/layout.tsx` — the metadata object has no `openGraph` and no `twitter` key

**Problem:** This is a straight regression against the live site. Today's `out/index.html` emits og:title, og:description, og:url, og:site_name, og:type, twitter:card, twitter:title and twitter:description. The plan's replacement layout drops all of them, and `pageMeta()` — the thing that is supposed to compensate — is never shown anywhere in the plan, so it cannot be reviewed. Combined with the verified 'a child's openGraph object replaces the parent's wholesale, it does not merge' behaviour, this is exactly how 18 pages ship with no social cards at all.

**Fix:** `pageMeta()` must return the complete object every time, never a partial:
```ts
export const pageMeta = ({ path, title, description }: {path:string;title:string;description:string}): Metadata => ({
  title, description,
  alternates: { canonical: href(path) },
  openGraph: { type: 'website', siteName: 'TalentSync', locale: 'en_GB', url: href(path), title, description },
  twitter: { card: 'summary_large_image', title, description },
})
```
Guard assertion: every page has non-empty `og:title`, `og:url`, `og:image`, `og:site_name` and `twitter:card`.


### [CRITICAL] Architecture plan §2 ("Zero changes inside any section component") vs Content Spec §1 (homepage)

**Problem:** The two documents build different sites and the architecture wins by default. Spec §1 requires H1 `Hire Senior Software Engineers from Eastern Europe`, BLOCK A verbatim, a placement-ledger table, ten named clients, ~1,530 words. `src/components/sections/Hero.tsx:26` renders `<h1><span className="text-gradient">{siteConfig.name}</span></h1>` — the H1 is the literal string "TalentSync". The plan renders the nine existing sections unchanged, so the entity-resolution page ships with a one-word H1 and the old 2024 tagline. Worse: the claims the spec says to retire live in `src/data/content.ts:86` (`'1.5M app downloads in first 3 months'`) and `:88` (`'Led system architecture design and CI/CD implementation'`), and the plan never touches `caseStudies` beyond adding slug/summary/body — so the exact Barça attribution the spec calls 'the claim most likely to be challenged' ships anyway.

**Fix:** Add an explicit phase 0 to the architecture plan before any new route: rewrite `Hero.tsx` (H1 text, BLOCK A as the lede) and rewrite the `caseStudies`, `services` and `faq` arrays in `content.ts` to the spec's replacement wording. Concretely, `content.ts:86` becomes `'The engineer we placed worked on system architecture and CI/CD for the Barça Mobile launch.'` and the downloads line is deleted unless a public linkable source is supplied. Until that phase lands, the ten new pages are pointing internal links at a homepage that contradicts them.


### [HIGH] Content Spec §1 SEO title (66 chars) vs `ServicePage.metaTitle` doc comment ("Keep ≤ 60 chars — the build guard enforces it") vs `scripts/validate-pages.mjs:41`

**Problem:** I counted every stated character total in the spec — they are all correct, including the 66. But the already-written guard enforces `title.length < 15 || title.length > 60`. The plan wires the guard to `postbuild`; npm runs `postbuild` automatically after `build`; `Dockerfile:12` is `RUN npm run build`. So the client-mandated homepage title fails the guard, which fails the Docker build, which fails the Railway deploy — on the very first push, with a non-obvious error.

**Fix:** Resolve before writing code, not at deploy time. Take the 55-char alternative the spec already drafted — `IT Recruitment & Engineers, Eastern Europe | TalentSync` — which keeps every element and the brand. If the client refuses, add an explicit allowlist to the guard: `const TITLE_EXEMPT = new Set(['/'])` and skip the length check for exempt routes, so the exception is visible in code rather than discovered in a failed build.


### [HIGH] §1 `app/[slug]/page.tsx` — the ten service/location slugs; Content Spec Part 1

**Problem:** Six of the ten are a slug swap and are a textbook doorway set. `/hire-ai-engineers/`, `/hire-backend-developers/`, `/hire-devops-engineers/`, `/hire-qa-engineers/`, `/hire-full-stack-developers/` have no unique data source anywhere in either document: each gets the same three benefit cards, the same link-out to BLOCK B/C (the spec explicitly forbids the blocks appearing on role pages, so the unique content budget is a stack list), the same `<details>` FAQ, the same CTA. TalentSync has nine placements total across five clients — there is not enough lived evidence to write six credible role pages, and the template guarantees they read as one page with the noun swapped. Google's spam policy on doorways targets exactly this. Shipping them dilutes crawl budget and drags the quality signal on the four pages that are actually good.

**Fix:** Cut all six from `servicePages`. Replace with one H2 per role inside the existing 'Stacks we place into' section of the surviving pillar page — 120 unique words each, every one anchored to a named placement (Qualiwise → Python, Foodamigos → Angular, Innovatec → PLC, SocialBee/Silvertalent → full-stack). Reinstate a role page only when that role has three or more named placements to write about. Ship 9 routes, not 14: `/`, `/tech-recruitment-eastern-europe/`, `/b2b-engineer-recruitment/`, `/hourly-engineering-talent/`, `/technical-recruitment-moldova/`, `/case-studies/`, `/about/`, `/contact/`, `/careers/`, plus the three legal pages noindexed.


### [HIGH] `/tech-recruitment-eastern-europe/` (Spec §2) vs `/hire-software-developers-eastern-europe/` (Spec §3)

**Problem:** Not a defensible split — a cannibalisation pair. Both target Eastern Europe + engineers + hire. The stated differentiator is a content difference, not an intent difference, and the spec proves the overlap itself: both carry BLOCK B and BLOCK C, both carry the nine-engineer dataset, both carry a 'realistic timelines' H2 with the same counterweight sentence, and both link out to the same four targets (`/b2b-.../`, `/hourly-.../`, `/technical-recruitment-moldova/`, `/case-studies/`). Google will pick one and suppress the other, and the internal-link equity is split between them.

**Fix:** Delete `/hire-software-developers-eastern-europe/` and 301 it to `/` (it has never existed, so this is just never creating it). Move its one genuinely unique asset — the placement ledger with client, role, stack, headcount, time-to-signature — to `/case-studies/`, which currently has no content spec at all and needs a reason to exist. Corrected intent map: `/` = brand/entity ('TalentSync'); `/tech-recruitment-eastern-europe/` = informational only, country selection, no CTA-first framing ('which Eastern European country to hire developers', 'Eastern Europe vs LATAM nearshore'); `/b2b-engineer-recruitment/` = contract mechanics ('permanent establishment contractor Europe', 'VAT reverse charge non-EU developer'); `/hourly-engineering-talent/` = pricing ('hourly developer rates Eastern Europe'); `/technical-recruitment-moldova/` = local ('hire developers Moldova'); `/case-studies/` = evidence ('TalentSync clients', 'recruitment agency placement record').


### [HIGH] §4 `src/data/content.ts` — `navigation` and `companyNav`; §1 Footer "3-column link map"

**Problem:** The two most commercially valuable pages are orphaned. `navigation` is Services / Case Studies / Insights / About / Contact, where 'Services' points at the informational pillar. `companyNav` is About / Case Studies / Insights / How it works / Careers / Contact. `legalNav` is the three legal pages. There is no `servicesNav` array anywhere in the plan, so `/b2b-engineer-recruitment/` — described in the spec as 'the single most valuable page on the site for the ChatGPT discovery channel' — and `/hourly-engineering-talent/` receive **zero site-wide links**. Their only inbound links are body-copy mentions on three pages. Meanwhile the informational pillar, which should be a funnel entrance, gets the site-wide nav slot.

**Fix:** Add the missing array and render it as the Footer's first column on all routes:
```ts
export const servicesNav = [
  { label: 'Tech recruitment in Eastern Europe', href: '/tech-recruitment-eastern-europe' },
  { label: 'Direct B2B recruitment', href: '/b2b-engineer-recruitment' },
  { label: 'Hourly engineering collaboration', href: '/hourly-engineering-talent' },
  { label: 'Technical recruitment in Moldova', href: '/technical-recruitment-moldova' },
]
```
Drop `Insights` from `navigation` and `companyNav` (see the insights finding) and point the nav's 'Services' entry at `/b2b-engineer-recruitment/`, the page that converts.


### [HIGH] Content Spec — 'JSON-LD emitted: FAQPage' on every one of the fourteen pages; §2 template `{page.faq.length > 0 && <JsonLd data={faqLd(page.faq)} />}`

**Problem:** Two problems. (1) Google restricted FAQ rich results to authoritative government and health sites in August 2023 — TalentSync qualifies for neither, so this markup earns exactly zero SERP real estate on 14 pages. The plan and spec both present it as a win. (2) The questions repeat across pages: 'Is TalentSync an outsourcing company?' on `/` and the template's 'Do you take over the project?' carry a near-verbatim answer, which the plan then emits as FAQPage on every service page. Ten pages emitting FAQPage with overlapping Q&A is the pattern that draws structured-data spam scrutiny for zero upside.

**Fix:** Keep every visible `<details>` block — they are genuinely valuable for the LLM extraction channel and cost nothing. Emit `FAQPage` JSON-LD on `/` only. Delete the `faqLd` call from `[slug]/page.tsx`. Add a guard assertion that no two pages emit the same `<summary>` text, so the copywriter cannot reintroduce the duplication.


### [HIGH] §1 "Not built, flagged: /careers/"

**Problem:** The plan punts the only structured data on this site that produces a SERP feature, while building ten pages whose schema types (Service, CollectionPage, FAQPage) produce none. `src/data/content.ts:230` already holds two real, fully-specified roles. `JobPosting` gets a dedicated Google Jobs surface plus free syndication through aggregators, and it is strictly cheaper to build than any single one of the six role pages I recommend cutting.

**Fix:** Build `/careers/` and `/careers/[slug]/` from the existing `careers` array using the same `[slug]` pattern already designed. Required properties: `title`, `description` (HTML string), `datePosted`, `validThrough`, `hiringOrganization` (ref the Organization node), `employmentType: 'FULL_TIME'`, and for the remote role `jobLocationType: 'TELECOMMUTE'` + `applicantLocationRequirements: { '@type': 'Country', name: 'Moldova' }`. Add `datePosted` and `validThrough` fields to each entry in `careers` and add a guard check that fails when `validThrough` is in the past — an expired posting is dropped silently by Google otherwise.


### [HIGH] `src/app/globals.css:1` — `@import url('https://fonts.googleapis.com/css2?family=Montserrat...')`; plan says globals.css MODIFY +3 lines

**Problem:** The plan touches globals.css and leaves the worst possible font load in place, on all 18 routes. A CSS `@import` of a remote stylesheet is three serialised round trips on the critical rendering path: fetch globals.css → parse → discover the import → fetch the Google CSS → parse → fetch the woff2. It is render-blocking, it adds a third-party origin (connect + TLS), and it is the LCP on every page of a site whose new pages are otherwise pure static HTML. Core Web Vitals is not mentioned once in the plan.

**Fix:** `next/font/google` works under `output: 'export'` and self-hosts the woff2 into `_next/static/media` with a preload link and `font-display: swap`:
```ts
// src/app/layout.tsx
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-montserrat' })
// <html lang="en" data-scroll-behavior="smooth" className={montserrat.variable}>
```
Delete line 1 of globals.css and change the theme token to `--font-sans: var(--font-montserrat), system-ui, sans-serif;`.


### [HIGH] §2 table — `Navbar | keep 'use client' | useState × 2, useEffect scroll listener`

**Problem:** Navbar keeps `framer-motion` (`motion.nav`, `motion.div`, `AnimatePresence`), so framer-motion sits in the shared client chunk and downloads on all 18 routes — including the eight pages the plan deliberately made animation-free for exactly this reason. Measured on the current build: largest chunk 224KB uncompressed, `out/_next/static/chunks` totals 1.0MB. The plan's own argument ('the new pages render fully-visible static HTML with no framer-motion at all') is undone by the navbar that sits on top of them.

**Fix:** Strip framer-motion from Navbar; keep the two `useState` and the scroll `useEffect`. `initial={{y:-100}} animate={{y:0}}` is a `@keyframes slide-down` + `animation: slide-down .5s`. The mobile menu's `AnimatePresence` height animation is `grid-template-rows: 0fr → 1fr` with `overflow:hidden` on the child — one CSS transition, no library, no layout thrash. The desktop `width: 0 → auto` expand is the same trick on `grid-template-columns`. framer-motion then loads only on `/`.


### [MEDIUM] §1 file tree — `not-found.tsx  NEW  → out/404.html (nginx error_page target)`; §2 `[slug]/page.tsx` — `if (!page) notFound()`

**Problem:** Two small inaccuracies. `out/404.html` and `out/404/index.html` are **already emitted today** by the current build — I verified both files exist in the working `out/`. The plan lists not-found.tsx as required for the nginx error_page target; it is not. Separately, with `dynamicParams = false` the `notFound()` branch in `[slug]/page.tsx` is unreachable: `params.slug` can only be a value `generateStaticParams` returned. Same for the `if (!page) return {}` in `generateMetadata`.

**Fix:** Write `not-found.tsx` anyway, but for the right reason: a branded 404 carrying links to the top six pages, so the traffic arriving at the URLs the old soft-404 config got indexed has somewhere to go. In `[slug]/page.tsx`, replace the dead branch with a build-time assertion so a bad `related` slug fails loudly: `const page = servicePages.find(p => p.slug === slug)!` plus a module-level check that every `related` entry resolves to a real slug.


### [MEDIUM] §2 `<JsonLd data={organizationLd()} />` — helper body never shown; `src/components/layout/Footer.tsx`

**Problem:** The Organization node is the load-bearing piece of the entity strategy and the plan never specifies its contents, so it cannot be reviewed and will be improvised. Two concrete risks. (1) It will claim an address that appears nowhere on the site — the current Footer renders only the name, an email and a scroll-to-top button; no phone, no address. Schema that contradicts visible content is the fastest way to have it ignored. (2) `src/data/content.ts:10` is `'Chișinău, Moldova'` with diacritics while the content spec writes 'Chisinau' throughout; two spellings of the entity's own city across schema and copy weakens the entity match. Third: the three testimonials at `content.ts:182` are exactly where someone will reach for `Review`/`aggregateRating` — self-serving reviews on your own Organization violate Google's structured-data policy and risk a manual action on a site with nothing else to lose.

**Fix:** Specify it now: `{ '@type': 'Organization', additionalType: 'https://schema.org/EmploymentAgency', name, url, logo: { '@type':'ImageObject', url: '/logo.png', width: 512, height: 512 }, email: 'victor@talentsync.eu', telephone: '+37368300700', address: { '@type':'PostalAddress', addressLocality:'Chișinău', addressCountry:'MD' }, sameAs: ['https://linkedin.com/company/talentsync'], founder: { '@type':'Person', name:'Victor …' } }`. Render the same NAP block visibly in the rewritten Footer on every page. Pick `Chișinău` and use it in both. Add an explicit rule to the plan: no `Review`, no `aggregateRating`, ever.


### [MEDIUM] Content Spec §2 — "JSON-LD: CollectionPage, BreadcrumbList, Service, FAQPage"

**Problem:** `CollectionPage` is the wrong type for a 2,480-word country-selection guide. `CollectionPage` describes a page listing a set of items. Using it here tells Google and every LLM crawler that the page is an index, which is the opposite of the citation-worthy long-form document the spec is trying to build. Separately, `/privacy/` in §3 emits `breadcrumbLd` while the shown component renders no visible breadcrumb — BreadcrumbList should match a visible trail.

**Fix:** Use `Article` on the pillar with `headline`, `author` (the Organization or Victor as Person), `datePublished`, `dateModified` and `about`. A dated, attributed document is what the ChatGPT discovery channel actually cites. Add the same visible breadcrumb markup from `ServicePageTemplate` to the legal page component, or drop `breadcrumbLd` from those three pages.


### [MEDIUM] §1 file tree — `insights/page.tsx`, `insights/[slug]/page.tsx`, `src/data/insights.ts`; `navigation` includes 'Insights'

**Problem:** Both routes are in the architecture plan's 18; the content spec covers 14 pages and specifies zero insights articles. `insights.ts` is listed as NEW with no contents defined anywhere. You will ship an `/insights/` index with zero or two posts, link to it from the site-wide nav and the footer, and list it in `sitemap.ts`. An empty index page that every route links to is the thinnest URL on the site and the one Google crawls most.

**Fix:** Delete `app/insights/page.tsx`, `app/insights/[slug]/page.tsx` and `src/data/insights.ts` from the plan. Remove the 'Insights' entry from `navigation` and `companyNav`. Reinstate all of it in one commit when three finished articles exist. `sitemap.ts` is generated from the data modules, so it drops out automatically.


### [MEDIUM] §2 "The homepage keeps its animations"; `src/components/sections/Hero.tsx:21-45`

**Problem:** VERIFIED: 57 elements in the current `out/index.html` carry `style="opacity:0"` and 23 carry `transform:translateY(30px)`. Three of them are the `motion.h1` and two `motion.p` in Hero — the H1, `siteConfig.description` and `siteConfig.tagline`, i.e. the entire above-the-fold content of the entity-resolution page. The plan correctly makes the eight new pages animation-free for exactly this reason, then exempts the one page where it matters most, on the site whose proven discovery channel is ChatGPT. Its own research flags this ('Worth keeping above-the-fold H1/intro copy out of scroll-reveal wrappers') and the plan overrides it without argument.

**Fix:** Hero uses `animate`, not `whileInView`, so the reveal is decorative on first paint and nothing depends on it. Delete the `initial` and `animate` props from `motion.h1` (line 21) and the two `motion.p` blocks (lines 29, 38) in `Hero.tsx`, or change those three elements to plain `<h1>`/`<p>`. Keep the CTA and scroll-indicator animations. Three-line diff, removes every above-the-fold instance, leaves the other 54 below the fold where they cost nothing.


### [MEDIUM] §1 `package.json MODIFY +postbuild`; `Dockerfile:12` `RUN npm run build`

**Problem:** npm runs `postbuild` automatically after `build`, and the Dockerfile's build step is `npm run build`. A 61-character meta title therefore fails the Railway production deploy, and the failure surfaces inside a Docker layer as a bare `exit 1` with no indication that a copy edit caused it. `.dockerignore` does not exclude `scripts/`, so the script is present in the image build — the failure mode is live, not theoretical.

**Fix:** Name the script `"check:seo": "node scripts/validate-pages.mjs out"` rather than `postbuild`, run it in CI on pull requests, and make the Dockerfile step `RUN npm run build && npm run check:seo` so the failing command is visible in the Railway build log.


### [MEDIUM] §1 `privacy/page.tsx`, `terms/page.tsx`, `cookies/page.tsx` ("9 lines" each); `src/app/sitemap.ts`

**Problem:** Three 9-line pages generated from `legal.ts`, indexable, in the sitemap, linked from every page's footer. They will be the thinnest URLs on the domain and they will trip the guard's own 15–60 char title and 70–160 char description rules. Worse, `/cookies/` is factually wrong before it is written: the site sets no cookies, loads no analytics and has no cookie banner (verified — the only third party is the Google Fonts stylesheet). A Cookie Policy describing cookies you do not set is a liability, not compliance.

**Fix:** Add `robots: { index: false, follow: true }` to each legal page's metadata, exclude them from `sitemap.ts`, and add the three routes to a guard skip list so they do not fail the title/description rules. Delete `/cookies/` and fold one honest paragraph into `/privacy/`: 'This site sets no cookies and runs no analytics or tracking scripts. Fonts are served by Google Fonts, which receives your IP address.' If analytics is added later, that paragraph is where it gets amended.


### [LOW] `src/components/sections/CaseStudies.tsx:60, 116, 178`; `public/images/`

**Problem:** All three case-study images use `alt={study.company}` — the company name alone, adjacent to a heading that already says the company name, which is a redundant alt on the site's most content-bearing images. `Testimonials.tsx:58` uses the author's name, which is correct for a headshot. Filenames are already descriptive. But `images.unoptimized: true` is on, and `hero-team.jpg` is 144KB, `case-foodamigos.png` is 126KB, `case-barca.jpg` is 51KB — served raw, on the LCP path of the homepage, about to be reused across more routes. Neither alt text nor image weight appears anywhere in the plan.

**Fix:** `alt={`${study.company} — ${study.industry}`}` on all three call sites. Convert `hero-team.jpg` and `case-foodamigos.png` to webp (`cwebp -q 82`) and re-point `content.ts`; both drop roughly 70%. Since `unoptimized: true` disables Next's resizing, add explicit `width`/`height` on every `next/image` call so the aspect ratio box is reserved and CLS stays at zero.


### [LOW] `src/components/ui/SectionWrapper.tsx:15`; §3 `privacy/page.tsx` — `<SectionWrapper id="legal" className="bg-background pt-36">`

**Problem:** SectionWrapper builds its class with a raw template string: `` `py-24 sm:py-32 lg:py-40 ${className || ''}` ``. Passing `pt-36` puts two competing padding-top utilities on one element with nothing to resolve them. I checked the generated stylesheet: `.py-24` sits at byte 23190 and `.sm\:py-32` at 35263, so the responsive variant wins above 640px and the legal page silently gets 128px of top padding instead of the 144px asked for. It happens to clear the fixed navbar, so it is cosmetic today — but it is a live class conflict in a shared primitive that every new page passes a className to.

**Fix:** While you are deleting the `'use client'` directive from this file (correct call — the plan verified it needs none), also fix the merge: `className={cn('py-24 sm:py-32 lg:py-40', className)}`. `cn` is already imported by `Button.tsx` and `Card.tsx`; twMerge then resolves `py-*` vs `pt-*` properly.


### [LOW] §2 layout.tsx `<html>` element and `src/app/layout.tsx` metadata; `public/`

**Problem:** `data-scroll-behavior="smooth"` is correct — I confirmed it against `node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js` in the installed 16.1.3, which reads `htmlElement.dataset.scrollBehavior === 'smooth'`. The plan gets that right. Missing around it: no `theme-color`, and the site has been dark-only since commit f0b8937, so mobile browser chrome renders light against a `#121214` page on every route. No web manifest. No `apple-touch-icon` — iOS home-screen saves get a screenshot. `hreflang` is correctly absent since no second language is planned.

**Fix:** Add to the root layout metadata: `themeColor: '#121214'`, `manifest: '/site.webmanifest'`, and `icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' }`. Ship a four-line `public/site.webmanifest` and a 180×180 apple-touch-icon. If Romanian is ever added for `/technical-recruitment-moldova/`, use `alternates: { languages: { 'en': …, 'ro': …, 'x-default': … } }` — it resolves at build time and works under `output: 'export'`.
