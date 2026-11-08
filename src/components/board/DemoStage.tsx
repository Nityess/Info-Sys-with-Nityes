import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Ico } from './Ico'
import { STEP_MS, demoLabel, finalStep, inWindow, isVisible, itemClass, itemStyle, nextStep, showsWhenReduced, stageItems } from './demoLogic'
import type { Demo } from './types'
import { useReducedMotion } from './useReducedMotion'

/**
 * "Watch how it works": a step-by-step demo on a 100 wide grid. It steps every 3.5 seconds, loops, and starts again when
 * its parent remounts it (Replay). Captions and progress dots are added from the demo's captions. With reduced motion it
 * shows its last step, without captions, dots or "before" values; the aria-label lists every caption.
 */
export function DemoStage({ demo }: { demo: Demo }) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const items = useMemo(() => stageItems(demo), [demo])

  useEffect(() => {
    if (reduced || demo.n < 2) return
    const id = window.setInterval(() => setStep((s) => nextStep(s, demo.n)), STEP_MS)
    return () => window.clearInterval(id)
  }, [reduced, demo.n])

  const at = reduced ? finalStep(demo) : step
  return (
    <div className="bd-stage" style={{ aspectRatio: `100/${demo.h}` }} role="img" aria-label={demoLabel(demo)}>
      {items.map((it, i) => {
        const { o } = it
        const visible = isVisible(o, at)
        if (reduced && (!visible || !showsWhenReduced(o))) return null
        let cls = itemClass(o)
        if (!visible) cls += ' dm-off'
        if (inWindow(o.hi, at)) cls += ' dm-ha'
        if (inWindow(o.hi2, at)) cls += ' dm-hb'
        return (
          <div key={i} className={cls} style={itemStyle(it, demo.h)}>
            {o.ic && <Ico name={o.ic} />}
            <span className="dt">{it.t}</span>
            <span className="ds">{o.s ?? ''}</span>
            {o.pk ? <span className="dpk" style={{ '--tx': `${it.w - 1.7}cqw` } as CSSProperties} /> : null}
          </div>
        )
      })}
    </div>
  )
}
