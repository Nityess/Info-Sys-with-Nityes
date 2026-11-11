import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { HOME_HASH, sectionHash } from '../../state/route'
import { Ico } from './Ico'
import { loadBank, loadBoard } from './boardData'
import type { BoardId } from './boardData'
import { stepTopic } from './boardNav'
import { TopicPanel } from './TopicPanel'
import type { Board, Mcq } from './types'
import './board.css'
import './board-demo.css'

interface Props {
  boardId: BoardId
  /** Topic to open first, from the link (for example 1.3) */
  initialTopic?: string
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
}

/** One section of Chapter 7: the heading, the topic tabs and the topic on show. Replaces the earlier scene pages. */
export function BoardPage({ boardId, initialTopic, dark, onToggleDark, settingsSlot }: Props) {
  const [loaded, setLoaded] = useState<{ board: Board; bank: Mcq[] } | null>(null)
  const [topicId, setTopicId] = useState<string | null>(initialTopic ?? null)

  useEffect(() => {
    let alive = true
    loadBoard(boardId).then(async (board) => {
      const bank = await loadBank(board.chapter)
      if (alive) setLoaded({ board, bank })
    })
    return () => {
      alive = false
    }
  }, [boardId])

  const board = loaded?.board
  const topic = board && (board.topics.find((t) => t.id === topicId) ?? board.topics[0])
  const accent = `bd-s${boardId[3]}`
  // Choosing a topic also puts it in the address, so a copied link opens the same topic (no page reload, no history entry)
  const choose = (b: Board, id: string) => {
    setTopicId(id)
    window.history.replaceState(null, '', sectionHash(`s${b.section}`, id))
  }

  return (
    <div className={`bd ${accent}`}>
      <header className="bd-wrap bd-head">
        <a className="bd-back" href={HOME_HASH}><ArrowLeft className="mr-1 h-4 w-4" aria-hidden /> Chapter {boardId[1]}</a>
        <span style={{ flex: 1 }} />
        <span className="bd-chip">Section {boardId[3]} of 3</span>
        <button type="button" className="bd-iconbtn" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
          {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
        </button>
        {settingsSlot}
      </header>

      <main className="bd-wrap bd-main">
        {!board || !topic ? (
          <p role="status" className="bd-sub">Loading the board…</p>
        ) : (
          <>
            <div>
              <h1 className="bd-h1 bd-serif">{board.title}</h1>
              <p className="bd-sub">{board.blurb}</p>
            </div>
            <nav className="bd-tabs" aria-label={`Section ${board.section} topics`}>
              {board.topics.map((t) => (
                <button key={t.id} type="button" aria-pressed={t.id === topic.id} className="bd-tb" onClick={() => choose(board, t.id)}>
                  <span className="bd-tbi"><Ico name={t.ic} /><b>{t.n}</b></span>
                  <span>{t.name}</span>
                </button>
              ))}
            </nav>
            <TopicPanel
              key={`${board.id}-${topic.id}`}
              topic={topic}
              bank={loaded.bank}
              onPrev={() => choose(board, stepTopic(board.topics, topic.id, -1))}
              onNext={() => choose(board, stepTopic(board.topics, topic.id, 1))}
            />
          </>
        )}
      </main>
    </div>
  )
}
