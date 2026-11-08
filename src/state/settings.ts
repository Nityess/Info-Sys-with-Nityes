// Reader settings. Pure helpers here; the store hook is in useSettings.ts.

export type TextSize = 's' | 'm' | 'l'

export interface Settings {
  /** Always reduce motion, on top of the phone's own preference */
  reduceMotion: boolean
  textSize: TextSize
  /** Teacher mode unlocks the switch below. Students never see it. */
  teacher: boolean
  /** Show the two questions taken from the study book */
  showSourceQuestions: boolean
  /** Preview of the animated concept scenes (Concept step and #/scenes pages). Teacher mode only. */
  showScenes: boolean
}

export const TEXT_PX: Record<TextSize, number> = { s: 15, m: 16, l: 18 }

export const defaultSettings = (): Settings => ({
  reduceMotion: false,
  textSize: 'm',
  teacher: false,
  showSourceQuestions: false,
  showScenes: false,
})

/** Validate whatever came out of localStorage. */
export function parseSettings(raw: unknown): Settings {
  const d = defaultSettings()
  if (typeof raw !== 'object' || raw === null) return d
  const r = raw as Record<string, unknown>
  const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback)
  return {
    reduceMotion: bool(r.reduceMotion, d.reduceMotion),
    textSize: r.textSize === 's' || r.textSize === 'm' || r.textSize === 'l' ? r.textSize : d.textSize,
    teacher: bool(r.teacher, d.teacher),
    showSourceQuestions: bool(r.showSourceQuestions, d.showSourceQuestions),
    showScenes: bool(r.showScenes, d.showScenes),
  }
}

/** What the app actually uses: the teacher-only switch counts only while teacher mode is on. */
export function effectiveSettings(s: Settings): Settings {
  return s.teacher ? s : { ...s, showSourceQuestions: false, showScenes: false }
}
