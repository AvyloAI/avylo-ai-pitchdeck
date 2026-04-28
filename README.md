# Avylo AI — Investor Pitch Deck

A premium, interactive presentation deck built with React, Framer Motion, and Playwright for seamless investor communication.

## Features

✨ **Interactive Presentation**
- Full-screen navigation with arrow keys or mouse clicks
- Progressive step-by-step reveals on each slide
- Smooth animations with Framer Motion
- Real-time typography and gradient effects

🎨 **Premium Design**
- Dark theme with glassmorphism UI
- Animated background layers (Aurora, Grid, Particles, Spotlight)
- Gradient text and borders
- Professional color palette

📄 **PDF Export Pipeline**
- Native Chromium rendering via Playwright
- True vector PDF output (searchable, scalable text)
- Optimized file size with simplified backgrounds
- One-click export to `Avylo-AI-Investor-Deck.pdf`

## Installation

### Prerequisites
- Node.js 18+ or pnpm 8+
- Playwright Chromium binary (auto-installed on first export)

### Install Dependencies

```bash
cd avylo-ai-pitchdeck
pnpm install
```

### Download Playwright Chromium (Required for PDF Export)

```bash
pnpm playwright install chromium
```

## Usage

### Development Server

Start the interactive presentation:

```bash
pnpm dev
```

The deck will open at `http://localhost:5177`

**Navigation:**
- **Right arrow** or **Down arrow** → Next slide / next step
- **Left arrow** or **Up arrow** → Previous slide / previous step
- **Space** → Next slide / next step
- **Click left** (< 25% width) → Previous
- **Click right** (> 25% width) → Next

### Export to PDF

Generate a professional PDF file:

```bash
pnpm export:pdf
```

This will:
1. Start a dev server on port 5177 (if not already running)
2. Render all 13 slides with Playwright
3. Export as `Avylo-AI-Investor-Deck.pdf` in the project root
4. Display file size and export status

**Output:** `Avylo-AI-Investor-Deck.pdf` (~1.15 MB, fully optimized)

### Build for Production

```bash
pnpm build
```

Outputs optimized assets to the `dist/` folder.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
├── App.tsx                  # Main app router (presentation vs. export mode)
├── ExportView.tsx          # PDF export rendering surface (all 13 slides)
├── index.css               # Global styles + export/print optimizations
├── main.tsx                # React entry point
├── slides/                 # Individual slide components (01-13)
├── components/
│   ├── background/         # Aurora, Grid, Particles, Spotlight
│   ├── layout/             # Logo, Navigation, ProgressBar, LoadingScreen
│   └── ui/                 # Badge, Button, GlassCard, GradientText
├── hooks/
│   └── usePresentation.ts  # Slide navigation state
├── lib/
│   ├── animations.ts       # Framer Motion animation definitions
│   └── slides-data.ts      # Slide registry (metadata, step counts)
└── scripts/
    └── export-pdf.ts       # Playwright PDF export pipeline

public/                     # Static assets
```

## Export Pipeline Architecture

The PDF export uses a **native Chromium rendering pipeline** instead of html2canvas:

### Why Playwright over html2canvas?

| Feature | html2canvas | Playwright |
|---------|------------|-----------|
| Gradient text | Broken (solid color) | Perfect ✓ |
| Backdrop filter | Invisible | Renders natively ✓ |
| CSS masks | Renders as solid box | Works perfectly ✓ |
| PDF text | Rasterized (not searchable) | Vector (searchable) ✓ |
| Maintenance | Fragile selector hacks | Zero workarounds ✓ |

### Export Flow

1. **ExportView.tsx** - Renders all 13 slides stacked vertically
   - `MotionConfig reducedMotion="always"` → instant animation resolution
   - Each slide at exactly 1280×720 px (16:9)
   - `page-break-after: always` → one slide per PDF page

2. **export-pdf.ts** - Playwright automation script
   - Launches Chromium (headless)
   - Navigates to `/?export=true`
   - Waits for fonts, renders, exports PDF
   - Reports file size

3. **CSS Optimization** - Simplified backgrounds
   - Solid color instead of gradients
   - Reduces file size ~50% vs. complex backgrounds
   - Maintains professional dark theme

## Performance

- **Web:** Smooth 60fps animations with progressive reveals
- **PDF:** 1.15 MB optimized file, fast to open and navigate
- **Export Time:** ~30-45 seconds (includes dev server startup)

## Configuration

### Environment Variables (Export Script)

```bash
# Override the dev server port
EXPORT_PORT=3000 pnpm export:pdf

# Use a deployed build instead of local dev
EXPORT_URL=https://mysite.com pnpm export:pdf

# Save PDF to a different location
OUTPUT_PATH=/tmp/deck.pdf pnpm export:pdf
```

## Slides (1-13)

1. **Hero Cover** — Intro + architecture overview
2. **The Problem** — Market pain points (5 steps)
3. **The Solution** — Avylo's approach (6 steps)
4. **Product Experience** — Live demo flow (5 steps)
5. **Market Opportunity** — TAM & segments (3 steps)
6. **Why Now** — Timing & trends (4 steps)
7. **Business Model** — Revenue & pricing (6 steps)
8. **Competitive Advantage** — Defensibility (4 steps)
9. **Go-to-Market** — Launch strategy (3 steps)
10. **Traction** — Milestones & metrics (4 steps)
11. **Vision** — Long-term roadmap
12. **Founder** — Team & background
13. **The Ask** — Funding & use of capital (4 steps)

## Development Workflow

### Adding a New Slide

1. Create `src/slides/NN-SlideName.tsx`
2. Add to `SLIDES` array in `src/lib/slides-data.ts`
3. Add import and component to `SLIDE_COMPONENTS` in `src/App.tsx`
4. Reuse existing components: `GlassCard`, `Badge`, `GradientText`, etc.

### CSS for Export

- Use `.export-mode` class for export-specific styles
- Use `@media print` for print/PDF-specific rules
- Gradient borders auto-fallback to solid borders in export
- Simplified solid backgrounds in export mode

## Troubleshooting

### PDF Export Hangs

- Ensure port 5177 is free
- Check browser can load `http://localhost:5177/?export=true`
- Verify Playwright Chromium is installed: `pnpm playwright install chromium`

### Slides Look Wrong in PDF

- Check `.export-mode` CSS rules are applied
- Verify `MotionConfig reducedMotion="always"` is wrapping the export view
- Inspect browser print preview to debug layout

### File Size is Large

- Confirm simplified backgrounds are being used (not radial gradients)
- Check `export-bg` CSS only applies solid color `#060816`
- Remove any raster images from slides (use SVG instead)

## License

Proprietary — Avylo AI, Inc.
