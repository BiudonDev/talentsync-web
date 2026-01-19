# TalentSync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a modern, SEO-optimized marketing website for TalentSync recruitment company using Next.js, Tailwind CSS, and Framer Motion.

**Architecture:** Single-page application with 11 sections, static export for SEO, Dockerized nginx deployment on Railway. All content centralized in data files for easy updates.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS 3.4+, Framer Motion 11+, React Icons, Docker (nginx:alpine)

**Design Reference:** `docs/plans/2026-01-20-talentsync-design.md`

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `talentsync-web/` (new directory)
- Create: `talentsync-web/package.json`
- Create: `talentsync-web/tsconfig.json`
- Create: `talentsync-web/next.config.js`

**Step 1: Create project directory and initialize**

```bash
mkdir talentsync-web && cd talentsync-web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Select options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: @/*

**Step 2: Verify installation**

Run: `npm run dev`
Expected: Dev server starts at http://localhost:3000

**Step 3: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 2: Install Dependencies

**Files:**
- Modify: `talentsync-web/package.json`

**Step 1: Install animation and icon libraries**

```bash
npm install framer-motion react-icons
```

**Step 2: Install dev dependencies**

```bash
npm install -D @types/node
```

**Step 3: Verify dependencies in package.json**

Run: `cat package.json | grep -A5 "dependencies"`
Expected: framer-motion and react-icons listed

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion and react-icons dependencies"
```

---

### Task 3: Configure Next.js for Static Export

**Files:**
- Modify: `talentsync-web/next.config.js`

**Step 1: Update next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

**Step 2: Test build**

Run: `npm run build`
Expected: Build completes, `out/` directory created with static files

**Step 3: Commit**

```bash
git add next.config.js
git commit -m "chore: configure Next.js for static export"
```

---

### Task 4: Configure Tailwind Design Tokens

**Files:**
- Modify: `talentsync-web/tailwind.config.ts`

**Step 1: Replace tailwind.config.ts with design system**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB85A',
          light: '#FFCB85',
          dark: '#E5A550',
        },
        secondary: {
          DEFAULT: '#574A44',
          light: '#6B5D56',
          dark: '#3D332E',
        },
        background: {
          light: '#FAFAFA',
          dark: '#0F0F0F',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1A1A1A',
        },
        text: {
          primary: {
            light: '#574A44',
            dark: '#F5F5F5',
          },
          secondary: {
            light: '#7A6B63',
            dark: '#A3A3A3',
          },
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 2: Verify config syntax**

Run: `npm run build`
Expected: Build completes without Tailwind errors

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "chore: configure Tailwind with TalentSync design tokens"
```

---

### Task 5: Setup Global Styles

**Files:**
- Modify: `talentsync-web/src/app/globals.css`

**Step 1: Replace globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

@layer base {
  body {
    @apply bg-background-light dark:bg-background-dark;
    @apply text-text-primary-light dark:text-text-primary-dark;
    @apply font-sans antialiased;
  }
}

@layer components {
  .section-container {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 sm:py-20 lg:py-24;
  }

  .card {
    @apply bg-surface-light dark:bg-surface-dark;
    @apply rounded-2xl border border-neutral-100 dark:border-neutral-800;
    @apply shadow-sm hover:shadow-lg;
    @apply transition-all duration-300;
    @apply hover:-translate-y-1;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center;
    @apply px-6 py-3 rounded-lg;
    @apply bg-primary hover:bg-primary-dark;
    @apply text-secondary-dark font-semibold;
    @apply transition-all duration-200;
    @apply hover:scale-105 hover:shadow-lg;
    @apply focus:outline-none focus:ring-2 focus:ring-primary/50;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center;
    @apply px-6 py-3 rounded-lg;
    @apply border-2 border-primary;
    @apply text-primary font-semibold;
    @apply transition-all duration-200;
    @apply hover:bg-primary hover:text-secondary-dark;
    @apply focus:outline-none focus:ring-2 focus:ring-primary/50;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary;
    @apply bg-clip-text text-transparent;
  }
}

@layer utilities {
  .gradient-primary {
    background: linear-gradient(135deg, #FFB85A 0%, #E5A550 100%);
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-background-light dark:bg-background-dark;
}

::-webkit-scrollbar-thumb {
  @apply bg-neutral-300 dark:bg-neutral-700 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-400 dark:bg-neutral-600;
}
```

**Step 2: Verify styles load**

Run: `npm run dev`
Expected: Page loads with new background color

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add global styles with design system utilities"
```

---

## Phase 2: Core Infrastructure

### Task 6: Create Theme Context

**Files:**
- Create: `talentsync-web/src/context/ThemeContext.tsx`

**Step 1: Create context directory**

```bash
mkdir -p src/context
```

**Step 2: Create ThemeContext.tsx**

```typescript
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('talentsync-theme') as Theme | null
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    setTheme(stored || systemPreference)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('talentsync-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

**Step 3: Verify file created**

Run: `cat src/context/ThemeContext.tsx | head -20`
Expected: File contents displayed

**Step 4: Commit**

```bash
git add src/context/ThemeContext.tsx
git commit -m "feat: add theme context with dark mode support"
```

---

### Task 7: Create Content Data File

**Files:**
- Create: `talentsync-web/src/data/content.ts`

**Step 1: Create data directory**

```bash
mkdir -p src/data
```

**Step 2: Create content.ts**

```typescript
export const siteConfig = {
  name: 'TalentSync',
  description: 'Connecting Top Talent with Innovative Companies',
  tagline: 'Your partner in building exceptional tech teams',
  url: 'https://talentsync.eu',
  calendlyUrl: 'https://calendly.com/talentsync-meeting/30min',
  email: 'hello@talentsync.eu',
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    icon: 'HiOutlineUserGroup',
    title: 'Talent Acquisition',
    description: 'End-to-end recruitment solutions for tech and AI roles. We find the perfect match for your team.',
  },
  {
    icon: 'HiOutlineLightBulb',
    title: 'AI & Tech Specialists',
    description: 'Access top-tier AI engineers, data scientists, and software developers from our curated network.',
  },
  {
    icon: 'HiOutlineCog',
    title: 'Technical Screening',
    description: 'Rigorous technical assessments ensure candidates meet your exact requirements.',
  },
  {
    icon: 'HiOutlineChartBar',
    title: 'Market Insights',
    description: 'Data-driven salary benchmarks and hiring trends to help you stay competitive.',
  },
  {
    icon: 'HiOutlineGlobe',
    title: 'Global Reach',
    description: 'Tap into international talent pools while we handle compliance and onboarding.',
  },
  {
    icon: 'HiOutlineShieldCheck',
    title: 'Retention Support',
    description: 'Post-placement support and check-ins to ensure long-term success.',
  },
]

export const process = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We learn about your company culture, technical requirements, and growth goals.',
  },
  {
    step: 2,
    title: 'Matching',
    description: 'Our AI-powered system identifies candidates that fit your unique needs.',
  },
  {
    step: 3,
    title: 'Interview',
    description: 'We coordinate technical interviews and provide detailed candidate assessments.',
  },
  {
    step: 4,
    title: 'Placement',
    description: 'Seamless onboarding support and 90-day guarantee on all placements.',
  },
]

export const caseStudies = [
  {
    company: 'FinTech Startup',
    industry: 'Financial Technology',
    image: '/images/case-fintech.jpg',
    results: ['15 engineers hired in 3 months', '95% retention after 1 year', '40% faster than in-house recruiting'],
  },
  {
    company: 'AI Research Lab',
    industry: 'Artificial Intelligence',
    image: '/images/case-ai.jpg',
    results: ['Built 8-person ML team from scratch', 'Senior talent from top tech companies', 'First hire within 2 weeks'],
  },
  {
    company: 'Scale-up SaaS',
    industry: 'Enterprise Software',
    image: '/images/case-saas.jpg',
    results: ['Expanded engineering 3x in 6 months', 'Hired across 4 countries', 'Zero failed probations'],
  },
  {
    company: 'HealthTech Pioneer',
    industry: 'Healthcare Technology',
    image: '/images/case-health.jpg',
    results: ['Specialized compliance-aware hiring', 'HIPAA-trained engineers', 'Ongoing talent pipeline'],
  },
]

export const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    image: '/images/team-alex.jpg',
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Recruitment',
    image: '/images/team-sarah.jpg',
  },
  {
    name: 'Marcus Johnson',
    role: 'Technical Lead',
    image: '/images/team-marcus.jpg',
  },
  {
    name: 'Elena Kowalski',
    role: 'Client Success Manager',
    image: '/images/team-elena.jpg',
  },
]

export const testimonials = [
  {
    quote: 'TalentSync transformed our hiring process. We went from struggling to find qualified candidates to having a pipeline of exceptional talent.',
    author: 'James Wilson',
    title: 'CTO, TechVentures',
    avatar: '/images/testimonial-james.jpg',
  },
  {
    quote: 'The quality of candidates and speed of delivery exceeded our expectations. They truly understand the tech landscape.',
    author: 'Maria Santos',
    title: 'VP Engineering, DataFlow',
    avatar: '/images/testimonial-maria.jpg',
  },
  {
    quote: 'Working with TalentSync felt like having an extension of our own team. They got our culture from day one.',
    author: 'David Park',
    title: 'Founder, AIStart',
    avatar: '/images/testimonial-david.jpg',
  },
]

export const pricing = [
  {
    tier: 'Starter',
    price: '18%',
    unit: 'of annual salary',
    description: 'Perfect for occasional hiring needs',
    features: [
      'Access to candidate network',
      'Basic technical screening',
      'Standard support',
      '60-day replacement guarantee',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    tier: 'Growth',
    price: '22%',
    unit: 'of annual salary',
    description: 'Best for scaling teams',
    features: [
      'Everything in Starter',
      'Priority candidate access',
      'Advanced technical assessments',
      'Dedicated account manager',
      '90-day replacement guarantee',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    unit: 'pricing',
    description: 'For large-scale hiring initiatives',
    features: [
      'Everything in Growth',
      'Volume discounts',
      'Embedded recruitment support',
      'Custom SLAs',
      'Quarterly business reviews',
      '120-day replacement guarantee',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
]

export const faq = [
  {
    question: 'How does your recruitment process work?',
    answer: 'We start with a discovery call to understand your needs, then leverage our AI-powered matching system to identify candidates. We handle technical screening, coordinate interviews, and support you through to successful placement.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We specialize in technology companies across fintech, AI/ML, SaaS, healthtech, and enterprise software. Our network includes engineers, data scientists, product managers, and technical leaders.',
  },
  {
    question: 'What is your success rate?',
    answer: 'We maintain a 95% placement success rate with over 90% of candidates staying beyond their first year. Our rigorous screening process ensures quality matches.',
  },
  {
    question: 'How quickly can you fill a position?',
    answer: 'Most positions are filled within 3-4 weeks. For urgent needs, we offer expedited search services that can deliver qualified candidates within 1-2 weeks.',
  },
  {
    question: 'Do you offer replacement guarantees?',
    answer: 'Yes, all placements come with a replacement guarantee ranging from 60-120 days depending on your plan. If a hire doesn\'t work out, we\'ll find a replacement at no additional cost.',
  },
  {
    question: 'Can you help with remote and international hiring?',
    answer: 'Absolutely. We have experience placing talent across multiple countries and can advise on compliance, contracts, and onboarding for distributed teams.',
  },
]

export const careers = [
  {
    title: 'Senior Technical Recruiter',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our team to help connect exceptional talent with innovative companies.',
  },
  {
    title: 'Business Development Manager',
    location: 'London / Remote',
    type: 'Full-time',
    description: 'Drive growth by building relationships with tech companies across Europe.',
  },
]
```

**Step 3: Verify file created**

Run: `wc -l src/data/content.ts`
Expected: ~220 lines

**Step 4: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add centralized content data file"
```

---

### Task 8: Create Utility Functions

**Files:**
- Create: `talentsync-web/src/lib/utils.ts`

**Step 1: Create lib directory**

```bash
mkdir -p src/lib
```

**Step 2: Create utils.ts**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
```

**Step 3: Install clsx and tailwind-merge**

```bash
npm install clsx tailwind-merge
```

**Step 4: Commit**

```bash
git add src/lib/utils.ts package.json package-lock.json
git commit -m "feat: add utility functions for classnames and scrolling"
```

---

### Task 9: Update Root Layout

**Files:**
- Modify: `talentsync-web/src/app/layout.tsx`

**Step 1: Update layout.tsx**

```typescript
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
```

**Step 2: Test build**

Run: `npm run build`
Expected: Build completes successfully

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure root layout with theme provider and SEO metadata"
```

---

## Phase 3: UI Components

### Task 10: Create ThemeToggle Component

**Files:**
- Create: `talentsync-web/src/components/ui/ThemeToggle.tsx`

**Step 1: Create components directories**

```bash
mkdir -p src/components/ui src/components/layout src/components/sections
```

**Step 2: Create ThemeToggle.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <HiSun className="w-5 h-5 text-amber-500" />
        ) : (
          <HiMoon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
    </button>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/ui/ThemeToggle.tsx
git commit -m "feat: add theme toggle component with animation"
```

---

### Task 11: Create Button Component

**Files:**
- Create: `talentsync-web/src/components/ui/Button.tsx`

**Step 1: Create Button.tsx**

```typescript
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className,
  external = false,
}: ButtonProps) {
  const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(baseStyles, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, className)}>
      {children}
    </button>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add reusable Button component"
```

---

### Task 12: Create Card Component

**Files:**
- Create: `talentsync-web/src/components/ui/Card.tsx`

**Step 1: Create Card.tsx**

```typescript
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-light dark:bg-surface-dark',
        'rounded-2xl border border-neutral-100 dark:border-neutral-800',
        'p-6 sm:p-8',
        hover && 'shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat: add reusable Card component"
```

---

### Task 13: Create SectionWrapper Component

**Files:**
- Create: `talentsync-web/src/components/ui/SectionWrapper.tsx`

**Step 1: Create SectionWrapper.tsx**

```typescript
'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 sm:py-20 lg:py-24 ${className || ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SectionWrapper.tsx
git commit -m "feat: add SectionWrapper with scroll animation"
```

---

### Task 14: Create UI Component Index

**Files:**
- Create: `talentsync-web/src/components/ui/index.ts`

**Step 1: Create index.ts**

```typescript
export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as SectionWrapper } from './SectionWrapper'
export { default as ThemeToggle } from './ThemeToggle'
```

**Step 2: Commit**

```bash
git add src/components/ui/index.ts
git commit -m "feat: add UI components barrel export"
```

---

## Phase 4: Layout Components

### Task 15: Create Navbar Component

**Files:**
- Create: `talentsync-web/src/components/layout/Navbar.tsx`

**Step 1: Create Navbar.tsx**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { ThemeToggle, Button } from '@/components/ui'
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="text-xl lg:text-2xl font-bold text-gradient">
            {siteConfig.name}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.slice(0, 6).map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              href={siteConfig.calendlyUrl}
              external
              className="hidden sm:inline-flex"
            >
              Book A Meeting
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <Button href={siteConfig.calendlyUrl} external className="w-full">
                    Book A Meeting
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with mobile menu and scroll effects"
```

---

### Task 16: Create Footer Component

**Files:**
- Create: `talentsync-web/src/components/layout/Footer.tsx`

**Step 1: Create Footer.tsx**

```typescript
'use client'

import { HiArrowUp } from 'react-icons/hi'
import { siteConfig, navigation } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Email */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              {siteConfig.name}
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
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
                className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
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
        <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with navigation and scroll-to-top"
```

---

### Task 17: Create Layout Index

**Files:**
- Create: `talentsync-web/src/components/layout/index.ts`

**Step 1: Create index.ts**

```typescript
export { default as Navbar } from './Navbar'
export { default as Footer } from './Footer'
```

**Step 2: Commit**

```bash
git add src/components/layout/index.ts
git commit -m "feat: add layout components barrel export"
```

---

## Phase 5: Section Components

### Task 18: Create Hero Section

**Files:**
- Create: `talentsync-web/src/components/sections/Hero.tsx`

**Step 1: Create Hero.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { Button } from '@/components/ui'
import { siteConfig } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
        >
          <span className="text-gradient">{siteConfig.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4"
        >
          {siteConfig.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={siteConfig.calendlyUrl} external>
            Book A Meeting
          </Button>
          <Button variant="secondary" onClick={() => scrollToSection('about')}>
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <button
          onClick={() => scrollToSection('about')}
          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
          aria-label="Scroll to content"
        >
          <HiChevronDown className="w-8 h-8" />
        </button>
      </motion.div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with animations"
```

---

### Task 19: Create About Section

**Files:**
- Create: `talentsync-web/src/components/sections/About.tsx`

**Step 1: Create About.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">Us</span>
          </h2>
          <div className="space-y-4 text-text-secondary-light dark:text-text-secondary-dark">
            <p className="text-lg">
              TalentSync was founded with a simple mission: to bridge the gap between
              exceptional tech talent and innovative companies building the future.
            </p>
            <p className="text-lg">
              We combine deep industry expertise with cutting-edge AI technology to
              identify, assess, and place candidates who don&apos;t just meet requirements—they
              exceed expectations.
            </p>
            <p className="text-lg">
              Our team has placed hundreds of engineers, data scientists, and technical
              leaders at startups and enterprises across Europe and beyond.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section"
```

---

### Task 20: Create Services Section

**Files:**
- Create: `talentsync-web/src/components/sections/Services.tsx`

**Step 1: Create Services.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
} from 'react-icons/hi'
import { SectionWrapper, Card } from '@/components/ui'
import { services } from '@/data/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="services" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Our <span className="text-gradient">Services</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Comprehensive recruitment solutions tailored to your needs
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-secondary-dark" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: add Services section with icon cards"
```

---

### Task 21: Create Process Section

**Files:**
- Create: `talentsync-web/src/components/sections/Process.tsx`

**Step 1: Create Process.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'
import { process } from '@/data/content'

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="process">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Our streamlined process gets you from search to hire efficiently
        </p>
      </div>

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {process.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative text-center"
          >
            {/* Connector line */}
            {index < process.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20" />
            )}

            {/* Step number */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary-dark">
                {String(step.step).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Process.tsx
git commit -m "feat: add Process section with step indicators"
```

---

### Task 22: Create CaseStudies Section

**Files:**
- Create: `talentsync-web/src/components/sections/CaseStudies.tsx`

**Step 1: Create CaseStudies.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper, Card } from '@/components/ui'
import { caseStudies } from '@/data/content'

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="case-studies" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Success <span className="text-gradient">Stories</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          See how we&apos;ve helped companies build exceptional teams
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.company}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full">
              {/* Placeholder image */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold">{study.company}</h3>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {study.industry}
                </span>
              </div>

              <ul className="space-y-2">
                {study.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-text-secondary-light dark:text-text-secondary-dark"
                  >
                    <span className="text-primary mt-1">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/CaseStudies.tsx
git commit -m "feat: add CaseStudies section"
```

---

### Task 23: Create Team Section

**Files:**
- Create: `talentsync-web/src/components/sections/Team.tsx`

**Step 1: Create Team.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'
import { team } from '@/data/content'

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="team">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Meet the <span className="text-gradient">Team</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          The people behind your successful hires
        </p>
      </div>

      <div ref={ref} className="flex flex-wrap justify-center gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group"
          >
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>

            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Team.tsx
git commit -m "feat: add Team section with avatar cards"
```

---

### Task 24: Create Testimonials Section

**Files:**
- Create: `talentsync-web/src/components/sections/Testimonials.tsx`

**Step 1: Create Testimonials.tsx**

```typescript
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { testimonials } from '@/data/content'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionWrapper id="testimonials" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Quote */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 sm:p-12">
            <div className="text-6xl text-primary/20 mb-4">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg sm:text-xl text-text-primary-light dark:text-text-primary-dark mb-8">
                  {testimonials[current].quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonials[current].author}</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: add Testimonials carousel section"
```

---

### Task 25: Create Pricing Section

**Files:**
- Create: `talentsync-web/src/components/sections/Pricing.tsx`

**Step 1: Create Pricing.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper, Card, Button } from '@/components/ui'
import { pricing, siteConfig } from '@/data/content'

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Simple <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Transparent pricing that scales with your hiring needs
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricing.map((plan, index) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}
          >
            <Card
              className={`h-full flex flex-col ${
                plan.highlighted
                  ? 'border-primary ring-2 ring-primary/20'
                  : ''
              }`}
              hover={false}
            >
              {plan.highlighted && (
                <div className="px-3 py-1 text-xs font-semibold rounded-full gradient-primary text-secondary-dark w-fit mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-text-secondary-light dark:text-text-secondary-dark ml-2">
                  {plan.unit}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={siteConfig.calendlyUrl}
                external
                variant={plan.highlighted ? 'primary' : 'secondary'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Pricing.tsx
git commit -m "feat: add Pricing section with tier cards"
```

---

### Task 26: Create FAQ Section

**Files:**
- Create: `talentsync-web/src/components/sections/FAQ.tsx`

**Step 1: Create FAQ.tsx**

```typescript
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { faq } from '@/data/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <SectionWrapper id="faq" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto space-y-4">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full bg-surface-light dark:bg-surface-dark rounded-xl p-6 text-left flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <span className="font-semibold">{item.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiChevronDown className="w-5 h-5 text-primary" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/FAQ.tsx
git commit -m "feat: add FAQ accordion section"
```

---

### Task 27: Create Contact Section

**Files:**
- Create: `talentsync-web/src/components/sections/Contact.tsx`

**Step 1: Create Contact.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineMail } from 'react-icons/hi'
import { SectionWrapper, Button } from '@/components/ui'
import { siteConfig } from '@/data/content'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="contact">
      <div ref={ref} className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
        >
          Let&apos;s <span className="text-gradient">Work Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8"
        >
          Ready to find your next great hire? Get in touch and let&apos;s discuss
          how we can help build your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-light dark:bg-surface-dark hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <HiOutlineMail className="w-5 h-5 text-secondary-dark" />
            </div>
            <span className="font-medium">{siteConfig.email}</span>
          </a>

          <Button href={siteConfig.calendlyUrl} external>
            Book A Meeting
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section"
```

---

### Task 28: Create Careers Section

**Files:**
- Create: `talentsync-web/src/components/sections/Careers.tsx`

**Step 1: Create Careers.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import { SectionWrapper, Card, Button } from '@/components/ui'
import { careers, siteConfig } from '@/data/content'

export default function Careers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="careers" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Join Our <span className="text-gradient">Team</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Help us connect exceptional talent with innovative companies
        </p>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto space-y-4">
        {careers.length > 0 ? (
          careers.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="flex items-center gap-1">
                      <HiOutlineLocationMarker className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                  <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
                    {job.description}
                  </p>
                </div>
                <Button
                  href={`mailto:${siteConfig.email}?subject=Application: ${job.title}`}
                  className="shrink-0"
                >
                  Apply
                </Button>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              No open positions at the moment.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center pt-8"
        >
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            Don&apos;t see a role that fits? We&apos;re always looking for talented people.
          </p>
          <Button
            href={`mailto:${siteConfig.email}?subject=Speculative Application`}
            variant="secondary"
          >
            Send Your CV Anyway
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Careers.tsx
git commit -m "feat: add Careers section with job listings"
```

---

### Task 29: Create Sections Index

**Files:**
- Create: `talentsync-web/src/components/sections/index.ts`

**Step 1: Create index.ts**

```typescript
export { default as Hero } from './Hero'
export { default as About } from './About'
export { default as Services } from './Services'
export { default as Process } from './Process'
export { default as CaseStudies } from './CaseStudies'
export { default as Team } from './Team'
export { default as Testimonials } from './Testimonials'
export { default as Pricing } from './Pricing'
export { default as FAQ } from './FAQ'
export { default as Contact } from './Contact'
export { default as Careers } from './Careers'
```

**Step 2: Commit**

```bash
git add src/components/sections/index.ts
git commit -m "feat: add sections barrel export"
```

---

## Phase 6: Main Page Assembly

### Task 30: Assemble Main Page

**Files:**
- Modify: `talentsync-web/src/app/page.tsx`

**Step 1: Update page.tsx**

```typescript
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
```

**Step 2: Test the full page**

Run: `npm run dev`
Expected: All sections render, navigation works, theme toggle works

**Step 3: Build for production**

Run: `npm run build`
Expected: Build completes, `out/` directory created

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble main page with all sections"
```

---

## Phase 7: Docker & Deployment

### Task 31: Create Dockerfile

**Files:**
- Create: `talentsync-web/Dockerfile`

**Step 1: Create Dockerfile**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copy built static files
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

**Step 2: Commit**

```bash
git add Dockerfile
git commit -m "chore: add multi-stage Dockerfile"
```

---

### Task 32: Create nginx.conf

**Files:**
- Create: `talentsync-web/nginx.conf`

**Step 1: Create nginx.conf**

```nginx
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Cache static assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Step 2: Commit**

```bash
git add nginx.conf
git commit -m "chore: add nginx config for SPA routing"
```

---

### Task 33: Create Railway Config

**Files:**
- Create: `talentsync-web/railway.json`

**Step 1: Create railway.json**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

**Step 2: Commit**

```bash
git add railway.json
git commit -m "chore: add Railway deployment config"
```

---

### Task 34: Create docker-compose for Local Dev

**Files:**
- Create: `talentsync-web/docker-compose.yml`

**Step 1: Create docker-compose.yml**

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: unless-stopped
```

**Step 2: Test Docker build locally**

Run: `docker-compose build`
Expected: Build completes successfully

Run: `docker-compose up`
Expected: Container starts, site accessible at http://localhost:3000

**Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: add docker-compose for local testing"
```

---

### Task 35: Create .dockerignore

**Files:**
- Create: `talentsync-web/.dockerignore`

**Step 1: Create .dockerignore**

```
node_modules
.next
out
.git
.gitignore
README.md
.env*
*.log
.DS_Store
```

**Step 2: Commit**

```bash
git add .dockerignore
git commit -m "chore: add .dockerignore"
```

---

## Phase 8: Final Polish

### Task 36: Add Favicon

**Files:**
- Create: `talentsync-web/public/favicon.svg`

**Step 1: Create favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFB85A"/>
      <stop offset="100%" style="stop-color:#574A44"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#grad)"/>
  <text x="50" y="68" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">T</text>
</svg>
```

**Step 2: Update layout.tsx to include favicon**

Add to `metadata` in `src/app/layout.tsx`:

```typescript
icons: {
  icon: '/favicon.svg',
},
```

**Step 3: Commit**

```bash
git add public/favicon.svg src/app/layout.tsx
git commit -m "feat: add TalentSync favicon"
```

---

### Task 37: Create README

**Files:**
- Create: `talentsync-web/README.md`

**Step 1: Create README.md**

```markdown
# TalentSync Website

Modern marketing website for TalentSync recruitment company.

## Tech Stack

- Next.js 14+ (Static Export)
- TypeScript
- Tailwind CSS
- Framer Motion
- Docker + nginx

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Static files output to `out/` directory.

## Docker

```bash
# Build and run locally
docker-compose up --build

# Or build image directly
docker build -t talentsync-web .
docker run -p 3000:3000 talentsync-web
```

## Deployment

Configured for Railway deployment via Dockerfile.

1. Connect repository to Railway
2. Railway auto-detects Dockerfile
3. Deploys to custom domain

## Project Structure

```
src/
├── app/           # Next.js app router
├── components/    # React components
│   ├── layout/    # Navbar, Footer
│   ├── sections/  # Page sections
│   └── ui/        # Reusable primitives
├── context/       # Theme context
├── data/          # Content data
└── lib/           # Utilities
```
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup instructions"
```

---

### Task 38: Final Build & Test

**Step 1: Clean install and build**

```bash
rm -rf node_modules .next out
npm ci
npm run build
```

Expected: Build completes with no errors

**Step 2: Test static export**

```bash
npx serve out
```

Expected: Site serves correctly at http://localhost:3000

**Step 3: Test Docker build**

```bash
docker-compose up --build
```

Expected: Container runs, site accessible

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final build verification"
```

---

## Summary

### Phases Completed

1. **Project Setup** - Next.js, Tailwind, dependencies
2. **Core Infrastructure** - Theme context, content data, utilities
3. **UI Components** - Button, Card, SectionWrapper, ThemeToggle
4. **Layout Components** - Navbar, Footer
5. **Section Components** - All 11 sections
6. **Main Page Assembly** - Complete SPA
7. **Docker & Deployment** - Dockerfile, nginx, Railway config
8. **Final Polish** - Favicon, README

### Total Tasks: 38

### Key Files Created

- 11 section components
- 4 UI components
- 2 layout components
- Theme context
- Content data file
- Dockerfile + nginx.conf
- Railway deployment config

### Ready for Deployment

Push to GitHub, connect to Railway, deploy.
