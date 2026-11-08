import { ScenarioSorter } from '../components/ScenarioSorter'
import type { BucketDef } from '../components/ScenarioSorter'
import { CONSEQUENCES, IMPLICATIONS } from './lo7bLogic'
import type { Implication } from './lo7bLogic'

const CHIP = 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200'

const BUCKETS: BucketDef<Implication>[] = IMPLICATIONS.map((i) => ({ id: i.id, label: i.label, chip: CHIP }))

/** Lab widget: name the implication shown by each consequence. */
export function Lo7bSorter() {
  return (
    <ScenarioSorter
      title="Name the implication"
      prompt="Which syllabus implication does each consequence show?"
      buckets={BUCKETS}
      items={CONSEQUENCES}
      wrongHint="Not quite. Ask: is it money, blocked users, rivals, trust, or personal-data law?"
    />
  )
}
