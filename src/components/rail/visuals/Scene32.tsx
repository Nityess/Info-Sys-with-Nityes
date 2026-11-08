import { useState } from 'react'
import { DB } from './s3Data'
import { d } from './sceneUtil'

const POS = [
  { left: '4%', top: '8%' },
  { left: '46%', top: '34%' },
  { left: '12%', top: '62%' },
]

/** 3.2: a structured table against a drift of unstructured files, and a small or large database storage switch. */
export function Scene32() {
  const [large, setLarge] = useState(false)
  const s = DB.storage[large ? 1 : 0]
  const { structured: st, unstructured: un } = DB
  return (
    <div className="sc-col" style={{ gap: '1.25rem' }}>
      <div className="sc-grid" style={{ '--min': '18rem', gap: '1rem' } as React.CSSProperties}>
        <div className="sc-bx sc-sl sc-pad sc-col" style={{ ...d(0.1), gap: '.5rem' }}>
          <div className="sc-wrap" style={{ justifyContent: 'space-between' }}><b>{st.name}</b><span className="sc-chip sc-chip-ok">Defined fields and tables</span></div>
          <div className="sc-table">
            {st.header.map((h) => <b key={h} className="sc-th">{h}</b>)}
            {st.rows.map((r, i) => r.map((c, j) => <span key={`${i}-${j}`} className="sc-td sc-rise" style={d(0.5 + i * 0.3)}>{c}</span>))}
          </div>
          <span className="sc-note">Example: {st.example}</span>
        </div>
        <div className="sc-bx sc-sr sc-pad sc-col" style={{ ...d(0.1), gap: '.5rem' }}>
          <div className="sc-wrap" style={{ justifyContent: 'space-between' }}><b>{un.name}</b><span className="sc-chip sc-k-text">No fixed table structure</span></div>
          <div className="sc-files" role="img" aria-label={un.files.join(', ')}>
            {un.files.map((f, i) => <span key={f} className="sc-file sc-drift" style={{ ...d(i * 0.6), ...POS[i] }}>{f}</span>)}
          </div>
          <span className="sc-note">{un.note}</span>
        </div>
      </div>
      <div className="sc-bx sc-pad sc-col" style={{ gap: '.75rem' }}>
        <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
          <b>Where is it stored?</b>
          <div className="sc-seg" role="group" aria-label="Database size">
            {DB.storage.map((x, i) => <button key={x.label} type="button" aria-pressed={large === (i === 1)} onClick={() => setLarge(i === 1)}>{x.label}</button>)}
          </div>
        </div>
        <div className="sc-meter"><div style={{ width: `${s.width}%`, background: 'var(--acc)' }} /></div>
        <div role="status" className="sc-fb sc-fb-ok"><b>{s.where}.</b> {s.note}</div>
      </div>
    </div>
  )
}
