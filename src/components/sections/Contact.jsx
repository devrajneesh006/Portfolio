import { ArrowUpRight, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/animations/SectionHeading'
import EmailCopyButton from '@/components/ui/EmailCopyButton'
import SocialLinks from '@/components/ui/SocialLinks'
import { socials, isPlaceholder } from '@/data/socials'
import { siteCopy } from '@/data/siteCopy'

function Contact() {
  const emailPlaceholder = isPlaceholder(socials.email)

  const handleEmail = emailPlaceholder
    ? (event) => { event.preventDefault(); toast.info(siteCopy.contact.emailTodo) }
    : undefined

  return (
    <section id="contact" className="document-section contact-section" aria-labelledby="contact-heading">
      <div className="content-frame contact-cta">
        <SectionHeading
          headingId="contact-heading"
          eyebrow={siteCopy.contact.eyebrow}
          title={siteCopy.contact.title}
          description={siteCopy.contact.description}
          align="center"
        />
        <Reveal blur scale delay={0.1}>
          <div className="contact-panel">
            <div className="contact-row">
              <span className="contact-label">{siteCopy.contact.emailLabel}</span>
              <a className="contact-email" href={`mailto:${socials.email}`} onClick={handleEmail}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{socials.email}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <EmailCopyButton />
            </div>
            <div className="contact-row">
              <span className="contact-label">{siteCopy.contact.socialsLabel}</span>
              <div className="contact-row-body">
                <SocialLinks />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
