// Tiny hash router: "#/" is the landing page, "#/unit/<id>" opens one lesson or topic,
// "#/section/<id>" opens a section overview, "#/scenes/<id>" the teacher preview of its concept scenes. Hash links work on any static host and
// can be shared as plain URLs.

export type Route = { view: 'home' } | { view: 'unit'; id: string } | { view: 'section'; id: string } | { view: 'scenes'; id: string }

export const HOME_HASH = '#/'

export const unitHash = (id: string): string => `#/unit/${id}`

export const sectionHash = (id: string): string => `#/section/${id}`

/** Teacher preview of the animated concept scenes of one section (s1 to s3). */
export const scenesHash = (sectionId: string): string => `#/scenes/${sectionId}`

export function parseHash(hash: string): Route {
  const unit = /^#\/unit\/([\w-]+)$/.exec(hash)
  if (unit) return { view: 'unit', id: unit[1] }
  const section = /^#\/section\/(s[1-3])$/.exec(hash)
  if (section) return { view: 'section', id: section[1] }
  const scenes = /^#\/scenes\/(s[1-3])$/.exec(hash)
  if (scenes) return { view: 'scenes', id: scenes[1] }
  return { view: 'home' }
}
