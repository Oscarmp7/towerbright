# Logo SVG + Custom Select Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the text-based logo with a proper SVG component (isotipo + wordmark) and replace the native `<select>` in the contact form with a custom dropdown that matches the site's premium aesthetic.

**Architecture:** Two independent components — `Logo.tsx` (SVG isotipo + text wordmark, `currentColor` for auto dark/light adaptation) and `CustomSelect.tsx` (Framer Motion dropdown, border-bottom style matching existing inputs). Both use the existing design token system and require no new dependencies.

**Tech Stack:** Next.js 16 App Router · TypeScript · Framer Motion (already installed) · Tailwind CSS v4 · CSS custom properties

---

## DESIGN REFERENCE

**Logo colors (via currentColor):**
- Light mode: inherits `--color-text` = `#0D0D0D` (near black, close to original navy)
- Dark mode: inherits `--color-text` = `#F2F0EC` (off-white, premium on dark bg)

**Select styling language:**
- Trigger: same `border-b border-[var(--color-silver)]/40` as text inputs
- Focus: `border-[var(--color-accent)]`
- Dropdown panel: `bg-[var(--color-surface)]`, `border border-[var(--color-silver)]/20`
- Option hover: `bg-[var(--color-surface-2)]`, text → `var(--color-text)`
- Animation: fade + translateY(8px → 0), `duration: 0.25s`, `ease: [0.16, 1, 0.3, 1]`

---

## Task 1: Logo SVG Component

**Files:**
- Create: `src/components/ui/Logo.tsx`

**Step 1: Create the Logo component**

The isotipo is a geometric building: chevron roof + 2 outer columns + 2 inner columns + base platform. `currentColor` means it inherits color from its CSS context automatically.

```typescript
// src/components/ui/Logo.tsx
import React from 'react'

interface LogoProps {
  variant?: 'full' | 'mark'
  className?: string
}

function TowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Peaked chevron roof */}
      <path d="M2 18 L22 2 L42 18 L37 18 L22 7 L7 18Z" />
      {/* Left outer column */}
      <rect x="2" y="18" width="8" height="26" />
      {/* Left inner column */}
      <rect x="14" y="24" width="6" height="20" />
      {/* Right inner column */}
      <rect x="24" y="24" width="6" height="20" />
      {/* Right outer column */}
      <rect x="34" y="18" width="8" height="26" />
      {/* Base platform */}
      <rect x="0" y="44" width="44" height="4" />
    </svg>
  )
}

export function Logo({ variant = 'full', className }: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ''}`}>
      <TowerIcon className="h-8 w-auto" />
      {variant === 'full' && (
        <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-lg tracking-wide">
          TowerBright
        </span>
      )}
    </span>
  )
}
```

**Step 2: Verify it renders**

Run `npm run dev`. Open browser console and temporarily add to any page:
```tsx
import { Logo } from '@/components/ui/Logo'
<Logo variant="full" className="text-red-500" />
```
Expected: building icon + "TowerBright" text, both red (proving `currentColor` works).

**Step 3: Commit**

```bash
git add src/components/ui/Logo.tsx
git commit -m "feat: add Logo SVG component with isotipo and wordmark"
```

---

## Task 2: Integrate Logo into Nav

**Files:**
- Modify: `src/components/layout/Nav.tsx`

**Step 1: Read current Nav.tsx**

Find the logo section — it currently renders:
```tsx
<span className="font-display text-xl font-semibold tracking-wide text-text">
  TOWER<span className="text-accent">BRIGHT</span>
</span>
```

**Step 2: Replace with Logo component**

```typescript
// Add import at top of Nav.tsx
import { Logo } from '@/components/ui/Logo'

// Replace the logo span inside the Link href="/" with:
<Logo variant="full" className="text-[var(--color-text)]" />
```

The full Link block should look like:
```tsx
<Link href="/" className="flex items-center gap-3">
  <Logo variant="full" className="text-[var(--color-text)]" />
</Link>
```

**Step 3: Run lint + build**

```bash
npm run lint
npm run build
```

Expected: both pass.

**Step 4: Verify visually**

Run `npm run dev`. Check:
- Light mode: logo renders in dark color
- Dark mode: logo renders in light color
- Hover on nav link: logo color transitions with the nav
- Mobile (375px): logo still readable

**Step 5: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "feat: replace text logo with SVG Logo component in Nav"
```

---

## Task 3: Integrate Logo into Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Read current Footer.tsx**

Find the logo section — it currently renders:
```tsx
<p className="font-display text-xl font-semibold text-text mb-2">
  TOWER<span className="text-accent">BRIGHT</span>
</p>
<p className="font-body text-xs uppercase tracking-[0.15em] text-muted">Excellence is the Standard</p>
```

**Step 2: Replace with Logo component**

```typescript
// Add import at top of Footer.tsx
import { Logo } from '@/components/ui/Logo'

// Replace the logo <p> with:
<Logo variant="full" className="text-[var(--color-text)] mb-2" />
<p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">Excellence is the Standard</p>
```

**Step 3: Run lint + build**

```bash
npm run lint
npm run build
```

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: replace text logo with SVG Logo component in Footer"
```

---

## Task 4: Custom Select Component

**Files:**
- Create: `src/components/ui/CustomSelect.tsx`

**Step 1: Create the component**

```typescript
// src/components/ui/CustomSelect.tsx
'use client'
import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  id?: string
  name: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CustomSelect({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const selectId = id ?? generatedId

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger */}
      <button
        type="button"
        id={selectId}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between py-3 border-b transition-colors duration-300 outline-none text-left ${
          open
            ? 'border-[var(--color-accent)]'
            : 'border-[var(--color-silver)]/40 hover:border-[var(--color-silver)]'
        }`}
      >
        <span
          className={`font-[family-name:var(--font-dm-sans)] text-base ${
            value ? 'text-[var(--color-text)]' : 'text-[var(--color-text-subtle)]'
          }`}
        >
          {selectedLabel}
        </span>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[var(--color-text-muted)] flex-shrink-0"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-[var(--color-surface)] border border-[var(--color-silver)]/20 shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`px-4 py-3 cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm transition-colors duration-200 ${
                  option.value === value
                    ? 'text-[var(--color-accent)] bg-[var(--color-surface-2)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/CustomSelect.tsx
git commit -m "feat: add CustomSelect component with Framer Motion dropdown"
```

---

## Task 5: Wire CustomSelect into ContactContent

**Files:**
- Modify: `src/app/contact/ContactContent.tsx`

**Step 1: Read current ContactContent.tsx**

Find the service select block — it currently uses a native `<select>`:
```tsx
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
```

**Step 2: Replace with CustomSelect**

```typescript
// Add import at top of ContactContent.tsx (after existing imports):
import { CustomSelect } from '@/components/ui/CustomSelect'

// Add state for the controlled select value (alongside existing useState declarations):
const [service, setService] = useState('')

// Define options array inside the component (before return):
const serviceOptions = [
  { value: 'window-cleaning', label: 'Indoor Window Cleaning' },
  { value: 'balcony-polish', label: 'Balcony Polish' },
  { value: 'bathroom-polish', label: 'Bathroom Polish' },
  { value: 'marble-rejuvenation', label: 'Marble Rejuvenation' },
  { value: 'multiple', label: 'Multiple Services' },
]

// Replace the <div> containing label + <select> with:
<div>
  <label htmlFor="service" className={labelClass}>Service Interest</label>
  <CustomSelect
    id="service"
    name="service"
    options={serviceOptions}
    value={service}
    onChange={setService}
    placeholder="Select a service"
  />
</div>
```

**Step 3: Update handleSubmit to use the service state**

The server action reads `form.elements.namedItem('service')` — this still works because `CustomSelect` renders a `<input type="hidden" name="service" value={value} />`. No changes needed to `handleSubmit`.

However, verify the hidden input is picked up correctly. The `form.elements.namedItem('service')` will return the hidden input. Cast it as `HTMLInputElement`:
```typescript
service: (form.elements.namedItem('service') as HTMLInputElement).value,
```
This is already correct in the existing code.

**Step 4: Run lint + build**

```bash
npm run lint
npm run build
```

Expected: both pass, no TypeScript errors.

**Step 5: Verify visually**

Run `npm run dev`. Open `/contact`:
- Select trigger shows "Select a service" placeholder in subtle color
- Click trigger: dropdown animates open (fade + slide)
- Select an option: dropdown closes, trigger shows selected label
- Press Escape: dropdown closes
- Click outside: dropdown closes
- Submit form: service value is included in the email

**Step 6: Commit**

```bash
git add src/app/contact/ContactContent.tsx
git commit -m "feat: replace native select with CustomSelect in contact form"
```

---

## Final Verification Checklist

```bash
npm run lint   # must pass
npm run build  # must pass
```

Manual checks:
- [ ] Nav shows isotipo + "TowerBright" in light mode (dark color)
- [ ] Nav shows isotipo + "TowerBright" in dark mode (light color)
- [ ] Footer shows same logo
- [ ] Logo transitions smoothly on theme toggle
- [ ] Contact form service dropdown opens/closes with animation
- [ ] Escape and click-outside close the dropdown
- [ ] Selected option is highlighted in accent color
- [ ] Form submits with the service value correctly

---

## NOTES

- The isotipo SVG uses `viewBox="0 0 44 48"` — this can be adjusted if the proportions need tuning after visual review
- The chevron roof path `"M2 18 L22 2 L42 18 L37 18 L22 7 L7 18Z"` creates a hollow chevron — adjust if a solid triangle top looks better
- `CustomSelect` uses a hidden `<input type="hidden">` for form compatibility — the server action reads it transparently
- No new dependencies added — Framer Motion is already installed
