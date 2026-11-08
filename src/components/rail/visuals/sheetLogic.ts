import { CELL_TYPES, FORMULA, FUNCTION } from './s3Data'
import type { CellType } from './s3Data'
import { SAMPLE_SHEET } from './designerText'

export interface SheetCell {
  type: CellType
  /** What the cell shows */
  show: string
  /** What the formula bar shows: the formula itself for formulae and functions */
  content: string
}

export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/** The six filled cells of the mini sheet. C4 and C5 follow B4 and B5. */
export function sheetCells(b4: number, b5: number): Record<string, SheetCell> {
  const sum = fmt(b4 + b5)
  return {
    A4: { type: 'Text', show: SAMPLE_SHEET.A4, content: SAMPLE_SHEET.A4 },
    A5: { type: 'Text', show: SAMPLE_SHEET.A5, content: SAMPLE_SHEET.A5 },
    B4: { type: 'Value', show: fmt(b4), content: String(b4) },
    B5: { type: 'Value', show: fmt(b5), content: String(b5) },
    C4: { type: 'Formula', show: sum, content: FORMULA },
    C5: { type: 'Function', show: sum, content: FUNCTION },
  }
}

/** Steps a value by 100 and never below zero. */
export const bump = (n: number, by: number): number => Math.max(0, n + by)

export const typeNote = (t: CellType): string => CELL_TYPES[t]
