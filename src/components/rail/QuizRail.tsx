import { useReducer, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react'
import type { QuizItem, QuizSet } from '../../content/chapter7/types'
import { explanationFor } from '../../content/chapter7/explanations'
import { initialRailQuiz, nextQuestion, nudge, pickOption, praise, score, showsExplanation } from './railQuizLogic'
import type { RailQuizState } from './railQuizLogic'

type Action = { type: 'pick'; answer: number; option: number } | { type: 'next'; total: number } | { type: 'reset' }

function reducer(s: RailQuizState, a: Action): RailQuizState {
  if (a.type === 'pick') return pickOption(s, a.answer, a.option)
  if (a.type === 'next') return nextQuestion(s, a.total)
  return initialRailQuiz()
}

interface Props {
  code: string
  sets: QuizSet[]
  /** Called once when the last question is done; returns the XP granted now */
  onFinish: (firstTry: number, total: number) => number
}

interface Flat {
  set: QuizSet
  item: QuizItem
}

/** One question per screen, instant feedback, retry allowed, first-try score. */
export function QuizRail({ code, sets, onFinish }: Props) {
  const flat: Flat[] = sets.flatMap((set) => set.items.map((item) => ({ set, item })))
  const [s, dispatch] = useReducer(reducer, undefined, initialRailQuiz)
  const [granted, setGranted] = useState<number | null>(null)

  if (flat.length === 0) return <p>No questions for this topic yet.</p>

  if (s.finished) {
    const got = score(s)
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-mist p-5 text-center dark:bg-slate-800/60">
        <p className="font-display text-4xl font-semibold text-ink dark:text-white">{got} of {flat.length}</p>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">right on the first try.{got === flat.length ? ' A clean sweep.' : ' Retry the quiz to lift your score.'}</p>
        {granted !== null && granted > 0 && <p className="mt-3 inline-block rounded-full bg-marigold/20 px-3 py-1 text-sm font-semibold text-amber-800 dark:text-amber-300">+{granted} XP</p>}
        <div className="mt-4">
          <button type="button" onClick={() => dispatch({ type: 'reset' })} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-ink hover:bg-white dark:border-slate-600 dark:text-white dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Retry the quiz
          </button>
        </div>
      </motion.div>
    )
  }

  const { set, item } = flat[s.index]
  const revealed = showsExplanation(s)
  const last = s.index + 1 === flat.length
  const text = explanationFor(code, set.kind, item.id) ?? `The answer is: ${item.options[item.answer]}.`

  const advance = () => {
    if (last) {
      const done = nextQuestion(s, flat.length)
      const correct = score(done)
      setGranted(onFinish(correct, flat.length))
    }
    dispatch({ type: 'next', total: flat.length })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ol className="flex flex-1 gap-1" aria-label={`Question ${s.index + 1} of ${flat.length}`}>
          {flat.map((f, i) => (
            <li key={`${f.set.title}-${f.item.id}`} className={`h-1.5 flex-1 rounded-full ${i < s.index ? (s.firstTry[i] ? 'bg-spruce' : 'bg-amber-400') : i === s.index ? 'bg-slate-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </ol>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.index + 1} / {flat.length}</span>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{set.title}</p>

      <motion.div key={`${set.title}-${item.id}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
        <p className="font-display text-lg font-medium leading-snug text-ink dark:text-white">{item.text}</p>
        <div role="group" aria-label="Answer options" className={set.kind === 'chip' ? 'flex flex-wrap gap-2' : 'grid gap-2'}>
          {item.options.map((opt, i) => {
            const isRight = i === item.answer
            const isWrong = s.wrong.includes(i)
            const showRight = revealed && isRight
            return (
              <button
                key={opt}
                type="button"
                disabled={s.solved || isWrong || revealed}
                onClick={() => dispatch({ type: 'pick', answer: item.answer, option: i })}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition active:scale-[0.99] ${
                  showRight
                    ? 'border-spruce bg-emerald-50 text-ink dark:bg-emerald-950/40 dark:text-white'
                    : isWrong
                      ? 'border-coral/60 bg-rose-50 text-slate-500 dark:bg-rose-950/30'
                      : 'border-slate-200 bg-white text-ink hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white'
                }`}
              >
                {set.kind === 'mcq' && <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-800">{'ABCD'[i]}</span>}
                <span className="flex-1">{opt}</span>
                {showRight && <Check className="h-5 w-5 shrink-0 text-spruce" aria-label="Correct" />}
                {isWrong && <X className="h-5 w-5 shrink-0 text-coral" aria-label="Not correct" />}
              </button>
            )
          })}
        </div>
      </motion.div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {!revealed && s.wrong.length > 0 && <p className="text-sm font-medium text-coral">{nudge(s.index)}</p>}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-emerald-50 p-4 text-sm text-ink ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-slate-100 dark:ring-emerald-900">
            <p><strong>{s.solved ? praise(s.index) : `The answer is ${item.options[item.answer]}.`}</strong> {text}</p>
            <button type="button" onClick={advance} className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-spruce px-4 py-2 font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
              {last ? 'See my score' : 'Next question'} <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
