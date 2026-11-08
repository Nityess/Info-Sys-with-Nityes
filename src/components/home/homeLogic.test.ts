import { describe, expect, it } from 'vitest'
import { chapters } from '../../content/chapters'
import { EXAM, HOW_STEPS, PAPER_SPLIT, TOPIC_CARDS, splitPercent } from './homeData'
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
  it('has one key line for every Chapter 7 topic, and only CATIVA is a source mnemonic', () => {
    expect(Object.keys(TOPIC_CARDS).sort()).toEqual(TOPICS.map((t) => t.code).sort())
    expect(Object.entries(TOPIC_CARDS).filter(([, c]) => c.sourceMnemonic).map(([k, c]) => [k, c.sourceMnemonic])).toEqual([['1.9', 'CATIVA']])
  })
  it('describes the eight parts of a topic and flags only the playground step', () => {
    expect(HOW_STEPS).toHaveLength(8)
    expect(HOW_STEPS.filter((s) => 'gold' in s).map((s) => s.title)).toEqual(['Playground'])
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
  it('lists chapters 7 to 10 in order, built ones open and the rest coming soon', () => {
    expect(cards.map((c) => [c.number, c.status])).toEqual([
      [7, 'open'],
      [8, 'soon'],
      [9, 'soon'],
      [10, 'open'],
    ])
  })
  it('counts built lessons honestly', () => {
    expect(cards[0]).toMatchObject({ built: 8, total: 18 })
    expect(cards[3]).toMatchObject({ built: 3, total: 5 })
    expect(cards[1].unitId).toBeUndefined()
  })
  it('points a chapter at its next unfinished lesson and tracks progress', () => {
    const c = chapterCards(chapters, new Set(['ch10-lo7a']))[3]
    expect(c.unitId).toBe('ch10-lo7b')
    expect(c.started).toBe(true)
    expect(c.percent).toBe(20)
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

describe('topic card titles', () => {
  it('has a short card title for every topic, with no em dashes', async () => {
    const { TOPIC_CARDS } = await import('./homeData')
    const { TOPICS } = await import('../../content/chapters/ch07/topics')
    for (const t of TOPICS) {
      expect(TOPIC_CARDS[t.code]?.title, t.code).toBeTruthy()
      expect(TOPIC_CARDS[t.code].title).not.toContain('\u2014')
    }
    expect(TOPIC_CARDS['1.9'].title).toBe('Information processing')
  })
})
