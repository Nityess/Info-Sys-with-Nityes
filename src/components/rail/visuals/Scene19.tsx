import { GATES } from '../topics/cativa'
import { PIPELINE } from './s1Data'
import { d } from './sceneUtil'

/** 1.9: data travels through information processing and comes out as information; the six CATIVA gates light up in order. CATIVA is the source's own mnemonic. */
export function Scene19() {
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <div className="sc-pipe">
        <div className="sc-bx sc-sl sc-stage-box" style={d(0.1)}>{PIPELINE.from}</div>
        <div className="sc-pipemid">
          <div className="sc-grow sc-wire sc-wire-thick" style={d(0.3)} />
          <span className="sc-dot" aria-hidden="true" />
          <span className="sc-chip sc-rise sc-pipelabel" style={d(0.8)}>{PIPELINE.via}</span>
        </div>
        <div className="sc-bx sc-sr sc-stage-box" style={{ ...d(0.1), borderColor: 'var(--brand)' }}>{PIPELINE.to}</div>
      </div>
      <ol className="sc-grid" style={{ '--min': '9rem', gap: '.5rem', listStyle: 'none', margin: 0, padding: 0 } as React.CSSProperties}>
        {GATES.map((g, i) => <li key={g.id} className="sc-gate" style={d(1 + i * 0.45)}><b>{g.letter}</b>{g.name}</li>)}
      </ol>
    </div>
  )
}
