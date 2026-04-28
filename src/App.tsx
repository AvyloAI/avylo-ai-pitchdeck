import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { useCallback, useState } from 'react'
import AuroraBackground from './components/background/AuroraBackground'
import GridBackground from './components/background/GridBackground'
import ParticleField from './components/background/ParticleField'
import SpotlightCursor from './components/background/SpotlightCursor'
import ExportProgressOverlay from './components/layout/ExportProgressOverlay'
import LoadingScreen from './components/layout/LoadingScreen'
import Logo from './components/layout/Logo'
import Navigation from './components/layout/Navigation'
import ProgressBar from './components/layout/ProgressBar'
import Button from './components/ui/Button'
import { usePresentation } from './hooks/usePresentation'
import { useExportPdf, EXPORT_W, EXPORT_H } from './hooks/useExportPdf'
import { slideVariants } from './lib/animations'
import { SLIDES } from './lib/slides-data'

import HeroCover from './slides/01-HeroCover'
import TheProblem from './slides/02-TheProblem'
import TheSolution from './slides/03-TheSolution'
import ProductExperience from './slides/04-ProductExperience'
import MarketOpportunity from './slides/05-MarketOpportunity'
import WhyNow from './slides/06-WhyNow'
import BusinessModel from './slides/07-BusinessModel'
import CompetitiveAdvantage from './slides/08-CompetitiveAdvantage'
import GoToMarket from './slides/09-GoToMarket'
import Traction from './slides/10-Traction'
import Vision from './slides/11-Vision'
import Founder from './slides/12-Founder'
import TheAsk from './slides/13-TheAsk'

const SLIDE_COMPONENTS = [
  HeroCover,
  TheProblem,
  TheSolution,
  ProductExperience,
  MarketOpportunity,
  WhyNow,
  BusinessModel,
  CompetitiveAdvantage,
  GoToMarket,
  Traction,
  Vision,
  Founder,
  TheAsk,
]

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const state = usePresentation()
  const {
    isExporting,
    exportSlideIndex,
    progress: exportProgress,
    startExport,
  } = useExportPdf()

  const handleExportPdf = useCallback(() => startExport(), [startExport])

  const handleStartPresentation = useCallback(() => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      void document.documentElement.requestFullscreen().catch(() => undefined)
    }
    state.goNext()
  }, [state])

  const handleJumpToProduct = useCallback(() => {
    state.goTo(3)
  }, [state])

  const renderSlide = useCallback(
    (index: number, step: number, interactive = false) => {
      if (index === 0) {
        return (
          <HeroCover
            step={step}
            onStartPresentation={interactive ? handleStartPresentation : undefined}
            onExportPdf={interactive ? handleExportPdf : undefined}
            onJumpToProduct={interactive ? handleJumpToProduct : undefined}
          />
        )
      }

      const SlideComponent = SLIDE_COMPONENTS[index]
      return <SlideComponent step={step} />
    },
    [handleExportPdf, handleJumpToProduct, handleStartPresentation]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, [data-no-nav]')) return
      if (e.clientX < window.innerWidth * 0.25) {
        state.goPrev()
      } else {
        state.goNext()
      }
    },
    [state]
  )

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Persistent background layers (always rendered for perf) */}
      {!isExporting && (
        <>
          <AuroraBackground />
          <GridBackground />
          <ParticleField />
          <SpotlightCursor />
        </>
      )}

      {/* Main presentation */}
      {!isLoading && !isExporting && (
        <div
          className="relative w-screen h-screen overflow-hidden"
          onClick={handleClick}
        >
          {/* Top bar */}
          <div
            data-logo-bar
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-5 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Logo height={26} />
            </div>
            <div className="pointer-events-auto flex items-center gap-3">
              <div className="hidden md:block text-xs font-mono text-[var(--fg-muted)] tracking-widest uppercase">
                Investor Experience
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<FileDown size={14} />}
                onClick={handleExportPdf}
              >
                Export Deck PDF
              </Button>
            </div>
          </div>

          <ProgressBar slideIndex={state.slideIndex} totalSlides={state.totalSlides} />

          {/* Slide viewport */}
          <AnimatePresence mode="wait">
            <motion.div
              key={state.slideIndex}
              variants={slideVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 10,
              }}
            >
              <div data-slide>
                {renderSlide(state.slideIndex, state.step, true)}
              </div>
            </motion.div>
          </AnimatePresence>

          <Navigation
            slideIndex={state.slideIndex}
            totalSlides={state.totalSlides}
            goTo={state.goTo}
            goPrev={state.goPrev}
            goNext={state.goNext}
          />
        </div>
      )}

      {/* ── Export capture container — single slide at a time ─────────── */}
      {/*
        Renders ONE slide at EXPORT_W×EXPORT_H (1280×720). This ensures:
        - Always 16:9 landscape regardless of browser window size.
        - MotionConfig reducedMotion="always" makes all Framer Motion
          animations skip instantly to their final values, so html2canvas
          always captures a fully painted frame — no more blank slides.
        - windowWidth/windowHeight passed to html2canvas match the container
          so CSS viewport units resolve correctly.
      */}
      {!isLoading && isExporting && exportSlideIndex !== null && (
        <MotionConfig reducedMotion="always">
          <div
            data-capture-slide
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: EXPORT_W,
              height: EXPORT_H,
              overflow: 'hidden',
              // z-index 50 sits BEHIND the progress overlay (z-300).
              // The user only sees the overlay. We do NOT apply any
              // CSS transform here — transform: scale() corrupts what
              // html2canvas reads via getBoundingClientRect(), causing
              // wrong capture dimensions and blank/clipped slides.
              zIndex: 50,
              background: [
                'radial-gradient(ellipse 80% 60% at 18% 0%, rgba(0,135,248,0.20) 0%, transparent 62%)',
                'radial-gradient(ellipse 55% 45% at 82% 105%, rgba(68,196,246,0.13) 0%, transparent 55%)',
                '#060816',
              ].join(', '),
            }}
          >
            {/* Baked-in dot grid (html2canvas can't capture canvas animations) */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
                backgroundSize: '40px 40px',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Slide content — padded to match presentation view */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              {renderSlide(exportSlideIndex, SLIDES[exportSlideIndex].steps, false)}
            </div>
          </div>
        </MotionConfig>
      )}

      {/* ── Export progress overlay ───────────────────────────────────── */}
      <ExportProgressOverlay
        progress={exportProgress}
        visible={isExporting}
      />
    </>
  )
}
