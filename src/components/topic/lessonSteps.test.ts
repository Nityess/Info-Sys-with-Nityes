import { describe, expect, it } from 'vitest'
import { clampStep, continueLabel, lessonSteps, progressPercent, stepState } from './lessonSteps'

describe('lesson steps', () => {
  it('has eight steps with a playground and seven without', () => {
    expect(lessonSteps(true).map((s) => s.label)).toEqual(['Hook', 'Concept', 'Compare and traps', 'Playground', 'Quiz', 'Write it like the exam', 'Revision card', 'Mastery checklist'])
    expect(lessonSteps(false)).toHaveLength(7)
    expect(lessonSteps(false).some((s) => s.id === 'try')).toBe(false)
  })
  it('keeps the step inside the range', () => {
    expect(clampStep(0, 8)).toBe(1)
    expect(clampStep(9, 8)).toBe(8)
    expect(clampStep(4, 8)).toBe(4)
  })
  it('fills the progress line from a small head start, and stays below 100', () => {
    expect(progressPercent(1, 8)).toBe(4)
    expect(progressPercent(8, 8)).toBe(92)
    expect(progressPercent(4, 7)).toBe(47)
  })
  it('labels Continue, pointing at the checklist from the second last step', () => {
    expect(continueLabel(1, 8)).toBe('Continue')
    expect(continueLabel(7, 8)).toBe('Finish with the checklist')
    expect(continueLabel(6, 7)).toBe('Finish with the checklist')
  })
  it('marks steps before the current one as done', () => {
    expect([1, 2, 3].map((n) => stepState(n, 2))).toEqual(['done', 'current', 'todo'])
  })
})
