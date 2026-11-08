import { describe, expect, it } from 'vitest'
import { linkGeometry, nodeClass, zoneLabels } from './sceneLogic'
import { stepTopic } from './boardNav'
import type { Scene } from './types'

const scene: Scene = {
  h: 60,
  regions: [{ x: 1, y: 1, w: 98, h: 28, label: 'Top row', k: 'bd' }, { x: 1, y: 32, w: 98, h: 27, label: 'Bottom row', k: 'it' }],
  nodes: [
    { x: 3, y: 8, w: 22, h: 17, ic: 'gear', t: 'A', s: 'a', k: 'in' },
    { x: 27, y: 8, w: 22, h: 17, ic: 'gear', t: 'B', s: 'b', k: 'pr' },
    { x: 3, y: 40, w: 18, h: 15, t: 'C', s: 'c', k: 'zzz' },
  ],
  links: [[0, 1], [0, 2]],
}

describe('node scene', () => {
  it('puts each region label on the first node inside it only', () => {
    expect(zoneLabels(scene)).toEqual(['Top row', '', 'Bottom row'])
  })
  it('routes a link across a row, or down between rows', () => {
    expect(linkGeometry(scene, [0, 1])).toEqual({ dir: 'h', style: { left: '25.00%', top: '27.50%', width: '2.00%' } })
    expect(linkGeometry(scene, [0, 2]).dir).toBe('v')
  })
  it('maps node kinds to the four type colours and falls back to the default', () => {
    expect(nodeClass('in')).toBe('ty-st')
    expect(nodeClass('pr')).toBe('ty-ta')
    expect(nodeClass('out')).toBe('ty-op')
    expect(nodeClass('bad')).toBe('ty-pl')
    expect(nodeClass('zzz')).toBe('nd-def')
    expect(nodeClass(undefined)).toBe('nd-def')
  })
})

describe('previous and next topic', () => {
  const topics = [{ id: '1.1' }, { id: '1.2' }, { id: '1.3' }]
  it('wraps round at both ends', () => {
    expect(stepTopic(topics, '1.1', 1)).toBe('1.2')
    expect(stepTopic(topics, '1.3', 1)).toBe('1.1')
    expect(stepTopic(topics, '1.1', -1)).toBe('1.3')
  })
})
