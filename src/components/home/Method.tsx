import teacher from '../../assets/home/teacher.webp'
import { PressIt } from './PressIt'

const FONT = { font: '700 15px "Figtree Variable", Figtree, sans-serif' }
const SMALL = { font: '600 13.5px "Figtree Variable", Figtree, sans-serif' }

function SeeIt() {
  return (
    <svg viewBox="0 0 360 96" width="100%" style={{ maxWidth: 400, display: 'block' }} fill="none" stroke="#15122E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="22" width="92" height="52" rx="12" fill="#F6F4FF" />
      <rect x="134" y="10" width="92" height="76" rx="14" fill="#5B3DF5" stroke="#5B3DF5" />
      <rect x="264" y="22" width="92" height="52" rx="12" fill="#F6F4FF" />
      <path d="M100 48h28M128 48l-8-7M128 48l-8 7M230 48h28M258 48l-8-7M258 48l-8 7" />
      <text x="50" y="54" textAnchor="middle" fill="#15122E" stroke="none" style={FONT}>Input</text>
      <text x="180" y="54" textAnchor="middle" fill="#fff" stroke="none" style={FONT}>Process</text>
      <text x="310" y="54" textAnchor="middle" fill="#15122E" stroke="none" style={FONT}>Output</text>
    </svg>
  )
}

function BreakIt() {
  return (
    <svg viewBox="0 0 372 84" width="100%" style={{ maxWidth: 410, display: 'block' }} fill="none" strokeWidth="2" strokeLinecap="round">
      <rect x="4" y="6" width="100" height="72" rx="12" fill="#DEF5EC" stroke="#0E9F6E" />
      <rect x="136" y="6" width="100" height="72" rx="12" fill="#FCE4E5" stroke="#E5484D" />
      <rect x="268" y="6" width="100" height="72" rx="12" fill="#FCE4E5" stroke="#E5484D" />
      <path d="M108 42h24M240 42h24" stroke="#15122E" />
      {[['Block 1', 54], ['Block 2', 186], ['Block 3', 318]].map(([t, x]) => (
        <text key={t} x={x} y="38" textAnchor="middle" fill="#15122E" style={FONT}>{t}</text>
      ))}
      <text x="54" y="60" textAnchor="middle" fill="#0B7A55" style={SMALL}>valid</text>
      <text x="186" y="60" textAnchor="middle" fill="#C0353A" style={SMALL}>changed</text>
      <text x="318" y="60" textAnchor="middle" fill="#C0353A" style={SMALL}>broken</text>
    </svg>
  )
}

/** "How a topic goes": see it, press it, break it, then say it the exam way. Step 2 is a small live demo. */
export function Method() {
  return (
    <section className="ns-sec" id="method" aria-labelledby="ns-m" style={{ paddingTop: 0 }}>
      <div className="ns-wrap ns-how">
        <div className="ns-how-head ns-rv">
          <span className="ns-tag"><i />How a topic goes</span>
          <h2 id="ns-m" className="ns-d ns-h2">Four moves, <em>in this order.</em></h2>
          <p className="ns-lead">You meet the idea before you meet the definition. That is why it stays.</p>
          <img className="ns-man2" src={teacher} alt="" width={904} height={960} loading="lazy" decoding="async" />
        </div>
        <div className="ns-steps">
          <div className="ns-step ns-rv">
            <div className="ns-step-n" aria-hidden="true">1</div>
            <div>
              <h3>See it</h3>
              <p>A diagram first, so the idea has a shape before it has a name.</p>
              <div className="ns-step-v art" aria-hidden="true"><SeeIt /></div>
            </div>
          </div>
          <div className="ns-step ns-rv">
            <div className="ns-step-n" aria-hidden="true">2</div>
            <div>
              <h3>Press it</h3>
              <p>Run the system. Launch the attack. Broadcast the block. Try it here:</p>
              <div className="ns-step-v"><PressIt /></div>
            </div>
          </div>
          <div className="ns-step ns-rv">
            <div className="ns-step-n" aria-hidden="true">3</div>
            <div>
              <h3>Break it</h3>
              <p>Change one number and watch every block after it fail. That is the moment it sticks.</p>
              <div className="ns-step-v art" aria-hidden="true"><BreakIt /></div>
            </div>
          </div>
          <div className="ns-step ns-rv">
            <div className="ns-step-n" aria-hidden="true">4</div>
            <div>
              <h3>Say it the exam way</h3>
              <p>Only then the definition, word for word as the study book has it.</p>
              <div className="ns-step-v ns-def">
                <small>Remember this · Blockchain</small>
                <q>A process used in many distributed ledger systems to ensure that <b>only valid transactions</b> are recorded.</q>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
