import { CheckCircle2, Circle } from 'lucide-react'
import type { Chapter } from '../content/types'
import { completionPercent } from '../state/progress'
import { sectionHash } from '../state/route'
import { isBuilt } from './home/homeLogic'
import { themeFor } from './sectionTheme'

interface Props {
  chapters: Chapter[]
  done: ReadonlySet<string>
  selectedId: string
  onSelect: (unitId: string) => void
}

export function Sidebar({ chapters, done, selectedId, onSelect }: Props) {
  return (
    <nav aria-label="Chapters" className="p-3">
      {chapters.map((ch) => {
        const pct = completionPercent(ch, done)
        return (
          <section key={ch.id} className="mb-4">
            <h2 className="flex items-baseline justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span>
                Ch {ch.number} · {ch.title}
              </span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{pct}%</span>
            </h2>
            <div
              className="mt-1 h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${ch.title} completion`}
            >
              <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
            </div>
            <ul className="mt-2 space-y-0.5">
              {ch.units.map((u, i) => {
                const active = u.id === selectedId
                const heading = u.section && u.section !== ch.units[i - 1]?.section ? u.section : null
                return (
                  <li key={u.id}>
                    {heading && (
                      <p className={`mt-2 px-2 pb-0.5 text-xs font-semibold uppercase tracking-wide ${themeFor(heading).accentText}`}>
                        {u.sectionId ? (
                          <a href={sectionHash(u.sectionId)} className="underline-offset-2 hover:underline">
                            {heading}
                          </a>
                        ) : (
                          heading
                        )}
                      </p>
                    )}
                    <button
                      type="button"
                      disabled={Boolean(u.topic) && !isBuilt(u)}
                      onClick={() => onSelect(u.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-left text-sm ${
                        active
                          ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100'
                          : 'text-slate-700 hover:bg-slate-100 disabled:opacity-60 disabled:hover:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      {done.has(u.id) ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-label="Completed" />
                      ) : (
                        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      )}
                      <span>
                        <span className="font-medium">{u.lo}</span> {u.title}
                        {u.topic && !isBuilt(u) && <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">(soon)</span>}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </nav>
  )
}
