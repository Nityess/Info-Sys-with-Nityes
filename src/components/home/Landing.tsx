import { useMemo } from 'react'
import { Flame, Moon, Sun, Zap } from 'lucide-react'
import { MotionConfig } from 'motion/react'
import type { Chapter } from '../../content/types'
import { ChaptersSection } from './ChaptersSection'
import { ExamSection } from './ExamSection'
import { HomeHero } from './HomeHero'
import { PromiseSection } from './PromiseSection'
import { StepsSection } from './StepsSection'
import { chapterCards, heroAction } from './homeLogic'

interface Props {
  chapters: Chapter[]
  done: ReadonlySet<string>
  xp: number
  streak: number
  dark: boolean
  onToggleDark: () => void
  onOpenUnit: (unitId: string) => void
}

export const BRAND = 'Info Sys with Nityes'

function scrollToChapters() {
  const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  document.getElementById('chapters')?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' })
}

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-spruce" />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M16 16 8.5 9M16 16l8-7M16 16v9" />
      </g>
      <circle cx="16" cy="16" r="3.4" fill="#fff" />
      <circle cx="8.5" cy="9" r="2" className="fill-marigold" />
      <circle cx="24" cy="9" r="2" className="fill-marigold" />
      <circle cx="16" cy="25" r="2" className="fill-marigold" />
    </svg>
  )
}

export function Landing({ chapters, done, xp, streak, dark, onToggleDark, onOpenUnit }: Props) {
  const action = useMemo(() => heroAction(chapters, done), [chapters, done])
  const cards = useMemo(() => chapterCards(chapters, done), [chapters, done])

  return (
    <MotionConfig reducedMotion="user">
      <div className="h-full overflow-y-auto bg-mist font-body text-ink dark:bg-slate-950 dark:text-slate-100">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink">
          Skip to content
        </a>

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-mist/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
            <a href="#/" className="flex items-center gap-2.5 rounded-lg" aria-label={`${BRAND}, home`}>
              <BrandMark />
              <span className="font-display text-lg font-semibold leading-none">{BRAND}</span>
            </a>
            <span className="flex-1" />
            {xp > 0 && (
              <span className="hidden items-center gap-3 text-sm font-semibold tabular-nums sm:flex" aria-label={`${xp} XP, ${streak} day streak`}>
                <span className="inline-flex items-center gap-1 text-amber-600"><Flame className="h-4 w-4" aria-hidden /> {streak}</span>
                <span className="inline-flex items-center gap-1 text-spruce"><Zap className="h-4 w-4" aria-hidden /> {xp} XP</span>
              </span>
            )}
            <button type="button" onClick={scrollToChapters} className="hidden rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white sm:block dark:hover:bg-slate-900">
              Chapters
            </button>
            {action && (
              <button
                type="button"
                onClick={() => onOpenUnit(action.unit.id)}
                className="hidden rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-spruce/90 active:translate-y-0 active:scale-[0.98] md:block"
              >
                {action.label}
              </button>
            )}
            <button
              type="button"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleDark}
              className="rounded-lg p-2 transition hover:bg-white dark:hover:bg-slate-900"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </header>

        <main id="main">
          <HomeHero action={action} onStart={onOpenUnit} onSeeChapters={scrollToChapters} />
          <StepsSection />
          <ExamSection />
          <ChaptersSection cards={cards} onOpen={onOpenUnit} />
          <PromiseSection />

          <section className="bg-ink py-20 text-white dark:bg-slate-900">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">Begin with chapter 7</h2>
                <p className="mt-3 text-lg text-slate-300">
                  Fifteen short lessons on business information, financial reporting and IT systems.
                </p>
              </div>
              {action && (
                <button
                  type="button"
                  onClick={() => onOpenUnit(action.unit.id)}
                  className="rounded-xl bg-marigold px-6 py-3 text-base font-semibold text-ink transition hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.98]"
                >
                  {action.label}
                </button>
              )}
            </div>
          </section>
        </main>

        <footer className="bg-ink pb-10 pt-2 text-sm text-slate-400 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="border-t border-white/10 pt-6">Built from the ICAN CAP Foundation Paper 2 Part B syllabus and study text.</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
