'use client'

import { motion } from 'framer-motion'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-4">
      <div className="relative z-10 max-w-6xl mx-auto">
        <TypewriterTitle
          text="À propos"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder photo — à remplacer par une vraie image */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-48 h-48 rounded-full bg-surface border-2 border-accent/30 flex items-center justify-center">
              <span className="font-heading text-4xl text-accent">CG</span>
            </div>
          </motion.div>

          {/* Bio — à compléter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted leading-relaxed">
              Bio à compléter.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
