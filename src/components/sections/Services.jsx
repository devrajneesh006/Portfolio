import { Code2, Database, Server } from 'lucide-react'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup'
import { skillGroups } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'

const serviceIcons = {
  Frontend: Code2,
  Backend: Server,
  Database,
}

const serviceBlurb = {
  Frontend: 'Responsive interfaces people enjoy using.',
  Backend: 'Practical server logic that stays dependable.',
  Database: 'Data models that stay consistent as apps grow.',
}

function Services() {
  return (
    <section id="services" className="document-section services-section" aria-labelledby="services-heading">
      <div className="content-frame">
        <SectionHeading
          headingId="services-heading"
          eyebrow={siteCopy.services.eyebrow}
          title={siteCopy.services.title}
          description={siteCopy.services.description}
        />
        <StaggerGroup className="service-rows">
          {skillGroups.map((group, index) => {
            const Icon = serviceIcons[group.label] || Code2
            return (
              <StaggerItem className="service-row" key={group.label}>
                <span className="service-row-index" aria-hidden="true">0{index + 1}</span>
                <span className="service-row-icon" aria-hidden="true"><Icon className="h-4 w-4" /></span>
                <span className="service-row-body">
                  <span className="service-row-head">
                    <h3 className="service-row-title">{group.label}</h3>
                    <span className="service-row-count">{group.skills.length} tools</span>
                  </span>
                  <span className="service-row-blurb">{serviceBlurb[group.label]}</span>
                  <span className="service-row-tools">{group.skills.join(' · ')}</span>
                </span>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

export default Services
