import { describe, expect, it } from 'vitest'
import { splitSubsections, subLabel } from './splitSubsections'

describe('subLabel', () => {
  it('drops numbers and single-letter prefixes', () => {
    expect(subLabel('1. Strategic Information')).toBe('Strategic Information')
    expect(subLabel('A - Accurate')).toBe('Accurate')
    expect(subLabel('2 - Ease of Assimilation')).toBe('Ease of Assimilation')
    expect(subLabel('Benefit 1 - Focus on Core Activities')).toBe('Benefit 1 - Focus on Core Activities')
  })
})

describe('splitSubsections', () => {
  const md = 'Lead line.\n\n#### A - One\n\nfirst\n\n#### B - Two\n\nsecond\n\n#### C - Three\n\nthird'
  it('splits at #### headings and keeps the lead', () => {
    const r = splitSubsections(md)
    expect(r.lead).toBe('Lead line.')
    expect(r.parts.map((p) => p.label)).toEqual(['One', 'Two', 'Three'])
    expect(r.parts[1].md).toBe('second')
  })
  it('leaves sections with fewer than three parts whole', () => {
    const r = splitSubsections('x\n\n#### A\n\na\n\n#### B\n\nb')
    expect(r.parts).toEqual([])
    expect(r.lead).toContain('#### A')
  })
})
