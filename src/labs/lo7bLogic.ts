import type { SortItem } from '../components/sorterLogic'

// LO7b data. Implications follow docs/syllabus.md LO7b; sources are Ch10 §1.1, §2, §2.1,
// §2.3, §2.4 and Ch9 §1.7 (data privacy, data security).

export type Implication = 'financial' | 'dos' | 'competitors' | 'reputation' | 'dataprotection'

export interface ImplicationInfo {
  id: Implication
  icon: string
  label: string
  summary: string
  source: string
}

export const IMPLICATIONS: ImplicationInfo[] = [
  { id: 'financial', icon: '💰', label: 'Financial loss',
    summary: 'Money lost through theft, fraud, ransom, recovery costs or lost sales.',
    source: 'Ch10 §2 cyber-risk definition' },
  { id: 'dos', icon: '🛑', label: 'Denial of service',
    summary: 'Legitimate users cannot use the system, so operations stop.',
    source: 'Ch10 §2.1, §2.3, §2.4' },
  { id: 'competitors', icon: '🕵️', label: 'Competitors',
    summary: 'Strategic data sold to third parties falls into rivals’ hands.',
    source: 'Ch10 §2.3; Ch9 §1.7' },
  { id: 'reputation', icon: '📉', label: 'Reputational loss',
    summary: 'Customers, suppliers and the public lose trust.',
    source: 'Ch10 §2 cyber-risk definition' },
  { id: 'dataprotection', icon: '⚖️', label: 'Data protection',
    summary: 'Personal data leaks breach data protection and privacy law.',
    source: 'Ch10 §1.1; Ch9 §1.7' },
]

export interface Incident {
  id: string
  title: string
  story: string
  source: string
  /** Implications this incident triggers, with a one-line reason each */
  impacts: Partial<Record<Implication, string>>
}

export const INCIDENTS: Incident[] = [
  { id: 'ransom', title: 'Files held to ransom',
    story: 'Hackers steal Grange Ltd’s data files and demand NRs 100 million to return them.',
    source: 'Ch10 question bank Q2',
    impacts: {
      financial: 'Ransom demand plus recovery costs.',
      dos: 'Staff cannot use the stolen files.',
      reputation: 'Customers doubt the firm can protect their data.',
    } },
  { id: 'network', title: 'Network goes down',
    story: 'A travel company’s network is damaged, so bookings stop.',
    source: 'Ch10 §2.3',
    impacts: {
      dos: 'Booking and managing holidays ceases.',
      financial: 'No bookings means lost revenue.',
      reputation: 'Suppliers and customers are let down.',
    } },
  { id: 'theft', title: 'Data stolen and sold',
    story: 'Intruders copy HR, customer and strategic data and sell it to third parties.',
    source: 'Ch10 §2.3',
    impacts: {
      dataprotection: 'Personal HR and customer records are leaked.',
      competitors: 'Strategic data can reach rivals.',
      reputation: 'Public trust falls after the leak.',
    } },
  { id: 'ddos', title: 'Website flooded',
    story: 'An exporter’s ordering website is flooded with traffic and is down for two days in peak season.',
    source: 'IS Pre-Test Dec 2026 Set 2, Q3(b)',
    impacts: {
      dos: 'Buyers cannot reach the website.',
      financial: 'Orders are lost in peak season.',
    } },
]

/** Implications triggered by an incident, in syllabus order. */
export function impactsOf(incident: Incident): Implication[] {
  return IMPLICATIONS.map((i) => i.id).filter((id) => incident.impacts[id] !== undefined)
}

/** Illustrative practice consequences (not exam questions). */
export const CONSEQUENCES: SortItem<Implication>[] = [
  { id: 'c1', text: 'The firm pays a large ransom to get its files back.', bucket: 'financial',
    why: 'Cash leaves the business: a financial loss.' },
  { id: 'c2', text: 'Customers cannot open the online booking site for two days.', bucket: 'dos',
    why: 'Legitimate users are blocked: denial of service.' },
  { id: 'c3', text: 'A rival buys the stolen pricing strategy from the hackers.', bucket: 'competitors',
    why: 'Strategic data now helps a competitor.' },
  { id: 'c4', text: 'News of the breach spreads and customers move to another bank.', bucket: 'reputation',
    why: 'Lost trust: reputational loss.' },
  { id: 'c5', text: 'The regulator investigates leaked staff and customer personal records.', bucket: 'dataprotection',
    why: 'Personal data law has been breached.' },
  { id: 'c6', text: 'Staff cannot log in to any system after the network is taken down.', bucket: 'dos',
    why: 'Operations stop: denial of service.' },
  { id: 'c7', text: 'Stolen tender bids let a rival undercut the firm.', bucket: 'competitors',
    why: 'Confidential plans reach a competitor.' },
]
