'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig, navigation } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Expand navbar after scrolling 50px
      setIsExpanded(scrollY > 50)

      // Check if navbar is over hero section
      const heroHeight = window.innerHeight * 0.8
      setIsOverHero(scrollY < heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        animate={{
          width: isMobileMenuOpen ? 'calc(100vw - 32px)' : isExpanded ? 'min(95vw, 900px)' : 'auto',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`transition-colors duration-500 rounded-[32px] lg:rounded-full ${
          isOverHero
            ? 'bg-neutral-700/50 backdrop-blur-md border-2 border-neutral-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-neutral-800/70 backdrop-blur-xl border-2 border-primary/60 shadow-[0_8px_32px_rgba(255,184,90,0.2)]'
        }`}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        }}
      >
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
            {/* Logo */}
            <a href="#" className="text-xl lg:text-2xl font-bold text-gradient whitespace-nowrap">
              {siteConfig.name}
            </a>

            {/* Desktop Navigation - Only visible when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-1 overflow-hidden"
                >
                  {navigation.slice(0, 6).map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`px-3 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                        isOverHero
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-neutral-300 hover:text-primary hover:bg-primary/10'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button
                href={siteConfig.calendlyUrl}
                external
                className="hidden sm:inline-flex !py-2 !px-5 !text-sm whitespace-nowrap"
              >
                Book A Meeting
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isOverHero
                    ? 'text-white/80 hover:bg-white/10'
                    : 'text-neutral-300 hover:bg-primary/10'
                }`}
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
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                      isOverHero
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-neutral-300 hover:text-primary hover:bg-primary/10'
                    }`}
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
      </motion.div>
    </motion.nav>
  )
}
