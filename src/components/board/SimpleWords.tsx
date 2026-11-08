import type { CSSProperties } from 'react'
import { Ico } from './Ico'
import type { Topic } from './types'

/** "In simple words": one plain paragraph, four picture frames (icon plus one line) and the hard words made easy. Text is the designer's, pending teacher review. */
export function SimpleWords({ topic }: { topic: Pick<Topic, 'simple' | 'frames' | 'gls'> }) {
  return (
    <section className="bd-story" aria-label="In simple words">
      <b className="bd-serif">In simple words</b>
      <p>{topic.simple}</p>
      <ol className="bd-frames">
        {topic.frames.map(([icon, text], i) => (
          <li key={text} className="bd-frame bd-rise" style={{ '--d': `${(i * 0.2).toFixed(2)}s` } as CSSProperties}>
            <span className="bd-fn" aria-hidden="true">{i + 1}</span>
            <span className="bd-fico"><Ico name={icon} className="bd-drift" /></span>
            <span className="bd-ftxt">{text}</span>
          </li>
        ))}
      </ol>
      <div className="bd-gls">
        {topic.gls.map(([term, mean]) => (
          <span key={term} className="bd-gl"><b>{term}</b> means {mean}</span>
        ))}
      </div>
    </section>
  )
}
