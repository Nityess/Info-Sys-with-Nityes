import { SEAR_CLOSING, SEAR_ROWS } from './s1Data'
import { d } from './sceneUtil'

/** 1.4: Report A against Report B. The four SEAR factors tick off one by one: A passes, B fails. Pass and fail carry a tick and a cross as well as colour. */
export function Scene14() {
  return (
    <div className="sc-col" style={{ gap: '.625rem' }}>
      <div className="sc-sear">
        <span />
        <span className="sc-chip sc-chip-ok" style={{ justifyContent: 'center' }}>Report A</span>
        <span className="sc-chip sc-chip-bad" style={{ justifyContent: 'center' }}>Report B</span>
      </div>
      {SEAR_ROWS.map((r, i) => {
        const base = 0.3 + i * 0.8
        return (
          <div key={r.factor} className="sc-sear">
            <div className="sc-rise sc-fcol" style={d(base)}>
              <b className="sc-serif sc-big">{r.letter}</b>
              <span>{r.factor}</span>
            </div>
            <div className="sc-pop sc-yes" style={d(base + 0.3)}><b role="img" aria-label="Passes">✓</b> {r.a}</div>
            <div className="sc-pop sc-no" style={d(base + 0.55)}><b role="img" aria-label="Fails">✗</b> {r.b}</div>
          </div>
        )
      })}
      <div className="sc-rem sc-rise" style={d(3.4)}>{SEAR_CLOSING}</div>
    </div>
  )
}
