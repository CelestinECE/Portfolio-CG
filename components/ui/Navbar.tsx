'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const liens = [
  { label: 'Projets', id: 'projects' },
  { label: 'Compétences', id: 'skills' },
  { label: 'À propos', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

/* Icône hamburger → croix propre via SVG */
function BurgerIcon({ ouvert }: { ouvert: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Barre haute */}
      <motion.line
        x1="4" y1="7" x2="24" y2="7"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={ouvert
          ? { x1: 5, y1: 5, x2: 23, y2: 23 }
          : { x1: 4, y1: 7, x2: 24, y2: 7 }}
        transition={{ duration: 0.25 }}
      />
      {/* Barre milieu */}
      <motion.line
        x1="4" y1="14" x2="24" y2="14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={ouvert ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        style={{ transformOrigin: 'center' }}
      />
      {/* Barre basse */}
      <motion.line
        x1="4" y1="21" x2="24" y2="21"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={ouvert
          ? { x1: 5, y1: 23, x2: 23, y2: 5 }
          : { x1: 4, y1: 21, x2: 24, y2: 21 }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  )
}

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false)

  const scrollVers = (id: string) => {
    setOuvert(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  return (
    <>
      {/* Bouton hamburger fixe */}
      <motion.button
        onClick={() => setOuvert(!ouvert)}
        className="fixed top-6 right-6 z-50 w-11 h-11 flex items-center justify-center text-text hover:text-accent transition-colors duration-300"
        whileTap={{ scale: 0.93 }}
        aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <BurgerIcon ouvert={ouvert} />
      </motion.button>

      <AnimatePresence>
        {ouvert && (
          <>
            {/* Fond cliquable */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOuvert(false)}
              style={{ background: 'rgba(10, 10, 15, 0.6)' }}
            />

            {/* Panel glass */}
            <motion.nav
              className="fixed top-0 right-0 h-full z-40 w-64 flex flex-col justify-center px-10 gap-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                background: 'rgba(18, 18, 26, 0.45)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Halo intérieur subtil */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 120% 60% at 100% 40%, rgba(232,16,46,0.06) 0%, transparent 70%)',
                }}
              />

              {liens.map((lien, i) => (
                <motion.button
                  key={lien.id}
                  onClick={() => scrollVers(lien.id)}
                  className="relative text-left font-heading text-2xl text-muted hover:text-text transition-colors duration-200 flex items-center gap-3 group"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <span className="text-accent/50 text-xs font-body tabular-nums">0{i + 1}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {lien.label}
                  </span>
                </motion.button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
