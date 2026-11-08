import type { Unit } from '../../types'

export const lo7b: Unit = {
  id: 'ch10-lo7b',
  lo: 'LO7b',
  title: 'Implications of insecure data',
  labId: 'lo7b',
  objective:
    'LO7b: Explain the implications for an organisation if data and information is not secure: financial loss, denial of service, competitors, reputational loss, data protection.',
  hints: {
    hint: 'Five headings: money, blocked users, rivals, trust, personal-data law.',
    insight:
      'Cyber-risk = risk of financial loss, disruption or reputation damage from IT failure (Ch10 §2). In a scenario, name the implication AND say who is hurt.',
    mcq: 'Use the "Check my understanding" step at the bottom of the lab: one item from the ICAN Mock Exam.',
  },
  quiz: [
    {
      id: 'mock-1-11',
      question: 'Are the following statements true or false?',
      statements: [
        '(1) Cyberattacks can occur accidentally and they are not a major issue for most organisations.',
        '(2) Cyberattacks do not result in any financial loss.',
      ],
      options: [
        'Statement (1) only is true',
        'Statement (2) only is true',
        'Both statements (1) and (2) are true',
        'Both statements (1) and (2) are false',
      ],
      answer: 3,
      explanation:
        'Cyberattacks are deliberate (not accidental) and are a concern to all organisations. They can result in financial losses.',
      source: 'ICAN Mock Exam Q1.11 (2 marks); answer D',
    },
  ],
}
