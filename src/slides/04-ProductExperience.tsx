import { AnimatePresence, motion } from 'framer-motion'
import { Database, FileText, GitBranch, Layers, Map, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const modules = [
  {
    icon: <FileText  size={22} />,
    title: 'AI Project Form',
    desc: 'Structured intelligent intake that extracts full product requirements from a single description.',
    color: '#0087f8',
    badge: 'Core',
  },
  {
    icon: <Layers    size={22} />,
    title: 'Architecture Generator',
    desc: 'Instantly produces a layered system architecture — frontend, backend, infra, integrations.',
    color: '#44c4f6',
    badge: 'AI-powered',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'Interactive Node System',
    desc: 'Visual live diagram with editable, exportable architecture nodes and connection flows.',
    color: '#44c4f6',
    badge: 'Visual',
  },
  {
    icon: <Map       size={22} />,
    title: 'Execution Roadmap',
    desc: 'Sprint-by-sprint delivery plan with milestones, resource requirements, and risk markers.',
    color: '#34d399',
    badge: 'Planning',
  },
  {
    icon: <Users     size={22} />,
    title: 'Team & Stack Advisor',
    desc: 'Recommends optimal team composition and technology stack based on product requirements.',
    color: '#fbbf24',
    badge: 'Intelligence',
  },
  {
    icon: <Database  size={22} />,
    title: 'Database Blueprint',
    desc: 'Auto-generates entity-relationship models, schema recommendations, and data strategy.',
    color: '#f87171',
    badge: 'Data',
  },
]

export default function ProductExperience({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="accent" size="md">Product Experience</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">
            A product architect, systems strategist,{' '}
            and{' '}
            <GradientText variant="primary">startup blueprint engine</GradientText>{' '}
            in one platform.
          </motion.h2>
        </motion.div>

        {/* Module grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((m, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.3 : i * 0.05 }}
                >
                  <GlassCard
                    className="p-5 h-full flex flex-col gap-3 group hover:scale-[1.02] transition-transform duration-200"
                    gradientBorder={step >= i + 1}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${m.color}18`,
                          color: m.color,
                          border: `1px solid ${m.color}30`,
                        }}
                      >
                        {m.icon}
                      </div>
                      <Badge
                        variant="neutral"
                        size="sm"
                        className="text-[10px]"
                      >
                        {m.badge}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--fg)] mb-1">{m.title}</h3>
                      <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{m.desc}</p>
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
