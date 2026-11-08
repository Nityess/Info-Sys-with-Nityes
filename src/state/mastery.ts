import { useCallback, useState } from 'react'

const KEY = 'ican-is-lab:mastery'

/** Checked line numbers per topic id. Pure helpers first, hook below. */
export type MasteryMap = Record<string, number[]>

export function toggleChecked(checked: readonly number[], index: number): number[] {
  return checked.includes(index) ? checked.filter((i) => i !== index) : [...checked, index].sort((a, b) => a - b)
}

export const isComplete = (checked: readonly number[], total: number): boolean => total > 0 && checked.filter((i) => i >= 0 && i < total).length === total

/** Validate whatever came out of localStorage. */
export function parseMastery(raw: unknown): MasteryMap {
  if (typeof raw !== 'object' || raw === null) return {}
  const out: MasteryMap = {}
  for (const [id, v] of Object.entries(raw)) {
    if (Array.isArray(v)) out[id] = v.filter((n): n is number => Number.isInteger(n) && n >= 0)
  }
  return out
}

function load(): MasteryMap {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? parseMastery(JSON.parse(raw)) : {}
  } catch {
    return {}
  }
}

function save(m: MasteryMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m))
  } catch {
    // storage blocked: ticks last for this visit only
  }
}

export function useMastery(topicId: string) {
  const [map, setMap] = useState<MasteryMap>(load)
  const checked = map[topicId] ?? []
  const toggle = useCallback(
    (index: number) =>
      setMap((prev) => {
        const next = { ...prev, [topicId]: toggleChecked(prev[topicId] ?? [], index) }
        save(next)
        return next
      }),
    [topicId],
  )
  return { checked, toggle }
}
