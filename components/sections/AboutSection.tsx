'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-4">
      <div className="relative z-10 max-w-6xl mx-auto">
        <TypewriterTitle
          text="À propos de moi"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative w-[336px] h-[336px] rounded-full overflow-hidden border-2 border-accent/30 cursor-pointer"
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: '0 20px 60px rgba(255, 45, 85, 0.25), 0 0 0 4px rgba(255, 45, 85, 0.15)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <Image
                src="/images/Photocv.jpeg"
                alt="Celestin Guilhen"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            
            <p className="text-muted leading-relaxed">
              Étudiant en 3ème année à ECE Lyon, je suis encore dans une formation généraliste en ingénierie, ce qui m&apos;a permis de développer une rigueur analytique solide avant de me spécialiser. C&apos;est précisément durant ce parcours que j&apos;ai eu le déclic : les marchés, les flux de capitaux et les décisions financières obéissent à une logique que mon profil technique me permet d&apos;appréhender différemment.
            </p>
            <p className="text-muted leading-relaxed">
              Ancien trésorier de l&apos;association étudiante, j&apos;ai géré un budget réel et pris des décisions financières sous contrainte. Ma certification Bloomberg Market Concepts et mes cours en Finance Quantitative et Fintech ont ensuite structuré ma compréhension des marchés et des mécanismes macroéconomiques.
            </p>
            <p className="text-muted leading-relaxed">
              Ce qui m&apos;attire dans la finance, c&apos;est avant tout son caractère profondément compétitif. C&apos;est un environnement où chaque décision se mesure, où la performance est visible et où les meilleurs se distinguent par leur capacité à traiter l&apos;information plus vite et mieux que les autres. Cette culture de l&apos;excellence et de la pression positive me correspond : j&apos;aime évoluer dans des environnements exigeants, où la complaisance n&apos;a pas sa place et où chaque journée pousse à se surpasser.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
