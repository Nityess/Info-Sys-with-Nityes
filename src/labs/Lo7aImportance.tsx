import { useState } from 'react'
import { REASONS } from './lo7aLogic'
import { TAG_STYLE } from './lo7aStyles'

/** Visualizer: the 7 reasons from Ch10 §1.1 as tap-to-reveal cards. */
export function Lo7aVisualizer() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-semibold">Why data security matters</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Tap a card for an example. The syllabus names the first two.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {REASONS.map((r) => {
          const isOpen = open === r.id
          const tag = TAG_STYLE[r.tag]
          return (
            <li key={r.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : r.id)}
                className={`w-full rounded-md border p-3 text-left text-sm text-slate-900 transition-colors dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  r.tag === 'supporting'
                    ? 'border-slate-200 dark:border-slate-700'
                    : 'border-indigo-300 dark:border-indigo-700'
                }`}
              >
                <span className="flex items-center gap-2 font-medium">
                  <span aria-hidden>{r.icon}</span>
                  {r.title}
                </span>
                <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-xs ${tag.chip}`}>{tag.label}</span>
                <span className="mt-1 block text-slate-600 dark:text-slate-400">{r.summary}</span>
                {isOpen && (
                  <span className="mt-2 block rounded bg-amber-50 p-2 text-slate-800 dark:bg-amber-900/30 dark:text-amber-100">
                    e.g. {r.example}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <details className="rounded-md border border-slate-200 p-3 text-sm dark:border-slate-700">
        <summary className="cursor-pointer font-medium">Two definitions (Ch10 §1)</summary>
        <p className="mt-2">
          <strong>Cybersecurity:</strong> protecting systems, networks and data from damage, disruption, theft or
          other loss.
        </p>
        <p className="mt-1">
          <strong>Critical information assets:</strong> assets fundamental to an organisation’s core activities,
          capability and viability.
        </p>
      </details>
    </div>
  )
}
