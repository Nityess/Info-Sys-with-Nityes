import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, RotateCcw } from 'lucide-react'
import { isDone, remaining, tryPlace } from './binSorterLogic'
import type { BinItem } from './binSorterLogic'

export interface BinDef {
  id: string
  label: string
  /** Tailwind classes for the bin's accent */
  tone: string
}

interface Props {
  items: BinItem[]
  bins: BinDef[]
  /** Shown when a drop is wrong */
  hint: string
  doneText: string
}

/**
 * Sort cards into bins. Drag a card onto a bin, or tap a card and then tap a bin (works on phones and keyboards).
 * A wrong drop bounces back with a one-line hint; a right one stays with its reason.
 */
export function BinSorter({ items, bins, hint, doneText }: Props) {
  const [placed, setPlaced] = useState<Readonly<Record<string, string>>>({})
  const [picked, setPicked] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [bounce, setBounce] = useState<{ id: string; n: number } | null>(null)
  const left = remaining(items, placed)
  const finished = isDone(items, placed)

  const drop = (id: string, bin: string) => {
    const item = items.find((i) => i.id === id)
    if (!item || id in placed) return
    const r = tryPlace(placed, item, bin)
    setPicked(null)
    if (r.ok) {
      setPlaced(r.placed)
      setMessage(item.why)
    } else {
      setBounce((b) => ({ id, n: (b?.n ?? 0) + 1 }))
      setMessage(hint)
    }
  }
  const reset = () => {
    setPlaced({})
    setPicked(null)
    setMessage('')
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[3rem] space-y-2" aria-label="Cards still to sort">
        {left.map((it) => (
          <motion.div key={`${it.id}-${bounce?.id === it.id ? bounce.n : 0}`} animate={bounce?.id === it.id ? { x: [0, -6, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.3 }}>
            <button
              type="button"
              draggable
              aria-pressed={picked === it.id}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', it.id)}
              onClick={() => setPicked(picked === it.id ? null : it.id)}
              className={`block w-full cursor-grab rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium active:cursor-grabbing ${
                picked === it.id ? 'border-spruce bg-emerald-50 text-ink dark:bg-emerald-950/40 dark:text-white' : 'border-slate-200 bg-white text-ink hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white'
              }`}
            >
              {it.text}
            </button>
          </motion.div>
        ))}
        {finished && <p className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">{doneText}</p>}
      </div>

      <p className="min-h-[1.5rem] text-sm font-medium text-slate-700 dark:text-slate-200" aria-live="polite">
        {message || (picked ? 'Now tap the right bin.' : 'Drag a card to a bin, or tap a card then a bin.')}
      </p>

      <div className={`grid gap-2 ${bins.length > 2 ? 'sm:grid-cols-2' : 'grid-cols-2'}`}>
        {bins.map((b) => {
          const inside = items.filter((i) => placed[i.id] === b.id)
          return (
            <div
              key={b.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => drop(e.dataTransfer.getData('text/plain'), b.id)}
              className={`rounded-2xl border-2 border-dashed p-3 ${b.tone}`}
            >
              <button type="button" disabled={!picked} onClick={() => picked && drop(picked, b.id)} className="w-full text-left font-display text-sm font-semibold text-ink disabled:cursor-default dark:text-white">
                {b.label}
              </button>
              <ul className="mt-2 space-y-1.5">
                {inside.map((i) => (
                  <motion.li key={i.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-start gap-1.5 rounded-lg bg-white/80 px-2 py-1.5 text-xs text-ink dark:bg-slate-900/70 dark:text-slate-100">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-spruce" aria-hidden /> {i.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {(Object.keys(placed).length > 0 || picked) && (
        <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <RotateCcw className="h-4 w-4" aria-hidden /> Start again
        </button>
      )}
    </div>
  )
}
