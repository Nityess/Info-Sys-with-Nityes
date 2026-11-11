import { describe, expect, it } from 'vitest'
import { TEXT_PX, defaultSettings, parseSettings } from './settings'

describe('settings', () => {
  it('starts calm', () => {
    expect(defaultSettings()).toEqual({ reduceMotion: false, textSize: 'm' })
  })
  it('ignores old settings left in storage', () => {
    expect(parseSettings({ teacher: true, showSourceQuestions: true, previewNewCh7: true, showBoards: true })).toEqual(defaultSettings())
  })
  it('repairs bad stored data field by field', () => {
    expect(parseSettings(null)).toEqual(defaultSettings())
    expect(parseSettings({ textSize: 'xl', reduceMotion: 'yes' })).toEqual(defaultSettings())
    expect(parseSettings({ textSize: 'l', reduceMotion: true })).toEqual({ textSize: 'l', reduceMotion: true })
  })
  it('maps every text size to a readable pixel size', () => {
    expect(TEXT_PX).toEqual({ s: 15, m: 16, l: 18 })
  })
})
