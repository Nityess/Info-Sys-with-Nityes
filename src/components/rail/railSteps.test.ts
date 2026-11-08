import { describe, expect, it } from 'vitest'
import { TOPICS } from '../../content/chapters/ch07/topics'
import { RAIL_STEPS, stepsFor } from './railSteps'

describe('rail steps', () => {
  it('has the eight parts of a topic, in the order of the build prompt', () => {
    expect(RAIL_STEPS.map((s) => s.label)).toEqual([
      'Hook',
      'Concept',
      'Compare and traps',
      'Try it',
      'Quick quiz',
      'Write it like the exam',
      'Revision card',
      'Mastery checklist',
    ])
  })
  it('drops "Try it" where there is no playground', () => {
    expect(stepsFor(true)).toHaveLength(8)
    expect(stepsFor(false).map((s) => s.id)).not.toContain('try')
    expect(stepsFor(false)).toHaveLength(7)
  })
  it('gives exactly the 8 playground topics a "Try it" part', () => {
    const withTry = TOPICS.filter((t) => stepsFor(Boolean(t.playground)).some((s) => s.id === 'try'))
    expect(withTry).toHaveLength(8)
  })
})
