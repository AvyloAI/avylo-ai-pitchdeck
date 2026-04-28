import { useState } from 'react'
import { SLIDES } from '../../lib/slides-data'

interface NavigationProps {
  slideIndex: number
  totalSlides: number
  goTo: (index: number) => void
  goPrev: () => void
  goNext: () => void
}

function ChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 9L7 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navigation({
  slideIndex,
  totalSlides,
  goTo,
  goPrev,
  goNext,
}: NavigationProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div
      data-navigation
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
    >
      {/* Up arrow */}
      <button
        onClick={goPrev}
        disabled={slideIndex === 0}
        className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[rgba(0,135,248,0.15)] transition-all duration-200 disabled:opacity-20 disabled:cursor-default"
        aria-label="Previous slide"
      >
        <ChevronUp />
      </button>

      {/* Dot nav */}
      <div className="flex flex-col items-center gap-2 py-1">
        {Array.from({ length: totalSlides }).map((_, i) => {
          const isActive = i === slideIndex
          const label = SLIDES[i]?.label ?? `${i + 1}`
          return (
            <div key={i} className="relative flex items-center">
              {/* Tooltip */}
              {hoveredDot === i && (
                <div className="absolute right-full mr-3 whitespace-nowrap glass px-2.5 py-1 rounded-lg text-xs text-[var(--fg)] pointer-events-none">
                  {label}
                </div>
              )}
              <button
                onClick={() => goTo(i)}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
                aria-label={`Go to slide ${i + 1}: ${label}`}
                className="relative w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #0087f8, #44c4f6)'
                    : 'rgba(255,255,255,0.18)',
                  transform: isActive ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 8px rgba(0,135,248,0.7)' : 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Down arrow */}
      <button
        onClick={goNext}
        disabled={slideIndex === totalSlides - 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[rgba(0,135,248,0.15)] transition-all duration-200 disabled:opacity-20 disabled:cursor-default"
        aria-label="Next slide"
      >
        <ChevronDown />
      </button>

      {/* Fullscreen */}
      <button
        onClick={toggleFullscreen}
        className="mt-1 w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[rgba(0,135,248,0.1)] transition-all duration-200"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        <FullscreenIcon />
      </button>

      {/* Slide counter */}
      <span className="text-[10px] font-mono text-[var(--fg-muted)] tabular-nums mt-0.5">
        {String(slideIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
      </span>
    </div>
  )
}
