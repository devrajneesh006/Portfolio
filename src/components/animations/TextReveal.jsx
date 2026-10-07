import { Fragment } from 'react'
import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// transitions.dev "Texts reveal": lines rise with offset stagger + soft blur.
// Driven by our own useInView on the block-level wrapper: Motion's whileInView
// does not reliably fire on inline word spans, so the parent observes instead
// and each word animates via `animate` once it flips true.
export function TextReveal({ text, as: Tag = 'span', className, delay = 0, stagger = 0.035, id }) {
  const reducedMotion = useReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.35, once: true })

  if (reducedMotion || !text) {
    return <Tag className={className} id={id}>{text}</Tag>
  }

  const words = String(text).split(' ')

  return (
    <Tag ref={ref} className={className} id={id} aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span aria-hidden="true" className="text-reveal-word">
            <motion.span
              className="text-reveal-inner"
              initial={{ opacity: 0, y: '110%', filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: '0%', filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.7, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
