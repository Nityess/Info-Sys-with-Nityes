import { BRAND } from './homeData'

// [letter, delay in seconds, accent colour]. The dot sits between "ca" and "nityes".
const BEFORE: [string, number][] = [['c', 0.15], ['a', 0.22]]
const AFTER: [string, number][] = [['n', 0.36], ['i', 0.43], ['t', 0.5], ['y', 0.57], ['e', 0.64], ['s', 0.71]]

/** The animated wordmark: letters rise in turn, the gold dot pops, the underline draws once. */
export function Wordmark({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="#top"
      className="lp-brand"
      aria-label={`${BRAND}, back to top`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <span className="lp-brand-top lp-rise">Info System with</span>
      <span className="lp-wordmark lp-serif" aria-hidden="true">
        {BEFORE.map(([l, d]) => (
          <span key={l} className="lp-wm" style={{ animationDelay: `${d}s` }}>{l}</span>
        ))}
        <span className="lp-wm-dot" />
        {AFTER.map(([l, d]) => (
          <span key={l} className="lp-wm" style={{ animationDelay: `${d}s`, color: 'var(--hero-accent)' }}>{l}</span>
        ))}
        <svg viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">
          <path className="lp-draw" pathLength={100} d="M2 5 Q 18 0 34 4 T 66 4 T 98 4 T 118 3" fill="none" stroke="#F5B301" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </a>
  )
}
