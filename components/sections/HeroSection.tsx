'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="mesh-gradient-hero" />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="font-heading text-5xl xl:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Celestin Guilhen
        </motion.h1>

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
