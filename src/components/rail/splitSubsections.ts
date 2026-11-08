export interface Subsection {
  /** Short pill label, e.g. "Accurate" from "A - Accurate" */
  label: string
  md: string
}

/** "1. Strategic Information" gives "Strategic Information"; "A - Accurate" gives "Accurate"; "Benefit 1 - Focus" gives "Benefit 1 - Focus". */
export function subLabel(heading: string): string {
  const text = heading.replace(/^\d+\.\s*/, '').trim()
  const m = /^([A-Z]|\d+)\s+-\s+(.+)$/.exec(text)
  return m ? m[2] : text
}

/**
 * Splits a concept section at its "#### " headings. Returns the text before the first one (lead)
 * and the parts, or no parts when there are fewer than 3 (then the section stays whole).
 */
export function splitSubsections(md: string): { lead: string; parts: Subsection[] } {
  const lines = md.split('\n')
  const starts = lines.flatMap((l, i) => (l.startsWith('#### ') ? [i] : []))
  if (starts.length < 3) return { lead: md, parts: [] }
  return {
    lead: lines.slice(0, starts[0]).join('\n').trim(),
    parts: starts.map((at, i) => ({
      label: subLabel(lines[at].slice(5)),
      md: lines.slice(at + 1, starts[i + 1] ?? lines.length).join('\n').trim(),
    })),
  }
}
