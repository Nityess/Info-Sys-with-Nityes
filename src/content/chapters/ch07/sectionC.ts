import type { Unit } from '../../types'
import { SECTION_C, card, item } from './helpers'

// Ch7 §3 – §3.2. Leaf titles follow the owner's mind map; details follow the textbook.

export const software: Unit = {
  id: 'ch07-software',
  lo: '§3.1',
  section: SECTION_C,
  title: 'IT Software Applications',
  objective: 'Ch7 §3.1: spreadsheets, databases and accounting packages. Choice depends on size, needs, cost and staff skills.',
  cards: [
    card('spreadsheet', 'Spreadsheets (cells, formulae, functions, workbooks)', 'Spreadsheet', 'Cells hold text, values, formulae (B4+B5) or functions (SUM). Worksheets sit in a workbook. Small firms often keep records here.'),
    card('database', 'Database systems (structured and unstructured data storage)', 'Database', 'Stores and manages structured (financial records) or unstructured (text, audio, video) data. Large ones need servers or cloud.'),
    card('accounting', 'Accounting software packages (off-the-shelf or custom)', 'Accounting package', 'Records and reports transactions. Easier calculations, less space, aids audit, quick reports any time.'),
  ],
  practice: [
    item('p1', 'spreadsheet', 'A shop owner totals weekly sales with =SUM(B2:B8).', 'Cells and functions: spreadsheet.'),
    item('p2', 'database', 'A hospital stores patient records plus scan images and audio notes.', 'Structured and unstructured data: database.'),
    item('p3', 'accounting', 'A large group has a custom-made system to record and report transactions.', 'Custom accounting software, typical of large firms.'),
    item('p4', 'accounting', 'The tax authority is given direct access to the company’s ledgers.', 'An advantage of accounting software.'),
  ],
}

export const networks: Unit = {
  id: 'ch07-networks',
  lo: '§3.2',
  section: SECTION_C,
  title: 'Computer Networks',
  objective: 'Ch7 §3.2: a network is two or more devices connected to exchange information and resources.',
  cards: [
    card('advantages', 'Advantages (productivity, remote working, flexibility)', 'Advantages', 'Productivity, better communication, remote working, central resource management, on-demand flexibility.'),
    card('architecture', 'Architecture types (client server and peer-to-peer)', 'Architecture', 'Client server: a central server serves client devices. Peer-to-peer: equal computers share resources, no server.'),
    card('scope', 'Geographical scope (LAN, WAN, WLAN, VPN)', 'Geographical scope', 'LAN: one building. WAN: region or country. WLAN: wireless, e.g. radio. VPN: encrypted connection.'),
  ],
  practice: [
    item('p1', 'advantages', 'Staff work from home, so the firm rents a smaller office.', 'Remote working saves office costs.'),
    item('p2', 'architecture', 'Three laptops share files directly with no central server.', 'Equal computers, no server: peer-to-peer.'),
    item('p3', 'scope', 'Head office in Kathmandu links to branches across Nepal.', 'Region or country: WAN.'),
    item('p4', 'architecture', 'All office PCs get files and email through one central server.', 'Central server: client server.'),
    item('p5', 'scope', 'A remote worker connects through an encrypted tunnel that hides their identity.', 'Encrypted connection: VPN.'),
  ],
}
