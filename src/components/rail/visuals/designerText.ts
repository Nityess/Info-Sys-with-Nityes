// Scene text that is NOT in content/chapter7.md. Written by the designer; pending teacher review.
// Keep every such line here so the owner can find and approve it in one place (see also simpleStories.ts).

/**
 * Topic 1.3: which ACCURATE quality each defect of the CEO report points to.
 * chapter7.md lists the five defects but not this mapping. The old Report doctor (rail/topics/accurate.ts) maps the
 * 5,000 lines to "User-targeted"; the design says "Easy to use". The owner decides.
 */
export const DEFECT_QUALITY = ['Accurate', 'Complete', 'Easy to use', 'Timely', 'Relevant'] as const

/** Short labels used while a scene plays. */
export const SCENE_LABELS = {
  loading: 'Loading the scene...',
  tapToFlip: 'Tap a tile to flip it',
} as const

/** Topic 2.2: what the Cash basis button says. chapter7.md only describes the accruals treatment of the example. */
export const CASH_BASIS_NOTE = 'Cash basis: the sale would be recognised in January, when the cash arrives. This is not the underlying assumption.'

/** Topic 3.1: the sample sheet in the mini spreadsheet. chapter7.md gives the formulae (=B4+B5, =SUM(B4:B10)) but not these labels or numbers. */
export const SAMPLE_SHEET = { A4: 'Cash sales', A5: 'Credit sales', B4: 1200, B5: 800 } as const

/** Topic 3.4: picture labels inside the network diagrams (not teaching text). */
export const DIAGRAM_LABELS = {
  building: 'One building',
  internet: 'Public internet',
  router: 'Router',
  home: 'Home',
  office: 'Office',
  tunnel: 'Encrypted tunnel: hackers denied',
} as const
