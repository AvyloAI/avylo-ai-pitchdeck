import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  variant?: 'primary' | 'violet' | 'full'
  className?: string
  glow?: boolean
}

const variantClass = {
  primary: 'gradient-text',
  violet:  'gradient-text-violet',
  full:    'gradient-text-full',
}

export default function GradientText({
  children,
  variant = 'primary',
  className = '',
  glow = false,
}: GradientTextProps) {
  return (
    <span
      className={`
        ${variantClass[variant]}
        ${glow ? 'text-glow-primary' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
