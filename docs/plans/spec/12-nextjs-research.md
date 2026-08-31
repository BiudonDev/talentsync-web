# Next.js 16 static-export SEO mechanics — verified against this repo

**Method:** each answer checked against official docs (URL + quote) **and** empirically, via real `npx next build` runs in this repo (Next.js 16.1.3, Turbopack, `output: 'export'`, `trailingSlash: true`), inspecting `out/`. Where docs and observed behaviour differ, the build wins and I say so. All test files deleted; tree is clean.

Docs served are `version: 16.3.3`; repo is on `16.1.3`.

---

## 1. `app/sitemap.ts` / `app/robots.ts` with `output: 'export'`

**ANSWER — they work, but ONLY with `export const dynamic = 'force-static'`. Without it the build hard-fails.** Not mentioned on the sitemap/robots doc pages.

Observed with a plain `app/robots.ts`:

```
Error: export const dynamic = "force-static"/export const revalidate not configured
on route "/robots.txt" with "output: export".
> Build error occurred: Failed to collect page data for /robots.txt
```

Same error for `app/sitemap.ts` and `opengraph-image.tsx`. Metadata routes are Route Handlers underneath.

With `force-static`, emission is correct and **`trailingSlash: true` does NOT break it**:

| Source | Emitted |
|---|---|
| `app/sitemap.ts` | `out/sitemap.xml` (plain file, **not** `sitemap.xml/index.html`) |
| `app/robots.ts` | `out/robots.txt` (plain file) |

Build table showed `○ /robots.txt` and `○ /sitemap.xml` as Static; contents were valid XML/TXT.

**EVIDENCE**
- https://nextjs.org/docs/app/guides/static-exports — "To ensure Route Handlers are prerendered, you must explicitly mark the handler as static by adding `export const dynamic = 'force-static'` when a static export is enabled."
- https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash — "certain URLs are exceptions and will not have a trailing slash appended: Static file URLs, such as files with extensions."
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap — "`sitemap.js` is a special Route Handler that is cached by default…"

**RECOMMENDATION (definitive):**
- **`app/sitemap.ts` with `force-static`** — it must list every route including future `/insights/[slug]`, so generate it from the same data module that generates the routes. That is the whole point; a hand-maintained `public/sitemap.xml` will silently drift.
- **`public/robots.txt`** — a static 4-line file that will never change. `app/robots.ts` also works, but it buys nothing and adds a build-time failure mode. Do not create both (they collide at `/robots.txt`).

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { insights } from '@/data/insights'

export const dynamic = 'force-static'
const BASE = 'https://talentsync.eu'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services/', '/case-studies/', '/insights/', '/contact/']
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...insights.map((a) => ({ url: `${BASE}/insights/${a.slug}/`, lastModified: a.updated, priority: 0.6 })),
  ]
}
```

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://talentsync.eu/sitemap.xml
```

Write sitemap `<loc>` values **with** the trailing slash so they match the canonical tags exactly (see #2).

---

## 2. `metadata` / `generateMetadata` in a static export

**ANSWER — fully supported.** Prerendered pages resolve metadata at build time and inline it into the HTML head (no streaming, so no bot-detection concerns).

**`trailingSlash: true` appends a slash to generated canonical and og:url.** Verified: `alternates: { canonical: '/zzabout' }` emitted `<link rel="canonical" href="https://talentsync.eu/zzabout/"/>`, and `openGraph.url: '/zzabout'` emitted `og:url` = `https://talentsync.eu/zzabout/`. URLs with a file extension are left alone: `openGraph.images: ['/og.png']` → `https://talentsync.eu/og.png` (no slash). This is not documented — it was observed in the build output.

**Two gotchas found in this repo's current code:**

1. **`metadataBase` is missing** from `src/app/layout.tsx`, so every build prints: `⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000"`. Relative URLs in metadata fields will build-error once you start using them. Add it to the root layout.
2. **`openGraph` is replaced wholesale by child segments, not merged.** Verified: root layout declares `openGraph.siteName` and `type: 'website'`; a child page declaring `openGraph: { url, title }` emitted **no** `og:site_name` and **no** `og:type`. Repeat `siteName`/`type` on every page, or centralise via a helper.

Two fields *do* fall through from the parent when the child omits them: `description` (also reused for `og:description`/`twitter:description`) and `keywords`.

**EVIDENCE**
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — "Using a relative path in a URL-based `metadata` field without configuring a `metadataBase` will cause a build error."; "`metadataBase` is typically set in root `app/layout.js`"
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images — "Prerendered pages don't use streaming since metadata is resolved at build time."

```ts
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://talentsync.eu'),
  title: { default: 'TalentSync | …', template: '%s | TalentSync' },
  description: '…',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', siteName: 'TalentSync', locale: 'en_GB', url: '/' },
  twitter: { card: 'summary_large_image' },
}
```

```ts
// src/app/services/page.tsx — per-route
export const metadata: Metadata = {
  title: 'Hire senior engineers',
  description: '…',
  alternates: { canonical: '/services' },       // emitted as .../services/
  openGraph: { type: 'website', siteName: 'TalentSync', url: '/services', title: '…' },
}
```

Verified head output for a test page: `title`, `description`, `keywords`, `robots`, `googlebot`, `canonical`, `og:*`, `twitter:*` all present in the static HTML.

---

## 3. `'use client'` at route level — what breaks, and the refactor

**ANSWER**

- **A `'use client'` page CANNOT export `metadata` or `generateMetadata`.** Docs are explicit. Today `src/app/page.tsx` is `'use client'`, which is exactly why the only metadata in the repo lives in `layout.tsx` — every future route would be stuck sharing one title/description. That is the blocking problem.
- **Client components ARE prerendered into the static HTML.** Confirmed against the *current* homepage build: `out/index.html` contains all eight `<section id="…">` blocks and the FAQ copy, despite `page.tsx` being `'use client'`. Crawlability of existing copy is not the issue; metadata is.

**What ends up in the HTML:** everything rendered during the initial (server-side) render pass — JSX, text, attributes, inline styles, `<script type="application/ld+json">`, and initial props.

**What does NOT:** anything produced in `useEffect`, anything behind `typeof window !== 'undefined'`, any state set after mount, and any conditional gated on browser APIs.

**One caveat specific to this repo:** Framer Motion's `initial={{ opacity: 0, y: 30 }}` is serialised into the prerendered markup — I counted **57** elements in `out/index.html` carrying `style="opacity:0;transform:translateY(30px)"`. The text is in the DOM (fine for Google, which executes JS, and fine for text extractors that read DOM text), but any consumer that respects inline CSS sees an invisible page. Worth keeping above-the-fold H1/intro copy out of scroll-reveal wrappers.

**Refactor:** make each `page.tsx` a server component (no directive) that exports metadata and renders the existing `'use client'` sections as children. No changes needed inside the section components.

```tsx
// src/app/services/page.tsx  — NO 'use client'
import type { Metadata } from 'next'
import Services from '@/components/sections/Services'   // stays 'use client'

export const metadata: Metadata = { /* … */ }

export default function Page() {
  return <Services />
}
```

Verified: a server page importing the existing `'use client'` `Hero` built cleanly and prerendered Hero's markup into `out/zzabout/index.html`.

**EVIDENCE** — https://nextjs.org/docs/app/getting-started/metadata-and-og-images — "The `metadata` object and `generateMetadata` function exports are only supported in Server Components." · https://nextjs.org/docs/app/guides/static-exports — "Client Components are prerendered to HTML during `next build`."

---

## 4. Dynamic routes + `generateStaticParams` under `output: 'export'`

**ANSWER — `generateStaticParams` is mandatory.** Omitting it fails the build with the exact message:

```
Error: Page "/zztest/[slug]" is missing "generateStaticParams()" so it cannot be
used with "output: export" config.
```

**`dynamicParams`:** default is `true`; `false` makes unlisted params 404. The static-export doc lists "Dynamic Routes with `dynamicParams: true`" as unsupported — **but in 16.1.3 the build succeeded with the default `true`** as long as `generateStaticParams` was present. ⚠️ *Docs/behaviour discrepancy.* It makes no practical difference (there is no server to generate the extra paths), but **set `dynamicParams = false` explicitly**: it states the intent, matches the docs, and protects you if a future minor tightens enforcement.

Verified emission with `trailingSlash: true`: `out/zztest/alpha/index.html`, `out/zztest/beta/index.html`.

`params` is a **Promise** in Next 16 — must be awaited.

```tsx
// src/app/insights/[slug]/page.tsx
import { insights } from '@/data/insights'

export const dynamicParams = false
export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = insights.find((x) => x.slug === slug)!
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/insights/${slug}` } }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // …
}
```

**EVIDENCE** — https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams — "**`true`** (default) … **`false`**: Dynamic route segments not included in `generateStaticParams` will return a 404." · https://nextjs.org/docs/app/guides/static-exports lists "Dynamic Routes without `generateStaticParams()`" as unsupported.

---

## 5. OG images in a static export

**ANSWER — `opengraph-image.tsx` (ImageResponse) DOES work with `output: 'export'`, with two conditions. But for this project, use static image files.**

Verified both paths:

| Approach | Emitted file | `og:image` URL | nginx Content-Type |
|---|---|---|---|
| `opengraph-image.tsx` + `force-static` | `out/zzabout/opengraph-image` (**no extension**, real PNG per `file`) | `…/zzabout/opengraph-image?511a1a44…` | ❌ `application/octet-stream` |
| `opengraph-image.png` (static file) | `out/zzabout/opengraph-image.png` | `…/zzabout/opengraph-image.png?opengraph-image.5aea445b.png` | ✅ `image/png` |

Two traps with the ImageResponse route:
1. It needs `export const dynamic = 'force-static'` or the build fails (same error as #1).
2. It emits an **extensionless** file. `nginx:alpine` types off the extension, so Facebook/LinkedIn/X scrapers get the wrong Content-Type and may reject the image. Fixable with `location = /path/opengraph-image { default_type image/png; }` per route — pure tax.

**Definitive recommendation: static `opengraph-image.png` (1200×630) files.** One at `src/app/opengraph-image.png` for the site default, plus per-route overrides where the image genuinely differs. Zero config, correct MIME type, correct dimensions in the meta tags, no build-mode footgun. Reach for ImageResponse only if per-article OG images become a real requirement.

Note: explicit `openGraph.images` in a page's metadata **overrides** the file convention entirely — verified.

**EVIDENCE** — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image — "`opengraph-image.js` and `twitter-image.js` are special Route Handlers that are cached by default…"; "`opengraph-image` and `twitter-image` are specialized Route Handlers that can use the same route segment configuration options as Pages and Layouts."

---

## 6. JSON-LD structured data

**ANSWER** — Officially: a native `<script type="application/ld+json">` rendered inside `layout.js` or `page.js`, with `JSON.stringify` **escaped for `<`**. Not `next/script`, not a metadata field. Verified it lands verbatim in the static HTML.

```tsx
// src/app/page.tsx (server component)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TalentSync',
  url: 'https://talentsync.eu',
  email: 'victor@talentsync.eu',
  telephone: '+373 68 300 700',
  sameAs: ['https://linkedin.com/company/talentsync'],
  address: { '@type': 'PostalAddress', addressLocality: 'Chisinau', addressCountry: 'MD' },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* … */}
    </>
  )
}
```

Same pattern for `FAQPage` (drive it off `faq` in `src/data/content.ts` so it can't drift), `BreadcrumbList`, and `Article` on insight pages.

**EVIDENCE** — https://nextjs.org/docs/app/guides/json-ld — "Our current recommendation for JSON-LD is to render structured data as a `<script>` tag in your `layout.js` or `page.js` components."; "you can scrub `HTML` tags from the `JSON-LD` payload, for example, by replacing the character, `<`, with its unicode equivalent, `<`."; "Since JSON-LD is structured data, not executable code, a native `<script>` tag is the right choice here."

Optional typing: `schema-dts` (dev-only types, no runtime cost).

---

## 7. `next/link` href form with `trailingSlash: true`

**ANSWER — either form works; Next normalises the href at render.** Verified: `<Link href="/zztest/alpha">` and `<Link href="/zztest/beta/">` both emitted `href="/zztest/alpha/"` / `href="/zztest/beta/"` in the static HTML. No redirect hop in the served page either way.

**Still write the slashed form (`href="/about/"`)** so the source matches the canonical tag and sitemap `<loc>` values, and nothing depends on the normaliser. `skipTrailingSlashRedirect` is irrelevant here — there is no Next server in production.

Bigger issue than href style: **this site currently has zero crawlable internal links.** `Navbar.tsx` and `Footer.tsx` render `<button onClick={scrollToSection}>` (verified: `<button …>About</button>` in `out/index.html`). Multi-page SEO needs real `<Link href="/services/">` elements; keep the buttons only for same-page anchors.

**EVIDENCE** — https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash — "With this option set, URLs like `/about` will redirect to `/about/`."; "When used with `output: \"export\"` configuration, the `/about` page will output `/about/index.html`."

---

## 8. Not-found handling and the nginx soft-404

**ANSWER**

`app/not-found.tsx` produces **`out/404.html`** (verified: contains the custom component's markup). With `trailingSlash: true` a duplicate `out/404/index.html` is also emitted — harmless. Next auto-injects `<meta name="robots" content="noindex"/>` into it (verified in the file).

**Why every unknown URL currently returns HTTP 200 with the homepage:**

```nginx
location / { try_files $uri $uri.html $uri/ /index.html; }
```

For `/pricing`: `$uri` → no such file; `$uri.html` → no `pricing.html`; `$uri/` → no such directory; so nginx falls through to the **final fallback** `/index.html`. A `try_files` fallback that is a *file path* (rather than `=404` or a named location) is served with the status of the served file — **200**. So `/pricing`, `/blog/anything`, every stale or typo'd inbound URL returns 200 with the full homepage. `out/404.html` is never reached.

**Why that is an SEO problem (soft 404):**
- Google indexes what looks like a valid page with duplicate homepage content, then flags "Soft 404" in Search Console and drops it — after spending crawl budget.
- Infinite duplicates: any URL a scraper, bad backlink, or LLM hallucinates becomes another 200 copy of the homepage, diluting the homepage's own signals.
- Deleted/renamed pages can never signal removal, so they linger in the index.
- LLM crawlers (the proven discovery channel here) get a homepage where they expected an article, which teaches them the wrong URL shape.

**Corrected nginx block** (mirrors the official Next.js static-export nginx example; `=404` instead of the `/index.html` fallback, plus an `error_page` mapping):

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}

error_page 404 /404.html;
location = /404.html {
    internal;
}
```

That is the only change required — `/sitemap.xml`, `/robots.txt`, `/_next/static/*`, `/images/*` and every real page still resolve via `$uri` / `$uri/`, and genuinely-missing URLs now return **404 with the branded 404 page**.

Optionally, to also 301 `/about` → `/about/` (matching `trailingSlash: true`), add before `location /`:

```nginx
# ⚠️ UNTESTED — not verified in a running nginx
if ($request_uri ~ "^([^?.]*[^/?.])(\?.*)?$") {
    return 301 $1/$is_args$args;
}
```

Not required: `try_files … $uri/` already serves `/about` as 200, and the canonical tag + sitemap both point at `/about/`, so Google consolidates correctly. Add it only if you want strict one-URL-per-page.

**EVIDENCE** — https://nextjs.org/docs/app/guides/static-exports — the official nginx snippet is `location / { try_files $uri $uri.html $uri/ =404; }` with `error_page 404 /404.html; location = /404.html { internal; }`, and the emitted-files list includes `/out/404.html`. · https://nextjs.org/docs/app/api-reference/file-conventions/not-found — "Next.js automatically injects `<meta name=\"robots\" content=\"noindex\" />` for pages that return a 404 status code."

---

## 9. MDX vs plain TSX for a 4–8 article `/insights`

**ANSWER — plain TSX. Skip MDX.**

`@next/mdx` requires: 4 packages (`@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`), a `pageExtensions` change in `next.config.ts`, and a **mandatory** root `mdx-components.tsx`. It works fine with `output: 'export'` (compilation is build-time), but you also get:
- **no frontmatter** — needs `remark-frontmatter`/`gray-matter`, or `export const metadata` inside each `.mdx`;
- **Turbopack constraint** — remark/rehype plugins must be passed as *strings* with serialisable options only, so anything needing a function config is out;
- Tailwind v4 typography styling still needed either way.

For 4–8 articles that machinery buys nothing. This repo already has the right pattern: **all copy lives in `src/data/content.ts`.** Extend it.

```ts
// src/data/insights.ts
export const insights = [
  {
    slug: 'hiring-engineers-without-a-local-entity',
    title: '…',
    excerpt: '…',
    published: '2026-02-10',
    updated: '2026-02-10',
    body: [
      { type: 'h2', text: '…' },
      { type: 'p',  text: '…' },
      { type: 'ul', items: ['…', '…'] },
    ],
  },
]
```

Render with a ~20-line switch in `/insights/[slug]/page.tsx`. Full TypeScript safety, existing `SectionWrapper`/`Card` primitives reused, zero new dependencies, zero config change, and `generateStaticParams` + `generateMetadata` + `Article` JSON-LD all read from the same typed object.

Revisit MDX only past ~20 articles or when a non-developer starts writing them.

**EVIDENCE** — https://nextjs.org/docs/app/guides/mdx — "`mdx-components.tsx` is **required** to use `@next/mdx` with App Router and will not work without it."; "`@next/mdx` does **not** support frontmatter by default"; "remark and rehype plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust."

---

## 10. Next.js 16 gotchas vs 14/15 affecting the above

**ANSWER**

1. **Async request APIs are now hard-required.** `params` and `searchParams` in `page.js`/`layout.js`/`route.js`, and `params` in `opengraph-image`/`twitter-image`/`icon`/`apple-icon`, are Promises. The Next 15 sync compatibility shim is **removed**. Every `[slug]` page must `await params`. — "Starting with **Next.js 16**, synchronous access is fully removed."
2. **`generateSitemaps` `id` is now a Promise** (`v16.0.0` in the sitemap changelog). Irrelevant unless you split sitemaps — you won't at this size.
3. **Turbopack is the default for `next dev` and `next build`.** Already in effect here (build banner reads `▲ Next.js 16.1.3 (Turbopack)`). Matters for the MDX decision (#9) — plugin options must be serialisable.
4. **`next lint` removed**, `next build` no longer lints. This repo's `"lint": "eslint"` script is already correct.
5. **Caching defaults**: PPR's `experimental.ppr` / `experimental_ppr` removed; `dynamicIO` and `useCache` removed in favour of top-level `cacheComponents`. **Do not enable `cacheComponents`** — under it `dynamicParams` is unavailable and `generateStaticParams` must return at least one param.
6. **`middleware` → `proxy`** rename — moot, static export supports neither.
7. **`next/image` defaults changed** (`qualities` → `[75]`, `imageSizes` drops 16, `minimumCacheTTL` → 4h) — moot, this repo runs `images: { unoptimized: true }`.
8. **Scroll behaviour**: Next 16 no longer overrides `scroll-behavior: smooth` during navigation. Given the recent commits about mobile-nav scrolling, once real `<Link>` routes exist, add `data-scroll-behavior="smooth"` to `<html>` in `layout.tsx` if you want the old instant-jump-on-navigate behaviour back.
9. **Parallel route slots now require `default.js`** — not applicable.
10. **`next typegen`** generates `PageProps<'/insights/[slug]'>` / `LayoutProps` helpers for type-safe async params.

**EVIDENCE** — https://nextjs.org/docs/app/guides/upgrading/version-16 (all quotes above) · https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap version table: "`v16.0.0` — `id` is now a promise that resolves to a `string`."

---

## Flagged / unconfirmed

- ⚠️ **`dynamicParams: true` under `output: 'export'`** — docs list it as unsupported; the 16.1.3 build succeeded with it. Set `dynamicParams = false` explicitly regardless.
- ⚠️ **The optional trailing-slash 301 nginx snippet in #8 is untested** — no nginx was run. The primary corrected block is straight from the official docs and is the part you actually need.
- ⚠️ **`force-static` requirement for metadata routes** is confirmed by build error + the Route Handler rule in the static-export guide, but is *not* stated on the sitemap/robots/opengraph-image reference pages themselves.
- ⚠️ **`robots.ts` `other` field** (non-standard directives) is `v16.3.0` — unavailable on 16.1.3. Not needed if you use `public/robots.txt`.

## Files that must change

- `/Users/adrianzabica/Desktop/talentsync-web/nginx.conf` — line 27 `try_files $uri $uri.html $uri/ /index.html;` is the soft-404 source
- `/Users/adrianzabica/Desktop/talentsync-web/src/app/layout.tsx` — add `metadataBase`, `alternates`, `robots`; note `openGraph` is not inherited by children
- `/Users/adrianzabica/Desktop/talentsync-web/src/app/page.tsx` — drop `'use client'`; move sections into a server wrapper
- `/Users/adrianzabica/Desktop/talentsync-web/src/components/Navbar.tsx` and `Footer.tsx` — `<button onClick>` must become `<Link href>` for cross-page nav
- `/Users/adrianzabica/Desktop/talentsync-web/src/data/content.ts` — home for per-route metadata + insights data

---

## OPEN QUESTIONS (business decisions required)


1. Final route list for the sitemap — which pages ship in v1 (/services/, /case-studies/, /insights/, /contact/, /about/?) and whether each named client (Barca Mobile, Orange, Entail AI, …) gets its own /case-studies/[slug] page or stays a card on one page.

2. Canonical host: apex https://talentsync.eu or www? metadataBase, sitemap <loc> values and robots.txt Sitemap: line must all use the same one, and nginx/Railway must 301 the other.

3. Whether the nginx.conf change can be deployed independently of the Next refactor — it is a one-line fix that stops the soft-404s immediately and does not depend on any of the other work.

4. Who supplies the 1200x630 OG images (site default + per-route), or whether a single site-wide opengraph-image.png is acceptable for launch.

5. Which of the claims under review survive legal/factual check — 'EUR 15-35/hour', 'Save up to 60%', '1-2 weeks time to hire', and the Barca Mobile delivery numbers. Anything kept will end up in page metadata descriptions and Article JSON-LD, where it is quoted back by search and LLM surfaces.

6. Whether /insights ships in the first pass at all. If it slips, /insights/[slug], generateStaticParams and the MDX-vs-TSX decision are all deferred with it.
