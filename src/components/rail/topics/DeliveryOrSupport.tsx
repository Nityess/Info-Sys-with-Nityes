import { BinSorter } from './BinSorter'
import type { BinDef } from './BinSorter'
import type { BinItem } from './binSorterLogic'

const BINS: BinDef[] = [
  { id: 'serve', label: 'SERVE (IT Delivery)', tone: 'border-blue-400 bg-blue-50/60 dark:bg-blue-950/20' },
  { id: 'protect', label: 'PROTECT (IT Support)', tone: 'border-teal-400 bg-teal-50/60 dark:bg-teal-950/20' },
]

// The six activities from "Test the distinction" in section 4
const ITEMS: BinItem[] = [
  { id: 'd1', text: 'Extracts daily transaction reports.', bin: 'serve', why: 'Report production is an IT service operation: Delivery.' },
  { id: 'd2', text: 'Maintains the network connecting branches.', bin: 'protect', why: 'Maintaining networks is infrastructure work: Support.' },
  { id: 'd3', text: 'Distributes reports to management.', bin: 'serve', why: 'Report distribution is an IT service operation: Delivery.' },
  { id: 'd4', text: 'Controls access to the banking application.', bin: 'protect', why: 'Security and access control protects the infrastructure: Support.' },
  { id: 'd5', text: 'Investigates a network incident.', bin: 'protect', why: 'Incident investigation and resolution: Support.' },
  { id: 'd6', text: 'Monitors IT service capacity.', bin: 'serve', why: 'Capacity monitoring and management: Delivery.' },
]

/** Topic 1.6 playground: sort six bank IT activities into SERVE or PROTECT. */
export function DeliveryOrSupport() {
  return (
    <BinSorter
      items={ITEMS}
      bins={BINS}
      hint="Not that one. Do not go by the computers involved: ask whether it serves users with a service or protects the infrastructure."
      doneText="All six sorted. Producing a banking report is Delivery. Maintaining the server behind it is Support."
    />
  )
}
