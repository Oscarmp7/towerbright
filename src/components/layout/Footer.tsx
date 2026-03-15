import Link from 'next/link'

const serviceLinks = [
  'Indoor Window Cleaning',
  'Balcony Polish',
  'Bathroom Polish',
  'Marble Rejuvenation',
]

export function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-[var(--color-silver)]/20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        <div>
          <p className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[var(--color-text)] mb-2">
            Tower<span className="text-[var(--color-accent)]">Bright</span>
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            Excellence is the Standard
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-2">Services</p>
          {serviceLinks.map((s) => (
            <Link
              key={s}
              href="/services"
              className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
            >
              {s}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-2">Connect</p>
          <a href="mailto:info@towerbrightco.com" className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
            info@towerbrightco.com
          </a>
          <a href="https://wa.me/2393519514" className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
            WhatsApp
          </a>
          <a href="https://instagram.com/towerbrightco" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
            @towerbrightco
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-[var(--color-silver)]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--color-text-subtle)]">
          © 2026 TowerBright. All rights reserved.
        </p>
        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--color-text-subtle)]">
          Miami · Brickell · Florida
        </p>
      </div>
    </footer>
  )
}
