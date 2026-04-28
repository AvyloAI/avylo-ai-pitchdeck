export default function GridBackground() {
  return (
    <div
      data-grid
      className="pointer-events-none fixed inset-0 z-0 animate-grid-pulse"
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid opacity-[0.04]"
      />
      {/* Horizontal lines - subtle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-lines" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(0,135,248,0.4)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>
    </div>
  )
}
