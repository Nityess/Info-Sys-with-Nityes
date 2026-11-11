// Tiny hash router: "#/" is the landing page, "#/unit/<id>" opens one lesson or topic,
// "#/section/<id>" opens a Chapter 7 section board and "#/chapter8/<id>" a Chapter 8 section board; add "/<topic>" (for
// example "#/section/s1/1.3") to open one topic. "#/chapter9" is the Chapter 9 simulator hub and "#/chapter9/1-1" opens one simulator. Hash links work on any static host and can be shared as plain URLs.

export type Route = { view: 'home' } | { view: 'unit'; id: string } | { view: 'section'; id: string; topic?: string } | { view: 'chapter8'; id: string; topic?: string } | { view: 'chapter10' } | { view: 'chapter9' } | { view: 'sim'; slug: string }

export const HOME_HASH = '#/'

export const unitHash = (id: string): string => `#/unit/${id}`

export const sectionHash = (id: string, topic?: string): string => `#/section/${id}${topic ? `/${topic}` : ''}`

/** Chapter 8 section board (s1 to s3), optionally at one topic. */
export const chapter8Hash = (sectionId: string, topic?: string): string => `#/chapter8/${sectionId}${topic ? `/${topic}` : ''}`

/** Chapter 10 Data Security lab (the finished interactive page, shown inside the site). */
export const chapter10Hash = (): string => '#/chapter10'

/** Chapter 9 Financial technology: the hub of 17 simulators, or one simulator by slug ("1-1" to "2-9"). */
export const chapter9Hash = (slug?: string): string => `#/chapter9${slug ? `/${slug}` : ''}`

export function parseHash(hash: string): Route {
  const unit = /^#\/unit\/([\w-]+)$/.exec(hash)
  if (unit) return { view: 'unit', id: unit[1] }
  const section = /^#\/section\/(s[1-3])(?:\/([\w.]+))?$/.exec(hash)
  if (section) return { view: 'section', id: section[1], topic: section[2] }
  const ch8 = /^#\/chapter8\/(s[1-3])(?:\/([\w.]+))?$/.exec(hash)
  if (ch8) return { view: 'chapter8', id: ch8[1], topic: ch8[2] }
  if (hash === '#/chapter9') return { view: 'chapter9' }
  const sim = /^#\/chapter9\/([12]-\d)$/.exec(hash)
  if (sim) return { view: 'sim', slug: sim[1] }
  if (hash === '#/chapter10') return { view: 'chapter10' }
  return { view: 'home' }
}
