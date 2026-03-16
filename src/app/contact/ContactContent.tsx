'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { submitContactForm } from './actions'

const inputClass =
  'w-full bg-transparent border-b border-[var(--color-silver)]/40 focus:border-[var(--color-accent)] outline-none py-3 font-[family-name:var(--font-dm-sans)] text-[var(--color-text)] transition-colors duration-300'

const labelClass =
  'font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] block mb-3'

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const result = await submitContactForm(data)
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)]"
            style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      <section className="pb-32 px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {submitted ? (
              <div className="py-20 text-center">
                <p className="font-[family-name:var(--font-cormorant)] text-3xl italic text-[var(--color-text)] mb-4">
                  Thank you.
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input id="name" name="name" type="text" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" name="email" type="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input id="phone" name="phone" type="tel" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>Service Interest</label>
                  <select id="service" name="service" className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="window-cleaning">Indoor Window Cleaning</option>
                    <option value="balcony-polish">Balcony Polish</option>
                    <option value="bathroom-polish">Bathroom Polish</option>
                    <option value="marble-rejuvenation">Marble Rejuvenation</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} />
                </div>

                {error && (
                  <p role="alert" className="font-[family-name:var(--font-dm-sans)] text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.15em] px-10 py-4 bg-[var(--color-accent)] text-white hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info + Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="space-y-12"
          >
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-4">Direct Contact</p>
              <div className="space-y-4">
                <a href="mailto:info@towerbrightco.com" className="block font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                  info@towerbrightco.com
                </a>
                <a href="https://wa.me/2393519514" className="block font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                  WhatsApp: (239) 351-9514
                </a>
              </div>
            </div>

            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-4">Follow Us</p>
              <div className="space-y-4">
                <a href="https://instagram.com/towerbrightco" target="_blank" rel="noopener noreferrer" className="block font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                  Instagram @towerbrightco
                </a>
              </div>
            </div>

            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-4">Service Area</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                Miami · Brickell · Coral Gables · Key Biscayne<br />
                Serving luxury condominiums and high-rise residences throughout South Florida.
              </p>
            </div>

            {/* Calendly placeholder */}
            <div className="border border-[var(--color-silver)]/20 p-8">
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-4">Schedule a Consultation</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-6">
                Book a time that works for you. We&apos;ll assess your needs and provide a tailored quote.
              </p>
              {/*
                WHEN CLIENT PROVIDES CALENDLY URL:
                1. Replace the div below with:
                   <div
                     className="calendly-inline-widget"
                     data-url="https://calendly.com/CLIENT_USERNAME"
                     style={{ minWidth: '320px', height: '630px' }}
                   />
                2. Add to layout.tsx <head>:
                   <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
              */}
              <div className="bg-[var(--color-surface-2)] h-[400px] flex items-center justify-center">
                <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-subtle)]">
                  Calendly — Coming Soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
