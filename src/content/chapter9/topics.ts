// Chapter 9 Financial technology (LO6): one live simulator per topic, each a finished page in public/sims/chapter-09/.
// Source: full app/content/content-map.json. Businesses and numbers inside the simulators are made up for teaching.

export interface SimSection {
  id: '1' | '2'
  title: string
}

export interface SimTopic {
  /** URL part and file name: "1-1" is public/sims/chapter-09/1-1.html */
  slug: string
  /** Study-note number, for example "2.5" */
  number: string
  /** The syllabus topic name */
  topic: string
  /** The simulator's own title */
  title: string
  section: SimSection['id']
  /** False until the page exists in public/sims/chapter-09/ (the hub shows "Coming soon", with no link) */
  ready: boolean
}

export const SIM_SECTIONS: readonly SimSection[] = [
  { id: '1', title: 'Developments in financial technology' },
  { id: '2', title: 'Effects on the accountant' },
]

export const SIM_TOPICS: readonly SimTopic[] = [
  { slug: '1-1', number: '1.1', topic: 'Big data and the four Vs', title: 'Winter Stock Decision Centre', section: '1', ready: true },
  { slug: '1-2', number: '1.2', topic: 'Types of big data', title: 'Data Sorting Room', section: '1', ready: true },
  { slug: '1-3', number: '1.3', topic: 'Sources of big data', title: 'Data Source Discovery Map', section: '1', ready: true },
  { slug: '1-4', number: '1.4', topic: 'Importance of big data and data science', title: 'Data to Product Factory', section: '1', ready: true },
  { slug: '1-5', number: '1.5', topic: 'Data analytics and data mining', title: 'Find the Best Category', section: '1', ready: true },
  { slug: '1-6', number: '1.6', topic: 'Benefits of big data', title: 'Anita’s Boardroom', section: '1', ready: true },
  { slug: '1-7', number: '1.7', topic: 'Risks of big data', title: 'Data Risk Investigation', section: '1', ready: true },
  { slug: '1-8', number: '1.8', topic: 'Intelligent systems and automation', title: 'AI Customer Service Lab', section: '1', ready: true },
  { slug: '2-1', number: '2.1', topic: 'Cloud computing and cloud accounting', title: 'Himal Textiles Office Showdown', section: '2', ready: true },
  { slug: '2-2', number: '2.2', topic: 'The internet of things', title: 'Smart Factory Control Room', section: '2', ready: true },
  { slug: '2-3', number: '2.3', topic: 'Digital assets', title: 'Digital Asset Scanner', section: '2', ready: true },
  { slug: '2-4', number: '2.4', topic: 'Distributed ledger technology', title: 'Diamond Ledger Network', section: '2', ready: true },
  { slug: '2-5', number: '2.5', topic: 'Blockchain', title: 'Build Your Own Blockchain', section: '2', ready: true },
  { slug: '2-6', number: '2.6', topic: 'Fintech', title: 'Bikash’s Money Week', section: '2', ready: true },
  { slug: '2-7', number: '2.7', topic: 'Crypto currencies', title: 'Pay Without a Bank', section: '2', ready: true },
  { slug: '2-8', number: '2.8', topic: 'Cognitive technologies: AI, machine learning and RPA', title: 'Intelligent Automation Lab', section: '2', ready: true },
  { slug: '2-9', number: '2.9', topic: 'Shared service centres', title: 'Back Office Shake-Up', section: '2', ready: true },
]

export const findSim = (slug: string): SimTopic | undefined => SIM_TOPICS.find((t) => t.slug === slug)

/** The progress id used for a simulator in the "started" set, so it shares the app's one progress store. */
export const simProgressId = (slug: string): string => `ch09-${slug}`

/** Where the simulator page lives (served as a static file, same origin as the app). */
export const simSrc = (slug: string, base: string = import.meta.env.BASE_URL): string => `${base}sims/chapter-09/${slug}.html`

/** Topics a student can open, in study order. */
export const readySims = (): SimTopic[] => SIM_TOPICS.filter((t) => t.ready)

/** Previous and next playable simulator around a slug (null at the ends). */
export function simNeighbours(slug: string): { prev: SimTopic | null; next: SimTopic | null } {
  const list = readySims()
  const i = list.findIndex((t) => t.slug === slug)
  if (i < 0) return { prev: null, next: null }
  return { prev: list[i - 1] ?? null, next: list[i + 1] ?? null }
}

/** How many playable simulators the student has opened, out of how many exist. */
export function exploredCount(started: ReadonlySet<string>): { explored: number; total: number } {
  const total = SIM_TOPICS.length
  return { explored: SIM_TOPICS.filter((t) => started.has(simProgressId(t.slug))).length, total }
}
