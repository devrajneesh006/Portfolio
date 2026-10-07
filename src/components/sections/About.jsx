import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { toast } from 'sonner'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/animations/SectionHeading'
import { resume } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'

function profileEntries() {
  const glance = Object.fromEntries(resume.atAGlance.map((item) => [item.label, item.value]))
  return [
    { key: 'name', value: resume.name },
    { key: 'role', value: resume.role },
    { key: 'location', value: glance.Location },
    { key: 'education', value: glance.Education },
    { key: 'focus', value: glance.Focus },
    { key: 'status', value: siteCopy.sidebar.availability },
  ]
}

function ProfileTerminal() {
  const [copied, setCopied] = useState(false)
  const entries = profileEntries()

  const copyJson = async () => {
    const json = JSON.stringify(Object.fromEntries(entries.map((entry) => [entry.key, entry.value])), null, 2)
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      toast.success(siteCopy.about.copiedJson)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error(siteCopy.about.copyError)
    }
  }

  return (
    <div className="terminal" role="figure" aria-label="Profile details as JSON">
      <div className="terminal-bar">
        <span className="term-dots" aria-hidden="true">
          <i data-color="red" />
          <i data-color="yellow" />
          <i data-color="green" />
        </span>
        <span className="term-filename">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          profile.json
        </span>
        <button
          type="button"
          className="term-copy"
          onClick={copyJson}
          aria-label={copied ? siteCopy.about.copiedJson : siteCopy.about.copyJson}
          title={copied ? siteCopy.about.copiedJson : siteCopy.about.copyJson}
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
      <pre className="terminal-body" aria-hidden="true">
        <code>
          <span className="term-punct">{'{'}</span>{'\n'}
          {entries.map((entry, index) => (
            <span key={entry.key}>
              {'  '}<span className="term-key">"{entry.key}"</span>
              <span className="term-punct">: </span>
              <span className="term-str">"{entry.value}"</span>
              <span className="term-punct">{index < entries.length - 1 ? ',' : ''}</span>{'\n'}
            </span>
          ))}
          <span className="term-punct">{'}'}</span>
          <span className="term-cursor" />
        </code>
      </pre>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="document-section about-section" aria-labelledby="about-heading">
      <SectionHeading
        headingId="about-heading"
        eyebrow={siteCopy.about.eyebrow}
        title={siteCopy.about.title}
      />
      <div className="about-content-grid">
        <Reveal delay={0.1} blur>
          <p className="about-lede">{siteCopy.about.description}</p>
          <p className="about-summary-short">{resume.summary}</p>
          <p className="about-status">
            <span className="status-dot" aria-hidden="true" />
            {siteCopy.sidebar.availability}
          </p>
        </Reveal>
        <Reveal delay={0.18} blur scale>
          <ProfileTerminal />
        </Reveal>
      </div>
    </section>
  )
}

export default About
