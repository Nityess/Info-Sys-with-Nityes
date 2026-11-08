import { useId, useState } from 'react'
import { Eye, EyeOff, RotateCcw } from 'lucide-react'
import { charsetSize, ratePassword } from './lo7cLogic'

const BAR = ['bg-rose-600', 'bg-orange-500', 'bg-amber-400', 'bg-lime-500', 'bg-emerald-600']

/** Lab widget: password strength estimate. Nothing typed leaves the browser. */
export function Lo7cPassword() {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const id = useId()
  const s = ratePassword(pw)

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">How strong is this password?</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Type a made-up password (never a real one). It stays on this device.
      </p>

      <div className="flex gap-2">
        <label htmlFor={id} className="sr-only">
          Password to test
        </label>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow(!show)}
          className="rounded border border-slate-300 px-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          {show ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {pw && (
        <div className="space-y-2" aria-live="polite">
          <div className="flex gap-1" aria-hidden>
            {BAR.map((c, i) => (
              <div key={c} className={`h-2 flex-1 rounded ${i <= s.level ? c : 'bg-slate-200 dark:bg-slate-700'}`} />
            ))}
          </div>
          <p className="text-sm">
            <strong>{s.rating}</strong> · about {Math.round(s.bits)} bits
          </p>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded bg-slate-100 p-2 dark:bg-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">Length</dt>
              <dd className="font-medium">{pw.length}</dd>
            </div>
            <div className="rounded bg-slate-100 p-2 dark:bg-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">Character pool</dt>
              <dd className="font-medium">{charsetSize(pw)}</dd>
            </div>
          </dl>
          {s.tips.length > 0 && (
            <ul className="list-disc space-y-0.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {s.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="rounded-md bg-sky-50 p-2 text-xs text-sky-900 dark:bg-sky-900/30 dark:text-sky-100">
        Bits = length × log₂(pool). Each extra bit doubles the guesses. Even a strong password should not be
        reused (Ch10 §2.5), and 2FA protects you if it is stolen.
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setPw('')
            setShow(false)
          }}
          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset
        </button>
      </div>
    </div>
  )
}
