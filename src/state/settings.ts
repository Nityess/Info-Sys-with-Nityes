// Reader settings. Pure helpers here; the store hook is in useSettings.ts.

export type TextSize = 's' | 'm' | 'l'

export interface Settings {
  /** Always reduce motion, on top of the phone's own preference */
  reduceMotion: boolean
  textSize: TextSize
  /** Teacher mode unlocks the two switches below. Students never see them. */
  teacher: boolean
  /** Show the new 18-topic Chapter 7 while it is being built */
  previewNewCh7: boolean
  /** Show the two questions taken from the study book */
  showSourceQuestions: boolean
}

export const TEXT_PX: Record<TextSize, number> = { s: 15, m: 16, l: 18 }

export const defaultSettings = (): Settings => ({
  reduceMotion: false,
  textSize: 'm',
  teacher: false,
  previewNewCh7: false,
  showSourceQuestions: false,
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
    previewNewCh7: bool(r.previewNewCh7, d.previewNewCh7),
    showSourceQuestions: bool(r.showSourceQuestions, d.showSourceQuestions),
  }
}

/** What the app actually uses: the teacher-only switches count only while teacher mode is on. */
export function effectiveSettings(s: Settings): Settings {
  return s.teacher ? s : { ...s, previewNewCh7: false, showSourceQuestions: false }
}
