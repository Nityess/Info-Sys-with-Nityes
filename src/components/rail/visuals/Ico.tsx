import { createElement } from 'react'
import { ICONS } from './iconData'

/** One inline SVG icon from the scene icon set (no icon library). Decorative: the text next to it carries the meaning. */
export function Ico({ name, className = '' }: { name: string; className?: string }) {
  const shapes = ICONS[name] ?? []
  return (
    <svg className={`sc-ic ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {shapes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  )
}
