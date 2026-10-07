import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export function Reveal({ children, className, delay = 0, y = 28, blur = false, scale = false, once = true, ...props }) {
  const reducedMotion = useReducedMotion()

  const initial = reducedMotion
    ? false
    : {
        opacity: 0,
        y,
        ...(blur ? { filter: 'blur(8px)' } : {}),
        ...(scale ? { scale: 0.97 } : {}),
      }
  const animate = reducedMotion
    ? undefined
    : {
        opacity: 1,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
        ...(scale ? { scale: 1 } : {}),
      }

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
