import type { Unit } from '../../content/types'
import { useParsedTopic } from '../topic/useParsedTopic'
import { useRailContent } from '../topic/useRailContent'
import { RailLayout } from './RailLayout'

interface Props {
  unit: Unit
  claim: (key: string, xp: number) => number
  onComplete: () => void
}

/** The scrolling lesson rail for one topic. Kept until the old Chapter 7 screens are removed. */
export function TopicRail({ unit, claim, onComplete }: Props) {
  const topic = useParsedTopic(unit.topic?.code ?? '')
  const { content, confetti } = useRailContent({ unit, topic, claim, onComplete })
  if (!content) return <RailLayout unit={unit} parts={{ hook: <p>Loading this topic…</p> }} />
  return (
    <>
      {confetti}
      <RailLayout unit={unit} parts={content} />
    </>
  )
}
