import { useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { DEFECTS, QUALITIES, REPORT, litIndexes } from './accurate'

function Letters({ lit }: { lit: ReadonlySet<number> }) {
  return (
    <ol className="grid grid-cols-8 gap-1" aria-label="ACCURATE letters">
      {QUALITIES.map((q, i) => (
        <li key={q.name} className={`rounded-lg py-1.5 text-center font-display text-lg font-semibold transition ${lit.has(i) ? 'bg-coral text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`} title={q.name}>
          {q.letter}
        </li>
      ))}
    </ol>
  )
}

/** Topic 1.3 playground: tap the problems in a sample CEO report and see which ACCURATE quality is missing. */
export function ReportDoctor() {
  const [found, setFound] = useState<ReadonlySet<string>>(new Set())
  const [last, setLast] = useState<string | null>(null)
  const tap = (id: string) => {
    setLast(id)
    if (REPORT.find((l) => l.id === id)?.missing) setFound(new Set([...found, id]))
  }
  const line = REPORT.find((l) => l.id === last)
  const done = found.size === DEFECTS.length

  return (
    <div className="space-y-3">
      <Letters lit={litIndexes(found)} />
      <ul className="space-y-1.5 rounded-2xl bg-mist p-3 dark:bg-slate-800/60" aria-label="Sample CEO report">
        {REPORT.map((l) => {
          const hit = found.has(l.id)
          return (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => tap(l.id)}
                aria-pressed={hit}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${hit ? 'bg-rose-100 text-ink ring-2 ring-coral dark:bg-rose-950/40 dark:text-white' : 'bg-white text-ink hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800'}`}
              >
                {l.text}
                {hit && <span className="ml-2 rounded-full bg-coral px-2 py-0.5 text-xs font-semibold text-white">{l.missing} missing</span>}
              </button>
            </li>
          )
        })}
      </ul>
      <div aria-live="polite" className="min-h-[3rem]">
        {line && (
          <motion.p key={line.id + found.size} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white p-3 text-sm text-ink ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700">
            {line.missing ? <><strong>{line.missing} is missing.</strong> Fix: {line.fix}</> : line.fix}
          </motion.p>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{done ? 'All five found. Each broke a different quality.' : `Found ${found.size} of ${DEFECTS.length} problems`}</span>
        {(found.size > 0 || last) && (
          <button type="button" onClick={() => { setFound(new Set()); setLast(null) }} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-4 w-4" aria-hidden /> Start again
          </button>
        )}
      </div>
    </div>
  )
}
