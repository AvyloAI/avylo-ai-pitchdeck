import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import AuroraBackground from './components/background/AuroraBackground'
import GridBackground from './components/background/GridBackground'
import ParticleField from './components/background/ParticleField'
import SpotlightCursor from './components/background/SpotlightCursor'
import LoadingScreen from './components/layout/LoadingScreen'
import Logo from './components/layout/Logo'
import Navigation from './components/layout/Navigation'
import ProgressBar from './components/layout/ProgressBar'
import ExportView from './ExportView'
import { usePresentation } from './hooks/usePresentation'
import { slideVariants } from './lib/animations'

import HeroCover from './slides/01-HeroCover'
import TheProblem from './slides/02-TheProblem'
import TheSolution from './slides/03-TheSolution'
import CategoryCreation from './slides/03b-CategoryCreation'
import ProductExperience from './slides/04-ProductExperience'
import MarketOpportunity from './slides/05-MarketOpportunity'
import WhyNow from './slides/06-WhyNow'
import BusinessModel from './slides/07-BusinessModel'
import CompetitiveAdvantage from './slides/08-CompetitiveAdvantage'
import GoToMarket from './slides/09-GoToMarket'
import Traction from './slides/10-Traction'
import Vision from './slides/11-Vision'
import FoundingTeam from './slides/12-Founder'
import TheAsk from './slides/13-TheAsk'

const SLIDE_COMPONENTS = [
  HeroCover,
  TheProblem,
  TheSolution,
  CategoryCreation,
  ProductExperience,
  MarketOpportunity,
  WhyNow,
  BusinessModel,
  CompetitiveAdvantage,
  GoToMarket,
  Traction,
  Vision,
  FoundingTeam,
  TheAsk,
]

/**
 * App — top-level router.
 *
 * When the URL contains ?export=true, renders ExportView (the Playwright
 * PDF surface). Otherwise renders the normal interactive presentation.
 * Routing is split into two components to satisfy React's Rules of Hooks —
 * hooks must not be called after a conditional return.
 */
export default function App() {
  const isExportMode = new URLSearchParams(window.location.search).get('export') === 'true'
  return isExportMode ? <ExportView /> : <PresentationApp />
}

// ─── Interactive presentation ─────────────────────────────────────────────────

function PresentationApp() {
  const [isLoading, setIsLoading] = useState(true)
  const state = usePresentation()

  const handleStartPresentation = useCallback(() => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      void document.documentElement.requestFullscreen().catch(() => undefined)
    }
    state.goNext()
  }, [state])

  const handleJumpToProduct = useCallback(() => {
    state.goTo(4)
  }, [state])

  const renderSlide = useCallback(
    (index: number, step: number, interactive = false) => {
      if (index === 0) {
        return (
          <HeroCover
            step={step}
            onStartPresentation={interactive ? handleStartPresentation : undefined}
            onJumpToProduct={interactive ? handleJumpToProduct : undefined}
          />
        )
      }

      const SlideComponent = SLIDE_COMPONENTS[index]
      return <SlideComponent step={step} />
    },
    [handleJumpToProduct, handleStartPresentation]
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

      {/* Persistent animated background layers */}
      <>
        <AuroraBackground />
        <GridBackground />
        <ParticleField />
        <SpotlightCursor />
      </>

      {/* Main presentation */}
      {!isLoading && (
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
            <div className="hidden md:block text-xs font-mono text-[var(--fg-muted)] tracking-widest uppercase">
              Investor Experience
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
    </>
  )
}
