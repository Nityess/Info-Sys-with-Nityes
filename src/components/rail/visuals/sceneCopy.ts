// The "Remember" strip under each scene. Every fragment is a phrase taken from content/chapter7.md
// (scenesText.test.ts checks). The strip is the lead, then the items, joined with a middle dot.

export interface RememberLine {
  lead?: string
  items: readonly string[]
}

export const REMEMBER: Readonly<Record<string, RememberLine>> = {
  '1.2': {
    items: [
      'Strategic = Big picture + Long-term + Major decisions.',
      'Tactical = Middle management + Analysed data + Short-term issues.',
      'Operational = Front-line staff + Daily activities + Detailed information.',
      'Planning = Implementation steps + Resources + Time-scales.',
    ],
  },
  '1.3': { lead: 'A C C U R A T E', items: ['Eight qualities of good information'] },
  '1.4': { lead: 'S E A R', items: ['Source', 'Ease of Assimilation', 'Accessibility', 'Relevance'] },
  '1.5': {
    items: [
      'Information is not valuable merely because it exists. Its value arises when it supports actions.',
      'Net Value = Extra Benefits − Extra Costs',
    ],
  },
  '1.6': {
    items: ['Delivery = Operations + Capacity + Billing/Budgeting + Availability + Continuity.', 'Monitoring', 'Planning', 'Structure', 'Staffing & Skills'],
  },
  '1.7': { items: ['Outsourcing benefits = Focus + Better IT services.', 'Reduced direct control', 'Careful negotiation of SLAs'] },
  '1.8': {
    items: [
      'IT Innovation → Competitive Advantage',
      'Distributed Ledger Technology → Improved accuracy of asset recording.',
      'Digital Sound and Vision Media → Wider product distribution.',
    ],
  },
  '1.9': { lead: 'C A T I V A', items: ['Completeness', 'Accuracy', 'Timeliness', 'Inalterability', 'Verifiability', 'Assessability'] },
}

export const rememberText = (code: string): string => {
  const r = REMEMBER[code]
  if (!r) return ''
  return [r.lead ? `${r.lead}:` : '', r.items.join(' · ')].filter(Boolean).join(' ')
}

/** Every phrase above, for the test that checks them against the teaching file. */
export const REMEMBER_FRAGMENTS: readonly string[] = Object.values(REMEMBER).flatMap((r) => [...(r.lead ? [r.lead] : []), ...r.items])
