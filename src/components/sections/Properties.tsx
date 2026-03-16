'use client'
import { motion } from 'framer-motion'
import { properties } from '@/lib/content'

export function Properties() {
  return (
    <section className="py-24 px-8 border-y border-[var(--color-silver)]/20">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)] mb-12"
        >
          Properties We Serve
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {properties.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold italic text-[var(--color-text)]">{p.name}</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1">{p.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
