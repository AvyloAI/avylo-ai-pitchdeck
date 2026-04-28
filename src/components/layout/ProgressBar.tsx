interface ProgressBarProps {
  slideIndex: number
  totalSlides: number
}

export default function ProgressBar({ slideIndex, totalSlides }: ProgressBarProps) {
  const progress = ((slideIndex + 1) / totalSlides) * 100

  return (
    <div
      data-progress
      className="fixed top-0 left-0 right-0 h-[2px] z-50"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <div
        className="h-full transition-all duration-700 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #0087f8, #44c4f6)',
          boxShadow: '0 0 12px rgba(0,135,248,0.6)',
        }}
      />
    </div>
  )
}
