import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Bot, Clock, Cpu, Layers } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeLeft, fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const painPoints = [
  {
    icon: <Layers size={20} />,
    title: 'No architecture clarity',
    body: 'Founders ship features without coherent system design — technical debt compounds from day one and costs tens of thousands to unwind.',
    color: '#f87171',
  },
  {
    icon: <Cpu size={20} />,
    title: 'Strategic guidance is inaccessible',
    body: 'Expert architecture consultation runs $300–$600/hr. Early-stage teams burn runway on the wrong foundation before hiring help.',
    color: '#fbbf24',
  },
  {
    icon: <Clock size={20} />,
    title: 'Planning consumes entire sprints',
    body: 'Manually mapping strategy, data models, and architecture diagrams takes weeks — time that should go toward building and validating.',
    color: '#fb923c',
  },
  {
    icon: <AlertTriangle size={20} />,
    title: 'Fragmented, disconnected tools',
    body: 'Strategy in Notion. Diagrams in Miro. Roadmaps in Jira. Nothing integrates. The strategic layer is always missing.',
    color: '#f87171',
  },
  {
    icon: <Bot size={20} />,
    title: 'AI accelerates code, not strategy',
    body: 'Copilot and ChatGPT speed up implementation — but cannot define product architecture, team structure, or execution strategy.',
    color: '#44c4f6',
  },
]

export default function TheProblem({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-6">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="danger" size="md">The Problem</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
            Execution is faster than ever.{' '}
            <GradientText variant="violet" className="block md:inline">
              Strategic clarity is not.
            </GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-sm max-w-xl">
            Founders waste thousands before building the right architecture. The strategic layer is still missing.
          </motion.p>
        </motion.div>

        {/* Pain point grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {painPoints.map((p, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.4 : 0 }}
                >
                  <GlassCard className="p-4 h-full flex flex-col gap-3" glow="none">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${p.color}18`,
                        color: p.color,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--fg)] leading-snug mb-1">{p.title}</p>
                      <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{p.body}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Bottom stat bar */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-wrap gap-6 items-center"
            >
              {[
                { label: 'of startups fail due to poor product-market fit & planning', value: '90%', color: '#f87171' },
                { label: 'avg weeks lost to manual architecture & strategy planning', value: '3–6', color: '#fbbf24' },
                { label: 'cost of senior technical co-founder per hour of strategy', value: '$450', color: '#0087f8' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeLeft}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.12 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-[var(--fg-muted)] max-w-[140px] leading-tight">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
