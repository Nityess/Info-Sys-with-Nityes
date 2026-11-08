import { useState } from 'react'
import { INNOVATION } from './s1Data'
import { toggleIn } from './sceneUtil'

/** 1.8: two race lanes (Company A stays on old technology, Company B invests), then two example cards that flip from technology to business benefit. */
export function Scene18() {
  const [flipped, setFlipped] = useState<ReadonlySet<number>>(new Set())
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <div className="sc-col" style={{ gap: '.625rem' }}>
        <div>
          <span className="sc-fl">{INNOVATION.a}: {INNOVATION.aTech}</span>
          <div className="sc-lane"><div className="sc-car sc-run-a" style={{ background: '#6B7C99' }}>{INNOVATION.aResult}</div></div>
        </div>
        <div>
          <span className="sc-fl">{INNOVATION.b}: {INNOVATION.bTech}</span>
          <div className="sc-lane"><div className="sc-car sc-run-b" style={{ background: 'var(--brand)' }}>{INNOVATION.bResult}</div></div>
        </div>
      </div>
      <span className="sc-fl">Two examples. Tap a card.</span>
      <div className="sc-grid" style={{ '--min': '16rem', gap: '.875rem' } as React.CSSProperties}>
        {INNOVATION.cards.map((c, i) => {
          const on = flipped.has(i)
          return (
            <button key={c.front} type="button" aria-pressed={on} className={`sc-flip${on ? ' sc-flipin' : ''}`} onClick={() => setFlipped(toggleIn(flipped, i))}>
              <span className="sc-fl">{on ? 'Business benefit' : 'Technology'}</span>
              <b className="sc-serif sc-card-text">{on ? c.back : c.front}</b>
            </button>
          )
        })}
      </div>
    </div>
  )
}
