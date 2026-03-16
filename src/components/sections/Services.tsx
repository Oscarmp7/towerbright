'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/lib/content'

export function Services() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)]"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              Our Services
            </motion.h2>
          </div>
          <Link
            href="/services"
            className="hidden md:block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-silver)]/20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }}
              className="group bg-[var(--color-bg)] p-10 hover:bg-[var(--color-surface-2)] transition-colors duration-300 relative"
            >
              <span className="absolute top-6 right-6 w-3 h-3 border-t border-r border-[var(--color-silver)]/40 group-hover:border-[var(--color-accent)] transition-colors duration-300" />

              <div className="overflow-hidden mb-8 aspect-[16/9]">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ transitionTimingFunction: 'var(--ease-luxury)' }}
                />
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[var(--color-text)] mb-3">{service.name}</h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
