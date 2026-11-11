import type { Board, Mcq } from './types'

export type BoardId = 'c7s1' | 'c7s2' | 'c7s3'

export const BOARD_IDS: readonly BoardId[] = ['c7s1', 'c7s2', 'c7s3']

/** Each section downloads on its own, only when its board is opened. */
const BOARDS: Record<BoardId, () => Promise<unknown>> = {
  c7s1: () => import('../../content/boards/c7s1.json'),
  c7s2: () => import('../../content/boards/c7s2.json'),
  c7s3: () => import('../../content/boards/c7s3.json'),
}

const BANKS: Record<7, () => Promise<unknown>> = {
  7: () => import('../../content/boards/mcq7.json'),
}

const unwrap = <T,>(m: unknown): T => (m as { default: T }).default

export const loadBoard = async (id: BoardId): Promise<Board> => unwrap<Board>(await BOARDS[id]())
export const loadBank = async (chapter: 7): Promise<Mcq[]> => unwrap<Mcq[]>(await BANKS[chapter]())

/** Board id for a chapter and section number, for the routes. */
export const boardId = (chapter: 7, section: number): BoardId | null => {
  const id = `c${chapter}s${section}`
  return (BOARD_IDS as readonly string[]).includes(id) ? (id as BoardId) : null
}
