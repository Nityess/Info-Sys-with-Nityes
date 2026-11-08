import { useState } from 'react'
import { motion } from 'motion/react'
import { ExploreMap } from '../lesson/ExploreMap'
import { accurate } from '../../content/chapters/ch07/sectionA1'
import { EXAM } from './homeData'
import type { HeroAction } from './homeLogic'

interface Props {
  action: HeroAction | undefined
  onStart: (unitId: string) => void
  onSeeChapters: () => void
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 * i, duration: 0.5, ease: 'easeOut' as const },
})

/** The real ACCURATE mind map, live: tap a node and it opens, exactly as in the lesson. */
function LiveMap() {
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set())
  const [openId, setOpenId] = useState<string | null>(null)
  const cards = accurate.cards ?? []

  const tap = (id: string) => {
    setOpenId(openId === id ? null : id)
    if (!seen.has(id)) setSeen(new Set(seen).add(id))
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:p-6 dark:bg-slate-900 dark:ring-slate-800">
      <p className="mb-3 text-center font-display text-base font-semibold text-ink dark:text-white">
        Qualities of good information
      </p>
      <ExploreMap hub={accurate.hub ?? 'ACCURATE'} cards={cards} practice={accurate.practice ?? []} seen={seen} openId={openId} onTap={tap} />
    </div>
  )
}

export function HomeHero({ action, onStart, onSeeChapters }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-12">
      <div>
        <motion.h1 {...rise(0)} className="text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem] dark:text-white">
          Interactive study site for ICAN Foundation Information Systems
        </motion.h1>
        <motion.p {...rise(1)} className="mt-5 max-w-[34rem] text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          Part B is {EXAM.partBMarks} of Paper 2’s {EXAM.paperMarks} marks. Open a mind map, play a card game, then recap with flashcards, free on any phone.
        </motion.p>
        <motion.div {...rise(2)} className="mt-7 flex flex-wrap items-center gap-3">
          {action && (
            <button
              type="button"
              onClick={() => onStart(action.unit.id)}
              className="rounded-xl bg-spruce px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-spruce/90 active:translate-y-0 active:scale-[0.98]"
            >
              {action.label}
            </button>
          )}
          <button
            type="button"
            onClick={onSeeChapters}
            className="rounded-xl border border-slate-300 px-5 py-3 text-base font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98] dark:border-slate-600 dark:text-white dark:hover:bg-slate-900"
          >
            See the chapters
          </button>
        </motion.div>
        {action?.returning && (
          <motion.p {...rise(3)} className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Next up: {action.unit.title}
          </motion.p>
        )}
      </div>

      <motion.div {...rise(2)} className="mx-auto w-full max-w-md lg:max-w-none">
        <LiveMap />
      </motion.div>
    </section>
  )
}
