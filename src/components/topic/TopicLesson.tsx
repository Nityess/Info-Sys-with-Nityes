import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, Menu, Moon, Sun } from 'lucide-react'
import type { Chapter, Unit } from '../../content/types'
import { SECTIONS } from '../../content/chapters/ch07/topics'
import { drawerRows } from './drawerRows'
import { clampStep, continueLabel, lessonSteps, progressPercent } from './lessonSteps'
import { paneFor } from './panes/registry'
import { StepRail } from './StepRail'
import { stepCopy } from './stepCopy'
import { TopicDrawer } from './TopicDrawer'
import { useParsedTopic } from './useParsedTopic'
import './lesson.css'
import './lessonPanes.css'

interface Props {
  unit: Unit
  /** The chapters being shown, for the topic list */
  chapters: readonly Chapter[]
  done: ReadonlySet<string>
  xp: number
  /** Pays out XP once per key; returns what was granted now */
  claim: (key: string, xp: number) => number
  dark: boolean
  onToggleDark: () => void
  /** The settings gear, shown in the topic list */
  settingsSlot: ReactNode
}

/**
 * Chapter 7 topic lesson: top bar with the topic list, an 8-step bar, one step per screen, and a sticky
 * Back and Continue bar. Each step pane is built in its own round; until then it shows a placeholder.
 */
export function TopicLesson({ unit, chapters, done, xp, claim, dark, onToggleDark, settingsSlot }: Props) {
  const code = unit.topic?.code ?? ''
  const topic = useParsedTopic(code)
  const steps = useMemo(() => lessonSteps(Boolean(unit.topic?.playground)), [unit.topic?.playground])
  const total = steps.length
  const [step, setStep] = useState(1)
  const [drawer, setDrawer] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const moved = useRef(false)

  const current = steps[clampStep(step, total) - 1]
  const copy = stepCopy(code, current.id)
  const pane = paneFor(code, current.id)
  const section = SECTIONS.find((s) => s.id === unit.sectionId)
  const go = (n: number) => {
    moved.current = true
    setStep(clampStep(n, total))
  }
  const closeDrawer = () => {
    setDrawer(false)
    opener.current?.focus()
  }

  // A new step starts at the top, and a screen reader is told by moving focus to its heading
  useEffect(() => {
    if (!moved.current) return
    scroller.current?.scrollTo({ top: 0 })
    title.current?.focus()
  }, [step])

  const rows = useMemo(() => drawerRows(chapters, code, done), [chapters, code, done])

  return (
    <div ref={scroller} className="ls">
      <header className="ls-top">
        <div className="ls-topin">
          <div className="ls-row">
            <button ref={opener} type="button" className="ls-iconbtn" aria-label="Open the topic list" aria-haspopup="dialog" aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <Menu className="h-5 w-5" aria-hidden />
              <span className="ls-toplabel">Topics</span>
            </button>
            <div className="ls-name">
              <small>{section ? `Chapter 7 · Section ${SECTIONS.indexOf(section) + 1}` : 'Chapter 7'}</small>
              <b className="ls-serif">{code} {unit.title}</b>
            </div>
            <span className="ls-chip" aria-label={`${xp} XP`}>XP {xp}</span>
            <button type="button" className="ls-iconbtn" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
              {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
            </button>
          </div>
          <StepRail steps={steps} step={step} onGo={go} />
          <div className="ls-bar" role="progressbar" aria-label="Lesson progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent(step, total)}>
            <div style={{ width: `${progressPercent(step, total)}%` }} />
          </div>
        </div>
      </header>

      <main className="ls-main">
        <div className="ls-head">
          <span className="ls-eyebrow">Step {step} of {total} · {current.label}</span>
          <h1 ref={title} tabIndex={-1} className="ls-title ls-serif">{copy.title}</h1>
          <p className="ls-sub">{copy.sub}</p>
        </div>
        <div key={current.id} className="ls-pane" data-step={current.id}>
          {pane ? (
            topic ? pane({ unitId: unit.id, topic, claim }) : <p role="status">Loading this topic…</p>
          ) : (
            <div className="ls-fb ls-fb-info" role="status">Placeholder: the {current.label} step is built in its own round.</div>
          )}
        </div>
      </main>

      <footer className="ls-foot">
        <div className="ls-footin">
          <button type="button" className="ls-btn ls-ghost" style={{ visibility: step === 1 ? 'hidden' : 'visible' }} onClick={() => go(step - 1)}>
            Back
          </button>
          <span className="ls-count">Step {step} of {total}</span>
          <button type="button" className="ls-btn ls-primary" style={{ display: step === total ? 'none' : undefined }} onClick={() => go(step + 1)}>
            {continueLabel(step, total)}
            <ArrowRight className="h-[1.125rem] w-[1.125rem]" aria-hidden />
          </button>
        </div>
      </footer>

      {drawer && <TopicDrawer rows={rows} onClose={closeDrawer} settingsSlot={settingsSlot} />}
    </div>
  )
}
