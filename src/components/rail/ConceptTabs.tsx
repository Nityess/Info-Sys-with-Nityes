import { useState } from 'react'
import type { Section } from '../../content/chapter7/types'
import { Markdown } from './Markdown'
import { plain, tabLabel } from './tabLabel'

interface Item {
  section: Section
  md: string
}

/** Concept parts shown one at a time, so a long topic never becomes a wall of text. */
export function ConceptTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0)
  const shown = items.filter((i) => i.md)
  if (shown.length === 0) return null
  const item = shown[Math.min(active, shown.length - 1)]

  return (
    <div className="space-y-3">
      {shown.length > 1 && (
        <div role="tablist" aria-label="Parts of the concept" className="flex gap-1.5 overflow-x-auto pb-1">
          {shown.map((it, i) => (
            <button
              key={it.section.heading}
              role="tab"
              type="button"
              id={`concept-tab-${i}`}
              aria-selected={i === active}
              aria-controls="concept-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition ${i === active ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}
            >
              {tabLabel(it.section.heading)}
            </button>
          ))}
        </div>
      )}
      <div role="tabpanel" id="concept-panel" aria-labelledby={`concept-tab-${active}`} className="space-y-2">
        <h4 className="font-display text-base font-semibold text-ink dark:text-white">{plain(item.section.heading)}</h4>
        <Markdown md={item.md} />
        {shown.length > 1 && (
          <div className="flex justify-between pt-2 text-sm font-medium">
            <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className="rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800">
              Previous
            </button>
            <button type="button" disabled={active >= shown.length - 1} onClick={() => setActive(active + 1)} className="rounded-lg bg-spruce px-4 py-1.5 text-white hover:bg-spruce/90 disabled:opacity-30">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
