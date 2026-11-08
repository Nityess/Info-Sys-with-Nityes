import { describe, expect, it } from 'vitest'
import { topics } from 'virtual:chapter7'
import { hookClosing, parseHookCards, typeKeyOf, typeName } from './infoTypes'

const t12 = topics['1.2']

describe('Topic 1.2 hook', () => {
  const cards = parseHookCards(t12)
  it('pairs the four people in the bank with the four types, in order', () => {
    expect(cards.map((c) => c.type)).toEqual(['strategic', 'tactical', 'operational', 'planning'])
    expect(cards.map((c) => c.who)).toEqual(['The Board', 'Regional manager', 'Branch manager', 'The planning team'])
    expect(cards.map((c) => c.initial)).toEqual(['B', 'R', 'B', 'P'])
  })
  it('keeps each need as the teaching text says it', () => {
    expect(cards[0].need).toBe('Wants to know whether the bank should expand into new markets over the next five years.')
    expect(cards[2].need).toMatch(/^Needs daily reports showing unauthorised overdrafts/)
  })
  it('has the closing line and no App Spec text', () => {
    expect(hookClosing(t12)).toBe('That is why information is classified according to its use.')
    expect(JSON.stringify(cards)).not.toMatch(/App Spec/i)
  })
  it('names types', () => {
    expect(typeKeyOf('Strategic information')).toBe('strategic')
    expect(typeKeyOf('Nonsense')).toBeNull()
    expect(typeName('planning')).toBe('Planning')
  })
})
