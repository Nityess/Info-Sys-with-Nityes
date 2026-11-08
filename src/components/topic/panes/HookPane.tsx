import { useMemo, useState } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import { hookClosing, parseHookCards, typeName } from '../infoTypes'

/** Step 1: four people in one bank, each with a need. A button names the type of information each one needs. */
export function HookPane({ topic }: { topic: ParsedTopic }) {
  const cards = useMemo(() => parseHookCards(topic), [topic])
  const closing = useMemo(() => hookClosing(topic), [topic])
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="ls-stack">
      <ul className="ls-cards" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {cards.map((c) => (
          <li key={c.who} className={`ls-hcard ls-ty-${c.type}${revealed ? ' ls-hcard-on' : ''}`}>
            <div className="ls-who">
              <span className="ls-ava" aria-hidden="true">{c.initial}</span>
              <b>{c.who}</b>
            </div>
            <p>{c.need}</p>
            <span className={`ls-chip ls-chip-ty${revealed ? '' : ' ls-hide'}`} aria-hidden={!revealed}>{typeName(c.type)}</span>
          </li>
        ))}
      </ul>
      <div className="ls-actions">
        <button type="button" className="ls-btn ls-primary" aria-pressed={revealed} onClick={() => setRevealed(!revealed)}>
          {revealed ? 'Hide the types' : 'Reveal the four types'}
        </button>
        <p role="status" className="ls-note">
          {revealed ? closing : 'Who needs what? Tap the button to name the type each person needs.'}
        </p>
      </div>
    </div>
  )
}
