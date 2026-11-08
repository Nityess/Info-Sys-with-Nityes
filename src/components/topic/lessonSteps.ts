import type { RailStepId } from '../rail/railSteps'

export interface LessonStep {
  id: RailStepId
  label: string
}

const ALL: LessonStep[] = [
  { id: 'hook', label: 'Hook' },
  { id: 'concept', label: 'Concept' },
  { id: 'compare', label: 'Compare and traps' },
  { id: 'try', label: 'Playground' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'answer', label: 'Write it like the exam' },
  { id: 'revise', label: 'Revision card' },
  { id: 'mastery', label: 'Mastery checklist' },
]

/** The steps of a topic. Playground only appears on the topics that have one. */
export const lessonSteps = (hasPlayground: boolean): LessonStep[] => ALL.filter((s) => s.id !== 'try' || hasPlayground)

/** Keeps a step number inside 1 to total. */
export const clampStep = (step: number, total: number): number => Math.min(Math.max(1, Math.round(step)), Math.max(1, total))

/** Width of the thin progress line: a little head start on step 1, never 100 until the end. */
export const progressPercent = (step: number, total: number): number => Math.round(((clampStep(step, total) - 1) / total) * 100 + 4)

/** Label of the Continue button. The step before the last points at the checklist. */
export const continueLabel = (step: number, total: number): string => (step === total - 1 ? 'Finish with the checklist' : 'Continue')

export type StepState = 'done' | 'current' | 'todo'

/** A step is done once the student has moved past it. */
export const stepState = (n: number, step: number): StepState => (n < step ? 'done' : n === step ? 'current' : 'todo')
