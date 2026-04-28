import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'med' | 'strong'
  glow?: 'none' | 'primary' | 'secondary' | 'accent'
  gradientBorder?: boolean
  onClick?: () => void
}

const variantClass = {
  default: 'glass',
  med: 'glass-med',
  strong: 'glass-strong',
}

const glowClass = {
  none: '',
  primary: 'glow-primary',
  secondary: 'glow-secondary',
  accent: 'glow-accent',
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  glow = 'none',
  gradientBorder = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        ${variantClass[variant]}
        ${glowClass[glow]}
        ${gradientBorder ? 'gradient-border' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
