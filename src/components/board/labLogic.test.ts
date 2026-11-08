import { describe, expect, it } from 'vitest'
import { ageMsg, ageOk, controlTotal, fmt, hashTotal, invoiceMsg, invoiceOk, stepAge, stepInvoice } from './labLogic'

describe('Validation lab', () => {
  it('range check accepts 18 to 60 inclusive', () => {
    expect([17, 18, 35, 60, 61].map(ageOk)).toEqual([false, true, true, true, false])
    expect(ageMsg(35)).toBe('Accepted: 35 is within 18 to 60.')
    expect(ageMsg(65)).toBe('Rejected: 65 is outside 18 to 60.')
  })
  it('limit check accepts up to NPR 500,000', () => {
    expect(invoiceOk(500000)).toBe(true)
    expect(invoiceOk(600000)).toBe(false)
    expect(invoiceMsg(600000)).toBe('Rejected: above the NPR 500,000 limit.')
  })
  it('steppers move by their step and stay inside their range', () => {
    expect(stepAge(35, 1)).toBe(40)
    expect(stepAge(0, -1)).toBe(0)
    expect(stepAge(120, 1)).toBe(120)
    expect(stepInvoice(300000, 1)).toBe(400000)
    expect(stepInvoice(0, -1)).toBe(0)
    expect(stepInvoice(900000, 1)).toBe(900000)
    expect(fmt(300000)).toBe('300,000')
  })
  it('control total: leaving out employee E drops 50,000', () => {
    expect(controlTotal(false)).toMatchObject({ processed: '200,000', ok: true })
    expect(controlTotal(true)).toMatchObject({ processed: '150,000', ok: false, button: 'Put employee E back' })
  })
  it('hash total: 101 to 105 add to 515, and leaving out 105 gives 410', () => {
    expect(101 + 102 + 103 + 104 + 105).toBe(515)
    expect(hashTotal(false)).toMatchObject({ processed: '515', ok: true })
    expect(hashTotal(true)).toMatchObject({ processed: '410', ok: false })
    expect(515 - 105).toBe(410)
  })
})
