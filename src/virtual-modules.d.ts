declare module 'virtual:chapter7' {
  import type { ParsedTopic } from './content/chapter7/types'
  /** Parsed Chapter 7 topics keyed by code ("1.5"). Built from content/chapter7.md. */
  export const topics: Record<string, ParsedTopic>
}
