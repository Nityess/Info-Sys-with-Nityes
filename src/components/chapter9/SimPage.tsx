import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { chapter9Hash } from '../../state/route'
import { simNeighbours, simSrc } from '../../content/chapter9/topics'
import type { SimTopic } from '../../content/chapter9/topics'
import { SimFrame } from './SimFrame'
import { SiteBar } from './SiteBar'

interface Props {
  topic: SimTopic
  dark: boolean
  onToggleDark: () => void
  settingsSlot: ReactNode
  /** Called once when the simulator opens, to remember it as explored */
  onOpen: (slug: string) => void
}

const navBtn =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800'

/** One Chapter 9 simulator: slim header, the page in an auto-height frame, then previous and next cards. */
export function SimPage({ topic, dark, onToggleDark, settingsSlot, onOpen }: Props) {
  const { prev, next } = simNeighbours(topic.slug)

  useEffect(() => {
    onOpen(topic.slug)
    window.scrollTo(0, 0)
  }, [topic.slug, onOpen])

  const arrow = (to: SimTopic | null, label: string, icon: ReactNode) =>
    to ? (
      <a href={chapter9Hash(to.slug)} aria-label={`${label}: ${to.number} ${to.title}`} className={navBtn}>
        {icon}
      </a>
    ) : (
      <span aria-hidden className={`${navBtn} opacity-30`}>
        {icon}
      </span>
    )

  return (
    <div className="h-full overflow-y-auto bg-mist text-ink dark:bg-slate-950 dark:text-slate-100">
      <SiteBar
        backHref={chapter9Hash()}
        backLabel="Chapter 9"
        title={`${topic.number} ${topic.title}`}
        dark={dark}
        onToggleDark={onToggleDark}
        settingsSlot={settingsSlot}
      >
        {arrow(prev, 'Previous simulator', <ChevronLeft className="h-5 w-5" aria-hidden />)}
        {arrow(next, 'Next simulator', <ChevronRight className="h-5 w-5" aria-hidden />)}
      </SiteBar>

      <main>
        <SimFrame key={topic.slug} src={simSrc(topic.slug)} title={`${topic.title}, simulator for ${topic.topic}`} dark={dark} />

        <nav aria-label="More simulators" className="mx-auto grid max-w-3xl gap-3 px-4 pb-8 pt-4 sm:grid-cols-2">
          {prev ? (
            <a href={chapter9Hash(prev.slug)} className="flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:border-spruce dark:border-slate-700 dark:bg-slate-900">
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Previous, {prev.number}</span>
                <span className="block truncate text-sm font-semibold">{prev.title}</span>
              </span>
            </a>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <a href={chapter9Hash(next.slug)} className="flex min-h-14 items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-3 text-right hover:border-spruce dark:border-slate-700 dark:bg-slate-900">
              <span className="min-w-0">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Next, {next.number}</span>
                <span className="block truncate text-sm font-semibold">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          )}
          <a
            href={simSrc(topic.slug)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-slate-600 underline-offset-2 hover:underline sm:col-span-2 dark:text-slate-300"
          >
            Open on its own <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </nav>
      </main>
    </div>
  )
}
