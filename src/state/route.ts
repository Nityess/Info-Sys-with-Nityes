// Tiny hash router: "#/" is the landing page, "#/unit/<id>" opens one lesson or topic,
// "#/section/<id>" opens a Chapter 7 section (the topic board in the teacher preview), "#/chapter8/<id>" a Chapter 8 section board
// (teacher preview). Hash links work on any static host and can be shared as plain URLs.

export type Route = { view: 'home' } | { view: 'unit'; id: string } | { view: 'section'; id: string } | { view: 'chapter8'; id: string }

export const HOME_HASH = '#/'

export const unitHash = (id: string): string => `#/unit/${id}`

export const sectionHash = (id: string): string => `#/section/${id}`

/** Chapter 8 section board (s1 to s3), teacher preview. */
export const chapter8Hash = (sectionId: string): string => `#/chapter8/${sectionId}`

export function parseHash(hash: string): Route {
  const unit = /^#\/unit\/([\w-]+)$/.exec(hash)
  if (unit) return { view: 'unit', id: unit[1] }
  const section = /^#\/section\/(s[1-3])$/.exec(hash)
  if (section) return { view: 'section', id: section[1] }
  const ch8 = /^#\/chapter8\/(s[1-3])$/.exec(hash)
  if (ch8) return { view: 'chapter8', id: ch8[1] }
  return { view: 'home' }
}
