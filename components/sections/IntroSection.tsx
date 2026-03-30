'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="flex gap-6 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Barre verticale décorative */}
          <div className="w-[3px] self-stretch bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full flex-shrink-0" />

          {/* Contenu */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl text-text/90 font-bold tracking-wide">
              Ce qui me définit
            </h2>
            <p className="text-muted leading-relaxed text-base">
              {"J'aime les environnements où la performance se mesure et où les décisions ont un vrai impact. Ingénieur de formation, j'explore la finance comme un nouveau terrain d'application : un domaine exigeant, compétitif, où les outils techniques que je maîtrise prennent tout leur sens."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
