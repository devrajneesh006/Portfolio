import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Hand } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Magnetic } from '@/components/animations/Magnetic'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSmoothScroll } from '@/components/providers/SmoothScroll'
import { resume, skillGroups } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'
import { socials } from '@/data/socials'

const ease = [0.22, 1, 0.36, 1]

function Portrait() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="hero-portrait">
      {imageFailed ? (
        <span className="hero-portrait-fallback" aria-label="Portrait placeholder for Rajneesh Sisodia">
          RS
        </span>
      ) : (
        <img
          src="/main.jpeg"
          alt="Portrait of Rajneesh Sisodia"
          className="hero-portrait-image"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollTo } = useSmoothScroll()
  const toolCount = skillGroups.reduce((total, group) => total + group.skills.length, 0)

  useGSAP(() => {
    if (reducedMotion) return undefined
    // Scroll drift only on tablet/desktop: on mobile the headline would slide
    // underneath the overlapping portrait and disappear behind it.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.to('.hero-type', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
      gsap.to('.hero-portrait', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    })
    return () => mm.revert()
  }, { scope: heroRef, dependencies: [reducedMotion] })

  const rise = (delay, y = 44) => ({
    initial: reducedMotion ? false : { opacity: 0, y, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section id="top" ref={heroRef} className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <motion.p className="hero-greeting" {...rise(0)}>
          <Hand className="h-4 w-4" aria-hidden="true" />
          <span>{siteCopy.hero.greeting}</span>
        </motion.p>

        <div className="hero-stage">
          <motion.h1 id="hero-heading" className="hero-type" {...rise(0.1, isMobile ? 0 : 44)}>
            <span className="sr-only">{resume.name}, </span>
            <span className="hero-line hero-line-solid" aria-hidden="true">{siteCopy.hero.lineSolid}</span>
            <span className="hero-line hero-line-outline" aria-hidden="true">
              {siteCopy.hero.lineOutline}
            </span>
          </motion.h1>

          <motion.div className="hero-portrait-wrap" {...rise(0.22)}>
            <Portrait />
          </motion.div>

        </div>

        <motion.p className="hero-location" {...rise(0.34)}>
          {siteCopy.hero.location}
        </motion.p>

        <motion.div className="hero-actions" {...rise(0.42)}>
          <Magnetic>
            <Button size="lg" onClick={() => scrollTo('#projects')}>
              {siteCopy.hero.viewWork}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button size="lg" variant="outline" onClick={() => scrollTo('#contact')}>
              {siteCopy.hero.contact}
            </Button>
          </Magnetic>
        </motion.div>

        <motion.dl className="hero-stats" aria-label={siteCopy.hero.stats} {...rise(0.5)}>
          <div className="hero-stat">
            <dt>Technologies</dt>
            <dd>{String(toolCount).padStart(2, '0')}</dd>
          </div>
          <div className="hero-stat">
            <dt>Internships</dt>
            <dd>{String(resume.experience.length).padStart(2, '0')}</dd>
          </div>
          <div className="hero-stat">
            <dt>Stack layers</dt>
            <dd>{String(skillGroups.length).padStart(2, '0')}</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  )
}

export default Hero
