/**
 * exportPdf.ts
 * Pixel-accurate PDF export using html2canvas + jsPDF.
 * Captures each slide at 2× resolution → crisp at any zoom.
 */
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export interface ExportProgress {
  current: number
  total: number
  label: string
}

const CAPTURE_SCALE = 2   // 2× = Retina quality in the PDF
const JPEG_QUALITY   = 0.93

/** Wait `n` animation frames so React + browser have time to paint */
async function waitFrames(n: number): Promise<void> {
  for (let i = 0; i < n; i++) {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  }
}

export async function exportDeckToPdf(
  onProgress: (p: ExportProgress) => void,
  signal: AbortSignal,
): Promise<void> {
  const rootEl = document.querySelector<HTMLElement>('[data-export-root]')
  if (!rootEl) throw new Error('Export container not found in DOM')

  const slideEls = Array.from(
    rootEl.querySelectorAll<HTMLElement>('[data-export-slide]'),
  )
  if (!slideEls.length) throw new Error('No [data-export-slide] elements found')

  const total  = slideEls.length
  const pageW  = window.innerWidth
  const pageH  = window.innerHeight

  // First page is added on construction; subsequent pages via addPage()
  const pdf = new jsPDF({
    unit:     'px',
    format:   [pageW, pageH],
    compress: true,
  })

  for (let i = 0; i < total; i++) {
    if (signal.aborted) return

    const el    = slideEls[i]
    const label = el.dataset.slideLabel ?? `Slide ${i + 1}`
    onProgress({ current: i + 1, total, label })

    // Scroll this slide to viewport top for accurate element-level capture
    rootEl.scrollTop = i * pageH
    await waitFrames(4)   // paint + any CSS transitions
    if (signal.aborted) return

    const canvas = await html2canvas(el, {
      scale:       CAPTURE_SCALE,
      useCORS:     true,
      allowTaint:  true,
      backgroundColor: '#060816',
      logging:     false,
      imageTimeout: 0,
      // Lock html2canvas to the window dimensions so it doesn't try
      // to expand to document scroll height
      windowWidth:  pageW,
      windowHeight: pageH,
      width:        pageW,
      height:       pageH,
    })

    const img = canvas.toDataURL('image/jpeg', JPEG_QUALITY)

    if (i > 0) pdf.addPage([pageW, pageH])
    // Fill page exactly — jsPDF 'px' unit maps 1:1 to the page dimensions
    pdf.addImage(img, 'JPEG', 0, 0, pageW, pageH)
  }

  if (!signal.aborted) {
    pdf.save('Avylo-AI-Investor-Deck.pdf')
  }
}
