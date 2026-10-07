import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Subtle magnetic hover for buttons / icon links. Disabled on reduced motion.
export function Magnetic({ children, strength = 6, className }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(((event.clientX - centerX) / rect.width) * strength * 2)
    y.set(((event.clientY - centerY) / rect.height) * strength * 2)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
