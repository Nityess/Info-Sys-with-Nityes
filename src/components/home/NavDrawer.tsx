import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun, X } from 'lucide-react'
import type { ChapterCard } from './homeLogic'
import { cardHref } from './homeLogic'

interface Props {
  open: boolean
  onClose: () => void
  cards: ChapterCard[]
  dark: boolean
  onToggleDark: () => void
  settingsSlot?: ReactNode
  calm: boolean
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])'

/** The phone sidebar: the four chapters with their marks, then the light or dark switch and settings. A dialog. */
export function NavDrawer({ open, onClose, cards, dark, onToggleDark, settingsSlot, calm }: Props) {
  const box = useRef<HTMLElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !box.current) return
      const items = [...box.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const t = { duration: calm ? 0 : 0.28, ease: [0.2, 0.7, 0.2, 1] as const }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="lp-drawer-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} onClick={onClose}>
          <motion.aside
            ref={box}
            role="dialog"
            aria-modal="true"
            aria-label="Chapters and settings"
            className="lp-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={t}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lp-drawer-head">
              <b className="lp-serif">Chapters</b>
              <button ref={closeBtn} type="button" className="lp-iconbtn" aria-label="Close the menu" onClick={onClose}>
                <X width={22} height={22} aria-hidden />
              </button>
            </div>
            <div className="lp-drawer-tools">
              <button type="button" className="lp-drawer-theme" onClick={onToggleDark}>
                {dark ? <Sun width={20} height={20} aria-hidden /> : <Moon width={20} height={20} aria-hidden />}
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
              {settingsSlot}
            </div>
            <ul className="lp-drawer-list">
              {cards.map((c) => (
                <li key={c.number}>
                  <a href={cardHref(c)} className="lp-drawer-row" onClick={onClose}>
                    <span className="lp-serif lp-drawer-n">{c.number}</span>
                    <span className="lp-drawer-text">
                      <b>{c.title}</b>
                      <span>
                        {c.weight} marks{c.badge ? `, ${c.badge.toLowerCase()}` : ''}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
