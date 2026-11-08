import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { NetValueScale } from './NetValueScale'
import { PRESETS, SLIDER_MAX, SLIDER_STEP, VERDICT_TEXT, formatNpr, netValue, verdictOf } from './netValue'

const START = { benefit: 100000, cost: 60000 }

function Slider({ label, value, onChange, disabled }: { label: string; value: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium text-ink dark:text-slate-100">
        {label}
        <span className="tabular-nums">{formatNpr(value)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={SLIDER_MAX}
        step={SLIDER_STEP}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-2 w-full cursor-pointer accent-spruce disabled:cursor-not-allowed disabled:opacity-40"
      />
    </label>
  )
}

/** Topic 1.5 playground: move the two sliders and watch the scale and the net value. */
export function IsItWorthIt() {
  const [benefit, setBenefit] = useState(START.benefit)
  const [cost, setCost] = useState(START.cost)
  const [owned, setOwned] = useState(false)
  const shownCost = owned ? 0 : cost
  const verdict = verdictOf(netValue(benefit, shownCost))

  const reset = () => {
    setBenefit(START.benefit)
    setCost(START.cost)
    setOwned(false)
  }

  return (
    <div className="space-y-4">
      <NetValueScale extraBenefit={benefit} extraCost={shownCost} />
      <p className="text-center text-sm font-medium text-ink dark:text-slate-100" aria-live="polite">{VERDICT_TEXT[verdict]}</p>

      <div className="space-y-3 rounded-2xl bg-mist p-4 dark:bg-slate-800/60">
        <Slider label="Extra benefit" value={benefit} onChange={setBenefit} />
        <Slider label="Extra cost" value={shownCost} onChange={setCost} disabled={owned} />
        <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm">
          <input type="checkbox" role="switch" checked={owned} onChange={(e) => setOwned(e.target.checked)} className="mt-0.5 h-5 w-5 accent-spruce" />
          <span>
            <span className="font-medium text-ink dark:text-slate-100">Already own the MIS</span>
            <span className="block text-slate-600 dark:text-slate-400">Cost of one more enquiry is about zero.</span>
          </span>
        </label>
        {owned && <p className="rounded-xl bg-white p-3 text-sm dark:bg-slate-900">The cost of the whole MIS is not zero. Only the extra cost of one more enquiry is.</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Try the examples:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setBenefit(p.benefit)
              setCost(p.cost)
              setOwned(false)
            }}
            className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-ink hover:bg-slate-100 active:scale-[0.98] dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {p.label}
          </button>
        ))}
        <button type="button" onClick={reset} className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset
        </button>
      </div>

      <p className="rounded-xl border-l-4 border-spruce bg-emerald-50 px-4 py-2 text-sm text-ink dark:bg-emerald-950/30 dark:text-slate-100">
        Net value = extra benefits − extra costs. The information is worth obtaining when it is positive.
      </p>
    </div>
  )
}
