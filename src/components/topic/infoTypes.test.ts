import { describe, expect, it } from 'vitest'
import { topics } from 'virtual:chapter7'
import { hookClosing, parseHookCards, parseTypes, typeKeyOf, typeName } from './infoTypes'

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

describe('Topic 1.2 concept', () => {
  const types = parseTypes(t12)
  const by = (k: string) => types.find((x) => x.key === k)!
  it('reads the four types in order', () => {
    expect(types.map((x) => x.name)).toEqual(['Strategic', 'Tactical', 'Operational', 'Planning'])
  })
  it('reads who uses it and the focus', () => {
    expect(by('strategic')).toMatchObject({ who: 'Board of Directors / Senior Managers', focus: 'Long-term focus' })
    expect(by('tactical').who).toBe('Middle Managers')
    expect(by('operational')).toMatchObject({ who: 'Front-line Staff', focus: 'Day-to-day focus' })
    expect(by('planning')).toMatchObject({ who: 'Planning Teams', focus: 'Implementation focus' })
  })
  it('reads the characteristics', () => {
    expect(by('strategic').chars).toEqual(['Long-term in nature.', 'Often based on estimates.', 'Provides a broad picture of the organisation.', 'Supports major business decisions.'])
    expect(by('tactical').chars).toHaveLength(3)
    expect(by('operational').chars).toEqual(['Day-to-day in nature.', 'Routine.', 'Very detailed.', 'Mostly accurate.'])
    expect(by('planning').chars).toEqual(['Implementation steps.', 'Available resources.', 'Time-scales.'])
  })
  it('reads meaning, example and memory clue for every type', () => {
    for (const x of types) {
      expect(x.meaning, x.key).toBeTruthy()
      expect(x.example, x.key).toBeTruthy()
      expect(x.clue, x.key).toBeTruthy()
    }
    expect(by('strategic').clue).toBe('Strategic = Big picture + Long-term + Major decisions.')
    expect(by('operational').example).toMatch(/operatives are needed on a particular shift.*unauthorised overdrafts/)
  })
  it('has an exam point only where the text gives one', () => {
    expect(by('strategic').exam).toMatch(/often based on estimates/)
    expect(by('operational').exam).toMatch(/unauthorised overdrafts are operational/)
    expect(by('tactical').exam).toBe('')
    expect(by('planning').exam).toBe('')
  })
})
