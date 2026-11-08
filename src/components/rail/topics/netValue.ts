// Topic 1.5 maths. Net Value = Extra Benefits − Extra Costs, exactly as in the teaching file.

export type Verdict = 'positive' | 'negative' | 'zero'

export const netValue = (extraBenefit: number, extraCost: number): number => extraBenefit - extraCost

export function verdictOf(net: number): Verdict {
  if (net > 0) return 'positive'
  return net < 0 ? 'negative' : 'zero'
}

/** The file's own wording for what each result means. */
export const VERDICT_TEXT: Record<Verdict, string> = {
  positive: 'Positive net value: obtaining the information is worthwhile.',
  negative: 'Negative net value: obtaining the information is not worthwhile.',
  zero: 'Zero net value: financially, the extra benefits and costs are equal.',
}

/** Nepali digit grouping with a true minus sign, e.g. "NPR 2,50,000" or "− NPR 10,000". */
export function formatNpr(n: number): string {
  return `${n < 0 ? '− ' : ''}NPR ${Math.abs(n).toLocaleString('en-IN')}`
}

export interface Preset {
  label: string
  benefit: number
  cost: number
  /** Which result the teaching file says this example gives */
  expect: Verdict
}

/** The three examples named in the topic. */
export const PRESETS: Preset[] = [
  { label: '9,000 vs 10,000', benefit: 9000, cost: 10000, expect: 'negative' },
  { label: '2,50,000 vs 1,50,000', benefit: 250000, cost: 150000, expect: 'positive' },
  { label: '1,20,000 vs 1,20,000', benefit: 120000, cost: 120000, expect: 'zero' },
]

export const SLIDER_MAX = 300000
export const SLIDER_STEP = 1000

/**
 * Tilt of the balance beam in degrees: positive tips the cost (right) side down.
 * Uses a square root so a small gap (say NPR 10,000) still visibly tips the scale,
 * and saturates at ±14 so a big gap does not look broken.
 */
export function beamAngle(extraBenefit: number, extraCost: number, scale = SLIDER_MAX / 2): number {
  const gap = extraCost - extraBenefit
  return Math.sign(gap) * Math.min(1, Math.sqrt(Math.abs(gap) / scale)) * 14
}
