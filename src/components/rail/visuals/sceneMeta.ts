import { TOPICS } from '../../../content/chapters/ch07/topics'
import type { SectionId } from '../../../content/chapters/ch07/topics'
import { TOPIC_CARDS } from '../../home/homeData'

export interface SceneTopic {
  /** "1.2", or "start" for the Section 3 information system loop */
  code: string
  section: SectionId
  /** Icon name from iconData */
  icon: string
  name: string
  /** One line under the name */
  line: string
  /** Topic 1.1 has no content yet: its tab shows a locked "Coming soon" card */
  locked?: boolean
}

const ICONS: Record<string, string> = {
  '1.1': 'lock', '1.2': 'people', '1.3': 'check', '1.4': 'search', '1.5': 'scales', '1.6': 'server', '1.7': 'link', '1.8': 'rocket', '1.9': 'gear',
  '2.1': 'people', '2.2': 'camera', '2.3': 'scales', '2.4': 'money', '2.5': 'folder',
  start: 'cart', '3.1': 'table', '3.2': 'database', '3.3': 'calc', '3.4': 'wifi',
}

const fromCards = (code: string, section: SectionId): SceneTopic => ({
  code,
  section,
  icon: ICONS[code],
  name: TOPIC_CARDS[code].title,
  line: TOPIC_CARDS[code].key,
  locked: code === '1.1',
})

/** Scene tabs of every section, in order. The Section 3 "Start" tab is the information system loop that opens the section. */
export const SCENE_TOPICS: readonly SceneTopic[] = [
  ...TOPICS.filter((t) => t.section === 's1').map((t) => fromCards(t.code, 's1')),
  ...TOPICS.filter((t) => t.section === 's2').map((t) => fromCards(t.code, 's2')),
  { code: 'start', section: 's3', icon: ICONS.start, name: 'How an Information System works', line: 'Collection → Storage → Production → Distribution' },
  ...TOPICS.filter((t) => t.section === 's3').map((t) => fromCards(t.code, 's3')),
]

export const scenesOf = (section: SectionId): SceneTopic[] => SCENE_TOPICS.filter((s) => s.section === section)

export const sceneTopic = (code: string): SceneTopic | undefined => SCENE_TOPICS.find((s) => s.code === code)

/** Teaching-aid chip: ACCURATE, SEAR and MPSS are teaching aids; CATIVA is the source's own mnemonic. */
export function aidLabel(code: string): string | undefined {
  const aid = TOPICS.find((t) => t.code === code)?.teachingAid
  if (aid) return `${aid} · teaching aid`
  const source = TOPIC_CARDS[code]?.sourceMnemonic
  return source ? `${source} · source mnemonic` : undefined
}

/** Previous or next tab within a section, wrapping round. */
export function stepScene(list: readonly SceneTopic[], code: string, by: 1 | -1): string {
  const at = Math.max(0, list.findIndex((s) => s.code === code))
  return list[(at + by + list.length) % list.length].code
}
