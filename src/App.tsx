import { Suspense, useEffect, useMemo, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { chapters } from './content/chapters'
import type { ConceptCard, Unit } from './content/types'
import { ConceptCards } from './components/ConceptCards'
import { ScenarioSorter } from './components/ScenarioSorter'
import { Sidebar } from './components/Sidebar'
import { SplitLayout } from './components/SplitLayout'
import { HintBar } from './components/HintBar'
import { QuizConsole } from './components/QuizConsole'
import { labs } from './labs/registry'
import { useProgress } from './state/progress'

const THEME_KEY = 'ican-is-lab:theme'

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
  const { done, toggle, markDone } = useProgress()
  const allUnits = useMemo(() => chapters.flatMap((c) => c.units), [])
  const [selectedId, setSelectedId] = useState(allUnits[0].id)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dark, setDark] = useState(initialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  const unit = allUnits.find((u) => u.id === selectedId) ?? allUnits[0]
  const isDone = done.has(unit.id)

  const select = (id: string) => {
    setSelectedId(id)
    setDrawerOpen(false)
  }

  const sidebar = <Sidebar chapters={chapters} done={done} selectedId={selectedId} onSelect={select} />

  return (
    <div className="flex h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white md:block dark:border-slate-700 dark:bg-slate-900">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Chapters">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] overflow-y-auto bg-white pt-8 dark:bg-slate-900">
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
          <button
            type="button"
            aria-label="Open menu"
            className="rounded p-1 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-base font-semibold">
            {unit.lo} · {unit.title}
          </h1>
          <button
            type="button"
            onClick={() => toggle(unit.id)}
            className="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            {isDone ? 'Mark not done' : 'Mark done'}
          </button>
          <button
            type="button"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <UnitView key={unit.id} unit={unit} onPass={() => markDone(unit.id)} />
        {unit.hints && <HintBar key={`hints-${unit.id}`} content={unit.hints} />}
      </div>
    </div>
  )
}

function UnitView({ unit, onPass }: { unit: Unit; onPass: () => void }) {
  if (unit.cards) return <CardsUnitView unit={unit} cards={unit.cards} onPass={onPass} />
  const entry = unit.labId ? labs[unit.labId] : undefined
  if (!entry) {
    return <SplitLayout visualizer={<Placeholder title="Concept visualizer" />} lab={<Placeholder title="Lab" />} />
  }
  const { Visualizer, Lab } = entry
  const loading = <p className="text-sm text-slate-500">Loading…</p>
  return (
    <SplitLayout
      visualizer={
        <Suspense fallback={loading}>
          <Visualizer />
        </Suspense>
      }
      lab={
        <div className="space-y-5">
          {unit.objective && (
            <p className="rounded-md bg-indigo-50 p-2 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">
              <strong>Objective · </strong>
              {unit.objective}
            </p>
          )}
          <Suspense fallback={loading}>
            <Lab />
          </Suspense>
          {unit.quiz && unit.quiz.length > 0 && <QuizConsole items={unit.quiz} onPass={onPass} />}
        </div>
      }
    />
  )
}

/** Data-driven unit: mind-map leaves as cards, then a "match it" practice. */
function CardsUnitView({ unit, cards, onPass }: { unit: Unit; cards: ConceptCard[]; onPass: () => void }) {
  const chip = 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100'
  return (
    <SplitLayout
      visualizer={<ConceptCards title={unit.title} cards={cards} />}
      lab={
        <div className="space-y-5">
          {unit.objective && (
            <p className="rounded-md bg-indigo-50 p-2 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">
              {unit.objective}
            </p>
          )}
          {unit.practice && unit.practice.length > 0 && (
            <ScenarioSorter
              title="Match it"
              prompt="Which card does each example belong to?"
              buckets={cards.map((c) => ({ id: c.id, label: c.short, chip }))}
              items={unit.practice}
              wrongHint="Not quite. Open the cards on the left and try again."
              onPerfect={onPass}
            />
          )}
        </div>
      }
    />
  )
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-sm text-slate-500 dark:text-slate-400">
      <p className="font-medium text-slate-700 dark:text-slate-300">{title}</p>
      <p>Placeholder. The real content for this unit is built in its own step.</p>
    </div>
  )
}
