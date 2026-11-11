import ch10 from '../../assets/home/ch10.webp'
import ch7 from '../../assets/home/ch7.webp'
import ch8 from '../../assets/home/ch8.webp'
import ch9 from '../../assets/home/ch9.webp'
import { Arrow } from './Arrow'
import { EXAM } from './homeData'
import type { ChapterCard } from './homeLogic'
import { cardHref, cardStatus } from './homeLogic'

const THUMBS: Record<number, { src: string; w: number; h: number }> = {
  7: { src: ch7, w: 1100, h: 687 },
  8: { src: ch8, w: 1100, h: 687 },
  9: { src: ch9, w: 1500, h: 937 },
  10: { src: ch10, w: 1100, h: 687 },
}

// One colour per chapter, the same as the cards above the bar.
const SEG_COLOURS = ['#2F6FDE', '#0E9F6E', '#E08A00', '#7B61FF']

/** The chapters: a card per chapter with a real screen, then the 50 Part B marks cut into the four chapters. */
export function Chapters({ cards }: { cards: ChapterCard[] }) {
  const heavy = cards.filter((c) => c.weight === Math.max(...cards.map((x) => x.weight)))
  const heavyMarks = heavy.reduce((n, c) => n + c.weight, 0)
  const heavyNames = heavy.map((c) => c.number).join(' and ')
  const label = `The ${EXAM.partBMarks} Part B marks: ${cards.map((c) => `Chapter ${c.number}, ${c.weight} marks`).join('. ')}.`
  return (
    <section className="ns-sec" id="chapters" aria-labelledby="ns-ch">
      <div className="ns-wrap">
        <div className="ns-rv">
          <span className="ns-tag"><i />The course</span>
          <h2 id="ns-ch" className="ns-d ns-h2">Four chapters. <em>All open.</em></h2>
          <p className="ns-lead">Each one opens straight into its first topic. Your progress stays on your device.</p>
        </div>
        <div className="ns-bento">
          {cards.map((c) => {
            const st = cardStatus(c)
            const th = THUMBS[c.number]
            return (
              <a key={c.number} className={`ns-card k${c.number} ns-rv`} href={cardHref(c)}>
                <div className="ns-card-top">
                  <span className="ns-num"><small>Chapter</small>{String(c.number).padStart(2, '0')}</span>
                  <span className={`ns-st ${st.isNew ? 'new' : ''}`}><i />{st.text}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
                <div className="ns-card-foot">
                  <span>{c.weight} marks</span>
                  <span className="ns-go">{c.cta}<Arrow /></span>
                </div>
                <div className="ns-thumb"><img src={th.src} alt="" width={th.w} height={th.h} loading="lazy" decoding="async" /></div>
              </a>
            )
          })}
        </div>

        <div className="ns-marks ns-rv" style={{ marginTop: '1.125rem' }}>
          <div>
            <span className="ns-tag"><i />Part B of Paper 2</span>
            <h2 className="ns-d ns-h2">Where the <em>{EXAM.partBMarks} marks</em> are</h2>
            <p>Part B is half of Paper 2. Chapters {heavyNames} carry {heavyMarks} of the {EXAM.partBMarks} marks, so give them the most time.</p>
          </div>
          <div role="img" aria-label={label}>
            <div className="ns-bar" aria-hidden="true">
              {cards.map((c, i) => (
                <div key={c.number} className="ns-seg" style={{ flex: c.weight, background: SEG_COLOURS[i] }}>{c.weight}</div>
              ))}
            </div>
            <div className="ns-legend" aria-hidden="true">
              {cards.map((c) => (
                <div key={c.number} style={{ flex: c.weight }}>
                  <b>Chapter {c.number}</b>
                  {EXAM.outcomes.find((o) => o.chapter === c.number)?.short}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
