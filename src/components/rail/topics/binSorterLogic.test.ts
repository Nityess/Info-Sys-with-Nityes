import { describe, expect, it } from 'vitest'
import { isDone, remaining, tryPlace } from './binSorterLogic'
import type { BinItem } from './binSorterLogic'

const items: BinItem[] = [
  { id: 'a', text: 'A', bin: 'x', why: 'wa' },
  { id: 'b', text: 'B', bin: 'y', why: 'wb' },
]

describe('bin sorter', () => {
  it('keeps a correct drop', () => {
    const r = tryPlace({}, items[0], 'x')
    expect(r.ok).toBe(true)
    expect(r.placed).toEqual({ a: 'x' })
  })
  it('bounces a wrong drop and changes nothing', () => {
    const start = { a: 'x' }
    const r = tryPlace(start, items[1], 'x')
    expect(r.ok).toBe(false)
    expect(r.placed).toBe(start)
  })
  it('knows what is left and when it is done', () => {
    expect(remaining(items, { a: 'x' }).map((i) => i.id)).toEqual(['b'])
    expect(isDone(items, { a: 'x' })).toBe(false)
    expect(isDone(items, { a: 'x', b: 'y' })).toBe(true)
    expect(isDone([], {})).toBe(false)
  })
})
