import { DELIVERY, MPSS_STEPS, SUPPORT } from './s1Data'
import { d } from './sceneUtil'

/** 1.6: SERVE (IT Delivery, five activities) against PROTECT (IT Support, four), then the four MPSS management actions light up in turn. */
export function Scene16() {
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <div className="sc-grid" style={{ '--min': '18rem', gap: '1rem' } as React.CSSProperties}>
        <div className="sc-sl" style={d(0.1)}>
          <span className="sc-chip sc-chip-solid sc-big-chip">SERVE · IT Delivery</span>
          <ul className="sc-list">
            {DELIVERY.map((t, i) => <li key={t} className="sc-bx sc-rise" style={d(0.5 + i * 0.2)}>{t}</li>)}
          </ul>
        </div>
        <div className="sc-sr" style={d(0.1)}>
          <span className="sc-chip sc-chip-solid sc-chip-teal sc-big-chip">PROTECT · IT Support</span>
          <ul className="sc-list">
            {SUPPORT.map((t, i) => <li key={t} className="sc-bx sc-rise" style={d(0.6 + i * 0.2)}>{t}</li>)}
          </ul>
        </div>
      </div>
      <div className="sc-col" style={{ gap: '.5rem' }}>
        <div className="sc-wrap"><b>Management actions</b><span className="sc-chip sc-chip-aid">MPSS · teaching aid</span></div>
        <div className="sc-grid" style={{ '--min': '8.5rem', gap: '.5rem' } as React.CSSProperties}>
          {MPSS_STEPS.map((m, i) => <div key={m.name} className="sc-gate" style={d(1.8 + i * 0.5)}><b>{m.letter}</b>{m.name}</div>)}
        </div>
      </div>
    </div>
  )
}
