import { SIM_TOPICS } from '../../content/chapter9/topics'

/** A slow strip of the 17 Chapter 9 simulator names, listed twice so it loops. Decorative: the list is on the Chapter 9 page. */
export function SimMarquee() {
  return (
    <div className="ns-run" aria-hidden="true">
      <div className="ns-run-track">
        {[0, 1].flatMap((copy) =>
          SIM_TOPICS.map((s) => (
            <span key={`${copy}-${s.slug}`}><b>{s.number}</b>{s.title}</span>
          )),
        )}
      </div>
    </div>
  )
}
