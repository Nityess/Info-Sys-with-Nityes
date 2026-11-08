import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react'
import { Check, Flame, X } from 'lucide-react'
import { answerSwipe, initialSwipe, nextSwipe } from './swipeLogic'
import type { SwipeCard } from './swipeLogic'

interface Props {
  deck: SwipeCard[]
  /** Called when the last card is done. Returns the XP granted now, for the summary. */
  onFinish: (correct: number, total: number) => number
  onContinue: () => void
}

const THRESHOLD = 110

function CardFace({ card, locked, onDecide }: { card: SwipeCard; locked: boolean; onDecide: (said: boolean) => void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-9, 0, 9])
  const yes = useTransform(x, [20, 120], [0, 1])
  const no = useTransform(x, [-120, -20], [1, 0])

  return (
    <motion.div
      drag={locked ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > THRESHOLD) onDecide(true)
        else if (info.offset.x < -THRESHOLD) onDecide(false)
      }}
      className="relative cursor-grab touch-pan-y select-none rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 active:cursor-grabbing dark:bg-slate-900 dark:ring-slate-800"
    >
      <motion.span style={{ opacity: yes }} className="absolute right-4 top-4 rounded-lg bg-spruce px-2 py-0.5 text-xs font-bold text-white">
        Matches
      </motion.span>
      <motion.span style={{ opacity: no }} className="absolute left-4 top-4 rounded-lg bg-coral px-2 py-0.5 text-xs font-bold text-white">
        Not a match
      </motion.span>
      <p className="mt-5 font-display text-xl font-medium leading-snug text-ink dark:text-white">{card.text}</p>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-mist p-3 dark:bg-slate-800">
        <span aria-hidden className="text-2xl">
          {card.shown.icon}
        </span>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Is this the quality at fault?</p>
          <p className="font-semibold text-ink dark:text-white">{card.shown.short}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function SwipePlay({ deck, onFinish, onContinue }: Props) {
  const [s, setS] = useState(initialSwipe)
  const [granted, setGranted] = useState<number | null>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const card = deck[s.index]

  useEffect(() => {
    if (s.answered) nextRef.current?.focus()
  }, [s.answered])

  const decide = (said: boolean) => setS((cur) => answerSwipe(cur, card, said))

  const advance = () => {
    const next = nextSwipe(s, deck.length)
    setS(next)
    if (next.finished) setGranted(onFinish(next.correctCount, deck.length))
  }

  if (s.finished) {
    const perfect = s.correctCount === deck.length
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <p className="font-display text-4xl font-semibold text-ink dark:text-white">
          {s.correctCount} of {deck.length}
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {perfect ? 'Every card read correctly.' : 'Cards read correctly. Review them in the recap.'}
          {s.bestStreak > 1 && ` Best streak: ${s.bestStreak}.`}
        </p>
        {granted !== null && (
          <p className="mt-3 inline-block rounded-full bg-marigold/20 px-3 py-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
            {granted > 0 ? `+${granted} XP` : 'XP already earned'}
          </p>
        )}
        <div className="mt-5 flex justify-center gap-2">
          <button type="button" onClick={() => { setS(initialSwipe()); setGranted(null) }} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            Play again
          </button>
          <button type="button" onClick={onContinue} className="rounded-xl bg-spruce px-5 py-2 text-sm font-semibold text-white hover:bg-spruce/90">
            Start recap
          </button>
        </div>
      </motion.div>
    )
  }

  const fly = s.answered ? (s.answered.said ? 1 : -1) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1" role="img" aria-label={`Card ${s.index + 1} of ${deck.length}`}>
          {deck.map((c, i) => (
            <span key={c.id} className={`h-1.5 flex-1 rounded-full transition-colors ${i < s.index ? 'bg-spruce' : i === s.index ? 'bg-slate-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${s.streak > 1 ? 'text-orange-600' : 'text-slate-400'}`} aria-live="polite">
          <Flame className="h-3.5 w-3.5" aria-hidden /> {s.streak}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">Swipe right if the label fits the scenario, left if it does not.</p>

      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={fly ? { x: fly * 380, opacity: 0, rotate: fly * 14 } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fly ? 0.28 : 0.22 }}
          >
            <CardFace card={card} locked={!!s.answered} onDecide={decide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {!s.answered ? (
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => decide(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-coral/60 px-4 py-3 font-semibold text-coral hover:bg-coral/10">
            <X className="h-5 w-5" aria-hidden /> Not a match
          </button>
          <button type="button" onClick={() => decide(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-spruce/60 px-4 py-3 font-semibold text-spruce hover:bg-spruce/10">
            <Check className="h-5 w-5" aria-hidden /> Matches
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-4 ring-1 ${s.answered.correct ? 'bg-emerald-50 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900' : 'bg-rose-50 ring-rose-200 dark:bg-rose-950 dark:ring-rose-900'}`}
          aria-live="polite"
        >
          <p className="text-sm text-ink dark:text-slate-100">
            <strong>{s.answered.correct ? 'Right.' : 'Not quite.'}</strong>{' '}
            {card.truth ? `It is ${card.correct.short}.` : `It was not ${card.shown.short}. It is ${card.correct.short}.`} {card.why}
          </p>
          <button ref={nextRef} type="button" onClick={advance} className="mt-3 rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90">
            {s.index + 1 === deck.length ? 'See result' : 'Next card'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
