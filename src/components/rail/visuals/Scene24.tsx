import { useState } from 'react'
import { COST_EXAMPLES, COST_LABELS, LIMITATIONS } from './s2Data'
import { d, toggleIn } from './sceneUtil'

/** 2.4: a cost against benefit balance with two examples, then five limitation cards that flip to a situation. */
export function Scene24() {
  const [ex, setEx] = useState(0)
  const [flipped, setFlipped] = useState<ReadonlySet<number>>(new Set())
  const e = COST_EXAMPLES[ex]
  return (
    <div className="sc-col" style={{ gap: '1.375rem' }}>
      <div className="sc-bx sc-pad sc-col" style={{ gap: '.75rem' }}>
        <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
          <b className="sc-serif" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Benefits should justify the cost</b>
          <div className="sc-seg" role="group" aria-label="Example">
            {COST_EXAMPLES.map((_, i) => <button key={i} type="button" aria-pressed={ex === i} onClick={() => setEx(i)}>Example {i + 1}</button>)}
          </div>
        </div>
        <div className="sc-col" style={{ gap: '.5rem' }}>
          <div className="sc-row2"><span>{COST_LABELS.benefit}</span><span>{e.benefit}</span></div>
          <div className="sc-meter"><div style={{ width: `${e.bw}%`, background: 'var(--brand)' }} /></div>
          <div className="sc-row2"><span>{COST_LABELS.cost}</span><span>{e.cost}</span></div>
          <div className="sc-meter"><div style={{ width: `${e.cw}%`, background: 'var(--gold)' }} /></div>
        </div>
        <div role="status" className={`sc-fb ${e.ok ? 'sc-fb-ok' : 'sc-fb-bad'}`}><b>{COST_LABELS.net}: {e.net}.</b> {e.msg}</div>
      </div>
      <div className="sc-wrap"><b>Five limitations</b><span className="sc-chip">H A N H S</span><span className="sc-note">Tap a card to see it in a situation</span></div>
      <div className="sc-grid" style={{ '--min': '11.5rem' } as React.CSSProperties}>
        {LIMITATIONS.map((l, i) => {
          const on = flipped.has(i)
          return (
            <button key={l.name} type="button" aria-pressed={on} className={`sc-flip sc-pop${on ? ' sc-flipin' : ''}`} style={d(i * 0.12)} onClick={() => setFlipped(toggleIn(flipped, i))}>
              <span className="sc-fl">{on ? 'In a situation' : `Limitation ${i + 1}`}</span>
              <b style={{ fontSize: on ? '.9375rem' : '1.125rem', lineHeight: 1.3 }}>{on ? l.scenario : l.name}</b>
            </button>
          )
        })}
      </div>
    </div>
  )
}
