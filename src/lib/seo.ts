import type { Metadata } from 'next'
import { allRoutes } from '@/data/routes'

export const SITE_URL = 'https://talentsync.eu'
export const SITE_NAME = 'TalentSync'

/**
 * The one URL transform. Everything that emits a URL goes through it, so the
 * `<Link href>`, the canonical tag, `og:url` and the sitemap `<loc>` can never
 * disagree by a trailing slash.
 *
 *   '/about'        -> '/about/'
 *   '' | '/'        -> '/'
 *   '/#process'     -> unchanged   (anchors)
 *   '/sitemap.xml'  -> unchanged   (file URLs — trailingSlash exempts extensions)
 */
export const href = (path: string) => {
  if (!path || path === '/') return '/'
  if (path.includes('#') || /\.[a-z0-9]+$/i.test(path)) return path
  return `/${path.replace(/^\/+|\/+$/g, '')}/`
}

/** Absolute URL for a site path. */
export const absUrl = (path: string) => `${SITE_URL}${href(path)}`

type PageMetaInput = {
  /** Site path. Slash-normalised for you. */
  path: string
  /** Page title. ' | TalentSync' is appended when the title does not already carry the brand. */
  title: string
  description: string
  /** Optional per-page OG image URL. Omit and DEFAULT_OG_IMAGE (the root card) applies. */
  image?: string
  type?: 'website' | 'article'
}

const NOINDEX = { index: false, follow: true } as const

/**
 * The indexable default. It lives HERE, not in the root layout, for exactly the
 * reason `alternates` does: a layout-level `robots` is inherited by every
 * segment that does not override it, and `not-found.tsx` is neither a layout nor
 * a page module, so it cannot override anything. The 404 shell was inheriting
 * `index, follow` and shipping it beside the `noindex` Next injects for `/404`.
 * Every real route calls `pageMeta()`, so nothing is lost by moving it.
 */
const INDEXABLE = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
} as const

/**
 * The root OG card, named explicitly on every page.
 *
 * `src/app/opengraph-image.png` is Next's file convention, and the root layout
 * picks it up for free — but a child segment that declares its own `openGraph`
 * REPLACES the parent's object, file-generated images included. Verified in the
 * export: `/` carried `og:image`, all 30 other routes carried none. So the
 * default has to be written out here, in the one place every page goes through.
 *
 * Path, not the hashed build URL: `?opengraph-image.<hash>.png` is a cache-buster
 * that changes whenever the file does, and hardcoding it would rot silently.
 * `alt` is the text of `src/app/opengraph-image.alt.txt`.
 */
const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: 'TalentSync — technology recruitment and senior engineering talent from Eastern Europe, based in Chișinău, Moldova.',
}

/**
 * Build a COMPLETE Metadata object.
 *
 * Three verified Next.js behaviours are baked in here and must not be undone:
 *
 * 1. A child segment's `openGraph` REPLACES the parent's — it does not merge.
 *    So every field the root layout declares (type, siteName, locale) is
 *    repeated on every call. Omit one and that page silently loses it.
 *
 * 2. The root layout deliberately has NO `alternates` key, because a layout
 *    `alternates` is inherited by any segment that does not override it — one
 *    route missing pageMeta() would silently canonicalise itself to the
 *    homepage with no build error. Canonical is set here and only here.
 *
 * 3. `robots` is set here for the same reason as `alternates`: `not-found.tsx`
 *    cannot export metadata, so anything the layout declares lands on the 404
 *    shell with no way to override it.
 *
 * noindex is derived from the route registry as well as being available
 * explicitly via `noindexMeta`, so a legal or draft route cannot leak into the
 * index just because someone forgot which helper to call.
 */
export function pageMeta({ path, title, description, image, type = 'website' }: PageMetaInput): Metadata {
  const url = absUrl(path)
  const registered = allRoutes.find((r) => r.path === href(path))
  const blocked = registered ? !registered.index || registered.draft === true : false
  // `title.absolute` is a hard override — no template can wrap it, so a spec
  // title that already ends in the brand cannot come out doubled.
  const full = /talentsync/i.test(title) ? title : `${title} | ${SITE_NAME}`
  const images = { images: [image ?? DEFAULT_OG_IMAGE] }
  const og = { siteName: SITE_NAME, locale: 'en_GB', url, title: full, description, ...images }

  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url },
    robots: blocked ? NOINDEX : INDEXABLE,
    // `type` is written out per branch rather than passed as a variable: Next's
    // OpenGraph type is a discriminated union and a union-typed discriminant
    // (`'website' | 'article'`) narrows to no member of it.
    openGraph: type === 'article' ? { type: 'article', ...og } : { type: 'website', ...og },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      ...images,
    },
  }
}

/** pageMeta plus an explicit noindex. The five legal routes use this. */
export const noindexMeta = (input: PageMetaInput): Metadata => ({
  ...pageMeta(input),
  robots: NOINDEX,
})
