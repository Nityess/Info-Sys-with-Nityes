import type { ReactNode } from 'react'

const svg = (children: ReactNode) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)

const ITEMS: { title: string; text: string; icon: ReactNode; gold?: boolean }[] = [
  { title: 'No account', text: 'Open the site and start learning.', icon: svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /><path d="M3 3l18 18" /></>) },
  { title: 'No payment', text: 'Every open lesson is free.', icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>) },
  { title: 'Saved on your device', text: 'Your XP and daily streak stay on this device.', icon: 'XP', gold: true },
  { title: 'Light on data', text: 'Lessons load on demand. Light and dark mode included.', icon: svg(<path d="M12 4v10M8 10l4 4 4-4M5 20h14" />) },
]

export function FreeSection() {
  return (
    <section id="free" className="lp-wrap lp-sec">
      <h2 className="lp-serif lp-h2 lp-reveal" style={{ marginBottom: 'clamp(1.5rem,4vw,2.5rem)' }}>Free, with nothing to sign up for</h2>
      <div className="lp-free">
        {ITEMS.map((it) => (
          <div key={it.title} className="lp-reveal">
            <span className={`lp-ico ${it.gold ? 'lp-ico-gold' : ''}`} aria-hidden={it.gold ? true : undefined}>{it.icon}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
