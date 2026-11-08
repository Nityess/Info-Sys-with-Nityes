import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, RotateCcw, X } from 'lucide-react'
import { SEAR_ROWS } from '../visuals/s1Data'

// Report A and Report B from the topic's real-life situation (section 1), against the four SEAR factors
const ROWS = SEAR_ROWS

/** Two market reports side by side: the four SEAR factors tick off one by one on A and fail on B. */
export function SearReports() {
  const [shown, setShown] = useState(0)
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_1fr] gap-2 text-center text-xs font-semibold uppercase tracking-wide">
        <span className="rounded-lg bg-emerald-100 py-1.5 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">Report A</span>
        <span className="rounded-lg bg-rose-100 py-1.5 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200">Report B</span>
      </div>
      <ul className="space-y-2">
        {ROWS.map((r, i) => (
          <li key={r.factor} className="min-h-[4.5rem]">
            <p className="mb-1 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">{r.factor}</p>
            {i < shown ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-2 text-sm">
                <span className="flex items-start gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-ink dark:bg-emerald-950/30 dark:text-slate-100"><Check className="mt-0.5 h-4 w-4 shrink-0 text-spruce" aria-label="Passes" />{r.a}</span>
                <span className="flex items-start gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-ink dark:bg-rose-950/30 dark:text-slate-100"><X className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-label="Fails" />{r.b}</span>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-2"><span className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" /><span className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" /></div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {shown === ROWS.length ? 'Both reports contain information. Only A is valuable to the restaurant owner.' : 'Tap to check the next factor.'}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {shown < ROWS.length && (
          <button type="button" onClick={() => setShown(shown + 1)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
            {shown === 0 ? 'Compare the reports' : 'Next factor'}
          </button>
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
