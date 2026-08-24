/**
 * Investor Deck V2 — Slide Content Data
 * ============================================================
 * Centralized content for the Avylo AI Investor Pitch Deck.
 * Edit text here without touching component JSX.
 *
 * Deck identity: VC/Accelerator · Category-defining · Global ambition
 */

export const DECK_META = {
  title: 'Avylo AI — Investor Deck V2',
  badge: 'Seed Round · 2026',
  variant: 'investor' as const,
}

export const HERO = {
  badge: 'Seed Round · 2026',
  headline: ['Every Startup Begins', 'With Architecture.', 'Avylo Makes It Instant.'],
  subheadline: 'Avylo AI transforms startup concepts into strategic blueprints, system architecture, and execution intelligence.',
}

export const PROBLEM_STATS = [
  { label: 'of startups fail due to poor planning and architecture decisions', value: '90%', color: '#f87171' },
  { label: 'avg weeks lost to manual architecture & strategy planning', value: '3–6', color: '#fbbf24' },
  { label: 'cost of expert architecture guidance per hour', value: '$450', color: '#0087f8' },
]

export const MARKET_SEGMENTS = [
  { label: 'Independent Founders',     share: '38%', color: '#0087f8' },
  { label: 'SaaS Builder Communities', share: '22%', color: '#44c4f6' },
  { label: 'Startup Accelerators',     share: '15%', color: '#44c4f6' },
  { label: 'Universities & Labs',      share: '14%', color: '#34d399' },
  { label: 'Enterprise Innovation',    share: '11%', color: '#fbbf24' },
]

export const TAM_SAM_SOM = [
  { label: 'TAM', value: '$124B', subtitle: 'AI Dev Tools + Strategy Software', r: 140, color: '#0087f8', opacity: 0.12 },
  { label: 'SAM', value: '$18B',  subtitle: 'Product Architecture Tools',       r: 100, color: '#44c4f6', opacity: 0.18 },
  { label: 'SOM', value: '$2.4B', subtitle: 'AI-Native Blueprint Platforms',    r:  60, color: '#44c4f6', opacity: 0.28 },
]

export const ASK_HEADLINE = {
  title: 'The Ask',
  headline: 'Join us in defining the AI Product Infrastructure category.',
  sub: 'Strategic capital + ecosystem leverage + pilot partnerships.',
}
