/** Smallest and largest height the frame will take, in px, so a broken measure can never hide the page or make it endless. */
export const FRAME_MIN = 480
export const FRAME_MAX = 20000

export const clampFrameHeight = (h: number): number => (Number.isFinite(h) ? Math.min(FRAME_MAX, Math.max(FRAME_MIN, Math.ceil(h))) : FRAME_MIN)

/**
 * The height of the simulator's content. The root's own box is used rather than its scrollHeight (which can never be
 * smaller than the frame, so the frame could not shrink). The body's scrollHeight is added in so content that spills
 * out of the body (absolutely placed parts) is not cut off.
 */
export function contentHeight(doc: Document): number {
  const root = doc.documentElement.getBoundingClientRect().height
  const body = doc.body ? Math.max(doc.body.getBoundingClientRect().height, doc.body.scrollHeight) : 0
  return Math.max(root, body)
}
