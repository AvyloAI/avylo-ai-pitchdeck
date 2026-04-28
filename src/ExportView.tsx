/**
 * ExportView — Playwright-native PDF export rendering surface.
 *
 * Renders all 13 slides stacked vertically, each at exactly 1280×720 px,
 * with page-break-after: always so Playwright's page.pdf() produces a
 * correctly paginated 16:9 PDF with one slide per page.
 *
 * Key design principles:
 *  - MotionConfig reducedMotion="always" instantly resolves all Framer Motion
 *    animations to their final state — no blank slides, no invisible elements.
 *  - Every slide receives its maximum step value so all content is fully revealed.
 *  - Baked-in gradient background matches the live presentation visually.
 *  - No canvas animations, no WebGL — only static CSS that Chromium renders natively.
 *  - Chromium renders gradient-text, backdrop-filter, CSS masks, and border-radius
 *    all natively — zero workarounds needed unlike html2canvas.
 */
import { MotionConfig } from 'framer-motion'
import type { ComponentType } from 'react'
import { useEffect } from 'react'

import { SLIDES } from './lib/slides-data'

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
import Founder from './slides/12-Founder'
import TheAsk from './slides/13-TheAsk'

/** Minimal interface every slide satisfies */
type SlideProps = { step: number }

/**
 * Ordered list of slide components — must stay in sync with SLIDES in slides-data.ts.
 * HeroCover is cast to the common interface because its extra props (onStartPresentation
 * etc.) are all optional and are intentionally omitted in export mode.
 */
const SLIDE_COMPONENTS: ComponentType<SlideProps>[] = [
  HeroCover as ComponentType<SlideProps>,
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
  Founder,
  TheAsk,
]

export default function ExportView() {
  // Unlock document scroll and enable export-mode CSS rules for print layout.
  useEffect(() => {
    document.body.classList.add('export-mode')
    document.documentElement.classList.add('export-mode')
    // Override the global overflow:hidden set on html/body/root so all slide
    // pages are reachable in the DOM and Playwright can read the full document.
    document.body.style.width = '1280px'
    document.body.style.height = 'auto'
    document.body.style.overflow = 'visible'
    document.documentElement.style.width = '1280px'
    document.documentElement.style.height = 'auto'
    document.documentElement.style.overflow = 'visible'
    const root = document.getElementById('root')
    if (root) {
      root.style.width = '1280px'
      root.style.height = 'auto'
      root.style.overflow = 'visible'
    }
    return () => {
      document.body.classList.remove('export-mode')
      document.documentElement.classList.remove('export-mode')
      document.body.style.cssText = ''
      document.documentElement.style.cssText = ''
      if (root) root.style.cssText = ''
    }
  }, [])

  return (
    // reducedMotion="always" skips all Framer Motion initial/animate transitions
    // and immediately applies final keyframe values — every element is fully visible.
    <MotionConfig reducedMotion="always">
      <div id="export-deck">
        {SLIDES.map((slide, index) => {
          const SlideComp = SLIDE_COMPONENTS[index]
          // Pass the slide's maximum step count so all progressive reveals are shown.
          const finalStep = slide.steps

          return (
            <div
              key={slide.id}
              className="export-page"
              data-slide-index={index}
              data-slide-label={slide.label}
            >
              {/* ── Ambient gradient background ─────────────────────────────
                  Matches the live presentation's radial gradient palette.
                  Rendered as CSS — Chromium handles it natively and perfectly.
              */}
              <div className="export-bg" aria-hidden="true" />

              {/* ── Dot grid overlay ─────────────────────────────────────── */}
              <div className="export-grid" aria-hidden="true" />

              {/* ── Slide content ────────────────────────────────────────── */}
              <div className="export-content">
                <SlideComp step={finalStep} />
              </div>
            </div>
          )
        })}
      </div>
    </MotionConfig>
  )
}
