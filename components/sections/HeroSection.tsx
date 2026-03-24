'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-0">
      <div className="mesh-gradient-hero" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="-mb-4"
        >
          <Image
            src="/images/Logo_CG.png"
            alt="Logo CG"
            width={540}
            height={540}
            className="mx-auto"
            priority
          />
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
          Ingénieur IA &amp; Systèmes d&apos;Information — ECE Lyon
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
          className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-bg transition-colors duration-300 font-heading text-sm tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Voir mes projets
        </motion.button>
      </div>
    </section>
  )
}
