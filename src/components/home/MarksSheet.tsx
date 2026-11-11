import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { EXAM } from './homeData'
import type { ChapterCard } from './homeLogic'
import { cardFact, cardHref } from './homeLogic'

interface Props {
  cards: ChapterCard[]
}

/**
 * Chapters as a marking sheet: one bar of the 50 Part B marks cut into the four chapters, then a ruled row per chapter
 * with its marks in the margin. Pointing at a row lights its part of the bar.
 */
export function MarksSheet({ cards }: Props) {
  const [hot, setHot] = useState<number | null>(null)
  return (
    <section id="chapters" className="lp-wrap lp-sheet">
      <h2 className="lp-serif lp-h2">Where the {EXAM.partBMarks} marks are</h2>
      <p className="lp-lede">Part B is half of Paper 2, which is {EXAM.paperMarks} marks in {EXAM.hours} hours. Open a chapter to start.</p>

      <div className="lp-split lp-bars" role="img" aria-label={`The ${EXAM.partBMarks} Part B marks: ${cards.map((c) => `chapter ${c.number} ${c.weight}`).join(', ')}`}>
        {cards.map((c, i) => (
          <span key={c.number} className={`seg s${i + 1} ${hot === i ? 'hot' : ''}`} style={{ flexGrow: c.weight }}>
            <b className="lp-serif">{c.number}</b>
          </span>
        ))}
      </div>

      <ul className="lp-rows">
        {cards.map((c, i) => {
          const [label, value] = cardFact(c)
          return (
            <li key={c.number} className={`lp-row s${i + 1}`} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)}>
              <span className="lp-row-n lp-serif" aria-hidden="true">{c.number}</span>
              <div className="lp-row-main">
                <h3>
                  <a href={cardHref(c)}>
                    <span className="sr-only">Chapter {c.number}: </span>
                    {c.title}
                  </a>
                </h3>
                <p>
                  <span className="lp-lo">{c.lo}</span> {label}: <b>{value}</b>
                  {c.badge && <span className="lp-new">{c.badge}</span>}
                </p>
              </div>
              <div className="lp-row-marks">
                <b className="lp-serif">{c.weight}</b>
                <span>marks</span>
              </div>
              <ArrowRight className="lp-row-go" width={22} height={22} aria-hidden />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
