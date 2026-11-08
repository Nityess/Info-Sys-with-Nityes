// A small markdown parser for the subset used in content/chapter7.md.
// No library: paragraphs, headings, lists, tables, quotes, code blocks, rules.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; level: number; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'quote'; text: string }
  | { t: 'code'; text: string }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'hr' }

const cells = (line: string): string[] =>
  line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim())

const isSeparator = (line: string) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(line.trim())

export function parseBlocks(md: string): Block[] {
  const lines = md.split('\n')
  const out: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (trimmed === '') {
      i++
    } else if (trimmed.startsWith('```')) {
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) body.push(lines[i++])
      i++
      out.push({ t: 'code', text: body.join('\n') })
    } else if (/^#{1,6}\s/.test(trimmed)) {
      const m = /^(#{1,6})\s+(.*)$/.exec(trimmed)!
      out.push({ t: 'h', level: m[1].length, text: m[2] })
      i++
    } else if (/^-{3,}$/.test(trimmed)) {
      out.push({ t: 'hr' })
      i++
    } else if (trimmed.startsWith('|') && i + 1 < lines.length && isSeparator(lines[i + 1])) {
      const head = cells(trimmed)
      const rows: string[][] = []
      i += 2
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]))
      out.push({ t: 'table', head, rows })
    } else if (trimmed.startsWith('>')) {
      const body: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) body.push(lines[i++].trim().replace(/^>\s?/, ''))
      out.push({ t: 'quote', text: body.join(' ') })
    } else if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^[-*]\s+/, ''))
      out.push({ t: 'ul', items })
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+\.\s+/, ''))
      out.push({ t: 'ol', items })
    } else {
      const body: string[] = []
      while (i < lines.length && lines[i].trim() !== '' && !/^(```|#{1,6}\s|>|[-*]\s|\d+\.\s|\|)/.test(lines[i].trim())) body.push(lines[i++].trim())
      out.push({ t: 'p', text: body.join(' ') })
    }
  }
  return out
}

export type Inline = { t: 'text' | 'b' | 'i' | 'code'; text: string }

/** Splits **bold**, *italic* and `code` out of a line. */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ t: 'text', text: text.slice(last, m.index) })
    const tok = m[0]
    if (tok.startsWith('**')) out.push({ t: 'b', text: tok.slice(2, -2) })
    else if (tok.startsWith('`')) out.push({ t: 'code', text: tok.slice(1, -1) })
    else out.push({ t: 'i', text: tok.slice(1, -1) })
    last = m.index + tok.length
  }
  if (last < text.length) out.push({ t: 'text', text: text.slice(last) })
  return out
}
