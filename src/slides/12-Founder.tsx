import { motion } from 'framer-motion'
import { Brain, Code2, GitBranch, Globe, Layers, Rocket } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import { fadeLeft, fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const strengths = [
  { icon: <Code2    size={14} />, label: 'Full-Stack Engineering',    color: '#0087f8' },
  { icon: <Brain    size={14} />, label: 'AI Systems Architecture',   color: '#44c4f6' },
  { icon: <Rocket   size={14} />, label: 'SaaS Product Builder',      color: '#44c4f6' },
  { icon: <Layers   size={14} />, label: 'Startup Ecosystem Builder', color: '#34d399' },
  { icon: <GitBranch size={14}/>, label: 'Technical Innovation',      color: '#fbbf24' },
  { icon: <Globe    size={14} />, label: 'Global Execution Mindset',  color: '#f87171' },
]

export default function Founder({ step: _step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col md:flex-row gap-10 items-center">

        {/* Left — identity */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 flex-1"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="neutral" size="md">The Founder</Badge>
          </motion.div>

          {/* Monogram */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-extrabold flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,135,248,0.2), rgba(68,196,246,0.1))',
                border: '1.5px solid rgba(0,135,248,0.4)',
                boxShadow: '0 0 40px rgba(0,135,248,0.2)',
                color: '#0087f8',
              }}
            >
              MH
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--fg)] leading-tight">
                Mohamed Habib Allah Bibani
              </h2>
              <p className="text-sm text-[var(--fg-muted)] mt-1 leading-relaxed">
                Software Engineer · AI Systems Builder · Startup Architect
              </p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-base leading-relaxed max-w-md">
            Builder of systems, not just software. Mohamed has deep expertise spanning full-stack engineering, 
            AI architecture, and SaaS product development. He designed and built Avylo AI from the ground up — 
            from product vision to working platform — driven by a singular belief: every founder deserves 
            access to world-class architectural intelligence.
          </motion.p>

          {/* Strengths */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
            {strengths.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Badge variant="neutral" size="md" className="flex items-center gap-1.5">
                  <span style={{ color: s.color }}>{s.icon}</span>
                  {s.label}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — highlights */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 w-full md:w-72 flex-shrink-0"
        >
          {[
            {
              title: 'Built from Zero',
              body: 'Designed the full product vision, architecture, and codebase independently — no team, no resources, just execution.',
              color: '#0087f8',
            },
            {
              title: 'Workshop Speaker',
              body: 'Delivered a 90-minute technical workshop to 40+ software engineers on AI-era architecture thinking.',
              color: '#44c4f6',
            },
            {
              title: 'Avylo Workspace',
              body: 'Built a complete multi-service AI platform: FastAPI, NestJS, Next.js, Prisma, Postgres — production-grade.',
              color: '#44c4f6',
            },
            {
              title: 'Operator Mindset',
              body: 'Thinks in systems, ships fast, and focuses on market signal over vanity metrics. Ready to scale.',
              color: '#34d399',
            },
          ].map((h, i) => (
            <motion.div key={i} variants={fadeLeft}>
              <GlassCard className="px-4 py-3.5 flex gap-3 items-start">
                <div
                  className="w-1 rounded-full flex-shrink-0 self-stretch"
                  style={{ background: h.color, minHeight: 32 }}
                />
                <div>
                  <p className="font-semibold text-sm text-[var(--fg)]">{h.title}</p>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed mt-0.5">{h.body}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
