import { Award, GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup'
import { resume } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'

function Education() {
  const cards = [
    ...resume.education.map((item) => ({ ...item, kind: 'education', icon: GraduationCap })),
    ...resume.certificates.map((item) => ({ ...item, kind: 'certificate', icon: Award })),
  ]

  return (
    <section id="education" className="document-section education-section" aria-labelledby="education-heading">
      <div className="content-frame">
        <SectionHeading
          headingId="education-heading"
          eyebrow={siteCopy.education.eyebrow}
          title={siteCopy.education.title}
          description={siteCopy.education.description}
        />
        <StaggerGroup className="education-list">
          {cards.map((item, index) => {
            const Icon = item.icon
            return (
              <StaggerItem className="education-row" key={`${item.kind}-${item.title}`}>
                <span className="education-row-index" aria-hidden="true">0{index + 1}</span>
                <span className="education-icon" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="education-row-body">
                  <h3 className="education-title">{item.title}</h3>
                  <p className="education-detail">
                    {item.institution} {item.detail ? `· ${item.detail}` : ''} {item.year ? `· ${item.year}` : ''}
                  </p>
                </span>
                <span className="education-kind">{item.kind}</span>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

export default Education
