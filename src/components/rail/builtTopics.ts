/** Topics whose rail is fully built. The rest show the placeholder rail in the teacher preview. */
export const BUILT_TOPICS: ReadonlySet<string> = new Set(['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9'])

/**
 * Topics shown in the new lesson screen (top bar, 8-step bar, one step per screen) instead of the scrolling rail.
 * Topic 1.2 goes first; the others move over one round at a time.
 */
export const LESSON_SHELL_TOPICS: ReadonlySet<string> = new Set(['1.2'])

/**
 * Where "Compare and traps" starts inside a concept section, for topics where it is not its own heading.
 * Kept apart from the visuals so the page that picks a rail does not download the animation code.
 */
export const COMPARE_MARKERS: Readonly<Record<string, string>> = {
  '1.5': '**Important distinction**',
}
