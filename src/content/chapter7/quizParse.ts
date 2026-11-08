import type { QuizItem, QuizSet, Section } from './types.ts'

// Quiz parsing for content/chapter7.md. The file uses several shapes:
//  - MCQs: "**Q1. text**" with "- A. option" lines. The key is in the App Spec ("Q1 B, Q2 C")
//    or written under the question ("**Correct answer: B. ...**", "*Reason:* ...").
//  - Chips with one shared option list: "(options for each: A / B)" plus "- **Scenario A:** ..." or "1. ..." lines.
//  - Chips with their own options: "**1. text**" then "Options: A / B / C".
//  - Scenarios that carry their answer inline: "... *Factor: Source*".

const LETTERS = 'ABCD'
const split = (s: string) => s.split('/').map((x) => x.trim()).filter(Boolean)
const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()

export function parseMcqs(md: string): QuizItem[] {
  const lines = md.split('\n')
  const heads = lines.flatMap((l, i) => (/^\*\*Q\d+\.\s*.+\*\*\s*$/.test(l.trim()) ? [i] : []))
  return heads.map((at, h) => {
    const m = /^\*\*Q(\d+)\.\s*(.+?)\*\*\s*$/.exec(lines[at].trim())!
    const block = lines.slice(at + 1, heads[h + 1] ?? lines.length)
    const options = block.flatMap((l) => {
      const o = /^-\s+([A-D])\.\s*(.+)$/.exec(l.trim())
      return o ? [o[2].trim()] : []
    })
    const key = block.map((l) => /^\*\*Correct answer:\s*([A-D])\b/.exec(l.trim())?.[1]).find(Boolean)
    const reason = block.map((l) => /^\*Reason:\*\s*(.+)$/.exec(l.trim())?.[1]).find(Boolean)
    const item: QuizItem = { id: `Q${m[1]}`, text: m[2].trim(), options, answer: key ? LETTERS.indexOf(key) : -1 }
    if (reason) item.explanation = reason
    return item
  })
}

interface RawChip {
  id: string
  text: string
  options?: string[]
  inline?: string
}

export function parseChips(md: string): QuizItem[] {
  const lines = md.split('\n')
  const shared = /options for each:\s*([^)]+)\)/i.exec(md)?.[1]
  const raw: RawChip[] = []
  lines.forEach((line, i) => {
    const t = line.trim()
    const scen = /^-\s+\*\*Scenario ([A-Z]):\*\*\s*(.+)$/.exec(t)
    const num = shared ? /^(\d+)\.\s+(.+)$/.exec(t) : null
    const own = /^\*\*(\d+)\.\s*(.+?)\*\*\s*$/.exec(t)
    if (scen) raw.push({ id: scen[1], text: scen[2] })
    else if (num) raw.push({ id: num[1], text: num[2] })
    else if (own) {
      const opts = lines.slice(i + 1).map((l) => /^Options:\s*(.+)$/.exec(l.trim())?.[1]).find(Boolean)
      if (opts) raw.push({ id: own[1], text: own[2], options: split(opts) })
    }
  })
  for (const r of raw) {
    const inline = /\s*\*Factor:\s*([^*]+)\*\s*$/.exec(r.text)
    if (inline) {
      r.inline = inline[1].trim()
      r.text = r.text.slice(0, inline.index).trim()
    }
  }
  const derived = [...new Set(raw.flatMap((r) => (r.inline ? [r.inline] : [])))]
  return raw.map((r) => {
    const options = r.options ?? (shared ? split(shared) : derived)
    return { id: r.id, text: r.text, options, answer: r.inline ? options.findIndex((o) => same(o, r.inline!)) : -1 }
  })
}

/** First bold-only line that is not a question, e.g. "**SEAR Challenge (0/6 answered)**" gives "SEAR Challenge". */
export function boldTitle(md: string, fallback: string): string {
  for (const m of md.matchAll(/^\*\*([^*]+?)\*\*\s*$/gm)) {
    const t = m[1].replace(/\s*\(\d+\/\d+[^)]*\)\s*$/, '').trim()
    if (!/^(Q\d+|\d+)\./.test(t) && !/^(Correct answer|Possible question|Suggested answer)/.test(t)) return t
  }
  return fallback
}

export interface Keys {
  mcq: string[][]
  chip: string[][]
}

/** Reads answer keys from the App Spec text. Only the keys are kept, never the spec itself. */
export function parseKeys(specMd: string): Keys {
  const keys: Keys = { mcq: [], chip: [] }
  for (const line of specMd.split('\n')) {
    const body = /^-\s+[^:]+:\s*(.+?)\.?\s*$/.exec(line.trim())?.[1]
    if (!body) continue
    const q = [...body.matchAll(/Q(\d+)\s+([A-D])\b/g)]
    if (q.length >= 2) {
      keys.mcq.push(q.map((m) => m[2]))
      continue
    }
    const chips = body.split(',').map((s) => /^([A-Z]|\d+)\s+(\S.*)$/.exec(s.trim()))
    if (chips.length >= 2 && chips.every(Boolean)) keys.chip.push(chips.map((m) => `${m![1]}=${m![2]}`))
  }
  return keys
}

function applyKey(set: QuizSet, key: string[] | undefined): void {
  if (!key) return
  if (set.kind === 'mcq') {
    set.items.forEach((it, i) => {
      if (it.answer < 0) it.answer = key[i] ? LETTERS.indexOf(key[i]) : -1
    })
    return
  }
  const byId = new Map(key.map((p) => p.split('=') as [string, string]))
  for (const it of set.items) {
    const want = (byId.get(it.id) ?? '').toLowerCase()
    if (it.answer < 0) it.answer = it.options.findIndex((o) => o.toLowerCase().startsWith(want))
  }
}

export function buildQuizzes(sections: Section[], keys: Keys): QuizSet[] {
  const sets: QuizSet[] = []
  for (const s of sections.filter((x) => x.role === 'quiz' || x.role === 'source')) {
    const source = s.role === 'source'
    const heading = s.heading.replace(/^\d+\.\s*/, '')
    const chips = parseChips(s.md)
    const mcq = parseMcqs(s.md)
    if (chips.length) sets.push({ title: boldTitle(s.md, heading), kind: 'chip', items: chips })
    if (mcq.length) sets.push({ title: boldTitle(s.md, heading), kind: 'mcq', items: mcq, ...(source ? { source } : {}) })
  }
  let m = 0
  let c = 0
  for (const set of sets) {
    if (set.items.every((it) => it.answer >= 0)) continue
    applyKey(set, set.kind === 'mcq' ? keys.mcq[m++] : keys.chip[c++])
  }
  return sets
}
