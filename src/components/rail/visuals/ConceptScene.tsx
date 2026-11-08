import { Suspense } from 'react'
import { SceneFrame } from './SceneFrame'
import { SimpleStory } from './SimpleStory'
import { aidLabel, sceneTopic } from './sceneMeta'
import { SCENES } from './registry'

/** One topic's animated scene with its teaching-aid chip, Replay button and the "In simple words" block. Used by the lesson's Concept step and by the scene pages. */
export function ConceptScene({ code }: { code: string }) {
  const Scene = SCENES[code]
  const topic = sceneTopic(code)
  if (!Scene || !topic) return null
  return (
    <SceneFrame aid={aidLabel(code)} section={topic.section}>
      <Suspense fallback={<p role="status" className="sc-note">Loading the scene…</p>}>
        <Scene />
      </Suspense>
      <SimpleStory code={code} section={topic.section} />
    </SceneFrame>
  )
}
