import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Flame, RotateCcw, Star, Trophy } from 'lucide-react'
import type { ConceptCard, PracticeItem } from '../content/types'
import { chooseAnswer, firstTryCount, initialMatch, nextItem, stars } from './quickMatchLogic'
import type { SectionTheme } from './sectionTheme'

interface Props {
  cards: ConceptCard[]
  items: PracticeItem[]
  theme: SectionTheme
  /** Called each time a round is finished */
  onFinish?: () => void
}

/** Lab widget: one scenario at a time, tap the matching node, build a streak. */
export function QuickMatch({ cards, items, theme, onFinish }: Props) {
  const [s, setS] = useState(initialMatch)
  const [shakeKey, setShakeKey] = useState(0)
  const nextRef = useRef<HTMLButtonElement>(null)
  const item = items[s.index]

  useEffect(() => {
    if (s.solved) nextRef.current?.focus()
  }, [s.solved])

  const choose = (id: string) => {
    const next = chooseAnswer(s, item.bucket, id)
    if (next.wrong && next !== s) setShakeKey((k) => k + 1)
    setS(next)
  }
  const advance = () => {
    const next = nextItem(s, items.length)
    setS(next)
    if (next.finished) onFinish?.()
  }

  if (s.finished) {
    const first = firstTryCount(s)
    const n = stars(first, items.length)
    return (
      <div className="anim-rise space-y-4 rounded-xl border border-slate-200 p-5 text-center dark:border-slate-700">
        <Trophy className="mx-auto h-12 w-12 text-amber-500" aria-hidden />
        <h3 className="text-lg font-bold">Round complete!</h3>
        <div className="flex justify-center gap-1" role="img" aria-label={`${n} of 3 stars`}>
          {[1, 2, 3].map((i) => (
            <Star key={i} className={`h-8 w-8 ${i <= n ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
          ))}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {first} / {items.length} right first time · best streak {s.bestStreak}
        </p>
        <button
          type="button"
          onClick={() => setS(initialMatch())}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white ${theme.button}`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Play again
        </button>
      </div>
    )
  }

  const correct = cards.find((c) => c.id === item.bucket)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold">Quick Match</h3>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            s.streak > 0 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200' : 'text-slate-400'
          }`}
          aria-live="polite"
        >
          <Flame className="h-3.5 w-3.5" aria-hidden /> {s.streak} streak
        </span>
      </div>

      <ol className="flex gap-1.5" aria-label={`Question ${s.index + 1} of ${items.length}`}>
        {items.map((it, i) => (
          <li
            key={it.id}
            className={`h-2 flex-1 rounded-full ${
              s.results[i] === 'first'
                ? 'bg-emerald-500'
                : s.results[i] === 'retry'
                  ? 'bg-amber-400'
                  : i === s.index
                    ? 'bg-slate-400 dark:bg-slate-500'
                    : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </ol>

      <div key={item.id} className="anim-rise rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
        <p className={`text-xs font-semibold uppercase tracking-wide ${theme.accentText}`}>
          Scenario {s.index + 1} of {items.length}
        </p>
        <p className="mt-1 text-base font-medium">{item.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Choose the matching concept">
        {cards.map((c) => {
          const isRight = s.solved && c.id === item.bucket
          const isWrong = s.wrong === c.id
          return (
            <button
              key={isWrong ? `${c.id}-${shakeKey}` : c.id}
              type="button"
              disabled={s.solved}
              onClick={() => choose(c.id)}
              className={`flex items-center gap-2 rounded-lg border-2 p-2 text-left text-xs font-medium transition-colors sm:text-sm ${
                isRight
                  ? 'anim-pop border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100'
                  : isWrong
                    ? 'anim-shake border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100'
                    : 'border-slate-200 bg-white hover:border-slate-400 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <span aria-hidden className="text-lg">
                {c.icon}
              </span>
              <span className="min-w-0">{c.short}</span>
            </button>
          )
        })}
      </div>

      <div aria-live="polite">
        {s.wrong && !s.solved && (
          <p className="text-sm text-rose-700 dark:text-rose-300">Not that one. Try again!</p>
        )}
        {s.solved && (
          <div className="anim-rise flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-900/30">
            <p className="min-w-0 flex-1 text-sm text-emerald-900 dark:text-emerald-100">
              <strong>
                {correct?.icon} {correct?.short}.
              </strong>{' '}
              {item.why}
            </p>
            <button
              ref={nextRef}
              type="button"
              onClick={advance}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-white ${theme.button}`}
            >
              {s.index + 1 === items.length ? 'Finish' : 'Next'} <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
