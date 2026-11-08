import type { Unit } from '../../types'

export const lo7a: Unit = {
  id: 'ch10-lo7a',
  lo: 'LO7a',
  title: 'Importance of data and information security',
  labId: 'lo7a',
  objective:
    'LO7a: Explain the importance of ensuring the security of data and information: legal requirements, and commercial and strategic requirements.',
  hints: {
    hint: 'Two syllabus headings: legal, and commercial & strategic. The other five cards are textbook support.',
    insight:
      'Exam traps: cyber risk is NOT only for online or high-tech firms, NOT only about personal data, and NOT only an IT department issue (Ch10 §1.1).',
    mcq: 'Use the "Check my understanding" step at the bottom of the lab: two items from the ICAN Ch10 question bank.',
  },
  quiz: [
    {
      id: 'ch10-q11',
      question: 'Which of the following is not relevant to the security of computer systems?',
      options: [
        'Cyber risk is not a concern for low tech organisations',
        'Cybersecurity is often a legal obligation under data protection regulations',
        'Online information is of vital strategic and commercial importance',
        'External cyberattack is likely',
      ],
      answer: 0,
      explanation:
        'B, C and D are all reasons given in Ch10 §1.1. A is false: connected systems make every organisation a target, and businesses should consider cyber risk in all their activities.',
      source: 'ICAN Ch10 question bank Q11 (1 mark); answer A',
    },
    {
      id: 'ch10-q10',
      question: 'Are the following statements true or false?',
      statements: [
        '(1) Cyber security is a concern only for organisations that operate online.',
        '(2) Cyber security relates to the protection of personal data only.',
      ],
      options: [
        'Statement (1) only is true',
        'Statement (2) only is true',
        'Both statements (1) and (2) are true',
        'Both statements (1) and (2) are false',
      ],
      answer: 3,
      explanation:
        'Both are false. Cyber security protects systems, networks and all data (including strategic and commercial information), and applies to every organisation, not just online ones.',
      source: 'ICAN Ch10 question bank Q10 (2 marks); answer D',
    },
  ],
}
