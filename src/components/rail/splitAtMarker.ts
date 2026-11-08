/**
 * Splits markdown at the first line that starts with `marker`.
 * Everything before goes to "Concept"; the marker line and everything after goes to "Compare and traps".
 * If the marker is absent, nothing moves.
 */
export function splitAtMarker(md: string, marker: string): { before: string; after: string } {
  const lines = md.split('\n')
  const at = lines.findIndex((l) => l.trim().startsWith(marker))
  if (at < 0) return { before: md, after: '' }
  return { before: lines.slice(0, at).join('\n').trim(), after: lines.slice(at).join('\n').trim() }
}
