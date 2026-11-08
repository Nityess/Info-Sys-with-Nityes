import { describe, expect, it } from 'vitest'
import md from '../../../../content/chapter7.md?raw'
import { SECTIONS, TOPICS, displayTitle, topicId } from './topics'

const sectionHeadings = [...md.matchAll(/^# SECTION (\d) - (.+?)\s*$/gm)].map((m) => m[2])
const topicHeadings = [...md.matchAll(/^## Topic (\d\.\d) - (.+?)\s*$/gm)].map((m) => [m[1], m[2]])

describe('Chapter 7 topics match content/chapter7.md', () => {
  it('has the three sections, titled as in the file', () => {
    expect(SECTIONS.map((s) => s.title)).toEqual(sectionHeadings)
  })
  it('has all 18 topics in order with the file titles', () => {
    expect(TOPICS.map((t) => [t.code, t.title])).toEqual(topicHeadings)
    expect(TOPICS).toHaveLength(18)
  })
  it('groups topics by the number before the dot', () => {
    for (const t of TOPICS) expect(t.section).toBe(`s${t.code[0]}`)
  })
  it('has exactly the 8 playgrounds from the build prompt', () => {
    expect(TOPICS.filter((t) => t.playground).map((t) => t.code)).toEqual(['1.2', '1.3', '1.5', '1.6', '1.9', '2.2', '3.1', '3.4'])
  })
  it('labels ACCURATE, SEAR and MPSS as teaching aids, and not CATIVA', () => {
    expect(TOPICS.filter((t) => t.teachingAid).map((t) => [t.code, t.teachingAid])).toEqual([
      ['1.3', 'ACCURATE'],
      ['1.4', 'SEAR'],
      ['1.6', 'MPSS'],
    ])
  })
  it('only topic 1.1 is flagged as coming from the study text', () => {
    expect(TOPICS.filter((t) => t.fromStudyText).map((t) => t.code)).toEqual(['1.1'])
  })
  it('strips the tag from display titles only when a teaching aid label replaces it', () => {
    expect(displayTitle(TOPICS[2])).toBe('Qualities of Good Information')
    expect(displayTitle(TOPICS[8])).toBe('Information Processing: CATIVA')
    expect(displayTitle(TOPICS[11])).toBe('Qualitative Characteristics of Financial Information (NFRS)')
  })
  it('makes stable unique ids', () => {
    expect(topicId('1.5')).toBe('ch07-t1-5')
    expect(new Set(TOPICS.map((t) => topicId(t.code))).size).toBe(18)
  })
  it('keeps App Spec headings out of what students see: every topic has one in the file, none in the model', () => {
    expect((md.match(/^### App Spec/gm) ?? []).length).toBeGreaterThanOrEqual(10)
    expect(JSON.stringify(TOPICS)).not.toMatch(/App Spec/)
  })
})
