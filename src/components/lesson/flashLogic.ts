// Flashcard recap: cards you know leave the deck, cards you miss go to the back.

export interface FlashState {
  /** Card ids still to master, front of the queue is on screen */
  queue: string[]
  total: number
  flipped: boolean
  /** Times "still learning" was pressed */
  misses: number
}

export const initialFlash = (ids: readonly string[]): FlashState => ({
  queue: [...ids],
  total: ids.length,
  flipped: false,
  misses: 0,
})

export const flip = (s: FlashState): FlashState => (s.queue.length ? { ...s, flipped: !s.flipped } : s)

/** Only counts once the card has been turned over. */
export function gotIt(s: FlashState): FlashState {
  if (!s.flipped || !s.queue.length) return s
  return { ...s, queue: s.queue.slice(1), flipped: false }
}

export function stillLearning(s: FlashState): FlashState {
  if (!s.flipped || !s.queue.length) return s
  return { ...s, queue: [...s.queue.slice(1), s.queue[0]], flipped: false, misses: s.misses + 1 }
}

export const mastered = (s: FlashState): number => s.total - s.queue.length
export const isDone = (s: FlashState): boolean => s.total > 0 && s.queue.length === 0
