'use client'

import { motion } from 'framer-motion'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

interface SkillCategory {
  name: string
  skills: string[]
}

const categories: SkillCategory[] = [
  { name: 'Langages', skills: ['Python', 'C', 'Java', 'TypeScript', 'JavaScript'] },
  { name: 'Outils & DevOps', skills: ['Git', 'GitHub', 'Docker', 'Linux'] },
  { name: 'IA & Data', skills: ['TensorFlow', 'Scikit-learn', 'Pandas'] },
  { name: 'Finance', skills: ['Bloomberg Terminal', 'Excel', 'Analyse technique'] },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-screen py-24 px-4">
      <div className="relative z-10 max-w-6xl mx-auto">
        <TypewriterTitle
          text="Compétences"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="font-heading text-lg text-text mb-3">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm border border-muted/30 text-muted rounded-full hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
