// Colour theme per mind-map section. Class names are literal so Tailwind keeps them.

export interface SectionTheme {
  hero: string
  line: string
  node: string
  nodeActive: string
  accentText: string
  ring: string
  button: string
}

const INDIGO: SectionTheme = {
  hero: 'bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600',
  line: 'bg-indigo-300 dark:bg-indigo-700',
  node: 'bg-indigo-100 dark:bg-indigo-900/50',
  nodeActive: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60',
  accentText: 'text-indigo-700 dark:text-indigo-300',
  ring: 'stroke-indigo-500',
  button: 'bg-indigo-600 hover:bg-indigo-700',
}

const EMERALD: SectionTheme = {
  hero: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600',
  line: 'bg-emerald-300 dark:bg-emerald-700',
  node: 'bg-emerald-100 dark:bg-emerald-900/50',
  nodeActive: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
  accentText: 'text-emerald-700 dark:text-emerald-300',
  ring: 'stroke-emerald-500',
  button: 'bg-emerald-600 hover:bg-emerald-700',
}

const AMBER: SectionTheme = {
  hero: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
  line: 'bg-amber-300 dark:bg-amber-700',
  node: 'bg-amber-100 dark:bg-amber-900/50',
  nodeActive: 'border-amber-500 bg-amber-50 dark:bg-amber-950/60',
  accentText: 'text-amber-700 dark:text-amber-300',
  ring: 'stroke-amber-500',
  button: 'bg-orange-600 hover:bg-orange-700',
}

const THEMES: Record<string, SectionTheme> = {
  'IT in the Business Environment': INDIGO,
  'Role of Financial Information in Business': EMERALD,
  'Information Systems & IT': AMBER,
  'Role of Financial Information': {
    hero: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600',
    line: 'bg-emerald-300 dark:bg-emerald-700',
    node: 'bg-emerald-100 dark:bg-emerald-900/50',
    nodeActive: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
    accentText: 'text-emerald-700 dark:text-emerald-300',
    ring: 'stroke-emerald-500',
    button: 'bg-emerald-600 hover:bg-emerald-700',
  },
  'Information Systems': {
    hero: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
    line: 'bg-amber-300 dark:bg-amber-700',
    node: 'bg-amber-100 dark:bg-amber-900/50',
    nodeActive: 'border-amber-500 bg-amber-50 dark:bg-amber-950/60',
    accentText: 'text-amber-700 dark:text-amber-300',
    ring: 'stroke-amber-500',
    button: 'bg-orange-600 hover:bg-orange-700',
  },
}

export function themeFor(section?: string): SectionTheme {
  return (section && THEMES[section]) || INDIGO
}
