// Topic 1.3: the eight ACCURATE qualities (table in section 2) and the CEO report from section 1.

export interface Quality {
  letter: string
  name: string
  meaning: string
}

export const QUALITIES: Quality[] = [
  { letter: 'A', name: 'Accurate', meaning: 'Correct figures and classification' },
  { letter: 'C', name: 'Complete', meaning: 'All necessary information included' },
  { letter: 'C', name: 'Cost-beneficial', meaning: 'Benefits justify the cost' },
  { letter: 'U', name: 'User-targeted', meaning: 'Designed for the intended user' },
  { letter: 'R', name: 'Relevant', meaning: 'Only decision-useful information' },
  { letter: 'A', name: 'Authoritative', meaning: 'Reliable and credible source' },
  { letter: 'T', name: 'Timely', meaning: 'Available when needed' },
  { letter: 'E', name: 'Easy to use', meaning: 'Clear, suitable presentation' },
]

export interface ReportLine {
  id: string
  text: string
  /** Name of the missing quality; absent when the line is fine */
  missing?: string
  fix: string
}

/** The five problems of the CEO's monthly report, plus two lines that are fine. */
export const REPORT: ReportLine[] = [
  { id: 'title', text: 'Monthly performance report, five branches', fix: 'This line is fine.' },
  { id: 'wrong', text: 'Some figures are calculated incorrectly.', missing: 'Accurate', fix: 'Check that figures add up and items sit in the correct category.' },
  { id: 'missing', text: 'The report excludes two of the five branches.', missing: 'Complete', fix: 'Include all necessary information, so nothing important is missing.' },
  { id: 'long', text: 'It contains 5,000 lines of transaction details.', missing: 'User-targeted', fix: "Design it for the CEO: a short summary, not the accountant's detail." },
  { id: 'late', text: 'It arrives three weeks after the month ends.', missing: 'Timely', fix: 'Deliver it before the CEO has to make the decision.' },
  { id: 'noise', text: 'It includes information that has nothing to do with the decision.', missing: 'Relevant', fix: 'Keep only what is useful for the decision.' },
  { id: 'for', text: 'Prepared for: the CEO', fix: 'This line is fine.' },
]

export const DEFECTS = REPORT.filter((l) => l.missing)

/** Indexes (in QUALITIES) of the qualities found missing so far. */
export const litIndexes = (found: ReadonlySet<string>): Set<number> =>
  new Set(REPORT.filter((l) => l.missing && found.has(l.id)).map((l) => QUALITIES.findIndex((q) => q.name === l.missing)))
