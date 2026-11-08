import { Fragment, useState } from 'react'
import { motion } from 'motion/react'
import { ListPlus, RotateCcw } from 'lucide-react'
import type { AnswerPair } from '../../content/chapter7/types'
import { answerSteps } from './answerSteps'
import type { AnswerStep } from './answerSteps'
import { Inline } from './Markdown'

function Pair({ pair }: { pair: AnswerPair }) {
  const steps = answerSteps(pair.answer)
  const [shown, setShown] = useState(0)
  const visible = steps.slice(0, shown)

  // Group visible steps so bullets from one list render inside one <ul>/<ol>
  const groups: { list: number; ordered: boolean; items: AnswerStep[] }[] = []
  for (const st of visible) {
    const g = groups[groups.length - 1]
    if (st.kind === 'li' && g && g.list === st.list) g.items.push(st)
    else groups.push({ list: st.kind === 'li' ? st.list : -1, ordered: st.ordered, items: [st] })
  }

  return (
    <div className="space-y-3">
      <p className="rounded-xl bg-mist p-3 text-sm font-medium text-ink dark:bg-slate-800/60 dark:text-slate-100"><Inline text={pair.question} /></p>

      <div className="min-h-[5rem] rounded-2xl border-2 border-dashed border-slate-300 p-4 text-[0.95rem] leading-relaxed dark:border-slate-600" aria-live="polite">
        {shown === 0 && <p className="text-slate-500 dark:text-slate-400">Your answer builds here, one point at a time.</p>}
        {groups.map((g, gi) => (
          <Fragment key={gi}>
            {g.list === -1 ? (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-2"><Inline text={g.items[0].text} /></motion.p>
            ) : g.ordered ? (
              <ol className="mb-2 list-decimal space-y-1 pl-5">{g.items.map((it, i) => <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><Inline text={it.text} /></motion.li>)}</ol>
            ) : (
              <ul className="mb-2 list-disc space-y-1 pl-5">{g.items.map((it, i) => <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><Inline text={it.text} /></motion.li>)}</ul>
            )}
          </Fragment>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {shown < steps.length ? (
          <>
            <button type="button" onClick={() => setShown(shown + 1)} className="inline-flex items-center gap-1.5 rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
              <ListPlus className="h-4 w-4" aria-hidden /> Add the next point
            </button>
            <button type="button" onClick={() => setShown(steps.length)} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              Show the full answer
            </button>
          </>
        ) : (
          <p className="text-sm font-medium text-spruce">Full answer built.</p>
        )}
        {shown > 0 && (
          <button type="button" onClick={() => setShown(0)} className="ml-auto inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
        <span className="text-xs text-slate-500 dark:text-slate-400">{shown} of {steps.length} points</span>
      </div>
    </div>
  )
}

/** Shows each exam question with its suggested answer built up point by point. */
export function AnswerBuilder({ pairs }: { pairs: AnswerPair[] }) {
  if (pairs.length === 0) return <p>No model answer for this topic yet.</p>
  return (
    <div className="space-y-6">
      {pairs.map((p, i) => <Pair key={i} pair={p} />)}
    </div>
  )
}
