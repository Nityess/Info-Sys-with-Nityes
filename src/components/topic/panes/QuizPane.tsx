import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import { useSettings } from '../../../state/useSettings'
import { initialRailQuiz, nextQuestion, nudge, pickOption, praise, score, showsExplanation } from '../../rail/railQuizLogic'
import type { RailQuizState } from '../../rail/railQuizLogic'
import { dotState, explanationOf, quizEntries } from '../quizView'

const XP_PER_FIRST_TRY = 10

type Action = { type: 'pick'; answer: number; option: number } | { type: 'next'; total: number } | { type: 'reset' }

function reducer(s: RailQuizState, a: Action): RailQuizState {
  if (a.type === 'pick') return pickOption(s, a.answer, a.option)
  if (a.type === 'next') return nextQuestion(s, a.total)
  return initialRailQuiz()
}

interface Props {
  topic: ParsedTopic
  unitId: string
  claim: (key: string, xp: number) => number
}

/**
 * Step 5: the questions one at a time. A wrong answer lets you try again; a second wrong answer shows the answer.
 * Only first-time answers earn XP (10 each, paid once when the quiz finishes).
 */
export function QuizPane({ topic, unitId, claim }: Props) {
  const { settings } = useSettings()
  const entries = useMemo(() => quizEntries(topic.quizzes, settings.showSourceQuestions), [topic, settings.showSourceQuestions])
  const [s, dispatch] = useReducer(reducer, undefined, initialRailQuiz)
  const [granted, setGranted] = useState(0)
  const next = useRef<HTMLButtonElement>(null)
  const total = entries.length
  const entry = entries[Math.min(s.index, total - 1)]
  const locked = showsExplanation(s)

  // The Next button appears once the answer is known: move the keyboard there
  useEffect(() => {
    if (locked && !s.finished) next.current?.focus()
  }, [locked, s.finished, s.index])

  if (total === 0) return <p>No questions for this topic yet.</p>

  if (s.finished) {
    const got = score(s)
    return (
      <div className="ls-card ls-result">
        <span className="ls-chip ls-chip-ok">Quiz finished</span>
        <b className="ls-serif ls-bigscore">{got} of {total} right first time</b>
        <p className="ls-sub">Each first-time answer earns {XP_PER_FIRST_TRY} XP. Missed ones show you the answer so you can learn it.</p>
        {granted > 0 && <p className="ls-note" role="status">+{granted} XP</p>}
        <button type="button" className="ls-btn ls-ghost" onClick={() => dispatch({ type: 'reset' })}>Try the quiz again</button>
      </div>
    )
  }

  const { item } = entry
  const last = s.index + 1 === total
  const advance = () => {
    if (last) setGranted(claim(`${unitId}:quiz`, score(nextQuestion(s, total)) * XP_PER_FIRST_TRY))
    dispatch({ type: 'next', total })
  }
  const feedback = locked
    ? `${s.solved ? praise(s.index) : `The answer is ${item.options[item.answer]}.`} ${explanationOf(topic.code, entry)}`
    : s.wrong.length > 0
      ? nudge(s.index)
      : ''

  return (
    <div className="ls-stack ls-narrow">
      <ol className="ls-dots" aria-label={`Question ${s.index + 1} of ${total}`}>
        {entries.map((e, i) => <li key={`${e.label}-${e.item.id}`} className={`ls-qd ls-qd-${dotState(i, s)}`} />)}
      </ol>
      <div className="ls-qhead">
        <span className="ls-label" style={{ fontSize: '1rem' }}>Question {s.index + 1} of {total}</span>
        <span className="ls-chip">{entry.label}</span>
      </div>
      <h2 key={`${entry.label}-${item.id}`} className="ls-serif ls-q">{item.text}</h2>
      <div role="group" aria-label="Answer options" className="ls-opts">
        {item.options.map((opt, i) => {
          const wrong = s.wrong.includes(i)
          const right = locked && i === item.answer
          return (
            <button
              key={opt}
              type="button"
              disabled={locked || wrong}
              className={`ls-opt${right ? ' ls-opt-ok' : wrong ? ' ls-opt-bad' : ''}`}
              onClick={() => dispatch({ type: 'pick', answer: item.answer, option: i })}
            >
              <span className="ls-k">{'ABCD'[i]}</span>
              <span>{opt}</span>
              {right && <span className="ls-sr">Correct answer</span>}
              {wrong && <span className="ls-sr">Not correct</span>}
            </button>
          )
        })}
      </div>
      <div role="status">{feedback && <div className={`ls-fb ${locked ? 'ls-fb-ok' : 'ls-fb-bad'}`}>{feedback}</div>}</div>
      {locked && (
        <div>
          <button ref={next} type="button" className="ls-btn ls-primary" onClick={advance}>{last ? 'See my score' : 'Next question'}</button>
        </div>
      )}
    </div>
  )
}
