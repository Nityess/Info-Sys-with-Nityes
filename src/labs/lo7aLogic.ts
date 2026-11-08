import type { SortItem } from '../components/sorterLogic'

// LO7a data. Reasons follow Ch10 §1.1 "Security of computer systems";
// examples are ported from `Data Security First topic .html` (slide 3).

export type Bucket = 'legal' | 'commercial'
export type ReasonTag = Bucket | 'supporting'

export interface Reason {
  id: string
  icon: string
  title: string
  tag: ReasonTag
  summary: string
  example: string
}

export const REASONS: Reason[] = [
  { id: 'legal', icon: '⚖️', title: 'Legal obligation', tag: 'legal',
    summary: 'Data protection law and other regulations require certain data to be protected.',
    example: 'A bank leaks customer records. The regulator imposes a heavy fine.' },
  { id: 'strategic', icon: '🧠', title: 'Strategic and commercial importance', tag: 'commercial',
    summary: 'Information stored and used online is of vital strategic and commercial value.',
    example: 'A rival steals your client list and pricing model, then calls your clients.' },
  { id: 'connected', icon: '🌐', title: 'Connected systems', tag: 'supporting',
    summary: 'Connectedness makes external attack ever more likely.',
    example: 'Automated bots scan every internet address all day, looking for weak spots.' },
  { id: 'business', icon: '🏢', title: 'Business-wide risk', tag: 'supporting',
    summary: 'Cyber risk is part of all business risks, not just "IT".',
    example: 'Ransomware: Finance cannot run payroll, Legal faces claims, IT finds servers locked.' },
  { id: 'compromise', icon: '🎯', title: 'Assume compromise', tag: 'supporting',
    summary: 'Some breach is inevitable: add intelligence, detection and response to prevention.',
    example: 'Goal changes from "100% safe" to "spot it fast, act fast".' },
  { id: 'assets', icon: '💎', title: 'Critical information assets', tag: 'supporting',
    summary: 'Prioritise security around the most valuable data.',
    example: 'Spend most effort protecting the core banking database or audit files.' },
  { id: 'basics', icon: '🧼', title: 'Get the basics right', tag: 'supporting',
    summary: 'Most businesses fail at basic cyber hygiene.',
    example: 'Strong passwords, two-factor authentication and patching stop many common attacks.' },
]

export type Scenario = SortItem<Bucket>

/** Illustrative practice scenarios (not exam questions). */
export const SCENARIOS: Scenario[] = [
  { id: 's1', text: 'A regulator fines a bank for leaking customer account details.', bucket: 'legal',
    why: 'Breaking data protection rules leads to fines: a legal requirement.' },
  { id: 's2', text: 'A competitor gets hold of a firm’s secret pricing model.', bucket: 'commercial',
    why: 'Lost competitive advantage: a strategic and commercial requirement.' },
  { id: 's3', text: 'A hospital must keep patient records confidential by law.', bucket: 'legal',
    why: 'The duty comes from law and regulation.' },
  { id: 's4', text: 'A CA firm’s client list is its most valuable asset.', bucket: 'commercial',
    why: 'Losing clients hurts revenue and strategy.' },
  { id: 's5', text: 'An employer must protect staff salary and HR records under regulation.', bucket: 'legal',
    why: 'Personal data protection is a legal obligation.' },
  { id: 's6', text: 'A manufacturer protects product designs before launch.', bucket: 'commercial',
    why: 'Secret designs give a market advantage.' },
]
