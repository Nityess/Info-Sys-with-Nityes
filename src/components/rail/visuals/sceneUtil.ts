import type { CSSProperties } from 'react'

/** Animation delay for the .sc-* motion classes, in seconds. */
export const d = (seconds: number): CSSProperties => ({ '--d': `${seconds.toFixed(2)}s` }) as CSSProperties

/** Flip state of a set of cards: toggles one index without touching the others. */
export const toggleIn = (set: ReadonlySet<number>, i: number): Set<number> => {
  const next = new Set(set)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  return next
}
