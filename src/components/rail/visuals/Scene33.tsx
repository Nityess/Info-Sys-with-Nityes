import { useState } from 'react'
import { SOFTWARE } from './s3Data'
import { d, toggleIn } from './sceneUtil'

/** 3.3: off-the-shelf or custom-made packages with their examples, a ledger sketch, and six advantage cards that flip to what to remember. */
export function Scene33() {
  const [flipped, setFlipped] = useState<ReadonlySet<number>>(new Set())
  return (
    <div className="sc-col" style={{ gap: '1rem' }}>
      <div className="sc-wrap" style={{ gap: '.625rem' }}>
        {SOFTWARE.kinds.map((k) => <span key={k.name} className="sc-chip sc-chip-wide"><b>{k.name}:</b> {k.text}</span>)}
      </div>
      <div className="sc-wrap"><span className="sc-fl">Examples</span>{SOFTWARE.examples.map((e) => <span key={e} className="sc-chip sc-chip-aid">{e}</span>)}</div>
      <div className="sc-bx sc-rise sc-pad-s sc-col" style={{ ...d(0.1), gap: '.375rem' }} aria-hidden="true">
        <div className="sc-row2 sc-fl"><span>Ledger</span><span>Debit · Credit</span></div>
        {[90, 76, 84, 60].map((w) => <div key={w} className="sc-sk" style={{ width: `${w}%` }} />)}
      </div>
      <span className="sc-fl">Six advantages. Tap a card for what to remember.</span>
      <div className="sc-grid" style={{ '--min': '14rem' } as React.CSSProperties}>
        {SOFTWARE.advantages.map((a, i) => {
          const on = flipped.has(i)
          return (
            <button key={a.text} type="button" aria-pressed={on} className={`sc-flip sc-pop${on ? ' sc-flipin' : ''}`} style={d(0.2 + i * 0.18)} onClick={() => setFlipped(toggleIn(flipped, i))}>
              <span className="sc-fl">{on ? 'Remember' : `Advantage ${i + 1}`}</span>
              <b style={{ lineHeight: 1.3 }}>{on ? a.remember : a.text}</b>
            </button>
          )
        })}
      </div>
    </div>
  )
}
