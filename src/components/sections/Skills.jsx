import { Suspense, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { MousePointer2, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { skillGroups } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'
import { cn } from '@/lib/utils'

const filters = [siteCopy.skills.filterAll, ...skillGroups.map((group) => group.label)]

function SkillsOrb({ LazyScene, use3D, onActiveSkill }) {
  return (
    <div className="skills-orb" aria-hidden="true">
      {use3D ? (
        <Suspense fallback={<div className="skills-orb-fallback" />}>
          <LazyScene onActiveSkill={onActiveSkill} />
        </Suspense>
      ) : (
        <div className="skills-orb-fallback"><span /></div>
      )}
    </div>
  )
}

function Skills({ LazyScene }) {
  const [activeSkill, setActiveSkill] = useState(siteCopy.skills.readoutIdle)
  const [filter, setFilter] = useState(siteCopy.skills.filterAll)
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const { shouldRender3D } = useWebGL()
  const use3D = shouldRender3D && !isMobile && !reducedMotion

  const totalCount = useMemo(
    () => skillGroups.reduce((total, group) => total + group.skills.length, 0),
    [],
  )
  const rows = useMemo(() => {
    const groups = filter === siteCopy.skills.filterAll
      ? skillGroups
      : skillGroups.filter((group) => group.label === filter)
    return groups.flatMap((group) => group.skills.map((skill) => ({ skill, group: group.label })))
  }, [filter])

  return (
    <section id="skills" className="document-section skills-section" aria-labelledby="skills-heading">
      <SectionHeading
        headingId="skills-heading"
        eyebrow={siteCopy.skills.eyebrow}
        title={siteCopy.skills.title}
        description={siteCopy.skills.description}
      />
      <Reveal className="skills-showpiece" delay={0.08} blur>
        <div className="skills-introline">
          <div>
            <p className="subsection-label"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {siteCopy.skills.overviewLabel}</p>
            <p className="skills-intro-copy">{siteCopy.skills.overviewCopy}</p>
          </div>
          <SkillsOrb LazyScene={LazyScene} use3D={use3D} onActiveSkill={setActiveSkill} />
        </div>

        <div className="skill-index">
          <div className="skill-index-head">
            <span>{siteCopy.skills.indexTitle}</span>
            <span>{String(totalCount).padStart(2, '0')} tools</span>
          </div>
          <div className="skill-filter" role="tablist" aria-label={siteCopy.skills.filterLabel}>
            {filters.map((entry) => {
              const active = filter === entry
              return (
                <button
                  key={entry}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className="skill-filter-tab"
                  data-active={active}
                  onClick={() => setFilter(entry)}
                >
                  {active && !reducedMotion ? (
                    <motion.span
                      className="skill-filter-pill"
                      layoutId="skill-filter-pill"
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="skill-filter-label">{entry}</span>
                </button>
              )
            })}
          </div>
          <ul className="skill-rows">
            {rows.map((row, index) => (
              <motion.li
                key={`${filter}-${row.skill}`}
                className={cn('skill-row')}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveSkill(`${row.skill} · ${row.group}`)}
                onMouseLeave={() => setActiveSkill(siteCopy.skills.readoutIdle)}
                onFocus={() => setActiveSkill(`${row.skill} · ${row.group}`)}
                onBlur={() => setActiveSkill(siteCopy.skills.readoutIdle)}
                tabIndex={0}
              >
                <span className="skill-row-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="skill-row-name">{row.skill}</span>
                <span className="skill-row-tag">{row.group}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="skills-active-readout" aria-live="polite">
          <MousePointer2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{activeSkill}</span>
        </div>
      </Reveal>
      <div className="sr-only">
        <h3>Skills by group</h3>
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h4>{group.label}</h4>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
