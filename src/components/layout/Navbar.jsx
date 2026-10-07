import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/animations/Magnetic'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import SocialLinks from '@/components/ui/SocialLinks'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSmoothScroll } from '@/components/providers/SmoothScroll'
import { siteCopy } from '@/data/siteCopy'
import { isPlaceholder, socials } from '@/data/socials'
import { cn } from '@/lib/utils'

const links = [
  { id: 'about', label: siteCopy.nav.about },
  { id: 'skills', label: siteCopy.nav.skills },
  { id: 'experience', label: siteCopy.nav.experience },
  { id: 'projects', label: siteCopy.nav.projects },
  { id: 'contact', label: siteCopy.nav.contact },
]

function Navbar() {
  const [activeSection, setActiveSection] = useState('top')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollTo } = useSmoothScroll()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['top', ...links.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navigate = (event, id) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollTo(`#${id}`)
  }

  return (
    <header className={cn('topbar', scrolled && 'topbar--scrolled')} aria-label="Primary navigation">
      <div className="topbar-inner">
        <a
          href="#top"
          onClick={(event) => navigate(event, 'top')}
          className="topbar-logo"
          title="Back to top"
        >
          <span className="logo-mark" aria-hidden="true">RS</span>
          <span className="topbar-logo-text">Rajneesh Sisodia<span aria-hidden="true">.</span></span>
        </a>

        <nav className="topbar-links" aria-label="Section links">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => navigate(event, link.id)}
              className="topbar-link"
              data-active={activeSection === link.id}
              aria-current={activeSection === link.id ? 'location' : undefined}
            >
              <span className="topbar-link-index" aria-hidden="true">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <Magnetic className="topbar-email">
            <Button
              size="sm"
              onClick={(event) => {
                if (isPlaceholder(socials.email)) {
                  event.preventDefault()
                  scrollTo('#contact')
                }
              }}
              asChild
            >
              <a href={isPlaceholder(socials.email) ? '#contact' : `mailto:${socials.email}`}>
                <span className="topbar-email-text">
                  {isPlaceholder(socials.email) ? siteCopy.nav.contact : socials.email}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>
          </Magnetic>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="nav-menu-trigger" aria-label={siteCopy.nav.openMenu}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-sidebar-sheet">
              <SheetHeader>
                <div className="sheet-brand">
                  <span className="logo-mark" aria-hidden="true">RS</span>
                  <span className="font-mono text-[0.64rem] tracking-[0.12em] text-muted-foreground">NAV / INDEX</span>
                </div>
                <SheetTitle className="sr-only">{siteCopy.sidebar.mobileNavigation}</SheetTitle>
                <SheetDescription className="sr-only">{siteCopy.sidebar.mobileNavigation}</SheetDescription>
              </SheetHeader>
              <nav className="mt-12 flex flex-col" aria-label="Mobile section links">
                <AnimatePresence initial={false}>
                  {links.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(event) => navigate(event, link.id)}
                      className={cn(
                        'flex min-h-14 items-center justify-between border-b border-border py-4 font-display text-2xl tracking-[-0.04em] text-foreground transition-colors hover:text-accent-ink',
                        activeSection === link.id && 'text-accent-ink',
                      )}
                      initial={reducedMotion ? false : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reducedMotion ? 0 : index * 0.05, duration: 0.3 }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </motion.a>
                  ))}
                </AnimatePresence>
                <Button
                  className="mt-8 w-full"
                  onClick={(event) => {
                    if (isPlaceholder(socials.email)) {
                      event.preventDefault()
                      setMenuOpen(false)
                      scrollTo('#contact')
                    }
                  }}
                  asChild
                >
                  <a href={isPlaceholder(socials.email) ? '#contact' : `mailto:${socials.email}`}>
                    {siteCopy.nav.contact}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <div className="sheet-section-label">{siteCopy.contact.socialsLabel}</div>
                <SocialLinks />
                <ResumeButton className="sheet-resume" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
