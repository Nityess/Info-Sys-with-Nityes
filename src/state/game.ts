// XP and daily streak. Pure functions so they are unit-tested; the hook lives in useGame.ts.

export interface GameState {
  xp: number
  /** Consecutive days with activity, as of lastDay */
  streak: number
  /** Local date (YYYY-MM-DD) of the last activity */
  lastDay: string | null
  /** Reward keys already paid out, e.g. "ch07-accurate:play" */
  claimed: string[]
}

export const emptyGame = (): GameState => ({ xp: 0, streak: 0, lastDay: null, claimed: [] })

function dayNumber(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}

/** Record activity today: same day keeps the streak, next day extends it, a gap restarts at 1. */
export function touchStreak(s: GameState, today: string): GameState {
  if (s.lastDay === today) return s
  const gap = s.lastDay === null ? null : dayNumber(today) - dayNumber(s.lastDay)
  return { ...s, streak: gap === 1 ? s.streak + 1 : 1, lastDay: today }
}

/** Streak to show right now: 0 once a full day has been missed. */
export function currentStreak(s: GameState, today: string): number {
  if (s.lastDay === null) return 0
  return dayNumber(today) - dayNumber(s.lastDay) > 1 ? 0 : s.streak
}

/** Pay out `xp` once per key. Returns the XP actually granted (0 if already claimed). */
export function claimXp(s: GameState, key: string, xp: number, today: string): { state: GameState; granted: number } {
  const t = touchStreak(s, today)
  if (t.claimed.includes(key)) return { state: t, granted: 0 }
  return { state: { ...t, xp: t.xp + xp, claimed: [...t.claimed, key] }, granted: xp }
}

export const levelOf = (xp: number): number => Math.floor(xp / 100) + 1

/** Validate whatever came out of localStorage. */
export function parseGame(raw: unknown): GameState {
  if (typeof raw !== 'object' || raw === null) return emptyGame()
  const r = raw as Record<string, unknown>
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : 0)
  return {
    xp: num(r.xp),
    streak: num(r.streak),
    lastDay: typeof r.lastDay === 'string' ? r.lastDay : null,
    claimed: Array.isArray(r.claimed) ? r.claimed.filter((k): k is string => typeof k === 'string') : [],
  }
}
