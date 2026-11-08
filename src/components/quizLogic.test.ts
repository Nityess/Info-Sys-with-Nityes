import { describe, expect, it } from 'vitest'
import { isCorrect, quizPassed, quizScore } from './quizLogic'
import type { QuizItem } from '../content/types'

const item = (id: string, answer: number): QuizItem => ({
  id,
  question: 'q',
  options: ['a', 'b', 'c', 'd'],
  answer,
  explanation: 'e',
  source: 's',
})
const items = [item('x', 0), item('y', 3)]

describe('quiz grading', () => {
  it('marks an unanswered item as wrong', () => {
    expect(isCorrect(items[0], {})).toBe(false)
  })
  it('counts correct answers only', () => {
    expect(quizScore(items, { x: 0, y: 1 })).toBe(1)
    expect(quizScore(items, { x: 0, y: 3 })).toBe(2)
  })
  it('passes only when all items are correct', () => {
    expect(quizPassed(items, { x: 0 })).toBe(false)
    expect(quizPassed(items, { x: 0, y: 3 })).toBe(true)
  })
  it('never passes an empty quiz', () => {
    expect(quizPassed([], {})).toBe(false)
  })
})
