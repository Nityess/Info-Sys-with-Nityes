import { describe, expect, it } from 'vitest'
import md from '../../../content/chapter7.md?raw'
import { parseChapter } from '../../content/chapter7/parse'
import { parseBlocks } from './mdParse'
import { splitAtMarker } from './splitAtMarker'

describe('splitAtMarker', () => {
  it('splits at the marker line and keeps the marker with the second half', () => {
    expect(splitAtMarker('a\n\n**Mark**\nb', '**Mark**')).toEqual({ before: 'a', after: '**Mark**\nb' })
  })
  it('moves nothing when the marker is missing', () => {
    expect(splitAtMarker('a\nb', '**Nope**')).toEqual({ before: 'a\nb', after: '' })
  })
  it('splits topic 1.5 so the distinction table lands in Compare and the formula stays in Concept', () => {
    const t = parseChapter(md)['1.5']
    const principle3 = t.sections.find((s) => s.heading.startsWith('4. Principle 3'))!
    const { before, after } = splitAtMarker(principle3.md, '**Important distinction**')
    expect(before).toMatch(/Understand the MIS cost concept/)
    expect(before).not.toMatch(/Total MIS cost/)
    const blocks = parseBlocks(after)
    const table = blocks.find((b) => b.t === 'table')
    expect(table && table.t === 'table' && table.rows.map((r) => r[0])).toEqual(['Total MIS cost', 'Fixed costs already incurred', 'Marginal cost of an individual enquiry'])
    expect(after).toMatch(/Do not make this mistake/)
  })
})
