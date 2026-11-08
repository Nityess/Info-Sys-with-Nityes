export interface BinItem {
  id: string
  text: string
  bin: string
  /** One line shown when the item lands in the right bin */
  why: string
}

export interface PlaceResult {
  placed: Readonly<Record<string, string>>
  ok: boolean
}

/** Only correct drops stay: a wrong drop bounces back and leaves the placements unchanged. */
export function tryPlace(placed: Readonly<Record<string, string>>, item: BinItem, bin: string): PlaceResult {
  if (item.bin !== bin) return { placed, ok: false }
  return { placed: { ...placed, [item.id]: bin }, ok: true }
}

export const remaining = (items: readonly BinItem[], placed: Readonly<Record<string, string>>): BinItem[] => items.filter((i) => !(i.id in placed))

export const isDone = (items: readonly BinItem[], placed: Readonly<Record<string, string>>): boolean => items.length > 0 && remaining(items, placed).length === 0
