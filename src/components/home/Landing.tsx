import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { chapter7Hash } from '../../state/route'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { MarksSheet } from './MarksSheet'
import { NavBar } from './NavBar'
import { chapterCards } from './homeLogic'
import { scrollToId, useCalm, useReveal } from './useLandingMotion'
import './landing.css'
import './landing-hero.css'
import './landing-sheet.css'

interface Props {
  /** Everything the student has opened, for the Chapter 9 explored count */
  started: ReadonlySet<string>
  dark: boolean
  onToggleDark: () => void
  /** Settings button, built by the app so it shares state with the study screens */
  settingsSlot?: ReactNode
}

/**
 * The landing page: sticky nav (chapter links, sidebar on phones), a hero with a live ledger demo, the marks sheet
 * with a link to each chapter, and a short footer. All links are plain hash links.
 */
export function Landing({ started, dark, onToggleDark, settingsSlot }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const calm = useCalm()
  useReveal(root)
  const cards = useMemo(() => chapterCards(started), [started])
  const goto = (id: string) => scrollToId(id, calm)

  return (
    <div className="lp" id="top" ref={root}>
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

      <NavBar cards={cards} dark={dark} onToggleDark={onToggleDark} settingsSlot={settingsSlot} calm={calm} goTop={() => goto('top')} />

      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Hero startHref={chapter7Hash()} goto={goto} />
        <MarksSheet cards={cards} />
      </main>

      <Footer />
    </div>
  )
}
