import { ArrowUp } from 'lucide-react'
import { useSmoothScroll } from '@/components/providers/SmoothScroll'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { resume } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'

function SiteFooter() {
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="content-frame site-footer-inner">
        <p>© {new Date().getFullYear()} {resume.name} · {resume.location.display}</p>
        <p className="site-footer-stack">{siteCopy.footer.builtLabel} {siteCopy.footer.builtWith.join(' · ')}</p>
        <ResumeButton compact />
        <button type="button" className="site-footer-top" onClick={() => scrollTo('#top')}>
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}

export default SiteFooter
