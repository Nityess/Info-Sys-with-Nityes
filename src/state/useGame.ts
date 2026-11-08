import { useCallback, useRef, useState } from 'react'
import { claimXp, currentStreak, emptyGame, levelOf, parseGame } from './game'
import type { GameState } from './game'

const KEY = 'ican-is-lab:game'

const today = () => new Date().toLocaleDateString('en-CA')

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? parseGame(JSON.parse(raw)) : emptyGame()
  } catch {
    return emptyGame()
  }
}

function save(s: GameState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // storage unavailable: XP just won't persist
  }
}

export function useGame() {
  const [game, setGame] = useState<GameState>(load)
  const latest = useRef(game)

  /** Pay out XP once per key. Returns the XP granted now (0 if already earned). */
  const claim = useCallback((key: string, xp: number): number => {
    const r = claimXp(latest.current, key, xp, today())
    latest.current = r.state
    setGame(r.state)
    save(r.state)
    return r.granted
  }, [])

  return { xp: game.xp, level: levelOf(game.xp), streak: currentStreak(game, today()), claim }
}
