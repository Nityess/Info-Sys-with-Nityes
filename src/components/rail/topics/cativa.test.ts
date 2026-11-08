import { describe, expect, it } from 'vitest'
import { FAULTS, GATES, PAIRS, gateStatus } from './cativa'

describe('CATIVA data', () => {
  it('spells CATIVA in the source order', () => {
    expect(GATES.map((g) => g.letter).join('')).toBe('CATIVA')
    expect(GATES.map((g) => g.name)).toEqual(['Completeness', 'Accuracy', 'Timeliness', 'Inalterability', 'Verifiability', 'Assessability'])
  })
  it('has one fault per gate, each pointing at a real gate', () => {
    expect(FAULTS.map((f) => f.gate).sort()).toEqual(GATES.map((g) => g.id).sort())
  })
  it('never offers the non-source terms as gates', () => {
    const text = JSON.stringify([GATES, FAULTS]).toLowerCase()
    for (const bad of ['non-repudiation', 'integrity', 'validity', 'authorisation']) expect(text).not.toContain(bad)
  })
  it('fails only the faulty gate', () => {
    const s = gateStatus('figure')
    expect(Object.entries(s).filter(([, v]) => v === 'fail').map(([k]) => k)).toEqual(['accuracy'])
    expect(Object.values(gateStatus(null)).every((v) => v === 'pass')).toBe(true)
  })
  it('keeps the two confusable pairs', () => {
    expect(PAIRS.map((p) => `${p.a}/${p.b}`)).toEqual(['Accuracy/Inalterability', 'Verifiability/Assessability'])
  })
})
