import { OUTSOURCE } from './s1Data'
import { d } from './sceneUtil'

/** 1.7: the organisation and the external provider, joined by a contract, with an arm's-length gap that keeps widening. Benefits and challenges below. */
export function Scene17() {
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <div className="sc-link">
        <div className="sc-bx sc-sl sc-party" style={{ ...d(0.1), borderColor: 'var(--acc)' }}><b>{OUTSOURCE.org}</b></div>
        <div className="sc-mid">
          <div className="sc-grow sc-wire" style={d(0.8)} />
          <span className="sc-chip sc-rise" style={d(1.2)}>Contract</span>
          <div className="sc-gapbox" aria-hidden="true"><div className="sc-gap" /></div>
          <span className="sc-chip sc-chip-bad sc-rise" style={d(1.8)}>{OUTSOURCE.challenges[1]}</span>
        </div>
        <div className="sc-bx sc-sr sc-party" style={{ ...d(0.1), borderColor: 'var(--brand)' }}><b>{OUTSOURCE.provider}</b></div>
      </div>
      <div className="sc-grid" style={{ '--min': '16rem', gap: '.875rem' } as React.CSSProperties}>
        <div className="sc-rise sc-panel sc-panel-ok" style={d(2.2)}>
          <b>Benefits</b>
          <ul>{OUTSOURCE.benefits.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="sc-rise sc-panel sc-panel-bad" style={d(2.6)}>
          <b>Challenges</b>
          <ul>{OUTSOURCE.challenges.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}
