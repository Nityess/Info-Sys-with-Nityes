import { describe, expect, it } from 'vitest'
import { claimXp, currentStreak, emptyGame, levelOf, parseGame, touchStreak } from './game'

describe('streak', () => {
  it('starts at 1 on first activity and holds within a day', () => {
    const a = touchStreak(emptyGame(), '2026-11-08')
    expect(a.streak).toBe(1)
    expect(touchStreak(a, '2026-11-08')).toBe(a)
  })
  it('extends on the next day, also across a month end', () => {
    const a = touchStreak(emptyGame(), '2026-10-31')
    expect(touchStreak(a, '2026-11-01').streak).toBe(2)
  })
  it('restarts after a gap', () => {
    const a = { ...emptyGame(), streak: 5, lastDay: '2026-11-01' }
    expect(touchStreak(a, '2026-11-04').streak).toBe(1)
  })
  it('shows 0 once a day has been missed', () => {
    const a = { ...emptyGame(), streak: 5, lastDay: '2026-11-06' }
    expect(currentStreak(a, '2026-11-07')).toBe(5)
    expect(currentStreak(a, '2026-11-08')).toBe(0)
    expect(currentStreak(emptyGame(), '2026-11-08')).toBe(0)
  })
})

describe('claimXp', () => {
  it('pays out once per key', () => {
    const first = claimXp(emptyGame(), 'u:play', 40, '2026-11-08')
    expect(first.granted).toBe(40)
    expect(first.state.xp).toBe(40)
    const again = claimXp(first.state, 'u:play', 40, '2026-11-08')
    expect(again.granted).toBe(0)
    expect(again.state.xp).toBe(40)
  })
  it('different keys stack and activity counts towards the streak', () => {
    const a = claimXp(emptyGame(), 'u:explore', 10, '2026-11-08')
    const b = claimXp(a.state, 'u:recap', 30, '2026-11-09')
    expect(b.state.xp).toBe(40)
    expect(b.state.streak).toBe(2)
  })
})

describe('levels and parsing', () => {
  it('levels up every 100 XP', () => {
    expect(levelOf(0)).toBe(1)
    expect(levelOf(99)).toBe(1)
    expect(levelOf(100)).toBe(2)
  })
  it('repairs bad stored data', () => {
    expect(parseGame(null)).toEqual(emptyGame())
    expect(parseGame({ xp: -5, streak: 'x', claimed: [1, 'a'], lastDay: 3 })).toEqual({
      xp: 0,
      streak: 0,
      lastDay: null,
      claimed: ['a'],
    })
  })
})
