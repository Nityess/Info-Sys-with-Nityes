import { describe, expect, it } from 'vitest'
import { demoLabel, finalStep, inWindow, isVisible, itemClass, itemStyle, nextStep, showsWhenReduced, stageItems } from './demoLogic'
import type { Demo } from './types'

const demo: Demo = {
  h: 80,
  n: 3,
  items: [{ x: 2, y: 4, w: 40, h: 10, t: 'Box', o: { k: 'box', from: 1, f: 2.7 } }],
  caps: ['One.', 'Two.', 'Three.'],
}

describe('demo timeline', () => {
  it('"from" appears at that step and stays; "on" shows only inside its range', () => {
    expect(isVisible({ from: 1 }, 0)).toBe(false)
    expect(isVisible({ from: 1 }, 1)).toBe(true)
    expect(isVisible({ from: 1 }, 2)).toBe(true)
    expect(isVisible({ on: [1, 2] }, 0)).toBe(false)
    expect(isVisible({ on: [1, 2] }, 2)).toBe(true)
    expect(isVisible({ on: [1, 2] }, 3)).toBe(false)
    expect(isVisible({}, 0)).toBe(true)
  })
  it('highlight windows are inclusive and may be missing', () => {
    expect(inWindow([1, 2], 2)).toBe(true)
    expect(inWindow([1, 2], 3)).toBe(false)
    expect(inWindow(null, 0)).toBe(false)
    expect(inWindow(undefined, 0)).toBe(false)
  })
  it('loops back to the first step after the last', () => {
    expect(nextStep(0, 3)).toBe(1)
    expect(nextStep(2, 3)).toBe(0)
    expect(finalStep(demo)).toBe(2)
  })
  it('adds one caption and one progress dot per step', () => {
    const items = stageItems(demo)
    expect(items).toHaveLength(1 + 3 + 3)
    expect(items.filter((i) => i.o.k === 'cap').map((i) => i.o.on)).toEqual([[0, 0], [1, 1], [2, 2]])
    expect(items.filter((i) => i.o.k === 'dot').map((i) => i.o.hi)).toEqual([[0, 0], [1, 1], [2, 2]])
  })
  it('with reduced motion drops captions, dots and the before values', () => {
    expect(showsWhenReduced({ k: 'cap' })).toBe(false)
    expect(showsWhenReduced({ k: 'dot' })).toBe(false)
    expect(showsWhenReduced({ k: 'txt', old: 1 })).toBe(false)
    expect(showsWhenReduced({ k: 'box' })).toBe(true)
  })
  it('lists every caption in the label', () => {
    expect(demoLabel(demo)).toBe('Animated diagram, 3 steps. One. Two. Three.')
  })
})

describe('item layout', () => {
  it('places items as percentages of a 100 wide grid', () => {
    expect(itemStyle(demo.items[0], 80)).toEqual({ left: '2.000%', top: '5.000%', width: '40.000%', height: '12.500%', fontSize: 'max(11px, 2.7cqw)' })
  })
  it('never lets text go under 11px', () => {
    expect(itemStyle({ x: 0, y: 0, w: 1, h: 1, t: '', o: { f: 3 } }, 50).fontSize).toBe('max(11px, 3cqw)')
    expect(itemStyle({ x: 0, y: 0, w: 1, h: 1, t: '', o: { f: 2.1 } }, 50).fontSize).toBe('max(11px, 2.1cqw)')
  })
  it('builds the class list', () => {
    expect(itemClass({ k: 'txt', al: 'l', c: 'bold', row: 1 })).toBe('dm dm-txt dm-row dm-l bold')
    expect(itemClass({})).toBe('dm dm-box')
  })
})
