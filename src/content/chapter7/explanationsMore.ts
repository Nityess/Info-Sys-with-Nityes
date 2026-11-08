// One short explanation per quiz question for topics 1.2 to 1.9 (1.5 is in explanations.ts).
// Written from each topic's own text in content/chapter7.md, for the owner to review.
// Key: "<topic code>/<mcq, mcq2 or chip>/<question id>". The two study-book questions carry their own reasons.

export const MORE_EXPLANATIONS: Record<string, string> = {
  // 1.2 Types of Information, quick test
  '1.2/mcq/Q1': 'A five-year investment decision for the Board is long-term and major: strategic information.',
  '1.2/mcq/Q2': 'Monthly variance reports used by a middle manager for short-term issues are tactical information.',
  '1.2/mcq/Q3': 'Detailed daily reports for routine branch activities are operational information.',
  '1.2/mcq/Q4': 'Implementation steps, available resources and time-scales are what planning information covers.',
  '1.2/mcq/Q5': 'Strategic information is often based on estimates and gives a broad picture.',
  '1.2/mcq/Q6': 'Operational information is very detailed and mostly accurate.',
  '1.2/mcq/Q7': 'Tactical information is used by middle managers. Senior managers use strategic, front-line staff operational.',
  '1.2/mcq/Q8': 'Planning information focuses on implementation steps, available resources and time-scales.',

  // 1.3 ACCURATE
  '1.3/mcq/Q1': 'The figures are correct, but two branches are left out. Complete means nothing important is missing.',
  '1.3/mcq/Q2': 'The CEO needs a short summary designed for them, not pages of detail. That is user-targeted.',
  '1.3/mcq/Q3': 'An anonymous website with no identifiable author is not a reliable, credible source: authoritative.',
  '1.3/mcq/Q4': 'The report arrived after the deadline was missed. Information must be available when needed: timely.',
  '1.3/mcq/Q5': 'Birthday details have nothing to do with product profitability. Only decision-useful items belong: relevant.',
  '1.3/mcq/Q6': 'Spending NPR 10 lakh to gain NPR 20,000 of benefit means the benefits do not justify the cost.',
  '1.3/mcq/Q7': 'A credible source does not make the calculations right. Errors mean the report is not accurate.',
  '1.3/mcq/Q8': 'All the information is there, but the confusing structure makes it hard to use: easy to use.',

  // 1.4 SEAR
  '1.4/chip/A': 'A well-known international research agency is about where the information comes from: source.',
  '1.4/chip/B': 'A colour-coded dashboard is easier to understand than raw figures: ease of assimilation.',
  '1.4/chip/C': 'Retrieving reports online without asking head office is about how easily it can be obtained: accessibility.',
  '1.4/chip/D': 'Useful to a farming company but not a hotel: usefulness to the specific user, which is relevance.',
  '1.4/mcq/Q1': 'A well-known international organisation is a respected source, which gives users more confidence.',
  '1.4/mcq/Q2': 'Charts and infographics make the information easier to understand: ease of assimilation.',
  '1.4/mcq/Q3': 'Retrieving the report from an online portal without contacting IT shows easy access: accessibility.',
  '1.4/mcq/Q4': 'The same information helps a construction company but not a bank. Its value depends on the user: relevance.',
  '1.4/mcq/Q5': 'Rare information is not automatically valuable. If it does not help the manager, its value is limited.',
  '1.4/mcq/Q6': 'The report is trustworthy, but a lengthy approval process makes it hard to obtain: accessibility is weak.',

  // 1.6 IT Delivery and IT Support
  '1.6/chip/1': 'Extracting data and preparing reports is an IT service operation, so it is IT Delivery.',
  '1.6/chip/2': 'Maintaining servers, hardware, software and network configurations is infrastructure work: IT Support.',
  '1.6/chip/3': 'Access controls are security and access control, which protect the infrastructure: IT Support.',
  '1.6/chip/4': 'Staying aware of cloud computing and automation to spot opportunities is the management action Monitoring.',
  '1.6/chip/5': 'A schedule that avoids disruption is about implementing change smoothly: Planning.',
  '1.6/chip/6': 'Investigating and resolving a system failure is incident management: IT Support.',
  '1.6/chip/7': 'Documenting and prioritising routine work and upgrades is Structure.',
  '1.6/chip/8': 'Recruiting people with suitable data science skills is Staffing and Skills.',
  '1.6/mcq/Q1': 'Report production and distribution is an IT service operation, which is IT Delivery.',
  '1.6/mcq/Q2': 'Maintaining physical and logical integrity of the infrastructure is IT Support.',
  '1.6/mcq/Q3': 'Keeping business operations available to agreed service levels is an IT Delivery activity.',
  '1.6/mcq/Q4': 'Prioritising and documenting IT tasks is the management action Structure.',
  '1.6/mcq/Q5': 'Planning makes sure IT changes are implemented without disrupting the business.',

  // 1.7 Outsourcing
  '1.7/chip/1': 'Concentrating on the main business activities is the benefit of focusing on core activities.',
  '1.7/chip/2': 'Less direct control over the external provider comes from managing the service at arm’s length: a challenge.',
  '1.7/chip/3': 'Better IT services than in-house staff could provide is a benefit: access to better IT functions and services.',
  '1.7/chip/4': 'Service Level Agreements must be carefully negotiated: a contractual challenge.',
  '1.7/chip/5': 'Managing the outsourced function needs a more formal approach: increased formality is a challenge.',
  '1.7/mcq/Q1': 'Contracting a specific business function to an external provider is outsourcing.',
  '1.7/mcq/Q2': 'Focusing on core activities is a benefit. The other three options are challenges.',
  '1.7/mcq/Q3': 'The service is managed at arm’s length, so there is reduced direct control: a challenge.',
  '1.7/mcq/Q4': 'Service Level Agreements are the contractual issue that must be carefully negotiated.',

  // 1.8 Innovation
  '1.8/mcq/Q1': 'IT changes fast. Businesses invest in new technology to avoid being left behind by competitors using IT.',
  '1.8/mcq/Q2': 'The study material says distributed ledger technology improves the accuracy of asset recording.',
  '1.8/mcq/Q3': 'Digital sound and vision media let businesses distribute products to a wider audience.',
  '1.8/mcq/Q4': 'Competitors may use IT to gain competitive advantage, which is why innovation matters.',

  // 1.9 CATIVA: mastery test, then exam practice (mcq2)
  '1.9/mcq/Q1': 'Sales data that should have been included is missing: Completeness.',
  '1.9/mcq/Q2': 'Figures that differ from the source records mean the information is not accurate: Accuracy.',
  '1.9/mcq/Q3': 'Information that arrives days after it was needed fails Timeliness.',
  '1.9/mcq/Q4': 'An unauthorised change to the process is a failure of Inalterability.',
  '1.9/mcq/Q5': 'Tracing revenue back to the original invoices follows the data trail: Verifiability.',
  '1.9/mcq/Q6': 'Examining how effective the processing is, to judge its quality, is Assessability.',
  '1.9/mcq2/Q1': 'Non-repudiation is a security quality, not one of the six CATIVA criteria.',
  '1.9/mcq2/Q2': 'Restricting changes to authorised people protects the process from alteration: Inalterability.',
  '1.9/mcq2/Q3': 'Errors in the information mean Accuracy has failed.',
  '1.9/mcq2/Q4': 'Verifiability is the data trail back to the source. Assessability is scrutiny of how effective processing is.',
}
