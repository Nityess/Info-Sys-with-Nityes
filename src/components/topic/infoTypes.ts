import type { ParsedTopic } from '../../content/chapter7/types'
import { parseBlocks } from '../rail/mdParse'
import { splitSubsections } from '../rail/splitSubsections'

// Reads the Topic 1.2 (Types of information) lesson out of its parsed teaching text.
// The page text comes from content/chapter7.md; nothing here is typed in by hand.

export type TypeKey = 'strategic' | 'tactical' | 'operational' | 'planning'

export const TYPE_ORDER: readonly TypeKey[] = ['strategic', 'tactical', 'operational', 'planning']

export const typeKeyOf = (name: string): TypeKey | null => {
  const k = name.trim().split(/\s+/)[0]?.toLowerCase() as TypeKey
  return TYPE_ORDER.includes(k) ? k : null
}

/** Display name: "strategic" becomes "Strategic". */
export const typeName = (k: TypeKey): string => k[0].toUpperCase() + k.slice(1)

const sectionBy = (t: ParsedTopic, part: string) => t.sections.find((s) => s.heading.toLowerCase().includes(part))

// ---------- Hook: four people in one bank ----------

export interface HookCard {
  /** "The Board", "Regional manager" */
  who: string
  /** One letter for the avatar */
  initial: string
  /** What they need, as a sentence */
  need: string
  type: TypeKey
}

/**
 * The hook lists four people with a need (a bullet list) and then the four types in the same order
 * (a numbered list). Pairs them up.
 */
export function parseHookCards(t: ParsedTopic): HookCard[] {
  const blocks = parseBlocks(sectionBy(t, 'simple business example')?.md ?? '')
  const ul = blocks.find((b) => b.t === 'ul')
  const ol = blocks.find((b) => b.t === 'ol')
  if (!ul || ul.t !== 'ul' || !ol || ol.t !== 'ol') return []
  return ul.items.flatMap((item, i): HookCard[] => {
    const type = typeKeyOf(ol.items[i] ?? '')
    const m = /^(.+?)\s+(wants|needs)\s+(.+)$/.exec(item)
    if (!type || !m) return []
    const who = m[1].replace(/^An?\s+/i, '')
    const role = who.replace(/^the\s+/i, '')
    return [{ who: who[0].toUpperCase() + who.slice(1), initial: role[0].toUpperCase(), need: `${m[2][0].toUpperCase()}${m[2].slice(1)} ${m[3]}`, type }]
  })
}

/** The line that closes the hook once the types are shown. */
export function hookClosing(t: ParsedTopic): string {
  const text = sectionBy(t, 'simple business example')?.md ?? ''
  return /That is why information is classified according to its use\./.exec(text)?.[0] ?? ''
}

// ---------- Concept: the four types ----------

export interface TypeInfo {
  key: TypeKey
  name: string
  /** "Board of Directors / Senior Managers" */
  who: string
  /** "Long-term focus" */
  focus: string
  meaning: string
  chars: string[]
  example: string
  clue: string
  /** The exam point, when the teaching text gives one */
  exam: string
}

/** Lines after `marker` that are bullets, up to the first line that is not. */
const bulletsAfter = (lines: string[], marker: RegExp): string[] => {
  const at = lines.findIndex((l) => marker.test(l.trim()))
  if (at < 0) return []
  const out: string[] = []
  for (const l of lines.slice(at + 1)) {
    const m = /^-\s+(.+)$/.exec(l.trim())
    if (m) out.push(m[1])
    else if (out.length || l.trim() !== '') break
  }
  return out
}

/** Reads one "#### 1. Strategic Information" part. */
export function parseTypeBlock(key: TypeKey, md: string): TypeInfo {
  const lines = md.split('\n')
  const find = (re: RegExp) => lines.map((l) => re.exec(l.trim())).find(Boolean)
  const who = find(/^\*\*Who uses it\?\*\*\s*(.+?)\.\s*\*\*(.+?)\.?\*\*/)
  const inline = find(/^\*Examples?[^*]*:\*\s*(.+)$/)
  const example = inline ? inline[1] : bulletsAfter(lines, /^\*Examples?[^*]*:\*$/).join(' ')
  return {
    key,
    name: typeName(key),
    who: who?.[1] ?? '',
    focus: who?.[2] ?? '',
    meaning: find(/^\*\*Meaning:\*\*\s*(.+)$/)?.[1] ?? '',
    chars: bulletsAfter(lines, /^(Key characteristics|The study material highlights):$/),
    example,
    clue: find(/^\*\*Memory clue:\*\*\s*(.+)$/)?.[1] ?? '',
    exam: find(/^\*\*(?:Important exam point|Exam alert):\*\*\s*(.+)$/)?.[1] ?? '',
  }
}

export function parseTypes(t: ParsedTopic): TypeInfo[] {
  const { parts } = splitSubsections(sectionBy(t, 'understand the four types')?.md ?? '')
  return parts.flatMap((p) => {
    const key = typeKeyOf(p.label)
    return key ? [parseTypeBlock(key, p.md)] : []
  })
}

// ---------- Compare and traps ----------

export interface CompareRow {
  key: TypeKey
  name: string
  who: string
  chars: string
}

/** The comparison table: type, who uses it, main characteristics. */
export function parseCompare(t: ParsedTopic): CompareRow[] {
  const table = parseBlocks(sectionBy(t, 'compare all four')?.md ?? '').find((b) => b.t === 'table')
  if (!table || table.t !== 'table') return []
  return table.rows.flatMap((r): CompareRow[] => {
    const key = typeKeyOf(r[0] ?? '')
    return key ? [{ key, name: typeName(key), who: r[1] ?? '', chars: r[2] ?? '' }] : []
  })
}

/** The paragraph under "Where does Planning fit?" in the management hierarchy part. */
export function planningFit(t: ParsedTopic): { head: string; text: string } {
  const blocks = parseBlocks(sectionBy(t, 'management hierarchy')?.md ?? '')
  const at = blocks.findIndex((b) => b.t === 'p' && /^\*\*Where does Planning (Information )?fit\?\*\*$/.test(b.text))
  const next = blocks[at + 1]
  const head = at >= 0 && blocks[at].t === 'p' ? blocks[at].text.replace(/\*\*/g, '') : ''
  return head && next?.t === 'p' ? { head, text: next.text } : { head: '', text: '' }
}

export interface Trap {
  n: number
  head: string
  /** The teaching text's explanation under the heading */
  note: string
  /** What students wrongly say; empty when the text gives none */
  wrong: string
  right: string
}

/** "**Trap 1: ...**" blocks, each with a "Correct:" and sometimes an "Incorrect:" line, or a "Remember:" line. */
export function parseTraps(t: ParsedTopic): Trap[] {
  const md = sectionBy(t, 'common exam traps')?.md ?? ''
  const heads = [...md.matchAll(/^\*\*Trap (\d+): (.+?)\*\*\s*$/gm)]
  return heads.map((m, i) => {
    const body = md.slice((m.index ?? 0) + m[0].length, heads[i + 1]?.index ?? md.length)
    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean)
    const pick = (re: RegExp) => lines.map((l) => re.exec(l)?.[1]).find(Boolean) ?? ''
    const correct = pick(/^-\s+Correct:\s*(.+)$/)
    return {
      n: Number(m[1]),
      head: m[2],
      note: lines.filter((l) => !l.startsWith('-') && !l.startsWith('**')).join(' '),
      wrong: pick(/^-\s+Incorrect:\s*(.+)$/),
      right: correct || pick(/^\*\*Remember:\*\*\s*(.+)$/),
    }
  })
}
