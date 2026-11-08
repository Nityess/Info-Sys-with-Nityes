import { motion } from 'motion/react'
import { Lightbulb, PenLine, Star } from 'lucide-react'
import { clueParts } from './conceptCard'
import type { ConceptCard } from './conceptCard'
import { Inline } from './Markdown'

/** The memory clue drawn as a formula: the concept's name, an equals sign, then its key pieces joining one by one. */
function Picture({ name, pieces }: { name: string; pieces: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="img" aria-label={`${name}: ${pieces.join(', ')}`}>
      <span className="rounded-xl bg-ink px-3 py-1.5 text-sm font-bold text-white dark:bg-white dark:text-ink">{name}</span>
      <span aria-hidden className="text-lg font-bold text-slate-500">=</span>
      {pieces.map((p, i) => (
        <motion.span key={p} className="flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.14, duration: 0.3 }}>
          {i > 0 && <span aria-hidden className="text-lg font-bold text-slate-500">+</span>}
          <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">{p}</span>
        </motion.span>
      ))}
    </div>
  )
}

function Block({ title, icon, tone, children }: { title: string; icon: React.ReactNode; tone: string; children: React.ReactNode }) {
  return (
    <section className={`rounded-2xl p-3.5 ${tone}`}>
      <h6 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
        {icon}
        {title}
      </h6>
      <div className="space-y-1.5 text-[0.95rem] leading-relaxed text-ink dark:text-slate-100">{children}</div>
    </section>
  )
}

interface Props {
  card: ConceptCard
  /** Position among the cards, for "Concept 3 of 8" */
  index: number
  total: number
}

/** One concept as a short card: a picture of the memory clue, the exam-ready wording, and an easy example. */
export function ConceptCardView({ card, index, total }: Props) {
  const pieces = clueParts(card.clue)
  return (
    <article className="space-y-3" aria-label={card.name}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Concept {index} of {total}</p>
      <h5 className="font-display text-2xl font-semibold text-ink dark:text-white">{card.name}</h5>
      {pieces.length > 0 && <Picture key={card.name} name={card.name} pieces={pieces} />}
      <Block title="Exam-ready" icon={<PenLine className="h-4 w-4" aria-hidden />} tone="bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
        {card.definition && <p className="font-semibold"><Inline text={card.definition} /></p>}
        {card.points.length > 0 && (
          <ul className="list-disc space-y-0.5 pl-5">
            {card.points.map((p) => <li key={p}><Inline text={p} /></li>)}
          </ul>
        )}
      </Block>
      {card.example && (
        <Block title="Easy example" icon={<Lightbulb className="h-4 w-4" aria-hidden />} tone="bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          <p><Inline text={card.example} /></p>
        </Block>
      )}
      {card.exam && (
        <Block title="Exam point" icon={<Star className="h-4 w-4" aria-hidden />} tone="bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
          <p><Inline text={card.exam} /></p>
        </Block>
      )}
    </article>
  )
}
