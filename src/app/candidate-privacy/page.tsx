import PageShell from '@/components/layout/PageShell'
import LegalPageTemplate from '@/components/templates/LegalPageTemplate'
import { candidatePrivacy as doc } from '@/data/legal'
import { noindexMeta } from '@/lib/seo'

export const metadata = noindexMeta({
  path: doc.path,
  title: doc.metaTitle,
  description: doc.metaDescription,
})

export default function Page() {
  return (
    <PageShell crumbs={[{ label: doc.label }]}>
      <LegalPageTemplate doc={doc} />
    </PageShell>
  )
}
