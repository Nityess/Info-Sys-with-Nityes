import type { Demo, DemoItem, DemoOpts } from './types'

/** Each step of a demo stays on screen for this long; the loop is steps times this. */
export const STEP_MS = 3500

/** The demo's own items plus one caption per step and one progress dot per step (both added automatically). */
export function stageItems(demo: Demo): DemoItem[] {
  const { h, n, caps } = demo
  const items = demo.items.slice()
  caps.forEach((c, k) => items.push({ x: 2, y: h - 18, w: 96, h: 11, t: c, o: { k: 'cap', on: [k, k] } }))
  for (let k = 0; k < n; k++) items.push({ x: 50 - n * 2.2 + k * 4.4 + 0.9, y: h - 4.2, w: 2.6, h: 2.6, t: '', o: { k: 'dot', hi: [k, k] } })
  return items
}

/** Is the item on screen at this step? `from` means "from this step on", `on` means "only in these steps". */
export function isVisible(o: DemoOpts, step: number): boolean {
  if (o.from != null && step < o.from) return false
  if (o.on && (step < o.on[0] || step > o.on[1])) return false
  return true
}

export const inWindow = (w: readonly [number, number] | null | undefined, step: number): boolean => !!w && step >= w[0] && step <= w[1]

/** With reduced motion the demo does not play: it shows its last step, without captions, dots or the "before" values. */
export const showsWhenReduced = (o: DemoOpts): boolean => o.k !== 'cap' && o.k !== 'dot' && !o.old

export const finalStep = (demo: Demo): number => demo.n - 1

export const nextStep = (step: number, n: number): number => (step + 1) % n

export const demoLabel = (demo: Demo): string => `Animated diagram, ${demo.caps.length} steps. ${demo.caps.join(' ')}`

const pct = (v: number, total: number): string => `${((v / total) * 100).toFixed(3)}%`

/** Position and size on the 100 wide grid, as percentages of the stage. */
export function itemStyle(it: DemoItem, height: number): Record<string, string> {
  const style: Record<string, string> = { left: pct(it.x, 100), top: pct(it.y, height), width: pct(it.w, 100), height: pct(it.h, height) }
  if (it.o.f) style.fontSize = `max(11px, ${it.o.f}cqw)`
  return style
}

export function itemClass(o: DemoOpts): string {
  const cls = ['dm', `dm-${o.k ?? 'box'}`]
  if (o.row) cls.push('dm-row')
  if (o.al) cls.push(`dm-${o.al}`)
  if (o.c) cls.push(o.c)
  return cls.join(' ')
}
