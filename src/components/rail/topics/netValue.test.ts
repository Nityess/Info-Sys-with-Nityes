import { describe, expect, it } from 'vitest'
import { PRESETS, beamAngle, formatNpr, netValue, verdictOf } from './netValue'

describe('net value', () => {
  it('is extra benefits minus extra costs', () => {
    expect(netValue(9000, 10000)).toBe(-1000)
    expect(netValue(250000, 150000)).toBe(100000)
    expect(netValue(120000, 120000)).toBe(0)
  })
  it('gives positive, negative or zero', () => {
    expect(verdictOf(1)).toBe('positive')
    expect(verdictOf(-1)).toBe('negative')
    expect(verdictOf(0)).toBe('zero')
  })
  it('gives the result the file names for each preset', () => {
    for (const p of PRESETS) expect(verdictOf(netValue(p.benefit, p.cost)), p.label).toBe(p.expect)
  })
  it('matches the file for the other worked numbers', () => {
    expect(netValue(80000, 50000)).toBeGreaterThan(0) // Scenario A
    expect(netValue(45000, 70000)).toBeLessThan(0) // Scenario B
    expect(netValue(180000, 120000)).toBe(60000) // MCQ Q2
    expect(netValue(75000, 95000)).toBe(-20000) // MCQ Q3
  })
})

describe('formatNpr', () => {
  it('groups digits the Nepali way', () => {
    expect(formatNpr(250000)).toBe('NPR 2,50,000')
    expect(formatNpr(100000)).toBe('NPR 1,00,000')
    expect(formatNpr(9000)).toBe('NPR 9,000')
  })
  it('uses a real minus sign for negatives', () => {
    expect(formatNpr(-10000)).toBe('− NPR 10,000')
    expect(formatNpr(0)).toBe('NPR 0')
  })
})

describe('beamAngle', () => {
  it('is level when benefits equal costs, tips towards the larger side', () => {
    expect(beamAngle(1000, 1000)).toBe(0)
    expect(beamAngle(0, 100000)).toBeGreaterThan(0)
    expect(beamAngle(100000, 0)).toBeLessThan(0)
  })
  it('still tips visibly for a small gap such as the hook example (90,000 vs 1,00,000)', () => {
    expect(beamAngle(90000, 100000)).toBeGreaterThan(3)
    expect(beamAngle(100000, 90000)).toBeLessThan(-3)
  })
  it('tips further as the gap grows', () => {
    expect(beamAngle(0, 20000)).toBeLessThan(beamAngle(0, 100000))
  })
  it('never tips past 14 degrees', () => {
    expect(beamAngle(0, 300000)).toBe(14)
    expect(beamAngle(300000, 0)).toBe(-14)
  })
})
