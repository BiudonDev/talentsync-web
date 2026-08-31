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
  /** Optional per-page OG image. Omit and the root src/app/opengraph-image.png applies. */
  image?: string
  type?: 'website' | 'article'
}

const NOINDEX = { index: false, follow: true } as const

/**
 * Build a COMPLETE Metadata object.
 *
 * Two verified Next.js behaviours are baked in here and must not be undone:
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
 * noindex is derived from the route registry as well as being available
 * explicitly via `noindexMeta`, so a legal or draft route cannot leak into the
 * index just because someone forgot which helper to call.
 */
export function pageMeta({ path, title, description, image, type = 'website' }: PageMetaInput): Metadata {
  const url = absUrl(path)
  const registered = allRoutes.find((r) => r.path === href(path))
  const blocked = registered ? !registered.index || registered.draft === true : false
  // `title.absolute` bypasses the layout's '%s | TalentSync' template, so a spec
  // title that already ends in the brand cannot come out doubled.
  const full = /talentsync/i.test(title) ? title : `${title} | ${SITE_NAME}`
  const images = image ? { images: [image] } : {}
  const og = { siteName: SITE_NAME, locale: 'en_GB', url, title: full, description, ...images }

  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url },
    ...(blocked ? { robots: NOINDEX } : {}),
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
