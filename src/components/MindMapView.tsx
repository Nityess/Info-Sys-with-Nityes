import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { ConceptCard } from '../content/types'
import type { SectionTheme } from './sectionTheme'

interface Props {
  section?: string
  title: string
  cards: ConceptCard[]
  theme: SectionTheme
}

function ProgressRing({ value, total }: { value: number; total: number }) {
  const r = 18
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 44 44" className="h-12 w-12 shrink-0" role="img" aria-label={`${value} of ${total} explored`}>
      <circle cx="22" cy="22" r={r} fill="none" strokeWidth="5" className="stroke-white/25" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-white transition-all duration-500"
        strokeDasharray={c}
        strokeDashoffset={c - (c * value) / Math.max(total, 1)}
        transform="rotate(-90 22 22)"
      />
      <text x="22" y="26" textAnchor="middle" className="fill-white text-[11px] font-bold">
        {value}/{total}
      </text>
    </svg>
  )
}

/** Visualizer: a mini mind map. Branch at the root, leaves on connector lines; tap to explore. */
export function MindMapView({ section, title, cards, theme }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set())

  const tap = (id: string) => {
    setOpen(open === id ? null : id)
    if (!seen.has(id)) setSeen(new Set(seen).add(id))
  }

  return (
    <div className="space-y-4">
      <div className={`${theme.hero} flex items-center gap-3 rounded-xl p-4 text-white shadow-md`}>
        <div className="min-w-0 flex-1">
          {section && <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{section}</p>}
          <h2 className="text-lg font-bold leading-tight">{title}</h2>
          <p className="mt-0.5 text-xs text-white/85">{cards.length} concepts · tap each node</p>
        </div>
        <ProgressRing value={seen.size} total={cards.length} />
      </div>

      <ul className="relative space-y-2 pl-7">
        <span aria-hidden className={`absolute bottom-6 left-3 top-0 w-0.5 rounded ${theme.line}`} />
        {cards.map((c) => {
          const isOpen = open === c.id
          const wasSeen = seen.has(c.id)
          return (
            <li key={c.id} className="relative">
              <span aria-hidden className={`absolute -left-4 top-6 h-0.5 w-4 ${theme.line}`} />
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => tap(c.id)}
                className={`w-full rounded-xl border-2 p-2.5 text-left text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:text-slate-100 ${
                  isOpen ? theme.nodeActive : 'border-transparent bg-white dark:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${theme.node}`}
                  >
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{c.title}</span>
                  {wasSeen ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" aria-label="Explored" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  )}
                </span>
                {isOpen && (
                  <span className="anim-rise mt-2 block border-t border-slate-200 pt-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300">
                    {c.detail}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
