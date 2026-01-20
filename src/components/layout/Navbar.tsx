'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig, navigation } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    scrollToSection(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? 'w-[95%] max-w-5xl'
          : 'w-[95%] max-w-6xl'
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-surface-light/40 dark:bg-surface-dark/40 backdrop-blur-xl shadow-lg rounded-full border border-neutral-200/20 dark:border-neutral-700/20'
            : 'bg-surface-light/20 dark:bg-surface-dark/20 backdrop-blur-sm rounded-full'
        }`}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <a href="#" className="text-xl lg:text-2xl font-bold text-gradient">
              {siteConfig.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.slice(0, 6).map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button
                href={siteConfig.calendlyUrl}
                external
                className="hidden sm:inline-flex !py-2 !px-5 !text-sm"
              >
                Book A Meeting
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6" />
                ) : (
                  <HiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden px-4 pb-4"
            >
              <div className="pt-2 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3">
                  <Button href={siteConfig.calendlyUrl} external className="w-full">
                    Book A Meeting
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
