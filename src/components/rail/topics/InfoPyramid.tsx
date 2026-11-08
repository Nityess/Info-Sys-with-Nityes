import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'

const LAYERS = [
  { name: 'Strategic', who: 'Board / Senior Managers', width: 'w-[52%]', tone: 'bg-blue-600 text-white' },
  { name: 'Tactical', who: 'Middle Managers', width: 'w-[76%]', tone: 'bg-teal-600 text-white' },
  { name: 'Operational', who: 'Front-line Staff', width: 'w-full', tone: 'bg-amber-500 text-ink' },
]
const LAST = LAYERS.length + 1 // step 4 brings in the Planning card

/** Three-level pyramid built layer by layer, a time-horizon bar, and Planning as a separate card beside it. */
export function InfoPyramid() {
  const [step, setStep] = useState(0)
  const layers = Math.min(step, LAYERS.length)

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-center">
        <div className="w-full max-w-sm space-y-1.5" role="img" aria-label="Pyramid: strategic on top, tactical in the middle, operational at the base">
          {LAYERS.map((l, i) => (
            <div key={l.name} className="flex min-h-[3.25rem] justify-center">
              <AnimatePresence>
                {i < layers && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={`${l.width} rounded-xl px-2 py-2 text-center ${l.tone}`}>
                    <p className="font-display text-sm font-semibold leading-tight">{l.name}</p>
                    <p className="text-xs opacity-90">{l.who}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="flex min-h-[3.25rem] w-full max-w-[14rem] items-center sm:w-40">
          <AnimatePresence>
            {step >= LAST && (
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full rounded-xl border-2 border-dashed border-violet-400 bg-violet-50 px-3 py-2 text-center dark:bg-violet-950/30">
                <p className="font-display text-sm font-semibold text-ink dark:text-white">Planning</p>
                <p className="text-xs text-slate-700 dark:text-slate-300">Planning Teams. Separate, not in the pyramid.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={`transition-opacity ${layers > 0 ? 'opacity-100' : 'opacity-0'}`} aria-hidden={layers === 0}>
        <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-amber-400" />
        <div className="mt-1 flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>Long-term</span>
          <span>Short-term</span>
          <span>Daily</span>
        </div>
      </div>

      <p className="text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {step === 0 && 'Tap to build the three levels.'}
        {step === 1 && 'Strategic: the Board decides the long-term direction.'}
        {step === 2 && 'Tactical: middle managers handle short-term issues.'}
        {step === 3 && 'Operational: front-line staff run the day-to-day work.'}
        {step >= LAST && 'Planning information stands apart: implementation steps, resources, time-scales.'}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {step < LAST && (
          <button type="button" onClick={() => setStep(step + 1)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
            {step === 0 ? 'Build the pyramid' : step < LAYERS.length ? 'Next level' : 'Where does Planning fit?'}
          </button>
        )}
        {step > 0 && (
          <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
    </div>
  )
}
