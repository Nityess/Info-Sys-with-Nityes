import { describe, expect, it } from 'vitest'
import { TOPICS } from '../../content/chapters/ch07/topics'
import { BUILT_TOPICS, COMPARE_MARKERS } from './builtTopics'

describe('built topics', () => {
  it('only lists real topics', () => {
    const codes = new Set(TOPICS.map((t) => t.code))
    for (const c of BUILT_TOPICS) expect(codes.has(c), c).toBe(true)
  })
  it('only has compare markers for built topics', () => {
    for (const c of Object.keys(COMPARE_MARKERS)) expect(BUILT_TOPICS.has(c), c).toBe(true)
  })
  it('has built topics with a playground flagged in the topic model', () => {
    expect(TOPICS.find((t) => t.code === '1.5')?.playground).toBe(true)
  })
})

describe('lesson shell topics', () => {
  it('only lists real, built topics', async () => {
    const { LESSON_SHELL_TOPICS } = await import('./builtTopics')
    for (const c of LESSON_SHELL_TOPICS) expect(BUILT_TOPICS.has(c), c).toBe(true)
    expect(LESSON_SHELL_TOPICS.has('1.2')).toBe(true)
  })
})
