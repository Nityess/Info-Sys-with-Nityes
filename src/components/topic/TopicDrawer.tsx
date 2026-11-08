import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { House } from 'lucide-react'
import { HOME_HASH } from '../../state/route'
import type { DrawerRow } from './drawerRows'

interface Props {
  rows: DrawerRow[]
  onClose: () => void
  /** The settings gear, placed in the drawer header */
  settingsSlot: ReactNode
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])'

/** Chapter 7 topic list. A dialog: focus moves in, Tab stays inside, Escape or a tap outside closes it. */
export function TopicDrawer({ rows, onClose, settingsSlot }: Props) {
  const box = useRef<HTMLElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
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
  }, [onClose])

  return (
    <div className="ls-dbg" onClick={onClose}>
      <aside ref={box} role="dialog" aria-modal="true" aria-label="Chapter 7 topics" className="ls-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="ls-dhead">
          <b className="ls-serif">Chapter 7 topics</b>
          {settingsSlot}
          <button ref={closeBtn} type="button" className="ls-iconbtn" aria-label="Close the topic list" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="ls-dlist">
          <a href={HOME_HASH} className="ls-dr">
            <House className="h-4 w-4" aria-hidden />
            <span className="ls-tt">Home</span>
          </a>
          {rows.map((r) =>
            r.kind === 'heading' ? (
              <div key={r.text} className="ls-dh">{r.text}</div>
            ) : r.href ? (
              <a key={r.code} href={r.href} aria-current={r.current ? 'page' : undefined} onClick={onClose} className={`ls-dr${r.current ? ' ls-dr-cur' : ''}`}>
                <span className="ls-num">{r.code}</span>
                <span className="ls-tt">{r.title}</span>
                <span className="ls-tag">{r.tag}</span>
              </a>
            ) : (
              <div key={r.code} aria-current={r.current ? 'page' : undefined} className={`ls-dr ${r.current ? 'ls-dr-cur' : 'ls-dr-lock'}`}>
                <span className="ls-num">{r.code}</span>
                <span className="ls-tt">{r.title}</span>
                <span className="ls-tag">{r.tag}</span>
              </div>
            ),
          )}
        </div>
      </aside>
    </div>
  )
}
