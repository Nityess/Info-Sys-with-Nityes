import { useState } from 'react'
import type { ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import './scenes.css'
import './scenes-s1.css'
import './scenes-s2.css'
import './scenes-s3.css'

interface Props {
  /** Teaching-aid chip, e.g. "ACCURATE · teaching aid" */
  aid?: string
  /** Section class: sc-s1, sc-s2 or sc-s3 sets the accent colour */
  section?: 's1' | 's2' | 's3'
  children: ReactNode
}

/** Frame for one scene: the chip row with a Replay button. Replay remounts the scene, so every animation and every tap state starts again. */
export function SceneFrame({ aid, section = 's1', children }: Props) {
  const [run, setRun] = useState(0)
  return (
    <div className={`sc sc-${section}`}>
      <div className="sc-wrap" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span>{aid && <span className="sc-chip sc-chip-aid">{aid}</span>}</span>
        <button type="button" className="sc-btn" onClick={() => setRun((r) => r + 1)}>
          <RotateCcw className="h-[1.125rem] w-[1.125rem]" aria-hidden />
          Replay
        </button>
      </div>
      <div key={run} className="sc-stage">{children}</div>
    </div>
  )
}
