import { useCallback, useState } from 'react'
import type { Chapter } from '../content/types'

const KEY = 'ican-is-lab:completed'

/** Percent (0-100, rounded) of a chapter's units that are completed. */
export function completionPercent(chapter: Chapter, done: ReadonlySet<string>): number {
  if (chapter.units.length === 0) return 0
  const n = chapter.units.filter((u) => done.has(u.id)).length
  return Math.round((n / chapter.units.length) * 100)
}

/** Returns a set with unitId added (same set if already present, so React can skip a re-render). */
export function withDone(done: Set<string>, unitId: string): Set<string> {
  if (done.has(unitId)) return done
  const next = new Set(done)
  next.add(unitId)
  return next
}

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

function save(done: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...done]))
  } catch {
    // storage unavailable (private mode etc.): progress just won't persist
  }
}

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(load)

  const toggle = useCallback((unitId: string) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(unitId)) next.delete(unitId)
      else next.add(unitId)
      save(next)
      return next
    })
  }, [])

  /** Add-only: used when a lab's check step is passed. */
  const markDone = useCallback((unitId: string) => {
    setDone((prev) => {
      const next = withDone(prev, unitId)
      if (next !== prev) save(next)
      return next
    })
  }, [])

  return { done, toggle, markDone }
}
