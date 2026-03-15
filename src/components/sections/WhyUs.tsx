'use client'
import { motion } from 'framer-motion'

const statements = [
  {
    number: '01',
    title: "We don't cut corners.",
    body: "We reveal them. Every edge, every surface, every detail — treated with the same standard we'd apply to our own home.",
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
    <section className="py-32 px-8 bg-[var(--color-surface-2)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-20 text-center"
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
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.15 }}
            >
              <p className="font-[family-name:var(--font-cormorant)] text-6xl font-light text-[var(--color-silver)]/40 mb-6">{s.number}</p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light text-[var(--color-text)] mb-4">{s.title}</h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
