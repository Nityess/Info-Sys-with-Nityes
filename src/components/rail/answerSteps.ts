import { parseBlocks } from './mdParse'

export interface AnswerStep {
  /** "p" is a paragraph; "li" is a bullet or numbered point that joins the list above it */
  kind: 'p' | 'li'
  text: string
  /** Consecutive list points share a list id so they render inside one list */
  list: number
  ordered: boolean
}

/**
 * Breaks a suggested answer into the points a student writes one after another:
 * each paragraph and each bullet is one step.
 */
export function answerSteps(md: string): AnswerStep[] {
  const steps: AnswerStep[] = []
  let list = 0
  for (const b of parseBlocks(md)) {
    if (b.t === 'p') steps.push({ kind: 'p', text: b.text, list: -1, ordered: false })
    else if (b.t === 'ul' || b.t === 'ol') {
      list++
      for (const text of b.items) steps.push({ kind: 'li', text, list, ordered: b.t === 'ol' })
    }
  }
  return steps
}
