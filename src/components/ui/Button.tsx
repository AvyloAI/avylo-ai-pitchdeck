import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
}

const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0087f8]/50'

const variants = {
  solid:   'bg-gradient-to-r from-[#0087f8] to-[#44c4f6] text-white hover:shadow-[0_0_32px_rgba(0,135,248,0.45)] hover:scale-[1.02] active:scale-[0.98]',
  outline: 'border border-[rgba(0,135,248,0.5)] text-[#0087f8] bg-transparent hover:bg-[rgba(0,135,248,0.1)] hover:border-[#0087f8] active:scale-[0.98]',
  ghost:   'text-[#7c8ea6] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#e2e8f0] active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-[9px] text-sm',
  md: 'px-6 py-[13px] text-sm',
  lg: 'px-8 py-[17px] text-base',
}

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  icon,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ lineHeight: 1 }}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {children}
    </button>
  )
}
