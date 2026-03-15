'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-40 px-8 bg-[var(--color-accent)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-white/60 mb-8"
        >
          Ready for Immaculate?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-[family-name:var(--font-cormorant)] font-light italic text-white mb-12"
          style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
        >
          {"Let's transform"}<br />your space.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link
            href="/contact"
            className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-10 py-4 bg-white text-[var(--color-accent)] hover:bg-white/90 transition-all duration-300"
          >
            Book a Service
          </Link>
          <a
            href="https://wa.me/2393519514"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-10 py-4 border border-white/40 text-white hover:border-white transition-all duration-300"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
