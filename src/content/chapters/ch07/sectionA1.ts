import type { Unit } from '../../types'
import { SECTION_A, card, item } from './helpers'

// Ch7 §1 – §1.3. Leaf titles follow the owner's mind map; details follow the textbook.

export const infoRequirements: Unit = {
  id: 'ch07-info-requirements',
  hub: 'Information needs',
  lo: '§1',
  section: SECTION_A,
  title: 'Information Requirements for Managers',
  objective: 'Ch7 §1: why businesses and managers need information.',
  cards: [
    card('planning', '🗓️', 'Planning resources and time-scales', 'Planning', 'Knowing available resources, time-scales and likely outcomes under different scenarios.'),
    card('controlling', '🎯', 'Controlling plans and corrective action', 'Controlling', 'Checking whether a plan is on track, and taking corrective action if it deviates.'),
    card('recording', '🧾', 'Recording transactions for evidence and costs', 'Recording', 'Evidence in disputes, legal records for accounting and audit, production costs, labour efficiency.'),
    card('performance', '📊', 'Performance measurement against plans', 'Performance', 'Comparing actual costs, revenues, volumes and profitability with the plan.'),
    card('communication', '💬', 'Communication internally and externally', 'Communication', 'With staff, suppliers and customers; good public relations avoids bad publicity.'),
    card('scm', '🚚', 'Supply chain management (SCM)', 'SCM', 'Optimising the network of organisations that turn raw resources into a product or service.'),
    card('sales', '🛒', 'Sales and marketing trends', 'Sales & marketing', 'Customer satisfaction, complaints and market trends drive products, pricing and campaigns.'),
    card('employees', '👥', 'Employee management and HR', 'Employees & HR', 'Staffing levels, employee satisfaction, legal compliance, diversity and equality.'),
    card('decisions', '🧠', 'Decision making', 'Decisions', 'Information is the basis for informed decisions; this completes the management cycle.'),
  ],
  practice: [
    item('p1', 'controlling', 'Production is behind schedule, so the manager moves extra staff to the line.', 'Spotting a deviation and correcting it is control.'),
    item('p2', 'recording', 'Sales invoices are kept as evidence in a dispute with a customer.', 'Transaction records serve as evidence.'),
    item('p3', 'sales', 'Complaint data shows customers want a smaller pack size.', 'Customer feedback shapes products: sales and marketing.'),
    item('p4', 'employees', 'HR checks whether staffing levels meet legal requirements.', 'Staffing and compliance are employee management.'),
    item('p5', 'scm', 'Suppliers and the factory share stock data so materials arrive on time.', 'Businesses working together: supply chain management.'),
  ],
}

export const typesOfInformation: Unit = {
  id: 'ch07-types-of-information',
  hub: 'Info types',
  lo: '§1.1',
  section: SECTION_A,
  title: 'Types of Information',
  objective: 'Ch7 §1.1: information classified by the use it is put to.',
  cards: [
    card('planning', '🗺️', 'Planning information', 'Planning', 'Helps people involved in the planning process.'),
    card('operational', '⚙️', 'Operational information for day-to-day activities', 'Operational', 'e.g. how many operatives are needed on one shift.'),
    card('tactical', '♟️', 'Tactical information for short-term issues', 'Tactical', 'e.g. monthly variance reports for the factory.'),
    card('strategic', '🔭', 'Strategic information for long-term decisions', 'Strategic', 'e.g. can resources be made available to expand production? Often based on estimates.'),
  ],
  practice: [
    item('p1', 'operational', 'A daily list of accounts that went overdrawn yesterday, for branch staff.', 'Day-to-day activity: operational.'),
    item('p2', 'tactical', 'A monthly variance report for the factory manager.', 'Short-term issues: tactical.'),
    item('p3', 'strategic', 'The board asks whether to open a second factory in five years.', 'Major long-term decision: strategic.'),
    item('p4', 'operational', 'The shift roster showing how many machine operators are needed tonight.', 'Day-to-day staffing: operational.'),
  ],
}

export const accurate: Unit = {
  id: 'ch07-accurate',
  hub: 'ACCURATE',
  lo: '§1.2',
  section: SECTION_A,
  title: 'Qualities of Good Information (ACCURATE)',
  objective: 'Ch7 §1.2: the eight ACCURATE qualities of good information.',
  cards: [
    card('accurate', '✅', 'Accurate (no typographical errors, assumptions stated)', 'Accurate', 'Figures add up, sensible rounding, correct categories, assumptions stated for uncertain figures.'),
    card('complete', '🧩', 'Complete (includes external or comparative data)', 'Complete', 'Includes everything needed, e.g. external data or comparatives.'),
    card('cost', '💰', 'Cost-beneficial (benefit exceeds cost of obtaining)', 'Cost-beneficial', 'It should not cost more to obtain than the benefit from having it.'),
    card('user', '👤', 'User-targeted (tailored to senior or junior managers)', 'User-targeted', 'Senior managers may need summaries; junior managers may need detail.'),
    card('relevant', '🎯', 'Relevant (unneeded information omitted)', 'Relevant', 'Leave out anything not needed for the decision, however interesting.'),
    card('authoritative', '🏛️', 'Authoritative (reliable source)', 'Authoritative', 'The source must be reliable, a growing concern with so much online information.'),
    card('timely', '⏰', 'Timely (available when needed)', 'Timely', 'Available when it is needed.'),
    card('easy', '👌', 'Easy to use (clearly presented and right medium)', 'Easy to use', 'Clear, not too long, sent through the right channel (email, phone, report).'),
  ],
  practice: [
    item('p1', 'authoritative', 'Market research is copied from an anonymous blog.', 'Unreliable source: not authoritative.'),
    item('p2', 'timely', 'The monthly sales report arrives six weeks after month end.', 'Too late to act on: not timely.'),
    item('p3', 'user', 'The sales director gets every single transaction instead of a summary.', 'Senior managers need summaries: not user-targeted.'),
    item('p4', 'complete', 'Two branch figures are missing from the group report.', 'Something needed is left out: not complete.'),
    item('p5', 'relevant', 'A pricing report also includes the staff canteen menu.', 'Unneeded content: not relevant.'),
    item('p6', 'cost', 'A survey costing NRs 10,000 leads to a profit gain of NRs 9,000.', 'Cost exceeds benefit: not cost-beneficial.'),
  ],
}

export const valueOfInformation: Unit = {
  id: 'ch07-value-of-information',
  hub: 'Value',
  lo: '§1.3',
  section: SECTION_A,
  title: 'Value of Information',
  objective: 'Ch7 §1.3: what makes information valuable.',
  cards: [
    card('source', '🏛️', 'Source quality and reliability', 'Source', 'A respected source (e.g. Reuters) or a reliable internal source can be relied on with confidence.'),
    card('assimilation', '📈', 'Ease of assimilation (graphics and dashboards)', 'Assimilation', 'Colour, graphics, infographics and dashboards make it quicker and easier to understand.'),
    card('accessibility', '🌐', 'Accessibility via internet', 'Accessibility', 'Easy to reach, e.g. online, so users spend little time retrieving it.'),
    card('relevance', '🔍', 'Relevance to the user', 'Relevance', 'Value is in the eye of the beholder: new plastic data matters to a car maker, not a software house.'),
  ],
  practice: [
    item('p1', 'assimilation', 'Sales figures are shown on a colour dashboard instead of a long table.', 'Easier to take in: ease of assimilation.'),
    item('p2', 'source', 'Exchange rates come from a well-known financial news agency.', 'Respected source: more reliable.'),
    item('p3', 'relevance', 'Steel price news matters to a carmaker but not to a travel agency.', 'Value depends on the user: relevance.'),
    item('p4', 'accessibility', 'Branch managers can open the report online from anywhere.', 'Little effort to retrieve: accessibility.'),
  ],
}
