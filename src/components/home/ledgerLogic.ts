// The hero's "try to change the ledger" demo: three payments chained together, each block's hash built from its own
// entry and the block before it. Change one amount and every block after it no longer matches what was sealed.
// The businesses and amounts are made up for teaching (the same ones as the Chapter 9 blockchain simulator).

export interface Entry {
  from: string
  to: string
  amount: number
}

export const START_ENTRIES: readonly Entry[] = [
  { from: 'Everest Fashion', to: 'Himal Textiles', amount: 320000 },
  { from: 'Himal Textiles', to: 'Gorkha Foods', amount: 110000 },
  { from: 'Gorkha Foods', to: 'Jhapa Jams', amount: 45000 },
]

/** The "previous hash" of the first block. */
export const GENESIS = '000000'

/** How much one tap on + or - changes an amount, in rupees. */
export const STEP = 10000

/** Smallest and largest amount the stepper allows. */
export const MIN_AMOUNT = 10000
export const MAX_AMOUNT = 990000

/** Short SHA-256 of a text: the first six hex digits, enough to see a change at a glance. */
export async function sha6(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)]
    .slice(0, 3)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Hash of every block in order; each one includes the hash of the block before it. */
export async function chainHashes(entries: readonly Entry[]): Promise<string[]> {
  const out: string[] = []
  let prev = GENESIS
  for (const e of entries) {
    prev = await sha6(`${prev}|${e.from}|${e.to}|${e.amount}`)
    out.push(prev)
  }
  return out
}

/** A block is broken when its hash no longer equals the one sealed at the start. */
export const brokenFlags = (sealed: readonly string[], live: readonly string[]): boolean[] =>
  sealed.map((h, i) => live[i] !== undefined && live[i] !== h)

/** Index of the first broken block, or -1 when the whole ledger is intact. */
export const firstBroken = (flags: readonly boolean[]): number => flags.indexOf(true)

/** Rupees in the Nepali style, for example "Rs 3,20,000". */
export const formatRs = (n: number): string => `Rs ${n.toLocaleString('en-IN')}`

/** Moves an amount by one step and keeps it inside the limits. */
export const stepAmount = (amount: number, direction: 1 | -1): number => Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, amount + direction * STEP))
