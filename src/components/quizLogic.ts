import type { QuizItem } from '../content/types'

/** Selected option index per item id. Missing = not answered yet. */
export type QuizAnswers = Readonly<Record<string, number>>

export function isCorrect(item: QuizItem, answers: QuizAnswers): boolean {
  return answers[item.id] === item.answer
}

export function quizScore(items: readonly QuizItem[], answers: QuizAnswers): number {
  return items.filter((i) => isCorrect(i, answers)).length
}

/** Passed only when every item is answered correctly (and there is at least one item). */
export function quizPassed(items: readonly QuizItem[], answers: QuizAnswers): boolean {
  return items.length > 0 && quizScore(items, answers) === items.length
}
