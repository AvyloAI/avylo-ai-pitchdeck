import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { cinemaEntrance, fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const pillars = [
  { label: 'Product OS',             desc: 'The foundational layer every startup runs on', color: '#0087f8' },
  { label: 'Venture Engine',         desc: 'Helping investors accelerate portfolio companies', color: '#44c4f6' },
  { label: 'AI Startup Infrastructure', desc: 'The default platform for the next generation of builders', color: '#44c4f6' },
]

export default function Vision({ step: _step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center gap-10 text-center">

        {/* Orbital SVG */}
        <motion.div
          variants={cinemaEntrance}
          initial="hidden"
          animate="visible"
          className="relative w-[280px] h-[280px] flex items-center justify-center"
        >
          <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full">
            {/* Outer orbit */}
            <motion.circle
              cx={140} cy={140} r={120}
              fill="none"
              stroke="rgba(0,135,248,0.15)"
              strokeWidth="1"
              strokeDasharray="5 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />
            {/* Mid orbit */}
            <motion.circle
              cx={140} cy={140} r={84}
              fill="none"
              stroke="rgba(68,196,246,0.2)"
              strokeWidth="1"
              strokeDasharray="4 6"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />
            {/* Inner orbit */}
            <motion.circle
              cx={140} cy={140} r={48}
              fill="none"
              stroke="rgba(68,196,246,0.25)"
              strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />

            {/* Orbiting dots on outer */}
            <motion.circle
              cx={140} cy={20} r={4}
              fill="#0087f8"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />
            {/* Orbiting dot on mid */}
            <motion.circle
              cx={140} cy={56} r={3.5}
              fill="#44c4f6"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />
            {/* Orbiting dot on inner */}
            <motion.circle
              cx={140} cy={92} r={3}
              fill="#44c4f6"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 140px' }}
            />

            {/* Center — Avylo core */}
            <circle cx={140} cy={140} r={28} fill="rgba(0,135,248,0.12)" stroke="rgba(0,135,248,0.5)" strokeWidth="1.5" />
            <circle cx={140} cy={140} r={14} fill="rgba(0,135,248,0.22)" />
            <text x={140} y={136} textAnchor="middle" fill="#0087f8" fontSize="7" fontWeight="800" fontFamily="Sora, sans-serif">AVYLO</text>
            <text x={140} y={146} textAnchor="middle" fill="rgba(0,135,248,0.7)" fontSize="5.5" fontFamily="Sora, sans-serif">AI CORE</text>
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Badge variant="accent" size="md">2026 Vision</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Every startup begins{' '}
            <GradientText variant="full">with Avylo.</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-lg max-w-2xl mx-auto">
            We are building the foundational infrastructure layer for the next generation of product creation —
            the operating system every startup, accelerator, and innovation hub will run on.
          </motion.p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-4 w-full"
        >
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="px-4 py-5 text-center flex flex-col gap-2">
                <div className="text-sm font-bold" style={{ color: p.color }}>{p.label}</div>
                <div className="text-xs text-[var(--fg-muted)] leading-relaxed">{p.desc}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
