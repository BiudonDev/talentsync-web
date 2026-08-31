import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import { graphLd, organizationLd, websiteLd } from '@/lib/schema'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import './globals.css'

// No `weight` array on purpose: omitting it pulls the single variable font file
// instead of five static faces (103,732 B), and it replaces the globals.css
// Google Fonts @import that cost 505 ms of FCP/LCP on 4x CPU + Slow 4G.
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const DEFAULT_DESCRIPTION =
  'Vetted senior engineers from Eastern Europe, on direct B2B contracts or hourly. ' +
  'You keep architecture and management control. Chișinău-based.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `IT Recruitment & Engineering Talent in Eastern Europe | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  // No `keywords`: Google ignores the tag, and unlike openGraph it DOES fall
  // through to every child segment, so one homepage keyword list would print on
  // all 24 routes.
  // NO `alternates` key. A root-layout canonical is inherited by every segment
  // that does not override it, so a single route missing pageMeta() would
  // silently canonicalise itself to the homepage with no build error.
  // Canonical is set ONLY by pageMeta() in src/lib/seo.ts.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_GB',
    url: `${SITE_URL}/`,
    title: `IT Recruitment & Engineering Talent in Eastern Europe | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next 16 no longer overrides `scroll-behavior: smooth`
    // during navigation unless the document opts in.
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth">
      <body>
        <JsonLd data={graphLd(organizationLd(), websiteLd())} />
        {children}
      </body>
    </html>
  )
}
