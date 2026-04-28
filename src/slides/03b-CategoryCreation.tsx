import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, nodeExpand, stagger } from '../lib/animations'

interface Props { step: number }

const layers = [
  {
    label: 'Idea Layer',
    tools: ['ChatGPT', 'Notion', 'Whiteboards'],
    color: '#fbbf24',
    desc: 'Concept generation & note-taking',
  },
  {
    label: 'Product Intelligence Layer',
    tools: ['Avylo AI'],
    color: '#0087f8',
    desc: 'Strategy · Architecture · Execution Blueprint',
    highlight: true,
  },
  {
    label: 'Build Layer',
    tools: ['GitHub Copilot', 'Cursor', 'Vercel'],
    color: '#34d399',
    desc: 'Code generation & deployment',
  },
]

const gaps = [
  { label: 'Product Architecture', color: '#0087f8' },
  { label: 'System Design',        color: '#44c4f6' },
  { label: 'GTM Strategy',         color: '#44c4f6' },
  { label: 'Team Intelligence',    color: '#34d399' },
  { label: 'Execution Roadmap',    color: '#fbbf24' },
]

export default function CategoryCreation({ step }: Props) {
  return (
    <div className="slide-root">
      {/* Accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(0,135,248,0.10) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="primary" size="md">New Category</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-4xl">
            A new{' '}
            <GradientText variant="primary">foundational software category</GradientText>{' '}
            is emerging.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-base max-w-2xl leading-relaxed">
            The gap between idea and execution has never been addressed at the infrastructure level — until now.
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Left: layer stack visualization */}
          <div className="flex-1 flex flex-col gap-3">
            {layers.map((layer, i) => (
              <AnimatePresence key={i}>
                {step >= i && (
                  <motion.div
                    variants={nodeExpand}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.15 }}
                  >
                    <GlassCard
                      className={`p-5 flex flex-col gap-2 ${layer.highlight ? 'glow-secondary' : ''}`}
                      gradientBorder={layer.highlight}
                      variant={layer.highlight ? 'med' : 'default'}
                    >
                      <div className="flex items-center justify-between">
                        <p
                          className="font-bold text-sm leading-snug"
                          style={{ color: layer.color }}
                        >
                          {layer.highlight ? '⬟ ' : ''}{layer.label}
                        </p>
                        {layer.highlight && (
                          <Badge variant="primary" size="sm">Missing Until Now</Badge>
                        )}
                      </div>
                      <p className="text-xs text-[var(--fg-muted)]">{layer.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {layer.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                            style={{
                              background: `${layer.color}14`,
                              border: `1px solid ${layer.color}30`,
                              color: layer.color,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Right: category gap details */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Flow arrow */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-3 px-1"
                >
                  <div className="flex items-center gap-2 text-[var(--fg-muted)] text-sm font-mono">
                    <span className="text-[#fbbf24] font-semibold">Idea</span>
                    <ArrowRight size={14} className="text-[var(--fg-muted)]" />
                    <span className="text-[#0087f8] font-bold">Avylo</span>
                    <ArrowRight size={14} className="text-[var(--fg-muted)]" />
                    <span className="text-[#34d399] font-semibold">Build</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* What the layer owns */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <p className="text-xs uppercase tracking-widest text-[var(--fg-muted)] font-mono mb-1">
                    What the Product Intelligence Layer owns
                  </p>
                  {gaps.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: g.color }} />
                      <span className="text-sm font-medium text-[var(--fg)]">{g.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category statement */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard className="p-5" gradientBorder variant="med">
                    <p className="text-base font-bold text-[var(--fg)] leading-snug">
                      "AI changed coding.{' '}
                      <GradientText variant="full">Avylo defines product architecture.</GradientText>"
                    </p>
                    <p className="text-xs text-[var(--fg-muted)] mt-2 leading-relaxed">
                      This is not a feature. This is a new infrastructure category — built for the generation of founders who ship with AI.
                    </p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
