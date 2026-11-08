import { describe, expect, it } from 'vitest'
import { missingFromMd } from './mdText'
import { REMEMBER_FRAGMENTS } from './sceneCopy'
import { S1_SOURCE } from './s1Data'

// Scene text must come from content/chapter7.md, never from the design files. Designer wording lives in
// designerText.ts and simpleStories.ts, which are marked pending teacher review and are not checked here.

describe('scene text comes from chapter7.md', () => {
  it('Section 1 scenes', () => {
    expect(missingFromMd(S1_SOURCE)).toEqual([])
  })
  it('the Remember strips', () => {
    expect(missingFromMd(REMEMBER_FRAGMENTS)).toEqual([])
  })
})
