import type { Section } from '../../content/chapter7/types'
import { Markdown } from './Markdown'

/** The one-minute revision card: a clean, screenshot-friendly summary with the topic named on it. */
export function RevisionCard({ section, code, title }: { section: Section | undefined; code: string; title: string }) {
  if (!section) return <p>No revision card for this topic yet.</p>
  return (
    <figure className="rounded-3xl bg-ink p-5 text-white shadow-lg dark:bg-slate-800">
      <figcaption className="mb-3 text-sm text-slate-300">
        <span className="font-semibold text-white">{code}</span> {title}
      </figcaption>
      <Markdown md={section.md} className="rev-card text-slate-100 [&_code]:bg-white/10 [&_strong]:text-white" />
    </figure>
  )
}
