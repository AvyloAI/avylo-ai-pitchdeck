import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import GradientText from '../components/ui/GradientText'
import { cinemaEntrance, fadeUp } from '../lib/animations'

interface Props {
  step: number
  onStartPresentation?: () => void
  onJumpToProduct?: () => void
}

// Each stage: three-ring concentric system — outer ring, inner ring, center dot
// Ring sizes grow toward Architecture (the apex) then recede, creating a natural focal peak
const STAGES = [
  {
    id: 'idea',
    label: 'IDEA',
    x: 68,
    rOuter: 11,  rInner: 6.5, rDot: 2.5,
    stroke:    'rgba(255,255,255,0.18)',
    innerFill: 'rgba(255,255,255,0.04)',
    dotFill:   'rgba(255,255,255,0.5)',
    textColor: 'rgba(255,255,255,0.22)',
    delay: 0.60,
  },
  {
    id: 'strategy',
    label: 'STRATEGY',
    x: 200,
    rOuter: 14,  rInner: 8,   rDot: 3,
    stroke:    'rgba(68,196,246,0.4)',
    innerFill: 'rgba(68,196,246,0.07)',
    dotFill:   'rgba(68,196,246,0.85)',
    textColor: 'rgba(68,196,246,0.42)',
    delay: 0.73,
  },
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    x: 335,
    rOuter: 21,  rInner: 12,  rDot: 4.5,
    stroke:    'rgba(0,135,248,0.65)',
    innerFill: 'rgba(0,135,248,0.1)',
    dotFill:   '#0087f8',
    textColor: '#44c4f6',
    delay: 0.86,
    highlight: true,
  },
  {
    id: 'execution',
    label: 'EXECUTION',
    x: 452,
    rOuter: 10,  rInner: 6,   rDot: 2.5,
    stroke:    'rgba(52,211,153,0.38)',
    innerFill: 'rgba(52,211,153,0.06)',
    dotFill:   'rgba(52,211,153,0.7)',
    textColor: 'rgba(52,211,153,0.38)',
    delay: 0.99,
  },
]

export default function HeroCover({
  step: _step,
  onStartPresentation,
  onJumpToProduct,
}: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-5xl w-full px-4">

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <Badge variant="primary" size="md">Seed Round · 2026</Badge>
        </motion.div>

        {/* Headline — three lines for maximum dramatic hierarchy */}
        <motion.h1
          variants={cinemaEntrance}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight"
        >
          Every Startup Begins
          <br />
          <GradientText variant="primary">With Architecture.</GradientText>
          <br />
          <GradientText variant="violet">Avylo Makes It Instant.</GradientText>
        </motion.h1>

        {/* Subheadline — tightened */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed"
        >
          Avylo AI transforms startup concepts into strategic blueprints,
          system architecture, and execution intelligence.
        </motion.p>

        {/* ── Premium evolution pathway visual ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.7 }}
          className="w-full max-w-xl mx-auto my-4"
        >
          <svg viewBox="0 0 520 72" fill="none" className="w-full" style={{ height: 72 }}>
            <defs>
              {/* Gradient track: transparent → blue peak at Architecture → fades out */}
              <linearGradient id="hTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0)"   />
                <stop offset="12%"  stopColor="rgba(255,255,255,0.06)" />
                <stop offset="38%"  stopColor="rgba(68,196,246,0.25)"  />
                <stop offset="63%"  stopColor="rgba(0,135,248,0.48)"   />
                <stop offset="84%"  stopColor="rgba(52,211,153,0.15)"  />
                <stop offset="100%" stopColor="rgba(52,211,153,0)"     />
              </linearGradient>
              {/* Radial halo behind Architecture apex */}
              <radialGradient id="hHalo" cx="335" cy="30" r="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(0,135,248,0.32)" />
                <stop offset="55%"  stopColor="rgba(0,135,248,0.07)" />
                <stop offset="100%" stopColor="rgba(0,135,248,0)"    />
              </radialGradient>
              {/* Glow filter for Architecture center dot */}
              <filter id="hGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Soft blur for halo */}
              <filter id="hBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>

            {/* Architecture ambient halo — renders behind everything */}
            <motion.circle
              cx={335} cy={30} r={52}
              fill="url(#hHalo)"
              filter="url(#hBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1.1 }}
            />

            {/* Gradient track line */}
            <motion.line
              x1={68} y1={30} x2={452} y2={30}
              stroke="url(#hTrack)"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.56, duration: 0.9 }}
            />

            {/* Stage nodes — three-ring concentric system */}
            {STAGES.map((s) => (
              <motion.g
                key={s.id}
                style={{ transformOrigin: `${s.x}px 30px` }}
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: s.delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Outer ring — very faint, gives depth */}
                <circle
                  cx={s.x} cy={30} r={s.rOuter}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth={0.7}
                />
                {/* Inner ring — semi-transparent fill, visible border */}
                <circle
                  cx={s.x} cy={30} r={s.rInner}
                  fill={s.innerFill}
                  stroke={s.stroke}
                  strokeWidth={0.5}
                />
                {/* Center dot — solid, the visual anchor */}
                <circle
                  cx={s.x} cy={30} r={s.rDot}
                  fill={s.dotFill}
                  filter={'highlight' in s && s.highlight ? 'url(#hGlow)' : undefined}
                />
              </motion.g>
            ))}

            {/* Architecture pulse ring — slow breathing, signals the active state */}
            <motion.circle
              cx={335} cy={30} r={21}
              fill="none"
              stroke="rgba(0,135,248,0.4)"
              strokeWidth={0.75}
              style={{ transformOrigin: '335px 30px' }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ delay: 1.45, duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* Stage labels */}
            {STAGES.map((s) => (
              <motion.text
                key={s.id + '-lbl'}
                x={s.x} y={59}
                textAnchor="middle"
                fill={s.textColor}
                fontSize="6.5"
                style={{
                  fontFamily: 'Sora, ui-monospace, sans-serif',
                  fontWeight: 'highlight' in s && s.highlight ? 700 : 500,
                  letterSpacing: '0.14em',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: s.delay + 0.18, duration: 0.4 }}
              >
                {s.label}
              </motion.text>
            ))}
          </svg>
        </motion.div>
        {/* ─────────────────────────────────────────────────────────────────── */}

        {/* Founding team — with label + more air between entries */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.88 }}
          className="flex flex-col items-center gap-2.5"
        >
          <p className="text-[9px] tracking-[0.22em] text-[var(--fg-muted)] uppercase font-mono" style={{ opacity: 0.45 }}>
            Founding Team
          </p>
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-extrabold flex-shrink-0"
                style={{ background: 'rgba(0,135,248,0.18)', border: '1px solid rgba(0,135,248,0.35)', color: '#0087f8' }}
              >
                MH
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-[var(--fg)] leading-none">Mohamed Habib Allah Bibani</p>
                <p className="text-[10px] text-[var(--fg-muted)] leading-none mt-0.5">Co-Founder &amp; CEO</p>
              </div>
            </div>
            <div className="w-px h-8 bg-[rgba(255,255,255,0.09)]" />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-extrabold flex-shrink-0"
                style={{ background: 'rgba(68,196,246,0.18)', border: '1px solid rgba(68,196,246,0.35)', color: '#44c4f6' }}
              >
                FF
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-[var(--fg)] leading-none">Fares Frini</p>
                <p className="text-[10px] text-[var(--fg-muted)] leading-none mt-0.5">Co-Founder &amp; CTO</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.98 }}
          className="mt-6 text-[10px] tracking-[0.3em] font-mono font-medium"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 opacity-80 uppercase">
            AI Product Infrastructure
          </span>
        </motion.div>
      </div>
    </div>
  )
}