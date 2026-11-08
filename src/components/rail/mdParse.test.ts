import { describe, expect, it } from 'vitest'
import { parseBlocks, parseInline } from './mdParse'

describe('parseBlocks', () => {
  it('reads paragraphs, joining wrapped lines', () => {
    expect(parseBlocks('one\ntwo\n\nthree')).toEqual([
      { t: 'p', text: 'one two' },
      { t: 'p', text: 'three' },
    ])
  })
  it('reads bullet and numbered lists', () => {
    expect(parseBlocks('- a\n- b\n\n1. x\n2. y')).toEqual([
      { t: 'ul', items: ['a', 'b'] },
      { t: 'ol', items: ['x', 'y'] },
    ])
  })
  it('reads a table with its separator row', () => {
    const [t] = parseBlocks('| Concept | Meaning |\n|---|---|\n| **Net value** | A − B |')
    expect(t).toEqual({ t: 'table', head: ['Concept', 'Meaning'], rows: [['**Net value**', 'A − B']] })
  })
  it('reads quotes, code fences and headings', () => {
    expect(parseBlocks('> quoted line\n\n```\nNet = A − B\n```\n\n#### Example 1')).toEqual([
      { t: 'quote', text: 'quoted line' },
      { t: 'code', text: 'Net = A − B' },
      { t: 'h', level: 4, text: 'Example 1' },
    ])
  })
  it('does not swallow a list into the paragraph above it', () => {
    expect(parseBlocks('intro line\n- item')).toEqual([
      { t: 'p', text: 'intro line' },
      { t: 'ul', items: ['item'] },
    ])
  })
})

describe('parseInline', () => {
  it('splits bold, italic and code', () => {
    expect(parseInline('a **b** *c* `d` e')).toEqual([
      { t: 'text', text: 'a ' },
      { t: 'b', text: 'b' },
      { t: 'text', text: ' ' },
      { t: 'i', text: 'c' },
      { t: 'text', text: ' ' },
      { t: 'code', text: 'd' },
      { t: 'text', text: ' e' },
    ])
  })
  it('leaves plain text and stray asterisks alone', () => {
    expect(parseInline('NPR 90,000 * 2')).toEqual([{ t: 'text', text: 'NPR 90,000 * 2' }])
  })
})
