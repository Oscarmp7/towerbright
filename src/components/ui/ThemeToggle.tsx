'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- next-themes mount guard pattern
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <span className="text-lg">○</span>
      ) : (
        <span className="text-lg">☽</span>
      )}
    </button>
  )
}
