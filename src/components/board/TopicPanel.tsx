import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { DemoStage } from './DemoStage'
import { FlipCards } from './FlipCards'
import { Game } from './Game'
import { Ico } from './Ico'
import { NodeScene } from './NodeScene'
import { SimpleWords } from './SimpleWords'
import type { Mcq, Topic } from './types'

/** "Watch how it works": the topic's step demo, or its box and arrow scene when it has no demo. */
export function TopicVisual({ topic }: { topic: Topic }) {
  if (!topic.demo && !topic.scene) return null
  return (
    <div className="bd-block">
      <span className="bd-fl">Watch how it works</span>
      {topic.demo ? <DemoStage demo={topic.demo} /> : topic.scene ? <NodeScene scene={topic.scene} name={topic.name} /> : null}
    </div>
  )
}

interface Props {
  topic: Topic
  bank: readonly Mcq[]
  onPrev: () => void
  onNext: () => void
}

/** One topic of a board: heading, animation, flip cards, game, "In simple words", the Remember strip, and Previous and Next. */
export function TopicPanel({ topic, bank, onPrev, onNext }: Props) {
  // Replay remounts everything below the heading, so the animation, the cards and the game all start again
  const [run, setRun] = useState(0)
  return (
    <section className="bd-card" aria-live="polite">
      <div className="bd-top">
        <div className="bd-topl">
          <span className="bd-chip" style={{ alignSelf: 'flex-start' }}>Topic {topic.n}</span>
          <div className="bd-titlerow">
            <span className="bd-fico bd-fico-lg"><Ico name={topic.ic} /></span>
            <h2 className="bd-h2 bd-serif">{topic.name}</h2>
          </div>
          <p className="bd-line">{topic.line}</p>
        </div>
        <div className="bd-actions">
          {topic.aid && <span className="bd-chip bd-chip-aid">{topic.aid}</span>}
          <button type="button" className="bd-btn" onClick={() => setRun((r) => r + 1)}>
            <RotateCcw className="h-[1.125rem] w-[1.125rem]" aria-hidden />
            Replay
          </button>
        </div>
      </div>

      <div key={run} className="bd-body">
        <TopicVisual topic={topic} />
        {topic.groups && <FlipCards groups={topic.groups} />}
        {topic.game && <Game game={topic.game} bank={bank} />}
        <SimpleWords topic={topic} />
        <div className="bd-rem bd-rise" style={{ '--d': '.3s' } as React.CSSProperties}><span>{topic.remember}</span></div>
      </div>

      <div className="bd-nav">
        <button type="button" className="bd-btn" onClick={onPrev}><ArrowLeft className="h-4 w-4" aria-hidden /> Previous topic</button>
        <button type="button" className="bd-btn" onClick={onNext}>Next topic <ArrowRight className="h-4 w-4" aria-hidden /></button>
      </div>
    </section>
  )
}
