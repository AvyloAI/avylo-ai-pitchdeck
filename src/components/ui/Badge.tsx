import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

const variantStyles: Record<string, string> = {
  primary:   'bg-[rgba(0,135,248,0.15)] text-[#0087f8]   border border-[rgba(0,135,248,0.3)]',
  secondary: 'bg-[rgba(68,196,246,0.12)]  text-[#44c4f6]   border border-[rgba(68,196,246,0.3)]',
  accent:    'bg-[rgba(68,196,246,0.12)] text-[#44c4f6]   border border-[rgba(68,196,246,0.3)]',
  neutral:   'bg-[rgba(255,255,255,0.06)] text-[#7c8ea6]   border border-[rgba(255,255,255,0.1)]',
  success:   'bg-[rgba(52,211,153,0.12)]  text-[#34d399]   border border-[rgba(52,211,153,0.3)]',
  warning:   'bg-[rgba(251,191,36,0.12)]  text-[#fbbf24]   border border-[rgba(251,191,36,0.3)]',
  danger:    'bg-[rgba(248,113,113,0.12)] text-[#f87171]   border border-[rgba(248,113,113,0.3)]',
}

const sizeStyles = {
  sm: 'px-2.5 py-[5px] text-xs',
  md: 'px-3.5 py-[7px] text-sm',
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-block rounded-full font-medium tracking-wide whitespace-nowrap text-center',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ lineHeight: 1 }}
    >
      {children}
    </span>
  )
}
