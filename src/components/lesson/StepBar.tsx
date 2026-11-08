import { motion } from 'motion/react'
import { Check } from 'lucide-react'

export type Step = 'explore' | 'play' | 'recap'

const STEPS: { id: Step; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'play', label: 'Play' },
  { id: 'recap', label: 'Recap' },
]

interface Props {
  step: Step
  /** Index of the furthest step unlocked so far */
  reached: number
  onGo: (s: Step) => void
}

/** Three real steps in order, so numbering is information here. */
export function StepBar({ step, reached, onGo }: Props) {
  return (
    <nav aria-label="Lesson steps" className="flex gap-1 rounded-2xl bg-slate-200/70 p-1 dark:bg-slate-800">
      {STEPS.map((s, i) => {
        const active = s.id === step
        const done = i < reached
        const locked = i > reached
        return (
          <button
            key={s.id}
            type="button"
            disabled={locked}
            aria-current={active ? 'step' : undefined}
            onClick={() => onGo(s.id)}
            className="relative flex-1 rounded-xl px-2 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
          >
            {active && (
              <motion.span
                layoutId="step-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-slate-950"
              />
            )}
            <span className={`relative flex items-center justify-center gap-1.5 ${active ? 'text-ink dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
              {done ? (
                <Check className="h-4 w-4 text-spruce" aria-label="Done" />
              ) : (
                <span className="text-xs tabular-nums text-slate-400" aria-hidden>
                  {i + 1}
                </span>
              )}
              {s.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
