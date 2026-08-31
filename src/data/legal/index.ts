import { candidatePrivacy } from './candidate-privacy'
import { cookies } from './cookies'
import { imprint } from './imprint'
import { privacy } from './privacy'
import { terms } from './terms'
import type { LegalDoc } from './types'

export type { Block, Inline, Item, LegalDoc, RouterRow } from './types'
export { tocOf } from './types'
export { candidatePrivacy, cookies, imprint, privacy, terms }

/**
 * The five legal documents, keyed by route slug.
 *
 * Keys match `src/data/routes.ts` exactly, so `Object.entries(legal)` and the
 * route registry cannot disagree about what exists. Each `page.tsx` is then:
 *
 *   import LegalPageTemplate from '@/components/templates/LegalPageTemplate'
 *   import { legal } from '@/data/legal'
 *   import { noindexMeta } from '@/lib/seo'
 *
 *   const doc = legal.privacy
 *   export const metadata = noindexMeta({
 *     path: doc.path, title: doc.metaTitle, description: doc.metaDescription,
 *   })
 *   export default function Page() { return <LegalPageTemplate doc={doc} /> }
 *
 * All five routes are `index: false` in the registry (D1 rows 20–24), so
 * `pageMeta()` already emits noindex from the registry; `noindexMeta` is the
 * belt to that braces.
 */
export const legal = {
  privacy,
  'candidate-privacy': candidatePrivacy,
  terms,
  cookies,
  imprint,
} as const satisfies Record<string, LegalDoc>

/** Iteration order for anything that needs all five (footer, index pages, guards). */
export const legalDocs: LegalDoc[] = [privacy, candidatePrivacy, terms, cookies, imprint]
