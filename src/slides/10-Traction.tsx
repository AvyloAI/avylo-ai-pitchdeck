import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Cpu, Mic, TrendingUp, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const milestones = [
  {
    icon: <Cpu size={22} />,
    title: 'MVP Built',
    metric: '100%',
    metricLabel: 'Core modules shipped',
    desc: 'Full end-to-end platform with AI project form, architecture generator, visual node editor, and roadmap builder.',
    color: '#0087f8',
  },
  {
    icon: <CheckCircle size={22} />,
    title: 'Working Platform',
    metric: '6',
    metricLabel: 'Core modules live',
    desc: 'Architecture generator, database blueprint, team advisor, stack recommender, roadmap, and export engine all functional.',
    color: '#44c4f6',
  },
  {
    icon: <Mic size={22} />,
    title: 'SDC Workshop',
    metric: '40+',
    metricLabel: 'Live technical validation',
    desc: 'Live-demoed Avylo to 40+ active software engineers. Standing technical validation with real-time Q&A and in-depth architecture feedback.',
    color: '#44c4f6',
  },
  {
    icon: <Users size={22} />,
    title: 'Founder Ecosystem',
    metric: '120+',
    metricLabel: 'Builder conversations',
    desc: '120+ founder and builder conversations across Tunisia, France, Germany, and Canada. Consistent pain point confirmation across markets.',
    color: '#34d399',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Early Validation',
    metric: '94%',
    metricLabel: 'Would pay for this',
    desc: 'Post-workshop survey and beta interviews confirm clear willingness to pay. Problem is real, acute, and recurring.',
    color: '#fbbf24',
  },
]

export default function Traction({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-6">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="success" size="md">Traction</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Not a concept.{' '}
            <GradientText variant="primary">A working product.</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-sm max-w-xl">
            Built, tested, and validated — with real founders, real feedback, real signal.
          </motion.p>
        </motion.div>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {milestones.map((m, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.3 : i * 0.07 }}
                >
                  <GlassCard className="p-4 flex flex-col gap-3 h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}30` }}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold" style={{ color: m.color }}>{m.metric}</div>
                      <div className="text-[10px] text-[var(--fg-muted)]">{m.metricLabel}</div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--fg)] mb-1">{m.title}</p>
                      <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{m.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  )
}
