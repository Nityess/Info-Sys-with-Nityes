import { describe, expect, it } from 'vitest'
import { ch07 } from './ch07'
import { SECTION_A, SECTION_B, SECTION_C } from './ch07/helpers'

// Leaf counts per branch, as on the owner's mind map
const MIND_MAP: [string, number][] = [
  ['Information Requirements for Managers', 9],
  ['Types of Information', 4],
  ['Qualities of Good Information (ACCURATE)', 8],
  ['Value of Information', 4],
  ['Cost and Value Assessment', 3],
  ['IT Delivery and Support', 5],
  ['Information Processing (CATIVA)', 6],
  ['Primary Users and Needs', 7],
  ['Underlying Assumptions', 2],
  ['Financial Statements Content', 3],
  ['Qualitative Characteristics', 6],
  ['Limitations of Financial Reporting', 5],
  ['Other Sources of Information', 4],
  ['IT Software Applications', 3],
  ['Computer Networks', 3],
]

describe('Ch7 follows the mind map', () => {
  it('has every branch in order with the right number of leaves', () => {
    expect(ch07.units.map((u) => [u.title, u.cards?.length])).toEqual(MIND_MAP)
  })
  it('groups branches into the 3 sections in order', () => {
    const sections = ch07.units.map((u) => u.section)
    expect(sections.slice(0, 7).every((s) => s === SECTION_A)).toBe(true)
    expect(sections.slice(7, 13).every((s) => s === SECTION_B)).toBe(true)
    expect(sections.slice(13).every((s) => s === SECTION_C)).toBe(true)
  })
  it('has unique unit ids and card ids within each unit', () => {
    expect(new Set(ch07.units.map((u) => u.id)).size).toBe(ch07.units.length)
    for (const u of ch07.units) {
      const ids = u.cards!.map((c) => c.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
  it('points every practice item at an existing card', () => {
    for (const u of ch07.units) {
      const ids = new Set(u.cards!.map((c) => c.id))
      expect(u.practice!.length).toBeGreaterThan(0)
      for (const p of u.practice!) expect(ids.has(p.bucket), `${u.id}/${p.id}`).toBe(true)
    }
  })
})
