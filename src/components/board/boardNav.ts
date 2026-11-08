import type { Topic } from './types'

/** Previous or next topic id within a board, wrapping round at the ends. */
export function stepTopic(topics: readonly Pick<Topic, 'id'>[], id: string, by: 1 | -1): string {
  const at = Math.max(0, topics.findIndex((t) => t.id === id))
  return topics[(at + by + topics.length) % topics.length].id
}
