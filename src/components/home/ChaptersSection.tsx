import { SECTIONS, TOPICS } from '../../content/chapters/ch07/topics'
import type { ChapterCard } from './homeLogic'

interface Props {
  cards: ChapterCard[]
  /** Where "Open chapter 7" goes: the next unfinished topic */
  chapter7Href: string
}

/** The four Part B chapters. What is open and how many lessons are ready comes from the chapter data. */
export function ChaptersSection({ cards, chapter7Href }: Props) {
  return (
    <section id="chapters" className="lp-wrap lp-sec">
      <div className="lp-head lp-reveal" style={{ gap: '.875rem' }}>
        <span className="lp-eyebrow">Part B chapters</span>
        <h2 className="lp-serif lp-h2">All four chapters are open</h2>
      </div>
      <div className="lp-chapters">
        {cards.map((c) => {
          const isSeven = c.number === 7
          const href = c.href ?? chapter7Href
          return (
            <article key={c.number} className="lp-card lp-chcard lp-reveal">
              <div className="lp-stack" style={{ gap: '.375rem' }}>
                <span className="lp-chip" style={{ background: 'var(--brand-soft)', color: 'var(--brand-text)' }}>{c.badge ?? 'Open now'}</span>
                <h3 className="lp-serif">Chapter {c.number}</h3>
                <p>{c.title}</p>
              </div>
              {isSeven ? (
                <div className="lp-chrow"><span>Topics</span><b>{TOPICS.length} in {SECTIONS.length} sections</b></div>
              ) : (
                <div className="lp-chrow"><span>{c.row?.[0]}</span><b>{c.row?.[1]}</b></div>
              )}
              {href && <a className="lp-btn lp-btn-primary" href={href}>Open chapter {c.number}</a>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
