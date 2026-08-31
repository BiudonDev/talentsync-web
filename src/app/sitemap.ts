import type { MetadataRoute } from 'next'
import { indexableRoutes, type Route } from '@/data/routes'
import { absUrl } from '@/lib/seo'

// Metadata routes are Route Handlers underneath. Without this the build hard-fails
// under output: 'export'. Verified: it then emits a plain out/sitemap.xml (not
// sitemap.xml/index.html) — trailingSlash exempts URLs with a file extension.
export const dynamic = 'force-static'

// Derived, never hand-listed. `indexableRoutes` already drops the five noindex
// legal routes and the three draft role pages (D1.1).
const priority = (r: Route) => {
  if (r.path === '/') return 1
  if (r.group === 'service') return 0.9
  if (r.group === 'company') return 0.7
  return r.path.split('/').filter(Boolean).length > 1 ? 0.6 : 0.8
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return indexableRoutes.map((r) => ({
    // absUrl() applies the same slash transform as the canonical tag, so <loc>
    // and <link rel="canonical"> are byte-identical.
    url: absUrl(r.path),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: priority(r),
  }))
}
