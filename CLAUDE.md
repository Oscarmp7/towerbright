# TowerBright — Project Context

## Qué es

Sitio web de servicio de limpieza premium para condominios de lujo en Miami/Brickell. Cliente: TowerBright. Objetivo: 10 leads/semana. El formulario de contacto + Calendly son la conversión principal.

## Stack

- Next.js 16.1.6 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · next-themes
- Email: Resend (Server Action en `src/app/contact/actions.ts`)
- Deploy: Vercel · Dominio: towerbrightco.com
- Branch principal: `main` (producción) · Desarrollo: `dev`

## Comandos clave

```bash
npm run dev     # localhost:3000
npm run build   # verificar antes de PR
npm run lint    # ESLint — debe pasar sin errores
```

## Variables de entorno (.env.local)

```
RESEND_API_KEY=re_...          # Envío de emails del formulario
NEXT_PUBLIC_GA_ID=G-...        # Google Analytics (opcional)
```

## Estructura importante

```
src/
  app/
    page.tsx                   # Home — todos los sections
    contact/
      ContactContent.tsx       # Formulario de contacto (wired con Resend)
      actions.ts               # Server Action — submitContactForm()
    gallery/GalleryContent.tsx # Galería con lightbox accesible
    services/ServicesContent.tsx
  components/
    ui/
      Logo.tsx                 # SVG isotipo + wordmark (variant="full"|"mark")
      CustomSelect.tsx         # Dropdown premium con Framer Motion
      ThemeToggle.tsx          # Dark/light (usa resolvedTheme)
    layout/
      Nav.tsx                  # Glassmorphism on scroll, hamburger mobile
      Footer.tsx               # En layout.tsx (todas las páginas lo heredan)
    sections/
      Hero, TrustBar, Services, WhyUs, Portfolio, Properties
      Testimonials, BookingCTA (orden en page.tsx)
  lib/
    content.ts                 # Todos los datos: services, properties, testimonials
    fonts.ts                   # Cormorant Garamond + DM Sans
```

## Design system

- **Display:** Cormorant Garamond italic — `font-[family-name:var(--font-cormorant)]`
- **Body/UI:** DM Sans — `font-[family-name:var(--font-dm-sans)]`
- **Colores:** CSS vars (`--color-bg`, `--color-accent`, `--color-text`, etc.) — ver `globals.css`
- **Motion:** `ease: [0.16, 1, 0.3, 1]`, scroll reveals con `whileInView + viewport={{ once: true }}`
- **Dark mode:** `next-themes` con `defaultTheme="system"` — usar `resolvedTheme` (no `theme`)

## Estado actual (2026-03-16)

- ✅ Sitio completo y funcional: Home, /services, /gallery, /contact
- ✅ Formulario conectado a Resend (pendiente: cliente configura API key)
- ✅ Logo SVG implementado (isotipo + wordmark)
- ✅ Playwright MCP disponible para inspección visual
- ⏳ Calendly: pendiente que cliente entregue su URL
- ⏳ PR dev → main pendiente
- ⏳ Testimoniales: son placeholder — reemplazar con quotes reales del cliente

## Propiedades que sirven

Aston Martin Residences Miami · Brickell Heights · One Thousand Museum Miami

## Contacto del cliente

- Email: info@towerbrightco.com
- WhatsApp: (239) 351-9514
- Instagram: @towerbrightco
