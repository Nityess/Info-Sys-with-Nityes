import { useEffect, useMemo, useRef, useState } from 'react'
import { advance, feedback, initialGame, isDone, nextLabel, optionsOf, pick, progressText, questionsFor, resultText } from './gameLogic'
import type { Game as GameData, Mcq } from './types'

/**
 * One question at a time. A question is either a classification item (shared category buttons) or a real exam question
 * with its own four options. After an answer: correct or not quite, the explanation, then Next. Ends with a score and Play again.
 */
export function Game({ game, bank }: { game: GameData; bank: readonly Mcq[] }) {
  const questions = useMemo(() => questionsFor(game, bank), [game, bank])
  const [s, setS] = useState(initialGame)
  const next = useRef<HTMLButtonElement>(null)
  const again = useRef<HTMLButtonElement>(null)
  const total = questions.length
  const done = isDone(s, total)
  const q = questions[Math.min(s.i, total - 1)]
  const answered = s.picked >= 0

  // Focus follows the screen: to Next once an answer is shown, to Play again on the score
  useEffect(() => {
    if (answered) next.current?.focus()
  }, [answered])
  useEffect(() => {
    if (done) again.current?.focus()
  }, [done])

  if (!q) return null
  const options = optionsOf(game, q)
  const fb = answered ? feedback(q, options, s.picked) : null

  return (
    <div className="bd-play">
      <div className="bd-playhead">
        <b className="bd-serif">{game.title}</b>
        <span className="bd-chip">{progressText(s, total)}</span>
      </div>
      {!done && (
        <>
          <p key={s.i} className="bd-q bd-pop">{q.q}</p>
          <div className="bd-opts" role="group" aria-label="Answer choices">
            {options.map((name, i) => {
              let cls = 'bd-btn bd-opt'
              if (answered) cls += i === q.cat ? ' bd-opt-ok' : i === s.picked ? ' bd-opt-bad' : ''
              return (
                <button key={`${s.i}-${i}`} type="button" className={cls} aria-disabled={answered} onClick={() => setS((cur) => pick(cur, q, i))}>
                  {name}
                </button>
              )
            })}
          </div>
          <div role="status">
            {fb && (
              <div className={`bd-fb ${fb.ok ? 'bd-fb-ok' : 'bd-fb-bad'} bd-rise`}>
                <p>{fb.text}</p>
              </div>
            )}
          </div>
          {answered && (
            <button ref={next} type="button" className="bd-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setS(advance)}>
              {nextLabel(s, total)}
            </button>
          )}
        </>
      )}
      {done && (
        <>
          <div role="status" className="bd-fb bd-fb-ok bd-pop">{resultText(s.score, total)}</div>
          <button ref={again} type="button" className="bd-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setS(initialGame())}>
            Play again
          </button>
        </>
      )}
    </div>
  )
}
