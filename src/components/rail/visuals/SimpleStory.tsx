import { useId } from 'react'
import { Ico } from './Ico'
import { SIMPLE_STORIES, STORIES_PENDING_REVIEW } from './simpleStories'
import type { SimpleStoryData } from './simpleStories'
import './scenes.css'

/**
 * The "In simple words" block under a scene: one plain sentence, four numbered picture frames (icon plus one line)
 * and three "X means Y" lines. Pass `story` directly, or `code` to look it up. Wording is pending teacher review.
 */
export function SimpleStory({ story, code, section = 's1' }: { story?: SimpleStoryData; code?: string; section?: 's1' | 's2' | 's3' }) {
  const id = useId()
  const data = story ?? (code ? SIMPLE_STORIES[code] : undefined)
  if (!data) return null
  return (
    <div className={`sc sc-${section}`}>
    <section className="sc-story" aria-labelledby={id}>
      <div className="sc-story-head">
        <Ico name="bulb" />
        <b id={id} className="sc-serif">In simple words</b>
      </div>
      <p className="sc-story-simple">{data.simple}</p>
      <ol className="sc-frames">
        {data.frames.map((f, i) => (
          <li key={f.text} className="sc-frame sc-rise" style={{ '--d': `${(0.3 + i * 0.6).toFixed(1)}s` } as React.CSSProperties}>
            <span className="sc-fn" aria-hidden="true">{i + 1}</span>
            <span className="sc-fico"><Ico name={f.icon} className="sc-drift" /></span>
            <span className="sc-ftxt"><span className="sr-only">Picture {i + 1}. </span>{f.text}</span>
          </li>
        ))}
      </ol>
      <div className="sc-terms">
        <span className="sc-fl">Hard words made easy</span>
        {data.terms.map((t) => (
          <span key={t.term} className="sc-term"><b>{t.term}</b> means {t.means}</span>
        ))}
      </div>
      {STORIES_PENDING_REVIEW && <span className="sc-pending">Draft wording, pending teacher review</span>}
    </section>
    </div>
  )
}
