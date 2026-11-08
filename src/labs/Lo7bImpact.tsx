import { useState } from 'react'
import { IMPLICATIONS, INCIDENTS } from './lo7bLogic'

/** Visualizer: pick an incident and see which implications light up. */
export function Lo7bVisualizer() {
  const [incidentId, setIncidentId] = useState(INCIDENTS[0].id)
  const incident = INCIDENTS.find((i) => i.id === incidentId) ?? INCIDENTS[0]

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-semibold">Incident → impact</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Cyber-risk = IT failure leading to financial loss, disruption or reputation damage. Pick an incident.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an incident">
        {INCIDENTS.map((inc) => (
          <button
            key={inc.id}
            type="button"
            aria-pressed={inc.id === incidentId}
            onClick={() => setIncidentId(inc.id)}
            className={`rounded-full px-3 py-1 text-sm ${
              inc.id === incidentId
                ? 'bg-indigo-600 text-white'
                : 'ring-1 ring-slate-300 hover:bg-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800'
            }`}
          >
            {inc.title}
          </button>
        ))}
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-slate-800 dark:bg-amber-900/30 dark:text-amber-100">
        <p>{incident.story}</p>
        <p className="mt-1 text-xs opacity-75">Based on: {incident.source}</p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-live="polite">
        {IMPLICATIONS.map((imp) => {
          const reason = incident.impacts[imp.id]
          const hit = reason !== undefined
          return (
            <li
              key={imp.id}
              className={`rounded-md border p-3 text-sm transition-opacity ${
                hit
                  ? 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-900/30'
                  : 'border-slate-200 opacity-50 dark:border-slate-700'
              }`}
            >
              <p className="flex items-center gap-2 font-medium">
                <span aria-hidden>{imp.icon}</span>
                {imp.label}
                <span className="sr-only">{hit ? ': applies' : ': not triggered'}</span>
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{hit ? reason : imp.summary}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{imp.source}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
