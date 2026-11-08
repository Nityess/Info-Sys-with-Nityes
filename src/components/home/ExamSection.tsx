import { motion } from 'motion/react'
import { EXAM } from './homeData'

/**
 * The page's one moment: the mark bar draws in when it scrolls into view, once.
 * Widths are marks out of the full paper, so the bar is to scale.
 */
export function ExamSection() {
  const total = EXAM.paperMarks
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl dark:text-white">
          Part B is half of Paper 2
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
          Paper 2 is {EXAM.paperMarks} marks in {EXAM.hours} hours. Information Systems carries {EXAM.partBMarks} of them, across four learning outcomes.
        </p>

        <div className="mt-10" role="img" aria-label={`Marks out of ${total}: Part A ${EXAM.partBMarks}, then ${EXAM.outcomes.map((o) => `${o.lo} ${o.marks}`).join(', ')}`}>
          <div className="flex h-14 overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700">
            <div className="flex items-center justify-center bg-slate-300/70 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200" style={{ width: `${(EXAM.partBMarks / total) * 100}%` }}>
              Part A, assurance
            </div>
            {EXAM.outcomes.map((o, i) => (
              <motion.div
                key={o.lo}
                className={`flex origin-left items-center justify-center text-sm font-bold ${o.tone} ${o.lo === 'LO6' ? 'text-ink' : 'text-white'}`}
                style={{ width: `${(o.marks / total) * 100}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.12 * i, duration: 0.6, ease: 'easeOut' }}
              >
                {o.lo}
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Part A is not covered on this site.</p>
        </div>

        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {EXAM.outcomes.map((o) => {
            return (
              <li key={o.lo} className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${o.tone}`} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink dark:text-white">
                    {o.lo}: {o.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                    {o.marks} marks, taught in chapter {o.chapter}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
