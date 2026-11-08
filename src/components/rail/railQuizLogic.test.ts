import { describe, expect, it } from 'vitest'
import { REVEAL_AFTER, initialRailQuiz, nextQuestion, nudge, pickOption, praise, score, showsExplanation } from './railQuizLogic'

describe('rail quiz', () => {
  it('counts a right first pick as first try', () => {
    const s = pickOption(initialRailQuiz(), 1, 1)
    expect(s.solved).toBe(true)
    expect(s.firstTry).toEqual([true])
  })
  it('lets the student retry after a wrong pick, but then it is not first try', () => {
    let s = pickOption(initialRailQuiz(), 1, 0)
    expect(s.solved).toBe(false)
    expect(s.wrong).toEqual([0])
    s = pickOption(s, 1, 1)
    expect(s.solved).toBe(true)
    expect(s.firstTry).toEqual([false])
  })
  it('ignores a repeated wrong pick and picks after solving', () => {
    const wrong = pickOption(initialRailQuiz(), 1, 0)
    expect(pickOption(wrong, 1, 0)).toBe(wrong)
    const solved = pickOption(initialRailQuiz(), 1, 1)
    expect(pickOption(solved, 1, 2)).toBe(solved)
  })
  it('shows the explanation once solved or after enough wrong tries', () => {
    expect(showsExplanation(initialRailQuiz())).toBe(false)
    let s = initialRailQuiz()
    for (let o = 0; o < REVEAL_AFTER; o++) s = pickOption(s, 3, o)
    expect(showsExplanation(s)).toBe(true)
    expect(showsExplanation(pickOption(initialRailQuiz(), 3, 3))).toBe(true)
  })
  it('will not move on before the answer is known, and scores a given-up question as not first try', () => {
    const fresh = initialRailQuiz()
    expect(nextQuestion(fresh, 3)).toBe(fresh)
    let s = initialRailQuiz()
    for (let o = 0; o < REVEAL_AFTER; o++) s = pickOption(s, 3, o)
    const moved = nextQuestion(s, 3)
    expect(moved.index).toBe(1)
    expect(moved.firstTry).toEqual([false])
  })
  it('finishes after the last question with the first-try score', () => {
    let s = pickOption(initialRailQuiz(), 0, 0)
    s = nextQuestion(s, 2)
    s = pickOption(s, 0, 0)
    s = nextQuestion(s, 2)
    expect(s.finished).toBe(true)
    expect(score(s)).toBe(2)
  })
  it('has varied, stable encouragement', () => {
    expect(praise(0)).not.toBe(praise(1))
    expect(nudge(0)).toBe(nudge(0))
    expect(praise(0)).toMatch(/\.$/)
  })
})
