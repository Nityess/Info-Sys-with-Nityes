import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { HOME_HASH } from '../../state/route'

interface Props {
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
}

const SRC = `${import.meta.env.BASE_URL}chapter10/index.html`

/**
 * Chapter 10 Data Security: the finished interactive page (public/chapter10/index.html) inside the site frame.
 * Same origin, so the site's light or dark choice is passed into the page. A step towards a full React port.
 */
export function Chapter10Page({ dark, onToggleDark, settingsSlot }: Props) {
  const frame = useRef<HTMLIFrameElement>(null)

  const applyTheme = useCallback(() => {
    try {
      frame.current?.contentDocument?.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    } catch {
      // the page could not be reached: it keeps its own theme
    }
  }, [dark])

  useEffect(applyTheme, [applyTheme])

  return (
    <div className="flex h-full flex-col bg-mist text-ink dark:bg-slate-950 dark:text-slate-100">
      <header className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <a href={HOME_HASH} className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Home
        </a>
        <h1 className="min-w-0 flex-1 truncate text-base font-semibold">Chapter 10 · Data security</h1>
        <button
          type="button"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onToggleDark}
        >
          {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
        </button>
        {settingsSlot}
      </header>
      <iframe ref={frame} src={SRC} title="Chapter 10 Data Security lab" onLoad={applyTheme} className="min-h-0 w-full flex-1 border-0" />
    </div>
  )
}
