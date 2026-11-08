import { describe, expect, it } from 'vitest'
import { bump, fmt, sheetCells } from './sheetLogic'

describe('mini spreadsheet', () => {
  it('formats thousands', () => {
    expect(fmt(800)).toBe('800')
    expect(fmt(1200)).toBe('1,200')
    expect(fmt(1234567)).toBe('1,234,567')
  })
  it('C4 (formula) and C5 (function) add B4 and B5, and follow them', () => {
    const a = sheetCells(1200, 800)
    expect(a.C4).toEqual({ type: 'Formula', show: '2,000', content: '=B4+B5' })
    expect(a.C5).toEqual({ type: 'Function', show: '2,000', content: '=SUM(B4:B10)' })
    expect(sheetCells(1300, 800).C4.show).toBe('2,100')
  })
  it('labels the four content types', () => {
    const types = Object.values(sheetCells(1, 2)).map((c) => c.type)
    expect(new Set(types)).toEqual(new Set(['Text', 'Value', 'Formula', 'Function']))
  })
  it('never goes below zero', () => {
    expect(bump(50, -100)).toBe(0)
    expect(bump(800, 100)).toBe(900)
  })
})
