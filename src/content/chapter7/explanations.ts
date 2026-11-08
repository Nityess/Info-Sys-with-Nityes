// One short explanation per quiz question. Chapter7 teaching file has none per question,
// so these are written from the topic's own text and wording, for the owner to review.
// Key: "<topic code>/<mcq or chip>/<question id>".

export const EXPLANATIONS: Record<string, string> = {
  // Topic 1.5, numerical scenarios (net value = extra benefits − extra costs)
  '1.5/chip/A': '80,000 − 50,000 = 30,000. The extra benefits are more than the extra costs, so net value is positive.',
  '1.5/chip/B': '45,000 − 70,000 = −25,000. The extra costs are more than the extra benefits, so net value is negative.',
  '1.5/chip/C': '1,20,000 − 1,20,000 = 0. Extra benefits and extra costs are equal, so net value is zero.',
  // Topic 1.5, exam-style MCQs
  '1.5/mcq/Q1': 'Information that is obtained but not used has no actual value. Value only arises from actions taken based on it.',
  '1.5/mcq/Q2': '1,80,000 − 1,20,000 = 60,000. Extra benefits exceed extra costs, so net value is a positive NPR 60,000.',
  '1.5/mcq/Q3': '75,000 − 95,000 = −20,000. The cost is higher than the expected benefit, so net value is negative.',
  '1.5/mcq/Q4': 'The MIS and software are already bought, so those costs are fixed and paid. One more enquiry adds effectively no cost.',
  '1.5/mcq/Q5': 'Whether more information is worth having depends on the extra benefits expected and the extra costs of obtaining it.',
}

export function explanationFor(code: string, kind: 'mcq' | 'chip', id: string): string | undefined {
  return EXPLANATIONS[`${code}/${kind}/${id}`]
}
