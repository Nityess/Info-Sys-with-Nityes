import { useState } from 'react'
import { motion } from 'motion/react'

// The activity lists are the topic's own: five IT Delivery, four IT Support (revision card), four MPSS actions
const SERVE = [
  'IT service operations',
  'Capacity monitoring and management',
  'Customer billing and budgeting',
  'Business operations availability to agreed service levels',
  'Service continuity / contingency management',
]
const PROTECT = [
  'Infrastructure configuration',
  'Physical and logical integrity',
  'Security and access control',
  'Incident prevention, investigation and resolution',
]
const MPSS = [
  { name: 'Monitoring', focus: 'Stay aware of technological developments.' },
  { name: 'Planning', focus: 'Implement changes smoothly.' },
  { name: 'Structure', focus: 'Prioritise and document IT activities.' },
  { name: 'Staffing & Skills', focus: 'Have the right people with the right skills.' },
]

function Column({ title, tag, items, tone }: { title: string; tag: string; items: string[]; tone: string }) {
  return (
    <div className={`rounded-2xl p-3 ${tone}`}>
      <p className="font-display text-lg font-semibold text-ink dark:text-white">{title}</p>
      <p className="mb-2 text-xs text-slate-700 dark:text-slate-300">{tag}</p>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <motion.li key={it} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-lg bg-white/90 px-2.5 py-1.5 text-sm text-ink dark:bg-slate-900/80 dark:text-slate-100">
            {it}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/** Split-screen bank: SERVE (IT Delivery) beside PROTECT (IT Support), then the four MPSS actions on a rolling timeline. */
export function ServeProtect() {
  const [at, setAt] = useState(0)
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Column title="SERVE" tag="IT Delivery: make IT services available" items={SERVE} tone="bg-blue-50 dark:bg-blue-950/30" />
        <Column title="PROTECT" tag="IT Support: maintain and protect the infrastructure" items={PROTECT} tone="bg-teal-50 dark:bg-teal-950/30" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-ink dark:text-white">Management actions (MPSS): tap each step</p>
        <ol className="flex gap-1.5 overflow-x-auto pb-1">
          {MPSS.map((m, i) => (
            <li key={m.name} className="flex-1">
              <button
                type="button"
                aria-current={i === at}
                onClick={() => setAt(i)}
                className={`flex w-full min-w-[5.5rem] flex-col items-center rounded-xl px-2 py-2 text-xs font-semibold transition ${i === at ? 'bg-ink text-white dark:bg-white dark:text-ink' : i < at ? 'bg-spruce/15 text-spruce' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                <span className="text-base">{m.name[0]}</span>
                {m.name}
              </button>
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-mist p-3 text-sm text-ink dark:bg-slate-800/60 dark:text-slate-100" aria-live="polite">
          <strong>{MPSS[at].name}:</strong> {MPSS[at].focus}
        </p>
      </div>
    </div>
  )
}
