// Section 2 scene text (topics 2.1 to 2.5). Every string in S2_SOURCE is a phrase from content/chapter7.md:
// scenesText.test.ts checks. Wording that is not in the md is in designerText.ts.

/** 2.1: the company in the middle, then primary users and other users with what each wants to know (user table and the investor and lender purposes). */
export const COMPANY = { name: 'Himalayan Manufacturing Ltd.', centre: 'Financial statements' } as const

export const USERS = [
  { name: 'Investors', primary: true, ask: ['Buying, selling or holding equity shares', 'Assessing risk and return', 'Assessing the ability to pay dividends'] },
  { name: 'Lenders and Other Creditors', primary: true, ask: ['Assessing whether loans and interest will be repaid when due', 'Assessing creditworthiness before extending credit'] },
  { name: 'Employees', primary: false, ask: ["Employer's stability and profitability; ability to provide remuneration, employment and retirement benefits."] },
  { name: 'Customers', primary: false, ask: ['Whether the business will continue to exist, particularly where they depend on it over the long term.'] },
  { name: 'Suppliers and Business Partners', primary: false, ask: ['Likelihood of being paid when due.'] },
  { name: 'Governments and Regulators', primary: false, ask: ['Resource allocation, regulation, taxation income and national statistics.'] },
  { name: 'Public and Community Representatives', primary: false, ask: ['Trends in business prosperity, particularly where the business contributes substantially to the local economy.'] },
] as const

/** 2.2: three statements with the question each answers, two assumptions, and the accruals example. */
export const STATEMENTS = [
  { name: 'Statement of Financial Position', question: 'What does the company own and owe at a particular date?', tag: 'Position at a date' },
  { name: 'Statement of Profit or Loss', question: 'How much income and expense occurred during the period?', tag: 'Performance over a period' },
  { name: 'Statement of Cash Flows', question: 'Where did cash come from and where did it go?', tag: 'Cash generated and used' },
] as const

export const ASSUMPTIONS = [
  { name: 'Accruals Basis', text: 'Transactions are recognised when they occur, not when cash is received or paid.' },
  { name: 'Going Concern', text: 'The business is assumed to continue in operation for the foreseeable future.' },
] as const

export const TIMELINE = {
  saleDate: '25 December',
  sale: 'Sale on credit, NPR 2,00,000',
  cashDate: '15 January',
  accrualsNote: 'Under the accruals basis, the sale is recognised in December when the transaction occurs, not in January when cash is received.',
} as const

/** 2.3: the NFRS tree. */
export const QC = {
  root: 'Qualitative characteristics',
  fundamental: { name: 'Fundamental', purpose: 'Must be present' },
  enhancing: { name: 'Enhancing', purpose: 'Increase usefulness' },
  relevance: { name: 'Relevance', def: 'Information is relevant when it is capable of making a difference in users\' decisions.', parts: ['Predictive Value', 'Confirmatory Value', 'Materiality'] },
  faithful: { name: 'Faithful Representation', def: "Financial information must faithfully represent the entity's economic phenomena in words and numbers.", parts: ['Complete', 'Neutral', 'Free from Error'] },
  prudence: 'Prudence',
  materialityNote: 'Materiality is an aspect of Relevance.',
  prudenceNote: 'Prudence supports neutrality.',
  uctv: [
    { letter: 'U', name: 'Understandability', text: 'Clear and concise.' },
    { letter: 'C', name: 'Comparability', text: 'Consistent treatment.' },
    { letter: 'V', name: 'Verifiability', text: 'Independent observers can reach consensus.' },
    { letter: 'T', name: 'Timeliness', text: 'Available in time for decisions.' },
  ],
} as const

/** 2.4: the cost constraint examples and the five limitations with the md's scenario for each. */
export const COST_EXAMPLES = [
  { benefit: 'NPR 1,00,000', cost: 'NPR 30,000', net: 'NPR 70,000', bw: 100, cw: 30, ok: true, msg: 'The benefits exceed the cost, so preparing the information may be worthwhile.' },
  { benefit: 'NPR 20,000', cost: 'NPR 50,000', net: '(NPR 30,000)', bw: 40, cw: 100, ok: false, msg: 'The cost exceeds the expected benefit. The information may not justify the cost of providing it.' },
] as const
export const COST_LABELS = { benefit: 'Expected benefit to users', cost: 'Cost of preparing report', net: 'Net benefit' } as const

export const LIMITATIONS = [
  { name: 'Highly Aggregated', scenario: "A company's annual report shows only total operating expenses, making it difficult to identify individual expense components." },
  { name: 'Backward-Looking', scenario: "An investor wants information about future business performance, but the annual statements mainly report the previous year's results." },
  { name: 'Omits Non-Financial Data', scenario: "A financial report does not discuss the company's operational risks or management policies." },
  { name: 'Historical Cost Basis', scenario: 'An asset purchased many years ago remains recorded at its original cost, which may be misleading during high inflation.' },
  { name: 'Standardised Format', scenario: 'The same reporting presentation does not meet the specific information needs of different types of businesses and readers.' },
] as const

/** 2.5: user and additional information (the table in "Understand the five examples"). */
export const OTHER_SOURCES = [
  { user: 'Owner-managers', info: 'Internal budgets, forecasts, divisional accounts and future plans.' },
  { user: 'Banks', info: 'Additional access under loan agreements.' },
  { user: 'Potential investors', info: 'Negotiated access for a major or controlling investment.' },
  { user: 'Suppliers', info: 'Credit standing reports from agencies such as Experian.' },
  { user: 'General public', info: "Publicly available brochures, press releases, brokers' reports and media coverage." },
] as const

export const S2_SOURCE: readonly string[] = [
  COMPANY.name,
  COMPANY.centre,
  'Primary user',
  'Other user',
  ...USERS.flatMap((u) => [u.name, ...u.ask]),
  ...STATEMENTS.flatMap((s) => [s.name, s.question, s.tag]),
  ...ASSUMPTIONS.flatMap((a) => [a.name, a.text]),
  TIMELINE.saleDate,
  TIMELINE.sale,
  TIMELINE.cashDate,
  TIMELINE.accrualsNote,
  QC.root,
  QC.fundamental.name,
  QC.fundamental.purpose,
  QC.enhancing.name,
  QC.enhancing.purpose,
  QC.relevance.name,
  QC.relevance.def,
  ...QC.relevance.parts,
  QC.faithful.name,
  QC.faithful.def,
  ...QC.faithful.parts,
  QC.prudence,
  QC.materialityNote,
  QC.prudenceNote,
  ...QC.uctv.flatMap((u) => [u.name, u.text]),
  ...COST_EXAMPLES.flatMap((e) => [e.benefit, e.cost, e.net, e.msg]),
  ...Object.values(COST_LABELS),
  ...LIMITATIONS.flatMap((l) => [l.name, l.scenario]),
  ...OTHER_SOURCES.flatMap((s) => [s.user, s.info]),
]
