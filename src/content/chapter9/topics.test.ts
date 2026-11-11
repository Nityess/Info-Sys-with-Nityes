import { describe, expect, it } from 'vitest'
import { SIM_SECTIONS, SIM_TOPICS, exploredCount, findSim, readySims, simNeighbours, simProgressId, simSrc } from './topics'

// Every simulator page, read as text: "/public/sims/chapter-09/1-1.html" -> its HTML
const pages = import.meta.glob<string>('/public/sims/chapter-09/*.html', { query: '?raw', import: 'default', eager: true })
const page = (slug: string): string | undefined => pages[`/public/sims/chapter-09/${slug}.html`]

describe('Chapter 9 topics', () => {
  it('has 17 topics, 8 in section 1 and 9 in section 2, numbered in order', () => {
    expect(SIM_TOPICS).toHaveLength(17)
    expect(SIM_SECTIONS.map((s) => SIM_TOPICS.filter((t) => t.section === s.id).length)).toEqual([8, 9])
    for (const t of SIM_TOPICS) expect(t.slug).toBe(t.number.replace('.', '-'))
    expect(new Set(SIM_TOPICS.map((t) => t.slug)).size).toBe(17)
  })
  it('has a page file for every ready topic, and none for a topic marked not ready', () => {
    for (const t of SIM_TOPICS) expect(page(t.slug) !== undefined, t.slug).toBe(t.ready)
  })
  it('each page title matches the simulator title in the data', () => {
    for (const t of readySims()) {
      const html = page(t.slug) ?? ''
      const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]
      expect(title?.replace(/&#39;|&rsquo;|'/g, '’'), t.slug).toBe(t.title)
    }
  })
  it('uses no em dashes in titles or topic names', () => {
    for (const t of SIM_TOPICS) expect(`${t.title}${t.topic}`).not.toContain('—')
  })
})

describe('simulator navigation', () => {
  it('finds a topic by slug', () => {
    expect(findSim('2-5')?.title).toBe('Build Your Own Blockchain')
    expect(findSim('9-9')).toBeUndefined()
  })
  it('steps between playable simulators only', () => {
    const list = readySims()
    expect(simNeighbours(list[0].slug).prev).toBeNull()
    expect(simNeighbours(list[list.length - 1].slug).next).toBeNull()
    expect(simNeighbours(list[1].slug)).toEqual({ prev: list[0], next: list[2] })
    expect(simNeighbours('nope')).toEqual({ prev: null, next: null })
  })
  it('builds the page path from the base', () => {
    expect(simSrc('1-1', '/')).toBe('/sims/chapter-09/1-1.html')
    expect(simSrc('2-5', '/app/')).toBe('/app/sims/chapter-09/2-5.html')
  })
})

describe('explored count', () => {
  it('counts only Chapter 9 simulators in the started set', () => {
    const started = new Set([simProgressId('1-1'), simProgressId('2-5'), 'ch07-t1-2'])
    expect(exploredCount(started)).toEqual({ explored: 2, total: 17 })
    expect(exploredCount(new Set())).toEqual({ explored: 0, total: 17 })
  })
})
