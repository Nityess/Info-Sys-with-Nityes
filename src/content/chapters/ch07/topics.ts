// The new Chapter 7 structure, taken from content/chapter7.md (the owner's teaching file).
// Titles here must match its headings exactly: topics.test.ts reads the file and checks.

export type SectionId = 's1' | 's2' | 's3'

export interface SectionInfo {
  id: SectionId
  /** As written in the file's "# SECTION n - ..." heading */
  title: string
  /** One plain line for the section page */
  summary: string
  /** Tailwind classes, written out in full so they are kept in the build */
  band: string
  dot: string
  text: string
  ring: string
}

export const SECTIONS: SectionInfo[] = [
  {
    id: 's1',
    title: 'IT in the Business Environment',
    summary: 'What information is, what makes it good, and how the IT function delivers it.',
    band: 'bg-gradient-to-br from-blue-700 to-blue-900',
    dot: 'bg-blue-600',
    text: 'text-blue-700 dark:text-blue-300',
    ring: 'stroke-blue-600',
  },
  {
    id: 's2',
    title: 'Role of Financial Information in Business',
    summary: 'Who uses financial information, when it is useful, and where it falls short.',
    band: 'bg-gradient-to-br from-emerald-700 to-teal-900',
    dot: 'bg-spruce',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'stroke-spruce',
  },
  {
    id: 's3',
    title: 'Information Systems & IT',
    summary: 'Spreadsheets, databases, accounting software and computer networks.',
    band: 'bg-gradient-to-br from-amber-600 to-orange-800',
    dot: 'bg-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
    ring: 'stroke-amber-500',
  },
]

export type TeachingAid = 'ACCURATE' | 'SEAR' | 'MPSS'

export interface TopicMeta {
  /** "1.5" */
  code: string
  /** As written in the file's "## Topic ..." heading */
  title: string
  section: SectionId
  /** Teaching-created memory aid used in this topic (CATIVA is the source's own, so not listed) */
  teachingAid?: TeachingAid
  /** Has an optional playground (the 8 in the build prompt, no more) */
  playground?: boolean
  /** Content comes from the study text, not from the teaching file */
  fromStudyText?: boolean
}

export const TOPICS: TopicMeta[] = [
  { code: '1.1', title: 'Why businesses need information', section: 's1', fromStudyText: true },
  { code: '1.2', title: 'Types of Information', section: 's1', playground: true },
  { code: '1.3', title: 'Qualities of Good Information (ACCURATE)', section: 's1', teachingAid: 'ACCURATE', playground: true },
  { code: '1.4', title: 'What Makes Information Valuable? (SEAR)', section: 's1', teachingAid: 'SEAR' },
  { code: '1.5', title: 'Assessing the Cost and Value of Information', section: 's1', playground: true },
  { code: '1.6', title: 'IT Delivery and IT Support', section: 's1', teachingAid: 'MPSS', playground: true },
  { code: '1.7', title: 'Outsourcing', section: 's1' },
  { code: '1.8', title: 'Innovation', section: 's1' },
  { code: '1.9', title: 'Information Processing: CATIVA', section: 's1', playground: true },
  { code: '2.1', title: 'Who Uses Financial Information?', section: 's2' },
  { code: '2.2', title: 'When Is Financial Information Useful?', section: 's2', playground: true },
  { code: '2.3', title: 'Qualitative Characteristics of Financial Information (NFRS)', section: 's2' },
  { code: '2.4', title: 'Cost Constraint and Limitations of Financial Reporting', section: 's2' },
  { code: '2.5', title: 'Other Sources of Financial Information', section: 's2' },
  { code: '3.1', title: 'Spreadsheets', section: 's3', playground: true },
  { code: '3.2', title: 'Database Systems', section: 's3' },
  { code: '3.3', title: 'Accounting Software Packages', section: 's3' },
  { code: '3.4', title: 'Computer Networks', section: 's3', playground: true },
]

export const sectionById = (id: string): SectionInfo | undefined => SECTIONS.find((s) => s.id === id)

/** Title without the trailing "(ACCURATE)" style tag, which is shown as a "teaching aid" label instead. */
export function displayTitle(t: TopicMeta): string {
  return t.teachingAid ? t.title.replace(/\s*\([^)]*\)\s*$/, '') : t.title
}

export const topicId = (code: string): string => `ch07-t${code.replace('.', '-')}`
