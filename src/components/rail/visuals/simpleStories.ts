// "In simple words" blocks for the concept scenes: one plain sentence, four picture frames, three glossary lines.
//
// PENDING TEACHER REVIEW. Every line here was written by the designer (landing-handoff/design/Section*.dc.html),
// not taken from content/chapter7.md. The everyday and Nepal bank and shop examples need the owner's approval.
// Where chapter7.md has its own wording for a line, replace it here. Keyed by topic code; "start" is the
// Section 3 information system loop.

import type { IconName } from './iconData'

export interface StoryFrame {
  icon: IconName
  text: string
}

export interface SimpleStoryData {
  /** One plain sentence */
  simple: string
  /** Four numbered picture frames */
  frames: readonly StoryFrame[]
  /** Three "X means Y" lines */
  terms: readonly { term: string; means: string }[]
}

export const STORIES_PENDING_REVIEW = true

export const SIMPLE_STORIES: Readonly<Record<string, SimpleStoryData>> = {
  'start': {
    simple: 'Every business runs the same loop: collect, store, make, share.',
    frames: [
      { icon: 'cart', text: 'Collection: a shop records every sale.' },
      { icon: 'database', text: 'Storage: the sales are kept in a database.' },
      { icon: 'table', text: 'Production: the sales become a report.' },
      { icon: 'people', text: 'Distribution: the report goes to the managers.' },
    ],
    terms: [
      { term: 'Information system', means: 'all the systems and steps that handle information' },
      { term: 'Database', means: 'an organised store of information' },
      { term: 'Report', means: 'information arranged for a reader' },
    ],
  },
  '1.2': {
    simple: 'People at different levels of a bank need different information. We name the information by how it is used.',
    frames: [
      { icon: 'person', text: 'The Board asks: should we open branches across Nepal in five years? This is Strategic.' },
      { icon: 'people', text: 'A regional manager checks this month’s branch report. This is Tactical.' },
      { icon: 'clock', text: 'Branch staff check today’s list of overdrawn accounts. This is Operational.' },
      { icon: 'calendar', text: 'The planning team writes next year’s budget. This is Planning.' },
    ],
    terms: [
      { term: 'Estimate', means: 'a rough guess, not an exact number' },
      { term: 'Variance report', means: 'a report showing how actual figures differ from the plan' },
      { term: 'Overdraft', means: 'spending more than the money in the account' },
    ],
  },
  '1.3': {
    simple: 'Good information is like a good map. It is correct, complete, easy to read, and it reaches you in time.',
    frames: [
      { icon: 'doc', text: 'A CEO gets a monthly report about five branches.' },
      { icon: 'alert', text: 'Some figures are wrong, two branches are missing, and it came three weeks late.' },
      { icon: 'cross', text: 'He cannot decide which branch needs help. The report is not good information.' },
      { icon: 'check', text: 'Good information fixes all of these. Remember ACCURATE.' },
    ],
    terms: [
      { term: 'Authoritative', means: 'from a source you can trust' },
      { term: 'Cost-beneficial', means: 'worth the money spent to make it' },
      { term: 'User-targeted', means: 'made for the person who will read it' },
    ],
  },
  '1.4': {
    simple: 'Two owners read two reports. The better report is worth more to them.',
    frames: [
      { icon: 'building', text: 'Two owners want to open a restaurant in Kathmandu.' },
      { icon: 'check', text: 'Report A: trusted writer, clear charts, easy to find, about restaurants.' },
      { icon: 'cross', text: 'Report B: unknown website, confusing 100 pages, hard to find, about software.' },
      { icon: 'target', text: 'Report A is more valuable. Value comes from usefulness, not from being rare.' },
    ],
    terms: [
      { term: 'Assimilation', means: 'how easily you can understand it' },
      { term: 'Accessible', means: 'easy to get' },
      { term: 'Relevant', means: 'useful for this person’s decision' },
    ],
  },
  '1.5': {
    simple: 'Pay for extra information only if it earns you more than it costs. And use it, or it is worth nothing.',
    frames: [
      { icon: 'money', text: 'A company can pay NPR 1,00,000 for extra market information.' },
      { icon: 'chartup', text: 'The expected extra profit from it is NPR 90,000.' },
      { icon: 'scales', text: '90,000 minus 1,00,000 is minus 10,000. The net value is negative.' },
      { icon: 'cross', text: 'Not worth buying. A report nobody uses has no value.' },
    ],
    terms: [
      { term: 'Net value', means: 'extra benefit minus extra cost' },
      { term: 'Extra benefit', means: 'the extra profit the information gives' },
      { term: 'MIS enquiry', means: 'a question you ask your own information system' },
    ],
  },
  '1.6': {
    simple: 'IT Delivery serves the users. IT Support protects and looks after the technology behind it.',
    frames: [
      { icon: 'printer', text: 'Staff need today’s report. IT Delivery prepares and sends it.' },
      { icon: 'server', text: 'Servers and networks must stay working. That is IT Support.' },
      { icon: 'lock', text: 'Only allowed staff can open customer data. That is Support too.' },
      { icon: 'gear', text: 'Management watches new technology and plans changes. Remember MPSS.' },
    ],
    terms: [
      { term: 'Infrastructure', means: 'the hardware, software and networks' },
      { term: 'Incident', means: 'a problem or failure that must be fixed' },
      { term: 'Service levels', means: 'the quality of service that was promised' },
    ],
  },
  '1.7': {
    simple: 'Outsourcing means a business pays another company to do a job for it, under a contract.',
    frames: [
      { icon: 'building', text: 'A bank has an IT job to do.' },
      { icon: 'link', text: 'It signs a contract with an outside IT company.' },
      { icon: 'check', text: 'Benefit: staff focus on banking, and the provider is skilled in IT.' },
      { icon: 'alert', text: 'Challenge: less direct control, more formal rules, and the SLA must be agreed.' },
    ],
    terms: [
      { term: 'Core activity', means: 'the main work of the business' },
      { term: 'SLA', means: 'a written promise about how good the service will be' },
      { term: 'Arm’s length', means: 'managed from a distance, not directly' },
    ],
  },
  '1.8': {
    simple: 'Technology keeps changing fast. A business that does not adopt new technology is left behind.',
    frames: [
      { icon: 'hourglass', text: 'Company A keeps its old technology and slows down.' },
      { icon: 'rocket', text: 'Company B invests in new technology and moves ahead.' },
      { icon: 'database', text: 'Distributed ledger technology helps record assets more accurately.' },
      { icon: 'film', text: 'Digital video courses reach students in many places.' },
    ],
    terms: [
      { term: 'Distributed ledger', means: 'a record shared and kept on many computers' },
      { term: 'Digital assets', means: 'sound and video products sold digitally' },
      { term: 'Competitive advantage', means: 'being better than your rivals' },
    ],
  },
  '1.9': {
    simple: 'Data is raw. Processing turns it into information. Six checks make sure the processing is good.',
    frames: [
      { icon: 'table', text: 'Raw sales data comes in from five branches.' },
      { icon: 'gear', text: 'Processing adds it up and makes a report.' },
      { icon: 'shield', text: 'Six checks: all included, correct, on time, protected, traceable, reviewable.' },
      { icon: 'doc', text: 'The result is information that management can trust.' },
    ],
    terms: [
      { term: 'Inalterable', means: 'cannot be changed by the wrong people' },
      { term: 'Audit trail', means: 'a path from the report back to the source' },
      { term: 'Assessable', means: 'open to review, so its quality can be judged' },
    ],
  },
  '2.1': {
    simple: 'Many people read a company’s financial statements. Each one reads them for their own reason.',
    frames: [
      { icon: 'chartup', text: 'Investors ask: should I buy, sell or hold shares?' },
      { icon: 'bank', text: 'Lenders ask: will my loan and interest be repaid?' },
      { icon: 'people', text: 'Employees ask: will this company stay stable and keep my job?' },
      { icon: 'building', text: 'Government asks: how much tax and what do the statistics show?' },
    ],
    terms: [
      { term: 'Equity shares', means: 'parts of ownership in a company' },
      { term: 'Creditor', means: 'someone the company owes money to' },
      { term: 'Dividend', means: 'profit paid out to shareholders' },
    ],
  },
  '2.2': {
    simple: 'Three statements answer three questions. Two ideas sit underneath them.',
    frames: [
      { icon: 'camera', text: 'Financial position: what the company owns and owes on one day.' },
      { icon: 'film', text: 'Profit or loss: income and expenses over a period.' },
      { icon: 'money', text: 'Cash flows: where cash came in and where it went out.' },
      { icon: 'calendar', text: 'Accruals: record a sale when it happens, not when the cash arrives.' },
    ],
    terms: [
      { term: 'Accruals', means: 'recording things when they happen' },
      { term: 'Going concern', means: 'the business will keep running' },
      { term: 'Stewardship', means: 'looking after resources that owners trusted to managers' },
    ],
  },
  '2.3': {
    simple: 'Good financial information must matter and must be true. Four extra qualities make it better.',
    frames: [
      { icon: 'target', text: 'Relevant: it can change a decision.' },
      { icon: 'scales', text: 'Faithful: complete, neutral and free from error.' },
      { icon: 'book', text: 'Enhancing: understandable, comparable, verifiable and timely.' },
      { icon: 'shield', text: 'Prudence: be careful, and do not be too hopeful.' },
    ],
    terms: [
      { term: 'Materiality', means: 'important enough to affect decisions' },
      { term: 'Neutral', means: 'not biased' },
      { term: 'Verifiable', means: 'others can check it and agree' },
    ],
  },
  '2.4': {
    simple: 'A report costs money, so its benefit must be higher than its cost. And reports have limits.',
    frames: [
      { icon: 'money', text: 'Benefit NPR 1,00,000, cost NPR 30,000. Net benefit NPR 70,000. Worth it.' },
      { icon: 'cross', text: 'Benefit NPR 20,000, cost NPR 50,000. Net loss NPR 30,000. Not worth it.' },
      { icon: 'calendar', text: 'Financial reports mostly look back at the past.' },
      { icon: 'doc', text: 'They show totals, leave out non-money facts and use old costs.' },
    ],
    terms: [
      { term: 'Aggregated', means: 'added together into totals' },
      { term: 'Historical cost', means: 'the price paid a long time ago' },
      { term: 'Standardised', means: 'the same format for everyone' },
    ],
  },
  '2.5': {
    simple: 'Some users need more than the published statements, so they get information from other places.',
    frames: [
      { icon: 'building', text: 'Owner-managers use internal budgets, forecasts and plans.' },
      { icon: 'bank', text: 'Banks get extra access under their loan agreements.' },
      { icon: 'link', text: 'Potential investors negotiate access before a big investment.' },
      { icon: 'globe', text: 'The public reads brochures, press releases and media.' },
    ],
    terms: [
      { term: 'Credit standing', means: 'how well a company repays what it owes' },
      { term: 'Controlling investment', means: 'buying enough shares to control the company' },
      { term: 'Broker’s report', means: 'an expert’s review of a company’s shares' },
    ],
  },
  '3.1': {
    simple: 'A spreadsheet is a big table. Every box is a cell, and every cell has an address.',
    frames: [
      { icon: 'table', text: 'Column A and row 4 meet at cell A4.' },
      { icon: 'pencil', text: 'Type words and you get text. Type numbers and you get values.' },
      { icon: 'calc', text: 'Write =B4+B5 yourself. That is a formula.' },
      { icon: 'sigma', text: 'The program gives =SUM(B4:B10) ready-made. That is a function.' },
    ],
    terms: [
      { term: 'Cell', means: 'one box in the grid' },
      { term: 'Workbook', means: 'a file that holds many sheets' },
      { term: 'Range', means: 'a block of cells, like B4:B10' },
    ],
  },
  '3.2': {
    simple: 'A database keeps information organised so you can find it again.',
    frames: [
      { icon: 'table', text: 'A neat table with ID, name and balance is structured data.' },
      { icon: 'film', text: 'Videos, audio and notes are unstructured data.' },
      { icon: 'drive', text: 'A small database can sit on one computer’s files.' },
      { icon: 'cloud', text: 'A large database needs servers or the cloud.' },
    ],
    terms: [
      { term: 'Structured', means: 'organised in fields and tables' },
      { term: 'Unstructured', means: 'not in a fixed table layout' },
      { term: 'Server', means: 'a powerful computer that serves others' },
    ],
  },
  '3.3': {
    simple: 'Accounting software does much of the bookkeeping work for you.',
    frames: [
      { icon: 'calc', text: 'It does the calculations for you.' },
      { icon: 'folder', text: 'You do not need big piles of paper books.' },
      { icon: 'search', text: 'Auditors and tax offices can check the records easily.' },
      { icon: 'calendar', text: 'You can print reports any day, not only at year end.' },
    ],
    terms: [
      { term: 'Off-the-shelf', means: 'bought ready-made' },
      { term: 'Custom-made', means: 'built for one company' },
      { term: 'Audit', means: 'a check of the accounts' },
    ],
  },
  '3.4': {
    simple: 'A network joins computers so they can share files, printers and messages.',
    frames: [
      { icon: 'plug', text: 'LAN: cables inside one building.' },
      { icon: 'wifi', text: 'WLAN: the same idea, but by Wi-Fi.' },
      { icon: 'globe', text: 'WAN: branches in different cities joined together.' },
      { icon: 'lock', text: 'VPN: a secret tunnel from home to the office.' },
    ],
    terms: [
      { term: 'Router', means: 'the box that sends data to the right place' },
      { term: 'Encrypted', means: 'scrambled so others cannot read it' },
      { term: 'Network', means: 'computers joined together' },
    ],
  },
}
