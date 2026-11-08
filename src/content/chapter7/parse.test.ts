import { describe, expect, it } from 'vitest'
import md from '../../../content/chapter7.md?raw'
import { parseAnswers, parseChapter, parseKeys, roleOf } from './parse'

const topics = parseChapter(md)
const t15 = topics['1.5']

describe('parseChapter', () => {
  it('finds all 18 topics', () => {
    expect(Object.keys(topics)).toHaveLength(18)
  })
  it('never lets App Spec text through', () => {
    for (const t of Object.values(topics)) {
      expect(JSON.stringify(t)).not.toMatch(/App Spec|not shown to students|for the builder/i)
      expect(t.sections.every((s) => s.role !== 'spec' && s.role !== 'delivery')).toBe(true)
    }
  })
  it('drops the banner line and keeps the objectives in the intro', () => {
    expect(t15.intro).not.toMatch(/Next learning topic \|/)
    expect(t15.intro).toMatch(/Explain why unused information has no actual value/)
  })
})

describe('topic 1.5 as the template', () => {
  it('splits the file headings into rail roles', () => {
    expect(t15.sections.map((s) => s.role)).toEqual(['hook', 'concept', 'concept', 'concept', 'quiz', 'quiz', 'answer', 'revise', 'mastery'])
  })
  it('reads the three numerical scenarios with the answer key A Positive, B Negative, C Zero', () => {
    const chip = t15.quizzes.find((q) => q.kind === 'chip')!
    expect(chip.items.map((i) => i.options[i.answer])).toEqual(['Positive net value', 'Negative net value', 'Zero net value'])
  })
  it('reads the five MCQs with the key Q1 B, Q2 C, Q3 C, Q4 B, Q5 B', () => {
    const mcq = t15.quizzes.find((q) => q.kind === 'mcq')!
    expect(mcq.items).toHaveLength(5)
    expect(mcq.items.map((i) => 'ABCD'[i.answer])).toEqual(['B', 'C', 'C', 'B', 'B'])
    expect(mcq.items.every((i) => i.options.length === 4)).toBe(true)
  })
  it('reads the two exam answers', () => {
    expect(t15.answers).toHaveLength(2)
    expect(t15.answers[0].question).toMatch(/Explain the factors to be considered/)
    expect(t15.answers[1].answer).toMatch(/effectively zero/)
  })
  it('reads the seven mastery lines', () => {
    expect(t15.mastery).toHaveLength(7)
    expect(t15.mastery[3]).toBe('Calculate net value correctly.')
  })
})

describe('question counts across Section 1', () => {
  const counts = (code: string) => topics[code].quizzes.filter((q) => q.kind === 'mcq').map((q) => q.items.length)
  it('finds the MCQ sets and answers every item', () => {
    expect(counts('1.3')).toEqual([8])
    expect(counts('1.4')).toEqual([6])
    expect(counts('1.5')).toEqual([5])
    expect(counts('1.9')).toEqual([6, 4])
    for (const code of ['1.3', '1.4', '1.5', '1.9']) {
      for (const set of topics[code].quizzes.filter((q) => q.kind === 'mcq')) {
        expect(set.items.every((i) => i.answer >= 0 && i.answer < i.options.length), code).toBe(true)
      }
    }
  })
})

describe('small parsers', () => {
  it('classifies headings', () => {
    expect(roleOf('9. Mastery checkpoint', 8)).toBe('mastery')
    expect(roleOf('8. One-minute revision', 7)).toBe('revise')
    expect(roleOf('7. Exam-oriented answer writing', 6)).toBe('answer')
    expect(roleOf('4. The most important distinctions', 3)).toBe('compare')
    expect(roleOf('1. Start with a story', 0)).toBe('hook')
    expect(roleOf('2. Something else', 1)).toBe('concept')
  })
  it('reads MCQ and chip keys from App Spec lines', () => {
    const k = parseKeys('- Scenarios: A Positive, B Negative.\n- Challenge: Q1 B, Q2 C.\n- Not a key line.')
    expect(k.mcq).toEqual([['B', 'C']])
    expect(k.chip).toEqual([['A=Positive', 'B=Negative']])
  })
  it('pairs each possible question with its suggested answer', () => {
    const pairs = parseAnswers('**Possible question:** Q one\n\n**Suggested answer:**\n\nA one\n\n**Another possible question:** Q two\n\n**Suggested answer:**\n\nA two')
    expect(pairs).toEqual([
      { question: 'Q one', answer: 'A one' },
      { question: 'Q two', answer: 'A two' },
    ])
  })
})
