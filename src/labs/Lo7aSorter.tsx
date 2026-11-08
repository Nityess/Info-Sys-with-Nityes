import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { SCENARIOS, answeredCount, isComplete, scoreSort } from './lo7aLogic'
import type { Bucket, SortAnswers } from './lo7aLogic'
import { TAG_STYLE } from './lo7aStyles'

const BUCKETS: Bucket[] = ['legal', 'commercial']

/** Lab widget: sort each scenario into a syllabus heading. */
export function Lo7aSorter() {
  const [answers, setAnswers] = useState<SortAnswers>({})
  const done = isComplete(answers)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">Legal or commercial?</h3>
        <span className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
          {scoreSort(answers)} / {SCENARIOS.length} correct
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Which requirement does each case show?</p>

      <ol className="space-y-2">
        {SCENARIOS.map((s) => {
          const chosen = answers[s.id]
          const right = chosen === s.bucket
          return (
            <li key={s.id} className="rounded-md border border-slate-200 p-3 text-sm dark:border-slate-700">
              <p>{s.text}</p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a heading">
                {BUCKETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={chosen === b}
                    onClick={() => setAnswers({ ...answers, [s.id]: b })}
                    className={`rounded px-2 py-1 text-xs font-medium ring-1 ring-slate-300 dark:ring-slate-600 ${
                      chosen === b ? TAG_STYLE[b].chip + ' ring-2 ring-indigo-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {TAG_STYLE[b].label}
                  </button>
                ))}
              </div>
              {chosen && (
                <p className="mt-2 flex items-start gap-1.5" aria-live="polite">
                  {right ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden />
                  )}
                  <span>{right ? s.why : 'Not quite. Think: is this duty set by law, or by business value?'}</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm" aria-live="polite">
          {done
            ? scoreSort(answers) === SCENARIOS.length
              ? 'Perfect sort!'
              : 'Fix the red ones, then try the check below.'
            : `${answeredCount(answers)} of ${SCENARIOS.length} sorted`}
        </p>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset
        </button>
      </div>
    </div>
  )
}
