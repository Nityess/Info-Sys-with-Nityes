import type { QuizItem, Unit } from '../../types'

const TF = [
  'Statement (1) only is true',
  'Statement (2) only is true',
  'Both statements (1) and (2) are true',
  'Both statements (1) and (2) are false',
]

const quiz: QuizItem[] = [
  {
    id: 'ch10-q18',
    question: 'Are the following statements true or false?',
    statements: [
      '(1) For security purposes the same password should be used for multiple log ins.',
      '(2) Two-factor authentication helps to identify the user at log in.',
    ],
    options: TF,
    answer: 1,
    explanation:
      'Only (2) is true. Reusing one password makes it much easier for hackers to gain access to many systems (Ch10 §2.5).',
    source: 'ICAN Ch10 question bank Q18 (2 marks); answer B',
  },
  {
    id: 'pt2-1-9',
    question:
      'Which control verifies the identity of a user at log-in by sending a one-time use code to a second device, such as a smartphone?',
    options: ['Boundary firewall', 'Patch management', 'Two-factor authentication', 'Secure configuration'],
    answer: 2,
    explanation:
      'Two-factor authentication sends a one-time code to a second device. Access requires the code, so a stolen password alone is not enough.',
    source: 'IS Pre-Test Dec 2026 Set 2, Q1.9 (1 mark); answer C',
  },
  {
    id: 'ch10-q19',
    question: 'Which of the following is a definition of patch management?',
    options: [
      'Software that intercepts network traffic',
      'Physical and network procedures to restrict access to a system',
      'Software that removes unwanted programs',
      'Ensuring the latest updates to software are installed',
    ],
    answer: 3,
    explanation: 'Patch management ensures the latest software updates are installed. A is a firewall, B access control, C malware protection.',
    source: 'ICAN Ch10 question bank Q19 (1 mark); answer D',
  },
  {
    id: 'ch10-q12',
    question: 'Which of the following is the definition of a firewall?',
    options: ['Access control', 'Malware protection', 'Software that intercepts network traffic', 'Patching'],
    answer: 2,
    explanation: 'Boundary firewalls and internet gateways are software that intercepts network traffic in and out of a system (Ch10 §1.2).',
    source: 'ICAN Ch10 question bank Q12 (1 mark); answer C',
  },
  {
    id: 'ch10-q16',
    question: 'Are the following statements true or false?',
    statements: [
      '(1) Secure configuration means ensuring the system is set up with cybersecurity as a priority.',
      '(2) Access controls are physical and network procedures to restrict access to a system.',
    ],
    options: TF,
    answer: 2,
    explanation: 'Both are the Ch10 §1.2 definitions.',
    source: 'ICAN Ch10 question bank Q16 (2 marks); answer C',
  },
  {
    id: 'pt2-1-5',
    question: 'Which of the following is NOT a physical access control over a computer system?',
    options: [
      'Door locks combined with a keypad system',
      'Passwords that restrict access to data and program files',
      'Security guards outside working hours',
      'A card entry system that requires a card to be swiped',
    ],
    answer: 1,
    explanation:
      'Passwords are a logical access control: they protect data and program files even if someone gets past the physical controls.',
    source: 'IS Pre-Test Dec 2026 Set 2, Q1.5 (1 mark); answer B',
  },
]

export const lo7c: Unit = {
  id: 'ch10-lo7c',
  lo: 'LO7c',
  title: 'Storing data and information securely',
  labId: 'lo7c',
  objective:
    'LO7c: Explain how data and information can be stored securely: passwords, security software, two factor authentication, controlled access, software updates.',
  hints: {
    hint: 'Each control stops a different threat. You need all five, not just one.',
    insight:
      'Learn the Ch10 §1.2 one-line definitions: firewall = intercepts traffic; patching = latest updates installed; access control = physical and network procedures. Passwords are logical, not physical, access controls.',
    mcq: 'Use the "Check my understanding" step at the bottom of the lab: six items from the Ch10 question bank and Pre-Test Set 2.',
  },
  quiz,
}
