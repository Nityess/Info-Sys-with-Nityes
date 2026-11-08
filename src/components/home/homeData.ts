// Facts shown on the landing page. Every number comes from docs/syllabus.md (exam context
// and LO mark weightings); chapter titles come from the Chapter_NN PDF names.

export const EXAM = {
  paperMarks: 100,
  hours: 3,
  partBMarks: 50,
  outcomes: [
    { lo: 'LO4', chapter: 7, title: 'Role of management information systems', marks: 10, tone: 'bg-spruce' },
    { lo: 'LO5', chapter: 8, title: 'Types of management information systems', marks: 15, tone: 'bg-blue-600' },
    { lo: 'LO6', chapter: 9, title: 'Financial technology and accounting systems', marks: 15, tone: 'bg-marigold' },
    { lo: 'LO7', chapter: 10, title: 'Importance of data security', marks: 10, tone: 'bg-coral' },
  ],
} as const

/** Chapters whose lessons are not built yet. They show as coming soon, with no button. */
export const COMING_SOON = [
  { number: 8, title: 'Types of management information systems', lo: 'LO5', weight: 15 },
  { number: 9, title: 'Financial technology', lo: 'LO6', weight: 15 },
] as const

/** What each built chapter covers, in the order a student meets it. */
export const OUTLINES: Record<number, string> = {
  7: 'IT in the business environment, role of financial information, information systems.',
  10: 'Why data security matters, what happens without it, and how to store data safely.',
}
