import { motion } from 'motion/react'
import { OUTLINES } from './homeData'
import type { ChapterCard } from './homeLogic'

interface Props {
  cards: ChapterCard[]
  onOpen: (unitId: string) => void
}

function Meter({ percent, label }: { percent: number; label: string }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <motion.div className="h-full rounded-full bg-spruce" initial={false} animate={{ width: `${percent}%` }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} />
    </div>
  )
}

export function ChaptersSection({ cards, onOpen }: Props) {
  return (
    <section id="chapters" className="scroll-mt-16 bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl dark:text-white">
          Four chapters, one for each outcome
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
          Chapters 7 and 10 are open now. Chapters 8 and 9 follow.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((c) => {
            const open = c.status === 'open'
            const outline = OUTLINES[c.number]
            return (
              <li
                key={c.number}
                className={`flex flex-col rounded-3xl border p-6 transition duration-200 ${
                  open
                    ? 'border-slate-200 bg-mist hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950'
                    : 'border-dashed border-slate-300 bg-transparent dark:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-display text-6xl font-semibold leading-none ${open ? 'text-spruce' : 'text-slate-300 dark:text-slate-700'}`} aria-hidden>
                    {c.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold leading-snug text-ink dark:text-white">
                      <span className="sr-only">Chapter {c.number}: </span>
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {c.lo}, {c.weight} marks
                    </p>
                  </div>
                </div>

                {open ? (
                  <>
                    {outline && <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{outline}</p>}
                    <div className="mt-5">
                      <div className="mb-1.5 flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>
                          {c.built === c.total ? `${c.total} lessons` : `${c.built} of ${c.total} lessons ready`}
                        </span>
                        <span className="tabular-nums">{c.percent}% done</span>
                      </div>
                      <Meter percent={c.percent} label={`Chapter ${c.number} progress`} />
                    </div>
                    <div className="mt-6">
                      <button
                        type="button"
                        disabled={!c.unitId}
                        onClick={() => c.unitId && onOpen(c.unitId)}
                        className="rounded-xl bg-spruce px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-spruce/90 active:translate-y-0 active:scale-[0.98]"
                      >
                        {c.started ? `Continue chapter ${c.number}` : `Open chapter ${c.number}`}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="mt-auto pt-6 text-sm font-medium text-slate-500 dark:text-slate-400">Coming soon. Lessons are being written.</p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
