import ch8 from '../../assets/home/ch8.webp'
import teacher from '../../assets/home/teacher.webp'
import { Arrow, Tick } from './Arrow'
import { Jump } from './Jump'

/** The first screen: tag, one headline with a drawn marker, two buttons, and a scene of a real screen with the teacher. */
export function Hero({ startHref }: { startHref: string }) {
  return (
    <section className="ns-hero" aria-labelledby="ns-h1">
      <div className="ns-wrap ns-hero-grid">
        <div style={{ paddingBottom: 'clamp(1.875rem,6vw,5.25rem)' }}>
          <span className="ns-tag ns-rise"><i />ICAN CAP Foundation · Paper 2 · Part B</span>
          <h1 id="ns-h1" className="ns-d ns-h1 ns-rise" style={{ animationDelay: '.08s' }}>
            Information Systems you can{' '}
            <em>
              play with.
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path d="M4 13 C 60 3, 110 18, 160 9 S 250 4, 296 11" stroke="#FFC93C" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </em>
          </h1>
          <p className="ns-sub ns-rise" style={{ animationDelay: '.16s' }}>
            Press the button, break the business, watch what happens. Then get the exam words, exactly as the study book says them.
          </p>
          <div className="ns-acts ns-rise" style={{ animationDelay: '.24s' }}>
            <a className="ns-btn ns-btn-p" href={startHref}>
              Start with Chapter 7
              <Arrow />
            </a>
            <Jump to="demo" className="ns-btn ns-btn-g">See it work</Jump>
          </div>
          <ul className="ns-trust ns-rise" style={{ animationDelay: '.32s' }}>
            {['Free', 'No account', 'Works on your phone'].map((t) => (
              <li key={t}><Tick />{t}</li>
            ))}
          </ul>
        </div>
        <div className="ns-scene ns-rise" style={{ animationDelay: '.2s' }}>
          <div className="ns-arch" aria-hidden="true" />
          <div className="ns-win">
            <div className="ns-win-bar" aria-hidden="true"><i /><i /><i /><span>Chapter 8 · Run the system</span></div>
            <img src={ch8} alt="A real Chapter 8 screen: a system running, with input turning into output." width={1100} height={687} />
          </div>
          <img className="ns-man" src={teacher} alt="CA Nitesh, your teacher, smiling with both hands open." width={904} height={960} />
          <div className="ns-pill ns-pill-b" aria-hidden="true"><Tick size={16} weight={3.2} />hash OK</div>
          <div className="ns-pill ns-pill-a" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            hash wrong
          </div>
        </div>
      </div>
    </section>
  )
}
