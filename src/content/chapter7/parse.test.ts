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

describe('Section 1 topics beyond 1.5', () => {
  const answers = (code: string, set = 0) => {
    const q = topics[code].quizzes[set]
    return q.items.map((i) => (q.kind === 'mcq' ? 'ABCD'[i.answer] : i.options[i.answer]))
  }
  it('1.2: hides the two study-book questions behind the source flag and reads their keys', () => {
    const [src, quick] = topics['1.2'].quizzes
    expect(src.source).toBe(true)
    expect(answers('1.2', 0)).toEqual(['B', 'A'])
    expect(src.items[0].explanation).toMatch(/routine, detailed/)
    expect(quick.source).toBeUndefined()
    expect(answers('1.2', 1)).toEqual(['C', 'B', 'B', 'B', 'D', 'C', 'B', 'A'])
  })
  it('1.2: lifts the mastery checklist out of the revision card', () => {
    expect(topics['1.2'].mastery).toHaveLength(6)
    expect(JSON.stringify(topics['1.2'].sections)).not.toMatch(/Mastery checklist/)
  })
  it('1.2: keeps the learning objectives in the intro, not as a lesson part', () => {
    expect(topics['1.2'].intro).toMatch(/Identify the four types of information/)
    expect(topics['1.2'].sections[0].role).toBe('hook')
  })
  it('1.3 and 1.4 keys', () => {
    expect(answers('1.3')).toEqual(['B', 'A', 'C', 'B', 'A', 'B', 'B', 'C'])
    expect(answers('1.4', 0)).toEqual(['Source', 'Ease of Assimilation', 'Accessibility', 'Relevance'])
    expect(answers('1.4', 1)).toEqual(['B', 'C', 'A', 'C', 'B', 'C'])
    expect(topics['1.4'].quizzes[0].items[0].text).not.toMatch(/Factor:/)
  })
  it('1.6: chips carry their own options and the key by number', () => {
    expect(answers('1.6', 0)).toEqual(['IT Delivery', 'IT Support', 'IT Support', 'Monitoring', 'Planning', 'IT Support', 'Structure', 'Staffing & Skills'])
    expect(answers('1.6', 1)).toEqual(['C', 'C', 'B', 'C', 'A'])
  })
  it('1.7: numbered benefit or challenge items; challenges are a concept, not a quiz', () => {
    expect(answers('1.7', 0)).toEqual(['Benefit', 'Challenge', 'Benefit', 'Challenge', 'Challenge'])
    expect(answers('1.7', 1)).toEqual(['B', 'C', 'C', 'B'])
    expect(topics['1.7'].sections.find((s) => s.heading.includes('Challenges of Outsourcing'))?.role).toBe('concept')
    expect(topics['1.7'].answers).toHaveLength(1)
  })
  it('1.8 and 1.9 keys', () => {
    expect(answers('1.8')).toEqual(['B', 'C', 'A', 'C'])
    expect(answers('1.9', 0)).toEqual(['B', 'A', 'C', 'C', 'B', 'A'])
    expect(answers('1.9', 1)).toEqual(['B', 'D', 'C', 'C'])
    expect(topics['1.8'].sections.find((s) => s.heading.includes('Innovation in Practice'))?.role).toBe('concept')
  })
  it('every question in Section 1 has a key inside its option range', () => {
    for (const code of ['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9']) {
      for (const set of topics[code].quizzes) {
        for (const i of set.items) expect(i.answer >= 0 && i.answer < i.options.length, `${code} ${set.title} ${i.id}`).toBe(true)
      }
    }
  })
})

describe('explanations for Section 1 quizzes', () => {
  it('has an explanation for every question except the two study-book ones, and none for missing questions', async () => {
    const { explanationFor } = await import('./explanations')
    for (const code of ['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9']) {
      const seen: Record<string, number> = {}
      for (const set of topics[code].quizzes) {
        if (set.source) continue
        const n = (seen[set.kind] = (seen[set.kind] ?? 0) + 1)
        for (const i of set.items) expect(explanationFor(code, `${set.kind}${n > 1 ? n : ''}`, i.id), `${code} ${set.kind}${n} ${i.id}`).toBeTruthy()
      }
    }
  })
})
