'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
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
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4">
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.h2
          className="font-heading text-3xl xl:text-5xl font-bold text-accent mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Nom"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-surface border border-surface-2 text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-surface border border-surface-2 text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 bg-surface border border-surface-2 text-text placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-bg transition-colors duration-300 font-heading text-sm tracking-wider uppercase disabled:opacity-50"
          >
            {status === 'loading' ? 'Envoi...' : 'Envoyer'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-sm">Message envoyé avec succès !</p>
          )}
          {status === 'error' && (
            <p className="text-accent text-sm">Erreur lors de l&apos;envoi. Réessayez.</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
