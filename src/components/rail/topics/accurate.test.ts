import { describe, expect, it } from 'vitest'
import { DEFECTS, QUALITIES, REPORT, litIndexes } from './accurate'

describe('ACCURATE data', () => {
  it('spells ACCURATE in order', () => {
    expect(QUALITIES.map((q) => q.letter).join('')).toBe('ACCURATE')
  })
  it('has the five defects from the CEO report, each naming a real quality', () => {
    expect(DEFECTS).toHaveLength(5)
    for (const d of DEFECTS) expect(QUALITIES.some((q) => q.name === d.missing), d.id).toBe(true)
  })
  it('lights the missing letters when defects are found', () => {
    expect([...litIndexes(new Set(['wrong', 'late']))].sort()).toEqual([0, 6])
    expect(litIndexes(new Set(['title'])).size).toBe(0)
    expect(REPORT.some((l) => !l.missing)).toBe(true)
  })
})
