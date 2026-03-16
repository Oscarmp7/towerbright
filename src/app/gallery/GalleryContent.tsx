'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { portfolioImages } from '@/lib/content'

export function GalleryContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setSelected(null), [])

  // Focus Close button when lightbox opens
  useEffect(() => {
    if (selected !== null) {
      closeButtonRef.current?.focus()
    }
  }, [selected])

  // Close on Escape
  useEffect(() => {
    if (selected === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, close])

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
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-[family-name:var(--font-cormorant)] font-light italic text-[var(--color-text)]"
            style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* Masonry grid — 1 col mobile, 2 sm, 3 md+ */}
      <section className="pb-32 px-8">
        <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {portfolioImages.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 }}
              className="overflow-hidden break-inside-avoid cursor-pointer group w-full text-left"
              onClick={() => setSelected(i)}
              aria-label={`View ${img.alt} full size`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={img.tall ? 800 : 400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ transitionTimingFunction: 'var(--ease-luxury)' }}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={portfolioImages[selected].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-8"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={portfolioImages[selected].src}
                alt={portfolioImages[selected].alt}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
              />
              <button
                ref={closeButtonRef}
                onClick={close}
                className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm font-[family-name:var(--font-dm-sans)] uppercase tracking-[0.15em] transition-colors duration-300"
                aria-label="Close image"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
