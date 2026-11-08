// Pure state machine for the "Quick Match" game: one item at a time, retry until right.

export type ItemResult = 'first' | 'retry'

export interface MatchState {
  index: number
  /** Wrong tries on the current item */
  attempts: number
  /** Last wrong choice on the current item (for the shake) */
  wrong: string | null
  solved: boolean
  finished: boolean
  streak: number
  bestStreak: number
  results: ItemResult[]
}

export const initialMatch = (): MatchState => ({
  index: 0,
  attempts: 0,
  wrong: null,
  solved: false,
  finished: false,
  streak: 0,
  bestStreak: 0,
  results: [],
})

export function chooseAnswer(state: MatchState, correct: string, choice: string): MatchState {
  if (state.solved || state.finished) return state
  if (choice !== correct) return { ...state, attempts: state.attempts + 1, wrong: choice, streak: 0 }
  const first = state.attempts === 0
  const streak = first ? state.streak + 1 : 0
  return {
    ...state,
    solved: true,
    wrong: null,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    results: [...state.results, first ? 'first' : 'retry'],
  }
}

export function nextItem(state: MatchState, total: number): MatchState {
  if (!state.solved) return state
  if (state.index + 1 >= total) return { ...state, finished: true }
  return { ...state, index: state.index + 1, attempts: 0, wrong: null, solved: false }
}

export function firstTryCount(state: MatchState): number {
  return state.results.filter((r) => r === 'first').length
}

/** 1–3 stars from the share of items answered right first time. */
export function stars(firstTry: number, total: number): number {
  if (total === 0) return 0
  const r = firstTry / total
  return r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1
}
