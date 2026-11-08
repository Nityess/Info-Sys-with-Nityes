import type { CSSProperties } from 'react'
import { Ico } from './Ico'
import { linkGeometry, nodeClass, nodeStyle, regionStyle, zoneLabels } from './sceneLogic'
import type { Scene } from './types'

/**
 * The box and arrow scene for topics without a step demo: regions, nodes in the four type colours, auto-routed links with
 * moving packets. Below 760px it stacks into a column with arrows (the CSS hides the regions and shows zone labels).
 */
export function NodeScene({ scene, name }: { scene: Scene; name: string }) {
  const zones = zoneLabels(scene)
  return (
    <div className="bd-scrollx">
      <div className={scene.links.length ? 'scn' : 'scn scn-nf'} style={{ aspectRatio: `100/${scene.h}` }} role="img" aria-label={`Diagram: ${name}`}>
        {scene.regions.map((r) => (
          <div key={r.label} className={`reg reg-${r.k}`} style={regionStyle(r, scene.h)}>{r.label}</div>
        ))}
        {scene.links.map((l, i) => {
          const g = linkGeometry(scene, l)
          return (
            <div key={`${l[0]}-${l[1]}`} className={`ln ${g.dir === 'h' ? 'lnh' : 'lnv'}`} style={g.style}>
              <span className="pk" style={{ '--d': `${(i * 0.5).toFixed(1)}s` } as CSSProperties} />
            </div>
          )
        })}
        {scene.nodes.map((n, i) => (
          <div key={`${n.t}-${i}`} className={`nd ${nodeClass(n.k)}${zones[i] ? ' nd-z' : ''} bd-rise`} style={{ ...nodeStyle(n, scene.h), '--d': `${(i * 0.08).toFixed(2)}s` } as CSSProperties}>
            <span className="zn">{zones[i]}</span>
            {n.ic && <span className="nic"><Ico name={n.ic} /></span>}
            <b>{n.t}</b>
            <span className="ns">{n.s}</span>
            {n.bar ? <span className="barw"><span className="barf" style={{ width: `${n.bar}%` }} /></span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
