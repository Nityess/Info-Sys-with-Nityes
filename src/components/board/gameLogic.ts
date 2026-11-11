import type { Game, Mcq, Question } from './types'

/** Turns the game's items into questions. A real question is looked up in the question bank and keeps its own options and explanation. */
export function questionsFor(game: Game, bank: readonly Mcq[]): Question[] {
  return game.items.flatMap((it): Question[] => {
    if (!('mcq' in it)) return [{ q: it.q, cat: it.cat, why: it.why }]
    const m = bank.find((x) => x.n === it.mcq)
    return m ? [{ q: `Exam question Q${m.n}: ${m.q}`, cat: m.ans, why: m.why, opts: m.opts }] : []
  })
}

export const optionsOf = (game: Game, q: Question): string[] => q.opts ?? game.cats

export interface GameState {
  /** Index of the question on screen; equals the number of questions when finished */
  i: number
  /** Option picked for this question, or -1 */
  picked: number
  score: number
}

export const initialGame = (): GameState => ({ i: 0, picked: -1, score: 0 })

/** Records an answer. A second tap on the same question changes nothing. */
export function pick(s: GameState, q: Question, option: number): GameState {
  if (s.picked >= 0) return s
  return { ...s, picked: option, score: s.score + (option === q.cat ? 1 : 0) }
}

export const advance = (s: GameState): GameState => ({ ...s, i: s.i + 1, picked: -1 })

export const isDone = (s: GameState, total: number): boolean => s.i >= total

export const progressText = (s: GameState, total: number): string => (isDone(s, total) ? 'Finished' : `Question ${s.i + 1} of ${total}`)

export const nextLabel = (s: GameState, total: number): string => (s.i + 1 >= total ? 'See my score' : 'Next question')

/** The line shown after an answer: correct or not quite, then the explanation. */
export function feedback(q: Question, options: readonly string[], picked: number): { ok: boolean; text: string } {
  const ok = picked === q.cat
  return { ok, text: `${ok ? 'Correct. ' : `Not quite. The answer is ${options[q.cat]}. `}${q.why}` }
}

export const resultText = (score: number, total: number): string =>
  `You got ${score} of ${total}. ${score === total ? 'Perfect. You think like an examiner.' : 'Try again to push it higher.'}`
