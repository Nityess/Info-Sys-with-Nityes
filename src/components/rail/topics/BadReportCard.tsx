import { useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { DEFECTS } from './accurate'

/** The CEO's report from the hook: its five problems get highlighted one by one. */
export function BadReportCard() {
  const [shown, setShown] = useState(0)
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="font-display text-sm font-semibold text-ink dark:text-white">Monthly performance report for the CEO</p>
        <ul className="mt-2 space-y-1.5">
          {DEFECTS.map((d, i) => (
            <motion.li
              key={d.id}
              animate={{ backgroundColor: i < shown ? 'rgba(244, 63, 94, 0.14)' : 'rgba(0, 0, 0, 0)' }}
              className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-ink dark:text-slate-100"
            >
              <span aria-hidden className={i < shown ? 'text-coral' : 'text-slate-400'}>{i < shown ? '✕' : '•'}</span>
              {d.text}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {shown < DEFECTS.length ? (
          <button type="button" onClick={() => setShown(shown + 1)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
            {shown === 0 ? 'Spot the problems' : 'Next problem'}
          </button>
        ) : (
          <p className="text-sm font-semibold text-coral">Information, but not good-quality information.</p>
        )}
        {shown > 0 && (
          <button type="button" onClick={() => setShown(0)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
    </div>
  )
}
