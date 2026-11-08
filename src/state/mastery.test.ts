import { describe, expect, it } from 'vitest'
import { isComplete, parseMastery, toggleChecked } from './mastery'

describe('mastery checklist', () => {
  it('ticks and unticks, keeping the list sorted', () => {
    expect(toggleChecked([], 3)).toEqual([3])
    expect(toggleChecked([3], 1)).toEqual([1, 3])
    expect(toggleChecked([1, 3], 3)).toEqual([1])
  })
  it('is complete only when every line is ticked', () => {
    expect(isComplete([0, 1, 2], 3)).toBe(true)
    expect(isComplete([0, 1], 3)).toBe(false)
    expect(isComplete([], 0)).toBe(false)
  })
  it('ignores stale ticks beyond the list length', () => {
    expect(isComplete([0, 1, 9], 3)).toBe(false)
    expect(isComplete([0, 1, 2, 9], 3)).toBe(true)
  })
  it('repairs bad stored data', () => {
    expect(parseMastery(null)).toEqual({})
    expect(parseMastery({ a: [1, 'x', -2, 3], b: 'no' })).toEqual({ a: [1, 3] })
  })
})
