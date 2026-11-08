import type { ReactNode } from 'react'
import { IsItWorthIt } from './topics/IsItWorthIt'
import { NetValueScale } from './topics/NetValueScale'
import { ValueChain } from './topics/ValueChain'

export type VisualSlot = 'hook' | 'concept' | 'playground'

/** Topic-specific visuals from each topic's App Spec. Add one entry per topic as it is built. */
const VISUALS: Record<string, Partial<Record<VisualSlot, () => ReactNode>>> = {
  '1.5': {
    hook: () => <NetValueScale extraBenefit={90000} extraCost={100000} />,
    concept: () => <ValueChain />,
    playground: () => <IsItWorthIt />,
  },
}

/** Renders one topic's visual for a slot, or nothing when the topic has none there. */
export function TopicVisual({ code, slot }: { code: string; slot: VisualSlot }) {
  return <>{VISUALS[code]?.[slot]?.() ?? null}</>
}
