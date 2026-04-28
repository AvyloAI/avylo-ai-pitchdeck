import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const pillars = [
  { label: 'Product OS',                desc: 'The foundational layer every startup runs on',                  color: '#0087f8' },
  { label: 'Venture Engine',            desc: 'Helping investors accelerate portfolio companies at scale',      color: '#44c4f6' },
  { label: 'AI Startup Infrastructure', desc: 'The default platform for the next generation of builders',     color: '#44c4f6' },
]

const roadmap = [
  { stage: 'Now',    label: 'Product OS',                color: '#0087f8', desc: 'Foundational platform for startup architecture' },
  { stage: 'Next',   label: 'Venture Engine',            color: '#44c4f6', desc: 'Ecosystem intelligence for investors & accelerators' },
  { stage: 'Future', label: 'AI Startup Infrastructure', color: '#34d399', desc: 'The global default for product creation' },
]

export default function Vision({ step: _step }: Props) {
  return (
    <div className="slide-root">
      {/* Subtle centred glow — visual anchor without blocking content */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,135,248,0.13) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center gap-8 text-center">

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Badge variant="accent" size="md">2026 Vision</Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <motion.h2
            variants={fadeUp}
            className="text-6xl md:text-8xl font-extrabold leading-[1.0] tracking-tight"
          >
            Every startup begins{' '}
            <GradientText variant="full">with Avylo.</GradientText>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--fg-muted)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We are building the foundational infrastructure layer for the next generation
            of product creation — the operating system every startup, accelerator, and
            innovation hub will run on.
          </motion.p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-5 w-full"
        >
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="px-6 py-6 text-center flex flex-col gap-3">
                <div className="text-base font-bold" style={{ color: p.color }}>{p.label}</div>
                <div className="text-sm text-[var(--fg-muted)] leading-relaxed">{p.desc}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap progression */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 justify-center w-full"
        >
          {roadmap.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">{r.stage}</span>
                <div
                  className="px-4 py-2 rounded-xl text-xs font-bold"
                  style={{ background: `${r.color}15`, border: `1px solid ${r.color}35`, color: r.color }}
                >
                  {r.label}
                </div>
                <span className="text-[10px] text-[var(--fg-muted)] max-w-[120px] text-center leading-tight">{r.desc}</span>
              </div>
              {i < roadmap.length - 1 && (
                <span className="text-[var(--fg-muted)] text-lg mb-4">→</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
