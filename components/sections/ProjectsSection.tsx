'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

interface Projet {
  titre: string
  description: string
  categorie: string
  image: string | null
  lienGithub: string | null
  technologies: string[]
}

const projets: Projet[] = [
  {
    titre: 'Réseaux Trophiques',
    description:
      "Projet d'analyse écologique basé sur la théorie des graphes, visant à modéliser l'évolution des espèces dans un réseau trophique. J'ai conçu l'interface utilisateur et géré l'affichage graphique, en m'appuyant sur des données structurées au format JSON.",
    categorie: 'Scolaire',
    image: '/images/TDG.png',
    lienGithub: 'https://gitfront.io/r/Celestingn/75eUesPgPATd/projet-reseaux-trophiques-equipe-3b/',
    technologies: ['C', 'JSON', 'Git'],
  },
  {
    titre: 'Agence de Location de Voitures',
    description:
      "Système de gestion complet d'une agence de location développé en Java 21+, entièrement en ligne de commande. Architecture orientée objet avec héritage et polymorphisme (Vehicule → Voiture, Moto, Utilitaire), cycle de vie complet d'une location (création, retour, annulation, pénalités de retard) et statistiques dynamiques (taux d'occupation, véhicule le plus loué, client fidèle). Menu console hiérarchique sur 3 niveaux.",
    categorie: 'Scolaire',
    image: '/images/Java_Projet.png',
    lienGithub: 'https://gitfront.io/r/Celestingn/U66iViRUDCrD/Projet-location/',
    technologies: ['Java 21', 'POO', 'UML'],
  },
  {
    titre: 'Outil d\'Analyse Financière',
    description:
      "Outil d'analyse financière automatisé capable de collecter des données de marché en temps réel et de les transformer en indicateurs de performance et de risque : ratio de Sharpe, Bêta, Volatilité. S'appuie sur une structure de données fiable pour produire des rapports exploitables directement.",
    categorie: 'Personnel — En cours',
    image: null,
    lienGithub: null,
    technologies: ['Python', 'VBA', 'Excel'],
  },
]

// Icône GitHub SVG inline (aucune dépendance externe)
function IconGithub() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// Badge de catégorie
function BadgeCategorie({ label }: { label: string }) {
  return (
    <span className="inline-block bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
      {label}
    </span>
  )
}

// Pastille de technologie
function BadgeTech({ nom }: { nom: string }) {
  return (
    <span className="bg-surface-2 text-muted text-xs px-2 py-1 rounded border border-accent/10">
      {nom}
    </span>
  )
}

// Carte d'un projet
function CarteProjet({ projet, index }: { projet: Projet; index: number }) {
  return (
    <motion.div
      className="group flex flex-col lg:flex-row gap-8 items-start py-10 border-b border-surface-2 last:border-b-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Carte image gauche */}
      <motion.div
        className="w-full lg:w-72 flex-shrink-0"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="relative bg-surface border border-surface-2 group-hover:border-accent/50 rounded-xl overflow-hidden shadow-lg group-hover:shadow-accent/20 group-hover:shadow-xl transition-all duration-300">
          {/* Image ou placeholder */}
          <div className="relative w-full h-48 overflow-hidden">
            {projet.image ? (
              <Image
                src={projet.image}
                alt={projet.titre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-surface-2 flex items-center justify-center">
                <span className="text-muted text-sm">Image à venir</span>
              </div>
            )}
          </div>

          {/* Footer de la carte */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-text group-hover:text-accent transition-colors duration-300">
                {projet.titre}
              </h3>
            </div>
            <BadgeCategorie label={projet.categorie} />

            {/* Badges tech */}
            <div className="flex items-center gap-3 pt-1">
              {projet.technologies.map((tech) => (
                <BadgeTech key={tech} nom={tech} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description droite */}
      <div className="flex-1 space-y-4 pt-2">
        <p className="text-muted leading-relaxed group-hover:text-text/80 transition-colors duration-300">
          {projet.description}
        </p>

        {/* Bouton GitHub */}
        {projet.lienGithub ? (
          <a
            href={projet.lienGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-2 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:gap-3"
          >
            <IconGithub />
            Voir le projet
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 bg-surface border border-surface-2 text-muted font-semibold px-5 py-2.5 rounded-lg cursor-not-allowed text-sm">
            <IconGithub />
            Lien GitHub à venir
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="mesh-gradient-projects" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <TypewriterTitle
          text="Expériences & Projets"
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
        />

        <div className="divide-y divide-surface-2">
          {projets.map((projet, i) => (
            <CarteProjet key={projet.titre} projet={projet} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
