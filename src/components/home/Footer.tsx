import { Check } from 'lucide-react'
import { BRAND } from './homeData'

const FACTS = ['Free', 'No account', 'Saved on your device', 'Light on data']

/** One quiet closing block: what the site costs and needs, and the made-up-names note. */
export function Footer() {
  return (
    <footer className="lp-wrap lp-foot">
      <ul className="lp-facts">
        {FACTS.map((f) => (
          <li key={f}>
            <Check width={18} height={18} strokeWidth={3} aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <p>
        {BRAND}: a free study site for ICAN CAP Foundation, Paper 2 Part B. Businesses and numbers in the simulations are made up for teaching.
      </p>
    </footer>
  )
}
