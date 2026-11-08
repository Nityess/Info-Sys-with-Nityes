import { describe, expect, it } from 'vitest'
import { HOME_HASH, parseHash, scenesHash, sectionHash, unitHash } from './route'

describe('hash route', () => {
  it('treats empty and unknown hashes as home', () => {
    expect(parseHash('')).toEqual({ view: 'home' })
    expect(parseHash(HOME_HASH)).toEqual({ view: 'home' })
    expect(parseHash('#/nope')).toEqual({ view: 'home' })
    expect(parseHash('#/unit/')).toEqual({ view: 'home' })
  })
  it('round-trips a unit id', () => {
    expect(parseHash(unitHash('ch07-accurate'))).toEqual({ view: 'unit', id: 'ch07-accurate' })
    expect(parseHash(unitHash('ch10-lo7a'))).toEqual({ view: 'unit', id: 'ch10-lo7a' })
  })
  it('parses section links, and only the three real sections', () => {
    expect(parseHash(sectionHash('s2'))).toEqual({ view: 'section', id: 's2' })
    expect(parseHash('#/section/s4')).toEqual({ view: 'home' })
    expect(parseHash('#/section/')).toEqual({ view: 'home' })
  })
  it('parses the teacher scene pages for the three sections only', () => {
    expect(parseHash(scenesHash('s1'))).toEqual({ view: 'scenes', id: 's1' })
    expect(parseHash('#/scenes/s3')).toEqual({ view: 'scenes', id: 's3' })
    expect(parseHash('#/scenes/s4')).toEqual({ view: 'home' })
    expect(parseHash('#/scenes/')).toEqual({ view: 'home' })
  })
  it('rejects ids with odd characters', () => {
    expect(parseHash('#/unit/a/b')).toEqual({ view: 'home' })
    expect(parseHash('#/unit/<script>')).toEqual({ view: 'home' })
  })
})
