// Section 1 scene text. Every string in a SOURCE list is a phrase from content/chapter7.md: scenesText.test.ts reads
// the file and fails if one is missing. Text that is NOT in the md (designer wording) lives in designerText.ts.

export const SEAR_ROWS = [
  { letter: 'S', factor: 'Source', a: 'Recognised research organisation', b: 'Unknown website' },
  { letter: 'E', factor: 'Ease of Assimilation', a: 'Clear charts', b: 'Confusing 100-page document' },
  { letter: 'A', factor: 'Accessibility', a: 'Available online', b: 'Difficult to access' },
  { letter: 'R', factor: 'Relevance', a: 'Focused on restaurant customers', b: 'Mainly discussing the software industry' },
] as const

export const SEAR_CLOSING = 'Its value does not depend on scarcity but on its usefulness to that user.'

/** Topic 1.3: the five problems of the CEO's monthly report (the bullet list in "Start with a simple business situation"). */
export const CEO_DEFECTS = [
  'Some figures are calculated incorrectly.',
  'The report excludes two branches.',
  'It contains 5,000 lines of transaction details.',
  'It arrives three weeks after the month ends.',
  "It includes information that has nothing to do with the CEO's decision.",
] as const

/** Topic 1.5 */
export const VALUE_CHAIN = ['Information obtained', 'Management uses it', 'Action taken', 'Value created'] as const
export const CHAIN_OK = 'Its value arises when it supports actions.'
export const CHAIN_BROKEN = 'No action was taken, so no actual value arose.'
export const NET_VALUE_FORMULA = 'Net Value = Extra Benefits − Extra Costs'

/** Topic 1.6 */
export const DELIVERY = [
  'IT Service Operations',
  'Capacity Monitoring and Management',
  'Customer Billing and Budgeting',
  'Business Operations Availability to Agreed Service Levels',
  'Service Continuity / Contingency Management',
] as const
export const SUPPORT = [
  'Maintaining IT Infrastructure Configuration',
  'Physical and Logical Integrity of Infrastructure',
  'Security and Access Control',
  'Incident Management',
] as const
export const MPSS_STEPS = [
  { letter: 'M', name: 'Monitoring' },
  { letter: 'P', name: 'Planning' },
  { letter: 'S', name: 'Structure' },
  { letter: 'S', name: 'Staffing & Skills' },
] as const

/** Topic 1.7 */
export const OUTSOURCE = {
  org: 'Organisation',
  provider: 'External Provider',
  benefits: ['Focus on Core Activities', 'Access to Better IT Functions and Services'],
  challenges: ['Increased Formality in Managing the IT Function', "Service Managed at Arm's Length", 'Contractual Issues'],
} as const

/** Topic 1.8 */
export const INNOVATION = {
  a: 'Company A',
  aTech: 'old technology',
  aResult: 'Left behind',
  b: 'Company B',
  bTech: 'invests in new technology',
  bResult: 'Competitive Advantage',
  cards: [
    { front: 'Distributed Ledger Technology', back: 'Improved accuracy of asset recording' },
    { front: 'Digital Sound and Vision Media', back: 'Wider product distribution' },
  ],
} as const

/** Topic 1.9 stages: data goes in, information comes out. */
export const PIPELINE = { from: 'Data', via: 'Information Processing', to: 'Information' } as const

export const S1_SOURCE: readonly string[] = [
  ...SEAR_ROWS.flatMap((r) => [r.factor, r.a, r.b]),
  SEAR_CLOSING,
  ...CEO_DEFECTS,
  ...VALUE_CHAIN,
  CHAIN_OK,
  NET_VALUE_FORMULA,
  ...DELIVERY,
  ...SUPPORT,
  ...MPSS_STEPS.map((m) => m.name),
  OUTSOURCE.org,
  OUTSOURCE.provider,
  ...OUTSOURCE.benefits,
  ...OUTSOURCE.challenges,
  INNOVATION.a,
  INNOVATION.aTech,
  'left behind',
  INNOVATION.b,
  INNOVATION.bTech,
  INNOVATION.bResult,
  ...INNOVATION.cards.flatMap((c) => [c.front, c.back]),
  PIPELINE.from,
  PIPELINE.via,
  PIPELINE.to,
]
