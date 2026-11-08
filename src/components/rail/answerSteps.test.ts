import { describe, expect, it } from 'vitest'
import { answerSteps } from './answerSteps'

describe('answerSteps', () => {
  it('makes one step per paragraph and per bullet, in order', () => {
    const steps = answerSteps('Opening line:\n\n- **First:** one\n- **Second:** two\n\nClosing line.')
    expect(steps.map((s) => [s.kind, s.text])).toEqual([
      ['p', 'Opening line:'],
      ['li', '**First:** one'],
      ['li', '**Second:** two'],
      ['p', 'Closing line.'],
    ])
  })
  it('groups consecutive bullets into one list and keeps separate lists apart', () => {
    const steps = answerSteps('- a\n- b\n\nmiddle\n\n1. c')
    expect(steps.filter((s) => s.kind === 'li').map((s) => s.list)).toEqual([1, 1, 2])
    expect(steps[3].ordered).toBe(true)
  })
  it('handles a single paragraph answer', () => {
    expect(answerSteps('Just one paragraph.')).toHaveLength(1)
  })
})
