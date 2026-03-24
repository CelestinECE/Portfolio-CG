import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
