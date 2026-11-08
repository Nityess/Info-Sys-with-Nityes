import { Fragment } from 'react'
import { parseBlocks, parseInline } from './mdParse'
import type { Block } from './mdParse'

export function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((p, i) => {
        if (p.t === 'b') return <strong key={i} className="font-semibold text-ink dark:text-white">{p.text}</strong>
        if (p.t === 'i') return <em key={i}>{p.text}</em>
        if (p.t === 'code') return <code key={i} className="rounded bg-slate-100 px-1 py-0.5 text-[0.9em] dark:bg-slate-800">{p.text}</code>
        return <Fragment key={i}>{p.text}</Fragment>
      })}
    </>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p><Inline text={b.text} /></p>
    case 'h':
      return <h4 className="pt-1 font-display text-base font-semibold text-ink dark:text-white"><Inline text={b.text} /></h4>
    case 'ul':
      return (
        <ul className="list-disc space-y-1 pl-5">
          {b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal space-y-1 pl-5">
          {b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}
        </ol>
      )
    case 'quote':
      return <blockquote className="border-l-4 border-marigold bg-amber-50 px-4 py-2 italic dark:bg-amber-950/30"><Inline text={b.text} /></blockquote>
    case 'code':
      return <pre className="overflow-x-auto rounded-xl bg-ink px-4 py-3 text-sm text-white dark:bg-slate-800"><code>{b.text}</code></pre>
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[16rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {b.head.map((h, i) => <th key={i} className="border-b-2 border-slate-300 px-3 py-2 font-semibold text-ink dark:border-slate-600 dark:text-white"><Inline text={h} /></th>)}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri} className="odd:bg-slate-50 dark:odd:bg-slate-800/40">
                  {r.map((c, ci) => <td key={ci} className="border-b border-slate-200 px-3 py-2 align-top dark:border-slate-700"><Inline text={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'hr':
      return <hr className="border-slate-200 dark:border-slate-700" />
  }
}

/** Renders already-parsed blocks (when a page needs to place something between them). */
export function Blocks({ blocks, className = '' }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`space-y-3 text-[0.95rem] leading-relaxed ${className}`}>
      {blocks.map((b, i) => <BlockView key={i} b={b} />)}
    </div>
  )
}

/** Renders a markdown string with the app's typography. */
export function Markdown({ md, className = '' }: { md: string; className?: string }) {
  return (
    <div className={`space-y-3 text-[0.95rem] leading-relaxed ${className}`}>
      {parseBlocks(md).map((b, i) => <BlockView key={i} b={b} />)}
    </div>
  )
}
