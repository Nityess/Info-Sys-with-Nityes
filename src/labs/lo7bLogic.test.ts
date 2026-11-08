import { describe, expect, it } from 'vitest'
import { CONSEQUENCES, IMPLICATIONS, INCIDENTS, impactsOf } from './lo7bLogic'
import type { Incident } from './lo7bLogic'

describe('LO7b content', () => {
  it('lists the 5 syllabus implications once each', () => {
    expect(IMPLICATIONS.map((i) => i.label)).toEqual([
      'Financial loss',
      'Denial of service',
      'Competitors',
      'Reputational loss',
      'Data protection',
    ])
  })
  it('gives every incident a source and at least one impact', () => {
    for (const inc of INCIDENTS) {
      expect(inc.source).not.toBe('')
      expect(impactsOf(inc).length).toBeGreaterThan(0)
    }
  })
  it('covers every implication across incidents and practice items', () => {
    const fromIncidents = new Set(INCIDENTS.flatMap(impactsOf))
    const fromSorter = new Set(CONSEQUENCES.map((c) => c.bucket))
    for (const i of IMPLICATIONS) {
      expect(fromIncidents.has(i.id)).toBe(true)
      expect(fromSorter.has(i.id)).toBe(true)
    }
  })
})

describe('impactsOf', () => {
  it('returns impacts in syllabus order, ignoring key order', () => {
    const inc: Incident = {
      id: 'x', title: '', story: '', source: 's',
      impacts: { reputation: 'r', financial: 'f' },
    }
    expect(impactsOf(inc)).toEqual(['financial', 'reputation'])
  })
})
