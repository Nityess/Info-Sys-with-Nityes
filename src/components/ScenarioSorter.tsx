import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { answeredCount, isComplete, scoreSort } from './sorterLogic'
import type { SortAnswers, SortItem } from './sorterLogic'

export interface BucketDef<B extends string> {
  id: B
  label: string
  /** Tailwind classes for the selected state */
  chip: string
}

interface Props<B extends string> {
  title: string
  prompt: string
  buckets: BucketDef<B>[]
  items: SortItem<B>[]
  /** Feedback when a wrong bucket is chosen */
  wrongHint: string
}

/** Lab widget: put each item in one bucket, with instant feedback, score and reset. */
export function ScenarioSorter<B extends string>({ title, prompt, buckets, items, wrongHint }: Props<B>) {
  const [answers, setAnswers] = useState<SortAnswers<B>>({})
  const score = scoreSort(answers, items)
  const done = isComplete(answers, items)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
          {score} / {items.length} correct
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{prompt}</p>

      <ol className="space-y-2">
        {items.map((s) => {
          const chosen = answers[s.id]
          const right = chosen === s.bucket
          return (
            <li key={s.id} className="rounded-md border border-slate-200 p-3 text-sm dark:border-slate-700">
              <p>{s.text}</p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a heading">
                {buckets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={chosen === b.id}
                    onClick={() => setAnswers({ ...answers, [s.id]: b.id })}
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      chosen === b.id
                        ? `${b.chip} ring-2 ring-indigo-500`
                        : 'ring-1 ring-slate-300 hover:bg-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800'
                    }`}
                  >
                    {b.label}
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
                  <span>{right ? s.why : wrongHint}</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm" aria-live="polite">
          {done
            ? score === items.length
              ? 'Perfect sort!'
              : 'Fix the red ones, then try the check below.'
            : `${answeredCount(answers, items)} of ${items.length} sorted`}
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
