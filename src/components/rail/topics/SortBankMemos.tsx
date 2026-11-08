import { BinSorter } from './BinSorter'
import type { BinDef } from './BinSorter'
import type { BinItem } from './binSorterLogic'

const BINS: BinDef[] = [
  { id: 'strategic', label: 'Strategic', tone: 'border-blue-400 bg-blue-50/60 dark:bg-blue-950/20' },
  { id: 'tactical', label: 'Tactical', tone: 'border-teal-400 bg-teal-50/60 dark:bg-teal-950/20' },
  { id: 'operational', label: 'Operational', tone: 'border-amber-400 bg-amber-50/60 dark:bg-amber-950/20' },
  { id: 'planning', label: 'Planning', tone: 'border-violet-400 bg-violet-50/60 dark:bg-violet-950/20' },
]

// The four bank situations from the topic's own business example (section 1 and the table in section 5)
const ITEMS: BinItem[] = [
  { id: 'm1', text: 'The Board considers opening branches across Nepal over the next five years.', bin: 'strategic', why: 'Long-term, major decision for the Board: strategic.' },
  { id: 'm2', text: 'A regional manager reviews monthly branch variance reports.', bin: 'tactical', why: 'Analysed data for a middle manager, short-term issues: tactical.' },
  { id: 'm3', text: 'Branch staff review daily unauthorised overdraft reports.', bin: 'operational', why: 'Routine, day-to-day, detailed information for front-line staff: operational.' },
  { id: 'm4', text: "The planning team prepares next year's budget and resource requirements.", bin: 'planning', why: 'Implementation steps, resources and time-scales: planning.' },
]

/** Topic 1.2 playground: sort the bank memos by who uses them and why. */
export function SortBankMemos() {
  return (
    <BinSorter
      items={ITEMS}
      bins={BINS}
      hint="Not that bin. Ask who uses it and what it is for. Words like report, budget or daily can mislead."
      doneText="All four sorted. Same bank, four different users and purposes."
    />
  )
}
