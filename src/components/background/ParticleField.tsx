import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

const COLORS = [
  'rgba(0, 135, 248, 0.6)',
  'rgba(68, 196, 246, 0.5)',
  'rgba(0, 135, 248, 0.35)',
  'rgba(255, 255, 255, 0.25)',
]

export default function ParticleField() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [])

  return (
    <div
      data-particles
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
