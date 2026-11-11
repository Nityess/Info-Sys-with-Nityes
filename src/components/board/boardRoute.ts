import type { Route } from '../../state/route'
import type { BoardId } from './boardData'

/** The board a route shows: "#/section/s1" is Chapter 7 section 1, Chapter 8 is the MIS Control Lab page, so it has no board. Other routes have none. */
export function boardIdForRoute(route: Route): BoardId | null {
  if (route.view === 'section') return `c7${route.id}` as BoardId
  return null
}

/** The topic a route asks for, if any. */
export const topicForRoute = (route: Route): string | undefined => (route.view === 'section' ? route.topic : undefined)

export const boardLabel = (id: BoardId): string => `Chapter ${id[1]} section ${id[3]} topic board`

/** Lesson topics whose Concept step can show the board's animation: Chapter 7 topic codes map to their section's board. */
export function boardForTopic(code: string): BoardId | null {
  const m = /^([1-3])\.\d$/.exec(code)
  return m ? (`c7s${m[1]}` as BoardId) : null
}
