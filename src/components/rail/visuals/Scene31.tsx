import { useState } from 'react'
import { CELL_EXAM_POINT, CELL_TYPES, FORMULA_VS_FUNCTION } from './s3Data'
import type { CellType } from './s3Data'
import { bump, fmt, sheetCells } from './sheetLogic'
import type { SheetCell } from './sheetLogic'

const COLS = ['A', 'B', 'C', 'D']
const ROWS = [1, 2, 3, 4, 5, 6]

/** 3.1: a clickable mini spreadsheet. Select a cell to see its content type (text, value, formula, function); change B4 and B5 and watch C4 and C5. */
export function Scene31() {
  const [sel, setSel] = useState('A4')
  const [b4, setB4] = useState(1200)
  const [b5, setB5] = useState(800)
  const cells = sheetCells(b4, b5)
  const cur = cells[sel] as SheetCell | undefined
  const type: CellType | 'Empty' = cur?.type ?? 'Empty'
  const stepper = (label: string, value: number, set: (n: number) => void) => (
    <div className="sc-row2" style={{ alignItems: 'center' }}>
      <span>{label}</span>
      <span className="sc-wrap" style={{ gap: '.625rem', flexWrap: 'nowrap' }}>
        <button type="button" className="sc-step-btn" aria-label={`Lower ${label}`} onClick={() => set(bump(value, -100))}>−</button>
        <b style={{ minWidth: '3.5rem', textAlign: 'center' }}>{fmt(value)}</b>
        <button type="button" className="sc-step-btn" aria-label={`Raise ${label}`} onClick={() => set(bump(value, 100))}>+</button>
      </span>
    </div>
  )
  return (
    <div className="sc-two">
      <div className="sc-col" style={{ gap: '.625rem' }}>
        <div className="sc-wrap" style={{ flexWrap: 'nowrap' }}>
          <span className="sc-chip sc-chip-solid" style={{ minWidth: '2.125rem', justifyContent: 'center', color: '#0F1B33' }}>{sel}</span>
          <div className="sc-bx sc-bar-formula" aria-live="polite">{cur?.content ?? ''}</div>
        </div>
        <div className="sc-sheet" role="grid" aria-label="Mini spreadsheet">
          <span className="sc-cc sc-cc-h" />
          {COLS.map((c) => <span key={c} className={`sc-cc sc-cc-h${sel.startsWith(c) ? ' sc-cc-hon' : ''}`}>{c}</span>)}
          {ROWS.map((r) => (
            <div key={r} role="row" style={{ display: 'contents' }}>
              <span className={`sc-cc sc-cc-h${sel.slice(1) === String(r) ? ' sc-cc-hon' : ''}`}>{r}</span>
              {COLS.map((c) => {
                const key = `${c}${r}`
                const cell = cells[key]
                return (
                  <button key={key} type="button" role="gridcell" aria-label={`${key}: ${cell ? cell.type : 'empty'}`} aria-pressed={key === sel} className={`sc-cc${cell ? ` sc-cc-${cell.type.toLowerCase()}` : ''}${key === sel ? ' sc-cc-sel' : ''}`} onClick={() => setSel(key)}>
                    {cell?.show}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <div className="sc-wrap">
          {(Object.keys(CELL_TYPES) as CellType[]).map((t) => <span key={t} className={`sc-chip sc-k-${t.toLowerCase()}`}>{t}</span>)}
        </div>
      </div>
      <div className="sc-col" style={{ gap: '.875rem' }}>
        <div className="sc-bx sc-pad sc-col sc-pop" key={sel} role="status" style={{ gap: '.5rem' }}>
          <span className={`sc-chip sc-k-${type.toLowerCase()}`} style={{ alignSelf: 'flex-start' }}>{type}</span>
          <b className="sc-serif" style={{ fontSize: '1.375rem', fontWeight: 600 }}>Cell {sel}: {type}</b>
          <span>{type === 'Empty' ? 'Nothing here yet.' : CELL_TYPES[type]}</span>
          <span className="sc-fl">{cur ? `Shows ${cur.show}` : 'Empty cell'}</span>
        </div>
        <div className="sc-bx sc-pad sc-col" style={{ gap: '.625rem' }}>
          <span className="sc-fl">Change the values and watch C4 and C5</span>
          {stepper('B4', b4, setB4)}
          {stepper('B5', b5, setB5)}
        </div>
        <div className="sc-rem sc-col" style={{ gap: '.25rem' }}>
          {FORMULA_VS_FUNCTION.map((t) => <span key={t}>{t}</span>)}
          <span style={{ fontWeight: 500 }}>{CELL_EXAM_POINT}</span>
        </div>
      </div>
    </div>
  )
}
