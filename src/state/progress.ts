import { useCallback, useState } from 'react'
import type { Chapter } from '../content/types'

const DONE_KEY = 'ican-is-lab:completed'
const STARTED_KEY = 'ican-is-lab:started'

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

export type TopicStatus = 'not-started' | 'in-progress' | 'done'

/** Done wins over started, started wins over nothing. */
export function topicStatus(id: string, done: ReadonlySet<string>, started: ReadonlySet<string>): TopicStatus {
  if (done.has(id)) return 'done'
  return started.has(id) ? 'in-progress' : 'not-started'
}

function load(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

function save(key: string, ids: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...ids]))
  } catch {
    // storage unavailable (private mode etc.): progress just won't persist
  }
}

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(() => load(DONE_KEY))
  const [started, setStarted] = useState<Set<string>>(() => load(STARTED_KEY))

  const toggle = useCallback((unitId: string) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(unitId)) next.delete(unitId)
      else next.add(unitId)
      save(DONE_KEY, next)
      return next
    })
  }, [])

  /** Add-only: used when a lab's check step is passed. */
  const markDone = useCallback((unitId: string) => {
    setDone((prev) => {
      const next = withDone(prev, unitId)
      if (next !== prev) save(DONE_KEY, next)
      return next
    })
  }, [])

  /** Add-only: remembers that a topic was opened, for the In progress status. */
  const markStarted = useCallback((unitId: string) => {
    setStarted((prev) => {
      const next = withDone(prev, unitId)
      if (next !== prev) save(STARTED_KEY, next)
      return next
    })
  }, [])

  return { done, started, toggle, markDone, markStarted }
}
