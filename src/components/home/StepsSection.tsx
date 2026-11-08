import { Check } from 'lucide-react'
import { accurate } from '../../content/chapters/ch07/sectionA1'

const cards = accurate.cards ?? []
const byId = (id: string) => cards.find((c) => c.id === id)
const scenario = accurate.practice?.[0]

const lift = 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg'

/** Fragment of the explore step: four nodes, two already opened. */
function ExploreFragment() {
  const rows = [
    { id: 'accurate', seen: true },
    { id: 'complete', seen: true },
    { id: 'timely', seen: false },
    { id: 'authoritative', seen: false },
  ]
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => {
        const c = byId(r.id)
        if (!c) return null
        return (
          <li
            key={r.id}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium text-ink dark:text-slate-100 ${
              r.seen ? 'border-spruce/50 bg-emerald-50 dark:bg-emerald-950' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            <span aria-hidden className="text-lg">{c.icon}</span>
            <span className="flex-1">{c.short}</span>
            {r.seen && <Check className="h-4 w-4 text-spruce" aria-label="Opened" />}
          </li>
        )
      })}
    </ul>
  )
}

/** Fragment of the play step: one scenario with its proposed label. */
function PlayFragment() {
  const label = byId(scenario?.bucket ?? '')
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
      <p className="font-display text-base font-medium leading-snug text-ink dark:text-white">{scenario?.text}</p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-mist px-3 py-2 text-sm dark:bg-slate-800">
        <span aria-hidden className="text-lg">{label?.icon}</span>
        <span className="font-semibold text-ink dark:text-white">{label?.short}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold">
        <span className="rounded-lg border-2 border-coral/50 py-1.5 text-center text-coral">Not a match</span>
        <span className="rounded-lg border-2 border-spruce/50 py-1.5 text-center text-spruce">Matches</span>
      </div>
    </div>
  )
}

/** Fragment of the recap step: a flashcard back with the mastery bar. */
function RecapFragment() {
  const c = byId('timely')
  return (
    <div>
      <div className="rounded-2xl bg-ink p-4 text-white shadow-md dark:bg-slate-800">
        <p className="font-display text-base font-semibold">{c?.title}</p>
        <p className="mt-1 text-sm text-slate-200">{c?.detail}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden>
        <div className="h-full w-3/8 rounded-full bg-spruce" />
      </div>
    </div>
  )
}

const STEPS = [
  {
    title: 'Open each node on the map',
    body: 'Tap a branch to read the textbook point and an example. Branches you have opened turn green.',
    visual: <ExploreFragment />,
  },
  {
    title: 'Swipe scenarios right or left',
    body: 'Decide whether the label fits. You see the reason straight away and build a streak.',
    visual: <PlayFragment />,
  },
  {
    title: 'Flip cards until you know them',
    body: 'Cards you miss return at the end of the deck. The lesson is done when every card is mastered.',
    visual: <RecapFragment />,
  },
]

export function StepsSection() {
  return (
    <section className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl dark:text-white">
          Every lesson takes three short steps
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`flex flex-col rounded-3xl bg-mist p-5 dark:bg-slate-950 ${lift}`}>
              <div className="md:flex md:min-h-[15.5rem] md:items-center"><div className="w-full">{s.visual}</div></div>
              <div className="mt-5 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white dark:bg-white dark:text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-ink dark:text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
