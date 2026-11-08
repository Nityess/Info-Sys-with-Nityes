// State machine for the rail quiz: one question per screen, retry allowed,
// and the score counts only answers that were right on the first try.

export interface RailQuizState {
  index: number
  /** Wrong options tried on the current question */
  wrong: number[]
  solved: boolean
  /** Per question, true when it was right on the first try */
  firstTry: boolean[]
  finished: boolean
}

export const initialRailQuiz = (): RailQuizState => ({ index: 0, wrong: [], solved: false, firstTry: [], finished: false })

/** After this many wrong tries the answer is shown, so nobody gets stuck. */
export const REVEAL_AFTER = 2

export function pickOption(state: RailQuizState, answer: number, option: number): RailQuizState {
  if (state.solved || state.finished || state.wrong.includes(option)) return state
  if (option !== answer) return { ...state, wrong: [...state.wrong, option] }
  return { ...state, solved: true, firstTry: [...state.firstTry, state.wrong.length === 0] }
}

/** True once the answer and its explanation should be on screen. */
export const showsExplanation = (state: RailQuizState): boolean => state.solved || state.wrong.length >= REVEAL_AFTER

/** If the student has given up on a question, move on and count it as not first try. */
export function nextQuestion(state: RailQuizState, total: number): RailQuizState {
  if (!showsExplanation(state)) return state
  const firstTry = state.solved ? state.firstTry : [...state.firstTry, false]
  if (state.index + 1 >= total) return { ...state, firstTry, solved: true, finished: true }
  return { index: state.index + 1, wrong: [], solved: false, firstTry, finished: false }
}

export const score = (state: RailQuizState): number => state.firstTry.filter(Boolean).length

const PRAISE = ['Spot on.', 'Exactly the exam point.', 'Well reasoned.', 'Right, and clearly thought through.', 'That is the one.']
const NUDGE = ['Close. Look again at the clue in the question.', 'Not that one. Check what the question is really asking.', 'Nearly. Re-read the key words and try another option.']

/** Varied encouragement, chosen by question number so it is stable between renders. */
export const praise = (i: number): string => PRAISE[i % PRAISE.length]
export const nudge = (i: number): string => NUDGE[i % NUDGE.length]
