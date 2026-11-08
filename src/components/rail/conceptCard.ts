// Turns one concept part of the teaching text (a "#### A - Accurate" block) into a card:
// the exam-ready wording, one easy example and a memory clue to picture. Nothing is written here by hand.

export interface ConceptCard {
  name: string
  /** The wording to write in the exam: the meaning, or the first plain sentence */
  definition: string
  /** The key points (first bullet list that is not the example) */
  points: string[]
  /** The easy example from the text */
  example: string
  /** Memory clue, e.g. "Strategic = Big picture + Long-term + Major decisions." */
  clue: string
  /** Exam point, alert or nuance when the text has one */
  exam: string
}

const EXAMPLE_LABEL = /^\*[^*]*[Ee]xamples?[^*]*:\*\s*(.*)$/
const bold = (label: string) => new RegExp(`^\\*\\*(?:${label}):\\*\\*\\s*(.*)$`)

/** Lines of the block that are bullets, grouped, with the line that came just before each group. */
function bulletGroups(lines: string[]): { before: string; items: string[] }[] {
  const groups: { before: string; items: string[] }[] = []
  lines.forEach((l, i) => {
    const m = /^[-*]\s+(.+)$/.exec(l)
    if (!m) return
    const prev = lines[i - 1]
    if (prev !== undefined && /^[-*]\s+/.test(prev)) groups[groups.length - 1].items.push(m[1])
    else groups.push({ before: prev ?? '', items: [m[1]] })
  })
  return groups
}

export function parseConceptCard(name: string, md: string): ConceptCard {
  const lines = md.split('\n').map((l) => l.trim()).filter(Boolean)
  const find = (re: RegExp) => lines.map((l) => re.exec(l)).find(Boolean)
  const groups = bulletGroups(lines)

  // Example: an italic "Example:" label (text after it, or the bullets or paragraph that follow), else an
  // "Imagine ..." paragraph, else a bold "Example:" or "Illustration:" line
  let example = ''
  const at = lines.findIndex((l) => EXAMPLE_LABEL.test(l))
  if (at >= 0) {
    const inline = EXAMPLE_LABEL.exec(lines[at])![1]
    const after = lines.slice(at + 1)
    const bullets: string[] = []
    for (const l of after) {
      const m = /^[-*]\s+(.+)$/.exec(l)
      if (!m) break
      bullets.push(m[1])
    }
    example = inline || (bullets.length ? bullets.join(' ') : (after[0] ?? ''))
  } else {
    example = lines.find((l) => /^Imagine\b/.test(l)) ?? find(bold('Example|Illustration'))?.[1] ?? ''
  }

  const points = groups.find((g) => !EXAMPLE_LABEL.test(g.before))?.items ?? []
  const plain = lines.find((l) => !/^([-*>#|]|\d+\.)/.test(l) && !/:$/.test(l) && !/^(What does this mean|Imagine\b|The study material)/.test(l))
  const meaning = find(bold('Meaning'))?.[1]
  return {
    name,
    definition: meaning ?? plain ?? '',
    points,
    example,
    clue: find(bold('Remember|Memory clue|Memory idea|Key idea'))?.[1] ?? '',
    exam: find(bold('Important exam point|Exam alert|Important nuance'))?.[1] ?? '',
  }
}

/** The memory clue as pieces to picture: "Strategic = Big picture + Long-term" gives ["Big picture", "Long-term"]. */
export function clueParts(clue: string): string[] {
  const body = clue.includes('=') ? clue.slice(clue.indexOf('=') + 1) : clue
  return body
    .replace(/\.$/, '')
    .split(/\s+\+\s+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/** A card is worth showing as a card when it has wording to learn and either an example or a clue. */
export const isRichCard = (c: ConceptCard): boolean => Boolean((c.definition || c.points.length) && (c.example || c.clue))
