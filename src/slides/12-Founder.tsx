import { motion } from 'framer-motion'
import { Brain, Code2, Globe, Layers, Rocket, Server, Zap } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GlassCard from '../components/ui/GlassCard'
import { fadeLeft, fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const coFounders = [
  {
    initials: 'MH',
    name: 'Mohamed Habib Allah Bibani',
    role: 'Co-Founder & CEO',
    focus: 'Vision · Product · GTM · Category Definition',
    color: '#0087f8',
    bio: 'Designed and built Avylo AI end-to-end — from category thesis to working platform. Drives product strategy, go-to-market, and ecosystem partnerships.',
    strengths: [
      { icon: <Code2    size={13} />, label: 'Full-Stack Engineering'    },
      { icon: <Brain    size={13} />, label: 'AI Systems Architecture'  },
      { icon: <Rocket   size={13} />, label: 'SaaS Product Builder'      },
      { icon: <Globe    size={13} />, label: 'Global Execution Mindset'  },
    ],
    highlights: [
      { title: 'Built from Zero', body: 'Designed the full product vision, architecture, and codebase independently — from concept to production platform.' },
      { title: 'Workshop Speaker', body: 'Delivered a 90-minute technical deep-dive to 40+ engineers on AI-era architecture thinking.' },
      { title: 'Operator First', body: 'Thinks in systems, ships fast, focuses on market signal. Category-defining mindset from day one.' },
    ],
  },
  {
    initials: 'FF',
    name: 'Fares Frini',
    role: 'Co-Founder & CTO',
    focus: 'Platform Engineering · AI Infrastructure · Technical Scale',
    color: '#44c4f6',
    bio: 'Owns the technical infrastructure of Avylo. Leads AI system design, platform engineering, and scalable product execution — production-grade from day one.',
    strengths: [
      { icon: <Server   size={13} />, label: 'Platform Engineering'      },
      { icon: <Brain    size={13} />, label: 'AI System Design'          },
      { icon: <Layers   size={13} />, label: 'Technical Architecture'    },
      { icon: <Zap      size={13} />, label: 'Engineering Velocity'      },
    ],
    highlights: [
      { title: 'Multi-Service Architecture', body: 'Designed and owns the full stack: FastAPI, NestJS, Next.js, Prisma, Postgres — production-grade from day one.' },
      { title: 'AI Pipeline Builder', body: 'Built the core AI generation pipeline powering Avylo\'s real-time intelligence engine.' },
      { title: 'Precision Execution', body: 'Turns complex system requirements into clean, scalable implementation at speed.' },
    ],
  },
]

export default function FoundingTeam({ step: _step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col gap-8">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2">
          <motion.div variants={fadeUp}>
            <Badge variant="neutral" size="md">The Founding Team</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Built by founders who've lived the problem.
          </motion.h2>
        </motion.div>

        {/* Two-column team layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coFounders.map((founder, fi) => (
            <motion.div
              key={fi}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: fi * 0.15 }}
              className="flex flex-col gap-4"
            >
              {/* Identity */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${founder.color}28, ${founder.color}10)`,
                    border: `1.5px solid ${founder.color}45`,
                    boxShadow: `0 0 30px ${founder.color}20`,
                    color: founder.color,
                  }}
                >
                  {founder.initials}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[var(--fg)] leading-tight">{founder.name}</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: founder.color }}>{founder.role}</p>
                  <p className="text-[11px] text-[var(--fg-muted)] mt-0.5 leading-snug">{founder.focus}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">{founder.bio}</p>

              {/* Strengths */}
              <div className="flex flex-wrap gap-1.5">
                {founder.strengths.map((s, i) => (
                  <Badge key={i} variant="neutral" size="sm" className="flex items-center gap-1">
                    <span style={{ color: founder.color }}>{s.icon}</span>
                    {s.label}
                  </Badge>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-2">
                {founder.highlights.map((h, i) => (
                  <motion.div key={i} variants={fadeLeft}>
                    <GlassCard className="px-4 py-3 flex gap-3 items-start">
                      <div
                        className="w-1 rounded-full flex-shrink-0 self-stretch"
                        style={{ background: founder.color, minHeight: 28 }}
                      />
                      <div>
                        <p className="font-semibold text-xs text-[var(--fg)]">{h.title}</p>
                        <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed mt-0.5">{h.body}</p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
