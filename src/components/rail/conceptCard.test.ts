import { describe, expect, it } from 'vitest'
import { topics } from 'virtual:chapter7'
import type { Section } from '../../content/chapter7/types'
import { clueParts, isRichCard, parseConceptCard } from './conceptCard'
import { splitSubsections } from './splitSubsections'

/** Cards of one concept section of a topic, picked by heading text. */
function cards(code: string, heading: string) {
  const s = topics[code].sections.find((x: Section) => x.heading.toLowerCase().includes(heading))!
  return splitSubsections(s.md).parts.map((p) => parseConceptCard(p.label, p.md))
}

describe('concept cards from the teaching text', () => {
  it('1.3: all eight ACCURATE qualities have wording, an example and a clue', () => {
    const c = cards('1.3', 'understand all eight')
    expect(c.map((x) => x.name)).toEqual(['Accurate', 'Complete', 'Cost-beneficial', 'User-targeted', 'Relevant', 'Authoritative', 'Timely', 'Easy to use'])
    for (const x of c) {
      expect(isRichCard(x), x.name).toBe(true)
      expect(x.example, x.name).toBeTruthy()
      expect(x.clue, x.name).toBeTruthy()
    }
    expect(c[0].definition).toBe('Information should be correct and free from errors.')
    expect(c[0].points).toContain('Figures should add up.')
    expect(c[2].example).toMatch(/NPR 5 lakh/)
    expect(c[2].clue).toBe('Benefit should justify cost.')
  })
  it('1.3: the user-targeted example is the bullet pair, not the key points', () => {
    const u = cards('1.3', 'understand all eight')[3]
    expect(u.points).toEqual(['Senior managers → summaries.', 'Junior managers → detailed breakdowns.'])
    expect(u.example).toMatch(/CEO needs a dashboard/)
    expect(u.example).toMatch(/Branch accountant needs detailed/)
  })
  it('1.4: the four SEAR factors', () => {
    const c = cards('1.4', 'understand each factor')
    expect(c.map((x) => x.name)).toEqual(['Source', 'Ease of Assimilation', 'Accessibility', 'Relevance'])
    expect(c[1].points).toEqual(['Colours', 'Graphics', 'Infographics', 'Dashboards', 'Sound', 'Movement'])
    expect(c[0].clue).toBe('Trustworthiness of the source.')
    expect(c.every((x) => x.example)).toBe(true)
  })
  it('1.9: CATIVA uses the "Imagine" story as the easy example', () => {
    const c = cards('1.9', 'cativa - six criteria')
    expect(c.map((x) => x.name)).toEqual(['Completeness', 'Accuracy', 'Timeliness', 'Inalterability', 'Verifiability', 'Assessability'])
    expect(c[0].definition).toMatch(/^Everything that needs to be processed/)
    expect(c[0].example).toMatch(/^Imagine a company has 10 branches/)
    expect(c[0].clue).toBe('Completeness = Nothing important omitted.')
  })
  it('1.6: delivery activities have key points and an example', () => {
    const c = cards('1.6', 'it delivery activities')
    expect(c).toHaveLength(5)
    expect(c[0].points).toEqual(['Data extraction.', 'Report production.', 'Report distribution.'])
    expect(c[0].example).toMatch(/Extracting transaction data/)
  })
  it('1.7: the three challenges; the first has no example line in the text, so it stays plain text', () => {
    const c = cards('1.7', 'challenges of outsourcing')
    expect(c).toHaveLength(3)
    expect(c.map((x) => Boolean(x.example))).toEqual([false, true, true])
    expect(isRichCard(c[0])).toBe(false)
    expect(isRichCard(c[1])).toBe(true)
  })
  it('never shows App Spec text', () => {
    for (const code of ['1.3', '1.4', '1.9']) {
      const s = topics[code].sections.filter((x: Section) => x.role === 'concept')
      expect(JSON.stringify(s.flatMap((x: Section) => splitSubsections(x.md).parts.map((p) => parseConceptCard(p.label, p.md))))).not.toMatch(/App Spec/i)
    }
  })
})

describe('clueParts', () => {
  it('splits a memory formula into pieces to picture', () => {
    expect(clueParts('Strategic = Big picture + Long-term + Major decisions.')).toEqual(['Big picture', 'Long-term', 'Major decisions'])
    expect(clueParts('Benefit should justify cost.')).toEqual(['Benefit should justify cost'])
    expect(clueParts('')).toEqual([])
  })
})
