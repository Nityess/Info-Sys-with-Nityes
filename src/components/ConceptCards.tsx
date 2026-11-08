import { useState } from 'react'
import type { ConceptCard } from '../content/types'

interface Props {
  title: string
  cards: ConceptCard[]
}

/** Visualizer: mind-map leaves as tap-to-reveal cards. */
export function ConceptCards({ title, cards }: Props) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const allOpen = open.size === cards.length

  const toggle = (id: string) => {
    const next = new Set(open)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setOpen(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(cards.map((c) => c.id)))}
          className="shrink-0 rounded border border-slate-300 px-2 py-0.5 text-xs hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          {allOpen ? 'Close all' : 'Open all'}
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {cards.map((c, i) => {
          const isOpen = open.has(c.id)
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(c.id)}
                className={`w-full rounded-md border p-3 text-left text-sm text-slate-900 dark:text-slate-100 ${
                  isOpen
                    ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/30'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                }`}
              >
                <span className="flex gap-2 font-medium">
                  <span className="text-indigo-600 dark:text-indigo-400">{i + 1}.</span>
                  {c.title}
                </span>
                {isOpen && <span className="mt-1 block text-slate-700 dark:text-slate-300">{c.detail}</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
