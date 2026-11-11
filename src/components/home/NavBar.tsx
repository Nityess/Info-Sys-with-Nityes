import { Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import teacher from '../../assets/home/teacher.webp'
import { Arrow } from './Arrow'
import { BRAND } from './homeData'
import { Jump } from './Jump'

interface Props {
  dark: boolean
  onToggleDark: () => void
  /** Settings button, built by the app so it shares state with the study screens */
  settingsSlot?: ReactNode
}

/** Sticky top bar: face and name, three in-page links (from 860px wide), a start button, light or dark and settings. */
export function NavBar({ dark, onToggleDark, settingsSlot }: Props) {
  return (
    <header className="ns-nav">
      <div className="ns-wrap ns-nav-in">
        <Jump to="top" className="ns-brand" aria-label={`${BRAND}, back to top`}>
          <span className="ns-face"><img src={teacher} alt="" width={904} height={960} /></span>
          <span>
            <b>Information Systems</b>
            <small>with CA Nitesh</small>
          </span>
        </Jump>
        <nav className="ns-links" aria-label="Sections">
          <Jump to="demo" className="l">See it work</Jump>
          <Jump to="chapters" className="l">Chapters</Jump>
          <Jump to="method" className="l">How it works</Jump>
        </nav>
        <div className="ns-tools">
          <button type="button" className="ns-icon" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
            {dark ? <Sun width={20} height={20} aria-hidden /> : <Moon width={20} height={20} aria-hidden />}
          </button>
          {settingsSlot}
          <Jump to="chapters" className="ns-btn ns-btn-p ns-btn-sm ns-nav-cta">
            Start learning
            <Arrow />
          </Jump>
        </div>
      </div>
    </header>
  )
}
