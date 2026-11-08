import { describe, expect, it } from 'vitest'
import { TEXT_PX, defaultSettings, effectiveSettings, parseSettings } from './settings'

describe('settings', () => {
  it('starts calm and student-safe', () => {
    expect(defaultSettings()).toEqual({
      reduceMotion: false,
      textSize: 'm',
      teacher: false,
      previewNewCh7: false,
      showSourceQuestions: false,
    })
  })
  it('hides teacher-only switches unless teacher mode is on', () => {
    const s = { ...defaultSettings(), previewNewCh7: true, showSourceQuestions: true }
    expect(effectiveSettings(s)).toMatchObject({ previewNewCh7: false, showSourceQuestions: false })
    expect(effectiveSettings({ ...s, teacher: true })).toMatchObject({ previewNewCh7: true, showSourceQuestions: true })
  })
  it('repairs bad stored data field by field', () => {
    expect(parseSettings(null)).toEqual(defaultSettings())
    expect(parseSettings({ textSize: 'xl', reduceMotion: 'yes', teacher: true })).toEqual({
      ...defaultSettings(),
      teacher: true,
    })
    expect(parseSettings({ textSize: 'l', reduceMotion: true }).textSize).toBe('l')
  })
  it('maps every text size to a readable pixel size', () => {
    expect(TEXT_PX).toEqual({ s: 15, m: 16, l: 18 })
  })
})
