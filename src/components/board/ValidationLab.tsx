import { useState } from 'react'
import { AGE, INVOICE, ageMsg, ageOk, controlTotal, fmt, hashTotal, invoiceMsg, invoiceOk, stepAge, stepInvoice } from './labLogic'
import type { TotalCheck } from './labLogic'

function Stepper({ label, value, text, onDown, onUp, width }: { label: string; value: string; text: string; onDown: () => void; onUp: () => void; width: string }) {
  return (
    <div className="bd-labrow">
      <button type="button" className="bd-step" aria-label={`Lower ${label}`} onClick={onDown}>−</button>
      <b className="bd-serif bd-labval" style={{ minWidth: width }} aria-live="polite" aria-label={`${label} ${text}`}>{value}</b>
      <button type="button" className="bd-step" aria-label={`Raise ${label}`} onClick={onUp}>+</button>
    </div>
  )
}

function Verdict({ ok, msg }: { ok: boolean; msg: string }) {
  return <div className={`bd-fb ${ok ? 'bd-fb-ok' : 'bd-fb-bad'}`} role="status">{msg}</div>
}

function TotalLab({ title, blurb, check, onToggle }: { title: string; blurb: string; check: TotalCheck; onToggle: () => void }) {
  return (
    <div className="bd-lab">
      <b>{title}</b>
      <span style={{ fontSize: '.9375rem' }}>{blurb}</span>
      <button type="button" className="bd-btn" onClick={onToggle}>{check.button}</button>
      <span style={{ fontWeight: 700 }}>Processed total: {check.processed}</span>
      <Verdict ok={check.ok} msg={check.msg} />
    </div>
  )
}

/** Chapter 8, topic 3.6: four programmed checks to try. Range check, limit check, control total and hash total. */
export function ValidationLab() {
  const [age, setAge] = useState<number>(AGE.start)
  const [inv, setInv] = useState<number>(INVOICE.start)
  const [ct, setCt] = useState(false)
  const [ht, setHt] = useState(false)
  return (
    <div className="bd-row2">
      <div className="bd-lab">
        <b>Range check: age 18 to 60</b>
        <Stepper label="age" value={String(age)} text={`${age}`} width="3ch" onDown={() => setAge(stepAge(age, -1))} onUp={() => setAge(stepAge(age, 1))} />
        <Verdict ok={ageOk(age)} msg={ageMsg(age)} />
      </div>
      <div className="bd-lab">
        <b>Limit check: invoice up to NPR 500,000</b>
        <Stepper label="invoice" value={fmt(inv)} text={`${inv}`} width="7ch" onDown={() => setInv(stepInvoice(inv, -1))} onUp={() => setInv(stepInvoice(inv, 1))} />
        <Verdict ok={invoiceOk(inv)} msg={invoiceMsg(inv)} />
      </div>
      <TotalLab title="Control total: five salaries" blurb="30,000 + 35,000 + 40,000 + 45,000 + 50,000. Expected total: 200,000." check={controlTotal(ct)} onToggle={() => setCt(!ct)} />
      <TotalLab title="Hash total: five employee IDs" blurb="101 + 102 + 103 + 104 + 105. Expected total: 515. It has no financial meaning." check={hashTotal(ht)} onToggle={() => setHt(!ht)} />
    </div>
  )
}
