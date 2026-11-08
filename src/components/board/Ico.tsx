import { createElement } from 'react'
import { ICONS } from '../../content/boards/iconData'

/** One inline SVG icon from the design's icon set (no icon library). Decorative: the text beside it carries the meaning. */
export function Ico({ name, className = '' }: { name: string; className?: string }) {
  const shapes = ICONS[name] ?? []
  return (
    <svg className={`bd-ic ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {shapes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  )
}
