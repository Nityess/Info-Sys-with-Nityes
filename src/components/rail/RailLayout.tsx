import { useEffect, useMemo, useRef, useState } from 'react'
import type { Unit } from '../../content/types'
import { sectionById } from '../../content/chapters/ch07/topics'
import { sectionHash } from '../../state/route'
import { stepsFor } from './railSteps'
import type { RailStepId } from './railSteps'

interface Props {
  unit: Unit
  /** Content for each step. Steps with nothing yet show a short placeholder. */
  parts?: Partial<Record<RailStepId, React.ReactNode>>
}

/**
 * One scrollable topic page with a sticky progress bar. The bar fills as each part scrolls into view.
 * Parts are filled in milestone by milestone; until then they say so (this page is teacher-preview only).
 */
export function RailLayout({ unit, parts = {} }: Props) {
  const steps = useMemo(() => stepsFor(Boolean(unit.topic?.playground)), [unit.topic?.playground])
  const section = sectionById(unit.sectionId ?? '')
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set())
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target.getAttribute('data-step') ?? '')
      if (hit.length) setSeen((prev) => new Set([...prev, ...hit]))
    }, { threshold: 0.3 })
    Object.values(refs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [steps])

  const pct = Math.round((seen.size / steps.length) * 100)
  const go = (id: string) => refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-mist font-body dark:bg-slate-950">
      <header className={`${section?.band ?? 'bg-ink'} px-4 pb-6 pt-6 text-white`}>
        <div className="mx-auto max-w-2xl">
          {section && (
            <a href={sectionHash(section.id)} className="text-sm font-medium text-white/80 underline-offset-4 hover:underline">
              {section.title}
            </a>
          )}
          <h2 className="mt-1 text-balance font-display text-3xl font-semibold leading-tight">
            <span className="mr-2 text-white/70">{unit.topic?.code}</span>
            {unit.title}
          </h2>
          {unit.topic?.teachingAid && (
            <p className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              {unit.topic.teachingAid} is a teaching aid, not a source term
            </p>
          )}
        </div>
      </header>

      <div className="sticky top-0 z-10 border-b border-slate-200 bg-mist/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto max-w-2xl px-4 py-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Topic progress">
            <div className="h-full rounded-full bg-spruce transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <nav aria-label="Parts of this topic" className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
            {steps.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${seen.has(s.id) ? 'bg-spruce/15 text-spruce' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300'}`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 pb-20">
        {steps.map((s) => (
          <section
            key={s.id}
            data-step={s.id}
            ref={(el) => {
              refs.current[s.id] = el
            }}
            aria-labelledby={`rail-${s.id}`}
            className="scroll-mt-28 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
          >
            <h3 id={`rail-${s.id}`} className="font-display text-xl font-semibold text-ink dark:text-white">
              {s.label}
              {s.id === 'try' && <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">(about 60 to 90 seconds)</span>}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {parts[s.id] ?? <p className="text-slate-500 dark:text-slate-400">This part is built in a later milestone.</p>}
            </div>
            {s.id === 'try' && (
              <button type="button" onClick={() => go('quiz')} className="mt-3 text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-ink dark:text-slate-300 dark:hover:text-white">
                Skip to the quiz
              </button>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
