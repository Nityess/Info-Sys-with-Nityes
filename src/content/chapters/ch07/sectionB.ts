import type { Unit } from '../../types'
import { SECTION_B, card, item } from './helpers'

// Ch7 §2 – §2.5. Leaf titles follow the owner's mind map; details follow the textbook.

export const users: Unit = {
  id: 'ch07-users',
  hub: 'Users',
  lo: '§2',
  section: SECTION_B,
  title: 'Primary Users and Needs',
  objective: 'Ch7 §2: who uses financial information, and why.',
  cards: [
    card('investors', '📈', 'Present and potential investors (risk, return, dividends)', 'Investors', 'Buy, sell or hold equity: risk and return, ability to pay dividends, due diligence.'),
    card('lenders', '🏦', 'Lenders and payables (debt repayment assessment)', 'Lenders', 'Will loans and interest be repaid when due?'),
    card('employees', '👷', 'Employees (stability and remuneration)', 'Employees', 'Employer’s stability and profitability; ability to pay remuneration and retirement benefits.'),
    card('customers', '🛍️', 'Customers (business continuity assessment)', 'Customers', 'Will the business continue? Important for long-term or supply chain customers.'),
    card('suppliers', '🚚', 'Suppliers and business partners (payment likelihood)', 'Suppliers', 'How likely are they to be paid when due?'),
    card('government', '🏛️', 'Governments and regulators (taxation and policy)', 'Government', 'Allocate resources, regulate, assess tax income, national statistics, direct policy.'),
    card('public', '🏘️', 'Public and community (local economy contribution)', 'Public', 'Trends in prosperity, important where the business supports local jobs and suppliers.'),
  ],
  practice: [
    item('p1', 'investors', 'Mina reads the accounts before deciding to buy more shares.', 'Buying equity: investor.'),
    item('p2', 'lenders', 'A bank checks whether a loan can be repaid with interest.', 'Debt repayment: lender.'),
    item('p3', 'government', 'The tax office estimates how much tax the company will pay.', 'Taxation: government.'),
    item('p4', 'suppliers', 'A raw material supplier checks it will be paid on time.', 'Payment likelihood: supplier.'),
    item('p5', 'public', 'A town council studies the largest local employer’s prospects.', 'Local economy: public and community.'),
  ],
}

export const assumptions: Unit = {
  id: 'ch07-assumptions',
  hub: 'Assumptions',
  lo: '§2.1',
  section: SECTION_B,
  title: 'Underlying Assumptions',
  objective: 'Ch7 §2.1: the two assumptions behind useful financial information.',
  cards: [
    card('accrual', '📅', 'Accrual basis of accounting', 'Accrual basis', 'Effects of transactions are recognised when they occur, not when cash moves, in the period they relate to.'),
    card('going', '🔄', 'Going concern assumption', 'Going concern', 'The business will continue in operation for the foreseeable future.'),
  ],
  practice: [
    item('p1', 'accrual', 'March electricity is expensed in March, though the bill is paid in April.', 'Recorded when it occurs: accrual basis.'),
    item('p2', 'going', 'Assets are valued expecting the firm to keep trading next year.', 'Continuing in operation: going concern.'),
    item('p3', 'accrual', 'A sale on credit is recorded before the customer pays.', 'Not when cash is received: accrual basis.'),
  ],
}

export const statements: Unit = {
  id: 'ch07-statements',
  hub: 'Statements',
  lo: '§2.2',
  section: SECTION_B,
  title: 'Financial Statements Content',
  objective: 'Ch7 §2.2: what each financial statement tells users.',
  cards: [
    card('sofp', '⚖️', 'Statement of financial position (resources, liabilities, liquidity)', 'Financial position', 'Resources controlled, liabilities, financial structure, liquidity, solvency, adaptability.'),
    card('sopl', '💹', 'Statement of profit or loss (profitability and cash generation)', 'Profit or loss', 'Profitability and its variability: capacity to generate cash from existing resources.'),
    card('socf', '💵', 'Statement of cash flows (investing, financing, operating)', 'Cash flows', 'Past investing, financing and operating cash flows: how well cash is generated and used.'),
  ],
  practice: [
    item('p1', 'sofp', 'A lender checks whether cash will be available after current commitments.', 'Liquidity: statement of financial position.'),
    item('p2', 'sopl', 'An investor compares profit over five years to see how it varies.', 'Profitability: statement of profit or loss.'),
    item('p3', 'socf', 'An analyst checks how much cash came from operations versus new loans.', 'Operating and financing cash: statement of cash flows.'),
  ],
}

export const qualitative: Unit = {
  id: 'ch07-qualitative',
  hub: 'Qualities',
  lo: '§2.3',
  section: SECTION_B,
  title: 'Qualitative Characteristics',
  objective: 'Ch7 §2.3: fundamental and enhancing characteristics (NFRS Framework).',
  cards: [
    card('relevance', '🎯', 'Fundamental: Relevance (predictive and confirmatory value)', 'Relevance', 'Can make a difference to decisions. Affected by the nature and materiality of items.'),
    card('faithful', '🪞', 'Fundamental: Faithful representation (complete, neutral, free from error)', 'Faithful representation', 'Complete, neutral (supported by prudence) and free from error.'),
    card('understandability', '📖', 'Enhancing: Understandability', 'Understandability', 'Clear and concise for users with reasonable business knowledge.'),
    card('comparability', '⚖️', 'Enhancing: Comparability', 'Comparability', 'Consistent treatment throughout the business, over time and across businesses.'),
    card('verifiability', '🔎', 'Enhancing: Verifiability', 'Verifiability', 'Independent knowledgeable observers could agree it is faithfully represented.'),
    card('timeliness', '⏰', 'Enhancing: Timeliness', 'Timeliness', 'Available in time to influence decisions.'),
  ],
  practice: [
    item('p1', 'comparability', 'The same depreciation policy has been used for five years.', 'Consistent over time: comparability.'),
    item('p2', 'relevance', 'An item is disclosed because omitting it could change users’ decisions.', 'Materiality is part of relevance.'),
    item('p3', 'faithful', 'Figures are prepared without bias towards a better-looking profit.', 'Neutral: faithful representation.'),
    item('p4', 'timeliness', 'Accounts are published soon after year end so investors can use them.', 'In time to influence decisions: timeliness.'),
    item('p5', 'verifiability', 'Two independent auditors reach the same view of a valuation.', 'Observers can agree: verifiability.'),
  ],
}

export const limitations: Unit = {
  id: 'ch07-limitations',
  hub: 'Limits',
  lo: '§2.4',
  section: SECTION_B,
  title: 'Limitations of Financial Reporting',
  objective: 'Ch7 §2.4: the cost constraint and what limits usefulness.',
  cards: [
    card('cost', '💸', 'Cost constraint on information', 'Cost constraint', 'Benefits to users should justify the cost of providing the information.'),
    card('standardised', '📦', 'Standardised and aggregated format', 'Standardised', 'Same format for very different businesses; many transactions combined into a few figures.'),
    card('backward', '⏪', 'Backward-looking historical nature', 'Backward-looking', 'Covers a period already ended, while users decide about the future.'),
    card('nonfinancial', '📝', 'Omission of non-financial information', 'Non-financial omitted', 'No narrative on operations, risks, prospects or governance; these go in other reports.'),
    card('historical', '🏚️', 'Historical cost basis misleading due to inflation', 'Historical cost', 'Recorded at cost with no allowance for inflation, so values drift over time.'),
  ],
  practice: [
    item('p1', 'historical', 'Land bought 20 years ago is still shown at its original price.', 'No allowance for inflation: historical cost.'),
    item('p2', 'backward', 'Investors want next year’s outlook but the accounts cover last year.', 'Historical, not forward-looking.'),
    item('p3', 'nonfinancial', 'The accounts say nothing about the firm’s main business risks.', 'Narrative risk discussion is omitted.'),
    item('p4', 'standardised', 'Thousands of sales are shown as one revenue figure.', 'Highly aggregated.'),
    item('p5', 'cost', 'A detailed segment report is dropped because it costs more than it helps.', 'Benefit must justify cost.'),
  ],
}

export const otherSources: Unit = {
  id: 'ch07-other-sources',
  hub: 'Other sources',
  lo: '§2.5',
  section: SECTION_B,
  title: 'Other Sources of Information',
  objective: 'Ch7 §2.5: information beyond the financial statements.',
  cards: [
    card('internal', '🗂️', 'Internal management information', 'Internal management', 'Owner-managers see plans, budgets, forecasts and management accounts in real time.'),
    card('bank', '🏦', 'Bank loan agreement data', 'Bank loan agreement', 'Banks often get extra business information under loan agreements.'),
    card('credit', '📇', 'Credit reference agencies', 'Credit reference', 'Suppliers and lenders get credit standing reports, e.g. from Experian.'),
    card('public', '📰', 'Brochures, press reports, and brokers’ reports', 'Public reports', 'Brochures and press releases are open to all; brokers’ reports are widely available.'),
  ],
  practice: [
    item('p1', 'credit', 'A new supplier checks a customer’s credit rating before giving credit.', 'Credit standing report: credit reference agency.'),
    item('p2', 'bank', 'The bank receives monthly management accounts as a loan condition.', 'Access under a loan agreement.'),
    item('p3', 'internal', 'The owner-manager reviews this month’s budget against actual.', 'Owners are management: internal information.'),
    item('p4', 'public', 'An investor reads a broker’s analysis of a listed company.', 'Brokers’ reports are widely available.'),
  ],
}
