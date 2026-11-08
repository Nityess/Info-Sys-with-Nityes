import { QC } from './s2Data'
import { d } from './sceneUtil'

/** 2.3: the NFRS tree grows in. Fundamental: Relevance (with Materiality inside it) and Faithful Representation (Prudence supports neutrality). Enhancing: U C V T. */
export function Scene23() {
  return (
    <div className="sc-col" style={{ gap: 0, alignItems: 'stretch' }}>
      <div className="sc-pop sc-root" style={d(0.1)}>{QC.root}</div>
      <div className="sc-growy sc-stem" style={d(0.5)} />
      <div className="sc-grid" style={{ '--min': '19rem', gap: '1rem' } as React.CSSProperties}>
        <div className="sc-sl sc-branch" style={d(0.9)}>
          <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
            <b className="sc-serif sc-h3">{QC.fundamental.name}</b>
            <span className="sc-chip sc-chip-solid" style={{ background: 'var(--acc)' }}>{QC.fundamental.purpose}</span>
          </div>
          <div className="sc-bx sc-rise sc-pad-s" style={d(1.3)}>
            <b>{QC.relevance.name}</b>
            <div className="sc-note">{QC.relevance.def}</div>
            <div className="sc-wrap" style={{ gap: '.375rem', marginTop: '.5rem' }}>
              {QC.relevance.parts.map((p, i) => (
                <span key={p} className={`sc-chip sc-pop${p === 'Materiality' ? ' sc-chip-gold' : ''}`} style={d(1.7 + i * 0.2)}>
                  {p}{p === 'Materiality' ? ' (inside Relevance)' : ''}
                </span>
              ))}
            </div>
          </div>
          <div className="sc-bx sc-rise sc-pad-s" style={d(1.6)}>
            <b>{QC.faithful.name}</b>
            <div className="sc-note">{QC.faithful.def}</div>
            <div className="sc-wrap" style={{ gap: '.375rem', marginTop: '.5rem' }}>
              {QC.faithful.parts.map((p, i) => (
                <span key={p} className="sc-chip sc-pop" style={d(2.3 + i * 0.2)}>{p}</span>
              ))}
              <span className="sc-chip sc-chip-gold sc-pop" style={d(3)}>{QC.prudence} supports Neutral</span>
            </div>
          </div>
        </div>
        <div className="sc-sr sc-branch sc-branch-dash" style={d(0.9)}>
          <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
            <b className="sc-serif sc-h3">{QC.enhancing.name}</b>
            <span className="sc-chip">{QC.enhancing.purpose}</span>
          </div>
          {QC.uctv.map((u, i) => (
            <div key={u.name} className="sc-bx sc-rise sc-pad-s" style={d(1.4 + i * 0.3)}><b>{u.letter}</b> {u.name}: {u.text}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
