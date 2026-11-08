/** The eight parts of a topic, in order. "Try it" only appears where a playground is planned. */
export const RAIL_STEPS = [
  { id: 'hook', label: 'Hook' },
  { id: 'concept', label: 'Concept' },
  { id: 'compare', label: 'Compare and traps' },
  { id: 'try', label: 'Try it' },
  { id: 'quiz', label: 'Quick quiz' },
  { id: 'answer', label: 'Write it like the exam' },
  { id: 'revise', label: 'Revision card' },
  { id: 'mastery', label: 'Mastery checklist' },
] as const

export type RailStepId = (typeof RAIL_STEPS)[number]['id']

export const stepsFor = (hasPlayground: boolean) => RAIL_STEPS.filter((s) => s.id !== 'try' || hasPlayground)
