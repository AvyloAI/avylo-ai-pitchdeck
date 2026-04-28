import { useEffect, useRef } from 'react'

export default function SpotlightCursor() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!spotRef.current) return
      spotRef.current.style.setProperty('--cx', `${e.clientX}px`)
      spotRef.current.style.setProperty('--cy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      data-spotlight
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `radial-gradient(400px circle at var(--cx, 50%) var(--cy, 50%), rgba(0, 135, 248, 0.06) 0%, transparent 60%)`,
      }}
      aria-hidden="true"
    />
  )
}
