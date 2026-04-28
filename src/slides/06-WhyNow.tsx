import { AnimatePresence, motion } from 'framer-motion'
import { DollarSign, Timer, TrendingUp, Zap } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const trends = [
  {
    icon: <TrendingUp size={22} />,
    title: 'The AI Explosion',
    stat: '10×',
    desc: 'Developer velocity has multiplied. The planning gap is widening, not closing.',
    color: '#0087f8',
  },
  {
    icon: <Zap size={22} />,
    title: 'Startup Acceleration',
    stat: '4M+',
    desc: 'New startups registered globally every year — each needing architecture guidance.',
    color: '#44c4f6',
  },
  {
    icon: <DollarSign size={22} />,
    title: 'Rising Dev Costs',
    stat: '$280K',
    desc: 'Average annual cost of a senior technical co-founder. Early teams cannot afford this.',
    color: '#44c4f6',
  },
  {
    icon: <Timer size={22} />,
    title: 'Faster MVP Pressure',
    stat: '3 Weeks',
    desc: 'Average accelerator expects working MVP. No time for manual architecture planning.',
    color: '#34d399',
  },
]

export default function WhyNow({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-6">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2">
          <motion.div variants={fadeUp}>
            <Badge variant="warning" size="md">Why Now</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">
            AI changed{' '}
            <GradientText variant="primary">building.</GradientText>{' '}
            It hasn't changed{' '}
            <GradientText variant="violet">planning</GradientText>
            {' '}— until now.
          </motion.h2>
        </motion.div>

        {/* Trend cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {trends.map((t, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.4 : 0 }}
                >
                  <GlassCard className="p-5 flex flex-col gap-3 h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}
                    >
                      {t.icon}
                    </div>
                    <div className="text-3xl font-extrabold" style={{ color: t.color }}>{t.stat}</div>
                    <div>
                      <p className="font-bold text-sm text-[var(--fg)] mb-1">{t.title}</p>
                      <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{t.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Comparison callout */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <GlassCard className="px-8 py-5 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center" variant="med" gradientBorder>
                <div>
                  <p className="text-xs text-[var(--fg-muted)] uppercase tracking-widest font-mono mb-1">Then</p>
                  <p className="text-xl font-bold text-[var(--fg)]">
                    Cursor{' '}<span className="text-[var(--fg-muted)]">changed</span>{' '}
                    <span className="text-[#0087f8]">coding</span>
                  </p>
                </div>
                <div className="text-3xl text-[var(--fg-muted)] hidden md:block">→</div>
                <div>
                  <p className="text-xs text-[var(--fg-muted)] uppercase tracking-widest font-mono mb-1">Now</p>
                  <p className="text-xl font-bold text-[var(--fg)]">
                    Avylo{' '}<span className="text-[var(--fg-muted)]">changes</span>{' '}
                    <GradientText variant="full">product architecture</GradientText>
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
