import { describe, expect, it } from 'vitest'
import { EXAM } from './homeData'
import { cardFact, cardHref, cardStatus, chapterCards } from './homeLogic'

describe('landing facts', () => {
  it('learning outcome marks add up to Part B', () => {
    expect(EXAM.outcomes.reduce((n, o) => n + o.marks, 0)).toBe(EXAM.partBMarks)
    expect(EXAM.partBMarks * 2).toBe(EXAM.paperMarks)
  })
})

describe('chapterCards', () => {
  const cards = chapterCards()
  it('lists chapters 7 to 10 in order, all open', () => {
    expect(cards.map((c) => [c.number, c.status])).toEqual([
      [7, 'open'],
      [8, 'open'],
      [9, 'open'],
      [10, 'open'],
    ])
  })
  it('matches the learning outcome weights and chapter numbers', () => {
    for (const c of cards) {
      const o = EXAM.outcomes.find((x) => x.lo === c.lo)
      expect(o?.marks, c.lo).toBe(c.weight)
      expect(o?.chapter, c.lo).toBe(c.number)
    }
  })
  it('opens Chapter 7 and Chapter 8 as their own pages', () => {
    expect(cards[0]).toMatchObject({ number: 7, href: '#/chapter7', row: ['Topics', '18 in 3 sections'] })
    expect(cards[1]).toMatchObject({ number: 8, href: '#/chapter8', row: ['Topics', '20 in 3 sections'] })
  })
  it('opens Chapter 9 as the simulator hub, marked New, and counts explored simulators', () => {
    expect(cards[2]).toMatchObject({ number: 9, href: '#/chapter9', row: ['Simulators', '17 live'], badge: 'New', blurb: expect.any(String), started: false })
    const after = chapterCards(new Set(['ch09-1-1', 'ch09-2-5', 'ch07-t1-2']))[2]
    expect(after).toMatchObject({ row: ['Explored', '2 of 17'], started: true })
  })
  it('opens Chapter 10 as its own page', () => {
    expect(cards[3]).toMatchObject({ number: 10, href: '#/chapter10', row: ['Topics', '8 in 2 sections'] })
  })
})

describe('chapter card helpers', () => {
  const cards = chapterCards()
  it('links every chapter to its own page', () => {
    expect(cards.map(cardHref)).toEqual(['#/chapter7', '#/chapter8', '#/chapter9', '#/chapter10'])
  })
  it('gives every chapter one fact line', () => {
    expect(cardFact(cards[0])).toEqual(['Topics', '18 in 3 sections'])
    expect(cardFact(cards[2])).toEqual(['Simulators', '17 live'])
  })
  it('shows marks that add up to Part B, in the order of the chapters', () => {
    expect(cards.map((c) => c.weight)).toEqual([10, 15, 15, 10])
    expect(cards.reduce((n, c) => n + c.weight, 0)).toBe(EXAM.partBMarks)
  })
})

const cards = chapterCards()
describe('cardStatus', () => {
  it('says Open for plain chapters, New with the simulator count for Chapter 9, and Explored once started', () => {
    const cards = chapterCards()
    expect(cardStatus(cards[0])).toEqual({ text: 'Open', isNew: false })
    expect(cardStatus(cards[2])).toEqual({ text: 'New · 17 simulators', isNew: true })
    const after = chapterCards(new Set(['ch09-1-1']))[2]
    expect(cardStatus(after)).toEqual({ text: 'Explored 1 of 17', isNew: false })
  })
  it('gives every chapter a blurb and a button label', () => {
    for (const c of cards) {
      expect(c.blurb.length).toBeGreaterThan(20)
      expect(c.cta).toMatch(/^Open/)
    }
  })
})
