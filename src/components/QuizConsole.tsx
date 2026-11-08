import { useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import type { QuizItem } from '../content/types'
import { isCorrect, quizPassed, quizScore } from './quizLogic'
import type { QuizAnswers } from './quizLogic'

interface Props {
  items: QuizItem[]
  /** Called once when every item has been answered correctly */
  onPass?: () => void
}

/** "Check my understanding": all items visible, native radio groups for keyboard access. */
export function QuizConsole({ items, onPass }: Props) {
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const choose = (item: QuizItem, index: number) => {
    const next = { ...answers, [item.id]: index }
    setAnswers(next)
    if (!quizPassed(items, answers) && quizPassed(items, next)) onPass?.()
  }

  const passed = quizPassed(items, answers)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">Check my understanding</h3>
        <span className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
          {quizScore(items, answers)} / {items.length} correct
        </span>
      </div>

      {items.map((item, n) => {
        const chosen = answers[item.id]
        const answered = chosen !== undefined
        const right = isCorrect(item, answers)
        return (
          <fieldset key={item.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-700">
            <legend className="px-1 text-sm font-medium">
              {n + 1}. {item.question}
            </legend>
            {item.statements?.map((s) => (
              <p key={s} className="mb-1 text-sm text-slate-700 dark:text-slate-300">
                {s}
              </p>
            ))}
            <div className="mt-2 space-y-1">
              {item.options.map((opt, i) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    answered && i === chosen
                      ? right
                        ? 'bg-emerald-50 dark:bg-emerald-900/30'
                        : 'bg-rose-50 dark:bg-rose-900/30'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={item.id}
                    checked={chosen === i}
                    onChange={() => choose(item, i)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-semibold">{String.fromCharCode(65 + i)}.</span> {opt}
                  </span>
                </label>
              ))}
            </div>
            {answered && (
              <p className="mt-2 flex items-start gap-1.5 text-sm" aria-live="polite">
                {right ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden />
                )}
                <span>
                  <strong>{right ? 'Correct.' : 'Not quite, try again.'}</strong> {right && item.explanation}
                </span>
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Source: {item.source}</p>
          </fieldset>
        )
      })}

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400" aria-live="polite">
          {passed ? 'All correct. Unit marked done.' : ''}
        </p>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset quiz
        </button>
      </div>
    </div>
  )
}
