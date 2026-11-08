import { describe, expect, it } from 'vitest'
import { chapters } from '../../content/chapters'
import { drawerRows } from './drawerRows'

describe('drawer rows', () => {
  const rows = drawerRows(chapters, '1.2', new Set(['ch07-t1-3']))
  const topics = rows.flatMap((r) => (r.kind === 'topic' ? [r] : []))

  it('lists all 18 topics under three section headings', () => {
    expect(topics).toHaveLength(18)
    expect(rows.filter((r) => r.kind === 'heading').map((r) => r.text)).toEqual([
      'Section 1 · IT in the Business Environment',
      'Section 2 · Role of Financial Information in Business',
      'Section 3 · Information Systems & IT',
    ])
  })
  it('marks the current topic, done topics and topics that are not playable yet', () => {
    expect(topics.find((t) => t.code === '1.2')).toMatchObject({ current: true, tag: 'Here' })
    expect(topics.find((t) => t.code === '1.3')).toMatchObject({ tag: 'Done' })
    expect(topics.find((t) => t.code === '2.1')).toMatchObject({ href: null, tag: 'Soon' })
    expect(topics.find((t) => t.code === '1.4')?.href).toBe('#/unit/ch07-t1-4')
  })
  it('links the eight built topics and says Soon for 1.1 (no teaching text yet) and Sections 2 and 3', () => {
    expect(topics.filter((t) => t.href).map((t) => t.code)).toEqual(['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9'])
    expect(topics.find((t) => t.code === '1.1')).toMatchObject({ href: null, tag: 'Soon' })
  })
  it('uses no em dashes', () => {
    expect(JSON.stringify(rows)).not.toContain('—')
  })
})
