import { useEffect, useMemo, useState } from 'react'
import { Check, Minus, Plus, RotateCcw, X } from 'lucide-react'
import { chapter9Hash } from '../../state/route'
import { START_ENTRIES, brokenFlags, chainHashes, firstBroken, formatRs, stepAmount } from './ledgerLogic'

const START_AMOUNTS = START_ENTRIES.map((e) => e.amount)

/**
 * The hero's live demo: three payments chained by hashes. Change an amount with + or - and every block after it
 * stops matching what was sealed. Hashes are real SHA-256 (Web Crypto), shortened to six digits.
 */
export function LedgerDemo() {
  const [amounts, setAmounts] = useState<number[]>(START_AMOUNTS)
  const [sealed, setSealed] = useState<string[]>([])
  const [live, setLive] = useState<string[]>([])
  const [touched, setTouched] = useState(false)

  const entries = useMemo(() => START_ENTRIES.map((e, i) => ({ ...e, amount: amounts[i] })), [amounts])

  useEffect(() => {
    let alive = true
    chainHashes(START_ENTRIES).then((h) => {
      if (!alive) return
      setSealed(h)
      setLive(h)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    let alive = true
    chainHashes(entries).then((h) => {
      if (alive) setLive(h)
    })
    return () => {
      alive = false
    }
  }, [entries])

  const flags = sealed.length ? brokenFlags(sealed, live) : [false, false, false]
  const first = firstBroken(flags)
  const changed = amounts.some((a, i) => a !== START_AMOUNTS[i])

  const move = (i: number, dir: 1 | -1) => {
    setTouched(true)
    setAmounts((prev) => prev.map((a, j) => (j === i ? stepAmount(a, dir) : a)))
  }

  return (
    <div className="lp-demo" role="group" aria-label="Ledger demo: change an amount and watch the chain break">
      <div className="lp-demo-top">
        <h2 className="lp-serif lp-demo-title">Try to change the ledger</h2>
        <p className={`lp-verdict ${first >= 0 ? 'bad' : 'ok'}`} aria-live="polite">
          {first >= 0 ? <X width={18} height={18} strokeWidth={3} aria-hidden /> : <Check width={18} height={18} strokeWidth={3} aria-hidden />}
          {first >= 0 ? `Block ${first + 1} changed. Every block after it is now broken.` : 'Every block matches its seal.'}
        </p>
      </div>

      <ol className="lp-chain">
        {entries.map((e, i) => (
          <li key={e.from} className={`lp-block ${flags[i] ? 'bad' : 'ok'}`} style={{ animationDelay: `${0.45 + i * 0.16}s` }}>
            <div className="lp-block-head">
              <span className="lp-block-n lp-serif">Block {i + 1}</span>
              <span className="lp-seal" aria-label={flags[i] ? 'Does not match its seal' : 'Matches its seal'}>
                {flags[i] ? <X width={16} height={16} strokeWidth={3} aria-hidden /> : <Check width={16} height={16} strokeWidth={3} aria-hidden />}
                {flags[i] ? 'Broken' : 'Sealed'}
              </span>
            </div>
            <p className="lp-block-pay">
              {e.from} pays {e.to}
            </p>
            <div className="lp-amt">
              <button type="button" className="lp-step" aria-label={`Lower the amount in block ${i + 1}`} onClick={() => move(i, -1)}>
                <Minus width={18} height={18} aria-hidden />
              </button>
              <output className="lp-serif" aria-label={`Block ${i + 1} amount`}>{formatRs(e.amount)}</output>
              <button type="button" className={`lp-step ${i === 0 && !touched ? 'nudge' : ''}`} aria-label={`Raise the amount in block ${i + 1}`} onClick={() => move(i, 1)}>
                <Plus width={18} height={18} aria-hidden />
              </button>
            </div>
            <dl className="lp-hashes">
              <div><dt>Hash</dt><dd key={live[i]}>{live[i] ?? '......'}</dd></div>
              <div><dt>Sealed</dt><dd>{sealed[i] ?? '......'}</dd></div>
            </dl>
          </li>
        ))}
      </ol>

      <div className="lp-demo-foot">
        <button type="button" className="lp-link-btn" onClick={() => { setAmounts(START_AMOUNTS); setTouched(true) }} disabled={!changed}>
          <RotateCcw width={16} height={16} aria-hidden /> Put it back
        </button>
        <a className="lp-link-btn" href={chapter9Hash('2-5')}>Build the whole chain in Chapter 9</a>
      </div>
    </div>
  )
}
