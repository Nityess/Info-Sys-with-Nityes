import { useState } from 'react'
import { ShieldCheck, ShieldX } from 'lucide-react'
import { CONTROLS, THREATS, blockedCount, isBlocked } from './lo7cLogic'
import type { ControlId } from './lo7cLogic'

/** Visualizer: switch the five controls on and see which threats they stop. */
export function Lo7cVisualizer() {
  const [enabled, setEnabled] = useState<ReadonlySet<ControlId>>(new Set())
  const blocked = blockedCount(enabled)

  const toggle = (id: ControlId) => {
    const next = new Set(enabled)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setEnabled(next)
  }

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-semibold">Five controls</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Switch controls on. Which threats still get through?</p>
      </div>

      <ul className="space-y-2">
        {CONTROLS.map((c) => {
          const on = enabled.has(c.id)
          return (
            <li key={c.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-2 text-sm dark:border-slate-700">
                <input
                  type="checkbox"
                  role="switch"
                  checked={on}
                  onChange={() => toggle(c.id)}
                  className="mt-1 h-4 w-4 accent-indigo-600"
                />
                <span>
                  <span className="font-medium">
                    <span aria-hidden>{c.icon}</span> {c.label}
                  </span>
                  <span className="block text-slate-600 dark:text-slate-400">{c.what}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>

      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium">Threats</span>
          <span aria-live="polite">
            {blocked} / {THREATS.length} blocked
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded bg-slate-200 dark:bg-slate-700" aria-hidden>
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(blocked / THREATS.length) * 100}%` }} />
        </div>
        <ul className="mt-2 space-y-1">
          {THREATS.map((t) => {
            const ok = isBlocked(t, enabled)
            return (
              <li
                key={t.id}
                className={`flex items-center gap-2 rounded px-2 py-1 text-sm ${
                  ok
                    ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100'
                    : 'bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100'
                }`}
              >
                {ok ? <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden /> : <ShieldX className="h-4 w-4 shrink-0" aria-hidden />}
                <span>
                  {t.text}
                  <span className="sr-only">{ok ? ': blocked' : ': gets through'}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">Source: Ch10 §1.2 technical controls, §2.5 preventing attacks</p>
    </div>
  )
}
