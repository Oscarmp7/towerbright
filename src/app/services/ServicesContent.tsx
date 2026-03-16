'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/lib/content'

export function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-6"
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)]"
            style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* Service blocks */}
      {services.map((service, i) => (
        <section
          key={service.id}
          className={`py-24 px-8 ${i % 2 === 1 ? 'bg-[var(--color-surface-2)]' : ''}`}
        >
          <div className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className={`${i % 2 === 1 ? 'md:order-2' : ''}`}
            >
              <div className="overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={600}
                  className="w-full object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
              className={`${i % 2 === 1 ? 'md:order-1' : ''}`}
            >
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4">
                0{i + 1}
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light italic text-[var(--color-text)] mb-6">
                {service.name}
              </h2>
              <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                href="/contact"
                className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-8 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 inline-block"
              >
                Request This Service
              </Link>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] mb-8 leading-relaxed">
            Every service is tailored to your residence. Contact us for a personalized assessment.
          </p>
          <Link
            href="/contact"
            className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-10 py-4 bg-[var(--color-accent)] text-white hover:opacity-90 transition-all duration-300 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
