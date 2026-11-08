import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { ConceptCard, PracticeItem } from '../../content/types'

interface Props {
  hub: string
  cards: ConceptCard[]
  practice: PracticeItem[]
  seen: ReadonlySet<string>
  openId: string | null
  onTap: (id: string) => void
}

const RADIUS = 38

/** Radial mind map. Branches draw in on load, nodes light up once explored. */
export function ExploreMap({ hub, cards, practice, seen, openId, onTap }: Props) {
  const n = cards.length
  const pos = cards.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return { x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) }
  })
  const open = cards.find((c) => c.id === openId)
  const example = open && practice.find((p) => p.bucket === open.id)?.text

  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {cards.map((c, i) => (
            <motion.line
              key={c.id}
              x1={50}
              y1={50}
              x2={pos[i].x}
              y2={pos[i].y}
              strokeLinecap="round"
              strokeWidth={seen.has(c.id) ? 0.9 : 0.5}
              className={seen.has(c.id) ? 'stroke-spruce' : 'stroke-slate-300 dark:stroke-slate-700'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.06 * i, duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-center font-display text-[11px] font-semibold leading-tight tracking-wide text-white shadow-lg dark:bg-white dark:text-ink">
          {hub}
        </div>

        {cards.map((c, i) => {
          const isOpen = c.id === openId
          const wasSeen = seen.has(c.id)
          return (
            <motion.button
              key={c.id}
              type="button"
              aria-pressed={isOpen}
              onClick={() => onTap(c.id)}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + 0.06 * i, type: 'spring', stiffness: 380, damping: 24 }}
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
              className={`absolute flex h-16 w-[4.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-2xl border px-1 text-ink shadow-sm transition-colors dark:text-slate-100 ${
                isOpen
                  ? 'border-spruce bg-emerald-50 dark:bg-emerald-950'
                  : wasSeen
                    ? 'border-spruce/40 bg-white dark:bg-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <span aria-hidden className="text-xl leading-none">
                {c.icon}
              </span>
              <span className="text-[10.5px] font-medium leading-tight">{c.short}</span>
              {wasSeen && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-spruce text-white">
                  <Check className="h-2.5 w-2.5" aria-label="Explored" />
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 min-h-[8.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key={open.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <h3 className="font-display text-lg font-semibold leading-snug text-ink dark:text-white">
                <span aria-hidden>{open.icon} </span>
                {open.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{open.detail}</p>
              {example && (
                <p className="mt-2 border-l-2 border-marigold pl-3 text-sm italic text-slate-600 dark:text-slate-400">
                  For example: {example}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-2 pt-6 text-center text-sm text-slate-500 dark:text-slate-400"
            >
              Tap a node to open it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
