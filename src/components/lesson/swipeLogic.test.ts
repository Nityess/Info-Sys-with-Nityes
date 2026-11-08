import { describe, expect, it } from 'vitest'
import { answerSwipe, buildSwipeDeck, initialSwipe, nextSwipe } from './swipeLogic'
import { accurate } from '../../content/chapters/ch07/sectionA1'

const cards = accurate.cards!
const practice = accurate.practice!

describe('buildSwipeDeck', () => {
  const deck = buildSwipeDeck(practice, cards)
  it('makes one card per practice item', () => {
    expect(deck).toHaveLength(practice.length)
  })
  it('alternates right and wrong labels, and wrong labels never equal the correct one', () => {
    deck.forEach((c, i) => {
      expect(c.truth).toBe(i % 2 === 0)
      expect(c.shown.id === c.correct.id).toBe(c.truth)
    })
  })
  it('is deterministic', () => {
    expect(buildSwipeDeck(practice, cards).map((c) => c.shown.id)).toEqual(deck.map((c) => c.shown.id))
  })
  it('returns nothing without at least two labels and skips unknown buckets', () => {
    expect(buildSwipeDeck(practice, cards.slice(0, 1))).toEqual([])
    expect(buildSwipeDeck([{ id: 'x', bucket: 'nope', text: '', why: '' }], cards)).toEqual([])
  })
})

describe('swipe state', () => {
  const deck = buildSwipeDeck(practice, cards)
  it('scores a correct read and builds a streak', () => {
    let s = answerSwipe(initialSwipe(), deck[0], deck[0].truth)
    expect(s.answered?.correct).toBe(true)
    s = nextSwipe(s, deck.length)
    s = answerSwipe(s, deck[1], deck[1].truth)
    expect(s.streak).toBe(2)
    expect(s.correctCount).toBe(2)
  })
  it('a wrong read resets the streak but keeps the best', () => {
    let s = answerSwipe(initialSwipe(), deck[0], deck[0].truth)
    s = nextSwipe(s, deck.length)
    s = answerSwipe(s, deck[1], !deck[1].truth)
    expect(s.streak).toBe(0)
    expect(s.bestStreak).toBe(1)
    expect(s.correctCount).toBe(1)
  })
  it('ignores a second answer and a next before answering', () => {
    const s = answerSwipe(initialSwipe(), deck[0], true)
    expect(answerSwipe(s, deck[0], false)).toBe(s)
    const fresh = initialSwipe()
    expect(nextSwipe(fresh, deck.length)).toBe(fresh)
  })
  it('finishes after the last card', () => {
    const s = nextSwipe(answerSwipe(initialSwipe(), deck[0], true), 1)
    expect(s.finished).toBe(true)
  })
})
