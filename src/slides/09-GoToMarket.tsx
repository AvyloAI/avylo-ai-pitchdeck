import { AnimatePresence, motion } from 'framer-motion'
import { Building2, Globe, GraduationCap, Users } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const phases = [
  {
    num: '01',
    label: 'Founders & Indie Builders',
    icon: <Users size={20} />,
    color: '#0087f8',
    timeline: 'Q2–Q3 2026',
    channels: ['Product Hunt', 'Twitter / X', 'Indie Hackers', 'Founder-led growth'],
    kpi: '500 paying users',
  },
  {
    num: '02',
    label: 'Startup Ecosystems',
    icon: <Building2 size={20} />,
    color: '#44c4f6',
    timeline: 'Q3–Q4 2026',
    channels: ['Incubator partnerships', 'Accelerator programs', 'Angel networks', 'VC referrals'],
    kpi: '10 ecosystem deals',
  },
  {
    num: '03',
    label: 'Universities & Labs',
    icon: <GraduationCap size={20} />,
    color: '#44c4f6',
    timeline: 'Q1–Q2 2027',
    channels: ['CS department pilots', 'Innovation centers', 'Research partnerships', 'Edu licensing'],
    kpi: '5 university pilots',
  },
  {
    num: '04',
    label: 'Enterprise & Global',
    icon: <Globe size={20} />,
    color: '#34d399',
    timeline: 'Q3 2027+',
    channels: ['Enterprise sales team', 'Partner network', 'API marketplace', 'White-label deals'],
    kpi: '$2M+ ARR',
  },
]

export default function GoToMarket({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col gap-6">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="primary" size="md">Go-to-Market</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">
            A deliberate{' '}
            <GradientText variant="primary">expansion strategy.</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-sm max-w-xl">
            Founder-led growth + ecosystem partnerships. Product-led acquisition, institutionally amplified.
          </motion.p>
        </motion.div>

        {/* Cards grid — no decorative line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {phases.map((p, i) => (
              <AnimatePresence key={i}>
                {step >= i && (
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.3 : 0.1 }}
                  >
                    <GlassCard className="p-5 flex flex-col gap-3 h-full relative">
                      {/* Phase number */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
                        >
                          {p.icon}
                        </div>
                        <span
                          className="text-3xl font-extrabold"
                          style={{ color: `${p.color}30` }}
                        >
                          {p.num}
                        </span>
                      </div>

                      <div>
                        <p className="font-bold text-sm text-[var(--fg)] mb-0.5">{p.label}</p>
                        <p className="text-[10px] text-[var(--fg-muted)] font-mono">{p.timeline}</p>
                      </div>

                      <ul className="flex flex-col gap-1">
                        {p.channels.map((c, j) => (
                          <li key={j} className="text-[11px] text-[var(--fg-muted)] flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                            {c}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="mt-auto pt-2 border-t text-xs font-semibold"
                        style={{ borderColor: `${p.color}20`, color: p.color }}
                      >
                        KPI: {p.kpi}
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
