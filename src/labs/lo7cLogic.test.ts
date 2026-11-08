import { describe, expect, it } from 'vitest'
import { CONTROLS, THREATS, blockedCount, charsetSize, entropyBits, ratePassword } from './lo7cLogic'
import type { ControlId } from './lo7cLogic'

describe('charsetSize', () => {
  it('adds each character class once', () => {
    expect(charsetSize('')).toBe(0)
    expect(charsetSize('abc')).toBe(26)
    expect(charsetSize('aB')).toBe(52)
    expect(charsetSize('aB3')).toBe(62)
    expect(charsetSize('aB3!')).toBe(95)
  })
})

describe('entropyBits', () => {
  it('is length × log2(pool)', () => {
    expect(entropyBits('')).toBe(0)
    expect(entropyBits('abcd')).toBeCloseTo(4 * Math.log2(26))
    expect(entropyBits('aB3!aB3!')).toBeCloseTo(8 * Math.log2(95))
  })
})

describe('ratePassword', () => {
  it('rates common passwords as very weak regardless of case', () => {
    expect(ratePassword('Password123').rating).toBe('Very weak')
    expect(ratePassword('Password123').bits).toBe(0)
  })
  it('caps a common word plus numbers at weak', () => {
    const s = ratePassword('nepal2026')
    expect(s.rating).toBe('Weak')
    expect(s.tips.join(' ')).toMatch(/common word "nepal"/)
    expect(ratePassword('Kathmandu-Valley-2026!').bits).toBeLessThanOrEqual(35)
  })
  it('rates repeated characters as very weak', () => {
    expect(ratePassword('aaaaaaaaaaaaaaaa').rating).toBe('Very weak')
  })
  it('uses the entropy bands', () => {
    expect(ratePassword('cat').rating).toBe('Very weak') // ~14 bits
    expect(ratePassword('tiger1').rating).toBe('Weak') // 6 × log2(36) ≈ 31.0
    expect(ratePassword('tiger12').rating).toBe('Fair') // 7 × log2(36) ≈ 36.2
  })
  it('rates a long mixed passphrase as very strong', () => {
    const s = ratePassword('Blue-Momo-Rain-42!')
    expect(s.rating).toBe('Very strong')
    expect(s.level).toBe(4)
    expect(s.tips).toHaveLength(0)
  })
  it('gives tips for missing classes and short length', () => {
    const tips = ratePassword('abcdefg').tips.join(' ')
    expect(tips).toMatch(/12 characters/)
    expect(tips).toMatch(/number/)
    expect(tips).toMatch(/symbol/)
  })
})

describe('controls vs threats', () => {
  it('maps each control to exactly one threat', () => {
    expect(new Set(THREATS.map((t) => t.blockedBy)).size).toBe(CONTROLS.length)
  })
  it('counts blocked threats', () => {
    expect(blockedCount(new Set())).toBe(0)
    expect(blockedCount(new Set<ControlId>(['twofa', 'updates']))).toBe(2)
    expect(blockedCount(new Set(CONTROLS.map((c) => c.id)))).toBe(5)
  })
})
