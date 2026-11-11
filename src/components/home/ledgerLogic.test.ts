import { describe, expect, it } from 'vitest'
import { MAX_AMOUNT, MIN_AMOUNT, START_ENTRIES, STEP, brokenFlags, chainHashes, firstBroken, formatRs, sha6, stepAmount } from './ledgerLogic'

describe('sha6', () => {
  it('is six hex digits and the same every time', async () => {
    const a = await sha6('hello')
    expect(a).toMatch(/^[0-9a-f]{6}$/)
    expect(await sha6('hello')).toBe(a)
    expect(await sha6('hellp')).not.toBe(a)
  })
  it('matches the start of the real SHA-256 of "abc"', async () => {
    expect(await sha6('abc')).toBe('ba7816')
  })
})

describe('chainHashes', () => {
  it('gives one hash per block, all different', async () => {
    const h = await chainHashes(START_ENTRIES)
    expect(h).toHaveLength(3)
    expect(new Set(h).size).toBe(3)
  })
  it('changing the first amount changes every later hash', async () => {
    const sealed = await chainHashes(START_ENTRIES)
    const edited = START_ENTRIES.map((e, i) => (i === 0 ? { ...e, amount: e.amount + STEP } : e))
    const flags = brokenFlags(sealed, await chainHashes(edited))
    expect(flags).toEqual([true, true, true])
    expect(firstBroken(flags)).toBe(0)
  })
  it('changing the last amount breaks only the last block', async () => {
    const sealed = await chainHashes(START_ENTRIES)
    const edited = START_ENTRIES.map((e, i) => (i === 2 ? { ...e, amount: e.amount - STEP } : e))
    const flags = brokenFlags(sealed, await chainHashes(edited))
    expect(flags).toEqual([false, false, true])
    expect(firstBroken(flags)).toBe(2)
  })
  it('putting the amount back repairs the chain', async () => {
    const sealed = await chainHashes(START_ENTRIES)
    const flags = brokenFlags(sealed, await chainHashes([...START_ENTRIES]))
    expect(flags).toEqual([false, false, false])
    expect(firstBroken(flags)).toBe(-1)
  })
})

describe('amounts', () => {
  it('formats rupees in the Nepali style', () => {
    expect(formatRs(320000)).toBe('Rs 3,20,000')
    expect(formatRs(45000)).toBe('Rs 45,000')
  })
  it('steps by 10,000 and stays inside the limits', () => {
    expect(stepAmount(320000, 1)).toBe(330000)
    expect(stepAmount(320000, -1)).toBe(310000)
    expect(stepAmount(MIN_AMOUNT, -1)).toBe(MIN_AMOUNT)
    expect(stepAmount(MAX_AMOUNT, 1)).toBe(MAX_AMOUNT)
  })
  it('has no em dashes in the made-up names', () => {
    for (const e of START_ENTRIES) expect(`${e.from}${e.to}`).not.toContain('—')
  })
})
