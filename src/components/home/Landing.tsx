import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '../../content/types'
import { sectionHash } from '../../state/route'
import { ChaptersSection } from './ChaptersSection'
import { FreeSection } from './FreeSection'
import { HeroSection } from './HeroSection'
import { BRAND } from './homeData'
import { chapterCards, heroAction } from './homeLogic'
import { scrollToId, useCalm, useReveal } from './useLandingMotion'
import './landing.css'

interface Props {
  chapters: Chapter[]
  done: ReadonlySet<string>
  /** Everything the student has opened, for the Chapter 9 explored count */
  started: ReadonlySet<string>
  dark: boolean
  onToggleDark: () => void
  /** Settings button, built by the app so it shares state with the study screens */
  settingsSlot?: ReactNode
}

/**
 * The landing page, built to landing-handoff/design/Main.dc.html. All links are plain hash links.
 * Chapter 7 sections and Chapter 8 open as topic boards; Chapter 7 topics with a built lesson open as lessons.
 */
export function Landing({ chapters, done, started, dark, onToggleDark, settingsSlot }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const calm = useCalm()
  useReveal(root)
  // Chapter 7 starts at its first board; the lessons are no longer the way in
  const action = useMemo(() => {
    const a = heroAction(chapters, done)
    return a && { ...a, label: 'Start Chapter 7', returning: false }
  }, [chapters, done])
  const cards = useMemo(() => chapterCards(chapters, done, started), [chapters, done, started])
  const ch7 = sectionHash('s1')
  const goto = (id: string) => scrollToId(id, calm)
  const startHref = sectionHash('s1')

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

      <HeroSection action={action} actionHref={startHref} dark={dark} onToggleDark={onToggleDark} settingsSlot={settingsSlot} goto={goto} />

      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <ChaptersSection cards={cards} chapter7Href={ch7} />
        <FreeSection />

        <section className="lp-band">
          <div className="lp-wrap lp-reveal">
            <h2 className="lp-serif lp-h2">Chapter 7 is open now</h2>
            <p>Free. No account. Saved on your device.</p>
            <a className="lp-btn lp-btn-light" href={startHref} style={{ marginTop: '.375rem' }}>
              {action?.label ?? 'Start Chapter 7'}
              <ArrowRight width={18} height={18} strokeWidth={2.5} aria-hidden />
            </a>
          </div>
        </section>
      </main>

      <footer className="lp-wrap lp-foot">
        <p>{BRAND}: a free study site for ICAN CAP Foundation, Paper 2 Part B.</p>
      </footer>
    </div>
  )
}
