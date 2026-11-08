import { describe, expect, it } from 'vitest'
import { chapters, previewChapters } from '../../content/chapters'
import { drawerRows } from './drawerRows'

describe('drawer rows', () => {
  const rows = drawerRows(previewChapters, '1.2', new Set(['ch07-t1-3']))
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
  it('gives students (the current Chapter 7) no links into the rebuild', () => {
    const student = drawerRows(chapters, '1.2', new Set()).flatMap((r) => (r.kind === 'topic' ? [r] : []))
    expect(student.every((t) => t.href === null || t.current)).toBe(true)
  })
  it('uses no em dashes', () => {
    expect(JSON.stringify(rows)).not.toContain('—')
  })
})
