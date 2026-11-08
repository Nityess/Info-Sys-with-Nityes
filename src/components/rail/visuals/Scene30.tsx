import { Ico } from './Ico'
import { LOOP } from './s3Data'
import { d } from './sceneUtil'

/** Start: the information system loop. Collection, Storage, Production and Distribution light up in turn, and the loop goes round again. */
export function Scene30() {
  return (
    <div className="sc-col" style={{ gap: '1rem' }}>
      <p className="sc-note" style={{ fontSize: '1rem' }}>{LOOP.caption}:</p>
      <ol className="sc-loop">
        {LOOP.steps.map((s, i) => (
          <li key={s.name} className="sc-step sc-rise" style={{ ...d(0.2 + i * 0.3), '--i': i } as React.CSSProperties}>
            <span className="sc-fn" aria-hidden="true">{i + 1}</span>
            <span className="sc-fico"><Ico name={s.icon} /></span>
            <b className="sc-serif">{s.name}</b>
            <span className="sc-note">{s.text}</span>
          </li>
        ))}
      </ol>
      <div className="sc-back-arrow" aria-hidden="true">↺ then the loop starts again</div>
    </div>
  )
}
