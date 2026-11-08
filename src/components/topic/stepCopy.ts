import type { RailStepId } from '../rail/railSteps'

export interface StepCopy {
  title: string
  sub: string
}

/** Screen headings and one line of help for every step. Wording follows landing-handoff/design/Lesson.dc.html. */
const GENERIC: Record<RailStepId, StepCopy> = {
  hook: { title: 'Start with a real situation', sub: 'See why this topic matters before the theory.' },
  concept: { title: 'The concept', sub: 'Take it one part at a time.' },
  compare: { title: 'Compare, then avoid the traps', sub: 'Switch between the comparison and the common exam mistakes.' },
  try: { title: 'Try it', sub: 'A short activity to test your understanding.' },
  quiz: { title: 'Quick test', sub: 'One question at a time. Miss twice and the answer is shown.' },
  answer: { title: 'Build your exam answer', sub: 'Pick the points a marker is looking for.' },
  revise: { title: 'Revision card', sub: 'One card to read before the exam.' },
  mastery: { title: 'Can you do all of these?', sub: 'Tick each one honestly. Tick them all to finish the topic.' },
}

/** Topic-specific headings. Topic 1.2 comes from the design; other topics get theirs in their own round. */
const BY_TOPIC: Record<string, Partial<Record<RailStepId, StepCopy>>> = {
  '1.2': {
    hook: { title: 'Same bank, four different needs', sub: 'Four people in one bank each ask for different information.' },
    concept: { title: 'The four types of information', sub: 'Information is classified by how it is used. Tap each type.' },
    compare: { title: 'Compare the four, then avoid the traps', sub: 'Switch between the comparison and the common exam mistakes.' },
    try: { title: 'Sort the bank memos', sub: 'Match each memo to the type of information it is.' },
    quiz: { title: 'Quick test', sub: 'Eight questions, one at a time. Miss twice and the answer is shown.' },
    answer: { title: 'Build your exam answer', sub: 'Pick the points a marker is looking for.' },
    revise: { title: 'Remember these four combinations', sub: 'One card to read before the exam.' },
    mastery: { title: 'Can you do all of these?', sub: 'Tick each one honestly. Tick all six to finish the topic.' },
  },
}

export const stepCopy = (code: string, id: RailStepId): StepCopy => BY_TOPIC[code]?.[id] ?? GENERIC[id]
