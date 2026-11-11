import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { chapter7Hash } from '../../state/route'
import { Chapters } from './Chapters'
import { Closing } from './Closing'
import { DemoTabs } from './DemoTabs'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Method } from './Method'
import { NavBar } from './NavBar'
import { SimMarquee } from './SimMarquee'
import { chapterCards } from './homeLogic'
import './ns-base.css'
import './ns-sections.css'

interface Props {
  /** Everything the student has opened, for the Chapter 9 explored count */
  started: ReadonlySet<string>
  dark: boolean
  onToggleDark: () => void
  /** Settings button, built by the app so it shares state with the study screens */
  settingsSlot?: ReactNode
}

/**
 * The landing page, built from the "Home page" design: nav, hero with a real screen and the teacher, the simulator strip,
 * "see it work" tabs, the four chapter cards with the marks bar, how a topic goes, the phone band, the closing call and the footer.
 */
export function Landing({ started, dark, onToggleDark, settingsSlot }: Props) {
  const cards = useMemo(() => chapterCards(started), [started])
  const startHref = chapter7Hash()

  return (
    <div className="ns" id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>

      <NavBar dark={dark} onToggleDark={onToggleDark} settingsSlot={settingsSlot} />

      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Hero startHref={startHref} />
        <SimMarquee />
        <DemoTabs />
        <Chapters cards={cards} />
        <Method />
        <Closing startHref={startHref} />
      </main>

      <Footer />
    </div>
  )
}
