import { ArrowUpRight, Info, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { Magnetic } from '@/components/animations/Magnetic'
import EmailCopyButton from '@/components/ui/EmailCopyButton'
import SocialLinks from '@/components/ui/SocialLinks'
import { socials, isPlaceholder } from '@/data/socials'
import { siteCopy } from '@/data/siteCopy'

function Contact() {
  const emailPlaceholder = isPlaceholder(socials.email)

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
        <Reveal blur scale delay={0.1} className="contact-cta-body">
          <p className="contact-label">{siteCopy.contact.emailLabel}</p>
          <Magnetic className="contact-email-wrap">
            <a
              className="contact-email contact-email--big"
              href={`mailto:${socials.email}`}
              onClick={emailPlaceholder ? (event) => { event.preventDefault(); toast.info(siteCopy.contact.emailTodo) } : undefined}
            >
              <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{socials.email}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
          </Magnetic>
          <div className="contact-actions contact-actions--center">
            <EmailCopyButton />
            {emailPlaceholder ? <span className="contact-placeholder">TODO: add the public email in src/data/socials.js.</span> : null}
          </div>
          <div className="contact-socials">
            <span className="contact-label">{siteCopy.contact.socialsLabel}</span>
            <SocialLinks />
            <p className="placeholder-note">
              <Info className="h-4 w-4" aria-hidden="true" />
              <span>{siteCopy.contact.placeholderNotice}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
