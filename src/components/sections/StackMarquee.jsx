import { Asterisk } from 'lucide-react'
import { skillGroups } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'

const tools = skillGroups.flatMap((group) => group.skills)

function StackMarquee() {
  const row = [...tools, ...tools]

  return (
    <div className="marquee" role="marquee" aria-label={siteCopy.marquee.label}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {row.map((tool, index) => (
              <span className="marquee-item" key={`${copy}-${tool}-${index}`}>
                <span>{tool}</span>
                <Asterisk className="h-4 w-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackMarquee
