// Facts shown on the landing page. Every number comes from docs/syllabus.md (exam context
// and LO mark weightings), the Chapter_NN PDF names, or the practice papers noted below.

import { chapter10Hash, chapter7Hash, chapter8Hash, chapter9Hash } from '../../state/route'

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

/** Chapters that open as one finished page (Chapters 7, 8 and 10) or as simulators (Chapter 9), with the fact line on their card. */
export const BOARD_CHAPTERS = [
  { number: 7, title: 'Management information systems', lo: 'LO4', weight: 10, href: chapter7Hash(), row: ['Topics', '18 in 3 sections'] },
  { number: 8, title: 'Types of management information systems', lo: 'LO5', weight: 15, href: chapter8Hash(), row: ['Topics', '20 in 3 sections'] },
  { number: 9, title: 'Financial technology', lo: 'LO6', weight: 15, href: chapter9Hash(), row: ['Simulators', '17 live'], badge: 'New' },
  { number: 10, title: 'Data security', lo: 'LO7', weight: 10, href: chapter10Hash(), row: ['Topics', '8 in 2 sections'] },
] as const
