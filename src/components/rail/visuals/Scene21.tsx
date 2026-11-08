import { useState } from 'react'
import { COMPANY, USERS } from './s2Data'
import { d } from './sceneUtil'

const point = (i: number, r: number) => {
  const a = ((-90 + (i * 360) / USERS.length) * Math.PI) / 180
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) }
}

/** 2.1: the company's financial statements in the centre, seven users around them. Primary users are marked and glow. Tap a user to see what they want to know. */
export function Scene21() {
  const [sel, setSel] = useState(0)
  const u = USERS[sel]
  return (
    <div className="sc-two" style={{ alignItems: 'center' }}>
      <div className="sc-orbit">
        <svg viewBox="0 0 100 100" className="sc-spokes" aria-hidden="true">
          <g stroke="var(--line-strong)" strokeWidth=".5" strokeDasharray="2 2">
            {USERS.map((x, i) => <line key={x.name} x1="50" y1="50" x2={point(i, 39).x} y2={point(i, 39).y} />)}
          </g>
        </svg>
        <div className="sc-hub sc-pop" style={d(0.1)}><span>{COMPANY.name}</span><small>{COMPANY.centre}</small></div>
        {USERS.map((x, i) => {
          const p = point(i, 39)
          return (
            <button
              key={x.name}
              type="button"
              aria-pressed={sel === i}
              className={`sc-user sc-pop${x.primary ? ' sc-user-p' : ''}${sel === i ? ' sc-user-on' : ''}`}
              style={{ ...d(0.3 + i * 0.12), left: `${p.x.toFixed(1)}%`, top: `${p.y.toFixed(1)}%` }}
              onClick={() => setSel(i)}
            >
              {x.name}
            </button>
          )
        })}
      </div>
      <div className="sc-bx sc-pad sc-col sc-pop" key={u.name} role="status" style={{ minHeight: '9.5rem', gap: '.5rem' }}>
        <span className={`sc-chip ${u.primary ? 'sc-chip-gold' : ''}`} style={{ alignSelf: 'flex-start' }}>{u.primary ? 'Primary user' : 'Other user'}</span>
        <b className="sc-serif" style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}>{u.name}</b>
        <span className="sc-fl">What do they want to know?</span>
        <ul className="sc-asks">{u.ask.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </div>
  )
}
