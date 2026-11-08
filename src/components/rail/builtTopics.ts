/** Topics whose rail is fully built. The rest show the placeholder rail in the teacher preview. */
export const BUILT_TOPICS: ReadonlySet<string> = new Set(['1.5'])

/**
 * Where "Compare and traps" starts inside a concept section, for topics where it is not its own heading.
 * Kept apart from the visuals so the page that picks a rail does not download the animation code.
 */
export const COMPARE_MARKERS: Readonly<Record<string, string>> = {
  '1.5': '**Important distinction**',
}
