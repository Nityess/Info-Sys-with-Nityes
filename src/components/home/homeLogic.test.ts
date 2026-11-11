import { describe, expect, it } from 'vitest'
import { chapters } from '../../content/chapters'
import { EXAM, PAPER_SPLIT, splitPercent } from './homeData'
import { SECTIONS, TOPICS } from '../../content/chapters/ch07/topics'
import { chapterCards, heroAction, isBuilt, topicHref } from './homeLogic'

describe('landing facts', () => {
  it('learning outcome marks add up to Part B', () => {
    expect(EXAM.outcomes.reduce((n, o) => n + o.marks, 0)).toBe(EXAM.partBMarks)
    expect(EXAM.partBMarks * 2).toBe(EXAM.paperMarks)
  })
  it('matches the weights stored on the chapters', () => {
    for (const ch of chapters) {
      const o = EXAM.outcomes.find((x) => x.lo === ch.lo)
      expect(o?.marks, ch.id).toBe(ch.weight)
      expect(o?.chapter, ch.id).toBe(ch.number)
    }
  })
})

describe('landing page facts', () => {
  it('splits Part B marks 30 and 20, which is 60 and 40 percent', () => {
    expect(PAPER_SPLIT.objective + PAPER_SPLIT.subjective).toBe(EXAM.partBMarks)
    expect(splitPercent()).toEqual({ objective: 60, subjective: 40 })
  })
  it('counts 18 topics in 3 sections, 9 plus 5 plus 4', () => {
    expect(TOPICS).toHaveLength(18)
    expect(SECTIONS.map((s) => TOPICS.filter((t) => t.section === s.id).length)).toEqual([9, 5, 4])
  })
})

describe('heroAction', () => {
  it('starts at the first built unit for a new student', () => {
    const a = heroAction(chapters, new Set())!
    expect(a.label).toBe('Start Chapter 7')
    expect(a.unit.id).toBe('ch07-t1-2')
    expect(a.returning).toBe(false)
  })
  it('continues at the next unfinished built unit', () => {
    const a = heroAction(chapters, new Set(['ch07-t1-2']))!
    expect(a.label).toBe('Continue your lesson')
    expect(a.unit.id).toBe('ch07-t1-3')
  })
  it('offers a review once every built unit is done, and skips unbuilt ones', () => {
    const all = new Set(chapters.flatMap((c) => c.units).filter(isBuilt).map((u) => u.id))
    expect(heroAction(chapters, all)!.label).toBe('Review a lesson')
    expect(heroAction([], new Set())).toBeUndefined()
  })
})

describe('chapterCards', () => {
  const cards = chapterCards(chapters, new Set())
  it('lists chapters 7 to 10 in order, all open', () => {
    expect(cards.map((c) => [c.number, c.status])).toEqual([
      [7, 'open'],
      [8, 'open'],
      [9, 'open'],
      [10, 'open'],
    ])
  })
  it('counts built lessons honestly', () => {
    expect(cards[0]).toMatchObject({ built: 8, total: 18 })
    expect(cards[1].unitId).toBeUndefined()
    expect(cards[1]).toMatchObject({ href: '#/chapter8/s1', row: ['Topic boards', '3 sections'] })
  })
  it('opens Chapter 9 as the simulator hub, marked New, and counts explored simulators', () => {
    expect(cards[2]).toMatchObject({ number: 9, href: '#/chapter9', row: ['Simulators', '17 live'], badge: 'New', started: false })
    expect(cards[2].unitId).toBeUndefined()
    const after = chapterCards(chapters, new Set(), new Set(['ch09-1-1', 'ch09-2-5', 'ch07-t1-2']))[2]
    expect(after).toMatchObject({ row: ['Explored', '2 of 17'], started: true })
  })
  it('opens Chapter 10 as its own page', () => {
    expect(cards[3]).toMatchObject({ number: 10, href: '#/chapter10', row: ['Topics', '8 in 2 sections'] })
    expect(cards[3].unitId).toBeUndefined()
  })
  it('points Chapter 7 at its next unfinished lesson and tracks progress', () => {
    const c = chapterCards(chapters, new Set(['ch07-t1-2']))[0]
    expect(c.unitId).toBe('ch07-t1-3')
    expect(c.started).toBe(true)
  })
})

describe('topicHref', () => {
  it('links only the built topics, 1.2 to 1.9; the rest show Soon', () => {
    const linked = TOPICS.filter((t) => topicHref(chapters, t.code)).map((t) => t.code)
    expect(linked).toEqual(['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9'])
    expect(topicHref(chapters, '1.5')).toBe('#/unit/ch07-t1-5')
    expect(topicHref(chapters, '1.1')).toBeNull()
  })
})
