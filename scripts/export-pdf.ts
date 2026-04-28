/**
 * export-pdf.ts — Playwright PDF Export Pipeline
 *
 * Produces an investor-grade PDF of the Avylo AI pitch deck by rendering
 * the deck in a real Chromium browser via Playwright's native print engine.
 *
 * OPTIMIZATIONS FOR SMALLER FILE SIZE:
 *  - Simplified export backgrounds (solid color instead of gradients)
 *    reduces file bloat while maintaining professional appearance
 *
 * WHY THIS IS SUPERIOR TO html2canvas + jsPDF:
 *  - Native browser rendering: gradients, backdrop-filter, CSS masks,
 *    border-radius, gradient-text (-webkit-background-clip) all render
 *    perfectly with zero workarounds.
 *  - True vector PDF output — no JPEG rasterization, no 2× scale hacks.
 *    Text is fully searchable and infinitely scalable in the PDF.
 *  - No onclone hacks, no layout compensation, no fragile selectors.
 *  - Pixel-accurate layout: what you see in the browser is what you get.
 *
 * USAGE:
 *   pnpm export:pdf
 *
 * OUTPUT:
 *   Avylo-AI-Investor-Deck.pdf  (in project root)
 *
 * PREREQUISITES:
 *   pnpm install           — installs playwright
 *   pnpm playwright install chromium  — downloads Chromium binary (once)
 *
 * ENVIRONMENT:
 *   EXPORT_URL   Override the target URL (e.g. for a deployed build).
 *                Defaults to http://localhost:5177/?export=true
 *   EXPORT_PORT  Override the dev-server port. Defaults to 5177.
 *   OUTPUT_PATH  Override the output PDF path. Defaults to project root.
 */

import { spawn, type ChildProcess } from 'child_process'
import { statSync } from 'fs'
import { createServer } from 'net'
import { dirname, resolve } from 'path'
import { chromium } from 'playwright'
import { fileURLToPath } from 'url'

// ─── Paths ───────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const ROOT       = resolve(__dirname, '..')

// ─── Config (override via env vars) ──────────────────────────────────────────
const PORT       = Number(process.env.EXPORT_PORT ?? 5177)
const BASE_URL   = process.env.EXPORT_URL ?? `http://localhost:${PORT}`
const EXPORT_URL = BASE_URL.includes('?') ? `${BASE_URL}&export=true` : `${BASE_URL}/?export=true`
const OUTPUT_PDF = process.env.OUTPUT_PATH ?? resolve(ROOT, 'Avylo-AI-Investor-Deck.pdf')

// ─── Slide dimensions (must match ExportView.tsx + CSS) ──────────────────────
const SLIDE_W = 1280
const SLIDE_H = 720

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if the given TCP port is not yet bound. */
function isPortFree(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const probe = createServer()
    probe.once('error', () => resolve(false))
    probe.once('listening', () => {
      probe.close()
      resolve(true)
    })
    probe.listen(port, '127.0.0.1')
  })
}

/**
 * Polls the target URL until the server responds with a non-5xx status,
 * or throws once the timeout is exceeded.
 */
async function waitForServer(url: string, timeoutMs = 45_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  let lastError: unknown

  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3_000) })
      if (res.status < 500) return
    } catch (err) {
      lastError = err
    }
    await new Promise(r => setTimeout(r, 500))
  }

  throw new Error(
    `Server at ${url} did not become available within ${timeoutMs}ms. ` +
    `Last error: ${lastError}`,
  )
}

/** Format file size for human-readable output */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  let devServer: ChildProcess | null = null
  let browser = null

  try {
    // ── 1. Start dev server if the port is free ───────────────────────────
    if (await isPortFree(PORT)) {
      console.log(`[export] Starting Vite dev server on port ${PORT}…`)

      devServer = spawn('pnpm', ['vite', '--port', String(PORT), '--host', '127.0.0.1'], {
        cwd:      ROOT,
        stdio:    ['ignore', 'pipe', 'pipe'],
        detached: false,
      })

      devServer.stdout?.on('data', (chunk: Buffer) =>
        process.stdout.write(`[vite]  ${chunk}`),
      )
      devServer.stderr?.on('data', (chunk: Buffer) =>
        process.stderr.write(`[vite]  ${chunk}`),
      )

      devServer.once('exit', code => {
        if (code !== null && code !== 0 && code !== null) {
          console.error(`[export] Vite exited with code ${code}`)
        }
      })
    } else {
      console.log(`[export] Using existing server on port ${PORT}`)
    }

    // Wait until the export route is reachable
    console.log(`[export] Waiting for → ${EXPORT_URL}`)
    await waitForServer(EXPORT_URL)
    console.log('[export] Server is ready.')

    // ── 2. Launch Chromium ────────────────────────────────────────────────
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      // Viewport = one slide — ensures 100vw/100vh resolve to 1280×720
      // (important for .slide-root and any component that relies on viewport units)
      viewport: { width: SLIDE_W, height: SLIDE_H },
    })
    const page = await context.newPage()

    // ── 3. Navigate and wait for full render ──────────────────────────────
    console.log('[export] Loading export page…')
    await page.goto(EXPORT_URL, {
      waitUntil: 'networkidle',
      timeout:   60_000,
    })

    // Confirm the export deck root is in the DOM
    await page.waitForSelector('#export-deck', { timeout: 15_000 })

    // Wait for all web fonts to finish loading (critical for crisp typography)
    await page.evaluate(() => document.fonts.ready)

    // Confirm every slide page is present
    const slideCount = await page.locator('.export-page').count()
    console.log(`[export] ${slideCount} slide pages detected.`)

    // Brief buffer for any final paint/layout passes after font load
    await new Promise(r => setTimeout(r, 1_000))

    // ── 4. Export PDF ─────────────────────────────────────────────────────
    console.log('[export] Generating PDF…')

    await page.pdf({
      path:            OUTPUT_PDF,
      // printBackground: true is essential for the dark theme — without it,
      // Chromium strips all background colors and images from the PDF output.
      printBackground: true,
      // preferCSSPageSize=true lets our @page { size: 1280px 720px } CSS rule
      // control page dimensions directly. This is the most reliable approach
      // for custom page sizes in Playwright.
      preferCSSPageSize: true,
      // Explicit fallback dimensions in case preferCSSPageSize is not honoured
      width:  `${SLIDE_W}px`,
      height: `${SLIDE_H}px`,
    })

    // Report file size
    const fileSize = statSync(OUTPUT_PDF).size
    const fileSizeFormatted = formatFileSize(fileSize)

    console.log(`\n✅  PDF exported → ${OUTPUT_PDF}`)
    console.log(`    ${slideCount} slides · ${SLIDE_W}×${SLIDE_H} px each · 16:9 landscape`)
    console.log(`    File size: ${fileSizeFormatted}\n`)

  } finally {
    // Always clean up — browser and dev server
    if (browser) {
      await browser.close()
    }
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM')
    }
  }
}

main().catch(err => {
  console.error('\n[export] Fatal error:', err)
  process.exit(1)
})
