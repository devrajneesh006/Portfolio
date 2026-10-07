import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export function StaggerGroup({ children, className, delay = 0, ...props }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      variants={
        reducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
