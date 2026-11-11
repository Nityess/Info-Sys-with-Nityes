// Facts shown on the landing page. Every number comes from docs/syllabus.md (exam context
// and LO mark weightings) or the Chapter_NN PDF names. Text is from the home page design.

import { chapter10Hash, chapter7Hash, chapter8Hash, chapter9Hash } from '../../state/route'

/** Site name, as in the home page design. */
export const BRAND = 'Information Systems with CA Nitesh'

export const EXAM = {
  paperMarks: 100,
  hours: 3,
  partBMarks: 50,
  outcomes: [
    { lo: 'LO4', chapter: 7, title: 'Role of management information systems', short: 'Role of MIS', marks: 10 },
    { lo: 'LO5', chapter: 8, title: 'Types of management information systems', short: 'Types of MIS', marks: 15 },
    { lo: 'LO6', chapter: 9, title: 'Financial technology and accounting systems', short: 'Fintech', marks: 15 },
    { lo: 'LO7', chapter: 10, title: 'Importance of data security', short: 'Data security', marks: 10 },
  ],
} as const

/** The four chapters: where they open, the one-line blurb and button text on the card, and the fact line. */
export const BOARD_CHAPTERS = [
  { number: 7, title: 'Management information systems', lo: 'LO4', weight: 10, href: chapter7Hash(), row: ['Topics', '18 in 3 sections'], blurb: 'Why businesses need information, what makes it good, and how IT delivers it.', cta: 'Open chapter' },
  { number: 8, title: 'Types of management information systems', lo: 'LO5', weight: 15, href: chapter8Hash(), row: ['Topics', '20 in 3 sections'], blurb: 'The kinds of system a business runs, and the controls that keep them right.', cta: 'Open chapter' },
  { number: 9, title: 'Financial technology', lo: 'LO6', weight: 15, href: chapter9Hash(), row: ['Simulators', '17 live'], blurb: 'Big data, cloud accounting, blockchain and fintech, and what they change for the accountant.', cta: 'Open the simulators', badge: 'New' },
  { number: 10, title: 'Data security', lo: 'LO7', weight: 10, href: chapter10Hash(), row: ['Topics', '8 in 2 sections'], blurb: 'Why it matters, the threats a business faces, and how to store data safely.', cta: 'Open chapter' },
] as const

/** The four "see it work" tabs: chapter, what the first screen is called, the teacher's line, and the picture's alt text. */
export const DEMO_TABS = [
  { chapter: 7, label: 'Open the diagram', title: 'Chapter 7 · 1.1 · Open the diagram', say: 'Open the diagram one part at a time. The idea gets a shape before it gets a name.', alt: 'Chapter 7 screen: a diagram you open one part at a time.' },
  { chapter: 8, label: 'Run the system', title: 'Chapter 8 · 1.1 · Run the system', say: 'Press Run the system and watch input turn into output.', alt: 'Chapter 8 screen: a system running, with input turning into output.' },
  { chapter: 9, label: 'Cheat the blockchain', title: 'Chapter 9 · 2.5 · Build your own blockchain', say: 'Change the amount after hashing, then broadcast. Four of five members say no.', alt: 'Chapter 9 screen: the blockchain simulator rejecting a block whose amount was changed.' },
  { chapter: 10, label: 'Launch an attack', title: 'Chapter 10 · 1.1 · Launch an attack', say: 'Launch the attack first. Then see what the business loses.', alt: 'Chapter 10 screen: an attack launched against a business.' },
] as const
