// Shape of Chapter 7 content after content/chapter7.md has been parsed at build time.
// App Spec blocks never appear here: only the answer keys read out of them do.

export type Role = 'hook' | 'concept' | 'compare' | 'quiz' | 'answer' | 'revise' | 'mastery' | 'delivery' | 'spec'

export interface Section {
  heading: string
  role: Role
  /** Markdown of the section body, without its heading */
  md: string
}

export interface QuizItem {
  id: string
  /** Question text (MCQ) or the scenario to classify (chip) */
  text: string
  options: string[]
  /** Index of the correct option */
  answer: number
}

export interface QuizSet {
  title: string
  kind: 'mcq' | 'chip'
  items: QuizItem[]
}

export interface AnswerPair {
  question: string
  /** Markdown of the suggested answer */
  answer: string
}

export interface ParsedTopic {
  code: string
  title: string
  /** Opening text and learning objectives, before the first numbered section */
  intro: string
  sections: Section[]
  quizzes: QuizSet[]
  answers: AnswerPair[]
  /** Checklist lines from the mastery checkpoint, without the checkbox marker */
  mastery: string[]
}
