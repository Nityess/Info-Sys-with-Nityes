// LO7c data and pure logic. Controls follow docs/syllabus.md LO7c; what each control stops
// comes from Ch10 §1.2 (technical controls) and §2.5 (preventing cyberattacks).

export type ControlId = 'passwords' | 'software' | 'twofa' | 'access' | 'updates'

export interface Control {
  id: ControlId
  icon: string
  label: string
  what: string
}

export const CONTROLS: Control[] = [
  { id: 'passwords', icon: '🔑', label: 'Strong passwords', what: 'Hard to guess, never reused across log-ins.' },
  { id: 'software', icon: '🛡️', label: 'Security software', what: 'Anti-virus removes malware; a firewall intercepts traffic.' },
  { id: 'twofa', icon: '📱', label: 'Two-factor authentication', what: 'One-time code sent to a second device.' },
  { id: 'access', icon: '🚪', label: 'Controlled access', what: 'Physical and network procedures restrict who gets in.' },
  { id: 'updates', icon: '🔄', label: 'Software updates', what: 'Patches fix known security weaknesses.' },
]

export interface Threat {
  id: string
  text: string
  blockedBy: ControlId
}

export const THREATS: Threat[] = [
  { id: 't1', text: 'Hacker guesses an easy password', blockedBy: 'passwords' },
  { id: 't2', text: 'Virus arrives in a download', blockedBy: 'software' },
  { id: 't3', text: 'Stolen password used to log in', blockedBy: 'twofa' },
  { id: 't4', text: 'Unauthorised person reaches the server', blockedBy: 'access' },
  { id: 't5', text: 'Attacker exploits an old software flaw', blockedBy: 'updates' },
]

export function isBlocked(threat: Threat, enabled: ReadonlySet<ControlId>): boolean {
  return enabled.has(threat.blockedBy)
}

export function blockedCount(enabled: ReadonlySet<ControlId>, threats: readonly Threat[] = THREATS): number {
  return threats.filter((t) => isBlocked(t, enabled)).length
}

// ---------- Password strength (estimate only, runs in the browser) ----------

/** A few very common passwords. Any match is rated Very weak. */
export const COMMON_PASSWORDS = [
  'password', 'password1', 'password123', '123456', '12345678', '123456789', 'qwerty', 'abc123',
  'iloveyou', 'admin', 'welcome', 'letmein', 'nepal123', 'kathmandu', '111111', '000000',
]

/** Common words attackers try first, often with a number added (e.g. "nepal2026"). */
export const COMMON_WORDS = ['password', 'qwerty', 'admin', 'welcome', 'nepal', 'kathmandu', 'iloveyou', 'letmein']

/** Most bits a password containing a common word can score (top of the Weak band). */
const COMMON_WORD_CAP = 35

/** Size of the character pool the password draws from. */
export function charsetSize(pw: string): number {
  let size = 0
  if (/[a-z]/.test(pw)) size += 26
  if (/[A-Z]/.test(pw)) size += 26
  if (/[0-9]/.test(pw)) size += 10
  if (/[^a-zA-Z0-9]/.test(pw)) size += 33
  return size
}

/** Entropy estimate in bits: length × log2(pool size). */
export function entropyBits(pw: string): number {
  const size = charsetSize(pw)
  return size === 0 ? 0 : pw.length * Math.log2(size)
}

export type Rating = 'Very weak' | 'Weak' | 'Fair' | 'Strong' | 'Very strong'

export interface Strength {
  bits: number
  rating: Rating
  /** 0–4, for the meter */
  level: number
  tips: string[]
}

const BANDS: [number, Rating][] = [
  [28, 'Very weak'],
  [36, 'Weak'],
  [60, 'Fair'],
  [80, 'Strong'],
]

export function ratePassword(pw: string): Strength {
  const tips: string[] = []
  const common = COMMON_PASSWORDS.includes(pw.toLowerCase())
  const fewUnique = pw.length > 0 && new Set(pw).size <= 2
  const lower = pw.toLowerCase()
  const word = common ? undefined : COMMON_WORDS.find((w) => lower.includes(w))
  if (common) tips.push('This is a well-known password. Attackers try it first.')
  if (word) tips.push(`Contains the common word "${word}". Attackers try words plus numbers first.`)
  if (fewUnique) tips.push('Repeating one or two characters is easy to guess.')
  if (pw.length < 12) tips.push('Use at least 12 characters, e.g. a short phrase.')
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw)) tips.push('Mix upper and lower case.')
  if (!/[0-9]/.test(pw)) tips.push('Add a number.')
  if (!/[^a-zA-Z0-9]/.test(pw)) tips.push('Add a symbol.')

  const raw = common || fewUnique ? 0 : entropyBits(pw)
  const bits = word ? Math.min(raw, COMMON_WORD_CAP) : raw
  let rating: Rating = 'Very strong'
  let level = 4
  for (let i = 0; i < BANDS.length; i++) {
    if (bits < BANDS[i][0]) {
      rating = BANDS[i][1]
      level = i
      break
    }
  }
  return { bits, rating, level, tips }
}
