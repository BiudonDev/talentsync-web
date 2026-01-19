# TalentSync Web Application - Architecture Design

> Recruitment company marketing website with modern startup aesthetics, built for SEO optimization and Docker deployment on Railway.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Components](#components)
6. [Animations](#animations)
7. [Data Structure](#data-structure)
8. [Deployment](#deployment)

---

## Overview

### What We're Building

A single-page application (SPA) marketing website for TalentSync, a recruitment company offering software and AI talent services.

### Key Requirements

| Requirement | Solution |
|-------------|----------|
| SEO-optimized | Next.js static export (pre-rendered HTML) |
| Modern startup feel | Tailwind CSS + Framer Motion animations |
| Brand consistency | TalentSync colors (orange/gold + brown) |
| Dark mode | Light/dark toggle with system detection |
| Deployment | Docker (nginx) on Railway |
| Booking integration | Calendly link |

### Sections

1. Hero
2. About
3. Services
4. Process
5. Case Studies
6. Team
7. Testimonials
8. Pricing
9. FAQ
10. Contact
11. Careers

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3.4+ |
| Animations | Framer Motion | 11+ |
| Icons | React Icons (Heroicons) | 5+ |
| Deployment | Docker + nginx | Alpine |
| Hosting | Railway | - |

### Why This Stack

- **Next.js**: Static export gives SEO benefits without server costs
- **Tailwind**: Rapid development, consistent design tokens
- **Framer Motion**: Smooth, performant animations
- **Docker/nginx**: Lightweight, fast static file serving

---

## Project Structure

```
talentsync-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, theme provider, metadata)
│   │   ├── page.tsx            # Main SPA page (all sections)
│   │   └── globals.css         # Tailwind base + custom utilities
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Fixed header, scroll blur, mobile menu
│   │   │   └── Footer.tsx      # Copyright, links, scroll-to-top
│   │   │
│   │   ├── sections/           # Page sections (in scroll order)
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Careers.tsx
│   │   │
│   │   └── ui/                 # Reusable UI primitives
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── SectionWrapper.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/dark state + localStorage
│   │
│   ├── data/
│   │   └── content.ts          # All copy, services, team, pricing data
│   │
│   └── lib/
│       └── utils.ts            # Helper functions (cn, scroll helpers)
│
├── public/
│   ├── favicon.svg
│   └── images/                 # Team photos, case study images
│
├── Dockerfile                  # Multi-stage build → nginx
├── nginx.conf                  # SPA routing + caching
├── railway.json                # Railway deployment config
├── tailwind.config.ts          # Theme colors, fonts, animations
├── next.config.js              # Static export config
└── package.json
```

### Key Principles

- **Flat component structure** - No deep nesting, easy to find anything
- **Data separation** - All content in `content.ts` for easy updates
- **Section-based architecture** - Each section is self-contained

---

## Design System

### Color Palette

```typescript
// tailwind.config.ts
const colors = {
  // Brand colors
  primary: {
    DEFAULT: '#FFB85A',    // Orange/gold - CTAs, accents, highlights
    light: '#FFCB85',      // Hover states, light mode backgrounds
    dark: '#E5A550',       // Dark mode adjusted
  },
  secondary: {
    DEFAULT: '#574A44',    // Dark brown - text, headers
    light: '#6B5D56',      // Lighter variant
    dark: '#3D332E',       // Darker variant
  },

  // Surface colors (light/dark mode)
  background: {
    light: '#FAFAFA',      // Page background (light)
    dark: '#0F0F0F',       // Page background (dark)
  },
  surface: {
    light: '#FFFFFF',      // Cards, elevated elements (light)
    dark: '#1A1A1A',       // Cards, elevated elements (dark)
  },

  // Text colors
  text: {
    primary: {
      light: '#574A44',    // Main text (light) - uses brand brown
      dark: '#F5F5F5',     // Main text (dark)
    },
    secondary: {
      light: '#7A6B63',    // Muted text (light)
      dark: '#A3A3A3',     // Muted text (dark)
    },
  },
}
```

### Typography

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['Montserrat', 'system-ui', 'sans-serif'],
}

// Font weights
// 400 - Body text
// 500 - Subtle emphasis
// 600 - Buttons, labels
// 700 - Subheadings
// 800 - Main headlines
```

### Typography Scale (Responsive)

```css
/* Hero headline */
text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold

/* Section titles */
text-3xl sm:text-4xl lg:text-5xl font-bold

/* Body text */
text-base sm:text-lg lg:text-xl
```

### Gradients

```css
/* Primary gradient - buttons, icon backgrounds, accents */
.gradient-primary {
  background: linear-gradient(135deg, #FFB85A 0%, #E5A550 100%);
}

/* Text gradient for headlines */
.text-gradient {
  background: linear-gradient(135deg, #FFB85A, #574A44);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Spacing System

```typescript
const spacing = {
  section: 'py-16 sm:py-20 lg:py-24',     // Vertical section padding
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',  // Centered content
  gap: {
    sm: 'gap-4',      // Tight spacing
    md: 'gap-6',      // Standard spacing
    lg: 'gap-8',      // Section content gaps
    xl: 'gap-12',     // Between major blocks
  },
}
```

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Tablets, larger phones |
| `md` | 768px | Small laptops |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large screens |

### Grid Patterns

```css
/* Services, Pricing - 3 column grid */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Case Studies, Team - 2 column grid */
grid-cols-1 md:grid-cols-2

/* Process steps - 4 column */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

### Dark Mode Implementation

- **Strategy**: `class` mode (controlled via HTML element class)
- **Context-Based**: `ThemeContext.tsx` manages state
- **Storage**: localStorage key `'talentsync-theme'`
- **System Detection**: Falls back to `prefers-color-scheme` media query

```tsx
// Usage pattern
className="bg-surface-light dark:bg-surface-dark"
className="text-text-primary-light dark:text-text-primary-dark"
```

---

## Components

### Layout Components

#### Navbar

```
Desktop:
┌─────────────────────────────────────────────────────────┐
│ TALENTSYNC    About Services Process ... │ 🌙 │ [Book] │
└─────────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────────────────────────┐
│ TALENTSYNC                              │ 🌙 │  ☰     │
├─────────────────────────────────────────────────────────┤
│  About                                                  │
│  Services                                               │
│  ...                                                    │
│  [Book A Meeting]                                       │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Fixed position, `z-50`
- Transparent → `backdrop-blur-lg` + `bg-surface/80` on scroll
- Logo with gradient text
- Theme toggle (sun/moon with rotation)
- Mobile: hamburger menu, slide-down animation

#### Footer

```
┌─────────────────────────────────────────────────────────┐
│  TALENTSYNC                                             │
│  About  Services  Pricing  Careers  Contact             │
│  📧 hello@talentsync.eu                                 │
│  © 2025 TalentSync. All rights reserved.    [↑ Top]    │
└─────────────────────────────────────────────────────────┘
```

#### SectionWrapper

```tsx
// Reusable wrapper for all sections
<section id={id} className="py-16 sm:py-20 lg:py-24">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
</section>
```

---

### Section Components

#### Hero

```
┌─────────────────────────────────────────────────────────┐
│        Decorative gradient orbs (blurred, subtle)       │
│                                                         │
│              TALENT SYNC                                │
│     "Connecting Top Talent with                         │
│      Innovative Companies"                              │
│                                                         │
│     Brief tagline about recruitment + AI services       │
│                                                         │
│     [Book A Meeting]  [Learn More ↓]                    │
│                                                         │
│                    ↓ (scroll indicator)                 │
└─────────────────────────────────────────────────────────┘
```

- Full viewport height (`min-h-screen`)
- Centered content with staggered fade-in
- Primary CTA → Calendly link
- Secondary CTA → smooth scroll to About

#### About

```
┌─────────────────────────────────────────────────────────┐
│  ABOUT US                                               │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │   Image/Visual   │  │ Company story paragraph     │  │
│  │                  │  │ Mission statement           │  │
│  └──────────────────┘  │ Key differentiators         │  │
│                        └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

- Two-column layout (stacks on mobile)
- Fade-in from left (image) and right (text)

#### Services

```
┌─────────────────────────────────────────────────────────┐
│  OUR SERVICES                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ 🎯 Icon     │  │ 💼 Icon     │  │ 🤖 Icon     │      │
│  │ Title       │  │ Title       │  │ Title       │      │
│  │ Description │  │ Description │  │ Description │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────┘
```

- 3-column grid (`md:grid-cols-2 lg:grid-cols-3`)
- Cards with gradient icon backgrounds
- Staggered entrance animation

#### Process

```
┌─────────────────────────────────────────────────────────┐
│  HOW IT WORKS                                           │
│  ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐      │
│  │  01   │───▶│  02   │───▶│  03   │───▶│  04   │      │
│  └───────┘    └───────┘    └───────┘    └───────┘      │
│  Discovery    Matching     Interview    Placement       │
└─────────────────────────────────────────────────────────┘
```

- 4-column horizontal flow (stacks 2x2 on tablet, 1-col on mobile)
- Numbered steps with connecting line/arrow
- Sequential stagger animation

#### Case Studies

```
┌─────────────────────────────────────────────────────────┐
│  SUCCESS STORIES                                        │
│  ┌────────────────────────┐  ┌────────────────────────┐ │
│  │ ┌──────────────────┐   │  │ ┌──────────────────┐   │ │
│  │ │  Company Logo    │   │  │ │  Company Logo    │   │ │
│  │ └──────────────────┘   │  │ └──────────────────┘   │ │
│  │ "Company Name"         │  │ "Company Name"         │ │
│  │ Industry tag           │  │ Industry tag           │ │
│  │ • 15 hires in 3 months │  │ • Reduced time-to-hire │ │
│  └────────────────────────┘  └────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

- 2-column grid (1-col on mobile)
- Card with image, company name, industry tag
- Bullet-point results/metrics

#### Team

```
┌─────────────────────────────────────────────────────────┐
│  MEET THE TEAM                                          │
│       ┌─────┐      ┌─────┐      ┌─────┐                 │
│       │photo│      │photo│      │photo│                 │
│       └─────┘      └─────┘      └─────┘                 │
│        Name         Name         Name                   │
│        Role         Role         Role                   │
└─────────────────────────────────────────────────────────┘
```

- Flexible grid/flex-wrap layout
- Circular avatar with `ring-4 ring-primary/20`
- Hover: scale 1.05, ring intensifies

#### Testimonials

```
┌─────────────────────────────────────────────────────────┐
│  WHAT OUR CLIENTS SAY                                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │  "Quote text here - testimonial content..."     │    │
│  │   ┌───┐                                         │    │
│  │   │ ○ │  John Doe, CTO, TechCorp                │    │
│  │   └───┘                                         │    │
│  └─────────────────────────────────────────────────┘    │
│                    ○  ●  ○  ○                           │
└─────────────────────────────────────────────────────────┘
```

- Carousel/slider with auto-play (optional)
- Large quote with quotation marks styling
- Avatar + name + title below
- Dot indicators for navigation

#### Pricing

```
┌─────────────────────────────────────────────────────────┐
│  PRICING                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   STARTER   │  │  ★ GROWTH   │  │ ENTERPRISE  │      │
│  │   $X,XXX    │  │   $X,XXX    │  │  Custom     │      │
│  │  per hire   │  │  per hire   │  │  pricing    │      │
│  │ ✓ Feature   │  │ ✓ Feature   │  │ ✓ Feature   │      │
│  │ ✓ Feature   │  │ ✓ Feature   │  │ ✓ Feature   │      │
│  │ [Get Started]│ │[Get Started]│  │[Contact Us] │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────┘
```

- 3-column grid
- Middle card highlighted (border-primary, scale 1.02, "Popular" badge)
- Checkmark list of features
- CTA buttons link to Calendly

#### FAQ

```
┌─────────────────────────────────────────────────────────┐
│  FREQUENTLY ASKED QUESTIONS                             │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ▶ How does your recruitment process work?       │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ▼ What industries do you specialize in?         │    │
│  │   Answer content expanded here...               │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

- Accordion pattern (one open at a time)
- Smooth height animation on expand/collapse
- Chevron rotates on open

#### Contact

```
┌─────────────────────────────────────────────────────────┐
│  LET'S WORK TOGETHER                                    │
│        Ready to find your next great hire?              │
│     ┌──────────────────────────────────────┐            │
│     │  📧  hello@talentsync.eu             │            │
│     └──────────────────────────────────────┘            │
│              [Book A Meeting →]                         │
└─────────────────────────────────────────────────────────┘
```

- Centered layout, minimal
- Gradient icon for email
- Large CTA button → Calendly

#### Careers

```
┌─────────────────────────────────────────────────────────┐
│  JOIN OUR TEAM                                          │
│  Brief intro about working at TalentSync                │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Senior Recruiter     │ Remote │ Full-time       │    │
│  │ Brief description...              [Apply →]     │    │
│  └─────────────────────────────────────────────────┘    │
│  No open roles? [Send your CV anyway →]                 │
└─────────────────────────────────────────────────────────┘
```

- Job listing cards with role, location, type
- Apply button → mailto or Calendly
- Fallback CTA for speculative applications

---

## Animations

### Framer Motion Patterns

#### Entrance Animations (scroll-triggered)

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}
```

#### Viewport Detection

```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-100px" })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: index * 0.1 }}
/>
```

### Interaction States

| Element | Hover Effect | Duration |
|---------|--------------|----------|
| Buttons | Scale 1.05, shadow grows | 200ms |
| Cards | Lift -4px, shadow-lg | 300ms |
| Nav links | Color shift to primary | 200ms |
| Images | Scale 1.05 | 500ms |

### Specific Animations

```tsx
// Hero scroll indicator - continuous bounce
animate={{ y: [0, 8, 0] }}
transition={{ duration: 1.5, repeat: Infinity }}

// Theme toggle - icon rotation
animate={{ rotate: isDark ? 180 : 0 }}
transition={{ duration: 0.3 }}

// Mobile menu - slide down
animate={{ height: isOpen ? 'auto' : 0 }}
transition={{ duration: 0.2 }}

// Navbar - blur on scroll
className={scrolled ? 'backdrop-blur-lg bg-surface/80' : 'bg-transparent'}
```

### Transition Durations

| Type | Duration | Usage |
|------|----------|-------|
| Fast | 150-200ms | UI feedback (hover, click) |
| Medium | 300ms | Theme changes, menu toggles |
| Standard | 500-600ms | Content entrance |
| Slow | 1000ms+ | Hero animations, loops |

---

## Data Structure

### content.ts

```typescript
// src/data/content.ts

export const siteConfig = {
  name: 'TalentSync',
  description: 'Connecting Top Talent with Innovative Companies',
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
    description: 'End-to-end recruitment for tech & AI roles',
  },
  // ... more services
]

export const process = [
  { step: 1, title: 'Discovery', description: '...' },
  { step: 2, title: 'Matching', description: '...' },
  { step: 3, title: 'Interview', description: '...' },
  { step: 4, title: 'Placement', description: '...' },
]

export const caseStudies = [
  {
    company: 'TechCorp',
    industry: 'FinTech',
    image: '/images/case-techcorp.jpg',
    results: ['15 hires in 3 months', '95% retention rate'],
  },
  // ... more case studies
]

export const team = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: '/images/team-john.jpg',
  },
  // ... more team members
]

export const testimonials = [
  {
    quote: 'TalentSync transformed our hiring process...',
    author: 'Jane Smith',
    title: 'CTO, StartupXYZ',
    avatar: '/images/testimonial-jane.jpg',
  },
  // ... more testimonials
]

export const pricing = [
  {
    tier: 'Starter',
    price: '$X,XXX',
    unit: 'per hire',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    tier: 'Growth',
    price: '$X,XXX',
    unit: 'per hire',
    features: ['All Starter features', 'Feature 4', 'Feature 5'],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    unit: 'pricing',
    features: ['All Growth features', 'Feature 6', 'Dedicated support'],
    cta: 'Contact Us',
    highlighted: false,
  },
]

export const faq = [
  {
    question: 'How does your recruitment process work?',
    answer: '...',
  },
  // ... more FAQs
]

export const careers = [
  {
    title: 'Senior Recruiter',
    location: 'Remote',
    type: 'Full-time',
    description: '...',
  },
  // ... more jobs
]
```

### Benefits

| Benefit | Description |
|---------|-------------|
| Single source of truth | All content in one file |
| Easy updates | Non-devs can edit content |
| Type safety | TypeScript interfaces |
| Component simplicity | Components just map over data |
| Future-proof | Easy to migrate to CMS later |

---

## Deployment

### Dockerfile

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production (nginx)
FROM nginx:alpine AS production

# Copy built static files
COPY --from=builder /app/out /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Cache static assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback - all routes serve index.html
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static HTML export
  trailingSlash: true,     // Better compatibility
  images: {
    unoptimized: true,     // Required for static export
  },
}

module.exports = nextConfig
```

### railway.json

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

### Environment Variables (Railway)

```
PORT=3000
NODE_ENV=production
```

### Deployment Flow

1. Push to `main` branch
2. Railway detects Dockerfile
3. Builds multi-stage image
4. Deploys nginx container
5. Custom domain: `talentsync.eu`

---

## Summary

| Aspect | Choice |
|--------|--------|
| Framework | Next.js 14+ (static export) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Colors | `#FFB85A` (primary) + `#574A44` (secondary) |
| Typography | Montserrat |
| Theme | Light/Dark with toggle |
| Structure | SPA, smooth scroll navigation |
| Sections | 11 sections (Hero → Careers) |
| Integration | Calendly booking |
| Deployment | Docker (nginx:alpine) on Railway, port 3000 |

---

*Document created: 2026-01-20*
*For: TalentSync Web Application*
