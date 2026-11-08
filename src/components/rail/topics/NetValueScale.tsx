import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { useSettings } from '../../../state/useSettings'
import { beamAngle, formatNpr, netValue, verdictOf } from './netValue'

interface Props {
  extraBenefit: number
  extraCost: number
}

const TONE = {
  positive: 'text-spruce',
  negative: 'text-coral',
  zero: 'text-slate-500 dark:text-slate-400',
} as const

/** A balance scale: the beam tips towards the larger side, with the net value shown big underneath. */
export function NetValueScale({ extraBenefit, extraCost }: Props) {
  const { settings } = useSettings()
  const target = beamAngle(extraBenefit, extraCost)
  const angle = useSpring(0, { stiffness: 90, damping: 11 })

  useEffect(() => {
    if (settings.reduceMotion) angle.jump(target)
    else angle.set(target)
  }, [angle, target, settings.reduceMotion])

  const rad = useTransform(angle, (a) => (a * Math.PI) / 180)
  const arm = 78
  const lx = useTransform(rad, (r) => 110 - arm * Math.cos(r))
  const ly = useTransform(rad, (r) => 44 - arm * Math.sin(r))
  const rx = useTransform(rad, (r) => 110 + arm * Math.cos(r))
  const ry = useTransform(rad, (r) => 44 + arm * Math.sin(r))
  const lpy = useTransform(ly, (y) => y + 34)
  const rpy = useTransform(ry, (y) => y + 34)

  const net = netValue(extraBenefit, extraCost)
  const verdict = verdictOf(net)

  return (
    <div>
      <svg viewBox="0 0 220 130" className="mx-auto w-full max-w-sm" role="img" aria-label={`Balance scale: extra benefit ${formatNpr(extraBenefit)}, extra cost ${formatNpr(extraCost)}`}>
        <path d="M110 44v62M82 108h56" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="4" strokeLinecap="round" fill="none" />
        <motion.line x1={lx} y1={ly} x2={rx} y2={ry} className="stroke-ink dark:stroke-white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="110" cy="44" r="5" className="fill-marigold" />
        <motion.line x1={lx} y1={ly} x2={lx} y2={lpy} className="stroke-slate-400" strokeWidth="1.5" />
        <motion.line x1={rx} y1={ry} x2={rx} y2={rpy} className="stroke-slate-400" strokeWidth="1.5" />
        <motion.ellipse cx={lx} cy={lpy} rx="30" ry="9" className="fill-spruce" />
        <motion.ellipse cx={rx} cy={rpy} rx="30" ry="9" className="fill-coral" />
        <motion.text x={lx} y={lpy} dy="3.5" textAnchor="middle" className="fill-white text-[9px] font-bold">Benefit</motion.text>
        <motion.text x={rx} y={rpy} dy="3.5" textAnchor="middle" className="fill-white text-[9px] font-bold">Cost</motion.text>
      </svg>
      <p className="mt-1 text-center text-xs text-slate-600 dark:text-slate-400">
        {formatNpr(extraBenefit)} extra benefit, {formatNpr(extraCost)} extra cost
      </p>
      <p className="mt-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">Net value</p>
      <p className={`text-center font-display text-4xl font-semibold tabular-nums ${TONE[verdict]}`} aria-live="polite">
        {formatNpr(net)}
      </p>
    </div>
  )
}
