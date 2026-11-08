import type { ReactNode } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import type { RailStepId } from '../../rail/railSteps'
import { ComparePane } from './ComparePane'
import { ConceptPane } from './ConceptPane'
import { HookPane } from './HookPane'

export interface PaneContext {
  unitId: string
  topic: ParsedTopic
  /** Pays out XP once per key; returns what was granted now */
  claim: (key: string, xp: number) => number
}

type Pane = (ctx: PaneContext) => ReactNode

/** Built step panes, by topic and step. A step with no entry shows the placeholder. */
const PANES: Record<string, Partial<Record<RailStepId, Pane>>> = {
  '1.2': {
    hook: (c) => <HookPane topic={c.topic} />,
    concept: (c) => <ConceptPane topic={c.topic} />,
    compare: (c) => <ComparePane topic={c.topic} />,
  },
}

export const paneFor = (code: string, step: RailStepId): Pane | undefined => PANES[code]?.[step]
