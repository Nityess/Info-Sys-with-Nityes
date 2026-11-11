import { exploredCount } from '../../content/chapter9/topics'
import { BOARD_CHAPTERS } from './homeData'

export interface ChapterCard {
  number: number
  title: string
  lo: string
  weight: number
  status: 'open'
  /** Where the chapter button leads */
  href: string
  /** The one fact line on the card: label and value */
  row: readonly [string, string]
  /** A short label that replaces "Open now" on a new chapter */
  badge?: string
  /** True once the student has opened something in the chapter (Chapter 9 simulators) */
  started: boolean
}

/** Cards for chapters 7 to 10 in order. Chapter 9 shows how many simulators the student has opened. */
export function chapterCards(started: ReadonlySet<string> = new Set()): ChapterCard[] {
  const { explored, total } = exploredCount(started)
  return BOARD_CHAPTERS.map((c) => ({
    ...c,
    row: (c.number === 9 && explored > 0 ? ['Explored', `${explored} of ${total}`] : c.row) as readonly [string, string],
    status: 'open' as const,
    started: c.number === 9 && explored > 0,
  })).sort((a, b) => a.number - b.number)
}

/** Where a chapter card leads. */
export const cardHref = (c: ChapterCard): string => c.href

/** The one fact line on a chapter card: label and value. */
export const cardFact = (c: ChapterCard): readonly [string, string] => c.row
