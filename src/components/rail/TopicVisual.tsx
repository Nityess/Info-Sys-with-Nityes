import type { ReactNode } from 'react'
import { AccurateTiles } from './topics/AccurateTiles'
import { BadReportCard } from './topics/BadReportCard'
import { BreakPipeline } from './topics/BreakPipeline'
import { CativaPipeline } from './topics/CativaPipeline'
import { DeliveryOrSupport } from './topics/DeliveryOrSupport'
import { InfoPyramid } from './topics/InfoPyramid'
import { IsItWorthIt } from './topics/IsItWorthIt'
import { NetValueScale } from './topics/NetValueScale'
import { OutsourceDiagram } from './topics/OutsourceDiagram'
import { RaceLanes } from './topics/RaceLanes'
import { ReportDoctor } from './topics/ReportDoctor'
import { SearReports } from './topics/SearReports'
import { ServeProtect } from './topics/ServeProtect'
import { SortBankMemos } from './topics/SortBankMemos'
import { ValueChain } from './topics/ValueChain'

export type VisualSlot = 'hook' | 'concept' | 'playground'

/** Topic-specific visuals from each topic's App Spec. Add one entry per topic as it is built. */
const VISUALS: Record<string, Partial<Record<VisualSlot, () => ReactNode>>> = {
  '1.2': { concept: () => <InfoPyramid />, playground: () => <SortBankMemos /> },
  '1.3': { hook: () => <BadReportCard />, concept: () => <AccurateTiles />, playground: () => <ReportDoctor /> },
  '1.4': { concept: () => <SearReports /> },
  '1.5': {
    hook: () => <NetValueScale extraBenefit={90000} extraCost={100000} />,
    concept: () => <ValueChain />,
    playground: () => <IsItWorthIt />,
  },
  '1.6': { concept: () => <ServeProtect />, playground: () => <DeliveryOrSupport /> },
  '1.7': { concept: () => <OutsourceDiagram /> },
  '1.8': { concept: () => <RaceLanes /> },
  '1.9': { concept: () => <CativaPipeline />, playground: () => <BreakPipeline /> },
}

/** Renders one topic's visual for a slot, or nothing when the topic has none there. */
export function TopicVisual({ code, slot }: { code: string; slot: VisualSlot }) {
  return <>{VISUALS[code]?.[slot]?.() ?? null}</>
}
