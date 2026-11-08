import { useCallback, useSyncExternalStore } from 'react'
import { defaultSettings, effectiveSettings, parseSettings } from './settings'
import type { Settings } from './settings'

const KEY = 'ican-is-lab:settings'

interface Snapshot {
  raw: Settings
  effective: Settings
}

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? parseSettings(JSON.parse(raw)) : defaultSettings()
  } catch {
    return defaultSettings()
  }
}

const toSnapshot = (raw: Settings): Snapshot => ({ raw, effective: effectiveSettings(raw) })

let snapshot = toSnapshot(load())
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function update(patch: Partial<Settings>) {
  snapshot = toSnapshot({ ...snapshot.raw, ...patch })
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot.raw))
  } catch {
    // storage blocked: settings just last for this visit
  }
  listeners.forEach((l) => l())
}

export function useSettings() {
  const s = useSyncExternalStore(subscribe, () => snapshot)
  const set = useCallback((patch: Partial<Settings>) => update(patch), [])
  return { raw: s.raw, settings: s.effective, set }
}
