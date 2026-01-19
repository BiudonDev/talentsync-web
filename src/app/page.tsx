'use client'

import { Navbar, Footer } from '@/components/layout'
import {
  Hero,
  About,
  Services,
  Process,
  CaseStudies,
  Team,
  Testimonials,
  Pricing,
  FAQ,
  Contact,
  Careers,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <CaseStudies />
        <Team />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
