import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    desc: 'Solo founders & early-stage builders',
    features: ['5 projects/month', 'Architecture generator', 'Roadmap builder', 'Export PDF'],
    color: '#0087f8',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/mo',
    desc: 'Serious builders & small teams',
    features: ['Unlimited projects', 'All modules', 'Team collaboration', 'API access', 'Priority support'],
    color: '#44c4f6',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Scaling companies & organizations',
    features: ['Everything in Pro', 'SSO & advanced security', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee'],
    color: '#44c4f6',
    highlighted: true,
  },
  {
    name: 'API',
    price: 'Usage',
    period: '',
    desc: 'Developers & platform integrators',
    features: ['Pay-per-generation', 'REST & webhook', 'Full output control', 'Developer sandbox'],
    color: '#34d399',
    highlighted: false,
  },
  {
    name: 'White-label',
    price: 'Partner',
    period: '',
    desc: 'Resellers & SaaS platforms',
    features: ['Full rebrand', 'Custom domain', 'Revenue share model', 'Partner dashboard'],
    color: '#fbbf24',
    highlighted: false,
  },
  {
    name: 'Institutional',
    price: 'Edu',
    period: '',
    desc: 'Universities & incubators',
    features: ['Cohort management', 'Instructor tools', 'Bulk licensing', 'Analytics dashboard'],
    color: '#f87171',
    highlighted: false,
  },
]

export default function BusinessModel({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-2 flex flex-col gap-5">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="success" size="md">Business Model</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">
            Multiple revenue streams.{' '}
            <GradientText variant="primary">Scalable at every layer.</GradientText>
          </motion.h2>
        </motion.div>

        {/* Plans grid — 6 equal columns */}
        <div className="grid grid-cols-6 gap-2">
          {plans.map((p, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.3 : i * 0.06 }}
                  className="h-full"
                >
                  <GlassCard
                    className={`p-3 flex flex-col gap-2 h-full ${p.highlighted ? 'glow-secondary' : ''}`}
                    gradientBorder={p.highlighted}
                    variant={p.highlighted ? 'med' : 'default'}
                  >
                    {p.highlighted && (
                      <Badge variant="secondary" size="sm" className="self-start">Most Popular</Badge>
                    )}
                    <div>
                      <div className="flex items-baseline gap-0.5 mb-0.5">
                        <span className="text-lg font-extrabold" style={{ color: p.color }}>{p.price}</span>
                        <span className="text-[10px] text-[var(--fg-muted)]">{p.period}</span>
                      </div>
                      <p className="font-bold text-xs text-[var(--fg)]">{p.name}</p>
                      <p className="text-[9px] text-[var(--fg-muted)] leading-snug mt-0.5">{p.desc}</p>
                    </div>
                    <ul className="flex flex-col gap-1">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-1 text-[10px] text-[var(--fg-muted)]">
                          <Check size={9} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* ARR goal */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex gap-8 items-center justify-center"
            >
              {[
                { label: 'Year 1 ARR Target', value: '$480K', color: '#0087f8' },
                { label: 'Year 2 ARR Target', value: '$2.8M', color: '#44c4f6' },
                { label: 'Year 3 ARR Target', value: '$12M+', color: '#44c4f6' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[var(--fg-muted)]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
