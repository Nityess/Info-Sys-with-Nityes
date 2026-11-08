import { Suspense } from 'react'
import type { Unit } from '../content/types'
import { labs } from '../labs/registry'
import { QuizConsole } from './QuizConsole'
import { SplitLayout } from './SplitLayout'

interface Props {
  unit: Unit
  onPass: () => void
}

/** Picks how a lab unit is shown: its visualizer and lab, or a placeholder. Chapter 7 topics use the lesson screen (see App). */
export function UnitView({ unit, onPass }: Props) {
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

function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-sm text-slate-500 dark:text-slate-400">
      <p className="font-medium text-slate-700 dark:text-slate-300">{title}</p>
      <p>Placeholder. The real content for this unit is built in its own step.</p>
    </div>
  )
}
