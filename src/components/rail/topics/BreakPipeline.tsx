import { useEffect, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { FAULTS, PAIRS, gateStatus } from './cativa'
import { GateRow, StageRow } from './CativaPipeline'

/** Topic 1.9 playground: run a monthly sales report pipeline, inject one fault, and see which CATIVA gate fails. */
export function BreakPipeline() {
  const [fault, setFault] = useState<string | null>(null)
  const [stage, setStage] = useState(0) // 0 not run, 1 to 3 running, 4 finished
  const running = stage > 0 && stage < 4

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setStage((s) => s + 1), 600)
    return () => clearTimeout(t)
  }, [running, stage])

  const finished = stage === 4
  const status = gateStatus(fault)
  const picked = FAULTS.find((f) => f.id === fault)
  const reset = () => {
    setFault(null)
    setStage(0)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-ink dark:text-slate-100">Monthly sales report pipeline. Choose one fault, then press Play.</p>
      <StageRow stage={Math.min(stage, 3)} />
      <GateRow view={(id) => (!finished ? 'idle' : status[id])} />

      <fieldset className="space-y-1.5" disabled={running}>
        <legend className="sr-only">Fault to inject</legend>
        {[{ id: 'none', label: 'No fault (healthy run)' }, ...FAULTS].map((f) => {
          const id = f.id === 'none' ? null : f.id
          return (
            <label key={f.id} className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm ${fault === id ? 'border-spruce bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
              <input type="radio" name="fault" checked={fault === id} onChange={() => { setFault(id); setStage(0) }} className="accent-spruce" />
              <span className="text-ink dark:text-slate-100">{f.label}</span>
            </label>
          )
        })}
      </fieldset>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setStage(1)} disabled={running} className="inline-flex items-center gap-1.5 rounded-xl bg-spruce px-4 py-2 text-sm font-semibold text-white hover:bg-spruce/90 active:scale-[0.98] disabled:opacity-40">
          <Play className="h-4 w-4" aria-hidden /> Play
        </button>
        {(finished || fault) && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset
          </button>
        )}
      </div>

      <p className="min-h-[3rem] rounded-xl bg-mist p-3 text-sm text-ink dark:bg-slate-800/60 dark:text-slate-100" aria-live="polite">
        {!finished && (running ? 'Processing...' : 'Nothing has run yet.')}
        {finished && (picked ? picked.why : 'No fault. All six gates pass.')}
      </p>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-ink dark:text-white">Easily confused pairs</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PAIRS.map((p) => (
            <div key={p.a} className="rounded-xl bg-white p-3 text-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
              <p><strong>{p.a}:</strong> {p.aText}</p>
              <p className="mt-1"><strong>{p.b}:</strong> {p.bText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
