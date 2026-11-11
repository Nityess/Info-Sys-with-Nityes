import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { HOME_HASH, chapter9Hash } from '../../state/route'
import { SIM_SECTIONS, SIM_TOPICS, exploredCount, simProgressId } from '../../content/chapter9/topics'
import type { SimTopic } from '../../content/chapter9/topics'
import { SiteBar } from './SiteBar'

interface Props {
  /** Ids of everything the student has opened (the app's "started" set) */
  started: ReadonlySet<string>
  dark: boolean
  onToggleDark: () => void
  settingsSlot: ReactNode
}

const card = 'flex min-h-20 items-start gap-3 rounded-xl border bg-white p-3 text-left dark:bg-slate-900'

function TopicCard({ t, visited }: { t: SimTopic; visited: boolean }) {
  const body = (
    <>
      <span className="mt-0.5 inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 px-1.5 text-xs font-bold tabular-nums dark:bg-slate-800">{t.number}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold leading-snug">{t.title}</span>
        <span className="block text-sm text-slate-600 dark:text-slate-300">{t.topic}</span>
      </span>
      {t.ready ? (
        visited && (
          <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-spruce dark:text-emerald-300">
            <Check className="h-4 w-4" aria-hidden /> Explored
          </span>
        )
      ) : (
        <span className="mt-1 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">Coming soon</span>
      )}
    </>
  )
  if (!t.ready) return <li className={`${card} border-dashed border-slate-300 opacity-80 dark:border-slate-700`}>{body}</li>
  return (
    <li>
      <a href={chapter9Hash(t.slug)} className={`${card} h-full border-slate-200 hover:border-spruce dark:border-slate-700`}>
        {body}
      </a>
    </li>
  )
}

/** Chapter 9 hub: two sections, one card per topic with its simulator title and an Explored tick. */
export function Chapter9Hub({ started, dark, onToggleDark, settingsSlot }: Props) {
  const { explored, total } = exploredCount(started)
  return (
    <div className="h-full overflow-y-auto bg-mist text-ink dark:bg-slate-950 dark:text-slate-100">
      <SiteBar backHref={HOME_HASH} backLabel="Home" title="Chapter 9 · Financial technology" dark={dark} onToggleDark={onToggleDark} settingsSlot={settingsSlot} />
      <main className="mx-auto max-w-4xl px-4 pb-12 pt-6">
        <p className="text-sm font-semibold text-spruce dark:text-emerald-300" aria-live="polite">
          {explored} of {total} explored
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold leading-tight">Every topic is a live simulation</h2>
        <p className="mt-2 max-w-prose text-base text-slate-700 dark:text-slate-300">Open one, play with it, and the idea makes sense. Businesses and numbers are made up for teaching.</p>
        {SIM_SECTIONS.map((s) => (
          <section key={s.id} aria-labelledby={`s9-${s.id}`} className="mt-8">
            <h3 id={`s9-${s.id}`} className="mb-3 text-lg font-semibold">
              Section {s.id}: {s.title}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SIM_TOPICS.filter((t) => t.section === s.id).map((t) => (
                <TopicCard key={t.slug} t={t} visited={started.has(simProgressId(t.slug))} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
