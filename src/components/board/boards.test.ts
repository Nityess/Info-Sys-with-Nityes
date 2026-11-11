import { describe, expect, it } from 'vitest'
import c7s1 from '../../content/boards/c7s1.json'
import c7s2 from '../../content/boards/c7s2.json'
import c7s3 from '../../content/boards/c7s3.json'
import mcq7 from '../../content/boards/mcq7.json'
import { ICONS } from '../../content/boards/iconData'
import { questionsFor } from './gameLogic'
import type { Board, Mcq } from './types'

// The board data is copied from the designer's files by scripts/extractBoards.mjs. These tests catch a bad copy or a design file that breaks the rules.

const boards = [c7s1, c7s2, c7s3] as unknown as Board[]
const banks: Record<7, Mcq[]> = { 7: mcq7 as Mcq[] }
const walkStrings = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => walkStrings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => walkStrings(x, out))
  return out
}

describe('board structure', () => {
  it('has the topics the handoff lists: Chapter 7 is 9, 5 and 5 topics', () => {
    expect(boards.map((b) => b.topics.length)).toEqual([9, 5, 5])
    expect(boards.map((b) => [b.chapter, b.section])).toEqual([[7, 1], [7, 2], [7, 3]])
  })
  it('gives every topic the parts the board shows', () => {
    for (const b of boards) {
      const ids = new Set<string>()
      for (const t of b.topics) {
        expect(ids.has(t.id), `${b.id} ${t.id} repeated`).toBe(false)
        ids.add(t.id)
        expect(t.name && t.line && t.remember && t.simple, `${b.id} ${t.id} text`).toBeTruthy()
        expect(t.frames, `${b.id} ${t.id} frames`).toHaveLength(4)
        expect(t.gls.length, `${b.id} ${t.id} glossary`).toBeGreaterThan(0)
        expect(Boolean(t.demo || t.scene), `${b.id} ${t.id} has something to watch or try`).toBe(true)
        expect(t.groups?.length ?? 0, `${b.id} ${t.id} cards`).toBeGreaterThan(0)
      }
    }
  })
  it('uses the step demos from dm7.js: Chapter 7 section 3 topics 3.1 to 3.4', () => {
    expect(c7s3.topics.filter((t) => 'demo' in t).map((t) => t.id)).toEqual(['3.1', '3.2', '3.3', '3.4'])
  })
})

describe('demos and scenes', () => {
  it('keep every item on the grid and every step number inside the demo', () => {
    for (const b of boards) {
      for (const t of b.topics) {
        const d = t.demo
        if (!d) continue
        expect(d.caps.length, `${b.id} ${t.id}: one caption per step`).toBe(d.n)
        for (const it of d.items) {
          expect(it.x >= 0 && it.x + it.w <= 100.5, `${b.id} ${t.id} "${it.t}" x`).toBe(true)
          expect(it.y >= 0 && it.y + it.h <= d.h + 0.5, `${b.id} ${t.id} "${it.t}" y`).toBe(true)
          const steps = [it.o.from, ...(it.o.on ?? []), ...(it.o.hi ?? []), ...(it.o.hi2 ?? [])].filter((x): x is number => x != null)
          for (const s of steps) expect(s >= 0 && s < d.n, `${b.id} ${t.id} "${it.t}" step ${s}`).toBe(true)
        }
      }
    }
  })
  it('link only nodes that exist', () => {
    for (const b of boards) {
      for (const t of b.topics) {
        for (const [a, c] of t.scene?.links ?? []) {
          expect(t.scene?.nodes[a], `${b.id} ${t.id} link ${a}`).toBeTruthy()
          expect(t.scene?.nodes[c], `${b.id} ${t.id} link ${c}`).toBeTruthy()
        }
      }
    }
  })
  it('use only icons that are in the icon set', () => {
    const names = new Set<string>()
    const collect = (v: unknown, key = ''): void => {
      if (key === 'ic' && typeof v === 'string' && v) names.add(v)
      if (Array.isArray(v)) v.forEach((x) => collect(x, key))
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => collect(x, k))
    }
    boards.forEach((b) => {
      collect(b)
      b.topics.forEach((t) => t.frames.forEach(([ic]) => names.add(ic)))
    })
    expect([...names].filter((n) => !(n in ICONS))).toEqual([])
  })
})

describe('games and the question banks', () => {
  it('point classification items at a real category and real questions at a bank number', () => {
    for (const b of boards) {
      for (const t of b.topics) {
        if (!t.game) continue
        for (const it of t.game.items) {
          if ('mcq' in it) expect(banks[b.chapter].some((m) => m.n === it.mcq), `${b.id} ${t.id} Q${it.mcq}`).toBe(true)
          else expect(it.cat >= 0 && it.cat < t.game.cats.length, `${b.id} ${t.id} "${it.q}"`).toBe(true)
        }
        expect(questionsFor(t.game, banks[b.chapter]), `${b.id} ${t.id} questions`).toHaveLength(t.game.items.length)
      }
    }
  })
  it('has four options and a valid answer for every bank question', () => {
    for (const m of [...mcq7] as Mcq[]) {
      expect(m.opts, `Q${m.n}`).toHaveLength(4)
      expect(m.ans >= 0 && m.ans < 4, `Q${m.n} answer`).toBe(true)
      expect(m.why.length, `Q${m.n} explanation`).toBeGreaterThan(10)
    }
  })
  it('places each Chapter 7 question under exactly one topic, all 24 of them', () => {
    const used = [c7s1, c7s2, c7s3].flatMap((b) => (b as unknown as Board).topics.flatMap((t) => (t.game?.items ?? []).flatMap((i) => ('mcq' in i ? [i.mcq] : []))))
    expect([...used].sort((a, b) => a - b)).toEqual(Array.from({ length: 24 }, (_, i) => i + 1))
  })
})

describe('copy rules', () => {
  it('has no em dashes anywhere in the board data or the banks (a numeric range such as 1 to 12 may keep its en dash)', () => {
    const bad = [...boards, mcq7].flatMap((b) => walkStrings(b)).filter((s) => /—/.test(s))
    expect(bad).toEqual([])
  })
  it('labels the mnemonics as a memory aid', () => {
    const aids = boards.flatMap((b) => b.topics.filter((t) => t.aid).map((t) => `${b.id}:${t.id}:${t.aid}`))
    expect(aids).toContain('c7s1:1.3:memory aid')
    expect(aids).toContain('c7s1:1.9:memory aid')
  })
})
