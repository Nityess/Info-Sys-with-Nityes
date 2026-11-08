import { describe, expect, it } from 'vitest'
import { SAMPLE_START, clamp100, sampleVerdict, scaleGeometry } from './sampleScale'

describe('sample playground', () => {
  it('starts with a positive example (60 against 40)', () => {
    expect(sampleVerdict(SAMPLE_START.benefit, SAMPLE_START.cost).kind).toBe('worth')
  })
  it('gives worth, not worth or level', () => {
    expect(sampleVerdict(50, 40).kind).toBe('worth')
    expect(sampleVerdict(30, 40).kind).toBe('not-worth')
    expect(sampleVerdict(40, 40)).toMatchObject({ kind: 'level', head: 'Level.' })
  })
  it('keeps the numbers between 0 and 100', () => {
    expect(clamp100(-10)).toBe(0)
    expect(clamp100(110)).toBe(100)
    expect(clamp100(60)).toBe(60)
  })
  it('lowers the heavier side of the scale', () => {
    const benefitHeavier = scaleGeometry(60, 40)
    expect(benefitHeavier.ly).toBeGreaterThan(benefitHeavier.ry)
    const costHeavier = scaleGeometry(40, 60)
    expect(costHeavier.ry).toBeGreaterThan(costHeavier.ly)
  })
  it('is level when equal and stops tipping at 18 degrees', () => {
    const level = scaleGeometry(50, 50)
    expect(level.ly).toBeCloseTo(level.ry)
    const extreme = scaleGeometry(100, 0)
    const wide = scaleGeometry(100, 20)
    expect(extreme.ly).toBeCloseTo(wide.ly)
    expect(extreme.lpy - extreme.ly).toBeCloseTo(16)
  })
})
