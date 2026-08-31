# FROZEN DECISIONS — binding on every implementation agent

Read this first. It resolves conflicts between the spec documents. Where a spec
document disagrees with this file, **this file wins**. Where this file is silent,
`00-design-contract.md` wins on anything visual and `01-architecture.md` wins on
anything structural.

Anything marked **[OWNER: VICTOR]** is a business fact no agent may invent.

---

## D1 · The route list is FROZEN

Single source of truth: `src/data/routes.ts`. The sitemap, the nav, the footer link
map and the guard script all derive from it. No agent adds, renames or removes a
route.

| # | Route | Intent | Indexed |
|---|---|---|---|
| 1 | `/` | brand / entity — "TalentSync" | yes |
| 2 | `/tech-recruitment-eastern-europe/` | **informational**: which EE country, EE vs LATAM, market data | yes |
| 3 | `/hire-software-developers-eastern-europe/` | **transactional**: engagement models, process, what it costs to engage | yes |
| 4 | `/b2b-engineer-recruitment/` | contract mechanics: permanent establishment, VAT reverse charge, direct engagement | yes |
| 5 | `/hourly-engineering-talent/` | rates and hourly model mechanics | yes |
| 6 | `/technical-recruitment-moldova/` | local market | yes |
| 7 | `/hire-backend-developers/` | backend — anchored to Qualiwise (Python, 1 wk) | yes |
| 8 | `/hire-full-stack-developers/` | full-stack — anchored to SocialBee (Java/Angular ×2) + Silvertalent (React/.NET ×3) | yes |
| 9 | `/hire-ai-engineers/` | AI/ML | **`draft: true`** |
| 10 | `/hire-devops-engineers/` | DevOps/cloud | **`draft: true`** |
| 11 | `/hire-qa-engineers/` | QA/automation | **`draft: true`** |
| 12 | `/case-studies/` | evidence hub + placement ledger | yes |
| 13 | `/case-studies/[slug]/` | per-client detail | yes |
| 14 | `/about/` | company, founder, entity facts | yes |
| 15 | `/insights/` | article index | yes |
| 16 | `/insights/[slug]/` | articles (4 at launch) | yes |
| 17 | `/contact/` | contact | yes |
| 18 | `/careers/` | roles + `JobPosting` schema | yes |
| 19 | `/careers/[slug]/` | per-role | yes |
| 20 | `/privacy/` | privacy policy | **noindex** |
| 21 | `/candidate-privacy/` | Art. 14 notice (Annex A), standalone linkable URL | **noindex** |
| 22 | `/terms/` | terms & conditions | **noindex** |
| 23 | `/cookies/` | cookie policy | **noindex** |
| 24 | `/imprint/` | legal notice / entity identification | **noindex** |

### D1.1 · `draft: true` routes (9, 10, 11)

The SEO critic's doorway-page finding is accepted **in substance**: TalentSync has
nine placements across five clients, which is not enough lived evidence for six role
pages. It is **not** accepted as a scope cut, because the user asked for these pages.

Resolution: build them completely, then gate publication on evidence.

- `draft: true` in the page data ⇒ route is generated, **excluded from `sitemap.ts`**,
  emits `robots: { index: false, follow: true }`, and carries **no** inbound link from
  nav, footer or any body copy.
- Flipping `draft: false` is a one-line change once a named placement exists for that
  role. The guard script fails if `draft: false` and the page has fewer than **2** named
  client placements in its evidence block.

### D1.2 · Routes 2 and 3 are a cannibalisation pair — enforce the split mechanically

Accepted risk, mitigated rather than dodged:

- Route 2 carries **no** engagement-model blocks and **no** CTA-first framing. It is a
  country-selection guide. `Article` schema, dated, attributed.
- Route 3 carries the two engagement-model blocks and the process. `Service` schema.
- **Guard assertion:** no sentence of 12+ words appears in both pages' rendered body
  text. Build fails on a hit.

---

## D2 · Analytics = **GA4 + consent banner**

The user's brief says "Connect Google Analytics". That is explicit and it stands.
The cookie-policy draft's Plausible recommendation is noted and rejected on that basis.

Consequences, all of which are mandatory:

- Google Consent Mode v2, default **denied** for every signal.
- No GA4 script loads until affirmative consent. Reject is as prominent as Accept.
- No cookie wall. Dismissing without choosing = denied.
- Privacy policy §4/§13 and the cookie policy are written for **GA4** — the drafts'
  "we set no cookies of our own" wording is deleted wherever it appears.
- `{{ANALYTICS_PROVIDER}}` = `Google Analytics 4`. `{{ANALYTICS_STATUS}}` = live.

> Lazier alternative if Victor changes his mind: Plausible removes the banner, the
> consent component, and ~120 lines. One-line swap in `Analytics.tsx`.

## D3 · AI screening = **NO**

`{{USES_AI_SCREENING}}` = no. `{{AI_SCREENING_POSITION}}` = "We do not use automated
decision-making or AI screening to evaluate candidates." Truthful today. If that
changes, the privacy policy changes in the same release.

## D4 · Governing law = **Republic of Moldova** (per `04-terms.md` clause 10)

Not re-litigated. The terms critic's objection is recorded in `08-critique-terms.md`
and surfaces in the blocker list for Victor, not in the code.

## D5 · Entity spelling

**`Chișinău`** with diacritics, everywhere — copy, schema, footer NAP. One spelling.
The same NAP block renders visibly in the footer on every route, matching the
`Organization` JSON-LD exactly.

## D6 · Structured data

- `Organization` with `additionalType: EmploymentAgency`, emitted once, in the root layout.
- **Never** `Review`, **never** `aggregateRating`. Self-serving review markup risks a
  manual action. The three testimonials render as plain HTML.
- `FAQPage` on `/` only. Visible `<details>` FAQ blocks stay on every page that has one.
- `JobPosting` on `/careers/[slug]/`; guard fails on a past `validThrough`.
- `Article` on route 2 and every `/insights/[slug]/`, with a real named author.

## D7 · Claims

- Barça "1.5M app downloads in first 3 months" — **CUT**. No public linkable source.
- All Barça/Orange results reworded to what TalentSync contributed (who was placed,
  into what), never implying TalentSync built the product.
- "€15–35/hour" — **CUT** from the site.
- "Save up to 60%" — **CUT**, replaced per `06-claims-measurement.md`.
- "1–2 weeks" — qualified, never bare.
- "Full-time, part-time, contract, or project-based placements" — **CUT**. Replaced by
  the two engagement models, worded identically everywhere.
- The line "TalentSync is not a project outsourcing company…" appears on `/`,
  `/b2b-engineer-recruitment/` and `/hourly-engineering-talent/`.

## D8 · Placeholder tokens

96 `{{TOKEN}}`s exist across the legal drafts. Resolution rule:

1. Where the draft states a recommended default inline, **take it** and delete the token.
2. Where the value is a business fact no one can infer, keep the token and add it to
   `docs/plans/BLOCKERS.md`.
3. `npm run verify` **exits non-zero** if any `{{TOKEN}}` survives into `out/`.
   `npm run build` still passes, so local review works.

**[OWNER: VICTOR] — cannot be defaulted:** `LEGAL_ENTITY_NAME`, `LEGAL_FORM`, `IDNO`,
`REGISTERED_ADDRESS`, `VAT_STATUS`, `EU_REP_*`, `PRIVACY_CONTACT_NAME`, `PRIVACY_EMAIL`,
founder full name + LinkedIn, `PLACEMENT_FEE_PERCENT`, `MINIMUM_FEE`,
`GA4_MEASUREMENT_ID`, insurance limits.

## D9 · nginx — the verified fix

```
absolute_redirect off;
port_in_redirect off;
error_page 404 /404.html;
location = /404.html { internal; }
location / { try_files $uri $uri.html $uri/ =404; }
```

The old `/index.html` fallback returned **HTTP 200 with the homepage** for every unknown
URL. Smoke-test five URLs against the built image: `/privacy` (301 → relative `/privacy/`),
`/privacy/` (200), `/nonexistent` (404 + `404.html`), `/sitemap.xml` (200), `/robots.txt` (200).

## D10 · Metadata

- `alternates` is **deleted** from `layout.tsx`. Canonical is set only by `pageMeta()`.
- `pageMeta()` returns a **complete** object every call — `openGraph` does not merge with
  the parent, it replaces it.
- OG image lives at `src/app/opengraph-image.png` (1200×630), **not** `public/`.
- Guard asserts canonical **value**, not just presence.

## D11 · Design

`00-design-contract.md` is binding in full. The Ten Rules go into every implementation
prompt. Mobile (360px) is the primary target. No new npm dependency without a written
reason in the commit message.

## D12 · Git

Branch `feat/seo-multipage-legal`. **Never** push. **Never** touch `main`. Commit
frequently with conventional-commit messages. The user reviews locally.
