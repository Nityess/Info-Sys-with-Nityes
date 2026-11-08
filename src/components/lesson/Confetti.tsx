import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const COLORS = ['#0e7c66', '#f5b301', '#e5484d', '#3b82f6', '#8b5cf6']
const COUNT = 34

/** One burst of confetti. Mount with a fresh `key` to fire again; it removes itself. */
export function Confetti() {
  const [alive, setAlive] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setAlive(false), 2000)
    return () => clearTimeout(t)
  }, [])
  if (!alive) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-1/3 z-50 flex justify-center">
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 + (i % 3) * 0.2
        const dist = 110 + (i % 5) * 38
        return (
          <motion.span
            key={i}
            className="absolute h-2.5 w-1.5 rounded-sm"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 70, opacity: 0, rotate: i * 47 }}
            transition={{ duration: 1.1 + (i % 4) * 0.15, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}
