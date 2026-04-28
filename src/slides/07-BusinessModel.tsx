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
    price: '$0',
    period: '/mo',
    desc: 'Exploration, learning, and early product validation',
    features: [
      '3 architecture generations/mo',
      'Product blueprint overview',
      'Database schema preview',
      'PDF export',
      'Community support',
    ],
    color: '#44c4f6',
    highlighted: false,
    stage: 'Explore',
  },
  {
    name: 'Builder',
    price: '$19',
    period: '/mo',
    desc: 'For founders building real products faster',
    features: [
      'Advanced generation capacity',
      'Full architecture pack',
      'MVP roadmap with sprints',
      'AI developer prompt packs',
      'Visual diagram export',
      'Email support',
    ],
    color: '#0087f8',
    highlighted: true,
    stage: 'Build',
  },
  {
    name: 'Team',
    price: '$59',
    period: '/mo',
    desc: 'For startup teams scaling execution together',
    features: [
      'Everything in Builder',
      'Up to 5 seats',
      'Shared architecture workspace',
      'Team prompt library & sync',
      'API access',
      'Priority support',
    ],
    color: '#34d399',
    highlighted: false,
    stage: 'Scale',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations building innovation infrastructure',
    features: [
      'Everything in Team',
      'Unlimited seats',
      'SSO & SAML authentication',
      'Custom AI model integrations',
      'Dedicated onboarding & CSM',
      'SLA + 24/7 priority support',
    ],
    color: '#fbbf24',
    highlighted: false,
    stage: 'Dominate',
  },
]

const futureExpansion = [
  { name: 'API Ecosystem',       desc: 'Pay-per-generation · Developer integrations', color: '#44c4f6' },
  { name: 'White-label',         desc: 'Resellers & SaaS platforms · Revenue share',  color: '#0087f8' },
  { name: 'Universities',        desc: 'Cohort licensing · Academic programs',         color: '#34d399' },
  { name: 'Institutional',       desc: 'Accelerators · Innovation labs · Bulk seats',  color: '#fbbf24' },
]

export default function BusinessModel({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-5">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2">
          <motion.div variants={fadeUp}>
            <Badge variant="success" size="md">Business Model</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-4xl">
            Scalable monetization from{' '}
            <GradientText variant="primary">solo founders to enterprise innovation.</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-sm max-w-2xl leading-relaxed">
            Avylo lands with founders, expands through teams, and scales into enterprise and institutional ecosystems.
          </motion.p>
        </motion.div>

        {/* SaaS adoption ladder indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1 px-1"
        >
          {plans.map((p, i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
              >
                <span className="opacity-60">0{i + 1}</span>
                {p.stage}
              </div>
              {i < plans.length - 1 && (
                <span className="text-[var(--fg-muted)] opacity-30 text-xs">→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Plans grid — 4 tiers */}
        <div className="grid grid-cols-4 gap-3">
          {plans.map((p, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.2 : i * 0.1 }}
                  className="h-full"
                >
                  <GlassCard
                    className={`p-4 flex flex-col gap-3 h-full ${p.highlighted ? 'glow-secondary' : ''}`}
                    gradientBorder={p.highlighted}
                    variant={p.highlighted ? 'med' : 'default'}
                  >
                    {p.highlighted && (
                      <Badge variant="primary" size="sm" className="self-start">Core Engine</Badge>
                    )}
                    <div>
                      <div className="flex items-baseline gap-0.5 mb-0.5">
                        <span className="text-xl font-extrabold" style={{ color: p.color }}>{p.price}</span>
                        <span className="text-[10px] text-[var(--fg-muted)]">{p.period}</span>
                      </div>
                      <p className="font-bold text-xs text-[var(--fg)]">{p.name}</p>
                      <p className="text-[10px] text-[var(--fg-muted)] leading-snug mt-0.5">{p.desc}</p>
                    </div>
                    <div className="h-px" style={{ background: `${p.color}20` }} />
                    <ul className="flex flex-col gap-1.5">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-[10px] text-[var(--fg-muted)]">
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

        {/* Future expansion channels */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] font-mono">
                Strategic expansion pathways
              </p>
              <div className="flex gap-2 flex-wrap">
                {futureExpansion.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px]"
                    style={{ background: `${c.color}08`, border: `1px solid ${c.color}18` }}
                  >
                    <span className="font-bold" style={{ color: c.color }}>{c.name}</span>
                    <span className="text-[var(--fg-muted)] opacity-70">{c.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

