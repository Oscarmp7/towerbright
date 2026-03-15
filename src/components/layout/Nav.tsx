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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-[var(--color-bg)]/80 border-b border-[var(--color-silver)]/20 py-4'
          : 'bg-transparent py-8'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-luxury)' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide text-[var(--color-text)]">
            TOWER<span className="text-[var(--color-accent)]">BRIGHT</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden md:block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
