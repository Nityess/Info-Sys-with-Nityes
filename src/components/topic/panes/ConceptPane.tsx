import { useMemo, useState } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import { parseTypes } from '../infoTypes'
import type { TypeKey } from '../infoTypes'

const LEVELS: { key: TypeKey; width: string; marker: string }[] = [
  { key: 'strategic', width: '58%', marker: '8%' },
  { key: 'tactical', width: '78%', marker: '50%' },
  { key: 'operational', width: '100%', marker: '92%' },
]

/** Step 2: a stepped pyramid (Planning sits apart, not as a level), a long-term to daily bar, and a detail panel. */
export function ConceptPane({ topic }: { topic: ParsedTopic }) {
  const types = useMemo(() => parseTypes(topic), [topic])
  const [sel, setSel] = useState<TypeKey>('strategic')
  const d = types.find((t) => t.key === sel) ?? types[0]
  const planning = types.find((t) => t.key === 'planning')
  const marker = LEVELS.find((l) => l.key === sel)?.marker
  if (!d) return null

  return (
    <div className="ls-two">
      <div className="ls-card ls-cardpad">
        <span className="ls-label">Tap a level</span>
        <div className="ls-layers">
          {LEVELS.map((l) => {
            const t = types.find((x) => x.key === l.key)
            if (!t) return null
            return (
              <button key={l.key} type="button" aria-pressed={sel === l.key} style={{ width: l.width }} className={`ls-layer ls-ty-${l.key}${sel === l.key ? ' ls-layer-on' : ''}`} onClick={() => setSel(l.key)}>
                <b>{t.name}</b>
                <span>{t.who}</span>
              </button>
            )
          })}
        </div>
        <div className="ls-horizon" aria-hidden="true">
          <div className="ls-track">
            <i />
            {marker && <b style={{ left: marker }} />}
          </div>
          <div className="ls-ends"><span>Long-term</span><span>Short-term</span><span>Daily</span></div>
        </div>
        {planning && (
          <div className="ls-sep">
            <span className="ls-label">Separate category, not a level</span>
            <div className="ls-ty-planning" style={{ marginTop: '.5rem' }}>
              <button type="button" aria-pressed={sel === 'planning'} className={`ls-tcard${sel === 'planning' ? ' ls-tcard-on' : ''}`} onClick={() => setSel('planning')}>
                <b>{planning.name}</b>
                <span>{planning.who} · {planning.focus.replace(/ focus$/i, '')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`ls-card ls-detail ls-ty-${d.key}`} role="region" aria-label={`${d.name} information`} aria-live="polite">
        <div className="ls-chips">
          <span className="ls-chip ls-chip-ty ls-chip-big">{d.name} information</span>
          <span className="ls-chip ls-chip-soft">{d.focus}</span>
        </div>
        <div>
          <span className="ls-label">Used by</span>
          <div className="ls-by">{d.who}</div>
        </div>
        <p>{d.meaning}</p>
        <ul className="ls-bullets">{d.chars.map((c) => <li key={c}><span>{c}</span></li>)}</ul>
        <div className="ls-fb ls-fb-ty"><b>Example.</b> {d.example}</div>
        <div>
          <span className="ls-label">Memory clue</span>
          <b className="ls-serif ls-clue" style={{ display: 'block' }}>{d.clue}</b>
        </div>
        {d.exam && <div className="ls-fb ls-fb-info"><b>Exam point.</b> {d.exam}</div>}
      </div>
    </div>
  )
}
