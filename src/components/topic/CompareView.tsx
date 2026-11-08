import { FlipPairs } from '../rail/FlipPairs'
import { Blocks } from '../rail/Markdown'
import { parseBlocks } from '../rail/mdParse'

/** Compare and traps from the teaching text: a two-column table as flip cards, or several "A vs B" tables in full. */
export function CompareView({ md }: { md: string }) {
  const blocks = parseBlocks(md)
  const at = blocks.findIndex((b) => b.t === 'table')
  // Several "A vs B" sub-sections each carry their own table: show them in full, in order
  const subheads = blocks.filter((b) => b.t === 'h' && b.level === 4).length
  if (at < 0 || subheads >= 2) return <Blocks blocks={blocks} />
  const table = blocks[at]
  const rest = blocks.filter((_, i) => i !== at)
  // A lone bold line such as "Important distinction" only labels the table, which the cards replace
  const lead = rest.filter((b, i) => !(i === 0 && b.t === 'p' && /^\*\*[^*]+\*\*$/.test(b.text)))
  return (
    <div className="space-y-4">
      {table.t === 'table' && <FlipPairs rows={table.rows} />}
      <Blocks blocks={lead} />
    </div>
  )
}
