import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, RotateCcw, Unlink } from 'lucide-react'

const LINKS = [
  { label: 'Information obtained', icon: '📥' },
  { label: 'Management uses it', icon: '🧠' },
  { label: 'Action taken', icon: '⚙️' },
  { label: 'Value created', icon: '💰' },
]

/** Index of the "Action taken" link: the one that breaks when management does nothing. */
const ACTION = 2

/** Builds the chain one link at a time; "Management does nothing" snaps it at "Action taken". */
export function ValueChain() {
  const [shown, setShown] = useState(1)
  const [broken, setBroken] = useState(false)

  const reset = () => {
    setShown(1)
    setBroken(false)
  }
  const complete = shown >= LINKS.length

  return (
    <div className="space-y-3">
      <ol className="flex flex-col items-stretch gap-1" aria-label="How information creates value">
        {LINKS.map((l, i) => {
          if (i >= shown) return null
          const dead = broken && i >= ACTION
          return (
            <li key={l.label} className="flex flex-col items-center gap-1">
              {i > 0 && (
                <span className={`flex h-6 items-center ${broken && i === ACTION ? 'text-coral' : 'text-slate-400'}`} aria-hidden>
                  {broken && i === ACTION ? <Unlink className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                </span>
              )}
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`flex w-full max-w-xs items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm font-semibold ${
                  dead
                    ? 'border-dashed border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500'
                    : i === LINKS.length - 1
                      ? 'border-spruce bg-emerald-50 text-ink dark:bg-emerald-950/40 dark:text-white'
                      : 'border-slate-200 bg-white text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white'
                }`}
              >
                <span aria-hidden className="text-xl">{l.icon}</span>
                {l.label}
                {dead && i === LINKS.length - 1 && <span className="ml-auto text-xs font-medium">No value</span>}
              </motion.div>
            </li>
          )
        })}
      </ol>

      <p className="text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {broken
          ? 'No action was taken, so no actual value arose.'
          : complete
            ? 'Value arises when information supports an action.'
            : 'Tap to build the chain.'}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {!complete && !broken && (
          <button type="button" onClick={() => setShown((s) => s + 1)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
            Show the next link
          </button>
        )}
        {shown > ACTION && !broken && (
          <button type="button" onClick={() => setBroken(true)} className="rounded-xl border-2 border-coral/60 px-4 py-2 text-sm font-semibold text-coral hover:bg-coral/10 active:scale-[0.98]">
            Management does nothing
          </button>
        )}
        {(shown > 1 || broken) && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
    </div>
  )
}
