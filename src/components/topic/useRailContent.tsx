import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Unit } from '../../content/types'
import type { ParsedTopic } from '../../content/chapter7/types'
import { isComplete, toggleChecked, useMastery } from '../../state/mastery'
import { useSettings } from '../../state/useSettings'
import { Confetti } from '../lesson/Confetti'
import { CompareView } from './CompareView'
import { AnswerBuilder } from '../rail/AnswerBuilder'
import { ConceptTabs } from '../rail/ConceptTabs'
import { MasteryChecklist } from '../rail/MasteryChecklist'
import { Markdown } from '../rail/Markdown'
import { QuizRail } from '../rail/QuizRail'
import type { RailStepId } from '../rail/railSteps'
import { RevisionCard } from '../rail/RevisionCard'
import { splitAtMarker } from '../rail/splitAtMarker'
import { COMPARE_MARKERS } from '../rail/builtTopics'
import { TopicVisual } from '../rail/TopicVisual'

const XP_PER_FIRST_TRY = 10
const XP_MASTERY = 30

interface Args {
  unit: Unit
  topic: ParsedTopic | null
  claim: (key: string, xp: number) => number
  onComplete: () => void
}

export interface RailContent {
  /** Content for each step, built from the topic's teaching text. A step set to null has nothing to show. Null until the topic loads. */
  content: Partial<Record<RailStepId, ReactNode>> | null
  /** Confetti for when the mastery checklist is completed */
  confetti: ReactNode
}

/**
 * The generic content of every step, built from the parsed teaching text: hook, concept tabs, compare, topic
 * visuals, quiz, answer builder, revision card and mastery checklist. Topics with their own step panes
 * (see topic/panes) use those first and fall back to this.
 */
export function useRailContent({ unit, topic, claim, onComplete }: Args): RailContent {
  const code = unit.topic?.code ?? ''
  const marker = COMPARE_MARKERS[code]
  const { checked, toggle } = useMastery(unit.id)
  const { settings } = useSettings()
  const [burst, setBurst] = useState(0)
  const [masteryXp, setMasteryXp] = useState<number | null>(null)

  const parts = useMemo(() => {
    if (!topic) return null
    const concept = topic.sections
      .filter((s) => s.role === 'concept')
      .map((s) => ({ s, split: marker ? splitAtMarker(s.md, marker) : { before: s.md, after: '' } }))
    const fromConcept = concept.map((c) => c.split.after).filter(Boolean)
    const fromHeadings = topic.sections.filter((s) => s.role === 'compare').map((s) => s.md)
    return {
      hook: topic.sections.find((s) => s.role === 'hook'),
      concept: concept.map((c) => ({ s: c.s, md: c.split.before })),
      compareMd: [...fromConcept, ...fromHeadings].join('\n\n').trim(),
      revise: topic.sections.find((s) => s.role === 'revise'),
    }
  }, [topic, marker])

  const confetti = burst > 0 ? <Confetti key={burst} /> : null
  if (!topic || !parts) return { content: null, confetti }

  const total = topic.mastery.length
  const onToggle = (i: number) => {
    const next = toggleChecked(checked, i)
    toggle(i)
    if (isComplete(next, total) && !isComplete(checked, total)) {
      setMasteryXp(claim(`${unit.id}:mastery`, XP_MASTERY))
      setBurst((b) => b + 1)
      onComplete()
    }
  }

  const content: Partial<Record<RailStepId, ReactNode>> = {
    hook: (
      <div className="space-y-4">
        <TopicVisual code={code} slot="hook" />
        {parts.hook && <Markdown md={parts.hook.md} />}
        <details className="rounded-xl bg-mist p-3 text-sm dark:bg-slate-800/60">
          <summary className="cursor-pointer font-medium text-ink dark:text-white">What you will learn</summary>
          <Markdown md={topic.intro} className="mt-2" />
        </details>
      </div>
    ),
    concept: (
      <div className="space-y-4">
        <TopicVisual code={code} slot="concept" />
        <ConceptTabs items={parts.concept.map(({ s, md }) => ({ section: s, md }))} />
      </div>
    ),
    compare: parts.compareMd ? <CompareView md={parts.compareMd} /> : <p>No confusable pairs in this topic.</p>,
    try: <TopicVisual code={code} slot="playground" />,
    quiz: <QuizRail code={code} sets={topic.quizzes.filter((q) => !q.source || settings.showSourceQuestions)} onFinish={(firstTry) => claim(`${unit.id}:quiz`, firstTry * XP_PER_FIRST_TRY)} />,
    answer: topic.answers.length ? <AnswerBuilder pairs={topic.answers} /> : null,
    revise: <RevisionCard section={parts.revise} code={code} title={unit.title} />,
    mastery: (
      <div className="space-y-3">
        <MasteryChecklist items={topic.mastery} checked={checked} onToggle={onToggle} />
        {masteryXp !== null && masteryXp > 0 && (
          <p className="inline-block rounded-full bg-marigold/20 px-3 py-1 text-sm font-semibold text-amber-800 dark:text-amber-300">+{masteryXp} XP</p>
        )}
      </div>
    ),
  }
  return { content, confetti }
}
