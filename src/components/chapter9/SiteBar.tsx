import type { ReactNode } from 'react'
import { ArrowLeft, Moon, Sun } from 'lucide-react'

interface Props {
  /** Where the back link goes, and what it says */
  backHref: string
  backLabel: string
  title: string
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
  /** Extra controls between the title and the theme button (previous and next) */
  children?: ReactNode
}

/** The slim top bar of the Chapter 9 pages: back link, title, theme toggle, settings. Buttons are at least 44px. */
export function SiteBar({ backHref, backLabel, title, dark, onToggleDark, settingsSlot, children }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-1 border-b border-slate-200 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900">
      <a
        href={backHref}
        aria-label={backLabel}
        className="inline-flex min-h-11 items-center gap-1.5 rounded px-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        <span className="hidden min-[420px]:inline">{backLabel}</span>
      </a>
      <h1 className="min-w-0 flex-1 truncate px-1 text-base font-semibold">{title}</h1>
      {children}
      <button
        type="button"
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={onToggleDark}
      >
        {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
      </button>
      {settingsSlot}
    </header>
  )
}
