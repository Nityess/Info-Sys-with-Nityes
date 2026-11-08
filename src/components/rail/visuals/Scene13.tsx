import { useState } from 'react'
import { QUALITIES } from '../topics/accurate'
import { CEO_DEFECTS } from './s1Data'
import { DEFECT_QUALITY } from './designerText'
import { d, toggleIn } from './sceneUtil'

/** 1.3: eight ACCURATE tiles flip on tap, and the CEO's report shows its five defects one by one with the quality each one lacks. */
export function Scene13() {
  const [flipped, setFlipped] = useState<ReadonlySet<number>>(new Set())
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <span className="sc-fl">Tap a tile to flip it</span>
      <div className="sc-grid" style={{ '--min': '9rem' } as React.CSSProperties}>
        {QUALITIES.map((q, i) => {
          const on = flipped.has(i)
          return (
            <button key={q.name} type="button" aria-pressed={on} className={`sc-tile sc-pop${on ? ' sc-tile-on sc-flipin' : ''}`} style={d(i * 0.12)} onClick={() => setFlipped(toggleIn(flipped, i))}>
              <b className="sc-serif" style={{ fontSize: on ? '1.125rem' : '2.125rem' }}>{on ? q.name : q.letter}</b>
              <span>{on ? q.meaning : 'Tap to flip'}</span>
            </button>
          )
        })}
      </div>
      <div className="sc-bx sc-pad">
        <div className="sc-wrap"><b>Monthly performance report to the CEO</b><span className="sc-chip sc-chip-bad">5 defects</span></div>
        {CEO_DEFECTS.map((text, i) => (
          <div key={text} className="sc-wrap" style={{ gap: '.375rem .75rem', marginTop: '.625rem' }}>
            <span className="sc-hl" style={d(1.2 + i * 0.8)}>{text}</span>
            <span className="sc-chip sc-rise" style={d(1.6 + i * 0.8)}>Missing: {DEFECT_QUALITY[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
