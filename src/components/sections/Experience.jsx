import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { resume } from '@/data/resume'
import { isPlaceholder } from '@/data/socials'
import { siteCopy } from '@/data/siteCopy'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function Experience() {
  const timelineRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const progress = timelineRef.current?.querySelector('.timeline-line-progress')
    const entries = timelineRef.current?.querySelectorAll('.timeline-entry')
    if (!progress || !entries?.length) return

    if (reducedMotion) {
      gsap.set(progress, { scaleY: 1 })
      gsap.set(entries, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      progress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 56%',
          scrub: 0.7,
        },
      },
    )

    entries.forEach((entry) => {
      gsap.from(entry, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 78%',
          once: true,
        },
      })
    })
  }, { scope: timelineRef, dependencies: [reducedMotion] })

  return (
    <section id="experience" className="document-section experience-section" aria-labelledby="experience-heading">
      <div className="content-frame">
        <SectionHeading
          headingId="experience-heading"
          eyebrow={siteCopy.experience.eyebrow}
          title={siteCopy.experience.title}
          description={siteCopy.experience.description}
        />
        <div ref={timelineRef} className="timeline-wrap">
          <div className="timeline-line" aria-hidden="true">
            <div className="timeline-line-progress" />
          </div>
          <div className="timeline-list">
            {resume.experience.map((experience, index) => {
              const bullets = (experience.bullets || []).filter((bullet) => !isPlaceholder(bullet))
              return (
                <article className="timeline-entry" key={experience.company}>
                  <span className="timeline-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div className="timeline-body">
                    {!isPlaceholder(experience.period) ? (
                      <p className="timeline-period">{experience.period}</p>
                    ) : null}
                    <h3 className="timeline-title">{experience.company}</h3>
                    <p className="timeline-role">{experience.role}</p>
                    {bullets.length ? (
                      <ul className="timeline-bullets">
                        {bullets.map((bullet, bulletIndex) => (
                          <li className="timeline-bullet" key={`${experience.company}-${bulletIndex}`}>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <Reveal className="mt-10 flex items-center gap-3 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted-foreground">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {siteCopy.experience.timelineNote}
        </Reveal>
      </div>
    </section>
  )
}

export default Experience
