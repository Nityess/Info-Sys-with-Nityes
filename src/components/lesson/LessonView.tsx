import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import type { ConceptCard, PracticeItem, Unit } from '../../content/types'
import { useSettings } from '../../state/useSettings'
import { Confetti } from './Confetti'
import { ExploreMap } from './ExploreMap'
import { FlashRecap } from './FlashRecap'
import { StepBar } from './StepBar'
import type { Step } from './StepBar'
import { SwipePlay } from './SwipePlay'
import { buildSwipeDeck } from './swipeLogic'

interface Props {
  unit: Unit
  /** Pay out XP once per key; returns what was granted now */
  claim: (key: string, xp: number) => number
  /** Called when the recap is finished */
  onComplete: () => void
}

const NO_CARDS: ConceptCard[] = []
const NO_PRACTICE: PracticeItem[] = []
const ORDER: Step[] = ['explore', 'play', 'recap']
const XP = { explore: 10, perCard: 10, recap: 30 }

/** Guided lesson: Explore the map, Play the swipe cards, Recap with flashcards. */
export function LessonView({ unit, claim, onComplete }: Props) {
  const { settings } = useSettings()
  const cards = unit.cards ?? NO_CARDS
  const practice = unit.practice ?? NO_PRACTICE
  const [step, setStep] = useState<Step>('explore')
  const [reached, setReached] = useState(0)
  const [seen, setSeen] = useState<ReadonlySet<string>>(new Set())
  const [openId, setOpenId] = useState<string | null>(null)
  const [exploreXp, setExploreXp] = useState<number | null>(null)
  const [burst, setBurst] = useState(0)
  const [recapRun, setRecapRun] = useState(0)
  const deck = useMemo(() => buildSwipeDeck(practice, cards), [practice, cards])

  const go = (s: Step) => {
    setStep(s)
    setReached((r) => Math.max(r, ORDER.indexOf(s)))
  }

  const tap = (id: string) => {
    setOpenId(openId === id ? null : id)
    if (seen.has(id)) return
    const next = new Set(seen).add(id)
    setSeen(next)
    if (next.size === cards.length) setExploreXp(claim(`${unit.id}:explore`, XP.explore))
  }

  const finishPlay = (correct: number, total: number) => {
    const granted = claim(`${unit.id}:play`, correct * XP.perCard)
    if (correct === total) setBurst((b) => b + 1)
    return granted
  }

  const finishRecap = useCallback(() => {
    const granted = claim(`${unit.id}:recap`, XP.recap)
    setBurst((b) => b + 1)
    onComplete()
    return granted
  }, [claim, onComplete, unit.id])

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>
      <div className="min-h-0 flex-1 overflow-y-auto bg-mist font-body dark:bg-slate-950">
        {burst > 0 && <Confetti key={burst} />}
        <div className="mx-auto max-w-xl px-4 pb-16 pt-6">
          <header className="mb-5">
            <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl dark:text-white">{unit.title}</h2>
            {unit.objective && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{unit.objective}</p>}
          </header>

          <StepBar step={step} reached={reached} onGo={go} />

          <div className="mt-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step === 'recap' ? `recap-${recapRun}` : step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {step === 'explore' && (
                  <>
                    <ExploreMap hub={unit.hub ?? unit.title} cards={cards} practice={practice} seen={seen} openId={openId} onTap={tap} />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                        {seen.size} of {cards.length} explored
                        {exploreXp ? <span className="ml-2 rounded-full bg-marigold/20 px-2 py-0.5 font-semibold text-amber-800 dark:text-amber-300">+{exploreXp} XP</span> : null}
                      </p>
                      <button
                        type="button"
                        onClick={() => go('play')}
                        className={`rounded-xl px-5 py-2.5 text-sm font-semibold ${seen.size === cards.length ? 'bg-spruce text-white hover:bg-spruce/90' : 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'}`}
                      >
                        Start playing
                      </button>
                    </div>
                  </>
                )}
                {step === 'play' && <SwipePlay deck={deck} onFinish={finishPlay} onContinue={() => go('recap')} />}
                {step === 'recap' && <FlashRecap cards={cards} onComplete={finishRecap} onReplay={() => setRecapRun((r) => r + 1)} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
