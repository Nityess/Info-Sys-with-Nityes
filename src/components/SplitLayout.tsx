import type { ReactNode } from 'react'

interface Props {
  visualizer: ReactNode
  lab: ReactNode
}

/** Concept visualizer on the left, lab/quiz on the right; stacked on narrow screens. */
export function SplitLayout({ visualizer, lab }: Props) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto p-3 md:grid-cols-2">
      <section
        aria-label="Concept visualizer"
        className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      >
        {visualizer}
      </section>
      <section
        aria-label="Lab"
        className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      >
        {lab}
      </section>
    </div>
  )
}
