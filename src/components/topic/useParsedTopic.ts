import { useEffect, useState } from 'react'
import type { ParsedTopic } from '../../content/chapter7/types'

/** Loads one parsed topic from content/chapter7.md on demand, so the content only downloads when a topic is opened. */
export function useParsedTopic(code: string): ParsedTopic | null {
  const [data, setData] = useState<ParsedTopic | null>(null)
  useEffect(() => {
    let alive = true
    import('virtual:chapter7').then((m) => {
      if (alive) setData(m.topics[code] ?? null)
    })
    return () => {
      alive = false
    }
  }, [code])
  return data
}
