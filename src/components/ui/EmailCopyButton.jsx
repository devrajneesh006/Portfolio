import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { isPlaceholder, socials } from '@/data/socials'
import { siteCopy } from '@/data/siteCopy'

function EmailCopyButton() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    if (isPlaceholder(socials.email)) {
      toast.info(siteCopy.contact.emailTodo)
      return
    }
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(socials.email)
          setCopied(true)
          toast.success(siteCopy.contact.copied)
          window.setTimeout(() => setCopied(false), 1800)
          return
        } catch {
          // Fall through to the selection-based copy for restricted contexts.
        }
      }

      const textarea = document.createElement('textarea')
      textarea.value = socials.email
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand('copy')
      textarea.remove()
      if (!copied) throw new Error('Copy command was unavailable')
      setCopied(true)
      toast.success(siteCopy.contact.copied)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error(siteCopy.contact.copyError)
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={copyEmail}
      aria-label={copied ? siteCopy.contact.copied : siteCopy.contact.copyEmail}
      title={copied ? siteCopy.contact.copied : siteCopy.contact.copyEmail}
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? siteCopy.contact.copied : siteCopy.contact.copyEmail}
    </Button>
  )
}

export default EmailCopyButton
