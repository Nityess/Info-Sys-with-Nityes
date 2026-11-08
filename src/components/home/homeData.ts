// Facts shown on the landing page. Every number comes from docs/syllabus.md (exam context
// and LO mark weightings), the Chapter_NN PDF names, or the practice papers noted below.

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
 * state this split, so the page says "in the practice papers".
 */
export const PAPER_SPLIT = { objective: 30, subjective: 20 } as const

export function splitPercent(split: { objective: number; subjective: number } = PAPER_SPLIT) {
  const total = split.objective + split.subjective
  const objective = Math.round((split.objective / total) * 100)
  return { objective, subjective: 100 - objective }
}

/** Chapters whose lessons are not built yet. They show as coming soon, with no button. */
export const COMING_SOON = [
  { number: 8, title: 'Types of management information systems', lo: 'LO5', weight: 15 },
  { number: 9, title: 'Financial technology', lo: 'LO6', weight: 15 },
] as const

/** The one-line "what is in it" on each Chapter 7 topic card, and the one mnemonic that is not a teaching aid. */
export const TOPIC_CARDS: Record<string, { key: string; sourceMnemonic?: string }> = {
  '1.1': { key: 'The nine reasons.' },
  '1.2': { key: 'Strategic, tactical, operational, planning.' },
  '1.3': { key: 'What makes information good.' },
  '1.4': { key: 'What makes information worth having.' },
  '1.5': { key: 'Extra benefits against extra costs.' },
  '1.6': { key: 'Delivery, support and management actions.' },
  '1.7': { key: 'Definition, benefits and challenges.' },
  '1.8': { key: 'Technology and competitive advantage.' },
  '1.9': { key: 'Six criteria for turning data into information.', sourceMnemonic: 'CATIVA' },
  '2.1': { key: 'Investors, lenders and other stakeholders.' },
  '2.2': { key: 'Decision-making, stewardship and underlying assumptions.' },
  '2.3': { key: 'Fundamental and enhancing characteristics.' },
  '2.4': { key: 'Why financial reporting has limitations.' },
  '2.5': { key: 'Where users look beyond published statements.' },
  '3.1': { key: 'Cells, text, values, formulae, functions and workbooks.' },
  '3.2': { key: 'Structured and unstructured data, storage and management.' },
  '3.3': { key: 'Purpose, examples and advantages.' },
  '3.4': { key: 'Definition, advantages, LAN, WAN and VPN.' },
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
