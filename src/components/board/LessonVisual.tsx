import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { boardForTopic } from './boardRoute'
import { loadBoard } from './boardData'
import { SimpleWords } from './SimpleWords'
import { TopicVisual } from './TopicPanel'
import type { Topic } from './types'
import './board.css'
import './board-demo.css'

/**
 * The board's "Watch how it works" animation and "In simple words" block for one topic, shown on the lesson's Concept step
 * (teacher preview). Same data as the board page.
 */
export function LessonVisual({ code }: { code: string }) {
  const [topic, setTopic] = useState<Topic | null>(null)
  const [run, setRun] = useState(0)
  const id = boardForTopic(code)

  useEffect(() => {
    const live = { on: true }
    if (id) {
      loadBoard(id).then((b) => {
        if (live.on) setTopic(b.topics.find((t) => t.id === code) ?? null)
      })
    }
    return () => {
      live.on = false
    }
  }, [id, code])

  if (!id || !topic) return null
  return (
    <div className={`bd bd-s${id[3]} bd-embed`}>
      <div className="bd-actions" style={{ justifyContent: 'flex-end', marginBottom: '.75rem' }}>
        <button type="button" className="bd-btn" onClick={() => setRun((r) => r + 1)}>
          <RotateCcw className="h-[1.125rem] w-[1.125rem]" aria-hidden />
          Replay
        </button>
      </div>
      <div key={run} className="bd-body" style={{ minHeight: 0 }}>
        <TopicVisual topic={topic} />
        <SimpleWords topic={topic} />
      </div>
    </div>
  )
}
