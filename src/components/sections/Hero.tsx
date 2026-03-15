'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
})

const services = ['Window Cleaning', 'Balcony Polish', 'Marble Rejuvenation', 'Bathroom Polish']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 px-8 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg)]" />
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,var(--color-accent)/0.08,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,var(--color-silver)/0.08,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        {/* Pre-headline */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-8"
        >
          Miami · Brickell · Luxury Residences
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)] leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(72px, 10vw, 160px)' }}
        >
          Excellence<br />
          <span className="not-italic font-semibold">is the</span><br />
          Standard.
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] text-lg max-w-md mb-12 leading-relaxed"
        >
          Premium cleaning services tailored for luxury condominiums.
          Trusted by Aston Martin Residences Miami.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.8)} className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-10 py-4 bg-[var(--color-accent)] text-white hover:opacity-90 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Book a Service</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-500" style={{ transitionTimingFunction: 'var(--ease-luxury)' }} />
          </Link>
          <Link
            href="/services"
            className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300 flex items-center gap-3"
          >
            View Services
            <span className="text-[var(--color-accent)]">→</span>
          </Link>
        </motion.div>

        {/* Service Marquee */}
        <motion.div {...fadeUp(1.0)} className="mt-20 overflow-hidden border-t border-[var(--color-silver)]/20 pt-6">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                {s} <span className="text-[var(--color-accent)] mx-4">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
