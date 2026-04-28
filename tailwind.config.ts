import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'inv-bg':      '#060816',
        'inv-surface': '#0a0f1e',
        'inv-card':    '#0d1228',
        'inv-primary': '#0087f8',
        'inv-secondary':'#44c4f6',
        'inv-accent':  '#44c4f6',
        'inv-muted':   '#1a2035',
        'inv-fg':      '#e2e8f0',
        'inv-fg-muted':'#7c8ea6',
        'inv-border':  'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-inv': 'linear-gradient(135deg, #0087f8, #44c4f6)',
        'gradient-inv-violet': 'linear-gradient(135deg, #0087f8, #44c4f6)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-med':  'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.03' },
          '50%':      { opacity: '0.07' },
        },
      },
      backdropBlur: {
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
  plugins: [],
}

export default config
