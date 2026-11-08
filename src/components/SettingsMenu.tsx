import { useEffect, useRef, useState } from 'react'
import { Settings as Gear } from 'lucide-react'
import { chapter8Hash, sectionHash } from '../state/route'
import type { Settings, TextSize } from '../state/settings'

interface Props {
  raw: Settings
  onChange: (patch: Partial<Settings>) => void
  dark: boolean
  onToggleDark: () => void
  /** Icon button styled for the navy landing hero */
  onDark?: boolean
}

const SIZES: { id: TextSize; label: string }[] = [
  { id: 's', label: 'Small' },
  { id: 'm', label: 'Medium' },
  { id: 'l', label: 'Large' },
]

function Switch({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3 py-2">
      <span>
        <span className="block text-sm font-medium text-ink dark:text-slate-100">{label}</span>
        {hint && <span className="block text-xs text-slate-500 dark:text-slate-400">{hint}</span>}
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-spruce" />
    </label>
  )
}

/** Gear button with a small settings panel. Closes on Escape or an outside click. */
export function SettingsMenu({ raw, onChange, dark, onToggleDark, onDark }: Props) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label="Settings"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={onDark ? 'lp-iconbtn' : 'rounded-lg p-2 transition hover:bg-white dark:hover:bg-slate-900'}
      >
        <Gear className="h-5 w-5" aria-hidden />
      </button>
      {open && (
        <div role="dialog" aria-label="Settings" className="absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white p-4 text-left shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">Settings</h2>
          <div className="mt-1 divide-y divide-slate-100 dark:divide-slate-800">
            <Switch label="Dark mode" checked={dark} onChange={onToggleDark} />
            <Switch label="Reduce motion" hint="Animations become simple fades." checked={raw.reduceMotion} onChange={(v) => onChange({ reduceMotion: v })} />
            <fieldset className="py-2">
              <legend className="text-sm font-medium text-ink dark:text-slate-100">Text size</legend>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={raw.textSize === s.id}
                    onClick={() => onChange({ textSize: s.id })}
                    className={`rounded-lg border px-2 py-1.5 text-sm font-medium ${raw.textSize === s.id ? 'border-spruce bg-spruce text-white' : 'border-slate-300 text-ink hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <Switch label="Teacher mode" hint="Shows tools for checking new content." checked={raw.teacher} onChange={(v) => onChange({ teacher: v })} />
            {raw.teacher && (
              <div className="pl-3">
                <Switch label="Show study-book questions" hint="The two questions copied from the study book." checked={raw.showSourceQuestions} onChange={(v) => onChange({ showSourceQuestions: v })} />
                <Switch label="Show the new topic boards" hint="Preview: animated boards for Chapter 7 and Chapter 8, and on each Concept step." checked={raw.showBoards} onChange={(v) => onChange({ showBoards: v })} />
                {raw.showBoards && (
                  <div className="space-y-1 py-1 text-sm">
                    {[
                      { label: 'Chapter 7', href: (s: string) => sectionHash(s) },
                      { label: 'Chapter 8', href: (s: string) => chapter8Hash(s) },
                    ].map((ch) => (
                      <p key={ch.label} className="flex flex-wrap items-center gap-x-3">
                        <span className="font-medium text-ink dark:text-slate-100">{ch.label}</span>
                        {['s1', 's2', 's3'].map((s, i) => (
                          <a key={s} href={ch.href(s)} className="font-semibold text-spruce underline dark:text-emerald-300" onClick={() => setOpen(false)}>
                            Section {i + 1}
                          </a>
                        ))}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
