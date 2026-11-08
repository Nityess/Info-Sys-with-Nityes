import { Check, Circle, CircleDot } from 'lucide-react'
import type { Unit } from '../../content/types'
import type { SectionInfo } from '../../content/chapters/ch07/topics'
import { topicStatus } from '../../state/progress'
import type { TopicStatus } from '../../state/progress'

interface Props {
  section: SectionInfo
  topics: Unit[]
  done: ReadonlySet<string>
  started: ReadonlySet<string>
  onOpen: (unitId: string) => void
}

const STATUS_TEXT: Record<TopicStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
}

function StatusIcon({ status }: { status: TopicStatus }) {
  if (status === 'done') return <Check className="h-5 w-5 text-spruce" aria-hidden />
  if (status === 'in-progress') return <CircleDot className="h-5 w-5 text-amber-500" aria-hidden />
  return <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" aria-hidden />
}

function Ring({ value, total, stroke }: { value: number; total: number; stroke: string }) {
  const r = 20
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 48 48" className="h-16 w-16 shrink-0" role="img" aria-label={`${value} of ${total} topics done`}>
      <circle cx="24" cy="24" r={r} fill="none" strokeWidth="5" className="stroke-white/25" />
      <circle cx="24" cy="24" r={r} fill="none" strokeWidth="5" strokeLinecap="round" className={`${stroke} stroke-white transition-all duration-500`} strokeDasharray={c} strokeDashoffset={c - (c * value) / Math.max(total, 1)} transform="rotate(-90 24 24)" />
      <text x="24" y="28" textAnchor="middle" className="fill-white text-[11px] font-bold">
        {value}/{total}
      </text>
    </svg>
  )
}

/** Section overview: a vertical path of its topics with status, and a progress ring. */
export function SectionPage({ section, topics, done, started, onOpen }: Props) {
  const doneCount = topics.filter((t) => done.has(t.id)).length
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-mist font-body dark:bg-slate-950">
      <header className={`${section.band} px-4 py-8 text-white`}>
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight">{section.title}</h2>
            <p className="mt-1 text-sm text-white/85">{section.summary}</p>
          </div>
          <Ring value={doneCount} total={topics.length} stroke="" />
        </div>
      </header>

      <ol className="relative mx-auto max-w-2xl px-4 py-8 pb-20">
        {topics.map((t, i) => {
          const status = topicStatus(t.id, done, started)
          return (
            <li key={t.id} className="relative mb-3">
              {i < topics.length - 1 && (
                <span aria-hidden className="absolute left-[calc(1.875rem-1px)] top-1/2 h-[calc(100%+0.75rem)] w-0.5 bg-slate-200 dark:bg-slate-800" />
              )}
              <button
                type="button"
                onClick={() => onOpen(t.id)}
                className="relative flex w-full items-center gap-4 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] dark:bg-slate-900 dark:ring-slate-800"
              >
                <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${section.dot} text-sm font-bold text-white`}>{t.topic?.code}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink dark:text-white">{t.title}</span>
                  <span className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-600 dark:text-slate-400">
                    {t.topic?.teachingAid && <span>{t.topic.teachingAid}: teaching aid</span>}
                    {t.topic?.playground && <span>Includes a playground</span>}
                    {t.topic?.fromStudyText && <span>From the study text</span>}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <StatusIcon status={status} />
                  <span className="hidden sm:inline">{STATUS_TEXT[status]}</span>
                  <span className="sr-only sm:hidden">{STATUS_TEXT[status]}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
