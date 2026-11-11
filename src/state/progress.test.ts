import { describe, expect, it } from 'vitest'
import { topicStatus, withDone } from './progress'

describe('withDone', () => {
  it('adds a new id without mutating the original', () => {
    const start = new Set(['a'])
    const next = withDone(start, 'b')
    expect([...next].sort()).toEqual(['a', 'b'])
    expect(start.has('b')).toBe(false)
  })
  it('returns the same set when the id is already done', () => {
    const start = new Set(['a'])
    expect(withDone(start, 'a')).toBe(start)
  })
})

describe('topicStatus', () => {
  it('is not-started, in-progress or done, with done winning', () => {
    expect(topicStatus('a', new Set(), new Set())).toBe('not-started')
    expect(topicStatus('a', new Set(), new Set(['a']))).toBe('in-progress')
    expect(topicStatus('a', new Set(['a']), new Set(['a']))).toBe('done')
    expect(topicStatus('a', new Set(['a']), new Set())).toBe('done')
  })
})
