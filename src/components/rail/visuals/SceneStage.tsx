import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react'
import { SECTIONS } from '../../../content/chapters/ch07/topics'
import type { SectionId } from '../../../content/chapters/ch07/topics'
import { sectionHash } from '../../../state/route'
import { ConceptScene } from './ConceptScene'
import { Ico } from './Ico'
import { rememberText } from './sceneCopy'
import { scenesOf, stepScene } from './sceneMeta'
import './scenes.css'
import './scenes-stage.css'

interface Props {
  sectionId: SectionId
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
}

/**
 * Teacher preview page for one section: a row of topic tabs, the animated scene of the chosen topic with its
 * "In simple words" block, the Remember strip and Previous / Next topic. Layout follows landing-handoff/design/Section*.dc.html.
 */
export function SceneStage({ sectionId, dark, onToggleDark, settingsSlot }: Props) {
  const section = SECTIONS.find((s) => s.id === sectionId) ?? SECTIONS[0]
  const list = scenesOf(section.id)
  const [code, setCode] = useState(list.find((s) => !s.locked)?.code ?? list[0].code)
  const cur = list.find((s) => s.code === code) ?? list[0]
  const n = SECTIONS.indexOf(section) + 1
  const remember = rememberText(cur.code)
  const pick = (c: string) => setCode(c)

  return (
    <div className={`sc sc-page sc-${section.id}`}>
      <header className="sc-wrapx sc-pagehead">
        <a className="sc-back" href={sectionHash(section.id)}><ArrowLeft className="h-4 w-4" aria-hidden /> Chapter 7</a>
        <span style={{ flex: 1 }} />
        <span className="sc-chip">Section {n} of 3</span>
        <button type="button" className="sc-iconbtn" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
          {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
        </button>
        {settingsSlot}
      </header>

      <main className="sc-wrapx sc-pagemain">
        <div>
          <h1 className="sc-serif sc-h1">{section.title}</h1>
          <p className="sc-note" style={{ fontSize: '1rem' }}>{list.length} topics. Pick one and watch the idea move.</p>
        </div>

        <nav className="sc-tabs" aria-label={`Section ${n} topics`}>
          {list.map((t) => (
            <button key={t.code} type="button" aria-pressed={t.code === cur.code} className={`sc-tb${t.code === cur.code ? ' sc-tb-on' : ''}${t.locked ? ' sc-tb-lock' : ''}`} onClick={() => pick(t.code)}>
              <span className="sc-tbi"><Ico name={t.icon} /><b>{t.code === 'start' ? 'Start' : t.code}</b></span>
              <span>{t.name}</span>
            </button>
          ))}
        </nav>

        <section className="sc-card sc-panelcard" aria-live="polite">
          <div className="sc-col" style={{ gap: '.25rem' }}>
            <span className="sc-chip" style={{ alignSelf: 'flex-start' }}>{cur.code === 'start' ? 'Section start' : `Topic ${cur.code}`}</span>
            <div className="sc-titlerow">
              <span className="sc-fico" style={{ width: '3.5rem', height: '3.5rem' }}><Ico name={cur.icon} /></span>
              <h2 className="sc-serif sc-h2">{cur.name}</h2>
            </div>
            <p className="sc-note" style={{ fontSize: '1rem', maxWidth: '62ch' }}>{cur.line}</p>
          </div>

          {cur.locked ? (
            <div className="sc-locked">
              <Ico name="lock" className="sc-lock" />
              <b className="sc-serif" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Topic {cur.code} is coming soon</b>
              <span className="sc-note">Start with topic 1.2.</span>
            </div>
          ) : (
            <ConceptScene key={cur.code} code={cur.code} />
          )}

          {remember && <div className="sc-rem"><span>{remember}</span></div>}
          <div className="sc-wrap" style={{ justifyContent: 'space-between' }}>
            <button type="button" className="sc-btn" onClick={() => pick(stepScene(list, cur.code, -1))}><ArrowLeft className="h-4 w-4" aria-hidden /> Previous topic</button>
            <button type="button" className="sc-btn sc-btn-p" onClick={() => pick(stepScene(list, cur.code, 1))}>Next topic <ArrowRight className="h-4 w-4" aria-hidden /></button>
          </div>
        </section>
      </main>
    </div>
  )
}
