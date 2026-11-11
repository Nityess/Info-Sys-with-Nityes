// Tiny hash router: "#/" is the landing page,
// "#/chapter7" opens the Chapter 7 Information in Business Lab and "#/chapter8" the Chapter 8 MIS Control Lab (also "#/chapter7/<s1-s3>"); add "/<topic>" (for
// example "#/chapter7/s1/1.3") to open one topic. Old "#/section/<s1-s3>" and "#/unit/ch07-t1-3" links open the same page. "#/chapter9" is the Chapter 9 simulator hub and "#/chapter9/1-1" opens one simulator. Hash links work on any static host and can be shared as plain URLs.

export type Route = { view: 'home' } | { view: 'chapter7'; id?: string; topic?: string } | { view: 'chapter8'; id?: string; topic?: string } | { view: 'chapter10' } | { view: 'chapter9' } | { view: 'sim'; slug: string }

export const HOME_HASH = '#/'

/** Chapter 7 Information in Business Lab (the finished interactive page). Old section (s1 to s3) and topic links still open it at that place. */
export const chapter7Hash = (sectionId?: string, topic?: string): string => (sectionId ? `#/chapter7/${sectionId}${topic ? `/${topic}` : ''}` : '#/chapter7')

/** Chapter 8 MIS Control Lab (the finished interactive page). Old section (s1 to s3) and topic links still open it at that place. */
export const chapter8Hash = (sectionId?: string, topic?: string): string => (sectionId ? `#/chapter8/${sectionId}${topic ? `/${topic}` : ''}` : '#/chapter8')

/** Chapter 10 Data Security lab (the finished interactive page, shown inside the site). */
export const chapter10Hash = (): string => '#/chapter10'

/** Chapter 9 Financial technology: the hub of 17 simulators, or one simulator by slug ("1-1" to "2-9"). */
export const chapter9Hash = (slug?: string): string => `#/chapter9${slug ? `/${slug}` : ''}`

export function parseHash(hash: string): Route {
  // Old links: a lesson ("#/unit/ch07-t1-3") or a board section ("#/section/s1/1.3") open the new Chapter 7 page at that place
  const unit = /^#\/unit\/ch07-t(\d)-(\d)$/.exec(hash)
  if (unit) return { view: 'chapter7', id: `s${unit[1]}`, topic: `${unit[1]}.${unit[2]}` }
  if (hash === '#/chapter7') return { view: 'chapter7' }
  const ch7 = /^#\/(?:chapter7|section)\/(s[1-3])(?:\/([\w.]+))?$/.exec(hash)
  if (ch7) return { view: 'chapter7', id: ch7[1], topic: ch7[2] }
  if (hash === '#/chapter8') return { view: 'chapter8' }
  const ch8 = /^#\/chapter8\/(s[1-3])(?:\/([\w.]+))?$/.exec(hash)
  if (ch8) return { view: 'chapter8', id: ch8[1], topic: ch8[2] }
  if (hash === '#/chapter9') return { view: 'chapter9' }
  const sim = /^#\/chapter9\/([12]-\d)$/.exec(hash)
  if (sim) return { view: 'sim', slug: sim[1] }
  if (hash === '#/chapter10') return { view: 'chapter10' }
  return { view: 'home' }
}
