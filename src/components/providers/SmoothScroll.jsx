import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LenisContext = createContext(null)

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const frameRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.05,
      smoothWheel: !reducedMotion,
      syncTouch: false,
      touchMultiplier: 1.1,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time)
      frameRef.current = window.requestAnimationFrame(raf)
    }
    frameRef.current = window.requestAnimationFrame(raf)

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      lenis.destroy()
      lenis.off('scroll', ScrollTrigger.update)
      lenisRef.current = null
    }
  }, [reducedMotion])

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current
    const offset = -88
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.05, ...options })
      return
    }

    const element = typeof target === 'string' ? document.querySelector(target) : target
    element?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }, [reducedMotion])

  return <LenisContext.Provider value={{ lenis: lenisRef, scrollTo }}>{children}</LenisContext.Provider>
}

export function useSmoothScroll() {
  const context = useContext(LenisContext)
  return context ?? { lenis: { current: null }, scrollTo: () => {} }
}
