import type { Chapter } from '../types'

// Titles come from docs/syllabus.md (LO7). Labs are added one unit at a time.
export const ch10: Chapter = {
  id: 'ch10',
  number: 10,
  title: 'Data security',
  lo: 'LO7',
  weight: 10,
  units: [
    {
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
    },
    {
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
    },
    { id: 'ch10-lo7c', lo: 'LO7c', title: 'Storing data and information securely' },
    { id: 'ch10-lo7d', lo: 'LO7d', title: 'Cyber risks, computer fraud and improving cyber security' },
    { id: 'ch10-lo7e', lo: 'LO7e', title: 'Social media risks to data security' },
  ],
}
