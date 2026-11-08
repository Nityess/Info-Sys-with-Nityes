import { describe, expect, it } from 'vitest'
import { answeredCount, isComplete, scoreSort } from './sorterLogic'
import type { SortItem } from './sorterLogic'

const two: SortItem<'x' | 'y'>[] = [
  { id: 'a', text: '', bucket: 'x', why: '' },
  { id: 'b', text: '', bucket: 'y', why: '' },
]

describe('sorter logic', () => {
  it('scores only correct placements', () => {
    expect(scoreSort({}, two)).toBe(0)
    expect(scoreSort({ a: 'x', b: 'x' }, two)).toBe(1)
    expect(scoreSort({ a: 'x', b: 'y' }, two)).toBe(2)
  })
  it('is complete only when every item is answered, right or wrong', () => {
    expect(isComplete({ a: 'x' }, two)).toBe(false)
    expect(answeredCount({ a: 'y' }, two)).toBe(1)
    expect(isComplete({ a: 'y', b: 'x' }, two)).toBe(true)
  })
  it('never treats an empty list as complete', () => {
    expect(isComplete({}, [])).toBe(false)
  })
})
