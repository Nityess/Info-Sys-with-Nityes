// The small sample playground on the landing page: a tipping scale with plus and minus buttons.
// Simplified from the real Topic 1.5 playground, on sample numbers (0 to 100).

export const SAMPLE_START = { benefit: 60, cost: 40 }
export const SAMPLE_STEP = 10

export const clamp100 = (v: number): number => Math.max(0, Math.min(100, v))

export type SampleVerdict = 'worth' | 'not-worth' | 'level'

export function sampleVerdict(benefit: number, cost: number): { kind: SampleVerdict; head: string; text: string } {
  if (benefit > cost) return { kind: 'worth', head: 'Worth getting.', text: 'The extra benefit is higher than the extra cost.' }
  if (benefit < cost) return { kind: 'not-worth', head: 'Not worth getting.', text: 'The extra cost is higher than the extra benefit.' }
  return { kind: 'level', head: 'Level.', text: 'The extra benefit equals the extra cost.' }
}

export interface ScaleGeometry {
  lx: number
  ly: number
  rx: number
  ry: number
  /** Top of each pan, below the beam end */
  lpy: number
  rpy: number
}

/** Beam ends and pan positions. The heavier side sits lower; the tilt stops at 18 degrees. */
export function scaleGeometry(benefit: number, cost: number): ScaleGeometry {
  const tilt = Math.max(-18, Math.min(18, (benefit - cost) * 0.3))
  const r = (-tilt * Math.PI) / 180
  const lx = 130 - 90 * Math.cos(r)
  const ly = 50 - 90 * Math.sin(r)
  const rx = 130 + 90 * Math.cos(r)
  const ry = 50 + 90 * Math.sin(r)
  return { lx, ly, rx, ry, lpy: ly + 16, rpy: ry + 16 }
}
