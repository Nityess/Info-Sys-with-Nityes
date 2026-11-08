import type { Unit } from '../../types'
import { SECTION_A, card, item } from './helpers'

// Ch7 §1.4 – §1.9. Leaf titles follow the owner's mind map; details follow the textbook.

export const costAndValue: Unit = {
  id: 'ch07-cost-and-value',
  lo: '§1.4',
  section: SECTION_A,
  title: 'Cost and Value Assessment',
  objective: 'Ch7 §1.4: is more information worth getting?',
  cards: [
    card('benefits', 'Extra benefits expected', 'Extra benefits', 'Weigh the extra benefit expected from getting more information.'),
    card('costs', 'Extra costs of obtaining', 'Extra costs', 'Weigh the extra cost of obtaining it. Information gaining NRs 9,000 profit is not worth NRs 10,000.'),
    card('action', 'Actual value from action taken', 'Value from action', 'Information obtained but not used has no value. Only the action taken from it has actual value.'),
  ],
  practice: [
    item('p1', 'action', 'A detailed report is produced every month but nobody reads it.', 'Unused information has no actual value.'),
    item('p2', 'costs', 'A new survey would need two extra staff for three months.', 'This is the extra cost of obtaining it.'),
    item('p3', 'benefits', 'Better stock data is expected to cut wastage by 5%.', 'This is the extra benefit expected.'),
  ],
}

export const itDeliverySupport: Unit = {
  id: 'ch07-it-delivery-support',
  lo: '§1.5–1.8',
  section: SECTION_A,
  title: 'IT Delivery and Support',
  objective: 'Ch7 §1.5 – §1.8: running the IT function so it adds value.',
  cards: [
    card('delivery', 'IT delivery (operations, capacity, billing, continuity)', 'IT delivery', 'Service operations (reports), capacity management, customer billing and budgeting, service levels, continuity.'),
    card('support', 'IT support (configuration, integrity, security, incident resolution)', 'IT support', 'Configuring hardware, software and networks; maintenance; security and access control; resolving incidents.'),
    card('management', 'Management actions (monitoring, planning, structure, staffing)', 'Management actions', 'Monitor IT developments, plan change, prioritise and document tasks, recruit and retain skilled staff.'),
    card('external', 'External support and outsourcing', 'External & outsourcing', 'User groups and peer communities; outsourcing contracts out a function, with service level agreements.'),
    card('innovation', 'Innovation and distributed ledger technology', 'Innovation', 'Invest in new IT to keep up with competitors, e.g. distributed ledgers for asset recording.'),
  ],
  practice: [
    item('p1', 'support', 'The IT team investigates why the server crashed last night.', 'Resolving incidents is IT support.'),
    item('p2', 'delivery', 'Month-end reports are extracted and distributed to managers.', 'Report production is IT delivery.'),
    item('p3', 'external', 'Payroll IT is handed to an outside firm under a service level agreement.', 'Contracting out a function: outsourcing.'),
    item('p4', 'management', 'The finance director keeps a list of contacts to stay aware of new IT.', 'Monitoring developments is a management action.'),
    item('p5', 'innovation', 'The firm trials distributed ledger technology to record assets.', 'Investing in new IT: innovation.'),
  ],
}

export const cativa: Unit = {
  id: 'ch07-cativa',
  lo: '§1.9',
  section: SECTION_A,
  title: 'Information Processing (CATIVA)',
  objective: 'Ch7 §1.9: the CATIVA criteria for effective information processing.',
  cards: [
    card('completeness', 'Completeness (everything processed)', 'Completeness', 'Everything that needs to be processed should be processed.'),
    card('accuracy', 'Accuracy (true to sources, no errors)', 'Accuracy', 'Data stays true to its sources and the information produced contains no errors.'),
    card('timeliness', 'Timeliness (real-time processing)', 'Timeliness', 'Processing keeps pace with data availability and needs, often in real time.'),
    card('inalterability', 'Inalterability (no unauthorized intervention)', 'Inalterability', 'No unauthorised intervention during processing, and no alteration once completed.'),
    card('verifiability', 'Verifiability (audit trail capable)', 'Verifiability', 'The trail from data through processing to information can be followed (audit trail).'),
    card('assessability', 'Assessability (open to scrutiny)', 'Assessability', 'The effectiveness of processing is open to scrutiny so its quality can be judged.'),
  ],
  practice: [
    item('p1', 'inalterability', 'Only authorised staff can change the transaction processing system.', 'No unauthorised intervention: inalterability.'),
    item('p2', 'accuracy', 'Managers ignore monthly data because it keeps containing errors.', 'Errors in output: accuracy fails.'),
    item('p3', 'verifiability', 'An auditor traces a total back to the original invoices.', 'Following the trail: verifiability.'),
    item('p4', 'completeness', 'Some sales from one branch were never processed.', 'Not everything processed: completeness fails.'),
    item('p5', 'assessability', 'The quality of the processing is reviewed by an independent team.', 'Open to scrutiny: assessability.'),
  ],
}
