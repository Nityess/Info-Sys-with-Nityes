import { describe, expect, it } from 'vitest'
import { topics } from 'virtual:chapter7'

describe('virtual:chapter7', () => {
  it('serves the parsed topics without any App Spec text', () => {
    expect(Object.keys(topics)).toHaveLength(18)
    expect(JSON.stringify(topics)).not.toMatch(/App Spec|for the builder/i)
    expect(topics['1.5'].quizzes).toHaveLength(2)
  })
})
