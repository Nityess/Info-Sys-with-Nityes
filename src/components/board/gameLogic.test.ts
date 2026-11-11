import { describe, expect, it } from 'vitest'
import { advance, feedback, initialGame, isDone, nextLabel, optionsOf, pick, progressText, questionsFor, resultText } from './gameLogic'
import type { Game, Mcq } from './types'

const bank: Mcq[] = [{ n: 4, q: 'Which is operational?', opts: ['A', 'B', 'C', 'D'], ans: 2, why: 'Daily detail.' }]
const game: Game = {
  title: 'Which type?',
  cats: ['Strategic', 'Tactical'],
  items: [{ q: 'Monthly report', cat: 1, why: 'Short-term.' }, { mcq: 4 }, { mcq: 99 }],
}

describe('game questions', () => {
  const qs = questionsFor(game, bank)
  it('looks real questions up in the bank and skips unknown numbers', () => {
    expect(qs).toHaveLength(2)
    expect(qs[1]).toEqual({ q: 'Exam question Q4: Which is operational?', cat: 2, why: 'Daily detail.', opts: ['A', 'B', 'C', 'D'] })
  })
  it('classification items use the shared categories, real questions their own options', () => {
    expect(optionsOf(game, qs[0])).toEqual(['Strategic', 'Tactical'])
    expect(optionsOf(game, qs[1])).toEqual(['A', 'B', 'C', 'D'])
  })
})

describe('playing', () => {
  const qs = questionsFor(game, bank)
  it('scores a right answer once and ignores a second tap', () => {
    let s = pick(initialGame(), qs[0], 1)
    expect(s).toEqual({ i: 0, picked: 1, score: 1 })
    s = pick(s, qs[0], 0)
    expect(s.score).toBe(1)
    expect(s.picked).toBe(1)
  })
  it('does not score a wrong answer, and moves on', () => {
    const s = advance(pick(initialGame(), qs[0], 0))
    expect(s).toEqual({ i: 1, picked: -1, score: 0 })
  })
  it('knows when it is finished and labels the last button', () => {
    expect(isDone({ i: 1, picked: -1, score: 0 }, 2)).toBe(false)
    expect(isDone({ i: 2, picked: -1, score: 0 }, 2)).toBe(true)
    expect(nextLabel({ i: 0, picked: 0, score: 0 }, 2)).toBe('Next question')
    expect(nextLabel({ i: 1, picked: 0, score: 0 }, 2)).toBe('See my score')
    expect(progressText({ i: 0, picked: -1, score: 0 }, 2)).toBe('Question 1 of 2')
    expect(progressText({ i: 2, picked: -1, score: 0 }, 2)).toBe('Finished')
  })
})

describe('feedback and score text', () => {
  const q = { q: 'x', cat: 1, why: 'Because.' }
  it('says correct, or not quite with the answer, then the explanation', () => {
    expect(feedback(q, ['A', 'B'], 1)).toEqual({ ok: true, text: 'Correct. Because.' })
    expect(feedback(q, ['A', 'B'], 0)).toEqual({ ok: false, text: 'Not quite. The answer is B. Because.' })
  })
  it('praises a perfect score only', () => {
    expect(resultText(3, 3)).toBe('You got 3 of 3. Perfect. You think like an examiner.')
    expect(resultText(2, 3)).toBe('You got 2 of 3. Try again to push it higher.')
  })
})
