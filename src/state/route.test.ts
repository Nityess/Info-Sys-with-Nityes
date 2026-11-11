import { describe, expect, it } from 'vitest'
import { HOME_HASH, parseHash, chapter10Hash, chapter9Hash, chapter8Hash, chapter7Hash } from './route'

describe('hash route', () => {
  it('treats empty and unknown hashes as home', () => {
    expect(parseHash('')).toEqual({ view: 'home' })
    expect(parseHash(HOME_HASH)).toEqual({ view: 'home' })
    expect(parseHash('#/nope')).toEqual({ view: 'home' })
    expect(parseHash('#/unit/')).toEqual({ view: 'home' })
  })
  it('parses the Chapter 7 lab page, and section and topic links', () => {
    expect(parseHash(chapter7Hash())).toEqual({ view: 'chapter7' })
    expect(parseHash(chapter7Hash('s2'))).toEqual({ view: 'chapter7', id: 's2', topic: undefined })
    expect(parseHash(chapter7Hash('s1', '1.3'))).toEqual({ view: 'chapter7', id: 's1', topic: '1.3' })
    expect(parseHash('#/chapter7/s4')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter7/')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter7/s1/<x>')).toEqual({ view: 'home' })
  })
  it('sends old Chapter 7 board and lesson links to the new page at the same place', () => {
    expect(parseHash('#/section/s2')).toEqual({ view: 'chapter7', id: 's2', topic: undefined })
    expect(parseHash('#/section/s1/1.3')).toEqual({ view: 'chapter7', id: 's1', topic: '1.3' })
    expect(parseHash('#/unit/ch07-t1-5')).toEqual({ view: 'chapter7', id: 's1', topic: '1.5' })
    expect(parseHash('#/unit/ch07-t3-4')).toEqual({ view: 'chapter7', id: 's3', topic: '3.4' })
    expect(parseHash('#/section/s4')).toEqual({ view: 'home' })
  })
  it('parses the Chapter 8 lab page, and old section links for the three sections only', () => {
    expect(parseHash(chapter8Hash())).toEqual({ view: 'chapter8' })
    expect(parseHash(chapter8Hash('s1'))).toMatchObject({ view: 'chapter8', id: 's1' })
    expect(parseHash(chapter8Hash('s3', '3.6'))).toEqual({ view: 'chapter8', id: 's3', topic: '3.6' })
    expect(parseHash('#/chapter8/s3')).toMatchObject({ view: 'chapter8', id: 's3' })
    expect(parseHash('#/chapter8/s4')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter8/')).toEqual({ view: 'home' })
  })
  it('parses the Chapter 10 lab page', () => {
    expect(parseHash(chapter10Hash())).toEqual({ view: 'chapter10' })
    expect(parseHash('#/chapter10/x')).toEqual({ view: 'home' })
  })
  it('rejects ids with odd characters', () => {
    expect(parseHash('#/unit/a/b')).toEqual({ view: 'home' })
    expect(parseHash('#/unit/<script>')).toEqual({ view: 'home' })
  })
})

describe('Chapter 9 routes', () => {
  it('parses the hub and one simulator', () => {
    expect(parseHash(chapter9Hash())).toEqual({ view: 'chapter9' })
    expect(parseHash(chapter9Hash('2-5'))).toEqual({ view: 'sim', slug: '2-5' })
  })
  it('sends a malformed simulator slug home', () => {
    expect(parseHash('#/chapter9/')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter9/3-1')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter9/1-12')).toEqual({ view: 'home' })
    expect(parseHash('#/chapter9/<x>')).toEqual({ view: 'home' })
  })
})
