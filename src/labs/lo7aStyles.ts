import type { ReasonTag } from './lo7aLogic'

export const TAG_STYLE: Record<ReasonTag, { label: string; chip: string }> = {
  legal: { label: 'Legal', chip: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  commercial: {
    label: 'Commercial & strategic',
    chip: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  },
  supporting: {
    label: 'Supporting point',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
}
