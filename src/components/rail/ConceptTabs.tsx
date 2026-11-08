import { useMemo, useState } from 'react'
import type { Section } from '../../content/chapter7/types'
import { parseConceptCard, isRichCard } from './conceptCard'
import { ConceptCardView } from './ConceptCardView'
import { Markdown } from './Markdown'
import { splitSubsections } from './splitSubsections'
import { plain, tabLabel } from './tabLabel'

interface Item {
  section: Section
  md: string
}

/** A section with several "####" parts (the eight ACCURATE letters, the four types) shows them one pill at a time. */
function SubParts({ md }: { md: string }) {
  const { lead, parts } = splitSubsections(md)
  const [sub, setSub] = useState(0)
  const cards = useMemo(() => parts.map((p) => parseConceptCard(p.label, p.md)), [parts])
  if (parts.length === 0) return <Markdown md={md} />
  const at = Math.min(sub, parts.length - 1)
  const part = parts[at]
  const card = cards[at]
  return (
    <div className="space-y-3">
      {lead && <Markdown md={lead} />}
      <div role="group" aria-label="Pick one to read" className="flex flex-wrap gap-1.5">
        {parts.map((p, i) => (
          <button
            key={p.label}
            type="button"
            aria-pressed={i === sub}
            onClick={() => setSub(i)}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 transition ${i === sub ? 'bg-spruce text-white ring-spruce' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-600'}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-mist p-4 dark:bg-slate-800/50">
        {isRichCard(card) ? (
          <ConceptCardView card={card} index={at + 1} total={parts.length} />
        ) : (
          <>
            <h5 className="mb-2 font-display text-base font-semibold text-ink dark:text-white">{part.label}</h5>
            <Markdown md={part.md} />
          </>
        )}
      </div>
    </div>
  )
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
        <SubParts key={item.section.heading} md={item.md} />
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
