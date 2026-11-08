import type { QuizItem, QuizSet } from '../../content/chapter7/types'
import { explanationFor } from '../../content/chapter7/explanations'
import type { RailQuizState } from '../rail/railQuizLogic'

export interface QuizEntry {
  item: QuizItem
  /** Key into the explanations file: "mcq", or "mcq2" for the second set of a topic */
  kind: string
  label: 'Original practice' | 'From the study book'
}

/**
 * Every question of a topic as one list, in the order students see them. The two study-book questions
 * are left out unless the teacher turned them on.
 */
export function quizEntries(sets: readonly QuizSet[], showSource: boolean): QuizEntry[] {
  return sets
    .filter((s) => s.kind === 'mcq' && (!s.source || showSource))
    .flatMap((set) => {
      const nth = sets.slice(0, sets.indexOf(set)).filter((x) => x.kind === set.kind && !x.source).length
      const kind = `${set.kind}${nth ? nth + 1 : ''}`
      return set.items.map((item): QuizEntry => ({ item, kind, label: set.source ? 'From the study book' : 'Original practice' }))
    })
}

/** One line on why the answer is right: the file's own reason, else the written explanation, else the answer itself. */
export function explanationOf(code: string, e: QuizEntry): string {
  return e.item.explanation ?? explanationFor(code, e.kind, e.item.id) ?? `The answer is: ${e.item.options[e.item.answer]}.`
}

export type DotState = 'ok' | 'mid' | 'cur' | 'todo'

/** Progress dot for question i: green when right first time, gold when missed, blue for the current one. */
export function dotState(i: number, s: RailQuizState): DotState {
  if (i < s.firstTry.length && (i < s.index || s.finished)) return s.firstTry[i] ? 'ok' : 'mid'
  return i === s.index && !s.finished ? 'cur' : 'todo'
}
