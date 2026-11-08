import { useState } from 'react'
import { motion } from 'motion/react'
import { Flag, RotateCcw } from 'lucide-react'
import { FlipPairs } from '../FlipPairs'

// Two example cards from section 3 / 4 of the topic
const EXAMPLES = [
  ['Distributed ledger technology', 'Improves accuracy of asset recording'],
  ['Digital assets (sound and vision media)', 'Allows products to reach a wider audience'],
]

function Lane({ name, note, to, run, tone }: { name: string; note: string; to: string; run: boolean; tone: string }) {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-ink dark:text-white">{name} <span className="font-normal text-slate-600 dark:text-slate-400">{note}</span></p>
      <div className="relative h-9 rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div initial={false} animate={{ width: run ? to : '8%' }} transition={{ duration: run ? 2.2 : 0.4, ease: 'easeOut' }} className={`h-full rounded-full ${tone}`} />
        <Flag className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
      </div>
    </div>
  )
}

/** Company A keeps old technology and slows; Company B invests in new technology and pulls ahead. Then two example cards. */
export function RaceLanes() {
  const [run, setRun] = useState(false)
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Lane name="Company A" note="old technology" to="38%" run={run} tone="bg-slate-400" />
        <Lane name="Company B" note="invests in new technology" to="94%" run={run} tone="bg-spruce" />
      </div>
      <p className="text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {run ? 'Company B is not left behind. Competitors using IT gain competitive advantage.' : 'Technology keeps changing. Press run to see what that does.'}
      </p>
      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => setRun(true)} disabled={run} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98] disabled:opacity-40">
          Run the race
        </button>
        {run && (
          <button type="button" onClick={() => setRun(false)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
      {run && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink dark:text-white">Two examples of innovation in practice</p>
          <FlipPairs rows={EXAMPLES} />
        </div>
      )}
    </div>
  )
}
