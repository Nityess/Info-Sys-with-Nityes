import { describe, expect, it } from 'vitest'
import { chooseAnswer, firstTryCount, initialMatch, nextItem, stars } from './quickMatchLogic'

describe('quick match', () => {
  it('records a first-try win and builds a streak', () => {
    let s = chooseAnswer(initialMatch(), 'a', 'a')
    expect(s.solved).toBe(true)
    expect(s.results).toEqual(['first'])
    s = chooseAnswer(nextItem(s, 3), 'b', 'b')
    expect(s.streak).toBe(2)
    expect(s.bestStreak).toBe(2)
  })
  it('a wrong try resets the streak and marks the item as a retry', () => {
    let s = chooseAnswer(initialMatch(), 'a', 'a')
    s = nextItem(s, 3)
    s = chooseAnswer(s, 'b', 'x')
    expect(s.wrong).toBe('x')
    expect(s.streak).toBe(0)
    expect(s.solved).toBe(false)
    s = chooseAnswer(s, 'b', 'b')
    expect(s.results).toEqual(['first', 'retry'])
    expect(s.bestStreak).toBe(1)
    expect(firstTryCount(s)).toBe(1)
  })
  it('ignores choices after solving and blocks next before solving', () => {
    const s = chooseAnswer(initialMatch(), 'a', 'a')
    expect(chooseAnswer(s, 'a', 'x')).toBe(s)
    const unsolved = initialMatch()
    expect(nextItem(unsolved, 3)).toBe(unsolved)
  })
  it('finishes after the last item', () => {
    let s = chooseAnswer(initialMatch(), 'a', 'a')
    s = nextItem(s, 1)
    expect(s.finished).toBe(true)
  })
  it('awards stars by first-try share', () => {
    expect(stars(5, 5)).toBe(3)
    expect(stars(3, 5)).toBe(2)
    expect(stars(1, 5)).toBe(1)
    expect(stars(0, 0)).toBe(0)
  })
})
