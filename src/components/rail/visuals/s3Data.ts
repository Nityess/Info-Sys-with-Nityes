// Section 3 scene text (the Start loop and topics 3.1 to 3.4). Every string in S3_SOURCE is a phrase from
// content/chapter7.md: scenesText.test.ts checks. Sample spreadsheet cells and diagram labels are in designerText.ts.

/** Start: the information system loop (Section 3 introduction). */
export const LOOP = {
  caption: 'An Information System refers to all systems and procedures involved in the',
  steps: [
    { name: 'Collection', text: 'Collection of information.', icon: 'cart' },
    { name: 'Storage', text: 'Storage of information.', icon: 'database' },
    { name: 'Production', text: 'Production of information.', icon: 'table' },
    { name: 'Distribution', text: 'Distribution of information.', icon: 'people' },
  ],
} as const

/** 3.1: what each content type is, formula against function. */
export const CELL_TYPES = {
  Text: 'Usually words or descriptions.',
  Value: 'Numbers that can be used in calculations.',
  Formula: 'Expressions that calculate the value of a cell. They usually refer to other cells.',
  Function: 'Predefined formulae built into the spreadsheet application.',
} as const
export type CellType = keyof typeof CELL_TYPES
export const FORMULA = '=B4+B5'
export const FUNCTION = '=SUM(B4:B10)'
export const FORMULA_VS_FUNCTION = ['Formula = You write the calculation.', 'Function = The application provides a ready-made calculation.'] as const
export const CELL_EXAM_POINT = 'Cell A4 refers to the cell at the intersection of column A and row 4.'

/** 3.2 */
export const DB = {
  structured: {
    name: 'Structured data',
    note: 'Data organised in defined fields and tables.',
    example: 'Financial records',
    header: ['Customer ID', 'Name', 'Balance'],
    rows: [['101', 'Ram', '15,000'], ['102', 'Sita', '20,000'], ['103', 'Hari', '12,000']],
  },
  unstructured: {
    name: 'Unstructured data',
    note: 'Data that is not organised in the same defined table-and-field structure.',
    files: ['Text files', 'Audio files', 'Video files'],
    examples: 'Examples: Text, audio and video files.',
  },
  storage: [
    { label: 'Small databases', where: 'Local file system', note: 'Can be stored on a local file system.', width: 14 },
    { label: 'Larger databases', where: 'Servers / Cloud', note: 'Require servers or cloud infrastructure.', width: 94 },
  ],
} as const

/** 3.3 */
export const SOFTWARE = {
  kinds: [
    { name: 'Off-the-shelf', text: 'Purchased as an existing software package.' },
    { name: 'Custom-made', text: "Developed or customised for a particular organisation's requirements." },
  ],
  examples: ['QuickBooks', 'SAP', 'Oracle', 'Microsoft'],
  advantages: [
    { text: 'Accounting calculations are easier to perform', remember: 'Accounting calculations' },
    { text: 'Less office space required for physical books of account', remember: 'Reduced physical books' },
    { text: 'Aids both internal and external audit - saves costs', remember: 'Internal and external audit' },
    { text: 'Can provide access to external authorities such as tax authorities', remember: 'Tax authorities' },
    { text: 'Reports can be produced at any time - not just at year end', remember: 'Not just year end' },
    { text: 'Quicker and easier access to financial information for non-accountants', remember: 'Non-accountants' },
  ],
} as const

/** 3.4 */
export const NETWORKS = [
  { key: 'LAN', name: 'Local Area Network', coverage: 'Short distance, such as within a single building.', feature: 'Typically uses physical cables.', example: 'Computers connected within one office building.' },
  { key: 'WLAN', name: 'Wireless Local Area Network', coverage: 'Similar to LAN, but using wireless connectivity.', feature: 'Uses radio transmission; no physical cables are needed for the wireless connection.', example: 'Employees connect laptops and mobile devices to an office Wi-Fi network.', warn: 'WLAN is not the same as WAN.' },
  { key: 'WAN', name: 'Wide Area Network', coverage: 'Wide geographical area, such as across a region or country.', feature: 'Connects multiple LANs over long distances.', example: 'A bank connects its Kathmandu, Pokhara and Biratnagar branch networks.' },
  { key: 'VPN', name: 'Virtual Private Network', coverage: 'Any distance, over the internet.', feature: 'Encrypted connection that protects user identity and denies access to hackers.', example: "An employee is working from home and needs to connect securely to the company's network over the internet." },
] as const
export const NETWORK_ADVANTAGES = ['Productivity', 'Communication', 'Remote Working', 'Resource Management', 'Flexibility'] as const

export const S3_SOURCE: readonly string[] = [
  LOOP.caption,
  ...LOOP.steps.flatMap((s) => [s.name, s.text]),
  ...Object.values(CELL_TYPES),
  FORMULA,
  FUNCTION,
  ...FORMULA_VS_FUNCTION,
  CELL_EXAM_POINT,
  DB.structured.name,
  DB.structured.note,
  DB.structured.example,
  ...DB.structured.header,
  ...DB.structured.rows.flat(),
  DB.unstructured.name,
  DB.unstructured.note,
  ...DB.unstructured.files,
  DB.unstructured.examples,
  ...DB.storage.flatMap((s) => [s.label, s.where, s.note]),
  ...SOFTWARE.kinds.flatMap((k) => [k.name, k.text]),
  ...SOFTWARE.examples,
  ...SOFTWARE.advantages.flatMap((a) => [a.text, a.remember]),
  ...NETWORKS.flatMap((n) => [n.name, n.coverage, n.feature, n.example, ...('warn' in n ? [n.warn] : [])]),
  ...NETWORK_ADVANTAGES,
]
