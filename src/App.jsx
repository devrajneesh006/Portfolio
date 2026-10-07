import { lazy } from 'react'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import SiteFooter from '@/components/layout/SiteFooter'
import { ScrollProgress } from '@/components/animations/ScrollProgress'
import Hero from '@/components/sections/Hero'
import StackMarquee from '@/components/sections/StackMarquee'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'

const LazySkills = lazy(() => import('@/components/three/SkillsScene'))

function App() {
  return (
    <SmoothScrollProvider>
      <div className="portfolio-layout">
        <Navbar />
        <main className="portfolio-content" id="content">
          <ScrollProgress />
          <Hero />
          <StackMarquee />
          <About />
          <Skills LazyScene={LazySkills} />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <SiteFooter />
        <Toaster />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
