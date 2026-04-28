import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo'

interface LoadingScreenProps {
  onComplete: () => void
}

type Phase = 'logo' | 'tagline' | 'progress' | 'exit'

const PHASES: { phase: Phase; duration: number }[] = [
  { phase: 'logo',     duration: 900  },
  { phase: 'tagline',  duration: 1800 },
  { phase: 'progress', duration: 800  },
  { phase: 'exit',     duration: 700  },
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>('logo')
  const [taglineText, setTaglineText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const TAGLINE = 'Architecting the Future...'

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    timeout = setTimeout(() => {
      setPhase('tagline')
      // Typewriter effect
      let i = 0
      const type = () => {
        if (i <= TAGLINE.length) {
          setTaglineText(TAGLINE.slice(0, i))
          i++
          setTimeout(type, 55)
        } else {
          setTimeout(() => {
            setShowCursor(false)
            setPhase('progress')
            setTimeout(() => {
              setPhase('exit')
              setTimeout(onComplete, 700)
            }, PHASES[2].duration)
          }, 300)
        }
      }
      type()
    }, PHASES[0].duration)

    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: [0.4, 0, 1, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--bg)' }}
          data-loading
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(600px circle at 50% 50%, rgba(0,135,248,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo height={40} />
          </motion.div>

          {/* Tagline */}
          <AnimatePresence>
            {(phase === 'tagline' || phase === 'progress') && (
              <motion.p
                key="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-sm tracking-widest text-[var(--fg-muted)]"
              >
                {taglineText}
                {showCursor && <span className="cursor-blink" />}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <AnimatePresence>
            {phase === 'progress' && (
              <motion.div
                key="bar"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-64 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', transformOrigin: 'left' }}
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, #0087f8, #44c4f6)',
                    boxShadow: '0 0 10px rgba(0,135,248,0.7)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
