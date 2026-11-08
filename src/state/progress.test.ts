import { describe, expect, it } from 'vitest'
import { completionPercent, withDone } from './progress'
import type { Chapter } from '../content/types'

const chapter: Chapter = {
  id: 'c',
  number: 1,
  title: 't',
  lo: 'LO1',
  weight: 10,
  units: [
    { id: 'a', lo: 'LO1a', title: 'A' },
    { id: 'b', lo: 'LO1b', title: 'B' },
    { id: 'c', lo: 'LO1c', title: 'C' },
  ],
}

describe('completionPercent', () => {
  it('is 0 when nothing is done', () => {
    expect(completionPercent(chapter, new Set())).toBe(0)
  })
  it('rounds partial completion', () => {
    expect(completionPercent(chapter, new Set(['a']))).toBe(33)
    expect(completionPercent(chapter, new Set(['a', 'b']))).toBe(67)
  })
  it('is 100 when all done and ignores unknown ids', () => {
    expect(completionPercent(chapter, new Set(['a', 'b', 'c', 'zzz']))).toBe(100)
  })
  it('is 0 for a chapter with no units', () => {
    expect(completionPercent({ ...chapter, units: [] }, new Set(['a']))).toBe(0)
  })
})

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
