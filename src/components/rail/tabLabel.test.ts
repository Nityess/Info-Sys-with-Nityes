import { describe, expect, it } from 'vitest'
import md from '../../../content/chapter7.md?raw'
import { parseChapter } from '../../content/chapter7/parse'
import { tabLabel } from './tabLabel'

describe('tabLabel', () => {
  it('shortens "Principle n - title" to "Principle n"', () => {
    expect(tabLabel('2. Principle 1 - Information obtained but not used')).toBe('Principle 1')
    expect(tabLabel('3. Principle 2 - Extra benefits versus extra costs')).toBe('Principle 2')
  })
  it('keeps a short heading whole and a long one without a dash in full', () => {
    expect(tabLabel('2. IT Delivery Activities')).toBe('IT Delivery Activities')
    expect(tabLabel('3. Understand all eight characteristics')).toBe('Understand all eight characteristics')
  })
  it('gives topic 1.5 three concept tabs', () => {
    const t = parseChapter(md)['1.5']
    expect(t.sections.filter((s) => s.role === 'concept').map((s) => tabLabel(s.heading))).toEqual(['Principle 1', 'Principle 2', 'Principle 3'])
  })
})
