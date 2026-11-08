import { useMemo, useState } from 'react'
import type { ParsedTopic } from '../../../content/chapter7/types'
import { remaining, tryPlace } from '../../rail/topics/binSorterLogic'
import { parseCompare, parseMemos, typeName } from '../infoTypes'
import type { TypeKey } from '../infoTypes'

const XP_SORT = 20
const START = 'Pick a memo to begin.'
const HINT = 'Not that bin. Think about who uses it and why, not keywords like “report”, “budget” or “daily”.'

interface Props {
  topic: ParsedTopic
  unitId: string
  claim: (key: string, xp: number) => number
}

/** Step 4: tap a memo, then tap the bin it belongs in. No dragging needed, so it works on a phone and with a keyboard. */
export function PlaygroundPane({ topic, unitId, claim }: Props) {
  const memos = useMemo(() => parseMemos(topic), [topic])
  const bins = useMemo(() => parseCompare(topic), [topic])
  const [placed, setPlaced] = useState<Readonly<Record<string, string>>>({})
  const [picked, setPicked] = useState<string | null>(null)
  const [msg, setMsg] = useState(START)
  const [kind, setKind] = useState<'info' | 'ok' | 'bad'>('info')
  const [bump, setBump] = useState(0)
  const left = remaining(memos, placed).length

  const drop = (bin: TypeKey) => {
    const memo = memos.find((m) => m.id === picked)
    if (!memo) {
      setMsg('Tap a memo first.')
      setKind('info')
      return
    }
    const r = tryPlace(placed, memo, bin)
    if (!r.ok) {
      setKind('bad')
      setMsg(HINT)
      setBump((n) => n + 1)
      return
    }
    setPlaced(r.placed)
    setPicked(null)
    setKind('ok')
    if (remaining(memos, r.placed).length === 0) {
      // The last memo landed: pay the XP once
      const granted = claim(`${unitId}:sort`, XP_SORT)
      setMsg(`All sorted. Well done.${granted > 0 ? ` +${granted} XP` : ''}`)
    } else {
      setMsg(`Correct. ${typeName(bin)}: ${memo.why}.`)
    }
  }

  const reset = () => {
    setPlaced({})
    setPicked(null)
    setMsg(START)
    setKind('info')
  }

  return (
    <div className="ls-stack">
      <div className="ls-fb ls-fb-info"><b>How to play.</b> Tap a memo, then tap the bin where it belongs.</div>
      <div className="ls-two">
        <div className="ls-memos">
          <span className="ls-label">Bank memos: {left} left</span>
          {memos.map((m) => {
            const done = m.id in placed
            return (
              <button
                key={m.id}
                type="button"
                disabled={done}
                aria-pressed={picked === m.id}
                className={`ls-memo${done ? ' ls-memo-done' : picked === m.id ? ' ls-memo-on' : ''}`}
                onClick={() => {
                  setPicked(m.id)
                  setMsg('Now tap the bin it belongs in.')
                  setKind('info')
                }}
              >
                {m.text}
              </button>
            )
          })}
        </div>
        <div className="ls-bins">
          {bins.map((b) => {
            const n = memos.filter((m) => placed[m.id] === b.key).length
            return (
              <button key={b.key} type="button" className={`ls-bin ls-ty-${b.key}`} onClick={() => drop(b.key)}>
                <span className="ls-bin-h"><i />{b.name}</span>
                <span className="ls-bin-who">{b.who}</span>
                <span className="ls-bin-n">{n ? `${n} sorted` : ''}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div key={kind === 'bad' ? bump : 0} role="status" className={`ls-fb ${kind === 'ok' ? 'ls-fb-ok' : kind === 'bad' ? 'ls-fb-bad ls-shake' : 'ls-fb-info'}`}>{msg}</div>
      <div><button type="button" className="ls-btn ls-ghost" style={{ minHeight: '2.75rem' }} onClick={reset}>Reset</button></div>
    </div>
  )
}
