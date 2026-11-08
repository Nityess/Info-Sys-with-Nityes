import type { Scene } from './types'

const pct = (v: number, total: number): string => `${((v / total) * 100).toFixed(2)}%`

export const NODE_CLASS: Record<string, string> = { in: 'ty-st', pr: 'ty-ta', out: 'ty-op', bad: 'ty-pl', env: 'nd-env', it: 'nd-it', def: 'nd-def' }

export const nodeClass = (k: string | undefined): string => NODE_CLASS[k ?? ''] ?? 'nd-def'

/** The first node inside each region carries that region's label, which phones show instead of the region box. */
export function zoneLabels(scene: Scene): string[] {
  const seen = new Set<number>()
  return scene.nodes.map((n) => {
    for (let ri = 0; ri < scene.regions.length; ri++) {
      const r = scene.regions[ri]
      if (n.x >= r.x && n.x + n.w <= r.x + r.w + 0.1 && n.y >= r.y && n.y + n.h <= r.y + r.h + 0.1) {
        if (seen.has(ri)) return ''
        seen.add(ri)
        return r.label
      }
    }
    return ''
  })
}

export function regionStyle(r: Scene['regions'][number], h: number): Record<string, string> {
  return { left: pct(r.x - 0.9, 100), top: pct(r.y, h), width: pct(r.w + 1.8, 100), height: pct(r.h, h) }
}

export function nodeStyle(n: Scene['nodes'][number], h: number): Record<string, string> {
  return { left: pct(n.x, 100), top: pct(n.y, h), width: pct(n.w, 100), height: pct(n.h, h) }
}

/** A link between two nodes: horizontal when they sit on one row, vertical otherwise. */
export function linkGeometry(scene: Scene, link: readonly [number, number]): { dir: 'h' | 'v'; style: Record<string, string> } {
  const a = scene.nodes[link[0]]
  const b = scene.nodes[link[1]]
  const h = scene.h
  if (Math.abs(a.y - b.y) < 1) {
    const x1 = a.x + a.w
    return { dir: 'h', style: { left: pct(x1, 100), top: pct(a.y + a.h / 2, h), width: pct(b.x - x1, 100) } }
  }
  const y1 = a.y + a.h
  return { dir: 'v', style: { left: pct(a.x + a.w / 2, 100), top: pct(y1, h), height: pct(b.y - y1, h) } }
}
