import type { Chapter, Unit } from '../../content/types'
import { completionPercent } from '../../state/progress'
import { chapter8Hash, unitHash } from '../../state/route'
import { BUILT_TOPICS } from '../rail/builtTopics'
import { topicId } from '../../content/chapters/ch07/topics'
import { BOARD_CHAPTERS, COMING_SOON } from './homeData'

/** A unit is playable once it has a lab, or it is a Chapter 7 topic whose lesson is built. */
export const isBuilt = (u: Unit): boolean => Boolean(u.labId || (u.topic && BUILT_TOPICS.has(u.topic.code)))

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
  if (!anyDone) return { label: 'Start Chapter 7', unit: units[0], returning: false }
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
  /** A chapter that opens as topic boards leads straight to its first board */
  href?: string
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
  const boards: ChapterCard[] = BOARD_CHAPTERS.map(({ sections, ...c }) => ({
    ...c,
    status: 'open',
    built: sections,
    total: sections,
    percent: 0,
    started: false,
    href: chapter8Hash('s1'),
  }))
  const soon: ChapterCard[] = COMING_SOON.map((c) => ({
    ...c,
    status: 'soon',
    built: 0,
    total: 0,
    percent: 0,
    started: false,
  }))
  return [...open, ...boards, ...soon].sort((a, b) => a.number - b.number)
}

/** Link for a Chapter 7 topic card, or null while the topic is not built yet (it then shows "Soon"). */
export function topicHref(chapters: readonly Chapter[], code: string): string | null {
  const unit = chapters.flatMap((c) => c.units).find((u) => u.id === topicId(code))
  return unit && isBuilt(unit) ? unitHash(unit.id) : null
}
