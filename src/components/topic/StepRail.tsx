import { Check } from 'lucide-react'
import { stepState } from './lessonSteps'
import type { LessonStep } from './lessonSteps'

interface Props {
  steps: LessonStep[]
  step: number
  onGo: (n: number) => void
}

/** The numbered step bar. Done steps show a tick, the current one is blue; any step can be opened. */
export function StepRail({ steps, step, onGo }: Props) {
  return (
    <nav aria-label="Lesson steps">
      <ol className="ls-rail">
        {steps.map((s, i) => {
          const n = i + 1
          const state = stepState(n, step)
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`ls-rb${state === 'done' ? ' ls-rb-done' : ''}${state === 'current' ? ' ls-rb-cur' : ''}`}
                aria-label={`Step ${n}: ${s.label}${state === 'done' ? ', done' : ''}`}
                aria-current={state === 'current' ? 'step' : undefined}
                onClick={() => onGo(n)}
              >
                <span className="ls-dot">{state === 'done' ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : n}</span>
                <span className="ls-rl">{s.label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
