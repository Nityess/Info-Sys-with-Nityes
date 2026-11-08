import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { GATES } from './cativa'

export type GateView = 'idle' | 'pass' | 'fail'

/** Data, then information processing, then information: the three stages, lit up to `stage` (0 to 3). */
export function StageRow({ stage }: { stage: number }) {
  const names = ['Data', 'Information processing', 'Information']
  return (
    <ol className="flex items-center gap-1.5" aria-label="From data to information">
      {names.map((n, i) => (
        <li key={n} className="flex flex-1 items-center gap-1.5">
          <span className={`flex-1 rounded-xl px-2 py-2 text-center text-xs font-semibold transition-colors duration-300 ${i < stage ? 'bg-spruce text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{n}</span>
          {i < names.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />}
        </li>
      ))}
    </ol>
  )
}

/** The six gates. Each is idle, passing or failing. */
export function GateRow({ view }: { view: (id: string) => GateView }) {
  return (
    <ul className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
      {GATES.map((g) => {
        const v = view(g.id)
        return (
          <li key={g.id} className={`rounded-xl px-1 py-2 text-center transition-colors duration-300 ${v === 'pass' ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200' : v === 'fail' ? 'bg-coral text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
            <span className="block font-display text-xl font-semibold">{g.letter}</span>
            <span className="block text-[0.7rem] font-medium leading-tight">{g.name}</span>
          </li>
        )
      })}
    </ul>
  )
}

/** Concept visual: the pipeline, with the six CATIVA gates lighting up in order. */
export function CativaPipeline() {
  const [lit, setLit] = useState(0)
  const gate = GATES[lit - 1]
  return (
    <div className="space-y-3">
      <StageRow stage={lit === 0 ? 1 : 3} />
      <GateRow view={(id) => (GATES.findIndex((g) => g.id === id) < lit ? 'pass' : 'idle')} />
      <p className="min-h-[2.5rem] text-center text-sm text-slate-700 dark:text-slate-300" aria-live="polite">
        {lit === 0 && 'Raw data is processed into information. Six gates decide whether the processing is effective.'}
        {gate && lit < GATES.length && <><strong>{gate.name}:</strong> {gate.remember}.</>}
        {lit === GATES.length && 'All six gates pass: the processing is complete, accurate, timely, protected, traceable and open to review.'}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {lit < GATES.length && (
          <button type="button" onClick={() => setLit(lit + 1)} className="rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98]">
            {lit === 0 ? 'Light the first gate' : 'Next gate'}
          </button>
        )}
        {lit > 0 && (
          <button type="button" onClick={() => setLit(0)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
    </div>
  )
}
