import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { Flame, House, Menu, Moon, Sun, X, Zap } from 'lucide-react'
import { useGame } from './state/useGame'
import { chapters } from './content/chapters'
import { Sidebar } from './components/Sidebar'
import { SettingsMenu } from './components/SettingsMenu'
import { HintBar } from './components/HintBar'
import { UnitView } from './components/UnitView'
import { BUILT_TOPICS, LESSON_SHELL_TOPICS } from './components/rail/builtTopics'
import { useProgress } from './state/progress'
import { boardIdForRoute, boardLabel, topicForRoute } from './components/board/boardRoute'
import { HOME_HASH, unitHash } from './state/route'
import { Chapter10Page } from './components/chapter10/Chapter10Page'
import { TEXT_PX } from './state/settings'
import { navigate, useRoute } from './state/useRoute'
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
  const { done, toggle, markDone, markStarted } = useProgress()
  const game = useGame()
  const { raw, settings, set } = useSettings()
  const route = useRoute()
  // The phone menu remembers the page it was opened on, so any navigation closes it by itself
  const routeKey = route.view === 'home' || route.view === 'chapter10' ? route.view : `${route.view}:${route.id}`
  const [drawerFor, setDrawerFor] = useState<string | null>(null)
  const drawerOpen = drawerFor === routeKey
  const setDrawerOpen = (open: boolean) => setDrawerFor(open ? routeKey : null)
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
  const unit = found && (!found.topic || BUILT_TOPICS.has(found.topic.code)) ? found : undefined
  // Chapter 7 sections and Chapter 8 sections are the topic boards
  const boardId = boardIdForRoute(route)

  useEffect(() => {
    const what = unit ? unit.title : boardId ? boardLabel(boardId) : route.view === 'chapter10' ? 'Chapter 10 Data security' : null
    document.title = what ? `${what} | ${SITE}` : `${SITE} | ICAN Foundation Information Systems`
  }, [unit, boardId, route.view])

  const unitId = unit?.topic ? unit.id : null
  useEffect(() => {
    if (unitId) markStarted(unitId)
  }, [unitId, markStarted])

  const select = (id: string) => {
    navigate(unitHash(id))
    setDrawerOpen(false)
  }

  const settingsMenu = <SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={() => setDark((d) => !d)} />

  if (boardId) {
    return (
      <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
        <BoardPage key={boardId} boardId={boardId} initialTopic={topicForRoute(route)} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
      </Suspense>
    )
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
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          settingsSlot={<SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={() => setDark((d) => !d)} onDark />}
        />
      </Suspense>
    )
  }

  // Topics on the new lesson screen use the whole window: no sidebar, no old header
  if (unit?.topic && LESSON_SHELL_TOPICS.has(unit.topic.code)) {
    return (
      <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
        <TopicLesson key={unit.id} unit={unit} chapters={shown} done={done} xp={game.xp} claim={game.claim} onComplete={() => markDone(unit.id)} dark={dark} onToggleDark={() => setDark((d) => !d)} settingsSlot={settingsMenu} />
      </Suspense>
    )
  }

  const sidebar = <Sidebar chapters={shown} done={done} selectedId={unit?.id ?? ''} onSelect={select} />

  return (
    <div className="flex h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white md:block dark:border-slate-700 dark:bg-slate-900">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Chapters">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <aside
            className="absolute inset-y-0 left-0 w-72 max-w-[85%] overflow-y-auto bg-white pt-8 dark:bg-slate-900"
            onClick={(e) => (e.target as HTMLElement).closest('a') && setDrawerOpen(false)}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute right-2 top-2 rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setDrawerOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <button type="button" aria-label="Open menu" className="rounded p-1 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800" onClick={() => setDrawerOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <a href={HOME_HASH} className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
            <House className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Home</span>
            <span className="sr-only sm:hidden">Home</span>
          </a>
          <h1 className="min-w-0 flex-1 truncate text-base font-semibold">{`${unit.lo} · ${unit.title}`}</h1>
          <span className="hidden items-center gap-3 text-sm font-semibold tabular-nums sm:flex" aria-label={`Level ${game.level}, ${game.xp} XP, ${game.streak} day streak`}>
            <span className="inline-flex items-center gap-1 text-amber-600" title="Daily streak">
              <Flame className="h-4 w-4" aria-hidden /> {game.streak}
            </span>
            <span className="inline-flex items-center gap-1 text-spruce" title={`Level ${game.level}`}>
              <Zap className="h-4 w-4" aria-hidden /> {game.xp} XP
            </span>
          </span>
          {unit && (
            <button
              type="button"
              onClick={() => toggle(unit.id)}
              className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              {done.has(unit.id) ? 'Mark not done' : 'Mark done'}
            </button>
          )}
          <button
            type="button"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {settingsMenu}
        </header>

        <UnitView key={unit.id} unit={unit} onPass={() => markDone(unit.id)} />
        {unit.hints && <HintBar key={`hints-${unit.id}`} content={unit.hints} />}
      </div>
    </div>
  )
}
