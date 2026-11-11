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

/** The short card title (sentence case, as in the design), the one-line "what is in it" on each Chapter 7 topic card, and the one mnemonic that is not a teaching aid. */
export const TOPIC_CARDS: Record<string, { title: string; key: string; sourceMnemonic?: string }> = {
  '1.1': { title: 'Why businesses need information', key: 'The nine reasons.' },
  '1.2': { title: 'Types of information', key: 'Strategic, tactical, operational, planning.' },
  '1.3': { title: 'Qualities of good information', key: 'What makes information good.' },
  '1.4': { title: 'What makes information valuable', key: 'What makes information worth having.' },
  '1.5': { title: 'Assessing the cost and value of information', key: 'Extra benefits against extra costs.' },
  '1.6': { title: 'IT delivery and IT support', key: 'Delivery, support and management actions.' },
  '1.7': { title: 'Outsourcing', key: 'Definition, benefits and challenges.' },
  '1.8': { title: 'Innovation', key: 'Technology and competitive advantage.' },
  '1.9': { title: 'Information processing', key: 'Six criteria for turning data into information.', sourceMnemonic: 'CATIVA' },
  '2.1': { title: 'Who uses financial information?', key: 'Investors, lenders and other stakeholders.' },
  '2.2': { title: 'When is financial information useful?', key: 'Decision-making, stewardship and underlying assumptions.' },
  '2.3': { title: 'Qualitative characteristics (NFRS)', key: 'Fundamental and enhancing characteristics.' },
  '2.4': { title: 'Cost constraint and limitations', key: 'Why financial reporting has limitations.' },
  '2.5': { title: 'Other sources of financial information', key: 'Where users look beyond published statements.' },
  '3.1': { title: 'Spreadsheets', key: 'Cells, text, values, formulae, functions and workbooks.' },
  '3.2': { title: 'Database systems', key: 'Structured and unstructured data, storage and management.' },
  '3.3': { title: 'Accounting software packages', key: 'Purpose, examples and advantages.' },
  '3.4': { title: 'Computer networks', key: 'Definition, advantages, LAN, WAN and VPN.' },
}

/** The eight parts of a topic as described on the landing page. */
export const HOW_STEPS = [
  { title: 'Hook', text: 'A business question to start.' },
  { title: 'Concept', text: 'The idea in short pieces.' },
  { title: 'Compare and traps', text: 'Look-alike terms side by side.' },
  { title: 'Playground', text: 'Move a control and watch it work. On 8 topics.', gold: true },
  { title: 'Quiz', text: 'One question at a time, with the reason.' },
  { title: 'Write it like the exam', text: 'Build an answer point by point.' },
  { title: 'Revision card', text: 'One card to read before the exam.' },
  { title: 'Mastery checklist', text: 'Tick each skill. Finish to mark the topic done.' },
] as const
