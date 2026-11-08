import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, Moon, Sun } from 'lucide-react'
import { Wordmark } from './Wordmark'
import { EXAM, splitPercent } from './homeData'
import type { HeroAction } from './homeLogic'

interface Props {
  action: HeroAction | undefined
  /** Where the gold button goes (a hash link) */
  actionHref: string
  dark: boolean
  onToggleDark: () => void
  settingsSlot?: ReactNode
  goto: (id: string) => void
}

const pieVars = (a: number, b: number) => ({ '--a': a, '--b': b }) as CSSProperties
const pct = (marks: number) => `${(marks / EXAM.partBMarks) * 100}%`

function Pie() {
  const { objective, subjective } = splitPercent()
  return (
    <div className="lp-card lp-lift lp-card-pad lp-rise lp-stack" style={{ marginTop: '.75rem', gap: '1rem', animationDelay: '.4s' }}>
      <h3 className="lp-serif lp-card-title">How the questions are split</h3>
      <div className="lp-pie-row">
        <svg className="lp-pie" width="168" height="168" viewBox="0 0 42 42" role="img" aria-label={`Pie chart: ${objective} percent objective questions, ${subjective} percent subjective questions`}>
          <circle className="lp-pie1" style={pieVars(objective, subjective)} cx="21" cy="21" r="10.5" fill="none" stroke="var(--brand)" strokeWidth="21" pathLength={100} strokeDasharray={`${objective} ${subjective}`} />
          <circle className="lp-pie2" style={pieVars(subjective, objective)} cx="21" cy="21" r="10.5" fill="none" stroke="var(--gold)" strokeWidth="21" pathLength={100} strokeDasharray={`${subjective} ${objective}`} strokeDashoffset={-objective} />
        </svg>
        <ul className="lp-legend">
          <li><span className="lp-swatch" style={{ background: 'var(--brand)' }} /><span><b className="lp-serif">{objective}%</b><span>Objective (MCQs)</span></span></li>
          <li><span className="lp-swatch" style={{ background: 'var(--gold)' }} /><span><b className="lp-serif">{subjective}%</b><span>Subjective</span></span></li>
        </ul>
      </div>
    </div>
  )
}

function Marks() {
  return (
    <div className="lp-marks-col">
      <div className="lp-card lp-lift lp-card-pad lp-rise lp-stack" style={{ flex: 1, gap: '1.125rem', animationDelay: '.2s' }}>
        <h2 className="lp-serif lp-card-title" style={{ fontSize: '1.5rem' }}>Paper 2: {EXAM.paperMarks} marks in {EXAM.hours} hours</h2>
        <div className="lp-bars">
          <div className="lp-bar-group" style={{ gap: '.5rem' }}>
            <p className="lp-bar-label">Part A: {EXAM.partBMarks} marks, not covered here</p>
            <div className="lp-bar-row">
              <div className="lp-bar-top"><span>Part A (assurance)</span><span>{EXAM.partBMarks} marks</span></div>
              <div className="lp-bar-track"><div className="lp-bar-fill lp-bar-fill-a" style={{ width: '100%' }} /></div>
            </div>
          </div>
          <div className="lp-bar-group">
            <p className="lp-bar-label lp-bar-label-b">Part B: {EXAM.partBMarks} marks, covered here</p>
            {EXAM.outcomes.map((o) => (
              <div key={o.lo} className="lp-bar-row">
                <div className="lp-bar-top"><span>{o.short}</span><span>{o.marks} marks</span></div>
                <div className="lp-bar-track"><div className="lp-bar-fill" style={{ width: pct(o.marks) }} /></div>
              </div>
            ))}
          </div>
          <p className="lp-small">All bars use the same scale.</p>
        </div>
      </div>
    </div>
  )
}

/** Navy hero band: header with the wordmark, the headline and actions, then the two exam cards. */
export function HeroSection({ action, actionHref, dark, onToggleDark, settingsSlot, goto }: Props) {
  return (
    <div className="lp-hero">
      <header className="lp-wrap lp-header">
        <Wordmark onClick={() => goto('top')} />
        <nav className="lp-nav" aria-label="Page sections">
          <a href="#chapter-7" onClick={(e) => { e.preventDefault(); goto('chapter-7') }}>Chapter 7</a>
          <a href="#how" onClick={(e) => { e.preventDefault(); goto('how') }}>How lessons work</a>
          <a href="#chapters" onClick={(e) => { e.preventDefault(); goto('chapters') }}>All chapters</a>
        </nav>
        <div className="lp-tools">
          <button type="button" className="lp-iconbtn" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
            {dark ? <Sun width={22} height={22} aria-hidden /> : <Moon width={22} height={22} aria-hidden />}
          </button>
          {settingsSlot}
        </div>
      </header>

      <section className="lp-wrap lp-hero-grid">
        <div className="lp-hero-copy">
          <h1 className="lp-serif lp-h1 lp-rise" style={{ animationDelay: '.05s' }}>
            Interactive study site for ICAN Foundation <span className="lp-mark">Information Systems</span>
          </h1>
          <p className="lp-sub lp-rise" style={{ animationDelay: '.15s' }}>
            Part B is {EXAM.partBMarks} of Paper 2’s {EXAM.paperMarks} marks. Four topics, free, on your phone.
          </p>
          <div className="lp-actions lp-rise" style={{ animationDelay: '.25s' }}>
            {action && (
              <a className="lp-btn lp-btn-primary" href={actionHref}>
                {action.label}
                <ArrowRight width={18} height={18} strokeWidth={2.5} aria-hidden />
              </a>
            )}
            <a className="lp-btn lp-btn-ghost" href="#chapters" onClick={(e) => { e.preventDefault(); goto('chapters') }}>See the chapters</a>
          </div>
          <p className="lp-note lp-rise" style={{ animationDelay: '.32s' }}>
            {action?.returning ? `Next up: ${action.unit.title}` : 'No account. No payment.'}
          </p>
          <Pie />
        </div>
        <Marks />
      </section>
    </div>
  )
}
