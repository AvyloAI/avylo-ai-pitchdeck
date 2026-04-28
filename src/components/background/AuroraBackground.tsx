import { motion } from 'framer-motion'

const orbs = [
  {
    color: 'rgba(0, 135, 248, 0.22)',
    size: 700,
    initial: { x: '-20%', y: '-10%' },
    animate: { x: ['-20%', '5%', '-20%'], y: ['-10%', '20%', '-10%'] },
    duration: 18,
  },
  {
    color: 'rgba(0, 135, 248, 0.14)',
    size: 600,
    initial: { x: '60%', y: '40%' },
    animate: { x: ['60%', '35%', '60%'], y: ['40%', '5%', '40%'] },
    duration: 22,
  },
  {
    color: 'rgba(68, 196, 246, 0.16)',
    size: 500,
    initial: { x: '30%', y: '70%' },
    animate: { x: ['30%', '55%', '30%'], y: ['70%', '45%', '70%'] },
    duration: 26,
  },
]

export default function AuroraBackground() {
  return (
    <div
      data-aurora
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            left: '0',
            top: '0',
            translateX: orb.initial.x,
            translateY: orb.initial.y,
          }}
          animate={{
            translateX: orb.animate.x,
            translateY: orb.animate.y,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
        />
      ))}
    </div>
  )
}
