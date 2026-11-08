import { describe, expect, it } from 'vitest'
import { topics } from 'virtual:chapter7'
import { initialRailQuiz, nextQuestion, pickOption } from '../rail/railQuizLogic'
import { dotState, explanationOf, quizEntries } from './quizView'

const sets = topics['1.2'].quizzes

describe('Topic 1.2 quiz entries', () => {
  it('has the eight original questions, and the two study-book ones only when switched on', () => {
    const students = quizEntries(sets, false)
    expect(students).toHaveLength(8)
    expect(students.every((e) => e.label === 'Original practice')).toBe(true)
    const teacher = quizEntries(sets, true)
    expect(teacher).toHaveLength(10)
    expect(teacher[0].label).toBe('From the study book')
  })
  it('has an explanation for every question', () => {
    for (const e of quizEntries(sets, true)) expect(explanationOf('1.2', e).length, e.item.id).toBeGreaterThan(20)
  })
  it('keeps the study-book reasons apart from the original questions with the same number', () => {
    const teacher = quizEntries(sets, true)
    const sourceQ4 = teacher.find((e) => e.label === 'From the study book' && e.item.id === 'Q4')!
    const quickQ4 = teacher.find((e) => e.label === 'Original practice' && e.item.id === 'Q4')!
    expect(explanationOf('1.2', sourceQ4)).not.toBe(explanationOf('1.2', quickQ4))
  })
})

describe('progress dots', () => {
  it('shows green for first try, gold for a miss, blue for the current question', () => {
    let s = initialRailQuiz()
    expect(dotState(0, s)).toBe('cur')
    expect(dotState(1, s)).toBe('todo')
    s = nextQuestion(pickOption(s, 2, 2), 3)
    expect(dotState(0, s)).toBe('ok')
    expect(dotState(1, s)).toBe('cur')
    s = pickOption(pickOption(s, 1, 0), 1, 2) // two wrong: answer is revealed
    s = nextQuestion(s, 3)
    expect(dotState(1, s)).toBe('mid')
    expect(dotState(2, s)).toBe('cur')
  })
  it('shows every result once finished', () => {
    let s = nextQuestion(pickOption(initialRailQuiz(), 0, 0), 1)
    expect(s.finished).toBe(true)
    expect(dotState(0, s)).toBe('ok')
    s = nextQuestion(pickOption(pickOption(initialRailQuiz(), 0, 1), 0, 2), 1)
    expect(dotState(0, s)).toBe('mid')
  })
})
