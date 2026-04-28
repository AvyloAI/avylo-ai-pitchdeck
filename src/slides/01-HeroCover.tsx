import { motion } from 'framer-motion'
import { ArrowRight, FileDown, Play } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import { cinemaEntrance, fadeUp, lineDrawVariant, nodeExpand, stagger } from '../lib/animations'

interface Props {
  step: number
  onStartPresentation?: () => void
  onExportPdf?: () => void
  onJumpToProduct?: () => void
}

const nodes = [
  { id: 'idea',    x: 50,  y: 50,  r: 28, label: 'Idea',     color: '#0087f8', delay: 0.2  },
  { id: 'strategy',x: 175, y: 15,  r: 22, label: 'Strategy', color: '#44c4f6', delay: 0.4  },
  { id: 'arch',    x: 290, y: 50,  r: 22, label: 'Arch',     color: '#44c4f6', delay: 0.5  },
  { id: 'roadmap', x: 175, y: 85,  r: 18, label: 'Roadmap',  color: '#34d399', delay: 0.6  },
  { id: 'team',    x: 370, y: 15,  r: 16, label: 'Team',     color: '#fbbf24', delay: 0.7  },
  { id: 'stack',   x: 370, y: 85,  r: 16, label: 'Stack',    color: '#f87171', delay: 0.75 },
]

const edges = [
  { x1: 78,  y1: 50,  x2: 153, y2: 20  },
  { x1: 78,  y1: 50,  x2: 153, y2: 80  },
  { x1: 197, y1: 15,  x2: 268, y2: 45  },
  { x1: 197, y1: 85,  x2: 268, y2: 55  },
  { x1: 312, y1: 43,  x2: 354, y2: 22  },
  { x1: 312, y1: 57,  x2: 354, y2: 78  },
]

export default function HeroCover({
  step: _step,
  onStartPresentation,
  onExportPdf,
  onJumpToProduct,
}: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-5xl w-full px-4">

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <Badge variant="primary" size="md">Investor Presentation · 2026</Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={cinemaEntrance}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
        >
          From Idea to{' '}
          <GradientText variant="primary">Scalable System</GradientText>
          <br />
          Architecture{' '}
          <GradientText variant="violet">in Minutes</GradientText>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl leading-relaxed"
        >
          Avylo AI transforms raw startup concepts into complete product strategy,
          system architecture, and execution intelligence.
        </motion.p>

        {/* Node diagram */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <svg viewBox="0 0 420 100" className="w-full h-24">
            {/* Edges */}
            {edges.map((e, i) => (
              <motion.line
                key={i}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="rgba(0,135,248,0.25)"
                strokeWidth="1"
                variants={lineDrawVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 + i * 0.08 }}
              />
            ))}
            {/* Nodes */}
            {nodes.map((n) => (
              <motion.g
                key={n.id}
                variants={nodeExpand}
                initial="hidden"
                animate="visible"
                transition={{ delay: n.delay }}
              >
                <circle
                  cx={n.x} cy={n.y} r={n.r}
                  fill={`${n.color}18`}
                  stroke={n.color}
                  strokeWidth="1.5"
                />
                <text
                  x={n.x} y={n.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={n.color}
                  fontSize={n.r > 20 ? 8 : 7}
                  fontFamily="Sora, sans-serif"
                  fontWeight="600"
                >
                  {n.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          data-print-hidden
          className="flex flex-wrap items-center justify-center gap-3 mt-2"
        >
          <motion.div variants={fadeUp}>
            <Button
              variant="solid"
              size="lg"
              icon={<Play size={16} />}
              onClick={onStartPresentation}
            >
              Enter Presentation
            </Button>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight size={16} />}
              onClick={onJumpToProduct}
            >
              See Product Flow
            </Button>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button
              variant="ghost"
              size="lg"
              icon={<FileDown size={16} />}
              onClick={onExportPdf}
            >
              Export Deck PDF
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="text-xs tracking-widest text-[var(--fg-muted)] uppercase font-mono mt-2"
        >
          The Operating System for Product Creation
        </motion.p>
      </div>
    </div>
  )
}
