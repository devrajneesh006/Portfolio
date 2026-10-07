import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { socials, isPlaceholder } from '@/data/socials'

const entries = [
  { label: 'GitHub', href: socials.github, icon: Github, placeholder: isPlaceholder(socials.github) },
  { label: 'LinkedIn', href: socials.linkedin, icon: Linkedin, placeholder: isPlaceholder(socials.linkedin) },
  { label: 'Email', href: `mailto:${socials.email}`, icon: Mail, placeholder: isPlaceholder(socials.email), email: true },
]

function SocialLinks() {
  return (
    <div className="social-links" role="group" aria-label="Social links">
      {entries.map((entry) => {
        const Icon = entry.icon
        const href = entry.placeholder && !entry.email ? '#contact' : entry.href
        return (
          <a
            key={entry.label}
            className="social-link"
            href={href}
            target={entry.placeholder || entry.email ? undefined : '_blank'}
            rel={entry.placeholder || entry.email ? undefined : 'noreferrer'}
            title={entry.placeholder ? `${entry.label} — TODO placeholder` : entry.label}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{entry.label}</span>
            {entry.placeholder ? <small>TODO</small> : <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
