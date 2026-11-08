import type { Chapter } from '../../content/types'
import { SECTIONS, TOPICS, displayTitle, topicId } from '../../content/chapters/ch07/topics'
import { topicHref } from '../home/homeLogic'

export type DrawerRow =
  | { kind: 'heading'; text: string }
  | { kind: 'topic'; code: string; title: string; href: string | null; current: boolean; tag: 'Here' | 'Soon' | 'Done' | '' }

/**
 * The topic list for the drawer: 18 topics under their three sections. A topic is a link only when it is
 * playable in the chapters being shown (so students never get a link to an unfinished topic); the rest say "Soon".
 */
export function drawerRows(chapters: readonly Chapter[], currentCode: string, done: ReadonlySet<string>): DrawerRow[] {
  return SECTIONS.flatMap((s, i): DrawerRow[] => [
    { kind: 'heading', text: `Section ${i + 1} · ${s.title}` },
    ...TOPICS.filter((t) => t.section === s.id).map((t): DrawerRow => {
      const href = topicHref(chapters, t.code)
      const current = t.code === currentCode
      const tag = current ? 'Here' : !href ? 'Soon' : done.has(topicId(t.code)) ? 'Done' : ''
      return { kind: 'topic', code: t.code, title: displayTitle(t), href, current, tag }
    }),
  ])
}
