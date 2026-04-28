import { motion } from 'framer-motion'
import { ArrowRight, Brain, Database, GitBranch, Layers, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const outputs = [
  { icon: <Layers    size={16} />, label: 'Product Blueprint',      color: '#0087f8', delay: 0   },
  { icon: <GitBranch size={16} />, label: 'System Architecture',    color: '#44c4f6', delay: 0.1 },
  { icon: <Database  size={16} />, label: 'Database Design',        color: '#44c4f6', delay: 0.2 },
  { icon: <ArrowRight size={16}/>, label: 'GTM Strategy',           color: '#34d399', delay: 0.3 },
  { icon: <Users     size={16} />, label: 'Execution Intelligence', color: '#fbbf24', delay: 0.4 },
]

export default function TheSolution({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" size="md">The Solution</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl">
            Avylo transforms startup intent into{' '}
            <GradientText variant="primary">execution-ready company architecture.</GradientText>
          </motion.h2>
        </motion.div>

        {/* Transformation pipeline */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 w-full">

          {/* Input prompt — always visible on mount */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-full md:w-52"
          >
            <GlassCard className="p-4" gradientBorder>
              <p className="text-xs text-[var(--fg-muted)] font-mono mb-2 tracking-wider">USER PROMPT</p>
              <p className="text-sm font-medium text-[var(--fg)] leading-snug">
                "I want to build an{' '}
                <span className="text-[#0087f8] font-semibold">AI-powered HR SaaS</span>{' '}
                for mid-size companies"
              </p>
              <span className="cursor-blink mt-1" />
            </GlassCard>
          </motion.div>

          {/* Arrow 1 — always visible on mount */}
          <div className="hidden md:flex flex-1 items-center justify-center px-2">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ originX: 0 }}
              className="flex-1 flex items-center w-full"
            >
              <div className="flex-1 h-[2px] bg-gradient-to-r from-[#0087f8]/60 to-[#44c4f6]" />
              <ArrowRight size={18} className="text-[#44c4f6] flex-shrink-0 ml-1" />
            </motion.div>
          </div>

          {/* AI Brain — always visible on mount */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(0,135,248,0.25) 0%, rgba(68,196,246,0.1) 60%)',
                  border: '1.5px solid rgba(0,135,248,0.5)',
                  boxShadow: '0 0 40px rgba(0,135,248,0.3)',
                }}
              >
                <Brain size={28} className="text-[#0087f8]" />
                <span className="text-[9px] font-semibold text-[#0087f8] tracking-widest mt-0.5">AVYLO</span>
              </div>
            </motion.div>
          </div>

          {/* Arrow 2 — always visible on mount */}
          <div className="hidden md:flex flex-1 items-center justify-center px-2">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ originX: 0 }}
              className="flex-1 flex items-center w-full"
            >
              <div className="flex-1 h-[2px] bg-[#44c4f6]/60" />
              <ArrowRight size={18} className="text-[#44c4f6] flex-shrink-0 ml-1" />
            </motion.div>
          </div>

          {/* Outputs — skeleton always present, items reveal on steps 1–5 */}
          <div className="flex-1 grid grid-cols-1 gap-3 relative">
            {outputs.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={step >= i + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="px-3 py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${o.color}20`, color: o.color }}
                  >
                    {o.icon}
                  </div>
                  <span className="text-sm font-medium text-[var(--fg)]">{o.label}</span>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full" style={{ background: o.color, boxShadow: `0 0 6px ${o.color}` }} />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center min-h-[40px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={step >= 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-[var(--fg)]">
                Idea{' '}
                <span className="text-[var(--fg-muted)]">→</span>{' '}
                <GradientText>Product Strategy</GradientText>{' '}
                <span className="text-[var(--fg-muted)]">→</span>{' '}
                <GradientText variant="violet">System Architecture</GradientText>{' '}
                <span className="text-[var(--fg-muted)]">→</span>{' '}
                <GradientText variant="full">Execution Roadmap</GradientText>
              </p>
            </motion.div>
        </div>
      </div>
    </div>
  )
}
