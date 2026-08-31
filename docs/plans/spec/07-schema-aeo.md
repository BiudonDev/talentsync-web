# TalentSync — Structured Data & AI Discoverability Specification

**Scope:** 13-page static export (`output: 'export'`), nginx on Railway. All markup must be build-time static — no runtime generation available.

Every claim below is tagged **[DOCUMENTED]** (vendor primary source, URL given) or **[CONSENSUS]** (practitioner belief, no vendor confirmation). Read the tags. Several widely-repeated "AEO" beliefs do not survive contact with the primary sources, and I have flagged them rather than sold them to you.

---

## 0. Two blocking defects to fix before any schema ships

Structured data is worthless if the URLs it sits on are broken. Both of these are in the current repo.

### 0.1 The nginx soft-404 will poison entity resolution

`nginx.conf` has:

```nginx
location / { try_files $uri $uri.html $uri/ /index.html; }
```

Every unknown URL returns **HTTP 200 with the homepage**. Once you have 13 pages, every typo, stale link, hallucinated URL and crawler-invented path resolves to a 200-OK copy of the homepage carrying the homepage's `Organization` JSON-LD and canonical.

Google's guidance on soft 404s is that pages which don't exist must return 404 or 410; returning 200 wastes crawl budget and causes the URLs to be treated as real. **[DOCUMENTED]** — <https://developers.google.com/search/docs/crawling-indexing/http-network-errors>

Fix:

```nginx
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
```

Next.js `output: 'export'` emits `out/404.html` from `src/app/not-found.tsx`. Add that file.

### 0.2 No `metadataBase`, no canonicals, and a trailing-slash mismatch waiting to happen

`layout.tsx` has no `metadataBase` and no `alternates.canonical`. With `trailingSlash: true`, every canonical **must** carry the trailing slash or you will self-report a canonical that 301s. Add to `layout.tsx`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://talentsync.eu'),
  // ...
}
```

and per page: `alternates: { canonical: '/hire-ai-engineers/' }`.

---

## 1. Type selection, page by page

### 1.1 The `EmploymentAgency` vs `Organization` decision

**`ProfessionalService` is off the table entirely — it is deprecated.** schema.org states verbatim: *"The general ProfessionalService type for local businesses was deprecated due to confusion with Service."* **[DOCUMENTED]** — <https://schema.org/ProfessionalService>

So the real choice is `EmploymentAgency` vs `Organization`.

**The case for `EmploymentAgency`:** schema.org defines it, verbatim, as *"An employment agency."* **[DOCUMENTED]** — <https://schema.org/EmploymentAgency>. Semantically it is an exact hit, and Google's Local Business docs say to *"use the most specific `LocalBusiness` sub-type possible."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/local-business>

**The case against:** `EmploymentAgency` has **two** parent paths — `Thing > Organization > LocalBusiness > EmploymentAgency` **and** `Thing > Place > LocalBusiness > EmploymentAgency`. **[DOCUMENTED]** — <https://schema.org/EmploymentAgency>. Choosing it asserts that TalentSync *is a Place*. schema.org defines `LocalBusiness` as *"A particular physical business or branch of an organization."* **[DOCUMENTED]** — <https://schema.org/LocalBusiness>

Three consequences follow:

1. Google's Local Business rich result **requires `address`** as a required property. TalentSync currently has no publishable street address — only "Chișinău, Moldova". A `LocalBusiness` node with a locality-only address is missing a required property and is therefore **ineligible for the rich result anyway**, so you pay the Place semantics and get nothing back.
2. Local Business rich results and the local pack are driven overwhelmingly by a verified Google Business Profile, not by markup. Without GBP (see §7), the markup has nothing to attach to. **[CONSENSUS]**
3. Google's structured data policy is explicit: *"Your structured data must be a true representation of the page content"* and violations *"can result in a manual action."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>. Asserting a visitable physical business you do not operate is the kind of misrepresentation that policy targets.

### Recommendation

**Primary type: `Organization`, with `additionalType` pointing at `EmploymentAgency`.**

```json
"@type": "Organization",
"additionalType": "https://schema.org/EmploymentAgency"
```

This keeps the precise industry semantics — an LLM or knowledge graph reading `additionalType` learns "employment agency" exactly as it would from the direct type — without asserting `Place`, without inheriting a required `address` you cannot fill, and without claiming premises you do not have.

Google's `Organization` doc confirms the low-risk profile: *"There are no required properties; instead, add the properties that apply to your organization."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/organization>

**Upgrade trigger:** the day TalentSync has (a) a real staffed street address in Chișinău, and (b) a verified Google Business Profile at that address, switch `@type` to `EmploymentAgency`, drop `additionalType`, and add full `PostalAddress` + `geo` + `openingHoursSpecification`. Not before. That is a 3-line diff, so there is no cost to deferring it.

### 1.2 Page-by-page type map

Two JSON-LD blocks per page: one emitted from `layout.tsx` (identity, identical everywhere), one from each `page.tsx` (page-specific).

**Emitted in `layout.tsx` on all 13 pages** — `@graph: [Organization, WebSite]`.

> Google recommends the Organization node go *"on your home page, or a single page that describes your organization"* **[DOCUMENTED]** (<https://developers.google.com/search/docs/appearance/structured-data/organization>). Emitting it site-wide with a stable `@id` is not a violation — Google consolidates by `@id`/URL — and it means any single page fetched in isolation by an AI crawler carries the full company identity. That self-containment is the whole point for AEO. **[CONSENSUS]**
>
> `WebSite` is only *required* on the homepage root for the site-name feature: *"The `WebSite` structured data must be on the home page of the site."* **[DOCUMENTED]** (<https://developers.google.com/search/docs/appearance/site-names>). Extra copies are ignored, so shipping it from the layout avoids a conditional.

| # | Page | Page-level `@graph` | Notes |
|---|------|---------------------|-------|
| 1 | `/` | `WebPage`, `FAQPage`\* | No `BreadcrumbList` on the root. `WebSite` + `Organization` come from layout. |
| 2 | `/tech-recruitment-eastern-europe/` | `CollectionPage`, `BreadcrumbList`, `Service`, `FAQPage`\* | Pillar page. `Service` = the whole practice, `areaServed` = Europe. |
| 3 | `/hire-software-developers-eastern-europe/` | `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`\* | |
| 4 | `/b2b-engineer-recruitment/` | `WebPage`, `BreadcrumbList`, `Service` (`#b2b-recruitment`), `FAQPage`\* | Engagement model 1. Canonical `@id` target for `Organization.makesOffer`. |
| 5 | `/hourly-engineering-talent/` | `WebPage`, `BreadcrumbList`, `Service` (`#hourly-collaboration`), `Offer`+`UnitPriceSpecification`†, `FAQPage`\* | Engagement model 2. Only page where an hourly price belongs. |
| 6 | `/hire-ai-engineers/` | `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`\* | `serviceType` differentiates these five. |
| 7 | `/hire-backend-developers/` | same | |
| 8 | `/hire-devops-engineers/` | same | |
| 9 | `/hire-qa-engineers/` | same | |
| 10 | `/hire-full-stack-developers/` | same | |
| 11 | `/technical-recruitment-moldova/` | `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`\* | The one page where `Place`/geo signals are on-topic. If GBP ever lands, link it here via `Organization.sameAs`. |
| 12 | `/case-studies/` | `CollectionPage`, `BreadcrumbList`, `ItemList` → `Article[]` | See §1.3. |
| 13 | `/about/` | `AboutPage`, `BreadcrumbList`, `Person` (founder) | Home of the canonical paragraph + facts block (§4). |
| 14 | `/insights/` | `Blog` or `CollectionPage`, `BreadcrumbList`, `ItemList` → `BlogPosting[]` | Individual posts: `BlogPosting` + `Person` author + `BreadcrumbList`. |

\* Only where the page actually renders a visible Q&A block. See §2.3.
† Only if the rate is visibly stated on the page and is accurate. See §1.4.

### 1.3 `ItemList` for case studies — context only, no rich result

Google's carousel documentation restricts host carousels to four verticals, verbatim: *"add `ItemList` structured data in combination with one of the following supported structured data features: Course list, Movie, Recipe, Restaurant."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/carousel>

Recruitment case studies are none of those. `ItemList` on `/case-studies/` earns **zero** rich results. Emit it anyway as machine-readable context — it gives an LLM an unambiguous, enumerable list of ten client engagements with named `about` organizations, which is exactly the shape a retrieval system can chunk and quote. **[CONSENSUS]**

There is no `CaseStudy` type in schema.org. Use `Article` per entry with `about` → the client `Organization`.

### 1.4 Three hard warnings on type misuse

**Do not emit `JobPosting` on the "hire X" pages.** Those pages sell a recruitment service; they do not advertise a specific open role. `JobPosting` there is a false representation of page content and squarely inside the manual-action policy quoted above. **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>

**But do emit `JobPosting` on a real `/careers/` page.** `src/data/content.ts` already holds two genuine open roles (Senior Technical Recruiter; Business Development Manager). `Job posting` **is** on Google's current supported-features list **[DOCUMENTED]** (<https://developers.google.com/search/docs/appearance/structured-data/search-gallery>) — making it the single highest-value rich result TalentSync actually qualifies for, and it is on a page missing from the 13-page IA. Flagging this as a gap in the information architecture, not just the schema.

**Do not put the disputed claims into JSON-LD.** "Save up to 60%", "€15-35/hour", "1-2 weeks time to hire" and "1.5M app downloads" are listed as under review. Structured data must *"be a true representation of the page content"* and must not *"deceive or mislead users."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>. A number that is merely marketing copy on the page is survivable; the same number asserted as a machine-readable `Offer.priceSpecification` or `AggregateRating` is a policy exposure. Gate every one of them on the client confirming it in writing, and keep the `Offer` block commented out until then.

---

## 2. Rich results in 2026 vs machine-readable context

Google's supported-features gallery, last updated 2026-06-15, lists exactly 25 features. `FAQ` and `HowTo` are **absent**. **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/search-gallery>

| Type | Google rich result in 2026? | Verdict for TalentSync |
|---|---|---|
| `Organization` | Yes — feeds brand profile / knowledge panel **[DOCUMENTED]** | **Ship.** Highest-value block on the site. |
| `WebSite` | Yes — site name in results **[DOCUMENTED]** | **Ship** (homepage minimum). |
| `BreadcrumbList` | Yes — one of the few with a live Search Console report **[DOCUMENTED]** | **Ship** on all 12 non-root pages. |
| `Article` / `BlogPosting` | Yes — better title, image, date **[DOCUMENTED]** | **Ship** on `/insights/` posts. |
| `Person` (as `Article.author`) | Supporting, not standalone | **Ship** nested in `Article`. |
| `JobPosting` | Yes **[DOCUMENTED]** | Ship — but only on a real `/careers/`. |
| `LocalBusiness`/`EmploymentAgency` | Yes, *if* eligible | **Skip** until GBP + street address exist. |
| `Service` / `Offer` | **No rich result.** Not on the gallery list. | **Ship anyway** — context only. |
| `ItemList` | Only in 4 verticals **[DOCUMENTED]** | **Ship anyway** — context only. |
| `FAQPage` | **No. Retired.** | **Ship anyway** — see below. |

### 2.3 FAQPage: retired for rich results, still worth emitting

The full arc:

- **August 2023** — Google restricted FAQ rich results to well-known authoritative government and health sites. Most sites lost eligibility here. **[CONSENSUS]** as to the exact scope; widely reported.
- **7 May 2026** — full retirement. Google's own FAQPage doc now carries a deprecation banner reading verbatim: *"This feature will no longer appear in Google Search starting May 7, 2026."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/faqpage>
- The Search Console FAQ report and Rich Results Test support followed in June 2026. **[CONSENSUS]**

**Is it still worth emitting? Yes — and Google itself says so.** The same deprecation page states verbatim:

> *"You can leave the markup on your site so that search engines and other systems can better understand your web page."*

**[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/faqpage>

That phrase — *"and other systems"* — is the closest thing to a vendor endorsement of schema-for-AI-extraction that exists in Google's documentation. `FAQPage` gives you a machine-readable question→answer pairing where the question string is a literal user query and the answer is a self-contained, quotable span. That is precisely the unit a RAG retriever wants. The cost is a few hundred bytes of build-time JSON derived from `src/data/faq.ts`, which you already have.

**Ship it. Expect zero SERP change.** Do not let anyone report FAQ markup as an SEO win.

### 2.4 The honest caveat nobody in the AEO industry quotes

Google's own AI-features documentation says, verbatim:

> *"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."*

> *"You don't need to create new machine readable files, AI text files, or markup to appear in these features. There's also no special schema.org structured data that you need to add."*

**[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/ai-features>

Read plainly: **Google explicitly denies that structured data is a lever for AI Overviews or AI Mode.** Every claim that "schema is how you win AI search" is **[CONSENSUS]** at best, and is contradicted by the vendor.

So why ship any of this? Three defensible reasons, honestly graded:

1. `Organization`, `WebSite`, `BreadcrumbList`, `Article` and `JobPosting` earn real, documented Google features. That alone justifies the work. **[DOCUMENTED]**
2. Google states the markup helps *"search engines and other systems"* understand the page. **[DOCUMENTED]**
3. Non-Google answer engines have no equivalent disclaimer, and structured data is cheap, unambiguous, and cannot be misread the way prose can. **[CONSENSUS]**

What Google *does* document as mattering for AI features is far more boring: *"Making sure that important content is available in textual form."* **[DOCUMENTED]** — same URL. Which is why §0 (soft-404s) and §8 (on-page prose) will move the needle more than any JSON-LD block in this document.

---

## 3. Exact JSON-LD blocks

Implementation shape for this repo — three files, one component:

```
src/components/JsonLd.tsx      // 5-line renderer
src/data/schema.ts             // organization, website, helpers
src/app/<route>/page.tsx       // server component, emits page graph
```

```tsx
// src/components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

Each route's `page.tsx` must be a **server** component (drop `'use client'` to the section components) so the JSON-LD is in the prerendered HTML rather than injected by React on hydration. Under `output: 'export'` both end up static, but crawlers that do not execute JS will only see the former.

### 3.1 Organization + WebSite — emit from `layout.tsx` on every page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://talentsync.eu/#organization",
      "additionalType": "https://schema.org/EmploymentAgency",
      "name": "TalentSync",
      "legalName": "{{LEGAL_ENTITY_NAME}}",
      "url": "https://talentsync.eu/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://talentsync.eu/#logo",
        "url": "https://talentsync.eu/images/talentsync-logo.png",
        "width": 512,
        "height": 512,
        "caption": "TalentSync"
      },
      "image": { "@id": "https://talentsync.eu/#logo" },
      "description": "TalentSync is a technology recruitment and engineering talent partner based in Chisinau, Moldova. It helps European and international product companies engage vetted senior engineers from Eastern Europe through direct B2B recruitment and flexible hourly collaboration.",
      "disambiguatingDescription": "TalentSync is not a project outsourcing company. We help companies add experienced engineers to their existing teams while retaining full technical and operational control.",
      "email": "victor@talentsync.eu",
      "telephone": "+373 68 300 700",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{{STREET_ADDRESS}}",
        "addressLocality": "Chisinau",
        "postalCode": "{{POSTAL_CODE}}",
        "addressCountry": "MD"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "name": "New client enquiries",
          "email": "victor@talentsync.eu",
          "telephone": "+373 68 300 700",
          "url": "https://calendly.com/talentsync-meeting/30min",
          "areaServed": ["EU", "GB", "CH", "NO", "US"],
          "availableLanguage": ["en", "ro", "ru"]
        }
      ],
      "sameAs": [
        "https://linkedin.com/company/talentsync"
      ],
      "areaServed": [
        { "@type": "Place", "name": "Europe" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United States" }
      ],
      "knowsAbout": [
        "Technology recruitment",
        "Software engineering staff augmentation",
        "Eastern European software developers",
        "AI and machine learning engineers",
        "Backend engineering",
        "DevOps and cloud infrastructure",
        "QA and test automation",
        "Full-stack development"
      ],
      "knowsLanguage": ["en", "ro", "ru"],
      "foundingDate": "{{FOUNDING_YEAR}}",
      "founder": { "@id": "https://talentsync.eu/about/#victor" },
      "makesOffer": [
        { "@type": "Offer", "itemOffered": { "@id": "https://talentsync.eu/b2b-engineer-recruitment/#service" } },
        { "@type": "Offer", "itemOffered": { "@id": "https://talentsync.eu/hourly-engineering-talent/#service" } }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://talentsync.eu/#website",
      "url": "https://talentsync.eu/",
      "name": "TalentSync",
      "alternateName": "TalentSync.eu",
      "description": "Technology recruitment and engineering talent from Eastern Europe for European and international product companies.",
      "publisher": { "@id": "https://talentsync.eu/#organization" },
      "inLanguage": "en"
    }
  ]
}
```

**Notes on this block:**

- **No `SearchAction`.** The sitelinks search box was retired globally on 21 November 2024 and the `WebSite`/`SearchAction` markup that powered it no longer does anything. `WebSite` remains supported for site names. **[DOCUMENTED]** — <https://developers.google.com/search/blog/2024/10/sitelinks-search-box>
- **`sameAs` is thin — one URL.** This is the weakest part of the entity graph and the highest-leverage thing to fix. Every additional authoritative profile (Clutch, Crunchbase, a national business register entry, GitHub org, X) is a corroborating edge. See §7.
- **`disambiguatingDescription`** is schema.org's *"short description of the item used to disambiguate from other, similar items"* — an exact fit for the anti-positioning statement, and better than burying it in `description`.
- **Delete, do not guess.** If `{{LEGAL_ENTITY_NAME}}`, `{{STREET_ADDRESS}}`, `{{POSTAL_CODE}}` or `{{FOUNDING_YEAR}}` are unknown, **remove the property entirely**. A wrong value is worse than a missing one; `Organization` has no required properties **[DOCUMENTED]**.
- **`addressLocality: "Chisinau"`, not "Chișinău".** See §7.1 — pick one spelling and never deviate. The codebase currently uses the diacritic form in `siteConfig.location`.

### 3.2 `Service` — `/hourly-engineering-talent/`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://talentsync.eu/hourly-engineering-talent/#webpage",
      "url": "https://talentsync.eu/hourly-engineering-talent/",
      "name": "Hourly Engineering Talent — Add Senior Engineers to Your Team | TalentSync",
      "isPartOf": { "@id": "https://talentsync.eu/#website" },
      "about": { "@id": "https://talentsync.eu/hourly-engineering-talent/#service" },
      "inLanguage": "en",
      "primaryImageOfPage": { "@id": "https://talentsync.eu/#logo" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://talentsync.eu/hourly-engineering-talent/#breadcrumbs",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://talentsync.eu/" },
        { "@type": "ListItem", "position": 2, "name": "Hourly Engineering Talent" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://talentsync.eu/hourly-engineering-talent/#service",
      "name": "Flexible hourly engineering collaboration",
      "serviceType": "Hourly software engineering collaboration",
      "provider": { "@id": "https://talentsync.eu/#organization" },
      "url": "https://talentsync.eu/hourly-engineering-talent/",
      "description": "A vetted senior engineer joins the client's existing team and is billed hourly. The client retains control of architecture, roadmap, priorities, processes and day-to-day management. TalentSync sources and validates the engineer; it does not take ownership of the project.",
      "areaServed": [
        { "@type": "Place", "name": "Europe" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United States" }
      ],
      "audience": {
        "@type": "BusinessAudience",
        "name": "Product companies with an in-house engineering team"
      },
      "termsOfService": "https://talentsync.eu/hourly-engineering-talent/"
    }
  ]
}
```

**The `Offer` block — hold until the rate is confirmed.** If and only if "€15-35/hour" is verified and visibly printed on this page, add inside the `Service` node:

```json
"offers": {
  "@type": "Offer",
  "@id": "https://talentsync.eu/hourly-engineering-talent/#offer",
  "availability": "https://schema.org/InStock",
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "priceCurrency": "EUR",
    "minPrice": 15,
    "maxPrice": 35,
    "unitCode": "HUR",
    "valueAddedTaxIncluded": false
  }
}
```

`unitCode: "HUR"` is the UN/CEFACT code for hour. If the rate is a "from" figure rather than a true ceiling, drop `maxPrice` and use `minPrice` alone — a `maxPrice` you exceed in practice is a false machine-readable claim.

### 3.3 `Service` — `/b2b-engineer-recruitment/`

Same shape. The differentiating node:

```json
{
  "@type": "Service",
  "@id": "https://talentsync.eu/b2b-engineer-recruitment/#service",
  "name": "Direct B2B engineer recruitment",
  "serviceType": "Permanent technology recruitment",
  "provider": { "@id": "https://talentsync.eu/#organization" },
  "url": "https://talentsync.eu/b2b-engineer-recruitment/",
  "description": "TalentSync sources and validates the engineer for a long-term engagement. The client selects and manages the engineer directly, avoiding the cost and complexity of local employment in the engineer's country.",
  "areaServed": [{ "@type": "Place", "name": "Europe" }],
  "audience": {
    "@type": "BusinessAudience",
    "name": "Product companies hiring senior engineers for long-term roles"
  }
}
```

No `offers` node — placement fees are not published.

### 3.4 `Service` — the five role pages (`/hire-ai-engineers/` pattern)

One template, five `serviceType` values. Keep them genuinely distinct or you have five near-duplicate pages, which is a bigger problem than any schema decision.

```json
{
  "@type": "Service",
  "@id": "https://talentsync.eu/hire-ai-engineers/#service",
  "name": "Hire AI engineers from Eastern Europe",
  "serviceType": "AI and machine learning engineer recruitment",
  "provider": { "@id": "https://talentsync.eu/#organization" },
  "url": "https://talentsync.eu/hire-ai-engineers/",
  "description": "TalentSync sources and vets senior AI and machine learning engineers in Eastern Europe for European and international product companies, through direct B2B recruitment or flexible hourly collaboration.",
  "areaServed": [{ "@type": "Place", "name": "Europe" }],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Engagement models",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@id": "https://talentsync.eu/b2b-engineer-recruitment/#service" } },
      { "@type": "Offer", "itemOffered": { "@id": "https://talentsync.eu/hourly-engineering-talent/#service" } }
    ]
  }
}
```

`serviceType` per page: `AI and machine learning engineer recruitment` / `Backend engineer recruitment` / `DevOps and cloud infrastructure engineer recruitment` / `QA and test automation engineer recruitment` / `Full-stack engineer recruitment`.

### 3.5 `FAQPage`

Generate from `src/data/faq.ts` so the JSON and the DOM can never drift — this is what satisfies *"Don't mark up content that is not visible to readers of the page."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://talentsync.eu/hourly-engineering-talent/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What regions do you source talent from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TalentSync sources engineers across Eastern Europe and is headquartered in Chisinau, Moldova, with local expertise in Moldova, Romania, Ukraine and Poland."
      }
    },
    {
      "@type": "Question",
      "name": "What engagement models do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two. Direct B2B recruitment, where TalentSync sources and validates the engineer for a long-term engagement and the client selects and manages them directly. And flexible hourly collaboration, where the engineer joins the client's existing team and is billed hourly while the client keeps control of architecture, roadmap and day-to-day management."
      }
    },
    {
      "@type": "Question",
      "name": "Is TalentSync an outsourcing company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. TalentSync is not a project outsourcing company. It helps companies add experienced engineers to their existing teams while the client retains full technical and operational control of the work."
      }
    }
  ]
}
```

Only one `FAQPage` node per URL. The `text` field accepts limited HTML; plain text is safer and quotes more cleanly.

### 3.6 `ItemList` — `/case-studies/`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://talentsync.eu/case-studies/#webpage",
      "url": "https://talentsync.eu/case-studies/",
      "name": "Case Studies | TalentSync",
      "isPartOf": { "@id": "https://talentsync.eu/#website" },
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://talentsync.eu/case-studies/#breadcrumbs",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://talentsync.eu/" },
        { "@type": "ListItem", "position": 2, "name": "Case Studies" }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://talentsync.eu/case-studies/#list",
      "name": "TalentSync client engagements",
      "numberOfItems": 10,
      "itemListOrder": "https://schema.org/ItemListUnordered",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Article",
            "@id": "https://talentsync.eu/case-studies/#barca-mobile",
            "headline": "Barça Mobile — engineering talent for an AI super app",
            "about": { "@type": "Organization", "name": "Barça Mobile" },
            "author": { "@id": "https://talentsync.eu/#organization" },
            "publisher": { "@id": "https://talentsync.eu/#organization" },
            "isPartOf": { "@id": "https://talentsync.eu/case-studies/#webpage" },
            "description": "{{VERIFIED_BARCA_SUMMARY}}"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Article",
            "@id": "https://talentsync.eu/case-studies/#orange",
            "headline": "Orange — network integration for the Barça Mobile MVNO",
            "about": { "@type": "Organization", "name": "Orange" },
            "author": { "@id": "https://talentsync.eu/#organization" },
            "publisher": { "@id": "https://talentsync.eu/#organization" },
            "isPartOf": { "@id": "https://talentsync.eu/case-studies/#webpage" }
          }
        }
      ]
    }
  ]
}
```

Repeat positions 3–10 for Entail AI, New Era Visionary Group, Pixelette Technologies, Qualiwise, SocialBee, Silvertalent, Foodamigos, Innovatec. Generate from `src/data/content.ts`.

`{{VERIFIED_BARCA_SUMMARY}}` is a token deliberately: "1.5M app downloads in first 3 months" and "Led system architecture design and CI/CD implementation" are on the review list, and attributing a client's product metrics to your own engineering in machine-readable form is exactly the misrepresentation risk in §1.4. Naming the client is also a permission question — see open questions.

### 3.7 `Article` + `Person` — `/insights/` posts

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://talentsync.eu/insights/{{SLUG}}/#article",
      "headline": "{{POST_TITLE_UNDER_110_CHARS}}",
      "description": "{{POST_DEK}}",
      "url": "https://talentsync.eu/insights/{{SLUG}}/",
      "datePublished": "{{ISO_8601_DATE}}",
      "dateModified": "{{ISO_8601_DATE}}",
      "author": { "@id": "https://talentsync.eu/about/#victor" },
      "publisher": { "@id": "https://talentsync.eu/#organization" },
      "isPartOf": { "@id": "https://talentsync.eu/insights/#blog" },
      "mainEntityOfPage": { "@id": "https://talentsync.eu/insights/{{SLUG}}/#webpage" },
      "image": ["https://talentsync.eu/images/insights/{{SLUG}}-1200x675.jpg"],
      "inLanguage": "en"
    },
    {
      "@type": "Person",
      "@id": "https://talentsync.eu/about/#victor",
      "name": "{{VICTOR_FULL_NAME}}",
      "jobTitle": "{{JOB_TITLE}}",
      "worksFor": { "@id": "https://talentsync.eu/#organization" },
      "url": "https://talentsync.eu/about/#victor",
      "sameAs": ["{{VICTOR_LINKEDIN_URL}}"]
    }
  ]
}
```

Google's `Article` guidance is specific and easy to get wrong. Verbatim: for `author.name`, *"only specify the name of the author. Don't add any other piece of information"* — no publisher name, no job title, no honorific. And: *"Use the `Person` type for people, and the `Organization` type for organizations. Don't use the `Thing` type, and don't use the wrong type."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/article>

The `jobTitle` goes on the `Person` node, never inside `name`. `author.url` should resolve to a page that genuinely identifies the author — so `/about/` needs a real bio section with that fragment id, not a bare anchor.

---

## 4. The extractable-facts pattern

### 4.1 Why this section matters more than §3

Google documents no schema requirement for AI features, but does say to make *"important content available in textual form."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/ai-features>. Retrieval systems chunk and quote **prose**. Structured data disambiguates; prose is what gets cited. **[CONSENSUS]**

### 4.2 The canonical paragraph

> TalentSync is a technology recruitment and engineering talent partner based in Chisinau, Moldova. It helps European and international product companies engage vetted senior engineers from Eastern Europe through direct B2B recruitment and flexible hourly collaboration.

**35 words, two sentences.** That is close to ideal: the first sentence is a self-contained definition that survives extraction with zero surrounding context, and the second enumerates both engagement models without a pronoun that needs resolving beyond "It", whose antecedent is the first word of the passage.

### Where it goes — five placements, and only five

| Placement | Form | Byte-identical? |
|---|---|---|
| `/about/` — first paragraph after the `<h1>` | Visible `<p>` | **Yes, exactly** |
| `/` — inside the About section | Visible `<p>` | **Yes, exactly** |
| `Organization.description` in JSON-LD (all 13 pages) | JSON string | **Yes, exactly** |
| LinkedIn "About", Clutch, Crunchbase, all directories | Plain text | **Yes, exactly** |
| `<meta name="description">` | Truncated variant — 35 words is ~245 chars, too long | No — see below |

Meta description variant (155 chars, do not confuse it with the canonical string):

> Technology recruitment and engineering talent from Chisinau, Moldova. Vetted senior Eastern European engineers via direct B2B hiring or hourly collaboration.

**Do not put the canonical paragraph in the footer of all 13 pages.** Site-wide boilerplate repeated in every page's body is a near-duplicate signal and is commonly stripped by boilerplate-removal preprocessing before a page ever reaches an index or a retriever. **[CONSENSUS]** Twice as visible prose, plus the JSON-LD (which is not subject to boilerplate stripping), is the right balance.

### 4.3 The facts block

Goes on `/about/`, once, directly under the canonical paragraph. A plain semantic `<dl>` — no microdata, no RDFa. The JSON-LD already carries these values; a third markup layer is redundant and creates a third place to drift.

```html
<h2 id="company-facts">TalentSync at a glance</h2>
<dl class="facts">
  <dt>Legal name</dt>          <dd>{{LEGAL_ENTITY_NAME}}</dd>
  <dt>Founded</dt>             <dd>{{FOUNDING_YEAR}}</dd>
  <dt>Headquarters</dt>        <dd>Chisinau, Moldova</dd>
  <dt>What it does</dt>        <dd>Technology recruitment and engineering talent partner</dd>
  <dt>Who it serves</dt>       <dd>European and international product companies</dd>
  <dt>Talent sourced from</dt> <dd>Eastern Europe — Moldova, Romania, Ukraine, Poland</dd>
  <dt>Engagement models</dt>   <dd>Direct B2B recruitment; flexible hourly collaboration</dd>
  <dt>Not</dt>                 <dd>A project outsourcing company. Clients retain full technical and operational control.</dd>
  <dt>Specialisms</dt>         <dd>AI/ML, backend, DevOps, QA, full-stack engineering</dd>
  <dt>Contact</dt>             <dd>victor@talentsync.eu · +373 68 300 700</dd>
</dl>
```

Why `<dl>` specifically: HTML-to-text and HTML-to-markdown converters — which is what every AI crawler runs before the model sees anything — render `<dl>` as clean `term: value` pairs. `<div>`-with-classes collapses into an ambiguous run-on. The same content in a `<table>` also converts well; `<dl>` is more semantically accurate for key–value data and needs no header row. **[CONSENSUS]**

The `Not` row is the highest-value line in the block. Anti-positioning stated as an explicit negative fact is far harder for a summarizer to invert than positioning implied by omission. **[CONSENSUS]**

### 4.4 Two rules that break extraction

1. **Never put a fact only in an image, an icon label, a `::before`, or an animated counter.** Framer Motion count-up components in particular render `0` in the static HTML. Any number that matters must exist as text in `out/*.html`. Verify with `grep` against the build output, not the browser.
2. **Never state a fact in two places with two different values.** "€15-35/hour" on one page and "from €15/hour" on another gives a retriever two conflicting spans and it will pick one arbitrarily. Single-source every number in `src/data/content.ts`.

---

## 5. llms.txt — straight answer: **No.**

### The state of adoption in 2026

- **No major AI vendor has committed to reading it.** As of 2026, neither OpenAI, Google, Anthropic, Meta nor Mistral has publicly committed to reading or acting on `llms.txt` in production systems. **[CONSENSUS]** — widely reported, and confirmed by absence: OpenAI's crawler documentation (<https://developers.openai.com/api/docs/bots>) and Anthropic's crawler documentation (<https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler>) both direct site owners to **robots.txt** and neither mentions `llms.txt`. **[DOCUMENTED — by omission]**
- **Google has effectively rejected it.** Google's AI-features documentation says verbatim: *"You don't need to create new machine readable files, AI text files, or markup to appear in these features."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/ai-features>. John Mueller has separately compared `llms.txt` to the long-deprecated keywords meta tag. **[CONSENSUS]**
- **The usage data is damning.** An Ahrefs study of ~137,000 sites found **97% of `llms.txt` files received zero AI crawler requests** in May 2026, even as adoption grew 8.8×. **[CONSENSUS]** — third-party study, not vendor data. <https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/>
- **The one real use case does not apply here.** Where `llms.txt` genuinely earns its keep is developer documentation sites — Stripe, Cloudflare, Vercel, Mintlify, Supabase — where AI coding assistants fetch docs at runtime and the file saves tokens by pointing at the right page. **[CONSENSUS]** TalentSync is a 13-page marketing site. No coding assistant will ever fetch it.

### Verdict

**No. Skip it.** A 13-page site with a `sitemap.xml` already has complete, machine-readable URL discovery through a standard every crawler actually reads. `llms.txt` adds a second index that nothing reads, that duplicates the sitemap, and that becomes a stale liability the first time a URL changes and nobody updates it. The 20 minutes goes to the `Organization` block and NAP consistency (§7), both of which have documented effects.

If you are overruled for optics — a client who wants to see the file exists — here it is. It costs nothing but must be regenerated whenever the IA changes.

```markdown
# TalentSync

> TalentSync is a technology recruitment and engineering talent partner based in Chisinau, Moldova. It helps European and international product companies engage vetted senior engineers from Eastern Europe through direct B2B recruitment and flexible hourly collaboration.

TalentSync is not a project outsourcing company. We help companies add experienced
engineers to their existing teams while retaining full technical and operational control.

Contact: victor@talentsync.eu · +373 68 300 700 · https://linkedin.com/company/talentsync

## Engagement models
- [Direct B2B engineer recruitment](https://talentsync.eu/b2b-engineer-recruitment/): TalentSync sources and validates the engineer for a long-term engagement; the client selects and manages the engineer directly.
- [Flexible hourly collaboration](https://talentsync.eu/hourly-engineering-talent/): the engineer joins the client's existing team and is billed hourly; the client retains control of architecture, roadmap, priorities, processes and day-to-day management.

## Roles we recruit
- [AI engineers](https://talentsync.eu/hire-ai-engineers/)
- [Backend developers](https://talentsync.eu/hire-backend-developers/)
- [DevOps engineers](https://talentsync.eu/hire-devops-engineers/)
- [QA engineers](https://talentsync.eu/hire-qa-engineers/)
- [Full-stack developers](https://talentsync.eu/hire-full-stack-developers/)

## Regions
- [Tech recruitment in Eastern Europe](https://talentsync.eu/tech-recruitment-eastern-europe/)
- [Hire software developers in Eastern Europe](https://talentsync.eu/hire-software-developers-eastern-europe/)
- [Technical recruitment in Moldova](https://talentsync.eu/technical-recruitment-moldova/)

## About
- [About TalentSync](https://talentsync.eu/about/)
- [Case studies](https://talentsync.eu/case-studies/)
- [Insights](https://talentsync.eu/insights/)
```

Drop at `public/llms.txt`; `output: 'export'` copies `public/` to `out/` verbatim.

---

## 6. robots.txt and AI crawlers

### 6.1 What each token actually controls

| Token | Vendor | Controls | Blocking costs you | Source |
|---|---|---|---|---|
| `GPTBot` | OpenAI | Model training. *"Disallowing GPTBot indicates a site's content should not be used in training generative AI models"* | Training inclusion only | **[DOCUMENTED]** <https://developers.openai.com/api/docs/bots> |
| `OAI-SearchBot` | OpenAI | ChatGPT search index. *"Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers"* | **Your proven discovery channel.** Catastrophic. | **[DOCUMENTED]** same |
| `ChatGPT-User` | OpenAI | User-triggered fetches. *"Because these actions are initiated by a user, robots.txt rules may not apply"* | Little — it may fetch regardless | **[DOCUMENTED]** same |
| `OAI-AdsBot` | OpenAI | Ad landing page validation; *"data collected by OAI-AdsBot is not used to train generative AI"* | Only relevant if you buy OpenAI ads | **[DOCUMENTED]** same |
| `ClaudeBot` | Anthropic | Model training | Training inclusion only | **[DOCUMENTED]** <https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler> |
| `Claude-User` | Anthropic | User-initiated fetches when someone asks Claude about you | Real — Anthropic honours robots.txt here, unlike peers | **[DOCUMENTED]** same |
| `Claude-SearchBot` | Anthropic | Indexing for Claude's web search | Claude search visibility | **[DOCUMENTED]** same |
| `PerplexityBot` | Perplexity | Search index. *"not used to crawl content for AI foundation models"*; docs say to allow it | Perplexity citations | **[DOCUMENTED]** <https://docs.perplexity.ai/guides/bots> |
| `Perplexity-User` | Perplexity | User-triggered. *"this fetcher generally ignores robots.txt rules"* | Nothing — it ignores you | **[DOCUMENTED]** same |
| `Google-Extended` | Google | Gemini model training **and grounding in Gemini Apps and Grounding with Google Search** | Gemini citations. See §6.3. | **[DOCUMENTED]** <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers> |
| `Applebot-Extended` | Apple | Apple foundation-model *training only*. *"Webpages that disallow Applebot-Extended can still be included in search results"* | Training only — Spotlight/Siri/Safari unaffected | **[DOCUMENTED]** <https://support.apple.com/en-us/119829> |
| `Applebot` | Apple | *"Spotlight, Siri, and Safari"* search | Apple ecosystem search | **[DOCUMENTED]** same |
| `Bingbot` / `msnbot` | Microsoft | Bing crawl and index — which also **grounds Copilot** | Bing **and** Copilot together | **[CONSENSUS]** on the Copilot coupling |
| `CCBot` | Common Crawl | Open crawl corpus, used as training input by many labs downstream | Broad, indirect, unmeasurable training reach | **[DOCUMENTED]** <https://commoncrawl.org/ccbot> |

**Bing's AI controls are meta tags, not robots.txt.** `NOARCHIVE` excludes content from Copilot answers and from Microsoft foundation-model training; `NOCACHE` limits Copilot to URL, title and snippet. Both still allow normal search results. **[DOCUMENTED]** — <https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat>. TalentSync should use **neither**.

### 6.2 Recommended robots.txt — verbatim

For a company that wants to be found in AI answers, the correct file blocks nothing. Ship exactly this at `public/robots.txt`:

```
# https://talentsync.eu/robots.txt
# TalentSync welcomes AI crawlers, search crawlers and answer engines.
# Deliberately no Disallow rules. See docs/seo-policy.md before editing.

User-agent: *
Allow: /

Sitemap: https://talentsync.eu/sitemap.xml
```

That is the whole file. Three notes:

- **Never block `/_next/`.** Google needs the JS and CSS to render the page. There is nothing in a static export worth hiding.
- **`Allow: /` under `User-agent: *` is redundant** — the default is allow — but it makes the intent explicit to the next developer, which is the actual purpose of the comment block above it.
- **Do not add per-bot `Allow` groups.** They look reassuring and are a trap: robots.txt group matching means a crawler obeys **only the most specific matching group**. Create `User-agent: GPTBot` with `Allow: /` and GPTBot now ignores your `User-agent: *` group entirely — including any future rule you add there. You gain nothing and create a silent divergence. **[DOCUMENTED]** — group precedence per <https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt>

`sitemap.xml`: Next.js `app/sitemap.ts` works under `output: 'export'` and emits a static `out/sitemap.xml`. Use it rather than hand-maintaining a file.

### 6.3 The Google-Extended trap

The trap has two halves, and most people only know the first.

**Half one — blocking it protects nothing you think it protects.** Google documents verbatim that `Google-Extended` *"does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers>. Its scope is training Gemini models and *"grounding … in Gemini Apps and Grounding with Google Search."*

Crucially, **AI Overviews and AI Mode in Google Search are not in that scope.** They are built on Googlebot-crawled content. Google's AI-features doc confirms the only levers are *"robots.txt directives for Googlebot"* plus *"`nosnippet`, `data-nosnippet`, `max-snippet`, or `noindex`"* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/ai-features>. So a company that blocks `Google-Extended` to "keep our content out of Google's AI" achieves exactly none of that. It stays in AI Overviews and loses Gemini. Pure downside.

**Half two — the default-on toggle.** Because blocking `Google-Extended` carries zero Search penalty, it is the free-looking checkbox. Countless SEO checklists, CMS "block AI crawlers" switches, WAF bot-management presets and Cloudflare AI-scraper rules enable it by default or in one click. A company whose proven discovery channel is AI chat can therefore be silently opted out of Gemini grounding by a plugin nobody audited.

**Actions for TalentSync:**

1. `Google-Extended` must **not** appear in `robots.txt`. Confirmed by the file in §6.2.
2. Audit Railway/Cloudflare or any edge layer for a "block AI bots" toggle and turn it **off**. A 403 at the edge overrides a permissive robots.txt and is invisible in the repo.
3. `OAI-SearchBot` is the single most expensive thing to block, given ChatGPT is the proven channel. Documented consequence: *"will not be shown in ChatGPT search answers."*
4. Never add `nosnippet` or `max-snippet` anywhere. Those are the only real controls over AI Overview inclusion, and TalentSync wants inclusion.
5. Add a `docs/seo-policy.md` recording that the empty robots.txt is deliberate. The most likely future regression is a well-meaning developer "hardening" it.

---

## 7. NAP and entity consistency

### 7.1 Pick one spelling of Chisinau and never deviate

`src/data/content.ts` currently has `location: 'Chișinău, Moldova'` with diacritics. The client's required canonical paragraph uses `Chisinau` without. **These are different strings.**

**Ruling: `Chisinau`, no diacritics, everywhere machine-readable.** Reasons: the client's required canonical paragraph is a fixed verbatim string and everything else should match it; many directories mangle or reject non-ASCII; and ASCII matches how English-language sources overwhelmingly render it, which is what an entity resolver is reconciling against. Use `Chișinău` only in decorative on-page prose if the client insists, never in the NAP string, never in JSON-LD, never on a directory.

Update `siteConfig.location` accordingly.

### 7.2 The canonical NAP block

Replicate **byte-identically** on LinkedIn, Clutch, Crunchbase, Google Business Profile (if obtained), any national register listing, and every directory. Store it in `docs/nap.md` and copy-paste it — never retype it.

```
Name:        TalentSync
Address:     {{STREET_ADDRESS}}, Chisinau, {{POSTAL_CODE}}, Moldova
Phone:       +373 68 300 700
Email:       victor@talentsync.eu
Website:     https://talentsync.eu
LinkedIn:    https://linkedin.com/company/talentsync
Category:    Employment agency / Technology recruitment
```

Description — use the canonical paragraph, unmodified:

```
TalentSync is a technology recruitment and engineering talent partner based in
Chisinau, Moldova. It helps European and international product companies engage
vetted senior engineers from Eastern Europe through direct B2B recruitment and
flexible hourly collaboration.
```

Short form for fields capped near 160 characters:

```
Technology recruitment and engineering talent from Chisinau, Moldova. Vetted senior
Eastern European engineers via direct B2B hiring or hourly collaboration.
```

Phone format: **`+373 68 300 700`** everywhere — website, JSON-LD `telephone`, and all directories. Do not use `+37368300700` in one place and the spaced form in another. (E.164 is marginally more machine-friendly, but a single consistent format beats a marginally better inconsistent one.)

### 7.3 Why byte-identical matters

An entity resolver — Google's Knowledge Graph, or an LLM reconciling retrieved passages — is matching strings across independent sources to decide whether "TalentSync" on LinkedIn and "TalentSync" on Clutch are the same real-world thing, and how confident it is. Every exact match is a corroborating edge. Every near-match ("Talent Sync", "TalentSync SRL", `+373 68 300 700` vs `+373 (68) 300-700`, `Chisinau` vs `Chișinău`) is at best a weakened edge and at worst a second candidate entity that splits your authority. **[CONSENSUS]** — this is long-standing local-SEO doctrine, extended by practitioners to LLM entity resolution; no vendor has published the matching algorithm.

The documented anchor underneath it is `sameAs`, which Google defines as *"URLs to profiles on other websites"* for its Organization markup **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/organization>. `sameAs` is your explicit assertion that these profiles are the same entity. It only works if the profiles it points at agree with each other.

**Priority action: `sameAs` currently has one entry.** Getting to five or six authoritative profiles is higher-leverage than any remaining schema work in this document. Target order: LinkedIn (have), Crunchbase, Clutch, a Moldovan business register entry (strongest — an official record), GitHub organisation, and the founder's LinkedIn linked from the `Person` node.

### 7.4 Can a Moldovan service business without public premises get a Google Business Profile?

**Yes on the country. Conditionally yes on the premises. But it is worth far less to TalentSync than it looks.**

**Country:** Moldova is supported. Google's supported countries/regions list includes `MD | Moldova`. **[DOCUMENTED]** — <https://support.google.com/business/answer/6270107>

**Premises:** Google's eligibility rule, verbatim: *"If your business either has a physical location that customers can visit, or travels to customers where they are, you can create a Business Profile on Google."* **[DOCUMENTED]** — <https://support.google.com/business/answer/3038177>

That is a genuine either/or. A service-area business with no storefront qualifies under the second clause — the address is then hidden on Maps and replaced by a shaded service area.

**The disqualifiers, all documented at the same URL:**

- *"If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile."*
- *"P.O. boxes or mailboxes located at remote locations aren't acceptable."*
- *"Create your Business Profile for your actual, real-world location."*

**So the honest answer for TalentSync:** if there is a real, staffed office in Chișinău that the team works from, they can register it as a service-area business with a hidden address. If "Chișinău, Moldova" means a founder's home or a coworking membership with no dedicated staffed space, registering it is a guidelines violation and risks suspension — which is worse than having no profile, because a suspended profile is a negative entity signal.

**And the value is limited.** Service areas must be specified by city or postcode, capped at 20, and *"shouldn't be more than about two hours of driving time from where your business is based."* **[DOCUMENTED]** — <https://support.google.com/business/answer/9157481>. TalentSync's buyers are CTOs in Western Europe, not within two hours of Chișinău. **The local pack will deliver essentially zero qualified traffic.**

**Recommendation:** pursue GBP if and only if there is a genuinely staffed office — and pursue it for **entity corroboration**, not traffic. A verified GBP is an authoritative, Google-owned record of name, address and phone that anchors the knowledge graph and gives `sameAs` a strong target. Budget it as entity hygiene, and set the expectation with the client that the local pack is not the prize. Verification will require a real address (postcard or video verification), which is the practical gate.

---

## 8. Concise-answer formatting

### 8.1 The pattern

```html
<h2 id="what-is-talentsync">What is TalentSync?</h2>

<p class="answer">
  TalentSync is a technology recruitment and engineering talent partner based in
  Chisinau, Moldova. It helps European and international product companies engage
  vetted senior engineers from Eastern Europe through direct B2B recruitment and
  flexible hourly collaboration.
</p>

<p>
  Direct B2B recruitment means TalentSync sources and validates the engineer for a
  long-term engagement. The client selects and manages the engineer directly, which
  avoids the cost and complexity of local employment in the engineer's country.
</p>

<p>
  Flexible hourly collaboration means the engineer joins the client's existing team
  and is billed hourly. The client retains control of architecture, roadmap,
  priorities, processes and day-to-day management throughout.
</p>
```

**Rules:**

1. **The heading is the question, phrased as a buyer would type it.** `<h2>What is TalentSync?</h2>`, not `<h2>Our Story</h2>`.
2. **The first paragraph after the heading is a complete, standalone answer in 40–60 words.** It must be true and quotable with zero surrounding context — no "we", no "this", no "as mentioned above", no pronoun whose antecedent lives in a previous paragraph.
3. **Detail follows. Never precedes.** No throat-clearing, no scene-setting.
4. **One idea per paragraph, 2–4 lines.** Retrieval operates on passages, not documents; a paragraph that mixes three ideas retrieves poorly for all three.
5. **Name entities explicitly and repeatedly.** "TalentSync", not "we". "Eastern Europe", not "the region". Pronouns are cheap for humans and expensive for extractors.
6. **Numbers, currencies and durations as digits with units.** "€15–35 per hour", not "fifteen to thirty-five euros hourly".
7. **Stable `id` on every question heading** so the passage has its own addressable URL fragment.

### 8.2 Worked example — a role page

```html
<h2 id="cost">How much does it cost to hire a backend developer in Eastern Europe?</h2>

<p class="answer">
  Eastern European engineering rates run well below Western European equivalents at
  comparable seniority. TalentSync bills flexible hourly collaboration at
  {{VERIFIED_RATE}} per hour depending on seniority and stack. Direct B2B recruitment
  uses a one-time placement fee instead, with no ongoing hourly cost once the engineer
  joins the client's team.
</p>
```

51 words. Answers the literal question, names the company, distinguishes both models, and can be lifted verbatim into an answer without a single dangling reference.

### 8.3 The evidence — graded honestly

**What is documented:**

- Google: *"Making sure that important content is available in textual form."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/ai-features>
- Google, on the same page: *"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."* **[DOCUMENTED]** — same URL. Google's position is that ordinary good content wins, not a formatting trick.
- Google, on retaining FAQ markup: it helps *"search engines and other systems … better understand your web page."* **[DOCUMENTED]** — <https://developers.google.com/search/docs/appearance/structured-data/faqpage>
- Microsoft has added generative-engine-optimisation guidance to the Bing Webmaster Guidelines, covering how content appears in Copilot's AI answers as well as classic results. **[CONSENSUS]** — reported; treat the specifics as unconfirmed until read in Bing's own guidelines.

**What is practitioner consensus, with no vendor confirmation — all [CONSENSUS]:**

- Answer-first formatting, with a direct answer inside roughly the first 75 words, raises citation likelihood.
- Question-phrased H2/H3 headings outperform topic headings, on the theory that models are trained heavily on Q&A-shaped text and a heading matching the query makes the following passage the candidate answer.
- Atomic 2–4 line paragraphs that stand alone chunk better, because RAG retrieves at passage level.
- An analysis of ~1.2M ChatGPT answers reported 44.2% of citations came from the first 30% of a document, and heavily-cited text showed ~20.6% entity density — three to four times ordinary English.

**The "40–60 words" figure specifically has no vendor source.** It is a practitioner convention. What it is really doing is approximating a chunk that fits comfortably inside one retrieval window and one quotation, and forcing the writer to be complete in one paragraph. Present it to the client as a discipline, not a threshold.

The honest summary: **the mechanism is well-motivated and cheap; the effect size is unmeasured.** It costs nothing extra to write this way, it makes the pages better for humans, and it is the only part of AEO where the vendor documentation and the practitioner consensus actually point the same direction.

---

## 9. Build order

Ranked by documented value per hour, laziest-first. Stop wherever the budget runs out and you will still have the parts that matter.

| # | Task | Why | Effort |
|---|---|---|---|
| 1 | Fix nginx `try_files` → `=404`, add `not-found.tsx` | Everything else is undermined without it (§0.1) | 15 min |
| 2 | `metadataBase` + per-page trailing-slash canonicals | Duplicate-content prevention (§0.2) | 30 min |
| 3 | `robots.txt` as in §6.2 + `app/sitemap.ts` | Documented crawler control; blocks nothing | 20 min |
| 4 | `Organization` + `WebSite` in `layout.tsx` | Documented brand profile + site name | 1 h |
| 5 | Canonical paragraph + facts block on `/about/` and `/` | Highest AEO leverage; documented "textual form" (§4) | 1 h |
| 6 | Fix `Chisinau` spelling; write `docs/nap.md` | Entity consistency; blocks §7 rollout (§7.1) | 20 min |
| 7 | `BreadcrumbList` on all 12 non-root pages | Documented rich result, active GSC report | 45 min |
| 8 | Rewrite headings as questions + answer-first paragraphs | §8; also improves the pages for humans | 4–6 h |
| 9 | `Service` nodes ×8 | No rich result; context only | 2 h |
| 10 | `FAQPage` generated from `src/data/faq.ts` | No rich result; Google says keep it (§2.3) | 1 h |
| 11 | Expand `sameAs` to 5–6 profiles | Highest entity leverage of anything here (§7.3) | ongoing |
| 12 | `JobPosting` on a real `/careers/` page | Documented rich result they actually qualify for (§1.4) | 1 h |
| 13 | `ItemList` on `/case-studies/`, `Article`+`Person` on `/insights/` | Article is a documented rich result | 2 h |
| — | `llms.txt` | Skipped. Nothing reads it (§5). | — |
| — | `EmploymentAgency` / `LocalBusiness` | Deferred until GBP + street address exist (§1.1). 3-line diff later. | — |

**Validate with:** the Rich Results Test (<https://search.google.com/test/rich-results>) for the types Google still supports, and the Schema Markup Validator (<https://validator.schema.org>) for the rest — `Service`, `ItemList` and `FAQPage` will not appear in the former, and that is expected, not a bug.

---

## Sources

**Primary — schema.org**
- [EmploymentAgency](https://schema.org/EmploymentAgency) · [LocalBusiness](https://schema.org/LocalBusiness) · [ProfessionalService (deprecated)](https://schema.org/ProfessionalService)

**Primary — Google Search Central**
- [Structured data search gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) · [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) · [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) · [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business) · [FAQPage (deprecated)](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · [Article](https://developers.google.com/search/docs/appearance/structured-data/article) · [Carousel](https://developers.google.com/search/docs/appearance/structured-data/carousel) · [Site names](https://developers.google.com/search/docs/appearance/site-names) · [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) · [Farewell, Sitelinks Search Box](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)

**Primary — Google Business Profile**
- [Guidelines for representing your business](https://support.google.com/business/answer/3038177) · [Supported countries/regions](https://support.google.com/business/answer/6270107) · [Manage your service areas](https://support.google.com/business/answer/9157481)

**Primary — AI vendors**
- [OpenAI bots](https://developers.openai.com/api/docs/bots) · [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) · [Perplexity bots](https://docs.perplexity.ai/guides/bots) · [Applebot](https://support.apple.com/en-us/119829) · [Bing Chat webmaster controls](https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat) · [Common Crawl CCBot](https://commoncrawl.org/ccbot)

**Secondary / reported — [CONSENSUS]**
- [llms.txt adoption vs. actual AI requests (Ahrefs study, via PPC Land)](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/) · [Anthropic crawler documentation update (Search Engine Land)](https://searchengineland.com/anthropic-claude-bots-470171) · [Bing adds GEO to webmaster guidelines (SEJ)](https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/) · [FAQ rich results deprecation coverage](https://www.thehoth.com/blog/google-faq-rich-results-deprecated/)


---

## OPEN QUESTIONS (business decisions required)


1. Street address and postal code in Chisinau — is there a real, staffed office? This gates three things: whether PostalAddress.streetAddress can be populated, whether the EmploymentAgency/LocalBusiness upgrade is ever available, and whether a Google Business Profile can be legitimately registered. If it is a home address or a coworking membership, say so — registering it anyway is a guidelines violation.

2. Legal entity name (e.g. 'TalentSync SRL') and founding year, for Organization.legalName and foundingDate. Omit both rather than guess.

3. Chisinau vs Chișinău — confirm the ASCII spelling ruling in §7.1. The codebase currently uses the diacritic form in siteConfig.location; the client's required canonical paragraph uses ASCII. One must change.

4. Victor's full name, job title and personal LinkedIn URL, for the Person node used as Article.author and Organization.founder.

5. Are the four disputed claims verified and publishable: 'EUR 15-35/hour', 'Save up to 60%', '1-2 weeks time to hire', and the Barca Mobile figures ('1.5M app downloads in first 3 months', 'Led system architecture design and CI/CD implementation')? None can go into JSON-LD until confirmed in writing. The hourly Offer block stays commented out until the rate is settled.

6. Do you have written permission from each named client (Barca Mobile, Orange, Entail AI, New Era Visionary Group, Pixelette Technologies, Qualiwise, SocialBee, Silvertalent, Foodamigos, Innovatec) to name them and describe the engagement? Attributing a client's product metrics to TalentSync's engineering in machine-readable form raises both a policy and a contractual issue.

7. Which markets does TalentSync actually sell into, beyond 'Europe'? areaServed currently guesses United Kingdom and United States. Replace with the real list or cut it back to Europe alone.

8. Confirm the working languages for contactPoint.availableLanguage and Organization.knowsLanguage — English, Romanian and Russian is inferred from location, not stated.

9. A high-resolution square logo file for Organization.logo. public/ currently holds only favicon.svg plus Next.js template SVGs. Google wants at least 112x112px; 512x512 PNG recommended.

10. Is a /careers/ page in scope? It is absent from the 13-page IA, but two genuine open roles already exist in src/data/content.ts, and JobPosting is the single documented rich result TalentSync clearly qualifies for.

11. Who writes /insights and will they have a real bio section on /about? Google's Article guidance expects author.url to resolve to a page that genuinely identifies the author, not a bare anchor.

12. Confirm there is no 'block AI crawlers' toggle enabled at the Railway or Cloudflare edge. An edge-level 403 silently overrides the permissive robots.txt in §6.2 and would be invisible in the repo.

13. Sign-off on skipping llms.txt (§5). The file is supplied if you are overruled, but nothing documented reads it and it duplicates sitemap.xml.
