import { ScenarioSorter } from '../components/ScenarioSorter'
import type { BucketDef } from '../components/ScenarioSorter'
import { SCENARIOS } from './lo7aLogic'
import type { Bucket } from './lo7aLogic'
import { TAG_STYLE } from './lo7aStyles'

const BUCKETS: BucketDef<Bucket>[] = (['legal', 'commercial'] as const).map((id) => ({
  id,
  label: TAG_STYLE[id].label,
  chip: TAG_STYLE[id].chip,
}))

/** Lab widget: sort each scenario into a syllabus heading. */
export function Lo7aSorter() {
  return (
    <ScenarioSorter
      title="Legal or commercial?"
      prompt="Which requirement does each case show?"
      buckets={BUCKETS}
      items={SCENARIOS}
      wrongHint="Not quite. Think: is this duty set by law, or by business value?"
    />
  )
}
