// Scene text that is NOT in content/chapter7.md. Written by the designer; pending teacher review.
// Keep every such line here so the owner can find and approve it in one place (see also simpleStories.ts).

/**
 * Topic 1.3: which ACCURATE quality each defect of the CEO report points to.
 * chapter7.md lists the five defects but not this mapping. The old Report doctor (rail/topics/accurate.ts) maps the
 * 5,000 lines to "User-targeted"; the design says "Easy to use". The owner decides.
 */
export const DEFECT_QUALITY = ['Accurate', 'Complete', 'Easy to use', 'Timely', 'Relevant'] as const

/** Short labels used while a scene plays. */
export const SCENE_LABELS = {
  loading: 'Loading the scene...',
  tapToFlip: 'Tap a tile to flip it',
} as const
