'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterTitle from '@/components/ui/TypewriterTitle'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

function IconPhone() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconGithub() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="relative z-10 max-w-5xl mx-auto">
        <TypewriterTitle
          text="Contactez-moi"
          className="font-heading text-3xl xl:text-5xl font-bold text-text text-center mb-4"
        />

        <motion.p
          className="text-muted text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Une question ou un projet en tête ? N&apos;hésite pas à me contacter !
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Coordonnées gauche */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-lg font-bold text-text">Mes coordonnées</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted">
                <span className="text-accent"><IconPhone /></span>
                <span>+33 6 02 15 55 42</span>
              </div>

              <div className="flex items-center gap-3 text-muted">
                <span className="text-accent"><IconMail /></span>
                <a href="mailto:cguilhen.pro@gmail.com" className="hover:text-accent transition-colors">
                  cguilhen.pro@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/celestin-guilhen-8a0675330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-2 transition-colors"
                  aria-label="LinkedIn"
                >
                  <IconLinkedIn />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulaire droite */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Votre nom"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-surface-2 rounded-lg text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Votre email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-surface-2 rounded-lg text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Objet du message"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-surface-2 rounded-lg text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Votre message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-surface-2 rounded-lg text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-accent hover:bg-accent-2 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? 'Envoi...' : (
                <>
                  Envoyer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm text-center">Message envoyé avec succès !</p>
            )}
            {status === 'error' && (
              <p className="text-accent text-sm text-center">Erreur lors de l&apos;envoi. Réessayez.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
