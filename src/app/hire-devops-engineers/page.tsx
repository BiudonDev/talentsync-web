import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { servicePages } from '@/data/services'
import { noindexMeta, pageMeta } from '@/lib/seo'

const PATH = '/hire-devops-engineers/'
const page = servicePages['hire-devops-engineers']

// D1.1: a draft page must emit robots noindex. noindexMeta forces it whatever routes.ts says.
export const metadata: Metadata = (page.draft ? noindexMeta : pageMeta)({
  path: PATH,
  title: page.metaTitle,
  description: page.metaDescription,
})

export default function HireDevopsEngineersPage() {
  return (
    <PageShell
      crumbs={[
        { label: 'Home', href: '/' },
        { label: page.label },
      ]}
    >
      <ServicePageTemplate page={page} />
    </PageShell>
  )
}
