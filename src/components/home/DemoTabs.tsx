import { useState } from 'react'
import ch10 from '../../assets/home/ch10.webp'
import ch7 from '../../assets/home/ch7.webp'
import ch8 from '../../assets/home/ch8.webp'
import ch9 from '../../assets/home/ch9.webp'
import teacher from '../../assets/home/teacher.webp'
import { DEMO_TABS } from './homeData'

const SHOTS: Record<number, { src: string; w: number; h: number }> = {
  7: { src: ch7, w: 1100, h: 687 },
  8: { src: ch8, w: 1100, h: 687 },
  9: { src: ch9, w: 1500, h: 937 },
  10: { src: ch10, w: 1100, h: 687 },
}

/** "See it work": four chapter tabs, each fading in a real screen, with a line from the teacher below. Starts on Chapter 9. */
export function DemoTabs() {
  const [tab, setTab] = useState(9)
  const cur = DEMO_TABS.find((t) => t.chapter === tab) ?? DEMO_TABS[2]
  return (
    <section className="ns-demo ns-sec" id="demo" aria-labelledby="ns-dm">
      <div className="ns-wrap">
        <div className="ns-center ns-rv">
          <span className="ns-tag"><i />Real screens, not mock-ups</span>
          <h2 id="ns-dm" className="ns-d ns-h2" style={{ maxWidth: '16ch' }}>Every topic is something <em>you do.</em></h2>
          <p className="ns-lead">Pick a chapter to see what its first minutes look like.</p>
        </div>
        <div className="ns-tabs" role="tablist" aria-label="Chapter previews">
          {DEMO_TABS.map((t) => (
            <button key={t.chapter} type="button" role="tab" className={`ns-tab ${t.chapter === tab ? 'on' : ''}`} aria-selected={t.chapter === tab} onClick={() => setTab(t.chapter)}>
              <b>{t.chapter}</b>
              {t.label}
            </button>
          ))}
        </div>
        <div className="ns-stage ns-rv">
          <div className="ns-win">
            <div className="ns-win-bar" aria-hidden="true"><i /><i /><i /><span>{cur.title}</span></div>
            <div className="ns-stack">
              {DEMO_TABS.map((t) => (
                <img key={t.chapter} className={t.chapter === tab ? 'on' : ''} src={SHOTS[t.chapter].src} alt={t.alt} width={SHOTS[t.chapter].w} height={SHOTS[t.chapter].h} loading="lazy" decoding="async" aria-hidden={t.chapter !== tab} />
              ))}
            </div>
          </div>
        </div>
        <div className="ns-say">
          <span className="ns-face"><img src={teacher} alt="" width={904} height={960} loading="lazy" /></span>
          <p aria-live="polite"><b>CA Nitesh:</b> {cur.say}</p>
        </div>
      </div>
    </section>
  )
}
