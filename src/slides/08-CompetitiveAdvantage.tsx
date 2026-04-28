import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, X } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GradientText from '../components/ui/GradientText'
import { fadeUp, stagger } from '../lib/animations'

interface Props { step: number }

const competitors = ['ChatGPT', 'Notion', 'Miro', 'Lucidchart', 'Avylo AI']
const features = [
  'AI-generated architecture',
  'Full product blueprint',
  'System + data design',
  'Execution roadmap',
  'Team & stack advisor',
  'Startup-first workflow',
  'One unified platform',
]

type Mark = 'yes' | 'no' | 'partial'

const matrix: Mark[][] = [
  // ChatGPT, Notion, Miro, Lucidchart, Avylo
  ['partial', 'no',      'no',      'no',      'yes'],
  ['no',      'partial', 'no',      'no',      'yes'],
  ['no',      'no',      'partial', 'partial', 'yes'],
  ['no',      'partial', 'no',      'no',      'yes'],
  ['no',      'no',      'no',      'no',      'yes'],
  ['no',      'no',      'no',      'no',      'yes'],
  ['no',      'no',      'no',      'no',      'yes'],
]

function Mark({ type }: { type: Mark }) {
  if (type === 'yes')     return <Check  size={14} className="text-[#44c4f6]" />
  if (type === 'partial') return <Minus  size={14} className="text-[#fbbf24]" />
  return                         <X      size={14} className="text-[rgba(255,255,255,0.2)]" />
}

export default function CompetitiveAdvantage({ step }: Props) {
  return (
    <div className="slide-root">
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col gap-7">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}>
            <Badge variant="accent" size="md">Competitive Advantage</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            No competitor owns the{' '}
            <GradientText variant="full">strategic product intelligence layer.</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--fg-muted)] text-base max-w-xl">
            This is not feature competition. This is category ownership. Every tool solves a slice — Avylo owns the full infrastructure layer.
          </motion.p>
        </motion.div>

        {/* Matrix */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-xs text-[var(--fg-muted)] uppercase tracking-wider font-medium w-48">Feature</th>
                {competitors.map((c, i) => (
                  <th
                    key={c}
                    className={`py-3 px-4 text-center text-xs uppercase tracking-wider font-bold ${
                      i === 4
                        ? 'text-[#0087f8]'
                        : 'text-[var(--fg-muted)]'
                    }`}
                    style={i === 4 ? {
                      background: 'rgba(0,135,248,0.08)',
                      borderLeft: '1px solid rgba(0,135,248,0.2)',
                      borderRight: '1px solid rgba(0,135,248,0.2)',
                      borderTop: '1px solid rgba(0,135,248,0.2)',
                      borderRadius: '8px 8px 0 0',
                    } : {}}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, fi) => (
                <AnimatePresence key={fi}>
                  {step >= Math.floor(fi / 2) && (
                    <motion.tr
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: fi * 0.05 }}
                      className="group"
                    >
                      <td className="py-2.5 px-4 text-[var(--fg-muted)] text-xs font-medium border-b border-[rgba(255,255,255,0.04)]">
                        {f}
                      </td>
                      {matrix[fi].map((mark, ci) => (
                        <td
                          key={ci}
                          className="py-2.5 px-4 text-center border-b border-[rgba(255,255,255,0.04)]"
                          style={ci === 4 ? {
                            background: 'rgba(0,135,248,0.06)',
                            borderLeft: '1px solid rgba(0,135,248,0.15)',
                            borderRight: '1px solid rgba(0,135,248,0.15)',
                          } : {}}
                        >
                          <div className="flex items-center justify-center">
                            <Mark type={mark} />
                          </div>
                        </td>
                      ))}
                    </motion.tr>
                  )}
                </AnimatePresence>
              ))}
              {/* Bottom border for Avylo column */}
              <tr>
                <td />
                {competitors.map((_, i) => (
                  <td key={i} style={i === 4 ? {
                    borderLeft: '1px solid rgba(0,135,248,0.2)',
                    borderRight: '1px solid rgba(0,135,248,0.2)',
                    borderBottom: '1px solid rgba(0,135,248,0.2)',
                    borderRadius: '0 0 8px 8px',
                    height: 6,
                    background: 'rgba(0,135,248,0.04)',
                  } : {}} />
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
