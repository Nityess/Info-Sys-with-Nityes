import { ArrowRight } from 'lucide-react'
import { LedgerDemo } from './LedgerDemo'

interface Props {
  /** Where the main button goes (a hash link) */
  startHref: string
  goto: (id: string) => void
}

/** The first screen: one plain headline, one main button, and a live demo on ruled paper with a red margin line. */
export function Hero({ startHref, goto }: Props) {
  return (
    <section className="lp-hero" aria-labelledby="lp-h1">
      <span className="lp-margin" aria-hidden="true" />
      <div className="lp-wrap lp-hero-grid">
        <div className="lp-hero-copy">
          <h1 id="lp-h1" className="lp-serif lp-h1 lp-rise">Learn Information Systems by trying it</h1>
          <p className="lp-sub lp-rise" style={{ animationDelay: '.12s' }}>
            Short lessons and live simulations for ICAN Foundation, Paper 2 Part B. Made for your phone.
          </p>
          <div className="lp-actions lp-rise" style={{ animationDelay: '.22s' }}>
            <a className="lp-btn lp-btn-primary" href={startHref}>
              Start Chapter 7
              <ArrowRight width={18} height={18} strokeWidth={2.5} aria-hidden />
            </a>
            <a className="lp-btn lp-btn-ghost" href="#chapters" onClick={(e) => { e.preventDefault(); goto('chapters') }}>
              See the chapters
            </a>
          </div>
          <p className="lp-note lp-rise" style={{ animationDelay: '.3s' }}>
            Free. No account. Saved on your device.
          </p>
        </div>
        <LedgerDemo />
      </div>
    </section>
  )
}
