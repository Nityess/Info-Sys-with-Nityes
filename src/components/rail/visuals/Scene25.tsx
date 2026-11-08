import { useState } from 'react'
import { OTHER_SOURCES } from './s2Data'
import { d } from './sceneUtil'

/** 2.5: five user cards. Tap one to open the extra source of financial information that user can use. */
export function Scene25() {
  const [open, setOpen] = useState(-1)
  return (
    <div className="sc-col">
      <span className="sc-fl">Published statements are not the only source. Tap a user.</span>
      {OTHER_SOURCES.map((s, i) => {
        const on = open === i
        return (
          <button key={s.user} type="button" aria-expanded={on} className={`sc-acc sc-rise${on ? ' sc-acc-on' : ''}`} style={d(i * 0.12)} onClick={() => setOpen(on ? -1 : i)}>
            <span className="sc-acc-head"><b>{s.user}</b><span aria-hidden="true">{on ? '−' : '+'}</span></span>
            {on && <span className="sc-acc-body sc-rise">{s.info}</span>}
          </button>
        )
      })}
    </div>
  )
}
