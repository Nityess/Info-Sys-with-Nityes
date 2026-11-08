import { useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { QUALITIES } from './accurate'

/** The eight ACCURATE letters as tiles that flip to show the quality and its meaning. */
export function AccurateTiles() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set())
  const toggle = (i: number) => {
    const next = new Set(open)
    if (!next.delete(i)) next.add(i)
    setOpen(next)
  }
  return (
    <div className="space-y-3">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {QUALITIES.map((q, i) => {
          const flipped = open.has(i)
          return (
            <li key={q.name}>
              <motion.button
                key={`${q.name}-${flipped}`}
                type="button"
                aria-pressed={flipped}
                onClick={() => toggle(i)}
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex h-24 w-full flex-col items-center justify-center rounded-2xl p-2 text-center shadow-sm ring-1 ${flipped ? 'bg-ink text-white ring-ink dark:bg-slate-800' : 'bg-white ring-slate-200 hover:shadow-md dark:bg-slate-900 dark:ring-slate-700'}`}
              >
                {flipped ? (
                  <>
                    <span className="text-sm font-semibold">{q.name}</span>
                    <span className="mt-0.5 text-xs text-slate-200">{q.meaning}</span>
                  </>
                ) : (
                  <span className="font-display text-4xl font-semibold text-ink dark:text-white">{q.letter}</span>
                )}
              </motion.button>
            </li>
          )
        })}
      </ul>
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>Tap a letter to flip it. {open.size} of 8 flipped.</span>
        {open.size > 0 && (
          <button type="button" onClick={() => setOpen(new Set())} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset
          </button>
        )}
      </div>
    </div>
  )
}
