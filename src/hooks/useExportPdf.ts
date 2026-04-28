/**
 * useExportPdf — sequential slide-by-slide PDF export hook.
 *
 * Key design decisions:
 *  - Captures ONE slide at a time (no scroll tricks, no stacking).
 *  - Export container is always exactly 1280×720 so the PDF is always
 *    16:9 landscape regardless of the user's browser window size.
 *  - The parent must wrap the capture container in <MotionConfig reducedMotion="always">
 *    so all Framer Motion animations instantly resolve to their final state,
 *    eliminating blank/invisible slides caused by opacity: 0 initial values.
 *  - html2canvas windowWidth/windowHeight are set to 1280/720 so that
 *    CSS viewport units (100vw, 100vh) resolve correctly inside the container.
 */
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SLIDES } from '../lib/slides-data'

export interface ExportProgress {
  current: number
  total: number
  label: string
}

/** Fixed export dimensions — always 16:9 HD landscape */
export const EXPORT_W = 1280
export const EXPORT_H = 720

export function useExportPdf() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportSlideIndex, setExportSlideIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState<ExportProgress | null>(null)

  const pdfRef      = useRef<InstanceType<typeof jsPDF> | null>(null)
  const cancelledRef = useRef(false)

  // ─── Start ───────────────────────────────────────────────────────────────
  const startExport = useCallback(() => {
    cancelledRef.current = false
    pdfRef.current       = null
    setProgress({ current: 0, total: SLIDES.length, label: 'Preparing…' })
    setIsExporting(true)
    setExportSlideIndex(0)
  }, [])

  // ─── Cancel ──────────────────────────────────────────────────────────────
  const cancelExport = useCallback(() => {
    cancelledRef.current = true
    setIsExporting(false)
    setExportSlideIndex(null)
    setProgress(null)
    pdfRef.current = null
  }, [])

  // ─── Per-slide capture loop ───────────────────────────────────────────────
  useEffect(() => {
    if (!isExporting || exportSlideIndex === null) return

    let tid = 0

    const capture = async () => {
      if (cancelledRef.current) return

      const el = document.querySelector<HTMLElement>('[data-capture-slide]')
      if (!el) {
        console.error('[export] [data-capture-slide] not found')
        cancelExport()
        return
      }

      const slide = SLIDES[exportSlideIndex]
      setProgress({ current: exportSlideIndex + 1, total: SLIDES.length, label: slide.label })

      try {
        const canvas = await html2canvas(el, {
          // Capture at 2× for crisp Retina output in the PDF
          scale:       2,
          useCORS:     true,
          allowTaint:  true,
          logging:     false,
          imageTimeout: 0,
          // Dark background — matches the deck theme
          backgroundColor: '#060816',
          // Tell html2canvas the viewport is 1280×720 so CSS viewport units
          // (100vw, 100vh) resolve correctly inside the container.
          windowWidth:  EXPORT_W,
          windowHeight: EXPORT_H,
          // Let html2canvas auto-detect width/height from the element's
          // offsetWidth/offsetHeight (1280×720). Do NOT pass explicit
          // width/height here — it interacts badly with the scale option.
          scrollX: 0,
          scrollY: 0,
          // Disable foreignObject (more reliable cross-browser canvas rendering)
          foreignObjectRendering: false,
        })

        if (cancelledRef.current) return

        const imgData = canvas.toDataURL('image/jpeg', 0.93)

        if (!pdfRef.current) {
          // First page: create the PDF document in explicit landscape
          pdfRef.current = new jsPDF({
            orientation: 'landscape',
            unit:        'px',
            format:      [EXPORT_W, EXPORT_H],
            compress:    true,
          })
        } else {
          pdfRef.current.addPage([EXPORT_W, EXPORT_H], 'landscape')
        }

        pdfRef.current.addImage(imgData, 'JPEG', 0, 0, EXPORT_W, EXPORT_H)

        if (exportSlideIndex < SLIDES.length - 1) {
          // Advance to next slide
          setExportSlideIndex(i => i! + 1)
        } else {
          // All slides captured — save and clean up
          pdfRef.current.save('Avylo-AI-Investor-Deck.pdf')

          // Small pause at 100% so the user can see the completion state
          tid = window.setTimeout(() => {
            if (!cancelledRef.current) {
              setIsExporting(false)
              setExportSlideIndex(null)
              setProgress(null)
              pdfRef.current = null
            }
          }, 900)
        }
      } catch (err) {
        console.error('[export] html2canvas error on slide', exportSlideIndex, err)
        if (!cancelledRef.current) cancelExport()
      }
    }

    // Wait 5 animation frames + 200ms after React paints the slide.
    // This is generous enough to guarantee:
    //  a) React has committed + browser has painted the new slide component
    //  b) MotionConfig reducedMotion="always" instant-transitions have resolved
    //  c) Any CSS transitions (glass borders, etc.) have completed
    let raf1 = 0, raf2 = 0, raf3 = 0, raf4 = 0, raf5 = 0

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        raf3 = requestAnimationFrame(() => {
          raf4 = requestAnimationFrame(() => {
            raf5 = requestAnimationFrame(() => {
              tid = window.setTimeout(() => void capture(), 200)
            })
          })
        })
      })
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      cancelAnimationFrame(raf3)
      cancelAnimationFrame(raf4)
      cancelAnimationFrame(raf5)
      clearTimeout(tid)
    }
  }, [isExporting, exportSlideIndex, cancelExport])

  return { isExporting, exportSlideIndex, progress, startExport, cancelExport }
}
