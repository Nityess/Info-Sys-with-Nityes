import { describe, expect, it } from 'vitest'
import { REASONS, SCENARIOS } from './lo7aLogic'
import { isComplete, scoreSort } from '../components/sorterLogic'

describe('LO7a content', () => {
  it('has the 7 textbook reasons with exactly one legal and one commercial', () => {
    expect(REASONS).toHaveLength(7)
    expect(REASONS.filter((r) => r.tag === 'legal')).toHaveLength(1)
    expect(REASONS.filter((r) => r.tag === 'commercial')).toHaveLength(1)
  })
  it('has unique scenario ids covering both buckets', () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length)
    expect(SCENARIOS.some((s) => s.bucket === 'legal')).toBe(true)
    expect(SCENARIOS.some((s) => s.bucket === 'commercial')).toBe(true)
  })
  it('scores a perfect sort as full marks', () => {
    const perfect = Object.fromEntries(SCENARIOS.map((s) => [s.id, s.bucket]))
    expect(scoreSort(perfect, SCENARIOS)).toBe(SCENARIOS.length)
    expect(isComplete(perfect, SCENARIOS)).toBe(true)
  })
})
