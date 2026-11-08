import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Lock } from 'lucide-react'
import { SECTIONS, TOPICS } from '../../content/chapters/ch07/topics'
import { sectionHash } from '../../state/route'
import { TOPIC_CARDS } from './homeData'

interface Props {
  /** Link for a topic, or null while it is not playable */
  hrefFor: (code: string) => string | null
}

const ACCENT: Record<string, { acc: string; soft: string; text: string }> = {
  s1: { acc: 'var(--s1)', soft: 'var(--s1-soft)', text: 'var(--s1-text)' },
  s2: { acc: 'var(--s2)', soft: 'var(--s2-soft)', text: 'var(--s2-text)' },
  s3: { acc: 'var(--s3)', soft: 'var(--s3-soft)', text: 'var(--s3-text)' },
}

/** Chapter 7 map: three section tabs, then that section's topics. Playable topics are links. */
export function Chapter7Map({ hrefFor }: Props) {
  const [active, setActive] = useState(0)
  const section = SECTIONS[active]
  const topics = TOPICS.filter((t) => t.section === section.id)
  const a = ACCENT[section.id]

  return (
    <section id="chapter-7" className="lp-wrap lp-sec">
      <div className="lp-head lp-reveal">
        <span className="lp-eyebrow">Chapter 7 · Open now</span>
        <h2 className="lp-serif lp-h2">{TOPICS.length} topics in {SECTIONS.length} sections</h2>
        <p className="lp-lede">Pick a section to see its topics. Each topic is one short lesson.</p>
      </div>

      <div className="lp-tabs" role="group" aria-label="Chapter 7 sections">
        {SECTIONS.map((s, i) => {
          const c = ACCENT[s.id]
          const count = TOPICS.filter((t) => t.section === s.id).length
          return (
            <button
              key={s.id}
              type="button"
              className={`lp-tab ${i === active ? 'lp-tab-on' : ''}`}
              style={{ '--tc': c.acc, '--tsoft': c.soft, '--ttext': c.text } as CSSProperties}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className="lp-tab-label"><span className="lp-dot" />Section {s.id.slice(1)}</span>
              <span className="lp-tab-name">{s.title}</span>
              <span className="lp-tab-count">{count} topics</span>
            </button>
          )
        })}
      </div>

      <div style={{ '--acc-soft': a.soft, '--acc-text': a.text } as CSSProperties} aria-live="polite">
        <p className="lp-blurb">{section.summary}</p>
        <ul className="lp-topics" key={section.id}>
          {topics.map((t, i) => {
            const href = hrefFor(t.code)
            const locked = Boolean(t.fromStudyText) && !href
            const card = TOPIC_CARDS[t.code]
            const aid = t.teachingAid ? `${t.teachingAid} · teaching aid` : card.sourceMnemonic ? `${card.sourceMnemonic} · source mnemonic` : null
            const body = (
              <>
                <span className="lp-num">{t.code}</span>
                <div className="lp-tbody">
                  <h3>{card.title}</h3>
                  <p>{card.key}</p>
                  {aid && (
                    <span className="lp-chip" style={{ background: card.sourceMnemonic ? 'var(--brand-soft)' : 'var(--s3-soft)', color: card.sourceMnemonic ? 'var(--brand-text)' : 'var(--s3-text)' }}>{aid}</span>
                  )}
                  {locked && (
                    <span className="lp-chip" style={{ background: 'var(--line)', color: 'var(--ink)' }}>
                      <Lock width={13} height={13} strokeWidth={2.5} aria-hidden />
                      Coming soon
                    </span>
                  )}
                </div>
              </>
            )
            return (
              <li key={t.code} className="lp-rise" style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}>
                {href ? (
                  <a className="lp-tcard" href={href}>{body}</a>
                ) : (
                  <div className={`lp-tcard ${locked ? 'lp-tcard-locked' : ''}`}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="lp-after">
        <a className="lp-btn lp-btn-ghost" href={sectionHash(section.id)}>
          Open the Section {section.id.slice(1)} board
        </a>
        <a className="lp-btn lp-btn-primary" href="#how" onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}>
          See how a topic works
        </a>
        <p className="lp-small" style={{ maxWidth: '52ch', fontSize: '.875rem' }}>
          A “teaching aid” label marks a memory trick written by the teacher, not a term from the study book.
        </p>
      </div>
    </section>
  )
}
