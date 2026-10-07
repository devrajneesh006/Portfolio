import { useId } from 'react'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { resume } from '@/data/resume'
import { siteCopy } from '@/data/siteCopy'
import { cn } from '@/lib/utils'

export function ResumeButton({ className, compact = false }) {
  const noteId = useId()
  const unavailable = !resume.download.available

  const handleClick = (event) => {
    if (unavailable) {
      event.preventDefault()
      toast.error(siteCopy.sidebar.resumeTodo)
    }
  }

  return (
    <span className={cn('resume-button', className)}>
      <a
        className={cn('resume-download', compact && 'resume-download--compact')}
        href={resume.download.path}
        download={unavailable ? undefined : ''}
        onClick={handleClick}
        aria-describedby={unavailable ? noteId : undefined}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>{siteCopy.sidebar.resume}</span>
      </a>
      {unavailable ? <span id={noteId} className="contact-placeholder">{siteCopy.sidebar.resumeTodo}</span> : null}
    </span>
  )
}
