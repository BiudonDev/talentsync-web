import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'TalentSync | Connecting Top Talent with Innovative Companies',
  description: 'TalentSync is your partner in building exceptional tech teams. We connect innovative companies with top-tier AI and software engineering talent.',
  keywords: ['recruitment', 'tech hiring', 'AI talent', 'software engineers', 'talent acquisition'],
  openGraph: {
    title: 'TalentSync | Connecting Top Talent with Innovative Companies',
    description: 'Your partner in building exceptional tech teams.',
    url: 'https://talentsync.eu',
    siteName: 'TalentSync',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
