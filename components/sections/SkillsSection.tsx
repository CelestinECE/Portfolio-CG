'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

interface Skill {
  name: string
  icon: string // chemin vers le SVG dans /public/models/
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const categories: SkillCategory[] = [
  {
    name: 'Langages',
    skills: [
      { name: 'Python', icon: '/models/python.svg' },
      { name: 'C', icon: '/models/c.svg' },
      { name: 'Java', icon: '/models/java.svg' },
      { name: 'HTML', icon: '/models/html.svg' },
      { name: 'CSS', icon: '/models/css.svg' },
      { name: 'JSON', icon: '/models/json.svg' },
      { name: 'SQL', icon: '/models/sql.svg' },
    ],
  },
  {
    name: 'Outils & DevOps',
    skills: [
      { name: 'Git', icon: '/models/git.svg' },
      { name: 'GitHub', icon: '/models/github.svg' },
      { name: 'VS Code', icon: '/models/vs-code.svg' },
    ],
  },
  {
    name: 'Finance',
    skills: [
      { name: 'Bloomberg Terminal', icon: '/models/bloomberg.svg' },
      { name: 'Excel', icon: '/models/excel.svg' },
    ],
  },
]

/* Badge de compétence avec icône SVG + effet hover 3D */
function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="
        group flex items-center gap-3
        px-4 py-2.5 rounded-xl
        bg-surface border border-muted/20
        hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10
        transition-all duration-300 cursor-default
      "
      whileHover={{
        rotateY: 12,
        rotateX: -5,
        scale: 1.12,
      }}
      transition={{ type: 'tween', duration: 0.08 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      {/* Icône SVG */}
      <div className="relative w-7 h-7 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Nom */}
      <span className="text-sm font-body text-muted group-hover:text-text transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-screen py-24 px-4">
      <div className="relative z-10 max-w-6xl mx-auto">
        <TypewriterTitle
          text="Compétences"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className={cat.name === 'Langages' ? 'md:col-span-2' : ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="font-heading text-lg text-text mb-4">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
