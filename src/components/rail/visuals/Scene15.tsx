import { useState } from 'react'
import { CHAIN_BROKEN, CHAIN_OK, NET_VALUE_FORMULA, VALUE_CHAIN } from './s1Data'
import { d } from './sceneUtil'

const BROKEN_AT = 2

/** 1.5: the value chain builds link by link. "Management does nothing" snaps it at Action taken, and no value is created. */
export function Scene15() {
  const [broken, setBroken] = useState(false)
  return (
    <div className="sc-col" style={{ gap: '1.125rem' }}>
      <ol className="sc-grid sc-chain" style={{ '--min': '9rem' } as React.CSSProperties} aria-label="How information creates value">
        {VALUE_CHAIN.map((text, i) => {
          const cut = broken && i === BROKEN_AT
          const dead = broken && i > BROKEN_AT
          return (
            <li key={text} className="sc-col" style={{ gap: '.5rem' }}>
              <div className={`sc-node sc-pop${cut ? ' sc-node-bad' : ''}${dead ? ' sc-node-off' : ''}`} style={d(i * 0.5)}>
                {cut ? 'No action taken' : text}
                {dead && <span className="sc-sub">No value</span>}
              </div>
              <div className="sc-grow sc-bar" style={{ ...d(i * 0.5 + 0.3), background: cut ? 'var(--bad)' : dead ? 'var(--line-strong)' : 'var(--brand)' }} />
            </li>
          )
        })}
      </ol>
      <div role="status" className={`sc-rem${broken ? ' sc-rem-bad' : ''}`}>{broken ? CHAIN_BROKEN : CHAIN_OK}</div>
      <div className="sc-wrap">
        <button type="button" className="sc-btn sc-btn-p" aria-pressed={broken} onClick={() => setBroken(!broken)}>
          {broken ? 'Management acts again' : 'Management does nothing'}
        </button>
        <span className="sc-chip sc-chip-aid">{NET_VALUE_FORMULA}</span>
      </div>
    </div>
  )
}
