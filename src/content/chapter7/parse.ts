import type { AnswerPair, ParsedTopic, Role, Section } from './types.ts'
import { buildQuizzes, parseKeys } from './quizParse.ts'

export { parseKeys }

// Pure parser for content/chapter7.md. It runs at build time (see scripts/chapter7Plugin.ts)
// and in tests. Nothing here touches the file system or the DOM.

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

/**
 * Headings the keyword rules above get wrong, keyed by topic code and section number.
 * Examples: "Challenges of Outsourcing" is a concept (not a challenge quiz); "Innovation in Practice" is a concept.
 */
const ROLE_OVERRIDES: Readonly<Record<string, Readonly<Record<number, Role>>>> = {
  '1.2': { 3: 'compare', 4: 'concept', 7: 'source' },
  '1.3': { 6: 'concept' },
  '1.4': { 5: 'quiz' },
  '1.6': { 4: 'compare', 6: 'quiz' },
  '1.7': { 3: 'concept', 5: 'concept', 6: 'quiz' },
  '1.8': { 3: 'concept' },
}

/** Drops banner lines such as "**Next learning topic | Concept + numerical application**". */
const isBanner = (line: string) => /^\*\*[^*]*\|[^*]*\*\*\s*$/.test(line.trim())

function splitSections(code: string, body: string): { intro: string; sections: Section[] } {
  const lines = body.split('\n')
  const level = lines.some((l) => /^### /.test(l)) ? '### ' : '#### '
  const intro: string[] = []
  const raw: { heading: string; lines: string[] }[] = []
  for (const line of lines) {
    if (line.startsWith(level)) raw.push({ heading: line.slice(level.length).trim(), lines: [] })
    else if (raw.length) raw[raw.length - 1].lines.push(line)
    else if (!isBanner(line)) intro.push(line)
  }
  // A leading "Learning objectives" block belongs to the "What you will learn" text, not to a lesson part
  if (raw[0] && /learning objectives/i.test(raw[0].heading)) intro.push(...raw.shift()!.lines)
  const sections = raw.map((r, i): Section => {
    const n = Number(/^(\d+)\./.exec(r.heading)?.[1])
    return { heading: r.heading, role: ROLE_OVERRIDES[code]?.[n] ?? roleOf(r.heading, i), md: r.lines.join('\n').trim() }
  })
  return { intro: intro.join('\n').trim(), sections }
}

// ---------- exam answers ----------

export function parseAnswers(md: string): AnswerPair[] {
  const pairs: AnswerPair[] = []
  const parts = md.split(/^\*\*(?:Another )?(?:[Pp]ossible )?[Qq]uestion:\*\*\s*/m).slice(1)
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

/** Some topics put "**Mastery checklist**" at the end of the revision card. Moves it out of the card. */
function liftMastery(sections: Section[]): string[] {
  const own = sections.find((s) => s.role === 'mastery')
  if (own) return parseMastery(own.md)
  const marker = /^\*\*Mastery checklist\*\*/m
  const card = sections.find((s) => s.role === 'revise' && marker.test(s.md))
  if (!card) return []
  const items = parseMastery(card.md.slice(card.md.search(marker)))
  card.md = card.md.slice(0, card.md.search(marker)).trim()
  return items
}

export function parseTopic(code: string, title: string, body: string): ParsedTopic {
  const { intro, sections } = splitSections(code, body)
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
    mastery: liftMastery(visible),
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
