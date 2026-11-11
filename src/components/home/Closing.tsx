import phone from '../../assets/home/phone.webp'
import teacher from '../../assets/home/teacher.webp'
import { Arrow, Tick } from './Arrow'
import { chapter9Hash } from '../../state/route'

const CHIPS = ['Free', 'No account', 'Progress saved on your device', 'Light on data']

/** The phone band, the closing call to action, and the footer. */
export function Closing({ startHref }: { startHref: string }) {
  return (
    <>
      <section id="phone" aria-labelledby="ns-ph">
        <div className="ns-wrap">
          <div className="ns-pocket ns-rv">
            <div className="ns-pocket-copy">
              <h2 id="ns-ph" className="ns-d ns-h2" style={{ maxWidth: '12ch' }}>Built for the phone you already have.</h2>
              <ul className="ns-chips">
                {CHIPS.map((c) => (
                  <li key={c}><Tick size={16} weight={3.2} />{c}</li>
                ))}
              </ul>
            </div>
            <div className="ns-phone-stage">
              <div className="ns-phone">
                <img src={phone} alt="The Chapter 9 blockchain simulator on a phone, with a valid block and a plain-language explanation of the hash check." width={560} height={1211} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-end" aria-labelledby="ns-end">
        <div className="ns-wrap">
          <span className="ns-tag ns-rv"><i />Your first topic</span>
          <h2 id="ns-end" className="ns-d ns-rv">Ten minutes. One topic. <em>Go.</em></h2>
          <p className="ns-rv">Open Chapter 7 and finish the first topic. Nothing to install, nothing to pay.</p>
          <div className="ns-acts ns-rv">
            <a className="ns-btn ns-btn-p" href={startHref}>
              Start with Chapter 7
              <Arrow />
            </a>
            <a className="ns-btn ns-btn-g" href={chapter9Hash()}>Try the Chapter 9 simulators</a>
          </div>
          <img className="ns-end-man" src={teacher} alt="CA Nitesh smiling and inviting you in." width={904} height={960} loading="lazy" decoding="async" />
        </div>
      </section>
    </>
  )
}
