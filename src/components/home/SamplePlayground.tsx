import { useState } from 'react'
import { SAMPLE_START, SAMPLE_STEP, clamp100, sampleVerdict, scaleGeometry } from './sampleScale'

const f = (n: number) => n.toFixed(1)

function Control({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="lp-ctl">
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span className="lp-ctl-btns">
        <button type="button" className="lp-ans" aria-label={`Lower the ${label.toLowerCase()}`} onClick={() => onChange(clamp100(value - SAMPLE_STEP))}>−</button>
        <b>{value}</b>
        <button type="button" className="lp-ans" aria-label={`Raise the ${label.toLowerCase()}`} onClick={() => onChange(clamp100(value + SAMPLE_STEP))}>+</button>
      </span>
    </div>
  )
}

/** A simplified Topic 1.5 playground for the landing page: plus and minus buttons, a tipping scale, a verdict. */
export function SamplePlayground() {
  const [benefit, setBenefit] = useState(SAMPLE_START.benefit)
  const [cost, setCost] = useState(SAMPLE_START.cost)
  const g = scaleGeometry(benefit, cost)
  const v = sampleVerdict(benefit, cost)
  const cls = v.kind === 'worth' ? 'lp-fb-ok' : v.kind === 'not-worth' ? 'lp-fb-bad' : 'lp-fb-mid'

  return (
    <div className="lp-card lp-lift lp-play lp-reveal">
      <div className="lp-play-top">
        <span className="lp-chip" style={{ background: 'var(--s1-soft)', color: 'var(--s1-text)' }}>Topic 1.5 · Sample playground</span>
        <span className="lp-small">Sample numbers</span>
      </div>
      <h3 className="lp-serif">Is the extra information worth it?</h3>

      <svg className="lp-scale" viewBox="0 0 260 150" role="img" aria-label={`Scale: extra benefit ${benefit}, extra cost ${cost}`}>
        <line x1="130" y1="50" x2="130" y2="132" stroke="var(--line-strong)" strokeWidth="4" strokeLinecap="round" />
        <line x1="98" y1="134" x2="162" y2="134" stroke="var(--line-strong)" strokeWidth="5" strokeLinecap="round" />
        <line x1={f(g.lx)} y1={f(g.ly)} x2={f(g.rx)} y2={f(g.ry)} stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="130" cy="50" r="6" fill="var(--gold)" />
        <line x1={f(g.lx)} y1={f(g.ly)} x2={f(g.lx)} y2={f(g.lpy)} stroke="var(--line-strong)" strokeWidth="2" />
        <line x1={f(g.rx)} y1={f(g.ry)} x2={f(g.rx)} y2={f(g.rpy)} stroke="var(--line-strong)" strokeWidth="2" />
        <rect x={f(g.lx - 30)} y={f(g.lpy)} width="60" height="30" rx="8" fill="var(--brand)" />
        <text x={f(g.lx)} y={f(g.ly + 36)} textAnchor="middle" fontFamily="Figtree Variable, sans-serif" fontSize="13" fontWeight="700" fill="#fff">{benefit}</text>
        <rect x={f(g.rx - 30)} y={f(g.rpy)} width="60" height="30" rx="8" fill="var(--gold)" />
        <text x={f(g.rx)} y={f(g.ry + 36)} textAnchor="middle" fontFamily="Figtree Variable, sans-serif" fontSize="13" fontWeight="700" fill="#0F1B33">{cost}</text>
      </svg>

      <div className="lp-stack" style={{ gap: '.625rem' }}>
        <Control label="Extra benefit" value={benefit} onChange={setBenefit} />
        <Control label="Extra cost" value={cost} onChange={setCost} />
      </div>
      <div role="status" className={`lp-fb ${cls}`}><b>{v.head}</b> {v.text}</div>
      <button type="button" className="lp-ans lp-ans-ghost" onClick={() => { setBenefit(SAMPLE_START.benefit); setCost(SAMPLE_START.cost) }}>Reset</button>
    </div>
  )
}
