import { DIAGRAM_LABELS as L } from './designerText'

// Four network pictures on a 420 by 230 canvas. Text inside them is picture labelling only (designerText.ts).
const T = { fontSize: 11, fontWeight: 700, fill: 'var(--ink)', textAnchor: 'middle' as const, fontFamily: 'Figtree Variable, sans-serif' }
const BOX = { fill: 'var(--surface)', stroke: 'var(--ink)', strokeWidth: 2.5 }

export type NetKey = 'LAN' | 'WLAN' | 'WAN' | 'VPN'

const ALT: Record<NetKey, string> = {
  LAN: 'LAN: computers and a printer joined by cables inside one building',
  WLAN: 'WLAN: devices connected by radio waves to a router, no cables',
  WAN: 'WAN: Kathmandu, Pokhara and Biratnagar networks linked over long distances',
  VPN: 'VPN: a home laptop connects to the office through an encrypted tunnel across the internet',
}

/** The picture for one network type. Cable and wave animations stop under reduced motion. */
export function NetDiagram({ net }: { net: NetKey }) {
  return (
    <svg viewBox="0 0 420 230" role="img" aria-label={ALT[net]} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {net === 'LAN' && (
        <>
          <rect x="26" y="16" width="368" height="198" rx="14" fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="6 6" />
          <text x="40" y="38" {...T} textAnchor="start" fill="var(--muted)">{L.building}</text>
          <g stroke="var(--acc)" strokeWidth="3" fill="none">
            {['M90 70 L210 120', 'M90 180 L210 120', 'M330 70 L210 120', 'M330 180 L210 120'].map((p) => <path key={p} className="sc-flow" d={p} />)}
          </g>
          <circle cx="210" cy="120" r="16" fill="var(--acc)" />
          <g {...BOX}><rect x="62" y="52" width="56" height="36" rx="6" /><rect x="62" y="162" width="56" height="36" rx="6" /><rect x="302" y="52" width="56" height="36" rx="6" /><rect x="302" y="162" width="56" height="36" rx="6" /></g>
          <g {...T} stroke="none"><text x="90" y="74">PC</text><text x="90" y="184">PC</text><text x="330" y="74">PC</text><text x="330" y="184">Printer</text></g>
        </>
      )}
      {net === 'WLAN' && (
        <>
          <rect x="26" y="16" width="368" height="198" rx="14" fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="6 6" />
          <g fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round">
            {['M186 88 a34 34 0 0 1 48 0', 'M170 72 a58 58 0 0 1 80 0', 'M154 56 a82 82 0 0 1 112 0'].map((p, i) => <path key={p} className="sc-wave" style={{ animationDelay: `${i * 0.3}s` }} d={p} />)}
          </g>
          <rect x="176" y="100" width="68" height="26" rx="8" fill="var(--brand)" />
          <text x="210" y="118" {...T} fill="#fff">{L.router}</text>
          <g {...BOX}><rect x="50" y="150" width="56" height="36" rx="6" /><rect x="182" y="168" width="56" height="36" rx="6" /><rect x="314" y="150" width="30" height="46" rx="6" /></g>
          <g {...T} stroke="none"><text x="78" y="172">Laptop</text><text x="210" y="190">Laptop</text><text x="329" y="177">Phone</text></g>
        </>
      )}
      {net === 'WAN' && (
        <>
          <g stroke="var(--acc)" strokeWidth="3" fill="none">
            {['M210 60 L84 164', 'M210 60 L336 164', 'M84 164 L336 164'].map((p) => <path key={p} className="sc-flow" d={p} />)}
          </g>
          <g fill="var(--acc-soft)" stroke="var(--acc)" strokeWidth="3"><circle cx="210" cy="60" r="30" /><circle cx="84" cy="164" r="30" /><circle cx="336" cy="164" r="30" /></g>
          <g {...T} stroke="none"><text x="210" y="64">LAN</text><text x="84" y="168">LAN</text><text x="336" y="168">LAN</text><text x="210" y="24">Kathmandu</text><text x="84" y="214">Pokhara</text><text x="336" y="214">Biratnagar</text></g>
        </>
      )}
      {net === 'VPN' && (
        <>
          <path d="M130 70 q20 -30 55 -14 q25 -26 55 -4 q40 -8 52 22 q30 4 24 36 q-6 20 -34 20 H150 q-40 0 -46 -26 q-6 -26 26 -34z" fill="var(--line)" stroke="var(--line-strong)" strokeWidth="2" />
          <text x="210" y="82" {...T} fill="var(--muted)">{L.internet}</text>
          <rect x="84" y="116" width="252" height="26" rx="13" fill="var(--brand)" />
          <path className="sc-flow" d="M96 129 H324" stroke="#fff" strokeWidth="3" fill="none" />
          <g transform="translate(196 108)"><rect x="0" y="14" width="28" height="22" rx="5" fill="var(--gold)" stroke="#0F1B33" strokeWidth="2" /><path d="M6 14 V8 a8 8 0 0 1 16 0 V14" fill="none" stroke="#0F1B33" strokeWidth="3" /></g>
          <g {...BOX}><rect x="22" y="112" width="58" height="36" rx="6" /><rect x="340" y="104" width="58" height="52" rx="6" /></g>
          <g {...T} stroke="none"><text x="51" y="134">{L.home}</text><text x="369" y="134">{L.office}</text><text x="210" y="176">{L.tunnel}</text></g>
        </>
      )}
    </svg>
  )
}
