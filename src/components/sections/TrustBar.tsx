'use client'
import { motion } from 'framer-motion'
import { trustItems } from '@/lib/content'

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-silver)]/20 py-12 px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-[var(--color-text)]">{item.label}</p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
