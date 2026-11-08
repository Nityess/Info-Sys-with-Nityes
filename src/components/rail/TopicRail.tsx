import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Unit } from '../../content/types'
import type { ParsedTopic } from '../../content/chapter7/types'
import { isComplete, toggleChecked, useMastery } from '../../state/mastery'
import { useSettings } from '../../state/useSettings'
import { Confetti } from '../lesson/Confetti'
import { AnswerBuilder } from './AnswerBuilder'
import { ConceptTabs } from './ConceptTabs'
import { FlipPairs } from './FlipPairs'
import { MasteryChecklist } from './MasteryChecklist'
import { Blocks, Markdown } from './Markdown'
import { parseBlocks } from './mdParse'
import { QuizRail } from './QuizRail'
import { RailLayout } from './RailLayout'
import type { RailStepId } from './railSteps'
import { RevisionCard } from './RevisionCard'
import { splitAtMarker } from './splitAtMarker'
import { COMPARE_MARKERS } from './builtTopics'
import { TopicVisual } from './TopicVisual'

interface Props {
  unit: Unit
  claim: (key: string, xp: number) => number
  onComplete: () => void
}

const XP_PER_FIRST_TRY = 10
const XP_MASTERY = 30

/** Loads the parsed topic on demand, so the content only downloads when a topic is opened. */
function useParsedTopic(code: string): ParsedTopic | null {
  const [data, setData] = useState<ParsedTopic | null>(null)
  useEffect(() => {
    let alive = true
    import('virtual:chapter7').then((m) => {
      if (alive) setData(m.topics[code] ?? null)
    })
    return () => {
      alive = false
    }
  }, [code])
  return data
}

function CompareView({ md }: { md: string }) {
  const blocks = parseBlocks(md)
  const at = blocks.findIndex((b) => b.t === 'table')
  // Several "A vs B" sub-sections each carry their own table: show them in full, in order
  const subheads = blocks.filter((b) => b.t === 'h' && b.level === 4).length
  if (at < 0 || subheads >= 2) return <Blocks blocks={blocks} />
  const table = blocks[at]
  const rest = blocks.filter((_, i) => i !== at)
  // A lone bold line such as "Important distinction" only labels the table, which the cards replace
  const lead = rest.filter((b, i) => !(i === 0 && b.t === 'p' && /^\*\*[^*]+\*\*$/.test(b.text)))
  return (
    <div className="space-y-4">
      {table.t === 'table' && <FlipPairs rows={table.rows} />}
      <Blocks blocks={lead} />
    </div>
  )
}

/** The fully built lesson rail for one topic, driven by the parsed teaching file. */
export function TopicRail({ unit, claim, onComplete }: Props) {
  const code = unit.topic?.code ?? ''
  const topic = useParsedTopic(code)
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

  if (!topic || !parts) return <RailLayout unit={unit} parts={{ hook: <p>Loading this topic…</p> }} />

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

  return (
    <>
      {burst > 0 && <Confetti key={burst} />}
      <RailLayout unit={unit} parts={content} />
    </>
  )
}
