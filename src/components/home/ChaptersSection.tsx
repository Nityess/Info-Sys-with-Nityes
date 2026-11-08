import { SECTIONS, TOPICS } from '../../content/chapters/ch07/topics'
import type { ChapterCard } from './homeLogic'

interface Props {
  cards: ChapterCard[]
  /** Where "Open chapter 7" goes: the section page in the preview, else the current Chapter 7 */
  chapter7Href: string
  /** Where "Open chapter 10" goes */
  chapter10Href: string | null
}

const WORDS = ['No', 'One', 'Two', 'Three', 'Four']

function Soon({ card }: { card: ChapterCard }) {
  return (
    <article className="lp-card lp-chcard lp-chcard-soon lp-reveal">
      <div className="lp-stack" style={{ gap: '.375rem' }}>
        <span className="lp-chip" style={{ background: 'var(--line)', color: 'var(--ink)' }}>Coming soon</span>
        <h3 className="lp-serif">Chapter {card.number}</h3>
        <p>{card.title}</p>
      </div>
      <div className="lp-chrow"><span>Lessons open</span><b>None yet</b></div>
    </article>
  )
}

/** The four Part B chapters. What is open and how many lessons are ready comes from the chapter data. */
export function ChaptersSection({ cards, chapter7Href, chapter10Href }: Props) {
  const open = cards.filter((c) => c.status === 'open').length
  const soon = cards.length - open
  return (
    <section id="chapters" className="lp-wrap lp-sec">
      <div className="lp-head lp-reveal" style={{ gap: '.875rem' }}>
        <span className="lp-eyebrow">Part B chapters</span>
        <h2 className="lp-serif lp-h2">{WORDS[open]} chapters open now, {WORDS[soon].toLowerCase()} coming soon</h2>
      </div>
      <div className="lp-chapters">
        {cards.map((c) => {
          if (c.status === 'soon') return <Soon key={c.number} card={c} />
          const isSeven = c.number === 7
          const href = isSeven ? chapter7Href : chapter10Href
          const partial = c.built < c.total
          return (
            <article key={c.number} className="lp-card lp-chcard lp-reveal">
              <div className="lp-stack" style={{ gap: '.375rem' }}>
                <span className="lp-chip" style={{ background: 'var(--brand-soft)', color: 'var(--brand-text)' }}>{partial ? 'Part open' : 'Open now'}</span>
                <h3 className="lp-serif">Chapter {c.number}</h3>
                <p>{c.title}</p>
              </div>
              {isSeven ? (
                <div className="lp-chrow"><span>Topics</span><b>{TOPICS.length} in {SECTIONS.length} sections</b></div>
              ) : (
                <div className="lp-stack" style={{ gap: '.5rem' }}>
                  <div className="lp-chrow"><span>Lessons open</span><b>{c.built} of {c.total}</b></div>
                  <div className="lp-meter"><div style={{ width: `${(c.built / c.total) * 100}%` }} /></div>
                </div>
              )}
              {href && <a className="lp-btn lp-btn-primary" href={href}>Open chapter {c.number}</a>}
            </article>
          )
        })}
      </div>
    </section>
  )
}
