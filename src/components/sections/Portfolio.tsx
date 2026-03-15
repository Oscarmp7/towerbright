'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioImages } from '@/lib/content'

export function Portfolio() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)]"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Our Work
          </motion.h2>
          <Link
            href="/gallery"
            className="hidden md:block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            Full Gallery →
          </Link>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {portfolioImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 }}
              className="overflow-hidden break-inside-avoid group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={img.tall ? 800 : 400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ transitionTimingFunction: 'var(--ease-luxury)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
