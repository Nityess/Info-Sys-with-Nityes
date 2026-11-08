import { HOW_STEPS } from './homeData'
import { SamplePlayground } from './SamplePlayground'

/** The eight-step path beside a live sample playground. */
export function HowSection() {
  return (
    <section id="how" className="lp-wrap lp-sec">
      <div className="lp-head lp-reveal">
        <span className="lp-eyebrow">How a topic works</span>
        <h2 className="lp-serif lp-h2">Eight short steps, then you are done</h2>
        <p className="lp-lede">Every topic follows the same path. Try the sample playground from Topic 1.5.</p>
      </div>
      <div className="lp-how">
        <ol className="lp-steps lp-reveal">
          {HOW_STEPS.map((s, i) => (
            <li key={s.title} className="lp-step">
              <span className={`lp-stp ${'gold' in s ? 'lp-stp-gold' : ''}`}>{i + 1}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <SamplePlayground />
      </div>
    </section>
  )
}
