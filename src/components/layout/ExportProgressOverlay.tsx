import { AnimatePresence, motion } from 'framer-motion'

interface ExportProgress {
  current: number
  total: number
  label: string
}

interface Props {
  progress: ExportProgress | null
  visible: boolean
}

export default function ExportProgressOverlay({ progress, visible }: Props) {
  const pct = progress
    ? Math.max(5, Math.round((progress.current / progress.total) * 100))
    : 5

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(6, 8, 22, 0.90)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            style={{
              background: 'rgba(13, 18, 40, 0.92)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '1.25rem',
              padding: '2.5rem 2.75rem',
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '1.5rem',
              width: '21rem',
              maxWidth: 'calc(100vw - 3rem)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 80px rgba(0,135,248,0.08)',
            }}
          >
            {/* Animated ring + download icon */}
            <div style={{ position: 'relative', width: 68, height: 68 }}>
              <motion.svg
                style={{ position: 'absolute', inset: 0 }}
                width={68} height={68} viewBox="0 0 68 68"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <defs>
                  <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0087f8" />
                    <stop offset="100%" stopColor="#44c4f6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <circle
                  cx="34" cy="34" r="30"
                  fill="none"
                  stroke="url(#ring-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="140 50"
                />
              </motion.svg>
              {/* Static inner glow circle */}
              <div style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,135,248,0.18), rgba(68,196,246,0.12))',
                border: '1px solid rgba(0,135,248,0.30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Download arrow SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="icon-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0087f8" />
                      <stop offset="1" stopColor="#44c4f6" />
                    </linearGradient>
                  </defs>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="url(#icon-grad)" />
                  <polyline points="7 10 12 15 17 10" stroke="url(#icon-grad)" />
                  <line x1="12" y1="15" x2="12" y2="3" stroke="url(#icon-grad)" />
                </svg>
              </div>
            </div>

            {/* Headline + current action */}
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '0.35rem',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#e2e8f0',
                fontFamily: "'Sora', system-ui, sans-serif",
                letterSpacing: '-0.01em',
              }}>
                Exporting Deck PDF
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.80rem',
                color: '#7c8ea6',
                fontFamily: "'Sora', system-ui, sans-serif",
                minHeight: '1.1rem',
              }}>
                {progress ? progress.label : 'Preparing slides…'}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' as const, gap: '0.45rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.68rem',
                fontFamily: 'monospace',
                color: '#7c8ea6',
                letterSpacing: '0.02em',
              }}>
                <span>{progress ? `${progress.current} / ${progress.total}` : '— / 13'}</span>
                <span>{pct}%</span>
              </div>
              <div style={{
                height: 5,
                borderRadius: 9999,
                background: 'rgba(255,255,255,0.07)',
                overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 9999,
                    background: 'linear-gradient(90deg, #0087f8, #44c4f6)',
                    boxShadow: '0 0 8px rgba(0,135,248,0.6)',
                  }}
                  initial={{ width: '5%' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Footer note */}
            <p style={{
              margin: 0,
              fontSize: '0.70rem',
              color: 'rgba(124,142,166,0.65)',
              textAlign: 'center' as const,
              lineHeight: 1.65,
              fontFamily: "'Sora', system-ui, sans-serif",
            }}>
              Generating high-resolution PDF.<br />
              Your download will start automatically.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
