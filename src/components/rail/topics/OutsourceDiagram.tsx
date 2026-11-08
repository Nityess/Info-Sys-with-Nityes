import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

/** The IT function is either inside the organisation or contracted out across an "arm's length" gap. */
export function OutsourceDiagram() {
  const [out, setOut] = useState(false)
  const fn = (
    <motion.span layoutId="it-function" transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="inline-block rounded-lg bg-marigold px-2.5 py-1 text-xs font-bold text-ink">
      IT function
    </motion.span>
  )
  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-2">
        <div className="flex min-h-[7rem] flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-50 p-2 text-center dark:bg-blue-950/30">
          <p className="font-display text-sm font-semibold text-ink dark:text-white">Organisation</p>
          {!out && fn}
        </div>

        <div className="flex w-16 shrink-0 flex-col items-center justify-center text-center sm:w-24" aria-hidden={!out}>
          {out ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-1">
              <ArrowRight className="h-5 w-5 text-spruce" />
              <span className="text-[0.7rem] font-semibold leading-tight text-spruce">Contract</span>
              <span className="my-1 h-8 border-l-2 border-dotted border-slate-400" />
              <span className="text-[0.7rem] leading-tight text-slate-600 dark:text-slate-400">Arm's length</span>
            </motion.div>
          ) : null}
        </div>

        <div className={`flex min-h-[7rem] flex-1 flex-col items-center justify-center gap-2 rounded-2xl border-2 p-2 text-center ${out ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30' : 'border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/40'}`}>
          <p className="font-display text-sm font-semibold text-ink dark:text-white">External provider</p>
          {out && fn}
        </div>
      </div>

      <p className="text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {out ? 'The function is contracted out. The service is managed at arm’s length: reduced direct control.' : 'In-house: the organisation manages the IT function directly.'}
      </p>
      <div className="flex justify-center">
        <button type="button" onClick={() => setOut(!out)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
          {out ? 'Bring it back in-house' : 'Contract it out'}
        </button>
      </div>
    </div>
  )
}
