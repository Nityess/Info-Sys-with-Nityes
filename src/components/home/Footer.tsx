import { BRAND } from './homeData'

/** One closing line: what the site is, that the examples are made up, and who made it. */
export function Footer() {
  return (
    <footer className="ns-foot">
      <div className="ns-wrap ns-foot-in">
        <p>{BRAND}. A free study site for ICAN CAP Foundation, Paper 2 Part B. The businesses, people and numbers in the simulations are made up for teaching.</p>
        <span>© CA Nitesh Giri</span>
      </div>
    </footer>
  )
}
