import { describe, expect, it } from 'vitest'
import { FRAME_MAX, FRAME_MIN, clampFrameHeight, contentHeight } from './simFrameLogic'

describe('clampFrameHeight', () => {
  it('rounds up and keeps a normal height', () => {
    expect(clampFrameHeight(1234.2)).toBe(1235)
  })
  it('never goes below the minimum or above the maximum', () => {
    expect(clampFrameHeight(0)).toBe(FRAME_MIN)
    expect(clampFrameHeight(-50)).toBe(FRAME_MIN)
    expect(clampFrameHeight(1e9)).toBe(FRAME_MAX)
  })
  it('falls back to the minimum for a broken measure', () => {
    expect(clampFrameHeight(NaN)).toBe(FRAME_MIN)
    expect(clampFrameHeight(Infinity)).toBe(FRAME_MIN)
  })
})

describe('contentHeight', () => {
  const doc = (root: number, body?: number, bodyScroll = 0) =>
    ({
      documentElement: { getBoundingClientRect: () => ({ height: root }) },
      body: body === undefined ? null : { getBoundingClientRect: () => ({ height: body }), scrollHeight: bodyScroll },
    }) as unknown as Document
  it('takes the larger of the root and body boxes', () => {
    expect(contentHeight(doc(900, 880))).toBe(900)
    expect(contentHeight(doc(100, 880))).toBe(880)
  })
  it('counts content that spills out of the body', () => {
    expect(contentHeight(doc(900, 880, 1200))).toBe(1200)
  })
  it('works when there is no body yet', () => {
    expect(contentHeight(doc(700))).toBe(700)
  })
})
