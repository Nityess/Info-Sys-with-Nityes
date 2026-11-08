import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { flip, gotIt, initialFlash, isDone, mastered, stillLearning } from './flashLogic'
import type { ConceptCard } from '../../content/types'

interface Props {
  cards: ConceptCard[]
  /** Called once when every card is mastered. Returns the XP granted now. */
  onComplete: () => number
  onReplay: () => void
}

export function FlashRecap({ cards, onComplete, onReplay }: Props) {
  const [s, setS] = useState(() => initialFlash(cards.map((c) => c.id)))
  const [granted, setGranted] = useState<number | null>(null)
  const fired = useRef(false)
  const done = isDone(s)

  useEffect(() => {
    if (done && !fired.current) {
      fired.current = true
      setGranted(onComplete())
    }
  }, [done, onComplete])

  const card = cards.find((c) => c.id === s.queue[0])
  const pct = Math.round((mastered(s) / s.total) * 100)

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <p className="font-display text-3xl font-semibold text-ink dark:text-white">Lesson complete</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          All {s.total} cards mastered{s.misses > 0 ? `, with ${s.misses} to revisit along the way` : ' without a miss'}.
        </p>
        {granted !== null && (
          <p className="mt-3 inline-block rounded-full bg-marigold/20 px-3 py-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
            {granted > 0 ? `+${granted} XP` : 'XP already earned'}
          </p>
        )}
        <div className="mt-5">
          <button type="button" onClick={onReplay} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            Review again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Mastered</span>
          <span aria-live="polite">
            {mastered(s)} of {s.total}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Cards mastered">
          <motion.div className="h-full rounded-full bg-spruce" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 160, damping: 22 }} />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={card?.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.2 }}>
          <button
            type="button"
            onClick={() => setS(flip)}
            aria-label={s.flipped ? 'Show the front of the card' : 'Flip the card to see the answer'}
            className="block w-full text-left [perspective:1000px]"
          >
            <motion.div animate={{ rotateY: s.flipped ? 180 : 0 }} transition={{ duration: 0.45, ease: 'easeInOut' }} style={{ transformStyle: 'preserve-3d' }} className="relative h-60">
              <div aria-hidden={s.flipped} className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-200 [backface-visibility:hidden] dark:bg-slate-900 dark:ring-slate-800">
                <span aria-hidden className="text-5xl">
                  {card?.icon}
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-ink dark:text-white">{card?.short}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">What does it mean? Tap to flip.</p>
              </div>
              <div aria-hidden={!s.flipped} className="absolute inset-0 flex flex-col justify-center rounded-3xl bg-ink p-6 text-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-slate-800">
                <p className="font-display text-lg font-semibold leading-snug">{card?.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{card?.detail}</p>
              </div>
            </motion.div>
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" disabled={!s.flipped} onClick={() => setS(stillLearning)} className="rounded-2xl border-2 border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
          Still learning
        </button>
        <button type="button" disabled={!s.flipped} onClick={() => setS(gotIt)} className="rounded-2xl bg-spruce px-4 py-3 font-semibold text-white hover:bg-spruce/90 disabled:opacity-40">
          Got it
        </button>
      </div>
    </div>
  )
}
