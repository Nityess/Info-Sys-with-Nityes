import { useCallback, useSyncExternalStore } from 'react'
import { defaultSettings, parseSettings } from './settings'
import type { Settings } from './settings'

const KEY = 'ican-is-lab:settings'

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? parseSettings(JSON.parse(raw)) : defaultSettings()
  } catch {
    return defaultSettings()
  }
}

let snapshot: Settings = load()
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function update(patch: Partial<Settings>) {
  snapshot = { ...snapshot, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot))
  } catch {
    // storage blocked: settings just last for this visit
  }
  listeners.forEach((l) => l())
}

export function useSettings() {
  const s = useSyncExternalStore(subscribe, () => snapshot)
  const set = useCallback((patch: Partial<Settings>) => update(patch), [])
  return { raw: s, settings: s, set }
}
