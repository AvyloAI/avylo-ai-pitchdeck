import { useCallback, useEffect, useState } from 'react'
import { SLIDES } from '../lib/slides-data'

export interface PresentationState {
  slideIndex: number
  step: number
  totalSlides: number
  isFirst: boolean
  isLast: boolean
  goNext: () => void
  goPrev: () => void
  goTo: (index: number) => void
}

export function usePresentation(): PresentationState {
  const [slideIndex, setSlideIndex] = useState(0)
  const [step, setStep] = useState(0)

  const currentMaxSteps = SLIDES[slideIndex]?.steps ?? 0

  const goNext = useCallback(() => {
    if (step < currentMaxSteps) {
      setStep(s => s + 1)
    } else if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(i => i + 1)
      setStep(0)
    }
  }, [step, currentMaxSteps, slideIndex])

  const goPrev = useCallback(() => {
    if (step > 0) {
      setStep(s => s - 1)
    } else if (slideIndex > 0) {
      const prevIndex = slideIndex - 1
      setSlideIndex(prevIndex)
      setStep(SLIDES[prevIndex]?.steps ?? 0)
    }
  }, [step, slideIndex])

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      setSlideIndex(index)
      setStep(0)
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          goPrev()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  return {
    slideIndex,
    step,
    totalSlides: SLIDES.length,
    isFirst: slideIndex === 0 && step === 0,
    isLast: slideIndex === SLIDES.length - 1,
    goNext,
    goPrev,
    goTo,
  }
}
