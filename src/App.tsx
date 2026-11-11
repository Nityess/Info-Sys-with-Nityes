import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { useGame } from './state/useGame'
import { chapters } from './content/chapters'
import { SettingsMenu } from './components/SettingsMenu'
import { BUILT_TOPICS } from './components/rail/builtTopics'
import { useProgress } from './state/progress'
import { boardIdForRoute, boardLabel, topicForRoute } from './components/board/boardRoute'
import { Chapter10Page } from './components/chapter10/Chapter10Page'
import { Chapter9Hub } from './components/chapter9/Chapter9Hub'
import { SimPage } from './components/chapter9/SimPage'
import { findSim, simProgressId } from './content/chapter9/topics'
import { TEXT_PX } from './state/settings'
import { useRoute } from './state/useRoute'
import { useSettings } from './state/useSettings'

// Lazy so the animation library only downloads when the landing page is opened
const Landing = lazy(() => import('./components/home/Landing').then((m) => ({ default: m.Landing })))
const BoardPage = lazy(() => import('./components/board/BoardPage').then((m) => ({ default: m.BoardPage })))
const TopicLesson = lazy(() => import('./components/topic/TopicLesson').then((m) => ({ default: m.TopicLesson })))

const THEME_KEY = 'ican-is-lab:theme'
const SITE = 'Info System with ca.nityes'

function initialDark(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved === 'dark'
  } catch {
    // ignore
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export default function App() {
  const { done, started, markDone, markStarted } = useProgress()
  const game = useGame()
  const { raw, settings, set } = useSettings()
  const route = useRoute()
  const [dark, setDark] = useState(initialDark)

  const shown = chapters
  const allUnits = useMemo(() => shown.flatMap((c) => c.units), [shown])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_PX[settings.textSize]}px`
  }, [settings.textSize])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion)
  }, [settings.reduceMotion])

  // A topic that is not built yet has no page: its link goes back to the landing page
  const found = route.view === 'unit' ? allUnits.find((u) => u.id === route.id) : undefined
  const unit = found?.topic && BUILT_TOPICS.has(found.topic.code) ? found : undefined
  // Chapter 7 sections and Chapter 8 sections are the topic boards
  const boardId = boardIdForRoute(route)

  const sim = route.view === 'sim' ? findSim(route.slug) : undefined
  const simReady = sim?.ready ? sim : undefined
  const openSim = useCallback((slug: string) => markStarted(simProgressId(slug)), [markStarted])

  useEffect(() => {
    const what = unit
      ? unit.title
      : boardId
        ? boardLabel(boardId)
        : simReady
          ? `${simReady.number} ${simReady.title}`
          : route.view === 'chapter9'
            ? 'Chapter 9 Financial technology'
            : route.view === 'chapter10'
              ? 'Chapter 10 Data security'
              : null
    document.title = what ? `${what} | ${SITE}` : `${SITE} | ICAN Foundation Information Systems`
  }, [unit, boardId, simReady, route.view])

  const unitId = unit?.topic ? unit.id : null
  useEffect(() => {
    if (unitId) markStarted(unitId)
  }, [unitId, markStarted])

  const settingsMenu = <SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={() => setDark((d) => !d)} />

  if (boardId) {
    return (
      <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
        <BoardPage key={boardId} boardId={boardId} initialTopic={topicForRoute(route)} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
      </Suspense>
    )
  }

  if (route.view === 'chapter9') {
    return <Chapter9Hub started={started} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
  }

  if (simReady) {
    return <SimPage topic={simReady} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} onOpen={openSim} />
  }

  if (route.view === 'chapter10') {
    return <Chapter10Page dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
  }

  if (!unit) {
    return (
      <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
        <Landing
          chapters={shown}
          done={done}
          started={started}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          settingsSlot={<SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={() => setDark((d) => !d)} onDark />}
        />
      </Suspense>
    )
  }

  // Topics on the lesson screen use the whole window
  return (
    <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
      <TopicLesson key={unit.id} unit={unit} chapters={shown} done={done} xp={game.xp} claim={game.claim} onComplete={() => markDone(unit.id)} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
    </Suspense>
  )
}
