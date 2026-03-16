'use client'
import { motion } from 'framer-motion'
import { testimonials } from '@/lib/content'

export function Testimonials() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-20 text-center"
        >
          What Clients Say
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              className="flex flex-col"
            >
              <span className="font-[family-name:var(--font-cormorant)] text-5xl text-[var(--color-accent)]/30 leading-none mb-6">&ldquo;</span>
              <p className="font-[family-name:var(--font-cormorant)] text-xl italic font-light text-[var(--color-text)] leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="mt-8 pt-6 border-t border-[var(--color-silver)]/20">
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text)]">{t.author}</p>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1">{t.property}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
