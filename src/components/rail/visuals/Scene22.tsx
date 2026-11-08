import { useState } from 'react'
import { CASH_BASIS_NOTE } from './designerText'
import { ASSUMPTIONS, STATEMENTS, TIMELINE } from './s2Data'
import { d } from './sceneUtil'

const PICTURES = [
  <span key="a" className="sc-snap"><i /></span>,
  <div key="b" className="sc-film"><span /><span /><span /><span /><span /><span /><span /><span /></div>,
  <span key="c" className="sc-flows"><b className="sc-in">↓</b><b className="sc-out">↑</b></span>,
]

/** 2.2: the three statements (a position at a date, a period, cash in and out), the two underlying assumptions, and the accruals against cash timeline. */
export function Scene22() {
  const [accruals, setAccruals] = useState(true)
  return (
    <div className="sc-col" style={{ gap: '1.375rem' }}>
      <div className="sc-grid" style={{ '--min': '14rem', gap: '.875rem' } as React.CSSProperties}>
        {STATEMENTS.map((s, i) => (
          <div key={s.name} className="sc-bx sc-rise sc-pad sc-col" style={{ ...d(0.1 + i * 0.4), gap: '.625rem' }}>
            <div className="sc-pic" aria-hidden="true">{PICTURES[i]}</div>
            <b>{s.name}</b>
            <span className="sc-chip" style={{ alignSelf: 'flex-start' }}>{s.tag}</span>
            <span className="sc-note" style={{ fontSize: '.9375rem' }}>{s.question}</span>
          </div>
        ))}
      </div>
      <div className="sc-wrap" style={{ gap: '.625rem' }}>
        {ASSUMPTIONS.map((a, i) => (
          <span key={a.name} className="sc-chip sc-rise sc-chip-wide" style={d(1.3 + i * 0.2)}><b>{a.name}:</b> {a.text}</span>
        ))}
      </div>
      <div className="sc-bx sc-pad sc-col" style={{ gap: '.875rem' }}>
        <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
          <b className="sc-serif" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Accruals vs cash timeline</b>
          <div className="sc-seg" role="group" aria-label="Basis">
            <button type="button" aria-pressed={accruals} onClick={() => setAccruals(true)}>Accruals basis</button>
            <button type="button" aria-pressed={!accruals} onClick={() => setAccruals(false)}>Cash basis</button>
          </div>
        </div>
        <div className="sc-timeline">
          <div className="sc-line" />
          <div className="sc-ev" style={{ left: '8%' }}><i /><b>{TIMELINE.saleDate}</b><span>{TIMELINE.sale}</span></div>
          <div className="sc-ev" style={{ left: '92%' }}><i /><b>{TIMELINE.cashDate}</b><span>Customer pays</span></div>
          <div className="sc-flag" style={{ left: accruals ? '8%' : '92%' }}><span className="sc-chip sc-chip-gold">Sale recognised</span></div>
        </div>
        <div role="status" className="sc-fb">{accruals ? TIMELINE.accrualsNote : CASH_BASIS_NOTE}</div>
      </div>
    </div>
  )
}
