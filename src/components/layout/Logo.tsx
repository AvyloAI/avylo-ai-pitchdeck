interface LogoProps {
  /** Rendered height in px — width scales automatically to preserve aspect ratio */
  height?: number
  /** Pass true to render only the symbol mark (LogoSymbol.png) */
  symbolOnly?: boolean
  className?: string
}

export default function Logo({ height = 28, symbolOnly = false, className = '' }: LogoProps) {
  if (symbolOnly) {
    return (
      <img
        src="/LogoSymbol.png"
        alt="Avylo AI"
        height={height}
        style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
        className={className}
      />
    )
  }

  return (
    <img
      src="/Logo.png"
      alt="Avylo AI"
      height={height}
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
      className={className}
    />
  )
}
