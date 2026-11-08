import { useState } from 'react'
import { Inline } from './Markdown'

interface Props {
  /** Table rows: [front, back] */
  rows: string[][]
}

/** Side-by-side pairs as flip cards: tap a card to see its meaning. Keyboard operable. */
export function FlipPairs({ rows }: Props) {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set())
  const toggle = (i: number) => {
    const next = new Set(open)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setOpen(next)
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {rows.map((r, i) => {
        const flipped = open.has(i)
        return (
          <li key={i}>
            <button
              type="button"
              aria-pressed={flipped}
              onClick={() => toggle(i)}
              className={`flex min-h-[7.5rem] w-full flex-col justify-center rounded-2xl p-4 text-left shadow-sm ring-1 transition active:scale-[0.98] ${
                flipped
                  ? 'bg-ink text-white ring-ink dark:bg-slate-800'
                  : 'bg-white text-ink ring-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:text-white dark:ring-slate-700'
              }`}
            >
              <span className="font-display text-base font-semibold"><Inline text={r[0]} /></span>
              <span className="mt-1 text-sm">{flipped ? <Inline text={r[1]} /> : <span className="text-slate-500 dark:text-slate-400">Tap to see the meaning</span>}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
