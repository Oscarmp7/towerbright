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
