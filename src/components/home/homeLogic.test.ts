import { describe, expect, it } from 'vitest'
import { chapters } from '../../content/chapters'
import { EXAM } from './homeData'
import { chapterCards, heroAction, isBuilt } from './homeLogic'

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

describe('heroAction', () => {
  it('starts at the first built unit for a new student', () => {
    const a = heroAction(chapters, new Set())!
    expect(a.label).toBe('Start the first lesson')
    expect(a.unit.id).toBe(chapters[0].units[0].id)
    expect(a.returning).toBe(false)
  })
  it('continues at the next unfinished built unit', () => {
    const first = chapters[0].units[0].id
    const a = heroAction(chapters, new Set([first]))!
    expect(a.label).toBe('Continue your lesson')
    expect(a.unit.id).toBe(chapters[0].units[1].id)
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
    expect(cards[0]).toMatchObject({ built: 15, total: 15 })
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
