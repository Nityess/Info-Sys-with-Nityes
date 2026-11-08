import type { ConceptCard, PracticeItem } from '../../content/types'

/** One swipe card: a scenario plus a proposed label, which is either the right one or a wrong one. */
export interface SwipeCard {
  id: string
  text: string
  /** Label being proposed for this scenario */
  shown: ConceptCard
  /** True when `shown` is the correct label */
  truth: boolean
  /** Correct label, used in feedback */
  correct: ConceptCard
  why: string
}

/**
 * Builds a deck from practice items. Cards alternate right label, wrong label, so swiping
 * "matches" every time never scores well. Deterministic, so tests and replays are stable.
 */
export function buildSwipeDeck(items: readonly PracticeItem[], cards: readonly ConceptCard[]): SwipeCard[] {
  const n = cards.length
  if (n < 2) return []
  return items.flatMap((item, i) => {
    const at = cards.findIndex((c) => c.id === item.bucket)
    if (at < 0) return []
    const truth = i % 2 === 0
    const shown = truth ? cards[at] : cards[(at + 1 + (i % (n - 1))) % n]
    return [{ id: item.id, text: item.text, shown, truth, correct: cards[at], why: item.why }]
  })
}

export interface SwipeState {
  index: number
  /** Set once the current card has been answered */
  answered: { said: boolean; correct: boolean } | null
  correctCount: number
  streak: number
  bestStreak: number
  finished: boolean
}

export const initialSwipe = (): SwipeState => ({
  index: 0,
  answered: null,
  correctCount: 0,
  streak: 0,
  bestStreak: 0,
  finished: false,
})

/** `said` = true means "this label matches the scenario". */
export function answerSwipe(state: SwipeState, card: SwipeCard, said: boolean): SwipeState {
  if (state.answered || state.finished) return state
  const correct = said === card.truth
  const streak = correct ? state.streak + 1 : 0
  return {
    ...state,
    answered: { said, correct },
    correctCount: state.correctCount + (correct ? 1 : 0),
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
  }
}

export function nextSwipe(state: SwipeState, total: number): SwipeState {
  if (!state.answered) return state
  if (state.index + 1 >= total) return { ...state, finished: true }
  return { ...state, index: state.index + 1, answered: null }
}
