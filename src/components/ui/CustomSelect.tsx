'use client'
import { useState, useRef, useEffect, useId, useCallback } from 'react'
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
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listboxId = `${selectId}-listbox`

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder

  const closeAndFocusTrigger = useCallback(() => {
    setOpen(false)
    setFocusedIndex(-1)
    // Return focus to trigger button
    const trigger = containerRef.current?.querySelector('button')
    trigger?.focus()
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeAndFocusTrigger()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          onChange(options[focusedIndex].value)
          closeAndFocusTrigger()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, focusedIndex, options, onChange, closeAndFocusTrigger])

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex < 0 || !listboxRef.current) return
    const items = listboxRef.current.querySelectorAll('[role="option"]')
    const focused = items[focusedIndex] as HTMLElement | undefined
    focused?.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex])

  // Set initial focus index to current selection when opening
  const handleOpen = () => {
    const currentIndex = options.findIndex((o) => o.value === value)
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0)
    setOpen(true)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger */}
      <button
        type="button"
        id={selectId}
        onClick={() => (open ? closeAndFocusTrigger() : handleOpen())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
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
          aria-hidden="true"
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
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-[var(--color-surface)] border border-[var(--color-silver)]/20 shadow-lg overflow-hidden"
          >
            {options.map((option, i) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value)
                  closeAndFocusTrigger()
                }}
                onMouseEnter={() => setFocusedIndex(i)}
                className={`px-4 py-3 cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm transition-colors duration-200 ${
                  i === focusedIndex
                    ? 'text-[var(--color-text)] bg-[var(--color-surface-2)]'
                    : option.value === value
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
