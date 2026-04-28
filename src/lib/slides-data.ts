/* Slide registry — defines step counts and labels */
export interface SlideConfig {
  id: string
  steps: number  // 0 = static; N = N progressive step reveals
  label: string  // short human label for nav tooltip
}

export const SLIDES: SlideConfig[] = [
  { id: 'hero',          steps: 0, label: 'Cover'        },  // 01
  { id: 'problem',       steps: 5, label: 'Problem'      },  // 02
  { id: 'solution',      steps: 6, label: 'Solution'     },  // 03
  { id: 'product',       steps: 5, label: 'Product'      },  // 04
  { id: 'market',        steps: 3, label: 'Market'       },  // 05
  { id: 'why-now',       steps: 4, label: 'Why Now'      },  // 06
  { id: 'business',      steps: 6, label: 'Business'     },  // 07
  { id: 'competitive',   steps: 4, label: 'Competitive'  },  // 08
  { id: 'gtm',           steps: 3, label: 'Go-to-Market' },  // 09
  { id: 'traction',      steps: 4, label: 'Traction'     },  // 10
  { id: 'vision',        steps: 0, label: 'Vision'       },  // 11
  { id: 'founder',       steps: 0, label: 'Founder'      },  // 12
  { id: 'ask',           steps: 4, label: 'The Ask'      },  // 13
]

export const SLIDE_COUNT = SLIDES.length
