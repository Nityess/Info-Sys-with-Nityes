import { describe, expect, it } from 'vitest'
import { REASONS, SCENARIOS, answeredCount, isComplete, scoreSort } from './lo7aLogic'
import type { Scenario } from './lo7aLogic'

const two: Scenario[] = [
  { id: 'a', text: '', bucket: 'legal', why: '' },
  { id: 'b', text: '', bucket: 'commercial', why: '' },
]

describe('LO7a sorter', () => {
  it('scores only correct placements', () => {
    expect(scoreSort({}, two)).toBe(0)
    expect(scoreSort({ a: 'legal', b: 'legal' }, two)).toBe(1)
    expect(scoreSort({ a: 'legal', b: 'commercial' }, two)).toBe(2)
  })
  it('is complete only when every scenario is answered, right or wrong', () => {
    expect(isComplete({ a: 'legal' }, two)).toBe(false)
    expect(answeredCount({ a: 'commercial' }, two)).toBe(1)
    expect(isComplete({ a: 'commercial', b: 'legal' }, two)).toBe(true)
  })
  it('never treats an empty scenario list as complete', () => {
    expect(isComplete({}, [])).toBe(false)
  })
})

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
})
