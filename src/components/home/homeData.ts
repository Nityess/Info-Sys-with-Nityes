// Facts shown on the landing page. Every number comes from docs/syllabus.md (exam context
// and LO mark weightings), the Chapter_NN PDF names, or the practice papers noted below.

import { chapter10Hash, chapter8Hash, chapter9Hash } from '../../state/route'

/** Site name, as in the landing page design. */
export const BRAND = 'Info System with ca.nityes'

export const EXAM = {
  paperMarks: 100,
  hours: 3,
  partBMarks: 50,
  outcomes: [
    { lo: 'LO4', chapter: 7, title: 'Role of management information systems', short: 'Role of MIS', marks: 10 },
    { lo: 'LO5', chapter: 8, title: 'Types of management information systems', short: 'Types of MIS', marks: 15 },
    { lo: 'LO6', chapter: 9, title: 'Financial technology and accounting systems', short: 'Financial technology', marks: 15 },
    { lo: 'LO7', chapter: 10, title: 'Importance of data security', short: 'Data security', marks: 10 },
  ],
} as const

/**
 * Part B marks by question type. Counted from the practice papers: IS Pre-Test Sets 1 and 2 each have
 * ten 1-mark and ten 2-mark MCQs (30 marks) and 20 marks of written questions. The syllabus does not
 * state this split. The page shows it as the design does, without a caveat (owner decision, 2026-11-08).
 */
export const PAPER_SPLIT = { objective: 30, subjective: 20 } as const

export function splitPercent(split: { objective: number; subjective: number } = PAPER_SPLIT) {
  const total = split.objective + split.subjective
  const objective = Math.round((split.objective / total) * 100)
  return { objective, subjective: 100 - objective }
}

/** Chapters that open as topic boards (Chapter 8), simulators (Chapter 9) or one finished page (Chapter 10), with the fact line on their card. */
export const BOARD_CHAPTERS = [
  { number: 8, title: 'Types of management information systems', lo: 'LO5', weight: 15, href: chapter8Hash('s1'), row: ['Topic boards', '3 sections'] },
  { number: 9, title: 'Financial technology', lo: 'LO6', weight: 15, href: chapter9Hash(), row: ['Simulators', '17 live'], badge: 'New' },
  { number: 10, title: 'Data security', lo: 'LO7', weight: 10, href: chapter10Hash(), row: ['Topics', '8 in 2 sections'] },
] as const
