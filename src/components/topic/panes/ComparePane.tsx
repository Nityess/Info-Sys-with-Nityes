import { useMemo, useState } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import { parseCompare, parseTraps, planningFit } from '../infoTypes'

/** Step 3: a switch between the comparison of the four types and the four exam traps. */
export function ComparePane({ topic }: { topic: ParsedTopic }) {
  const rows = useMemo(() => parseCompare(topic), [topic])
  const fit = useMemo(() => planningFit(topic), [topic])
  const traps = useMemo(() => parseTraps(topic), [topic])
  const [view, setView] = useState<'table' | 'traps'>('table')

  return (
    <div className="ls-stack">
      <div className="ls-seg" role="group" aria-label="View">
        <button type="button" className={view === 'table' ? 'on' : ''} aria-pressed={view === 'table'} onClick={() => setView('table')}>Compare all four</button>
        <button type="button" className={view === 'traps' ? 'on' : ''} aria-pressed={view === 'traps'} onClick={() => setView('traps')}>Exam traps</button>
      </div>

      {view === 'table' ? (
        <>
          <ul className="ls-cmp">
            {rows.map((r) => (
              <li key={r.key} className={`ls-card ls-ty-${r.key}`}>
                <span className="ls-chip ls-chip-ty ls-chip-big" style={{ alignSelf: 'flex-start' }}>{r.name}</span>
                <div><span className="ls-cap">Used by</span><div style={{ fontWeight: 700 }}>{r.who}</div></div>
                <div><span className="ls-cap">Main characteristics</span><div>{r.chars}</div></div>
              </li>
            ))}
          </ul>
          {fit.text && <div className="ls-fb ls-fb-info"><b>{fit.head}</b> {fit.text}</div>}
        </>
      ) : (
        <ul className="ls-traps">
          {traps.map((t) => (
            <li key={t.n} className="ls-card">
              <div className="ls-traphead"><span className="ls-chip ls-chip-gold">Trap {t.n}</span><b>{t.head}</b></div>
              {t.note && <p className="ls-trapnote">{t.note}</p>}
              {t.wrong && <div className="ls-fb ls-fb-bad"><b>Wrong.</b> {t.wrong}</div>}
              <div className="ls-fb ls-fb-ok"><b>Right.</b> {t.right}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
