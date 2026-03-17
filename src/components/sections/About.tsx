'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// TODO: Replace with actual CEO image URL from Vercel blob storage
const CEO_IMAGE_URL =
  'https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819770-IMG_2162.jpeg'

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '200+', label: 'Residences Served' },
  { value: '100%', label: 'Client Satisfaction' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
})

export function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="relative py-28 md:py-36 lg:py-44 px-6 sm:px-8 overflow-hidden bg-[var(--color-surface)]">

      {/* Faint vertical rule — decorative */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-silver)]/10 hidden lg:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] xl:grid-cols-[520px_1fr] gap-12 lg:gap-20 xl:gap-28 items-center">

          {/* ── LEFT: CEO Portrait ── */}
          <div ref={imageRef} className="order-1 relative self-start">

            {/* Corner accent frames */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -top-4 -left-4 z-10 pointer-events-none"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-10 h-[1px] bg-[var(--color-gold-touch)] origin-left"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="w-[1px] h-10 bg-[var(--color-gold-touch)] origin-top mt-0"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-4 -right-4 z-10 pointer-events-none flex flex-col items-end"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-[1px] h-10 bg-[var(--color-gold-touch)] origin-bottom"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="w-10 h-[1px] bg-[var(--color-gold-touch)] origin-right"
              />
            </motion.div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
              >
                <Image
                  src={CEO_IMAGE_URL}
                  alt="Angel Wolfram — Founder & CEO, TowerBright"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 520px"
                />
              </motion.div>

              {/* Bottom gradient for name clarity on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />
            </motion.div>

            {/* Name / role strip */}
            <motion.div {...fadeUp(0.4)} className="pt-6 flex items-end justify-between border-t border-[var(--color-silver)]/20 mt-6">
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl italic font-light text-[var(--color-text)] leading-none mb-1">
                  Angel Wolfram
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Founder &amp; CEO
                </p>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
                  TowerBright
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
                  Miami, FL
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Story + Quote ── */}
          <div className="order-2 flex flex-col gap-10 md:gap-12">

            {/* Pre-headline */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-4">
              <div className="h-[1px] w-10 bg-[var(--color-accent)]" />
              <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                Who We Are
              </p>
            </motion.div>

            {/* Headline */}
            <div className="-mt-4 md:-mt-6">
              <motion.h2
                {...fadeUp(0.1)}
                className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)] leading-[1.05]"
                style={{ fontSize: 'clamp(34px, 3.5vw, 58px)' }}
              >
                Born from a standard,
                <br />
                <span className="not-italic font-semibold">not a trend.</span>
              </motion.h2>
            </div>

            {/* Body copy */}
            <div className="space-y-5">
              <motion.p
                {...fadeUp(0.2)}
                className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-[1.8] text-[15px] md:text-base max-w-xl"
              >
                TowerBright was founded on a conviction: that the residences of Miami's most discerning individuals deserve a standard of care that matches the caliber of the buildings they call home.
              </motion.p>
              <motion.p
                {...fadeUp(0.25)}
                className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-[1.8] text-[15px] md:text-base max-w-xl"
              >
                We don&apos;t send teams — we send professionals who understand that in a luxury residence, there is no such thing as a minor detail. Every visit is a commitment, not a transaction.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-silver)]/20"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.1 }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light text-[var(--color-text)] leading-none mb-2"
                    style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
                  >
                    {s.value}
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] leading-relaxed">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CEO Blockquote */}
            <motion.blockquote
              {...fadeUp(0.5)}
              className="relative pl-5 border-l-2 border-[var(--color-accent)]"
            >
              {/* Large decorative quote mark */}
              <span
                className="absolute -top-3 -left-1 font-[family-name:var(--font-cormorant)] text-[80px] leading-none text-[var(--color-accent)]/10 select-none pointer-events-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="font-[family-name:var(--font-cormorant)] italic font-light text-[var(--color-text)] leading-[1.65] relative z-10"
                style={{ fontSize: 'clamp(17px, 1.6vw, 22px)' }}
              >
                Excellence isn&apos;t a promise — it&apos;s a practice. We built TowerBright to prove that luxury service begins with the people delivering it, not the products they carry.
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="h-[1px] w-6 bg-[var(--color-accent)]/40" />
                <cite className="not-italic">
                  <span className="font-[family-name:var(--font-cormorant)] text-base italic font-light text-[var(--color-text)]">
                    Angel Wolfram
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)] ml-3">
                    Founder &amp; CEO
                  </span>
                </cite>
              </footer>
            </motion.blockquote>

          </div>
        </div>
      </div>
    </section>
  )
}
