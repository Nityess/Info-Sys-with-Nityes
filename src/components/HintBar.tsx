import { useState } from 'react'

const TABS = [
  { id: 'hint', label: 'Hint' },
  { id: 'insight', label: 'Exam insight' },
  { id: 'mcq', label: 'MCQ drill' },
] as const

type TabId = (typeof TABS)[number]['id']

interface Props {
  /** Per-tab content for the selected unit. Empty tabs show a placeholder. */
  content?: Partial<Record<TabId, string>>
}

export function HintBar({ content = {} }: Props) {
  const [tab, setTab] = useState<TabId>('hint')
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div role="tablist" aria-label="Study aids" className="flex gap-1 px-3 pt-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-t px-3 py-1 text-sm ${
              tab === t.id
                ? 'bg-indigo-100 font-medium text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p role="tabpanel" className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
        {content[tab] ?? 'Nothing here yet. This is added when the unit is built.'}
      </p>
    </footer>
  )
}
