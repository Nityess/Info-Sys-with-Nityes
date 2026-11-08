// Topic 1.9: the six CATIVA criteria (the source's own mnemonic) and the faults of the "Break the pipeline" playground.

export interface Gate {
  id: string
  letter: string
  name: string
  /** Revision-card recall line */
  remember: string
}

export const GATES: Gate[] = [
  { id: 'completeness', letter: 'C', name: 'Completeness', remember: 'Nothing omitted' },
  { id: 'accuracy', letter: 'A', name: 'Accuracy', remember: 'No errors' },
  { id: 'timeliness', letter: 'T', name: 'Timeliness', remember: 'When needed' },
  { id: 'inalterability', letter: 'I', name: 'Inalterability', remember: 'No unauthorised changes' },
  { id: 'verifiability', letter: 'V', name: 'Verifiability', remember: 'Audit trail' },
  { id: 'assessability', letter: 'A', name: 'Assessability', remember: 'Open to scrutiny' },
]

export interface Fault {
  id: string
  label: string
  /** Id of the gate that fails */
  gate: string
  why: string
}

export const FAULTS: Fault[] = [
  { id: 'branches', label: 'Drop two branches from the data', gate: 'completeness', why: 'Two branches that should have been processed are missing. Completeness fails.' },
  { id: 'figure', label: 'Change a figure', gate: 'accuracy', why: 'The report no longer reflects the source records. Accuracy fails.' },
  { id: 'delay', label: 'Delay the report by days', gate: 'timeliness', why: 'The information arrives after it was needed. Timeliness fails.' },
  { id: 'edit', label: 'Let an unauthorised user edit the process', gate: 'inalterability', why: 'The process was changed by someone not authorised. Inalterability fails.' },
  { id: 'trail', label: 'Remove the audit trail', gate: 'verifiability', why: 'The data trail from source to report cannot be followed. Verifiability fails.' },
  { id: 'hidden', label: 'Hide the process from review', gate: 'assessability', why: 'The effectiveness of processing cannot be scrutinised. Assessability fails.' },
]

/** Gate id to status for a run: only the faulty gate fails. */
export function gateStatus(faultId: string | null): Record<string, 'pass' | 'fail'> {
  const fault = FAULTS.find((f) => f.id === faultId)
  return Object.fromEntries(GATES.map((g) => [g.id, g.id === fault?.gate ? 'fail' : 'pass']))
}

/** The two confusable pairs from section 3, as short contrasts. */
export const PAIRS = [
  { a: 'Accuracy', aText: 'No errors in the information.', b: 'Inalterability', bText: 'No unauthorised changes to the process.' },
  { a: 'Verifiability', aText: 'The data trail can be followed.', b: 'Assessability', bText: 'The effectiveness of processing can be scrutinised.' },
]
