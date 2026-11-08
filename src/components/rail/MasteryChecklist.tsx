import { Check } from 'lucide-react'
import { isComplete } from '../../state/mastery'

interface Props {
  items: string[]
  checked: readonly number[]
  onToggle: (index: number) => void
}

/** Tappable checkboxes. Ticking every line marks the topic done (handled by the parent). */
export function MasteryChecklist({ items, checked, onToggle }: Props) {
  const done = isComplete(checked, items.length)
  const count = checked.filter((i) => i < items.length).length
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400" aria-live="polite">
        {count} of {items.length} ticked{done ? '. Topic complete.' : ''}
      </p>
      <ul className="space-y-1.5">
        {items.map((text, i) => {
          const on = checked.includes(i)
          return (
            <li key={i}>
              <label className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 px-3 py-2.5 text-sm transition ${on ? 'border-spruce bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900'}`}>
                <input type="checkbox" checked={on} onChange={() => onToggle(i)} className="peer sr-only" />
                <span aria-hidden className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-spruce ${on ? 'border-spruce bg-spruce text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className={on ? 'text-ink dark:text-white' : 'text-slate-700 dark:text-slate-300'}>{text}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
