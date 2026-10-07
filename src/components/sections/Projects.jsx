import { motion } from 'motion/react'
import { ArrowUpRight, Github } from 'lucide-react'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/data/projects'
import { siteCopy } from '@/data/siteCopy'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function ProjectCard({ project, index, reducedMotion }) {
  return (
    <motion.article
      className="project-card"
      aria-label={project.title}
      initial={reducedMotion ? false : { opacity: 0, y: 26, filter: 'blur(6px)' }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -5 }}
    >
      {project.image ? (
        <div className="project-visual img-zoom" aria-hidden="true">
          <img src={project.image} alt="" loading="lazy" />
        </div>
      ) : null}
      <div className="project-body">
        <div className="project-meta">
          <span className="project-index">0{index + 1} / {String(projects.length).padStart(2, '0')}</span>
          <Badge>{project.type}</Badge>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-stack" aria-label={`Technologies used in ${project.title}`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          <a
            className="project-link"
            href={project.liveUrl}
            target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={project.liveUrl.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`Open ${project.title} live demo`}
          >
            {siteCopy.projects.live}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            className="project-link"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} repository`}
          >
            {siteCopy.projects.repo}
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="projects" className="document-section projects-section" aria-labelledby="projects-heading">
      <div className="content-frame">
        <SectionHeading
          headingId="projects-heading"
          eyebrow={siteCopy.projects.eyebrow}
          title={siteCopy.projects.title}
          description={siteCopy.projects.description}
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
