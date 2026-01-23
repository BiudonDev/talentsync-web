'use client'

import { HiArrowUp } from 'react-icons/hi'
import { siteConfig, navigation } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Email */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              {siteConfig.name}
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navigation.slice(0, 5).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            aria-label="Scroll to top"
          >
            <HiArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
