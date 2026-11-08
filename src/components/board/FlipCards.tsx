import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Ico } from './Ico'
import type { Group } from './types'

/** Tap-to-flip cards: the definition on the front, an example on the back. A segmented control switches between groups when a topic has several. */
export function FlipCards({ groups }: { groups: Group[] }) {
  const [g, setG] = useState(0)
  const [flipped, setFlipped] = useState<ReadonlySet<number>>(new Set())
  const grp = groups[Math.min(g, groups.length - 1)]
  if (!grp || grp.cards.length === 0) return null

  const choose = (i: number) => {
    setG(i)
    setFlipped(new Set())
  }
  const flip = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <>
      {groups.length > 1 && (
        <div className="bd-seg" role="group" aria-label="Choose a group">
          {groups.map((x, i) => (
            <button key={x.k} type="button" aria-pressed={i === g} onClick={() => choose(i)}>{x.k}</button>
          ))}
        </div>
      )}
      <div className="bd-block">
        <span className="bd-fl">Tap a card for the definition and an example</span>
        <div className="bd-cards">
          {grp.cards.map((c, i) => {
            const on = flipped.has(i)
            return (
              <button key={`${grp.k}-${c.tag}`} type="button" aria-pressed={on} className={`bd-flip bd-pop${on ? ' bd-flipin' : ''}`} style={{ '--d': `${(0.05 + i * 0.08).toFixed(2)}s` } as CSSProperties} onClick={() => flip(i)}>
                <span className="bd-flip-head"><Ico name={c.ic} /><b>{on ? 'Example' : c.tag}</b></span>
                <span>{on ? c.ex : c.mean}</span>
                <span className="bd-fl bd-flip-hint">{on ? 'Tap to go back' : 'Tap for an example'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
