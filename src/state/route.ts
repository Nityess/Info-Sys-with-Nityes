// Tiny hash router: "#/" is the landing page, "#/unit/<id>" opens one lesson.
// Hash links work on any static host and can be shared as plain URLs.

export type Route = { view: 'home' } | { view: 'unit'; id: string }

export const HOME_HASH = '#/'

export const unitHash = (id: string): string => `#/unit/${id}`

export function parseHash(hash: string): Route {
  const m = /^#\/unit\/([\w-]+)$/.exec(hash)
  return m ? { view: 'unit', id: m[1] } : { view: 'home' }
}
