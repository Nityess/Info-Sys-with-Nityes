import { useMemo } from 'react'
import { parseTypes } from '../../topic/infoTypes'
import { useParsedTopic } from '../../topic/useParsedTopic'
import { d } from './sceneUtil'

const LEVELS = [
  { key: 'strategic', cls: 'sc-t-st', width: '52%', delay: 0.1 },
  { key: 'tactical', cls: 'sc-t-ta', width: '76%', delay: 0.7 },
  { key: 'operational', cls: 'sc-t-op', width: '100%', delay: 1.3 },
] as const

/** 1.2: the pyramid builds layer by layer, a long-term to daily bar, then Planning slides in as a separate card. Text from the parsed topic. */
export function Scene12() {
  const topic = useParsedTopic('1.2')
  const types = useMemo(() => (topic ? parseTypes(topic) : []), [topic])
  const planning = types.find((t) => t.key === 'planning')
  if (types.length === 0) return <p role="status" className="sc-note">Loading the scene…</p>

  return (
    <div className="sc-two">
      <div className="sc-col" role="img" aria-label="Pyramid: strategic on top, tactical in the middle, operational at the base">
        {LEVELS.map((l) => {
          const t = types.find((x) => x.key === l.key)
          if (!t) return null
          return (
            <div key={l.key} className={`sc-layer sc-rise ${l.cls}`} style={{ ...d(l.delay), width: l.width }}>
              <b>{t.name}</b>
              <span>{t.who} · {t.focus.replace(/\.$/, '')}</span>
            </div>
          )
        })}
        <div className="sc-horizon" aria-hidden="true">
          <div className="sc-track">
            <i className="sc-grow" style={d(1.8)} />
            <b className="sc-mkr" />
          </div>
          <div className="sc-ends"><span>Long-term</span><span>Short-term</span><span>Daily</span></div>
        </div>
      </div>
      {planning && (
        <div className="sc-planning sc-sr sc-t-pl" style={d(2.2)}>
          <span className="sc-chip sc-chip-solid">Separate category</span>
          <b className="sc-serif">{planning.name} information</b>
          <span className="sc-note">{planning.who} · {planning.focus.replace(/\.$/, '')}</span>
          <span className="sc-hl" style={{ ...d(2.8), alignSelf: 'flex-start', fontWeight: 700 }}>Not a level of the pyramid</span>
        </div>
      )}
    </div>
  )
}
