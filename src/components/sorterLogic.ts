// Generic logic for "sort each item into one bucket" labs.

export interface SortItem<B extends string = string> {
  id: string
  text: string
  bucket: B
  /** Shown when the student picks the right bucket */
  why: string
}

/** Chosen bucket per item id. */
export type SortAnswers<B extends string = string> = Readonly<Record<string, B>>

export function scoreSort<B extends string>(answers: SortAnswers<B>, items: readonly SortItem<B>[]): number {
  return items.filter((s) => answers[s.id] === s.bucket).length
}

export function answeredCount<B extends string>(answers: SortAnswers<B>, items: readonly SortItem<B>[]): number {
  return items.filter((s) => answers[s.id] !== undefined).length
}

export function isComplete<B extends string>(answers: SortAnswers<B>, items: readonly SortItem<B>[]): boolean {
  return items.length > 0 && answeredCount(answers, items) === items.length
}
