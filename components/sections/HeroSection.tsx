'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

/* Chargement lazy du logo 3D — jamais côté serveur */
const LogoCG3D = dynamic(() => import('@/components/three/LogoCG3D'), {
  ssr: false,
  loading: () => <div className="w-[540px] h-[440px] mx-auto" />,
})

/* Fallback logo 2D pour mobile */
function LogoCG2D() {
  return (
    <Image
      src="/images/Logo_CG.png"
      alt="Logo CG"
      width={540}
      height={540}
      className="mx-auto"
      priority
    />
  )
}

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex items-start justify-center overflow-hidden pt-0 pb-16">
      <div className="mesh-gradient-hero" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="-mb-4"
        >
          {/* Placeholder invisible tant qu'on ne sait pas si desktop ou mobile */}
          {isDesktop === null && <div className="w-[540px] h-[440px] mx-auto" />}

          {/* Logo 3D sur desktop, 2D sur mobile */}
          {isDesktop !== null && (
            <Suspense fallback={<div className="w-[540px] h-[440px] mx-auto" />}>
              {isDesktop ? <LogoCG3D /> : <LogoCG2D />}
            </Suspense>
          )}
        </motion.div>

        <TypewriterTitle
          text="Celestin Guilhen"
          as="h1"
          className="font-heading text-5xl xl:text-7xl font-bold mb-4"
          speed={80}
        />

        <motion.p
          className="text-muted text-lg xl:text-xl mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Étudiant Ingénieur — Spécialisation Finance &amp; Marchés — ECE Lyon
        </motion.p>

        <motion.p
          className="text-text/70 text-base mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Bienvenue sur mon portfolio.
        </motion.p>

        <motion.button
          onClick={scrollToProjects}
          className="px-6 py-3 border border-accent text-accent font-heading text-sm tracking-wider uppercase relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(255,45,85,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Voir mes projets
          </span>
          <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>
    </section>
  )
}
