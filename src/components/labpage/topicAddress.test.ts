import { describe, expect, it } from 'vitest'
import { chapterPage, pageTopicId } from './topicAddress'

describe('chapter page address', () => {
  it('opens the first topic when nothing is asked', () => {
    expect(chapterPage('chapter8')).toBe('chapter8/index.html')
  })
  it('maps old section links to the first topic of that section', () => {
    expect(pageTopicId('s1')).toBe('t11')
    expect(pageTopicId('s2')).toBe('t21')
    expect(pageTopicId('s3')).toBe('t31')
  })
  it('maps topic codes to the page topic ids', () => {
    expect(pageTopicId('s2', '2.7')).toBe('t27')
    expect(pageTopicId('s2', '2.7.1')).toBe('t271')
    expect(chapterPage('chapter8', 's3', '3.2.4')).toBe('chapter8/index.html#t324')
    expect(chapterPage('chapter7', 's1', '1.3')).toBe('chapter7/index.html#t13')
  })
  it('ignores a topic that is not a code', () => {
    expect(pageTopicId('s1', 'abc')).toBe('t11')
  })
})
