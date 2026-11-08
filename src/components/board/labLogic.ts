// The Validation lab (Chapter 8, 3.6): four programmed checks you can try. Numbers and wording are the designer's.

export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const AGE = { min: 18, max: 60, start: 35, step: 5, top: 120 } as const
export const INVOICE = { limit: 500000, start: 300000, step: 100000, top: 900000 } as const

export const ageOk = (age: number): boolean => age >= AGE.min && age <= AGE.max
export const invoiceOk = (inv: number): boolean => inv <= INVOICE.limit

export const stepAge = (age: number, dir: 1 | -1): number => Math.min(AGE.top, Math.max(0, age + dir * AGE.step))
export const stepInvoice = (inv: number, dir: 1 | -1): number => Math.min(INVOICE.top, Math.max(0, inv + dir * INVOICE.step))

export const ageMsg = (age: number): string => (ageOk(age) ? `Accepted: ${age} is within 18 to 60.` : `Rejected: ${age} is outside 18 to 60.`)
export const invoiceMsg = (inv: number): string => (invoiceOk(inv) ? 'Accepted: within the limit.' : 'Rejected: above the NPR 500,000 limit.')

export interface TotalCheck {
  button: string
  processed: string
  ok: boolean
  msg: string
}

export const controlTotal = (leftOut: boolean): TotalCheck => ({
  button: leftOut ? 'Put employee E back' : 'Leave out employee E (50,000)',
  processed: leftOut ? '150,000' : '200,000',
  ok: !leftOut,
  msg: leftOut ? 'Totals differ by 50,000. Something is missing or wrong.' : 'Totals agree. Nothing is missing.',
})

export const hashTotal = (leftOut: boolean): TotalCheck => ({
  button: leftOut ? 'Put ID 105 back' : 'Leave out ID 105',
  processed: leftOut ? '410' : '515',
  ok: !leftOut,
  msg: leftOut ? 'Hash totals differ by 105. A record may be missing.' : 'Hash totals agree. All records were processed.',
})
