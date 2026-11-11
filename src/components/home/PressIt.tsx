import { useState } from 'react'

type Press = 'idle' | 'ok' | 'bad'

/** The "Press it" step: broadcast a block, or cheat first. A made-up example, nothing real is sent. */
export function PressIt() {
  const [press, setPress] = useState<Press>('idle')
  return (
    <>
      <div className="ns-press">
        <button type="button" className={`ns-pb ${press === 'ok' ? 'go' : ''}`} onClick={() => setPress('ok')}>Broadcast the block</button>
        <button type="button" className={`ns-pb alt ${press === 'bad' ? 'go' : ''}`} onClick={() => setPress('bad')}>Cheat first</button>
      </div>
      <div className="ns-out" aria-live="polite">
        {press === 'idle' && <span>Press one. Three members will check the block.</span>}
        {press === 'ok' && <span className="ok">3 members checked the hash. The block joins the chain.</span>}
        {press === 'bad' && <span className="bad">Rejected. The amount changed after the hash was made, so the codes do not match.</span>}
      </div>
    </>
  )
}
