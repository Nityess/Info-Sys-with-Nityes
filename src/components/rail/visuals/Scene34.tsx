import { useState } from 'react'
import { NetDiagram } from './NetDiagrams'
import { NETWORKS, NETWORK_ADVANTAGES } from './s3Data'
import { d } from './sceneUtil'

/** 3.4: LAN, WLAN, WAN and VPN as moving diagrams, each with coverage, key feature and its example. Five advantages below. This is a viewer, not the network builder playground. */
export function Scene34() {
  const [sel, setSel] = useState(0)
  const n = NETWORKS[sel]
  return (
    <div className="sc-col" style={{ gap: '1rem' }}>
      <div className="sc-seg" role="group" aria-label="Network type" style={{ alignSelf: 'flex-start', flexWrap: 'wrap' }}>
        {NETWORKS.map((x, i) => <button key={x.key} type="button" aria-pressed={sel === i} onClick={() => setSel(i)}>{x.key}</button>)}
      </div>
      <div className="sc-grid" style={{ '--min': '21rem', gap: '1rem', alignItems: 'center' } as React.CSSProperties}>
        <div className="sc-bx sc-pad-s" key={n.key}><NetDiagram net={n.key} /></div>
        <div className="sc-bx sc-pad sc-col sc-pop" key={`i-${n.key}`} role="status" style={{ gap: '.625rem' }}>
          <b className="sc-serif" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{n.key}: {n.name}</b>
          <div><span className="sc-fl">Coverage</span><div>{n.coverage}</div></div>
          <div><span className="sc-fl">Key feature</span><div>{n.feature}</div></div>
          <div className="sc-fb sc-fb-ok">{n.example}</div>
          {'warn' in n && <div className="sc-fb sc-fb-bad"><b>Not the same:</b> {n.warn}</div>}
        </div>
      </div>
      <div className="sc-wrap">
        <span className="sc-fl" style={{ width: '100%' }}>Five advantages of IT networks</span>
        {NETWORK_ADVANTAGES.map((a, i) => <span key={a} className="sc-chip sc-rise" style={d(0.2 + i * 0.2)}>{a}</span>)}
      </div>
    </div>
  )
}
