import type { AnswerPair, ParsedTopic, QuizItem, QuizSet, Role, Section } from './types.ts'

// Pure parser for content/chapter7.md. It runs at build time (see scripts/chapter7Plugin.ts)
// and in tests. Nothing here touches the file system or the DOM.

const LETTERS = 'ABCD'

/** Which part of the lesson rail a heading belongs to. Anything unmatched is concept. */
export function roleOf(heading: string, index: number): Role {
  const h = heading.toLowerCase()
  if (h.includes('app spec')) return 'spec'
  if (h.includes('classroom delivery')) return 'delivery'
  if (h.includes('mastery')) return 'mastery'
  if (h.includes('revision')) return 'revise'
  if (/(answer writing|written answer|exam-oriented answer)/.test(h)) return 'answer'
  if (/(practice|quiz|mcq|challenge|knowledge check|exam questions|exercise|test|classification)/.test(h)) return 'quiz'
  if (/(distinction|confuse|compare|trap|difference)/.test(h)) return 'compare'
  return index === 0 ? 'hook' : 'concept'
}

/** Drops banner lines such as "**Next learning topic | Concept + numerical application**". */
const isBanner = (line: string) => /^\*\*[^*]*\|[^*]*\*\*\s*$/.test(line.trim())

function splitSections(body: string): { intro: string; sections: Section[] } {
  const lines = body.split('\n')
  const level = lines.some((l) => /^### /.test(l)) ? '### ' : '#### '
  const intro: string[] = []
  const raw: { heading: string; lines: string[] }[] = []
  for (const line of lines) {
    if (line.startsWith(level)) raw.push({ heading: line.slice(level.length).trim(), lines: [] })
    else if (raw.length) raw[raw.length - 1].lines.push(line)
    else if (!isBanner(line)) intro.push(line)
  }
  const sections = raw.map((r, i): Section => ({ heading: r.heading, role: roleOf(r.heading, i), md: r.lines.join('\n').trim() }))
  return { intro: intro.join('\n').trim(), sections }
}

// ---------- quizzes ----------

function parseMcqs(md: string): QuizItem[] {
  const lines = md.split('\n')
  const items: QuizItem[] = []
  for (let i = 0; i < lines.length; i++) {
    const m = /^\*\*Q(\d+)\.\s*(.+?)\*\*\s*$/.exec(lines[i].trim())
    if (!m) continue
    const options: string[] = []
    for (let j = i + 1; j < lines.length; j++) {
      const o = /^-\s+([A-D])\.\s*(.+)$/.exec(lines[j].trim())
      if (o) options.push(o[2].trim())
      else if (lines[j].trim() !== '' || options.length) break
    }
    items.push({ id: `Q${m[1]}`, text: m[2].trim(), options, answer: -1 })
  }
  return items
}

/** "- **Scenario A:** text" bullets plus "(options for each: X / Y / Z)". */
function parseChips(md: string): QuizItem[] {
  const opt = /options for each:\s*([^)]+)\)/i.exec(md)
  if (!opt) return []
  const options = opt[1].split('/').map((s) => s.trim())
  const items: QuizItem[] = []
  for (const line of md.split('\n')) {
    const m = /^-\s+\*\*Scenario ([A-Z]):\*\*\s*(.+)$/.exec(line.trim())
    if (m) items.push({ id: m[1], text: m[2].trim(), options, answer: -1 })
  }
  return items
}

function boldTitle(md: string, fallback: string): string {
  const m = /^\*\*([^*]+?)\s*(?:\(\d+\/\d+\))?\*\*\s*$/m.exec(md)
  return m && !/^Q\d+\./.test(m[1]) ? m[1].trim() : fallback
}

interface Keys {
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
    const chips = body.split(',').map((s) => /^([A-Z])\s+(\S.*)$/.exec(s.trim()))
    if (chips.length >= 2 && chips.every(Boolean)) keys.chip.push(chips.map((m) => `${m![1]}=${m![2]}`))
  }
  return keys
}

function applyMcqKey(items: QuizItem[], letters: string[]): void {
  items.forEach((it, i) => {
    it.answer = letters[i] ? LETTERS.indexOf(letters[i]) : -1
  })
}

function applyChipKey(items: QuizItem[], pairs: string[]): void {
  const byId = new Map(pairs.map((p) => p.split('=') as [string, string]))
  for (const it of items) {
    const want = (byId.get(it.id) ?? '').toLowerCase()
    it.answer = it.options.findIndex((o) => o.toLowerCase().startsWith(want))
  }
}

function buildQuizzes(sections: Section[], keys: Keys): QuizSet[] {
  const sets: QuizSet[] = []
  for (const s of sections.filter((x) => x.role === 'quiz')) {
    const mcq = parseMcqs(s.md)
    const chips = parseChips(s.md)
    const title = boldTitle(s.md, s.heading.replace(/^\d+\.\s*/, ''))
    if (chips.length) sets.push({ title: s.heading.replace(/^\d+\.\s*/, ''), kind: 'chip', items: chips })
    if (mcq.length) sets.push({ title, kind: 'mcq', items: mcq })
  }
  let m = 0
  let c = 0
  for (const set of sets) {
    if (set.kind === 'mcq') applyMcqKey(set.items, keys.mcq[m++] ?? [])
    else applyChipKey(set.items, keys.chip[c++] ?? [])
  }
  return sets
}

// ---------- exam answers ----------

export function parseAnswers(md: string): AnswerPair[] {
  const pairs: AnswerPair[] = []
  const parts = md.split(/^\*\*(?:Another )?[Pp]ossible question:\*\*\s*/m).slice(1)
  for (const part of parts) {
    const [q, ...rest] = part.split(/^\*\*Suggested answer:\*\*\s*$/m)
    if (!rest.length) continue
    pairs.push({ question: q.trim(), answer: rest.join('\n').trim() })
  }
  return pairs
}

// ---------- topics ----------

function parseMastery(md: string): string[] {
  return md
    .split('\n')
    .map((l) => /^-\s+\[[ xX]\]\s+(.+)$/.exec(l.trim())?.[1])
    .filter((x): x is string => Boolean(x))
}

export function parseTopic(code: string, title: string, body: string): ParsedTopic {
  const { intro, sections } = splitSections(body)
  const spec = sections.filter((s) => s.role === 'spec').map((s) => s.md).join('\n')
  const keys = parseKeys(spec)
  const visible = sections.filter((s) => s.role !== 'spec' && s.role !== 'delivery')
  return {
    code,
    title,
    intro,
    sections: visible,
    quizzes: buildQuizzes(visible, keys),
    answers: visible.filter((s) => s.role === 'answer').flatMap((s) => parseAnswers(s.md)),
    mastery: parseMastery(visible.find((s) => s.role === 'mastery')?.md ?? ''),
  }
}

/** All topics in the file, keyed by code ("1.5"). A topic ends at the next "# " or "## " heading. */
export function parseChapter(md: string): Record<string, ParsedTopic> {
  const out: Record<string, ParsedTopic> = {}
  const lines = md.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const m = /^## Topic (\d\.\d) - (.+?)\s*$/.exec(lines[i])
    if (!m) continue
    let end = i + 1
    while (end < lines.length && !/^#{1,2} /.test(lines[end])) end++
    out[m[1]] = parseTopic(m[1], m[2], lines.slice(i + 1, end).join('\n'))
  }
  return out
}
