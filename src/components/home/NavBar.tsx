import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { NavDrawer } from './NavDrawer'
import { Wordmark } from './Wordmark'
import type { ChapterCard } from './homeLogic'
import { cardHref } from './homeLogic'

interface Props {
  cards: ChapterCard[]
  dark: boolean
  onToggleDark: () => void
  settingsSlot?: ReactNode
  calm: boolean
  goTop: () => void
}

/**
 * Sticky top bar: the wordmark, a link to each chapter (from 900px wide), light or dark and settings.
 * On a phone the chapters move into the sidebar behind the menu button. It gets a line once the page scrolls.
 */
export function NavBar({ cards, dark, onToggleDark, settingsSlot, calm, goTop }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lp')
    if (!root) return
    const onScroll = () => setScrolled(root.scrollTop > 8)
    onScroll()
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => root.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <header className={`lp-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="lp-wrap lp-nav-in">
        <Wordmark onClick={goTop} />
        <nav className="lp-nav-links" aria-label="Chapters">
          {cards.map((c) => (
            <a key={c.number} href={cardHref(c)}>
              Chapter {c.number}
            </a>
          ))}
        </nav>
        <div className="lp-tools">
          <button type="button" className="lp-iconbtn lp-nav-theme" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleDark}>
            {dark ? <Sun width={22} height={22} aria-hidden /> : <Moon width={22} height={22} aria-hidden />}
          </button>
          <span className="lp-nav-gear">{settingsSlot}</span>
          <button type="button" className="lp-iconbtn lp-nav-menu" aria-label="Open the menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Menu width={24} height={24} aria-hidden />
          </button>
        </div>
      </div>
    </header>
    {/* Outside the header: a blurred header would trap the drawer's fixed position */}
    <NavDrawer open={open} onClose={() => setOpen(false)} cards={cards} dark={dark} onToggleDark={onToggleDark} settingsSlot={settingsSlot} calm={calm} />
    </>
  )
}
