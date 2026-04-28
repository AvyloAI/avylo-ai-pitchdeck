import { AnimatePresence, motion } from 'framer-motion'
import { Building, DollarSign, FlaskConical, Handshake, Mail } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import GradientText from '../components/ui/GradientText'
import { cinemaEntrance, fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const asks = [
  {
    icon: <DollarSign  size={24} />,
    title: 'Seed Funding',
    range: '$200K–$500K',
    desc: 'To accelerate product development, go-to-market, and hire the first 3 core team members.',
    color: '#0087f8',
  },
  {
    icon: <Handshake   size={24} />,
    title: 'Strategic Partners',
    range: 'Global Network',
    desc: 'Accelerators, VC firms, and innovation hubs who can open doors to startup ecosystems worldwide.',
    color: '#44c4f6',
  },
  {
    icon: <Building    size={24} />,
    title: 'Incubation',
    range: 'Program Access',
    desc: 'Structured incubation with mentorship, workspace, and infrastructure to accelerate to Series A readiness.',
    color: '#44c4f6',
  },
  {
    icon: <FlaskConical size={24}/>,
    title: 'Pilot Organizations',
    range: 'Beta Partners',
    desc: 'Universities, accelerators, and enterprise innovation labs willing to pilot Avylo with real cohorts.',
    color: '#34d399',
  },
]

export default function TheAsk({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col gap-9">

        {/* Hero headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Badge variant="accent" size="md">The Ask</Badge>
          </motion.div>
          <motion.h2
            variants={cinemaEntrance}
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl mx-auto"
          >
            Join us in building the{' '}
            <GradientText variant="full">infrastructure for the next generation</GradientText>{' '}
            of products.
          </motion.h2>
        </motion.div>

        {/* Ask cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {asks.map((a, i) => (
            <AnimatePresence key={i}>
              {step >= i && (
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i === 0 ? 0.3 : i * 0.08 }}
                >
                  <GlassCard
                    className="p-5 flex flex-col gap-3 h-full"
                    gradientBorder
                    glow="none"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}30` }}
                    >
                      {a.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--fg)]">{a.title}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: a.color }}>{a.range}</p>
                    </div>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{a.desc}</p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Contact + CTA */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="solid" size="lg" icon={<Mail size={16} />}>
                  Let's Talk
                </Button>
                <Button variant="ghost" size="lg">
                  contact@avyloai.com
                </Button>
              </div>
              <p className="text-xs text-[var(--fg-muted)] font-mono tracking-widest uppercase">
                avyloai.com · Building the future of product creation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
