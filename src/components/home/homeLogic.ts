import type { Chapter, Unit } from '../../content/types'
import { completionPercent } from '../../state/progress'
import { COMING_SOON } from './homeData'

/** A unit is playable once it has a lesson (cards + practice) or a lab. */
export const isBuilt = (u: Unit): boolean => Boolean((u.cards && u.practice) || u.labId)

const builtUnits = (chapters: readonly Chapter[]): Unit[] => chapters.flatMap((c) => c.units).filter(isBuilt)

export interface HeroAction {
  label: string
  unit: Unit
  /** Set when the student has already finished something */
  returning: boolean
}

/** The main action: start at the top, continue at the next unfinished lesson, or review. */
export function heroAction(chapters: readonly Chapter[], done: ReadonlySet<string>): HeroAction | undefined {
  const units = builtUnits(chapters)
  if (units.length === 0) return undefined
  const anyDone = units.some((u) => done.has(u.id))
  if (!anyDone) return { label: 'Start the first lesson', unit: units[0], returning: false }
  const next = units.find((u) => !done.has(u.id))
  if (next) return { label: 'Continue your lesson', unit: next, returning: true }
  return { label: 'Review a lesson', unit: units[0], returning: true }
}

export interface ChapterCard {
  number: number
  title: string
  lo: string
  weight: number
  status: 'open' | 'soon'
  built: number
  total: number
  percent: number
  started: boolean
  /** Where the chapter button leads: the next unfinished lesson, else the first one */
  unitId?: string
}

/** Cards for chapters 7 to 10 in order: built chapters from content, the rest from the roadmap. */
export function chapterCards(chapters: readonly Chapter[], done: ReadonlySet<string>): ChapterCard[] {
  const open: ChapterCard[] = chapters.map((ch) => {
    const units = ch.units.filter(isBuilt)
    const next = units.find((u) => !done.has(u.id)) ?? units[0]
    return {
      number: ch.number,
      title: ch.title,
      lo: ch.lo,
      weight: ch.weight,
      status: 'open',
      built: units.length,
      total: ch.units.length,
      percent: completionPercent(ch, done),
      started: ch.units.some((u) => done.has(u.id)),
      unitId: next?.id,
    }
  })
  const soon: ChapterCard[] = COMING_SOON.map((c) => ({
    ...c,
    status: 'soon',
    built: 0,
    total: 0,
    percent: 0,
    started: false,
  }))
  return [...open, ...soon].sort((a, b) => a.number - b.number)
}
