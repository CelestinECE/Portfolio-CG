'use client'

import { motion } from 'framer-motion'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen py-24 px-4">
      <div className="mesh-gradient-projects" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <TypewriterTitle
          text="Expériences & Projets"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        {/* Placeholder — à compléter avec les projets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-surface border border-surface-2 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-heading text-lg text-text mb-2">Projet {i}</h3>
              <p className="text-muted text-sm">Description à venir.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
