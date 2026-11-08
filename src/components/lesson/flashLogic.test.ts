import { describe, expect, it } from 'vitest'
import { flip, gotIt, initialFlash, isDone, mastered, stillLearning } from './flashLogic'

describe('flashcard deck', () => {
  it('needs a flip before a card can be rated', () => {
    const s = initialFlash(['a', 'b'])
    expect(gotIt(s)).toBe(s)
    expect(stillLearning(s)).toBe(s)
  })
  it('got it removes the card and resets the flip', () => {
    const s = gotIt(flip(initialFlash(['a', 'b'])))
    expect(s.queue).toEqual(['b'])
    expect(s.flipped).toBe(false)
    expect(mastered(s)).toBe(1)
  })
  it('still learning sends the card to the back and counts a miss', () => {
    const s = stillLearning(flip(initialFlash(['a', 'b', 'c'])))
    expect(s.queue).toEqual(['b', 'c', 'a'])
    expect(s.misses).toBe(1)
    expect(mastered(s)).toBe(0)
  })
  it('is done only when every card is mastered', () => {
    let s = initialFlash(['a', 'b'])
    s = gotIt(flip(s))
    expect(isDone(s)).toBe(false)
    s = gotIt(flip(s))
    expect(isDone(s)).toBe(true)
    expect(flip(s)).toBe(s)
  })
  it('an empty deck is never done', () => {
    expect(isDone(initialFlash([]))).toBe(false)
  })
})
