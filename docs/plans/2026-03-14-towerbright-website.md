# TowerBright Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a luxury editorial website for TowerBright (premium cleaning service, Miami/Brickell) that generates 10 leads/week through trust, credibility, and premium positioning.

**Architecture:** Landing-led site with a high-impact home page doing 80% of the selling, supported by 3 focused pages (/services, /gallery, /contact). Design system built with CSS custom properties (tokens) to scale easily as TowerBright adds client logos and social proof over time.

**Tech Stack:** Next.js 14 (App Router) · Tailwind CSS · TypeScript · Framer Motion · next-themes (dark/light) · Vercel deployment

---

## DESIGN SYSTEM REFERENCE

### Typography
- **Display / Headlines:** Cormorant Garamond (Google Fonts) — italic + semibold
- **Body / UI:** DM Sans (Google Fonts)
- **Scale:** Hero `clamp(80px, 10vw, 160px)` → Label `12px / tracking-[0.18em]`

### Color Tokens

**Light Mode — "Marble & Sky"**
```
--color-bg:          #F8F7F4
--color-surface:     #FFFFFF
--color-surface-2:   #F0EFEB
--color-text:        #0D0D0D
--color-text-muted:  #6B6B6B
--color-text-subtle: #A8A8A0
--color-accent:      #1B4B7A
--color-accent-2:    #C8D8E8
--color-silver:      #B8BCC4
--color-gold-touch:  #D4C5A0
```

**Dark Mode — "Nocturnal Tower"**
```
--color-bg:          #080C10
--color-surface:     #0F1520
--color-surface-2:   #151D2B
--color-text:        #F2F0EC
--color-text-muted:  #8A9BB0
--color-text-subtle: #4A5568
--color-accent:      #4A9EDB
--color-accent-2:    #1E3A5F
--color-silver:      #9BA8B8
--color-gold-touch:  #C8A96E
```

### Motion Rules
- All durations: 0.4s–0.8s max
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- Scroll reveals: fade-up 40px → 0px, staggered 0.1s per element
- Parallax: hero images at 0.4x scroll speed, desktop only
- Hover cards: scale(1.02) + shadow elevation, 0.3s ease
- Dark/light: 500ms crossfade on all color properties

### Assets (from brief)
- Logo: `https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519613782-IMG_1530.jpeg`
- Portfolio images (5): IMG_1935, IMG_1943, IMG_2149, IMG_2162, IMG_2170
- Base URL: `https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/`

### Page Structure
```
/ (home)
  1. NAV — Logo + Links + Dark toggle (glass on scroll)
  2. HERO — Fullscreen, headline gigante, subline, double CTA
  3. TRUST BAR — "10+ Years · Aston Martin Residences Miami · Brickell"
  4. SERVICES — 2x2 grid, foto + nombre + descripción corta
  5. WHY US — 3 editorial statements
  6. PORTFOLIO — Masonry grid, 5 fotos
  7. PROPERTIES — "Properties We Serve" (Aston Martin + scalable)
  8. TESTIMONIALS — 2-3 quotes estilo editorial
  9. BOOKING CTA — Full-width + Calendly embed
 10. FOOTER

/services — Detail page per service
/gallery  — Full masonry portfolio + lightbox
/contact  — Form + zona cobertura + Calendly
```

---

## TASKS

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`

**Step 1: Scaffold the project**

```bash
cd "C:/Users/omato/OneDrive/Desktop/Dev/TowerBright"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Expected: Project created with App Router, TypeScript, Tailwind

**Step 2: Install dependencies**

```bash
npm install framer-motion next-themes
npm install -D @types/node
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at http://localhost:3000, default Next.js page visible

**Step 4: Initialize git**

```bash
git init
git add .
git commit -m "feat: initialize Next.js project with TypeScript, Tailwind, Framer Motion"
```

---

### Task 2: Design System — CSS Tokens & Global Styles

**Files:**
- Create: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Create: `src/lib/fonts.ts`

**Step 1: Configure Google Fonts in `src/lib/fonts.ts`**

```typescript
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

**Step 2: Write CSS tokens in `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: #F8F7F4;
    --color-surface: #FFFFFF;
    --color-surface-2: #F0EFEB;
    --color-text: #0D0D0D;
    --color-text-muted: #6B6B6B;
    --color-text-subtle: #A8A8A0;
    --color-accent: #1B4B7A;
    --color-accent-2: #C8D8E8;
    --color-silver: #B8BCC4;
    --color-gold-touch: #D4C5A0;
    --font-display: var(--font-cormorant);
    --font-body: var(--font-dm-sans);
    --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
    --transition-theme: background-color 0.5s var(--ease-luxury),
                        color 0.5s var(--ease-luxury),
                        border-color 0.5s var(--ease-luxury);
  }

  .dark {
    --color-bg: #080C10;
    --color-surface: #0F1520;
    --color-surface-2: #151D2B;
    --color-text: #F2F0EC;
    --color-text-muted: #8A9BB0;
    --color-text-subtle: #4A5568;
    --color-accent: #4A9EDB;
    --color-accent-2: #1E3A5F;
    --color-silver: #9BA8B8;
    --color-gold-touch: #C8A96E;
  }

  * {
    transition: var(--transition-theme);
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* Grain texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.04;
  }
}
```

**Step 3: Extend Tailwind config**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        subtle: 'var(--color-text-subtle)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
        silver: 'var(--color-silver)',
        gold: 'var(--color-gold-touch)',
      },
      fontFamily: {
        display: 'var(--font-cormorant)',
        body: 'var(--font-dm-sans)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 4: Verify styles load**

Run `npm run dev` and check that fonts and background color apply correctly.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add design system tokens, fonts, grain overlay"
```

---

### Task 3: Theme Provider (Dark/Light)

**Files:**
- Create: `src/components/providers/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create ThemeProvider**

```typescript
// src/components/providers/ThemeProvider.tsx
'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}
```

**Step 2: Update layout.tsx**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { cormorant, dmSans } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'TowerBright — Excellence is the Standard',
  description: 'Premium residential cleaning services for luxury condominiums in Miami and Brickell. Indoor window cleaning, balcony polish, marble rejuvenation.',
  keywords: 'luxury cleaning Miami, condo cleaning Brickell, marble rejuvenation Miami, window cleaning luxury',
  openGraph: {
    title: 'TowerBright — Excellence is the Standard',
    description: 'Premium residential cleaning for luxury condominiums in Miami.',
    url: 'https://towerbrightco.com',
    siteName: 'TowerBright',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

**Step 3: Verify theme switching works**

In browser console run: `document.documentElement.classList.add('dark')` — background should animate to dark.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add next-themes dark/light provider with smooth transition"
```

---

### Task 4: Navigation Component

**Files:**
- Create: `src/components/layout/Nav.tsx`
- Create: `src/components/ui/ThemeToggle.tsx`

**Step 1: Create ThemeToggle**

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center text-muted hover:text-text transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="text-lg">○</span>
      ) : (
        <span className="text-lg">☽</span>
      )}
    </button>
  )
}
```

**Step 2: Create Nav**

```typescript
// src/components/layout/Nav.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-luxury ${
        scrolled
          ? 'backdrop-blur-xl bg-bg/80 border-b border-silver/20 py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-display text-xl font-semibold tracking-wide text-text">
            TOWER<span className="text-accent">BRIGHT</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs uppercase tracking-[0.18em] text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden md:block font-body text-xs uppercase tracking-[0.18em] px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 ease-luxury"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

**Step 3: Add Nav to layout.tsx**

```typescript
// In src/app/layout.tsx body, above {children}:
import { Nav } from '@/components/layout/Nav'
// ...
<Nav />
{children}
```

**Step 4: Verify**

Check Nav renders, glass effect activates on scroll, theme toggle works.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Nav with glass morphism scroll effect and theme toggle"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Step 1: Create Hero**

```typescript
// src/components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

const services = ['Window Cleaning', 'Balcony Polish', 'Marble Rejuvenation', 'Bathroom Polish']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 px-8 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-radial from-accent/10 via-accent-2/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-silver/10 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        {/* Pre-headline */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-xs uppercase tracking-[0.25em] text-accent mb-8"
        >
          Miami · Brickell · Luxury Residences
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="font-display font-light italic text-text leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(72px, 10vw, 160px)' }}
        >
          Excellence<br />
          <span className="not-italic font-semibold">is the</span><br />
          Standard.
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-body text-muted text-lg max-w-md mb-12 leading-relaxed"
        >
          Premium cleaning services tailored for luxury condominiums.
          Trusted by Aston Martin Residences Miami.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.8)} className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="font-body text-sm uppercase tracking-[0.15em] px-10 py-4 bg-accent text-white hover:bg-accent/90 transition-all duration-300 ease-luxury relative overflow-hidden group"
          >
            <span className="relative z-10">Book a Service</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-500 ease-luxury" />
          </Link>
          <Link
            href="/services"
            className="font-body text-sm uppercase tracking-[0.15em] text-muted hover:text-text transition-colors duration-300 flex items-center gap-3"
          >
            View Services
            <span className="text-accent">→</span>
          </Link>
        </motion.div>

        {/* Marquee */}
        <motion.div {...fadeUp(1.0)} className="mt-20 overflow-hidden border-t border-silver/20 pt-6">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="font-body text-xs uppercase tracking-[0.2em] text-subtle">
                {s} <span className="text-accent mx-4">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Add marquee animation to globals.css**

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 20s linear infinite;
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with staggered reveal and service marquee"
```

---

### Task 6: Trust Bar & Services Section

**Files:**
- Create: `src/components/sections/TrustBar.tsx`
- Create: `src/components/sections/Services.tsx`
- Create: `src/lib/content.ts`

**Step 1: Create content config (scalable)**

```typescript
// src/lib/content.ts
export const trustItems = [
  { label: '10+ Years', sub: 'of experience' },
  { label: 'Aston Martin', sub: 'Residences Miami' },
  { label: 'Brickell', sub: 'Miami, Florida' },
  { label: '100%', sub: 'Tailored service' },
]

export const services = [
  {
    id: 'window-cleaning',
    name: 'Indoor Window Cleaning',
    description: 'Crystal clarity for every pane. We clean floor-to-ceiling windows with precision, leaving no streak, no residue—only unobstructed views.',
    image: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg',
  },
  {
    id: 'balcony-polish',
    name: 'Balcony Polish',
    description: 'Your outdoor living space deserves the same immaculate standard as your interior. Full deep-clean, polish, and detail.',
    image: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819324-IMG_1943.jpeg',
  },
  {
    id: 'bathroom-polish',
    name: 'Bathroom Polish',
    description: 'Spa-level cleanliness. Every surface, fixture, and detail polished to a standard that reflects true luxury.',
    image: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg',
  },
  {
    id: 'marble-rejuvenation',
    name: 'Marble Rejuvenation',
    description: 'Restore the brilliance of your marble surfaces. Professional honing, polishing, and sealing—like new.',
    image: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819770-IMG_2162.jpeg',
  },
]

export const properties = [
  { name: 'Aston Martin Residences', location: 'Miami, FL' },
  // Add more as they come
]
```

**Step 2: Create TrustBar**

```typescript
// src/components/sections/TrustBar.tsx
'use client'
import { motion } from 'framer-motion'
import { trustItems } from '@/lib/content'

export function TrustBar() {
  return (
    <section className="border-y border-silver/20 py-12 px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-semibold text-text">{item.label}</p>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mt-1">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

**Step 3: Create Services**

```typescript
// src/components/sections/Services.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/lib/content'

export function Services() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-xs uppercase tracking-[0.25em] text-accent mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light italic text-text"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              Our Services
            </motion.h2>
          </div>
          <Link
            href="/services"
            className="hidden md:block font-body text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-silver/20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group bg-bg p-10 hover:bg-surface-2 transition-colors duration-300 relative"
            >
              {/* Decorative corner */}
              <span className="absolute top-6 right-6 w-3 h-3 border-t border-r border-silver/40 group-hover:border-accent transition-colors duration-300" />

              <div className="overflow-hidden mb-8 aspect-[16/9]">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold text-text mb-3">{service.name}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add TrustBar and Services sections with scroll animations"
```

---

### Task 7: Why Us, Portfolio & Properties Sections

**Files:**
- Create: `src/components/sections/WhyUs.tsx`
- Create: `src/components/sections/Portfolio.tsx`
- Create: `src/components/sections/Properties.tsx`

**Step 1: WhyUs**

```typescript
// src/components/sections/WhyUs.tsx
'use client'
import { motion } from 'framer-motion'

const statements = [
  {
    number: '01',
    title: 'We don\'t cut corners.',
    body: 'We reveal them. Every edge, every surface, every detail — treated with the same standard we\'d apply to our own home.',
  },
  {
    number: '02',
    title: 'Tailored, not templated.',
    body: 'No two residences are alike. We assess, adapt, and deliver a service plan that respects your space and your standards.',
  },
  {
    number: '03',
    title: 'Discretion is part of the service.',
    body: 'We work in luxury residences. We understand privacy, respect, and the value of an invisible, impeccable result.',
  },
]

export function WhyUs() {
  return (
    <section className="py-32 px-8 bg-surface-2">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.25em] text-accent mb-20 text-center"
        >
          Why TowerBright
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {statements.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
            >
              <p className="font-display text-6xl font-light text-silver/40 mb-6">{s.number}</p>
              <h3 className="font-display text-2xl italic font-light text-text mb-4">{s.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Portfolio (masonry)**

```typescript
// src/components/sections/Portfolio.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  { src: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg', alt: 'Portfolio 1', tall: true },
  { src: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819324-IMG_1943.jpeg', alt: 'Portfolio 2', tall: false },
  { src: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg', alt: 'Portfolio 3', tall: false },
  { src: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819770-IMG_2162.jpeg', alt: 'Portfolio 4', tall: true },
  { src: 'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519820328-IMG_2170.jpeg', alt: 'Portfolio 5', tall: false },
]

export function Portfolio() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light italic text-text"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Our Work
          </motion.h2>
          <Link
            href="/gallery"
            className="hidden md:block font-body text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300"
          >
            Full Gallery →
          </Link>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="overflow-hidden break-inside-avoid group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={img.tall ? 800 : 400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-luxury"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Properties (scalable client logos)**

```typescript
// src/components/sections/Properties.tsx
'use client'
import { motion } from 'framer-motion'
import { properties } from '@/lib/content'

export function Properties() {
  return (
    <section className="py-24 px-8 border-y border-silver/20">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.25em] text-muted mb-12"
        >
          Properties We Serve
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {properties.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-xl font-semibold italic text-text">{p.name}</p>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mt-1">{p.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add WhyUs, Portfolio masonry, and Properties sections"
```

---

### Task 8: Booking CTA & Footer

**Files:**
- Create: `src/components/sections/BookingCTA.tsx`
- Create: `src/components/layout/Footer.tsx`

**Step 1: BookingCTA with Calendly embed**

```typescript
// src/components/sections/BookingCTA.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-40 px-8 bg-accent relative overflow-hidden">
      {/* Background detail */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-radial from-white to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.25em] text-white/60 mb-8"
        >
          Ready for Immaculate?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light italic text-white mb-12"
          style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
        >
          Let's transform<br />your space.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link
            href="/contact"
            className="font-body text-sm uppercase tracking-[0.15em] px-10 py-4 bg-white text-accent hover:bg-white/90 transition-all duration-300 ease-luxury"
          >
            Book a Service
          </Link>
          <a
            href="https://wa.me/2393519514"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm uppercase tracking-[0.15em] px-10 py-4 border border-white/40 text-white hover:border-white transition-all duration-300 ease-luxury"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Footer**

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-silver/20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        <div>
          <p className="font-display text-xl font-semibold text-text mb-2">
            TOWER<span className="text-accent">BRIGHT</span>
          </p>
          <p className="font-body text-xs uppercase tracking-[0.15em] text-muted">Excellence is the Standard</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-subtle mb-2">Services</p>
          {['Indoor Window Cleaning', 'Balcony Polish', 'Bathroom Polish', 'Marble Rejuvenation'].map((s) => (
            <Link key={s} href="/services" className="font-body text-sm text-muted hover:text-text transition-colors duration-300">{s}</Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-subtle mb-2">Connect</p>
          <a href="mailto:info@towerbrightco.com" className="font-body text-sm text-muted hover:text-text transition-colors duration-300">info@towerbrightco.com</a>
          <a href="https://wa.me/2393519514" className="font-body text-sm text-muted hover:text-text transition-colors duration-300">WhatsApp</a>
          <a href="https://instagram.com/towerbrightco" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-muted hover:text-text transition-colors duration-300">@towerbrightco</a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-silver/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-subtle">© 2026 TowerBright. All rights reserved.</p>
        <p className="font-body text-xs text-subtle">Miami · Brickell · Florida</p>
      </div>
    </footer>
  )
}
```

**Step 3: Assemble home page**

```typescript
// src/app/page.tsx
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Portfolio } from '@/components/sections/Portfolio'
import { Properties } from '@/components/sections/Properties'
import { BookingCTA } from '@/components/sections/BookingCTA'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Portfolio />
      <Properties />
      <BookingCTA />
      <Footer />
    </main>
  )
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add BookingCTA, Footer, assemble complete home page"
```

---

### Task 9: Support Pages

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/gallery/page.tsx`
- Create: `src/app/contact/page.tsx`

**Step 1: /services page**

Services detail page — hero + each service with full description, image, and CTA. Use `services` array from `content.ts`. Pattern: alternating image/text layout per service.

**Step 2: /gallery page**

Full masonry grid with all portfolio images. Add lightbox using a click handler that shows the full image in a modal overlay with backdrop-blur.

**Step 3: /contact page**

Form (name, email, phone, service interest, message) + Calendly embed. Calendly inline widget:
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/[CLIENT_CALENDLY_URL]" />
<script src="https://assets.calendly.com/assets/external/widget.js" async />
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add /services, /gallery, /contact pages"
```

---

### Task 10: Google Analytics & SEO

**Files:**
- Create: `src/components/analytics/GoogleAnalytics.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Analytics component**

```typescript
// src/components/analytics/GoogleAnalytics.tsx
import Script from 'next/script'

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
```

**Step 2: Add to layout with env var**

```typescript
// In layout.tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
)}
```

**Step 3: Create `.env.local`**

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Step 4: Add sitemap**

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://towerbrightco.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://towerbrightco.com/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://towerbrightco.com/gallery', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://towerbrightco.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Google Analytics, sitemap, SEO metadata"
```

---

### Task 11: Deploy to Vercel

**Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/[USERNAME]/towerbright.git
git push -u origin main
```

**Step 2: Deploy via Vercel MCP or CLI**

```bash
npx vercel --prod
```

Or use the Vercel MCP tool: `mcp__vercel__deploy_to_vercel`

**Step 3: Add environment variables in Vercel dashboard**

- `NEXT_PUBLIC_GA_ID` = your GA4 measurement ID

**Step 4: Configure custom domain**

In Vercel project settings → Domains → Add `towerbrightco.com`

**Step 5: Final verification checklist**

- [ ] Home page loads with all sections
- [ ] Dark/light toggle works
- [ ] Nav glass effect activates on scroll
- [ ] All animations play on scroll
- [ ] Images load (remote URLs from brief)
- [ ] Contact form works
- [ ] Calendly embed loads
- [ ] Mobile responsive (375px, 768px, 1440px)
- [ ] Lighthouse score > 90 on Performance, Accessibility, SEO

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: production deployment to Vercel"
```

---

## FINAL CHECKLIST

- [ ] Task 1: Project initialized
- [ ] Task 2: Design system tokens applied
- [ ] Task 3: Dark/light theme works
- [ ] Task 4: Nav with glass + toggle
- [ ] Task 5: Hero with animations
- [ ] Task 6: TrustBar + Services grid
- [ ] Task 7: WhyUs + Portfolio + Properties
- [ ] Task 8: BookingCTA + Footer + Home assembled
- [ ] Task 9: /services + /gallery + /contact pages
- [ ] Task 10: Analytics + SEO
- [ ] Task 11: Deployed to Vercel

---

## NOTES FOR EXECUTOR

- All images come from Vercel Blob Storage (brief URLs) — no local images needed initially
- `next.config.ts` must add `wol7zpzfeh2wdhnp.public.blob.vercel-storage.com` to `images.remotePatterns`
- Calendly URL will be provided by the client — use a placeholder until then
- GA4 ID will be provided by the client — use `.env.local` placeholder
- The `properties` array in `content.ts` is designed to grow — adding a new client property = one line
- `framer-motion` `whileInView` handles all scroll animations — no custom IntersectionObserver needed
- Mobile-first: test at 375px width throughout
