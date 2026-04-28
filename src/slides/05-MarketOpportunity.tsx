import { AnimatePresence, motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const segments = [
  { label: 'Independent Founders',     share: '38%', color: '#0087f8' },
  { label: 'SaaS Builder Communities', share: '22%', color: '#44c4f6' },
  { label: 'Startup Accelerators',     share: '15%', color: '#44c4f6' },
  { label: 'Universities & Labs',      share: '14%', color: '#34d399' },
  { label: 'Enterprise Innovation',    share: '11%', color: '#fbbf24' },
]

const rings = [
  { label: 'TAM', value: '$124B', subtitle: 'AI Dev Tools + Strategy Software', r: 140, color: '#0087f8', opacity: 0.12 },
  { label: 'SAM', value: '$18B',  subtitle: 'Product Architecture Tools',       r: 100, color: '#44c4f6', opacity: 0.18 },
  { label: 'SOM', value: '$2.4B', subtitle: 'AI-Native Blueprint Platforms',    r:  60, color: '#44c4f6', opacity: 0.28 },
]

export default function MarketOpportunity({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" size="md">Market Opportunity</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            A new{' '}
            <GradientText variant="primary">foundational software category</GradientText>{' '}
            is emerging.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-lg max-w-xl">
            AI Product Infrastructure — the operating layer between idea generation and code execution.
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">

          {/* Concentric rings SVG */}
          <div className="flex-shrink-0 relative w-[320px] h-[320px]">
            <svg viewBox="0 0 320 320" className="w-full h-full">
              {rings.map((ring, i) => (
                <AnimatePresence key={ring.label}>
                  {step >= i && (
                    <motion.g>
                      <motion.circle
                        cx={160} cy={160} r={ring.r}
                        fill={`rgba(${ring.color === '#0087f8' ? '0,135,248' : '68,196,246'}, ${ring.opacity})`}
                        stroke={ring.color}
                        strokeWidth="1.5"
                        strokeDasharray="320"
                        initial={{ strokeDashoffset: 320, opacity: 0 }}
                        animate={{ strokeDashoffset: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      />
                      <motion.text
                        x={160}
                        y={160 - ring.r + 16}
                        textAnchor="middle"
                        fill={ring.color}
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="Sora, sans-serif"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {ring.label}
                      </motion.text>
                    </motion.g>
                  )}
                </AnimatePresence>
              ))}
              {/* Center label */}
              <text x={160} y={155} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Sora, sans-serif">AI Product</text>
              <text x={160} y={167} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Sora, sans-serif">Infrastructure</text>
            </svg>
          </div>

          {/* Stats + segments */}
          <div className="flex-1 flex flex-col gap-4">
            {/* TAM/SAM/SOM numbers */}
            <div className="flex gap-4">
              {rings.map((r, i) => (
                <AnimatePresence key={r.label}>
                  {step >= i && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col"
                    >
                      <span className="text-2xl font-extrabold" style={{ color: r.color }}>{r.value}</span>
                      <span className="text-xs text-[var(--fg-muted)] font-bold">{r.label}</span>
                      <span className="text-[10px] text-[var(--fg-muted)]">{r.subtitle}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Segments */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-2"
                >
                  <p className="text-sm font-semibold text-[var(--fg-muted)] mb-1 uppercase tracking-wider text-xs">Customer Segments</p>
                  {segments.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: s.share }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
                          className="h-full rounded-full"
                          style={{ background: s.color }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[var(--fg)] w-10 text-right">{s.share}</span>
                      <span className="text-xs text-[var(--fg-muted)]">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Source credibility footer */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="text-[10px] text-[var(--fg-muted)] font-mono opacity-60"
        >
          Market estimates derived from AI software, startup tooling, and enterprise architecture segments. Projections are directional.
        </motion.p>
      </div>
    </div>
  )
}
